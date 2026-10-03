import assert from "node:assert/strict"
import { readFile } from "node:fs/promises"
import { JSDOM } from "jsdom"
import { createElement, act } from "react"
import { hydrateRoot } from "react-dom/client"
import { pathToFileURL } from "node:url"

export async function verifyRender(html, App) {
  const staticDOM = new JSDOM(html)
  const document = staticDOM.window.document
  assert.equal(document.querySelectorAll("h1").length, 1, "Static page must have one H1")
  assert.ok(document.querySelector("#capabilities a[href*='/mcp/']"), "Guide links must be present without JS")
  assert.ok(document.querySelector("#pipeline").textContent.includes("Capture the session"))
  assert.ok(!document.querySelector("noscript"), "No reduced or conflicting copy for crawlers")
  const schema = JSON.parse(document.querySelector('script[type="application/ld+json"]').textContent)
  assert.equal(schema["@graph"].find(p => p.name === "3270Web").license, "https://www.gnu.org/licenses/agpl-3.0.html")
  for (const image of document.querySelectorAll("img")) {
    assert.ok(Number(image.width) > 0 && Number(image.height) > 0, "Images must reserve dimensions")
  }
  // The SSR build must reference real client-build assets, not /src paths or
  // independently named hashes. A page full of broken images is not success.
  for (const element of document.querySelectorAll("img, script[src], link[rel='stylesheet']")) {
    const url = element.getAttribute("src") ?? element.getAttribute("href")
    if (url?.startsWith("/")) await readFile(`dist${url}`)
  }
  for (const image of document.querySelectorAll("img[srcset]")) {
    for (const item of image.getAttribute("srcset").split(",")) {
      await readFile(`dist${item.trim().split(/\s+/)[0]}`)
    }
  }
  staticDOM.window.close()

  // Browser-only state is read after hydration. Test the default palette and
  // a cross-subdomain persisted palette, with no IntersectionObserver.
  for (const storedTheme of [null, "daylight"]) {
    const dom = new JSDOM(html, { url: "https://3270.io/", pretendToBeVisual: true })
    for (const key of ["window", "document", "location", "localStorage", "HTMLElement", "Element", "Event", "MouseEvent"]) {
      Object.defineProperty(globalThis, key, { configurable: true, value: dom.window[key] })
    }
    dom.window.matchMedia = () => ({ matches: true })
    if (storedTheme) dom.window.document.cookie = `3270io_theme=${storedTheme}`
    globalThis.IS_REACT_ACT_ENVIRONMENT = true
    const errors = []
    let root
    try {
      await act(async () => {
        root = hydrateRoot(dom.window.document.getElementById("root"), createElement(App), { onRecoverableError: error => errors.push(error.message) })
      })
      assert.deepEqual(errors, [], "Hydration must match static markup")
      assert.equal(dom.window.document.documentElement.getAttribute("data-theme"), storedTheme)
      const galleryButton = dom.window.document.querySelector('button[aria-label="Open 3270Connect screenshot gallery"]')
      await act(async () => galleryButton.dispatchEvent(new dom.window.MouseEvent("click", { bubbles: true })))
      assert.ok(dom.window.document.querySelector('[role="dialog"]'), "Gallery must work after hydration")
      const close = dom.window.document.querySelector('button[aria-label="Close gallery"]')
      await act(async () => close.dispatchEvent(new dom.window.MouseEvent("click", { bubbles: true })))
      assert.ok(!dom.window.document.querySelector('[role="dialog"]'))
      const amber = dom.window.document.querySelector('button[title="Amber CRT"]')
      await act(async () => amber.dispatchEvent(new dom.window.MouseEvent("click", { bubbles: true })))
      assert.equal(dom.window.document.documentElement.getAttribute("data-theme"), "amber")
    } finally {
      if (root) await act(async () => root.unmount())
      dom.window.close()
    }
  }
  console.log("Static content, asset references, metadata and hydration checks passed")
}

const { App } = await import(pathToFileURL(process.argv[2]))
await verifyRender(await readFile("dist/index.html", "utf8"), App)

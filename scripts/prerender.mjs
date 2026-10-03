import { build } from "vite"
import { readFile, writeFile, rm } from "node:fs/promises"
import { execFileSync } from "node:child_process"
import { pathToFileURL } from "node:url"
import { resolve } from "node:path"

const temporary = resolve(".prerender")
try {
  // Use the same asset names and configuration as the client build. SSR code
  // stays outside dist and is never published by GitHub Pages.
  await build({ build: { ssr: "src/entry-server.tsx", outDir: temporary } })
  const { render, practicalGuides } = await import(pathToFileURL(resolve(temporary, "entry-server.js")))
  const template = await readFile("dist/index.html", "utf8")
  const content = render()
  if (!content.includes("<h1") || !content.includes("3270Web")) {
    throw new Error("Prerender produced an incomplete homepage")
  }
  const html = template.replace('<div id="root"></div>', `<div id="root">${content}</div>`)
  await writeFile("dist/index.html", html)
  execFileSync(process.execPath, ["scripts/verify-render.mjs", resolve(temporary, "entry-server.js")], {
    env: { ...process.env, NODE_ENV: "development" }, stdio: "inherit",
  })

  // Only changes that affect the public page advance lastmod; rebuilding or
  // updating the contributor README does not manufacture a freshness date.
  const modified = execFileSync("git", ["log", "-1", "--format=%cs", "--", "src", "index.html", "public", "vite.config.ts", "scripts"], { encoding: "utf8" }).trim()
  if (!/^\d{4}-\d{2}-\d{2}$/.test(modified)) throw new Error("Cannot determine content modification date")
  await writeFile("dist/sitemap.xml", `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>https://3270.io/</loc><lastmod>${modified}</lastmod></url></urlset>\n`)
  const facts = JSON.parse(await readFile("src/lib/product-facts.json", "utf8"))
  await writeFile("dist/llms.txt", `# 3270.io\n\n> Self-hosted open-source IBM 3270 tools for developers, testers and operators. Software acquisition is free; infrastructure and optional AI-provider charges are separate.\n\n## Products\n${Object.values(facts).map(p => `- [${p.name}](${p.url}): ${p.description} Licence: ${p.licence}. [Licence guide](${p.licenceGuide}).`).join("\n")}\n\n## Practical guides\n${practicalGuides.map(guide => `- [${guide.title}](${guide.href}): ${guide.description}`).join("\n")}\n\n## Reference\n- [Record and replay a session](https://3270web.3270.io/workflow/)\n- [Run a workflow from the CLI](https://3270connect.3270.io/basic-usage/)\n- [Prometheus metrics](https://3270connect.3270.io/metrics/)\n- [3270Web MCP](https://3270web.3270.io/mcp/)\n- [3270Connect MCP](https://3270connect.3270.io/mcp/)\n- [Compare screen maps](https://3270web.3270.io/chaos-compare/)\n- [Embed the terminal](https://3270web.3270.io/embedding/)\n`)
} finally {
  await rm(temporary, { recursive: true, force: true })
}

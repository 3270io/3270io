import { useState } from "react"
import type { ProductId } from "@/lib/site-data"
import { Capabilities } from "@/components/site/Capabilities"
import { Gallery } from "@/components/site/Gallery"
import { Hero } from "@/components/site/Hero"
import { Launch } from "@/components/site/Launch"
import { Pipeline } from "@/components/site/Pipeline"
import { Products } from "@/components/site/Products"
import { Showcase } from "@/components/site/Showcase"
import { SiteFooter } from "@/components/site/SiteFooter"
import { SiteNav } from "@/components/site/SiteNav"
import { Videos } from "@/components/site/Videos"

function App() {
  const [galleryProduct, setGalleryProduct] = useState<ProductId | null>(null)
  const [galleryIndex, setGalleryIndex] = useState(0)

  const openGallery = (product: ProductId, index = 0) => {
    setGalleryProduct(product)
    setGalleryIndex(index)
  }

  return (
    <>
      <div className="backdrop" aria-hidden="true" />

      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <SiteNav />

      <main id="main">
        <Hero />
        <Products onOpenGallery={openGallery} />
        <Videos />
        <Pipeline />
        <Capabilities />
        <Showcase onOpen={openGallery} />
        <Launch />
      </main>

      <SiteFooter />

      <Gallery
        product={galleryProduct}
        index={galleryIndex}
        onIndexChange={setGalleryIndex}
        onClose={() => setGalleryProduct(null)}
      />
    </>
  )
}

export default App

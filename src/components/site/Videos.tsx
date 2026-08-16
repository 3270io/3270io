import { ArrowUpRight } from "@phosphor-icons/react"
import { showcaseVideos } from "@/lib/site-data"
import { ProductMark } from "./Logo"
import { Reveal } from "./Reveal"
import { SectionHead } from "./SectionHead"

/**
 * The two flagship tours, one per product, in the same window chrome the
 * screenshots use. The files stream from each project's docs site and
 * `preload="none"` means visiting this page costs nothing — the poster is
 * the only asset fetched until someone presses play.
 */
export function Videos() {
  return (
    <section className="section" id="videos">
      <div className="shell">
        <SectionHead
          eyebrow="Showcase"
          title="Watch them work"
          lede="One tour per product, recorded from live sessions against the bundled sample applications — nothing is mocked. The longer walk-throughs live in each project's documentation."
        />

        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-10 lg:grid-cols-2">
          {showcaseVideos.map((video, index) => (
            <Reveal key={video.src} delay={index * 80}>
              <figure className="h-full">
                <div className="shot">
                  <span className="shot-bar">
                    <i />
                    <i />
                    <i />
                    <span className="mono ml-auto flex items-center gap-1.5 text-[0.66rem] tracking-[0.08em] text-[var(--text-3)]">
                      <ProductMark product={video.product} size={13} />
                      {video.product}
                    </span>
                  </span>
                  <video
                    controls
                    preload="none"
                    playsInline
                    poster={video.poster}
                    aria-label={`${video.product} video: ${video.title}`}
                    className="aspect-video w-full object-contain"
                    style={{ background: "var(--bg-deep)" }}
                  >
                    <source src={video.src} type={video.type} />
                    <a href={video.src}>Download the video</a>.
                  </video>
                </div>
                <figcaption className="mt-3.5">
                  <h3 className="h3 text-[1.02rem]">{video.title}</h3>
                  <p className="mt-1.5 text-[0.86rem] leading-relaxed text-[var(--text-2)]">
                    {video.caption}
                  </p>
                  <a
                    href={video.more.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn ghost sm mt-2.5 -ml-3"
                  >
                    {video.more.label}
                    <ArrowUpRight size={14} weight="bold" />
                  </a>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

import { useCallback, useState } from 'react'
import ImageLightbox from './ImageLightbox'

export default function SponsorPosterGrid({ posters }) {
  const [selectedIndex, setSelectedIndex] = useState(null)
  const selectedPoster = selectedIndex === null ? null : posters[selectedIndex]
  const closeLightbox = useCallback(() => setSelectedIndex(null), [])

  return (
    <>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6">
        {posters.map((poster, index) => (
          <figure
            key={poster.src}
            className="overflow-hidden rounded-[16px] border border-white/[0.14] bg-white/[0.03] p-2.5 shadow-[0_12px_28px_rgba(0,0,0,0.16)] sm:rounded-[20px] sm:p-3"
          >
            <button
              type="button"
              onClick={() => setSelectedIndex(index)}
              className="block w-full cursor-zoom-in overflow-hidden rounded-[10px] bg-black/45 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold sm:rounded-[12px]"
              aria-label={`Deschide afișul: ${poster.alt}`}
            >
              <img
                src={poster.src}
                alt={poster.alt}
                width={poster.width}
                height={poster.height}
                loading={index < 3 ? 'eager' : 'lazy'}
                fetchPriority={index === 0 ? 'high' : 'auto'}
                decoding="async"
                className="aspect-[1054/1492] h-auto w-full object-contain"
              />
            </button>
          </figure>
        ))}
      </div>
      <ImageLightbox
        src={selectedPoster?.src}
        alt={selectedPoster?.alt || ''}
        onClose={closeLightbox}
      />
    </>
  )
}

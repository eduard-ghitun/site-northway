import { useCallback, useState } from 'react'
import Reveal from './Reveal'
import AppImage from './AppImage'
import ImageLightbox from './ImageLightbox'

function getPhotoSource(photo) {
  return photo.image || photo.src
}

function getPhotoAlt(photo) {
  return photo.imageAlt || photo.alt || photo.title || 'Fotografie din galerie'
}

export default function EventPhotoGallery({ photos, galleryId }) {
  const [selectedIndex, setSelectedIndex] = useState(null)
  const selectedPhoto = selectedIndex === null ? null : photos[selectedIndex]

  const closeLightbox = useCallback(() => setSelectedIndex(null), [])

  return (
    <>
      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {photos.map((photo, index) => (
          <Reveal key={`${galleryId}-${getPhotoSource(photo)}`} delay={Math.min(index * 0.025, 0.2)}>
            <figure className="group min-w-0 overflow-hidden rounded-[16px] border border-gold/25 bg-white/[0.03] p-2.5 shadow-[0_12px_30px_rgba(0,0,0,0.2)] transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-1 hover:border-gold/60 hover:shadow-[0_16px_36px_rgba(0,0,0,0.32)] sm:rounded-[20px] sm:p-3">
              <button
                type="button"
                onClick={() => setSelectedIndex(index)}
                className="group block min-h-0 w-full touch-manipulation cursor-zoom-in overflow-hidden rounded-[10px] bg-black/40 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold sm:rounded-[12px]"
                aria-label={`Deschide fotografia: ${getPhotoAlt(photo)}`}
              >
                <AppImage
                  src={getPhotoSource(photo)}
                  alt={getPhotoAlt(photo)}
                  wrapperClassName={`${photo.orientation === 'portrait' ? 'aspect-[2/3]' : 'aspect-[4/3]'} overflow-hidden`}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                />
              </button>
              {photo.title || photo.description ? (
                <figcaption className="px-1 pb-1 pt-3">
                  {photo.title ? <h3 className="text-sm font-semibold uppercase tracking-[0.1em] text-white">{photo.title}</h3> : null}
                  {photo.description ? <p className="mt-1.5 text-sm leading-5 text-white/[0.62]">{photo.description}</p> : null}
                </figcaption>
              ) : null}
            </figure>
          </Reveal>
        ))}
      </div>
      <ImageLightbox
        src={selectedPhoto ? getPhotoSource(selectedPhoto) : undefined}
        alt={selectedPhoto ? getPhotoAlt(selectedPhoto) : ''}
        onClose={closeLightbox}
      />
    </>
  )
}

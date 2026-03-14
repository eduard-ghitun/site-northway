import clsx from 'clsx'
import { useEffect, useState } from 'react'
import { sharedImages } from '../assets/images'

export default function AppImage({
  src,
  alt,
  wrapperClassName,
  className,
  imgClassName,
  fallbackSrc = sharedImages.fallback,
  loading = 'lazy',
  decoding = 'async',
  ...props
}) {
  const resolvedSrc = src || fallbackSrc
  const [currentSrc, setCurrentSrc] = useState(resolvedSrc)

  useEffect(() => {
    setCurrentSrc(resolvedSrc)
  }, [resolvedSrc])

  return (
    <div className={clsx('overflow-hidden', wrapperClassName)}>
      <img
        src={currentSrc}
        alt={alt || 'Imagine NorthSideCrew'}
        loading={loading}
        decoding={decoding}
        onError={() => {
          if (currentSrc !== fallbackSrc) {
            setCurrentSrc(fallbackSrc)
          }
        }}
        className={clsx('h-full w-full object-cover', className, imgClassName)}
        {...props}
      />
    </div>
  )
}

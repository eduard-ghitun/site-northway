import { useEffect } from 'react'

const SITE_URL = 'https://northsidecrew.ro'
const DEFAULT_TITLE = 'NorthSideCrew – Evenimente Auto, Car Meets si Comunitate Auto Romania'
const DEFAULT_DESCRIPTION =
  'NorthSideCrew este o comunitate dedicata pasionatilor auto. Descopera evenimente auto, car meets si proiecte speciale organizate in Romania.'
const DEFAULT_KEYWORDS =
  'car meet Romania, evenimente auto Romania, NorthSideCrew, tuning cars Romania, car community Romania'
const DEFAULT_OG_TITLE = 'NorthSideCrew – Automotive Community'
const DEFAULT_OG_DESCRIPTION = 'Descopera evenimente auto si comunitatea NorthSideCrew'
const DEFAULT_OG_IMAGE = `${SITE_URL}/home/northsidecrew-home-hero.jpg`

const ORGANIZATION_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'NorthSideCrew',
  url: SITE_URL,
  logo: `${SITE_URL}/favicon.svg`,
  sameAs: ['https://www.instagram.com/northwaytuning?igsh=aDlkOWE3M2x1a3F3&utm_source=qr'],
}

function upsertMeta(selector, attributes) {
  let element = document.head.querySelector(selector)

  if (!element) {
    element = document.createElement('meta')
    document.head.appendChild(element)
  }

  Object.entries(attributes).forEach(([key, value]) => {
    element.setAttribute(key, value)
  })
}

function upsertLink(rel, href) {
  let element = document.head.querySelector(`link[rel="${rel}"]`)

  if (!element) {
    element = document.createElement('link')
    element.setAttribute('rel', rel)
    document.head.appendChild(element)
  }

  element.setAttribute('href', href)
}

function upsertStructuredData(id, payload) {
  let element = document.head.querySelector(`script[data-seo-schema="${id}"]`)

  if (!element) {
    element = document.createElement('script')
    element.type = 'application/ld+json'
    element.setAttribute('data-seo-schema', id)
    document.head.appendChild(element)
  }

  element.textContent = JSON.stringify(payload)
}

export default function Seo({
  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
  keywords = DEFAULT_KEYWORDS,
  path = '/',
  image = DEFAULT_OG_IMAGE,
  ogTitle = DEFAULT_OG_TITLE,
  ogDescription = DEFAULT_OG_DESCRIPTION,
  type = 'website',
}) {
  useEffect(() => {
    const canonicalUrl = `${SITE_URL}${path === '/' ? '' : path}`

    document.title = title

    upsertMeta('meta[name="description"]', { name: 'description', content: description })
    upsertMeta('meta[name="keywords"]', { name: 'keywords', content: keywords })
    upsertMeta('meta[name="robots"]', { name: 'robots', content: 'index, follow' })

    upsertMeta('meta[property="og:title"]', { property: 'og:title', content: ogTitle || title })
    upsertMeta('meta[property="og:description"]', {
      property: 'og:description',
      content: ogDescription || description,
    })
    upsertMeta('meta[property="og:image"]', { property: 'og:image', content: image })
    upsertMeta('meta[property="og:url"]', { property: 'og:url', content: canonicalUrl })
    upsertMeta('meta[property="og:type"]', { property: 'og:type', content: type })
    upsertMeta('meta[property="og:site_name"]', {
      property: 'og:site_name',
      content: 'NorthSideCrew',
    })
    upsertMeta('meta[property="og:locale"]', { property: 'og:locale', content: 'ro_RO' })

    upsertMeta('meta[name="twitter:card"]', {
      name: 'twitter:card',
      content: 'summary_large_image',
    })
    upsertMeta('meta[name="twitter:title"]', {
      name: 'twitter:title',
      content: ogTitle || title,
    })
    upsertMeta('meta[name="twitter:description"]', {
      name: 'twitter:description',
      content: ogDescription || description,
    })
    upsertMeta('meta[name="twitter:image"]', {
      name: 'twitter:image',
      content: image,
    })

    upsertLink('canonical', canonicalUrl)
    upsertStructuredData('organization', ORGANIZATION_SCHEMA)
  }, [description, image, keywords, ogDescription, ogTitle, path, title, type])

  return null
}

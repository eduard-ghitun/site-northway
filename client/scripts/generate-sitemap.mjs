import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const projectRoot = path.resolve(__dirname, '..')
const publicDir = path.join(projectRoot, 'public')
const sitemapPath = path.join(publicDir, 'sitemap.xml')

const siteUrl = 'https://northsidecrew.ro'
const routes = [
  { path: '/', changefreq: 'weekly', priority: '1.0' },
  { path: '/events', changefreq: 'weekly', priority: '0.9' },
  { path: '/members', changefreq: 'monthly', priority: '0.8' },
  { path: '/about', changefreq: 'monthly', priority: '0.8' },
  { path: '/contact', changefreq: 'monthly', priority: '0.7' },
]

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    ({ path: routePath, changefreq, priority }) => `  <url>
    <loc>${siteUrl}${routePath === '/' ? '/' : routePath}</loc>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`,
  )
  .join('\n')}
</urlset>
`

await mkdir(publicDir, { recursive: true })
await writeFile(sitemapPath, xml, 'utf8')

console.log(`Sitemap generated at ${sitemapPath}`)

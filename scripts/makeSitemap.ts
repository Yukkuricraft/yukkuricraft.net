import fs from 'fs'
import { create } from 'xmlbuilder2'
import pages from './pages'

const nowTime = new Date().toISOString()

function makeEntry(obj) {
  let time = nowTime
  if (obj.mainContent) {
    time = obj.mainContent
      .map((path) => fs.statSync(path).mtime)
      .sort()[0]
      .toISOString()
  }

  return {
    loc: `https://yukkuricraft.net${obj.url}`,
    lastmod: time,
    priority: obj.priority,
  }
}

export function makeSitemap() {
  const doc = create({ encoding: 'UTF-8' }).ele({
    urlset: {
      '@xmlns': 'http://www.sitemaps.org/schemas/sitemap/0.9',
      '@xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
      '@xsi:schemaLocation':
        'http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd',
      url: pages.filter((obj) => !obj.noSitemap).map(makeEntry),
    },
  })

  const strDoc = doc.end({ prettyPrint: true })
  fs.writeFileSync('./public/sitemap.xml', strDoc)
}

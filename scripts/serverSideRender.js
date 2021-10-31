/* eslint-disable no-console */
const path = require('path')
const fs = require('fs/promises')

let lastFileWrite = null

const renderer = require('vue-server-renderer').createBundleRenderer(
  require('../serverdist/vue-ssr-server-bundle.json'),
  {
    runInNewContext: false,
    template: require('fs')
      .readFileSync('./dist/index.html', 'utf8')
      .replace('<div id="app"></div>', '<!--vue-ssr-outlet-->')
      .replace('<script defer="defer" src="/js-vendors.js"></script>', '')
      .replace('<script defer="defer" src="/app.js"></script>', ''),
    clientManifest: require('../dist/vue-ssr-client-manifest.json'),
  }
)

const pages = require('./pages')

async function writeContentToDisk(page, html) {
  const dist = path.join(__dirname, '..', 'dist2')
  const destination = page.htmlFilename ?? `${page.url}index.html`
  const completePath = dist + destination

  console.log(`Writing ${page.url} to disk at ${completePath}`)
  await fs.mkdir(path.join(completePath, '..'), { recursive: true })
  await fs.writeFile(completePath, html)
}

async function renderPage(page) {
  console.log(`Rendering ${page.url}`)
  const html = await renderer.renderToString({ url: page.url })

  if (page.url === '/') {
    lastFileWrite = () => writeContentToDisk(page, html)
  } else {
    await writeContentToDisk(page, html)
  }
}

async function run() {
  // await Promise.all(pages.map(renderPage)).catch(console.error)
  // await renderPage(pages[pages.length - 2])

  for (const page of pages) {
    await renderPage(page)
  }

  if (lastFileWrite) {
    await lastFileWrite()
  }
}

run()

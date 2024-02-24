/* eslint-disable no-console */
import fs from 'node:fs/promises'
import path from 'node:path'
import url from 'node:url'
import pages from './pages.cjs'

const __dirname = path.dirname(url.fileURLToPath(import.meta.url))

const toAbsolute = (p) => path.resolve(__dirname, '..', p)

async function writeContentToDisk(page, html) {
  const dist = path.join(toAbsolute('dist/prerender'))
  const destination =
    page.htmlFilename ?? `${page.url}index.html`
  const completePath = dist + destination

  console.log(`Writing ${page.url} to disk at ${completePath}`)
  await fs.mkdir(path.join(completePath, '..'), { recursive: true })
  await fs.writeFile(completePath, html)
}

async function prerenderRoute(render, template, pageDesc) {
  console.log('Prerendering ' + pageDesc.url)
  const [appHtml, preloadLinks, headPayload] = await render(pageDesc.url)

  let html = template.replace(`<!--preload-links-->`, preloadLinks).replace(`<!--app-html-->`, appHtml)

  Object.entries(headPayload).forEach(([key, value]) => {
    html = html.replace(`<!--${key}-->`, value)
  })

  await writeContentToDisk(pageDesc, html)
}

async function run() {
  await fs.cp(toAbsolute('dist/client/'), toAbsolute('dist/prerender'), { recursive: true })

  const manifest = JSON.parse(await fs.readFile(toAbsolute('dist/client/.vite/ssr-manifest.json'), 'utf-8'))
  const template = await fs.readFile(toAbsolute('dist/client/index.html'), 'utf-8')
  const { render } = await import('../dist/server/entry-server.js')

  await Promise.all(pages.map((p) => prerenderRoute((url) => render(url, manifest), template, p)))

  await fs.unlink(toAbsolute('dist/prerender/.vite/ssr-manifest.json'))

  console.info('Finished prerendering')
}

run()

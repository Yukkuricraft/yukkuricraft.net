/* eslint-disable no-console */
import fs from 'fs/promises'
import path from 'path'
import process from 'process'
import readline from 'readline'
import express, { type Express } from 'express'
import puppeteer, { type Browser } from 'puppeteer'
import { JSDOM } from 'jsdom'
import pages from './pages'

function postProcess(content: string): string {
  let htmlContent = content
  htmlContent = htmlContent.replace('http://localhost:8080', 'https://yukkuricraft.net')

  const dom = new JSDOM(htmlContent)
  dom.window.document.children[0].classList.remove('webp', 'webp-alpha', 'webp-animation', 'webp-lossless')

  const scripts = dom.window.document.head.querySelectorAll('script')
  for (const script of scripts) {
    script.defer = true
    dom.window.document.body.appendChild(script)
  }

  dom.window.document.head.querySelector('style').remove()

  return dom.serialize()
}

async function writeContentToDisk(page, html: string) {
  const dist = path.join(__dirname, '..', 'dist', 'prerender')
  const destination = page.htmlFilename ?? `${page.url}index.html`
  const completePath = dist + destination

  console.log(`Writing ${page.url} to disk at ${completePath}`)
  await fs.mkdir(path.join(completePath, '..'), { recursive: true })
  await fs.writeFile(completePath, postProcess(html))
}

async function prerenderRoute(browser: Browser, pageDesc) {
  console.log('Prerendering ' + pageDesc.url)
  const page = await browser.newPage()

  page.evaluateOnNewDocument(function () {
    const castedWindow = window as typeof window & {
      __PRERENDER_DONE: boolean
      __PRERENDER_INJECTED: unknown
      }

    castedWindow.__PRERENDER_DONE = false
    castedWindow.__PRERENDER_INJECTED = {
      prerendered: true,
    }
    document.addEventListener('render-event', () => {
      castedWindow.__PRERENDER_DONE = true
    })
  })

  await page.goto(`http://localhost:8080${pageDesc.url}`, { waitUntil: 'networkidle0' })

  await page.evaluate(function () {
    return new Promise<void>((resolve) => {
      // Catch quick renders
      if ((window as typeof window & {__PRERENDER_DONE: boolean}).__PRERENDER_DONE) {
        resolve()
      } else {
        document.addEventListener('render-event' as keyof DocumentEventMap, () => resolve())
      }
    })
  })

  const html = await page.content()
  await page.close()

  await writeContentToDisk(pageDesc, html)
}

async function run() {
  const stdIO = readline.createInterface({ input: process.stdin, output: process.stdout })

  const distPath = path.join(__dirname, '..', 'dist')
  const baseHtmlFile = await fs.readFile(path.join(distPath, 'client', 'index.html'), { encoding: 'utf8' })
  const app: Express = express()

  app.use(express.static(path.join(distPath, 'client')))
  app.get('*', (req, res) => res.send(baseHtmlFile))
  console.log('Starting webserver on port 8080')

  const server = app.listen(8080)
  console.log('Webserver started')

  await fs.cp(path.join(distPath, 'client'), path.join(distPath, 'prerender'), { recursive: true })

  let browser
  try {
    browser = await puppeteer.launch({ defaultViewport: { width: 1920, height: 1080 }, headless: 'new' })
    await Promise.all(pages.map((p) => prerenderRoute(browser, p)))
    await browser.close()
  } catch (e) {
    console.error(e)
    if (browser) {
      await browser.close()
    }
  }

  console.log('Closing webserver')
  await server.close()
  console.log('Closed webserver')

  stdIO.close()
}

run().catch((e) => console.error(e))

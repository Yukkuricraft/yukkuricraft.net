/* eslint-disable no-console */
const fs = require('fs/promises')
const path = require('path')
const process = require('process')
const readline = require('readline')
const express = require('express')
const puppeteer = require('puppeteer')
const { JSDOM } = require('jsdom')
const pages = require('./pages')

let lastFileWrite = null

async function writeContentToDisk(page, html) {
  const dist = path.join(__dirname, '..', 'dist')
  const destination = page.htmlFilename ?? `${page.url}index.html`
  const completePath = dist + destination

  console.log(`Writing ${page.url} to disk at ${completePath}`)
  await fs.mkdir(path.join(completePath, '..'), { recursive: true })
  await fs.writeFile(completePath, postProcess(html))
}

function postProcess(content) {
  let htmlContent = content
  htmlContent = htmlContent.replace('http://localhost:8080', 'https://yukkuricraft.net')

  const dom = new JSDOM(htmlContent)
  dom.window.document.children[0].classList.remove('webp', 'webp-alpha', 'webp-animation', 'webp-lossless')

  const scripts = dom.window.document.head.querySelectorAll('script')
  for (const script of scripts) {
    script.defer = true
    dom.window.document.body.appendChild(script)
  }

  return dom.serialize()
}

async function prerenderRoute(browser, pageDesc) {
  console.log('Prerendering ' + pageDesc.url)
  const page = await browser.newPage()

  page.evaluateOnNewDocument(function () {
    window.__PRERENDER_DONE = false
    window.__PRERENDER_INJECTED = {
      prerendered: true,
    }
    document.addEventListener('render-event', () => {
      window.__PRERENDER_DONE = true
    })
  })

  await page.goto(`http://localhost:8080${pageDesc.url}`, { waitUntil: 'networkidle0' })

  page.evaluate(function () {
    return new Promise((resolve) => {
      // Catch quick renders
      if (window.__PRERENDER_DONE) {
        resolve()
      } else {
        document.addEventListener('render-event', resolve())
      }
    })
  })

  const html = await page.content()
  await page.close()

  if (pageDesc.url === '/') {
    lastFileWrite = () => writeContentToDisk(pageDesc, html)
  } else {
    await writeContentToDisk(pageDesc, html)
  }
}

async function run() {
  const stdIO = readline.createInterface({ input: process.stdin, output: process.stdout })

  const distPath = path.join(__dirname, '..', 'dist')
  const baseHtmlFile = await fs.readFile(path.join(distPath, 'index.html'), { encoding: 'utf8' })
  const app = express()

  app.use(express.static(distPath))
  app.get('*', (req, res) => res.send(baseHtmlFile))
  console.log('Starting webserver on port 8080')

  const server = app.listen(8080)
  console.log('Webserver started')

  let browser

  try {
    browser = await puppeteer.launch({ defaultViewport: { width: 1920, height: 1080 } })
    await Promise.all(pages.map((p) => prerenderRoute(browser, p)))
    await browser.close()
  } catch (e) {
    console.error(e)
    if (browser) {
      await browser.close()
    }
  }

  // await new Promise((resolve) => stdIO.question('Press enter to close', () => resolve()))

  console.log('Closing webserver')
  await server.close()
  console.log('Closed webserver')

  if (lastFileWrite) {
    await lastFileWrite()
  }

  stdIO.close()
}

run().catch((e) => console.error(e))

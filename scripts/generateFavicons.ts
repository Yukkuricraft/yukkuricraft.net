import fs from 'node:fs/promises'
import path from 'node:path'
import url from 'node:url'
import pngToIco from 'png-to-ico'
import sharp from 'sharp'

const here = path.dirname(url.fileURLToPath(import.meta.url))
const projectRoot = path.resolve(here, '..')
const source = path.resolve(projectRoot, 'src/favicon_upscaled.png')
const outDir = path.resolve(projectRoot, 'public/assets')
const urlBase = '/assets'

const appName = 'Yukkuricraft Info'
const appDescription = 'Yukkuricraft Info page'
const themeColor = '#e56a00'
const background = '#ffffff'

// Files to emit. apple-touch-icon is the only legacy-ish one still worth including.
const pngTargets: { name: string; size: number }[] = [
  { name: 'favicon-16.png', size: 16 },
  { name: 'favicon-32.png', size: 32 },
  { name: 'apple-touch-icon.png', size: 180 },
  { name: 'icon-192.png', size: 192 },
  { name: 'icon-512.png', size: 512 },
]

export async function generateFavicons() {
  await fs.mkdir(outDir, { recursive: true })
  const input = sharp(source)

  await Promise.all(
    pngTargets.map(({ name, size }) =>
      input
        .clone()
        .resize(size)
        .png()
        .toFile(path.resolve(outDir, name)),
    ),
  )

  // favicon.ico — multi-resolution from the 16/32/48 PNGs in memory
  const icoSourceBuffers = await Promise.all(
    [16, 32, 48].map((size) =>
      input
        .clone()
        .resize(size)
        .png()
        .toBuffer(),
    ),
  )
  const icoBuffer = await pngToIco(icoSourceBuffers)
  await fs.writeFile(path.resolve(outDir, 'favicon.ico'), icoBuffer)

  const manifest = {
    name: appName,
    short_name: appName,
    description: appDescription,
    lang: 'en-US',
    theme_color: themeColor,
    background_color: background,
    display: 'standalone',
    start_url: '/',
    icons: [
      { src: `${urlBase}/icon-192.png`, sizes: '192x192', type: 'image/png' },
      { src: `${urlBase}/icon-512.png`, sizes: '512x512', type: 'image/png' },
    ],
  }

  await fs.writeFile(path.resolve(outDir, 'manifest.webmanifest'), JSON.stringify(manifest, null, 2))

  console.log(`Wrote ${pngTargets.length} favicon PNGs, favicon.ico, and manifest.webmanifest to public/assets/`)
}

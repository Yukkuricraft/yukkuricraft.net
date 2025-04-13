import fs from 'fs'
import path from 'node:path'
import sharp from 'sharp'
import { glob } from 'glob'

import imageOptions, { type ImageOptions, type Qualities, type Size } from './images'

const work: Promise<unknown>[] = []
let processed = 0
let proccessAmount = 0

function addInfoToObject(
  file: string,
  sizeName: string | undefined,
  size: number | Size,
  minWidth: number | undefined,
  queryOptions: string | undefined,
  extension: string,
  outputFile: string,
  outDir: string,
  obj,
) {
  const pathParts: string[] = file.replaceAll('\\', '/').split('/')
  if (pathParts[0] === '') {
    pathParts.shift()
  }

  if (sizeName !== undefined) {
    pathParts.push(sizeName)
  }
  pathParts.push(extension)

  while (pathParts.length > 1) {
    const k = pathParts.shift()

    if (typeof obj[k] === 'undefined') {
      obj[k] = {}
    }

    obj = obj[k]
  }

  const relativeOutputFile = path.relative(outDir, outputFile).replaceAll('\\', '/')
  obj[pathParts.shift()] = {
    filename: `import("./${relativeOutputFile}${queryOptions ? `?${queryOptions}` : ''}")`,
    size,
    minWidth,
  }
}

async function processImage(image: string, globalOptions: ImageOptions, infoObject) {
  const file = path.parse(path.relative(globalOptions.dir, image))
  const outputFileBase = globalOptions.outDir + file.dir + '/' + file.name
  fs.mkdirSync(globalOptions.outDir + file.dir, { recursive: true })

  function callIfFunction<A>(val: ((image: string) => A) | A) {
    return typeof val === 'function' ? (val as (image: string) => A)(image) : val
  }

  function getQuality(options: { quality?: Qualities }) {
    return callIfFunction(options.quality || globalOptions.quality)
  }

  function types(options: { quality?: Qualities }) {
    const quality = getQuality(options)

    return typeof quality === 'object' ? Object.keys(quality) : [quality === true ? 'png' : 'jpeg', 'webp']
  }

  function base(type: string, options: { quality?: Qualities }) {
    const base = sharp(image)
    const quality = getQuality(options)

    if (quality === true) {
      return type === 'webp' ? base.webp({ lossless: true }) : base.png()
    } else {
      const imgQuality = callIfFunction(quality[type]) || quality
      return type === 'webp' ? base.webp({ quality: imgQuality }) : base.jpeg({ quality: imgQuality, mozjpeg: true })
    }
  }

  const res = []
  if (globalOptions.sizes) {
    for (const [sizeName, sizeOptions] of Object.entries(globalOptions.sizes)) {
      const sizeOptionsObj = typeof sizeOptions === 'number' ? {} : sizeOptions
      for (const type of types(sizeOptionsObj)) {
        const outputFile = outputFileBase + (sizeName !== '' ? '_' : '') + sizeName + '.' + type
        const sizeNum = typeof sizeOptions === 'object' ? sizeOptions.size : sizeOptions
        const sizeObj: Size | undefined = typeof sizeOptions === 'object' ? sizeOptions : undefined
        res.push(base(type, sizeOptionsObj).resize(sizeNum).toFile(outputFile))

        addInfoToObject(
          file.dir + '/' + file.name,
          sizeName,
          sizeNum,
          sizeObj?.minWidth,
          sizeObj?.queryOptions,
          type,
          outputFile,
          globalOptions.outDir,
          infoObject,
        )
      }
    }
  } else {
    for (const type of types({})) {
      const outputFile = outputFileBase + '.' + type

      res.push(base(type, {}).toFile(outputFile))

      addInfoToObject(
        file.dir + '/' + file.name,
        undefined,
        undefined,
        undefined,
        undefined,
        type,
        outputFile,
        globalOptions.outDir,
        infoObject,
      )
    }
  }
  const ret = await Promise.all(res)

  processed++

  if (processed % 10 === 0 || processed === proccessAmount) {
    console.log(`Processed ${processed}/${proccessAmount} images`)
  }

  return ret
}

function makeInfoFile(outDir: string, infoObject) {
  const importRegex = /"import\(\\"([^)]+)\\"\)"/gm
  let ids = 0
  const imports: [string, string][] = []

  const json =
    'export default ' +
    JSON.stringify(infoObject).replaceAll(importRegex, (match, importer) => {
      const id = importer.replace('./', '').replaceAll(/[.?/]/gm, '_').replaceAll('?', '_') + '_' + ids++
      imports.push([id, importer])

      return id
    })

  const allImports = imports.map(([id, from]) => `import ${id} from "${from}"`).join('\n')

  const writeFile = fs.promises.writeFile(outDir + '/data.js', allImports + '\n' + json)

  const dtsHeader = `
interface ImageExtensionData {
  filename: string
  size?: number
  minWidth?: number
}
interface ImageData {
  jpeg?: ImageExtensionData
  png?: ImageExtensionData
  webp: ImageExtensionData
}`
  const typesInfoObject = JSON.stringify(infoObject, (k, v) =>
    k === 'jpeg' || k === 'png' || k === 'webp' ? undefined : v,
  ).replaceAll('{}', 'ImageData')

  const writeDefinition = fs.promises.writeFile(
    outDir + '/data.d.ts',
    dtsHeader + '\nexport default ' + typesInfoObject,
  )

  return Promise.all([writeFile, writeDefinition])
}

function processFiles(options: ImageOptions) {
  console.log('Starting image processing')

  fs.mkdirSync(options.outDir, { recursive: true })
  const files = glob.sync(options.pattern || options.dir + '**/*.png')
  console.log(`${files.length} images to process`)
  proccessAmount += files.length

  const infoObject = {}

  work.push(...files.flatMap((image) => processImage(image, options, infoObject)))

  work.push(makeInfoFile(options.outDir, infoObject))
}

export function processImages() {
  imageOptions.forEach(processFiles)

  Promise.all(work)
    .then(() => console.log('Image processing done'))
    .catch((err) => console.error('Image processing failed: ', err))
}

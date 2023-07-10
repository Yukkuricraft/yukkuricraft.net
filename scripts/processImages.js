/* eslint-disable no-console */
const fs = require('fs')
const path = require('path')
const sharp = require('sharp')
const glob = require('glob')
const imageOptions = require('./images')

const work = []
let processed = 0
let proccessAmount = 0

function addInfoToObject(file, sizeName, size, minWidth, queryOptions, extension, outputFile, outDir, obj) {
  const pathParts = file.replaceAll('\\', '/').split('/')
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

async function processImage(image, globalOptions, infoObject) {
  const file = path.parse(path.relative(globalOptions.dir, image))
  const outputFileBase = globalOptions.outDir + file.dir + '/' + file.name
  fs.mkdirSync(globalOptions.outDir + file.dir, { recursive: true })

  function callIfFunction(val) {
    return typeof val === 'function' ? val(image) : val
  }

  function getQuality(options) {
    return callIfFunction(options.quality || globalOptions.quality)
  }

  function types(options) {
    const quality = getQuality(options)

    return typeof quality === 'object' ? Object.keys(quality) : [quality === true ? 'png' : 'jpeg', 'webp']
  }

  function base(type, options) {
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
      for (const type of types(sizeOptions)) {
        const outputFile = outputFileBase + (sizeName !== '' ? '_' : '') + sizeName + '.' + type
        res.push(
          base(type, sizeOptions)
            .resize(callIfFunction(sizeOptions.size) || sizeOptions)
            .toFile(outputFile),
        )

        addInfoToObject(
          file.dir + '/' + file.name,
          sizeName,
          sizeOptions.size,
          sizeOptions.minWidth,
          sizeOptions.queryOptions,
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

function makeInfoFile(outDir, infoObject) {
  const importRegex = /"import\(\\"([^)]+)\\"\)"/gm
  let ids = 0
  const imports = []

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

function processFiles(options) {
  console.log('Starting image processing')

  fs.mkdirSync(options.outDir, { recursive: true })
  const files = glob.sync(options.pattern || options.dir + '**/*.png')
  console.log(`${files.length} images to process`)
  proccessAmount += files.length

  const infoObject = {}

  work.push(...files.flatMap((image) => processImage(image, options, infoObject)))

  work.push(makeInfoFile(options.outDir, infoObject))
}

module.exports = function () {
  imageOptions.forEach(processFiles)

  Promise.all(work)
    .then(() => console.log('Image processing done'))
    .catch((err) => console.error('Image processing failed: ', err))
}

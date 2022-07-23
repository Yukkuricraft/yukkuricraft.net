/* eslint-disable no-console */
const fs = require('fs')
const path = require('path')
const sharp = require('sharp')
const glob = require('glob')
const imageOptions = require('./images')

const work = []
let processed = 0
let proccessAmount = 0

async function processImage(image, globalOptions) {
  const file = path.parse(path.relative(globalOptions.dir, image))
  const outputFile = globalOptions.outDir + file.dir + '/' + file.name
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

  let res
  if (globalOptions.sizes) {
    res = Object.entries(globalOptions.sizes).flatMap(([name, options]) =>
      types(options).map((type) =>
        base(type, options)
          .resize(callIfFunction(options.size) || options)
          .toFile(outputFile + (name !== '' ? '_' : '') + name + '.' + type)
      )
    )
  } else {
    res = types({}).map((type) => base(type, {}).toFile(outputFile + '.' + type))
  }
  const ret = await Promise.all(res)

  processed++

  if (processed % 10 === 0 || processed === proccessAmount) {
    console.log(`Processed ${processed}/${proccessAmount} images`)
  }

  return ret
}

function processFiles(options) {
  console.log('Starting image processing')

  fs.mkdirSync(options.outDir, { recursive: true })
  const files = glob.sync(options.pattern || options.dir + '**/*.png')
  console.log(`${files.length} images to process`)
  proccessAmount += files.length

  work.push(...files.flatMap((image) => processImage(image, options)))
}

module.exports = function () {
  imageOptions.forEach(processFiles)

  Promise.all(work)
    .then(() => console.log('Image processing done'))
    .catch((err) => console.error('Image processing failed: ', err))
}

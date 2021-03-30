import { groupBy } from 'lodash'
import { isPrerender } from './prerender'

const addedPreload = []

function addPreload(href, mimeType, media, onLoad) {
  if (addedPreload.includes(href)) {
    return
  }
  addedPreload.push(href)

  const preload = document.createElement('link')
  preload.href = href
  preload.rel = 'preload'
  preload.as = 'image'
  preload.type = mimeType
  preload.media = media
  preload.onload = onLoad
  document.head.appendChild(preload)
}

export function makeImage(big, bigWebp, small, smallWebp, preload) {
  const res = {
    highRes: big,
    highResWebp: bigWebp,
    lowRes: small,
    lowResWebp: smallWebp,
    loaded: false,
  }

  if (preload) {
    // Check explicitly for undefined in case info isn't around yet
    if (typeof Modernizr.webp === 'undefined' || isPrerender) {
      addPreload(bigWebp, 'image/webp')
      addPreload(big, 'image/jpeg')
    } else if (Modernizr.webp) {
      addPreload(bigWebp, 'image/webp', undefined, () => (res.loaded = true))
    } else if (!Modernizr.webp) {
      addPreload(big, 'image/jpeg', undefined, () => (res.loaded = true))
    }
  }

  return res
}

function typeToMimeType(type) {
  switch (type) {
    case 'avif':
      return 'image/avif'

    case 'gif':
      return 'image/gif'

    case 'jpg':
    case 'jpeg':
      return 'image/jpeg'

    case 'png':
      return 'image/png'

    case 'svg':
      return 'image/svg+xml'

    case 'webp':
      return 'image/webp'

    default:
      return 'image/' + type
  }
}

function typeToWeight(type) {
  switch (type) {
    case 'image/avif':
      return 15

    case 'image/gif':
      return 1

    case 'image/jpeg':
      return 3

    case 'image/png':
      return 5

    case 'image/svg+xml':
      return 25

    case 'image/webp':
      return 10

    default:
      return 3
  }
}

function typeFromName(name) {
  return name.substring(name.lastIndexOf('.') + 1)
}

export function makeImage2(preload, dataPlaceholder, ...images) {
  const smallestImage = images.sort((a, b) => a.size - b.size)[0]
  const typeImageGroups = Object.entries(groupBy(images, (image) => typeToMimeType(typeFromName(image.name)))).sort(
    (a, b) => typeToWeight(b[0]) - typeToWeight(a[0])
  )

  const res = {
    sources: Object.fromEntries(
      typeImageGroups.map(([type, typeImages]) => {
        const sortedImages = typeImages.sort((a, b) => b.size - a.size)

        return [
          type,
          {
            srcset: sortedImages.map((image) => `${image.name} ${image.size}w`).join(', '),
            sizes: sortedImages
              .map((image) => (image.minWidth ? `(min-width: ${image.minWidth}px) ${image.size}px` : `${image.size}px`))
              .join(', '),
          },
        ]
      })
    ),
    src: dataPlaceholder ?? smallestImage.name,
    dataPlaceholder,
  }

  if (preload) {
    for (const [type, typeImages] of typeImageGroups) {
      const sortedImages = typeImages.sort((a, b) => b.minWidth - a.minWidth)

      for (let i = 0; i < sortedImages.length; i++) {
        const image = sortedImages[i]

        if (
          typeof Modernizr.webp !== 'undefined' &&
          ((Modernizr.webp && type !== 'image/webp') || (!Modernizr.webp && type === 'image/webp'))
        ) {
          continue
        }

        const prevImage = i - 1 >= 0 ? sortedImages[i - 1] : null
        const minWidth = image.minWidth ? `(min-width: ${image.minWidth}px)` : ''
        const maxWidth = prevImage ? `(max-width: ${prevImage.minWidth - 1}px)` : ''

        let media
        if (minWidth && maxWidth) {
          media = `${minWidth} and ${maxWidth}`
        } else if (minWidth) {
          media = minWidth
        } else if (maxWidth) {
          media = maxWidth
        }

        addPreload(image.name, type, media)
      }
    }
  }

  return res
}

export function autoImage(name) {
  return Promise.all([
    import(/* webpackMode: "eager" */ `!url-loader!../generated/backgrounds/${name}_data.jpeg`),
    import(/* webpackMode: "eager" */ `!url-loader!../generated/backgrounds/${name}_data.webp`),
    import(/* webpackMode: "eager" */ `../generated/backgrounds/${name}.jpeg`),
    import(/* webpackMode: "eager" */ `../generated/backgrounds/${name}_lg.jpeg`),
    import(/* webpackMode: "eager" */ `../generated/backgrounds/${name}_md.jpeg`),
    import(/* webpackMode: "eager" */ `../generated/backgrounds/${name}_sm.jpeg`),
    import(/* webpackMode: "eager" */ `../generated/backgrounds/${name}_xs.jpeg`),
    import(/* webpackMode: "eager" */ `../generated/backgrounds/${name}.webp`),
    import(/* webpackMode: "eager" */ `../generated/backgrounds/${name}_lg.webp`),
    import(/* webpackMode: "eager" */ `../generated/backgrounds/${name}_md.webp`),
    import(/* webpackMode: "eager" */ `../generated/backgrounds/${name}_sm.webp`),
    import(/* webpackMode: "eager" */ `../generated/backgrounds/${name}_xs.webp`),
  ]).then(([dataJpeg, dataWebp, xlJpeg, lgJpeg, mdJpeg, smJpeg, xsJpeg, xlWebp, lgWebp, mdWebp, smWebp, xsWebp]) => {
    function image(name, size, minWidth) {
      return { name, size, minWidth }
    }

    let placeholder = dataJpeg

    // Check explicitly for undefined in case info isn't around yet
    if (!isPrerender && Modernizr.webp) {
      placeholder = dataWebp
    }

    return makeImage2(
      true,
      placeholder.default,
      image(xlJpeg.default, 1920, 1201),
      image(lgJpeg.default, 1200, 993),
      image(mdJpeg.default, 992, 769),
      image(smJpeg.default, 768, 577),
      image(xsJpeg.default, 576),
      image(xlWebp.default, 1920, 1201),
      image(lgWebp.default, 1200, 993),
      image(mdWebp.default, 992, 769),
      image(smWebp.default, 768, 577),
      image(xsWebp.default, 576)
    )
  })
}

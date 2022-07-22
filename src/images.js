import groupBy from 'lodash/groupBy'
import { isPrerender } from './prerender'
import { removeExtension } from './files'

const addedPreload = []

function addPreload(href, mimeType, media, onLoad) {
  // Document check for SSR
  if (addedPreload.includes(href) || typeof document === 'undefined') {
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

export function makeImage(big, bigWebp, small, smallWebp) {
  return {
    highRes: big,
    highResWebp: bigWebp,
    lowRes: small,
    lowResWebp: smallWebp,
    loaded: false,
  }
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
          !isPrerender &&
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

export function autoImage(name, dataJpeg, dataWebp) {
  return Promise.all([
    dataJpeg,
    dataWebp,
    import(`../generated/backgrounds/${name}.jpeg`),
    import(`../generated/backgrounds/${name}_lg.jpeg`),
    import(`../generated/backgrounds/${name}_md.jpeg`),
    import(`../generated/backgrounds/${name}_sm.jpeg`),
    import(`../generated/backgrounds/${name}_xs.jpeg`),
    import(`../generated/backgrounds/${name}.webp`),
    import(`../generated/backgrounds/${name}_lg.webp`),
    import(`../generated/backgrounds/${name}_md.webp`),
    import(`../generated/backgrounds/${name}_sm.webp`),
    import(`../generated/backgrounds/${name}_xs.webp`),
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
      placeholder?.default,
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

export async function staffAvatar(contentAvatarFile, shownSize = 192) {
  const fileName = removeExtension(contentAvatarFile, '.png')

  const formats = ['png', 'webp']
  const sizes = [
    ['', 192],
    ['_normal', 96],
    ['_author', 64],
    ['_icon', 32],
  ]

  const allSources = Object.fromEntries(
    await Promise.all(
      formats.map(async (format) => {
        const srcs = await Promise.all(
          sizes.map(async (size) => {
            const res = await import(`../generated/avatars/${fileName}${size[0]}.${format}`)
            return {
              file: res.default,
              size: size[1],
              srcset: `${res.default} ${size[1] / shownSize}x`,
            }
          })
        )

        return [typeToMimeType(format), srcs]
      })
    )
  )

  function closestToBy(arr, by, target) {
    return arr.sort((a, b) => Math.abs(target - by(a)) - Math.abs(target - by(b)))[0]
  }

  const pngSources = allSources[typeToMimeType('png')]

  return {
    srcsets: Object.fromEntries(Object.entries(allSources).map(([k, v]) => [k, v.map((o) => o.srcset).join(', ')])),
    default: closestToBy(pngSources, (a) => a.size, shownSize).file,
  }
}

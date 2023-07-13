import groupBy from 'lodash/groupBy'

import staffAvatars from '../generated/avatars/data'
import backgrounds from '../generated/backgrounds/data'
import faviconUpscaledI from '@/favicon_upscaled.png'

import { isPrerender } from '@/prerender'
import { removeExtension } from '@/files'

const addedPreload: string[] = []

export const faviconUpscaled = faviconUpscaledI

export type BackgroundKeys = keyof typeof backgrounds

interface ImageExtensionData {
  filename: string
  size?: number
  minWidth?: number
}
interface ImageData {
  jpeg?: ImageExtensionData
  png?: ImageExtensionData
  webp: ImageExtensionData
}

function nonWebpImageExtensionData(data: ImageData): [string, ImageExtensionData] {
  if (!data) {
    return ['unknown', data]
  }

  if (data.jpeg) {
    return ['jpeg', data.jpeg]
  } else {
    return ['png', data.png as ImageExtensionData]
  }
}

export type NestedImageData = { [k: string]: NestedImageData | ImageData }
export type SingleNestedImageData = { [k: string]: ImageData }

function addPreload(href: string, mimeType: string, media?: string, onLoad?: (ev: Event) => void) {
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
  if (media) {
    preload.media = media
  }
  if (onLoad) {
    preload.onload = onLoad
  }
  document.head.appendChild(preload)
}

export interface ImageWithThumbnails {
  highRes: string
  highResWebp: string
  lowRes: string
  lowResWebp: string
  loaded: boolean
}

export function makeImageWithThumbnails<A extends SingleNestedImageData>(
  obj: A,
  largeKey: keyof A = '',
  thumbnailKey: keyof A = 'thumbnail',
): ImageWithThumbnails {
  return {
    highRes: nonWebpImageExtensionData(obj[largeKey])[1].filename,
    highResWebp: obj[largeKey].webp.filename,
    lowRes: nonWebpImageExtensionData(obj[thumbnailKey])[1].filename,
    lowResWebp: obj[thumbnailKey].webp.filename,
    loaded: false,
  }
}

function typeToMimeType(type: string) {
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

function mimeTypeToWeight(type: string) {
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

function typeFromName(name: string) {
  return name.substring(name.lastIndexOf('.') + 1)
}

export interface ImageInfo {
  name: string
  size: number
  minWidth?: number
}

export interface ImageForPicture {
  dataPlaceholder?: string
  sources: {
    [type: string]: {
      srcset: string
      sizes: string
    }
  }
  src: string
}

export function makeImageForPicture(
  preload: boolean,
  dataPlaceholder?: string,
  ...images: ImageInfo[]
): ImageForPicture {
  const smallestImage = images.sort((a, b) => a.size - b.size)[0]
  const typeImageGroups = Object.entries(groupBy(images, (image) => typeToMimeType(typeFromName(image.name)))).sort(
    (a, b) => mimeTypeToWeight(b[0]) - mimeTypeToWeight(a[0]),
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
      }),
    ),
    src: dataPlaceholder ?? smallestImage.name,
    dataPlaceholder,
  }

  if (preload) {
    for (const [type, typeImages] of typeImageGroups) {
      const sortedImages = typeImages.sort((a, b) => (b.minWidth as number) - (a.minWidth as number))

      for (let i = 0; i < sortedImages.length; i++) {
        const image = sortedImages[i]

        if (
          !isPrerender &&
          typeof Modernizr !== 'undefined' &&
          typeof Modernizr.webp !== 'undefined' &&
          ((Modernizr.webp && type !== 'image/webp') || (!Modernizr.webp && type === 'image/webp'))
        ) {
          continue
        }

        const prevImage = i - 1 >= 0 ? sortedImages[i - 1] : null
        const minWidth = image.minWidth ? `(min-width: ${image.minWidth}px)` : ''
        const maxWidth = prevImage ? `(max-width: ${(prevImage.minWidth as number) - 1}px)` : ''

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

export function autoImage<A extends SingleNestedImageData>(obj: A) {
  function image(name: string, size: number, minWidth?: number) {
    return { name, size, minWidth }
  }

  function definedOrError<A>(a: A | undefined, name: string): A {
    if (typeof a === 'undefined') {
      throw new Error(`Expected known ${name}`)
    }

    return a
  }

  let placeholder = nonWebpImageExtensionData(obj.data)[1]?.filename
  // Check explicitly for undefined in case info isn't around yet
  if (!isPrerender && typeof Modernizr !== 'undefined' && Modernizr?.webp) {
    placeholder = obj.data.webp?.filename
  }

  const images = Object.entries(obj)
    .filter(([k]) => k !== 'data')
    .flatMap(([, v]) => [nonWebpImageExtensionData(v)[1], v.webp])
    .map((v) => image(v.filename, definedOrError(v.size, 'size'), v.minWidth))

  return makeImageForPicture(true, placeholder, ...images)
}

export function backgroundImage(key: BackgroundKeys | string[]): ImageForPicture {
  if (Array.isArray(key)) {
    const copy = [...key]

    // @ts-ignore
    let obj = backgrounds as NestedImageData

    while (copy.length) {
      obj = obj[copy.shift() as string] as NestedImageData
    }

    return autoImage(obj as SingleNestedImageData)
  } else {
    // @ts-ignore
    return autoImage(backgrounds[key] as SingleNestedImageData)
  }
}

export function staffAvatar(contentAvatarFile: string, shownSize = 192): { default: string; srcsets: { [p: string]: string } } {
  // @ts-ignore
  const avatar = staffAvatars[removeExtension(contentAvatarFile, '.png')] as SingleNestedImageData

  const sources = Object.values(avatar)
    .flatMap<[string, ImageExtensionData]>((images) => [
      ['png', images.png as ImageExtensionData],
      ['webp', images.webp],
    ])
    .map(([tpe, img]) => ({
      file: img.filename,
      size: img.size as number,
      srcset: `${img.filename} ${(img.size as number) / shownSize}x`,
      mimeType: typeToMimeType(tpe),
    }))

  const groupedSources: { [mimeType: string]: { file: string; size: number; srcset: string }[] } = groupBy(
    sources,
    (o) => o.mimeType,
  )

  function closestToBy<A>(arr: A[], by: (elem: A) => number, target: number) {
    return arr.sort((a, b) => Math.abs(target - by(a)) - Math.abs(target - by(b)))[0]
  }

  const pngSources = groupedSources[typeToMimeType('png')]

  return {
    srcsets: Object.fromEntries(Object.entries(groupedSources).map(([k, v]) => [k, v.map((o) => o.srcset).join(', ')])),
    default: closestToBy(pngSources, (a) => a.size, shownSize).file,
  }
}

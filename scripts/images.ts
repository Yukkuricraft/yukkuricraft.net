export type Qualities = { [extension: string]: number }

export interface Size {
  size: number
  quality: number | Qualities
  minWidth?: number
  queryOptions?: string
}

export interface ImageOptions {
  dir?: string
  pattern?: string
  outDir: string
  sizes: { [sizeName: string]: Size | number }
  quality?: number | true
}

const backgroundOptions: ImageOptions = {
  dir: './content/images/backgrounds/',
  outDir: './generated/backgrounds/',
  sizes: {
    '': { size: 1920, quality: 60, minWidth: 1201 },
    lg: { size: 1200, quality: 65, minWidth: 993 },
    md: { size: 992, quality: 70, minWidth: 769 },
    sm: { size: 768, quality: 75, minWidth: 565 },
    xs: { size: 576, quality: 80 },
    data: {
      size: 1920 / 8,
      quality: {
        webp: 1,
        jpeg: 7,
      },
      queryOptions: 'inline',
    },
  },
}

const buildOptions: ImageOptions = {
  dir: './content/images/locations/',
  outDir: './generated/builds/',
  sizes: {
    '': { size: 1920, quality: 60 },
    thumbnail: { size: 1920 / 3, quality: 50 },
  },
}

const avatarOptions: ImageOptions = {
  dir: './content/images/avatars/',
  outDir: './generated/avatars/',
  sizes: { '': 192, normal: 96, author: 64, icon: 32 },
  quality: true,
}

export default [backgroundOptions, buildOptions, avatarOptions] as ImageOptions[]

import { faviconUpscaled } from '@/images'

export { faviconUpscaled } from '@/images'

export function makeMeta({
  title,
  description,
  image,
  url,
}: {
  title: string
  description: string
  image?: string
  url: string | null
}) {
  const fullUrl = !url || url.startsWith('http') ? url : 'https://yukkuricraft.net/' + url

  return {
    title,
    description,
    og: {
      title,
      description,
      image: image ?? faviconUpscaled,
      url: fullUrl,
    },
    link: {
      rel: 'canonical',
      href: fullUrl
    }
  }
}

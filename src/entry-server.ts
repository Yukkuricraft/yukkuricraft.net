import { basename } from 'node:path'
import { renderToString, type SSRContext } from 'vue/server-renderer'
import { renderSSRHead, type SSRHeadPayload } from '@unhead/ssr'
import { createYcApp } from '@/app'

export async function render(url: string, manifest: {[k: string]: string[]}): Promise<[string, string, SSRHeadPayload]> {
  const { app, router, head } = createYcApp()

  await router.push(url)
  await router.isReady()

  const ctx: SSRContext = {}
  const html = await renderToString(app, ctx)
  const headPayload = await renderSSRHead(head)

  const preloadLinks = renderPreloadLinks(ctx.modules, manifest)
  return [html, preloadLinks, headPayload]
}

function renderPreloadLinks(modules: string[], manifest: {[k: string]: string[]}) {
  let links = ''
  const seen = new Set()
  modules.forEach((id) => {
    const files: string[] | undefined = manifest[id]
    if (files) {
      files.forEach((file) => {
        if (!seen.has(file)) {
          seen.add(file)
          const filename = basename(file)
          if (manifest[filename]) {
            for (const depFile of manifest[filename]) {
              links += renderPreloadLink(depFile)
              seen.add(depFile)
            }
          }
          links += renderPreloadLink(file)
        }
      })
    }
  })
  return links
}

function renderPreloadLink(file: string) {
  if (file.endsWith('.js')) {
    return `<link rel="modulepreload" crossorigin href="${file}">`
  } else if (file.endsWith('.css')) {
    return `<link rel="stylesheet" href="${file}">`
  } else if (file.endsWith('.woff')) {
    return ` <link rel="preload" href="${file}" as="font" type="font/woff" crossorigin>`
  } else if (file.endsWith('.woff2')) {
    return ` <link rel="preload" href="${file}" as="font" type="font/woff2" crossorigin>`
  } else if (file.endsWith('.gif')) {
    return ` <link rel="preload" href="${file}" as="image" type="image/gif">`
  } else if (file.endsWith('.jpg') || file.endsWith('.jpeg')) {
    return ` <link rel="preload" href="${file}" as="image" type="image/jpeg">`
  } else if (file.endsWith('.png')) {
    return ` <link rel="preload" href="${file}" as="image" type="image/png">`
  } else if (file.endsWith('.webp')) {
    return ` <link rel="preload" href="${file}" as="image" type="image/webp">`
  } else {
    // eslint-disable-next-line no-console
    console.warn("Tried to render file but don't know how: " + file)
  }
}

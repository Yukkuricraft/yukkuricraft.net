export const isPrerender =
  import.meta.env.srr || typeof window !== 'undefined'
    ? window.__PRERENDER_INJECTED && window.__PRERENDER_INJECTED.prerendered
    : true

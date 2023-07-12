export const isPrerender =
  typeof window !== 'undefined' ? window.__PRERENDER_INJECTED && window.__PRERENDER_INJECTED.prerendered : true

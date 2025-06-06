/// <reference types="vite/client" />

declare module '*.md' {
  // "unknown" would be more detailed depends on how you structure frontmatter
  const attributes: Record<string, unknown>;

  // When "Mode.Vue" is requested
  import { ComponentOptions, Component } from 'vue';
  const VueComponent: ComponentOptions;
  const VueComponentWith: (components: Record<string, Component>) => ComponentOptions;

  // Modify below per your usage
  export { attributes, VueComponent, VueComponentWith };
}

declare namespace Modernizr {
  const webp: boolean
}

declare namespace __PRERENDER_INJECTED {
  const prerendered: boolean
}

declare namespace CSS {
  function escape(str: string): string
}

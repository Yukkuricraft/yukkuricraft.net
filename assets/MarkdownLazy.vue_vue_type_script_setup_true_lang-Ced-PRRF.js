import{b as r,_ as i}from"./index-rARm-9aJ.js";import{r as a,o as t,a as c,e as s,f as _,d as m,c as p,u as d,a7 as f}from"./vendor-CerZGVum.js";const l={};function u(n,e){const o=a("font-awesome-icon");return t(),c("div",null,[s(o,{icon:["fas","spinner"],spin:"",size:"3x"}),_(" Loading")])}const g=r(l,[["render",u]]),x={};function h(n,e){const o=a("font-awesome-icon");return t(),c("div",null,[s(o,{class:"text-danger",icon:["fas","times"]}),_(" Error loading content")])}const w=r(x,[["render",h]]),E=m({__name:"MarkdownLazy",props:{content:{type:String,required:!0},noParagraph:Boolean},setup(n){const e=f({loader:()=>i(()=>import("./MarkdownNow-B5wUB9Ff.js"),__vite__mapDeps([0,1,2])),loadingComponent:g,errorComponent:w});return(o,C)=>(t(),p(d(e),{content:n.content,"no-paragraph":n.noParagraph},null,8,["content","no-paragraph"]))}});export{E as _};
function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = ["assets/MarkdownNow-B5wUB9Ff.js","assets/vendor_markdown-it-BETRKyzB.js","assets/vendor-CerZGVum.js"]
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}

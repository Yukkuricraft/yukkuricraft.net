import{b as r,_ as i}from"./index-8d1cf0bd.js";import{r as a,o as t,b as c,f as s,h as _,d as m,c as p,u as d,aa as f}from"./vendor-d69100bd.js";const l={};function u(n,e){const o=a("font-awesome-icon");return t(),c("div",null,[s(o,{icon:["fas","spinner"],spin:"",size:"3x"}),_(" Loading")])}const g=r(l,[["render",u]]),x={};function h(n,e){const o=a("font-awesome-icon");return t(),c("div",null,[s(o,{class:"text-danger",icon:["fas","times"]}),_(" Error loading content")])}const w=r(x,[["render",h]]),E=m({__name:"MarkdownLazy",props:{content:{type:String,required:!0},noParagraph:Boolean},setup(n){const e=f({loader:()=>i(()=>import("./MarkdownNow-315defea.js"),["assets/MarkdownNow-315defea.js","assets/index-8d1cf0bd.js","assets/vendor-d69100bd.js","assets/avatar_image_data-f8496361.js","assets/backgrounds_image_data-9e0b9552.js","assets/css/index-35194131.css","assets/vendor_markdown-it-f4efe675.js"]),loadingComponent:g,errorComponent:w});return(o,C)=>(t(),p(d(e),{content:n.content,"no-paragraph":n.noParagraph},null,8,["content","no-paragraph"]))}});export{E as _};
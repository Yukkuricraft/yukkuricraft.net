import{_ as p}from"./index-bd48315c.js";import{m as c,p as a}from"./vendor_markdown-it-447111d1.js";import{d as l,p as d,q as f,C as u,o as _,b as h}from"./vendor-db3ee99c.js";import"./avatar_image_data-f8496361.js";import"./backgrounds_image_data-be54ef9f.js";const g=["innerHTML"],L=l({__name:"MarkdownNow",props:{content:{type:String,required:!0},noParagraph:Boolean},setup(i){const s=i,m=c({linkify:!0,typographer:!0}).use(a,{slugify(r){return String(r).trim().toLowerCase().replace(/\s+/g,"-")},permalink:a.permalink.ariaHidden({placement:"before",symbol:'<i class="fas fa-link" style="font-size: 0.5em"></i>'})}),n=d(()=>m.render(s.content)),o=f(n.value);return u(n,r=>{const t=e=>{e.children.length===1&&(o.value=e.children[0].innerHTML)};if(typeof window>"u")p(()=>import("./api-b05eafb6.js").then(e=>e.a),["assets/api-b05eafb6.js","assets/vendor-db3ee99c.js","assets/vendor_markdown-it-447111d1.js"]).then(e=>{t(e.JSDOM.fragment(r))});else{const e=new DOMParser;t(e.parseFromString(r,"text/html").body)}},{immediate:!0}),(r,t)=>(_(),h("div",{class:"markdown-formatting",innerHTML:o.value},null,8,g))}});export{L as default};
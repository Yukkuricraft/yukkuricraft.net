import{d as u,l as p,k as t,z as d,Z as f,a8 as k,r as _,o,a as v,h as C,c as r,aj as w}from"./vendor-CerZGVum.js";import{m as y}from"./index-CpaH6ifF.js";import"./avatar_image_data-DsWJgBA6.js";import"./backgrounds_image_data-BbQ16IpF.js";const g={class:"markdown-formatting"},b=u({__name:"MarkdownPage",props:{content:{type:Function,required:!0},canonicalUrl:{type:String,required:!0},parallaxImagesName:String},setup(s){const n=s,e=p(),c=t(()=>e.value?.attributes?.title||""),i=t(()=>e.value?.attributes?.description||"");d(y({title:t(()=>"YukkuriCraft - "+c.value),description:i,url:t(()=>n.canonicalUrl)})),f(()=>n.content,()=>{a()},{immediate:!0}),k(()=>a());async function a(){e.value=await n.content()}return(l,h)=>{const m=_("font-awesome-icon");return o(),v("main",g,[C(l.$slots,"default"),e.value?(o(),r(w(e.value.VueComponent),{key:0})):(o(),r(m,{key:1,icon:["fas","spinner"],spin:"",size:"6x"}))])}}});export{b as default};
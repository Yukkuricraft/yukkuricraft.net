import{m as I,_ as v}from"./index-25bc1830.js";import{ab as rr,ac as er,a1 as nr,ad as tr,ae as ar,af as cr,ag as ir,ah as L,ai as or,a as sr,d as j,p as P,o as m,b as p,l as h,t as T,f as _,r as ur,w as D,h as dr,c as C,A as fr,F as S,e as O,q as N,E as mr,a2 as lr,aj as gr,D as yr,u as B,ak as pr,al as hr}from"./vendor-d69100bd.js";import{m as Fr}from"./merge-9a4012cd.js";import{_ as R}from"./MarkdownLazy.vue_vue_type_script_setup_true_lang-7d877d0d.js";import{_ as _r}from"./ConfigurableHeading.vue_vue_type_script_setup_true_lang-3a49c95b.js";import"./avatar_image_data-f8496361.js";import"./backgrounds_image_data-9e0b9552.js";import"./_isIterateeCall-9158a7a9.js";const z="%[a-f0-9]{2}",U=new RegExp("("+z+")|([^%]+?)","gi"),k=new RegExp("("+z+")+","gi");function w(r,e){try{return[decodeURIComponent(r.join(""))]}catch{}if(r.length===1)return r;e=e||1;const n=r.slice(0,e),t=r.slice(e);return Array.prototype.concat.call([],w(n),w(t))}function br(r){try{return decodeURIComponent(r)}catch{let e=r.match(U)||[];for(let n=1;n<e.length;n++)r=w(e,n).join(""),e=r.match(U)||[];return r}}function Sr(r){const e={"%FE%FF":"��","%FF%FE":"��"};let n=k.exec(r);for(;n;){try{e[n[0]]=decodeURIComponent(n[0])}catch{const a=br(n[0]);a!==n[0]&&(e[n[0]]=a)}n=k.exec(r)}e["%C2"]="�";const t=Object.keys(e);for(const a of t)r=r.replace(new RegExp(a,"g"),e[a]);return r}function Ar(r){if(typeof r!="string")throw new TypeError("Expected `encodedURI` to be of type `string`, got `"+typeof r+"`");try{return decodeURIComponent(r)}catch{return Sr(r)}}function H(r,e){if(!(typeof r=="string"&&typeof e=="string"))throw new TypeError("Expected the arguments to be of type `string`");if(r===""||e==="")return[];const n=r.indexOf(e);return n===-1?[]:[r.slice(0,n),r.slice(n+e.length)]}function Cr(r,e){const n={};if(Array.isArray(e))for(const t of e){const a=Object.getOwnPropertyDescriptor(r,t);a?.enumerable&&Object.defineProperty(n,t,a)}else for(const t of Reflect.ownKeys(r)){const a=Object.getOwnPropertyDescriptor(r,t);if(a.enumerable){const i=r[t];e(t,i,r)&&Object.defineProperty(n,t,a)}}return n}const Or=r=>r==null,wr=r=>encodeURIComponent(r).replace(/[!'()*]/g,e=>`%${e.charCodeAt(0).toString(16).toUpperCase()}`),x=Symbol("encodeFragmentIdentifier");function xr(r){switch(r.arrayFormat){case"index":return e=>(n,t)=>{const a=n.length;return t===void 0||r.skipNull&&t===null||r.skipEmptyString&&t===""?n:t===null?[...n,[u(e,r),"[",a,"]"].join("")]:[...n,[u(e,r),"[",u(a,r),"]=",u(t,r)].join("")]};case"bracket":return e=>(n,t)=>t===void 0||r.skipNull&&t===null||r.skipEmptyString&&t===""?n:t===null?[...n,[u(e,r),"[]"].join("")]:[...n,[u(e,r),"[]=",u(t,r)].join("")];case"colon-list-separator":return e=>(n,t)=>t===void 0||r.skipNull&&t===null||r.skipEmptyString&&t===""?n:t===null?[...n,[u(e,r),":list="].join("")]:[...n,[u(e,r),":list=",u(t,r)].join("")];case"comma":case"separator":case"bracket-separator":{const e=r.arrayFormat==="bracket-separator"?"[]=":"=";return n=>(t,a)=>a===void 0||r.skipNull&&a===null||r.skipEmptyString&&a===""?t:(a=a===null?"":a,t.length===0?[[u(n,r),e,u(a,r)].join("")]:[[t,u(a,r)].join(r.arrayFormatSeparator)])}default:return e=>(n,t)=>t===void 0||r.skipNull&&t===null||r.skipEmptyString&&t===""?n:t===null?[...n,u(e,r)]:[...n,[u(e,r),"=",u(t,r)].join("")]}}function jr(r){let e;switch(r.arrayFormat){case"index":return(n,t,a)=>{if(e=/\[(\d*)]$/.exec(n),n=n.replace(/\[\d*]$/,""),!e){a[n]=t;return}a[n]===void 0&&(a[n]={}),a[n][e[1]]=t};case"bracket":return(n,t,a)=>{if(e=/(\[])$/.exec(n),n=n.replace(/\[]$/,""),!e){a[n]=t;return}if(a[n]===void 0){a[n]=[t];return}a[n]=[...a[n],t]};case"colon-list-separator":return(n,t,a)=>{if(e=/(:list)$/.exec(n),n=n.replace(/:list$/,""),!e){a[n]=t;return}if(a[n]===void 0){a[n]=[t];return}a[n]=[...a[n],t]};case"comma":case"separator":return(n,t,a)=>{const i=typeof t=="string"&&t.includes(r.arrayFormatSeparator),c=typeof t=="string"&&!i&&g(t,r).includes(r.arrayFormatSeparator);t=c?g(t,r):t;const o=i||c?t.split(r.arrayFormatSeparator).map(s=>g(s,r)):t===null?t:g(t,r);a[n]=o};case"bracket-separator":return(n,t,a)=>{const i=/(\[])$/.test(n);if(n=n.replace(/\[]$/,""),!i){a[n]=t&&g(t,r);return}const c=t===null?[]:t.split(r.arrayFormatSeparator).map(o=>g(o,r));if(a[n]===void 0){a[n]=c;return}a[n]=[...a[n],...c]};default:return(n,t,a)=>{if(a[n]===void 0){a[n]=t;return}a[n]=[...[a[n]].flat(),t]}}}function K(r){if(typeof r!="string"||r.length!==1)throw new TypeError("arrayFormatSeparator must be single character string")}function u(r,e){return e.encode?e.strict?wr(r):encodeURIComponent(r):r}function g(r,e){return e.decode?Ar(r):r}function Q(r){return Array.isArray(r)?r.sort():typeof r=="object"?Q(Object.keys(r)).sort((e,n)=>Number(e)-Number(n)).map(e=>r[e]):r}function Y(r){const e=r.indexOf("#");return e!==-1&&(r=r.slice(0,e)),r}function Er(r){let e="";const n=r.indexOf("#");return n!==-1&&(e=r.slice(n)),e}function M(r,e){return e.parseNumbers&&!Number.isNaN(Number(r))&&typeof r=="string"&&r.trim()!==""?r=Number(r):e.parseBooleans&&r!==null&&(r.toLowerCase()==="true"||r.toLowerCase()==="false")&&(r=r.toLowerCase()==="true"),r}function E(r){r=Y(r);const e=r.indexOf("?");return e===-1?"":r.slice(e+1)}function $(r,e){e={decode:!0,sort:!0,arrayFormat:"none",arrayFormatSeparator:",",parseNumbers:!1,parseBooleans:!1,...e},K(e.arrayFormatSeparator);const n=jr(e),t=Object.create(null);if(typeof r!="string"||(r=r.trim().replace(/^[?#&]/,""),!r))return t;for(const a of r.split("&")){if(a==="")continue;const i=e.decode?a.replace(/\+/g," "):a;let[c,o]=H(i,"=");c===void 0&&(c=i),o=o===void 0?null:["comma","separator","bracket-separator"].includes(e.arrayFormat)?o:g(o,e),n(g(c,e),o,t)}for(const[a,i]of Object.entries(t))if(typeof i=="object"&&i!==null)for(const[c,o]of Object.entries(i))i[c]=M(o,e);else t[a]=M(i,e);return e.sort===!1?t:(e.sort===!0?Object.keys(t).sort():Object.keys(t).sort(e.sort)).reduce((a,i)=>{const c=t[i];return c&&typeof c=="object"&&!Array.isArray(c)?a[i]=Q(c):a[i]=c,a},Object.create(null))}function J(r,e){if(!r)return"";e={encode:!0,strict:!0,arrayFormat:"none",arrayFormatSeparator:",",...e},K(e.arrayFormatSeparator);const n=c=>e.skipNull&&Or(r[c])||e.skipEmptyString&&r[c]==="",t=xr(e),a={};for(const[c,o]of Object.entries(r))n(c)||(a[c]=o);const i=Object.keys(a);return e.sort!==!1&&i.sort(e.sort),i.map(c=>{const o=r[c];return o===void 0?"":o===null?u(c,e):Array.isArray(o)?o.length===0&&e.arrayFormat==="bracket-separator"?u(c,e)+"[]":o.reduce(t(c),[]).join("&"):u(c,e)+"="+u(o,e)}).filter(c=>c.length>0).join("&")}function W(r,e){e={decode:!0,...e};let[n,t]=H(r,"#");return n===void 0&&(n=r),{url:n?.split("?")?.[0]??"",query:$(E(r),e),...e&&e.parseFragmentIdentifier&&t?{fragmentIdentifier:g(t,e)}:{}}}function X(r,e){e={encode:!0,strict:!0,[x]:!0,...e};const n=Y(r.url).split("?")[0]||"",t=E(r.url),a={...$(t,{sort:!1}),...r.query};let i=J(a,e);i&&(i=`?${i}`);let c=Er(r.url);if(r.fragmentIdentifier){const o=new URL(n);o.hash=r.fragmentIdentifier,c=e[x]?o.hash:`#${r.fragmentIdentifier}`}return`${n}${i}${c}`}function Z(r,e,n){n={parseFragmentIdentifier:!0,[x]:!1,...n};const{url:t,query:a,fragmentIdentifier:i}=W(r,n);return X({url:t,query:Cr(a,e),fragmentIdentifier:i},n)}function $r(r,e,n){const t=Array.isArray(e)?a=>!e.includes(a):(a,i)=>!e(a,i);return Z(r,t,n)}const V=Object.freeze(Object.defineProperty({__proto__:null,exclude:$r,extract:E,parse:$,parseUrl:W,pick:Z,stringify:J,stringifyUrl:X},Symbol.toStringTag,{value:"Module"}));var Nr=rr,Br=er;function Ur(r,e){var n=-1,t=Br(r)?Array(r.length):[];return Nr(r,function(a,i,c){t[++n]=e(a,i,c)}),t}var kr=Ur;function Mr(r,e){var n=r.length;for(r.sort(e);n--;)r[n]=r[n].value;return r}var Vr=Mr,q=nr;function qr(r,e){if(r!==e){var n=r!==void 0,t=r===null,a=r===r,i=q(r),c=e!==void 0,o=e===null,s=e===e,d=q(e);if(!o&&!d&&!i&&r>e||i&&c&&s&&!o&&!d||t&&c&&s||!n&&s||!a)return 1;if(!t&&!i&&!d&&r<e||d&&n&&a&&!t&&!i||o&&n&&a||!c&&a||!s)return-1}return 0}var Gr=qr,Lr=Gr;function Pr(r,e,n){for(var t=-1,a=r.criteria,i=e.criteria,c=a.length,o=n.length;++t<c;){var s=Lr(a[t],i[t]);if(s){if(t>=o)return s;var d=n[t];return s*(d=="desc"?-1:1)}}return r.index-e.index}var Tr=Pr,A=tr,Dr=cr,Rr=or,zr=kr,Hr=Vr,Kr=ir,Qr=Tr,Yr=ar,Jr=L;function Wr(r,e,n){e.length?e=A(e,function(i){return Jr(i)?function(c){return Dr(c,i.length===1?i[0]:i)}:i}):e=[Yr];var t=-1;e=A(e,Kr(Rr));var a=zr(r,function(i,c,o){var s=A(e,function(d){return d(i)});return{criteria:s,index:++t,value:i}});return Hr(a,function(i,c){return Qr(i,c,n)})}var Xr=Wr,Zr=Xr,G=L;function Ir(r,e,n,t){return r==null?[]:(G(e)||(e=e==null?[]:[e]),n=t?void 0:n,G(n)||(n=n==null?[]:[n]),Zr(r,e,n))}var vr=Ir;const re=sr(vr),ee={class:"command"},ne=j({__name:"CommandNode",props:{command:{type:Object,required:!0}},setup(r){const e=r,n=P(()=>{const t=e.command.aliases.join(" | "),a=typeof e.command.arguments<"u"?" "+e.command.arguments:"";return"/"+t+a});return(t,a)=>(m(),p("div",null,[h("strong",ee,T(n.value),1),_(R,{content:r.command.description},null,8,["content"])]))}}),te={key:2},ae=j({__name:"CommandGroup",props:{commandGroupId:{type:String,required:!0},commandGroupArg:{type:Object,required:!0},depth:{type:Number,required:!0}},setup(r){function e(n){return n}return(n,t)=>{const a=ur("command-group",!0);return m(),p("div",null,[_(_r,{id:"commands-"+r.commandGroupId,level:3+r.depth},{default:D(()=>[dr(T(r.commandGroupArg.displayName),1)]),_:1},8,["id","level"]),r.commandGroupArg.description?(m(),C(R,{key:0,content:r.commandGroupArg.description},null,8,["content"])):fr("",!0),"subgroups"in r.commandGroupArg?(m(!0),p(S,{key:1},O(r.commandGroupArg.subgroups,(i,c)=>(m(),C(a,{key:c,depth:r.depth+1,"command-group-id":c,"command-group-arg":i},null,8,["depth","command-group-id","command-group-arg"]))),128)):(m(),p("ul",te,[(m(!0),p(S,null,O(r.commandGroupArg.commands,i=>(m(),p("li",{key:i.aliases.join(" | ")+(i.arguments||"")},[_(ne,{command:i},null,8,["command"])]))),128))]))])}}}),ce=h("h2",{id:"commands"},"Command List",-1),ie={id:"commandsSection"},oe=h("p",{style:{"font-size":"18px",color:"#aaafad"}},' Arguments in "[" and "]" are optional. Arguments in "<" and ">" are required for the command to work! ',-1),se=h("p",{style:{"font-size":"12px",color:"#aaafad"}}," This is nowhere near a complete list of commands, just some of the basics! ",-1),ue=h("label",{for:"commandsSearch"},"Search:",-1),de={id:"commandGroups"},_e=j({__name:"CommandsPage",setup(r){function e(c){return c}const n=N(""),t=N({});async function a(){const c=await v(()=>import("./commandList-1e94d692.js"),[]).then(o=>o.default.map((s,d)=>({commands:s,idx:d})));t.value=Fr({},...re(c,"idx").map(o=>o.commands))}const i=P(()=>{function c(l){return l.toLowerCase().includes(n.value.toLowerCase())}function o(l){return l.aliases.some(c)||l.tags?.some(c)||c(l.description)}function s(l){function F(f){if(f&&"subgroups"in f){const y=d(f.subgroups);return Object.entries(y).length?{...f,subgroups:y}:null}else return f}function b(f){if(f&&"commands"in f){const y=f.commands.filter(o);return y.length?{...f,commands:y}:null}else return f}return b(F(l))}function d(l){const F={...l};return Object.entries(F).forEach(([b,f])=>{const y=s(f);y===null?delete F[b]:F[b]=y}),F}return n.value.length?d(t.value):t.value});return mr(async()=>{typeof location<"u"&&Object.entries(V.parse(location.search)).forEach(([c,o])=>{o&&!Array.isArray(o)&&c==="filter"&&(n.value=o)}),Object.entries(t.value).length===0&&await a()}),lr(n,(c,o)=>{if(c!==o){const s=V.stringify({filter:n.value?n.value:void 0}),d=s!==""?"?"+s:"/commands/";window.history.replaceState(null,"",d)}}),gr(()=>a()),yr(I({title:"YukkuriCraft - Commands",description:"Search through the commands found on YukkuriCraft.",url:"commands/"})),(c,o)=>(m(),p(S,null,[ce,h("div",ie,[oe,se,_(B(hr),null,{default:D(()=>[ue,_(B(pr),{id:"commandsSearch",modelValue:n.value,"onUpdate:modelValue":o[0]||(o[0]=s=>n.value=s),type:"text",placeholder:"Search commands..."},null,8,["modelValue"])]),_:1}),h("div",de,[(m(!0),p(S,null,O(i.value,(s,d)=>(m(),C(ae,{key:d,depth:0,"command-group-id":d,"command-group-arg":s},null,8,["command-group-id","command-group-arg"]))),128))])])],64))}});export{_e as default};
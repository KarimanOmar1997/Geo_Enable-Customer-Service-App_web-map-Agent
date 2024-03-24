/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.28/esri/copyright.txt for details.
*/
import{h as r}from"./handleUtils.js";import{clone as t}from"../core/lang.js";function n(r){return r.__accessor__??null}function e(r,t){return null!=r?.metadatas?.[t]}function a(r,t,n){return s(r,t,n?{policy:n,path:""}:null)}function s(r,n,e){return n?Object.keys(n).reduce(((r,a)=>{const i=a;let u=null,o="merge";if(e&&(u=e.path?`${e.path}.${a}`:a,o=e.policy(u)),"replace"===o)return r[i]=n[i],r;if("replace-arrays"===o&&Array.isArray(r[i]))return r[i]=n[i],r;if(void 0===r[i])return r[i]=t(n[i]),r;let c=r[i],l=n[i];if(c===l)return r;if(Array.isArray(l)||Array.isArray(r))c=c?Array.isArray(c)?r[i]=c.concat():r[i]=[c]:r[i]=[],l&&(Array.isArray(l)||(l=[l]),l.forEach((r=>{c.includes(r)||c.push(r)})));else if(l&&"object"==typeof l)if(e){const t=e.path;e.path=u,r[i]=s(c,l,e),e.path=t}else r[i]=s(c,l,null);else r.hasOwnProperty(a)&&!n.hasOwnProperty(a)||(r[i]=l);return r}),r||{}):r}function i(r){return Array.isArray(r)?r:r.split(".")}function u(r){return r.includes(",")?r.split(",").map((r=>r.trim())):[r.trim()]}function o(t,n,e,a){const s=function(r){if(Array.isArray(r)){const t=[];for(const n of r)t.push(...u(n));return t}return u(r)}(n);if(1!==s.length){const n=s.map((r=>a(t,r,e)));return r(n)}return a(t,s[0],e)}export{i as a,n as g,e as i,a as m,o as p};
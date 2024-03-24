/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.28/esri/copyright.txt for details.
*/
import{P as t,m as h,n as i}from"./typedArrayUtil.js";var s;!function(t){const h=(t,h,i,s)=>{let e=h,a=h;const l=i>>>1,n=t[e-1];for(;a<=l;){a=e<<1,a<i&&s(t[a-1],t[a])<0&&++a;const h=t[a-1];if(s(h,n)<=0)break;t[e-1]=h,e=a}t[e-1]=n},i=(t,h)=>t<h?-1:t>h?1:0;t.sort=function(t,s,e,a){void 0===s&&(s=0),void 0===e&&(e=t.length),void 0===a&&(a=i);for(let i=e>>>1;i>s;i--)h(t,i,e,a);const l=s+1;for(let i=e-1;i>s;i--){const e=t[s];t[s]=t[i],t[i]=e,h(t,l,i,a)}},t.iterableSort=function*(t,s,e,a){void 0===s&&(s=0),void 0===e&&(e=t.length),void 0===a&&(a=i);for(let i=e>>>1;i>s;i--)h(t,i,e,a),yield;const l=s+1;for(let i=e-1;i>s;i--){const e=t[s];t[s]=t[i],t[i]=e,h(t,l,i,a),yield}}}(s||(s={}));const e=s;class a{constructor(h){this.data=[],this._length=0,this._allocator=void 0,this._deallocator=()=>null,this._shrink=()=>{},this._hint=new t,h&&(h.initialSize&&(this.data=new Array(h.initialSize)),h.allocator&&(this._allocator=h.allocator),void 0!==h.deallocator&&(this._deallocator=h.deallocator),h.shrink&&(this._shrink=()=>l(this)))}toArray(){return this.data.slice(0,this.length)}filter(t){const h=new Array;for(let i=0;i<this._length;i++){const s=this.data[i];t(s)&&h.push(s)}return h}at(t){if((t=Math.trunc(t)||0)<0&&(t+=this._length),!(t<0||t>=this._length))return this.data[t]}includes(t,h){const i=this.data.indexOf(t,h);return-1!==i&&i<this.length}get length(){return this._length}set length(t){if(t>this._length){if(this._allocator){for(;this._length<t;)this.data[this._length++]=this._allocator(this.data[this._length]);return}this._length=t}else{if(this._deallocator)for(let h=t;h<this._length;++h)this.data[h]=this._deallocator(this.data[h]);this._length=t,this._shrink()}}clear(){this.length=0}prune(){this.clear(),this.data=[]}push(t){this.data[this._length++]=t}pushArray(t,h=t.length){for(let i=0;i<h;i++)this.data[this._length++]=t[i]}fill(t,h){for(let i=0;i<h;i++)this.data[this._length++]=t}pushNew(){this._allocator&&(this.data[this.length]=this._allocator(this.data[this.length]));const t=this.data[this._length];return++this._length,t}unshift(t){this.data.unshift(t),this._length++,l(this)}pop(){if(0===this.length)return;const t=this.data[this.length-1];return this.length=this.length-1,this._shrink(),t}remove(t){const i=h(this.data,t,this.length,this._hint);if(-1!==i)return this.data.splice(i,1),this.length=this.length-1,t}removeUnordered(t){return this.removeUnorderedIndex(h(this.data,t,this.length,this._hint))}removeUnorderedIndex(t){if(!(t>=this.length||t<0))return this.swapElements(t,this.length-1),this.pop()}removeUnorderedMany(t,h=t.length,s){this.length=i(this.data,t,this.length,h,this._hint,s),this._shrink()}front(){if(0!==this.length)return this.data[0]}back(){if(0!==this.length)return this.data[this.length-1]}swapElements(t,h){if(t>=this.length||h>=this.length||t===h)return;const i=this.data[t];this.data[t]=this.data[h],this.data[h]=i}sort(t){e.sort(this.data,0,this.length,t)}iterableSort(t){return e.iterableSort(this.data,0,this.length,t)}some(t,h){for(let i=0;i<this.length;++i)if(t.call(h,this.data[i],i,this.data))return!0;return!1}find(t,h){for(let i=0;i<this.length;++i){const s=this.data[i];if(t.call(h,s,i))return s}}filterInPlace(t,h){let i=0;for(let s=0;s<this._length;++s){const e=this.data[s];t.call(h,e,s,this.data)&&(this.data[s]=this.data[i],this.data[i]=e,i++)}if(this._deallocator)for(let t=i;t<this._length;t++)this.data[t]=this._deallocator(this.data[t]);return this._length=i,this._shrink(),this}forAll(t,h){const i=this.length,s=this.data;for(let e=0;e<i;++e)t.call(h,s[e],e,s)}forEach(t,h){for(let i=0;i<this.length;++i)t.call(h,this.data[i],i,this.data)}map(t,h){const i=new Array(this.length);for(let s=0;s<this.length;++s)i[s]=t.call(h,this.data[s],s,this.data);return i}reduce(t,h){let i=h;for(let h=0;h<this.length;++h)i=t(i,this.data[h],h,this.data);return i}has(t){const h=this.length,i=this.data;for(let s=0;s<h;++s)if(i[s]===t)return!0;return!1}}function l(t){t.data.length>1.5*t.length&&(t.data.length=Math.floor(1.1*t.length))}export{a as P};
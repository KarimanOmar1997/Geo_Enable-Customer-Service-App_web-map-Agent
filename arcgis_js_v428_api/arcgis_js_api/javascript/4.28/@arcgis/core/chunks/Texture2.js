/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.28/esri/copyright.txt for details.
*/
import{_ as e}from"./tslib.es6.js";import{I as t}from"./InstancedDoublePrecision.glsl.js";import{B as r}from"./ShaderBuilder.js";import{p as a}from"./ShaderTechniqueConfiguration.js";import{w as s,b as n}from"./typedArrayUtil.js";import i from"../core/Error.js";import o from"../core/Evented.js";import{f as l,r as m}from"./maybe.js";import{throwIfAborted as _,onAbort as h,createAbortError as d}from"../core/promiseUtils.js";import{isBlobProtocol as c,isDataProtocol as u}from"../core/urlUtils.js";import{r as p}from"./requestImageUtils.js";import{l as g}from"../request.js";import{T}from"./basicInterfaces.js";import{g as A}from"./assets.js";import{C as E,P as R,c as C,T as f}from"./enums3.js";import{a as B,g as G,T as D}from"./Texture.js";import{a as w,C as I}from"./ContentObject.js";import{L as M}from"./Logger.js";import{a as x}from"./Util.js";class y extends t{}let S;var P;e([a({constValue:!0})],y.prototype,"hasSliceHighlight",void 0),e([a({constValue:!1})],y.prototype,"hasSliceInVertexProgram",void 0),e([a({constValue:r.Pass})],y.prototype,"pbrTextureBindType",void 0),function(e){e[e.ETC1_RGB=0]="ETC1_RGB",e[e.ETC2_RGBA=1]="ETC2_RGBA",e[e.BC1_RGB=2]="BC1_RGB",e[e.BC3_RGBA=3]="BC3_RGBA",e[e.BC4_R=4]="BC4_R",e[e.BC5_RG=5]="BC5_RG",e[e.BC7_M6_RGB=6]="BC7_M6_RGB",e[e.BC7_M5_RGBA=7]="BC7_M5_RGBA",e[e.PVRTC1_4_RGB=8]="PVRTC1_4_RGB",e[e.PVRTC1_4_RGBA=9]="PVRTC1_4_RGBA",e[e.ASTC_4x4_RGBA=10]="ASTC_4x4_RGBA",e[e.ATC_RGB=11]="ATC_RGB",e[e.ATC_RGBA=12]="ATC_RGBA",e[e.FXT1_RGB=17]="FXT1_RGB",e[e.PVRTC2_4_RGB=18]="PVRTC2_4_RGB",e[e.PVRTC2_4_RGBA=19]="PVRTC2_4_RGBA",e[e.ETC2_EAC_R11=20]="ETC2_EAC_R11",e[e.ETC2_EAC_RG11=21]="ETC2_EAC_RG11",e[e.RGBA32=13]="RGBA32",e[e.RGB565=14]="RGB565",e[e.BGR565=15]="BGR565",e[e.RGBA4444=16]="RGBA4444"}(P||(P={}));let F=null,U=null;async function v(){return null==U&&(U=function(){if(null==S){const e=e=>A(`esri/libs/basisu/${e}`);S=import("./basis_transcoder.js").then((e=>e.b)).then((({default:t})=>t({locateFile:e}).then((e=>(e.initializeBasis(),delete e.then,e)))))}return S}(),F=await U),U}function L(e,t,r,a,s){const n=G(t?E.COMPRESSED_RGBA8_ETC2_EAC:E.COMPRESSED_RGB8_ETC2),i=s&&e>1?(4**e-1)/(3*4**(e-1)):1;return Math.ceil(r*a*n*i)}function H(e){return e.getNumImages()>=1&&!e.isUASTC()}function V(e){return e.getFaces()>=1&&e.isETC1S()}function N(e,t,r,a,s,n,i,o){const{compressedTextureETC:l,compressedTextureS3TC:m}=e.capabilities,[_,h]=l?a?[P.ETC2_RGBA,E.COMPRESSED_RGBA8_ETC2_EAC]:[P.ETC1_RGB,E.COMPRESSED_RGB8_ETC2]:m?a?[P.BC3_RGBA,E.COMPRESSED_RGBA_S3TC_DXT5_EXT]:[P.BC1_RGB,E.COMPRESSED_RGB_S3TC_DXT1_EXT]:[P.RGBA32,R.RGBA],d=t.hasMipmap?r:Math.min(1,r),c=[];for(let e=0;e<d;e++)c.push(new Uint8Array(i(e,_))),o(e,_,c[e]);return t.internalFormat=h,t.hasMipmap=c.length>1,t.samplingMode=t.hasMipmap?C.LINEAR_MIPMAP_LINEAR:C.LINEAR,t.width=s,t.height=n,new B(e,t,{type:"compressed",levels:c})}const b=M.getLogger("esri.views.3d.webgl-engine.lib.DDSUtil");function O(e){return e.charCodeAt(0)+(e.charCodeAt(1)<<8)+(e.charCodeAt(2)<<16)+(e.charCodeAt(3)<<24)}const j=O("DXT1"),X=O("DXT3"),k=O("DXT5");function K(e){return 16*Math.ceil(e/16)}function z(e,t){let r=e.width*e.height;if(r<4096)return e instanceof ImageData?q(e):e;let a=e.width,s=e.height;do{a=Math.ceil(a/2),s=Math.ceil(s/2),r=a*s}while(r>1048576||null!=t&&(a>t||s>t));return W(e,a,s)}function W(e,t,r){if(e instanceof ImageData)return W(q(e),t,r);const a=document.createElement("canvas");return a.width=t,a.height=r,a.getContext("2d").drawImage(e,0,0,a.width,a.height),a}function q(e){const t=document.createElement("canvas");t.width=e.width,t.height=e.height;const r=t.getContext("2d");if(null==r)throw new i("Failed to create 2d context from HTMLCanvasElement");return r.putImageData(e,0,0),t}class $ extends w{get parameters(){return this._parameters}constructor(e,t){super(),this._data=e,this.type=I.Texture,this._glTexture=null,this._loadingPromise=null,this._loadingController=null,this.events=new o,this._parameters={...Y,...t},this._startPreload(e)}dispose(){this.unload(),this._data=this.frameUpdate=void 0}_startPreload(e){null!=e&&(e instanceof HTMLVideoElement?(this.frameUpdate=t=>this._frameUpdate(e,t),this._startPreloadVideoElement(e)):e instanceof HTMLImageElement&&this._startPreloadImageElement(e))}_startPreloadVideoElement(e){if(!(c(e.src)||"auto"===e.preload&&e.crossOrigin)){e.preload="auto",e.crossOrigin="anonymous";const t=!e.paused;if(e.src=e.src,t&&e.autoplay){const t=()=>{e.removeEventListener("canplay",t),e.play()};e.addEventListener("canplay",t)}}}_startPreloadImageElement(e){u(e.src)||c(e.src)||e.crossOrigin||(e.crossOrigin="anonymous",e.src=e.src)}_createDescriptor(e){const t=new D;return t.wrapMode=this._parameters.wrap??f.REPEAT,t.flipped=!this._parameters.noUnpackFlip,t.samplingMode=this._parameters.mipmap?C.LINEAR_MIPMAP_LINEAR:C.LINEAR,t.hasMipmap=!!this._parameters.mipmap,t.preMultiplyAlpha=!!this._parameters.preMultiplyAlpha,t.maxAnisotropy=this._parameters.maxAnisotropy??(this._parameters.mipmap?e.parameters.maxMaxAnisotropy:1),t}get glTexture(){return this._glTexture}get memoryEstimate(){return this._glTexture?.gpuMemoryUsage||function(e,t){if(null==e)return 0;if(s(e)||n(e))return t.encoding===T.KTX2_ENCODING?function(e,t){if(null==F)return e.byteLength;const r=new F.KTX2File(new Uint8Array(e)),a=V(r)?L(r.getLevels(),r.getHasAlpha(),r.getWidth(),r.getHeight(),t):0;return r.close(),r.delete(),a}(e,!!t.mipmap):t.encoding===T.BASIS_ENCODING?function(e,t){if(null==F)return e.byteLength;const r=new F.BasisFile(new Uint8Array(e)),a=H(r)?L(r.getNumLevels(0),r.getHasAlpha(),r.getImageWidth(0,0),r.getImageHeight(0,0),t):0;return r.close(),r.delete(),a}(e,!!t.mipmap):e.byteLength;const{width:r,height:a}=e instanceof Image||e instanceof ImageData||e instanceof HTMLCanvasElement||e instanceof HTMLVideoElement?J(e):t;return(t.mipmap?4/3:1)*r*a*(t.components||4)||0}(this._data,this._parameters)}load(e){if(this._glTexture)return this._glTexture;if(this._loadingPromise)return this._loadingPromise;const t=this._data;return null==t?(this._glTexture=new B(e,this._createDescriptor(e),null),this._glTexture):(this._parameters.reloadable||(this._data=void 0),"string"==typeof t?this._loadFromURL(e,t):t instanceof Image?this._loadFromImageElement(e,t):t instanceof HTMLVideoElement?this._loadFromVideoElement(e,t):t instanceof ImageData||t instanceof HTMLCanvasElement?this._loadFromImage(e,t):(s(t)||n(t))&&this._parameters.encoding===T.DDS_ENCODING?this._loadFromDDSData(e,t):(s(t)||n(t))&&this._parameters.encoding===T.KTX2_ENCODING?this._loadFromKTX2(e,t):(s(t)||n(t))&&this._parameters.encoding===T.BASIS_ENCODING?this._loadFromBasis(e,t):n(t)?this._loadFromPixelData(e,t):s(t)?this._loadFromPixelData(e,new Uint8Array(t)):null)}_frameUpdate(e,t){return null==this._glTexture||e.readyState<Q.HAVE_CURRENT_DATA||t===e.currentTime?t:(this._glTexture.setData(e),this._glTexture.descriptor.hasMipmap&&this._glTexture.generateMipmap(),this._parameters.updateCallback&&this._parameters.updateCallback(),e.currentTime)}_loadFromDDSData(e,t){return this._glTexture=function(e,t,r){const a=function(e,t){const r=new Int32Array(e,0,31);if(542327876!==r[0])return b.error("Invalid magic number in DDS header"),null;if(!(4&r[20]))return b.error("Unsupported format, must contain a FourCC code"),null;const a=r[21];let s,n;switch(a){case j:s=8,n=E.COMPRESSED_RGB_S3TC_DXT1_EXT;break;case X:s=16,n=E.COMPRESSED_RGBA_S3TC_DXT3_EXT;break;case k:s=16,n=E.COMPRESSED_RGBA_S3TC_DXT5_EXT;break;default:return b.error("Unsupported FourCC code:",(i=a,String.fromCharCode(255&i,i>>8&255,i>>16&255,i>>24&255))),null}var i;let o=1,l=r[4],m=r[3];0==(3&l)&&0==(3&m)||(b.warn("Rounding up compressed texture size to nearest multiple of 4."),l=l+3&-4,m=m+3&-4);const _=l,h=m;131072&r[2]&&!1!==t&&(o=Math.max(1,r[7]));let d,c,u=r[1]+4;const p=[];for(let t=0;t<o;++t)c=(l+3>>2)*(m+3>>2)*s,d=new Uint8Array(e,u,c),p.push(d),u+=c,l=Math.max(1,l>>1),m=Math.max(1,m>>1);return{textureData:{type:"compressed",levels:p},internalFormat:n,width:_,height:h}}(r,t.hasMipmap??!1);if(null==a)throw new Error("DDS texture data is null");const{textureData:s,internalFormat:n,width:i,height:o}=a;return t.samplingMode=s.levels.length>1?C.LINEAR_MIPMAP_LINEAR:C.LINEAR,t.hasMipmap=s.levels.length>1,t.internalFormat=n,t.width=i,t.height=o,new B(e,t,s)}(e,this._createDescriptor(e),t),this._glTexture}_loadFromKTX2(e,t){return this._loadAsync((()=>async function(e,t,r){null==F&&(F=await v());const a=new F.KTX2File(new Uint8Array(r));if(!V(a))return null;a.startTranscoding();const s=N(e,t,a.getLevels(),a.getHasAlpha(),a.getWidth(),a.getHeight(),((e,t)=>a.getImageTranscodedSizeInBytes(e,0,0,t)),((e,t,r)=>a.transcodeImage(r,e,0,0,t,0,-1,-1)));return a.close(),a.delete(),s}(e,this._createDescriptor(e),t).then((e=>(this._glTexture=e,e)))))}_loadFromBasis(e,t){return this._loadAsync((()=>async function(e,t,r){null==F&&(F=await v());const a=new F.BasisFile(new Uint8Array(r));if(!H(a))return null;a.startTranscoding();const s=N(e,t,a.getNumLevels(0),a.getHasAlpha(),a.getImageWidth(0,0),a.getImageHeight(0,0),((e,t)=>a.getImageTranscodedSizeInBytes(0,e,t)),((e,t,r)=>a.transcodeImage(r,0,e,t,0,0)));return a.close(),a.delete(),s}(e,this._createDescriptor(e),t).then((e=>(this._glTexture=e,e)))))}_loadFromPixelData(e,t){x(this._parameters.width>0&&this._parameters.height>0);const r=this._createDescriptor(e);return r.pixelFormat=1===this._parameters.components?R.LUMINANCE:3===this._parameters.components?R.RGB:R.RGBA,r.width=this._parameters.width??0,r.height=this._parameters.height??0,this._glTexture=new B(e,r,t),this._glTexture}_loadFromURL(e,t){return this._loadAsync((async r=>{const a=await p(t,{signal:r});return _(r),this._loadFromImage(e,a)}))}_loadFromImageElement(e,t){return t.complete?this._loadFromImage(e,t):this._loadAsync((async r=>{const a=await g(t,t.src,!1,r);return _(r),this._loadFromImage(e,a)}))}_loadFromVideoElement(e,t){return t.readyState>=Q.HAVE_CURRENT_DATA?this._loadFromImage(e,t):this._loadFromVideoElementAsync(e,t)}_loadFromVideoElementAsync(e,t){return this._loadAsync((r=>new Promise(((a,s)=>{const n=()=>{t.removeEventListener("loadeddata",o),t.removeEventListener("error",l),m(_)},o=()=>{t.readyState>=Q.HAVE_CURRENT_DATA&&(n(),a(this._loadFromImage(e,t)))},l=e=>{n(),s(e||new i("Failed to load video"))};t.addEventListener("loadeddata",o),t.addEventListener("error",l);const _=h(r,(()=>l(d())))}))))}_loadFromImage(e,t){let r=t;if(!(r instanceof HTMLVideoElement)){const{maxTextureSize:t}=e.parameters;r=this._parameters.downsampleUncompressed?z(r,t):function(e,t){const r=Math.max(e.width,e.height);if(r<=t)return e;const a=t/r;return W(e,Math.round(e.width*a),Math.round(e.height*a))}(r,t)}const a=J(r);this._parameters.width=a.width,this._parameters.height=a.height;const s=this._createDescriptor(e);return s.pixelFormat=3===this._parameters.components?R.RGB:R.RGBA,s.width=a.width,s.height=a.height,this._glTexture=new B(e,s,r),this._glTexture}_loadAsync(e){const t=new AbortController;this._loadingController=t;const r=e(t.signal);this._loadingPromise=r;const a=()=>{this._loadingController===t&&(this._loadingController=null),this._loadingPromise===r&&(this._loadingPromise=null)};return r.then(a,a),r}unload(){if(this._glTexture=l(this._glTexture),null!=this._loadingController){const e=this._loadingController;this._loadingController=null,this._loadingPromise=null,e.abort()}this.events.emit("unloaded")}}function J(e){return e instanceof HTMLVideoElement?{width:e.videoWidth,height:e.videoHeight}:e}var Q;!function(e){e[e.HAVE_NOTHING=0]="HAVE_NOTHING",e[e.HAVE_METADATA=1]="HAVE_METADATA",e[e.HAVE_CURRENT_DATA=2]="HAVE_CURRENT_DATA",e[e.HAVE_FUTURE_DATA=3]="HAVE_FUTURE_DATA",e[e.HAVE_ENOUGH_DATA=4]="HAVE_ENOUGH_DATA"}(Q||(Q={}));const Y={wrap:{s:f.REPEAT,t:f.REPEAT},mipmap:!0,noUnpackFlip:!1,preMultiplyAlpha:!1,downsampleUncompressed:!1};export{y as D,$ as T,K as a,z as d,v as l};
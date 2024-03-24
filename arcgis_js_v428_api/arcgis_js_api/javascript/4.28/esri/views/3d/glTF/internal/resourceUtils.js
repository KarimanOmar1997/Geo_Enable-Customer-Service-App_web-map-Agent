// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.28/esri/copyright.txt for details.
//>>built
define(["exports","../../../../core/has","../../webgl-engine/lib/basicInterfaces"],function(c,n,e){class f{constructor(a){this.data=a;this.type="encoded-mesh-texture";this.encoding=e.TextureEncodingMimeType.KTX2_ENCODING}}c.EncodedMeshTexture=f;c.imageFromBinaryData=async function(a,g){if(g===e.TextureEncodingMimeType.KTX2_ENCODING)return new f(a);a=new Blob([a],{type:g});const d=URL.createObjectURL(a),b=new Image;if(n("esri-iPhone"))return new Promise((h,p)=>{const l=()=>{k();h(b)},m=q=>{k();p(q)},
k=()=>{URL.revokeObjectURL(d);b.removeEventListener("load",l);b.removeEventListener("error",m)};b.addEventListener("load",l);b.addEventListener("error",m);b.src=d});try{b.src=d,await b.decode()}catch(h){console.warn("Failed decoding HTMLImageElement")}URL.revokeObjectURL(d);return b};c.isEncodedMeshTexture=function(a){return"encoded-mesh-texture"===a?.type};c.jsonFromBinaryData=async function(a){a=await (new Blob([a])).text();return JSON.parse(a)};Object.defineProperty(c,Symbol.toStringTag,{value:"Module"})});
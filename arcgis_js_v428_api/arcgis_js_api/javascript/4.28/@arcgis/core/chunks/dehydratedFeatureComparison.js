/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.28/esri/copyright.txt for details.
*/
import"./typedArrayUtil.js";import{f as e}from"./unitUtils.js";function n(e,n){if(e===n)return!0;if(null==e||null==n)return!1;if(e.length!==n.length)return!1;for(let t=0;t<e.length;t++){const r=e[t],i=n[t];if(r.length!==i.length)return!1;for(let e=0;e<r.length;e++)if(r[e]!==i[e])return!1}return!0}function t(e,t){if(e===t)return!0;if(null==e||null==t)return!1;if(e.length!==t.length)return!1;for(let r=0;r<e.length;r++)if(!n(e[r],t[r]))return!1;return!0}function r(n,t){return n===t||null!=n&&null!=t&&e(n.spatialReference,t.spatialReference)&&n.x===t.x&&n.y===t.y&&n.z===t.z&&n.m===t.m}function i(i,a){return i===a||null!=i&&null!=a&&i.objectId===a.objectId&&!!function(i,a){if(i===a)return!0;if(null==i||null==a)return!1;if(i.type!==a.type)return!1;switch(i.type){case"point":return r(i,a);case"extent":return function(n,t){return n.hasZ===t.hasZ&&n.hasM===t.hasM&&!!e(n.spatialReference,t.spatialReference)&&n.xmin===t.xmin&&n.ymin===t.ymin&&n.zmin===t.zmin&&n.xmax===t.xmax&&n.ymax===t.ymax&&n.zmax===t.zmax}(i,a);case"polyline":return function(n,r){return n.hasZ===r.hasZ&&n.hasM===r.hasM&&!!e(n.spatialReference,r.spatialReference)&&t(n.paths,r.paths)}(i,a);case"polygon":return function(n,r){return n.hasZ===r.hasZ&&n.hasM===r.hasM&&!!e(n.spatialReference,r.spatialReference)&&t(n.rings,r.rings)}(i,a);case"multipoint":return function(t,r){return t.hasZ===r.hasZ&&t.hasM===r.hasM&&!!e(t.spatialReference,r.spatialReference)&&n(t.points,r.points)}(i,a);case"mesh":return!1;default:return}}(i.geometry,a.geometry)&&!!function(e,n){if(e===n)return!0;if(!e||!n)return!1;const t=Object.keys(e),r=Object.keys(n);if(t.length!==r.length)return!1;for(const r of t)if(e[r]!==n[r])return!1;return!0}(i.attributes,a.attributes)}export{i as e,r as p};
/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.28/esri/copyright.txt for details.
*/
import e from"../core/Error.js";import{clone as r}from"../core/lang.js";import{L as o}from"./Logger.js";import t from"../layers/support/LabelClass.js";const n=o.getLogger("esri.layers.support.labelingInfo"),l=/\[([^\[\]]+)\]/gi;function s(e,r,o){return e?e.map((e=>{const n=new t;if(n.read(e,o),n.labelExpression){const e=r.fields||r.layerDefinition?.fields||this.fields;n.labelExpression=n.labelExpression.replaceAll(l,((r,o)=>`[${function(e,r){if(!r)return e;const o=e.toLowerCase();for(let e=0;e<r.length;e++){const t=r[e].name;if(t.toLowerCase()===o)return t}return e}(o,e)}]`))}return n})):null}const i={esriGeometryPoint:["above-right","above-center","above-left","center-center","center-left","center-right","below-center","below-left","below-right"],esriGeometryPolygon:["always-horizontal"],esriGeometryPolyline:["center-along"],esriGeometryMultipoint:null};function a(o,t){const l=r(o),s=l.some((r=>function(r,o){const t=r.labelPlacement,l=i[o];if(!r.symbol)return n.warn("No ILabelClass symbol specified."),!0;if(!l)return n.error(new e("labeling:unsupported-geometry-type",`Unable to create labels for layer, geometry type '${o}' is not supported`)),!0;if(!l.includes(t)){const e=l[0];t&&n.warn(`Found invalid label placement type ${t} for ${o}. Defaulting to ${e}`),r.labelPlacement=e}return!1}(r,t)));return s?[]:l}export{s as r,a as v};
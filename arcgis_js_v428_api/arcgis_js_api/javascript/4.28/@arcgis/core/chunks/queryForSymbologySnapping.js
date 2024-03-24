/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.28/esri/copyright.txt for details.
*/
import"../geometry.js";import{throwIfAborted as e}from"../core/promiseUtils.js";import{p as n}from"./projectPointToVectorWithEngine.js";import{m as t}from"./dehydratedPoint.js";import{p as o}from"./elevationInfoUtils.js";import{E as a,i as r,j as s,a as i,S as c}from"./ElevationContext.js";import p from"../geometry/SpatialReference.js";import{l as d}from"./arcadeOnDemand.js";async function l(t,a,c,d,l){const{elevationProvider:h,renderCoordsHelper:y}=t,{elevationInfo:j}=a,{pointsInFeatures:I,spatialReference:S}=d,v=p.fromJSON(S),b=r(j,!0),w=await s(b,v,l);e(l);const R=[],D=new Set,x=new Set;u.spatialReference=v;const C=t.elevationProvider.spatialReference??t.spatialReference;for(const{objectId:e,points:t}of I){const r=c(e);if(null==r){for(const e of t)R.push(e.z??0);D.add(e);continue}r.isDraped&&x.add(e);const s=r.graphic.geometry;f.setFromElevationInfo(o(s,j)),f.updateFeatureExpressionInfoContext(w,r.graphic,a);for(const{x:e,y:o,z:a}of t)u.x=e,u.y=o,u.z=a??0,await n(u,g,C,0,{signal:l}),i(g,h,f,y,m),R.push(m.z)}return{elevations:R,drapedObjectIds:x,failedObjectIds:D}}const f=new a,u=t(0,0,0,p.WGS84),m=new c,g=[0,0,0];async function h(n,t,o){if(null==n||0===t.candidates.length)return y;const a=n.graphics3DGraphicsByObjectID??n.graphics3DGraphics,r=[],s=[],{renderer:i}=n,c=null!=i&&"arcadeRequired"in i&&i.arcadeRequired?d():null,p=async(e,{graphic:t,graphics3DSymbol:a})=>{const r=await c,s=await n.getRenderingInfoAsync(t,i,r,{signal:o});return null==s?[]:a.queryForSnapping(e,f,s,o)},{candidates:l,spatialReference:f}=t;for(let e=0;e<l.length;++e){const n=l[e],{objectId:t}=n,o="number"==typeof t?a?.get(t):void 0;if(null==o)continue;const{graphics3DSymbol:i}=o;i.symbologySnappingSupported&&(r.push(p(n,o)),s.push(e))}if(0===r.length)return y;const u=await Promise.all(r);e(o);const m=[],g=[];for(let e=0;e<u.length;++e){const n=u[e],t=s[e];for(const e of n)m.push(e),g.push(t)}return{candidates:m,sourceCandidateIndices:g}}const y={candidates:[],sourceCandidateIndices:[]};export{l as e,h as q};
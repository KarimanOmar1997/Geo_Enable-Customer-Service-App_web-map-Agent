// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.28/esri/copyright.txt for details.
//>>built
define(["exports","../../../core/Collection","./StageRenderer"],function(d,e,f){class g{constructor(){this._renderers=new e}add(a,b){let c=this._findStageRenderer(a);c||(c=new f.StageRenderer({view:a}),this._renderers.add(c));c.add(b)}remove(a,b){if(a=this._findStageRenderer(a))a.remove(b),0===a.renderers.length&&(a.destroy(),this._renderers.remove(a))}_findStageRenderer(a){return this._renderers.find(b=>b.view===a)}}d.ExternalRendererStore=g;Object.defineProperty(d,Symbol.toStringTag,{value:"Module"})});
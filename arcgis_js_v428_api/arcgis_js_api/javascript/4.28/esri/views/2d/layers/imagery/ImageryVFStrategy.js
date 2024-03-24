// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.28/esri/copyright.txt for details.
//>>built
define("../../../../chunks/tslib.es6 ../../../../core/Accessor ../../../../core/Logger ../../../../core/promiseUtils ../../../../core/accessorSupport/decorators/property ../../../../core/accessorSupport/ensureType ../../../../core/arrayUtils ../../../../core/has ../../../../core/accessorSupport/decorators/subclass ../../../../geometry/Extent ../../engine/imagery/RasterVFDisplayObject".split(" "),function(g,f,n,m,l,u,v,w,p,q,r){f=class extends f{constructor(a){super(a);this._loading=null;this.update=
m.debounce((c,e)=>this._update(c,e).catch(d=>{m.isAbortError(d)||n.getLogger(this).error(d)}))}get updating(){return!!this._loading}redraw(a){if(this.container.children.length){var c=this.container.children[0];c.symbolizerParameters=a;c.invalidateVAO();this.container.symbolTypes="wind_speed"===a.style?["scalar","triangle"]:"simple_scalar"===a.style?["scalar"]:["triangle"];this.container.requestRender()}}async _update(a,c,e){if(a.stationary){var {extent:d,spatialReference:h}=a.state,b=new q({xmin:d.xmin,
ymin:d.ymin,xmax:d.xmax,ymax:d.ymax,spatialReference:h}),[k,t]=a.state.size;this._loading=this.fetchPixels(b,k,t,e);e=await this._loading;this._addToDisplay(e,c,a.state);this._loading=null}}_addToDisplay(a,c,e){if(null==a.pixelBlock)this.container.children.forEach(k=>k.destroy()),this.container.removeAllChildren();else{var {extent:d,pixelBlock:h}=a,b=new r.RasterVFDisplayObject(h);b.offset=[0,0];b.symbolizerParameters=c;b.rawPixelData=a;b.invalidateVAO();b.x=d.xmin;b.y=d.ymax;b.pixelRatio=e.pixelRatio;
b.rotation=e.rotation;b.resolution=e.resolution;b.width=h.width*c.symbolTileSize;b.height=h.height*c.symbolTileSize;this.container.children.forEach(k=>k.destroy());this.container.removeAllChildren();this.container.symbolTypes="wind_speed"===c.style?["scalar","triangle"]:"simple_scalar"===c.style?["scalar"]:["triangle"];this.container.addChild(b)}}};g.__decorate([l.property()],f.prototype,"fetchPixels",void 0);g.__decorate([l.property()],f.prototype,"container",void 0);g.__decorate([l.property()],
f.prototype,"_loading",void 0);g.__decorate([l.property()],f.prototype,"updating",null);return f=g.__decorate([p.subclass("esri.views.2d.layers.imagery.ImageryVFStrategy")],f)});
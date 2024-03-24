// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.28/esri/copyright.txt for details.
//>>built
define("../chunks/tslib.es6 ../core/Logger ../core/urlUtils ../core/accessorSupport/decorators/property ../core/accessorSupport/ensureType ../core/arrayUtils ../core/has ../core/accessorSupport/decorators/enumeration ../core/accessorSupport/decorators/subclass ./Symbol3DLayer ./support/colors ./support/IconSymbol3DLayerResource ./support/materialUtils ./support/Symbol3DAnchorPosition2D ./support/Symbol3DIconOutline ./support/Symbol3DMaterial".split(" "),function(c,r,t,f,b,D,E,l,u,v,h,w,x,m,y,z){function n(a){const d=
"width"in a?a.width:a.size,e="height"in a?a.height:a.size,k=p(a.xoffset);a=p(a.yoffset);return(k||a)&&d&&e?{x:-k/d,y:a/e}:null}function p(a){return isFinite(a)?a:0}var g;b=g=class extends v{constructor(a){super(a);this.resource=this.material=null;this.type="icon";this.size=12;this.anchor="center";this.outline=this.anchorPosition=null}clone(){return new g({anchor:this.anchor,anchorPosition:this.anchorPosition&&this.anchorPosition.clone(),enabled:this.enabled,material:null!=this.material?this.material.clone():
null,outline:null!=this.outline?this.outline.clone():null,resource:this.resource&&this.resource.clone(),size:this.size})}static fromSimpleMarkerSymbol(a){const d=a.color||h.white,e=n(a),k=a.outline&&0<a.outline.width?{size:a.outline.width,color:(a.outline.color||h.white).clone()}:null;var A=g,B=a.size;{a=a.style;const q=C[a];q?a=q:(r.getLogger("esri.symbols.IconSymbol3DLayer").warn(`${a} cannot be mapped to Icon symbol. Fallback to "circle"`),a="circle")}return new A({size:B,resource:{primitive:a},
material:{color:d},outline:k,anchor:e?"relative":void 0,anchorPosition:e})}static fromPictureMarkerSymbol(a){const d=!a.color||h.isBlack(a.color)?h.white:a.color,e=n(a);return new g({size:a.width<=a.height?a.height:a.width,resource:{href:a.url},material:{color:d.clone()},anchor:e?"relative":void 0,anchorPosition:e})}static fromCIMSymbol(a){return new g({resource:{href:t.makeData({mediaType:"application/json",data:JSON.stringify(a.data)})}})}};c.__decorate([f.property({type:z.Symbol3DMaterial,json:{write:!0}})],
b.prototype,"material",void 0);c.__decorate([f.property({type:w.IconSymbol3DLayerResource,json:{write:!0}})],b.prototype,"resource",void 0);c.__decorate([l.enumeration({Icon:"icon"},{readOnly:!0})],b.prototype,"type",void 0);c.__decorate([f.property(x.screenSizeProperty)],b.prototype,"size",void 0);c.__decorate([l.enumeration({center:"center",left:"left",right:"right",top:"top",bottom:"bottom",topLeft:"top-left",topRight:"top-right",bottomLeft:"bottom-left",bottomRight:"bottom-right",relative:"relative"}),
f.property({json:{default:"center"}})],b.prototype,"anchor",void 0);c.__decorate([f.property({type:m.Symbol3DAnchorPosition2D,json:{type:[Number],read:{reader:a=>new m.Symbol3DAnchorPosition2D({x:a[0],y:a[1]})},write:{writer:(a,d)=>{d.anchorPosition=[a.x,a.y]},overridePolicy(){return{enabled:"relative"===this.anchor}}}}})],b.prototype,"anchorPosition",void 0);c.__decorate([f.property({type:y.Symbol3DIconOutline,json:{write:!0}})],b.prototype,"outline",void 0);b=g=c.__decorate([u.subclass("esri.symbols.IconSymbol3DLayer")],
b);const C={circle:"circle",cross:"cross",diamond:"kite",square:"square",x:"x",triangle:"triangle",path:null};return b});
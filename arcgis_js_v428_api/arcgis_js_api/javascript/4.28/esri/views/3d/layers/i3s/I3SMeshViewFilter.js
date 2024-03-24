// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.28/esri/copyright.txt for details.
//>>built
define("require exports ../../../../chunks/tslib.es6 ../../../../geometry ../../../../core/Accessor ../../../../core/arrayUtils ../../../../core/Logger ../../../../core/mathUtils ../../../../core/maybeUpdating ../../../../core/reactiveUtils ../../../../core/unitUtils ../../../../core/accessorSupport/decorators/property ../../../../core/accessorSupport/ensureType ../../../../core/has ../../../../core/accessorSupport/decorators/subclass ../../../../chunks/vec3 ../../../../core/sql/WhereClause ../../../../geometry/ellipsoidUtils ../../../../geometry/projection ../../../../geometry/projection/projectBoundingSphere ../../../../geometry/projection/projectVectorToVector ../../../../geometry/support/aaBoundingBox ../../../../geometry/support/aaBoundingRect ../../../../geometry/support/DoubleArray ../../../../geometry/support/Ellipsoid ../../../../geometry/support/spatialReferenceUtils ../../../../chunks/sphere ../../../../geometry/support/webMercatorUtils ../../../../layers/support/FeatureFilter ./I3SUtil ../../../../geometry/SpatialReference".split(" "),
function(aa,q,t,ua,ba,O,ca,da,w,ea,fa,u,va,wa,ha,v,ia,ja,F,G,C,ka,H,la,ma,P,na,Q,oa,R,S){function D(a,b,c){if(null==b)return null;if("disjoint"===c&&"polygon"===b.type){c=b.rings.length;const f=b.spatialReference,g=Array(c);for(let d=0;d<c;++d){const l=H.fromValues(Infinity,Infinity,-Infinity,-Infinity);H.expandWithNestedArray(l,b.rings[d]);g[d]={type:"polygon",rings:[b.rings[d]],spatialReference:f,cache:{},aabr:l}}g.sort((d,l)=>d.aabr[0]-l.aabr[0]);const e=new Set,n=new O.PositionHint;for(b=0;b<
g.length;++b){const d=g[b],l=d.aabr[0];e.forEach(k=>{l>=k.aabr[2]?e.delete(k):d.aabr[1]>k.aabr[3]||d.aabr[3]<k.aabr[1]||!a.intersects(d,k)||(d.rings=d.rings.concat(k.rings),H.expand(d.aabr,k.aabr,d.aabr),d.cache={},e.delete(k),k=O.indexOf(g,k,g.length,n),g.splice(k,1))});e.add(d)}for(const d of g)d.aabr=void 0;return g}return[b]}function T(a,b,c,f,g){if(b[3]>=.5*(b[2]+ja.getReferenceEllipsoid(f).radius))return!0;const e=U(a,b,f);return c.every(n=>V(a,n,e,g)!==p.DISCARD)}function W(a,b,c,f,g,e,n,d){const l=
n[0].spatialReference||g.spatialReference;if(G.projectBoundingSphere(c.node.mbs,e,A,l)){e=U(a,A,l);var k=pa(d,g,l,f,c.objectHandle);for(const h of n){if(0===b.length)break;switch(V(a,h,e,d)){case p.DISCARD:b.length=0;return;case p.KEEP:continue}R.filterInPlace(b,c.featureIds,m=>qa(a,h,m,k))}}else z.warnOnce("SceneLayerView.filter.geometry is using unsupported SpatialReference, skipping geometry filter")}function pa(a,b,c,f,g){b=b.renderSpatialReference;const e=new Map,n={type:"polygon",rings:[[[0,
0,0],[0,0,0],[0,0,0],[0,0,0]]],spatialReference:c};n.rings[0][3]=n.rings[0][0];let d,l;switch(a){case "intersects":d=(k,h,m)=>k.intersects(h,m)?p.KEEP:p.TEST;l=I;break;case "contains":d=(k,h,m)=>k.contains(h,m)?p.TEST:p.DISCARD;l=I;break;default:d=(k,h,m)=>k.disjoint(h,m)?p.TEST:p.DISCARD,l=X}return{collection:f,object:g,type:a,maskSR:c,renderSR:b,aabbCache:e,triangle:n,positions:{indices:null,data:null,stride:0,startIndex:0,endIndex:0},triangleTest:d,geometryTest:l}}function U(a,b,c){const f={type:"point",
x:b[0],y:b[1],hasZ:!1,hasM:!1,spatialReference:c};c=!P.isWGS84(c)&&!P.isWebMercator(c);b=Number.isNaN(b[3])?0:da.clamp(b[3],0,2*ma.earth.radius);a=c?a.buffer(f,b,1):a.geodesicBuffer(f,b,1);a.type="polygon";return a}function V(a,b,c,f){switch(f){case "intersects":case "contains":return I(a,b,c);case "disjoint":return X(a,b,c)}}function I(a,b,c){return a.intersects(b,c)?a.contains(b,c)?p.KEEP:p.TEST:p.DISCARD}function X(a,b,c){return a.intersects(b,c)?a.contains(b,c)?p.DISCARD:p.TEST:p.KEEP}function qa(a,
b,c,f){const {collection:g,object:e,renderSR:n,maskSR:d,geometryTest:l,aabbCache:k}=f;var h=k.get(c);if(!h){h=g.getObjectTransform(e);g.getComponentAabb(e,c,x);var m=[[x[0],x[1],0],[x[0],x[4],0],[x[3],x[4],0],[x[3],x[1],0]];for(var r=0;4>r;++r)v.transformMat3(m[r],m[r],h.rotationScale),v.add(m[r],m[r],h.position),C.projectVectorToVector(m[r],n,m[r],d);h={type:"polygon",rings:[m],spatialReference:d,cache:{}};h.rings[0][4]=h.rings[0][0];k.set(c,h)}switch(l(a,b,h)){case p.DISCARD:return!1;case p.KEEP:return!0}const {triangle:E,
triangleTest:ra,positions:Y}=f;h=E.rings[0][0];m=E.rings[0][1];r=E.rings[0][2];const B=g.getObjectTransform(e);g.getComponentPositions(e,c,Y);const {indices:J,data:y,stride:K,startIndex:sa,endIndex:ta}=Y;for(c=sa;c<ta;c+=3){const L=K*J[c],M=K*J[c+1],N=K*J[c+2];v.set(h,y[L],y[L+1],y[L+2]);v.set(m,y[M],y[M+1],y[M+2]);v.set(r,y[N],y[N+1],y[N+2]);v.transformMat3(h,h,B.rotationScale);v.transformMat3(m,m,B.rotationScale);v.transformMat3(r,r,B.rotationScale);v.add(h,h,B.position);v.add(m,m,B.position);v.add(r,
r,B.position);C.projectVectorToVector(h,n,h,d);C.projectVectorToVector(m,n,m,d);C.projectVectorToVector(r,n,r,d);switch(ra(a,b,E)){case p.DISCARD:return!1;case p.KEEP:return!0}}switch(f.type){case "intersects":return!1;default:return!0}}const z=ca.getLogger("esri.views.3d.layers.i3s.I3SMeshViewFilter");q.I3SMeshViewFilter=class extends ba{constructor(a){super(a);this._projectionEngineLoaded=!1}initialize(){ea.whenOnce(()=>this.viewFilter?.geometry||null!=this.layerFilter).then(()=>this.loadAsyncModule((new Promise((a,
b)=>aa(["../../../../geometry/geometryEngine"],a,b))).then(a=>{this.destroyed||(this._geometryEngine=a)})))}get sortedObjectIds(){if(null==this.viewFilter?.objectIds)return null;const a=la.doubleArrayFrom(this.viewFilter.objectIds);a.sort();return a}get parsedWhereClause(){const a=null!=this.viewFilter?this.viewFilter.where:null;if(null==a||!a)return null;try{return ia.WhereClause.create(a,this.layerFieldsIndex)}catch(b){z.error(`Failed to parse filter where clause: ${b}`)}return null}addFilters(a,
b,c,f){const g=this.sortedObjectIds;null!=g&&a.push(l=>R.objectIdFilter(g,!0,l));this.addSqlFilter(a,this.parsedWhereClause);const e=w.unwrapUpdating(this._layerMaskGeometries),n=this._geometryEngine;if(null!=e&&null!=this.layerFilter&&null!=n){const l=this.layerFilter.spatialRelationship;a.push((k,h)=>W(n,k,h,f,b,c,e,l))}const d=w.unwrapUpdating(this._viewMaskGeometries);if(null!=d&&null!=this.viewFilter&&null!=n){const l=this.viewFilter.spatialRelationship;a.push((k,h)=>W(n,k,h,f,b,c,d,l))}}isMBSGeometryVisible(a,
b,c){var f=w.unwrapUpdating(this._layerMaskGeometries);const g=this._geometryEngine;if(null!=f&&null!=this.layerFilter&&null!=g){var e=this.layerFilter.spatialRelationship;b=f[0].spatialReference||b;return G.projectBoundingSphere(a,c,A,b)?T(g,A,f,b,e):(z.warnOnce("SceneLayer.mask geometry is using unsupported SpatialReference, skipping geometry filter for MBS"),!0)}f=w.unwrapUpdating(this._viewMaskGeometries);return null!=f&&null!=this.viewFilter&&null!=g?(e=this.viewFilter.spatialRelationship,b=
f[0].spatialReference||b,G.projectBoundingSphere(a,c,A,b)?T(g,A,f,b,e):(z.warnOnce("SceneLayerView.filter.geometry is using unsupported SpatialReference, skipping geometry filter for MBS"),!0)):!0}get parsedGeometry(){const a=w.unwrapUpdating(this._viewMaskGeometries),b=w.unwrapUpdating(this._layerMaskGeometries);return null==a||null==b?a||b:b.concat(a)}get _layerMaskGeometries(){const a=this.layerFilter;return null==a?null:null==this._geometryEngine?w.updating:"disjoint"===a.spatialRelationship?
a.geometries.map(b=>({type:"polygon",rings:b.rings,spatialReference:b.spatialReference,cache:{}})):[a.geometries.reduce((b,c)=>{b.rings=[...b.rings,...c.rings];return b},{type:"polygon",rings:[],spatialReference:a.geometries[0].spatialReference,cache:{}})]}get _viewMaskGeometries(){if(null==this.viewFilter)return null;var {geometry:a}=this.viewFilter;if(null==a)return null;if(null==this.viewFilter||null==this._geometryEngine)return w.updating;const {distance:b,units:c}=this.viewFilter,f=this.viewFilter.spatialRelationship;
a="mesh"===a.type?a.extent:a;if(null==b||0===b)return D(this._geometryEngine,a,f);const g=c||fa.getUnitString(a.spatialReference);if(a.spatialReference.isWGS84)return a=this._geometryEngine.geodesicBuffer(a,b,g),D(this._geometryEngine,a,f);var e=Q.project(a,S.WGS84);if(null!=e)return a=Q.project(this._geometryEngine.geodesicBuffer(e,b,g),a.spatialReference),D(this._geometryEngine,a,f);if(!this._projectionEngineLoaded&&(this.loadAsyncModule(F.load().then(()=>this._projectionEngineLoaded=!0)),!this._projectionEngineLoaded))return null;
e=null;try{e=F.project(a,S.WGS84)}catch(n){}if(e)try{e=F.project(this._geometryEngine.geodesicBuffer(e,b,g),a.spatialReference)}catch(n){e=null}e||z.error(`Filter by geodesic buffer (distance) unsupported, failed to project input geometry (${a.spatialReference.wkid}) to WGS84.`);return D(this._geometryEngine,e,f)}get updating(){return w.isUpdating(this._layerMaskGeometries)||w.isUpdating(this._viewMaskGeometries)}static checkSupport(a){if(null==a)return!1;if(a.timeExtent)return z.warn("Filters with a timeExtent are not supported for mesh scene layers"),
!1;a=a.spatialRelationship;return null!=a&&Z.includes(a)?!0:(z.warn(`Filters with spatialRelationship other than ${Z.join(", ")} are not supported for mesh scene layers`),!1)}};t.__decorate([u.property()],q.I3SMeshViewFilter.prototype,"layerFilter",void 0);t.__decorate([u.property({type:oa})],q.I3SMeshViewFilter.prototype,"viewFilter",void 0);t.__decorate([u.property()],q.I3SMeshViewFilter.prototype,"layerFieldsIndex",void 0);t.__decorate([u.property()],q.I3SMeshViewFilter.prototype,"loadAsyncModule",
void 0);t.__decorate([u.property()],q.I3SMeshViewFilter.prototype,"addSqlFilter",void 0);t.__decorate([u.property({readOnly:!0})],q.I3SMeshViewFilter.prototype,"sortedObjectIds",null);t.__decorate([u.property({readOnly:!0})],q.I3SMeshViewFilter.prototype,"parsedWhereClause",null);t.__decorate([u.property({readOnly:!0})],q.I3SMeshViewFilter.prototype,"parsedGeometry",null);t.__decorate([u.property({readOnly:!0})],q.I3SMeshViewFilter.prototype,"_layerMaskGeometries",null);t.__decorate([u.property({readOnly:!0})],
q.I3SMeshViewFilter.prototype,"_viewMaskGeometries",null);t.__decorate([u.property()],q.I3SMeshViewFilter.prototype,"updating",null);t.__decorate([u.property()],q.I3SMeshViewFilter.prototype,"_projectionEngineLoaded",void 0);t.__decorate([u.property()],q.I3SMeshViewFilter.prototype,"_geometryEngine",void 0);q.I3SMeshViewFilter=t.__decorate([ha.subclass("esri.views.3d.layers.i3s.I3SMeshViewFilter")],q.I3SMeshViewFilter);const Z=["contains","intersects","disjoint"];var p;(function(a){a[a.KEEP=0]="KEEP";
a[a.DISCARD=1]="DISCARD";a[a.TEST=2]="TEST"})(p||(p={}));const A=na.fromValues(0,0,0,0),x=ka.create();Object.defineProperty(q,Symbol.toStringTag,{value:"Module"})});
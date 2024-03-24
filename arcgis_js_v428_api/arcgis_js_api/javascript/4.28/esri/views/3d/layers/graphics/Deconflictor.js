// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.28/esri/copyright.txt for details.
//>>built
define("exports ../../../../chunks/tslib.es6 ../../../../core/Accessor ../../../../core/mathUtils ../../../../core/PooledArray ../../../../core/accessorSupport/decorators/property ../../../../core/accessorSupport/ensureType ../../../../core/arrayUtils ../../../../core/has ../../../../core/accessorSupport/decorators/subclass ../../../../chunks/mat4 ../../../../chunks/mat4f64 ../../../../chunks/vec2f64 ../../../../chunks/vec3 ../../../../chunks/vec3f64 ../../../../chunks/vec4 ../../../../chunks/vec4f64 ../../../../geometry/ellipsoidUtils ../../../../geometry/support/aaBoundingRect ../../../../chunks/boundedPlane ../../../../geometry/support/ray ../../../../chunks/sphere ./deconflictorDebug ./enums ../../webgl-engine/lib/Camera ../../webgl-engine/lib/screenSizePerspectiveUtils ../../webgl-engine/lib/VertexAttribute ../../webgl-engine/materials/HUDMaterial ../../webgl-engine/materials/ScaleInfo".split(" "),
function(h,w,J,C,D,E,ha,ia,ja,K,L,M,N,q,m,t,F,O,l,x,P,v,y,n,Q,R,G,S,T){function*H(a){if(Map.prototype.entries){a=a.entries();for(let c=a.next();!c.done;c=a.next())yield c.value[1]}else yield*a.values()}function*U(a,c,b){c.clear();a.forEach((d,e)=>{const g=c.pushNew();g.id=e;g.visible=d.graphics3DGraphic.getVisibilityFlag(b,n.VisibilityFlag.DECONFLICTION);e=d.info?.[b];g.prio=d.graphics3DGraphic.deconflictionPriority;g.distance=e?e.distance:Number.MAX_VALUE});yield;const f=c.iterableSort((d,e)=>d.prio!==
e.prio?e.prio-d.prio:d.distance!==e.distance?d.distance-e.distance:d.visible!==e.visible?d.visible?-1:1:d.id-e.id);for(let d=f.next();!d.done;d=f.next())yield;c.forAll(d=>{const e=a.get(d.id);e&&(a.delete(d.id),a.set(d.id,e))});c.clear()}const k=m.create(),r=F.create(),u=F.create(),z=m.create(),V=M.create(),W=v.create(),A=P.create(),X=m.create(),Y=l.create();class Z{constructor(){this.aabr=l.create();this.distance=0;this.visible=this.culled=!1}}class aa{constructor(a,c){this.graphics3DGraphic=a;this.slicePlaneEnabled=
c;this.info={}}}h.State=void 0;(function(a){a[a.Idle=0]="Idle";a[a.Process=1]="Process";a[a.Sort=2]="Sort";a[a.Deconflict=3]="Deconflict";a[a.NumStates=4]="NumStates"})(h.State||(h.State={}));class I{constructor(){this.camera=new Q.Camera;this.slicePlane=x.create();this.slicePlaneEnabled=!1}copyFrom(a){this.camera.copyFrom(a.camera);x.copy(a.slicePlane,this.slicePlane);this.slicePlaneEnabled=a.slicePlaneEnabled}}h.Deconflictor=class extends J{get dirty(){return this._dirty}get state(){return this._state}constructor(a){super(a);
this._dirty=!1;this._runningViewState=new I;this._state=h.State.Idle;this._active=new Map;this._visible=new Map;this._iterators=new ba;this._accBinsNumX=15;this._accBinsNumY=20;this._accBinsSizeY=this._accBinsSizeX=0;this._accBins=null;this.accNumTests=0}destroy(){this._active.clear();this._visible.clear();this._iterators=null}setDirty(){!this._dirty&&0<this._active.size&&(this._dirty=!0,this.notifyChange("updating"))}get updating(){return this._state!==h.State.Idle||this._dirty}get updatingProgress(){if(!this.updating)return 1;
const a=this._state/h.State.NumStates;return this._dirty?.5*a:a}get running(){return this.view.ready&&null!=this.view.state&&this.updating}runTask(a){switch(this._state){case h.State.Idle:this._startUpdate(),a.madeProgress();case h.State.Process:if(this._state=h.State.Process,!this._processActiveGraphics(a))break;case h.State.Sort:if(this._state=h.State.Sort,!this._sortVisibleGraphics(a))break;case h.State.Deconflict:if(this._state=h.State.Deconflict,!this._deconflictVisibleGraphics(a))break;default:y.drawAccelerationStruct(this,
this._visible),this._state=h.State.Idle,this.notifyChange("updating")}}modifyGraphics(a,c){c?a.forEach(b=>this.addToActiveGraphics(b)):a.forEach(b=>this.removeFromActiveGraphics(b));this.setDirty()}layerSupportsDeconfliction(a){if(null==a||"object3d"!==a.type)return!1;a=a.stageObject;return 1===(a?.geometries.length??0)&&a?.geometries[0]?.material instanceof S.HUDMaterial?!0:!1}_startUpdate(){y.prepare(this.view);this._dirty=!1;this._runningViewState.copyFrom(this.viewState);const {fullWidth:a,fullHeight:c}=
this._runningViewState.camera;this._initBins(a,c);this._resetIterators()}addToActiveGraphics(a){a.info[this.visibilityGroup]=new Z;this._active.set(a.graphics3DGraphic.graphic.uid,a);this.setDirty()}removeFromActiveGraphics(a){this._visible.delete(a.graphics3DGraphic.graphic.uid);const c=a.graphics3DGraphic;c.destroyed||c.setVisibilityFlag(this.visibilityGroup,n.VisibilityFlag.DECONFLICTION,!0);delete a.info[this.visibilityGroup];this._active.delete(a.graphics3DGraphic.graphic.uid);this.setDirty()}_processActiveGraphics(a){const c=
this._ensureActiveGraphicsIterator(),b=L.invertOrIdentity(V,this._runningViewState.camera.projectionMatrix),f="global"===this.view.viewingMode&&1===this.view.map.ground.opacity&&0<this._runningViewState.camera.relativeElevation?W:null;let d=0;null!=f&&(q.transformMat4(f,m.ZEROS,this._runningViewState.camera.viewMatrix),f[3]=O.getReferenceEllipsoid(this.view.spatialReference).radius,d=v.distanceToSilhouette(f,m.ZEROS));for(;!a.done;){a.madeProgress();var e=c.next();if(!0===e.done)return this._resetActiveGraphicsIterator(),
!0;e=e.value;const g=e?.info[this.visibilityGroup];g&&(this._collectGraphics3DGraphics(e,b,f,d),g.culled?this._visible.delete(e.graphics3DGraphic.graphic.uid):this._visible.set(e.graphics3DGraphic.graphic.uid,e))}return!1}_sortVisibleGraphics(a){const c=this._ensureSortGraphicsIterator();for(;!a.done;){const b=c.next();a.madeProgress();if(!0===b.done)return this._resetSortGraphicsIterator(),!0}return!1}_deconflictVisibleGraphics(a){const c=this._ensureVisibleGraphicsIterator(),b=this.visibilityGroup===
n.VisibilityGroup.LABEL;for(;!a.done;){a.madeProgress();var f=c.next();if(!0===f.done)return this._resetVisibleGraphicsIterator(),!0;f=f.value;const e=f.info[this.visibilityGroup];if(!e||e.culled)this._setGraphicVisibility(f,!1);else{var d=f.graphics3DGraphic;d=!b||d.isVisible();e.visible=d&&!this._isConflicted(f);e.visible&&this._addToBins(f);this._setGraphicVisibility(f,e.visible);y.drawPoly(e,e.visible)}}return!1}_resetIterators(){this._iterators.active=null;this._iterators.visible=null;this._iterators.sort=
null}_ensureActiveGraphicsIterator(){this._iterators.active||(this._iterators.active=H(this._active));return this._iterators.active}_resetActiveGraphicsIterator(){this._iterators.active=null}_ensureVisibleGraphicsIterator(){this._iterators.visible||(this._iterators.visible=H(this._visible));return this._iterators.visible}_resetVisibleGraphicsIterator(){this._iterators.visible=null}_ensureSortGraphicsIterator(){this._iterators.sort||(this._iterators.sort=U(this._visible,this._iterators.sortArray,this.visibilityGroup));
return this._iterators.sort}_resetSortGraphicsIterator(){this._iterators.sort=null}_collectGraphics3DGraphics(a,c,b,f){var d=a.graphics3DGraphic;if(!d.destroyed){var e=a.info[this.visibilityGroup];if(d.isVisible(n.VisibilityGroup.GRAPHIC,n.VisibilityFlag.DECONFLICTION)){var g=this.getGraphicsLayers(d);l.empty(e.aabr);d=null;for(const p of g)if(this.layerSupportsDeconfliction(p)){g=p.stageObject.geometries[0].material;if(null==d&&(d=ca,this._getProjectionInfo(p,c,d),d.isOutsideScreen||this._isCulledBySlice(a,
k)||null!=b&&this._isCulledByHorizon(d,b,f))){e.culled=!0;return}this._expandBoundingRect(e,p,g,d)}null==d?e.culled=!0:(e.distance=d.distance,e.culled=!1)}else e.culled=!0}}_getProjectionInfo(a,c,b){const f=this._runningViewState.camera;a=a.stageObject;var d=a.geometries[0];const e=d.material;var g=v.getCenter(a.boundingVolumeWorldSpace.bounds);q.transformMat4(k,g,f.viewMatrix);g=d.attributes;d=g.get(G.VertexAttribute.NORMAL).data;g=g.get(G.VertexAttribute.AUXPOS1).data;e.applyShaderOffsetsView(k,
d,a.transformation,g,f,b.scaleInfo,k);t.set(r,k[0],k[1],k[2],1);t.transformMat4(u,r,f.projectionMatrix);q.scale(b.positionNDC,u,1/u[3]);e.applyShaderOffsetsNDC(b.positionNDC,g,f,b.positionNDC,z);b.distanceWithoutPolygonOffset=f.depthNDCToWorld(z[2]);b.distance=z[2]===b.positionNDC[2]?b.distanceWithoutPolygonOffset:f.depthNDCToWorld(b.positionNDC[2]);t.set(u,b.positionNDC[0],b.positionNDC[1],b.positionNDC[2],1);t.transformMat4(r,u,c);t.scale(r,r,1/r[3]);q.set(b.positionView,k[0],k[1],k[2])}_isCulledByHorizon(a,
c,b){q.copy(A.direction,a.positionView);q.set(A.origin,0,0,0);return v.intersectRay(c,A,X)?a.distanceWithoutPolygonOffset>b:!1}_isCulledBySlice(a,c){return a.slicePlaneEnabled&&this._runningViewState.slicePlaneEnabled&&x.extrusionContainsPoint(this._runningViewState.slicePlane,c)}_expandBoundingRect(a,c,b,{positionNDC:f,scaleInfo:d}){const e=this._runningViewState.camera;c=c.getScreenSize(da);R.applyPrecomputedScaleFactor(c,d.factor,c);c[0]*=e.pixelRatio;c[1]*=e.pixelRatio;b=l.offset(b.calculateRelativeScreenBounds(c,
d.factorAlignment.scale,Y),C.lerp(0,e.fullWidth,.5+.5*f[0]),C.lerp(0,e.fullHeight,.5+.5*f[1]));f=this.marginFactor;0!==f&&(f*=Math.min(l.width(b),l.height(b)),b[0]-=f,b[1]-=f,b[2]+=f,b[3]+=f);l.expand(a.aabr,b,a.aabr)}_isConflicted(a){const c=a.graphics3DGraphic.graphic.uid;a=a.info[this.visibilityGroup];let b=!0;for(let f=Math.floor(a.aabr[0]/this._accBinsSizeX);f<=Math.floor(a.aabr[2]/this._accBinsSizeX);f++)if(!(0>f||f>=this._accBinsNumX))for(let d=Math.floor(a.aabr[1]/this._accBinsSizeY);d<=Math.floor(a.aabr[3]/
this._accBinsSizeY);d++){if(0>d||d>=this._accBinsNumY)continue;b=!1;const e=this._accBins[f][d];for(let g=0;g<e.length;g++){const p=e.data[g],B=p.info[this.visibilityGroup];if(B&&B.visible&&p.graphics3DGraphic.graphic.uid!==c&&(this.accNumTests++,l.intersects(B.aabr,a.aabr)))return!0}}return b}_initBins(a,c){if(null==this._accBins){this._accBins=[];for(var b=0;b<this._accBinsNumX;b++){this._accBins.push([]);var f=this._accBins[this._accBins.length-1];for(let d=0;d<this._accBinsNumY;d++)f.push(new D)}}else for(b=
0;b<this._accBinsNumX;b++)for(f=0;f<this._accBinsNumY;f++)this._accBins[b][f].clear();this._accBinsSizeX=a/this._accBinsNumX;this._accBinsSizeY=c/this._accBinsNumY;this.accNumTests=0}_addToBins(a){var c=a.info[this.visibilityGroup],b=Math.floor(c.aabr[0]/this._accBinsSizeX);const f=Math.floor(c.aabr[2]/this._accBinsSizeX),d=Math.floor(c.aabr[1]/this._accBinsSizeY);for(c=Math.floor(c.aabr[3]/this._accBinsSizeY);b<=f;b++)if(!(0>b||b>=this._accBinsNumX))for(let e=d;e<=c;e++)0>e||e>=this._accBinsNumY||
this._accBins[b][e].push(a)}_setGraphicVisibility(a,c){a=a.graphics3DGraphic;a.destroyed||(a.setVisibilityFlag(this.visibilityGroup,n.VisibilityFlag.DECONFLICTION,c),this.visibilityGroup===n.VisibilityGroup.LABEL&&this.view.labeler.setLabelGraphicVisibility(a,c))}};w.__decorate([E.property({constructOnly:!0})],h.Deconflictor.prototype,"view",void 0);w.__decorate([E.property({type:Boolean,readOnly:!0})],h.Deconflictor.prototype,"updating",null);h.Deconflictor=w.__decorate([K.subclass("esri.views.3d.layers.graphics.Deconflictor")],
h.Deconflictor);class ea{constructor(){this.id=0;this.visible=!1;this.distance=this.prio=0}}class ba{constructor(a=null,c=null,b=null){this.active=a;this.visible=c;this.sort=b;this.sortArray=new D({allocator:f=>f||new ea})}}const da=N.create();class fa{constructor(){this.positionView=m.create();this.positionNDC=m.create();this.distanceWithoutPolygonOffset=this.distance=0;this.scaleInfo=new T.ScaleInfo}get isOutsideScreen(){const a=this.positionNDC;return-1>a[0]||-1>a[1]||-1>a[2]||1<=a[0]||1<=a[1]}}
const ca=new fa;h.DeconflictorGraphic=aa;h.DeconflictorViewState=I;Object.defineProperty(h,Symbol.toStringTag,{value:"Module"})});
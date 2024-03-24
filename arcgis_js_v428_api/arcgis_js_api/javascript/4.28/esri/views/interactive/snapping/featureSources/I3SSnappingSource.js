// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.28/esri/copyright.txt for details.
//>>built
define("exports ../../../../chunks/tslib.es6 ../../../../core/Accessor ../../../../core/handleUtils ../../../../core/maybe ../../../../core/promiseUtils ../../../../core/accessorSupport/decorators/property ../../../../core/accessorSupport/ensureType ../../../../core/arrayUtils ../../../../core/has ../../../../core/accessorSupport/decorators/subclass ../../../../core/support/UpdatingHandles ../../../3d/webgl-engine/lib/edgeRendering/EdgeWorkerHandle ./sceneLayerSource/SceneLayerSnappingSourceWorkerHandle".split(" "),
function(b,d,l,g,h,m,f,u,v,w,n,p,q,r){function k(a){return c=>a.immediate.schedule(c)}b.I3SSnappingSource=class extends l{get updating(){return this._updatingHandles.updating}constructor(a){super(a);this.availability=1;this._updatingHandles=new p.UpdatingHandles;this._abortController=new AbortController}destroy(){this._tracker=h.removeMaybe(this._tracker);this._abortController=h.abortMaybe(this._abortController);this._updatingHandles.destroy()}initialize(){var {view:a}=this;a=a.resourceController;
this._edgeWorker=new q.EdgeWorkerHandle(k(a));this._workerHandle=new r.SceneLayerSnappingSourceWorkerHandle({renderCoordsHelper:this.view.renderCoordsHelper,schedule:k(a),fetchEdgeLocations:async(c,e)=>{if(null==this._tracker)throw Error("tracker-not-initialized");return this._tracker.fetchEdgeLocations(c,this._edgeWorker,e)}});this._updatingHandles.addPromise(this._setupLayerView());this.addHandles([g.destroyHandle(this._workerHandle),g.destroyHandle(this._edgeWorker)])}async fetchCandidates(a,c){return this._workerHandle.fetchCandidates(a,
c)}refresh(){}async _setupLayerView(){if(!this.destroyed){var a=this._abortController?.signal,c=await this.getLayerView();null==c||m.isAborted(a)||(this._tracker=c.trackSnappingSources({add:(e,t)=>{this._updatingHandles.addPromise(this._workerHandle.add({id:e,bounds:t},a))},remove:e=>{this._updatingHandles.addPromise(this._workerHandle.remove({id:e},a))}}))}}};d.__decorate([f.property({constructOnly:!0})],b.I3SSnappingSource.prototype,"getLayerView",void 0);d.__decorate([f.property({constructOnly:!0})],
b.I3SSnappingSource.prototype,"view",void 0);d.__decorate([f.property({readOnly:!0})],b.I3SSnappingSource.prototype,"updating",null);d.__decorate([f.property({readOnly:!0})],b.I3SSnappingSource.prototype,"availability",void 0);b.I3SSnappingSource=d.__decorate([n.subclass("esri.views.interactive.snapping.featureSources.I3SSnappingSource")],b.I3SSnappingSource);Object.defineProperty(b,Symbol.toStringTag,{value:"Module"})});
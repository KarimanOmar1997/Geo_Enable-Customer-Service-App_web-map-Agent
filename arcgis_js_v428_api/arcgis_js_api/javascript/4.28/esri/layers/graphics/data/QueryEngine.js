// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.28/esri/copyright.txt for details.
//>>built
define("exports ../../../core/arrayUtils ../../../core/Error ../../../core/JSONSupport ../../../core/lang ../../../core/maybe ../../../core/MemCache ../../../core/promiseUtils ../../../core/unitUtils ../../../geometry/projection ../../../geometry/support/aaBoundingBox ../../../geometry/support/aaBoundingRect ../../../geometry/support/boundsUtils ../../../geometry/support/jsonUtils ../../../geometry/support/normalizeUtils ../../../geometry/support/spatialReferenceUtils ../featureConversionUtils ./attributeSupport ./geometryUtils ./projectionSupport ./QueryEngineCapabilities ./QueryEngineResult ./queryUtils ./queryValidationUtils ./spatialQuerySupport ./timeSupport ../../support/FieldsIndex ../../../views/support/Scheduler".split(" "),
function(C,K,Q,R,D,E,L,S,F,T,A,G,U,B,M,u,V,W,H,x,X,n,r,I,y,N,Y,O){class Z{constructor(a,b=null,c,d,e){this.attributes=a;this.geometry=c;this.centroid=d;this.filterFlags=e;this.groupId=-1;this.displayId=b}}const aa=new L.MemCacheStorage(2E6);let ba=0;class ca{constructor(a){this._changeHandle=this._geometryQueryCache=null;this.capabilities={query:X.queryCapabilities};this.geometryType=a.geometryType;this.hasM=!!a.hasM;this.hasZ=!!a.hasZ;this.objectIdField=a.objectIdField;this.spatialReference=a.spatialReference;
this.definitionExpression=a.definitionExpression;this.featureStore=a.featureStore;this.aggregateAdapter=a.aggregateAdapter;this._changeHandle=this.featureStore.events.on("changed",()=>this.clearCache());this.timeInfo=a.timeInfo;a.cacheSpatialQueries&&(this._geometryQueryCache=new L.MemCache(ba++ +"$$",aa));this.fieldsIndex=R.isSerializable(a.fieldsIndex)?a.fieldsIndex:Y.fromJSON(a.fieldsIndex);this.availableFields=null==a.availableFields?new Set(this.fieldsIndex.fields.map(b=>b.name)):new Set(a.availableFields.map(b=>
this.fieldsIndex.get(b)?.name).filter(b=>null!=b));a.scheduler&&a.priority&&(this._frameTask=a.scheduler.registerTask(a.priority))}destroy(){this._frameTask=E.removeMaybe(this._frameTask);this.clearCache();E.destroyMaybe(this._geometryQueryCache);this._changeHandle=E.removeMaybe(this._changeHandle)}get featureAdapter(){return this.featureStore.featureAdapter}clearCache(){this._geometryQueryCache?.clear();this._fullExtentPromise=this._timeExtentPromise=this._allFeaturesPromise=null}async executeQuery(a,
b){try{return(await this._executeQuery(a,{},b)).createQueryResponse()}catch(c){if(c!==r.queryEngineEmptyResult)throw c;return(new n.QueryEngineResult([],a,this)).createQueryResponse()}}async executeQueryForCount(a={},b){try{return(await this._executeQuery(a,{returnGeometry:!1,returnCentroid:!1,outSR:null},b)).createQueryResponseForCount()}catch(c){if(c!==r.queryEngineEmptyResult)throw c;return 0}}async executeQueryForExtent(a,b){const c=a.outSR;try{const d=await this._executeQuery(a,{returnGeometry:!0,
returnCentroid:!1,outSR:null},b),e=d.size;if(!e)return{count:0,extent:null};const f=await this._getBounds(d.items,d.spatialReference,c||this.spatialReference);return{count:e,extent:f}}catch(d){if(d===r.queryEngineEmptyResult)return{count:0,extent:null};throw d;}}async executeQueryForIds(a,b){return this.executeQueryForIdSet(a,b).then(c=>Array.from(c))}async executeQueryForIdSet(a,b){try{const c=await this._executeQuery(a,{returnGeometry:!0,returnCentroid:!1,outSR:null},b),d=c.items,e=new Set;await this._reschedule(()=>
{for(const f of d)e.add(c.featureAdapter.getObjectId(f))},b);return e}catch(c){if(c===r.queryEngineEmptyResult)return new Set;throw c;}}async executeQueryForSnapping(a,b){const {point:c,distance:d,returnEdge:e,vertexMode:f}=a;if(!e&&"none"===f)return{candidates:[]};let h=D.clone(a.query);h=await this._schedule(()=>r.normalizeQueryLike(h,this.definitionExpression,this.spatialReference),b);h=await this._reschedule(()=>I.validateQuery(h,{availableFields:this.availableFields,fieldsIndex:this.fieldsIndex,
geometryType:this.geometryType,spatialReference:this.spatialReference}),b);const l=!u.equals(c.spatialReference,this.spatialReference);l&&await x.checkProjectionSupport(c.spatialReference,this.spatialReference);var g="number"===typeof d?d:d.x,k="number"===typeof d?d:d.y;g={xmin:c.x-g,xmax:c.x+g,ymin:c.y-k,ymax:c.y+k,spatialReference:c.spatialReference};g=l?x.project(g,this.spatialReference):g;if(!g)return{candidates:[]};k=(await M.normalizeCentralMeridian(B.fromJSON(c),null,{signal:b}))[0];const q=
(await M.normalizeCentralMeridian(B.fromJSON(g),null,{signal:b}))[0];if(null==k||null==q)return{candidates:[]};const m=new n.QueryEngineResult(await this._reschedule(()=>this._searchFeatures(this._getQueryBBoxes(q.toJSON())),b),h,this);await this._reschedule(()=>this._executeObjectIdsQuery(m),b);await this._reschedule(()=>this._executeTimeQuery(m),b);await this._reschedule(()=>this._executeAttributesQuery(m),b);await this._reschedule(()=>this._executeGeometryQueryForSnapping(m,b),b);k=k.toJSON();
k=l?x.project(k,this.spatialReference):k;return m.createSnappingResponse({...a,point:k,distance:l?Math.max(g.xmax-g.xmin,g.ymax-g.ymin)/2:d},c.spatialReference)}async executeQueryForLatestObservations(a,b){if(!this.timeInfo?.trackIdField)throw new Q("unsupported-query","Missing timeInfo or timeInfo.trackIdField",{query:a,timeInfo:this.timeInfo});try{const c=await this._executeQuery(a,{},b);await this._reschedule(()=>this._filterLatest(c),b);return c.createQueryResponse()}catch(c){if(c!==r.queryEngineEmptyResult)throw c;
return(new n.QueryEngineResult([],a,this)).createQueryResponse()}}async executeQueryForSummaryStatistics(a={},b,c){const {field:d,normalizationField:e,valueExpression:f}=b;return(await this._executeQueryForStatistics(a,{field:d,normalizationField:e,valueExpression:f},c)).createSummaryStatisticsResponse(b)}async executeQueryForUniqueValues(a={},b,c){const {field:d,field2:e,field3:f,valueExpression:h}=b;return(await this._executeQueryForStatistics(a,{field:d,field2:e,field3:f,valueExpression:h},c)).createUniqueValuesResponse(b)}async executeQueryForClassBreaks(a=
{},b,c){const {field:d,normalizationField:e,valueExpression:f}=b;return(await this._executeQueryForStatistics(a,{field:d,normalizationField:e,valueExpression:f},c)).createClassBreaksResponse(b)}async executeQueryForHistogram(a={},b,c){const {field:d,normalizationField:e,valueExpression:f}=b;return(await this._executeQueryForStatistics(a,{field:d,normalizationField:e,valueExpression:f},c)).createHistogramResponse(b)}async fetchRecomputedExtents(a){this._timeExtentPromise||(this._timeExtentPromise=
N.getTimeExtent(this.timeInfo,this.featureStore));const [b,c]=await Promise.all([this._getFullExtent(),this._timeExtentPromise]);S.throwIfAborted(a);return{fullExtent:b,timeExtent:c}}async _getBounds(a,b,c){const d=A.set(A.create(),A.negativeInfinity);await this.featureStore.forEachBounds(a,e=>A.expandWithAABB(d,e));a={xmin:d[0],ymin:d[1],xmax:d[3],ymax:d[4],spatialReference:H.cleanFromGeometryEngine(this.spatialReference)};this.hasZ&&isFinite(d[2])&&isFinite(d[5])&&(a.zmin=d[2],a.zmax=d[5]);b=x.project(a,
b,c);b.spatialReference=H.cleanFromGeometryEngine(c);0===b.xmax-b.xmin&&(c=F.getMetersPerUnitForSR(b.spatialReference),b.xmin-=c,b.xmax+=c);0===b.ymax-b.ymin&&(c=F.getMetersPerUnitForSR(b.spatialReference),b.ymin-=c,b.ymax+=c);this.hasZ&&null!=b.zmin&&null!=b.zmax&&0===b.zmax-b.zmin&&(c=F.getMetersPerUnitForSR(b.spatialReference),b.zmin-=c,b.zmax+=c);return b}_getFullExtent(){this._fullExtentPromise||(this._fullExtentPromise="getFullExtent"in this.featureStore&&this.featureStore.getFullExtent?Promise.resolve(this.featureStore.getFullExtent(this.spatialReference)):
this._getAllFeatures().then(a=>this._getBounds(a,this.spatialReference,this.spatialReference)));return this._fullExtentPromise}async _schedule(a,b){return null!=this._frameTask?this._frameTask.schedule(a,b):a(O.noBudget)}async _reschedule(a,b){return null!=this._frameTask?this._frameTask.reschedule(a,b):a(O.noBudget)}async _getAllFeaturesQueryEngineResult(a){return new n.QueryEngineResult(await this._getAllFeatures(),a,this)}async _getAllFeatures(){if(null==this._allFeaturesPromise){const c=[];this._allFeaturesPromise=
(async()=>{await this.featureStore.forEach(d=>c.push(d))})().then(()=>c)}const a=this._allFeaturesPromise,b=await a;return a===this._allFeaturesPromise?b.slice():this._getAllFeatures()}async _executeQuery(a,b,c){a=D.clone(a);a=await this._schedule(()=>r.normalizeQuery(a,this.definitionExpression,this.spatialReference),c);a=await this._reschedule(()=>I.validateQuery(a,{availableFields:this.availableFields,fieldsIndex:this.fieldsIndex,geometryType:this.geometryType,spatialReference:this.spatialReference}),
c);a={...a,...b};const d=await this._reschedule(()=>this._executeSceneFilterQuery(a,c),c),e=await this._reschedule(()=>this._executeGeometryQuery(a,d,c),c);await this._reschedule(()=>this._executeAggregateIdsQuery(e),c);await this._reschedule(()=>this._executeObjectIdsQuery(e),c);await this._reschedule(()=>this._executeTimeQuery(e),c);await this._reschedule(()=>this._executeAttributesQuery(e),c);return e}async _executeSceneFilterQuery(a,b){if(null==a.sceneFilter)return null;const {outSR:c,returnGeometry:d,
returnCentroid:e}=a;var f=this.featureStore.featureSpatialReference,h=a.sceneFilter.geometry;const l=null==f||u.equals(f,h.spatialReference)?h:x.project(h,f);if(!l)return null;f=d||e;f=u.isValid(c)&&!u.equals(this.spatialReference,c)&&f?async m=>this._project(m,c):m=>m;const g=this.featureAdapter;h=await this._reschedule(()=>this._searchFeatures(this._getQueryBBoxes(l)),b);if("disjoint"===a.sceneFilter.spatialRelationship){if(!h.length)return null;const m=new Set;for(var k of h)m.add(g.getObjectId(k));
const v=await this._reschedule(()=>this._getAllFeatures(),b);k=await this._reschedule(async()=>{const z=await y.getSpatialQueryOperator("esriSpatialRelDisjoint",l,this.geometryType,this.hasZ,this.hasM),t=await this._runSpatialFilter(v,w=>!m.has(g.getObjectId(w))||z(g.getGeometry(w)),b);return new n.QueryEngineResult(t,a,this)},b);return f(k)}if(!h.length)return new n.QueryEngineResult([],a,this);if(this._canExecuteSinglePass(l,a))return f(new n.QueryEngineResult(h,a,this));const q=await y.getSpatialQueryOperator("esriSpatialRelContains",
l,this.geometryType,this.hasZ,this.hasM);k=await this._runSpatialFilter(h,m=>q(g.getGeometry(m)),b);return f(new n.QueryEngineResult(k,a,this))}async _executeGeometryQuery(a,b,c){if(null!=b&&0===b.items.length)return b;a=null!=b?b.query:a;const {geometry:d,outSR:e,spatialRel:f,returnGeometry:h,returnCentroid:l}=a;var g=this.featureStore.featureSpatialReference;const k=!d||null==g||u.equals(g,d.spatialReference)?d:x.project(d,g),q=h||l,m=u.isValid(e)&&!u.equals(this.spatialReference,e),v=this._geometryQueryCache&&
null==b?m&&q?JSON.stringify({originalFilterGeometry:d,spatialRelationship:f,outSpatialReference:e}):JSON.stringify({originalFilterGeometry:d,spatialRelationship:f}):null;g=v?this._geometryQueryCache.get(v):null;if(null!=g)return new n.QueryEngineResult(g,a,this);g=async p=>{m&&q&&await this._project(p,e);v&&this._geometryQueryCache.put(v,p.items,p.items.length+1);return p};if(!k)return g(null!=b?b:await this._getAllFeaturesQueryEngineResult(a));const z=this.featureAdapter;let t=await this._reschedule(()=>
this._searchFeatures(this._getQueryBBoxes(d)),c);if("esriSpatialRelDisjoint"===f){if(!t.length)return g(null!=b?b:await this._getAllFeaturesQueryEngineResult(a));const p=new Set;for(var w of t)p.add(z.getObjectId(w));const J=null!=b?b.items:await this._reschedule(()=>this._getAllFeatures(),c);w=await this._reschedule(async()=>{const da=await y.getSpatialQueryOperator(f,k,this.geometryType,this.hasZ,this.hasM),ea=await this._runSpatialFilter(J,P=>!p.has(z.getObjectId(P))||da(z.getGeometry(P)),c);return new n.QueryEngineResult(ea,
a,this)},c);return g(w)}if(null!=b){const p=new K.PositionHint;t=t.filter(J=>0<=K.indexOf(b.items,J,b.items.length,p))}if(!t.length)return g=new n.QueryEngineResult([],a,this),v&&this._geometryQueryCache.put(v,g.items,1),g;if(this._canExecuteSinglePass(k,a))return g(new n.QueryEngineResult(t,a,this));const fa=await y.getSpatialQueryOperator(f,k,this.geometryType,this.hasZ,this.hasM);w=await this._runSpatialFilter(t,p=>fa(z.getGeometry(p)),c);return g(new n.QueryEngineResult(w,a,this))}async _executeGeometryQueryForSnapping(a,
b){const {query:c}=a,{spatialRel:d}=c;if(a?.items?.length&&c.geometry&&d){var e=await y.getSpatialQueryOperator(d,c.geometry,this.geometryType,this.hasZ,this.hasM);b=await this._runSpatialFilter(a.items,f=>e(f.geometry),b);a.items=b}}_executeAggregateIdsQuery(a){if(0!==a.items.length&&a.query.aggregateIds?.length&&null!=this.aggregateAdapter){var b=new Set;for(const d of a.query.aggregateIds)this.aggregateAdapter.getFeatureObjectIds(d).forEach(e=>b.add(e));var c=this.featureAdapter.getObjectId;a.items=
a.items.filter(d=>b.has(c(d)))}}_executeObjectIdsQuery(a){if(0!==a.items.length&&a.query.objectIds?.length){var b=new Set(a.query.objectIds),c=this.featureAdapter.getObjectId;a.items=a.items.filter(d=>b.has(c(d)))}}_executeTimeQuery(a){if(0!==a.items.length){var b=N.getTimeOperator(this.timeInfo,a.query.timeExtent,this.featureAdapter);null!=b&&(a.items=a.items.filter(b))}}_executeAttributesQuery(a){if(0!==a.items.length){var b=W.getWhereClause(a.query.where,this.fieldsIndex);if(b){if(!b.isStandardized)throw new TypeError("Where clause is not standardized");
a.items=a.items.filter(c=>b.testFeature(c,this.featureAdapter))}}}async _runSpatialFilter(a,b,c){if(!b)return a;if(null==this._frameTask)return a.filter(h=>b(h));let d=0;const e=[],f=async h=>{for(;d<a.length;){const l=a[d++];b(l)&&(e.push(l),h.madeProgress());h.done&&await this._reschedule(g=>f(g),c)}};return this._reschedule(h=>f(h),c).then(()=>e)}_filterLatest(a){const {trackIdField:b,startTimeField:c,endTimeField:d}=this.timeInfo,e=d||c,f=new Map,h=this.featureAdapter.getAttribute;for(const l of a.items){const g=
h(l,b),k=h(l,e),q=f.get(g);(!q||k>h(q,e))&&f.set(g,l)}a.items=Array.from(f.values())}_canExecuteSinglePass(a,b){({spatialRel:b}=b);return y.canQueryWithRBush(a)&&("esriSpatialRelEnvelopeIntersects"===b||"esriGeometryPoint"===this.geometryType&&("esriSpatialRelIntersects"===b||"esriSpatialRelContains"===b))}async _project(a,b){if(!b||u.equals(this.spatialReference,b))return a;const c=this.featureAdapter;let d=void 0;try{const e=await this._getFullExtent();d=T.getTransformation(this.spatialReference,
b,e)}catch{}b=await x.projectMany(a.items.map(e=>H.getGeometry(this.geometryType,this.hasZ,this.hasM,c.getGeometry(e))),this.spatialReference,b,d);a.items=b.map((e,f)=>c.cloneWithGeometry(a.items[f],V.convertFromGeometry(e,this.hasZ,this.hasM)));return a}_getQueryBBoxes(a){if(y.canQueryWithRBush(a)){if(B.isExtent(a))return[G.fromValues(Math.min(a.xmin,a.xmax),Math.min(a.ymin,a.ymax),Math.max(a.xmin,a.xmax),Math.max(a.ymin,a.ymax))];if(B.isPolygon(a))return a.rings.map(b=>G.fromValues(Math.min(b[0][0],
b[2][0]),Math.min(b[0][1],b[2][1]),Math.max(b[0][0],b[2][0]),Math.max(b[0][1],b[2][1])))}return[U.getBoundsXY(G.create(),a)]}async _searchFeatures(a){const b=new Set;await Promise.all(a.map(c=>this.featureStore.forEachInBounds(c,d=>b.add(d))));a=Array.from(b.values());b.clear();return a}async _executeQueryForStatistics(a,b,c){a=D.clone(a);try{a=await this._schedule(()=>r.normalizeQuery(a,this.definitionExpression,this.spatialReference),c);a=await this._reschedule(()=>I.validateStatisticsQuery(a,b,
{availableFields:this.availableFields,fieldsIndex:this.fieldsIndex,geometryType:this.geometryType,spatialReference:this.spatialReference}),c);const d=await this._reschedule(()=>this._executeSceneFilterQuery(a,c),c),e=await this._reschedule(()=>this._executeGeometryQuery(a,d,c),c);await this._reschedule(()=>this._executeAggregateIdsQuery(e),c);await this._reschedule(()=>this._executeObjectIdsQuery(e),c);await this._reschedule(()=>this._executeTimeQuery(e),c);await this._reschedule(()=>this._executeAttributesQuery(e),
c);return e}catch(d){if(d!==r.queryEngineEmptyResult)throw d;return new n.QueryEngineResult([],a,this)}}}C.Feature=Z;C.QueryEngine=ca;Object.defineProperty(C,Symbol.toStringTag,{value:"Module"})});
// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.28/esri/copyright.txt for details.
//>>built
define("exports ../../../../core/Error ../../../../core/maybe ../../../../core/MemCache ../../../../core/promiseUtils ../../../../core/uuid ../../../../chunks/mat3 ../../../../chunks/mat3f64 ../../../../chunks/vec3 ../../../../chunks/vec3f64 ../../../../geometry/projection/projectBoundingSphere ../../../../chunks/sphere ./I3SClientMaterialUtil".split(" "),function(t,C,I,N,O,P,Q,R,S,T,U,V,W){function J(a,b){var {spatialReference:c}=a;const f=[1,-1],e=[.5*a.width,.5*a.height,a.hasZ?.5*(a.zmax-a.zmin):
0];c=c.isGeographic?c.metersPerUnit:1;const d=a.center;let g=0;if(a.hasZ)for(a=0;2>a;++a)for(var m=0;2>m;++m)for(var n=0;2>n;++n){var k=(d.x+f[a]*e[0]-b.x)*c;const E=(d.y+f[m]*e[1]-b.y)*c,x=d.z+f[n]*e[2]-b.z;g=Math.max(k*k+E*E+x*x,g)}else for(a=0;2>a;++a)for(m=0;2>m;++m)n=(d.x+f[a]*e[0]-b.x)*c,k=(d.y+f[m]*e[1]-b.y)*c,g=Math.max(n*n+k*k,g);return V.fromCenterAndRadius([b.x,b.y,b.z],Math.sqrt(g))}async function K(a,b,c,f){const {transform:e,vertexAttributes:d}=b.loadedMesh;a="source"===a.shading?d.normal:
null;if(null==a||null==e||0===e.rotationAngle&&S.exactEquals(e.scale,T.ONES))return{transformed:a,original:d.normal};if(!b.normalsTransformPromise){I.assertIsSome(c,"SceneLayerWorker is needed to transform mesh normals");const g=R.create();Q.normalFromMat4(g,e.localMatrix);b.normalsTransformPromise=c.transformNormals({normalMatrix:g,normals:a},f)}return b.normalsTransformPromise}function y(a,b,c){a[b]=255&c;a[b+1]=255&c>>8;a[b+2]=255&c>>16;a[b+3]=255&c>>24}class X{constructor(a,b,c,f){this._uid=a;
this._worker=f;this._id2Meta=new Map;this._oid2Meta=new Map;this._indexSR=b.indexSR;this._vertexSR=b.vertexSR;this._renderSR=b.renderSR;this._localMode=b.localMode;this._memCache=c.newCache(`sl-client-mesh-data-${this._uid}`)}get uid(){return this._uid}get worker(){return this._worker}get indexSR(){return this._indexSR}get renderSR(){return this._renderSR}createMeshNodeInfo(a,b){const c=`mesh${b}`;var f=a.extent,e=f.spatialReference,d=this._indexSR;f=J(f,a.origin);U.projectBoundingSphere(f,e,f,d);
d=a.metadata.displaySource?.source;if(null==d||!Array.isArray(d)||!d.length||d[0]instanceof File)var g=P.generateUUID();else{e="";for(g of d)e+=g.makeHash();g=JSON.stringify(null!=a.transform?a.transform.toJSON():"");d=a.vertexSpace.isRelative?JSON.stringify(a.vertexSpace.origin):"";g=e+g+d}return{type:"mesh",id:c,version:g,oid:b,mbs:f,componentNodeIds:[],unloadedMesh:a,nodeIndex:null,loadMeshPromise:null}}addMeshNode(a,b){if(null!=this.getMeshNodeIndex(b.oid))throw new C(`I3SClientNodeLoader: client side mesh for feature oid=${b.oid} already exists`);
b.nodeIndex=a;this._id2Meta.set(b.id,b);this._oid2Meta.set(b.oid,b)}getMeshNodeIndex(a){a=this._oid2Meta.get(a);return null==a||"mesh"!==a.type?null:a.nodeIndex}removeNode(a){const b=this._id2Meta.get(a);null!=b&&(this._id2Meta.delete(a),"mesh"===b.type&&this._oid2Meta.delete(b.oid))}async loadNodeJSON(a){const b=this._id2Meta.get(a);if(null==b)throw new C(`I3SClientNodeLoader::loadNodeJSON unable to find node ${a}`);switch(b.type){case "mesh":return this._loadMeshNodeJSON(b);case "mesh-component":return this._loadMeshComponentNodeJSON(b);
default:throw new C(`I3SClientNodeLoader::loadNodeJSON unable to handle node ${a}`);}}async _loadMeshNodeJSON(a){const b=a.id;var c=(await this._getMeshData(a)).loadedMesh;if(null==c.components||0===c.components.length)return{id:b,version:null,mbs:a.mbs,obb:null,sharedResource:null,geometryData:null,attributeData:null,featureData:null,children:null};const f=[];c=c.components;for(let e=0;e<c.length;++e){const d=`${b}-component${e}`,g={type:"mesh-component",id:d,mbs:a.mbs,componentIndex:e,meshNodeInfo:a,
textureData:new Map};this._id2Meta.set(g.id,g);a.componentNodeIds.push(d);f.push({id:g.id,href:null,mbs:g.mbs,obb:null})}return{id:b,version:null,mbs:a.mbs,obb:null,sharedResource:null,geometryData:null,attributeData:null,featureData:null,children:f}}updateNodeIndex(a,b,c){(a=this._id2Meta.get(a))&&"mesh"===a.type&&(a.nodeIndex=c)}async _loadMeshComponentNodeJSON(a){return{id:a.id,version:a.meshNodeInfo.version,mbs:a.mbs,obb:null,sharedResource:null,geometryData:null,attributeData:null,featureData:null,
children:null,isEmpty:!1}}async loadNodeData(a,b){var c=this._id2Meta.get(a);if(null==c||"mesh-component"!==c.type)throw new C(`Failed to load client node data for node ${a} (unexpected node info)`);var f=c.meshNodeInfo,e=await this._getMeshData(f),d=e.loadedMesh;f=f.oid;if(null==d.components)throw new C(`Failed to load client node data for node ${a} (unexpected null reference)`);a=d.components[c.componentIndex];const {material:g,requiredTextures:m,textureData:n}=await W.convertMeshMaterialToPBRMaterial(a.material);
if(null!=n)for(var k of n)null!=k&&c.textureData.set(k.id,k);c={params:{material:g},type:"ArrayBufferView"};const {vertexSpace:E,origin:x,transform:Y}=d;k=[x.x,x.y,x.z??0];c={featureDataPosition:k,featureIds:[],geometries:[c]};e.projectionPromise||(I.assertIsSome(this._worker,"SceneLayerWorker is needed to project mesh"),e.projectionPromise=this._worker.project({positions:d.vertexAttributes.position,localMatrix:Y?.localMatrix,vertexSpace:E.toJSON(),origin:k,inSpatialReference:d.spatialReference.toJSON(),
outSpatialReference:this._vertexSR.toJSON(),localMode:this._localMode},b));const {projected:F,original:Z}=await e.projectionPromise;d.vertexAttributes.position=Z;const {transformed:D,original:aa}=await K(a,e,this._worker,b);d.vertexAttributes.normal=aa;O.throwIfAborted(b);b=a.faces;e=d.vertexAttributes.uv;d=d.vertexAttributes.color;a=b.length/3;var p=3*a,h,q=0;k=!1;var v=0;let L=!1;var z=0;let M=!1;var u=0;let G=0,H=0;q=h=8;h+=12*p;null!=D&&(k=!0,v=h,h+=12*p);null!=e&&(L=!0,z=h,h+=8*p);null!=d&&(M=
!0,u=h,h+=4*p);G=h;H=h+=8;h=new ArrayBuffer(h+8);const A=new Uint8Array(h);y(A,0,p);y(A,4,1);p=new Float32Array(h,q);v=null!=D?new Float32Array(h,v):null;z=null!=e?new Float32Array(h,z):null;u=null!=d?new Uint8Array(h,u):null;for(q=0;q<a;++q){const ba=3*q;for(let B=0;3>B;++B){var w=b[ba+B],l=3*w,r=9*q+3*B;p[r]=F[l];p[r+1]=F[l+1];p[r+2]=F[l+2];null!=v&&(v[r]=D[l],v[r+1]=D[l+1],v[r+2]=D[l+2]);null!=z&&(l=2*w,r=6*q+2*B,z[r]=e[l],z[r+1]=e[l+1]);null!=u&&(w*=4,l=12*q+4*B,u[l]=d[w],u[l+1]=d[w+1],u[l+2]=
d[w+2],u[l+3]=d[w+3])}}y(A,G,f);y(A,G+4,f/2**32);y(A,H,0);y(A,H+4,a-1);const {geometryBuffer:ca,geometryDescriptor:da}={geometryBuffer:h,geometryDescriptor:{isDraco:!1,isLegacy:!0,color:M,normal:k,uv0:L,uvRegion:!1,featureIndex:!0}};return{geometryData:c,attributeDataInfo:{attributeData:{},loadedAttributes:[]},geometryBuffer:ca,geometryDescriptor:da,requiredTextures:m,textureData:n,normalReferenceFrame:this._vertexSR.isGeographic?"east-north-up":"vertex-reference-frame"}}async loadAttributes(a,b,
c){a=a.numFeatures;c={};for(const {field:{name:f}}of b)c[f]=Array(a);return c}async loadTextures(a,b,c){c=this._id2Meta.get(a.id);if(null==c||"mesh-component"!==c.type)throw Error(`Failed to load textures for node ${a.id} (unexpected node info)`);a=[];for(const f of b)a.push(c.textureData.get(f.id)||null);return a}async _getMeshData(a){const b=a.version,c=this._memCache.get(b);if(null==c){if(null!=a.loadMeshPromise)return a.loadMeshPromise;const f=async(e,d)=>{var g=a.unloadedMesh.clone();try{await g.load()}catch(m){d(m)}d=
g.memoryUsage;g={loadedMesh:g,projectionPromise:null,normalsTransformPromise:null,usedMemoryInBytes:d};this._memCache.put(b,g,d,N.minPriority);a.loadMeshPromise=null;e(g)};a.loadMeshPromise=new Promise((e,d)=>f(e,d));return a.loadMeshPromise}return c}}t.I3SClientNodeLoader=X;t.createSphereFromExtent=J;t.sizeOfFloat32=4;t.sizeOfInt32=4;t.sizeOfUInt64=8;t.sizeOfUInt8=1;t.transformNormals=K;Object.defineProperty(t,Symbol.toStringTag,{value:"Module"})});
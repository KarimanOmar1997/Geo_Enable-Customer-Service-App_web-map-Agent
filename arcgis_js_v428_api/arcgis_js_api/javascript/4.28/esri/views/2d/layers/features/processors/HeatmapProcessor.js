// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.28/esri/copyright.txt for details.
//>>built
define("../../../../../chunks/tslib.es6 ../../../../../core/has ../../../../../core/Logger ../../../../../core/accessorSupport/ensureType ../../../../../core/arrayUtils ../../../../../core/Error ../../../../../core/accessorSupport/decorators/subclass ../../../../../core/accessorSupport/diffUtils ../../../../../renderers/support/heatmapUtils ../../../engine/webgl/definitions ./BaseProcessor ../support/tileUtils".split(" "),function(q,l,z,A,B,C,r,t,u,v,w,e){function x(b){const c=b.key,d=new Map,a=v.tileSize;
b=b.tileInfoView.tileInfo.isWrappable;d.set(e.getPow2NeighborKey(c,-1,-1,b).id,new f([-a,-a],[a-256,a-256,a,a]));d.set(e.getPow2NeighborKey(c,0,-1,b).id,new f([0,-a],[0,a-256,a,a]));d.set(e.getPow2NeighborKey(c,1,-1,b).id,new f([a,-a],[0,a-256,256,a]));d.set(e.getPow2NeighborKey(c,-1,0,b).id,new f([-a,0],[a-256,0,a,a]));d.set(e.getPow2NeighborKey(c,1,0,b).id,new f([a,0],[0,0,256,a]));d.set(e.getPow2NeighborKey(c,-1,1,b).id,new f([-a,a],[a-256,0,a,256]));d.set(e.getPow2NeighborKey(c,0,1,b).id,new f([0,
a],[0,0,a,256]));d.set(e.getPow2NeighborKey(c,1,1,b).id,new f([a,a],[0,0,256,256]));return d}class f{constructor(b,c){this.offset=b;this.extent=c}}l=class extends w{constructor(){super(...arguments);this.type="heatmap";this._tileKeyToFeatureSets=new Map}initialize(){this.addHandles([this.tileStore.on("update",this.onTileUpdate.bind(this))])}async update(b,c){c=c.schema.processors[0];"heatmap"===c.type&&t.diff(this._schema,c)&&(b.mesh=!0,this._schema=c)}onTileUpdate(b){for(const c of b.removed)this._tileKeyToFeatureSets.delete(c.key.id)}onTileClear(b){this._tileKeyToFeatureSets.delete(b.key.id);
return this.remoteClient.invoke("tileRenderer.onTileData",{tileKey:b.id,data:{clear:!0}})}async onTileMessage(b,c,d){this._tileKeyToFeatureSets.has(b.key.id)||this._tileKeyToFeatureSets.set(b.key.id,new Map);const a=this._tileKeyToFeatureSets.get(b.key.id);a&&null!=c.addOrUpdate&&c.addOrUpdate.hasFeatures&&a.set(c.addOrUpdate.instance,c);if(c.end){const m=[],n=x(b);this._tileKeyToFeatureSets.forEach((p,g)=>{if(g===b.key.id)p.forEach(({addOrUpdate:h})=>{h&&m.push(h)});else if(n.has(g)){g=n.get(g);
const [h,y]=g.offset;p.forEach(({addOrUpdate:k})=>{k&&(k=k.transform(h,y,1,1),m.push(k))})}});c=u.calculateHeatmapIntensityInfoReaders(m,this._schema.mesh,512,512);return this.remoteClient.invoke("tileRenderer.onTileData",{tileKey:b.key.id,intensityInfo:c},{...d,transferList:[c.matrix]})}}onTileError(b,c,d){return this.remoteClient.invoke("tileRenderer.onTileError",{tileKey:b.id,error:c},d)}};return l=q.__decorate([r.subclass("esri.views.2d.layers.features.processors.HeatmapProcessor")],l)});
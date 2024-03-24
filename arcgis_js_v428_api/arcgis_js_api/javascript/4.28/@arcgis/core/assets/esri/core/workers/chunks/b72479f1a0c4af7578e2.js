"use strict";(self.webpackChunkRemoteClient=self.webpackChunkRemoteClient||[]).push([[7694],{97853:(e,t,s)=>{s.d(t,{B:()=>l});var i=s(29768),r=s(21972),o=s(34250),n=(s(91306),s(48578),s(17533));let a=class extends r.Z{initialize(){}destroy(){}get supportsTileUpdates(){return!1}get spatialReference(){const e=this.tileStore.tileScheme.spatialReference;return e&&e.toJSON()||null}};(0,i._)([(0,o.Cb)({readOnly:!0})],a.prototype,"supportsTileUpdates",null),(0,i._)([(0,o.Cb)({constructOnly:!0})],a.prototype,"remoteClient",void 0),(0,i._)([(0,o.Cb)({constructOnly:!0})],a.prototype,"service",void 0),(0,i._)([(0,o.Cb)()],a.prototype,"spatialReference",null),(0,i._)([(0,o.Cb)({constructOnly:!0})],a.prototype,"tileInfo",void 0),(0,i._)([(0,o.Cb)({constructOnly:!0})],a.prototype,"tileStore",void 0),a=(0,i._)([(0,n.j)("esri.views.2d.layers.features.processors.BaseProcessor")],a);const l=a},57694:(e,t,s)=>{s.r(t),s.d(t,{default:()=>h});var i=s(29768),r=(s(48578),s(92143),s(91306),s(60991),s(17533)),o=s(93939),n=s(60045),a=s(82356),l=s(97853),d=s(22233);s(31450),s(76506),s(86656),s(66396),s(22723),s(6540),s(21972),s(34250),s(379),s(62062),s(6906),s(79456),s(50406),s(15324),s(75067),s(89914),s(82426),s(72836),s(66106),s(29794),s(7200),s(68681);class c{constructor(e,t){this.offset=e,this.extent=t}}let p=class extends l.B{constructor(){super(...arguments),this.type="heatmap",this._tileKeyToFeatureSets=new Map}initialize(){this.addHandles([this.tileStore.on("update",this.onTileUpdate.bind(this))])}async update(e,t){const s=t.schema.processors[0];"heatmap"===s.type&&(0,o.d)(this._schema,s)&&(e.mesh=!0,this._schema=s)}onTileUpdate(e){for(const t of e.removed)this._tileKeyToFeatureSets.delete(t.key.id)}onTileClear(e){return this._tileKeyToFeatureSets.delete(e.key.id),this.remoteClient.invoke("tileRenderer.onTileData",{tileKey:e.id,data:{clear:!0}})}async onTileMessage(e,t,s){this._tileKeyToFeatureSets.has(e.key.id)||this._tileKeyToFeatureSets.set(e.key.id,new Map);const i=this._tileKeyToFeatureSets.get(e.key.id);if(i&&null!=t.addOrUpdate&&t.addOrUpdate.hasFeatures&&i.set(t.addOrUpdate.instance,t),t.end){const t=[],i=function(e){const t=e.key,s=new Map,i=256,r=a.o,o=e.tileInfoView.tileInfo.isWrappable;return s.set((0,d.g)(t,-1,-1,o).id,new c([-r,-r],[r-i,r-i,r,r])),s.set((0,d.g)(t,0,-1,o).id,new c([0,-r],[0,r-i,r,r])),s.set((0,d.g)(t,1,-1,o).id,new c([r,-r],[0,r-i,i,r])),s.set((0,d.g)(t,-1,0,o).id,new c([-r,0],[r-i,0,r,r])),s.set((0,d.g)(t,1,0,o).id,new c([r,0],[0,0,i,r])),s.set((0,d.g)(t,-1,1,o).id,new c([-r,r],[r-i,0,r,i])),s.set((0,d.g)(t,0,1,o).id,new c([0,r],[0,0,r,i])),s.set((0,d.g)(t,1,1,o).id,new c([r,r],[0,0,i,i])),s}(e);this._tileKeyToFeatureSets.forEach(((s,r)=>{if(r===e.key.id)s.forEach((({addOrUpdate:e})=>{e&&t.push(e)}));else if(i.has(r)){const e=i.get(r),[o,n]=e.offset;s.forEach((({addOrUpdate:e})=>{if(e){const s=e.transform(o,n,1,1);t.push(s)}}))}}));const r=(0,n.b)(t,this._schema.mesh,512,512),o={tileKey:e.key.id,intensityInfo:r},l=[r.matrix];return this.remoteClient.invoke("tileRenderer.onTileData",o,{...s,transferList:l})}}onTileError(e,t,s){return this.remoteClient.invoke("tileRenderer.onTileError",{tileKey:e.id,error:t},s)}};p=(0,i._)([(0,r.j)("esri.views.2d.layers.features.processors.HeatmapProcessor")],p);const h=p},22233:(e,t,s)=>{function i(e,t,s,i){const r=e.clone(),o=1<<r.level,n=r.col+t,a=r.row+s;return i&&n<0?(r.col=n+o,r.world-=1):n>=o?(r.col=n-o,r.world+=1):r.col=n,r.row=a,r}s.d(t,{g:()=>i})}}]);
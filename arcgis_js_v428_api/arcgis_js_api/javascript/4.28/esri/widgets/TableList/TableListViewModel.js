// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.28/esri/copyright.txt for details.
//>>built
define("../../chunks/tslib.es6 ../../core/Collection ../../core/Evented ../../core/reactiveUtils ../../core/accessorSupport/decorators/property ../../core/accessorSupport/ensureType ../../core/arrayUtils ../../core/has ../../core/accessorSupport/decorators/subclass ../LayerList/support/layerListUtils ./ListItem".split(" "),function(f,d,n,g,h,t,u,v,p,q,k){const l=d.ofType(k);d=class extends n.EventedAccessor{constructor(a){super(a);this.checkPublishStatusEnabled=!1;this.listItemCreatedFunction=null;
this.tableItems=new l;this.map=null}initialize(){this.addHandles([g.watch(()=>[this.map,this.map?.loaded],()=>this._mapHandles(),g.initial),g.watch(()=>[this.listItemCreatedFunction,this.checkPublishStatusEnabled],()=>this._recompileList())],"map")}destroy(){this.map=null;this.tableItems.removeAll()}get state(){const a=this.map?.loadStatus;return"string"===typeof a?"loaded"===a?"ready":"loading"===a?"loading":"disabled":"disabled"}triggerAction(a,b){a&&!a.disabled&&this.emit("trigger-action",{action:a,
item:b})}_mapHandles(){const {map:a}=this;this.removeHandles("tables");this._compileList();a&&this.addHandles(g.watch(()=>this.map?.allTables?.toArray(),()=>this._compileList(),g.initial),"tables")}_removeAllItems(){this.tableItems.removeAll()}_getViewableTables(a){if(a)return a.filter(b=>"hide"!==q.findLayerListMode(b))}_watchTablesListMode(a){this.removeHandles("layer-list-mode");a&&a.forEach(b=>{this.addHandles(g.watch(()=>b.listMode,()=>this._compileList()),"layer-list-mode")})}_compileList(){var a=
this.map?.tables;this._watchTablesListMode(a);a=this._getViewableTables(a);a?.length?(this._createNewItems(a),this._removeItems(a),this._sortItems(a)):this._removeAllItems()}_createNewItems(a){const {tableItems:b,listItemCreatedFunction:c,checkPublishStatusEnabled:e}=this;a.forEach(m=>{b.find(r=>r.layer===m)||b.add(new k({checkPublishStatusEnabled:e,layer:m,listItemCreatedFunction:c}))})}_removeItems(a){const {tableItems:b}=this;b.forEach(c=>{c&&(a?.find(e=>c.layer===e)||b.remove(c))})}_sortItems(a){const {tableItems:b}=
this;b.sort((c,e)=>{c=a.indexOf(c.layer);e=a.indexOf(e.layer);return c>e?-1:c<e?1:0})}_recompileList(){this._removeAllItems();this._compileList()}};f.__decorate([h.property()],d.prototype,"checkPublishStatusEnabled",void 0);f.__decorate([h.property()],d.prototype,"listItemCreatedFunction",void 0);f.__decorate([h.property({type:l,readOnly:!0})],d.prototype,"tableItems",void 0);f.__decorate([h.property()],d.prototype,"map",void 0);f.__decorate([h.property({readOnly:!0})],d.prototype,"state",null);return d=
f.__decorate([p.subclass("esri.widgets.TableList.TableListViewModel")],d)});
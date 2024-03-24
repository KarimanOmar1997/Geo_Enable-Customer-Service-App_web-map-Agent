"use strict";(self.webpackChunkRemoteClient=self.webpackChunkRemoteClient||[]).push([[4151],{24151:(e,t,i)=>{i.d(t,{default:()=>_});var s=i(60991),r=i(92143),n=i(92482),a=i(98380),o=i(92653),h=i(31292),l=i(59751),d=i(52991);i(76506),i(48578),i(31450),i(82426),i(72836),i(66106),i(29794),i(21801),i(29768),i(34250),i(91306),i(66396),i(22723),i(86656),i(17533),i(6540),i(73796),i(12047),i(21972),i(379),i(62062),i(6906),i(79456),i(50406),i(97714),i(60947),i(53785),i(57251),i(89623),i(73173),i(82058),i(88762),i(32101),i(2906),i(91597),i(86787),i(35132),i(1623),i(89914),i(84069),i(44567),i(89034),i(92896),i(50626),i(92624),i(92847),i(32422),i(95533),i(94751),i(95307),i(74569),i(22781),i(19124),i(20438),i(24251),i(77314),i(40267),i(53326),i(93314),i(35197),i(8925),i(3482),i(76131),i(36097),i(59465),i(69218),i(97546),i(9801),i(53523),i(42911),i(46826),i(45433),i(54732),i(32925),i(66122),i(50619),i(27207),i(75067),i(35970),i(98576),i(5777),i(93939),i(15324),i(60217),i(21929),i(48675),i(35154),i(55477);const u=r.L.getLogger("esri.views.2d.layers.features.support.whereUtils"),c={getAttribute:(e,t)=>e.readAttribute(t)};class _{constructor(e){this._geometryBounds=(0,n.c)(),this._idToVisibility=new Map,this._serviceInfo=e}get hash(){return this._hash}check(e){return this._applyFilter(e)}clear(){const e=this._resetAllHiddenIds();return this.update(),{show:e,hide:[]}}invalidate(){this._idToVisibility.forEach(((e,t)=>{this._idToVisibility.set(t,0)}))}setKnownIds(e){for(const t of e)this._idToVisibility.set(t,1)}setTrue(e){const t=[],i=[],s=new Set(e);return this._idToVisibility.forEach(((e,r)=>{const n=!!(1&this._idToVisibility.get(r)),a=s.has(r);!n&&a?t.push(r):n&&!a&&i.push(r),this._idToVisibility.set(r,a?3:0)})),{show:t,hide:i}}createQuery(){const{geometry:e,spatialRel:t,where:i,timeExtent:s,objectIds:r}=this;return h.Z.fromJSON({geometry:e,spatialRel:t,where:i,timeExtent:s,objectIds:r})}async update(e,t){this._hash=JSON.stringify(e);const i=await(0,o.n)(e,null,t);await Promise.all([this._setGeometryFilter(i),this._setIdFilter(i),this._setAttributeFilter(i),this._setTimeFilter(i)])}async _setAttributeFilter(e){if(!e?.where)return this._clause=null,void(this.where=null);this._clause=await async function(e,t){try{const i=await(0,d.E)(e,t);if(!i.isStandardized){const e=new s.Z("mapview - bad input","Unable to apply filter's definition expression, as expression is not standardized.",i);u.error(e)}return e=>{const t=e.readArcadeFeature();return i.testFeature(t,c)}}catch(t){return u.warn("mapview-bad-where-clause","Encountered an error when evaluating where clause",e),e=>!0}}(e.where,this._serviceInfo.fieldsIndex),this.where=e.where}_setIdFilter(e){this._idsToShow=e?.objectIds&&new Set(e.objectIds),this._idsToHide=e?.hiddenIds&&new Set(e.hiddenIds),this.objectIds=e?.objectIds}async _setGeometryFilter(e){if(!e?.geometry)return this._spatialQueryOperator=null,this.geometry=null,void(this.spatialRel=null);const t=e.geometry,i=e.spatialRel||"esriSpatialRelIntersects",s=await(0,o.e)(i,t,this._serviceInfo.geometryType,this._serviceInfo.hasZ,this._serviceInfo.hasM);(0,a.d)(this._geometryBounds,t),this._spatialQueryOperator=s,this.geometry=t,this.spatialRel=i}_setTimeFilter(e){if(this.timeExtent=this._timeOperator=null,e?.timeExtent)if(this._serviceInfo.timeInfo)this.timeExtent=e.timeExtent,this._timeOperator=(0,o.f)(this._serviceInfo.timeInfo,e.timeExtent,l.f);else{const t=new s.Z("feature-layer-view:time-filter-not-available","Unable to apply time filter, as layer doesn't have time metadata.",e.timeExtent);r.L.getLogger("esri.views.2d.layers.features.controllers.FeatureFilter").error(t)}}_applyFilter(e){return this._filterByGeometry(e)&&this._filterById(e)&&this._filterByTime(e)&&this._filterByExpression(e)}_filterByExpression(e){return!this.where||this._clause(e)}_filterById(e){return(!this._idsToHide?.size||!this._idsToHide.has(e.getObjectId()))&&(!this._idsToShow?.size||this._idsToShow.has(e.getObjectId()))}_filterByGeometry(e){if(!this.geometry)return!0;const t=e.readHydratedGeometry();return!!t&&this._spatialQueryOperator(t)}_filterByTime(e){return null==this._timeOperator||this._timeOperator(e)}_resetAllHiddenIds(){const e=[];return this._idToVisibility.forEach(((t,i)=>{1&t||(this._idToVisibility.set(i,1),e.push(i))})),e}}},52991:(e,t,i)=>{async function s(e,t){const{WhereClause:s}=await Promise.all([i.e(2274),i.e(8675)]).then(i.bind(i,72274)).then((e=>e.W));return s.create(e,t)}function r(e,t){return null!=e?null!=t?`(${e}) AND (${t})`:e:t}i.d(t,{E:()=>s,_:()=>r})}}]);
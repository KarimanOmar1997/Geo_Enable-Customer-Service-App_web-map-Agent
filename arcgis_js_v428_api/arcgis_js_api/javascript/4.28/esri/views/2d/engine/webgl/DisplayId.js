// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.28/esri/copyright.txt for details.
//>>built
define(["exports"],function(a){a.aggregateValidFiltersMask=254;a.createDisplayId=function(b,c){return((c?8388608:0)|b)>>>0};a.displayIdTexelMask=8388607;a.displayIdTypeAggregate=1;a.displayIdTypeFeature=0;a.displayIdTypeMask=8388608;a.getDisplayIdFilterMask=b=>1===(b&8388608)>>>23?254:255;a.getDisplayIdTexel=b=>b&8388607;a.getDisplayIdType=b=>(b&8388608)>>>23;a.isAggregateId=function(b){return 1===(b&8388608)>>>23};a.nonAggregateValidFiltersMask=255;Object.defineProperty(a,Symbol.toStringTag,{value:"Module"})});
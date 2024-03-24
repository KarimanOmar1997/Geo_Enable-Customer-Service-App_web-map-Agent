// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.28/esri/copyright.txt for details.
//>>built
define(["exports","../../../../../core/Error","../alignmentUtils","../enums"],function(f,y,z,c){function v(a){return a===c.WGLSymbologyType.SIMPLE||a===c.WGLSymbologyType.OUTLINE_FILL_SIMPLE}function u(a){return a===c.WGLSymbologyType.OUTLINE_FILL||a===c.WGLSymbologyType.OUTLINE_FILL_SIMPLE}const A=Object.keys(c.WGLSymbologyType).filter(a=>"number"===typeof c.WGLSymbologyType[a]).reduce((a,b)=>({...a,[b]:c.WGLSymbologyType[b]}),{});class g{static load(a){const b=this.shared;b.data=a;return b}constructor(a){this._data=
0;this._data=a}set data(a){this._data=a??0}get data(){return this._data}get geometryType(){return this.bits(8,11)}set geometryType(a){this.setBits(a,8,11)}get mapAligned(){return!!this.bit(20)}set mapAligned(a){this.setBit(20,a)}get sdf(){return!!this.bit(11)}set sdf(a){this.setBit(11,a??!1)}get pattern(){return!!this.bit(12)}set pattern(a){this.setBit(12,a)}get textureBinding(){return this.bits(0,8)}set textureBinding(a){this.setBits(a,0,8)}get symbologyType(){return this.bits(21,26)}set symbologyType(a){this.setBits(a,
21,26)}get geometryTypeString(){switch(this.geometryType){case c.WGLGeometryType.FILL:return"fill";case c.WGLGeometryType.MARKER:return"marker";case c.WGLGeometryType.LINE:return"line";case c.WGLGeometryType.TEXT:return"text";case c.WGLGeometryType.LABEL:return"label";default:throw new y(`Unable to handle unknown geometryType: ${this.geometryType}`);}}setBit(a,b){a=1<<a;this._data=b?this._data|a:this._data&~a}bit(a){return(this._data&1<<a)>>a}setBits(a,b,d){for(let e=b,h=0;e<d;e++,h++)this.setBit(e,
0!==(a&1<<h))}bits(a,b){let d=0;for(let e=a,h=0;e<b;e++,h++)d|=this.bit(e)<<h;return d}hasVV(){return!1}setVV(a,b){}getVariation(){return{mapAligned:this.mapAligned,pattern:this.pattern,sdf:this.sdf,symbologyType:{value:c.WGLSymbologyType[this.symbologyType],options:A,namespace:"SYMBOLOGY_TYPE"}}}getVariationHash(){return this._data&~(7&this.textureBinding)}}g.shared=new g(0);const k=a=>class extends a{get vvSizeMinMaxValue(){return 0!==this.bit(16)}set vvSizeMinMaxValue(b){this.setBit(16,b)}get vvSizeScaleStops(){return 0!==
this.bit(17)}set vvSizeScaleStops(b){this.setBit(17,b)}get vvSizeFieldStops(){return 0!==this.bit(18)}set vvSizeFieldStops(b){this.setBit(18,b)}get vvSizeUnitValue(){return 0!==this.bit(19)}set vvSizeUnitValue(b){this.setBit(19,b)}hasSizeVV(){return this.vvSizeMinMaxValue||this.vvSizeScaleStops||this.vvSizeFieldStops||this.vvSizeUnitValue}hasVV(){return super.hasVV()||this.hasSizeVV()}setVV(b,d){super.setVV(b,d);{var e=this.geometryType;const h=c.WGLVVFlag.SIZE_FIELD_STOPS|c.WGLVVFlag.SIZE_MINMAX_VALUE|
c.WGLVVFlag.SIZE_SCALE_STOPS|c.WGLVVFlag.SIZE_UNIT_VALUE,w=(b&(c.WGLVVTarget.FIELD_TARGETS_OUTLINE|c.WGLVVTarget.MINMAX_TARGETS_OUTLINE|c.WGLVVTarget.SCALE_TARGETS_OUTLINE|c.WGLVVTarget.UNIT_TARGETS_OUTLINE))>>>4;d=e===c.WGLGeometryType.LINE&&d.isOutline||e===c.WGLGeometryType.FILL&&u(d.symbologyType)?h&w:h&~w}b&=d;this.vvSizeMinMaxValue=!!(b&c.WGLVVFlag.SIZE_MINMAX_VALUE);this.vvSizeFieldStops=!!(b&c.WGLVVFlag.SIZE_FIELD_STOPS);this.vvSizeUnitValue=!!(b&c.WGLVVFlag.SIZE_UNIT_VALUE);this.vvSizeScaleStops=
!!(b&c.WGLVVFlag.SIZE_SCALE_STOPS)}},x=a=>class extends a{get vvRotation(){return 0!==this.bit(15)}set vvRotation(b){this.setBit(15,b)}hasVV(){return super.hasVV()||this.vvRotation}setVV(b,d){super.setVV(b,d);this.vvRotation=!d.isOutline&&!!(b&c.WGLVVFlag.ROTATION)}},r=a=>class extends a{get vvColor(){return 0!==this.bit(13)}set vvColor(b){this.setBit(13,b)}hasVV(){return super.hasVV()||this.vvColor}setVV(b,d){super.setVV(b,d);this.vvColor=!d.isOutline&&!!(b&c.WGLVVFlag.COLOR)}},t=a=>class extends a{get vvOpacity(){return 0!==
this.bit(14)}set vvOpacity(b){this.setBit(14,b)}hasVV(){return super.hasVV()||this.vvOpacity}setVV(b,d){super.setVV(b,d);this.vvOpacity=!d.isOutline&&!!(b&c.WGLVVFlag.OPACITY)}};class l extends r(t(k(g))){static load(a){const b=this.shared;b.data=a;return b}static from(a){const {symbologyType:b,vvFlags:d}=a,e=this.load(0);e.geometryType=c.WGLGeometryType.FILL;e.symbologyType=b;b!==c.WGLSymbologyType.DOT_DENSITY&&e.setVV(d,a);return e.data}getVariation(){return{...super.getVariation(),vvColor:this.vvColor,
vvOpacity:this.vvOpacity,vvSizeFieldStops:this.vvSizeFieldStops,vvSizeMinMaxValue:this.vvSizeMinMaxValue,vvSizeScaleStops:this.vvSizeScaleStops,vvSizeUnitValue:this.vvSizeUnitValue}}}l.shared=new l(0);class m extends r(t(x(k(g)))){static load(a){const b=this.shared;b.data=a;return b}static from(a){const {symbologyType:b,vvFlags:d}=a,e=this.load(0);e.geometryType=c.WGLGeometryType.MARKER;e.symbologyType=b;b!==c.WGLSymbologyType.HEATMAP&&e.setVV(d,a);return e.data}getVariation(){return{...super.getVariation(),
vvColor:this.vvColor,vvRotation:this.vvRotation,vvOpacity:this.vvOpacity,vvSizeFieldStops:this.vvSizeFieldStops,vvSizeMinMaxValue:this.vvSizeMinMaxValue,vvSizeScaleStops:this.vvSizeScaleStops,vvSizeUnitValue:this.vvSizeUnitValue}}}m.shared=new m(0);class n extends r(t(k(g))){static load(a){const b=this.shared;b.data=a;return b}static from(a){const b=this.load(0);b.geometryType=c.WGLGeometryType.LINE;b.symbologyType=a.symbologyType;b.setVV(a.vvFlags,a);return b.data}getVariation(){return{...super.getVariation(),
vvColor:this.vvColor,vvOpacity:this.vvOpacity,vvSizeFieldStops:this.vvSizeFieldStops,vvSizeMinMaxValue:this.vvSizeMinMaxValue,vvSizeScaleStops:this.vvSizeScaleStops,vvSizeUnitValue:this.vvSizeUnitValue}}}n.shared=new n(0);class p extends r(t(x(k(g)))){static load(a){const b=this.shared;b.data=a;return b}static from(a){const b=this.load(0);b.geometryType=c.WGLGeometryType.TEXT;b.symbologyType=a.symbologyType;b.setVV(a.vvFlags,a);return b.data}getVariation(){return{...super.getVariation(),vvColor:this.vvColor,
vvOpacity:this.vvOpacity,vvRotation:this.vvRotation,vvSizeFieldStops:this.vvSizeFieldStops,vvSizeMinMaxValue:this.vvSizeMinMaxValue,vvSizeScaleStops:this.vvSizeScaleStops,vvSizeUnitValue:this.vvSizeUnitValue}}}p.shared=new p(0);class q extends k(g){static load(a){const b=this.shared;b.data=a;return b}static from(a){const b=this.load(0);b.geometryType=c.WGLGeometryType.LABEL;b.symbologyType=a.symbologyType;b.setVV(a.vvFlags,a);b.mapAligned=z.isMapAligned(a.placement);return b.data}getVariation(){return{...super.getVariation(),
vvSizeFieldStops:this.vvSizeFieldStops,vvSizeMinMaxValue:this.vvSizeMinMaxValue,vvSizeScaleStops:this.vvSizeScaleStops,vvSizeUnitValue:this.vvSizeUnitValue}}}q.shared=new q(0);f.FillMaterialKey=l;f.LabelMaterialKey=q;f.LineMaterialKey=n;f.MarkerMaterialKey=m;f.MaterialKeyBase=g;f.TextMaterialKey=p;f.createMaterialKey=function(a,b){switch(a){case c.WGLGeometryType.FILL:return l.from(b);case c.WGLGeometryType.LINE:return n.from(b);case c.WGLGeometryType.MARKER:return m.from(b);case c.WGLGeometryType.TEXT:return p.from(b);
case c.WGLGeometryType.LABEL:return q.from(b);default:throw Error(`Unable to createMaterialKey for unknown geometryType ${a}`);}};f.hasOutlineFillSymbology=function(a){return u(a.symbologyType)};f.hasSimpleSymbology=function(a){return v(a.symbologyType)};f.hydrateMaterialKey=function(a){switch(g.load(a).geometryType){case c.WGLGeometryType.MARKER:return new m(a);case c.WGLGeometryType.FILL:return new l(a);case c.WGLGeometryType.LINE:return new n(a);case c.WGLGeometryType.TEXT:return new p(a);case c.WGLGeometryType.LABEL:return new q(a)}};
f.isOutlineFillSymbology=u;f.isSimpleSymbology=v;Object.defineProperty(f,Symbol.toStringTag,{value:"Module"})});
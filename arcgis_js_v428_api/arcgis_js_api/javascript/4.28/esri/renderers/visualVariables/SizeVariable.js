// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.28/esri/copyright.txt for details.
//>>built
define("../../chunks/tslib.es6 ../../core/Error ../../core/jsonMap ../../core/Logger ../../core/screenUtils ../../core/accessorSupport/decorators/property ../../core/accessorSupport/decorators/cast ../../core/accessorSupport/decorators/reader ../../core/accessorSupport/decorators/subclass ../../core/accessorSupport/decorators/writer ./VisualVariable ./support/SizeStop ./support/SizeVariableLegendOptions ./support/sizeVariableUtils ./support/visualVariableUtils".split(" "),function(c,v,q,k,w,d,r,l,
x,y,z,A,B,h,C){function t(a){if(null!=a){if("string"===typeof a||"number"===typeof a)return w.toPt(a);if("size"===a.type){if(h.isSizeVariable(a))return a;a={...a};delete a.type;return new b(a)}}}function u(a,e,f){if("object"!==typeof a)return a;e=new b;e.read(a,f);return e}var n;const m=new q.JSONMap({width:"width",depth:"depth",height:"height",widthAndDepth:"width-and-depth",all:"all"}),p=new q.JSONMap({unknown:"unknown",inch:"inches",foot:"feet",yard:"yards",mile:"miles","nautical-mile":"nautical-miles",
millimeter:"millimeters",centimeter:"centimeters",decimeter:"decimeters",meter:"meters",kilometer:"kilometers","decimal-degree":"decimal-degrees"});let b=n=class extends z{constructor(a){super(a);this.target=this.scaleBy=this.normalizationField=this.legendOptions=this.axis=null;this.type="size";this.valueUnit=this.valueRepresentation=this.valueExpression=this.useSymbolValue=null}get cache(){return{ipData:this._interpolateData(),hasExpression:!!this.valueExpression,compiledFunc:null,isScaleDriven:null!=
this.valueExpression&&C.viewScaleRE.test(this.valueExpression)}}set expression(a){k.getLogger(this).warn("'expression' is deprecated since version 4.2. Use 'valueExpression' instead. The only supported expression is 'view.scale'.");"view.scale"===a?(this.valueExpression="$view.scale",this._set("expression",a)):this._set("expression",null)}set index(a){h.isSizeVariable(this.maxSize)&&(this.maxSize.index=`visualVariables[${a}].maxSize`);h.isSizeVariable(this.minSize)&&(this.minSize.index=`visualVariables[${a}].minSize`);
this._set("index",a)}get inputValueType(){return h.getInputValueType(this)}set maxDataValue(a){a&&this.stops&&(k.getLogger(this).warn("cannot set maxDataValue when stops is not null."),a=null);this._set("maxDataValue",a)}set maxSize(a){a&&this.stops&&(k.getLogger(this).warn("cannot set maxSize when stops is not null."),a=null);this._set("maxSize",a)}castMaxSize(a){return t(a)}readMaxSize(a,e,f){return u(a,e,f)}set minDataValue(a){a&&this.stops&&(k.getLogger(this).warn("cannot set minDataValue when stops is not null."),
a=null);this._set("minDataValue",a)}set minSize(a){a&&this.stops&&(k.getLogger(this).warn("cannot set minSize when stops is not null."),a=null);this._set("minSize",a)}castMinSize(a){return t(a)}readMinSize(a,e,f){return u(a,e,f)}get arcadeRequired(){return this.valueExpression?!0:null!=this.minSize&&"object"===typeof this.minSize&&this.minSize.arcadeRequired||null!=this.maxSize&&"object"===typeof this.maxSize&&this.maxSize.arcadeRequired}set stops(a){null==this.minDataValue&&null==this.maxDataValue&&
null==this.minSize&&null==this.maxSize?a&&Array.isArray(a)&&(a=a.filter(e=>!!e),a.sort((e,f)=>e.value-f.value)):a&&(k.getLogger(this).warn("cannot set stops when one of minDataValue, maxDataValue, minSize or maxSize is not null."),a=null);this._set("stops",a)}get transformationType(){return h.getTransformationType(this,this.inputValueType)}readValueExpression(a,e){return a||e.expression&&"$view.scale"}writeValueExpressionWebScene(a,e,f,g){"$view.scale"===a?g?.messages&&(a=this.index,g.messages.push(new v("property:unsupported",
this.type+"VisualVariable.valueExpression \x3d '$view.scale' is not supported in Web Scene. Please remove this property to save the Web Scene.",{instance:this,propertyName:("string"===typeof a?a:`visualVariables[${a}]`)+".valueExpression",context:g}))):e[f]=a}readValueUnit(a){return a?p.read(a):null}clone(){return new n({axis:this.axis,field:this.field,valueExpression:this.valueExpression,valueExpressionTitle:this.valueExpressionTitle,maxDataValue:this.maxDataValue,maxSize:h.isSizeVariable(this.maxSize)?
this.maxSize.clone():this.maxSize,minDataValue:this.minDataValue,minSize:h.isSizeVariable(this.minSize)?this.minSize.clone():this.minSize,normalizationField:this.normalizationField,stops:this.stops?.map(a=>a.clone()),target:this.target,useSymbolValue:this.useSymbolValue,valueRepresentation:this.valueRepresentation,valueUnit:this.valueUnit,legendOptions:this.legendOptions?.clone()})}flipSizes(){if(this.transformationType===h.TransformationType.ClampedLinear){const {minSize:a,maxSize:e}=this;this.minSize=
e;this.maxSize=a;return this}if(this.transformationType===h.TransformationType.Stops){const a=this.stops;if(!a)return this;const e=a.map(g=>g.size).reverse(),f=a.length;for(let g=0;g<f;g++)a[g].size=e[g]}return this}getAttributeHash(){return`${super.getAttributeHash()}-${this.target}-${this.normalizationField}`}_interpolateData(){return this.stops?.map(a=>a.value||0)}};c.__decorate([d.property({readOnly:!0})],b.prototype,"cache",null);c.__decorate([d.property({type:m.apiValues,json:{type:m.jsonValues,
origins:{"web-map":{read:!1}},read:m.read,write:m.write}})],b.prototype,"axis",void 0);c.__decorate([d.property({type:String,value:null,json:{read:!1}})],b.prototype,"expression",null);c.__decorate([d.property()],b.prototype,"index",null);c.__decorate([d.property({type:String,readOnly:!0})],b.prototype,"inputValueType",null);c.__decorate([d.property({type:B,json:{write:!0}})],b.prototype,"legendOptions",void 0);c.__decorate([d.property({type:Number,value:null,json:{write:!0}})],b.prototype,"maxDataValue",
null);c.__decorate([d.property({type:Number,value:null,json:{write:!0}})],b.prototype,"maxSize",null);c.__decorate([r.cast("maxSize")],b.prototype,"castMaxSize",null);c.__decorate([l.reader("maxSize")],b.prototype,"readMaxSize",null);c.__decorate([d.property({type:Number,value:null,json:{write:!0}})],b.prototype,"minDataValue",null);c.__decorate([d.property({type:Number,value:null,json:{write:!0}})],b.prototype,"minSize",null);c.__decorate([r.cast("minSize")],b.prototype,"castMinSize",null);c.__decorate([l.reader("minSize")],
b.prototype,"readMinSize",null);c.__decorate([d.property({type:String,json:{write:!0}})],b.prototype,"normalizationField",void 0);c.__decorate([d.property({readOnly:!0})],b.prototype,"arcadeRequired",null);c.__decorate([d.property({type:String})],b.prototype,"scaleBy",void 0);c.__decorate([d.property({type:[A],value:null,json:{write:!0}})],b.prototype,"stops",null);c.__decorate([d.property({type:["outline"],json:{write:!0}})],b.prototype,"target",void 0);c.__decorate([d.property({type:String,readOnly:!0})],
b.prototype,"transformationType",null);c.__decorate([d.property({type:["size"],json:{type:["sizeInfo"]}})],b.prototype,"type",void 0);c.__decorate([d.property({type:Boolean,json:{write:!0,origins:{"web-map":{read:!1}}}})],b.prototype,"useSymbolValue",void 0);c.__decorate([d.property({type:String,json:{write:!0}})],b.prototype,"valueExpression",void 0);c.__decorate([l.reader("valueExpression",["valueExpression","expression"])],b.prototype,"readValueExpression",null);c.__decorate([y.writer("web-scene",
"valueExpression")],b.prototype,"writeValueExpressionWebScene",null);c.__decorate([d.property({type:["radius","diameter","area","width","distance"],json:{write:!0}})],b.prototype,"valueRepresentation",void 0);c.__decorate([d.property({type:p.apiValues,json:{write:p.write,origins:{"web-map":{read:!1},"web-scene":{write:!0},"portal-item":{write:!0}}}})],b.prototype,"valueUnit",void 0);c.__decorate([l.reader("valueUnit")],b.prototype,"readValueUnit",null);return b=n=c.__decorate([x.subclass("esri.renderers.visualVariables.SizeVariable")],
b)});
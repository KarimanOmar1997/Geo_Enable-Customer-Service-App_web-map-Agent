/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.28/esri/copyright.txt for details.
*/
import{_ as r}from"./tslib.es6.js";import{ClonableMixin as e}from"../core/Clonable.js";import{JSONSupport as o}from"../core/JSONSupport.js";import{property as t}from"../core/accessorSupport/decorators/property.js";import"./ensureType.js";import"./typedArrayUtil.js";import{subclass as s}from"../core/accessorSupport/decorators/subclass.js";let p=class extends(e(o)){constructor(r){super(r),this.onFields=null,this.operator=null,this.searchTerm=null,this.searchType=null}};r([t({type:[String],json:{write:{enabled:!0,overridePolicy(){return{enabled:null!=this.onFields&&this.onFields.length>0}}}}})],p.prototype,"onFields",void 0),r([t({type:String,json:{write:!0}})],p.prototype,"operator",void 0),r([t({type:String,json:{write:!0}})],p.prototype,"searchTerm",void 0),r([t({type:String,json:{write:!0}})],p.prototype,"searchType",void 0),p=r([s("esri.rest.support.FullTextSearch")],p);const i=p;export{i as F};
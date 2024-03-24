// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.28/esri/copyright.txt for details.
//>>built
define(["exports","../../../../core/has","../../../input/InputHandler"],function(f,k,g){var d;(function(a){a[a.IN=0]="IN";a[a.OUT=1]="OUT"})(d||(d={}));class h extends g.InputHandler{constructor(a,b,e){super(!0);this.view=a;this.keys=b;this._keysToZoomAction={};this.registerIncoming("key-down",e,c=>this._handleKeyDown(c));b.zoomIn.forEach(c=>this._keysToZoomAction[c]=d.IN);b.zoomOut.forEach(c=>this._keysToZoomAction[c]=d.OUT)}_handleKeyDown(a){this._handleKey(a)}_handleKey(a){var b=a.modifiers;if(!(0<
b.size)||b.has("Shift"))if({key:b}=a.data,b in this._keysToZoomAction){b=this._keysToZoomAction[b];var {mapViewNavigation:e}=this.view,c=null;switch(b){case d.IN:c=e.zoomIn();break;case d.OUT:c=e.zoomOut();break;default:return}e.begin();c.then(()=>e.end());a.stopPropagation()}}}f.KeyZoom=h;Object.defineProperty(f,Symbol.toStringTag,{value:"Module"})});
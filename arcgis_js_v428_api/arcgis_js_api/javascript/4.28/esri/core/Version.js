// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.28/esri/copyright.txt for details.
//>>built
define(["exports","./Error"],function(h,e){let f=class{constructor(a,b,c=""){this.major=a;this.minor=b;this._context=c}lessThan(a,b){return this.major<a||a===this.major&&this.minor<b}since(a,b){return!this.lessThan(a,b)}validate(a){if(this.major!==a.major)throw new e((this._context&&this._context+":")+"unsupported-version",`Required major ${this._context&&this._context+" "}version is '${this.major}', but got '\${version.major}.\${version.minor}'`,{version:a});}clone(){return new f(this.major,this.minor,
this._context)}static parse(a,b=""){const [c,g]=a.split(".");var d=/^\s*\d+\s*$/;if(!c?.match||!d.test(c))throw new e((b&&b+":")+"invalid-version","Expected major version to be a number, but got '${version}'",{version:a});if(!g?.match||!d.test(g))throw new e((b&&b+":")+"invalid-version","Expected minor version to be a number, but got '${version}'",{version:a});a=parseInt(c,10);d=parseInt(g,10);return new f(a,d,b)}};h.Version=f;Object.defineProperty(h,Symbol.toStringTag,{value:"Module"})});
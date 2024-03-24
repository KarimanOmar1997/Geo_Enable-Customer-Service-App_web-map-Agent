// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.28/esri/copyright.txt for details.
//>>built
define(["exports","../../../../core/PooledArray","../../../webgl/checkWebGLError"],function(d,e,f){class g{constructor(a,b,c){this._context=a;this._locations=c;this._textures=new Map;this._freeTextureUnits=new e({deallocator:null});this._glProgram=a.programCache.acquire(b.generate("vertex"),b.generate("fragment"),c);this._glProgram.stop=()=>{throw Error("Wrapped _glProgram used directly");};this.bindPass=b.generateBindPass(this);this.bindDraw=b.generateBindDraw(this);this._fragmentUniforms=f.webglDebugEnabled()?
b.fragmentUniforms:null}dispose(){this._glProgram.dispose()}get glName(){return this._glProgram.glName}get compiled(){return this._glProgram.compiled}setUniform1b(a,b){this._glProgram.setUniform1i(a,b?1:0)}setUniform1i(a,b){this._glProgram.setUniform1i(a,b)}setUniform1f(a,b){this._glProgram.setUniform1f(a,b)}setUniform2fv(a,b){this._glProgram.setUniform2fv(a,b)}setUniform3fv(a,b){this._glProgram.setUniform3fv(a,b)}setUniform4fv(a,b){this._glProgram.setUniform4fv(a,b)}setUniformMatrix3fv(a,b){this._glProgram.setUniformMatrix3fv(a,
b)}setUniformMatrix4fv(a,b){this._glProgram.setUniformMatrix4fv(a,b)}setUniform1fv(a,b){this._glProgram.setUniform1fv(a,b)}setUniform1iv(a,b){this._glProgram.setUniform1iv(a,b)}setUniform2iv(a,b){this._glProgram.setUniform3iv(a,b)}setUniform3iv(a,b){this._glProgram.setUniform3iv(a,b)}setUniform4iv(a,b){this._glProgram.setUniform4iv(a,b)}assertCompatibleVertexAttributeLocations(a){a.locations!==this._locations&&console.error("VertexAttributeLocations are incompatible")}stop(){this._textures.clear();
this._freeTextureUnits.clear()}bindTexture(a,b){if(null==b?.glName){if(b=this._textures.get(a))this._context.bindTexture(null,b.unit),this._freeTextureUnit(b),this._textures.delete(a);return null}let c=this._textures.get(a);null==c?(c=this._allocTextureUnit(b),this._textures.set(a,c)):c.texture=b;this._context.useProgram(this);this.setUniform1i(a,c.unit);this._context.bindTexture(b,c.unit);return c.unit}rebindTextures(){this._context.useProgram(this);this._textures.forEach((a,b)=>{this._context.bindTexture(a.texture,
a.unit);this.setUniform1i(b,a.unit)});null!=this._fragmentUniforms&&this._fragmentUniforms.forEach(a=>{"sampler2D"!==a.type&&"samplerCube"!==a.type||this._textures.has(a.name)||console.error(`Texture sampler ${a.name} has no bound texture`)})}_allocTextureUnit(a){return{texture:a,unit:0===this._freeTextureUnits.length?this._textures.size:this._freeTextureUnits.pop()}}_freeTextureUnit(a){this._freeTextureUnits.push(a.unit)}}d.Program=g;Object.defineProperty(d,Symbol.toStringTag,{value:"Module"})});
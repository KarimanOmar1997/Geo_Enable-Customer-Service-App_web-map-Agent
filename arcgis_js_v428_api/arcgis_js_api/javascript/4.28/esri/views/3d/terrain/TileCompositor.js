// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.28/esri/copyright.txt for details.
//>>built
define("exports ../../../core/Logger ../../../core/maybe ../../../chunks/vec2f64 ../../2d/engine/imagery/enums ../../2d/engine/vectorTiles/VectorTileRendererHelper3D ./BlendLayersTechnique ./LayerClass ./RasterColorizerTechnique ./support/MultiSizeFramebuffer ../webgl-engine/core/shaderLibrary/output/BlendOptions ../webgl-engine/core/shaderLibrary/terrain/TileBackground.glsl ../../../chunks/BlendLayers.glsl ../webgl-engine/lib/BindParameters ../webgl-engine/lib/DefaultVertexBufferLayouts ../webgl-engine/lib/glUtil3D ../../webgl/enums ../../webgl/Texture ../../webgl/Util".split(" "),
function(r,G,l,H,t,I,u,v,w,x,q,f,y,J,K,L,m,z,M){const N=G.getLogger("esri.views.3d.terrain");class O{constructor(a,b){this._rctx=a;this._techniqueRepository=b;this._fbos=[];this._vectorTileHelper=new I.VectorTileRendererHelper3D;this._bindParameters=new J.BindParameters(null,null);this._blendLayersTechniqueConfig=new u.BlendLayersTechniqueConfiguration;this._current=0;this._lastUsedIds=[];this._lastCreatedBufferId=0;this._onHoldIds=[];this._vaoQuad=L.createQuadVAO(this._rctx,K.Pos2Tex)}dispose(){this._fbos.forEach(l.disposeMaybe);
this._fbos=null;this._vtFBO=l.disposeMaybe(this._vtFBO);this._vaoQuad=l.disposeMaybe(this._vaoQuad);this._vectorTileHelper=l.disposeMaybe(this._vectorTileHelper);this._backgroundTechnique=l.releaseMaybe(this._backgroundTechnique);this._applyOpacityTechnique=l.releaseMaybe(this._applyOpacityTechnique);this._blendLayersTechnique=l.releaseMaybe(this._blendLayersTechnique)}_getBlendLayersTechnique(a,b,c,e=f.PremultipliedAlphaSource.Off,g=y.BackgroundMode.BelowLayer){this._blendLayersTechniqueConfig.output=
b;this._blendLayersTechniqueConfig.blendMode=a;this._blendLayersTechniqueConfig.baseOpacityMode=c;this._blendLayersTechniqueConfig.premultipliedSource=e;this._blendLayersTechniqueConfig.background=g;return this._blendLayersTechnique=this._techniqueRepository.releaseAndAcquire(u.BlendLayersTechnique,this._blendLayersTechniqueConfig,this._blendLayersTechnique)}drawBackground(a,b){b=this._getBlendLayersTechnique(q.LayerBlendMode.Normal,b?f.BlendLayersOutput.ColorComposite:f.BlendLayersOutput.GridComposite,
f.BaseOpacityMode.NotRequired,f.PremultipliedAlphaSource.Off,y.BackgroundMode.Only);a=this._rctx.bindTechnique(b,a,this._bindParameters);this._render(a)}_render(a){this._rctx.bindVAO(this._vaoQuad);a.assertCompatibleVertexAttributeLocations(this._vaoQuad);this._rctx.drawArrays(m.PrimitiveType.TRIANGLE_STRIP,0,M.vertexCount(this._vaoQuad,"geometry"))}drawGroup(a,b,c,e,g,d=f.PremultipliedAlphaSource.On){b===f.BlendLayersOutput.Composite&&(a.fboTexture=this._fbos[this.getLastOnHoldId()].get(c).colorTexture);
a.texture=this.currentFBO(c).colorTexture;this.closeGroup(c);b=this._getBlendLayersTechnique(e,b,g,d);a=this._rctx.bindTechnique(b,a,this._bindParameters);this._render(a)}drawRasterData(a,b,c,e,g,d=f.PremultipliedAlphaSource.Off){null!=a.texture&&(a.fboTexture=b===f.BlendLayersOutput.GroupBackgroundComposite||e===q.LayerBlendMode.Normal&&g===f.BaseOpacityMode.NotRequired&&d===f.PremultipliedAlphaSource.Off?null:this.switch(c).colorTexture,b=this._getBlendLayersTechnique(e,b,g,d),a=this._rctx.bindTechnique(b,
a,this._bindParameters),this._render(a))}drawImageryTileData(a,b,c,e,g,d){var h=d.sourceLayerInfo.data;h.source&&(d.tile.surface.layerViewByIndex(d.layerIndex,v.LayerClass.MAP).ensureSymbolizerParameters(h),h.bind(this._rctx)&&(a.fboTexture=e===q.LayerBlendMode.Normal&&g===f.BaseOpacityMode.NotRequired?null:this.switch(c).colorTexture,b=this._getRasterColorizerTechnique(h,b,e,g),h.opacity=a.opacity,h=h.getUniforms(),h.scale=d.scale,h.offset=d.offset,h.backgroundColor=a.backgroundColor,h.fboTexture=
a.fboTexture,h.baseOpacity=a.baseOpacity,a=this._rctx.bindTechnique(b,h,null),this._render(a)))}_getRasterColorizerTechnique(a,b,c,e){const g=a.symbolizerParameters,d=["stretch","lut","hillshade"].indexOf(g.type);null==this._rasterColorizerConfig&&(this._rasterColorizerConfig=new w.RasterColorizerTechniqueConfiguration,this._rctx.gl.getExtension("WEBGL_color_buffer_float"),this._rctx.gl.getExtension("OES_texture_float"));this._rasterColorizerConfig.output=b;this._rasterColorizerConfig.blendMode=c;
this._rasterColorizerConfig.baseOpacityMode=e;this._rasterColorizerConfig.colorizerType=d;this._rasterColorizerConfig.applyColormap=!!g.colormap;this._rasterColorizerConfig.requireBilinearWithNN=a.isBilinearWithStretchColorRamp;this._rasterColorizerConfig.stretchType=a.hasStretchTypeNone()?t.RasterColorizerStretchType.Noop:t.RasterColorizerStretchType.PerBand;return this._rasterColorizerTechnique=this._techniqueRepository.releaseAndAcquire(w.RasterColorizerTechnique,this._rasterColorizerConfig,this._rasterColorizerTechnique)}drawVectorData(a,
b,c,e,g,d,h,A,B){const n=this._rctx,C=d.sourceLayerInfo.data,k=d.tile.surface.layerViewByIndex(d.layerIndex,v.LayerClass.MAP),D=g===f.BaseOpacityMode.Required||1>a.opacity||e!==q.LayerBlendMode.Normal||b!==f.BlendLayersOutput.Composite,E=D?f.PremultipliedAlphaSource.On:f.PremultipliedAlphaSource.Off;var p=this._getBlendLayersTechnique(e,b,g,E);n.setPipelineState(p.getPipeline());let F=p=null;D?(F=this.currentFBO(c),null==this._vtFBO&&(this._vtFBO=new x.MultiSizeFramebuffer(this._rctx)),p=this._vtFBO.get(c),
n.bindFramebuffer(p),this._clearCurrentFBO()):B&&n.clearSafe(m.ClearBufferBit.DEPTH_BUFFER_BIT);try{this._vectorTileHelper.renderBackground(n,d.sourceLod,k.painter,k.layer.styleRepository,k.schemaHelper,Math.round(1/d.scale),d.offset,A,h,k.contentZoom),C&&this._vectorTileHelper.renderContent(n,d.sourceLod,C,d.vtlNeighborInfos,k.painter,k.layer.styleRepository,k.schemaHelper,Math.round(1/d.scale),d.offset,A,h,k.contentZoom)}catch(P){N.warnOnce("A render call containing vector tiles did not resolve correctly.",
P)}return null!=p?(n.bindFramebuffer(F),a.texture=p.colorTexture,a.offset=H.ZEROS,a.scale=1,this.drawRasterData(a,b,c,e,g,E),B):!0}copyFBOToTexture(a){const b=this._rctx,c=b.bindTexture(a.texture,z.Texture.TEXTURE_UNIT_FOR_UPDATES),e=a.descriptor;b.gl.copyTexImage2D(m.TextureType.TEXTURE_2D,0,e.pixelFormat,0,0,e.width,e.height,0);a.generateMipmap();b.bindTexture(c,z.Texture.TEXTURE_UNIT_FOR_UPDATES)}_clearCurrentFBO(){this._rctx.setStencilWriteMask(255);this._rctx.setClearColor(0,0,0,0);this._rctx.setClearDepth(1);
this._rctx.setClearStencil(0);this._rctx.clearSafe(m.ClearBufferBit.COLOR_BUFFER_BIT|m.ClearBufferBit.DEPTH_BUFFER_BIT|m.ClearBufferBit.STENCIL_BUFFER_BIT)}_initFBO(a,b,c){this._rctx.bindFramebuffer(a);c&&(this._rctx.setViewport(0,0,b,b),this._clearCurrentFBO())}ensureBuffer(a){this._lastUsedIds.length=0;this._lastUsedIds.push(1);this._lastCreatedBufferId=1;this._onHoldIds.length=0;this.bind(a)}bind(a,b=0,c=!0){this._current=b;if(b>=this._fbos.length)for(let e=this._fbos.length;e<=b;e++)this._fbos.push(new x.MultiSizeFramebuffer(this._rctx));
this._initFBO(this._fbos[b].get(a),a,c)}_bindNextFreeBuffer(a){0<this._lastUsedIds.length?this.bind(a,this._lastUsedIds.pop()):(this._lastCreatedBufferId++,this.bind(a,this._lastCreatedBufferId))}openGroup(a){this._onHoldIds.push(this._current);this._bindNextFreeBuffer(a)}switch(a){const b=this.currentFBO(a),c=this._current;this._bindNextFreeBuffer(a);this._lastUsedIds.push(c);return b}getLastOnHoldId(){return this._onHoldIds[this._onHoldIds.length-1]}closeGroup(a){const b=this._current;this._bindNextFreeBuffer(a);
this._lastUsedIds.push(b);this._lastUsedIds.push(this._onHoldIds.pop())}unbind(){this._rctx.bindFramebuffer(null)}currentFBO(a){return this._fbos[this._current].get(a)}}r.TileCompositor=O;Object.defineProperty(r,Symbol.toStringTag,{value:"Module"})});
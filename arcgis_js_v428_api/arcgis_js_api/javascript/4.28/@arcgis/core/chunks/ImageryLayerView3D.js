/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.28/esri/copyright.txt for details.
*/
import{_ as t}from"./tslib.es6.js";import{debounce as r}from"../core/promiseUtils.js";import{when as e}from"../core/reactiveUtils.js";import"./Logger.js";import"./ensureType.js";import"./typedArrayUtil.js";import"../core/Error.js";import{subclass as i}from"../core/accessorSupport/decorators/subclass.js";import{D as s}from"./DynamicLayerView3D.js";import{I as o}from"./ImageryLayerView.js";import"./handleUtils.js";import"./maybe.js";import"../core/lang.js";import"../config.js";import"./asyncUtils.js";import"../core/Accessor.js";import"../core/Handles.js";import"../core/accessorSupport/decorators/property.js";import"./utils.js";import"./metadata.js";import"./ObjectPool.js";import"./ObservableBase.js";import"./tracking.js";import"../core/scheduling.js";import"./nextTick.js";import"./PooledArray.js";import"./time.js";import"../core/Collection.js";import"../core/Evented.js";import"./shared.js";import"./SimpleObservable.js";import"../geometry/Extent.js";import"../geometry/Geometry.js";import"../core/JSONSupport.js";import"./reader.js";import"../geometry/SpatialReference.js";import"./unitUtils.js";import"./jsonMap.js";import"./Ellipsoid.js";import"./assets.js";import"../request.js";import"../kernel.js";import"../core/urlUtils.js";import"./writer.js";import"../geometry/Point.js";import"../core/accessorSupport/decorators/cast.js";import"../geometry/support/webMercatorUtils.js";import"./aaBoundingRect.js";import"./mathUtils.js";import"./vec3.js";import"./vec3f64.js";import"./common.js";import"./RenderGeometry.js";import"./mat4.js";import"./ViewingMode.js";import"./FloatsPassUniform.js";import"./mat3.js";import"./mat3f64.js";import"./mat4f64.js";import"./lengthUtils.js";import"./interfaces3.js";import"./Material.js";import"./basicInterfaces.js";import"./ContentObject.js";import"./VertexAttribute.js";import"./aaBoundingBox.js";import"./Util.js";import"./vec2f64.js";import"./vec4.js";import"./vec4f64.js";import"./ShaderBuilder.js";import"./OverlayCompositing.glsl.js";import"./ScreenSpacePass.glsl.js";import"./FloatPassUniform.js";import"./IntegerPassUniform.js";import"./Texture2DPassUniform.js";import"./SceneLighting.js";import"./MemCache.js";import"./enums3.js";import"./FramebufferObject.js";import"./BufferObject.js";import"./Texture.js";import"./contextUtils.js";import"./ShaderOutput.js";import"./VertexNormal.glsl.js";import"./compilerUtils.js";import"./ForwardLinearDepth.glsl.js";import"./View.glsl.js";import"./Float3PassUniform.js";import"./Matrix4PassUniform.js";import"./Matrix3PassUniform.js";import"./Float2PassUniform.js";import"./EvaluateAmbientLighting.glsl.js";import"./PiUtils.glsl.js";import"./RgbaFloat16Encoding.glsl.js";import"./Float4PassUniform.js";import"./Texture2DDrawUniform.js";import"./WaterSurface.glsl.js";import"./Slice.glsl.js";import"./Transform.glsl.js";import"./ObjectAndLayerIdColor.glsl.js";import"./OutputHighlight.glsl.js";import"./ColorConversion.glsl.js";import"./ReadLinearDepth.glsl.js";import"./NormalUtils.glsl.js";import"./axisAngleDegrees.js";import"./quat.js";import"./quatf64.js";import"./weather.js";import"../views/3d/environment/CloudyWeather.js";import"./enumeration.js";import"../views/3d/environment/FoggyWeather.js";import"../views/3d/environment/RainyWeather.js";import"../views/3d/environment/SnowyWeather.js";import"../views/3d/environment/SunnyWeather.js";import"./RenderState.js";import"./BooleanPassUniform.js";import"./vec2.js";import"./AlphaCutoff.js";import"./TransparencyPassType.js";import"./TextureOnly.glsl.js";import"./NestedMap.js";import"./ShaderTechniqueConfiguration.js";import"./RenderPlugin.js";import"./Camera.js";import"./screenUtils.js";import"./frustum.js";import"./vector.js";import"./ByteSizeUnit.js";import"./plane.js";import"./Axis.js";import"./mathUtils2.js";import"./VertexElementDescriptor.js";import"./VertexArrayObject2.js";import"./VertexArrayObject.js";import"./projectBuffer.js";import"./geodesicConstants.js";import"./Attribute.js";import"./Geometry.js";import"./Indices.js";import"./triangle.js";import"./lineSegment.js";import"./doublePrecisionUtils.js";import"./TriangleMaterial.js";import"./sphere.js";import"./Octree.js";import"./InterleavedLayout.js";import"./BufferView.js";import"./types.js";import"./DefaultBufferWriter.js";import"./RenderSlot.js";import"./MarkerSizing.glsl.js";import"./VisualVariables.glsl.js";import"./floatRGBA.js";import"./Texture2.js";import"./InstancedDoublePrecision.glsl.js";import"./requestImageUtils.js";import"./RibbonLine.glsl.js";import"./OutputDepth.glsl.js";import"./Program2.js";import"./OrderIndependentTransparency.js";import"./renderState2.js";import"./MultipassGeometryTest.glsl.js";import"./Intersector.js";import"./Intersector2.js";import"./boundedPlane.js";import"./verticalOffsetUtils.js";import"./orientedBoundingBox.js";import"./glUtil.js";import"./DefaultLayouts.js";import"./Scheduler.js";import"../core/signal.js";import"./debugFlags.js";import"./LayerView3D.js";import"./heightModelInfoUtils.js";import"../geometry/HeightModelInfo.js";import"./arcgisLayerUrl.js";import"./persistableUrlUtils.js";import"./DoubleArray.js";import"./GeometryUtil.js";import"./vec3f32.js";import"./projectExtentUtils.js";import"./geometryServiceUtils.js";import"../portal/Portal.js";import"../core/Loadable.js";import"../core/Promise.js";import"./locale.js";import"../portal/PortalGroup.js";import"../portal/PortalQueryParams.js";import"../portal/PortalQueryResult.js";import"../portal/PortalUser.js";import"../portal/PortalFolder.js";import"./project.js";import"../geometry/support/jsonUtils.js";import"../geometry/Multipoint.js";import"./zmUtils.js";import"../geometry/Polygon.js";import"./extentUtils.js";import"../geometry/Polyline.js";import"./utils6.js";import"./utils7.js";import"../rest/support/ProjectParameters.js";import"./ImageMaterial.js";import"./GLTextureMaterial.js";import"./ImageMaterial.glsl.js";import"../views/layers/LayerView.js";import"../core/Identifiable.js";import"./UpdatingHandles.js";import"./RefreshableLayerView.js";import"./layerViewUtils.js";import"./commonProperties2.js";import"../TimeExtent.js";import"./timeUtils.js";import"./date.js";import"./timeZoneUtils.js";import"./datetime.js";import"./layerContainerType.js";import"../support/timeUtils.js";import"./ElevationInfo.js";import"../layers/support/fieldUtils.js";import"../core/sql.js";import"../intl.js";import"./messages.js";import"./arcadeOnDemand.js";import"../geometry.js";import"./typeUtils.js";import"./unitConversionUtils.js";import"./opacityUtils.js";import"../rest/support/Query.js";import"./DataLayerSource.js";import"../layers/support/Field.js";import"./domains.js";import"../layers/support/CodedValueDomain.js";import"../layers/support/Domain.js";import"../layers/support/InheritedDomain.js";import"../layers/support/RangeDomain.js";import"./fieldType.js";import"./FullTextSearch.js";import"../core/Clonable.js";import"./QuantizationParameters.js";import"../rest/support/StatisticDefinition.js";import"./popupUtils.js";let m=class extends(o(s)){constructor(){super(...arguments),this.type="imagery-3d",this.redrawDebounced=r((async t=>{this.redraw(((t,r)=>this._redrawImage(t,r)),t)}),2e3)}initialize(){this.addHandles([e((()=>this.view.basemapTerrain.ready),(()=>this._initializeMaximumDataResolution()),{once:!0,initial:!0}),this.layer.on("redraw",(()=>this._updatingHandles.addPromise(this.redrawDebounced())))]),this._updatingHandles.add((()=>this.layer?.exportImageServiceParameters?.version),(()=>{this._updatingHandles.addPromise(this.refreshDebounced())})),this._updatingHandles.add((()=>this.layer?.renderer),(()=>{this._updatingHandles.addPromise(this.refreshDebounced())})),this._updatingHandles.add((()=>this.timeExtent),(()=>this._updatingHandles.addPromise(this.refreshDebounced())))}_initializeMaximumDataResolution(){this.maximumDataResolution=this.layer.loaded?this.layer.serviceRasterInfo.pixelSize:null}getFetchOptions(){return{timeExtent:this.timeExtent}}async processResult(t,r,e){r.imageOrCanvasElement?t.image=r.imageOrCanvasElement:(t.image=document.createElement("canvas"),t.pixelData=r.pixelData,await this._redrawImage(t,e))}async _redrawImage(t,r){if(!(t.image instanceof HTMLCanvasElement)||null==t.pixelData)throw new Error;const e=t.image,i=e.getContext("2d"),s=await this.layer.applyRenderer(t.pixelData,{signal:r}),o=this.layer.applyFilter(s).pixelBlock;if(null==o)throw new Error;e.width=o.width,e.height=o.height;const m=i.createImageData(o.width,o.height);m.data.set(o.getAsRGBA()),i.putImageData(m,0,0)}};m=t([i("esri.views.3d.layers.ImageryLayerView3D")],m);const p=m;export{p as default};
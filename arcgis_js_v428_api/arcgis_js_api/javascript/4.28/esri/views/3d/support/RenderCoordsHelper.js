// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.28/esri/copyright.txt for details.
//>>built
define("exports ../../../core/mathUtils ../../../core/unitUtils ../../../chunks/mat4 ../../../chunks/vec3 ../../../core/libs/gl-matrix-2/types/vec3 ../../../geometry/projection/projectPointToVector ../../../geometry/projection/projectVectorToDehydratedPoint ../../../geometry/projection/projectVectorToPoint ../../../geometry/projection/projectVectorToVector ../../../geometry/support/Axis ../../../geometry/support/coordinateSystem ../../../geometry/support/plane ../../../geometry/support/vector ../../../geometry/support/vectorStacks ../../../layers/graphics/dehydratedFeatureUtils ../../ViewingMode".split(" "),
function(m,r,k,t,n,u,v,w,x,p,h,d,y,z,f,q,g){class l{constructor(a,b,c,e){this.viewingMode=a;this.spatialReference=b;this.unitInMeters=c;this._coordinateSystem=e;this._tmpCoordinateSystem=d.create(e)}set extent(a){a&&d.setExtent(this._coordinateSystem,a,this._coordinateSystem)}getAltitude(a){return d.altitudeAt(this._coordinateSystem,a)}setAltitude(a,b,c=a){return d.setAltitudeAt(this._coordinateSystem,c,b,a)}setAltitudeOfTransformation(a,b){d.setAltitudeOfTransformation(this._coordinateSystem,b,a,
b)}worldUpAtPosition(a,b){return d.normalAt(this._coordinateSystem,a,b)}worldBasisAtPosition(a,b,c){return d.axisAt(this._coordinateSystem,a,b,c)}basisMatrixAtPosition(a,b){const c=this.worldBasisAtPosition(a,h.Axis.X,f.sv3d.get()),e=this.worldBasisAtPosition(a,h.Axis.Y,f.sv3d.get());a=this.worldBasisAtPosition(a,h.Axis.Z,f.sv3d.get());t.set(b,c[0],c[1],c[2],0,e[0],e[1],e[2],0,a[0],a[1],a[2],0,0,0,0,1);return b}headingAtPosition(a,b){const c=this.worldUpAtPosition(a,f.sv3d.get());a=this.worldBasisAtPosition(a,
h.Axis.Y,f.sv3d.get());b=z.angleAroundAxis(b,a,c);return r.rad2deg(b)}intersectManifoldClosestSilhouette(a,b,c){d.elevate(this._coordinateSystem,b,this._tmpCoordinateSystem);d.intersectRayClosestSilhouette(this._tmpCoordinateSystem,a,c);return c}intersectManifold(a,b,c){d.elevate(this._coordinateSystem,b,this._tmpCoordinateSystem);b=f.sv3d.get();return d.intersectRay(this._tmpCoordinateSystem,a,b)?n.copy(c,b):null}intersectInfiniteManifold(a,b,c){if(this.viewingMode===g.ViewingMode.Global)return this.intersectManifold(a,
b,c);d.elevate(this._coordinateSystem,b,this._tmpCoordinateSystem);b=this._tmpCoordinateSystem.value;const e=f.sv3d.get();return y.intersectRay(b.plane,a,e)?n.copy(c,e):null}toRenderCoords(a,b,c){return q.isDehydratedPoint(a)?v.projectPointToVector(a,b,this.spatialReference):p.projectVectorToVector(a,b,c,this.spatialReference)}fromRenderCoords(a,b,c=null){return q.isDehydratedPoint(b)?(null!=c&&(b.spatialReference=c),w.projectVectorToDehydratedPoint(a,this.spatialReference,b)):u.isVec3(b)?p.projectVectorToVector(a,
this.spatialReference,b,c)?b:null:x.projectVectorToPoint(a,this.spatialReference,b)}static create(a,b){switch(a){case g.ViewingMode.Local:return new l(g.ViewingMode.Local,b,k.getMetersPerUnitForSR(b),d.createLocal());case g.ViewingMode.Global:return new l(g.ViewingMode.Global,b,1,d.createGlobal(b))}}static renderUnitScaleFactor(a,b){return k.getMetersPerCartesianUnitForSR(a)/k.getMetersPerCartesianUnitForSR(b)}}m.RenderCoordsHelper=l;Object.defineProperty(m,Symbol.toStringTag,{value:"Module"})});
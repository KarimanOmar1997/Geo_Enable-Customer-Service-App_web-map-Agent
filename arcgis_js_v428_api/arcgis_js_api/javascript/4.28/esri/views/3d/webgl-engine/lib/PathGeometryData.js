// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.28/esri/copyright.txt for details.
//>>built
define("exports ../../../../chunks/vec2 ../../../../chunks/vec2f64 ../../../../chunks/vec3 ../../../../chunks/vec3f64 ../../../../chunks/vec4f64 ../../../../geometry/support/FloatArray ../../../../geometry/support/Indices ./Attribute ./Normals ./VertexAttribute ../materials/internal/MaterialUtil".split(" "),function(y,f,D,v,z,K,F,L,k,M,l,N){class E{constructor(a){this.builder=a}onPathChanged(a){this.builder.onPathChanged()}}class G extends E{constructor(a){super(a);this.vertexAttributeColor=K.fromValues(255,
255,255,255);this.size=[];this.vertexAttributePosition=F.newFloatArray(3*this.builder.numVerticesTotal);this.vertexAttributeNormal=new Int16Array(2*this.builder.numVerticesTotal)}bakeVertexColors(a){this.vertexAttributeColor[0]=255*a[0];this.vertexAttributeColor[1]=255*a[1];this.vertexAttributeColor[2]=255*a[2];this.vertexAttributeColor[3]=255*(3<a.length?a[3]:1)}bake(a){this.size=a;const {numVerticesTotal:g,pathVertexData:h,path:m,positions:p,profileRightAxes:n,profileUpAxes:w,profileVertexAndNormals:A}=
this.builder;for(let u=0;u<g;++u){var d=h[u],b=0===d||d===m.vertices.length-1;d*=3;const q=O;let B=0,C=0;const c=4*u,r=v.set(P,n[c],n[c+1],n[c+2]),t=v.set(Q,w[c],w[c+1],w[c+2]);var e=f.set(H,A[c]*a[0],A[c+1]*a[1]);if(b)v.cross(q,t,r),B=n[c+3]*a[0],C=w[c+3];else{b=R;const x=S;f.set(b,n[c+3],w[c+3]);const I=f.length(b);f.normalize(b,b);const J=f.dot(e,b);if(Math.abs(J)>I){f.set(x,-b[1],b[0]);const T=f.dot(e,x);f.scale(b,b,I*Math.sign(J));f.scale(x,x,T);f.add(e,b,x)}v.set(q,0,0,0)}e=v.set(U,r[0]*e[0]+
t[0]*e[1],r[1]*e[0]+t[1]*e[1],r[2]*e[0]+t[2]*e[1]);b=3*u;this.vertexAttributePosition[b]=p[d]+e[0]+q[0]*B;this.vertexAttributePosition[b+1]=p[d+1]+e[1]+q[1]*B;this.vertexAttributePosition[b+2]=p[d+2]+e[2]+q[2]*B;d=f.set(H,A[c+2],A[c+3]);M.compressNormal(this.vertexAttributeNormal,u,r[0]*d[0]+t[0]*d[1]+q[0]*C,r[1]*d[0]+t[1]*d[1]+q[1]*C,r[2]*d[0]+t[2]*d[1]+q[2]*C)}}createGeometryData(){const a=this.builder.vertexIndices.length,{normalIndices:g,vertexIndices:h}=this.builder;return[[l.VertexAttribute.POSITION,
new k.Attribute(this.vertexAttributePosition,h,3,!0)],[l.VertexAttribute.NORMALCOMPRESSED,new k.Attribute(this.vertexAttributeNormal,g,2,!0)],[l.VertexAttribute.COLOR,new k.Attribute(this.vertexAttributeColor,L.getZeroIndexArray(a),4)]]}onPathChanged(a){super.onPathChanged(a);this.bake(this.size)}intersect(a,g,h){const m=this.builder.vertexIndices,p=new k.Vertices(this.vertexAttributePosition,3);N.intersectTriangles(a,g,0,m.length/3,m,p,void 0,void 0,h)}}class V extends E{constructor(a,g,h,m){super(a);
this.sizeAttributeValue=g;this.colorAttributeValue=h;this.opacityAttributeValue=m;this.vvData=null;this.baked=new G(a);this.vvData=F.newFloatArray(4*this.builder.path.vertices.length);for(a=0;a<this.builder.path.vertices.length;++a)this.vvData[4*a]=g,this.vvData[4*a+1]=h,this.vvData[4*a+2]=m,this.vvData[4*a+3]=0===a||a===this.builder.path.vertices.length-1?1:0}createGeometryData(){const {positions:a,profileRightAxes:g,profileUpAxes:h,profileVertexAndNormals:m,pathVertexIndices:p,vertexIndices:n}=
this.builder;return[[l.VertexAttribute.POSITION,new k.Attribute(a,p,3,!0)],[l.VertexAttribute.PROFILERIGHT,new k.Attribute(g,n,4,!0)],[l.VertexAttribute.PROFILEUP,new k.Attribute(h,n,4,!0)],[l.VertexAttribute.PROFILEVERTEXANDNORMAL,new k.Attribute(m,n,4,!0)],[l.VertexAttribute.FEATUREVALUE,new k.Attribute(this.vvData,p,4,!0)]]}onPathChanged(a){super.onPathChanged(a);if(a=a.getMutableAttribute(l.VertexAttribute.POSITION))a.data=this.builder.positions}}const H=D.create(),R=D.create(),S=D.create(),U=
z.create(),O=z.create(),P=z.create(),Q=z.create();y.FastUpdatePathGeometry=V;y.PathGeometryData=E;y.StaticPathGeometry=G;Object.defineProperty(y,Symbol.toStringTag,{value:"Module"})});
// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.28/esri/copyright.txt for details.
//>>built
define(["exports","../../../core/maybe","../PixelBlock","../rasterFormats/pixelRangeUtils","../../../renderers/support/stretchRendererUtils"],function(z,C,E,K,L){function F(b,d=256){d=Math.min(d,256);const {size:m,counts:h}=b;b=new Uint8Array(m);var l=h.reduce((e,a)=>e+a/d,0);let n=0;var c=0;let g=0,k=l;for(let e=0;e<m;e++)if(g+=h[e],!(e<m-1&&g+h[e+1]<k)){for(;n<d-1&&k<g;)n++,k+=l;for(;c<=e;c++)b[c]=n;c=e+1}for(l=c;l<m;l++)b[l]=d-1;return b}function G(b,d){b=Math.min(Math.max(b,-100),100);d=Math.min(Math.max(d??
0,-100),100);let m=0,h=0;const l=new Uint8Array(256);for(m=0;256>m;m++)0<b&&100>b?h=(200*m-25500+510*d)/(2*(100-b))+128:0>=b&&-100<b?h=(200*m-25500+510*d)*(100+b)/2E4+128:100===b?(h=200*m-25500+256*(100-b)+510*d,h=0<h?255:0):-100===b&&(h=128),l[m]=255<h?255:0>h?0:h;return l}function M(b,d,m,h){let l=Infinity,n=-Infinity;var c=0,g=0,k=0,e=0;const a=b.length;var w=new Map,f=[];for(let p=0;p<a;p++){const t=b[p];if(!d||d[p]){f.push(t);const u=(w.get(t)??0)+1;w.set(t,u);u>e&&(e=u,k=t);l=t<l?t:l;n=t>n?
t:n;c+=t;g++}}if(0===g)return{statistics:{min:0,max:0,avg:0,stddev:0,mode:0,median:0},histogram:null};c/=g;e=0;for(w=0;w<a;w++)if(!d||d[w])e+=(b[w]-c)**2;w=d?d.filter(p=>p).length:a;e=1>=w?0:Math.sqrt(e/(w-1));f.sort((p,t)=>p-t);w=g>>>1;k={min:l,max:n,avg:c,stddev:e,mode:k,median:g%2?f[Math.floor(w)]:(f[w-1]+f[w])/2};if(!h)return{statistics:k,histogram:null};if(["u8","s8","u4","u2","u1"].includes(m)){g=n-l+1;m=new Uint32Array(g);for(h=0;h<a;h++)d&&!d[h]||m[b[h]-l]++;return{statistics:k,histogram:{min:l-
.5,max:n+.5,size:g,counts:m}}}m=new Uint32Array(256);h=(n-l)/256;if(0===h)return{statistics:k,histogram:{min:l,max:n,size:1,counts:(new Uint32Array(1)).fill(g)}};g=new Uint32Array(257);for(f=0;f<a;f++)d&&!d[f]||g[Math.floor((b[f]-l)/h)]++;for(b=0;255>b;b++)m[b]=g[b];m[255]=g[255]+g[256];return{statistics:k,histogram:{min:l,max:n,size:256,counts:m}}}function H(b){if(!b?.pixels?.length)return null;const {pixels:d,mask:m,bandMasks:h,pixelType:l}=b,n=b.width*b.height,c=d.length;let g,k;let e;var a;const w=
[],f=[];for(e=0;e<c;e++){var p=new Uint32Array(256);var t=d[e];var u=h?.[e]??m;if("u8"===l)if(g=-.5,k=255.5,u)for(a=0;a<n;a++)u[a]&&p[t[a]]++;else for(a=0;a<n;a++)p[t[a]]++;else{a=!1;b.statistics||(b.updateStatistics(),a=!0);var x=b.statistics;g=x[e].minValue;k=x[e].maxValue;var q=(k-g)/256;if(0===q)for(!x||b.validPixelCount||a||b.updateStatistics(),q=(b.validPixelCount||b.width*b.height)/256,a=0;256>a;a++)p[a]=Math.round(q*(a+1))-Math.round(q*a);else{x=new Uint32Array(257);for(a=0;a<n;a++)u&&!u[a]||
x[Math.floor((t[a]-g)/q)]++;for(a=0;255>a;a++)p[a]=x[a];p[255]=x[255]+x[256]}}w.push({min:g,max:k,size:256,counts:p});for(a=u=t=q=0;256>a;a++)q+=p[a],t+=a*p[a];t/=q;for(a=0;256>a;a++)u+=p[a]*(a-t)**2;a=Math.sqrt(u/(q-1));q=(k-g)/256;p=(t+.5)*q+g;q*=a;f.push({min:g,max:k,avg:p,stddev:q})}return{statistics:f,histograms:w}}function N(b,d){if(null==d||0===d.length)return b;const m=Math.max.apply(null,d),{minCutOff:h,maxCutOff:l,outMin:n,outMax:c,histogramLut:g}=b;return h.length===d.length||h.length<=
m?b:{minCutOff:d.map(k=>h[k]),maxCutOff:d.map(k=>l[k]),histogramLut:g?d.map(k=>g[k]):null,outMin:n,outMax:c}}function D(b,d){const m=new Float32Array(b);for(let h=0;h<b;h++)m[h]=1<d[h]?2<d[h]?6.5+(d[h]-2)**2.5:6.5+100*(2-d[h])**4:1;return m}const O=[.299,.587,.114];z.computeGammaCorrection=D;z.computeGammaValues=function(b,d,m){const h=[];for(let k=0;k<d.length;k++){var l=0,n=0,c=0;"min"in d[k]?{min:l,max:n,avg:c}=d[k]:[l,n,c]=d[k];c=c??0;"u8"!==b&&(c=255*(c-l)/(n-l));m&&(c*=O[k]);l=h;n=l.push;if(0>=
c||255<=c)c=1;else{var g=0;150!==c&&(g=150>=c?45*Math.cos(.01047*c):17*Math.sin(.021*c));g=Math.log((c+g)/255);0===g?c=1:(c=Math.log(c/255)/g,c=isNaN(c)?1:Math.min(9.9,Math.max(.01,c)))}n.call(l,c)}return h};z.computeStatisticsHistograms=function(b){const {pixels:d,mask:m,pixelType:h,bandMasks:l}=b;var n=d.map((c,g)=>M(c,l?.[g]??m,h,!0));b=n.map(({statistics:c})=>c);n=n.map(({histogram:c})=>c);return{statistics:b,histograms:n}};z.createContrastBrightnessLUT=G;z.createHistogramEqualizationLUT=F;z.createStretchLUT=
function(b){const {minCutOff:d,maxCutOff:m,gamma:h,pixelType:l,rounding:n}=b,c=b.outMin||0,g=b.outMax||255;if(!["u8","u16","s8","s16"].includes(l))return null;const k=d.length;let e,a,w=0;"s8"===l?w=-127:"s16"===l&&(w=-32767);let f=256;["u16","s16"].includes(l)&&(f=65536);var p=[],t=[];const u=g-c;for(e=0;e<k;e++)t[e]=m[e]-d[e],p[e]=0===t[e]?0:u/t[e];let x;const q=[];let y,r;if(h&&h.length>=k)for(p=D(k,h),e=0;e<k;e++){r=[];for(a=0;a<f;a++)if(0===t[e])r[a]=c;else{var v=a+w;x=(v-d[e])/t[e];y=1;1<h[e]&&
(y-=(1/u)**(x*p[e]));v<m[e]&&v>d[e]?(v=y*u*x**(1/h[e])+c,r[a]="floor"===n?Math.floor(v):"round"===n?Math.round(v):v):r[a]=v>=m[e]?g:c}q[e]=r}else for(e=0;e<k;e++){r=[];for(a=0;a<f;a++)v=a+w,v<=d[e]?r[a]=c:v>=m[e]?r[a]=g:(t=(v-d[e])*p[e]+c,r[a]="floor"===n?Math.floor(t):"round"===n?Math.round(t):t);q[e]=r}if(null!=b.contrastOffset)for(b=G(b.contrastOffset,b.brightnessOffset),e=0;e<k;e++)for(r=q[e],a=0;a<f;a++)r[a]=b[r[a]];return{lut:q,offset:w}};z.estimateStatisticsFromHistograms=function(b){const d=
[];for(let n=0;n<b.length;n++){const {min:c,max:g,size:k,counts:e}=b[n];let a=0;var m=0;for(var h=0;h<k;h++)a+=e[h],m+=h*e[h];m/=a;h=0;for(var l=0;l<k;l++)h+=e[l]*(l-m)**2;l=(g-c)/k;d.push({min:c,max:g,avg:(m+.5)*l+c,stddev:Math.sqrt(h/(a-1))*l})}return d};z.estimateStatisticsHistograms=H;z.getStretchCutoff=function(b,d){const {pixelBlock:m,bandIds:h,returnHistogramLut:l,rasterInfo:n}=d;var c=null;d=null;var g=b.stretchType;"number"===typeof g&&(g=L.stretchTypeFunctionEnum[g]);b.dra?"minMax"===g&&
m?.statistics?c=m.statistics.map(v=>[v.minValue,v.maxValue,0,0]):(d=H(m),c=null!=d?d.statistics:null,d=null!=d?d.histograms:null):(c=b.statistics?.length?b.statistics:n.statistics,d="histograms"in b?b.histograms:void 0,d||(d=n.histograms));"percentClip"!==g&&"histogramEqualization"!==g||d?.length||(g="minMax");var k=c?.length||d?.length||n.bandCount;const e=[],a=[];let w,f,p;c&&!Array.isArray(c[0])&&(c=c.map(v=>[v.min,v.max,v.avg,v.stddev]));const [t,u]=K.getPixelValueRange(n.pixelType);if(!c?.length){c=
[];for(f=0;f<k;f++)c.push([t,u,1,1]);"standardDeviation"===g&&(g="minMax")}switch(g){case "none":for(f=0;f<k;f++)e[f]=t,a[f]=u;break;case "minMax":for(f=0;f<k;f++){var x=c[f];e[f]=x[0];a[f]=x[1]}break;case "standardDeviation":({numberOfStandardDeviations:x=2}=b);for(f=0;f<k;f++){var q=c[f];e[f]=q[2]-x*q[3];a[f]=q[2]+x*q[3];e[f]<q[0]&&(e[f]=q[0]);a[f]>q[1]&&(a[f]=q[1])}break;case "histogramEqualization":C.assertIsSome(d);for(f=0;f<k;f++)e[f]=d[f].min,a[f]=d[f].max;break;case "percentClip":C.assertIsSome(d);
for(f=0;f<d.length;f++){c=d[f];q=new Uint32Array(c.size);var y=[...c.counts];20<=y.length&&(y[0]=y[1]=y[2]=y[y.length-1]=y[y.length-2]=0);x=0;k=(c.max-c.min)/c.size;w=-.5===c.min&&1===k?.5:0;for(p=0;p<c.size;p++)x+=y[p],q[p]=x;y=(b.minPercent||0)*x/100;e[f]=c.min+w;for(p=0;p<c.size;p++)if(q[p]>y){e[f]=c.min+k*(p+w);break}y=(1-(b.maxPercent||0)/100)*x;a[f]=c.max+w;for(p=c.size-2;0<=p;p--)if(q[p]<y){a[f]=c.min+k*(p+2-w);break}a[f]<e[f]&&(c=e[f],e[f]=a[f],a[f]=c)}break;default:for(f=0;f<k;f++)x=c[f],
e[f]=x[0],a[f]=x[1]}let r;"histogramEqualization"===g?(C.assertIsSome(d),g=d[0].size||256,b=0,l&&(r=d.map(v=>F(v)))):(g=b.max||255,b=b.min||0);return N({minCutOff:e,maxCutOff:a,outMax:g,outMin:b,histogramLut:r},h)};z.stretch=function(b,d){if(!b?.pixels?.length)return b;const {mask:m,bandMasks:h,width:l,height:n,pixels:c}=b,{minCutOff:g,maxCutOff:k,gamma:e}=d;var a=d.outMin||0;const w=d.outMax||255,f=l*n,p=d.outputPixelType||"u8";b=b.pixels.map(()=>E.createEmptyBand(p,f));const t=b.length;var u=w-
a,x=[],q=[];for(var y=0;y<t;y++)q[y]=k[y]-g[y],x[y]=0===q[y]?0:u/q[y];y=p.startsWith("u")||p.startsWith("s");d=!!d.isRenderer;if(e&&e.length>=t){x=D(t,e);for(var r=0;r<t;r++){var v=h?.[r]??m;for(let B=0;B<f;B++)if(null==v||v[B]){if(0===q[r]){b[r][B]=a;continue}var A=c[r][B];const I=(A-g[r])/q[r];let J=1;1<e[r]&&(J-=(1/u)**(I*x[r]));A<k[r]&&A>g[r]?(A=J*u*I**(1/e[r])+a,b[r][B]=d?Math.floor(A):y?Math.round(A):A):b[r][B]=A>=k[r]?w:a}}}else for(u=0;u<t;u++)for(q=h?.[u]??m,r=0;r<f;r++)if(null==q||q[r])v=
c[u][r],v<k[u]&&v>g[u]?(v=(v-g[u])*x[u]+a,b[u][r]=d?Math.floor(v):y?Math.round(v):v):b[u][r]=v>=k[u]?w:a;a=new E({width:l,height:n,mask:m,bandMasks:h,pixels:b,pixelType:p});a.updateStatistics();return a};Object.defineProperty(z,Symbol.toStringTag,{value:"Module"})});
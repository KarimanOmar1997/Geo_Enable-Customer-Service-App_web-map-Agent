// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.28/esri/copyright.txt for details.
//>>built
define(["exports","../../../../core/has","../../../../core/maybe","./cpuMapped/FreeList"],function(d,h,k,l){const f=h("esri-2d-log-allocations");class e{constructor(a,b){this._array=a;this._pool=b}get array(){return this._array}get length(){return this._array.length}static create(a,b){a=b.acquire(a);return new e(a,b)}expand(a){a=this._pool.acquire(a);a.set(this._array);this._pool.release(this._array);this._array=a}destroy(){this._pool.release(this._array)}set(a,b){this._array.set(a._array,b)}slice(){const a=
this._pool.acquire(this._array.byteLength);a.set(this._array);return new e(a,this._pool)}}class c{constructor(){this._data=new ArrayBuffer(c.BYTE_LENGTH);this._freeList=new l.FreeList({start:0,end:this._data.byteLength})}static get BYTE_LENGTH(){return 64E6}get buffer(){return this._data}allocate(a){const b=this._freeList.firstFit(a);return null==b?null:new Uint32Array(this._data,b,a/Uint32Array.BYTES_PER_ELEMENT)}free(a){this._freeList.free(a.byteOffset,a.byteLength)}}class m{constructor(){this._bytesAllocated=
0;this._pages=[];this._pagesByBuffer=new Map;this._addPage()}destroy(){this._pages=[];this._pagesByBuffer=null}get _bytesTotal(){return this._pages.length*c.BYTE_LENGTH}acquire(a){this._bytesAllocated+=a;f&&console.log(`Allocating ${a}, (${this._bytesAllocated} / ${this._bytesTotal})`);if(a>c.BYTE_LENGTH)return new Uint32Array(a/Uint32Array.BYTES_PER_ELEMENT);for(const b of this._pages){const g=b.allocate(a);if(null!=g)return g}a=this._addPage().allocate(a);k.assertIsSome(a,"Expected to allocate page");
return a}release(a){this._bytesAllocated-=a.byteLength;f&&console.log(`Freeing ${a.byteLength}, (${this._bytesAllocated} / ${this._bytesTotal})`);const b=this._pagesByBuffer.get(a.buffer);b&&b.free(a)}_addPage(){const a=new c;this._pages.push(a);this._pagesByBuffer.set(a.buffer,a);return a}}d.BufferPool=m;d.TypedBuffer=e;Object.defineProperty(d,Symbol.toStringTag,{value:"Module"})});
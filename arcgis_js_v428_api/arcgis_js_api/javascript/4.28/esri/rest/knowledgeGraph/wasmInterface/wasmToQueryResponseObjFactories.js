// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.28/esri/copyright.txt for details.
//>>built
define("exports ../../../core/Logger ../Entity ../GraphObject ../ObjectValue ../Path ../Relationship ./KnowledgeWasmInterface ./WasmQueryWrapperInterfaces ./wasmToGeometryFactories".split(" "),function(e,x,y,z,A,B,C,g,h,l){function t(a,b){const d=[],k=a.count();for(let c=0;c<k;c++){const f=a.get_value_at(c);d.push(p(f,b))}return d}function p(a,b){return u.decodedWasmObjToQueryResponseObj(a,b)}function q(a,b){const d=a.type_name;b=m(a,b);a=a.get_id();return new y(Object.assign({typeName:d,id:a},b))}
function m(a,b){const d={},k=a.key_count();for(let c=0;c<k;c++)d[a.get_key_at(c)]=p(a.get_value_at(c),b);return{properties:d}}function v(a,b){return new A(m(a,b))}function w(a,b){const d=a.entity_count(),k=a.relationship_count(),c=[];for(let f=0;f<d;f++)c.push(q(a.get_entity_at(f),b)),f<k&&c.push(r(a.get_relationship_at(f),b));return new B({path:c})}function r(a,b){const d=a.type_name;b=m(a,b);return new C(Object.assign({typeName:d,id:a.get_id(),originId:a.get_origin_entity_id(),destinationId:a.get_destination_entity_id()},
b))}const n=x.getLogger("esri.rest.knowledgeGraph.WasmToQueryResponseObjConstructors"),u={decodedWasmObjToQueryResponseObj:(a,b)=>{if(null==a)return null;if("object"!==typeof a||"getDate"in a)return a;if("geometry_type"in a)switch(a.geometry_type.value){case null:return null;case g.WasmGeometryTypeCodes.ESRI_GEOMETRY_POINT:return l.wasmToPointGeometry(a);case g.WasmGeometryTypeCodes.ESRI_GEOMETRY_MULTIPOINT:return l.wasmToMultipointGeometry(a);case g.WasmGeometryTypeCodes.ESRI_GEOMETRY_POLYLINE:return l.wasmToPolylineGeometry(a);
case g.WasmGeometryTypeCodes.ESRI_GEOMETRY_POLYGON:return l.wasmToPolygonGeometry(a);case g.WasmGeometryTypeCodes.ESRI_GEOMETRY_ENVELOPE:case g.WasmGeometryTypeCodes.ESRI_GEOMETRY_MULTI_PATCH:return n.warnOnce("Envelope and Multipatch are not supported on knowledge entities, but one of those geometry types was detected. Result interpreted as null"),null;default:return n.warnOnce("Unknown or blank geometry type returned - Result interpreted as null"),null}else if("object_value_type"in a)switch(a.object_value_type.value){case h.WasmGraphQueryResponseTypeCodes.OBJECT:return v(a,
b);case h.WasmGraphQueryResponseTypeCodes.ENTITY:return q(a,b);case h.WasmGraphQueryResponseTypeCodes.RELATIONSHIP:return r(a,b);case h.WasmGraphQueryResponseTypeCodes.PATH:return w(a,b);case h.WasmGraphQueryResponseTypeCodes.ARRAY:return t(a,b);default:return n.warnOnce("Unknown graph object type detected!  Result interpreted as null"),null}else return n.warnOnce("A decoded value came back of a type that is not supported. Result interpreted as null"),null}};e.decodeWasmObjectTest=u;e.decodedWasmObjToQueryResponseObj=
p;e.wasmArrayToArray=t;e.wasmToEntity=q;e.wasmToGraphObject=function(a,b){return new z(m(a,b))};e.wasmToObjectValue=v;e.wasmToPath=w;e.wasmToRelationship=r;Object.defineProperty(e,Symbol.toStringTag,{value:"Module"})});
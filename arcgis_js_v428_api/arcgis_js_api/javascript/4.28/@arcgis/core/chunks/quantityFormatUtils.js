/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.28/esri/copyright.txt for details.
*/
import{f as r,t,b as n,d as a,e as u,g as e,h as i,i as s,j as c,k as b,l as o,m as f,n as l,o as m,p as v}from"./unitFormatUtils.js";function p(n,a,u,e=2,i="abbr"){return r(n,t(a,u).value,u,e,i)}function d(r,n,a,u=2,e="abbr"){return c(r,t(n,a).value,a,u,e)}function h(r,t,a=2,u="abbr"){return n(r,t.value,t.unit,a,u)}function w(r,t,n=2,u="abbr"){return a(r,t.value,t.unit,n,u)}function j(r,t,n=2,a="abbr"){return u(r,t.value,t.unit,n,a)}function g(r,t,n=2,a="abbr"){return e(r,t.value,t.unit,n,a)}function k(r,t,n){return i(r.value,r.unit,r.rotationType,t,n)}function y(r,t,n){return s(r.value,r.unit,r.rotationType,t,n)}function T(r,t,n,a,u="abbr"){switch(a=a??2,n){case"imperial":return j(r,t,a,u);case"metric":return h(r,t,a,u);default:return p(r,t,n,a,u)}}function x(r,t,n,a=2,u="abbr"){switch(n){case"imperial":return function(r,t,n=2,a="abbr"){return l(r,t.value,t.unit,n,a)}(r,t,a,u);case"metric":return function(r,t,n=2,a="abbr"){return b(r,t.value,t.unit,n,a)}(r,t,a,u);default:return d(r,t,n,a,u)}}function F(r,t,n,a=2,u="abbr"){switch(n){case"imperial":return g(r,t,a,u);case"metric":return w(r,t,a,u);default:return p(r,t,n,a,u)}}function U(r,t,n,a=2,u="abbr"){switch(n){case"imperial":return function(r,t,n=2,a="abbr"){return m(r,t.value,t.unit,n,a)}(r,t,a,u);case"metric":return function(r,t,n=2,a="abbr"){return o(r,t.value,t.unit,n,a)}(r,t,a,u);default:return d(r,t,n,a,u)}}function q(r,t,n,a=2,u="abbr"){switch(n){case"imperial":return function(r,t,n=2,a="abbr"){return v(r,t.value,t.unit,n,a)}(r,t,a,u);case"metric":return function(r,t,n=2,a="abbr"){return f(r,t.value,t.unit,n,a)}(r,t,a,u);default:return p(r,t,n,a,u)}}export{j as a,g as b,h as c,w as d,k as e,p as f,q as g,T as h,x as i,F as j,U as k,y as l};
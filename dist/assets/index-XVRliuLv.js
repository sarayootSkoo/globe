var Sm=Object.defineProperty;var Ph=i=>{throw TypeError(i)};var Mm=(i,e,t)=>e in i?Sm(i,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):i[e]=t;var xe=(i,e,t)=>Mm(i,typeof e!="symbol"?e+"":e,t),vc=(i,e,t)=>e.has(i)||Ph("Cannot "+t);var oe=(i,e,t)=>(vc(i,e,"read from private field"),t?t.call(i):e.get(i)),ht=(i,e,t)=>e.has(i)?Ph("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(i):e.set(i,t),ct=(i,e,t,n)=>(vc(i,e,"write to private field"),n?n.call(i,t):e.set(i,t),t),kt=(i,e,t)=>(vc(i,e,"access private method"),t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))n(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function t(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(r){if(r.ep)return;r.ep=!0;const s=t(r);fetch(r.href,s)}})();const au=!1;var qu=Array.isArray,wm=Array.prototype.indexOf,qs=Array.prototype.includes,rc=Array.from,Rd=Object.defineProperty,Ea=Object.getOwnPropertyDescriptor,Dd=Object.getOwnPropertyDescriptors,Am=Object.prototype,Tm=Array.prototype,$u=Object.getPrototypeOf,Lh=Object.isExtensible;const Hi=()=>{};function Cm(i){return i()}function Fl(i){for(var e=0;e<i.length;e++)i[e]()}function Pd(){var i,e,t=new Promise((n,r)=>{i=n,e=r});return{promise:t,resolve:i,reject:e}}function Rm(i,e){if(Array.isArray(i))return i;if(!(Symbol.iterator in i))return Array.from(i);const t=[];for(const n of i)if(t.push(n),t.length===e)break;return t}const un=2,aa=4,$r=8,Yu=1<<24,_r=16,ui=32,ts=64,ou=128,qn=512,ln=1024,cn=2048,li=4096,_n=8192,Gi=16384,oa=32768,$s=65536,Fh=1<<17,Dm=1<<18,la=1<<19,Ld=1<<20,gi=1<<25,Yr=65536,lu=1<<21,ju=1<<22,lr=1<<23,cr=Symbol("$state"),Pm=Symbol(""),Fr=new class extends Error{constructor(){super(...arguments);xe(this,"name","StaleReactionError");xe(this,"message","The reaction that called `getAbortSignal()` was re-run or destroyed")}};var Ad;const Lm=!!((Ad=globalThis.document)!=null&&Ad.contentType)&&globalThis.document.contentType.includes("xml");function Fd(i){throw new Error("https://svelte.dev/e/lifecycle_outside_component")}function Fm(){throw new Error("https://svelte.dev/e/async_derived_orphan")}function Bm(i,e,t){throw new Error("https://svelte.dev/e/each_key_duplicate")}function Im(i){throw new Error("https://svelte.dev/e/effect_in_teardown")}function km(){throw new Error("https://svelte.dev/e/effect_in_unowned_derived")}function Um(i){throw new Error("https://svelte.dev/e/effect_orphan")}function Nm(){throw new Error("https://svelte.dev/e/effect_update_depth_exceeded")}function Om(){throw new Error("https://svelte.dev/e/state_descriptors_fixed")}function zm(){throw new Error("https://svelte.dev/e/state_prototype_fixed")}function Hm(){throw new Error("https://svelte.dev/e/state_unsafe_mutation")}function Gm(){throw new Error("https://svelte.dev/e/svelte_boundary_reset_onerror")}const Vm=1,Wm=2,Bd=4,Xm=8,qm=16,$m=1,Ym=2,nn=Symbol(),Id="http://www.w3.org/1999/xhtml";function jm(){console.warn("https://svelte.dev/e/select_multiple_invalid_value")}function Km(){console.warn("https://svelte.dev/e/svelte_boundary_reset_noop")}function kd(i){return i===this.v}function Ud(i,e){return i!=i?e==e:i!==e||i!==null&&typeof i=="object"||typeof i=="function"}function Nd(i){return!Ud(i,this.v)}let ja=!1,Zm=!1;function Qm(){ja=!0}let Ut=null;function Ys(i){Ut=i}function jt(i,e=!1,t){Ut={p:Ut,i:!1,c:null,e:null,s:i,x:null,l:ja&&!e?{s:null,u:null,$:[]}:null}}function Kt(i){var e=Ut,t=e.e;if(t!==null){e.e=null;for(var n of t)np(n)}return e.i=!0,Ut=e.p,{}}function Ka(){return!ja||Ut!==null&&Ut.l===null}let Ds=[];function Jm(){var i=Ds;Ds=[],Fl(i)}function Vi(i){if(Ds.length===0){var e=Ds;queueMicrotask(()=>{e===Ds&&Jm()})}Ds.push(i)}function Od(i){var e=bt;if(e===null)return ft.f|=lr,i;if((e.f&oa)===0&&(e.f&aa)===0)throw i;rr(i,e)}function rr(i,e){for(;e!==null;){if((e.f&ou)!==0){if((e.f&oa)===0)throw i;try{e.b.error(i);return}catch(t){i=t}}e=e.parent}throw i}const ex=-7169;function Ht(i,e){i.f=i.f&ex|e}function Ku(i){(i.f&qn)!==0||i.deps===null?Ht(i,ln):Ht(i,li)}function zd(i){if(i!==null)for(const e of i)(e.f&un)===0||(e.f&Yr)===0||(e.f^=Yr,zd(e.deps))}function Hd(i,e,t){(i.f&cn)!==0?e.add(i):(i.f&li)!==0&&t.add(i),zd(i.deps),Ht(i,ln)}const ao=new Set;let Et=null,sn=null,zn=[],Zu=null,js=null,tx=1;var tr,Ns,Ur,Os,zs,Hs,nr,fi,Gs,An,cu,uu,hu,fu;const Ch=class Ch{constructor(){ht(this,An);xe(this,"id",tx++);xe(this,"current",new Map);xe(this,"previous",new Map);ht(this,tr,new Set);ht(this,Ns,new Set);ht(this,Ur,0);ht(this,Os,0);ht(this,zs,null);ht(this,Hs,new Set);ht(this,nr,new Set);ht(this,fi,new Map);xe(this,"is_fork",!1);ht(this,Gs,!1)}skip_effect(e){oe(this,fi).has(e)||oe(this,fi).set(e,{d:[],m:[]})}unskip_effect(e){var t=oe(this,fi).get(e);if(t){oe(this,fi).delete(e);for(var n of t.d)Ht(n,cn),vi(n);for(n of t.m)Ht(n,li),vi(n)}}process(e){var r;zn=[],this.apply();var t=js=[],n=[];for(const s of e)kt(this,An,uu).call(this,s,t,n);if(js=null,kt(this,An,cu).call(this)){kt(this,An,hu).call(this,n),kt(this,An,hu).call(this,t);for(const[s,a]of oe(this,fi))Wd(s,a)}else{Et=null;for(const s of oe(this,tr))s(this);oe(this,tr).clear(),oe(this,Ur)===0&&kt(this,An,fu).call(this),Bh(n),Bh(t),oe(this,Hs).clear(),oe(this,nr).clear(),(r=oe(this,zs))==null||r.resolve()}sn=null}capture(e,t){t!==nn&&!this.previous.has(e)&&this.previous.set(e,t),(e.f&lr)===0&&(this.current.set(e,e.v),sn==null||sn.set(e,e.v))}activate(){Et=this,this.apply()}deactivate(){Et===this&&(Et=null,sn=null)}flush(){var e;if(zn.length>0)Et=this,nx();else if(oe(this,Ur)===0&&!this.is_fork){for(const t of oe(this,tr))t(this);oe(this,tr).clear(),kt(this,An,fu).call(this),(e=oe(this,zs))==null||e.resolve()}this.deactivate()}discard(){for(const e of oe(this,Ns))e(this);oe(this,Ns).clear()}increment(e){ct(this,Ur,oe(this,Ur)+1),e&&ct(this,Os,oe(this,Os)+1)}decrement(e){ct(this,Ur,oe(this,Ur)-1),e&&ct(this,Os,oe(this,Os)-1),!oe(this,Gs)&&(ct(this,Gs,!0),Vi(()=>{ct(this,Gs,!1),kt(this,An,cu).call(this)?zn.length>0&&this.flush():this.revive()}))}revive(){for(const e of oe(this,Hs))oe(this,nr).delete(e),Ht(e,cn),vi(e);for(const e of oe(this,nr))Ht(e,li),vi(e);this.flush()}oncommit(e){oe(this,tr).add(e)}ondiscard(e){oe(this,Ns).add(e)}settled(){return(oe(this,zs)??ct(this,zs,Pd())).promise}static ensure(){if(Et===null){const e=Et=new Ch;ao.add(Et),Vi(()=>{Et===e&&e.flush()})}return Et}apply(){}};tr=new WeakMap,Ns=new WeakMap,Ur=new WeakMap,Os=new WeakMap,zs=new WeakMap,Hs=new WeakMap,nr=new WeakMap,fi=new WeakMap,Gs=new WeakMap,An=new WeakSet,cu=function(){return this.is_fork||oe(this,Os)>0},uu=function(e,t,n){e.f^=ln;for(var r=e.first;r!==null;){var s=r.f,a=(s&(ui|ts))!==0,o=a&&(s&ln)!==0,l=(s&_n)!==0,c=o||oe(this,fi).has(r);if(!c&&r.fn!==null){a?l||(r.f^=ln):(s&aa)!==0?t.push(r):(s&($r|Yu))!==0&&l?n.push(r):Qa(r)&&(Zs(r),(s&_r)!==0&&(oe(this,nr).add(r),l&&Ht(r,cn)));var u=r.first;if(u!==null){r=u;continue}}for(;r!==null;){var f=r.next;if(f!==null){r=f;break}r=r.parent}}},hu=function(e){for(var t=0;t<e.length;t+=1)Hd(e[t],oe(this,Hs),oe(this,nr))},fu=function(){var s;if(ao.size>1){this.previous.clear();var e=Et,t=sn,n=!0;for(const a of ao){if(a===this){n=!1;continue}const o=[];for(const[c,u]of this.current){if(a.current.has(c))if(n&&u!==a.current.get(c))a.current.set(c,u);else continue;o.push(c)}if(o.length===0)continue;const l=[...a.current.keys()].filter(c=>!this.current.has(c));if(l.length>0){var r=zn;zn=[];const c=new Set,u=new Map;for(const f of o)Gd(f,l,c,u);if(zn.length>0){Et=a,a.apply();for(const f of zn)kt(s=a,An,uu).call(s,f,[],[]);a.deactivate()}zn=r}}Et=e,sn=t}oe(this,fi).clear(),ao.delete(this)};let ur=Ch;function nx(){var i=null;try{for(var e=0;zn.length>0;){var t=ur.ensure();if(e++>1e3){var n,r;ix()}t.process(zn),hr.clear()}}finally{zn=[],Zu=null,js=null}}function ix(){try{Nm()}catch(i){rr(i,Zu)}}let ei=null;function Bh(i){var e=i.length;if(e!==0){for(var t=0;t<e;){var n=i[t++];if((n.f&(Gi|_n))===0&&Qa(n)&&(ei=new Set,Zs(n),n.deps===null&&n.first===null&&n.nodes===null&&n.teardown===null&&n.ac===null&&sp(n),(ei==null?void 0:ei.size)>0)){hr.clear();for(const r of ei){if((r.f&(Gi|_n))!==0)continue;const s=[r];let a=r.parent;for(;a!==null;)ei.has(a)&&(ei.delete(a),s.push(a)),a=a.parent;for(let o=s.length-1;o>=0;o--){const l=s[o];(l.f&(Gi|_n))===0&&Zs(l)}}ei.clear()}}ei=null}}function Gd(i,e,t,n){if(!t.has(i)&&(t.add(i),i.reactions!==null))for(const r of i.reactions){const s=r.f;(s&un)!==0?Gd(r,e,t,n):(s&(ju|_r))!==0&&(s&cn)===0&&Vd(r,e,n)&&(Ht(r,cn),vi(r))}}function Vd(i,e,t){const n=t.get(i);if(n!==void 0)return n;if(i.deps!==null)for(const r of i.deps){if(qs.call(e,r))return!0;if((r.f&un)!==0&&Vd(r,e,t))return t.set(r,!0),!0}return t.set(i,!1),!1}function vi(i){var e=Zu=i,t=e.b;if(t!=null&&t.is_pending&&(i.f&(aa|$r|Yu))!==0&&(i.f&oa)===0){t.defer_effect(i);return}for(;e.parent!==null;){e=e.parent;var n=e.f;if(js!==null&&e===bt&&(i.f&$r)===0)return;if((n&(ts|ui))!==0){if((n&ln)===0)return;e.f^=ln}}zn.push(e)}function Wd(i,e){if(!((i.f&ui)!==0&&(i.f&ln)!==0)){(i.f&cn)!==0?e.d.push(i):(i.f&li)!==0&&e.m.push(i),Ht(i,ln);for(var t=i.first;t!==null;)Wd(t,e),t=t.next}}function rx(i){let e=0,t=jr(0),n;return()=>{eh()&&(L(t),ip(()=>(e===0&&(n=br(()=>i(()=>Sa(t)))),e+=1,()=>{Vi(()=>{e-=1,e===0&&(n==null||n(),n=void 0,Sa(t))})})))}}var sx=$s|la;function ax(i,e,t,n){new ox(i,e,t,n)}var On,Xu,di,Nr,yn,pi,Ln,ti,Bi,Or,ir,Vs,Ws,Xs,Ii,nc,qt,lx,cx,ux,du,Xo,qo,pu;class ox{constructor(e,t,n,r){ht(this,qt);xe(this,"parent");xe(this,"is_pending",!1);xe(this,"transform_error");ht(this,On);ht(this,Xu,null);ht(this,di);ht(this,Nr);ht(this,yn);ht(this,pi,null);ht(this,Ln,null);ht(this,ti,null);ht(this,Bi,null);ht(this,Or,0);ht(this,ir,0);ht(this,Vs,!1);ht(this,Ws,new Set);ht(this,Xs,new Set);ht(this,Ii,null);ht(this,nc,rx(()=>(ct(this,Ii,jr(oe(this,Or))),()=>{ct(this,Ii,null)})));var s;ct(this,On,e),ct(this,di,t),ct(this,Nr,a=>{var o=bt;o.b=this,o.f|=ou,n(a)}),this.parent=bt.b,this.transform_error=r??((s=this.parent)==null?void 0:s.transform_error)??(a=>a),ct(this,yn,th(()=>{kt(this,qt,du).call(this)},sx))}defer_effect(e){Hd(e,oe(this,Ws),oe(this,Xs))}is_rendered(){return!this.is_pending&&(!this.parent||this.parent.is_rendered())}has_pending_snippet(){return!!oe(this,di).pending}update_pending_count(e){kt(this,qt,pu).call(this,e),ct(this,Or,oe(this,Or)+e),!(!oe(this,Ii)||oe(this,Vs))&&(ct(this,Vs,!0),Vi(()=>{ct(this,Vs,!1),oe(this,Ii)&&Ks(oe(this,Ii),oe(this,Or))}))}get_effect_pending(){return oe(this,nc).call(this),L(oe(this,Ii))}error(e){var t=oe(this,di).onerror;let n=oe(this,di).failed;if(!t&&!n)throw e;oe(this,pi)&&(Sn(oe(this,pi)),ct(this,pi,null)),oe(this,Ln)&&(Sn(oe(this,Ln)),ct(this,Ln,null)),oe(this,ti)&&(Sn(oe(this,ti)),ct(this,ti,null));var r=!1,s=!1;const a=()=>{if(r){Km();return}r=!0,s&&Gm(),oe(this,ti)!==null&&Hr(oe(this,ti),()=>{ct(this,ti,null)}),kt(this,qt,qo).call(this,()=>{ur.ensure(),kt(this,qt,du).call(this)})},o=l=>{try{s=!0,t==null||t(l,a),s=!1}catch(c){rr(c,oe(this,yn)&&oe(this,yn).parent)}n&&ct(this,ti,kt(this,qt,qo).call(this,()=>{ur.ensure();try{return Hn(()=>{var c=bt;c.b=this,c.f|=ou,n(oe(this,On),()=>l,()=>a)})}catch(c){return rr(c,oe(this,yn).parent),null}}))};Vi(()=>{var l;try{l=this.transform_error(e)}catch(c){rr(c,oe(this,yn)&&oe(this,yn).parent);return}l!==null&&typeof l=="object"&&typeof l.then=="function"?l.then(o,c=>rr(c,oe(this,yn)&&oe(this,yn).parent)):o(l)})}}On=new WeakMap,Xu=new WeakMap,di=new WeakMap,Nr=new WeakMap,yn=new WeakMap,pi=new WeakMap,Ln=new WeakMap,ti=new WeakMap,Bi=new WeakMap,Or=new WeakMap,ir=new WeakMap,Vs=new WeakMap,Ws=new WeakMap,Xs=new WeakMap,Ii=new WeakMap,nc=new WeakMap,qt=new WeakSet,lx=function(){try{ct(this,pi,Hn(()=>oe(this,Nr).call(this,oe(this,On))))}catch(e){this.error(e)}},cx=function(e){const t=oe(this,di).failed;t&&ct(this,ti,Hn(()=>{t(oe(this,On),()=>e,()=>()=>{})}))},ux=function(){const e=oe(this,di).pending;e&&(this.is_pending=!0,ct(this,Ln,Hn(()=>e(oe(this,On)))),Vi(()=>{var t=ct(this,Bi,document.createDocumentFragment()),n=fr();t.append(n),ct(this,pi,kt(this,qt,qo).call(this,()=>(ur.ensure(),Hn(()=>oe(this,Nr).call(this,n))))),oe(this,ir)===0&&(oe(this,On).before(t),ct(this,Bi,null),Hr(oe(this,Ln),()=>{ct(this,Ln,null)}),kt(this,qt,Xo).call(this))}))},du=function(){try{if(this.is_pending=this.has_pending_snippet(),ct(this,ir,0),ct(this,Or,0),ct(this,pi,Hn(()=>{oe(this,Nr).call(this,oe(this,On))})),oe(this,ir)>0){var e=ct(this,Bi,document.createDocumentFragment());rh(oe(this,pi),e);const t=oe(this,di).pending;ct(this,Ln,Hn(()=>t(oe(this,On))))}else kt(this,qt,Xo).call(this)}catch(t){this.error(t)}},Xo=function(){this.is_pending=!1;for(const e of oe(this,Ws))Ht(e,cn),vi(e);for(const e of oe(this,Xs))Ht(e,li),vi(e);oe(this,Ws).clear(),oe(this,Xs).clear()},qo=function(e){var t=bt,n=ft,r=Ut;Si(oe(this,yn)),jn(oe(this,yn)),Ys(oe(this,yn).ctx);try{return e()}catch(s){return Od(s),null}finally{Si(t),jn(n),Ys(r)}},pu=function(e){var t;if(!this.has_pending_snippet()){this.parent&&kt(t=this.parent,qt,pu).call(t,e);return}ct(this,ir,oe(this,ir)+e),oe(this,ir)===0&&(kt(this,qt,Xo).call(this),oe(this,Ln)&&Hr(oe(this,Ln),()=>{ct(this,Ln,null)}),oe(this,Bi)&&(oe(this,On).before(oe(this,Bi)),ct(this,Bi,null)))};function hx(i,e,t,n){const r=Ka()?sc:Xd;var s=i.filter(f=>!f.settled);if(t.length===0&&s.length===0){n(e.map(r));return}var a=bt,o=fx(),l=s.length===1?s[0].promise:s.length>1?Promise.all(s.map(f=>f.promise)):null;function c(f){o();try{n(f)}catch(h){(a.f&Gi)===0&&rr(h,a)}mu()}if(t.length===0){l.then(()=>c(e.map(r)));return}function u(){o(),Promise.all(t.map(f=>px(f))).then(f=>c([...e.map(r),...f])).catch(f=>rr(f,a))}l?l.then(u):u()}function fx(){var i=bt,e=ft,t=Ut,n=Et;return function(s=!0){Si(i),jn(e),Ys(t),s&&(n==null||n.activate())}}function mu(i=!0){Si(null),jn(null),Ys(null),i&&(Et==null||Et.deactivate())}function dx(){var i=bt.b,e=Et,t=i.is_rendered();return i.update_pending_count(1),e.increment(t),()=>{i.update_pending_count(-1),e.decrement(t)}}function sc(i){var e=un|cn,t=ft!==null&&(ft.f&un)!==0?ft:null;return bt!==null&&(bt.f|=la),{ctx:Ut,deps:null,effects:null,equals:kd,f:e,fn:i,reactions:null,rv:0,v:nn,wv:0,parent:t??bt,ac:null}}function px(i,e,t){bt===null&&Fm();var r=void 0,s=jr(nn),a=!ft,o=new Map;return Tx(()=>{var h;var l=Pd();r=l.promise;try{Promise.resolve(i()).then(l.resolve,l.reject).finally(mu)}catch(m){l.reject(m),mu()}var c=Et;if(a){var u=dx();(h=o.get(c))==null||h.reject(Fr),o.delete(c),o.set(c,l)}const f=(m,x=void 0)=>{if(c.activate(),x)x!==Fr&&(s.f|=lr,Ks(s,x));else{(s.f&lr)!==0&&(s.f^=lr),Ks(s,m);for(const[v,d]of o){if(o.delete(v),v===c)break;d.reject(Fr)}}u&&u()};l.promise.then(f,m=>f(null,m||"unknown"))}),oc(()=>{for(const l of o.values())l.reject(Fr)}),new Promise(l=>{function c(u){function f(){u===r?l(s):c(r)}u.then(f,f)}c(r)})}function Je(i){const e=sc(i);return lp(e),e}function Xd(i){const e=sc(i);return e.equals=Nd,e}function mx(i){var e=i.effects;if(e!==null){i.effects=null;for(var t=0;t<e.length;t+=1)Sn(e[t])}}function xx(i){for(var e=i.parent;e!==null;){if((e.f&un)===0)return(e.f&Gi)===0?e:null;e=e.parent}return null}function Qu(i){var e,t=bt;Si(xx(i));try{i.f&=~Yr,mx(i),e=fp(i)}finally{Si(t)}return e}function qd(i){var e=Qu(i);if(!i.equals(e)&&(i.wv=up(),(!(Et!=null&&Et.is_fork)||i.deps===null)&&(i.v=e,i.deps===null))){Ht(i,ln);return}Kr||(sn!==null?(eh()||Et!=null&&Et.is_fork)&&sn.set(i,e):Ku(i))}function gx(i){var e,t;if(i.effects!==null)for(const n of i.effects)(n.teardown||n.ac)&&((e=n.teardown)==null||e.call(n),(t=n.ac)==null||t.abort(Fr),n.teardown=Hi,n.ac=null,Na(n,0),nh(n))}function $d(i){if(i.effects!==null)for(const e of i.effects)e.teardown&&Zs(e)}let xu=new Set;const hr=new Map;let Yd=!1;function jr(i,e){var t={f:0,v:i,reactions:null,equals:kd,rv:0,wv:0};return t}function Le(i,e){const t=jr(i);return lp(t),t}function ac(i,e=!1,t=!0){var r;const n=jr(i);return e||(n.equals=Nd),ja&&t&&Ut!==null&&Ut.l!==null&&((r=Ut.l).s??(r.s=[])).push(n),n}function Ps(i,e){return Se(i,br(()=>L(i))),e}function Se(i,e,t=!1){ft!==null&&(!oi||(ft.f&Fh)!==0)&&Ka()&&(ft.f&(un|_r|ju|Fh))!==0&&($n===null||!qs.call($n,i))&&Hm();let n=t?Lt(e):e;return Ks(i,n)}function Ks(i,e){if(!i.equals(e)){var t=i.v;Kr?hr.set(i,e):hr.set(i,t),i.v=e;var n=ur.ensure();if(n.capture(i,t),(i.f&un)!==0){const r=i;(i.f&cn)!==0&&Qu(r),Ku(r)}i.wv=up(),jd(i,cn),Ka()&&bt!==null&&(bt.f&ln)!==0&&(bt.f&(ui|ts))===0&&(Nn===null?Dx([i]):Nn.push(i)),!n.is_fork&&xu.size>0&&!Yd&&vx()}return e}function vx(){Yd=!1;for(const i of xu)(i.f&ln)!==0&&Ht(i,li),Qa(i)&&Zs(i);xu.clear()}function Sa(i){Se(i,i.v+1)}function jd(i,e){var t=i.reactions;if(t!==null)for(var n=Ka(),r=t.length,s=0;s<r;s++){var a=t[s],o=a.f;if(!(!n&&a===bt)){var l=(o&cn)===0;if(l&&Ht(a,e),(o&un)!==0){var c=a;sn==null||sn.delete(c),(o&Yr)===0&&(o&qn&&(a.f|=Yr),jd(c,li))}else l&&((o&_r)!==0&&ei!==null&&ei.add(a),vi(a))}}}function Lt(i){if(typeof i!="object"||i===null||cr in i)return i;const e=$u(i);if(e!==Am&&e!==Tm)return i;var t=new Map,n=qu(i),r=Le(0),s=Gr,a=o=>{if(Gr===s)return o();var l=ft,c=Gr;jn(null),Nh(s);var u=o();return jn(l),Nh(c),u};return n&&t.set("length",Le(i.length)),new Proxy(i,{defineProperty(o,l,c){(!("value"in c)||c.configurable===!1||c.enumerable===!1||c.writable===!1)&&Om();var u=t.get(l);return u===void 0?a(()=>{var f=Le(c.value);return t.set(l,f),f}):Se(u,c.value,!0),!0},deleteProperty(o,l){var c=t.get(l);if(c===void 0){if(l in o){const u=a(()=>Le(nn));t.set(l,u),Sa(r)}}else Se(c,nn),Sa(r);return!0},get(o,l,c){var m;if(l===cr)return i;var u=t.get(l),f=l in o;if(u===void 0&&(!f||(m=Ea(o,l))!=null&&m.writable)&&(u=a(()=>{var x=Lt(f?o[l]:nn),v=Le(x);return v}),t.set(l,u)),u!==void 0){var h=L(u);return h===nn?void 0:h}return Reflect.get(o,l,c)},getOwnPropertyDescriptor(o,l){var c=Reflect.getOwnPropertyDescriptor(o,l);if(c&&"value"in c){var u=t.get(l);u&&(c.value=L(u))}else if(c===void 0){var f=t.get(l),h=f==null?void 0:f.v;if(f!==void 0&&h!==nn)return{enumerable:!0,configurable:!0,value:h,writable:!0}}return c},has(o,l){var h;if(l===cr)return!0;var c=t.get(l),u=c!==void 0&&c.v!==nn||Reflect.has(o,l);if(c!==void 0||bt!==null&&(!u||(h=Ea(o,l))!=null&&h.writable)){c===void 0&&(c=a(()=>{var m=u?Lt(o[l]):nn,x=Le(m);return x}),t.set(l,c));var f=L(c);if(f===nn)return!1}return u},set(o,l,c,u){var g;var f=t.get(l),h=l in o;if(n&&l==="length")for(var m=c;m<f.v;m+=1){var x=t.get(m+"");x!==void 0?Se(x,nn):m in o&&(x=a(()=>Le(nn)),t.set(m+"",x))}if(f===void 0)(!h||(g=Ea(o,l))!=null&&g.writable)&&(f=a(()=>Le(void 0)),Se(f,Lt(c)),t.set(l,f));else{h=f.v!==nn;var v=a(()=>Lt(c));Se(f,v)}var d=Reflect.getOwnPropertyDescriptor(o,l);if(d!=null&&d.set&&d.set.call(u,c),!h){if(n&&typeof l=="string"){var p=t.get("length"),_=Number(l);Number.isInteger(_)&&_>=p.v&&Se(p,_+1)}Sa(r)}return!0},ownKeys(o){L(r);var l=Reflect.ownKeys(o).filter(f=>{var h=t.get(f);return h===void 0||h.v!==nn});for(var[c,u]of t)u.v!==nn&&!(c in o)&&l.push(c);return l},setPrototypeOf(){zm()}})}function Ih(i){try{if(i!==null&&typeof i=="object"&&cr in i)return i[cr]}catch{}return i}function _x(i,e){return Object.is(Ih(i),Ih(e))}var kh,Kd,Zd,Qd,Jd;function bx(){if(kh===void 0){kh=window,Kd=document,Zd=/Firefox/.test(navigator.userAgent);var i=Element.prototype,e=Node.prototype,t=Text.prototype;Qd=Ea(e,"firstChild").get,Jd=Ea(e,"nextSibling").get,Lh(i)&&(i.__click=void 0,i.__className=void 0,i.__attributes=null,i.__style=void 0,i.__e=void 0),Lh(t)&&(t.__t=void 0)}}function fr(i=""){return document.createTextNode(i)}function Bl(i){return Qd.call(i)}function Za(i){return Jd.call(i)}function ue(i,e){return Bl(i)}function an(i,e=!1){{var t=Bl(i);return t instanceof Comment&&t.data===""?Za(t):t}}function ae(i,e=1,t=!1){let n=i;for(;e--;)n=Za(n);return n}function yx(i){i.textContent=""}function ep(){return!1}function Ex(i,e,t){return document.createElementNS(Id,i,void 0)}function Ju(i){var e=ft,t=bt;jn(null),Si(null);try{return i()}finally{jn(e),Si(t)}}function tp(i){bt===null&&(ft===null&&Um(),km()),Kr&&Im()}function Sx(i,e){var t=e.last;t===null?e.last=e.first=i:(t.next=i,i.prev=t,e.last=i)}function Mi(i,e){var t=bt;t!==null&&(t.f&_n)!==0&&(i|=_n);var n={ctx:Ut,deps:null,nodes:null,f:i|cn|qn,first:null,fn:e,last:null,next:null,parent:t,b:t&&t.b,prev:null,teardown:null,wv:0,ac:null},r=n;if((i&aa)!==0)js!==null?js.push(n):vi(n);else if(e!==null){try{Zs(n)}catch(a){throw Sn(n),a}r.deps===null&&r.teardown===null&&r.nodes===null&&r.first===r.last&&(r.f&la)===0&&(r=r.first,(i&_r)!==0&&(i&$s)!==0&&r!==null&&(r.f|=$s))}if(r!==null&&(r.parent=t,t!==null&&Sx(r,t),ft!==null&&(ft.f&un)!==0&&(i&ts)===0)){var s=ft;(s.effects??(s.effects=[])).push(r)}return n}function eh(){return ft!==null&&!oi}function oc(i){const e=Mi($r,null);return Ht(e,ln),e.teardown=i,e}function wt(i){tp();var e=bt.f,t=!ft&&(e&ui)!==0&&(e&oa)===0;if(t){var n=Ut;(n.e??(n.e=[])).push(i)}else return np(i)}function np(i){return Mi(aa|Ld,i)}function Mx(i){return tp(),Mi($r|Ld,i)}function wx(i){ur.ensure();const e=Mi(ts|la,i);return(t={})=>new Promise(n=>{t.outro?Hr(e,()=>{Sn(e),n(void 0)}):(Sn(e),n(void 0))})}function Ax(i){return Mi(aa,i)}function Tx(i){return Mi(ju|la,i)}function ip(i,e=0){return Mi($r|e,i)}function St(i,e=[],t=[],n=[]){hx(n,e,t,r=>{Mi($r,()=>i(...r.map(L)))})}function th(i,e=0){var t=Mi(_r|e,i);return t}function Hn(i){return Mi(ui|la,i)}function rp(i){var e=i.teardown;if(e!==null){const t=Kr,n=ft;Uh(!0),jn(null);try{e.call(null)}finally{Uh(t),jn(n)}}}function nh(i,e=!1){var t=i.first;for(i.first=i.last=null;t!==null;){const r=t.ac;r!==null&&Ju(()=>{r.abort(Fr)});var n=t.next;(t.f&ts)!==0?t.parent=null:Sn(t,e),t=n}}function Cx(i){for(var e=i.first;e!==null;){var t=e.next;(e.f&ui)===0&&Sn(e),e=t}}function Sn(i,e=!0){var t=!1;(e||(i.f&Dm)!==0)&&i.nodes!==null&&i.nodes.end!==null&&(Rx(i.nodes.start,i.nodes.end),t=!0),nh(i,e&&!t),Na(i,0),Ht(i,Gi);var n=i.nodes&&i.nodes.t;if(n!==null)for(const s of n)s.stop();rp(i);var r=i.parent;r!==null&&r.first!==null&&sp(i),i.next=i.prev=i.teardown=i.ctx=i.deps=i.fn=i.nodes=i.ac=null}function Rx(i,e){for(;i!==null;){var t=i===e?null:Za(i);i.remove(),i=t}}function sp(i){var e=i.parent,t=i.prev,n=i.next;t!==null&&(t.next=n),n!==null&&(n.prev=t),e!==null&&(e.first===i&&(e.first=n),e.last===i&&(e.last=t))}function Hr(i,e,t=!0){var n=[];ap(i,n,!0);var r=()=>{t&&Sn(i),e&&e()},s=n.length;if(s>0){var a=()=>--s||r();for(var o of n)o.out(a)}else r()}function ap(i,e,t){if((i.f&_n)===0){i.f^=_n;var n=i.nodes&&i.nodes.t;if(n!==null)for(const o of n)(o.is_global||t)&&e.push(o);for(var r=i.first;r!==null;){var s=r.next,a=(r.f&$s)!==0||(r.f&ui)!==0&&(i.f&_r)!==0;ap(r,e,a?t:!1),r=s}}}function ih(i){op(i,!0)}function op(i,e){if((i.f&_n)!==0){i.f^=_n;for(var t=i.first;t!==null;){var n=t.next,r=(t.f&$s)!==0||(t.f&ui)!==0;op(t,r?e:!1),t=n}var s=i.nodes&&i.nodes.t;if(s!==null)for(const a of s)(a.is_global||e)&&a.in()}}function rh(i,e){if(i.nodes)for(var t=i.nodes.start,n=i.nodes.end;t!==null;){var r=t===n?null:Za(t);e.append(t),t=r}}let $o=!1,Kr=!1;function Uh(i){Kr=i}let ft=null,oi=!1;function jn(i){ft=i}let bt=null;function Si(i){bt=i}let $n=null;function lp(i){ft!==null&&($n===null?$n=[i]:$n.push(i))}let En=null,Pn=0,Nn=null;function Dx(i){Nn=i}let cp=1,Br=0,Gr=Br;function Nh(i){Gr=i}function up(){return++cp}function Qa(i){var e=i.f;if((e&cn)!==0)return!0;if(e&un&&(i.f&=~Yr),(e&li)!==0){for(var t=i.deps,n=t.length,r=0;r<n;r++){var s=t[r];if(Qa(s)&&qd(s),s.wv>i.wv)return!0}(e&qn)!==0&&sn===null&&Ht(i,ln)}return!1}function hp(i,e,t=!0){var n=i.reactions;if(n!==null&&!($n!==null&&qs.call($n,i)))for(var r=0;r<n.length;r++){var s=n[r];(s.f&un)!==0?hp(s,e,!1):e===s&&(t?Ht(s,cn):(s.f&ln)!==0&&Ht(s,li),vi(s))}}function fp(i){var v;var e=En,t=Pn,n=Nn,r=ft,s=$n,a=Ut,o=oi,l=Gr,c=i.f;En=null,Pn=0,Nn=null,ft=(c&(ui|ts))===0?i:null,$n=null,Ys(i.ctx),oi=!1,Gr=++Br,i.ac!==null&&(Ju(()=>{i.ac.abort(Fr)}),i.ac=null);try{i.f|=lu;var u=i.fn,f=u();i.f|=oa;var h=i.deps,m=Et==null?void 0:Et.is_fork;if(En!==null){var x;if(m||Na(i,Pn),h!==null&&Pn>0)for(h.length=Pn+En.length,x=0;x<En.length;x++)h[Pn+x]=En[x];else i.deps=h=En;if(eh()&&(i.f&qn)!==0)for(x=Pn;x<h.length;x++)((v=h[x]).reactions??(v.reactions=[])).push(i)}else!m&&h!==null&&Pn<h.length&&(Na(i,Pn),h.length=Pn);if(Ka()&&Nn!==null&&!oi&&h!==null&&(i.f&(un|li|cn))===0)for(x=0;x<Nn.length;x++)hp(Nn[x],i);if(r!==null&&r!==i){if(Br++,r.deps!==null)for(let d=0;d<t;d+=1)r.deps[d].rv=Br;if(e!==null)for(const d of e)d.rv=Br;Nn!==null&&(n===null?n=Nn:n.push(...Nn))}return(i.f&lr)!==0&&(i.f^=lr),f}catch(d){return Od(d)}finally{i.f^=lu,En=e,Pn=t,Nn=n,ft=r,$n=s,Ys(a),oi=o,Gr=l}}function Px(i,e){let t=e.reactions;if(t!==null){var n=wm.call(t,i);if(n!==-1){var r=t.length-1;r===0?t=e.reactions=null:(t[n]=t[r],t.pop())}}if(t===null&&(e.f&un)!==0&&(En===null||!qs.call(En,e))){var s=e;(s.f&qn)!==0&&(s.f^=qn,s.f&=~Yr),Ku(s),gx(s),Na(s,0)}}function Na(i,e){var t=i.deps;if(t!==null)for(var n=e;n<t.length;n++)Px(i,t[n])}function Zs(i){var e=i.f;if((e&Gi)===0){Ht(i,ln);var t=bt,n=$o;bt=i,$o=!0;try{(e&(_r|Yu))!==0?Cx(i):nh(i),rp(i);var r=fp(i);i.teardown=typeof r=="function"?r:null,i.wv=cp;var s;au&&Zm&&(i.f&cn)!==0&&i.deps}finally{$o=n,bt=t}}}function L(i){var e=i.f,t=(e&un)!==0;if(ft!==null&&!oi){var n=bt!==null&&(bt.f&Gi)!==0;if(!n&&($n===null||!qs.call($n,i))){var r=ft.deps;if((ft.f&lu)!==0)i.rv<Br&&(i.rv=Br,En===null&&r!==null&&r[Pn]===i?Pn++:En===null?En=[i]:En.push(i));else{(ft.deps??(ft.deps=[])).push(i);var s=i.reactions;s===null?i.reactions=[ft]:qs.call(s,ft)||s.push(ft)}}}if(Kr&&hr.has(i))return hr.get(i);if(t){var a=i;if(Kr){var o=a.v;return((a.f&ln)===0&&a.reactions!==null||pp(a))&&(o=Qu(a)),hr.set(a,o),o}var l=(a.f&qn)===0&&!oi&&ft!==null&&($o||(ft.f&qn)!==0),c=(a.f&oa)===0;Qa(a)&&(l&&(a.f|=qn),qd(a)),l&&!c&&($d(a),dp(a))}if(sn!=null&&sn.has(i))return sn.get(i);if((i.f&lr)!==0)throw i.v;return i.v}function dp(i){if(i.f|=qn,i.deps!==null)for(const e of i.deps)(e.reactions??(e.reactions=[])).push(i),(e.f&un)!==0&&(e.f&qn)===0&&($d(e),dp(e))}function pp(i){if(i.v===nn)return!0;if(i.deps===null)return!1;for(const e of i.deps)if(hr.has(e)||(e.f&un)!==0&&pp(e))return!0;return!1}function br(i){var e=oi;try{return oi=!0,i()}finally{oi=e}}function Lx(i){if(!(typeof i!="object"||!i||i instanceof EventTarget)){if(cr in i)gu(i);else if(!Array.isArray(i))for(let e in i){const t=i[e];typeof t=="object"&&t&&cr in t&&gu(t)}}}function gu(i,e=new Set){if(typeof i=="object"&&i!==null&&!(i instanceof EventTarget)&&!e.has(i)){e.add(i),i instanceof Date&&i.getTime();for(let n in i)try{gu(i[n],e)}catch{}const t=$u(i);if(t!==Object.prototype&&t!==Array.prototype&&t!==Map.prototype&&t!==Set.prototype&&t!==Date.prototype){const n=Dd(t);for(let r in n){const s=n[r].get;if(s)try{s.call(i)}catch{}}}}}const Fx=["touchstart","touchmove"];function Bx(i){return Fx.includes(i)}const Ir=Symbol("events"),mp=new Set,vu=new Set;function Ix(i,e,t,n={}){function r(s){if(n.capture||_u.call(e,s),!s.cancelBubble)return Ju(()=>t==null?void 0:t.call(this,s))}return i.startsWith("pointer")||i.startsWith("touch")||i==="wheel"?Vi(()=>{e.addEventListener(i,r,n)}):e.addEventListener(i,r,n),r}function xp(i,e,t,n,r){var s={capture:n,passive:r},a=Ix(i,e,t,s);(e===document.body||e===window||e===document||e instanceof HTMLMediaElement)&&oc(()=>{e.removeEventListener(i,a,s)})}function De(i,e,t){(e[Ir]??(e[Ir]={}))[i]=t}function hi(i){for(var e=0;e<i.length;e++)mp.add(i[e]);for(var t of vu)t(i)}let Oh=null;function _u(i){var d,p;var e=this,t=e.ownerDocument,n=i.type,r=((d=i.composedPath)==null?void 0:d.call(i))||[],s=r[0]||i.target;Oh=i;var a=0,o=Oh===i&&i[Ir];if(o){var l=r.indexOf(o);if(l!==-1&&(e===document||e===window)){i[Ir]=e;return}var c=r.indexOf(e);if(c===-1)return;l<=c&&(a=l)}if(s=r[a]||i.target,s!==e){Rd(i,"currentTarget",{configurable:!0,get(){return s||t}});var u=ft,f=bt;jn(null),Si(null);try{for(var h,m=[];s!==null;){var x=s.assignedSlot||s.parentNode||s.host||null;try{var v=(p=s[Ir])==null?void 0:p[n];v!=null&&(!s.disabled||i.target===s)&&v.call(s,i)}catch(_){h?m.push(_):h=_}if(i.cancelBubble||x===e||x===null)break;s=x}if(h){for(let _ of m)queueMicrotask(()=>{throw _});throw h}}finally{i[Ir]=e,delete i.currentTarget,jn(u),Si(f)}}}var Td;const _c=((Td=globalThis==null?void 0:globalThis.window)==null?void 0:Td.trustedTypes)&&globalThis.window.trustedTypes.createPolicy("svelte-trusted-html",{createHTML:i=>i});function kx(i){return(_c==null?void 0:_c.createHTML(i))??i}function Ux(i){var e=Ex("template");return e.innerHTML=kx(i.replaceAll("<!>","<!---->")),e.content}function bu(i,e){var t=bt;t.nodes===null&&(t.nodes={start:i,end:e,a:null,t:null})}function et(i,e){var t=(e&$m)!==0,n=(e&Ym)!==0,r,s=!i.startsWith("<!>");return()=>{r===void 0&&(r=Ux(s?i:"<!>"+i),t||(r=Bl(r)));var a=n||Zd?document.importNode(r,!0):r.cloneNode(!0);if(t){var o=Bl(a),l=a.lastChild;bu(o,l)}else bu(a,a);return a}}function zh(){var i=document.createDocumentFragment(),e=document.createComment(""),t=fr();return i.append(e,t),bu(e,t),i}function Ke(i,e){i!==null&&i.before(e)}function pt(i,e){var t=e==null?"":typeof e=="object"?`${e}`:e;t!==(i.__t??(i.__t=i.nodeValue))&&(i.__t=t,i.nodeValue=`${t}`)}function Nx(i,e){return Ox(i,e)}const oo=new Map;function Ox(i,{target:e,anchor:t,props:n={},events:r,context:s,intro:a=!0,transformError:o}){bx();var l=void 0,c=wx(()=>{var u=t??e.appendChild(fr());ax(u,{pending:()=>{}},m=>{jt({});var x=Ut;s&&(x.c=s),r&&(n.$$events=r),l=i(m,n)||{},Kt()},o);var f=new Set,h=m=>{for(var x=0;x<m.length;x++){var v=m[x];if(!f.has(v)){f.add(v);var d=Bx(v);for(const g of[e,document]){var p=oo.get(g);p===void 0&&(p=new Map,oo.set(g,p));var _=p.get(v);_===void 0?(g.addEventListener(v,_u,{passive:d}),p.set(v,1)):p.set(v,_+1)}}}};return h(rc(mp)),vu.add(h),()=>{var d;for(var m of f)for(const p of[e,document]){var x=oo.get(p),v=x.get(m);--v==0?(p.removeEventListener(m,_u),x.delete(m),x.size===0&&oo.delete(p)):x.set(m,v)}vu.delete(h),u!==t&&((d=u.parentNode)==null||d.removeChild(u))}});return zx.set(l,c),l}let zx=new WeakMap;var ni,mi,Fn,zr,$a,Ya,ic;class Hx{constructor(e,t=!0){xe(this,"anchor");ht(this,ni,new Map);ht(this,mi,new Map);ht(this,Fn,new Map);ht(this,zr,new Set);ht(this,$a,!0);ht(this,Ya,e=>{if(oe(this,ni).has(e)){var t=oe(this,ni).get(e),n=oe(this,mi).get(t);if(n)ih(n),oe(this,zr).delete(t);else{var r=oe(this,Fn).get(t);r&&(r.effect.f&_n)===0&&(oe(this,mi).set(t,r.effect),oe(this,Fn).delete(t),r.fragment.lastChild.remove(),this.anchor.before(r.fragment),n=r.effect)}for(const[s,a]of oe(this,ni)){if(oe(this,ni).delete(s),s===e)break;const o=oe(this,Fn).get(a);o&&(Sn(o.effect),oe(this,Fn).delete(a))}for(const[s,a]of oe(this,mi)){if(s===t||oe(this,zr).has(s)||(a.f&_n)!==0)continue;const o=()=>{if(Array.from(oe(this,ni).values()).includes(s)){var c=document.createDocumentFragment();rh(a,c),c.append(fr()),oe(this,Fn).set(s,{effect:a,fragment:c})}else Sn(a);oe(this,zr).delete(s),oe(this,mi).delete(s)};oe(this,$a)||!n?(oe(this,zr).add(s),Hr(a,o,!1)):o()}}});ht(this,ic,e=>{oe(this,ni).delete(e);const t=Array.from(oe(this,ni).values());for(const[n,r]of oe(this,Fn))t.includes(n)||(Sn(r.effect),oe(this,Fn).delete(n))});this.anchor=e,ct(this,$a,t)}ensure(e,t){var n=Et,r=ep();if(t&&!oe(this,mi).has(e)&&!oe(this,Fn).has(e))if(r){var s=document.createDocumentFragment(),a=fr();s.append(a),oe(this,Fn).set(e,{effect:Hn(()=>t(a)),fragment:s})}else oe(this,mi).set(e,Hn(()=>t(this.anchor)));if(oe(this,ni).set(n,e),r){for(const[o,l]of oe(this,mi))o===e?n.unskip_effect(l):n.skip_effect(l);for(const[o,l]of oe(this,Fn))o===e?n.unskip_effect(l.effect):n.skip_effect(l.effect);n.oncommit(oe(this,Ya)),n.ondiscard(oe(this,ic))}else oe(this,Ya).call(this,n)}}ni=new WeakMap,mi=new WeakMap,Fn=new WeakMap,zr=new WeakMap,$a=new WeakMap,Ya=new WeakMap,ic=new WeakMap;function rn(i,e,t=!1){var n=new Hx(i),r=t?$s:0;function s(a,o){n.ensure(a,o)}th(()=>{var a=!1;e((o,l=0)=>{a=!0,s(l,o)}),a||s(-1,null)},r)}function Qs(i,e){return e}function Gx(i,e,t){for(var n=[],r=e.length,s,a=e.length,o=0;o<r;o++){let f=e[o];Hr(f,()=>{if(s){if(s.pending.delete(f),s.done.add(f),s.pending.size===0){var h=i.outrogroups;yu(i,rc(s.done)),h.delete(s),h.size===0&&(i.outrogroups=null)}}else a-=1},!1)}if(a===0){var l=n.length===0&&t!==null;if(l){var c=t,u=c.parentNode;yx(u),u.append(c),i.items.clear()}yu(i,e,!l)}else s={pending:new Set(e),done:new Set},(i.outrogroups??(i.outrogroups=new Set)).add(s)}function yu(i,e,t=!0){var n;if(i.pending.size>0){n=new Set;for(const a of i.pending.values())for(const o of a)n.add(i.items.get(o).e)}for(var r=0;r<e.length;r++){var s=e[r];if(n!=null&&n.has(s)){s.f|=gi;const a=document.createDocumentFragment();rh(s,a)}else Sn(e[r],t)}}var Hh;function Js(i,e,t,n,r,s=null){var a=i,o=new Map,l=(e&Bd)!==0;if(l){var c=i;a=c.appendChild(fr())}var u=null,f=Xd(()=>{var g=t();return qu(g)?g:g==null?[]:rc(g)}),h,m=new Map,x=!0;function v(g){(_.effect.f&Gi)===0&&(_.pending.delete(g),_.fallback=u,Vx(_,h,a,e,n),u!==null&&(h.length===0?(u.f&gi)===0?ih(u):(u.f^=gi,ya(u,null,a)):Hr(u,()=>{u=null})))}function d(g){_.pending.delete(g)}var p=th(()=>{h=L(f);for(var g=h.length,b=new Set,w=Et,S=ep(),M=0;M<g;M+=1){var I=h[M],E=n(I,M),y=x?null:o.get(E);y?(y.v&&Ks(y.v,I),y.i&&Ks(y.i,M),S&&w.unskip_effect(y.e)):(y=Wx(o,x?a:Hh??(Hh=fr()),I,E,M,r,e,t),x||(y.e.f|=gi),o.set(E,y)),b.add(E)}if(g===0&&s&&!u&&(x?u=Hn(()=>s(a)):(u=Hn(()=>s(Hh??(Hh=fr()))),u.f|=gi)),g>b.size&&Bm(),!x)if(m.set(w,b),S){for(const[P,U]of o)b.has(P)||w.skip_effect(U.e);w.oncommit(v),w.ondiscard(d)}else v(w);L(f)}),_={effect:p,items:o,pending:m,outrogroups:null,fallback:u};x=!1}function ha(i){for(;i!==null&&(i.f&ui)===0;)i=i.next;return i}function Vx(i,e,t,n,r){var y,P,U,G,F,z,q,ee,Z;var s=(n&Xm)!==0,a=e.length,o=i.items,l=ha(i.effect.first),c,u=null,f,h=[],m=[],x,v,d,p;if(s)for(p=0;p<a;p+=1)x=e[p],v=r(x,p),d=o.get(v).e,(d.f&gi)===0&&((P=(y=d.nodes)==null?void 0:y.a)==null||P.measure(),(f??(f=new Set)).add(d));for(p=0;p<a;p+=1){if(x=e[p],v=r(x,p),d=o.get(v).e,i.outrogroups!==null)for(const Q of i.outrogroups)Q.pending.delete(d),Q.done.delete(d);if((d.f&gi)!==0)if(d.f^=gi,d===l)ya(d,null,t);else{var _=u?u.next:l;d===i.effect.last&&(i.effect.last=d.prev),d.prev&&(d.prev.next=d.next),d.next&&(d.next.prev=d.prev),qi(i,u,d),qi(i,d,_),ya(d,_,t),u=d,h=[],m=[],l=ha(u.next);continue}if((d.f&_n)!==0&&(ih(d),s&&((G=(U=d.nodes)==null?void 0:U.a)==null||G.unfix(),(f??(f=new Set)).delete(d))),d!==l){if(c!==void 0&&c.has(d)){if(h.length<m.length){var g=m[0],b;u=g.prev;var w=h[0],S=h[h.length-1];for(b=0;b<h.length;b+=1)ya(h[b],g,t);for(b=0;b<m.length;b+=1)c.delete(m[b]);qi(i,w.prev,S.next),qi(i,u,w),qi(i,S,g),l=g,u=S,p-=1,h=[],m=[]}else c.delete(d),ya(d,l,t),qi(i,d.prev,d.next),qi(i,d,u===null?i.effect.first:u.next),qi(i,u,d),u=d;continue}for(h=[],m=[];l!==null&&l!==d;)(c??(c=new Set)).add(l),m.push(l),l=ha(l.next);if(l===null)continue}(d.f&gi)===0&&h.push(d),u=d,l=ha(d.next)}if(i.outrogroups!==null){for(const Q of i.outrogroups)Q.pending.size===0&&(yu(i,rc(Q.done)),(F=i.outrogroups)==null||F.delete(Q));i.outrogroups.size===0&&(i.outrogroups=null)}if(l!==null||c!==void 0){var M=[];if(c!==void 0)for(d of c)(d.f&_n)===0&&M.push(d);for(;l!==null;)(l.f&_n)===0&&l!==i.fallback&&M.push(l),l=ha(l.next);var I=M.length;if(I>0){var E=(n&Bd)!==0&&a===0?t:null;if(s){for(p=0;p<I;p+=1)(q=(z=M[p].nodes)==null?void 0:z.a)==null||q.measure();for(p=0;p<I;p+=1)(Z=(ee=M[p].nodes)==null?void 0:ee.a)==null||Z.fix()}Gx(i,M,E)}}s&&Vi(()=>{var Q,j;if(f!==void 0)for(d of f)(j=(Q=d.nodes)==null?void 0:Q.a)==null||j.apply()})}function Wx(i,e,t,n,r,s,a,o){var l=(a&Vm)!==0?(a&qm)===0?ac(t,!1,!1):jr(t):null,c=(a&Wm)!==0?jr(r):null;return{v:l,i:c,e:Hn(()=>(s(e,l??t,c??r,o),()=>{i.delete(n)}))}}function ya(i,e,t){if(i.nodes)for(var n=i.nodes.start,r=i.nodes.end,s=e&&(e.f&gi)===0?e.nodes.start:t;n!==null;){var a=Za(n);if(s.before(n),n===r)return;n=a}}function qi(i,e,t){e===null?i.effect.first=t:e.next=t,t===null?i.effect.last=e:t.prev=e}const Gh=[...` 	
\r\f \v\uFEFF`];function Xx(i,e,t){var n=i==null?"":""+i;if(t){for(var r of Object.keys(t))if(t[r])n=n?n+" "+r:r;else if(n.length)for(var s=r.length,a=0;(a=n.indexOf(r,a))>=0;){var o=a+s;(a===0||Gh.includes(n[a-1]))&&(o===n.length||Gh.includes(n[o]))?n=(a===0?"":n.substring(0,a))+n.substring(o+1):a=o}}return n===""?null:n}function qx(i,e){return i==null?null:String(i)}function je(i,e,t,n,r,s){var a=i.__className;if(a!==t||a===void 0){var o=Xx(t,n,s);o==null?i.removeAttribute("class"):i.className=o,i.__className=t}else if(s&&r!==s)for(var l in s){var c=!!s[l];(r==null||c!==!!r[l])&&i.classList.toggle(l,c)}return s}function yi(i,e,t,n){var r=i.__style;if(r!==e){var s=qx(e);s==null?i.removeAttribute("style"):i.style.cssText=s,i.__style=e}return n}function gp(i,e,t=!1){if(i.multiple){if(e==null)return;if(!qu(e))return jm();for(var n of i.options)n.selected=e.includes(Vh(n));return}for(n of i.options){var r=Vh(n);if(_x(r,e)){n.selected=!0;return}}(!t||e!==void 0)&&(i.selectedIndex=-1)}function $x(i){var e=new MutationObserver(()=>{gp(i,i.__value)});e.observe(i,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["value"]}),oc(()=>{e.disconnect()})}function Vh(i){return"__value"in i?i.__value:i.value}const Yx=Symbol("is custom element"),jx=Symbol("is html"),Kx=Lm?"progress":"PROGRESS";function ii(i,e){var t=vp(i);t.value===(t.value=e??void 0)||i.value===e&&(e!==0||i.nodeName!==Kx)||(i.value=e??"")}function Zx(i,e){e?i.hasAttribute("selected")||i.setAttribute("selected",""):i.removeAttribute("selected")}function Pt(i,e,t,n){var r=vp(i);r[e]!==(r[e]=t)&&(e==="loading"&&(i[Pm]=t),t==null?i.removeAttribute(e):typeof t!="string"&&Qx(i).includes(e)?i[e]=t:i.setAttribute(e,t))}function vp(i){return i.__attributes??(i.__attributes={[Yx]:i.nodeName.includes("-"),[jx]:i.namespaceURI===Id})}var Wh=new Map;function Qx(i){var e=i.getAttribute("is")||i.nodeName,t=Wh.get(e);if(t)return t;Wh.set(e,t=[]);for(var n,r=i,s=Element.prototype;s!==r;){n=Dd(r);for(var a in n)n[a].set&&t.push(a);r=$u(r)}return t}function Xh(i,e){return i===e||(i==null?void 0:i[cr])===e}function Oa(i={},e,t,n){return Ax(()=>{var r,s;return ip(()=>{r=s,s=[],br(()=>{i!==t(...s)&&(e(i,...s),r&&Xh(t(...r),i)&&e(null,...r))})}),()=>{Vi(()=>{s&&Xh(t(...s),i)&&e(null,...s)})}}),i}function _p(i=!1){const e=Ut,t=e.l.u;if(!t)return;let n=()=>Lx(e.s);if(i){let r=0,s={};const a=sc(()=>{let o=!1;const l=e.s;for(const c in l)l[c]!==s[c]&&(s[c]=l[c],o=!0);return o&&r++,r});n=()=>L(a)}t.b.length&&Mx(()=>{qh(e,n),Fl(t.b)}),wt(()=>{const r=br(()=>t.m.map(Cm));return()=>{for(const s of r)typeof s=="function"&&s()}}),t.a.length&&wt(()=>{qh(e,n),Fl(t.a)})}function qh(i,e){if(i.l.s)for(const t of i.l.s)L(t);e()}function sh(i,e,t){if(i==null)return e(void 0),t&&t(void 0),Hi;const n=br(()=>i.subscribe(e,t));return n.unsubscribe?()=>n.unsubscribe():n}const os=[];function Jx(i,e){return{subscribe:ot(i,e).subscribe}}function ot(i,e=Hi){let t=null;const n=new Set;function r(o){if(Ud(i,o)&&(i=o,t)){const l=!os.length;for(const c of n)c[1](),os.push(c,i);if(l){for(let c=0;c<os.length;c+=2)os[c][0](os[c+1]);os.length=0}}}function s(o){r(o(i))}function a(o,l=Hi){const c=[o,l];return n.add(c),n.size===1&&(t=e(r,s)||Hi),o(i),()=>{n.delete(c),n.size===0&&t&&(t(),t=null)}}return{set:r,update:s,subscribe:a}}function bp(i,e,t){const n=!Array.isArray(i),r=n?[i]:i;if(!r.every(Boolean))throw new Error("derived() expects stores as input, got a falsy value");const s=e.length<2;return Jx(t,(a,o)=>{let l=!1;const c=[];let u=0,f=Hi;const h=()=>{if(u)return;f();const x=e(n?c[0]:c,a,o);s?a(x):f=typeof x=="function"?x:Hi},m=r.map((x,v)=>sh(x,d=>{c[v]=d,u&=~(1<<v),l&&h()},()=>{u|=1<<v}));return l=!0,h(),function(){Fl(m),f(),l=!1}})}function Wt(i){let e;return sh(i,t=>e=t)(),e}let Eu=Symbol();function eg(i,e,t){const n=t[e]??(t[e]={store:null,source:ac(void 0),unsubscribe:Hi});if(n.store!==i&&!(Eu in t))if(n.unsubscribe(),n.store=i??null,i==null)n.source.v=void 0,n.unsubscribe=Hi;else{var r=!0;n.unsubscribe=sh(i,s=>{r?n.source.v=s:Se(n.source,s)}),r=!1}return i&&Eu in t?Wt(i):L(n.source)}function tg(){const i={};function e(){oc(()=>{for(var t in i)i[t].unsubscribe();Rd(i,Eu,{enumerable:!1,value:!0})})}return[i,e]}function ng(i,e,t,n){var r=n,s=!0,a=()=>(s&&(s=!1,r=br(n)),r),o;o=i[e],o===void 0&&n!==void 0&&(o=a());var l;return l=()=>{var c=i[e];return c===void 0?a():(s=!0,c)},l}function Ja(i){Ut===null&&Fd(),ja&&Ut.l!==null?rg(Ut).m.push(i):wt(()=>{const e=br(i);if(typeof e=="function")return e})}function ig(i){Ut===null&&Fd(),Ja(()=>()=>br(i))}function rg(i){var e=i.l;return e.u??(e.u={a:[],b:[],m:[]})}const sg="5";var Cd;typeof window<"u"&&((Cd=window.__svelte??(window.__svelte={})).v??(Cd.v=new Set)).add(sg);const ci=ot([]),gr=ot([]);async function ag(){try{const i=await fetch("./graph-data.json");if(i.ok){const e=await i.json();ci.set(e.nodes.map(t=>({...t,label:t.label.length>28?t.label.substring(0,26)+"..":t.label}))),gr.set(e.links.map(t=>({...t})))}}catch{console.warn("graph-data.json not found. Run: node scripts/build-graph-data.mjs")}}const Bt={core:{label:"Core Docs",color:"#00d4ff",glow:"rgba(0,212,255,0.5)"},decisions:{label:"ADR Decisions",color:"#a855f7",glow:"rgba(168,85,247,0.5)"},discussion:{label:"Discussions",color:"#f97316",glow:"rgba(249,115,22,0.5)"},"oms-order":{label:"OMS Order Docs",color:"#3b82f6",glow:"rgba(59,130,246,0.5)"},"oms-webapp":{label:"OMS Webapp",color:"#10b981",glow:"rgba(16,185,129,0.5)"},"oms-help":{label:"Webapp Help",color:"#f59e0b",glow:"rgba(245,158,11,0.5)"},meta:{label:"Meta / Config",color:"#6b7280",glow:"rgba(107,114,128,0.5)"}},lo=[54527,11032055,16347926,1096065,3900150,16096779,15680580,6514417],Ji=300,og=2400,$h=8,Yh=40,Dr=900,bc=650,sr=ot("explore"),Ni=ot(null),Wi=ot("dark"),kr=ot(.35),Su=ot(new Set(Object.keys(Bt))),Il=ot([]);Qm();var lg=et('<div id="scanline" class="svelte-1kaod2m"></div>');function cg(i){var e=lg();Ke(i,e)}var ug=et('<div class="corner corner-tl svelte-1enhsgr"></div> <div class="corner corner-tr svelte-1enhsgr"></div> <div class="corner corner-bl svelte-1enhsgr"></div> <div class="corner corner-br svelte-1enhsgr"></div>',1);function hg(i){var e=ug();Ke(i,e)}const jh=180,Kh=12,Zh=.18,Qh=120,Jh=100,e0=50,t0=200,fg=4,dg=3,n0=80,pg={density:1,speed:1,showNebula:!0,showGlitter:!0,showShootingStars:!0,showEmbers:!0,showSnowflakes:!0,showLightning:!0,showBgStars:!0,showBgMesh:!0};class mg{constructor(e){xe(this,"canvas");xe(this,"ctx");xe(this,"stars",[]);xe(this,"meshPts",[]);xe(this,"meshEdges",[]);xe(this,"_r");xe(this,"_g");xe(this,"_b");xe(this,"_theme","dark");xe(this,"_settings",{...pg});xe(this,"embers",[]);xe(this,"snowflakes",[]);xe(this,"nebulaClouds",[]);xe(this,"glitters",[]);xe(this,"shootingStars",[]);xe(this,"_shootingTimer",0);xe(this,"_frameCount",0);xe(this,"lightningBolts",[]);xe(this,"_lightningTimer",0);xe(this,"plasmaSparks",[]);xe(this,"animId",null);this.canvas=e;const t=e.getContext("2d");if(!t)throw new Error("ParticleBackground: could not get 2D canvas context");this.ctx=t;const[n,r,s]=this._readCSSColor();this._r=n,this._g=r,this._b=s,this._buildParticles(e.width,e.height),this._buildEmbers(e.width,e.height),this._buildSnowflakes(e.width,e.height),this._buildNebula(e.width,e.height),this._buildGlitter(e.width,e.height),this._buildPlasma(e.width,e.height)}_buildParticles(e,t){this.stars=Array.from({length:jh},(r,s)=>{const a=s<Kh;return{x:Math.random()*e,y:Math.random()*t,r:a?Math.random()*1.5+1:Math.random()*.8+.2,vx:(Math.random()-.5)*.06,vy:(Math.random()-.5)*.06,a:a?Math.random()*.4+.5:Math.random()*.25+.05,twinkle:Math.random()*Math.PI*2,twinkleSpeed:Math.random()*.02+.005,bright:a}}),this.meshPts=Array.from({length:60},()=>({x:Math.random()*e,y:Math.random()*t}));const n=Math.min(e,t)*Zh;this.meshEdges=[];for(let r=0;r<this.meshPts.length;r++)for(let s=r+1;s<this.meshPts.length;s++){const a=this.meshPts[r].x-this.meshPts[s].x,o=this.meshPts[r].y-this.meshPts[s].y;Math.sqrt(a*a+o*o)<n&&this.meshEdges.push([r,s])}}_buildEmbers(e,t){this.embers=Array.from({length:Qh},()=>this._spawnEmber(e,t))}_spawnEmber(e,t){return{x:Math.random()*e,y:t*(.6+Math.random()*.4),r:Math.random()*2.5+.5,vx:(Math.random()-.5)*.8,vy:-(Math.random()*1.5+.3),life:1,decay:Math.random()*.005+.002,hue:Math.random()*50}}_buildSnowflakes(e,t){this.snowflakes=Array.from({length:Jh},()=>this._spawnSnowflake(e,t))}_spawnSnowflake(e,t){return{x:Math.random()*e,y:Math.random()*-t*.3,r:Math.random()*2.5+.8,vx:(Math.random()-.5)*.3,vy:Math.random()*.8+.2,a:Math.random()*.5+.3,wobble:Math.random()*Math.PI*2,wobbleSpeed:Math.random()*.03+.01}}_buildNebula(e,t){this.nebulaClouds=Array.from({length:e0},()=>this._spawnNebula(e,t))}_spawnNebula(e,t){return{x:Math.random()*e,y:Math.random()*t,r:Math.random()*100+40,vx:(Math.random()-.5)*.12,vy:(Math.random()-.5)*.12,hue:220+Math.random()*120,a:Math.random()*.05+.015,pulse:Math.random()*Math.PI*2,pulseSpeed:Math.random()*.008+.003}}_buildGlitter(e,t){this.glitters=Array.from({length:t0},()=>this._spawnGlitter(e,t)),this.shootingStars=[],this._shootingTimer=60+Math.random()*120}_spawnGlitter(e,t){return{x:Math.random()*e,y:Math.random()*t,r:Math.random()*1.2+.3,hue:220+Math.random()*140,phase:Math.random()*Math.PI*2,speed:Math.random()*.15+.05,peakAlpha:Math.random()*.7+.3,onDuration:Math.random()*.3+.05}}_buildPlasma(e,t){this.plasmaSparks=Array.from({length:n0},()=>this._spawnPlasmaSpark(e,t)),this.lightningBolts=[],this._lightningTimer=30+Math.random()*60}_spawnPlasmaSpark(e,t){return{x:Math.random()*e,y:Math.random()*t,vx:(Math.random()-.5)*1.2,vy:(Math.random()-.5)*1.2,life:1,decay:Math.random()*.008+.003,r:Math.random()*2+.5,hue:200+Math.random()*40}}_spawnLightning(e,t){const n=Math.random()>.3;let r,s,a,o;if(n){switch(Math.floor(Math.random()*4)){case 0:r=Math.random()*e,s=0;break;case 1:r=e,s=Math.random()*t;break;case 2:r=Math.random()*e,s=t;break;default:r=0,s=Math.random()*t;break}a=r+(Math.random()-.5)*e*.6,o=s+(Math.random()-.5)*t*.6}else r=Math.random()*e,s=Math.random()*t,a=r+(Math.random()-.5)*300,o=s+(Math.random()-.5)*300;const l=12+Math.floor(Math.random()*10),c=[],u=[];for(let f=0;f<=l;f++){const h=f/l,m=r+(a-r)*h,x=s+(o-s)*h,v=(1-Math.abs(h-.5)*2)*40,d=m+(Math.random()-.5)*v,p=x+(Math.random()-.5)*v;if(c.push({x:d,y:p}),f>2&&f<l-2&&Math.random()<.3){const _=[{x:d,y:p}];let g=d,b=p;const w=3+Math.floor(Math.random()*4),S=Math.atan2(o-s,a-r)+(Math.random()-.5)*Math.PI*.8;for(let M=0;M<w;M++)g+=Math.cos(S)*(15+Math.random()*10)+(Math.random()-.5)*8,b+=Math.sin(S)*(15+Math.random()*10)+(Math.random()-.5)*8,_.push({x:g,y:b});u.push(_)}}return{x0:r,y0:s,x1:a,y1:o,life:1,decay:.03+Math.random()*.04,segments:c,branches:u,width:1.5+Math.random()*2,hue:200+Math.random()*40}}_spawnShootingStar(e,t){const n=Math.random()>.4,r=(Math.random()*.4+.3)*Math.PI,s=Math.random()*6+4;return{x:n?Math.random()*e:e+20,y:n?-20:Math.random()*t*.4,vx:-Math.cos(r)*s,vy:Math.sin(r)*s,len:Math.random()*80+60,life:1,decay:Math.random()*.008+.005,hue:240+Math.random()*80,r:Math.random()*1.5+1}}start(){if(this.animId!==null)return;const e=()=>{this._draw(),this.animId=requestAnimationFrame(e)};this.animId=requestAnimationFrame(e)}stop(){this.animId!==null&&(cancelAnimationFrame(this.animId),this.animId=null)}_draw(){const{ctx:e,canvas:t,_settings:n}=this,r=t.width,s=t.height;e.clearRect(0,0,r,s),this._theme==="fire"?(this._drawFireBackground(r,s),n.showEmbers&&this._drawEmbers(r,s)):this._theme==="winter"?(this._drawWinterBackground(r,s),n.showSnowflakes&&this._drawSnowflakes(r,s)):this._theme==="galaxy"?(this._frameCount++,this._drawGalaxyBackground(r,s),n.showNebula&&this._drawNebulaClouds(r,s),n.showGlitter&&this._drawGlitter(r,s),n.showShootingStars&&this._drawShootingStars(r,s)):this._theme==="electric"&&(this._frameCount++,this._drawElectricBackground(r,s),n.showLightning&&this._drawLightning(r,s),this._drawPlasmaSparks(r,s)),n.showBgMesh&&this._drawMesh(r,s),n.showBgStars&&this._drawStars(r,s)}_drawMesh(e,t){const{ctx:n}=this,r=`${this._r},${this._g},${this._b}`;n.strokeStyle=`rgba(${r},0.04)`,n.lineWidth=.5,this.meshEdges.forEach(([s,a])=>{n.beginPath(),n.moveTo(this.meshPts[s].x,this.meshPts[s].y),n.lineTo(this.meshPts[a].x,this.meshPts[a].y),n.stroke()})}_drawStars(e,t){const{ctx:n}=this,r=e,s=t,a=`${this._r},${this._g},${this._b}`,o=this._settings.speed;this.stars.forEach(l=>{l.x+=l.vx*o,l.y+=l.vy*o,l.x<0&&(l.x=r),l.x>r&&(l.x=0),l.y<0&&(l.y=s),l.y>s&&(l.y=0),l.twinkle+=l.twinkleSpeed*o;const c=l.bright?.7+.3*Math.sin(l.twinkle):1,u=l.a*c;if(l.bright){const f=n.createRadialGradient(l.x,l.y,0,l.x,l.y,l.r*4);f.addColorStop(0,`rgba(${a},${u})`),f.addColorStop(.3,`rgba(${a},${u*.3})`),f.addColorStop(1,`rgba(${a},0)`),n.beginPath(),n.arc(l.x,l.y,l.r*4,0,Math.PI*2),n.fillStyle=f,n.fill()}n.beginPath(),n.arc(l.x,l.y,l.r,0,Math.PI*2),n.fillStyle=`rgba(${a},${u})`,n.fill()})}_drawFireBackground(e,t){const{ctx:n}=this,r=n.createLinearGradient(0,t,0,t*.3);r.addColorStop(0,"rgba(255, 60, 0, 0.06)"),r.addColorStop(.4,"rgba(255, 120, 20, 0.02)"),r.addColorStop(1,"rgba(0, 0, 0, 0)"),n.fillStyle=r,n.fillRect(0,0,e,t)}_drawEmbers(e,t){const{ctx:n}=this,r=this._settings.speed;this.embers.forEach((s,a)=>{if(s.x+=s.vx*r,s.y+=s.vy*r,s.life-=s.decay*r,s.vx+=(Math.random()-.5)*.05,s.life<=0||s.y<-20||s.x<-20||s.x>e+20){this.embers[a]=this._spawnEmber(e,t);return}const o=s.life*.8,l=n.createRadialGradient(s.x,s.y,0,s.x,s.y,s.r*6),c=`hsl(${s.hue}, 100%, 55%)`;l.addColorStop(0,`hsla(${s.hue}, 100%, 65%, ${o*.6})`),l.addColorStop(.3,`hsla(${s.hue}, 100%, 50%, ${o*.2})`),l.addColorStop(1,"rgba(0,0,0,0)"),n.beginPath(),n.arc(s.x,s.y,s.r*6,0,Math.PI*2),n.fillStyle=l,n.fill(),n.beginPath(),n.arc(s.x,s.y,s.r,0,Math.PI*2),n.fillStyle=c.replace(")",`,${o})`).replace("hsl","hsla"),n.fill()})}_drawWinterBackground(e,t){const{ctx:n}=this,r=n.createLinearGradient(0,0,0,t*.6);r.addColorStop(0,"rgba(100, 180, 255, 0.04)"),r.addColorStop(.5,"rgba(140, 200, 255, 0.015)"),r.addColorStop(1,"rgba(0, 0, 0, 0)"),n.fillStyle=r,n.fillRect(0,0,e,t)}_drawSnowflakes(e,t){const{ctx:n}=this,r=this._settings.speed;this.snowflakes.forEach((s,a)=>{if(s.wobble+=s.wobbleSpeed*r,s.x+=(s.vx+Math.sin(s.wobble)*.4)*r,s.y+=s.vy*r,s.y>t+20||s.x<-30||s.x>e+30){this.snowflakes[a]=this._spawnSnowflake(e,t),this.snowflakes[a].y=-5;return}const o=s.a,l=n.createRadialGradient(s.x,s.y,0,s.x,s.y,s.r*3);l.addColorStop(0,`rgba(220, 240, 255, ${o*.7})`),l.addColorStop(.4,`rgba(180, 220, 255, ${o*.2})`),l.addColorStop(1,"rgba(180, 220, 255, 0)"),n.beginPath(),n.arc(s.x,s.y,s.r*3,0,Math.PI*2),n.fillStyle=l,n.fill(),n.save(),n.translate(s.x,s.y),n.strokeStyle=`rgba(220, 240, 255, ${o})`,n.lineWidth=.5;for(let c=0;c<6;c++){const u=c/6*Math.PI*2;n.beginPath(),n.moveTo(0,0),n.lineTo(Math.cos(u)*s.r*1.5,Math.sin(u)*s.r*1.5),n.stroke()}n.restore(),n.beginPath(),n.arc(s.x,s.y,s.r*.4,0,Math.PI*2),n.fillStyle=`rgba(240, 248, 255, ${o})`,n.fill()})}_drawGalaxyBackground(e,t){const{ctx:n}=this,r=e/2,s=t/2,a=Math.max(e,t)*.8,o=n.createRadialGradient(r,s,0,r,s,a);o.addColorStop(0,"rgba(80, 20, 140, 0.05)"),o.addColorStop(.3,"rgba(50, 10, 100, 0.035)"),o.addColorStop(.6,"rgba(20, 5, 60, 0.02)"),o.addColorStop(1,"rgba(0, 0, 0, 0)"),n.fillStyle=o,n.fillRect(0,0,e,t);const l=n.createRadialGradient(r*.6,s*1.3,0,r*.6,s*1.3,a*.4);l.addColorStop(0,"rgba(0, 200, 180, 0.025)"),l.addColorStop(.5,"rgba(0, 100, 140, 0.01)"),l.addColorStop(1,"rgba(0,0,0,0)"),n.fillStyle=l,n.fillRect(0,0,e,t);const c=n.createRadialGradient(r*1.4,s*.5,0,r*1.4,s*.5,a*.35);c.addColorStop(0,"rgba(220, 60, 180, 0.02)"),c.addColorStop(.5,"rgba(160, 30, 120, 0.008)"),c.addColorStop(1,"rgba(0,0,0,0)"),n.fillStyle=c,n.fillRect(0,0,e,t)}_drawNebulaClouds(e,t){const{ctx:n}=this,r=this._settings.speed;this.nebulaClouds.forEach(s=>{s.x+=s.vx*r,s.y+=s.vy*r,s.pulse+=s.pulseSpeed*r,s.x<-s.r&&(s.x=e+s.r),s.x>e+s.r&&(s.x=-s.r),s.y<-s.r&&(s.y=t+s.r),s.y>t+s.r&&(s.y=-s.r);const a=s.a*(.6+.4*Math.sin(s.pulse)),o=n.createRadialGradient(s.x,s.y,0,s.x,s.y,s.r*1.3);o.addColorStop(0,`hsla(${s.hue}, 60%, 45%, ${a*.5})`),o.addColorStop(.4,`hsla(${s.hue}, 50%, 30%, ${a*.2})`),o.addColorStop(1,"rgba(0,0,0,0)"),n.beginPath(),n.arc(s.x,s.y,s.r*1.3,0,Math.PI*2),n.fillStyle=o,n.fill();const l=n.createRadialGradient(s.x,s.y,0,s.x,s.y,s.r*.5);l.addColorStop(0,`hsla(${s.hue+20}, 80%, 65%, ${a*.8})`),l.addColorStop(.5,`hsla(${s.hue+10}, 70%, 50%, ${a*.3})`),l.addColorStop(1,"rgba(0,0,0,0)"),n.beginPath(),n.arc(s.x,s.y,s.r*.5,0,Math.PI*2),n.fillStyle=l,n.fill()})}_drawGlitter(e,t){const{ctx:n}=this,r=this._settings.speed;this.glitters.forEach(s=>{s.phase+=s.speed*r;const a=Math.sin(s.phase),o=1-s.onDuration*2;if(a<o)return;const l=(a-o)/(1-o),c=s.peakAlpha*l,u=n.createRadialGradient(s.x,s.y,0,s.x,s.y,s.r*5);u.addColorStop(0,`hsla(${s.hue}, 80%, 80%, ${c*.5})`),u.addColorStop(.3,`hsla(${s.hue}, 70%, 60%, ${c*.15})`),u.addColorStop(1,"rgba(0,0,0,0)"),n.beginPath(),n.arc(s.x,s.y,s.r*5,0,Math.PI*2),n.fillStyle=u,n.fill(),n.save(),n.translate(s.x,s.y),n.strokeStyle=`hsla(${s.hue}, 90%, 85%, ${c})`,n.lineWidth=.5;const f=s.r*3;n.beginPath(),n.moveTo(0,-f),n.lineTo(0,f),n.stroke(),n.beginPath(),n.moveTo(-f,0),n.lineTo(f,0),n.stroke();const h=f*.5;n.beginPath(),n.moveTo(-h,-h),n.lineTo(h,h),n.stroke(),n.beginPath(),n.moveTo(h,-h),n.lineTo(-h,h),n.stroke(),n.restore(),n.beginPath(),n.arc(s.x,s.y,s.r*.6,0,Math.PI*2),n.fillStyle=`hsla(${s.hue}, 100%, 95%, ${c})`,n.fill()})}_drawShootingStars(e,t){const{ctx:n}=this,r=this._settings.speed;this._shootingTimer-=r,this._shootingTimer<=0&&this.shootingStars.length<fg&&(this.shootingStars.push(this._spawnShootingStar(e,t)),this._shootingTimer=80+Math.random()*200);for(let s=this.shootingStars.length-1;s>=0;s--){const a=this.shootingStars[s];if(a.x+=a.vx*r,a.y+=a.vy*r,a.life-=a.decay*r,a.life<=0||a.x<-200||a.x>e+200||a.y>t+200){this.shootingStars.splice(s,1);continue}const o=a.life,l=Math.sqrt(a.vx*a.vx+a.vy*a.vy),c=a.x-a.vx/l*a.len,u=a.y-a.vy/l*a.len,f=n.createLinearGradient(c,u,a.x,a.y);f.addColorStop(0,`hsla(${a.hue}, 60%, 70%, 0)`),f.addColorStop(.5,`hsla(${a.hue}, 70%, 75%, ${o*.3})`),f.addColorStop(.85,`hsla(${a.hue+30}, 80%, 80%, ${o*.6})`),f.addColorStop(1,`hsla(0, 0%, 100%, ${o*.9})`),n.beginPath(),n.moveTo(c,u),n.lineTo(a.x,a.y),n.strokeStyle=f,n.lineWidth=a.r*1.5,n.lineCap="round",n.stroke(),n.beginPath(),n.moveTo(c+(a.x-c)*.4,u+(a.y-u)*.4),n.lineTo(a.x,a.y),n.strokeStyle=`hsla(0, 0%, 100%, ${o*.5})`,n.lineWidth=a.r*.6,n.stroke();const h=n.createRadialGradient(a.x,a.y,0,a.x,a.y,a.r*6);h.addColorStop(0,`hsla(0, 0%, 100%, ${o*.8})`),h.addColorStop(.2,`hsla(${a.hue+20}, 80%, 80%, ${o*.4})`),h.addColorStop(.5,`hsla(${a.hue}, 60%, 60%, ${o*.1})`),h.addColorStop(1,"rgba(0,0,0,0)"),n.beginPath(),n.arc(a.x,a.y,a.r*6,0,Math.PI*2),n.fillStyle=h,n.fill(),n.beginPath(),n.arc(a.x,a.y,a.r,0,Math.PI*2),n.fillStyle=`rgba(255,255,255,${o})`,n.fill()}n.lineCap="butt"}_drawElectricBackground(e,t){const{ctx:n}=this,r=e/2,s=t/2,a=Math.max(e,t)*.7,o=n.createRadialGradient(r,s,0,r,s,a);o.addColorStop(0,"rgba(20, 40, 100, 0.04)"),o.addColorStop(.4,"rgba(10, 20, 60, 0.025)"),o.addColorStop(1,"rgba(0, 0, 0, 0)"),n.fillStyle=o,n.fillRect(0,0,e,t);const l=Math.sin(this._frameCount*.03)*.5+.5,c=n.createRadialGradient(r,s,0,r,s,a*.5);c.addColorStop(0,`rgba(60, 140, 255, ${.02*l})`),c.addColorStop(.5,`rgba(30, 80, 200, ${.01*l})`),c.addColorStop(1,"rgba(0,0,0,0)"),n.fillStyle=c,n.fillRect(0,0,e,t)}_drawLightning(e,t){const{ctx:n}=this,r=this._settings.speed;this._lightningTimer-=r,this._lightningTimer<=0&&this.lightningBolts.length<dg&&(this.lightningBolts.push(this._spawnLightning(e,t)),this._lightningTimer=40+Math.random()*80),n.save(),n.globalCompositeOperation="lighter",n.lineCap="round",n.lineJoin="round";for(let s=this.lightningBolts.length-1;s>=0;s--){const a=this.lightningBolts[s];if(a.life-=a.decay*r,a.life<=0){this.lightningBolts.splice(s,1);continue}const l=a.life*(.5+.5*Math.sin(this._frameCount*.8+s*5));this._drawBoltPath(a.segments,a.width,a.hue,l);for(const c of a.branches)this._drawBoltPath(c,a.width*.5,a.hue+10,l*.6);for(const c of[a.segments[0],a.segments[a.segments.length-1]]){const u=n.createRadialGradient(c.x,c.y,0,c.x,c.y,30);u.addColorStop(0,`hsla(${a.hue}, 90%, 80%, ${l*.4})`),u.addColorStop(.4,`hsla(${a.hue}, 80%, 60%, ${l*.1})`),u.addColorStop(1,"rgba(0,0,0,0)"),n.beginPath(),n.arc(c.x,c.y,30,0,Math.PI*2),n.fillStyle=u,n.fill()}}n.lineCap="butt",n.lineJoin="miter",n.restore()}_drawBoltPath(e,t,n,r){const{ctx:s}=this;if(!(e.length<2)){s.beginPath(),s.moveTo(e[0].x,e[0].y);for(let a=1;a<e.length;a++)s.lineTo(e[a].x,e[a].y);s.strokeStyle=`hsla(${n}, 80%, 70%, ${r*.15})`,s.lineWidth=t*6,s.stroke(),s.beginPath(),s.moveTo(e[0].x,e[0].y);for(let a=1;a<e.length;a++)s.lineTo(e[a].x,e[a].y);s.strokeStyle=`hsla(${n}, 85%, 75%, ${r*.4})`,s.lineWidth=t*2.5,s.stroke(),s.beginPath(),s.moveTo(e[0].x,e[0].y);for(let a=1;a<e.length;a++)s.lineTo(e[a].x,e[a].y);s.strokeStyle=`hsla(0, 0%, 100%, ${r*.8})`,s.lineWidth=t*.8,s.stroke()}}_drawPlasmaSparks(e,t){const{ctx:n}=this,r=this._settings.speed;this.plasmaSparks.forEach((s,a)=>{if(s.x+=s.vx*r,s.y+=s.vy*r,s.life-=s.decay*r,s.vx+=(Math.random()-.5)*.1,s.vy+=(Math.random()-.5)*.1,s.life<=0||s.x<-20||s.x>e+20||s.y<-20||s.y>t+20){this.plasmaSparks[a]=this._spawnPlasmaSpark(e,t);return}const o=s.life*.6,l=n.createRadialGradient(s.x,s.y,0,s.x,s.y,s.r*5);l.addColorStop(0,`hsla(${s.hue}, 90%, 75%, ${o*.5})`),l.addColorStop(.3,`hsla(${s.hue}, 80%, 55%, ${o*.15})`),l.addColorStop(1,"rgba(0,0,0,0)"),n.beginPath(),n.arc(s.x,s.y,s.r*5,0,Math.PI*2),n.fillStyle=l,n.fill(),n.beginPath(),n.arc(s.x,s.y,s.r,0,Math.PI*2),n.fillStyle=`hsla(${s.hue}, 100%, 85%, ${o})`,n.fill()})}updateColor(e,t,n){if(e!==void 0&&t!==void 0&&n!==void 0)this._r=e,this._g=t,this._b=n;else{const[r,s,a]=this._readCSSColor();this._r=r,this._g=s,this._b=a}}setTheme(e){this._theme=e,this.updateColor()}updateSettings(e){const t=e.density!==void 0&&e.density!==this._settings.density;if(Object.assign(this._settings,e),t){const n=this.canvas.width,r=this.canvas.height;this._rebuildWithDensity(n,r)}}_rebuildWithDensity(e,t){const n=this._settings.density,r=Math.round(jh*n),s=Math.round(Kh*n);this.stars=Array.from({length:Math.max(r,1)},(m,x)=>{const v=x<s;return{x:Math.random()*e,y:Math.random()*t,r:v?Math.random()*1.5+1:Math.random()*.8+.2,vx:(Math.random()-.5)*.06,vy:(Math.random()-.5)*.06,a:v?Math.random()*.4+.5:Math.random()*.25+.05,twinkle:Math.random()*Math.PI*2,twinkleSpeed:Math.random()*.02+.005,bright:v}});const a=Math.round(60*n);this.meshPts=Array.from({length:Math.max(a,2)},()=>({x:Math.random()*e,y:Math.random()*t}));const o=Math.min(e,t)*Zh;this.meshEdges=[];for(let m=0;m<this.meshPts.length;m++)for(let x=m+1;x<this.meshPts.length;x++){const v=this.meshPts[m].x-this.meshPts[x].x,d=this.meshPts[m].y-this.meshPts[x].y;Math.sqrt(v*v+d*d)<o&&this.meshEdges.push([m,x])}const l=Math.round(Qh*n);this.embers=Array.from({length:Math.max(l,1)},()=>this._spawnEmber(e,t));const c=Math.round(Jh*n);this.snowflakes=Array.from({length:Math.max(c,1)},()=>this._spawnSnowflake(e,t));const u=Math.round(e0*n);this.nebulaClouds=Array.from({length:Math.max(u,1)},()=>this._spawnNebula(e,t));const f=Math.round(t0*n);this.glitters=Array.from({length:Math.max(f,1)},()=>this._spawnGlitter(e,t)),this.shootingStars=[];const h=Math.round(n0*n);this.plasmaSparks=Array.from({length:Math.max(h,1)},()=>this._spawnPlasmaSpark(e,t)),this.lightningBolts=[]}resize(e,t){this.canvas.width=e,this.canvas.height=t,this._buildParticles(e,t),this._buildEmbers(e,t),this._buildSnowflakes(e,t),this._buildNebula(e,t),this._buildGlitter(e,t),this._buildPlasma(e,t)}_readCSSColor(){const t=(getComputedStyle(document.documentElement).getPropertyValue("--particle-color").trim()||"0,212,255").split(",").map(n=>parseInt(n.trim(),10));return[t[0]??0,t[1]??212,t[2]??255]}dispose(){this.stop(),this.stars=[],this.meshPts=[],this.meshEdges=[],this.embers=[],this.snowflakes=[],this.nebulaClouds=[],this.glitters=[],this.shootingStars=[],this.plasmaSparks=[],this.lightningBolts=[]}}const kl=ot(1),Ul=ot(1),Ma=ot(!0),wa=ot(!0),Aa=ot(!0),Ta=ot(!0),Ca=ot(!0),Ra=ot(!0),Da=ot(!0),Pa=ot(!0),La=ot(!0),Fa=ot(!0),Is=ot(!0),za=ot(1),Ha=ot(1);var xg=et('<canvas id="particles" class="svelte-xse3o3"></canvas>');function gg(i,e){jt(e,!1);let t=ac(),n=null;Ja(()=>{Ps(t,L(t).width=window.innerWidth),Ps(t,L(t).height=window.innerHeight),n=new mg(L(t));const s=document.documentElement.dataset.theme||"dark";n.setTheme(s),n.start();const a=()=>{n==null||n.resize(window.innerWidth,window.innerHeight)};window.addEventListener("resize",a);const o=new MutationObserver(()=>{const c=document.documentElement.dataset.theme||"dark";n==null||n.setTheme(c)});o.observe(document.documentElement,{attributes:!0,attributeFilter:["data-theme"]});const l=[kl.subscribe(c=>n==null?void 0:n.updateSettings({density:c})),Ul.subscribe(c=>n==null?void 0:n.updateSettings({speed:c})),Ma.subscribe(c=>n==null?void 0:n.updateSettings({showNebula:c})),wa.subscribe(c=>n==null?void 0:n.updateSettings({showGlitter:c})),Aa.subscribe(c=>n==null?void 0:n.updateSettings({showShootingStars:c})),Ta.subscribe(c=>n==null?void 0:n.updateSettings({showEmbers:c})),Ca.subscribe(c=>n==null?void 0:n.updateSettings({showSnowflakes:c})),Ra.subscribe(c=>n==null?void 0:n.updateSettings({showLightning:c})),La.subscribe(c=>n==null?void 0:n.updateSettings({showBgStars:c})),Fa.subscribe(c=>n==null?void 0:n.updateSettings({showBgMesh:c}))];return()=>{n==null||n.dispose(),window.removeEventListener("resize",a),o.disconnect(),l.forEach(c=>c())}}),_p();var r=xg();Oa(r,s=>Se(t,s),()=>L(t)),Ke(i,r),Kt()}var vg=et('<canvas id="border-magic" class="svelte-czchbm"></canvas>');function _g(i,e){jt(e,!1);let t=ac(),n=null,r=null,s=0,a=!0,o=1,l=1,c="dark";function u(C,A){return Math.sin(C*1.3+A*.7)*.3+Math.sin(C*2.7-A*1.1)*.2+Math.sin(C*.5+A*2.3)*.25+Math.cos(C*1.8+A*1.5)*.25}const f=60;let h=[];function m(){h=[];for(let C=0;C<f;C++)h.push({edge:Math.floor(C/(f/4)),pos:C%(f/4)/(f/4),height:50+Math.random()*100,width:20+Math.random()*40,phase:Math.random()*Math.PI*2,speed:.8+Math.random()*1.5})}function x(C,A,R,N){if(!n)return;const $=100*N,he=[{x0:0,y0:0,x1:0,y1:$,fx:0,fy:0,fw:C,fh:$},{x0:0,y0:A,x1:0,y1:A-$,fx:0,fy:A-$,fw:C,fh:$},{x0:0,y0:0,x1:$,y1:0,fx:0,fy:0,fw:$,fh:A},{x0:C,y0:0,x1:C-$,y1:0,fx:C-$,fy:0,fw:$,fh:A}];for(const se of he){const V=n.createLinearGradient(se.x0,se.y0,se.x1,se.y1);V.addColorStop(0,`rgba(200,30,0,${.35*N})`),V.addColorStop(.3,`rgba(255,80,0,${.2*N})`),V.addColorStop(.6,`rgba(255,60,0,${.08*N})`),V.addColorStop(1,"rgba(0,0,0,0)"),n.fillStyle=V,n.fillRect(se.fx,se.fy,se.fw,se.fh)}n.save(),n.globalCompositeOperation="lighter";for(const se of h){const V=R*se.speed+se.phase,ie=.6+.4*Math.sin(V*2.3+Math.cos(V*1.1)*2),O=se.height*ie*N,le=se.width*(.8+.2*Math.sin(V*3.1)),ce=le*.3*Math.sin(V*2.7);let ve,_e,He,Ie;switch(se.edge){case 0:ve=se.pos*C,_e=0,He=ce,Ie=O;break;case 1:ve=C,_e=se.pos*A,He=-O,Ie=ce;break;case 2:ve=se.pos*C,_e=A,He=ce,Ie=-O;break;case 3:ve=0,_e=se.pos*A,He=O,Ie=ce;break}n.beginPath();const B=ve+He,T=_e+Ie;if(se.edge===0||se.edge===2){const pe=se.edge===0?1:-1;n.moveTo(ve-le*.6,_e),n.quadraticCurveTo(ve-le*.2,_e+pe*O*.6,B,T),n.quadraticCurveTo(ve+le*.2,_e+pe*O*.6,ve+le*.6,_e)}else{const pe=se.edge===3?1:-1;n.moveTo(ve,_e-le*.6),n.quadraticCurveTo(ve+pe*O*.6,_e-le*.2,B,T),n.quadraticCurveTo(ve+pe*O*.6,_e+le*.2,ve,_e+le*.6)}n.closePath();const K=n.createRadialGradient(ve,_e,0,ve,_e,O);K.addColorStop(0,`rgba(255,220,80,${.5*N})`),K.addColorStop(.2,`rgba(255,160,20,${.45*N})`),K.addColorStop(.5,`rgba(255,60,0,${.35*N})`),K.addColorStop(.8,`rgba(200,20,0,${.2*N})`),K.addColorStop(1,"rgba(100,0,0,0)"),n.fillStyle=K,n.fill(),n.beginPath();const de=O*.35,fe=le*.3;if(se.edge===0||se.edge===2){const pe=se.edge===0?1:-1;n.moveTo(ve-fe,_e),n.quadraticCurveTo(ve,_e+pe*de,ve+fe,_e)}else{const pe=se.edge===3?1:-1;n.moveTo(ve,_e-fe),n.quadraticCurveTo(ve+pe*de,_e,ve,_e+fe)}n.closePath(),n.fillStyle=`rgba(255,255,200,${.4*ie*N})`,n.fill()}n.lineWidth=4*N,n.shadowBlur=15*N,n.shadowColor="rgba(255,100,0,0.6)",n.strokeStyle=`rgba(255,180,50,${.6*N})`,n.strokeRect(2,2,C-4,A-4),n.shadowBlur=0;const J=[[0,0],[C,0],[0,A],[C,A]];for(const[se,V]of J){const ie=.6+.4*Math.sin(R*1.3+se*.01),O=120*N*ie,le=n.createRadialGradient(se,V,0,se,V,O);le.addColorStop(0,`rgba(255,220,100,${.4*N})`),le.addColorStop(.2,`rgba(255,120,0,${.3*N})`),le.addColorStop(.5,`rgba(200,40,0,${.15*N})`),le.addColorStop(1,"rgba(0,0,0,0)"),n.beginPath(),n.arc(se,V,O,0,Math.PI*2),n.fillStyle=le,n.fill()}n.restore()}const v=40;let d=[];const p=80;let _=[];function g(C,A){d=[];for(let R=0;R<v;R++){let N,$;const he=Math.floor(Math.random()*4),J=120;switch(he){case 0:N=Math.random()*C,$=Math.random()*J;break;case 1:N=C-Math.random()*J,$=Math.random()*A;break;case 2:N=Math.random()*C,$=A-Math.random()*J;break;case 3:N=Math.random()*J,$=Math.random()*A;break}d.push({x:N,y:$,rx:60+Math.random()*120,ry:50+Math.random()*100,phase:Math.random()*Math.PI*2,speed:.2+Math.random()*.5,hue:Math.floor(Math.random()*3)})}_=[];for(let R=0;R<p;R++){let N,$;const he=Math.floor(Math.random()*4),J=Math.random()*140;switch(he){case 0:N=Math.random()*C,$=J;break;case 1:N=C-J,$=Math.random()*A;break;case 2:N=Math.random()*C,$=A-J;break;case 3:N=J,$=Math.random()*A;break}_.push({x:N,y:$,size:1+Math.random()*3,phase:Math.random()*Math.PI*2,speed:1+Math.random()*3})}}function b(C,A,R,N){if(!n)return;const $=[[120,40,180],[180,80,220],[200,120,255],[160,60,200],[220,100,255],[80,40,160]],he=[{x:0,y:0},{x:C,y:0},{x:0,y:A},{x:C,y:A}];for(let V=0;V<he.length;V++){const ie=he[V],O=.7+.3*Math.sin(R*.4+V*1.5),le=(180+60*O)*N,ce=n.createRadialGradient(ie.x,ie.y,0,ie.x,ie.y,le);ce.addColorStop(0,`rgba(160,60,220,${.35*N*O})`),ce.addColorStop(.25,`rgba(120,40,180,${.25*N})`),ce.addColorStop(.5,`rgba(80,20,140,${.12*N})`),ce.addColorStop(1,"rgba(0,0,0,0)"),n.fillStyle=ce,n.fillRect(0,0,C,A)}const J=130*N,se=[{x0:0,y0:0,x1:0,y1:J,fx:0,fy:0,fw:C,fh:J},{x0:0,y0:A,x1:0,y1:A-J,fx:0,fy:A-J,fw:C,fh:J},{x0:0,y0:0,x1:J,y1:0,fx:0,fy:0,fw:J,fh:A},{x0:C,y0:0,x1:C-J,y1:0,fx:C-J,fy:0,fw:J,fh:A}];for(let V=0;V<se.length;V++){const ie=se[V],O=n.createLinearGradient(ie.x0,ie.y0,ie.x1,ie.y1),le=.7+.3*Math.sin(R*.3+V*2);O.addColorStop(0,`rgba(100,30,160,${.25*N*le})`),O.addColorStop(.4,`rgba(140,60,200,${.12*N})`),O.addColorStop(1,"rgba(0,0,0,0)"),n.fillStyle=O,n.fillRect(ie.fx,ie.fy,ie.fw,ie.fh)}n.save(),n.globalCompositeOperation="lighter";for(const V of d){const ie=R*V.speed+V.phase,O=.6+.4*Math.sin(ie),le=V.x+Math.sin(ie*.7)*8,ce=V.y+Math.cos(ie*.5)*6,ve=V.rx*O*N,_e=V.ry*O*N,He=$[V.hue%$.length],Ie=.12*N*O,B=n.createRadialGradient(le,ce,0,le,ce,Math.max(ve,_e));B.addColorStop(0,`rgba(${He[0]+40},${He[1]+30},${He[2]},${Ie*1.5})`),B.addColorStop(.3,`rgba(${He[0]},${He[1]},${He[2]},${Ie})`),B.addColorStop(.6,`rgba(${He[0]-30},${He[1]-20},${He[2]-30},${Ie*.4})`),B.addColorStop(1,"rgba(0,0,0,0)"),n.beginPath(),n.ellipse(le,ce,ve,_e,ie*.1,0,Math.PI*2),n.fillStyle=B,n.fill()}for(const V of _){const ie=R*V.speed+V.phase,O=.3+.7*Math.pow(Math.sin(ie)*.5+.5,2),le=V.size*O*N;n.fillStyle=`rgba(255,255,255,${.7*O*N})`,n.beginPath(),n.moveTo(V.x,V.y-le*2),n.lineTo(V.x+le*.3,V.y),n.lineTo(V.x,V.y+le*2),n.lineTo(V.x-le*.3,V.y),n.closePath(),n.fill(),n.beginPath(),n.moveTo(V.x-le*2,V.y),n.lineTo(V.x,V.y+le*.3),n.lineTo(V.x+le*2,V.y),n.lineTo(V.x,V.y-le*.3),n.closePath(),n.fill(),n.beginPath(),n.arc(V.x,V.y,le*.5,0,Math.PI*2),n.fillStyle=`rgba(255,240,255,${.9*O*N})`,n.fill()}n.restore()}const w=50;let S=[];function M(C,A){S=[];for(let R=0;R<w;R++){let N,$;const he=Math.floor(Math.random()*4),J=Math.random()*130;switch(he){case 0:N=Math.random()*C,$=J;break;case 1:N=C-J,$=Math.random()*A;break;case 2:N=Math.random()*C,$=A-J;break;case 3:N=J,$=Math.random()*A;break}S.push({x:N,y:$,size:10+Math.random()*35,rotation:Math.random()*Math.PI,branches:Math.random()>.5?6:8,alpha:.15+Math.random()*.3,phase:Math.random()*Math.PI*2,speed:.3+Math.random()*.6})}}function I(C,A,R,N,$,he){if(n){n.save(),n.translate(C,A),n.rotate($),n.strokeStyle=`rgba(200,220,240,${he})`,n.lineWidth=1,n.lineCap="round";for(let J=0;J<N;J++){const se=J/N*Math.PI*2;n.save(),n.rotate(se),n.beginPath(),n.moveTo(0,0),n.lineTo(R,0),n.stroke();const V=R*.4;for(let ie=1;ie<=2;ie++){const O=R*(ie*.3);n.beginPath(),n.moveTo(O,0),n.lineTo(O+V*.5,-V*.5),n.stroke(),n.beginPath(),n.moveTo(O,0),n.lineTo(O+V*.5,V*.5),n.stroke()}n.restore()}n.beginPath(),n.arc(0,0,2,0,Math.PI*2),n.fillStyle=`rgba(220,235,255,${he*.8})`,n.fill(),n.restore()}}function E(C,A,R,N){if(!n)return;const $=110*N,he=[{x0:0,y0:0,x1:0,y1:$,fx:0,fy:0,fw:C,fh:$},{x0:0,y0:A,x1:0,y1:A-$,fx:0,fy:A-$,fw:C,fh:$},{x0:0,y0:0,x1:$,y1:0,fx:0,fy:0,fw:$,fh:A},{x0:C,y0:0,x1:C-$,y1:0,fx:C-$,fy:0,fw:$,fh:A}];for(const se of he){const V=n.createLinearGradient(se.x0,se.y0,se.x1,se.y1);V.addColorStop(0,`rgba(200,220,240,${.2*N})`),V.addColorStop(.3,`rgba(180,210,235,${.1*N})`),V.addColorStop(.7,`rgba(160,200,230,${.03*N})`),V.addColorStop(1,"rgba(0,0,0,0)"),n.fillStyle=V,n.fillRect(se.fx,se.fy,se.fw,se.fh)}const J=[[0,0],[C,0],[0,A],[C,A]];for(let se=0;se<J.length;se++){const[V,ie]=J[se],O=.7+.3*Math.sin(R*.3+se*1.8),le=160*N*O,ce=n.createRadialGradient(V,ie,0,V,ie,le);ce.addColorStop(0,`rgba(210,230,250,${.2*N*O})`),ce.addColorStop(.3,`rgba(190,215,240,${.12*N})`),ce.addColorStop(.6,`rgba(170,200,235,${.05*N})`),ce.addColorStop(1,"rgba(0,0,0,0)"),n.fillStyle=ce,n.fillRect(0,0,C,A)}for(const se of S){const V=R*se.speed+se.phase,ie=.5+.5*Math.sin(V),O=se.rotation+R*.05,le=se.alpha*(.5+.5*ie)*N;I(se.x,se.y,se.size*N,se.branches,O,le)}for(let se=0;se<60;se++){const V=se*73.13,ie=Math.floor(V%4),O=V*.618%1,le=(R*.2+V*.003)%1,ce=50*le*N,ve=(1-le)*.35*N,_e=(1-le*.5)*2*N;let He,Ie;switch(ie){case 0:He=O*C,Ie=ce;break;case 1:He=C-ce,Ie=O*A;break;case 2:He=O*C,Ie=A-ce;break;case 3:He=ce,Ie=O*A;break}n.beginPath(),n.arc(He,Ie,_e,0,Math.PI*2),n.fillStyle=`rgba(220,240,255,${ve})`,n.fill()}}function y(C,A,R,N){if(!n)return;const $=70*N,he=[{x0:0,y0:0,x1:0,y1:$,fx:0,fy:0,fw:C,fh:$},{x0:0,y0:A,x1:0,y1:A-$,fx:0,fy:A-$,fw:C,fh:$},{x0:0,y0:0,x1:$,y1:0,fx:0,fy:0,fw:$,fh:A},{x0:C,y0:0,x1:C-$,y1:0,fx:C-$,fy:0,fw:$,fh:A}];for(const V of he){const ie=n.createLinearGradient(V.x0,V.y0,V.x1,V.y1);ie.addColorStop(0,`rgba(0,180,230,${.15*N})`),ie.addColorStop(.4,`rgba(0,120,180,${.06*N})`),ie.addColorStop(1,"rgba(0,0,0,0)"),n.fillStyle=ie,n.fillRect(V.fx,V.fy,V.fw,V.fh)}n.save(),n.globalCompositeOperation="lighter",n.lineWidth=2*N;const J=100;for(let V=0;V<J;V++){const ie=V/J,O=u(ie*6+R*1.5,0)*.5+.5;n.beginPath(),n.moveTo(ie*C,0),n.lineTo((V+1)/J*C,0),n.strokeStyle=`rgba(0,212,255,${(.15+.35*O)*N})`,n.stroke()}for(let V=0;V<J;V++){const ie=V/J,O=u(ie*6+R*1.5,3)*.5+.5;n.beginPath(),n.moveTo(ie*C,A),n.lineTo((V+1)/J*C,A),n.strokeStyle=`rgba(0,212,255,${(.15+.35*O)*N})`,n.stroke()}for(let V=0;V<J;V++){const ie=V/J,O=u(ie*6+R*1.5,6)*.5+.5;n.beginPath(),n.moveTo(0,ie*A),n.lineTo(0,(V+1)/J*A),n.strokeStyle=`rgba(0,212,255,${(.15+.35*O)*N})`,n.stroke()}for(let V=0;V<J;V++){const ie=V/J,O=u(ie*6+R*1.5,9)*.5+.5;n.beginPath(),n.moveTo(C,ie*A),n.lineTo(C,(V+1)/J*A),n.strokeStyle=`rgba(0,212,255,${(.15+.35*O)*N})`,n.stroke()}for(let V=0;V<12;V++){const ie=V*.813,O=(R*(.15+ie*.1)+ie*7)%4;let le,ce;const ve=O%4;ve<1?(le=ve*C,ce=0):ve<2?(le=C,ce=(ve-1)*A):ve<3?(le=(1-(ve-2))*C,ce=A):(le=0,ce=(1-(ve-3))*A);const _e=n.createRadialGradient(le,ce,0,le,ce,20*N);_e.addColorStop(0,`rgba(180,240,255,${.5*N})`),_e.addColorStop(.3,`rgba(0,200,255,${.25*N})`),_e.addColorStop(1,"rgba(0,0,0,0)"),n.beginPath(),n.arc(le,ce,20*N,0,Math.PI*2),n.fillStyle=_e,n.fill()}const se=[[0,0],[C,0],[0,A],[C,A]];for(let V=0;V<se.length;V++){const[ie,O]=se[V],le=.6+.4*Math.sin(R*.6+V*1.5),ce=80*N,ve=n.createRadialGradient(ie,O,0,ie,O,ce);ve.addColorStop(0,`rgba(0,220,255,${.2*N*le})`),ve.addColorStop(.4,`rgba(0,140,200,${.1*N})`),ve.addColorStop(1,"rgba(0,0,0,0)"),n.beginPath(),n.arc(ie,O,ce,0,Math.PI*2),n.fillStyle=ve,n.fill()}n.restore()}function P(C,A,R,N){if(!n)return;const $=80*N,he=[{x0:0,y0:0,x1:0,y1:$,fx:0,fy:0,fw:C,fh:$},{x0:0,y0:A,x1:0,y1:A-$,fx:0,fy:A-$,fw:C,fh:$},{x0:0,y0:0,x1:$,y1:0,fx:0,fy:0,fw:$,fh:A},{x0:C,y0:0,x1:C-$,y1:0,fx:C-$,fy:0,fw:$,fh:A}];for(const se of he){const V=n.createLinearGradient(se.x0,se.y0,se.x1,se.y1);V.addColorStop(0,`rgba(60,100,200,${.1*N})`),V.addColorStop(.5,`rgba(80,120,210,${.04*N})`),V.addColorStop(1,"rgba(0,0,0,0)"),n.fillStyle=V,n.fillRect(se.fx,se.fy,se.fw,se.fh)}n.strokeStyle=`rgba(50,80,160,${.12*N})`,n.lineWidth=1.5*N,n.strokeRect(3,3,C-6,A-6);const J=[[0,0],[C,0],[0,A],[C,A]];for(const[se,V]of J){const ie=.7+.3*Math.sin(R*.5+se*.01),O=50*N,le=n.createRadialGradient(se,V,0,se,V,O);le.addColorStop(0,`rgba(80,120,200,${.1*N*ie})`),le.addColorStop(.5,`rgba(60,100,180,${.04*N})`),le.addColorStop(1,"rgba(0,0,0,0)"),n.beginPath(),n.arc(se,V,O,0,Math.PI*2),n.fillStyle=le,n.fill()}}const U=6;let G=[],F=0;function z(C,A,R,N){switch(C){case 0:return{x:A*R,y:0};case 1:return{x:R,y:A*N};case 2:return{x:(1-A)*R,y:N};default:return{x:0,y:(1-A)*N}}}function q(C,A){const R=Math.floor(Math.random()*4),N=Math.random(),$=N+(Math.random()-.5)*.4,he=z(R,Math.min(N,$),C,A),J=z(R,Math.max(N,$),C,A);let se=0,V=0;switch(R){case 0:V=1;break;case 1:se=-1;break;case 2:V=-1;break;case 3:se=1;break}const ie=8+Math.floor(Math.random()*6),O=[];for(let le=0;le<=ie;le++){const ce=le/ie,ve=he.x+(J.x-he.x)*ce,_e=he.y+(J.y-he.y)*ce,He=Math.sin(ce*Math.PI)*(20+Math.random()*40),Ie=(Math.random()-.5)*15;O.push({x:ve+se*He+(V!==0?Ie:0),y:_e+V*He+(se!==0?Ie:0)})}return{edge:R,pos0:N,pos1:$,life:1,decay:.04+Math.random()*.06,segments:O,width:1+Math.random()*2}}function ee(C,A,R,N){if(!n)return;const $=60*N,he=[{x0:0,y0:0,x1:0,y1:$,fx:0,fy:0,fw:C,fh:$},{x0:0,y0:A,x1:0,y1:A-$,fx:0,fy:A-$,fw:C,fh:$},{x0:0,y0:0,x1:$,y1:0,fx:0,fy:0,fw:$,fh:A},{x0:C,y0:0,x1:C-$,y1:0,fx:C-$,fy:0,fw:$,fh:A}];for(const V of he){const ie=n.createLinearGradient(V.x0,V.y0,V.x1,V.y1),O=.6+.4*Math.sin(R*1.5);ie.addColorStop(0,`rgba(40,100,255,${.15*N*O})`),ie.addColorStop(.3,`rgba(20,60,200,${.06*N})`),ie.addColorStop(1,"rgba(0,0,0,0)"),n.fillStyle=ie,n.fillRect(V.fx,V.fy,V.fw,V.fh)}F-=l,F<=0&&G.length<U&&(G.push(q(C,A)),F=5+Math.random()*15),n.save(),n.globalCompositeOperation="lighter",n.lineCap="round",n.lineJoin="round";for(let V=G.length-1;V>=0;V--){const ie=G[V];if(ie.life-=ie.decay*l,ie.life<=0){G.splice(V,1);continue}const O=ie.life*(.4+.6*Math.sin(s*1.2+V*4));n.beginPath(),n.moveTo(ie.segments[0].x,ie.segments[0].y);for(let le=1;le<ie.segments.length;le++)n.lineTo(ie.segments[le].x,ie.segments[le].y);n.strokeStyle=`rgba(60,140,255,${O*.12*N})`,n.lineWidth=ie.width*8,n.stroke(),n.beginPath(),n.moveTo(ie.segments[0].x,ie.segments[0].y);for(let le=1;le<ie.segments.length;le++)n.lineTo(ie.segments[le].x,ie.segments[le].y);n.strokeStyle=`rgba(100,180,255,${O*.35*N})`,n.lineWidth=ie.width*3,n.stroke(),n.beginPath(),n.moveTo(ie.segments[0].x,ie.segments[0].y);for(let le=1;le<ie.segments.length;le++)n.lineTo(ie.segments[le].x,ie.segments[le].y);n.strokeStyle=`rgba(200,230,255,${O*.7*N})`,n.lineWidth=ie.width,n.stroke()}n.lineCap="butt",n.lineJoin="miter";const J=.3+.7*Math.abs(Math.sin(R*2));n.strokeStyle=`rgba(60,140,255,${.2*J*N})`,n.lineWidth=2*N,n.strokeRect(1,1,C-2,A-2);const se=[[0,0],[C,0],[0,A],[C,A]];for(let V=0;V<se.length;V++){const[ie,O]=se[V],le=.5+.5*Math.sin(R*1.8+V*2.3),ce=70*N*le,ve=n.createRadialGradient(ie,O,0,ie,O,ce);ve.addColorStop(0,`rgba(150,200,255,${.25*N*le})`),ve.addColorStop(.3,`rgba(60,140,255,${.12*N})`),ve.addColorStop(.6,`rgba(30,80,200,${.04*N})`),ve.addColorStop(1,"rgba(0,0,0,0)"),n.beginPath(),n.arc(ie,O,ce,0,Math.PI*2),n.fillStyle=ve,n.fill()}n.restore()}let Z=0,Q=0;function j(){if(!n||!a){r=requestAnimationFrame(j);return}const C=L(t).width,A=L(t).height;(C!==Z||A!==Q)&&(Z=C,Q=A,g(C,A),M(C,A)),n.clearRect(0,0,C,A),s++;const R=s*.02*l,N=o;switch(c){case"fire":x(C,A,R,N);break;case"galaxy":b(C,A,R,N);break;case"winter":E(C,A,R,N);break;case"dark":y(C,A,R,N);break;case"light":P(C,A,R,N);break;case"electric":ee(C,A,R,N);break}r=requestAnimationFrame(j)}Ja(()=>{Ps(t,L(t).width=window.innerWidth),Ps(t,L(t).height=window.innerHeight),n=L(t).getContext("2d"),m(),g(L(t).width,L(t).height),M(L(t).width,L(t).height),a=Wt(Is),o=Wt(za),l=Wt(Ha),c=Wt(Wi),r=requestAnimationFrame(j);const C=()=>{Ps(t,L(t).width=window.innerWidth),Ps(t,L(t).height=window.innerHeight)};window.addEventListener("resize",C);const A=[Is.subscribe(R=>{a=R}),za.subscribe(R=>{o=R}),Ha.subscribe(R=>{l=R}),Wi.subscribe(R=>{c=R})];return()=>{r!==null&&cancelAnimationFrame(r),window.removeEventListener("resize",C),A.forEach(R=>R())}}),_p();var W=vg();Oa(W,C=>Se(t,C),()=>L(t)),Ke(i,W),Kt()}var bg=et('<div id="top-banner" class="svelte-1qy030s"><h1 class="svelte-1qy030s">KNOWLEDGE GRAPH — GIT-CENTRAL</h1> <div class="subtitle svelte-1qy030s"><span id="stats-inline"> </span></div></div>');function yg(i,e){jt(e,!0);let t=Le(Lt([])),n=Le(Lt([]));wt(()=>{const c=ci.subscribe(f=>{Se(t,f,!0)}),u=gr.subscribe(f=>{Se(n,f,!0)});return()=>{c(),u()}});let r=Je(()=>L(t).length>0?`${L(t).length} DOCUMENTS • ${L(n).length} CONNECTIONS • AUTO-GENERATED`:"");var s=bg(),a=ae(ue(s),2),o=ue(a),l=ue(o);St(()=>pt(l,L(r))),Ke(i,s),Kt()}var Eg=et('<div id="mode-bar"> </div>');function Sg(i,e){jt(e,!0);let t=Le("explore"),n=Le(Lt([]));wt(()=>sr.subscribe(u=>{Se(t,u,!0)})),wt(()=>Il.subscribe(u=>{Se(n,u,!0)}));let r=Je(()=>()=>L(t)==="path"?L(n).length===0?"PATH MODE — Click 2 nodes":L(n).length===1?"PATH MODE — Click END node":"PATH MODE — Click 2 nodes":L(t)==="impact"?"IMPACT MODE — Click a node":""),s=Je(()=>L(r)()!=="");var a=Eg();let o;var l=ue(a);St(c=>{o=je(a,1,"svelte-snkwbv",null,o,{show:L(s)}),pt(l,c)},[()=>L(r)()]),Ke(i,a),Kt()}var Mg=et('<option class="svelte-w14g3o"> </option>'),wg=et('<div id="top-controls" class="svelte-w14g3o"><select class="ctrl-select svelte-w14g3o" id="layout-select"><option selected="" class="svelte-w14g3o">Globe 3D</option></select> <div class="glow-ctrl svelte-w14g3o"><span class="glow-label svelte-w14g3o" id="glow-label"> </span> <input type="range" class="glow-slider svelte-w14g3o" id="glow-slider" min="0" max="100" title="0 = Flat, 100 = Full Bloom"/></div> <select class="ctrl-select theme-select svelte-w14g3o" id="theme-select" title="Choose theme"></select></div>');function Ag(i,e){jt(e,!0);let t=Le("dark"),n=Le(.35);wt(()=>Wi.subscribe(g=>{Se(t,g,!0)})),wt(()=>kr.subscribe(g=>{Se(n,g,!0)})),wt(()=>{document.documentElement.dataset.theme=L(t)});const r=[{value:"dark",label:"☽ Dark"},{value:"light",label:"☀ Light"},{value:"fire",label:"🔥 Fire"},{value:"winter",label:"❄ Winter"},{value:"galaxy",label:"🌌 Galaxy"},{value:"electric",label:"⚡ Electric"}];let s=Je(()=>()=>L(n)===0?"FLAT":L(n)<.3?"LOW":L(n)<.7?"MID":"GLOW"),a=Je(()=>Math.round(L(n)*100));function o(_){const g=_.target.value;Wi.set(g)}function l(_){const g=parseInt(_.target.value,10);kr.set(g/100)}var c=wg(),u=ue(c),f=ue(u);f.value=f.__value="globe";var h=ae(u,2),m=ue(h),x=ue(m),v=ae(m,2),d=ae(h,2);Js(d,21,()=>r,Qs,(_,g)=>{var b=Mg(),w=ue(b),S={};St(()=>{Zx(b,L(g).value===L(t)),pt(w,L(g).label),S!==(S=L(g).value)&&(b.value=(b.__value=L(g).value)??"")}),Ke(_,b)});var p;$x(d),St(_=>{pt(x,_),ii(v,L(a)),p!==(p=L(t))&&(d.value=(d.__value=L(t))??"",gp(d,L(t)))},[()=>L(s)()]),De("input",v,l),De("change",d,o),Ke(i,c),Kt()}hi(["input","change"]);var Tg=et('<div id="toolbar" class="svelte-6x4q6i"><button title="Find shortest path between 2 nodes">Path</button> <button title="Show impact of selected node">Impact</button> <button class="tool-btn svelte-6x4q6i" title="Export graph data as JSON">Export</button> <button class="tool-btn svelte-6x4q6i" title="Reset view">Reset</button></div>');function Cg(i,e){jt(e,!0);let t=Le("explore"),n=Le(Lt([])),r=Le(Lt([]));wt(()=>sr.subscribe(b=>{Se(t,b,!0)})),wt(()=>{const g=ci.subscribe(w=>{Se(n,w,!0)}),b=gr.subscribe(w=>{Se(r,w,!0)});return()=>{g(),b()}});let s=Je(()=>L(t)==="path"),a=Je(()=>L(t)==="impact");function o(){L(t)==="path"?f():(f(),sr.set("path"),Il.set([]))}function l(){L(t)==="impact"?f():(f(),sr.set("impact"))}function c(){const g={nodes:L(n).map(S=>({id:S.id,file:S.file,label:S.label,cat:S.cat,refs:S.refs})),links:L(r).map(S=>({source:typeof S.source=="string"?S.source:S.source.id,target:typeof S.target=="string"?S.target:S.target.id,label:S.label}))},b=new Blob([JSON.stringify(g,null,2)],{type:"application/json"}),w=document.createElement("a");w.href=URL.createObjectURL(b),w.download="knowledge-graph-export.json",w.click()}function u(){f()}function f(){sr.set("explore"),Il.set([]),Ni.set(null)}var h=Tg(),m=ue(h);let x;var v=ae(m,2);let d;var p=ae(v,2),_=ae(p,2);St(()=>{x=je(m,1,"tool-btn svelte-6x4q6i",null,x,{active:L(s)}),d=je(v,1,"tool-btn svelte-6x4q6i",null,d,{active:L(a)})}),De("click",m,o),De("click",v,l),De("click",p,c),De("click",_,u),Ke(i,h),Kt()}hi(["click"]);const Ga=ot(!0),Nl=ot(!0),Ol=ot(!0),zl=ot(!0),Hl=ot(!0),ea=ot(!0),Gl=ot(.6),Vl=ot(.35),Mu=ot(55),co=ot(null);var Rg=et(`<div id="wasd-popup-overlay" role="dialog" aria-modal="true" aria-label="WASD Rotation Controls" tabindex="-1"><div id="wasd-popup" class="svelte-1788mbx"><div id="wasd-popup-header" class="svelte-1788mbx"><span class="popup-title svelte-1788mbx">WASD Rotation Controls</span> <button id="wasd-popup-close" class="svelte-1788mbx">ESC Close</button></div> <div id="wasd-popup-body" class="svelte-1788mbx"><div class="wasd-visual svelte-1788mbx"><div><div class="key-row svelte-1788mbx" style="justify-content:center"><div id="vk-w">W</div></div> <div class="key-row svelte-1788mbx"><div id="vk-a">A</div> <div id="vk-s">S</div> <div id="vk-d">D</div></div></div> <div style="margin-left:16px"><div class="key-row svelte-1788mbx" style="margin-bottom:4px"><div id="vk-q">Q</div></div> <div class="key-row svelte-1788mbx"><div id="vk-shift">&#8679; Shift</div></div></div></div> <div class="wasd-section-title svelte-1788mbx">Movement Keys</div> <div class="wasd-key-row svelte-1788mbx"><span class="wasd-key-badge svelte-1788mbx">W</span> <span class="wasd-key-desc svelte-1788mbx">Roll Up — pitch camera upward around globe</span></div> <div class="wasd-key-row svelte-1788mbx"><span class="wasd-key-badge svelte-1788mbx">S</span> <span class="wasd-key-desc svelte-1788mbx">Roll Down — pitch camera downward</span></div> <div class="wasd-key-row svelte-1788mbx"><span class="wasd-key-badge svelte-1788mbx">A</span> <span class="wasd-key-desc svelte-1788mbx">Roll Left — yaw camera to the left</span></div> <div class="wasd-key-row svelte-1788mbx"><span class="wasd-key-badge svelte-1788mbx">D</span> <span class="wasd-key-desc svelte-1788mbx">Roll Right — yaw camera to the right</span></div> <div class="wasd-section-title svelte-1788mbx">Modifiers</div> <div class="wasd-key-row svelte-1788mbx"><span class="wasd-key-badge svelte-1788mbx">&#8679; Shift</span> <span class="wasd-key-desc svelte-1788mbx">Boost — hold longer to accelerate faster (3x rate)</span></div> <div class="wasd-key-row svelte-1788mbx"><span class="wasd-key-badge svelte-1788mbx">Q</span> <span class="wasd-key-desc svelte-1788mbx">Brake — smooth deceleration to stop</span></div> <div class="wasd-section-title svelte-1788mbx">Combos</div> <div class="wasd-key-row svelte-1788mbx"><span class="wasd-key-badge svelte-1788mbx">W+A</span> <span class="wasd-key-desc svelte-1788mbx">Diagonal — roll up-left simultaneously</span></div> <div class="wasd-key-row svelte-1788mbx"><span class="wasd-key-badge svelte-1788mbx">W+D</span> <span class="wasd-key-desc svelte-1788mbx">Diagonal — roll up-right simultaneously</span></div> <div class="wasd-key-row svelte-1788mbx"><span class="wasd-combo svelte-1788mbx">W+S or A+D cancel each other (opposite directions)</span></div> <div class="wasd-section-title svelte-1788mbx">Comet Trail</div> <div class="wasd-toggle-row svelte-1788mbx"><div><div class="wasd-toggle-label svelte-1788mbx">Comet Trail Effect</div> <div class="wasd-toggle-sub svelte-1788mbx">Light trails appear when rotating at speed &gt; 15%</div></div> <div id="popup-comet-toggle" title="Toggle comet trails" role="switch" tabindex="0"></div></div> <div class="tip-box svelte-1788mbx"><strong class="svelte-1788mbx">Tip:</strong> Speed builds like a car throttle — hold <strong class="tip-orange svelte-1788mbx">Shift</strong> longer for maximum speed (500 km/h).
        Comet trails glow brighter the faster you go. When speed reaches 0 km/h the
        globe resets to its default position. Disabled during search mode.</div></div></div></div>`);function yp(i,e){jt(e,!0);const t=()=>eg(ea,"$cometEnabled",n),[n,r]=tg();let s=ng(e,"keys",19,()=>({w:!1,a:!1,s:!1,d:!1,q:!1,shift:!1}));wt(()=>{function j(W){W.key==="Escape"&&e.visible&&(W.stopPropagation(),e.onclose())}return window.addEventListener("keydown",j),()=>window.removeEventListener("keydown",j)});function a(j){j.target===j.currentTarget&&e.onclose()}function o(){ea.update(j=>!j)}var l=Rg();let c;var u=ue(l),f=ue(u),h=ae(ue(f),2),m=ae(f,2),x=ue(m),v=ue(x),d=ue(v),p=ue(d);let _;var g=ae(d,2),b=ue(g);let w;var S=ae(b,2);let M;var I=ae(S,2);let E;var y=ae(v,2),P=ue(y),U=ue(P);let G;var F=ae(P,2),z=ue(F);let q;var ee=ae(x,28),Z=ae(ue(ee),2);let Q;St(()=>{c=je(l,1,"svelte-1788mbx",null,c,{show:e.visible}),_=je(p,1,"key-block svelte-1788mbx",null,_,{lit:s().w}),w=je(b,1,"key-block svelte-1788mbx",null,w,{lit:s().a}),M=je(S,1,"key-block svelte-1788mbx",null,M,{lit:s().s}),E=je(I,1,"key-block svelte-1788mbx",null,E,{lit:s().d}),G=je(U,1,"key-block wide svelte-1788mbx",null,G,{lit:s().q}),q=je(z,1,"key-block wide small-text svelte-1788mbx",null,q,{lit:s().shift}),Q=je(Z,1,"globe-toggle svelte-1788mbx",null,Q,{on:t()}),Pt(Z,"aria-checked",t())}),De("click",l,a),De("keydown",l,j=>j.key==="Escape"&&e.onclose()),De("click",h,function(...j){var W;(W=e.onclose)==null||W.apply(this,j)}),De("click",Z,o),De("keydown",Z,j=>j.key==="Enter"&&o()),Ke(i,l),Kt(),r()}hi(["click","keydown"]);var yc=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function Dg(i){return i&&i.__esModule&&Object.prototype.hasOwnProperty.call(i,"default")?i.default:i}function Pg(i){if(Object.prototype.hasOwnProperty.call(i,"__esModule"))return i;var e=i.default;if(typeof e=="function"){var t=function n(){return this instanceof n?Reflect.construct(e,arguments,this.constructor):e.apply(this,arguments)};t.prototype=e.prototype}else t={};return Object.defineProperty(t,"__esModule",{value:!0}),Object.keys(i).forEach(function(n){var r=Object.getOwnPropertyDescriptor(i,n);Object.defineProperty(t,n,r.get?r:{enumerable:!0,get:function(){return i[n]}})}),t}var Yo={exports:{}};function Lg(i){throw new Error('Could not dynamically require "'+i+'". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.')}var jo={exports:{}};const Fg={},Bg=Object.freeze(Object.defineProperty({__proto__:null,default:Fg},Symbol.toStringTag,{value:"Module"})),Ig=Pg(Bg);var kg=jo.exports,i0;function dt(){return i0||(i0=1,(function(i,e){(function(t,n){i.exports=n()})(kg,function(){var t=t||(function(n,r){var s;if(typeof window<"u"&&window.crypto&&(s=window.crypto),typeof self<"u"&&self.crypto&&(s=self.crypto),typeof globalThis<"u"&&globalThis.crypto&&(s=globalThis.crypto),!s&&typeof window<"u"&&window.msCrypto&&(s=window.msCrypto),!s&&typeof yc<"u"&&yc.crypto&&(s=yc.crypto),!s&&typeof Lg=="function")try{s=Ig}catch{}var a=function(){if(s){if(typeof s.getRandomValues=="function")try{return s.getRandomValues(new Uint32Array(1))[0]}catch{}if(typeof s.randomBytes=="function")try{return s.randomBytes(4).readInt32LE()}catch{}}throw new Error("Native crypto module could not be used to get secure random number.")},o=Object.create||(function(){function _(){}return function(g){var b;return _.prototype=g,b=new _,_.prototype=null,b}})(),l={},c=l.lib={},u=c.Base=(function(){return{extend:function(_){var g=o(this);return _&&g.mixIn(_),(!g.hasOwnProperty("init")||this.init===g.init)&&(g.init=function(){g.$super.init.apply(this,arguments)}),g.init.prototype=g,g.$super=this,g},create:function(){var _=this.extend();return _.init.apply(_,arguments),_},init:function(){},mixIn:function(_){for(var g in _)_.hasOwnProperty(g)&&(this[g]=_[g]);_.hasOwnProperty("toString")&&(this.toString=_.toString)},clone:function(){return this.init.prototype.extend(this)}}})(),f=c.WordArray=u.extend({init:function(_,g){_=this.words=_||[],g!=r?this.sigBytes=g:this.sigBytes=_.length*4},toString:function(_){return(_||m).stringify(this)},concat:function(_){var g=this.words,b=_.words,w=this.sigBytes,S=_.sigBytes;if(this.clamp(),w%4)for(var M=0;M<S;M++){var I=b[M>>>2]>>>24-M%4*8&255;g[w+M>>>2]|=I<<24-(w+M)%4*8}else for(var E=0;E<S;E+=4)g[w+E>>>2]=b[E>>>2];return this.sigBytes+=S,this},clamp:function(){var _=this.words,g=this.sigBytes;_[g>>>2]&=4294967295<<32-g%4*8,_.length=n.ceil(g/4)},clone:function(){var _=u.clone.call(this);return _.words=this.words.slice(0),_},random:function(_){for(var g=[],b=0;b<_;b+=4)g.push(a());return new f.init(g,_)}}),h=l.enc={},m=h.Hex={stringify:function(_){for(var g=_.words,b=_.sigBytes,w=[],S=0;S<b;S++){var M=g[S>>>2]>>>24-S%4*8&255;w.push((M>>>4).toString(16)),w.push((M&15).toString(16))}return w.join("")},parse:function(_){for(var g=_.length,b=[],w=0;w<g;w+=2)b[w>>>3]|=parseInt(_.substr(w,2),16)<<24-w%8*4;return new f.init(b,g/2)}},x=h.Latin1={stringify:function(_){for(var g=_.words,b=_.sigBytes,w=[],S=0;S<b;S++){var M=g[S>>>2]>>>24-S%4*8&255;w.push(String.fromCharCode(M))}return w.join("")},parse:function(_){for(var g=_.length,b=[],w=0;w<g;w++)b[w>>>2]|=(_.charCodeAt(w)&255)<<24-w%4*8;return new f.init(b,g)}},v=h.Utf8={stringify:function(_){try{return decodeURIComponent(escape(x.stringify(_)))}catch{throw new Error("Malformed UTF-8 data")}},parse:function(_){return x.parse(unescape(encodeURIComponent(_)))}},d=c.BufferedBlockAlgorithm=u.extend({reset:function(){this._data=new f.init,this._nDataBytes=0},_append:function(_){typeof _=="string"&&(_=v.parse(_)),this._data.concat(_),this._nDataBytes+=_.sigBytes},_process:function(_){var g,b=this._data,w=b.words,S=b.sigBytes,M=this.blockSize,I=M*4,E=S/I;_?E=n.ceil(E):E=n.max((E|0)-this._minBufferSize,0);var y=E*M,P=n.min(y*4,S);if(y){for(var U=0;U<y;U+=M)this._doProcessBlock(w,U);g=w.splice(0,y),b.sigBytes-=P}return new f.init(g,P)},clone:function(){var _=u.clone.call(this);return _._data=this._data.clone(),_},_minBufferSize:0});c.Hasher=d.extend({cfg:u.extend(),init:function(_){this.cfg=this.cfg.extend(_),this.reset()},reset:function(){d.reset.call(this),this._doReset()},update:function(_){return this._append(_),this._process(),this},finalize:function(_){_&&this._append(_);var g=this._doFinalize();return g},blockSize:16,_createHelper:function(_){return function(g,b){return new _.init(b).finalize(g)}},_createHmacHelper:function(_){return function(g,b){return new p.HMAC.init(_,b).finalize(g)}}});var p=l.algo={};return l})(Math);return t})})(jo)),jo.exports}var Ko={exports:{}},Ug=Ko.exports,r0;function lc(){return r0||(r0=1,(function(i,e){(function(t,n){i.exports=n(dt())})(Ug,function(t){return(function(n){var r=t,s=r.lib,a=s.Base,o=s.WordArray,l=r.x64={};l.Word=a.extend({init:function(c,u){this.high=c,this.low=u}}),l.WordArray=a.extend({init:function(c,u){c=this.words=c||[],u!=n?this.sigBytes=u:this.sigBytes=c.length*8},toX32:function(){for(var c=this.words,u=c.length,f=[],h=0;h<u;h++){var m=c[h];f.push(m.high),f.push(m.low)}return o.create(f,this.sigBytes)},clone:function(){for(var c=a.clone.call(this),u=c.words=this.words.slice(0),f=u.length,h=0;h<f;h++)u[h]=u[h].clone();return c}})})(),t})})(Ko)),Ko.exports}var Zo={exports:{}},Ng=Zo.exports,s0;function Og(){return s0||(s0=1,(function(i,e){(function(t,n){i.exports=n(dt())})(Ng,function(t){return(function(){if(typeof ArrayBuffer=="function"){var n=t,r=n.lib,s=r.WordArray,a=s.init,o=s.init=function(l){if(l instanceof ArrayBuffer&&(l=new Uint8Array(l)),(l instanceof Int8Array||typeof Uint8ClampedArray<"u"&&l instanceof Uint8ClampedArray||l instanceof Int16Array||l instanceof Uint16Array||l instanceof Int32Array||l instanceof Uint32Array||l instanceof Float32Array||l instanceof Float64Array)&&(l=new Uint8Array(l.buffer,l.byteOffset,l.byteLength)),l instanceof Uint8Array){for(var c=l.byteLength,u=[],f=0;f<c;f++)u[f>>>2]|=l[f]<<24-f%4*8;a.call(this,u,c)}else a.apply(this,arguments)};o.prototype=s}})(),t.lib.WordArray})})(Zo)),Zo.exports}var Qo={exports:{}},zg=Qo.exports,a0;function Hg(){return a0||(a0=1,(function(i,e){(function(t,n){i.exports=n(dt())})(zg,function(t){return(function(){var n=t,r=n.lib,s=r.WordArray,a=n.enc;a.Utf16=a.Utf16BE={stringify:function(l){for(var c=l.words,u=l.sigBytes,f=[],h=0;h<u;h+=2){var m=c[h>>>2]>>>16-h%4*8&65535;f.push(String.fromCharCode(m))}return f.join("")},parse:function(l){for(var c=l.length,u=[],f=0;f<c;f++)u[f>>>1]|=l.charCodeAt(f)<<16-f%2*16;return s.create(u,c*2)}},a.Utf16LE={stringify:function(l){for(var c=l.words,u=l.sigBytes,f=[],h=0;h<u;h+=2){var m=o(c[h>>>2]>>>16-h%4*8&65535);f.push(String.fromCharCode(m))}return f.join("")},parse:function(l){for(var c=l.length,u=[],f=0;f<c;f++)u[f>>>1]|=o(l.charCodeAt(f)<<16-f%2*16);return s.create(u,c*2)}};function o(l){return l<<8&4278255360|l>>>8&16711935}})(),t.enc.Utf16})})(Qo)),Qo.exports}var Jo={exports:{}},Gg=Jo.exports,o0;function ns(){return o0||(o0=1,(function(i,e){(function(t,n){i.exports=n(dt())})(Gg,function(t){return(function(){var n=t,r=n.lib,s=r.WordArray,a=n.enc;a.Base64={stringify:function(l){var c=l.words,u=l.sigBytes,f=this._map;l.clamp();for(var h=[],m=0;m<u;m+=3)for(var x=c[m>>>2]>>>24-m%4*8&255,v=c[m+1>>>2]>>>24-(m+1)%4*8&255,d=c[m+2>>>2]>>>24-(m+2)%4*8&255,p=x<<16|v<<8|d,_=0;_<4&&m+_*.75<u;_++)h.push(f.charAt(p>>>6*(3-_)&63));var g=f.charAt(64);if(g)for(;h.length%4;)h.push(g);return h.join("")},parse:function(l){var c=l.length,u=this._map,f=this._reverseMap;if(!f){f=this._reverseMap=[];for(var h=0;h<u.length;h++)f[u.charCodeAt(h)]=h}var m=u.charAt(64);if(m){var x=l.indexOf(m);x!==-1&&(c=x)}return o(l,c,f)},_map:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="};function o(l,c,u){for(var f=[],h=0,m=0;m<c;m++)if(m%4){var x=u[l.charCodeAt(m-1)]<<m%4*2,v=u[l.charCodeAt(m)]>>>6-m%4*2,d=x|v;f[h>>>2]|=d<<24-h%4*8,h++}return s.create(f,h)}})(),t.enc.Base64})})(Jo)),Jo.exports}var el={exports:{}},Vg=el.exports,l0;function Wg(){return l0||(l0=1,(function(i,e){(function(t,n){i.exports=n(dt())})(Vg,function(t){return(function(){var n=t,r=n.lib,s=r.WordArray,a=n.enc;a.Base64url={stringify:function(l,c){c===void 0&&(c=!0);var u=l.words,f=l.sigBytes,h=c?this._safe_map:this._map;l.clamp();for(var m=[],x=0;x<f;x+=3)for(var v=u[x>>>2]>>>24-x%4*8&255,d=u[x+1>>>2]>>>24-(x+1)%4*8&255,p=u[x+2>>>2]>>>24-(x+2)%4*8&255,_=v<<16|d<<8|p,g=0;g<4&&x+g*.75<f;g++)m.push(h.charAt(_>>>6*(3-g)&63));var b=h.charAt(64);if(b)for(;m.length%4;)m.push(b);return m.join("")},parse:function(l,c){c===void 0&&(c=!0);var u=l.length,f=c?this._safe_map:this._map,h=this._reverseMap;if(!h){h=this._reverseMap=[];for(var m=0;m<f.length;m++)h[f.charCodeAt(m)]=m}var x=f.charAt(64);if(x){var v=l.indexOf(x);v!==-1&&(u=v)}return o(l,u,h)},_map:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",_safe_map:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_"};function o(l,c,u){for(var f=[],h=0,m=0;m<c;m++)if(m%4){var x=u[l.charCodeAt(m-1)]<<m%4*2,v=u[l.charCodeAt(m)]>>>6-m%4*2,d=x|v;f[h>>>2]|=d<<24-h%4*8,h++}return s.create(f,h)}})(),t.enc.Base64url})})(el)),el.exports}var tl={exports:{}},Xg=tl.exports,c0;function is(){return c0||(c0=1,(function(i,e){(function(t,n){i.exports=n(dt())})(Xg,function(t){return(function(n){var r=t,s=r.lib,a=s.WordArray,o=s.Hasher,l=r.algo,c=[];(function(){for(var v=0;v<64;v++)c[v]=n.abs(n.sin(v+1))*4294967296|0})();var u=l.MD5=o.extend({_doReset:function(){this._hash=new a.init([1732584193,4023233417,2562383102,271733878])},_doProcessBlock:function(v,d){for(var p=0;p<16;p++){var _=d+p,g=v[_];v[_]=(g<<8|g>>>24)&16711935|(g<<24|g>>>8)&4278255360}var b=this._hash.words,w=v[d+0],S=v[d+1],M=v[d+2],I=v[d+3],E=v[d+4],y=v[d+5],P=v[d+6],U=v[d+7],G=v[d+8],F=v[d+9],z=v[d+10],q=v[d+11],ee=v[d+12],Z=v[d+13],Q=v[d+14],j=v[d+15],W=b[0],C=b[1],A=b[2],R=b[3];W=f(W,C,A,R,w,7,c[0]),R=f(R,W,C,A,S,12,c[1]),A=f(A,R,W,C,M,17,c[2]),C=f(C,A,R,W,I,22,c[3]),W=f(W,C,A,R,E,7,c[4]),R=f(R,W,C,A,y,12,c[5]),A=f(A,R,W,C,P,17,c[6]),C=f(C,A,R,W,U,22,c[7]),W=f(W,C,A,R,G,7,c[8]),R=f(R,W,C,A,F,12,c[9]),A=f(A,R,W,C,z,17,c[10]),C=f(C,A,R,W,q,22,c[11]),W=f(W,C,A,R,ee,7,c[12]),R=f(R,W,C,A,Z,12,c[13]),A=f(A,R,W,C,Q,17,c[14]),C=f(C,A,R,W,j,22,c[15]),W=h(W,C,A,R,S,5,c[16]),R=h(R,W,C,A,P,9,c[17]),A=h(A,R,W,C,q,14,c[18]),C=h(C,A,R,W,w,20,c[19]),W=h(W,C,A,R,y,5,c[20]),R=h(R,W,C,A,z,9,c[21]),A=h(A,R,W,C,j,14,c[22]),C=h(C,A,R,W,E,20,c[23]),W=h(W,C,A,R,F,5,c[24]),R=h(R,W,C,A,Q,9,c[25]),A=h(A,R,W,C,I,14,c[26]),C=h(C,A,R,W,G,20,c[27]),W=h(W,C,A,R,Z,5,c[28]),R=h(R,W,C,A,M,9,c[29]),A=h(A,R,W,C,U,14,c[30]),C=h(C,A,R,W,ee,20,c[31]),W=m(W,C,A,R,y,4,c[32]),R=m(R,W,C,A,G,11,c[33]),A=m(A,R,W,C,q,16,c[34]),C=m(C,A,R,W,Q,23,c[35]),W=m(W,C,A,R,S,4,c[36]),R=m(R,W,C,A,E,11,c[37]),A=m(A,R,W,C,U,16,c[38]),C=m(C,A,R,W,z,23,c[39]),W=m(W,C,A,R,Z,4,c[40]),R=m(R,W,C,A,w,11,c[41]),A=m(A,R,W,C,I,16,c[42]),C=m(C,A,R,W,P,23,c[43]),W=m(W,C,A,R,F,4,c[44]),R=m(R,W,C,A,ee,11,c[45]),A=m(A,R,W,C,j,16,c[46]),C=m(C,A,R,W,M,23,c[47]),W=x(W,C,A,R,w,6,c[48]),R=x(R,W,C,A,U,10,c[49]),A=x(A,R,W,C,Q,15,c[50]),C=x(C,A,R,W,y,21,c[51]),W=x(W,C,A,R,ee,6,c[52]),R=x(R,W,C,A,I,10,c[53]),A=x(A,R,W,C,z,15,c[54]),C=x(C,A,R,W,S,21,c[55]),W=x(W,C,A,R,G,6,c[56]),R=x(R,W,C,A,j,10,c[57]),A=x(A,R,W,C,P,15,c[58]),C=x(C,A,R,W,Z,21,c[59]),W=x(W,C,A,R,E,6,c[60]),R=x(R,W,C,A,q,10,c[61]),A=x(A,R,W,C,M,15,c[62]),C=x(C,A,R,W,F,21,c[63]),b[0]=b[0]+W|0,b[1]=b[1]+C|0,b[2]=b[2]+A|0,b[3]=b[3]+R|0},_doFinalize:function(){var v=this._data,d=v.words,p=this._nDataBytes*8,_=v.sigBytes*8;d[_>>>5]|=128<<24-_%32;var g=n.floor(p/4294967296),b=p;d[(_+64>>>9<<4)+15]=(g<<8|g>>>24)&16711935|(g<<24|g>>>8)&4278255360,d[(_+64>>>9<<4)+14]=(b<<8|b>>>24)&16711935|(b<<24|b>>>8)&4278255360,v.sigBytes=(d.length+1)*4,this._process();for(var w=this._hash,S=w.words,M=0;M<4;M++){var I=S[M];S[M]=(I<<8|I>>>24)&16711935|(I<<24|I>>>8)&4278255360}return w},clone:function(){var v=o.clone.call(this);return v._hash=this._hash.clone(),v}});function f(v,d,p,_,g,b,w){var S=v+(d&p|~d&_)+g+w;return(S<<b|S>>>32-b)+d}function h(v,d,p,_,g,b,w){var S=v+(d&_|p&~_)+g+w;return(S<<b|S>>>32-b)+d}function m(v,d,p,_,g,b,w){var S=v+(d^p^_)+g+w;return(S<<b|S>>>32-b)+d}function x(v,d,p,_,g,b,w){var S=v+(p^(d|~_))+g+w;return(S<<b|S>>>32-b)+d}r.MD5=o._createHelper(u),r.HmacMD5=o._createHmacHelper(u)})(Math),t.MD5})})(tl)),tl.exports}var nl={exports:{}},qg=nl.exports,u0;function Ep(){return u0||(u0=1,(function(i,e){(function(t,n){i.exports=n(dt())})(qg,function(t){return(function(){var n=t,r=n.lib,s=r.WordArray,a=r.Hasher,o=n.algo,l=[],c=o.SHA1=a.extend({_doReset:function(){this._hash=new s.init([1732584193,4023233417,2562383102,271733878,3285377520])},_doProcessBlock:function(u,f){for(var h=this._hash.words,m=h[0],x=h[1],v=h[2],d=h[3],p=h[4],_=0;_<80;_++){if(_<16)l[_]=u[f+_]|0;else{var g=l[_-3]^l[_-8]^l[_-14]^l[_-16];l[_]=g<<1|g>>>31}var b=(m<<5|m>>>27)+p+l[_];_<20?b+=(x&v|~x&d)+1518500249:_<40?b+=(x^v^d)+1859775393:_<60?b+=(x&v|x&d|v&d)-1894007588:b+=(x^v^d)-899497514,p=d,d=v,v=x<<30|x>>>2,x=m,m=b}h[0]=h[0]+m|0,h[1]=h[1]+x|0,h[2]=h[2]+v|0,h[3]=h[3]+d|0,h[4]=h[4]+p|0},_doFinalize:function(){var u=this._data,f=u.words,h=this._nDataBytes*8,m=u.sigBytes*8;return f[m>>>5]|=128<<24-m%32,f[(m+64>>>9<<4)+14]=Math.floor(h/4294967296),f[(m+64>>>9<<4)+15]=h,u.sigBytes=f.length*4,this._process(),this._hash},clone:function(){var u=a.clone.call(this);return u._hash=this._hash.clone(),u}});n.SHA1=a._createHelper(c),n.HmacSHA1=a._createHmacHelper(c)})(),t.SHA1})})(nl)),nl.exports}var il={exports:{}},$g=il.exports,h0;function ah(){return h0||(h0=1,(function(i,e){(function(t,n){i.exports=n(dt())})($g,function(t){return(function(n){var r=t,s=r.lib,a=s.WordArray,o=s.Hasher,l=r.algo,c=[],u=[];(function(){function m(p){for(var _=n.sqrt(p),g=2;g<=_;g++)if(!(p%g))return!1;return!0}function x(p){return(p-(p|0))*4294967296|0}for(var v=2,d=0;d<64;)m(v)&&(d<8&&(c[d]=x(n.pow(v,1/2))),u[d]=x(n.pow(v,1/3)),d++),v++})();var f=[],h=l.SHA256=o.extend({_doReset:function(){this._hash=new a.init(c.slice(0))},_doProcessBlock:function(m,x){for(var v=this._hash.words,d=v[0],p=v[1],_=v[2],g=v[3],b=v[4],w=v[5],S=v[6],M=v[7],I=0;I<64;I++){if(I<16)f[I]=m[x+I]|0;else{var E=f[I-15],y=(E<<25|E>>>7)^(E<<14|E>>>18)^E>>>3,P=f[I-2],U=(P<<15|P>>>17)^(P<<13|P>>>19)^P>>>10;f[I]=y+f[I-7]+U+f[I-16]}var G=b&w^~b&S,F=d&p^d&_^p&_,z=(d<<30|d>>>2)^(d<<19|d>>>13)^(d<<10|d>>>22),q=(b<<26|b>>>6)^(b<<21|b>>>11)^(b<<7|b>>>25),ee=M+q+G+u[I]+f[I],Z=z+F;M=S,S=w,w=b,b=g+ee|0,g=_,_=p,p=d,d=ee+Z|0}v[0]=v[0]+d|0,v[1]=v[1]+p|0,v[2]=v[2]+_|0,v[3]=v[3]+g|0,v[4]=v[4]+b|0,v[5]=v[5]+w|0,v[6]=v[6]+S|0,v[7]=v[7]+M|0},_doFinalize:function(){var m=this._data,x=m.words,v=this._nDataBytes*8,d=m.sigBytes*8;return x[d>>>5]|=128<<24-d%32,x[(d+64>>>9<<4)+14]=n.floor(v/4294967296),x[(d+64>>>9<<4)+15]=v,m.sigBytes=x.length*4,this._process(),this._hash},clone:function(){var m=o.clone.call(this);return m._hash=this._hash.clone(),m}});r.SHA256=o._createHelper(h),r.HmacSHA256=o._createHmacHelper(h)})(Math),t.SHA256})})(il)),il.exports}var rl={exports:{}},Yg=rl.exports,f0;function jg(){return f0||(f0=1,(function(i,e){(function(t,n,r){i.exports=n(dt(),ah())})(Yg,function(t){return(function(){var n=t,r=n.lib,s=r.WordArray,a=n.algo,o=a.SHA256,l=a.SHA224=o.extend({_doReset:function(){this._hash=new s.init([3238371032,914150663,812702999,4144912697,4290775857,1750603025,1694076839,3204075428])},_doFinalize:function(){var c=o._doFinalize.call(this);return c.sigBytes-=4,c}});n.SHA224=o._createHelper(l),n.HmacSHA224=o._createHmacHelper(l)})(),t.SHA224})})(rl)),rl.exports}var sl={exports:{}},Kg=sl.exports,d0;function Sp(){return d0||(d0=1,(function(i,e){(function(t,n,r){i.exports=n(dt(),lc())})(Kg,function(t){return(function(){var n=t,r=n.lib,s=r.Hasher,a=n.x64,o=a.Word,l=a.WordArray,c=n.algo;function u(){return o.create.apply(o,arguments)}var f=[u(1116352408,3609767458),u(1899447441,602891725),u(3049323471,3964484399),u(3921009573,2173295548),u(961987163,4081628472),u(1508970993,3053834265),u(2453635748,2937671579),u(2870763221,3664609560),u(3624381080,2734883394),u(310598401,1164996542),u(607225278,1323610764),u(1426881987,3590304994),u(1925078388,4068182383),u(2162078206,991336113),u(2614888103,633803317),u(3248222580,3479774868),u(3835390401,2666613458),u(4022224774,944711139),u(264347078,2341262773),u(604807628,2007800933),u(770255983,1495990901),u(1249150122,1856431235),u(1555081692,3175218132),u(1996064986,2198950837),u(2554220882,3999719339),u(2821834349,766784016),u(2952996808,2566594879),u(3210313671,3203337956),u(3336571891,1034457026),u(3584528711,2466948901),u(113926993,3758326383),u(338241895,168717936),u(666307205,1188179964),u(773529912,1546045734),u(1294757372,1522805485),u(1396182291,2643833823),u(1695183700,2343527390),u(1986661051,1014477480),u(2177026350,1206759142),u(2456956037,344077627),u(2730485921,1290863460),u(2820302411,3158454273),u(3259730800,3505952657),u(3345764771,106217008),u(3516065817,3606008344),u(3600352804,1432725776),u(4094571909,1467031594),u(275423344,851169720),u(430227734,3100823752),u(506948616,1363258195),u(659060556,3750685593),u(883997877,3785050280),u(958139571,3318307427),u(1322822218,3812723403),u(1537002063,2003034995),u(1747873779,3602036899),u(1955562222,1575990012),u(2024104815,1125592928),u(2227730452,2716904306),u(2361852424,442776044),u(2428436474,593698344),u(2756734187,3733110249),u(3204031479,2999351573),u(3329325298,3815920427),u(3391569614,3928383900),u(3515267271,566280711),u(3940187606,3454069534),u(4118630271,4000239992),u(116418474,1914138554),u(174292421,2731055270),u(289380356,3203993006),u(460393269,320620315),u(685471733,587496836),u(852142971,1086792851),u(1017036298,365543100),u(1126000580,2618297676),u(1288033470,3409855158),u(1501505948,4234509866),u(1607167915,987167468),u(1816402316,1246189591)],h=[];(function(){for(var x=0;x<80;x++)h[x]=u()})();var m=c.SHA512=s.extend({_doReset:function(){this._hash=new l.init([new o.init(1779033703,4089235720),new o.init(3144134277,2227873595),new o.init(1013904242,4271175723),new o.init(2773480762,1595750129),new o.init(1359893119,2917565137),new o.init(2600822924,725511199),new o.init(528734635,4215389547),new o.init(1541459225,327033209)])},_doProcessBlock:function(x,v){for(var d=this._hash.words,p=d[0],_=d[1],g=d[2],b=d[3],w=d[4],S=d[5],M=d[6],I=d[7],E=p.high,y=p.low,P=_.high,U=_.low,G=g.high,F=g.low,z=b.high,q=b.low,ee=w.high,Z=w.low,Q=S.high,j=S.low,W=M.high,C=M.low,A=I.high,R=I.low,N=E,$=y,he=P,J=U,se=G,V=F,ie=z,O=q,le=ee,ce=Z,ve=Q,_e=j,He=W,Ie=C,B=A,T=R,K=0;K<80;K++){var de,fe,pe=h[K];if(K<16)fe=pe.high=x[v+K*2]|0,de=pe.low=x[v+K*2+1]|0;else{var ke=h[K-15],Ae=ke.high,Fe=ke.low,Ge=(Ae>>>1|Fe<<31)^(Ae>>>8|Fe<<24)^Ae>>>7,Xe=(Fe>>>1|Ae<<31)^(Fe>>>8|Ae<<24)^(Fe>>>7|Ae<<25),be=h[K-2],it=be.high,qe=be.low,We=(it>>>19|qe<<13)^(it<<3|qe>>>29)^it>>>6,ze=(qe>>>19|it<<13)^(qe<<3|it>>>29)^(qe>>>6|it<<26),me=h[K-7],k=me.high,ye=me.low,Be=h[K-16],Pe=Be.high,ge=Be.low;de=Xe+ye,fe=Ge+k+(de>>>0<Xe>>>0?1:0),de=de+ze,fe=fe+We+(de>>>0<ze>>>0?1:0),de=de+ge,fe=fe+Pe+(de>>>0<ge>>>0?1:0),pe.high=fe,pe.low=de}var H=le&ve^~le&He,Ee=ce&_e^~ce&Ie,we=N&he^N&se^he&se,Ue=$&J^$&V^J&V,Ne=(N>>>28|$<<4)^(N<<30|$>>>2)^(N<<25|$>>>7),$e=($>>>28|N<<4)^($<<30|N>>>2)^($<<25|N>>>7),Ye=(le>>>14|ce<<18)^(le>>>18|ce<<14)^(le<<23|ce>>>9),mt=(ce>>>14|le<<18)^(ce>>>18|le<<14)^(ce<<23|le>>>9),vt=f[K],Qe=vt.high,yt=vt.low,xt=T+mt,Gt=B+Ye+(xt>>>0<T>>>0?1:0),xt=xt+Ee,Gt=Gt+H+(xt>>>0<Ee>>>0?1:0),xt=xt+yt,Gt=Gt+Qe+(xt>>>0<yt>>>0?1:0),xt=xt+de,Gt=Gt+fe+(xt>>>0<de>>>0?1:0),In=$e+Ue,Tn=Ne+we+(In>>>0<$e>>>0?1:0);B=He,T=Ie,He=ve,Ie=_e,ve=le,_e=ce,ce=O+xt|0,le=ie+Gt+(ce>>>0<O>>>0?1:0)|0,ie=se,O=V,se=he,V=J,he=N,J=$,$=xt+In|0,N=Gt+Tn+($>>>0<xt>>>0?1:0)|0}y=p.low=y+$,p.high=E+N+(y>>>0<$>>>0?1:0),U=_.low=U+J,_.high=P+he+(U>>>0<J>>>0?1:0),F=g.low=F+V,g.high=G+se+(F>>>0<V>>>0?1:0),q=b.low=q+O,b.high=z+ie+(q>>>0<O>>>0?1:0),Z=w.low=Z+ce,w.high=ee+le+(Z>>>0<ce>>>0?1:0),j=S.low=j+_e,S.high=Q+ve+(j>>>0<_e>>>0?1:0),C=M.low=C+Ie,M.high=W+He+(C>>>0<Ie>>>0?1:0),R=I.low=R+T,I.high=A+B+(R>>>0<T>>>0?1:0)},_doFinalize:function(){var x=this._data,v=x.words,d=this._nDataBytes*8,p=x.sigBytes*8;v[p>>>5]|=128<<24-p%32,v[(p+128>>>10<<5)+30]=Math.floor(d/4294967296),v[(p+128>>>10<<5)+31]=d,x.sigBytes=v.length*4,this._process();var _=this._hash.toX32();return _},clone:function(){var x=s.clone.call(this);return x._hash=this._hash.clone(),x},blockSize:1024/32});n.SHA512=s._createHelper(m),n.HmacSHA512=s._createHmacHelper(m)})(),t.SHA512})})(sl)),sl.exports}var al={exports:{}},Zg=al.exports,p0;function Qg(){return p0||(p0=1,(function(i,e){(function(t,n,r){i.exports=n(dt(),lc(),Sp())})(Zg,function(t){return(function(){var n=t,r=n.x64,s=r.Word,a=r.WordArray,o=n.algo,l=o.SHA512,c=o.SHA384=l.extend({_doReset:function(){this._hash=new a.init([new s.init(3418070365,3238371032),new s.init(1654270250,914150663),new s.init(2438529370,812702999),new s.init(355462360,4144912697),new s.init(1731405415,4290775857),new s.init(2394180231,1750603025),new s.init(3675008525,1694076839),new s.init(1203062813,3204075428)])},_doFinalize:function(){var u=l._doFinalize.call(this);return u.sigBytes-=16,u}});n.SHA384=l._createHelper(c),n.HmacSHA384=l._createHmacHelper(c)})(),t.SHA384})})(al)),al.exports}var ol={exports:{}},Jg=ol.exports,m0;function ev(){return m0||(m0=1,(function(i,e){(function(t,n,r){i.exports=n(dt(),lc())})(Jg,function(t){return(function(n){var r=t,s=r.lib,a=s.WordArray,o=s.Hasher,l=r.x64,c=l.Word,u=r.algo,f=[],h=[],m=[];(function(){for(var d=1,p=0,_=0;_<24;_++){f[d+5*p]=(_+1)*(_+2)/2%64;var g=p%5,b=(2*d+3*p)%5;d=g,p=b}for(var d=0;d<5;d++)for(var p=0;p<5;p++)h[d+5*p]=p+(2*d+3*p)%5*5;for(var w=1,S=0;S<24;S++){for(var M=0,I=0,E=0;E<7;E++){if(w&1){var y=(1<<E)-1;y<32?I^=1<<y:M^=1<<y-32}w&128?w=w<<1^113:w<<=1}m[S]=c.create(M,I)}})();var x=[];(function(){for(var d=0;d<25;d++)x[d]=c.create()})();var v=u.SHA3=o.extend({cfg:o.cfg.extend({outputLength:512}),_doReset:function(){for(var d=this._state=[],p=0;p<25;p++)d[p]=new c.init;this.blockSize=(1600-2*this.cfg.outputLength)/32},_doProcessBlock:function(d,p){for(var _=this._state,g=this.blockSize/2,b=0;b<g;b++){var w=d[p+2*b],S=d[p+2*b+1];w=(w<<8|w>>>24)&16711935|(w<<24|w>>>8)&4278255360,S=(S<<8|S>>>24)&16711935|(S<<24|S>>>8)&4278255360;var M=_[b];M.high^=S,M.low^=w}for(var I=0;I<24;I++){for(var E=0;E<5;E++){for(var y=0,P=0,U=0;U<5;U++){var M=_[E+5*U];y^=M.high,P^=M.low}var G=x[E];G.high=y,G.low=P}for(var E=0;E<5;E++)for(var F=x[(E+4)%5],z=x[(E+1)%5],q=z.high,ee=z.low,y=F.high^(q<<1|ee>>>31),P=F.low^(ee<<1|q>>>31),U=0;U<5;U++){var M=_[E+5*U];M.high^=y,M.low^=P}for(var Z=1;Z<25;Z++){var y,P,M=_[Z],Q=M.high,j=M.low,W=f[Z];W<32?(y=Q<<W|j>>>32-W,P=j<<W|Q>>>32-W):(y=j<<W-32|Q>>>64-W,P=Q<<W-32|j>>>64-W);var C=x[h[Z]];C.high=y,C.low=P}var A=x[0],R=_[0];A.high=R.high,A.low=R.low;for(var E=0;E<5;E++)for(var U=0;U<5;U++){var Z=E+5*U,M=_[Z],N=x[Z],$=x[(E+1)%5+5*U],he=x[(E+2)%5+5*U];M.high=N.high^~$.high&he.high,M.low=N.low^~$.low&he.low}var M=_[0],J=m[I];M.high^=J.high,M.low^=J.low}},_doFinalize:function(){var d=this._data,p=d.words;this._nDataBytes*8;var _=d.sigBytes*8,g=this.blockSize*32;p[_>>>5]|=1<<24-_%32,p[(n.ceil((_+1)/g)*g>>>5)-1]|=128,d.sigBytes=p.length*4,this._process();for(var b=this._state,w=this.cfg.outputLength/8,S=w/8,M=[],I=0;I<S;I++){var E=b[I],y=E.high,P=E.low;y=(y<<8|y>>>24)&16711935|(y<<24|y>>>8)&4278255360,P=(P<<8|P>>>24)&16711935|(P<<24|P>>>8)&4278255360,M.push(P),M.push(y)}return new a.init(M,w)},clone:function(){for(var d=o.clone.call(this),p=d._state=this._state.slice(0),_=0;_<25;_++)p[_]=p[_].clone();return d}});r.SHA3=o._createHelper(v),r.HmacSHA3=o._createHmacHelper(v)})(Math),t.SHA3})})(ol)),ol.exports}var ll={exports:{}},tv=ll.exports,x0;function nv(){return x0||(x0=1,(function(i,e){(function(t,n){i.exports=n(dt())})(tv,function(t){/** @preserve
			(c) 2012 by Cédric Mesnil. All rights reserved.

			Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

			    - Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
			    - Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.

			THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
			*/return(function(n){var r=t,s=r.lib,a=s.WordArray,o=s.Hasher,l=r.algo,c=a.create([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,7,4,13,1,10,6,15,3,12,0,9,5,2,14,11,8,3,10,14,4,9,15,8,1,2,7,0,6,13,11,5,12,1,9,11,10,0,8,12,4,13,3,7,15,14,5,6,2,4,0,5,9,7,12,2,10,14,1,3,8,11,6,15,13]),u=a.create([5,14,7,0,9,2,11,4,13,6,15,8,1,10,3,12,6,11,3,7,0,13,5,10,14,15,8,12,4,9,1,2,15,5,1,3,7,14,6,9,11,8,12,2,10,0,4,13,8,6,4,1,3,11,15,0,5,12,2,13,9,7,10,14,12,15,10,4,1,5,8,7,6,2,13,14,0,3,9,11]),f=a.create([11,14,15,12,5,8,7,9,11,13,14,15,6,7,9,8,7,6,8,13,11,9,7,15,7,12,15,9,11,7,13,12,11,13,6,7,14,9,13,15,14,8,13,6,5,12,7,5,11,12,14,15,14,15,9,8,9,14,5,6,8,6,5,12,9,15,5,11,6,8,13,12,5,12,13,14,11,8,5,6]),h=a.create([8,9,9,11,13,15,15,5,7,7,8,11,14,14,12,6,9,13,15,7,12,8,9,11,7,7,12,7,6,15,13,11,9,7,15,11,8,6,6,14,12,13,5,14,13,13,7,5,15,5,8,11,14,14,6,14,6,9,12,9,12,5,15,8,8,5,12,9,12,5,14,6,8,13,6,5,15,13,11,11]),m=a.create([0,1518500249,1859775393,2400959708,2840853838]),x=a.create([1352829926,1548603684,1836072691,2053994217,0]),v=l.RIPEMD160=o.extend({_doReset:function(){this._hash=a.create([1732584193,4023233417,2562383102,271733878,3285377520])},_doProcessBlock:function(S,M){for(var I=0;I<16;I++){var E=M+I,y=S[E];S[E]=(y<<8|y>>>24)&16711935|(y<<24|y>>>8)&4278255360}var P=this._hash.words,U=m.words,G=x.words,F=c.words,z=u.words,q=f.words,ee=h.words,Z,Q,j,W,C,A,R,N,$,he;A=Z=P[0],R=Q=P[1],N=j=P[2],$=W=P[3],he=C=P[4];for(var J,I=0;I<80;I+=1)J=Z+S[M+F[I]]|0,I<16?J+=d(Q,j,W)+U[0]:I<32?J+=p(Q,j,W)+U[1]:I<48?J+=_(Q,j,W)+U[2]:I<64?J+=g(Q,j,W)+U[3]:J+=b(Q,j,W)+U[4],J=J|0,J=w(J,q[I]),J=J+C|0,Z=C,C=W,W=w(j,10),j=Q,Q=J,J=A+S[M+z[I]]|0,I<16?J+=b(R,N,$)+G[0]:I<32?J+=g(R,N,$)+G[1]:I<48?J+=_(R,N,$)+G[2]:I<64?J+=p(R,N,$)+G[3]:J+=d(R,N,$)+G[4],J=J|0,J=w(J,ee[I]),J=J+he|0,A=he,he=$,$=w(N,10),N=R,R=J;J=P[1]+j+$|0,P[1]=P[2]+W+he|0,P[2]=P[3]+C+A|0,P[3]=P[4]+Z+R|0,P[4]=P[0]+Q+N|0,P[0]=J},_doFinalize:function(){var S=this._data,M=S.words,I=this._nDataBytes*8,E=S.sigBytes*8;M[E>>>5]|=128<<24-E%32,M[(E+64>>>9<<4)+14]=(I<<8|I>>>24)&16711935|(I<<24|I>>>8)&4278255360,S.sigBytes=(M.length+1)*4,this._process();for(var y=this._hash,P=y.words,U=0;U<5;U++){var G=P[U];P[U]=(G<<8|G>>>24)&16711935|(G<<24|G>>>8)&4278255360}return y},clone:function(){var S=o.clone.call(this);return S._hash=this._hash.clone(),S}});function d(S,M,I){return S^M^I}function p(S,M,I){return S&M|~S&I}function _(S,M,I){return(S|~M)^I}function g(S,M,I){return S&I|M&~I}function b(S,M,I){return S^(M|~I)}function w(S,M){return S<<M|S>>>32-M}r.RIPEMD160=o._createHelper(v),r.HmacRIPEMD160=o._createHmacHelper(v)})(),t.RIPEMD160})})(ll)),ll.exports}var cl={exports:{}},iv=cl.exports,g0;function oh(){return g0||(g0=1,(function(i,e){(function(t,n){i.exports=n(dt())})(iv,function(t){(function(){var n=t,r=n.lib,s=r.Base,a=n.enc,o=a.Utf8,l=n.algo;l.HMAC=s.extend({init:function(c,u){c=this._hasher=new c.init,typeof u=="string"&&(u=o.parse(u));var f=c.blockSize,h=f*4;u.sigBytes>h&&(u=c.finalize(u)),u.clamp();for(var m=this._oKey=u.clone(),x=this._iKey=u.clone(),v=m.words,d=x.words,p=0;p<f;p++)v[p]^=1549556828,d[p]^=909522486;m.sigBytes=x.sigBytes=h,this.reset()},reset:function(){var c=this._hasher;c.reset(),c.update(this._iKey)},update:function(c){return this._hasher.update(c),this},finalize:function(c){var u=this._hasher,f=u.finalize(c);u.reset();var h=u.finalize(this._oKey.clone().concat(f));return h}})})()})})(cl)),cl.exports}var ul={exports:{}},rv=ul.exports,v0;function sv(){return v0||(v0=1,(function(i,e){(function(t,n,r){i.exports=n(dt(),ah(),oh())})(rv,function(t){return(function(){var n=t,r=n.lib,s=r.Base,a=r.WordArray,o=n.algo,l=o.SHA256,c=o.HMAC,u=o.PBKDF2=s.extend({cfg:s.extend({keySize:128/32,hasher:l,iterations:25e4}),init:function(f){this.cfg=this.cfg.extend(f)},compute:function(f,h){for(var m=this.cfg,x=c.create(m.hasher,f),v=a.create(),d=a.create([1]),p=v.words,_=d.words,g=m.keySize,b=m.iterations;p.length<g;){var w=x.update(h).finalize(d);x.reset();for(var S=w.words,M=S.length,I=w,E=1;E<b;E++){I=x.finalize(I),x.reset();for(var y=I.words,P=0;P<M;P++)S[P]^=y[P]}v.concat(w),_[0]++}return v.sigBytes=g*4,v}});n.PBKDF2=function(f,h,m){return u.create(m).compute(f,h)}})(),t.PBKDF2})})(ul)),ul.exports}var hl={exports:{}},av=hl.exports,_0;function yr(){return _0||(_0=1,(function(i,e){(function(t,n,r){i.exports=n(dt(),Ep(),oh())})(av,function(t){return(function(){var n=t,r=n.lib,s=r.Base,a=r.WordArray,o=n.algo,l=o.MD5,c=o.EvpKDF=s.extend({cfg:s.extend({keySize:128/32,hasher:l,iterations:1}),init:function(u){this.cfg=this.cfg.extend(u)},compute:function(u,f){for(var h,m=this.cfg,x=m.hasher.create(),v=a.create(),d=v.words,p=m.keySize,_=m.iterations;d.length<p;){h&&x.update(h),h=x.update(u).finalize(f),x.reset();for(var g=1;g<_;g++)h=x.finalize(h),x.reset();v.concat(h)}return v.sigBytes=p*4,v}});n.EvpKDF=function(u,f,h){return c.create(h).compute(u,f)}})(),t.EvpKDF})})(hl)),hl.exports}var fl={exports:{}},ov=fl.exports,b0;function en(){return b0||(b0=1,(function(i,e){(function(t,n,r){i.exports=n(dt(),yr())})(ov,function(t){t.lib.Cipher||(function(n){var r=t,s=r.lib,a=s.Base,o=s.WordArray,l=s.BufferedBlockAlgorithm,c=r.enc;c.Utf8;var u=c.Base64,f=r.algo,h=f.EvpKDF,m=s.Cipher=l.extend({cfg:a.extend(),createEncryptor:function(y,P){return this.create(this._ENC_XFORM_MODE,y,P)},createDecryptor:function(y,P){return this.create(this._DEC_XFORM_MODE,y,P)},init:function(y,P,U){this.cfg=this.cfg.extend(U),this._xformMode=y,this._key=P,this.reset()},reset:function(){l.reset.call(this),this._doReset()},process:function(y){return this._append(y),this._process()},finalize:function(y){y&&this._append(y);var P=this._doFinalize();return P},keySize:128/32,ivSize:128/32,_ENC_XFORM_MODE:1,_DEC_XFORM_MODE:2,_createHelper:(function(){function y(P){return typeof P=="string"?E:S}return function(P){return{encrypt:function(U,G,F){return y(G).encrypt(P,U,G,F)},decrypt:function(U,G,F){return y(G).decrypt(P,U,G,F)}}}})()});s.StreamCipher=m.extend({_doFinalize:function(){var y=this._process(!0);return y},blockSize:1});var x=r.mode={},v=s.BlockCipherMode=a.extend({createEncryptor:function(y,P){return this.Encryptor.create(y,P)},createDecryptor:function(y,P){return this.Decryptor.create(y,P)},init:function(y,P){this._cipher=y,this._iv=P}}),d=x.CBC=(function(){var y=v.extend();y.Encryptor=y.extend({processBlock:function(U,G){var F=this._cipher,z=F.blockSize;P.call(this,U,G,z),F.encryptBlock(U,G),this._prevBlock=U.slice(G,G+z)}}),y.Decryptor=y.extend({processBlock:function(U,G){var F=this._cipher,z=F.blockSize,q=U.slice(G,G+z);F.decryptBlock(U,G),P.call(this,U,G,z),this._prevBlock=q}});function P(U,G,F){var z,q=this._iv;q?(z=q,this._iv=n):z=this._prevBlock;for(var ee=0;ee<F;ee++)U[G+ee]^=z[ee]}return y})(),p=r.pad={},_=p.Pkcs7={pad:function(y,P){for(var U=P*4,G=U-y.sigBytes%U,F=G<<24|G<<16|G<<8|G,z=[],q=0;q<G;q+=4)z.push(F);var ee=o.create(z,G);y.concat(ee)},unpad:function(y){var P=y.words[y.sigBytes-1>>>2]&255;y.sigBytes-=P}};s.BlockCipher=m.extend({cfg:m.cfg.extend({mode:d,padding:_}),reset:function(){var y;m.reset.call(this);var P=this.cfg,U=P.iv,G=P.mode;this._xformMode==this._ENC_XFORM_MODE?y=G.createEncryptor:(y=G.createDecryptor,this._minBufferSize=1),this._mode&&this._mode.__creator==y?this._mode.init(this,U&&U.words):(this._mode=y.call(G,this,U&&U.words),this._mode.__creator=y)},_doProcessBlock:function(y,P){this._mode.processBlock(y,P)},_doFinalize:function(){var y,P=this.cfg.padding;return this._xformMode==this._ENC_XFORM_MODE?(P.pad(this._data,this.blockSize),y=this._process(!0)):(y=this._process(!0),P.unpad(y)),y},blockSize:128/32});var g=s.CipherParams=a.extend({init:function(y){this.mixIn(y)},toString:function(y){return(y||this.formatter).stringify(this)}}),b=r.format={},w=b.OpenSSL={stringify:function(y){var P,U=y.ciphertext,G=y.salt;return G?P=o.create([1398893684,1701076831]).concat(G).concat(U):P=U,P.toString(u)},parse:function(y){var P,U=u.parse(y),G=U.words;return G[0]==1398893684&&G[1]==1701076831&&(P=o.create(G.slice(2,4)),G.splice(0,4),U.sigBytes-=16),g.create({ciphertext:U,salt:P})}},S=s.SerializableCipher=a.extend({cfg:a.extend({format:w}),encrypt:function(y,P,U,G){G=this.cfg.extend(G);var F=y.createEncryptor(U,G),z=F.finalize(P),q=F.cfg;return g.create({ciphertext:z,key:U,iv:q.iv,algorithm:y,mode:q.mode,padding:q.padding,blockSize:y.blockSize,formatter:G.format})},decrypt:function(y,P,U,G){G=this.cfg.extend(G),P=this._parse(P,G.format);var F=y.createDecryptor(U,G).finalize(P.ciphertext);return F},_parse:function(y,P){return typeof y=="string"?P.parse(y,this):y}}),M=r.kdf={},I=M.OpenSSL={execute:function(y,P,U,G,F){if(G||(G=o.random(64/8)),F)var z=h.create({keySize:P+U,hasher:F}).compute(y,G);else var z=h.create({keySize:P+U}).compute(y,G);var q=o.create(z.words.slice(P),U*4);return z.sigBytes=P*4,g.create({key:z,iv:q,salt:G})}},E=s.PasswordBasedCipher=S.extend({cfg:S.cfg.extend({kdf:I}),encrypt:function(y,P,U,G){G=this.cfg.extend(G);var F=G.kdf.execute(U,y.keySize,y.ivSize,G.salt,G.hasher);G.iv=F.iv;var z=S.encrypt.call(this,y,P,F.key,G);return z.mixIn(F),z},decrypt:function(y,P,U,G){G=this.cfg.extend(G),P=this._parse(P,G.format);var F=G.kdf.execute(U,y.keySize,y.ivSize,P.salt,G.hasher);G.iv=F.iv;var z=S.decrypt.call(this,y,P,F.key,G);return z}})})()})})(fl)),fl.exports}var dl={exports:{}},lv=dl.exports,y0;function cv(){return y0||(y0=1,(function(i,e){(function(t,n,r){i.exports=n(dt(),en())})(lv,function(t){return t.mode.CFB=(function(){var n=t.lib.BlockCipherMode.extend();n.Encryptor=n.extend({processBlock:function(s,a){var o=this._cipher,l=o.blockSize;r.call(this,s,a,l,o),this._prevBlock=s.slice(a,a+l)}}),n.Decryptor=n.extend({processBlock:function(s,a){var o=this._cipher,l=o.blockSize,c=s.slice(a,a+l);r.call(this,s,a,l,o),this._prevBlock=c}});function r(s,a,o,l){var c,u=this._iv;u?(c=u.slice(0),this._iv=void 0):c=this._prevBlock,l.encryptBlock(c,0);for(var f=0;f<o;f++)s[a+f]^=c[f]}return n})(),t.mode.CFB})})(dl)),dl.exports}var pl={exports:{}},uv=pl.exports,E0;function hv(){return E0||(E0=1,(function(i,e){(function(t,n,r){i.exports=n(dt(),en())})(uv,function(t){return t.mode.CTR=(function(){var n=t.lib.BlockCipherMode.extend(),r=n.Encryptor=n.extend({processBlock:function(s,a){var o=this._cipher,l=o.blockSize,c=this._iv,u=this._counter;c&&(u=this._counter=c.slice(0),this._iv=void 0);var f=u.slice(0);o.encryptBlock(f,0),u[l-1]=u[l-1]+1|0;for(var h=0;h<l;h++)s[a+h]^=f[h]}});return n.Decryptor=r,n})(),t.mode.CTR})})(pl)),pl.exports}var ml={exports:{}},fv=ml.exports,S0;function dv(){return S0||(S0=1,(function(i,e){(function(t,n,r){i.exports=n(dt(),en())})(fv,function(t){/** @preserve
 * Counter block mode compatible with  Dr Brian Gladman fileenc.c
 * derived from CryptoJS.mode.CTR
 * Jan Hruby jhruby.web@gmail.com
 */return t.mode.CTRGladman=(function(){var n=t.lib.BlockCipherMode.extend();function r(o){if((o>>24&255)===255){var l=o>>16&255,c=o>>8&255,u=o&255;l===255?(l=0,c===255?(c=0,u===255?u=0:++u):++c):++l,o=0,o+=l<<16,o+=c<<8,o+=u}else o+=1<<24;return o}function s(o){return(o[0]=r(o[0]))===0&&(o[1]=r(o[1])),o}var a=n.Encryptor=n.extend({processBlock:function(o,l){var c=this._cipher,u=c.blockSize,f=this._iv,h=this._counter;f&&(h=this._counter=f.slice(0),this._iv=void 0),s(h);var m=h.slice(0);c.encryptBlock(m,0);for(var x=0;x<u;x++)o[l+x]^=m[x]}});return n.Decryptor=a,n})(),t.mode.CTRGladman})})(ml)),ml.exports}var xl={exports:{}},pv=xl.exports,M0;function mv(){return M0||(M0=1,(function(i,e){(function(t,n,r){i.exports=n(dt(),en())})(pv,function(t){return t.mode.OFB=(function(){var n=t.lib.BlockCipherMode.extend(),r=n.Encryptor=n.extend({processBlock:function(s,a){var o=this._cipher,l=o.blockSize,c=this._iv,u=this._keystream;c&&(u=this._keystream=c.slice(0),this._iv=void 0),o.encryptBlock(u,0);for(var f=0;f<l;f++)s[a+f]^=u[f]}});return n.Decryptor=r,n})(),t.mode.OFB})})(xl)),xl.exports}var gl={exports:{}},xv=gl.exports,w0;function gv(){return w0||(w0=1,(function(i,e){(function(t,n,r){i.exports=n(dt(),en())})(xv,function(t){return t.mode.ECB=(function(){var n=t.lib.BlockCipherMode.extend();return n.Encryptor=n.extend({processBlock:function(r,s){this._cipher.encryptBlock(r,s)}}),n.Decryptor=n.extend({processBlock:function(r,s){this._cipher.decryptBlock(r,s)}}),n})(),t.mode.ECB})})(gl)),gl.exports}var vl={exports:{}},vv=vl.exports,A0;function _v(){return A0||(A0=1,(function(i,e){(function(t,n,r){i.exports=n(dt(),en())})(vv,function(t){return t.pad.AnsiX923={pad:function(n,r){var s=n.sigBytes,a=r*4,o=a-s%a,l=s+o-1;n.clamp(),n.words[l>>>2]|=o<<24-l%4*8,n.sigBytes+=o},unpad:function(n){var r=n.words[n.sigBytes-1>>>2]&255;n.sigBytes-=r}},t.pad.Ansix923})})(vl)),vl.exports}var _l={exports:{}},bv=_l.exports,T0;function yv(){return T0||(T0=1,(function(i,e){(function(t,n,r){i.exports=n(dt(),en())})(bv,function(t){return t.pad.Iso10126={pad:function(n,r){var s=r*4,a=s-n.sigBytes%s;n.concat(t.lib.WordArray.random(a-1)).concat(t.lib.WordArray.create([a<<24],1))},unpad:function(n){var r=n.words[n.sigBytes-1>>>2]&255;n.sigBytes-=r}},t.pad.Iso10126})})(_l)),_l.exports}var bl={exports:{}},Ev=bl.exports,C0;function Sv(){return C0||(C0=1,(function(i,e){(function(t,n,r){i.exports=n(dt(),en())})(Ev,function(t){return t.pad.Iso97971={pad:function(n,r){n.concat(t.lib.WordArray.create([2147483648],1)),t.pad.ZeroPadding.pad(n,r)},unpad:function(n){t.pad.ZeroPadding.unpad(n),n.sigBytes--}},t.pad.Iso97971})})(bl)),bl.exports}var yl={exports:{}},Mv=yl.exports,R0;function wv(){return R0||(R0=1,(function(i,e){(function(t,n,r){i.exports=n(dt(),en())})(Mv,function(t){return t.pad.ZeroPadding={pad:function(n,r){var s=r*4;n.clamp(),n.sigBytes+=s-(n.sigBytes%s||s)},unpad:function(n){for(var r=n.words,s=n.sigBytes-1,s=n.sigBytes-1;s>=0;s--)if(r[s>>>2]>>>24-s%4*8&255){n.sigBytes=s+1;break}}},t.pad.ZeroPadding})})(yl)),yl.exports}var El={exports:{}},Av=El.exports,D0;function Tv(){return D0||(D0=1,(function(i,e){(function(t,n,r){i.exports=n(dt(),en())})(Av,function(t){return t.pad.NoPadding={pad:function(){},unpad:function(){}},t.pad.NoPadding})})(El)),El.exports}var Sl={exports:{}},Cv=Sl.exports,P0;function Rv(){return P0||(P0=1,(function(i,e){(function(t,n,r){i.exports=n(dt(),en())})(Cv,function(t){return(function(n){var r=t,s=r.lib,a=s.CipherParams,o=r.enc,l=o.Hex,c=r.format;c.Hex={stringify:function(u){return u.ciphertext.toString(l)},parse:function(u){var f=l.parse(u);return a.create({ciphertext:f})}}})(),t.format.Hex})})(Sl)),Sl.exports}var Ml={exports:{}},Dv=Ml.exports,L0;function Pv(){return L0||(L0=1,(function(i,e){(function(t,n,r){i.exports=n(dt(),ns(),is(),yr(),en())})(Dv,function(t){return(function(){var n=t,r=n.lib,s=r.BlockCipher,a=n.algo,o=[],l=[],c=[],u=[],f=[],h=[],m=[],x=[],v=[],d=[];(function(){for(var g=[],b=0;b<256;b++)b<128?g[b]=b<<1:g[b]=b<<1^283;for(var w=0,S=0,b=0;b<256;b++){var M=S^S<<1^S<<2^S<<3^S<<4;M=M>>>8^M&255^99,o[w]=M,l[M]=w;var I=g[w],E=g[I],y=g[E],P=g[M]*257^M*16843008;c[w]=P<<24|P>>>8,u[w]=P<<16|P>>>16,f[w]=P<<8|P>>>24,h[w]=P;var P=y*16843009^E*65537^I*257^w*16843008;m[M]=P<<24|P>>>8,x[M]=P<<16|P>>>16,v[M]=P<<8|P>>>24,d[M]=P,w?(w=I^g[g[g[y^I]]],S^=g[g[S]]):w=S=1}})();var p=[0,1,2,4,8,16,32,64,128,27,54],_=a.AES=s.extend({_doReset:function(){var g;if(!(this._nRounds&&this._keyPriorReset===this._key)){for(var b=this._keyPriorReset=this._key,w=b.words,S=b.sigBytes/4,M=this._nRounds=S+6,I=(M+1)*4,E=this._keySchedule=[],y=0;y<I;y++)y<S?E[y]=w[y]:(g=E[y-1],y%S?S>6&&y%S==4&&(g=o[g>>>24]<<24|o[g>>>16&255]<<16|o[g>>>8&255]<<8|o[g&255]):(g=g<<8|g>>>24,g=o[g>>>24]<<24|o[g>>>16&255]<<16|o[g>>>8&255]<<8|o[g&255],g^=p[y/S|0]<<24),E[y]=E[y-S]^g);for(var P=this._invKeySchedule=[],U=0;U<I;U++){var y=I-U;if(U%4)var g=E[y];else var g=E[y-4];U<4||y<=4?P[U]=g:P[U]=m[o[g>>>24]]^x[o[g>>>16&255]]^v[o[g>>>8&255]]^d[o[g&255]]}}},encryptBlock:function(g,b){this._doCryptBlock(g,b,this._keySchedule,c,u,f,h,o)},decryptBlock:function(g,b){var w=g[b+1];g[b+1]=g[b+3],g[b+3]=w,this._doCryptBlock(g,b,this._invKeySchedule,m,x,v,d,l);var w=g[b+1];g[b+1]=g[b+3],g[b+3]=w},_doCryptBlock:function(g,b,w,S,M,I,E,y){for(var P=this._nRounds,U=g[b]^w[0],G=g[b+1]^w[1],F=g[b+2]^w[2],z=g[b+3]^w[3],q=4,ee=1;ee<P;ee++){var Z=S[U>>>24]^M[G>>>16&255]^I[F>>>8&255]^E[z&255]^w[q++],Q=S[G>>>24]^M[F>>>16&255]^I[z>>>8&255]^E[U&255]^w[q++],j=S[F>>>24]^M[z>>>16&255]^I[U>>>8&255]^E[G&255]^w[q++],W=S[z>>>24]^M[U>>>16&255]^I[G>>>8&255]^E[F&255]^w[q++];U=Z,G=Q,F=j,z=W}var Z=(y[U>>>24]<<24|y[G>>>16&255]<<16|y[F>>>8&255]<<8|y[z&255])^w[q++],Q=(y[G>>>24]<<24|y[F>>>16&255]<<16|y[z>>>8&255]<<8|y[U&255])^w[q++],j=(y[F>>>24]<<24|y[z>>>16&255]<<16|y[U>>>8&255]<<8|y[G&255])^w[q++],W=(y[z>>>24]<<24|y[U>>>16&255]<<16|y[G>>>8&255]<<8|y[F&255])^w[q++];g[b]=Z,g[b+1]=Q,g[b+2]=j,g[b+3]=W},keySize:256/32});n.AES=s._createHelper(_)})(),t.AES})})(Ml)),Ml.exports}var wl={exports:{}},Lv=wl.exports,F0;function Fv(){return F0||(F0=1,(function(i,e){(function(t,n,r){i.exports=n(dt(),ns(),is(),yr(),en())})(Lv,function(t){return(function(){var n=t,r=n.lib,s=r.WordArray,a=r.BlockCipher,o=n.algo,l=[57,49,41,33,25,17,9,1,58,50,42,34,26,18,10,2,59,51,43,35,27,19,11,3,60,52,44,36,63,55,47,39,31,23,15,7,62,54,46,38,30,22,14,6,61,53,45,37,29,21,13,5,28,20,12,4],c=[14,17,11,24,1,5,3,28,15,6,21,10,23,19,12,4,26,8,16,7,27,20,13,2,41,52,31,37,47,55,30,40,51,45,33,48,44,49,39,56,34,53,46,42,50,36,29,32],u=[1,2,4,6,8,10,12,14,15,17,19,21,23,25,27,28],f=[{0:8421888,268435456:32768,536870912:8421378,805306368:2,1073741824:512,1342177280:8421890,1610612736:8389122,1879048192:8388608,2147483648:514,2415919104:8389120,2684354560:33280,2952790016:8421376,3221225472:32770,3489660928:8388610,3758096384:0,4026531840:33282,134217728:0,402653184:8421890,671088640:33282,939524096:32768,1207959552:8421888,1476395008:512,1744830464:8421378,2013265920:2,2281701376:8389120,2550136832:33280,2818572288:8421376,3087007744:8389122,3355443200:8388610,3623878656:32770,3892314112:514,4160749568:8388608,1:32768,268435457:2,536870913:8421888,805306369:8388608,1073741825:8421378,1342177281:33280,1610612737:512,1879048193:8389122,2147483649:8421890,2415919105:8421376,2684354561:8388610,2952790017:33282,3221225473:514,3489660929:8389120,3758096385:32770,4026531841:0,134217729:8421890,402653185:8421376,671088641:8388608,939524097:512,1207959553:32768,1476395009:8388610,1744830465:2,2013265921:33282,2281701377:32770,2550136833:8389122,2818572289:514,3087007745:8421888,3355443201:8389120,3623878657:0,3892314113:33280,4160749569:8421378},{0:1074282512,16777216:16384,33554432:524288,50331648:1074266128,67108864:1073741840,83886080:1074282496,100663296:1073758208,117440512:16,134217728:540672,150994944:1073758224,167772160:1073741824,184549376:540688,201326592:524304,218103808:0,234881024:16400,251658240:1074266112,8388608:1073758208,25165824:540688,41943040:16,58720256:1073758224,75497472:1074282512,92274688:1073741824,109051904:524288,125829120:1074266128,142606336:524304,159383552:0,176160768:16384,192937984:1074266112,209715200:1073741840,226492416:540672,243269632:1074282496,260046848:16400,268435456:0,285212672:1074266128,301989888:1073758224,318767104:1074282496,335544320:1074266112,352321536:16,369098752:540688,385875968:16384,402653184:16400,419430400:524288,436207616:524304,452984832:1073741840,469762048:540672,486539264:1073758208,503316480:1073741824,520093696:1074282512,276824064:540688,293601280:524288,310378496:1074266112,327155712:16384,343932928:1073758208,360710144:1074282512,377487360:16,394264576:1073741824,411041792:1074282496,427819008:1073741840,444596224:1073758224,461373440:524304,478150656:0,494927872:16400,511705088:1074266128,528482304:540672},{0:260,1048576:0,2097152:67109120,3145728:65796,4194304:65540,5242880:67108868,6291456:67174660,7340032:67174400,8388608:67108864,9437184:67174656,10485760:65792,11534336:67174404,12582912:67109124,13631488:65536,14680064:4,15728640:256,524288:67174656,1572864:67174404,2621440:0,3670016:67109120,4718592:67108868,5767168:65536,6815744:65540,7864320:260,8912896:4,9961472:256,11010048:67174400,12058624:65796,13107200:65792,14155776:67109124,15204352:67174660,16252928:67108864,16777216:67174656,17825792:65540,18874368:65536,19922944:67109120,20971520:256,22020096:67174660,23068672:67108868,24117248:0,25165824:67109124,26214400:67108864,27262976:4,28311552:65792,29360128:67174400,30408704:260,31457280:65796,32505856:67174404,17301504:67108864,18350080:260,19398656:67174656,20447232:0,21495808:65540,22544384:67109120,23592960:256,24641536:67174404,25690112:65536,26738688:67174660,27787264:65796,28835840:67108868,29884416:67109124,30932992:67174400,31981568:4,33030144:65792},{0:2151682048,65536:2147487808,131072:4198464,196608:2151677952,262144:0,327680:4198400,393216:2147483712,458752:4194368,524288:2147483648,589824:4194304,655360:64,720896:2147487744,786432:2151678016,851968:4160,917504:4096,983040:2151682112,32768:2147487808,98304:64,163840:2151678016,229376:2147487744,294912:4198400,360448:2151682112,425984:0,491520:2151677952,557056:4096,622592:2151682048,688128:4194304,753664:4160,819200:2147483648,884736:4194368,950272:4198464,1015808:2147483712,1048576:4194368,1114112:4198400,1179648:2147483712,1245184:0,1310720:4160,1376256:2151678016,1441792:2151682048,1507328:2147487808,1572864:2151682112,1638400:2147483648,1703936:2151677952,1769472:4198464,1835008:2147487744,1900544:4194304,1966080:64,2031616:4096,1081344:2151677952,1146880:2151682112,1212416:0,1277952:4198400,1343488:4194368,1409024:2147483648,1474560:2147487808,1540096:64,1605632:2147483712,1671168:4096,1736704:2147487744,1802240:2151678016,1867776:4160,1933312:2151682048,1998848:4194304,2064384:4198464},{0:128,4096:17039360,8192:262144,12288:536870912,16384:537133184,20480:16777344,24576:553648256,28672:262272,32768:16777216,36864:537133056,40960:536871040,45056:553910400,49152:553910272,53248:0,57344:17039488,61440:553648128,2048:17039488,6144:553648256,10240:128,14336:17039360,18432:262144,22528:537133184,26624:553910272,30720:536870912,34816:537133056,38912:0,43008:553910400,47104:16777344,51200:536871040,55296:553648128,59392:16777216,63488:262272,65536:262144,69632:128,73728:536870912,77824:553648256,81920:16777344,86016:553910272,90112:537133184,94208:16777216,98304:553910400,102400:553648128,106496:17039360,110592:537133056,114688:262272,118784:536871040,122880:0,126976:17039488,67584:553648256,71680:16777216,75776:17039360,79872:537133184,83968:536870912,88064:17039488,92160:128,96256:553910272,100352:262272,104448:553910400,108544:0,112640:553648128,116736:16777344,120832:262144,124928:537133056,129024:536871040},{0:268435464,256:8192,512:270532608,768:270540808,1024:268443648,1280:2097152,1536:2097160,1792:268435456,2048:0,2304:268443656,2560:2105344,2816:8,3072:270532616,3328:2105352,3584:8200,3840:270540800,128:270532608,384:270540808,640:8,896:2097152,1152:2105352,1408:268435464,1664:268443648,1920:8200,2176:2097160,2432:8192,2688:268443656,2944:270532616,3200:0,3456:270540800,3712:2105344,3968:268435456,4096:268443648,4352:270532616,4608:270540808,4864:8200,5120:2097152,5376:268435456,5632:268435464,5888:2105344,6144:2105352,6400:0,6656:8,6912:270532608,7168:8192,7424:268443656,7680:270540800,7936:2097160,4224:8,4480:2105344,4736:2097152,4992:268435464,5248:268443648,5504:8200,5760:270540808,6016:270532608,6272:270540800,6528:270532616,6784:8192,7040:2105352,7296:2097160,7552:0,7808:268435456,8064:268443656},{0:1048576,16:33555457,32:1024,48:1049601,64:34604033,80:0,96:1,112:34603009,128:33555456,144:1048577,160:33554433,176:34604032,192:34603008,208:1025,224:1049600,240:33554432,8:34603009,24:0,40:33555457,56:34604032,72:1048576,88:33554433,104:33554432,120:1025,136:1049601,152:33555456,168:34603008,184:1048577,200:1024,216:34604033,232:1,248:1049600,256:33554432,272:1048576,288:33555457,304:34603009,320:1048577,336:33555456,352:34604032,368:1049601,384:1025,400:34604033,416:1049600,432:1,448:0,464:34603008,480:33554433,496:1024,264:1049600,280:33555457,296:34603009,312:1,328:33554432,344:1048576,360:1025,376:34604032,392:33554433,408:34603008,424:0,440:34604033,456:1049601,472:1024,488:33555456,504:1048577},{0:134219808,1:131072,2:134217728,3:32,4:131104,5:134350880,6:134350848,7:2048,8:134348800,9:134219776,10:133120,11:134348832,12:2080,13:0,14:134217760,15:133152,2147483648:2048,2147483649:134350880,2147483650:134219808,2147483651:134217728,2147483652:134348800,2147483653:133120,2147483654:133152,2147483655:32,2147483656:134217760,2147483657:2080,2147483658:131104,2147483659:134350848,2147483660:0,2147483661:134348832,2147483662:134219776,2147483663:131072,16:133152,17:134350848,18:32,19:2048,20:134219776,21:134217760,22:134348832,23:131072,24:0,25:131104,26:134348800,27:134219808,28:134350880,29:133120,30:2080,31:134217728,2147483664:131072,2147483665:2048,2147483666:134348832,2147483667:133152,2147483668:32,2147483669:134348800,2147483670:134217728,2147483671:134219808,2147483672:134350880,2147483673:134217760,2147483674:134219776,2147483675:0,2147483676:133120,2147483677:2080,2147483678:131104,2147483679:134350848}],h=[4160749569,528482304,33030144,2064384,129024,8064,504,2147483679],m=o.DES=a.extend({_doReset:function(){for(var p=this._key,_=p.words,g=[],b=0;b<56;b++){var w=l[b]-1;g[b]=_[w>>>5]>>>31-w%32&1}for(var S=this._subKeys=[],M=0;M<16;M++){for(var I=S[M]=[],E=u[M],b=0;b<24;b++)I[b/6|0]|=g[(c[b]-1+E)%28]<<31-b%6,I[4+(b/6|0)]|=g[28+(c[b+24]-1+E)%28]<<31-b%6;I[0]=I[0]<<1|I[0]>>>31;for(var b=1;b<7;b++)I[b]=I[b]>>>(b-1)*4+3;I[7]=I[7]<<5|I[7]>>>27}for(var y=this._invSubKeys=[],b=0;b<16;b++)y[b]=S[15-b]},encryptBlock:function(p,_){this._doCryptBlock(p,_,this._subKeys)},decryptBlock:function(p,_){this._doCryptBlock(p,_,this._invSubKeys)},_doCryptBlock:function(p,_,g){this._lBlock=p[_],this._rBlock=p[_+1],x.call(this,4,252645135),x.call(this,16,65535),v.call(this,2,858993459),v.call(this,8,16711935),x.call(this,1,1431655765);for(var b=0;b<16;b++){for(var w=g[b],S=this._lBlock,M=this._rBlock,I=0,E=0;E<8;E++)I|=f[E][((M^w[E])&h[E])>>>0];this._lBlock=M,this._rBlock=S^I}var y=this._lBlock;this._lBlock=this._rBlock,this._rBlock=y,x.call(this,1,1431655765),v.call(this,8,16711935),v.call(this,2,858993459),x.call(this,16,65535),x.call(this,4,252645135),p[_]=this._lBlock,p[_+1]=this._rBlock},keySize:64/32,ivSize:64/32,blockSize:64/32});function x(p,_){var g=(this._lBlock>>>p^this._rBlock)&_;this._rBlock^=g,this._lBlock^=g<<p}function v(p,_){var g=(this._rBlock>>>p^this._lBlock)&_;this._lBlock^=g,this._rBlock^=g<<p}n.DES=a._createHelper(m);var d=o.TripleDES=a.extend({_doReset:function(){var p=this._key,_=p.words;if(_.length!==2&&_.length!==4&&_.length<6)throw new Error("Invalid key length - 3DES requires the key length to be 64, 128, 192 or >192.");var g=_.slice(0,2),b=_.length<4?_.slice(0,2):_.slice(2,4),w=_.length<6?_.slice(0,2):_.slice(4,6);this._des1=m.createEncryptor(s.create(g)),this._des2=m.createEncryptor(s.create(b)),this._des3=m.createEncryptor(s.create(w))},encryptBlock:function(p,_){this._des1.encryptBlock(p,_),this._des2.decryptBlock(p,_),this._des3.encryptBlock(p,_)},decryptBlock:function(p,_){this._des3.decryptBlock(p,_),this._des2.encryptBlock(p,_),this._des1.decryptBlock(p,_)},keySize:192/32,ivSize:64/32,blockSize:64/32});n.TripleDES=a._createHelper(d)})(),t.TripleDES})})(wl)),wl.exports}var Al={exports:{}},Bv=Al.exports,B0;function Iv(){return B0||(B0=1,(function(i,e){(function(t,n,r){i.exports=n(dt(),ns(),is(),yr(),en())})(Bv,function(t){return(function(){var n=t,r=n.lib,s=r.StreamCipher,a=n.algo,o=a.RC4=s.extend({_doReset:function(){for(var u=this._key,f=u.words,h=u.sigBytes,m=this._S=[],x=0;x<256;x++)m[x]=x;for(var x=0,v=0;x<256;x++){var d=x%h,p=f[d>>>2]>>>24-d%4*8&255;v=(v+m[x]+p)%256;var _=m[x];m[x]=m[v],m[v]=_}this._i=this._j=0},_doProcessBlock:function(u,f){u[f]^=l.call(this)},keySize:256/32,ivSize:0});function l(){for(var u=this._S,f=this._i,h=this._j,m=0,x=0;x<4;x++){f=(f+1)%256,h=(h+u[f])%256;var v=u[f];u[f]=u[h],u[h]=v,m|=u[(u[f]+u[h])%256]<<24-x*8}return this._i=f,this._j=h,m}n.RC4=s._createHelper(o);var c=a.RC4Drop=o.extend({cfg:o.cfg.extend({drop:192}),_doReset:function(){o._doReset.call(this);for(var u=this.cfg.drop;u>0;u--)l.call(this)}});n.RC4Drop=s._createHelper(c)})(),t.RC4})})(Al)),Al.exports}var Tl={exports:{}},kv=Tl.exports,I0;function Uv(){return I0||(I0=1,(function(i,e){(function(t,n,r){i.exports=n(dt(),ns(),is(),yr(),en())})(kv,function(t){return(function(){var n=t,r=n.lib,s=r.StreamCipher,a=n.algo,o=[],l=[],c=[],u=a.Rabbit=s.extend({_doReset:function(){for(var h=this._key.words,m=this.cfg.iv,x=0;x<4;x++)h[x]=(h[x]<<8|h[x]>>>24)&16711935|(h[x]<<24|h[x]>>>8)&4278255360;var v=this._X=[h[0],h[3]<<16|h[2]>>>16,h[1],h[0]<<16|h[3]>>>16,h[2],h[1]<<16|h[0]>>>16,h[3],h[2]<<16|h[1]>>>16],d=this._C=[h[2]<<16|h[2]>>>16,h[0]&4294901760|h[1]&65535,h[3]<<16|h[3]>>>16,h[1]&4294901760|h[2]&65535,h[0]<<16|h[0]>>>16,h[2]&4294901760|h[3]&65535,h[1]<<16|h[1]>>>16,h[3]&4294901760|h[0]&65535];this._b=0;for(var x=0;x<4;x++)f.call(this);for(var x=0;x<8;x++)d[x]^=v[x+4&7];if(m){var p=m.words,_=p[0],g=p[1],b=(_<<8|_>>>24)&16711935|(_<<24|_>>>8)&4278255360,w=(g<<8|g>>>24)&16711935|(g<<24|g>>>8)&4278255360,S=b>>>16|w&4294901760,M=w<<16|b&65535;d[0]^=b,d[1]^=S,d[2]^=w,d[3]^=M,d[4]^=b,d[5]^=S,d[6]^=w,d[7]^=M;for(var x=0;x<4;x++)f.call(this)}},_doProcessBlock:function(h,m){var x=this._X;f.call(this),o[0]=x[0]^x[5]>>>16^x[3]<<16,o[1]=x[2]^x[7]>>>16^x[5]<<16,o[2]=x[4]^x[1]>>>16^x[7]<<16,o[3]=x[6]^x[3]>>>16^x[1]<<16;for(var v=0;v<4;v++)o[v]=(o[v]<<8|o[v]>>>24)&16711935|(o[v]<<24|o[v]>>>8)&4278255360,h[m+v]^=o[v]},blockSize:128/32,ivSize:64/32});function f(){for(var h=this._X,m=this._C,x=0;x<8;x++)l[x]=m[x];m[0]=m[0]+1295307597+this._b|0,m[1]=m[1]+3545052371+(m[0]>>>0<l[0]>>>0?1:0)|0,m[2]=m[2]+886263092+(m[1]>>>0<l[1]>>>0?1:0)|0,m[3]=m[3]+1295307597+(m[2]>>>0<l[2]>>>0?1:0)|0,m[4]=m[4]+3545052371+(m[3]>>>0<l[3]>>>0?1:0)|0,m[5]=m[5]+886263092+(m[4]>>>0<l[4]>>>0?1:0)|0,m[6]=m[6]+1295307597+(m[5]>>>0<l[5]>>>0?1:0)|0,m[7]=m[7]+3545052371+(m[6]>>>0<l[6]>>>0?1:0)|0,this._b=m[7]>>>0<l[7]>>>0?1:0;for(var x=0;x<8;x++){var v=h[x]+m[x],d=v&65535,p=v>>>16,_=((d*d>>>17)+d*p>>>15)+p*p,g=((v&4294901760)*v|0)+((v&65535)*v|0);c[x]=_^g}h[0]=c[0]+(c[7]<<16|c[7]>>>16)+(c[6]<<16|c[6]>>>16)|0,h[1]=c[1]+(c[0]<<8|c[0]>>>24)+c[7]|0,h[2]=c[2]+(c[1]<<16|c[1]>>>16)+(c[0]<<16|c[0]>>>16)|0,h[3]=c[3]+(c[2]<<8|c[2]>>>24)+c[1]|0,h[4]=c[4]+(c[3]<<16|c[3]>>>16)+(c[2]<<16|c[2]>>>16)|0,h[5]=c[5]+(c[4]<<8|c[4]>>>24)+c[3]|0,h[6]=c[6]+(c[5]<<16|c[5]>>>16)+(c[4]<<16|c[4]>>>16)|0,h[7]=c[7]+(c[6]<<8|c[6]>>>24)+c[5]|0}n.Rabbit=s._createHelper(u)})(),t.Rabbit})})(Tl)),Tl.exports}var Cl={exports:{}},Nv=Cl.exports,k0;function Ov(){return k0||(k0=1,(function(i,e){(function(t,n,r){i.exports=n(dt(),ns(),is(),yr(),en())})(Nv,function(t){return(function(){var n=t,r=n.lib,s=r.StreamCipher,a=n.algo,o=[],l=[],c=[],u=a.RabbitLegacy=s.extend({_doReset:function(){var h=this._key.words,m=this.cfg.iv,x=this._X=[h[0],h[3]<<16|h[2]>>>16,h[1],h[0]<<16|h[3]>>>16,h[2],h[1]<<16|h[0]>>>16,h[3],h[2]<<16|h[1]>>>16],v=this._C=[h[2]<<16|h[2]>>>16,h[0]&4294901760|h[1]&65535,h[3]<<16|h[3]>>>16,h[1]&4294901760|h[2]&65535,h[0]<<16|h[0]>>>16,h[2]&4294901760|h[3]&65535,h[1]<<16|h[1]>>>16,h[3]&4294901760|h[0]&65535];this._b=0;for(var d=0;d<4;d++)f.call(this);for(var d=0;d<8;d++)v[d]^=x[d+4&7];if(m){var p=m.words,_=p[0],g=p[1],b=(_<<8|_>>>24)&16711935|(_<<24|_>>>8)&4278255360,w=(g<<8|g>>>24)&16711935|(g<<24|g>>>8)&4278255360,S=b>>>16|w&4294901760,M=w<<16|b&65535;v[0]^=b,v[1]^=S,v[2]^=w,v[3]^=M,v[4]^=b,v[5]^=S,v[6]^=w,v[7]^=M;for(var d=0;d<4;d++)f.call(this)}},_doProcessBlock:function(h,m){var x=this._X;f.call(this),o[0]=x[0]^x[5]>>>16^x[3]<<16,o[1]=x[2]^x[7]>>>16^x[5]<<16,o[2]=x[4]^x[1]>>>16^x[7]<<16,o[3]=x[6]^x[3]>>>16^x[1]<<16;for(var v=0;v<4;v++)o[v]=(o[v]<<8|o[v]>>>24)&16711935|(o[v]<<24|o[v]>>>8)&4278255360,h[m+v]^=o[v]},blockSize:128/32,ivSize:64/32});function f(){for(var h=this._X,m=this._C,x=0;x<8;x++)l[x]=m[x];m[0]=m[0]+1295307597+this._b|0,m[1]=m[1]+3545052371+(m[0]>>>0<l[0]>>>0?1:0)|0,m[2]=m[2]+886263092+(m[1]>>>0<l[1]>>>0?1:0)|0,m[3]=m[3]+1295307597+(m[2]>>>0<l[2]>>>0?1:0)|0,m[4]=m[4]+3545052371+(m[3]>>>0<l[3]>>>0?1:0)|0,m[5]=m[5]+886263092+(m[4]>>>0<l[4]>>>0?1:0)|0,m[6]=m[6]+1295307597+(m[5]>>>0<l[5]>>>0?1:0)|0,m[7]=m[7]+3545052371+(m[6]>>>0<l[6]>>>0?1:0)|0,this._b=m[7]>>>0<l[7]>>>0?1:0;for(var x=0;x<8;x++){var v=h[x]+m[x],d=v&65535,p=v>>>16,_=((d*d>>>17)+d*p>>>15)+p*p,g=((v&4294901760)*v|0)+((v&65535)*v|0);c[x]=_^g}h[0]=c[0]+(c[7]<<16|c[7]>>>16)+(c[6]<<16|c[6]>>>16)|0,h[1]=c[1]+(c[0]<<8|c[0]>>>24)+c[7]|0,h[2]=c[2]+(c[1]<<16|c[1]>>>16)+(c[0]<<16|c[0]>>>16)|0,h[3]=c[3]+(c[2]<<8|c[2]>>>24)+c[1]|0,h[4]=c[4]+(c[3]<<16|c[3]>>>16)+(c[2]<<16|c[2]>>>16)|0,h[5]=c[5]+(c[4]<<8|c[4]>>>24)+c[3]|0,h[6]=c[6]+(c[5]<<16|c[5]>>>16)+(c[4]<<16|c[4]>>>16)|0,h[7]=c[7]+(c[6]<<8|c[6]>>>24)+c[5]|0}n.RabbitLegacy=s._createHelper(u)})(),t.RabbitLegacy})})(Cl)),Cl.exports}var Rl={exports:{}},zv=Rl.exports,U0;function Hv(){return U0||(U0=1,(function(i,e){(function(t,n,r){i.exports=n(dt(),ns(),is(),yr(),en())})(zv,function(t){return(function(){var n=t,r=n.lib,s=r.BlockCipher,a=n.algo;const o=16,l=[608135816,2242054355,320440878,57701188,2752067618,698298832,137296536,3964562569,1160258022,953160567,3193202383,887688300,3232508343,3380367581,1065670069,3041331479,2450970073,2306472731],c=[[3509652390,2564797868,805139163,3491422135,3101798381,1780907670,3128725573,4046225305,614570311,3012652279,134345442,2240740374,1667834072,1901547113,2757295779,4103290238,227898511,1921955416,1904987480,2182433518,2069144605,3260701109,2620446009,720527379,3318853667,677414384,3393288472,3101374703,2390351024,1614419982,1822297739,2954791486,3608508353,3174124327,2024746970,1432378464,3864339955,2857741204,1464375394,1676153920,1439316330,715854006,3033291828,289532110,2706671279,2087905683,3018724369,1668267050,732546397,1947742710,3462151702,2609353502,2950085171,1814351708,2050118529,680887927,999245976,1800124847,3300911131,1713906067,1641548236,4213287313,1216130144,1575780402,4018429277,3917837745,3693486850,3949271944,596196993,3549867205,258830323,2213823033,772490370,2760122372,1774776394,2652871518,566650946,4142492826,1728879713,2882767088,1783734482,3629395816,2517608232,2874225571,1861159788,326777828,3124490320,2130389656,2716951837,967770486,1724537150,2185432712,2364442137,1164943284,2105845187,998989502,3765401048,2244026483,1075463327,1455516326,1322494562,910128902,469688178,1117454909,936433444,3490320968,3675253459,1240580251,122909385,2157517691,634681816,4142456567,3825094682,3061402683,2540495037,79693498,3249098678,1084186820,1583128258,426386531,1761308591,1047286709,322548459,995290223,1845252383,2603652396,3431023940,2942221577,3202600964,3727903485,1712269319,422464435,3234572375,1170764815,3523960633,3117677531,1434042557,442511882,3600875718,1076654713,1738483198,4213154764,2393238008,3677496056,1014306527,4251020053,793779912,2902807211,842905082,4246964064,1395751752,1040244610,2656851899,3396308128,445077038,3742853595,3577915638,679411651,2892444358,2354009459,1767581616,3150600392,3791627101,3102740896,284835224,4246832056,1258075500,768725851,2589189241,3069724005,3532540348,1274779536,3789419226,2764799539,1660621633,3471099624,4011903706,913787905,3497959166,737222580,2514213453,2928710040,3937242737,1804850592,3499020752,2949064160,2386320175,2390070455,2415321851,4061277028,2290661394,2416832540,1336762016,1754252060,3520065937,3014181293,791618072,3188594551,3933548030,2332172193,3852520463,3043980520,413987798,3465142937,3030929376,4245938359,2093235073,3534596313,375366246,2157278981,2479649556,555357303,3870105701,2008414854,3344188149,4221384143,3956125452,2067696032,3594591187,2921233993,2428461,544322398,577241275,1471733935,610547355,4027169054,1432588573,1507829418,2025931657,3646575487,545086370,48609733,2200306550,1653985193,298326376,1316178497,3007786442,2064951626,458293330,2589141269,3591329599,3164325604,727753846,2179363840,146436021,1461446943,4069977195,705550613,3059967265,3887724982,4281599278,3313849956,1404054877,2845806497,146425753,1854211946],[1266315497,3048417604,3681880366,3289982499,290971e4,1235738493,2632868024,2414719590,3970600049,1771706367,1449415276,3266420449,422970021,1963543593,2690192192,3826793022,1062508698,1531092325,1804592342,2583117782,2714934279,4024971509,1294809318,4028980673,1289560198,2221992742,1669523910,35572830,157838143,1052438473,1016535060,1802137761,1753167236,1386275462,3080475397,2857371447,1040679964,2145300060,2390574316,1461121720,2956646967,4031777805,4028374788,33600511,2920084762,1018524850,629373528,3691585981,3515945977,2091462646,2486323059,586499841,988145025,935516892,3367335476,2599673255,2839830854,265290510,3972581182,2759138881,3795373465,1005194799,847297441,406762289,1314163512,1332590856,1866599683,4127851711,750260880,613907577,1450815602,3165620655,3734664991,3650291728,3012275730,3704569646,1427272223,778793252,1343938022,2676280711,2052605720,1946737175,3164576444,3914038668,3967478842,3682934266,1661551462,3294938066,4011595847,840292616,3712170807,616741398,312560963,711312465,1351876610,322626781,1910503582,271666773,2175563734,1594956187,70604529,3617834859,1007753275,1495573769,4069517037,2549218298,2663038764,504708206,2263041392,3941167025,2249088522,1514023603,1998579484,1312622330,694541497,2582060303,2151582166,1382467621,776784248,2618340202,3323268794,2497899128,2784771155,503983604,4076293799,907881277,423175695,432175456,1378068232,4145222326,3954048622,3938656102,3820766613,2793130115,2977904593,26017576,3274890735,3194772133,1700274565,1756076034,4006520079,3677328699,720338349,1533947780,354530856,688349552,3973924725,1637815568,332179504,3949051286,53804574,2852348879,3044236432,1282449977,3583942155,3416972820,4006381244,1617046695,2628476075,3002303598,1686838959,431878346,2686675385,1700445008,1080580658,1009431731,832498133,3223435511,2605976345,2271191193,2516031870,1648197032,4164389018,2548247927,300782431,375919233,238389289,3353747414,2531188641,2019080857,1475708069,455242339,2609103871,448939670,3451063019,1395535956,2413381860,1841049896,1491858159,885456874,4264095073,4001119347,1565136089,3898914787,1108368660,540939232,1173283510,2745871338,3681308437,4207628240,3343053890,4016749493,1699691293,1103962373,3625875870,2256883143,3830138730,1031889488,3479347698,1535977030,4236805024,3251091107,2132092099,1774941330,1199868427,1452454533,157007616,2904115357,342012276,595725824,1480756522,206960106,497939518,591360097,863170706,2375253569,3596610801,1814182875,2094937945,3421402208,1082520231,3463918190,2785509508,435703966,3908032597,1641649973,2842273706,3305899714,1510255612,2148256476,2655287854,3276092548,4258621189,236887753,3681803219,274041037,1734335097,3815195456,3317970021,1899903192,1026095262,4050517792,356393447,2410691914,3873677099,3682840055],[3913112168,2491498743,4132185628,2489919796,1091903735,1979897079,3170134830,3567386728,3557303409,857797738,1136121015,1342202287,507115054,2535736646,337727348,3213592640,1301675037,2528481711,1895095763,1721773893,3216771564,62756741,2142006736,835421444,2531993523,1442658625,3659876326,2882144922,676362277,1392781812,170690266,3921047035,1759253602,3611846912,1745797284,664899054,1329594018,3901205900,3045908486,2062866102,2865634940,3543621612,3464012697,1080764994,553557557,3656615353,3996768171,991055499,499776247,1265440854,648242737,3940784050,980351604,3713745714,1749149687,3396870395,4211799374,3640570775,1161844396,3125318951,1431517754,545492359,4268468663,3499529547,1437099964,2702547544,3433638243,2581715763,2787789398,1060185593,1593081372,2418618748,4260947970,69676912,2159744348,86519011,2512459080,3838209314,1220612927,3339683548,133810670,1090789135,1078426020,1569222167,845107691,3583754449,4072456591,1091646820,628848692,1613405280,3757631651,526609435,236106946,48312990,2942717905,3402727701,1797494240,859738849,992217954,4005476642,2243076622,3870952857,3732016268,765654824,3490871365,2511836413,1685915746,3888969200,1414112111,2273134842,3281911079,4080962846,172450625,2569994100,980381355,4109958455,2819808352,2716589560,2568741196,3681446669,3329971472,1835478071,660984891,3704678404,4045999559,3422617507,3040415634,1762651403,1719377915,3470491036,2693910283,3642056355,3138596744,1364962596,2073328063,1983633131,926494387,3423689081,2150032023,4096667949,1749200295,3328846651,309677260,2016342300,1779581495,3079819751,111262694,1274766160,443224088,298511866,1025883608,3806446537,1145181785,168956806,3641502830,3584813610,1689216846,3666258015,3200248200,1692713982,2646376535,4042768518,1618508792,1610833997,3523052358,4130873264,2001055236,3610705100,2202168115,4028541809,2961195399,1006657119,2006996926,3186142756,1430667929,3210227297,1314452623,4074634658,4101304120,2273951170,1399257539,3367210612,3027628629,1190975929,2062231137,2333990788,2221543033,2438960610,1181637006,548689776,2362791313,3372408396,3104550113,3145860560,296247880,1970579870,3078560182,3769228297,1714227617,3291629107,3898220290,166772364,1251581989,493813264,448347421,195405023,2709975567,677966185,3703036547,1463355134,2715995803,1338867538,1343315457,2802222074,2684532164,233230375,2599980071,2000651841,3277868038,1638401717,4028070440,3237316320,6314154,819756386,300326615,590932579,1405279636,3267499572,3150704214,2428286686,3959192993,3461946742,1862657033,1266418056,963775037,2089974820,2263052895,1917689273,448879540,3550394620,3981727096,150775221,3627908307,1303187396,508620638,2975983352,2726630617,1817252668,1876281319,1457606340,908771278,3720792119,3617206836,2455994898,1729034894,1080033504],[976866871,3556439503,2881648439,1522871579,1555064734,1336096578,3548522304,2579274686,3574697629,3205460757,3593280638,3338716283,3079412587,564236357,2993598910,1781952180,1464380207,3163844217,3332601554,1699332808,1393555694,1183702653,3581086237,1288719814,691649499,2847557200,2895455976,3193889540,2717570544,1781354906,1676643554,2592534050,3230253752,1126444790,2770207658,2633158820,2210423226,2615765581,2414155088,3127139286,673620729,2805611233,1269405062,4015350505,3341807571,4149409754,1057255273,2012875353,2162469141,2276492801,2601117357,993977747,3918593370,2654263191,753973209,36408145,2530585658,25011837,3520020182,2088578344,530523599,2918365339,1524020338,1518925132,3760827505,3759777254,1202760957,3985898139,3906192525,674977740,4174734889,2031300136,2019492241,3983892565,4153806404,3822280332,352677332,2297720250,60907813,90501309,3286998549,1016092578,2535922412,2839152426,457141659,509813237,4120667899,652014361,1966332200,2975202805,55981186,2327461051,676427537,3255491064,2882294119,3433927263,1307055953,942726286,933058658,2468411793,3933900994,4215176142,1361170020,2001714738,2830558078,3274259782,1222529897,1679025792,2729314320,3714953764,1770335741,151462246,3013232138,1682292957,1483529935,471910574,1539241949,458788160,3436315007,1807016891,3718408830,978976581,1043663428,3165965781,1927990952,4200891579,2372276910,3208408903,3533431907,1412390302,2931980059,4132332400,1947078029,3881505623,4168226417,2941484381,1077988104,1320477388,886195818,18198404,3786409e3,2509781533,112762804,3463356488,1866414978,891333506,18488651,661792760,1628790961,3885187036,3141171499,876946877,2693282273,1372485963,791857591,2686433993,3759982718,3167212022,3472953795,2716379847,445679433,3561995674,3504004811,3574258232,54117162,3331405415,2381918588,3769707343,4154350007,1140177722,4074052095,668550556,3214352940,367459370,261225585,2610173221,4209349473,3468074219,3265815641,314222801,3066103646,3808782860,282218597,3406013506,3773591054,379116347,1285071038,846784868,2669647154,3771962079,3550491691,2305946142,453669953,1268987020,3317592352,3279303384,3744833421,2610507566,3859509063,266596637,3847019092,517658769,3462560207,3443424879,370717030,4247526661,2224018117,4143653529,4112773975,2788324899,2477274417,1456262402,2901442914,1517677493,1846949527,2295493580,3734397586,2176403920,1280348187,1908823572,3871786941,846861322,1172426758,3287448474,3383383037,1655181056,3139813346,901632758,1897031941,2986607138,3066810236,3447102507,1393639104,373351379,950779232,625454576,3124240540,4148612726,2007998917,544563296,2244738638,2330496472,2058025392,1291430526,424198748,50039436,29584100,3605783033,2429876329,2791104160,1057563949,3255363231,3075367218,3463963227,1469046755,985887462]];var u={pbox:[],sbox:[]};function f(d,p){let _=p>>24&255,g=p>>16&255,b=p>>8&255,w=p&255,S=d.sbox[0][_]+d.sbox[1][g];return S=S^d.sbox[2][b],S=S+d.sbox[3][w],S}function h(d,p,_){let g=p,b=_,w;for(let S=0;S<o;++S)g=g^d.pbox[S],b=f(d,g)^b,w=g,g=b,b=w;return w=g,g=b,b=w,b=b^d.pbox[o],g=g^d.pbox[o+1],{left:g,right:b}}function m(d,p,_){let g=p,b=_,w;for(let S=o+1;S>1;--S)g=g^d.pbox[S],b=f(d,g)^b,w=g,g=b,b=w;return w=g,g=b,b=w,b=b^d.pbox[1],g=g^d.pbox[0],{left:g,right:b}}function x(d,p,_){for(let M=0;M<4;M++){d.sbox[M]=[];for(let I=0;I<256;I++)d.sbox[M][I]=c[M][I]}let g=0;for(let M=0;M<o+2;M++)d.pbox[M]=l[M]^p[g],g++,g>=_&&(g=0);let b=0,w=0,S=0;for(let M=0;M<o+2;M+=2)S=h(d,b,w),b=S.left,w=S.right,d.pbox[M]=b,d.pbox[M+1]=w;for(let M=0;M<4;M++)for(let I=0;I<256;I+=2)S=h(d,b,w),b=S.left,w=S.right,d.sbox[M][I]=b,d.sbox[M][I+1]=w;return!0}var v=a.Blowfish=s.extend({_doReset:function(){if(this._keyPriorReset!==this._key){var d=this._keyPriorReset=this._key,p=d.words,_=d.sigBytes/4;x(u,p,_)}},encryptBlock:function(d,p){var _=h(u,d[p],d[p+1]);d[p]=_.left,d[p+1]=_.right},decryptBlock:function(d,p){var _=m(u,d[p],d[p+1]);d[p]=_.left,d[p+1]=_.right},blockSize:64/32,keySize:128/32,ivSize:64/32});n.Blowfish=s._createHelper(v)})(),t.Blowfish})})(Rl)),Rl.exports}var Gv=Yo.exports,N0;function Vv(){return N0||(N0=1,(function(i,e){(function(t,n,r){i.exports=n(dt(),lc(),Og(),Hg(),ns(),Wg(),is(),Ep(),ah(),jg(),Sp(),Qg(),ev(),nv(),oh(),sv(),yr(),en(),cv(),hv(),dv(),mv(),gv(),_v(),yv(),Sv(),wv(),Tv(),Rv(),Pv(),Fv(),Iv(),Uv(),Ov(),Hv())})(Gv,function(t){return t})})(Yo)),Yo.exports}var Wv=Vv();const wu=Dg(Wv);var Ec={SECURE_STORAGE_SECRET:"x1bQYQA4vSEcR6RQ05XtJg",SECURE_STORAGE_PREFIX:"@secst"},uo=typeof process=="object"&&(process==null?void 0:Ec)&&typeof Ec=="object"&&Ec||null,lh={secret:(uo==null?void 0:uo.SECURE_STORAGE_SECRET)||"x1bQYQA4vSEcR6RQ05XtJg",prefix:(uo==null?void 0:uo.SECURE_STORAGE_PREFIX)||"@secst"},O0=(i,e)=>{if(!(typeof i>"u")&&(typeof i!="string"||!i.trim()||typeof(e==null?void 0:e.appendChecker)=="function"&&!e.appendChecker(i)))throw new Error((e==null?void 0:e.message)||"Value must be a valid string")},Xv=i=>{try{if(i&&typeof i=="object"){O0(i.prefix,{message:"Prefix must be a valid string"}),O0(i.secret,{message:"Secret must be a valid string"});for(let e in i)typeof i[e]<"u"&&(lh[e]=i[e])}}catch(e){console.error("Error secure storage => update-configuration :",e)}},Mp=lh.secret,qv=i=>{try{if(typeof i!="string")throw new Error("Value must be string");return wu.AES.encrypt(i,Mp).toString()}catch(e){return console.error("Error secure storage => encrypt :",e),null}},$v=i=>{try{if(typeof i!="string")throw new Error("Value must be string");return wu.AES.decrypt(i,Mp).toString(wu.enc.Utf8)}catch(e){return console.error("Error secure storage => decrypt :",e),null}},Vr,Yv=i=>{Vr=i},jv=()=>{try{let i=lh.prefix;if(typeof i!="string")throw new Error("Invalid prefix, not a string");return`${i}`}catch(i){return console.error("Error secure storage => prefix :",i),null}},Li=jv(),Kv=i=>{try{if(typeof i=="function"||typeof i=="symbol")throw new Error("Data must not be a function or symbol");return JSON.stringify({data:i,type:typeof i})}catch(e){return console.error("Error secure storage => modify data :",e),null}},Zv=i=>{try{if(typeof i!="string")throw new Error("Value must be string");let e=JSON.parse(i);if(typeof e!="object"||!Object.getOwnPropertyNames(e).includes("data")||!Object.getOwnPropertyNames(e).includes("type"))throw new Error("Invalid data scheme");let t=typeof e.data;if(e.type=t,t==="symbol"||t==="function")throw new Error("Invalid data type, does not supports function or symbol");return e}catch(e){return console.error("Error secure storage => get data :",e),null}},Qv=["local","session"],wp=i=>{if(typeof i!="string"||!Qv.includes(i))throw new Error("Store type must be one of [local, session]");if(typeof Vr!="object"||typeof Vr.localStorage!="object"||typeof Vr.sessionStorage!="object")throw new Error("Invalid window, please use only in browser")},fa=(i,e,t)=>{if(typeof i!="string")throw new Error("Prefix is invalid");if(typeof e!="string")throw new Error("Key must be string");wp(t)},Jv=i=>{try{let e=i.length;for(let t=0;t<e;t++){let n=i.key(t);n!=null&&n.startsWith(`${Li}.`)&&i.removeItem(n)}}catch(e){console.error("Error secure storage => matched-clear :",e)}},Ap=class{constructor(i){this.store="local",this.storage=Vr.localStorage,this.setItem=(e,t)=>{try{fa(Li,e,this.store);let n=Kv(t);if(typeof n!="string")return;let r=qv(n);if(typeof r!="string")return;let s=`${Li}.${e}`;this.storage.setItem(s,r)}catch(n){console.error("Error secure storage => setItem :",n)}},this.getItem=e=>{try{fa(Li,e,this.store);let t=`${Li}.${e}`,n=null;n=this.storage.getItem(t);let r=$v(n);if(typeof r!="string")return null;let s=Zv(r);return s?s.data:null}catch(t){return console.error("Error secure storage => setItem :",t),null}},this.removeItem=e=>{try{fa(Li,e,this.store);let t=`${Li}.${e}`;this.storage.removeItem(t)}catch(t){console.error("Error secure storage => removeItem :",t)}},this.clear=()=>{try{fa(Li,"",this.store),Jv(this.storage)}catch(e){console.error("Error secure storage => clear :",e)}},this.forceClear=()=>{try{fa(Li,"",this.store),this.storage.clear()}catch(e){console.error("Error secure storage => force-clear :",e)}};try{wp(i),this.store=i,i==="local"&&(this.storage=Vr.localStorage),i==="session"&&(this.storage=Vr.sessionStorage)}catch{}}};Yv(window);var Tp=new Ap("local");new Ap("session");Xv({prefix:"kg",secret:"knowledge-graph-v1"});function Va(i,e){try{if(typeof window>"u")return e;const t=Tp.getItem(i);return t==null||typeof t!=typeof e?e:t}catch{return e}}function Wl(i,e){try{if(typeof window>"u")return;Tp.setItem(i,e)}catch(t){console.warn(`[storage] Failed to write "${i}":`,t)}}function e_(i,e,t){const n=Va(i,e);return t.includes(n)?n:e}function t_(i,e,t,n){const r=Va(i,e);return typeof r!="number"||!isFinite(r)?e:Math.max(t,Math.min(n,r))}var n_=et('<div class="globe-ctrl-row svelte-179rzd6"><span class="globe-ctrl-label svelte-179rzd6">Auto Rotate</span> <div title="Toggle auto-rotation" role="switch" tabindex="0"></div></div> <div class="globe-ctrl-row svelte-179rzd6"><span class="globe-ctrl-label svelte-179rzd6">Wireframe</span> <div title="Toggle wireframe sphere" role="switch" tabindex="0"></div></div> <div class="globe-ctrl-row svelte-179rzd6"><span class="globe-ctrl-label svelte-179rzd6">Dot Sphere</span> <div title="Toggle particle dots" role="switch" tabindex="0"></div></div> <div class="globe-ctrl-row svelte-179rzd6"><span class="globe-ctrl-label svelte-179rzd6">Connections</span> <div title="Toggle connection lines" role="switch" tabindex="0"></div></div> <div class="globe-ctrl-row svelte-179rzd6"><span class="globe-ctrl-label svelte-179rzd6">Pulse</span> <div title="Toggle breathing pulse animation" role="switch" tabindex="0"></div></div> <div class="globe-ctrl-row svelte-179rzd6"><span class="globe-ctrl-label svelte-179rzd6">Comet Trail</span> <div title="Toggle comet trail effect when rotating with WASD" role="switch" tabindex="0"></div></div> <div class="globe-ctrl-row svelte-179rzd6"><span class="globe-ctrl-label svelte-179rzd6">Pulse Speed</span> <input type="range" class="globe-pulse-slider svelte-179rzd6" id="gc-pulse-speed" min="10" max="200" title="Pulse animation speed"/></div> <div class="globe-ctrl-row svelte-179rzd6"><span class="globe-ctrl-label svelte-179rzd6">Rotate Speed</span> <input type="range" class="globe-speed-slider svelte-179rzd6" id="gc-rotate-speed" min="5" max="200" title="Auto-rotation speed"/></div> <div class="divider svelte-179rzd6"></div> <div class="globe-ctrl-row zoom-row svelte-179rzd6"><div class="zoom-header svelte-179rzd6"><span class="globe-ctrl-label svelte-179rzd6">Zoom</span> <span class="globe-ctrl-label zoom-val svelte-179rzd6"> </span></div> <input type="range" class="globe-zoom-slider svelte-179rzd6" id="gc-zoom" min="10" max="100" title="Camera distance (zoom)"/></div> <div class="divider svelte-179rzd6"></div> <div class="globe-ctrl-row svelte-179rzd6" style="justify-content:center"><button class="detail-btn wasd-btn svelte-179rzd6" id="gc-wasd-guide" title="WASD Rotation Controls Guide">&#9000; WASD Controls</button></div>',1),i_=et('<div class="globe-ctrl-row fx-slider-row svelte-179rzd6"><div class="zoom-header svelte-179rzd6"><span class="globe-ctrl-label svelte-179rzd6">Border Glow</span> <span class="globe-ctrl-label zoom-val svelte-179rzd6"> </span></div> <input type="range" class="fx-density-slider svelte-179rzd6" min="20" max="200" title="Border glow intensity"/></div> <div class="globe-ctrl-row fx-slider-row svelte-179rzd6"><div class="zoom-header svelte-179rzd6"><span class="globe-ctrl-label svelte-179rzd6">Border Speed</span> <span class="globe-ctrl-label zoom-val svelte-179rzd6"> </span></div> <input type="range" class="fx-speed-slider svelte-179rzd6" min="25" max="300" title="Border animation speed"/></div>',1),r_=et('<div class="globe-ctrl-row svelte-179rzd6"><span class="globe-ctrl-label svelte-179rzd6">Embers</span> <div title="Toggle fire ember particles" role="switch" tabindex="0"></div></div>'),s_=et('<div class="globe-ctrl-row svelte-179rzd6"><span class="globe-ctrl-label svelte-179rzd6">Snowflakes</span> <div title="Toggle falling snowflakes" role="switch" tabindex="0"></div></div>'),a_=et('<div class="globe-ctrl-row svelte-179rzd6"><span class="globe-ctrl-label svelte-179rzd6">Nebula</span> <div title="Toggle nebula cloud layers" role="switch" tabindex="0"></div></div> <div class="globe-ctrl-row svelte-179rzd6"><span class="globe-ctrl-label svelte-179rzd6">Glitter</span> <div title="Toggle glitter sparkle effect" role="switch" tabindex="0"></div></div> <div class="globe-ctrl-row svelte-179rzd6"><span class="globe-ctrl-label svelte-179rzd6">Comets</span> <div title="Toggle shooting star comets" role="switch" tabindex="0"></div></div>',1),o_=et('<div class="globe-ctrl-row svelte-179rzd6"><span class="globe-ctrl-label svelte-179rzd6">Lightning</span> <div title="Toggle background lightning bolts" role="switch" tabindex="0"></div></div> <div class="globe-ctrl-row svelte-179rzd6"><span class="globe-ctrl-label svelte-179rzd6">Globe Arcs</span> <div title="Toggle electric arcs around the globe" role="switch" tabindex="0"></div></div> <div class="globe-ctrl-row svelte-179rzd6"><span class="globe-ctrl-label svelte-179rzd6">Plasma Aura</span> <div title="Toggle plasma glow aura around globe" role="switch" tabindex="0"></div></div>',1),l_=et('<div class="globe-ctrl-row fx-slider-row svelte-179rzd6"><div class="zoom-header svelte-179rzd6"><span class="globe-ctrl-label svelte-179rzd6">Density</span> <span class="globe-ctrl-label zoom-val svelte-179rzd6"> </span></div> <input type="range" class="fx-density-slider svelte-179rzd6" min="10" max="200" title="Particle density (10% = sparse, 200% = dense)"/></div> <div class="globe-ctrl-row fx-slider-row svelte-179rzd6"><div class="zoom-header svelte-179rzd6"><span class="globe-ctrl-label svelte-179rzd6">Speed</span> <span class="globe-ctrl-label zoom-val svelte-179rzd6"> </span></div> <input type="range" class="fx-speed-slider svelte-179rzd6" min="25" max="300" title="Effect speed (25% = slow-mo, 300% = fast)"/></div>',1),c_=et('<div class="globe-ctrl-row svelte-179rzd6"><span class="globe-ctrl-label svelte-179rzd6">BG Stars</span> <div title="Toggle background star particles" role="switch" tabindex="0"></div></div> <div class="globe-ctrl-row svelte-179rzd6"><span class="globe-ctrl-label svelte-179rzd6">BG Mesh</span> <div title="Toggle background mesh grid" role="switch" tabindex="0"></div></div> <div class="globe-ctrl-row svelte-179rzd6"><span class="globe-ctrl-label svelte-179rzd6">Border FX</span> <div title="Toggle magic border glow effect" role="switch" tabindex="0"></div></div> <!> <div class="divider svelte-179rzd6"></div> <!> <!> <!> <!> <!>',1),u_=et('<div class="panel svelte-179rzd6" id="globe-controls"><div class="panel-title section-header svelte-179rzd6"><span>Globe Controls</span> <span></span></div> <!> <div class="divider svelte-179rzd6"></div>  <div class="panel-title fx-title section-header svelte-179rzd6"><span>Theme Effects</span> <span></span></div> <!></div> <!>',1);function h_(i,e){jt(e,!0);let t=Le(!0),n=Le(!0),r=Le(!0),s=Le(!0),a=Le(!0),o=Le(!0),l=Le(60),c=Le(35),u=Le(55),f=Le(!1),h=Le(Lt(Va("ui.globeOpen",!0))),m=Le(Lt(Va("ui.fxOpen",!0)));function x(){Se(h,!L(h)),Wl("ui.globeOpen",L(h))}function v(){Se(m,!L(m)),Wl("ui.fxOpen",L(m))}let d=Le("dark"),p=Le(100),_=Le(100),g=Le(!0),b=Le(!0),w=Le(!0),S=Le(!0),M=Le(!0),I=Le(!0),E=Le(!0),y=Le(!0),P=Le(!0),U=Le(!0),G=Le(!0),F=Le(100),z=Le(100);wt(()=>{const me=Ga.subscribe(Re=>{Se(t,Re,!0)}),k=Nl.subscribe(Re=>{Se(n,Re,!0)}),ye=Ol.subscribe(Re=>{Se(r,Re,!0)}),Be=zl.subscribe(Re=>{Se(s,Re,!0)}),Pe=Hl.subscribe(Re=>{Se(a,Re,!0)}),ge=ea.subscribe(Re=>{Se(o,Re,!0)}),H=Gl.subscribe(Re=>{Se(l,Math.round(Re*100),!0)}),Ee=Vl.subscribe(Re=>{Se(c,Math.round(Re*100),!0)}),we=Mu.subscribe(Re=>{Se(u,Re,!0)}),Ue=Wi.subscribe(Re=>{Se(d,Re,!0)}),Ne=kl.subscribe(Re=>{Se(p,Math.round(Re*100),!0)}),$e=Ul.subscribe(Re=>{Se(_,Math.round(Re*100),!0)}),Ye=Ma.subscribe(Re=>{Se(g,Re,!0)}),mt=wa.subscribe(Re=>{Se(b,Re,!0)}),vt=Aa.subscribe(Re=>{Se(w,Re,!0)}),Qe=Ta.subscribe(Re=>{Se(S,Re,!0)}),yt=Ca.subscribe(Re=>{Se(M,Re,!0)}),xt=Ra.subscribe(Re=>{Se(y,Re,!0)}),Gt=Da.subscribe(Re=>{Se(P,Re,!0)}),In=Pa.subscribe(Re=>{Se(U,Re,!0)}),Tn=La.subscribe(Re=>{Se(I,Re,!0)}),wi=Fa.subscribe(Re=>{Se(E,Re,!0)}),Kn=Is.subscribe(Re=>{Se(G,Re,!0)}),tt=za.subscribe(Re=>{Se(F,Math.round(Re*100),!0)}),_t=Ha.subscribe(Re=>{Se(z,Math.round(Re*100),!0)});return()=>{me(),k(),ye(),Be(),Pe(),ge(),H(),Ee(),we(),Ue(),Ne(),$e(),Ye(),mt(),vt(),Qe(),yt(),Tn(),wi(),Kn(),tt(),_t(),xt(),Gt(),In()}});let q=Je(()=>Math.round(L(u)*100/55)+"%");function ee(){Ga.update(me=>!me)}function Z(){Nl.update(me=>!me)}function Q(){Ol.update(me=>!me)}function j(){zl.update(me=>!me)}function W(){Hl.update(me=>!me)}function C(){ea.update(me=>!me)}function A(me){const k=parseInt(me.target.value,10);Se(l,k,!0),Gl.set(k/100)}function R(me){const k=parseInt(me.target.value,10);Se(c,k,!0),Vl.set(k/100)}function N(me){const k=parseInt(me.target.value,10);Se(u,k,!0),Mu.set(k)}function $(){Se(f,!0)}function he(){Se(f,!1)}function J(){C()}let se=Je(()=>L(p)+"%"),V=Je(()=>L(_)+"%"),ie=Je(()=>L(d)==="fire"),O=Je(()=>L(d)==="winter"),le=Je(()=>L(d)==="galaxy"),ce=Je(()=>L(d)==="electric"),ve=Je(()=>L(ie)||L(O)||L(le)||L(ce));function _e(me){const k=parseInt(me.target.value,10);kl.set(k/100)}function He(me){const k=parseInt(me.target.value,10);Ul.set(k/100)}let Ie=Je(()=>L(F)+"%"),B=Je(()=>L(z)+"%");function T(me){const k=parseInt(me.target.value,10);za.set(k/100)}function K(me){const k=parseInt(me.target.value,10);Ha.set(k/100)}var de=u_(),fe=an(de),pe=ue(fe),ke=ae(ue(pe),2);let Ae;var Fe=ae(pe,2);{var Ge=me=>{var k=n_(),ye=an(k),Be=ae(ue(ye),2);let Pe;var ge=ae(ye,2),H=ae(ue(ge),2);let Ee;var we=ae(ge,2),Ue=ae(ue(we),2);let Ne;var $e=ae(we,2),Ye=ae(ue($e),2);let mt;var vt=ae($e,2),Qe=ae(ue(vt),2);let yt;var xt=ae(vt,2),Gt=ae(ue(xt),2);let In;var Tn=ae(xt,2),wi=ae(ue(Tn),2),Kn=ae(Tn,2),tt=ae(ue(Kn),2),_t=ae(Kn,4),Re=ue(_t),Rt=ae(ue(Re),2),Ot=ue(Rt),D=ae(Re,2),Y=ae(_t,4),re=ue(Y);St(()=>{Pe=je(Be,1,"globe-toggle svelte-179rzd6",null,Pe,{on:L(t)}),Pt(Be,"aria-checked",L(t)),Ee=je(H,1,"globe-toggle svelte-179rzd6",null,Ee,{on:L(n)}),Pt(H,"aria-checked",L(n)),Ne=je(Ue,1,"globe-toggle svelte-179rzd6",null,Ne,{on:L(r)}),Pt(Ue,"aria-checked",L(r)),mt=je(Ye,1,"globe-toggle svelte-179rzd6",null,mt,{on:L(s)}),Pt(Ye,"aria-checked",L(s)),yt=je(Qe,1,"globe-toggle svelte-179rzd6",null,yt,{on:L(a)}),Pt(Qe,"aria-checked",L(a)),In=je(Gt,1,"globe-toggle svelte-179rzd6",null,In,{on:L(o)}),Pt(Gt,"aria-checked",L(o)),ii(wi,L(l)),ii(tt,L(c)),pt(Ot,L(q)),ii(D,L(u))}),De("click",Be,ee),De("keydown",Be,te=>te.key==="Enter"&&ee()),De("click",H,Z),De("keydown",H,te=>te.key==="Enter"&&Z()),De("click",Ue,Q),De("keydown",Ue,te=>te.key==="Enter"&&Q()),De("click",Ye,j),De("keydown",Ye,te=>te.key==="Enter"&&j()),De("click",Qe,W),De("keydown",Qe,te=>te.key==="Enter"&&W()),De("click",Gt,C),De("keydown",Gt,te=>te.key==="Enter"&&C()),De("input",wi,A),De("input",tt,R),De("input",D,N),De("click",re,$),Ke(me,k)};rn(Fe,me=>{L(h)&&me(Ge)})}var Xe=ae(Fe,4),be=ae(ue(Xe),2);let it;var qe=ae(Xe,2);{var We=me=>{var k=c_(),ye=an(k),Be=ae(ue(ye),2);let Pe;var ge=ae(ye,2),H=ae(ue(ge),2);let Ee;var we=ae(ge,2),Ue=ae(ue(we),2);let Ne;var $e=ae(we,2);{var Ye=tt=>{var _t=i_(),Re=an(_t),Rt=ue(Re),Ot=ae(ue(Rt),2),D=ue(Ot),Y=ae(Rt,2),re=ae(Re,2),te=ue(re),ne=ae(ue(te),2),Ce=ue(ne),Me=ae(te,2);St(()=>{pt(D,L(Ie)),ii(Y,L(F)),pt(Ce,L(B)),ii(Me,L(z))}),De("input",Y,T),De("input",Me,K),Ke(tt,_t)};rn($e,tt=>{L(G)&&tt(Ye)})}var mt=ae($e,4);{var vt=tt=>{var _t=r_(),Re=ae(ue(_t),2);let Rt;St(()=>{Rt=je(Re,1,"globe-toggle svelte-179rzd6",null,Rt,{on:L(S)}),Pt(Re,"aria-checked",L(S))}),De("click",Re,()=>Ta.update(Ot=>!Ot)),De("keydown",Re,Ot=>Ot.key==="Enter"&&Ta.update(D=>!D)),Ke(tt,_t)};rn(mt,tt=>{L(ie)&&tt(vt)})}var Qe=ae(mt,2);{var yt=tt=>{var _t=s_(),Re=ae(ue(_t),2);let Rt;St(()=>{Rt=je(Re,1,"globe-toggle svelte-179rzd6",null,Rt,{on:L(M)}),Pt(Re,"aria-checked",L(M))}),De("click",Re,()=>Ca.update(Ot=>!Ot)),De("keydown",Re,Ot=>Ot.key==="Enter"&&Ca.update(D=>!D)),Ke(tt,_t)};rn(Qe,tt=>{L(O)&&tt(yt)})}var xt=ae(Qe,2);{var Gt=tt=>{var _t=a_(),Re=an(_t),Rt=ae(ue(Re),2);let Ot;var D=ae(Re,2),Y=ae(ue(D),2);let re;var te=ae(D,2),ne=ae(ue(te),2);let Ce;St(()=>{Ot=je(Rt,1,"globe-toggle svelte-179rzd6",null,Ot,{on:L(g)}),Pt(Rt,"aria-checked",L(g)),re=je(Y,1,"globe-toggle svelte-179rzd6",null,re,{on:L(b)}),Pt(Y,"aria-checked",L(b)),Ce=je(ne,1,"globe-toggle svelte-179rzd6",null,Ce,{on:L(w)}),Pt(ne,"aria-checked",L(w))}),De("click",Rt,()=>Ma.update(Me=>!Me)),De("keydown",Rt,Me=>Me.key==="Enter"&&Ma.update(Oe=>!Oe)),De("click",Y,()=>wa.update(Me=>!Me)),De("keydown",Y,Me=>Me.key==="Enter"&&wa.update(Oe=>!Oe)),De("click",ne,()=>Aa.update(Me=>!Me)),De("keydown",ne,Me=>Me.key==="Enter"&&Aa.update(Oe=>!Oe)),Ke(tt,_t)};rn(xt,tt=>{L(le)&&tt(Gt)})}var In=ae(xt,2);{var Tn=tt=>{var _t=o_(),Re=an(_t),Rt=ae(ue(Re),2);let Ot;var D=ae(Re,2),Y=ae(ue(D),2);let re;var te=ae(D,2),ne=ae(ue(te),2);let Ce;St(()=>{Ot=je(Rt,1,"globe-toggle svelte-179rzd6",null,Ot,{on:L(y)}),Pt(Rt,"aria-checked",L(y)),re=je(Y,1,"globe-toggle svelte-179rzd6",null,re,{on:L(P)}),Pt(Y,"aria-checked",L(P)),Ce=je(ne,1,"globe-toggle svelte-179rzd6",null,Ce,{on:L(U)}),Pt(ne,"aria-checked",L(U))}),De("click",Rt,()=>Ra.update(Me=>!Me)),De("keydown",Rt,Me=>Me.key==="Enter"&&Ra.update(Oe=>!Oe)),De("click",Y,()=>Da.update(Me=>!Me)),De("keydown",Y,Me=>Me.key==="Enter"&&Da.update(Oe=>!Oe)),De("click",ne,()=>Pa.update(Me=>!Me)),De("keydown",ne,Me=>Me.key==="Enter"&&Pa.update(Oe=>!Oe)),Ke(tt,_t)};rn(In,tt=>{L(ce)&&tt(Tn)})}var wi=ae(In,2);{var Kn=tt=>{var _t=l_(),Re=an(_t),Rt=ue(Re),Ot=ae(ue(Rt),2),D=ue(Ot),Y=ae(Rt,2),re=ae(Re,2),te=ue(re),ne=ae(ue(te),2),Ce=ue(ne),Me=ae(te,2);St(()=>{pt(D,L(se)),ii(Y,L(p)),pt(Ce,L(V)),ii(Me,L(_))}),De("input",Y,_e),De("input",Me,He),Ke(tt,_t)};rn(wi,tt=>{L(ve)&&tt(Kn)})}St(()=>{Pe=je(Be,1,"globe-toggle svelte-179rzd6",null,Pe,{on:L(I)}),Pt(Be,"aria-checked",L(I)),Ee=je(H,1,"globe-toggle svelte-179rzd6",null,Ee,{on:L(E)}),Pt(H,"aria-checked",L(E)),Ne=je(Ue,1,"globe-toggle svelte-179rzd6",null,Ne,{on:L(G)}),Pt(Ue,"aria-checked",L(G))}),De("click",Be,()=>La.update(tt=>!tt)),De("keydown",Be,tt=>tt.key==="Enter"&&La.update(_t=>!_t)),De("click",H,()=>Fa.update(tt=>!tt)),De("keydown",H,tt=>tt.key==="Enter"&&Fa.update(_t=>!_t)),De("click",Ue,()=>Is.update(tt=>!tt)),De("keydown",Ue,tt=>tt.key==="Enter"&&Is.update(_t=>!_t)),Ke(me,k)};rn(qe,me=>{L(m)&&me(We)})}var ze=ae(fe,2);yp(ze,{get visible(){return L(f)},get cometEnabled(){return L(o)},onclose:he,oncometToggle:J}),St(()=>{Ae=je(ke,1,"chevron svelte-179rzd6",null,Ae,{open:L(h)}),it=je(be,1,"chevron svelte-179rzd6",null,it,{open:L(m)})}),De("click",pe,x),De("click",Xe,v),Ke(i,de),Kt()}hi(["click","keydown","input"]);var f_=et('<div role="button" tabindex="0"><div class="legend-dot svelte-cydj63"></div> <span> </span> <span class="legend-count svelte-cydj63"> </span></div>'),d_=et('<div class="panel svelte-cydj63" id="legend"><div class="panel-title svelte-cydj63">Categories</div> <!></div>');function p_(i,e){jt(e,!0);let t=Le(Lt([])),n=Le(Lt(new Set(Object.keys(Bt))));wt(()=>ci.subscribe(c=>{Se(t,c,!0)})),wt(()=>Su.subscribe(c=>{Se(n,c,!0)}));function r(l){return L(t).filter(c=>c.cat===l).length}function s(l){Su.update(c=>{const u=new Set(c);return u.has(l)?u.delete(l):u.add(l),u})}var a=d_(),o=ae(ue(a),2);Js(o,17,()=>Object.entries(Bt),Qs,(l,c)=>{var u=Je(()=>Rm(L(c),2));let f=()=>L(u)[0],h=()=>L(u)[1];var m=f_();let x;var v=ue(m),d=ae(v,2),p=ue(d),_=ae(d,2),g=ue(_);St((b,w)=>{x=je(m,1,"legend-item svelte-cydj63",null,x,b),yi(v,`background:${h().color??""};box-shadow:0 0 5px ${h().color??""}`),pt(p,h().label),pt(g,w)},[()=>({dimmed:!L(n).has(f())}),()=>r(f())]),De("click",m,()=>s(f())),De("keydown",m,b=>b.key==="Enter"&&s(f())),Ke(l,m)}),Ke(i,a),Kt()}hi(["click","keydown"]);var m_=et('<div class="panel svelte-1tag4vz" id="stats"><div class="panel-title svelte-1tag4vz">Graph Stats</div> <div class="stat-row svelte-1tag4vz"><span class="stat-label svelte-1tag4vz">Documents</span> <span class="stat-value svelte-1tag4vz"> </span></div> <div class="stat-row svelte-1tag4vz"><span class="stat-label svelte-1tag4vz">Connections</span> <span class="stat-value svelte-1tag4vz"> </span></div> <div class="stat-row svelte-1tag4vz"><span class="stat-label svelte-1tag4vz">Hub Nodes (5+)</span> <span class="stat-value svelte-1tag4vz"> </span></div> <div class="stat-row svelte-1tag4vz"><span class="stat-label svelte-1tag4vz">Orphan Nodes</span> <span class="stat-value orphan svelte-1tag4vz"> </span></div> <div class="divider svelte-1tag4vz"></div> <div class="stat-row svelte-1tag4vz"><span class="stat-label svelte-1tag4vz">Most Connected</span> <span class="stat-value top svelte-1tag4vz"> </span></div></div>');function x_(i,e){jt(e,!0);let t=Le(Lt([])),n=Le(Lt([]));wt(()=>{const E=ci.subscribe(P=>{Se(t,P,!0)}),y=gr.subscribe(P=>{Se(n,P,!0)});return()=>{E(),y()}});let r=Je(()=>L(t).length),s=Je(()=>L(n).length),a=Je(()=>L(t).filter(E=>(E.refs??0)>=5).length),o=Je(()=>L(t).filter(E=>(E.refs??0)===0).length),l=Je(()=>L(t).length>0?L(t).reduce((E,y)=>(E.refs??0)>(y.refs??0)?E:y,L(t)[0]):null);var c=m_(),u=ae(ue(c),2),f=ae(ue(u),2),h=ue(f),m=ae(u,2),x=ae(ue(m),2),v=ue(x),d=ae(m,2),p=ae(ue(d),2),_=ue(p),g=ae(d,2),b=ae(ue(g),2),w=ue(b),S=ae(g,4),M=ae(ue(S),2),I=ue(M);St(()=>{pt(h,L(r)),pt(v,L(s)),pt(_,L(a)),pt(w,L(o)),pt(I,L(l)?L(l).label:"—")}),Ke(i,c),Kt()}const Cp="kg-preview-width",g_=80;function v_(){try{const i=localStorage.getItem(Cp);if(i!==null){const e=parseInt(i,10);if(!isNaN(e))return e}}catch{}return g_}const ch=ot(!1),uh=ot(null),Au=ot(v_()),Dl=ot("");Au.subscribe(i=>{try{localStorage.setItem(Cp,String(i))}catch{}});function Rp(i){uh.set(i),Dl.set(""),ch.set(!0)}function ho(){ch.set(!1),uh.set(null)}function Tu(i,e){const t=new Set;return e.forEach(n=>{const r=typeof n.source=="string"?n.source:n.source.id,s=typeof n.target=="string"?n.target:n.target.id;r===i&&t.add(s),s===i&&t.add(r)}),t}function __(i,e,t,n){const r={};t.forEach(o=>{r[o.id]=[]}),n.forEach(o=>{const l=typeof o.source=="string"?o.source:o.source.id,c=typeof o.target=="string"?o.target:o.target.id;r[l].push(c),r[c].push(l)});const s=new Set([i]),a=[[i]];for(;a.length;){const o=a.shift(),l=o[o.length-1];if(l===e)return o;for(const c of r[l]||[])s.has(c)||(s.add(c),a.push([...o,c]))}return null}var b_=et('<button class="detail-btn preview-btn svelte-2h78l7">Preview MD</button>'),y_=et('<span class="detail-keyword svelte-2h78l7"> </span>'),E_=et('<span class="none-label svelte-2h78l7">None</span>'),S_=et('<span class="none-label svelte-2h78l7">Orphan node — no connections</span>'),M_=et('<div class="detail-link-item svelte-2h78l7" role="button" tabindex="0"><div class="detail-link-dot svelte-2h78l7"></div> </div>'),w_=et('<div class="detail-title svelte-2h78l7"> </div> <div class="detail-cat svelte-2h78l7"> </div> <div class="detail-desc svelte-2h78l7"> </div> <div id="d-actions"><button class="detail-btn svelte-2h78l7">Focus</button> <button class="detail-btn svelte-2h78l7">Impact Analysis</button> <button class="detail-btn svelte-2h78l7">Path From Here</button> <!></div> <div class="detail-section svelte-2h78l7">Keywords</div> <div id="d-keywords"><!></div> <div class="detail-section svelte-2h78l7">Connections</div> <div id="d-connections"><!></div>',1),A_=et('<div id="detail"><div class="panel-title svelte-2h78l7">Document Detail</div> <!></div>');function T_(i,e){jt(e,!0);let t=Le(null),n=Le(Lt([])),r=Le(Lt([]));wt(()=>Ni.subscribe(p=>{Se(t,p,!0)})),wt(()=>{const d=ci.subscribe(_=>{Se(n,_,!0)}),p=gr.subscribe(_=>{Se(r,_,!0)});return()=>{d(),p()}});let s=Je(()=>L(t)?L(n).find(d=>d.id===L(t))??null:null),a=Je(()=>L(s)!==null),o=Je(()=>L(s)?Bt[L(s).cat]??Bt.meta:null),l=Je(()=>L(s)?Array.from(Tu(L(s).id,L(r))).map(d=>L(n).find(p=>p.id===d)).filter(d=>!!d):[]);function c(d){Ni.set(d.id)}function u(){L(s)&&sr.set("impact")}function f(){L(s)&&sr.set("path")}var h=A_();let m;var x=ae(ue(h),2);{var v=d=>{var p=w_(),_=an(p),g=ue(_),b=ae(_,2),w=ue(b),S=ae(b,2),M=ue(S),I=ae(S,2),E=ue(I),y=ae(E,2),P=ae(y,2),U=ae(P,2);{var G=C=>{var A=b_();De("click",A,()=>Rp(L(s))),Ke(C,A)};rn(U,C=>{L(s).preview&&C(G)})}var F=ae(I,4),z=ue(F);{var q=C=>{var A=zh(),R=an(A);Js(R,17,()=>L(s).keywords??[],Qs,(N,$)=>{var he=y_(),J=ue(he);St(()=>pt(J,L($))),Ke(N,he)}),Ke(C,A)},ee=C=>{var A=E_();Ke(C,A)};rn(z,C=>{(L(s).keywords??[]).length>0?C(q):C(ee,-1)})}var Z=ae(F,4),Q=ue(Z);{var j=C=>{var A=S_();Ke(C,A)},W=C=>{var A=zh(),R=an(A);Js(R,17,()=>L(l),Qs,(N,$)=>{const he=Je(()=>Bt[L($).cat]??Bt.meta);var J=M_(),se=ue(J),V=ae(se);St(()=>{yi(se,`background:${L(he).color??""};box-shadow:0 0 4px ${L(he).color??""}`),pt(V,` ${L($).label??""}`)}),De("click",J,()=>c(L($))),De("keydown",J,ie=>ie.key==="Enter"&&c(L($))),Ke(N,J)}),Ke(C,A)};rn(Q,C=>{L(l).length===0?C(j):C(W,-1)})}St(()=>{pt(g,L(s).label),yi(b,`color:${L(o).color??""}`),pt(w,`${L(o).label??""} — ${L(s).file??""??""}`),pt(M,L(s).desc??"No description")}),De("click",E,()=>window.open(`vscode://file${L(s).file??""}`,"_self")),De("click",y,u),De("click",P,f),Ke(d,p)};rn(x,d=>{L(s)&&L(o)&&d(v)})}St(()=>m=je(h,1,"panel svelte-2h78l7",null,m,{show:L(a)})),Ke(i,h),Kt()}hi(["click","keydown"]);var C_=et('<span class="path-arrow svelte-1f9fclp">→</span>'),R_=et('<span class="path-node svelte-1f9fclp" role="button" tabindex="0"> </span> <!>',1),D_=et('<div id="path-panel"><div class="panel-title svelte-1f9fclp">Shortest Path</div> <div id="path-content"> </div> <div class="path-nodes svelte-1f9fclp" id="path-nodes"></div></div>');function P_(i,e){jt(e,!0);let t=Le("explore"),n=Le(Lt([])),r=Le(Lt([])),s=Le(Lt([]));wt(()=>sr.subscribe(_=>{Se(t,_,!0)})),wt(()=>Il.subscribe(_=>{Se(n,_,!0)})),wt(()=>{const p=ci.subscribe(g=>{Se(r,g,!0)}),_=gr.subscribe(g=>{Se(s,g,!0)});return()=>{p(),_()}});let a=Je(()=>L(t)==="path"),o=Je(()=>L(n).length===2?__(L(n)[0],L(n)[1],L(r),L(s)):null),l=Je(()=>()=>{if(L(n).length===0)return"Click START node";if(L(n).length===1){const p=L(r).find(_=>_.id===L(n)[0]);return`Start: ${p?p.label:L(n)[0]} → Click END node`}return L(o)===null?"No path found!":`${L(o).length} nodes, ${L(o).length-1} hops`}),c=Je(()=>L(n).length===2&&L(o)===null),u=Je(()=>()=>L(o)?L(o).map(p=>{const _=L(r).find(b=>b.id===p),g=Bt[(_==null?void 0:_.cat)??"meta"]??Bt.meta;return{node:_,color:g.color}}).filter(p=>p.node!=null):[]);function f(p){Ni.set(p.id)}var h=D_();let m;var x=ae(ue(h),2),v=ue(x),d=ae(x,2);Js(d,21,()=>L(u)(),Qs,(p,_,g)=>{var b=R_(),w=an(b),S=ue(w),M=ae(w,2);{var I=y=>{var P=C_();Ke(y,P)},E=Je(()=>g<L(u)().length-1);rn(M,y=>{L(E)&&y(I)})}St(()=>{yi(w,`background:${L(_).color??""}20;border:1px solid ${L(_).color??""};color:${L(_).color??""};cursor:pointer`),pt(S,L(_).node.label)}),De("click",w,()=>f(L(_).node)),De("keydown",w,y=>y.key==="Enter"&&f(L(_).node)),Ke(p,b)}),St(p=>{m=je(h,1,"panel svelte-1f9fclp",null,m,{show:L(a)}),yi(x,`font-size:11px;color:${L(c)?"var(--red)":"var(--text-dim)"}`),pt(v,p)},[()=>L(l)()]),Ke(i,h),Kt()}hi(["click","keydown"]);function L_(i,e){const t=i.toLowerCase().trim();if(!t)return[];const n=[];return e.forEach(r=>{const s={label:(r.label||"").toLowerCase(),id:(r.id||"").toLowerCase(),desc:(r.desc||"").toLowerCase(),keywords:(r.keywords||[]).join(" ").toLowerCase(),file:(r.file||"").toLowerCase()};let a=0;s.label===t?a+=100:s.label.includes(t)&&(a+=60),s.id.includes(t)&&(a+=40),s.keywords.includes(t)&&(a+=30),s.file.includes(t)&&(a+=20),s.desc.includes(t)&&(a+=10),a>0&&n.push({node:r,score:a})}),n.sort((r,s)=>s.score-r.score),n}const Ba=ot(""),Dp=bp([Ba,ci],([i,e])=>L_(i,e)),Sc=bp(Dp,i=>i.length===0?null:new Set(i.map(e=>e.node.id)));var F_=et('<span> </span> <span class="search-results-count svelte-4vxquv"> </span>',1),B_=et('<span>Results</span> <span class="search-results-count svelte-4vxquv"> </span>',1),I_=et('<tr class="svelte-4vxquv"><td class="sr-no svelte-4vxquv"></td><td class="sr-name svelte-4vxquv"> </td><td class="sr-path svelte-4vxquv"> </td><td class="sr-score svelte-4vxquv"> </td><td class="sr-bar svelte-4vxquv"><div class="sr-bar-fill"></div></td><td class="sr-view svelte-4vxquv"><button>&#9686;</button></td></tr>'),k_=et('<table class="svelte-4vxquv"><thead><tr class="svelte-4vxquv"><th class="sr-no svelte-4vxquv">#</th><th class="svelte-4vxquv">Name</th><th class="svelte-4vxquv">Path</th><th style="text-align:right" class="svelte-4vxquv">Match</th><th class="svelte-4vxquv"></th><th class="sr-view svelte-4vxquv"></th></tr></thead><tbody></tbody></table>'),U_=et('<div class="search-results-header svelte-4vxquv"><!></div> <!>',1),N_=et('<div id="search-results"><!></div>');function O_(i,e){jt(e,!0);let t=Le(Lt([])),n=Le(Lt([])),r=Le("");wt(()=>{const p=Dp.subscribe(b=>{Se(t,b,!0)}),_=ci.subscribe(b=>{Se(n,b,!0)}),g=Ba.subscribe(b=>{Se(r,b,!0)});return()=>{p(),_(),g()}});let s=Le(!1),a=null;wt(()=>{const p=L(r);if(L(t),a!==null&&(clearTimeout(a),a=null),!p.trim()){Se(s,!1);return}Se(s,!1),a=setTimeout(()=>{Se(s,!0),a=null,setTimeout(()=>{document.querySelectorAll(".sr-bar-fill[data-pct]").forEach(g=>{g.style.width=(g.dataset.pct??"0")+"%"})},50)},800)});let o=Je(()=>L(t).length>0?L(t)[0].score:1);function l(p){return Math.round(p/L(o)*100)}function c(p){return p>=80?"var(--green)":p>=50?"var(--yellow)":p>=30?"var(--orange)":"var(--text-dim)"}function u(p,_){if(p.target.closest(".sr-view-btn"))return;const g=L(n).find(b=>b.id===_);g&&(Ni.set(_),document.dispatchEvent(new CustomEvent("kg:flyto",{detail:{nodeId:_,node:g}})))}function f(p,_){p.stopPropagation();const g=L(n).find(b=>b.id===_);g!=null&&g.preview&&Rp(g)}var h=N_();let m;var x=ue(h);{var v=p=>{var _=U_(),g=an(_),b=ue(g);{var w=E=>{var y=F_(),P=an(y),U=ue(P),G=ae(P,2),F=ue(G);St(()=>{pt(U,`No results for "${L(r)??""}"`),pt(F,`0 / ${L(n).length??""}`)}),Ke(E,y)},S=E=>{var y=B_(),P=ae(an(y),2),U=ue(P);St(()=>pt(U,`${L(t).length??""} / ${L(n).length??""} documents`)),Ke(E,y)};rn(b,E=>{L(t).length===0?E(w):E(S,-1)})}var M=ae(g,2);{var I=E=>{var y=k_(),P=ae(ue(y));Js(P,21,()=>L(t),Qs,(U,G,F)=>{const z=Je(()=>L(G).node),q=Je(()=>Bt[L(z).cat]??Bt.meta),ee=Je(()=>l(L(G).score)),Z=Je(()=>c(L(ee))),Q=Je(()=>!!L(z).preview);var j=I_(),W=ue(j);W.textContent=F+1;var C=ae(W),A=ue(C),R=ae(C),N=ue(R),$=ae(R),he=ue($),J=ae($),se=ue(J),V=ae(J),ie=ue(V);let O;St(()=>{Pt(j,"data-node-id",L(z).id),yi(C,`color:${L(q).color??""}`),Pt(C,"title",L(z).label),pt(A,L(z).label),Pt(R,"title",L(z).file??""),pt(N,L(z).file??""),yi($,`color:${L(Z)??""}`),pt(he,`${L(ee)??""}%`),yi(se,`width:0%;background:${L(Z)??""}`),Pt(se,"data-pct",L(ee)),O=je(ie,1,"sr-view-btn svelte-4vxquv",null,O,{disabled:!L(Q)}),Pt(ie,"data-node-id",L(z).id),Pt(ie,"title",L(Q)?"View document":"No preview")}),De("click",j,le=>u(le,L(z).id)),De("click",ie,le=>f(le,L(z).id)),Ke(U,j)}),Ke(E,y)};rn(M,E=>{L(t).length>0&&E(I)})}Ke(p,_)},d=Je(()=>L(r).trim());rn(x,p=>{L(d)&&p(v)})}St(()=>m=je(h,1,"search-results svelte-4vxquv",null,m,{show:L(s)})),Ke(i,h),Kt()}hi(["click"]);var z_=et('<div id="search-box" class="svelte-7cby1y"><div id="search-wrap" class="svelte-7cby1y"><input type="text" id="search-input" placeholder="Search... (Kafka, SLA, order, pnpm)" class="svelte-7cby1y"/> <button id="search-clear" title="Clear search">&times;</button></div> <!></div>');function H_(i,e){jt(e,!0);let t=Le("");wt(()=>Ba.subscribe(h=>{Se(t,h,!0)}));function n(f){const h=f.target.value;Se(t,h,!0),Ba.set(h)}function r(){Se(t,""),Ba.set("")}var s=z_(),a=ue(s),o=ue(a),l=ae(o,2);let c;var u=ae(a,2);O_(u,{}),St(()=>{ii(o,L(t)),c=je(l,1,"svelte-7cby1y",null,c,{show:L(t).length>0})}),De("input",o,n),De("click",l,r),Ke(i,s),Kt()}hi(["input","click"]);/**
 * @license
 * Copyright 2010-2023 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const hh="160",ls={ROTATE:0,DOLLY:1,PAN:2},cs={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},G_=0,z0=1,V_=2,Pp=1,W_=2,Fi=3,vr=0,Mn=1,ki=2,dr=0,ks=1,ri=2,H0=3,G0=4,X_=5,Pr=100,q_=101,$_=102,V0=103,W0=104,Y_=200,j_=201,K_=202,Z_=203,Cu=204,Ru=205,Q_=206,J_=207,e1=208,t1=209,n1=210,i1=211,r1=212,s1=213,a1=214,o1=0,l1=1,c1=2,Xl=3,u1=4,h1=5,f1=6,d1=7,Lp=0,p1=1,m1=2,pr=0,x1=1,g1=2,v1=3,_1=4,b1=5,y1=6,Fp=300,ta=301,na=302,Du=303,Pu=304,cc=306,Lu=1e3,si=1001,Fu=1002,gn=1003,X0=1004,Mc=1005,Gn=1006,E1=1007,Wa=1008,mr=1009,S1=1010,M1=1011,fh=1012,Bp=1013,ar=1014,or=1015,Xa=1016,Ip=1017,kp=1018,Wr=1020,w1=1021,ai=1023,A1=1024,T1=1025,Xr=1026,ia=1027,C1=1028,Up=1029,R1=1030,Np=1031,Op=1033,wc=33776,Ac=33777,Tc=33778,Cc=33779,q0=35840,$0=35841,Y0=35842,j0=35843,zp=36196,K0=37492,Z0=37496,Q0=37808,J0=37809,ef=37810,tf=37811,nf=37812,rf=37813,sf=37814,af=37815,of=37816,lf=37817,cf=37818,uf=37819,hf=37820,ff=37821,Rc=36492,df=36494,pf=36495,D1=36283,mf=36284,xf=36285,gf=36286,Hp=3e3,qr=3001,P1=3200,L1=3201,F1=0,B1=1,Xn="",on="srgb",Xi="srgb-linear",dh="display-p3",uc="display-p3-linear",ql="linear",Dt="srgb",$l="rec709",Yl="p3",us=7680,vf=519,I1=512,k1=513,U1=514,Gp=515,N1=516,O1=517,z1=518,H1=519,Bu=35044,_f="300 es",Iu=1035,Oi=2e3,jl=2001;class rs{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const n=this._listeners;return n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const r=this._listeners[e];if(r!==void 0){const s=r.indexOf(t);s!==-1&&r.splice(s,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const n=this._listeners[e.type];if(n!==void 0){e.target=this;const r=n.slice(0);for(let s=0,a=r.length;s<a;s++)r[s].call(this,e);e.target=null}}}const fn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Pl=Math.PI/180,ku=180/Math.PI;function xr(){const i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(fn[i&255]+fn[i>>8&255]+fn[i>>16&255]+fn[i>>24&255]+"-"+fn[e&255]+fn[e>>8&255]+"-"+fn[e>>16&15|64]+fn[e>>24&255]+"-"+fn[t&63|128]+fn[t>>8&255]+"-"+fn[t>>16&255]+fn[t>>24&255]+fn[n&255]+fn[n>>8&255]+fn[n>>16&255]+fn[n>>24&255]).toLowerCase()}function vn(i,e,t){return Math.max(e,Math.min(t,i))}function G1(i,e){return(i%e+e)%e}function Dc(i,e,t){return(1-t)*i+t*e}function bf(i){return(i&i-1)===0&&i!==0}function Uu(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function Ui(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function Ct(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}const V1={DEG2RAD:Pl};class Ve{constructor(e=0,t=0){Ve.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6],this.y=r[1]*t+r[4]*n+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(vn(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),r=Math.sin(t),s=this.x-e.x,a=this.y-e.y;return this.x=s*n-a*r+e.x,this.y=s*r+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class ut{constructor(e,t,n,r,s,a,o,l,c){ut.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,r,s,a,o,l,c)}set(e,t,n,r,s,a,o,l,c){const u=this.elements;return u[0]=e,u[1]=r,u[2]=o,u[3]=t,u[4]=s,u[5]=l,u[6]=n,u[7]=a,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,r=t.elements,s=this.elements,a=n[0],o=n[3],l=n[6],c=n[1],u=n[4],f=n[7],h=n[2],m=n[5],x=n[8],v=r[0],d=r[3],p=r[6],_=r[1],g=r[4],b=r[7],w=r[2],S=r[5],M=r[8];return s[0]=a*v+o*_+l*w,s[3]=a*d+o*g+l*S,s[6]=a*p+o*b+l*M,s[1]=c*v+u*_+f*w,s[4]=c*d+u*g+f*S,s[7]=c*p+u*b+f*M,s[2]=h*v+m*_+x*w,s[5]=h*d+m*g+x*S,s[8]=h*p+m*b+x*M,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8];return t*a*u-t*o*c-n*s*u+n*o*l+r*s*c-r*a*l}invert(){const e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8],f=u*a-o*c,h=o*l-u*s,m=c*s-a*l,x=t*f+n*h+r*m;if(x===0)return this.set(0,0,0,0,0,0,0,0,0);const v=1/x;return e[0]=f*v,e[1]=(r*c-u*n)*v,e[2]=(o*n-r*a)*v,e[3]=h*v,e[4]=(u*t-r*l)*v,e[5]=(r*s-o*t)*v,e[6]=m*v,e[7]=(n*l-c*t)*v,e[8]=(a*t-n*s)*v,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,r,s,a,o){const l=Math.cos(s),c=Math.sin(s);return this.set(n*l,n*c,-n*(l*a+c*o)+a+e,-r*c,r*l,-r*(-c*a+l*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(Pc.makeScale(e,t)),this}rotate(e){return this.premultiply(Pc.makeRotation(-e)),this}translate(e,t){return this.premultiply(Pc.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let r=0;r<9;r++)if(t[r]!==n[r])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const Pc=new ut;function Vp(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function Kl(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function W1(){const i=Kl("canvas");return i.style.display="block",i}const yf={};function Ia(i){i in yf||(yf[i]=!0,console.warn(i))}const Ef=new ut().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),Sf=new ut().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),fo={[Xi]:{transfer:ql,primaries:$l,toReference:i=>i,fromReference:i=>i},[on]:{transfer:Dt,primaries:$l,toReference:i=>i.convertSRGBToLinear(),fromReference:i=>i.convertLinearToSRGB()},[uc]:{transfer:ql,primaries:Yl,toReference:i=>i.applyMatrix3(Sf),fromReference:i=>i.applyMatrix3(Ef)},[dh]:{transfer:Dt,primaries:Yl,toReference:i=>i.convertSRGBToLinear().applyMatrix3(Sf),fromReference:i=>i.applyMatrix3(Ef).convertLinearToSRGB()}},X1=new Set([Xi,uc]),At={enabled:!0,_workingColorSpace:Xi,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(i){if(!X1.has(i))throw new Error(`Unsupported working color space, "${i}".`);this._workingColorSpace=i},convert:function(i,e,t){if(this.enabled===!1||e===t||!e||!t)return i;const n=fo[e].toReference,r=fo[t].fromReference;return r(n(i))},fromWorkingColorSpace:function(i,e){return this.convert(i,this._workingColorSpace,e)},toWorkingColorSpace:function(i,e){return this.convert(i,e,this._workingColorSpace)},getPrimaries:function(i){return fo[i].primaries},getTransfer:function(i){return i===Xn?ql:fo[i].transfer}};function Us(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function Lc(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let hs;class Wp{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{hs===void 0&&(hs=Kl("canvas")),hs.width=e.width,hs.height=e.height;const n=hs.getContext("2d");e instanceof ImageData?n.putImageData(e,0,0):n.drawImage(e,0,0,e.width,e.height),t=hs}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=Kl("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const r=n.getImageData(0,0,e.width,e.height),s=r.data;for(let a=0;a<s.length;a++)s[a]=Us(s[a]/255)*255;return n.putImageData(r,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(Us(t[n]/255)*255):t[n]=Us(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let q1=0;class Xp{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:q1++}),this.uuid=xr(),this.data=e,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let a=0,o=r.length;a<o;a++)r[a].isDataTexture?s.push(Fc(r[a].image)):s.push(Fc(r[a]))}else s=Fc(r);n.url=s}return t||(e.images[this.uuid]=n),n}}function Fc(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?Wp.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let $1=0;class wn extends rs{constructor(e=wn.DEFAULT_IMAGE,t=wn.DEFAULT_MAPPING,n=si,r=si,s=Gn,a=Wa,o=ai,l=mr,c=wn.DEFAULT_ANISOTROPY,u=Xn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:$1++}),this.uuid=xr(),this.name="",this.source=new Xp(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=r,this.magFilter=s,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new Ve(0,0),this.repeat=new Ve(1,1),this.center=new Ve(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new ut,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,typeof u=="string"?this.colorSpace=u:(Ia("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=u===qr?on:Xn),this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.needsPMREMUpdate=!1}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Fp)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Lu:e.x=e.x-Math.floor(e.x);break;case si:e.x=e.x<0?0:1;break;case Fu:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Lu:e.y=e.y-Math.floor(e.y);break;case si:e.y=e.y<0?0:1;break;case Fu:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}get encoding(){return Ia("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace===on?qr:Hp}set encoding(e){Ia("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=e===qr?on:Xn}}wn.DEFAULT_IMAGE=null;wn.DEFAULT_MAPPING=Fp;wn.DEFAULT_ANISOTROPY=1;class Jt{constructor(e=0,t=0,n=0,r=1){Jt.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,r){return this.x=e,this.y=t,this.z=n,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,r=this.z,s=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*r+a[12]*s,this.y=a[1]*t+a[5]*n+a[9]*r+a[13]*s,this.z=a[2]*t+a[6]*n+a[10]*r+a[14]*s,this.w=a[3]*t+a[7]*n+a[11]*r+a[15]*s,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,r,s;const l=e.elements,c=l[0],u=l[4],f=l[8],h=l[1],m=l[5],x=l[9],v=l[2],d=l[6],p=l[10];if(Math.abs(u-h)<.01&&Math.abs(f-v)<.01&&Math.abs(x-d)<.01){if(Math.abs(u+h)<.1&&Math.abs(f+v)<.1&&Math.abs(x+d)<.1&&Math.abs(c+m+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const g=(c+1)/2,b=(m+1)/2,w=(p+1)/2,S=(u+h)/4,M=(f+v)/4,I=(x+d)/4;return g>b&&g>w?g<.01?(n=0,r=.707106781,s=.707106781):(n=Math.sqrt(g),r=S/n,s=M/n):b>w?b<.01?(n=.707106781,r=0,s=.707106781):(r=Math.sqrt(b),n=S/r,s=I/r):w<.01?(n=.707106781,r=.707106781,s=0):(s=Math.sqrt(w),n=M/s,r=I/s),this.set(n,r,s,t),this}let _=Math.sqrt((d-x)*(d-x)+(f-v)*(f-v)+(h-u)*(h-u));return Math.abs(_)<.001&&(_=1),this.x=(d-x)/_,this.y=(f-v)/_,this.z=(h-u)/_,this.w=Math.acos((c+m+p-1)/2),this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Y1 extends rs{constructor(e=1,t=1,n={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new Jt(0,0,e,t),this.scissorTest=!1,this.viewport=new Jt(0,0,e,t);const r={width:e,height:t,depth:1};n.encoding!==void 0&&(Ia("THREE.WebGLRenderTarget: option.encoding has been replaced by option.colorSpace."),n.colorSpace=n.encoding===qr?on:Xn),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Gn,depthBuffer:!0,stencilBuffer:!1,depthTexture:null,samples:0},n),this.texture=new wn(r,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.flipY=!1,this.texture.generateMipmaps=n.generateMipmaps,this.texture.internalFormat=n.internalFormat,this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}setSize(e,t,n=1){(this.width!==e||this.height!==t||this.depth!==n)&&(this.width=e,this.height=t,this.depth=n,this.texture.image.width=e,this.texture.image.height=t,this.texture.image.depth=n,this.dispose()),this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.texture=e.texture.clone(),this.texture.isRenderTargetTexture=!0;const t=Object.assign({},e.texture.image);return this.texture.source=new Xp(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Zr extends Y1{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class qp extends wn{constructor(e=null,t=1,n=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=gn,this.minFilter=gn,this.wrapR=si,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class j1 extends wn{constructor(e=null,t=1,n=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=gn,this.minFilter=gn,this.wrapR=si,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Ei{constructor(e=0,t=0,n=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=r}static slerpFlat(e,t,n,r,s,a,o){let l=n[r+0],c=n[r+1],u=n[r+2],f=n[r+3];const h=s[a+0],m=s[a+1],x=s[a+2],v=s[a+3];if(o===0){e[t+0]=l,e[t+1]=c,e[t+2]=u,e[t+3]=f;return}if(o===1){e[t+0]=h,e[t+1]=m,e[t+2]=x,e[t+3]=v;return}if(f!==v||l!==h||c!==m||u!==x){let d=1-o;const p=l*h+c*m+u*x+f*v,_=p>=0?1:-1,g=1-p*p;if(g>Number.EPSILON){const w=Math.sqrt(g),S=Math.atan2(w,p*_);d=Math.sin(d*S)/w,o=Math.sin(o*S)/w}const b=o*_;if(l=l*d+h*b,c=c*d+m*b,u=u*d+x*b,f=f*d+v*b,d===1-o){const w=1/Math.sqrt(l*l+c*c+u*u+f*f);l*=w,c*=w,u*=w,f*=w}}e[t]=l,e[t+1]=c,e[t+2]=u,e[t+3]=f}static multiplyQuaternionsFlat(e,t,n,r,s,a){const o=n[r],l=n[r+1],c=n[r+2],u=n[r+3],f=s[a],h=s[a+1],m=s[a+2],x=s[a+3];return e[t]=o*x+u*f+l*m-c*h,e[t+1]=l*x+u*h+c*f-o*m,e[t+2]=c*x+u*m+o*h-l*f,e[t+3]=u*x-o*f-l*h-c*m,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,r){return this._x=e,this._y=t,this._z=n,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,r=e._y,s=e._z,a=e._order,o=Math.cos,l=Math.sin,c=o(n/2),u=o(r/2),f=o(s/2),h=l(n/2),m=l(r/2),x=l(s/2);switch(a){case"XYZ":this._x=h*u*f+c*m*x,this._y=c*m*f-h*u*x,this._z=c*u*x+h*m*f,this._w=c*u*f-h*m*x;break;case"YXZ":this._x=h*u*f+c*m*x,this._y=c*m*f-h*u*x,this._z=c*u*x-h*m*f,this._w=c*u*f+h*m*x;break;case"ZXY":this._x=h*u*f-c*m*x,this._y=c*m*f+h*u*x,this._z=c*u*x+h*m*f,this._w=c*u*f-h*m*x;break;case"ZYX":this._x=h*u*f-c*m*x,this._y=c*m*f+h*u*x,this._z=c*u*x-h*m*f,this._w=c*u*f+h*m*x;break;case"YZX":this._x=h*u*f+c*m*x,this._y=c*m*f+h*u*x,this._z=c*u*x-h*m*f,this._w=c*u*f-h*m*x;break;case"XZY":this._x=h*u*f-c*m*x,this._y=c*m*f-h*u*x,this._z=c*u*x+h*m*f,this._w=c*u*f+h*m*x;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,r=Math.sin(n);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],r=t[4],s=t[8],a=t[1],o=t[5],l=t[9],c=t[2],u=t[6],f=t[10],h=n+o+f;if(h>0){const m=.5/Math.sqrt(h+1);this._w=.25/m,this._x=(u-l)*m,this._y=(s-c)*m,this._z=(a-r)*m}else if(n>o&&n>f){const m=2*Math.sqrt(1+n-o-f);this._w=(u-l)/m,this._x=.25*m,this._y=(r+a)/m,this._z=(s+c)/m}else if(o>f){const m=2*Math.sqrt(1+o-n-f);this._w=(s-c)/m,this._x=(r+a)/m,this._y=.25*m,this._z=(l+u)/m}else{const m=2*Math.sqrt(1+f-n-o);this._w=(a-r)/m,this._x=(s+c)/m,this._y=(l+u)/m,this._z=.25*m}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<Number.EPSILON?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(vn(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const r=Math.min(1,t/n);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,r=e._y,s=e._z,a=e._w,o=t._x,l=t._y,c=t._z,u=t._w;return this._x=n*u+a*o+r*c-s*l,this._y=r*u+a*l+s*o-n*c,this._z=s*u+a*c+n*l-r*o,this._w=a*u-n*o-r*l-s*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const n=this._x,r=this._y,s=this._z,a=this._w;let o=a*e._w+n*e._x+r*e._y+s*e._z;if(o<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,o=-o):this.copy(e),o>=1)return this._w=a,this._x=n,this._y=r,this._z=s,this;const l=1-o*o;if(l<=Number.EPSILON){const m=1-t;return this._w=m*a+t*this._w,this._x=m*n+t*this._x,this._y=m*r+t*this._y,this._z=m*s+t*this._z,this.normalize(),this}const c=Math.sqrt(l),u=Math.atan2(c,o),f=Math.sin((1-t)*u)/c,h=Math.sin(t*u)/c;return this._w=a*f+this._w*h,this._x=n*f+this._x*h,this._y=r*f+this._y*h,this._z=s*f+this._z*h,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=Math.random(),t=Math.sqrt(1-e),n=Math.sqrt(e),r=2*Math.PI*Math.random(),s=2*Math.PI*Math.random();return this.set(t*Math.cos(r),n*Math.sin(s),n*Math.cos(s),t*Math.sin(r))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class X{constructor(e=0,t=0,n=0){X.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Mf.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Mf.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6]*r,this.y=s[1]*t+s[4]*n+s[7]*r,this.z=s[2]*t+s[5]*n+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,r=this.z,s=e.elements,a=1/(s[3]*t+s[7]*n+s[11]*r+s[15]);return this.x=(s[0]*t+s[4]*n+s[8]*r+s[12])*a,this.y=(s[1]*t+s[5]*n+s[9]*r+s[13])*a,this.z=(s[2]*t+s[6]*n+s[10]*r+s[14])*a,this}applyQuaternion(e){const t=this.x,n=this.y,r=this.z,s=e.x,a=e.y,o=e.z,l=e.w,c=2*(a*r-o*n),u=2*(o*t-s*r),f=2*(s*n-a*t);return this.x=t+l*c+a*f-o*u,this.y=n+l*u+o*c-s*f,this.z=r+l*f+s*u-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[4]*n+s[8]*r,this.y=s[1]*t+s[5]*n+s[9]*r,this.z=s[2]*t+s[6]*n+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,r=e.y,s=e.z,a=t.x,o=t.y,l=t.z;return this.x=r*l-s*o,this.y=s*a-n*l,this.z=n*o-r*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Bc.copy(this).projectOnVector(e),this.sub(Bc)}reflect(e){return this.sub(Bc.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(vn(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,r=this.z-e.z;return t*t+n*n+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const r=Math.sin(t)*e;return this.x=r*Math.sin(n),this.y=Math.cos(t)*e,this.z=r*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=(Math.random()-.5)*2,t=Math.random()*Math.PI*2,n=Math.sqrt(1-e**2);return this.x=n*Math.cos(t),this.y=n*Math.sin(t),this.z=e,this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Bc=new X,Mf=new Ei;class eo{constructor(e=new X(1/0,1/0,1/0),t=new X(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Zn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Zn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=Zn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const s=n.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=s.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,Zn):Zn.fromBufferAttribute(s,a),Zn.applyMatrix4(e.matrixWorld),this.expandByPoint(Zn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),po.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),po.copy(n.boundingBox)),po.applyMatrix4(e.matrixWorld),this.union(po)}const r=e.children;for(let s=0,a=r.length;s<a;s++)this.expandByObject(r[s],t);return this}containsPoint(e){return!(e.x<this.min.x||e.x>this.max.x||e.y<this.min.y||e.y>this.max.y||e.z<this.min.z||e.z>this.max.z)}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return!(e.max.x<this.min.x||e.min.x>this.max.x||e.max.y<this.min.y||e.min.y>this.max.y||e.max.z<this.min.z||e.min.z>this.max.z)}intersectsSphere(e){return this.clampPoint(e.center,Zn),Zn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(da),mo.subVectors(this.max,da),fs.subVectors(e.a,da),ds.subVectors(e.b,da),ps.subVectors(e.c,da),$i.subVectors(ds,fs),Yi.subVectors(ps,ds),Mr.subVectors(fs,ps);let t=[0,-$i.z,$i.y,0,-Yi.z,Yi.y,0,-Mr.z,Mr.y,$i.z,0,-$i.x,Yi.z,0,-Yi.x,Mr.z,0,-Mr.x,-$i.y,$i.x,0,-Yi.y,Yi.x,0,-Mr.y,Mr.x,0];return!Ic(t,fs,ds,ps,mo)||(t=[1,0,0,0,1,0,0,0,1],!Ic(t,fs,ds,ps,mo))?!1:(xo.crossVectors($i,Yi),t=[xo.x,xo.y,xo.z],Ic(t,fs,ds,ps,mo))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Zn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Zn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Ti[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Ti[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Ti[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Ti[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Ti[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Ti[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Ti[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Ti[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Ti),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const Ti=[new X,new X,new X,new X,new X,new X,new X,new X],Zn=new X,po=new eo,fs=new X,ds=new X,ps=new X,$i=new X,Yi=new X,Mr=new X,da=new X,mo=new X,xo=new X,wr=new X;function Ic(i,e,t,n,r){for(let s=0,a=i.length-3;s<=a;s+=3){wr.fromArray(i,s);const o=r.x*Math.abs(wr.x)+r.y*Math.abs(wr.y)+r.z*Math.abs(wr.z),l=e.dot(wr),c=t.dot(wr),u=n.dot(wr);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>o)return!1}return!0}const K1=new eo,pa=new X,kc=new X;class to{constructor(e=new X,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):K1.setFromPoints(e).getCenter(n);let r=0;for(let s=0,a=e.length;s<a;s++)r=Math.max(r,n.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;pa.subVectors(e,this.center);const t=pa.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),r=(n-this.radius)*.5;this.center.addScaledVector(pa,r/n),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(kc.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(pa.copy(e.center).add(kc)),this.expandByPoint(pa.copy(e.center).sub(kc))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const Ci=new X,Uc=new X,go=new X,ji=new X,Nc=new X,vo=new X,Oc=new X;class no{constructor(e=new X,t=new X(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Ci)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=Ci.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Ci.copy(this.origin).addScaledVector(this.direction,t),Ci.distanceToSquared(e))}distanceSqToSegment(e,t,n,r){Uc.copy(e).add(t).multiplyScalar(.5),go.copy(t).sub(e).normalize(),ji.copy(this.origin).sub(Uc);const s=e.distanceTo(t)*.5,a=-this.direction.dot(go),o=ji.dot(this.direction),l=-ji.dot(go),c=ji.lengthSq(),u=Math.abs(1-a*a);let f,h,m,x;if(u>0)if(f=a*l-o,h=a*o-l,x=s*u,f>=0)if(h>=-x)if(h<=x){const v=1/u;f*=v,h*=v,m=f*(f+a*h+2*o)+h*(a*f+h+2*l)+c}else h=s,f=Math.max(0,-(a*h+o)),m=-f*f+h*(h+2*l)+c;else h=-s,f=Math.max(0,-(a*h+o)),m=-f*f+h*(h+2*l)+c;else h<=-x?(f=Math.max(0,-(-a*s+o)),h=f>0?-s:Math.min(Math.max(-s,-l),s),m=-f*f+h*(h+2*l)+c):h<=x?(f=0,h=Math.min(Math.max(-s,-l),s),m=h*(h+2*l)+c):(f=Math.max(0,-(a*s+o)),h=f>0?s:Math.min(Math.max(-s,-l),s),m=-f*f+h*(h+2*l)+c);else h=a>0?-s:s,f=Math.max(0,-(a*h+o)),m=-f*f+h*(h+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,f),r&&r.copy(Uc).addScaledVector(go,h),m}intersectSphere(e,t){Ci.subVectors(e.center,this.origin);const n=Ci.dot(this.direction),r=Ci.dot(Ci)-n*n,s=e.radius*e.radius;if(r>s)return null;const a=Math.sqrt(s-r),o=n-a,l=n+a;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,r,s,a,o,l;const c=1/this.direction.x,u=1/this.direction.y,f=1/this.direction.z,h=this.origin;return c>=0?(n=(e.min.x-h.x)*c,r=(e.max.x-h.x)*c):(n=(e.max.x-h.x)*c,r=(e.min.x-h.x)*c),u>=0?(s=(e.min.y-h.y)*u,a=(e.max.y-h.y)*u):(s=(e.max.y-h.y)*u,a=(e.min.y-h.y)*u),n>a||s>r||((s>n||isNaN(n))&&(n=s),(a<r||isNaN(r))&&(r=a),f>=0?(o=(e.min.z-h.z)*f,l=(e.max.z-h.z)*f):(o=(e.max.z-h.z)*f,l=(e.min.z-h.z)*f),n>l||o>r)||((o>n||n!==n)&&(n=o),(l<r||r!==r)&&(r=l),r<0)?null:this.at(n>=0?n:r,t)}intersectsBox(e){return this.intersectBox(e,Ci)!==null}intersectTriangle(e,t,n,r,s){Nc.subVectors(t,e),vo.subVectors(n,e),Oc.crossVectors(Nc,vo);let a=this.direction.dot(Oc),o;if(a>0){if(r)return null;o=1}else if(a<0)o=-1,a=-a;else return null;ji.subVectors(this.origin,e);const l=o*this.direction.dot(vo.crossVectors(ji,vo));if(l<0)return null;const c=o*this.direction.dot(Nc.cross(ji));if(c<0||l+c>a)return null;const u=-o*ji.dot(Oc);return u<0?null:this.at(u/a,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Nt{constructor(e,t,n,r,s,a,o,l,c,u,f,h,m,x,v,d){Nt.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,r,s,a,o,l,c,u,f,h,m,x,v,d)}set(e,t,n,r,s,a,o,l,c,u,f,h,m,x,v,d){const p=this.elements;return p[0]=e,p[4]=t,p[8]=n,p[12]=r,p[1]=s,p[5]=a,p[9]=o,p[13]=l,p[2]=c,p[6]=u,p[10]=f,p[14]=h,p[3]=m,p[7]=x,p[11]=v,p[15]=d,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Nt().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,n=e.elements,r=1/ms.setFromMatrixColumn(e,0).length(),s=1/ms.setFromMatrixColumn(e,1).length(),a=1/ms.setFromMatrixColumn(e,2).length();return t[0]=n[0]*r,t[1]=n[1]*r,t[2]=n[2]*r,t[3]=0,t[4]=n[4]*s,t[5]=n[5]*s,t[6]=n[6]*s,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,r=e.y,s=e.z,a=Math.cos(n),o=Math.sin(n),l=Math.cos(r),c=Math.sin(r),u=Math.cos(s),f=Math.sin(s);if(e.order==="XYZ"){const h=a*u,m=a*f,x=o*u,v=o*f;t[0]=l*u,t[4]=-l*f,t[8]=c,t[1]=m+x*c,t[5]=h-v*c,t[9]=-o*l,t[2]=v-h*c,t[6]=x+m*c,t[10]=a*l}else if(e.order==="YXZ"){const h=l*u,m=l*f,x=c*u,v=c*f;t[0]=h+v*o,t[4]=x*o-m,t[8]=a*c,t[1]=a*f,t[5]=a*u,t[9]=-o,t[2]=m*o-x,t[6]=v+h*o,t[10]=a*l}else if(e.order==="ZXY"){const h=l*u,m=l*f,x=c*u,v=c*f;t[0]=h-v*o,t[4]=-a*f,t[8]=x+m*o,t[1]=m+x*o,t[5]=a*u,t[9]=v-h*o,t[2]=-a*c,t[6]=o,t[10]=a*l}else if(e.order==="ZYX"){const h=a*u,m=a*f,x=o*u,v=o*f;t[0]=l*u,t[4]=x*c-m,t[8]=h*c+v,t[1]=l*f,t[5]=v*c+h,t[9]=m*c-x,t[2]=-c,t[6]=o*l,t[10]=a*l}else if(e.order==="YZX"){const h=a*l,m=a*c,x=o*l,v=o*c;t[0]=l*u,t[4]=v-h*f,t[8]=x*f+m,t[1]=f,t[5]=a*u,t[9]=-o*u,t[2]=-c*u,t[6]=m*f+x,t[10]=h-v*f}else if(e.order==="XZY"){const h=a*l,m=a*c,x=o*l,v=o*c;t[0]=l*u,t[4]=-f,t[8]=c*u,t[1]=h*f+v,t[5]=a*u,t[9]=m*f-x,t[2]=x*f-m,t[6]=o*u,t[10]=v*f+h}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Z1,e,Q1)}lookAt(e,t,n){const r=this.elements;return Rn.subVectors(e,t),Rn.lengthSq()===0&&(Rn.z=1),Rn.normalize(),Ki.crossVectors(n,Rn),Ki.lengthSq()===0&&(Math.abs(n.z)===1?Rn.x+=1e-4:Rn.z+=1e-4,Rn.normalize(),Ki.crossVectors(n,Rn)),Ki.normalize(),_o.crossVectors(Rn,Ki),r[0]=Ki.x,r[4]=_o.x,r[8]=Rn.x,r[1]=Ki.y,r[5]=_o.y,r[9]=Rn.y,r[2]=Ki.z,r[6]=_o.z,r[10]=Rn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,r=t.elements,s=this.elements,a=n[0],o=n[4],l=n[8],c=n[12],u=n[1],f=n[5],h=n[9],m=n[13],x=n[2],v=n[6],d=n[10],p=n[14],_=n[3],g=n[7],b=n[11],w=n[15],S=r[0],M=r[4],I=r[8],E=r[12],y=r[1],P=r[5],U=r[9],G=r[13],F=r[2],z=r[6],q=r[10],ee=r[14],Z=r[3],Q=r[7],j=r[11],W=r[15];return s[0]=a*S+o*y+l*F+c*Z,s[4]=a*M+o*P+l*z+c*Q,s[8]=a*I+o*U+l*q+c*j,s[12]=a*E+o*G+l*ee+c*W,s[1]=u*S+f*y+h*F+m*Z,s[5]=u*M+f*P+h*z+m*Q,s[9]=u*I+f*U+h*q+m*j,s[13]=u*E+f*G+h*ee+m*W,s[2]=x*S+v*y+d*F+p*Z,s[6]=x*M+v*P+d*z+p*Q,s[10]=x*I+v*U+d*q+p*j,s[14]=x*E+v*G+d*ee+p*W,s[3]=_*S+g*y+b*F+w*Z,s[7]=_*M+g*P+b*z+w*Q,s[11]=_*I+g*U+b*q+w*j,s[15]=_*E+g*G+b*ee+w*W,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],r=e[8],s=e[12],a=e[1],o=e[5],l=e[9],c=e[13],u=e[2],f=e[6],h=e[10],m=e[14],x=e[3],v=e[7],d=e[11],p=e[15];return x*(+s*l*f-r*c*f-s*o*h+n*c*h+r*o*m-n*l*m)+v*(+t*l*m-t*c*h+s*a*h-r*a*m+r*c*u-s*l*u)+d*(+t*c*f-t*o*m-s*a*f+n*a*m+s*o*u-n*c*u)+p*(-r*o*u-t*l*f+t*o*h+r*a*f-n*a*h+n*l*u)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8],f=e[9],h=e[10],m=e[11],x=e[12],v=e[13],d=e[14],p=e[15],_=f*d*c-v*h*c+v*l*m-o*d*m-f*l*p+o*h*p,g=x*h*c-u*d*c-x*l*m+a*d*m+u*l*p-a*h*p,b=u*v*c-x*f*c+x*o*m-a*v*m-u*o*p+a*f*p,w=x*f*l-u*v*l-x*o*h+a*v*h+u*o*d-a*f*d,S=t*_+n*g+r*b+s*w;if(S===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const M=1/S;return e[0]=_*M,e[1]=(v*h*s-f*d*s-v*r*m+n*d*m+f*r*p-n*h*p)*M,e[2]=(o*d*s-v*l*s+v*r*c-n*d*c-o*r*p+n*l*p)*M,e[3]=(f*l*s-o*h*s-f*r*c+n*h*c+o*r*m-n*l*m)*M,e[4]=g*M,e[5]=(u*d*s-x*h*s+x*r*m-t*d*m-u*r*p+t*h*p)*M,e[6]=(x*l*s-a*d*s-x*r*c+t*d*c+a*r*p-t*l*p)*M,e[7]=(a*h*s-u*l*s+u*r*c-t*h*c-a*r*m+t*l*m)*M,e[8]=b*M,e[9]=(x*f*s-u*v*s-x*n*m+t*v*m+u*n*p-t*f*p)*M,e[10]=(a*v*s-x*o*s+x*n*c-t*v*c-a*n*p+t*o*p)*M,e[11]=(u*o*s-a*f*s-u*n*c+t*f*c+a*n*m-t*o*m)*M,e[12]=w*M,e[13]=(u*v*r-x*f*r+x*n*h-t*v*h-u*n*d+t*f*d)*M,e[14]=(x*o*r-a*v*r-x*n*l+t*v*l+a*n*d-t*o*d)*M,e[15]=(a*f*r-u*o*r+u*n*l-t*f*l-a*n*h+t*o*h)*M,this}scale(e){const t=this.elements,n=e.x,r=e.y,s=e.z;return t[0]*=n,t[4]*=r,t[8]*=s,t[1]*=n,t[5]*=r,t[9]*=s,t[2]*=n,t[6]*=r,t[10]*=s,t[3]*=n,t[7]*=r,t[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,r))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),r=Math.sin(t),s=1-n,a=e.x,o=e.y,l=e.z,c=s*a,u=s*o;return this.set(c*a+n,c*o-r*l,c*l+r*o,0,c*o+r*l,u*o+n,u*l-r*a,0,c*l-r*o,u*l+r*a,s*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,r,s,a){return this.set(1,n,s,0,e,1,a,0,t,r,1,0,0,0,0,1),this}compose(e,t,n){const r=this.elements,s=t._x,a=t._y,o=t._z,l=t._w,c=s+s,u=a+a,f=o+o,h=s*c,m=s*u,x=s*f,v=a*u,d=a*f,p=o*f,_=l*c,g=l*u,b=l*f,w=n.x,S=n.y,M=n.z;return r[0]=(1-(v+p))*w,r[1]=(m+b)*w,r[2]=(x-g)*w,r[3]=0,r[4]=(m-b)*S,r[5]=(1-(h+p))*S,r[6]=(d+_)*S,r[7]=0,r[8]=(x+g)*M,r[9]=(d-_)*M,r[10]=(1-(h+v))*M,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,n){const r=this.elements;let s=ms.set(r[0],r[1],r[2]).length();const a=ms.set(r[4],r[5],r[6]).length(),o=ms.set(r[8],r[9],r[10]).length();this.determinant()<0&&(s=-s),e.x=r[12],e.y=r[13],e.z=r[14],Qn.copy(this);const c=1/s,u=1/a,f=1/o;return Qn.elements[0]*=c,Qn.elements[1]*=c,Qn.elements[2]*=c,Qn.elements[4]*=u,Qn.elements[5]*=u,Qn.elements[6]*=u,Qn.elements[8]*=f,Qn.elements[9]*=f,Qn.elements[10]*=f,t.setFromRotationMatrix(Qn),n.x=s,n.y=a,n.z=o,this}makePerspective(e,t,n,r,s,a,o=Oi){const l=this.elements,c=2*s/(t-e),u=2*s/(n-r),f=(t+e)/(t-e),h=(n+r)/(n-r);let m,x;if(o===Oi)m=-(a+s)/(a-s),x=-2*a*s/(a-s);else if(o===jl)m=-a/(a-s),x=-a*s/(a-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=c,l[4]=0,l[8]=f,l[12]=0,l[1]=0,l[5]=u,l[9]=h,l[13]=0,l[2]=0,l[6]=0,l[10]=m,l[14]=x,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,n,r,s,a,o=Oi){const l=this.elements,c=1/(t-e),u=1/(n-r),f=1/(a-s),h=(t+e)*c,m=(n+r)*u;let x,v;if(o===Oi)x=(a+s)*f,v=-2*f;else if(o===jl)x=s*f,v=-1*f;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-h,l[1]=0,l[5]=2*u,l[9]=0,l[13]=-m,l[2]=0,l[6]=0,l[10]=v,l[14]=-x,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let r=0;r<16;r++)if(t[r]!==n[r])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const ms=new X,Qn=new Nt,Z1=new X(0,0,0),Q1=new X(1,1,1),Ki=new X,_o=new X,Rn=new X,wf=new Nt,Af=new Ei;class hc{constructor(e=0,t=0,n=0,r=hc.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,r=this._order){return this._x=e,this._y=t,this._z=n,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const r=e.elements,s=r[0],a=r[4],o=r[8],l=r[1],c=r[5],u=r[9],f=r[2],h=r[6],m=r[10];switch(t){case"XYZ":this._y=Math.asin(vn(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-u,m),this._z=Math.atan2(-a,s)):(this._x=Math.atan2(h,c),this._z=0);break;case"YXZ":this._x=Math.asin(-vn(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(o,m),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-f,s),this._z=0);break;case"ZXY":this._x=Math.asin(vn(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(-f,m),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-vn(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(h,m),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(vn(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-f,s)):(this._x=0,this._y=Math.atan2(o,m));break;case"XZY":this._z=Math.asin(-vn(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(h,c),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-u,m),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return wf.makeRotationFromQuaternion(e),this.setFromRotationMatrix(wf,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Af.setFromEuler(this),this.setFromQuaternion(Af,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}hc.DEFAULT_ORDER="XYZ";class ph{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let J1=0;const Tf=new X,xs=new Ei,Ri=new Nt,bo=new X,ma=new X,eb=new X,tb=new Ei,Cf=new X(1,0,0),Rf=new X(0,1,0),Df=new X(0,0,1),nb={type:"added"},ib={type:"removed"};class Xt extends rs{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:J1++}),this.uuid=xr(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Xt.DEFAULT_UP.clone();const e=new X,t=new hc,n=new Ei,r=new X(1,1,1);function s(){n.setFromEuler(t,!1)}function a(){t.setFromQuaternion(n,void 0,!1)}t._onChange(s),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new Nt},normalMatrix:{value:new ut}}),this.matrix=new Nt,this.matrixWorld=new Nt,this.matrixAutoUpdate=Xt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Xt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new ph,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return xs.setFromAxisAngle(e,t),this.quaternion.multiply(xs),this}rotateOnWorldAxis(e,t){return xs.setFromAxisAngle(e,t),this.quaternion.premultiply(xs),this}rotateX(e){return this.rotateOnAxis(Cf,e)}rotateY(e){return this.rotateOnAxis(Rf,e)}rotateZ(e){return this.rotateOnAxis(Df,e)}translateOnAxis(e,t){return Tf.copy(e).applyQuaternion(this.quaternion),this.position.add(Tf.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Cf,e)}translateY(e){return this.translateOnAxis(Rf,e)}translateZ(e){return this.translateOnAxis(Df,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Ri.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?bo.copy(e):bo.set(e,t,n);const r=this.parent;this.updateWorldMatrix(!0,!1),ma.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Ri.lookAt(ma,bo,this.up):Ri.lookAt(bo,ma,this.up),this.quaternion.setFromRotationMatrix(Ri),r&&(Ri.extractRotation(r.matrixWorld),xs.setFromRotationMatrix(Ri),this.quaternion.premultiply(xs.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.parent!==null&&e.parent.remove(e),e.parent=this,this.children.push(e),e.dispatchEvent(nb)):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(ib)),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Ri.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Ri.multiply(e.parent.matrixWorld)),e.applyMatrix4(Ri),this.add(e),e.updateWorldMatrix(!1,!0),this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,r=this.children.length;n<r;n++){const a=this.children[n].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const r=this.children;for(let s=0,a=r.length;s<a;s++)r[s].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ma,e,eb),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ma,tb,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,r=t.length;n<r;n++){const s=t[n];(s.matrixWorldAutoUpdate===!0||e===!0)&&s.updateMatrixWorld(e)}}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.matrixWorldAutoUpdate===!0&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),t===!0){const r=this.children;for(let s=0,a=r.length;s<a;s++){const o=r[s];o.matrixWorldAutoUpdate===!0&&o.updateWorldMatrix(!1,!0)}}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.visibility=this._visibility,r.active=this._active,r.bounds=this._bounds.map(o=>({boxInitialized:o.boxInitialized,boxMin:o.box.min.toArray(),boxMax:o.box.max.toArray(),sphereInitialized:o.sphereInitialized,sphereRadius:o.sphere.radius,sphereCenter:o.sphere.center.toArray()})),r.maxGeometryCount=this._maxGeometryCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.geometryCount=this._geometryCount,r.matricesTexture=this._matricesTexture.toJSON(e),this.boundingSphere!==null&&(r.boundingSphere={center:r.boundingSphere.center.toArray(),radius:r.boundingSphere.radius}),this.boundingBox!==null&&(r.boundingBox={min:r.boundingBox.min.toArray(),max:r.boundingBox.max.toArray()}));function s(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){const f=l[c];s(e.shapes,f)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(s(e.materials,this.material[l]));r.material=o}else r.material=s(e.materials,this.material);if(this.children.length>0){r.children=[];for(let o=0;o<this.children.length;o++)r.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];r.animations.push(s(e.animations,l))}}if(t){const o=a(e.geometries),l=a(e.materials),c=a(e.textures),u=a(e.images),f=a(e.shapes),h=a(e.skeletons),m=a(e.animations),x=a(e.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),u.length>0&&(n.images=u),f.length>0&&(n.shapes=f),h.length>0&&(n.skeletons=h),m.length>0&&(n.animations=m),x.length>0&&(n.nodes=x)}return n.object=r,n;function a(o){const l=[];for(const c in o){const u=o[c];delete u.metadata,l.push(u)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const r=e.children[n];this.add(r.clone())}return this}}Xt.DEFAULT_UP=new X(0,1,0);Xt.DEFAULT_MATRIX_AUTO_UPDATE=!0;Xt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Jn=new X,Di=new X,zc=new X,Pi=new X,gs=new X,vs=new X,Pf=new X,Hc=new X,Gc=new X,Vc=new X;let yo=!1;class Vn{constructor(e=new X,t=new X,n=new X){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,r){r.subVectors(n,t),Jn.subVectors(e,t),r.cross(Jn);const s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,t,n,r,s){Jn.subVectors(r,t),Di.subVectors(n,t),zc.subVectors(e,t);const a=Jn.dot(Jn),o=Jn.dot(Di),l=Jn.dot(zc),c=Di.dot(Di),u=Di.dot(zc),f=a*c-o*o;if(f===0)return s.set(0,0,0),null;const h=1/f,m=(c*l-o*u)*h,x=(a*u-o*l)*h;return s.set(1-m-x,x,m)}static containsPoint(e,t,n,r){return this.getBarycoord(e,t,n,r,Pi)===null?!1:Pi.x>=0&&Pi.y>=0&&Pi.x+Pi.y<=1}static getUV(e,t,n,r,s,a,o,l){return yo===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),yo=!0),this.getInterpolation(e,t,n,r,s,a,o,l)}static getInterpolation(e,t,n,r,s,a,o,l){return this.getBarycoord(e,t,n,r,Pi)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,Pi.x),l.addScaledVector(a,Pi.y),l.addScaledVector(o,Pi.z),l)}static isFrontFacing(e,t,n,r){return Jn.subVectors(n,t),Di.subVectors(e,t),Jn.cross(Di).dot(r)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,r){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,n,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Jn.subVectors(this.c,this.b),Di.subVectors(this.a,this.b),Jn.cross(Di).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Vn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return Vn.getBarycoord(e,this.a,this.b,this.c,t)}getUV(e,t,n,r,s){return yo===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),yo=!0),Vn.getInterpolation(e,this.a,this.b,this.c,t,n,r,s)}getInterpolation(e,t,n,r,s){return Vn.getInterpolation(e,this.a,this.b,this.c,t,n,r,s)}containsPoint(e){return Vn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Vn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,r=this.b,s=this.c;let a,o;gs.subVectors(r,n),vs.subVectors(s,n),Hc.subVectors(e,n);const l=gs.dot(Hc),c=vs.dot(Hc);if(l<=0&&c<=0)return t.copy(n);Gc.subVectors(e,r);const u=gs.dot(Gc),f=vs.dot(Gc);if(u>=0&&f<=u)return t.copy(r);const h=l*f-u*c;if(h<=0&&l>=0&&u<=0)return a=l/(l-u),t.copy(n).addScaledVector(gs,a);Vc.subVectors(e,s);const m=gs.dot(Vc),x=vs.dot(Vc);if(x>=0&&m<=x)return t.copy(s);const v=m*c-l*x;if(v<=0&&c>=0&&x<=0)return o=c/(c-x),t.copy(n).addScaledVector(vs,o);const d=u*x-m*f;if(d<=0&&f-u>=0&&m-x>=0)return Pf.subVectors(s,r),o=(f-u)/(f-u+(m-x)),t.copy(r).addScaledVector(Pf,o);const p=1/(d+v+h);return a=v*p,o=h*p,t.copy(n).addScaledVector(gs,a).addScaledVector(vs,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const $p={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Zi={h:0,s:0,l:0},Eo={h:0,s:0,l:0};function Wc(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}class gt{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=on){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,At.toWorkingColorSpace(this,t),this}setRGB(e,t,n,r=At.workingColorSpace){return this.r=e,this.g=t,this.b=n,At.toWorkingColorSpace(this,r),this}setHSL(e,t,n,r=At.workingColorSpace){if(e=G1(e,1),t=vn(t,0,1),n=vn(n,0,1),t===0)this.r=this.g=this.b=n;else{const s=n<=.5?n*(1+t):n+t-n*t,a=2*n-s;this.r=Wc(a,s,e+1/3),this.g=Wc(a,s,e),this.b=Wc(a,s,e-1/3)}return At.toWorkingColorSpace(this,r),this}setStyle(e,t=on){function n(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const a=r[1],o=r[2];switch(a){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=r[1],a=s.length;if(a===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(s,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=on){const n=$p[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Us(e.r),this.g=Us(e.g),this.b=Us(e.b),this}copyLinearToSRGB(e){return this.r=Lc(e.r),this.g=Lc(e.g),this.b=Lc(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=on){return At.fromWorkingColorSpace(dn.copy(this),e),Math.round(vn(dn.r*255,0,255))*65536+Math.round(vn(dn.g*255,0,255))*256+Math.round(vn(dn.b*255,0,255))}getHexString(e=on){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=At.workingColorSpace){At.fromWorkingColorSpace(dn.copy(this),t);const n=dn.r,r=dn.g,s=dn.b,a=Math.max(n,r,s),o=Math.min(n,r,s);let l,c;const u=(o+a)/2;if(o===a)l=0,c=0;else{const f=a-o;switch(c=u<=.5?f/(a+o):f/(2-a-o),a){case n:l=(r-s)/f+(r<s?6:0);break;case r:l=(s-n)/f+2;break;case s:l=(n-r)/f+4;break}l/=6}return e.h=l,e.s=c,e.l=u,e}getRGB(e,t=At.workingColorSpace){return At.fromWorkingColorSpace(dn.copy(this),t),e.r=dn.r,e.g=dn.g,e.b=dn.b,e}getStyle(e=on){At.fromWorkingColorSpace(dn.copy(this),e);const t=dn.r,n=dn.g,r=dn.b;return e!==on?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(r*255)})`}offsetHSL(e,t,n){return this.getHSL(Zi),this.setHSL(Zi.h+e,Zi.s+t,Zi.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Zi),e.getHSL(Eo);const n=Dc(Zi.h,Eo.h,t),r=Dc(Zi.s,Eo.s,t),s=Dc(Zi.l,Eo.l,t);return this.setHSL(n,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,r=this.b,s=e.elements;return this.r=s[0]*t+s[3]*n+s[6]*r,this.g=s[1]*t+s[4]*n+s[7]*r,this.b=s[2]*t+s[5]*n+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const dn=new gt;gt.NAMES=$p;let rb=0;class ss extends rs{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:rb++}),this.uuid=xr(),this.name="",this.type="Material",this.blending=ks,this.side=vr,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Cu,this.blendDst=Ru,this.blendEquation=Pr,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new gt(0,0,0),this.blendAlpha=0,this.depthFunc=Xl,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=vf,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=us,this.stencilZFail=us,this.stencilZPass=us,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(n):r&&r.isVector3&&n&&n.isVector3?r.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==ks&&(n.blending=this.blending),this.side!==vr&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Cu&&(n.blendSrc=this.blendSrc),this.blendDst!==Ru&&(n.blendDst=this.blendDst),this.blendEquation!==Pr&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Xl&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==vf&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==us&&(n.stencilFail=this.stencilFail),this.stencilZFail!==us&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==us&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function r(s){const a=[];for(const o in s){const l=s[o];delete l.metadata,a.push(l)}return a}if(t){const s=r(e.textures),a=r(e.images);s.length>0&&(n.textures=s),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const r=t.length;n=new Array(r);for(let s=0;s!==r;++s)n[s]=t[s].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class mh extends ss{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new gt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=Lp,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Vt=new X,So=new Ve;class Yn{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=Bu,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.gpuType=or,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return console.warn("THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=t.array[n+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)So.fromBufferAttribute(this,t),So.applyMatrix3(e),this.setXY(t,So.x,So.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)Vt.fromBufferAttribute(this,t),Vt.applyMatrix3(e),this.setXYZ(t,Vt.x,Vt.y,Vt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)Vt.fromBufferAttribute(this,t),Vt.applyMatrix4(e),this.setXYZ(t,Vt.x,Vt.y,Vt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Vt.fromBufferAttribute(this,t),Vt.applyNormalMatrix(e),this.setXYZ(t,Vt.x,Vt.y,Vt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Vt.fromBufferAttribute(this,t),Vt.transformDirection(e),this.setXYZ(t,Vt.x,Vt.y,Vt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=Ui(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Ct(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Ui(t,this.array)),t}setX(e,t){return this.normalized&&(t=Ct(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Ui(t,this.array)),t}setY(e,t){return this.normalized&&(t=Ct(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Ui(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Ct(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Ui(t,this.array)),t}setW(e,t){return this.normalized&&(t=Ct(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=Ct(t,this.array),n=Ct(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,r){return e*=this.itemSize,this.normalized&&(t=Ct(t,this.array),n=Ct(n,this.array),r=Ct(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this}setXYZW(e,t,n,r,s){return e*=this.itemSize,this.normalized&&(t=Ct(t,this.array),n=Ct(n,this.array),r=Ct(r,this.array),s=Ct(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Bu&&(e.usage=this.usage),e}}class Yp extends Yn{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class jp extends Yn{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class bn extends Yn{constructor(e,t,n){super(new Float32Array(e),t,n)}}let sb=0;const Un=new Nt,Xc=new Xt,_s=new X,Dn=new eo,xa=new eo,Qt=new X;class pn extends rs{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:sb++}),this.uuid=xr(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Vp(e)?jp:Yp)(e,1):this.index=e,this}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const s=new ut().getNormalMatrix(e);n.applyNormalMatrix(s),n.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Un.makeRotationFromQuaternion(e),this.applyMatrix4(Un),this}rotateX(e){return Un.makeRotationX(e),this.applyMatrix4(Un),this}rotateY(e){return Un.makeRotationY(e),this.applyMatrix4(Un),this}rotateZ(e){return Un.makeRotationZ(e),this.applyMatrix4(Un),this}translate(e,t,n){return Un.makeTranslation(e,t,n),this.applyMatrix4(Un),this}scale(e,t,n){return Un.makeScale(e,t,n),this.applyMatrix4(Un),this}lookAt(e){return Xc.lookAt(e),Xc.updateMatrix(),this.applyMatrix4(Xc.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(_s).negate(),this.translate(_s.x,_s.y,_s.z),this}setFromPoints(e){const t=[];for(let n=0,r=e.length;n<r;n++){const s=e[n];t.push(s.x,s.y,s.z||0)}return this.setAttribute("position",new bn(t,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new eo);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingBox.set(new X(-1/0,-1/0,-1/0),new X(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,r=t.length;n<r;n++){const s=t[n];Dn.setFromBufferAttribute(s),this.morphTargetsRelative?(Qt.addVectors(this.boundingBox.min,Dn.min),this.boundingBox.expandByPoint(Qt),Qt.addVectors(this.boundingBox.max,Dn.max),this.boundingBox.expandByPoint(Qt)):(this.boundingBox.expandByPoint(Dn.min),this.boundingBox.expandByPoint(Dn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new to);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingSphere.set(new X,1/0);return}if(e){const n=this.boundingSphere.center;if(Dn.setFromBufferAttribute(e),t)for(let s=0,a=t.length;s<a;s++){const o=t[s];xa.setFromBufferAttribute(o),this.morphTargetsRelative?(Qt.addVectors(Dn.min,xa.min),Dn.expandByPoint(Qt),Qt.addVectors(Dn.max,xa.max),Dn.expandByPoint(Qt)):(Dn.expandByPoint(xa.min),Dn.expandByPoint(xa.max))}Dn.getCenter(n);let r=0;for(let s=0,a=e.count;s<a;s++)Qt.fromBufferAttribute(e,s),r=Math.max(r,n.distanceToSquared(Qt));if(t)for(let s=0,a=t.length;s<a;s++){const o=t[s],l=this.morphTargetsRelative;for(let c=0,u=o.count;c<u;c++)Qt.fromBufferAttribute(o,c),l&&(_s.fromBufferAttribute(e,c),Qt.add(_s)),r=Math.max(r,n.distanceToSquared(Qt))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.array,r=t.position.array,s=t.normal.array,a=t.uv.array,o=r.length/3;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Yn(new Float32Array(4*o),4));const l=this.getAttribute("tangent").array,c=[],u=[];for(let y=0;y<o;y++)c[y]=new X,u[y]=new X;const f=new X,h=new X,m=new X,x=new Ve,v=new Ve,d=new Ve,p=new X,_=new X;function g(y,P,U){f.fromArray(r,y*3),h.fromArray(r,P*3),m.fromArray(r,U*3),x.fromArray(a,y*2),v.fromArray(a,P*2),d.fromArray(a,U*2),h.sub(f),m.sub(f),v.sub(x),d.sub(x);const G=1/(v.x*d.y-d.x*v.y);isFinite(G)&&(p.copy(h).multiplyScalar(d.y).addScaledVector(m,-v.y).multiplyScalar(G),_.copy(m).multiplyScalar(v.x).addScaledVector(h,-d.x).multiplyScalar(G),c[y].add(p),c[P].add(p),c[U].add(p),u[y].add(_),u[P].add(_),u[U].add(_))}let b=this.groups;b.length===0&&(b=[{start:0,count:n.length}]);for(let y=0,P=b.length;y<P;++y){const U=b[y],G=U.start,F=U.count;for(let z=G,q=G+F;z<q;z+=3)g(n[z+0],n[z+1],n[z+2])}const w=new X,S=new X,M=new X,I=new X;function E(y){M.fromArray(s,y*3),I.copy(M);const P=c[y];w.copy(P),w.sub(M.multiplyScalar(M.dot(P))).normalize(),S.crossVectors(I,P);const G=S.dot(u[y])<0?-1:1;l[y*4]=w.x,l[y*4+1]=w.y,l[y*4+2]=w.z,l[y*4+3]=G}for(let y=0,P=b.length;y<P;++y){const U=b[y],G=U.start,F=U.count;for(let z=G,q=G+F;z<q;z+=3)E(n[z+0]),E(n[z+1]),E(n[z+2])}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Yn(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let h=0,m=n.count;h<m;h++)n.setXYZ(h,0,0,0);const r=new X,s=new X,a=new X,o=new X,l=new X,c=new X,u=new X,f=new X;if(e)for(let h=0,m=e.count;h<m;h+=3){const x=e.getX(h+0),v=e.getX(h+1),d=e.getX(h+2);r.fromBufferAttribute(t,x),s.fromBufferAttribute(t,v),a.fromBufferAttribute(t,d),u.subVectors(a,s),f.subVectors(r,s),u.cross(f),o.fromBufferAttribute(n,x),l.fromBufferAttribute(n,v),c.fromBufferAttribute(n,d),o.add(u),l.add(u),c.add(u),n.setXYZ(x,o.x,o.y,o.z),n.setXYZ(v,l.x,l.y,l.z),n.setXYZ(d,c.x,c.y,c.z)}else for(let h=0,m=t.count;h<m;h+=3)r.fromBufferAttribute(t,h+0),s.fromBufferAttribute(t,h+1),a.fromBufferAttribute(t,h+2),u.subVectors(a,s),f.subVectors(r,s),u.cross(f),n.setXYZ(h+0,u.x,u.y,u.z),n.setXYZ(h+1,u.x,u.y,u.z),n.setXYZ(h+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Qt.fromBufferAttribute(e,t),Qt.normalize(),e.setXYZ(t,Qt.x,Qt.y,Qt.z)}toNonIndexed(){function e(o,l){const c=o.array,u=o.itemSize,f=o.normalized,h=new c.constructor(l.length*u);let m=0,x=0;for(let v=0,d=l.length;v<d;v++){o.isInterleavedBufferAttribute?m=l[v]*o.data.stride+o.offset:m=l[v]*u;for(let p=0;p<u;p++)h[x++]=c[m++]}return new Yn(h,u,f)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new pn,n=this.index.array,r=this.attributes;for(const o in r){const l=r[o],c=e(l,n);t.setAttribute(o,c)}const s=this.morphAttributes;for(const o in s){const l=[],c=s[o];for(let u=0,f=c.length;u<f;u++){const h=c[u],m=e(h,n);l.push(m)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const c=a[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const l in n){const c=n[l];e.data.attributes[l]=c.toJSON(e.data)}const r={};let s=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],u=[];for(let f=0,h=c.length;f<h;f++){const m=c[f];u.push(m.toJSON(e.data))}u.length>0&&(r[l]=u,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone(t));const r=e.attributes;for(const c in r){const u=r[c];this.setAttribute(c,u.clone(t))}const s=e.morphAttributes;for(const c in s){const u=[],f=s[c];for(let h=0,m=f.length;h<m;h++)u.push(f[h].clone(t));this.morphAttributes[c]=u}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let c=0,u=a.length;c<u;c++){const f=a[c];this.addGroup(f.start,f.count,f.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Lf=new Nt,Ar=new no,Mo=new to,Ff=new X,bs=new X,ys=new X,Es=new X,qc=new X,wo=new X,Ao=new Ve,To=new Ve,Co=new Ve,Bf=new X,If=new X,kf=new X,Ro=new X,Do=new X;class zi extends Xt{constructor(e=new pn,t=new mh){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const r=t[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}getVertexPosition(e,t){const n=this.geometry,r=n.attributes.position,s=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(r,e);const o=this.morphTargetInfluences;if(s&&o){wo.set(0,0,0);for(let l=0,c=s.length;l<c;l++){const u=o[l],f=s[l];u!==0&&(qc.fromBufferAttribute(f,e),a?wo.addScaledVector(qc,u):wo.addScaledVector(qc.sub(t),u))}t.add(wo)}return t}raycast(e,t){const n=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Mo.copy(n.boundingSphere),Mo.applyMatrix4(s),Ar.copy(e.ray).recast(e.near),!(Mo.containsPoint(Ar.origin)===!1&&(Ar.intersectSphere(Mo,Ff)===null||Ar.origin.distanceToSquared(Ff)>(e.far-e.near)**2))&&(Lf.copy(s).invert(),Ar.copy(e.ray).applyMatrix4(Lf),!(n.boundingBox!==null&&Ar.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,Ar)))}_computeIntersections(e,t,n){let r;const s=this.geometry,a=this.material,o=s.index,l=s.attributes.position,c=s.attributes.uv,u=s.attributes.uv1,f=s.attributes.normal,h=s.groups,m=s.drawRange;if(o!==null)if(Array.isArray(a))for(let x=0,v=h.length;x<v;x++){const d=h[x],p=a[d.materialIndex],_=Math.max(d.start,m.start),g=Math.min(o.count,Math.min(d.start+d.count,m.start+m.count));for(let b=_,w=g;b<w;b+=3){const S=o.getX(b),M=o.getX(b+1),I=o.getX(b+2);r=Po(this,p,e,n,c,u,f,S,M,I),r&&(r.faceIndex=Math.floor(b/3),r.face.materialIndex=d.materialIndex,t.push(r))}}else{const x=Math.max(0,m.start),v=Math.min(o.count,m.start+m.count);for(let d=x,p=v;d<p;d+=3){const _=o.getX(d),g=o.getX(d+1),b=o.getX(d+2);r=Po(this,a,e,n,c,u,f,_,g,b),r&&(r.faceIndex=Math.floor(d/3),t.push(r))}}else if(l!==void 0)if(Array.isArray(a))for(let x=0,v=h.length;x<v;x++){const d=h[x],p=a[d.materialIndex],_=Math.max(d.start,m.start),g=Math.min(l.count,Math.min(d.start+d.count,m.start+m.count));for(let b=_,w=g;b<w;b+=3){const S=b,M=b+1,I=b+2;r=Po(this,p,e,n,c,u,f,S,M,I),r&&(r.faceIndex=Math.floor(b/3),r.face.materialIndex=d.materialIndex,t.push(r))}}else{const x=Math.max(0,m.start),v=Math.min(l.count,m.start+m.count);for(let d=x,p=v;d<p;d+=3){const _=d,g=d+1,b=d+2;r=Po(this,a,e,n,c,u,f,_,g,b),r&&(r.faceIndex=Math.floor(d/3),t.push(r))}}}}function ab(i,e,t,n,r,s,a,o){let l;if(e.side===Mn?l=n.intersectTriangle(a,s,r,!0,o):l=n.intersectTriangle(r,s,a,e.side===vr,o),l===null)return null;Do.copy(o),Do.applyMatrix4(i.matrixWorld);const c=t.ray.origin.distanceTo(Do);return c<t.near||c>t.far?null:{distance:c,point:Do.clone(),object:i}}function Po(i,e,t,n,r,s,a,o,l,c){i.getVertexPosition(o,bs),i.getVertexPosition(l,ys),i.getVertexPosition(c,Es);const u=ab(i,e,t,n,bs,ys,Es,Ro);if(u){r&&(Ao.fromBufferAttribute(r,o),To.fromBufferAttribute(r,l),Co.fromBufferAttribute(r,c),u.uv=Vn.getInterpolation(Ro,bs,ys,Es,Ao,To,Co,new Ve)),s&&(Ao.fromBufferAttribute(s,o),To.fromBufferAttribute(s,l),Co.fromBufferAttribute(s,c),u.uv1=Vn.getInterpolation(Ro,bs,ys,Es,Ao,To,Co,new Ve),u.uv2=u.uv1),a&&(Bf.fromBufferAttribute(a,o),If.fromBufferAttribute(a,l),kf.fromBufferAttribute(a,c),u.normal=Vn.getInterpolation(Ro,bs,ys,Es,Bf,If,kf,new X),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));const f={a:o,b:l,c,normal:new X,materialIndex:0};Vn.getNormal(bs,ys,Es,f.normal),u.face=f}return u}class io extends pn{constructor(e=1,t=1,n=1,r=1,s=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:r,heightSegments:s,depthSegments:a};const o=this;r=Math.floor(r),s=Math.floor(s),a=Math.floor(a);const l=[],c=[],u=[],f=[];let h=0,m=0;x("z","y","x",-1,-1,n,t,e,a,s,0),x("z","y","x",1,-1,n,t,-e,a,s,1),x("x","z","y",1,1,e,n,t,r,a,2),x("x","z","y",1,-1,e,n,-t,r,a,3),x("x","y","z",1,-1,e,t,n,r,s,4),x("x","y","z",-1,-1,e,t,-n,r,s,5),this.setIndex(l),this.setAttribute("position",new bn(c,3)),this.setAttribute("normal",new bn(u,3)),this.setAttribute("uv",new bn(f,2));function x(v,d,p,_,g,b,w,S,M,I,E){const y=b/M,P=w/I,U=b/2,G=w/2,F=S/2,z=M+1,q=I+1;let ee=0,Z=0;const Q=new X;for(let j=0;j<q;j++){const W=j*P-G;for(let C=0;C<z;C++){const A=C*y-U;Q[v]=A*_,Q[d]=W*g,Q[p]=F,c.push(Q.x,Q.y,Q.z),Q[v]=0,Q[d]=0,Q[p]=S>0?1:-1,u.push(Q.x,Q.y,Q.z),f.push(C/M),f.push(1-j/I),ee+=1}}for(let j=0;j<I;j++)for(let W=0;W<M;W++){const C=h+W+z*j,A=h+W+z*(j+1),R=h+(W+1)+z*(j+1),N=h+(W+1)+z*j;l.push(C,A,N),l.push(A,R,N),Z+=6}o.addGroup(m,Z,E),m+=Z,h+=ee}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new io(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function ra(i){const e={};for(const t in i){e[t]={};for(const n in i[t]){const r=i[t][n];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=r.clone():Array.isArray(r)?e[t][n]=r.slice():e[t][n]=r}}return e}function xn(i){const e={};for(let t=0;t<i.length;t++){const n=ra(i[t]);for(const r in n)e[r]=n[r]}return e}function ob(i){const e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function Kp(i){return i.getRenderTarget()===null?i.outputColorSpace:At.workingColorSpace}const lb={clone:ra,merge:xn};var cb=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,ub=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Qr extends ss{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=cb,this.fragmentShader=ub,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={derivatives:!1,fragDepth:!1,drawBuffers:!1,shaderTextureLOD:!1,clipCullDistance:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=ra(e.uniforms),this.uniformsGroups=ob(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const r in this.uniforms){const a=this.uniforms[r].value;a&&a.isTexture?t.uniforms[r]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[r]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[r]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[r]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[r]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[r]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[r]={type:"m4",value:a.toArray()}:t.uniforms[r]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const r in this.extensions)this.extensions[r]===!0&&(n[r]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class Zp extends Xt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Nt,this.projectionMatrix=new Nt,this.projectionMatrixInverse=new Nt,this.coordinateSystem=Oi}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}class Wn extends Zp{constructor(e=50,t=1,n=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=ku*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Pl*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return ku*2*Math.atan(Math.tan(Pl*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}setViewOffset(e,t,n,r,s,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Pl*.5*this.fov)/this.zoom,n=2*t,r=this.aspect*n,s=-.5*r;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,c=a.fullHeight;s+=a.offsetX*r/l,t-=a.offsetY*n/c,r*=a.width/l,n*=a.height/c}const o=this.filmOffset;o!==0&&(s+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,t,t-n,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const Ss=-90,Ms=1;class hb extends Xt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new Wn(Ss,Ms,e,t);r.layers=this.layers,this.add(r);const s=new Wn(Ss,Ms,e,t);s.layers=this.layers,this.add(s);const a=new Wn(Ss,Ms,e,t);a.layers=this.layers,this.add(a);const o=new Wn(Ss,Ms,e,t);o.layers=this.layers,this.add(o);const l=new Wn(Ss,Ms,e,t);l.layers=this.layers,this.add(l);const c=new Wn(Ss,Ms,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,r,s,a,o,l]=t;for(const c of t)this.remove(c);if(e===Oi)n.up.set(0,1,0),n.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===jl)n.up.set(0,-1,0),n.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,a,o,l,c,u]=this.children,f=e.getRenderTarget(),h=e.getActiveCubeFace(),m=e.getActiveMipmapLevel(),x=e.xr.enabled;e.xr.enabled=!1;const v=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,r),e.render(t,s),e.setRenderTarget(n,1,r),e.render(t,a),e.setRenderTarget(n,2,r),e.render(t,o),e.setRenderTarget(n,3,r),e.render(t,l),e.setRenderTarget(n,4,r),e.render(t,c),n.texture.generateMipmaps=v,e.setRenderTarget(n,5,r),e.render(t,u),e.setRenderTarget(f,h,m),e.xr.enabled=x,n.texture.needsPMREMUpdate=!0}}class Qp extends wn{constructor(e,t,n,r,s,a,o,l,c,u){e=e!==void 0?e:[],t=t!==void 0?t:ta,super(e,t,n,r,s,a,o,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class fb extends Zr{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},r=[n,n,n,n,n,n];t.encoding!==void 0&&(Ia("THREE.WebGLCubeRenderTarget: option.encoding has been replaced by option.colorSpace."),t.colorSpace=t.encoding===qr?on:Xn),this.texture=new Qp(r,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:Gn}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new io(5,5,5),s=new Qr({name:"CubemapFromEquirect",uniforms:ra(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Mn,blending:dr});s.uniforms.tEquirect.value=t;const a=new zi(r,s),o=t.minFilter;return t.minFilter===Wa&&(t.minFilter=Gn),new hb(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t,n,r){const s=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,r);e.setRenderTarget(s)}}const $c=new X,db=new X,pb=new ut;class er{constructor(e=new X(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,r){return this.normal.set(e,t,n),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const r=$c.subVectors(n,t).cross(db.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const n=e.delta($c),r=this.normal.dot(n);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const s=-(e.start.dot(this.normal)+this.constant)/r;return s<0||s>1?null:t.copy(e.start).addScaledVector(n,s)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||pb.getNormalMatrix(e),r=this.coplanarPoint($c).applyMatrix4(e),s=this.normal.applyMatrix3(n).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Tr=new to,Lo=new X;class xh{constructor(e=new er,t=new er,n=new er,r=new er,s=new er,a=new er){this.planes=[e,t,n,r,s,a]}set(e,t,n,r,s,a){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(r),o[4].copy(s),o[5].copy(a),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=Oi){const n=this.planes,r=e.elements,s=r[0],a=r[1],o=r[2],l=r[3],c=r[4],u=r[5],f=r[6],h=r[7],m=r[8],x=r[9],v=r[10],d=r[11],p=r[12],_=r[13],g=r[14],b=r[15];if(n[0].setComponents(l-s,h-c,d-m,b-p).normalize(),n[1].setComponents(l+s,h+c,d+m,b+p).normalize(),n[2].setComponents(l+a,h+u,d+x,b+_).normalize(),n[3].setComponents(l-a,h-u,d-x,b-_).normalize(),n[4].setComponents(l-o,h-f,d-v,b-g).normalize(),t===Oi)n[5].setComponents(l+o,h+f,d+v,b+g).normalize();else if(t===jl)n[5].setComponents(o,f,v,g).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Tr.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Tr.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Tr)}intersectsSprite(e){return Tr.center.set(0,0,0),Tr.radius=.7071067811865476,Tr.applyMatrix4(e.matrixWorld),this.intersectsSphere(Tr)}intersectsSphere(e){const t=this.planes,n=e.center,r=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(n)<r)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const r=t[n];if(Lo.x=r.normal.x>0?e.max.x:e.min.x,Lo.y=r.normal.y>0?e.max.y:e.min.y,Lo.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(Lo)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function Jp(){let i=null,e=!1,t=null,n=null;function r(s,a){t(s,a),n=i.requestAnimationFrame(r)}return{start:function(){e!==!0&&t!==null&&(n=i.requestAnimationFrame(r),e=!0)},stop:function(){i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){i=s}}}function mb(i,e){const t=e.isWebGL2,n=new WeakMap;function r(c,u){const f=c.array,h=c.usage,m=f.byteLength,x=i.createBuffer();i.bindBuffer(u,x),i.bufferData(u,f,h),c.onUploadCallback();let v;if(f instanceof Float32Array)v=i.FLOAT;else if(f instanceof Uint16Array)if(c.isFloat16BufferAttribute)if(t)v=i.HALF_FLOAT;else throw new Error("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.");else v=i.UNSIGNED_SHORT;else if(f instanceof Int16Array)v=i.SHORT;else if(f instanceof Uint32Array)v=i.UNSIGNED_INT;else if(f instanceof Int32Array)v=i.INT;else if(f instanceof Int8Array)v=i.BYTE;else if(f instanceof Uint8Array)v=i.UNSIGNED_BYTE;else if(f instanceof Uint8ClampedArray)v=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+f);return{buffer:x,type:v,bytesPerElement:f.BYTES_PER_ELEMENT,version:c.version,size:m}}function s(c,u,f){const h=u.array,m=u._updateRange,x=u.updateRanges;if(i.bindBuffer(f,c),m.count===-1&&x.length===0&&i.bufferSubData(f,0,h),x.length!==0){for(let v=0,d=x.length;v<d;v++){const p=x[v];t?i.bufferSubData(f,p.start*h.BYTES_PER_ELEMENT,h,p.start,p.count):i.bufferSubData(f,p.start*h.BYTES_PER_ELEMENT,h.subarray(p.start,p.start+p.count))}u.clearUpdateRanges()}m.count!==-1&&(t?i.bufferSubData(f,m.offset*h.BYTES_PER_ELEMENT,h,m.offset,m.count):i.bufferSubData(f,m.offset*h.BYTES_PER_ELEMENT,h.subarray(m.offset,m.offset+m.count)),m.count=-1),u.onUploadCallback()}function a(c){return c.isInterleavedBufferAttribute&&(c=c.data),n.get(c)}function o(c){c.isInterleavedBufferAttribute&&(c=c.data);const u=n.get(c);u&&(i.deleteBuffer(u.buffer),n.delete(c))}function l(c,u){if(c.isGLBufferAttribute){const h=n.get(c);(!h||h.version<c.version)&&n.set(c,{buffer:c.buffer,type:c.type,bytesPerElement:c.elementSize,version:c.version});return}c.isInterleavedBufferAttribute&&(c=c.data);const f=n.get(c);if(f===void 0)n.set(c,r(c,u));else if(f.version<c.version){if(f.size!==c.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");s(f.buffer,c,u),f.version=c.version}}return{get:a,remove:o,update:l}}class gh extends pn{constructor(e=1,t=1,n=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:r};const s=e/2,a=t/2,o=Math.floor(n),l=Math.floor(r),c=o+1,u=l+1,f=e/o,h=t/l,m=[],x=[],v=[],d=[];for(let p=0;p<u;p++){const _=p*h-a;for(let g=0;g<c;g++){const b=g*f-s;x.push(b,-_,0),v.push(0,0,1),d.push(g/o),d.push(1-p/l)}}for(let p=0;p<l;p++)for(let _=0;_<o;_++){const g=_+c*p,b=_+c*(p+1),w=_+1+c*(p+1),S=_+1+c*p;m.push(g,b,S),m.push(b,w,S)}this.setIndex(m),this.setAttribute("position",new bn(x,3)),this.setAttribute("normal",new bn(v,3)),this.setAttribute("uv",new bn(d,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new gh(e.width,e.height,e.widthSegments,e.heightSegments)}}var xb=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,gb=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,vb=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,_b=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,bb=`#ifdef USE_ALPHATEST
	if ( diffuseColor.a < alphaTest ) discard;
#endif`,yb=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Eb=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Sb=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Mb=`#ifdef USE_BATCHING
	attribute float batchId;
	uniform highp sampler2D batchingTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,wb=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( batchId );
#endif`,Ab=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Tb=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Cb=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Rb=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Db=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Pb=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#pragma unroll_loop_start
	for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
		plane = clippingPlanes[ i ];
		if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
	}
	#pragma unroll_loop_end
	#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
		bool clipped = true;
		#pragma unroll_loop_start
		for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
		}
		#pragma unroll_loop_end
		if ( clipped ) discard;
	#endif
#endif`,Lb=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Fb=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Bb=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Ib=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,kb=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Ub=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,Nb=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,Ob=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
float luminance( const in vec3 rgb ) {
	const vec3 weights = vec3( 0.2126729, 0.7151522, 0.0721750 );
	return dot( weights, rgb );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,zb=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,Hb=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,Gb=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Vb=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Wb=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Xb=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,qb="gl_FragColor = linearToOutputTexel( gl_FragColor );",$b=`
const mat3 LINEAR_SRGB_TO_LINEAR_DISPLAY_P3 = mat3(
	vec3( 0.8224621, 0.177538, 0.0 ),
	vec3( 0.0331941, 0.9668058, 0.0 ),
	vec3( 0.0170827, 0.0723974, 0.9105199 )
);
const mat3 LINEAR_DISPLAY_P3_TO_LINEAR_SRGB = mat3(
	vec3( 1.2249401, - 0.2249404, 0.0 ),
	vec3( - 0.0420569, 1.0420571, 0.0 ),
	vec3( - 0.0196376, - 0.0786361, 1.0982735 )
);
vec4 LinearSRGBToLinearDisplayP3( in vec4 value ) {
	return vec4( value.rgb * LINEAR_SRGB_TO_LINEAR_DISPLAY_P3, value.a );
}
vec4 LinearDisplayP3ToLinearSRGB( in vec4 value ) {
	return vec4( value.rgb * LINEAR_DISPLAY_P3_TO_LINEAR_SRGB, value.a );
}
vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}
vec4 LinearToLinear( in vec4 value ) {
	return value;
}
vec4 LinearTosRGB( in vec4 value ) {
	return sRGBTransferOETF( value );
}`,Yb=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,jb=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Kb=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,Zb=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Qb=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,Jb=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,ey=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,ty=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,ny=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,iy=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,ry=`#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`,sy=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,ay=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,oy=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,ly=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	#if defined ( LEGACY_LIGHTS )
		if ( cutoffDistance > 0.0 && decayExponent > 0.0 ) {
			return pow( saturate( - lightDistance / cutoffDistance + 1.0 ), decayExponent );
		}
		return 1.0;
	#else
		float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
		if ( cutoffDistance > 0.0 ) {
			distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
		}
		return distanceFalloff;
	#endif
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,cy=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,uy=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,hy=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,fy=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,dy=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,py=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,my=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,xy=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,gy=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,vy=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,_y=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	gl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,by=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,yy=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		varying float vFragDepth;
		varying float vIsPerspective;
	#else
		uniform float logDepthBufFC;
	#endif
#endif`,Ey=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		vFragDepth = 1.0 + gl_Position.w;
		vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
	#else
		if ( isPerspectiveMatrix( projectionMatrix ) ) {
			gl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;
			gl_Position.z *= gl_Position.w;
		}
	#endif
#endif`,Sy=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,My=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,wy=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Ay=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Ty=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Cy=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Ry=`#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Dy=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		objectNormal += morphNormal0 * morphTargetInfluences[ 0 ];
		objectNormal += morphNormal1 * morphTargetInfluences[ 1 ];
		objectNormal += morphNormal2 * morphTargetInfluences[ 2 ];
		objectNormal += morphNormal3 * morphTargetInfluences[ 3 ];
	#endif
#endif`,Py=`#ifdef USE_MORPHTARGETS
	uniform float morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
		uniform sampler2DArray morphTargetsTexture;
		uniform ivec2 morphTargetsTextureSize;
		vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
			int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
			int y = texelIndex / morphTargetsTextureSize.x;
			int x = texelIndex - y * morphTargetsTextureSize.x;
			ivec3 morphUV = ivec3( x, y, morphTargetIndex );
			return texelFetch( morphTargetsTexture, morphUV, 0 );
		}
	#else
		#ifndef USE_MORPHNORMALS
			uniform float morphTargetInfluences[ 8 ];
		#else
			uniform float morphTargetInfluences[ 4 ];
		#endif
	#endif
#endif`,Ly=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		transformed += morphTarget0 * morphTargetInfluences[ 0 ];
		transformed += morphTarget1 * morphTargetInfluences[ 1 ];
		transformed += morphTarget2 * morphTargetInfluences[ 2 ];
		transformed += morphTarget3 * morphTargetInfluences[ 3 ];
		#ifndef USE_MORPHNORMALS
			transformed += morphTarget4 * morphTargetInfluences[ 4 ];
			transformed += morphTarget5 * morphTargetInfluences[ 5 ];
			transformed += morphTarget6 * morphTargetInfluences[ 6 ];
			transformed += morphTarget7 * morphTargetInfluences[ 7 ];
		#endif
	#endif
#endif`,Fy=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,By=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Iy=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,ky=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Uy=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Ny=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,Oy=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,zy=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Hy=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Gy=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Vy=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Wy=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;
const vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256., 256. );
const vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );
const float ShiftRight8 = 1. / 256.;
vec4 packDepthToRGBA( const in float v ) {
	vec4 r = vec4( fract( v * PackFactors ), v );
	r.yzw -= r.xyz * ShiftRight8;	return r * PackUpscale;
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors );
}
vec2 packDepthToRG( in highp float v ) {
	return packDepthToRGBA( v ).yx;
}
float unpackRGToDepth( const in highp vec2 v ) {
	return unpackRGBAToDepth( vec4( v.xy, 0.0, 0.0 ) );
}
vec4 pack2HalfToRGBA( vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,Xy=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,qy=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,$y=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Yy=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,jy=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Ky=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Zy=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return shadow;
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
		vec3 lightToPosition = shadowCoord.xyz;
		float dp = ( length( lightToPosition ) - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );		dp += shadowBias;
		vec3 bd3D = normalize( lightToPosition );
		#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
			vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
			return (
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
			) * ( 1.0 / 9.0 );
		#else
			return texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
		#endif
	}
#endif`,Qy=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,Jy=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,eE=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,tE=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,nE=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,iE=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,rE=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,sE=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,aE=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,oE=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,lE=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 OptimizedCineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color *= toneMappingExposure;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	return color;
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,cE=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,uE=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
		vec3 refractedRayExit = position + transmissionRay;
		vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
		vec2 refractionCoords = ndcPos.xy / ndcPos.w;
		refractionCoords += 1.0;
		refractionCoords /= 2.0;
		vec4 transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
		vec3 transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,hE=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,fE=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,dE=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,pE=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const mE=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,xE=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,gE=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,vE=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,_E=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,bE=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,yE=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,EE=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#endif
}`,SE=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,ME=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,wE=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,AE=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,TE=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,CE=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,RE=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,DE=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,PE=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,LE=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,FE=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,BE=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,IE=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,kE=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), opacity );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,UE=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,NE=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,OE=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,zE=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,HE=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,GE=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,VE=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,WE=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,XE=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,qE=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,$E=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );
	vec2 scale;
	scale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );
	scale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,YE=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,st={alphahash_fragment:xb,alphahash_pars_fragment:gb,alphamap_fragment:vb,alphamap_pars_fragment:_b,alphatest_fragment:bb,alphatest_pars_fragment:yb,aomap_fragment:Eb,aomap_pars_fragment:Sb,batching_pars_vertex:Mb,batching_vertex:wb,begin_vertex:Ab,beginnormal_vertex:Tb,bsdfs:Cb,iridescence_fragment:Rb,bumpmap_pars_fragment:Db,clipping_planes_fragment:Pb,clipping_planes_pars_fragment:Lb,clipping_planes_pars_vertex:Fb,clipping_planes_vertex:Bb,color_fragment:Ib,color_pars_fragment:kb,color_pars_vertex:Ub,color_vertex:Nb,common:Ob,cube_uv_reflection_fragment:zb,defaultnormal_vertex:Hb,displacementmap_pars_vertex:Gb,displacementmap_vertex:Vb,emissivemap_fragment:Wb,emissivemap_pars_fragment:Xb,colorspace_fragment:qb,colorspace_pars_fragment:$b,envmap_fragment:Yb,envmap_common_pars_fragment:jb,envmap_pars_fragment:Kb,envmap_pars_vertex:Zb,envmap_physical_pars_fragment:cy,envmap_vertex:Qb,fog_vertex:Jb,fog_pars_vertex:ey,fog_fragment:ty,fog_pars_fragment:ny,gradientmap_pars_fragment:iy,lightmap_fragment:ry,lightmap_pars_fragment:sy,lights_lambert_fragment:ay,lights_lambert_pars_fragment:oy,lights_pars_begin:ly,lights_toon_fragment:uy,lights_toon_pars_fragment:hy,lights_phong_fragment:fy,lights_phong_pars_fragment:dy,lights_physical_fragment:py,lights_physical_pars_fragment:my,lights_fragment_begin:xy,lights_fragment_maps:gy,lights_fragment_end:vy,logdepthbuf_fragment:_y,logdepthbuf_pars_fragment:by,logdepthbuf_pars_vertex:yy,logdepthbuf_vertex:Ey,map_fragment:Sy,map_pars_fragment:My,map_particle_fragment:wy,map_particle_pars_fragment:Ay,metalnessmap_fragment:Ty,metalnessmap_pars_fragment:Cy,morphcolor_vertex:Ry,morphnormal_vertex:Dy,morphtarget_pars_vertex:Py,morphtarget_vertex:Ly,normal_fragment_begin:Fy,normal_fragment_maps:By,normal_pars_fragment:Iy,normal_pars_vertex:ky,normal_vertex:Uy,normalmap_pars_fragment:Ny,clearcoat_normal_fragment_begin:Oy,clearcoat_normal_fragment_maps:zy,clearcoat_pars_fragment:Hy,iridescence_pars_fragment:Gy,opaque_fragment:Vy,packing:Wy,premultiplied_alpha_fragment:Xy,project_vertex:qy,dithering_fragment:$y,dithering_pars_fragment:Yy,roughnessmap_fragment:jy,roughnessmap_pars_fragment:Ky,shadowmap_pars_fragment:Zy,shadowmap_pars_vertex:Qy,shadowmap_vertex:Jy,shadowmask_pars_fragment:eE,skinbase_vertex:tE,skinning_pars_vertex:nE,skinning_vertex:iE,skinnormal_vertex:rE,specularmap_fragment:sE,specularmap_pars_fragment:aE,tonemapping_fragment:oE,tonemapping_pars_fragment:lE,transmission_fragment:cE,transmission_pars_fragment:uE,uv_pars_fragment:hE,uv_pars_vertex:fE,uv_vertex:dE,worldpos_vertex:pE,background_vert:mE,background_frag:xE,backgroundCube_vert:gE,backgroundCube_frag:vE,cube_vert:_E,cube_frag:bE,depth_vert:yE,depth_frag:EE,distanceRGBA_vert:SE,distanceRGBA_frag:ME,equirect_vert:wE,equirect_frag:AE,linedashed_vert:TE,linedashed_frag:CE,meshbasic_vert:RE,meshbasic_frag:DE,meshlambert_vert:PE,meshlambert_frag:LE,meshmatcap_vert:FE,meshmatcap_frag:BE,meshnormal_vert:IE,meshnormal_frag:kE,meshphong_vert:UE,meshphong_frag:NE,meshphysical_vert:OE,meshphysical_frag:zE,meshtoon_vert:HE,meshtoon_frag:GE,points_vert:VE,points_frag:WE,shadow_vert:XE,shadow_frag:qE,sprite_vert:$E,sprite_frag:YE},Te={common:{diffuse:{value:new gt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new ut},alphaMap:{value:null},alphaMapTransform:{value:new ut},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new ut}},envmap:{envMap:{value:null},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new ut}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new ut}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new ut},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new ut},normalScale:{value:new Ve(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new ut},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new ut}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new ut}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new ut}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new gt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new gt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new ut},alphaTest:{value:0},uvTransform:{value:new ut}},sprite:{diffuse:{value:new gt(16777215)},opacity:{value:1},center:{value:new Ve(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new ut},alphaMap:{value:null},alphaMapTransform:{value:new ut},alphaTest:{value:0}}},xi={basic:{uniforms:xn([Te.common,Te.specularmap,Te.envmap,Te.aomap,Te.lightmap,Te.fog]),vertexShader:st.meshbasic_vert,fragmentShader:st.meshbasic_frag},lambert:{uniforms:xn([Te.common,Te.specularmap,Te.envmap,Te.aomap,Te.lightmap,Te.emissivemap,Te.bumpmap,Te.normalmap,Te.displacementmap,Te.fog,Te.lights,{emissive:{value:new gt(0)}}]),vertexShader:st.meshlambert_vert,fragmentShader:st.meshlambert_frag},phong:{uniforms:xn([Te.common,Te.specularmap,Te.envmap,Te.aomap,Te.lightmap,Te.emissivemap,Te.bumpmap,Te.normalmap,Te.displacementmap,Te.fog,Te.lights,{emissive:{value:new gt(0)},specular:{value:new gt(1118481)},shininess:{value:30}}]),vertexShader:st.meshphong_vert,fragmentShader:st.meshphong_frag},standard:{uniforms:xn([Te.common,Te.envmap,Te.aomap,Te.lightmap,Te.emissivemap,Te.bumpmap,Te.normalmap,Te.displacementmap,Te.roughnessmap,Te.metalnessmap,Te.fog,Te.lights,{emissive:{value:new gt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:st.meshphysical_vert,fragmentShader:st.meshphysical_frag},toon:{uniforms:xn([Te.common,Te.aomap,Te.lightmap,Te.emissivemap,Te.bumpmap,Te.normalmap,Te.displacementmap,Te.gradientmap,Te.fog,Te.lights,{emissive:{value:new gt(0)}}]),vertexShader:st.meshtoon_vert,fragmentShader:st.meshtoon_frag},matcap:{uniforms:xn([Te.common,Te.bumpmap,Te.normalmap,Te.displacementmap,Te.fog,{matcap:{value:null}}]),vertexShader:st.meshmatcap_vert,fragmentShader:st.meshmatcap_frag},points:{uniforms:xn([Te.points,Te.fog]),vertexShader:st.points_vert,fragmentShader:st.points_frag},dashed:{uniforms:xn([Te.common,Te.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:st.linedashed_vert,fragmentShader:st.linedashed_frag},depth:{uniforms:xn([Te.common,Te.displacementmap]),vertexShader:st.depth_vert,fragmentShader:st.depth_frag},normal:{uniforms:xn([Te.common,Te.bumpmap,Te.normalmap,Te.displacementmap,{opacity:{value:1}}]),vertexShader:st.meshnormal_vert,fragmentShader:st.meshnormal_frag},sprite:{uniforms:xn([Te.sprite,Te.fog]),vertexShader:st.sprite_vert,fragmentShader:st.sprite_frag},background:{uniforms:{uvTransform:{value:new ut},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:st.background_vert,fragmentShader:st.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1}},vertexShader:st.backgroundCube_vert,fragmentShader:st.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:st.cube_vert,fragmentShader:st.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:st.equirect_vert,fragmentShader:st.equirect_frag},distanceRGBA:{uniforms:xn([Te.common,Te.displacementmap,{referencePosition:{value:new X},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:st.distanceRGBA_vert,fragmentShader:st.distanceRGBA_frag},shadow:{uniforms:xn([Te.lights,Te.fog,{color:{value:new gt(0)},opacity:{value:1}}]),vertexShader:st.shadow_vert,fragmentShader:st.shadow_frag}};xi.physical={uniforms:xn([xi.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new ut},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new ut},clearcoatNormalScale:{value:new Ve(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new ut},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new ut},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new ut},sheen:{value:0},sheenColor:{value:new gt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new ut},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new ut},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new ut},transmissionSamplerSize:{value:new Ve},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new ut},attenuationDistance:{value:0},attenuationColor:{value:new gt(0)},specularColor:{value:new gt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new ut},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new ut},anisotropyVector:{value:new Ve},anisotropyMap:{value:null},anisotropyMapTransform:{value:new ut}}]),vertexShader:st.meshphysical_vert,fragmentShader:st.meshphysical_frag};const Fo={r:0,b:0,g:0};function jE(i,e,t,n,r,s,a){const o=new gt(0);let l=s===!0?0:1,c,u,f=null,h=0,m=null;function x(d,p){let _=!1,g=p.isScene===!0?p.background:null;g&&g.isTexture&&(g=(p.backgroundBlurriness>0?t:e).get(g)),g===null?v(o,l):g&&g.isColor&&(v(g,1),_=!0);const b=i.xr.getEnvironmentBlendMode();b==="additive"?n.buffers.color.setClear(0,0,0,1,a):b==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,a),(i.autoClear||_)&&i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil),g&&(g.isCubeTexture||g.mapping===cc)?(u===void 0&&(u=new zi(new io(1,1,1),new Qr({name:"BackgroundCubeMaterial",uniforms:ra(xi.backgroundCube.uniforms),vertexShader:xi.backgroundCube.vertexShader,fragmentShader:xi.backgroundCube.fragmentShader,side:Mn,depthTest:!1,depthWrite:!1,fog:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(w,S,M){this.matrixWorld.copyPosition(M.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(u)),u.material.uniforms.envMap.value=g,u.material.uniforms.flipEnvMap.value=g.isCubeTexture&&g.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=p.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=p.backgroundIntensity,u.material.toneMapped=At.getTransfer(g.colorSpace)!==Dt,(f!==g||h!==g.version||m!==i.toneMapping)&&(u.material.needsUpdate=!0,f=g,h=g.version,m=i.toneMapping),u.layers.enableAll(),d.unshift(u,u.geometry,u.material,0,0,null)):g&&g.isTexture&&(c===void 0&&(c=new zi(new gh(2,2),new Qr({name:"BackgroundMaterial",uniforms:ra(xi.background.uniforms),vertexShader:xi.background.vertexShader,fragmentShader:xi.background.fragmentShader,side:vr,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(c)),c.material.uniforms.t2D.value=g,c.material.uniforms.backgroundIntensity.value=p.backgroundIntensity,c.material.toneMapped=At.getTransfer(g.colorSpace)!==Dt,g.matrixAutoUpdate===!0&&g.updateMatrix(),c.material.uniforms.uvTransform.value.copy(g.matrix),(f!==g||h!==g.version||m!==i.toneMapping)&&(c.material.needsUpdate=!0,f=g,h=g.version,m=i.toneMapping),c.layers.enableAll(),d.unshift(c,c.geometry,c.material,0,0,null))}function v(d,p){d.getRGB(Fo,Kp(i)),n.buffers.color.setClear(Fo.r,Fo.g,Fo.b,p,a)}return{getClearColor:function(){return o},setClearColor:function(d,p=1){o.set(d),l=p,v(o,l)},getClearAlpha:function(){return l},setClearAlpha:function(d){l=d,v(o,l)},render:x}}function KE(i,e,t,n){const r=i.getParameter(i.MAX_VERTEX_ATTRIBS),s=n.isWebGL2?null:e.get("OES_vertex_array_object"),a=n.isWebGL2||s!==null,o={},l=d(null);let c=l,u=!1;function f(F,z,q,ee,Z){let Q=!1;if(a){const j=v(ee,q,z);c!==j&&(c=j,m(c.object)),Q=p(F,ee,q,Z),Q&&_(F,ee,q,Z)}else{const j=z.wireframe===!0;(c.geometry!==ee.id||c.program!==q.id||c.wireframe!==j)&&(c.geometry=ee.id,c.program=q.id,c.wireframe=j,Q=!0)}Z!==null&&t.update(Z,i.ELEMENT_ARRAY_BUFFER),(Q||u)&&(u=!1,I(F,z,q,ee),Z!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(Z).buffer))}function h(){return n.isWebGL2?i.createVertexArray():s.createVertexArrayOES()}function m(F){return n.isWebGL2?i.bindVertexArray(F):s.bindVertexArrayOES(F)}function x(F){return n.isWebGL2?i.deleteVertexArray(F):s.deleteVertexArrayOES(F)}function v(F,z,q){const ee=q.wireframe===!0;let Z=o[F.id];Z===void 0&&(Z={},o[F.id]=Z);let Q=Z[z.id];Q===void 0&&(Q={},Z[z.id]=Q);let j=Q[ee];return j===void 0&&(j=d(h()),Q[ee]=j),j}function d(F){const z=[],q=[],ee=[];for(let Z=0;Z<r;Z++)z[Z]=0,q[Z]=0,ee[Z]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:z,enabledAttributes:q,attributeDivisors:ee,object:F,attributes:{},index:null}}function p(F,z,q,ee){const Z=c.attributes,Q=z.attributes;let j=0;const W=q.getAttributes();for(const C in W)if(W[C].location>=0){const R=Z[C];let N=Q[C];if(N===void 0&&(C==="instanceMatrix"&&F.instanceMatrix&&(N=F.instanceMatrix),C==="instanceColor"&&F.instanceColor&&(N=F.instanceColor)),R===void 0||R.attribute!==N||N&&R.data!==N.data)return!0;j++}return c.attributesNum!==j||c.index!==ee}function _(F,z,q,ee){const Z={},Q=z.attributes;let j=0;const W=q.getAttributes();for(const C in W)if(W[C].location>=0){let R=Q[C];R===void 0&&(C==="instanceMatrix"&&F.instanceMatrix&&(R=F.instanceMatrix),C==="instanceColor"&&F.instanceColor&&(R=F.instanceColor));const N={};N.attribute=R,R&&R.data&&(N.data=R.data),Z[C]=N,j++}c.attributes=Z,c.attributesNum=j,c.index=ee}function g(){const F=c.newAttributes;for(let z=0,q=F.length;z<q;z++)F[z]=0}function b(F){w(F,0)}function w(F,z){const q=c.newAttributes,ee=c.enabledAttributes,Z=c.attributeDivisors;q[F]=1,ee[F]===0&&(i.enableVertexAttribArray(F),ee[F]=1),Z[F]!==z&&((n.isWebGL2?i:e.get("ANGLE_instanced_arrays"))[n.isWebGL2?"vertexAttribDivisor":"vertexAttribDivisorANGLE"](F,z),Z[F]=z)}function S(){const F=c.newAttributes,z=c.enabledAttributes;for(let q=0,ee=z.length;q<ee;q++)z[q]!==F[q]&&(i.disableVertexAttribArray(q),z[q]=0)}function M(F,z,q,ee,Z,Q,j){j===!0?i.vertexAttribIPointer(F,z,q,Z,Q):i.vertexAttribPointer(F,z,q,ee,Z,Q)}function I(F,z,q,ee){if(n.isWebGL2===!1&&(F.isInstancedMesh||ee.isInstancedBufferGeometry)&&e.get("ANGLE_instanced_arrays")===null)return;g();const Z=ee.attributes,Q=q.getAttributes(),j=z.defaultAttributeValues;for(const W in Q){const C=Q[W];if(C.location>=0){let A=Z[W];if(A===void 0&&(W==="instanceMatrix"&&F.instanceMatrix&&(A=F.instanceMatrix),W==="instanceColor"&&F.instanceColor&&(A=F.instanceColor)),A!==void 0){const R=A.normalized,N=A.itemSize,$=t.get(A);if($===void 0)continue;const he=$.buffer,J=$.type,se=$.bytesPerElement,V=n.isWebGL2===!0&&(J===i.INT||J===i.UNSIGNED_INT||A.gpuType===Bp);if(A.isInterleavedBufferAttribute){const ie=A.data,O=ie.stride,le=A.offset;if(ie.isInstancedInterleavedBuffer){for(let ce=0;ce<C.locationSize;ce++)w(C.location+ce,ie.meshPerAttribute);F.isInstancedMesh!==!0&&ee._maxInstanceCount===void 0&&(ee._maxInstanceCount=ie.meshPerAttribute*ie.count)}else for(let ce=0;ce<C.locationSize;ce++)b(C.location+ce);i.bindBuffer(i.ARRAY_BUFFER,he);for(let ce=0;ce<C.locationSize;ce++)M(C.location+ce,N/C.locationSize,J,R,O*se,(le+N/C.locationSize*ce)*se,V)}else{if(A.isInstancedBufferAttribute){for(let ie=0;ie<C.locationSize;ie++)w(C.location+ie,A.meshPerAttribute);F.isInstancedMesh!==!0&&ee._maxInstanceCount===void 0&&(ee._maxInstanceCount=A.meshPerAttribute*A.count)}else for(let ie=0;ie<C.locationSize;ie++)b(C.location+ie);i.bindBuffer(i.ARRAY_BUFFER,he);for(let ie=0;ie<C.locationSize;ie++)M(C.location+ie,N/C.locationSize,J,R,N*se,N/C.locationSize*ie*se,V)}}else if(j!==void 0){const R=j[W];if(R!==void 0)switch(R.length){case 2:i.vertexAttrib2fv(C.location,R);break;case 3:i.vertexAttrib3fv(C.location,R);break;case 4:i.vertexAttrib4fv(C.location,R);break;default:i.vertexAttrib1fv(C.location,R)}}}}S()}function E(){U();for(const F in o){const z=o[F];for(const q in z){const ee=z[q];for(const Z in ee)x(ee[Z].object),delete ee[Z];delete z[q]}delete o[F]}}function y(F){if(o[F.id]===void 0)return;const z=o[F.id];for(const q in z){const ee=z[q];for(const Z in ee)x(ee[Z].object),delete ee[Z];delete z[q]}delete o[F.id]}function P(F){for(const z in o){const q=o[z];if(q[F.id]===void 0)continue;const ee=q[F.id];for(const Z in ee)x(ee[Z].object),delete ee[Z];delete q[F.id]}}function U(){G(),u=!0,c!==l&&(c=l,m(c.object))}function G(){l.geometry=null,l.program=null,l.wireframe=!1}return{setup:f,reset:U,resetDefaultState:G,dispose:E,releaseStatesOfGeometry:y,releaseStatesOfProgram:P,initAttributes:g,enableAttribute:b,disableUnusedAttributes:S}}function ZE(i,e,t,n){const r=n.isWebGL2;let s;function a(u){s=u}function o(u,f){i.drawArrays(s,u,f),t.update(f,s,1)}function l(u,f,h){if(h===0)return;let m,x;if(r)m=i,x="drawArraysInstanced";else if(m=e.get("ANGLE_instanced_arrays"),x="drawArraysInstancedANGLE",m===null){console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}m[x](s,u,f,h),t.update(f,s,h)}function c(u,f,h){if(h===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let x=0;x<h;x++)this.render(u[x],f[x]);else{m.multiDrawArraysWEBGL(s,u,0,f,0,h);let x=0;for(let v=0;v<h;v++)x+=f[v];t.update(x,s,1)}}this.setMode=a,this.render=o,this.renderInstances=l,this.renderMultiDraw=c}function QE(i,e,t){let n;function r(){if(n!==void 0)return n;if(e.has("EXT_texture_filter_anisotropic")===!0){const M=e.get("EXT_texture_filter_anisotropic");n=i.getParameter(M.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else n=0;return n}function s(M){if(M==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";M="mediump"}return M==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}const a=typeof WebGL2RenderingContext<"u"&&i.constructor.name==="WebGL2RenderingContext";let o=t.precision!==void 0?t.precision:"highp";const l=s(o);l!==o&&(console.warn("THREE.WebGLRenderer:",o,"not supported, using",l,"instead."),o=l);const c=a||e.has("WEBGL_draw_buffers"),u=t.logarithmicDepthBuffer===!0,f=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),h=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),m=i.getParameter(i.MAX_TEXTURE_SIZE),x=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),v=i.getParameter(i.MAX_VERTEX_ATTRIBS),d=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),p=i.getParameter(i.MAX_VARYING_VECTORS),_=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),g=h>0,b=a||e.has("OES_texture_float"),w=g&&b,S=a?i.getParameter(i.MAX_SAMPLES):0;return{isWebGL2:a,drawBuffers:c,getMaxAnisotropy:r,getMaxPrecision:s,precision:o,logarithmicDepthBuffer:u,maxTextures:f,maxVertexTextures:h,maxTextureSize:m,maxCubemapSize:x,maxAttributes:v,maxVertexUniforms:d,maxVaryings:p,maxFragmentUniforms:_,vertexTextures:g,floatFragmentTextures:b,floatVertexTextures:w,maxSamples:S}}function JE(i){const e=this;let t=null,n=0,r=!1,s=!1;const a=new er,o=new ut,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(f,h){const m=f.length!==0||h||n!==0||r;return r=h,n=f.length,m},this.beginShadows=function(){s=!0,u(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(f,h){t=u(f,h,0)},this.setState=function(f,h,m){const x=f.clippingPlanes,v=f.clipIntersection,d=f.clipShadows,p=i.get(f);if(!r||x===null||x.length===0||s&&!d)s?u(null):c();else{const _=s?0:n,g=_*4;let b=p.clippingState||null;l.value=b,b=u(x,h,g,m);for(let w=0;w!==g;++w)b[w]=t[w];p.clippingState=b,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=_}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function u(f,h,m,x){const v=f!==null?f.length:0;let d=null;if(v!==0){if(d=l.value,x!==!0||d===null){const p=m+v*4,_=h.matrixWorldInverse;o.getNormalMatrix(_),(d===null||d.length<p)&&(d=new Float32Array(p));for(let g=0,b=m;g!==v;++g,b+=4)a.copy(f[g]).applyMatrix4(_,o),a.normal.toArray(d,b),d[b+3]=a.constant}l.value=d,l.needsUpdate=!0}return e.numPlanes=v,e.numIntersection=0,d}}function eS(i){let e=new WeakMap;function t(a,o){return o===Du?a.mapping=ta:o===Pu&&(a.mapping=na),a}function n(a){if(a&&a.isTexture){const o=a.mapping;if(o===Du||o===Pu)if(e.has(a)){const l=e.get(a).texture;return t(l,a.mapping)}else{const l=a.image;if(l&&l.height>0){const c=new fb(l.height/2);return c.fromEquirectangularTexture(i,a),e.set(a,c),a.addEventListener("dispose",r),t(c.texture,a.mapping)}else return null}}return a}function r(a){const o=a.target;o.removeEventListener("dispose",r);const l=e.get(o);l!==void 0&&(e.delete(o),l.dispose())}function s(){e=new WeakMap}return{get:n,dispose:s}}class em extends Zp{constructor(e=-1,t=1,n=1,r=-1,s=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=r,this.near=s,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,r,s,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let s=n-e,a=n+e,o=r+t,l=r-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,a=s+c*this.view.width,o-=u*this.view.offsetY,l=o-u*this.view.height}this.projectionMatrix.makeOrthographic(s,a,o,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}const Ls=4,Uf=[.125,.215,.35,.446,.526,.582],Lr=20,Yc=new em,Nf=new gt;let jc=null,Kc=0,Zc=0;const Rr=(1+Math.sqrt(5))/2,ws=1/Rr,Of=[new X(1,1,1),new X(-1,1,1),new X(1,1,-1),new X(-1,1,-1),new X(0,Rr,ws),new X(0,Rr,-ws),new X(ws,0,Rr),new X(-ws,0,Rr),new X(Rr,ws,0),new X(-Rr,ws,0)];class zf{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,r=100){jc=this._renderer.getRenderTarget(),Kc=this._renderer.getActiveCubeFace(),Zc=this._renderer.getActiveMipmapLevel(),this._setSize(256);const s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(e,n,r,s),t>0&&this._blur(s,0,0,t),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Vf(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Gf(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(jc,Kc,Zc),e.scissorTest=!1,Bo(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===ta||e.mapping===na?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),jc=this._renderer.getRenderTarget(),Kc=this._renderer.getActiveCubeFace(),Zc=this._renderer.getActiveMipmapLevel();const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:Gn,minFilter:Gn,generateMipmaps:!1,type:Xa,format:ai,colorSpace:Xi,depthBuffer:!1},r=Hf(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Hf(e,t,n);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=tS(s)),this._blurMaterial=nS(s,e,t)}return r}_compileMaterial(e){const t=new zi(this._lodPlanes[0],e);this._renderer.compile(t,Yc)}_sceneToCubeUV(e,t,n,r){const o=new Wn(90,1,t,n),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],u=this._renderer,f=u.autoClear,h=u.toneMapping;u.getClearColor(Nf),u.toneMapping=pr,u.autoClear=!1;const m=new mh({name:"PMREM.Background",side:Mn,depthWrite:!1,depthTest:!1}),x=new zi(new io,m);let v=!1;const d=e.background;d?d.isColor&&(m.color.copy(d),e.background=null,v=!0):(m.color.copy(Nf),v=!0);for(let p=0;p<6;p++){const _=p%3;_===0?(o.up.set(0,l[p],0),o.lookAt(c[p],0,0)):_===1?(o.up.set(0,0,l[p]),o.lookAt(0,c[p],0)):(o.up.set(0,l[p],0),o.lookAt(0,0,c[p]));const g=this._cubeSize;Bo(r,_*g,p>2?g:0,g,g),u.setRenderTarget(r),v&&u.render(x,o),u.render(e,o)}x.geometry.dispose(),x.material.dispose(),u.toneMapping=h,u.autoClear=f,e.background=d}_textureToCubeUV(e,t){const n=this._renderer,r=e.mapping===ta||e.mapping===na;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=Vf()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Gf());const s=r?this._cubemapMaterial:this._equirectMaterial,a=new zi(this._lodPlanes[0],s),o=s.uniforms;o.envMap.value=e;const l=this._cubeSize;Bo(t,0,0,3*l,2*l),n.setRenderTarget(t),n.render(a,Yc)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;for(let r=1;r<this._lodPlanes.length;r++){const s=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),a=Of[(r-1)%Of.length];this._blur(e,r-1,r,s,a)}t.autoClear=n}_blur(e,t,n,r,s){const a=this._pingPongRenderTarget;this._halfBlur(e,a,t,n,r,"latitudinal",s),this._halfBlur(a,e,n,n,r,"longitudinal",s)}_halfBlur(e,t,n,r,s,a,o){const l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const u=3,f=new zi(this._lodPlanes[r],c),h=c.uniforms,m=this._sizeLods[n]-1,x=isFinite(s)?Math.PI/(2*m):2*Math.PI/(2*Lr-1),v=s/x,d=isFinite(s)?1+Math.floor(u*v):Lr;d>Lr&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${d} samples when the maximum is set to ${Lr}`);const p=[];let _=0;for(let M=0;M<Lr;++M){const I=M/v,E=Math.exp(-I*I/2);p.push(E),M===0?_+=E:M<d&&(_+=2*E)}for(let M=0;M<p.length;M++)p[M]=p[M]/_;h.envMap.value=e.texture,h.samples.value=d,h.weights.value=p,h.latitudinal.value=a==="latitudinal",o&&(h.poleAxis.value=o);const{_lodMax:g}=this;h.dTheta.value=x,h.mipInt.value=g-n;const b=this._sizeLods[r],w=3*b*(r>g-Ls?r-g+Ls:0),S=4*(this._cubeSize-b);Bo(t,w,S,3*b,2*b),l.setRenderTarget(t),l.render(f,Yc)}}function tS(i){const e=[],t=[],n=[];let r=i;const s=i-Ls+1+Uf.length;for(let a=0;a<s;a++){const o=Math.pow(2,r);t.push(o);let l=1/o;a>i-Ls?l=Uf[a-i+Ls-1]:a===0&&(l=0),n.push(l);const c=1/(o-2),u=-c,f=1+c,h=[u,u,f,u,f,f,u,u,f,f,u,f],m=6,x=6,v=3,d=2,p=1,_=new Float32Array(v*x*m),g=new Float32Array(d*x*m),b=new Float32Array(p*x*m);for(let S=0;S<m;S++){const M=S%3*2/3-1,I=S>2?0:-1,E=[M,I,0,M+2/3,I,0,M+2/3,I+1,0,M,I,0,M+2/3,I+1,0,M,I+1,0];_.set(E,v*x*S),g.set(h,d*x*S);const y=[S,S,S,S,S,S];b.set(y,p*x*S)}const w=new pn;w.setAttribute("position",new Yn(_,v)),w.setAttribute("uv",new Yn(g,d)),w.setAttribute("faceIndex",new Yn(b,p)),e.push(w),r>Ls&&r--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function Hf(i,e,t){const n=new Zr(i,e,t);return n.texture.mapping=cc,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Bo(i,e,t,n,r){i.viewport.set(e,t,n,r),i.scissor.set(e,t,n,r)}function nS(i,e,t){const n=new Float32Array(Lr),r=new X(0,1,0);return new Qr({name:"SphericalGaussianBlur",defines:{n:Lr,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:vh(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:dr,depthTest:!1,depthWrite:!1})}function Gf(){return new Qr({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:vh(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:dr,depthTest:!1,depthWrite:!1})}function Vf(){return new Qr({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:vh(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:dr,depthTest:!1,depthWrite:!1})}function vh(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function iS(i){let e=new WeakMap,t=null;function n(o){if(o&&o.isTexture){const l=o.mapping,c=l===Du||l===Pu,u=l===ta||l===na;if(c||u)if(o.isRenderTargetTexture&&o.needsPMREMUpdate===!0){o.needsPMREMUpdate=!1;let f=e.get(o);return t===null&&(t=new zf(i)),f=c?t.fromEquirectangular(o,f):t.fromCubemap(o,f),e.set(o,f),f.texture}else{if(e.has(o))return e.get(o).texture;{const f=o.image;if(c&&f&&f.height>0||u&&f&&r(f)){t===null&&(t=new zf(i));const h=c?t.fromEquirectangular(o):t.fromCubemap(o);return e.set(o,h),o.addEventListener("dispose",s),h.texture}else return null}}}return o}function r(o){let l=0;const c=6;for(let u=0;u<c;u++)o[u]!==void 0&&l++;return l===c}function s(o){const l=o.target;l.removeEventListener("dispose",s);const c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function a(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:a}}function rS(i){const e={};function t(n){if(e[n]!==void 0)return e[n];let r;switch(n){case"WEBGL_depth_texture":r=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":r=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":r=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":r=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:r=i.getExtension(n)}return e[n]=r,r}return{has:function(n){return t(n)!==null},init:function(n){n.isWebGL2?(t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance")):(t("WEBGL_depth_texture"),t("OES_texture_float"),t("OES_texture_half_float"),t("OES_texture_half_float_linear"),t("OES_standard_derivatives"),t("OES_element_index_uint"),t("OES_vertex_array_object"),t("ANGLE_instanced_arrays")),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture")},get:function(n){const r=t(n);return r===null&&console.warn("THREE.WebGLRenderer: "+n+" extension not supported."),r}}}function sS(i,e,t,n){const r={},s=new WeakMap;function a(f){const h=f.target;h.index!==null&&e.remove(h.index);for(const x in h.attributes)e.remove(h.attributes[x]);for(const x in h.morphAttributes){const v=h.morphAttributes[x];for(let d=0,p=v.length;d<p;d++)e.remove(v[d])}h.removeEventListener("dispose",a),delete r[h.id];const m=s.get(h);m&&(e.remove(m),s.delete(h)),n.releaseStatesOfGeometry(h),h.isInstancedBufferGeometry===!0&&delete h._maxInstanceCount,t.memory.geometries--}function o(f,h){return r[h.id]===!0||(h.addEventListener("dispose",a),r[h.id]=!0,t.memory.geometries++),h}function l(f){const h=f.attributes;for(const x in h)e.update(h[x],i.ARRAY_BUFFER);const m=f.morphAttributes;for(const x in m){const v=m[x];for(let d=0,p=v.length;d<p;d++)e.update(v[d],i.ARRAY_BUFFER)}}function c(f){const h=[],m=f.index,x=f.attributes.position;let v=0;if(m!==null){const _=m.array;v=m.version;for(let g=0,b=_.length;g<b;g+=3){const w=_[g+0],S=_[g+1],M=_[g+2];h.push(w,S,S,M,M,w)}}else if(x!==void 0){const _=x.array;v=x.version;for(let g=0,b=_.length/3-1;g<b;g+=3){const w=g+0,S=g+1,M=g+2;h.push(w,S,S,M,M,w)}}else return;const d=new(Vp(h)?jp:Yp)(h,1);d.version=v;const p=s.get(f);p&&e.remove(p),s.set(f,d)}function u(f){const h=s.get(f);if(h){const m=f.index;m!==null&&h.version<m.version&&c(f)}else c(f);return s.get(f)}return{get:o,update:l,getWireframeAttribute:u}}function aS(i,e,t,n){const r=n.isWebGL2;let s;function a(m){s=m}let o,l;function c(m){o=m.type,l=m.bytesPerElement}function u(m,x){i.drawElements(s,x,o,m*l),t.update(x,s,1)}function f(m,x,v){if(v===0)return;let d,p;if(r)d=i,p="drawElementsInstanced";else if(d=e.get("ANGLE_instanced_arrays"),p="drawElementsInstancedANGLE",d===null){console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}d[p](s,x,o,m*l,v),t.update(x,s,v)}function h(m,x,v){if(v===0)return;const d=e.get("WEBGL_multi_draw");if(d===null)for(let p=0;p<v;p++)this.render(m[p]/l,x[p]);else{d.multiDrawElementsWEBGL(s,x,0,o,m,0,v);let p=0;for(let _=0;_<v;_++)p+=x[_];t.update(p,s,1)}}this.setMode=a,this.setIndex=c,this.render=u,this.renderInstances=f,this.renderMultiDraw=h}function oS(i){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(s,a,o){switch(t.calls++,a){case i.TRIANGLES:t.triangles+=o*(s/3);break;case i.LINES:t.lines+=o*(s/2);break;case i.LINE_STRIP:t.lines+=o*(s-1);break;case i.LINE_LOOP:t.lines+=o*s;break;case i.POINTS:t.points+=o*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function r(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:r,update:n}}function lS(i,e){return i[0]-e[0]}function cS(i,e){return Math.abs(e[1])-Math.abs(i[1])}function uS(i,e,t){const n={},r=new Float32Array(8),s=new WeakMap,a=new Jt,o=[];for(let c=0;c<8;c++)o[c]=[c,0];function l(c,u,f){const h=c.morphTargetInfluences;if(e.isWebGL2===!0){const x=u.morphAttributes.position||u.morphAttributes.normal||u.morphAttributes.color,v=x!==void 0?x.length:0;let d=s.get(u);if(d===void 0||d.count!==v){let z=function(){G.dispose(),s.delete(u),u.removeEventListener("dispose",z)};var m=z;d!==void 0&&d.texture.dispose();const g=u.morphAttributes.position!==void 0,b=u.morphAttributes.normal!==void 0,w=u.morphAttributes.color!==void 0,S=u.morphAttributes.position||[],M=u.morphAttributes.normal||[],I=u.morphAttributes.color||[];let E=0;g===!0&&(E=1),b===!0&&(E=2),w===!0&&(E=3);let y=u.attributes.position.count*E,P=1;y>e.maxTextureSize&&(P=Math.ceil(y/e.maxTextureSize),y=e.maxTextureSize);const U=new Float32Array(y*P*4*v),G=new qp(U,y,P,v);G.type=or,G.needsUpdate=!0;const F=E*4;for(let q=0;q<v;q++){const ee=S[q],Z=M[q],Q=I[q],j=y*P*4*q;for(let W=0;W<ee.count;W++){const C=W*F;g===!0&&(a.fromBufferAttribute(ee,W),U[j+C+0]=a.x,U[j+C+1]=a.y,U[j+C+2]=a.z,U[j+C+3]=0),b===!0&&(a.fromBufferAttribute(Z,W),U[j+C+4]=a.x,U[j+C+5]=a.y,U[j+C+6]=a.z,U[j+C+7]=0),w===!0&&(a.fromBufferAttribute(Q,W),U[j+C+8]=a.x,U[j+C+9]=a.y,U[j+C+10]=a.z,U[j+C+11]=Q.itemSize===4?a.w:1)}}d={count:v,texture:G,size:new Ve(y,P)},s.set(u,d),u.addEventListener("dispose",z)}let p=0;for(let g=0;g<h.length;g++)p+=h[g];const _=u.morphTargetsRelative?1:1-p;f.getUniforms().setValue(i,"morphTargetBaseInfluence",_),f.getUniforms().setValue(i,"morphTargetInfluences",h),f.getUniforms().setValue(i,"morphTargetsTexture",d.texture,t),f.getUniforms().setValue(i,"morphTargetsTextureSize",d.size)}else{const x=h===void 0?0:h.length;let v=n[u.id];if(v===void 0||v.length!==x){v=[];for(let b=0;b<x;b++)v[b]=[b,0];n[u.id]=v}for(let b=0;b<x;b++){const w=v[b];w[0]=b,w[1]=h[b]}v.sort(cS);for(let b=0;b<8;b++)b<x&&v[b][1]?(o[b][0]=v[b][0],o[b][1]=v[b][1]):(o[b][0]=Number.MAX_SAFE_INTEGER,o[b][1]=0);o.sort(lS);const d=u.morphAttributes.position,p=u.morphAttributes.normal;let _=0;for(let b=0;b<8;b++){const w=o[b],S=w[0],M=w[1];S!==Number.MAX_SAFE_INTEGER&&M?(d&&u.getAttribute("morphTarget"+b)!==d[S]&&u.setAttribute("morphTarget"+b,d[S]),p&&u.getAttribute("morphNormal"+b)!==p[S]&&u.setAttribute("morphNormal"+b,p[S]),r[b]=M,_+=M):(d&&u.hasAttribute("morphTarget"+b)===!0&&u.deleteAttribute("morphTarget"+b),p&&u.hasAttribute("morphNormal"+b)===!0&&u.deleteAttribute("morphNormal"+b),r[b]=0)}const g=u.morphTargetsRelative?1:1-_;f.getUniforms().setValue(i,"morphTargetBaseInfluence",g),f.getUniforms().setValue(i,"morphTargetInfluences",r)}}return{update:l}}function hS(i,e,t,n){let r=new WeakMap;function s(l){const c=n.render.frame,u=l.geometry,f=e.get(l,u);if(r.get(f)!==c&&(e.update(f),r.set(f,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",o)===!1&&l.addEventListener("dispose",o),r.get(l)!==c&&(t.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,i.ARRAY_BUFFER),r.set(l,c))),l.isSkinnedMesh){const h=l.skeleton;r.get(h)!==c&&(h.update(),r.set(h,c))}return f}function a(){r=new WeakMap}function o(l){const c=l.target;c.removeEventListener("dispose",o),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:s,dispose:a}}class tm extends wn{constructor(e,t,n,r,s,a,o,l,c,u){if(u=u!==void 0?u:Xr,u!==Xr&&u!==ia)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&u===Xr&&(n=ar),n===void 0&&u===ia&&(n=Wr),super(null,r,s,a,o,l,u,n,c),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=o!==void 0?o:gn,this.minFilter=l!==void 0?l:gn,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}const nm=new wn,im=new tm(1,1);im.compareFunction=Gp;const rm=new qp,sm=new j1,am=new Qp,Wf=[],Xf=[],qf=new Float32Array(16),$f=new Float32Array(9),Yf=new Float32Array(4);function ca(i,e,t){const n=i[0];if(n<=0||n>0)return i;const r=e*t;let s=Wf[r];if(s===void 0&&(s=new Float32Array(r),Wf[r]=s),e!==0){n.toArray(s,0);for(let a=1,o=0;a!==e;++a)o+=t,i[a].toArray(s,o)}return s}function $t(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function Yt(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function fc(i,e){let t=Xf[e];t===void 0&&(t=new Int32Array(e),Xf[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function fS(i,e){const t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function dS(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if($t(t,e))return;i.uniform2fv(this.addr,e),Yt(t,e)}}function pS(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if($t(t,e))return;i.uniform3fv(this.addr,e),Yt(t,e)}}function mS(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if($t(t,e))return;i.uniform4fv(this.addr,e),Yt(t,e)}}function xS(i,e){const t=this.cache,n=e.elements;if(n===void 0){if($t(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),Yt(t,e)}else{if($t(t,n))return;Yf.set(n),i.uniformMatrix2fv(this.addr,!1,Yf),Yt(t,n)}}function gS(i,e){const t=this.cache,n=e.elements;if(n===void 0){if($t(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),Yt(t,e)}else{if($t(t,n))return;$f.set(n),i.uniformMatrix3fv(this.addr,!1,$f),Yt(t,n)}}function vS(i,e){const t=this.cache,n=e.elements;if(n===void 0){if($t(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),Yt(t,e)}else{if($t(t,n))return;qf.set(n),i.uniformMatrix4fv(this.addr,!1,qf),Yt(t,n)}}function _S(i,e){const t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function bS(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if($t(t,e))return;i.uniform2iv(this.addr,e),Yt(t,e)}}function yS(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if($t(t,e))return;i.uniform3iv(this.addr,e),Yt(t,e)}}function ES(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if($t(t,e))return;i.uniform4iv(this.addr,e),Yt(t,e)}}function SS(i,e){const t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function MS(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if($t(t,e))return;i.uniform2uiv(this.addr,e),Yt(t,e)}}function wS(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if($t(t,e))return;i.uniform3uiv(this.addr,e),Yt(t,e)}}function AS(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if($t(t,e))return;i.uniform4uiv(this.addr,e),Yt(t,e)}}function TS(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r);const s=this.type===i.SAMPLER_2D_SHADOW?im:nm;t.setTexture2D(e||s,r)}function CS(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTexture3D(e||sm,r)}function RS(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTextureCube(e||am,r)}function DS(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTexture2DArray(e||rm,r)}function PS(i){switch(i){case 5126:return fS;case 35664:return dS;case 35665:return pS;case 35666:return mS;case 35674:return xS;case 35675:return gS;case 35676:return vS;case 5124:case 35670:return _S;case 35667:case 35671:return bS;case 35668:case 35672:return yS;case 35669:case 35673:return ES;case 5125:return SS;case 36294:return MS;case 36295:return wS;case 36296:return AS;case 35678:case 36198:case 36298:case 36306:case 35682:return TS;case 35679:case 36299:case 36307:return CS;case 35680:case 36300:case 36308:case 36293:return RS;case 36289:case 36303:case 36311:case 36292:return DS}}function LS(i,e){i.uniform1fv(this.addr,e)}function FS(i,e){const t=ca(e,this.size,2);i.uniform2fv(this.addr,t)}function BS(i,e){const t=ca(e,this.size,3);i.uniform3fv(this.addr,t)}function IS(i,e){const t=ca(e,this.size,4);i.uniform4fv(this.addr,t)}function kS(i,e){const t=ca(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function US(i,e){const t=ca(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function NS(i,e){const t=ca(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function OS(i,e){i.uniform1iv(this.addr,e)}function zS(i,e){i.uniform2iv(this.addr,e)}function HS(i,e){i.uniform3iv(this.addr,e)}function GS(i,e){i.uniform4iv(this.addr,e)}function VS(i,e){i.uniform1uiv(this.addr,e)}function WS(i,e){i.uniform2uiv(this.addr,e)}function XS(i,e){i.uniform3uiv(this.addr,e)}function qS(i,e){i.uniform4uiv(this.addr,e)}function $S(i,e,t){const n=this.cache,r=e.length,s=fc(t,r);$t(n,s)||(i.uniform1iv(this.addr,s),Yt(n,s));for(let a=0;a!==r;++a)t.setTexture2D(e[a]||nm,s[a])}function YS(i,e,t){const n=this.cache,r=e.length,s=fc(t,r);$t(n,s)||(i.uniform1iv(this.addr,s),Yt(n,s));for(let a=0;a!==r;++a)t.setTexture3D(e[a]||sm,s[a])}function jS(i,e,t){const n=this.cache,r=e.length,s=fc(t,r);$t(n,s)||(i.uniform1iv(this.addr,s),Yt(n,s));for(let a=0;a!==r;++a)t.setTextureCube(e[a]||am,s[a])}function KS(i,e,t){const n=this.cache,r=e.length,s=fc(t,r);$t(n,s)||(i.uniform1iv(this.addr,s),Yt(n,s));for(let a=0;a!==r;++a)t.setTexture2DArray(e[a]||rm,s[a])}function ZS(i){switch(i){case 5126:return LS;case 35664:return FS;case 35665:return BS;case 35666:return IS;case 35674:return kS;case 35675:return US;case 35676:return NS;case 5124:case 35670:return OS;case 35667:case 35671:return zS;case 35668:case 35672:return HS;case 35669:case 35673:return GS;case 5125:return VS;case 36294:return WS;case 36295:return XS;case 36296:return qS;case 35678:case 36198:case 36298:case 36306:case 35682:return $S;case 35679:case 36299:case 36307:return YS;case 35680:case 36300:case 36308:case 36293:return jS;case 36289:case 36303:case 36311:case 36292:return KS}}class QS{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=PS(t.type)}}class JS{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=ZS(t.type)}}class eM{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const r=this.seq;for(let s=0,a=r.length;s!==a;++s){const o=r[s];o.setValue(e,t[o.id],n)}}}const Qc=/(\w+)(\])?(\[|\.)?/g;function jf(i,e){i.seq.push(e),i.map[e.id]=e}function tM(i,e,t){const n=i.name,r=n.length;for(Qc.lastIndex=0;;){const s=Qc.exec(n),a=Qc.lastIndex;let o=s[1];const l=s[2]==="]",c=s[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===r){jf(t,c===void 0?new QS(o,i,e):new JS(o,i,e));break}else{let f=t.map[o];f===void 0&&(f=new eM(o),jf(t,f)),t=f}}}class Ll{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let r=0;r<n;++r){const s=e.getActiveUniform(t,r),a=e.getUniformLocation(t,s.name);tM(s,a,this)}}setValue(e,t,n,r){const s=this.map[t];s!==void 0&&s.setValue(e,n,r)}setOptional(e,t,n){const r=t[n];r!==void 0&&this.setValue(e,n,r)}static upload(e,t,n,r){for(let s=0,a=t.length;s!==a;++s){const o=t[s],l=n[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,r)}}static seqWithValue(e,t){const n=[];for(let r=0,s=e.length;r!==s;++r){const a=e[r];a.id in t&&n.push(a)}return n}}function Kf(i,e,t){const n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}const nM=37297;let iM=0;function rM(i,e){const t=i.split(`
`),n=[],r=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let a=r;a<s;a++){const o=a+1;n.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return n.join(`
`)}function sM(i){const e=At.getPrimaries(At.workingColorSpace),t=At.getPrimaries(i);let n;switch(e===t?n="":e===Yl&&t===$l?n="LinearDisplayP3ToLinearSRGB":e===$l&&t===Yl&&(n="LinearSRGBToLinearDisplayP3"),i){case Xi:case uc:return[n,"LinearTransferOETF"];case on:case dh:return[n,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",i),[n,"LinearTransferOETF"]}}function Zf(i,e,t){const n=i.getShaderParameter(e,i.COMPILE_STATUS),r=i.getShaderInfoLog(e).trim();if(n&&r==="")return"";const s=/ERROR: 0:(\d+)/.exec(r);if(s){const a=parseInt(s[1]);return t.toUpperCase()+`

`+r+`

`+rM(i.getShaderSource(e),a)}else return r}function aM(i,e){const t=sM(e);return`vec4 ${i}( vec4 value ) { return ${t[0]}( ${t[1]}( value ) ); }`}function oM(i,e){let t;switch(e){case x1:t="Linear";break;case g1:t="Reinhard";break;case v1:t="OptimizedCineon";break;case _1:t="ACESFilmic";break;case y1:t="AgX";break;case b1:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}function lM(i){return[i.extensionDerivatives||i.envMapCubeUVHeight||i.bumpMap||i.normalMapTangentSpace||i.clearcoatNormalMap||i.flatShading||i.shaderID==="physical"?"#extension GL_OES_standard_derivatives : enable":"",(i.extensionFragDepth||i.logarithmicDepthBuffer)&&i.rendererExtensionFragDepth?"#extension GL_EXT_frag_depth : enable":"",i.extensionDrawBuffers&&i.rendererExtensionDrawBuffers?"#extension GL_EXT_draw_buffers : require":"",(i.extensionShaderTextureLOD||i.envMap||i.transmission)&&i.rendererExtensionShaderTextureLod?"#extension GL_EXT_shader_texture_lod : enable":""].filter(Fs).join(`
`)}function cM(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":""].filter(Fs).join(`
`)}function uM(i){const e=[];for(const t in i){const n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function hM(i,e){const t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let r=0;r<n;r++){const s=i.getActiveAttrib(e,r),a=s.name;let o=1;s.type===i.FLOAT_MAT2&&(o=2),s.type===i.FLOAT_MAT3&&(o=3),s.type===i.FLOAT_MAT4&&(o=4),t[a]={type:s.type,location:i.getAttribLocation(e,a),locationSize:o}}return t}function Fs(i){return i!==""}function Qf(i,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Jf(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const fM=/^[ \t]*#include +<([\w\d./]+)>/gm;function Nu(i){return i.replace(fM,pM)}const dM=new Map([["encodings_fragment","colorspace_fragment"],["encodings_pars_fragment","colorspace_pars_fragment"],["output_fragment","opaque_fragment"]]);function pM(i,e){let t=st[e];if(t===void 0){const n=dM.get(e);if(n!==void 0)t=st[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return Nu(t)}const mM=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function ed(i){return i.replace(mM,xM)}function xM(i,e,t,n){let r="";for(let s=parseInt(e);s<parseInt(t);s++)r+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function td(i){let e="precision "+i.precision+` float;
precision `+i.precision+" int;";return i.precision==="highp"?e+=`
#define HIGH_PRECISION`:i.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function gM(i){let e="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===Pp?e="SHADOWMAP_TYPE_PCF":i.shadowMapType===W_?e="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===Fi&&(e="SHADOWMAP_TYPE_VSM"),e}function vM(i){let e="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case ta:case na:e="ENVMAP_TYPE_CUBE";break;case cc:e="ENVMAP_TYPE_CUBE_UV";break}return e}function _M(i){let e="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case na:e="ENVMAP_MODE_REFRACTION";break}return e}function bM(i){let e="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case Lp:e="ENVMAP_BLENDING_MULTIPLY";break;case p1:e="ENVMAP_BLENDING_MIX";break;case m1:e="ENVMAP_BLENDING_ADD";break}return e}function yM(i){const e=i.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function EM(i,e,t,n){const r=i.getContext(),s=t.defines;let a=t.vertexShader,o=t.fragmentShader;const l=gM(t),c=vM(t),u=_M(t),f=bM(t),h=yM(t),m=t.isWebGL2?"":lM(t),x=cM(t),v=uM(s),d=r.createProgram();let p,_,g=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,v].filter(Fs).join(`
`),p.length>0&&(p+=`
`),_=[m,"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,v].filter(Fs).join(`
`),_.length>0&&(_+=`
`)):(p=[td(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,v,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors&&t.isWebGL2?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Fs).join(`
`),_=[m,td(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,v,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+u:"",t.envMap?"#define "+f:"",h?"#define CUBEUV_TEXEL_WIDTH "+h.texelWidth:"",h?"#define CUBEUV_TEXEL_HEIGHT "+h.texelHeight:"",h?"#define CUBEUV_MAX_MIP "+h.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==pr?"#define TONE_MAPPING":"",t.toneMapping!==pr?st.tonemapping_pars_fragment:"",t.toneMapping!==pr?oM("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",st.colorspace_pars_fragment,aM("linearToOutputTexel",t.outputColorSpace),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Fs).join(`
`)),a=Nu(a),a=Qf(a,t),a=Jf(a,t),o=Nu(o),o=Qf(o,t),o=Jf(o,t),a=ed(a),o=ed(o),t.isWebGL2&&t.isRawShaderMaterial!==!0&&(g=`#version 300 es
`,p=[x,"precision mediump sampler2DArray;","#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+p,_=["precision mediump sampler2DArray;","#define varying in",t.glslVersion===_f?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===_f?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+_);const b=g+p+a,w=g+_+o,S=Kf(r,r.VERTEX_SHADER,b),M=Kf(r,r.FRAGMENT_SHADER,w);r.attachShader(d,S),r.attachShader(d,M),t.index0AttributeName!==void 0?r.bindAttribLocation(d,0,t.index0AttributeName):t.morphTargets===!0&&r.bindAttribLocation(d,0,"position"),r.linkProgram(d);function I(U){if(i.debug.checkShaderErrors){const G=r.getProgramInfoLog(d).trim(),F=r.getShaderInfoLog(S).trim(),z=r.getShaderInfoLog(M).trim();let q=!0,ee=!0;if(r.getProgramParameter(d,r.LINK_STATUS)===!1)if(q=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(r,d,S,M);else{const Z=Zf(r,S,"vertex"),Q=Zf(r,M,"fragment");console.error("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(d,r.VALIDATE_STATUS)+`

Program Info Log: `+G+`
`+Z+`
`+Q)}else G!==""?console.warn("THREE.WebGLProgram: Program Info Log:",G):(F===""||z==="")&&(ee=!1);ee&&(U.diagnostics={runnable:q,programLog:G,vertexShader:{log:F,prefix:p},fragmentShader:{log:z,prefix:_}})}r.deleteShader(S),r.deleteShader(M),E=new Ll(r,d),y=hM(r,d)}let E;this.getUniforms=function(){return E===void 0&&I(this),E};let y;this.getAttributes=function(){return y===void 0&&I(this),y};let P=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return P===!1&&(P=r.getProgramParameter(d,nM)),P},this.destroy=function(){n.releaseStatesOfProgram(this),r.deleteProgram(d),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=iM++,this.cacheKey=e,this.usedTimes=1,this.program=d,this.vertexShader=S,this.fragmentShader=M,this}let SM=0;class MM{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,r=this._getShaderStage(t),s=this._getShaderStage(n),a=this._getShaderCacheForMaterial(e);return a.has(r)===!1&&(a.add(r),r.usedTimes++),a.has(s)===!1&&(a.add(s),s.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new wM(e),t.set(e,n)),n}}class wM{constructor(e){this.id=SM++,this.code=e,this.usedTimes=0}}function AM(i,e,t,n,r,s,a){const o=new ph,l=new MM,c=[],u=r.isWebGL2,f=r.logarithmicDepthBuffer,h=r.vertexTextures;let m=r.precision;const x={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function v(E){return E===0?"uv":`uv${E}`}function d(E,y,P,U,G){const F=U.fog,z=G.geometry,q=E.isMeshStandardMaterial?U.environment:null,ee=(E.isMeshStandardMaterial?t:e).get(E.envMap||q),Z=ee&&ee.mapping===cc?ee.image.height:null,Q=x[E.type];E.precision!==null&&(m=r.getMaxPrecision(E.precision),m!==E.precision&&console.warn("THREE.WebGLProgram.getParameters:",E.precision,"not supported, using",m,"instead."));const j=z.morphAttributes.position||z.morphAttributes.normal||z.morphAttributes.color,W=j!==void 0?j.length:0;let C=0;z.morphAttributes.position!==void 0&&(C=1),z.morphAttributes.normal!==void 0&&(C=2),z.morphAttributes.color!==void 0&&(C=3);let A,R,N,$;if(Q){const vt=xi[Q];A=vt.vertexShader,R=vt.fragmentShader}else A=E.vertexShader,R=E.fragmentShader,l.update(E),N=l.getVertexShaderID(E),$=l.getFragmentShaderID(E);const he=i.getRenderTarget(),J=G.isInstancedMesh===!0,se=G.isBatchedMesh===!0,V=!!E.map,ie=!!E.matcap,O=!!ee,le=!!E.aoMap,ce=!!E.lightMap,ve=!!E.bumpMap,_e=!!E.normalMap,He=!!E.displacementMap,Ie=!!E.emissiveMap,B=!!E.metalnessMap,T=!!E.roughnessMap,K=E.anisotropy>0,de=E.clearcoat>0,fe=E.iridescence>0,pe=E.sheen>0,ke=E.transmission>0,Ae=K&&!!E.anisotropyMap,Fe=de&&!!E.clearcoatMap,Ge=de&&!!E.clearcoatNormalMap,Xe=de&&!!E.clearcoatRoughnessMap,be=fe&&!!E.iridescenceMap,it=fe&&!!E.iridescenceThicknessMap,qe=pe&&!!E.sheenColorMap,We=pe&&!!E.sheenRoughnessMap,ze=!!E.specularMap,me=!!E.specularColorMap,k=!!E.specularIntensityMap,ye=ke&&!!E.transmissionMap,Be=ke&&!!E.thicknessMap,Pe=!!E.gradientMap,ge=!!E.alphaMap,H=E.alphaTest>0,Ee=!!E.alphaHash,we=!!E.extensions,Ue=!!z.attributes.uv1,Ne=!!z.attributes.uv2,$e=!!z.attributes.uv3;let Ye=pr;return E.toneMapped&&(he===null||he.isXRRenderTarget===!0)&&(Ye=i.toneMapping),{isWebGL2:u,shaderID:Q,shaderType:E.type,shaderName:E.name,vertexShader:A,fragmentShader:R,defines:E.defines,customVertexShaderID:N,customFragmentShaderID:$,isRawShaderMaterial:E.isRawShaderMaterial===!0,glslVersion:E.glslVersion,precision:m,batching:se,instancing:J,instancingColor:J&&G.instanceColor!==null,supportsVertexTextures:h,outputColorSpace:he===null?i.outputColorSpace:he.isXRRenderTarget===!0?he.texture.colorSpace:Xi,map:V,matcap:ie,envMap:O,envMapMode:O&&ee.mapping,envMapCubeUVHeight:Z,aoMap:le,lightMap:ce,bumpMap:ve,normalMap:_e,displacementMap:h&&He,emissiveMap:Ie,normalMapObjectSpace:_e&&E.normalMapType===B1,normalMapTangentSpace:_e&&E.normalMapType===F1,metalnessMap:B,roughnessMap:T,anisotropy:K,anisotropyMap:Ae,clearcoat:de,clearcoatMap:Fe,clearcoatNormalMap:Ge,clearcoatRoughnessMap:Xe,iridescence:fe,iridescenceMap:be,iridescenceThicknessMap:it,sheen:pe,sheenColorMap:qe,sheenRoughnessMap:We,specularMap:ze,specularColorMap:me,specularIntensityMap:k,transmission:ke,transmissionMap:ye,thicknessMap:Be,gradientMap:Pe,opaque:E.transparent===!1&&E.blending===ks,alphaMap:ge,alphaTest:H,alphaHash:Ee,combine:E.combine,mapUv:V&&v(E.map.channel),aoMapUv:le&&v(E.aoMap.channel),lightMapUv:ce&&v(E.lightMap.channel),bumpMapUv:ve&&v(E.bumpMap.channel),normalMapUv:_e&&v(E.normalMap.channel),displacementMapUv:He&&v(E.displacementMap.channel),emissiveMapUv:Ie&&v(E.emissiveMap.channel),metalnessMapUv:B&&v(E.metalnessMap.channel),roughnessMapUv:T&&v(E.roughnessMap.channel),anisotropyMapUv:Ae&&v(E.anisotropyMap.channel),clearcoatMapUv:Fe&&v(E.clearcoatMap.channel),clearcoatNormalMapUv:Ge&&v(E.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Xe&&v(E.clearcoatRoughnessMap.channel),iridescenceMapUv:be&&v(E.iridescenceMap.channel),iridescenceThicknessMapUv:it&&v(E.iridescenceThicknessMap.channel),sheenColorMapUv:qe&&v(E.sheenColorMap.channel),sheenRoughnessMapUv:We&&v(E.sheenRoughnessMap.channel),specularMapUv:ze&&v(E.specularMap.channel),specularColorMapUv:me&&v(E.specularColorMap.channel),specularIntensityMapUv:k&&v(E.specularIntensityMap.channel),transmissionMapUv:ye&&v(E.transmissionMap.channel),thicknessMapUv:Be&&v(E.thicknessMap.channel),alphaMapUv:ge&&v(E.alphaMap.channel),vertexTangents:!!z.attributes.tangent&&(_e||K),vertexColors:E.vertexColors,vertexAlphas:E.vertexColors===!0&&!!z.attributes.color&&z.attributes.color.itemSize===4,vertexUv1s:Ue,vertexUv2s:Ne,vertexUv3s:$e,pointsUvs:G.isPoints===!0&&!!z.attributes.uv&&(V||ge),fog:!!F,useFog:E.fog===!0,fogExp2:F&&F.isFogExp2,flatShading:E.flatShading===!0,sizeAttenuation:E.sizeAttenuation===!0,logarithmicDepthBuffer:f,skinning:G.isSkinnedMesh===!0,morphTargets:z.morphAttributes.position!==void 0,morphNormals:z.morphAttributes.normal!==void 0,morphColors:z.morphAttributes.color!==void 0,morphTargetsCount:W,morphTextureStride:C,numDirLights:y.directional.length,numPointLights:y.point.length,numSpotLights:y.spot.length,numSpotLightMaps:y.spotLightMap.length,numRectAreaLights:y.rectArea.length,numHemiLights:y.hemi.length,numDirLightShadows:y.directionalShadowMap.length,numPointLightShadows:y.pointShadowMap.length,numSpotLightShadows:y.spotShadowMap.length,numSpotLightShadowsWithMaps:y.numSpotLightShadowsWithMaps,numLightProbes:y.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:E.dithering,shadowMapEnabled:i.shadowMap.enabled&&P.length>0,shadowMapType:i.shadowMap.type,toneMapping:Ye,useLegacyLights:i._useLegacyLights,decodeVideoTexture:V&&E.map.isVideoTexture===!0&&At.getTransfer(E.map.colorSpace)===Dt,premultipliedAlpha:E.premultipliedAlpha,doubleSided:E.side===ki,flipSided:E.side===Mn,useDepthPacking:E.depthPacking>=0,depthPacking:E.depthPacking||0,index0AttributeName:E.index0AttributeName,extensionDerivatives:we&&E.extensions.derivatives===!0,extensionFragDepth:we&&E.extensions.fragDepth===!0,extensionDrawBuffers:we&&E.extensions.drawBuffers===!0,extensionShaderTextureLOD:we&&E.extensions.shaderTextureLOD===!0,extensionClipCullDistance:we&&E.extensions.clipCullDistance&&n.has("WEBGL_clip_cull_distance"),rendererExtensionFragDepth:u||n.has("EXT_frag_depth"),rendererExtensionDrawBuffers:u||n.has("WEBGL_draw_buffers"),rendererExtensionShaderTextureLod:u||n.has("EXT_shader_texture_lod"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:E.customProgramCacheKey()}}function p(E){const y=[];if(E.shaderID?y.push(E.shaderID):(y.push(E.customVertexShaderID),y.push(E.customFragmentShaderID)),E.defines!==void 0)for(const P in E.defines)y.push(P),y.push(E.defines[P]);return E.isRawShaderMaterial===!1&&(_(y,E),g(y,E),y.push(i.outputColorSpace)),y.push(E.customProgramCacheKey),y.join()}function _(E,y){E.push(y.precision),E.push(y.outputColorSpace),E.push(y.envMapMode),E.push(y.envMapCubeUVHeight),E.push(y.mapUv),E.push(y.alphaMapUv),E.push(y.lightMapUv),E.push(y.aoMapUv),E.push(y.bumpMapUv),E.push(y.normalMapUv),E.push(y.displacementMapUv),E.push(y.emissiveMapUv),E.push(y.metalnessMapUv),E.push(y.roughnessMapUv),E.push(y.anisotropyMapUv),E.push(y.clearcoatMapUv),E.push(y.clearcoatNormalMapUv),E.push(y.clearcoatRoughnessMapUv),E.push(y.iridescenceMapUv),E.push(y.iridescenceThicknessMapUv),E.push(y.sheenColorMapUv),E.push(y.sheenRoughnessMapUv),E.push(y.specularMapUv),E.push(y.specularColorMapUv),E.push(y.specularIntensityMapUv),E.push(y.transmissionMapUv),E.push(y.thicknessMapUv),E.push(y.combine),E.push(y.fogExp2),E.push(y.sizeAttenuation),E.push(y.morphTargetsCount),E.push(y.morphAttributeCount),E.push(y.numDirLights),E.push(y.numPointLights),E.push(y.numSpotLights),E.push(y.numSpotLightMaps),E.push(y.numHemiLights),E.push(y.numRectAreaLights),E.push(y.numDirLightShadows),E.push(y.numPointLightShadows),E.push(y.numSpotLightShadows),E.push(y.numSpotLightShadowsWithMaps),E.push(y.numLightProbes),E.push(y.shadowMapType),E.push(y.toneMapping),E.push(y.numClippingPlanes),E.push(y.numClipIntersection),E.push(y.depthPacking)}function g(E,y){o.disableAll(),y.isWebGL2&&o.enable(0),y.supportsVertexTextures&&o.enable(1),y.instancing&&o.enable(2),y.instancingColor&&o.enable(3),y.matcap&&o.enable(4),y.envMap&&o.enable(5),y.normalMapObjectSpace&&o.enable(6),y.normalMapTangentSpace&&o.enable(7),y.clearcoat&&o.enable(8),y.iridescence&&o.enable(9),y.alphaTest&&o.enable(10),y.vertexColors&&o.enable(11),y.vertexAlphas&&o.enable(12),y.vertexUv1s&&o.enable(13),y.vertexUv2s&&o.enable(14),y.vertexUv3s&&o.enable(15),y.vertexTangents&&o.enable(16),y.anisotropy&&o.enable(17),y.alphaHash&&o.enable(18),y.batching&&o.enable(19),E.push(o.mask),o.disableAll(),y.fog&&o.enable(0),y.useFog&&o.enable(1),y.flatShading&&o.enable(2),y.logarithmicDepthBuffer&&o.enable(3),y.skinning&&o.enable(4),y.morphTargets&&o.enable(5),y.morphNormals&&o.enable(6),y.morphColors&&o.enable(7),y.premultipliedAlpha&&o.enable(8),y.shadowMapEnabled&&o.enable(9),y.useLegacyLights&&o.enable(10),y.doubleSided&&o.enable(11),y.flipSided&&o.enable(12),y.useDepthPacking&&o.enable(13),y.dithering&&o.enable(14),y.transmission&&o.enable(15),y.sheen&&o.enable(16),y.opaque&&o.enable(17),y.pointsUvs&&o.enable(18),y.decodeVideoTexture&&o.enable(19),E.push(o.mask)}function b(E){const y=x[E.type];let P;if(y){const U=xi[y];P=lb.clone(U.uniforms)}else P=E.uniforms;return P}function w(E,y){let P;for(let U=0,G=c.length;U<G;U++){const F=c[U];if(F.cacheKey===y){P=F,++P.usedTimes;break}}return P===void 0&&(P=new EM(i,y,E,s),c.push(P)),P}function S(E){if(--E.usedTimes===0){const y=c.indexOf(E);c[y]=c[c.length-1],c.pop(),E.destroy()}}function M(E){l.remove(E)}function I(){l.dispose()}return{getParameters:d,getProgramCacheKey:p,getUniforms:b,acquireProgram:w,releaseProgram:S,releaseShaderCache:M,programs:c,dispose:I}}function TM(){let i=new WeakMap;function e(s){let a=i.get(s);return a===void 0&&(a={},i.set(s,a)),a}function t(s){i.delete(s)}function n(s,a,o){i.get(s)[a]=o}function r(){i=new WeakMap}return{get:e,remove:t,update:n,dispose:r}}function CM(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.z!==e.z?i.z-e.z:i.id-e.id}function nd(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function id(){const i=[];let e=0;const t=[],n=[],r=[];function s(){e=0,t.length=0,n.length=0,r.length=0}function a(f,h,m,x,v,d){let p=i[e];return p===void 0?(p={id:f.id,object:f,geometry:h,material:m,groupOrder:x,renderOrder:f.renderOrder,z:v,group:d},i[e]=p):(p.id=f.id,p.object=f,p.geometry=h,p.material=m,p.groupOrder=x,p.renderOrder=f.renderOrder,p.z=v,p.group=d),e++,p}function o(f,h,m,x,v,d){const p=a(f,h,m,x,v,d);m.transmission>0?n.push(p):m.transparent===!0?r.push(p):t.push(p)}function l(f,h,m,x,v,d){const p=a(f,h,m,x,v,d);m.transmission>0?n.unshift(p):m.transparent===!0?r.unshift(p):t.unshift(p)}function c(f,h){t.length>1&&t.sort(f||CM),n.length>1&&n.sort(h||nd),r.length>1&&r.sort(h||nd)}function u(){for(let f=e,h=i.length;f<h;f++){const m=i[f];if(m.id===null)break;m.id=null,m.object=null,m.geometry=null,m.material=null,m.group=null}}return{opaque:t,transmissive:n,transparent:r,init:s,push:o,unshift:l,finish:u,sort:c}}function RM(){let i=new WeakMap;function e(n,r){const s=i.get(n);let a;return s===void 0?(a=new id,i.set(n,[a])):r>=s.length?(a=new id,s.push(a)):a=s[r],a}function t(){i=new WeakMap}return{get:e,dispose:t}}function DM(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new X,color:new gt};break;case"SpotLight":t={position:new X,direction:new X,color:new gt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new X,color:new gt,distance:0,decay:0};break;case"HemisphereLight":t={direction:new X,skyColor:new gt,groundColor:new gt};break;case"RectAreaLight":t={color:new gt,position:new X,halfWidth:new X,halfHeight:new X};break}return i[e.id]=t,t}}}function PM(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ve};break;case"SpotLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ve};break;case"PointLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ve,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}let LM=0;function FM(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function BM(i,e){const t=new DM,n=PM(),r={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let u=0;u<9;u++)r.probe.push(new X);const s=new X,a=new Nt,o=new Nt;function l(u,f){let h=0,m=0,x=0;for(let U=0;U<9;U++)r.probe[U].set(0,0,0);let v=0,d=0,p=0,_=0,g=0,b=0,w=0,S=0,M=0,I=0,E=0;u.sort(FM);const y=f===!0?Math.PI:1;for(let U=0,G=u.length;U<G;U++){const F=u[U],z=F.color,q=F.intensity,ee=F.distance,Z=F.shadow&&F.shadow.map?F.shadow.map.texture:null;if(F.isAmbientLight)h+=z.r*q*y,m+=z.g*q*y,x+=z.b*q*y;else if(F.isLightProbe){for(let Q=0;Q<9;Q++)r.probe[Q].addScaledVector(F.sh.coefficients[Q],q);E++}else if(F.isDirectionalLight){const Q=t.get(F);if(Q.color.copy(F.color).multiplyScalar(F.intensity*y),F.castShadow){const j=F.shadow,W=n.get(F);W.shadowBias=j.bias,W.shadowNormalBias=j.normalBias,W.shadowRadius=j.radius,W.shadowMapSize=j.mapSize,r.directionalShadow[v]=W,r.directionalShadowMap[v]=Z,r.directionalShadowMatrix[v]=F.shadow.matrix,b++}r.directional[v]=Q,v++}else if(F.isSpotLight){const Q=t.get(F);Q.position.setFromMatrixPosition(F.matrixWorld),Q.color.copy(z).multiplyScalar(q*y),Q.distance=ee,Q.coneCos=Math.cos(F.angle),Q.penumbraCos=Math.cos(F.angle*(1-F.penumbra)),Q.decay=F.decay,r.spot[p]=Q;const j=F.shadow;if(F.map&&(r.spotLightMap[M]=F.map,M++,j.updateMatrices(F),F.castShadow&&I++),r.spotLightMatrix[p]=j.matrix,F.castShadow){const W=n.get(F);W.shadowBias=j.bias,W.shadowNormalBias=j.normalBias,W.shadowRadius=j.radius,W.shadowMapSize=j.mapSize,r.spotShadow[p]=W,r.spotShadowMap[p]=Z,S++}p++}else if(F.isRectAreaLight){const Q=t.get(F);Q.color.copy(z).multiplyScalar(q),Q.halfWidth.set(F.width*.5,0,0),Q.halfHeight.set(0,F.height*.5,0),r.rectArea[_]=Q,_++}else if(F.isPointLight){const Q=t.get(F);if(Q.color.copy(F.color).multiplyScalar(F.intensity*y),Q.distance=F.distance,Q.decay=F.decay,F.castShadow){const j=F.shadow,W=n.get(F);W.shadowBias=j.bias,W.shadowNormalBias=j.normalBias,W.shadowRadius=j.radius,W.shadowMapSize=j.mapSize,W.shadowCameraNear=j.camera.near,W.shadowCameraFar=j.camera.far,r.pointShadow[d]=W,r.pointShadowMap[d]=Z,r.pointShadowMatrix[d]=F.shadow.matrix,w++}r.point[d]=Q,d++}else if(F.isHemisphereLight){const Q=t.get(F);Q.skyColor.copy(F.color).multiplyScalar(q*y),Q.groundColor.copy(F.groundColor).multiplyScalar(q*y),r.hemi[g]=Q,g++}}_>0&&(e.isWebGL2?i.has("OES_texture_float_linear")===!0?(r.rectAreaLTC1=Te.LTC_FLOAT_1,r.rectAreaLTC2=Te.LTC_FLOAT_2):(r.rectAreaLTC1=Te.LTC_HALF_1,r.rectAreaLTC2=Te.LTC_HALF_2):i.has("OES_texture_float_linear")===!0?(r.rectAreaLTC1=Te.LTC_FLOAT_1,r.rectAreaLTC2=Te.LTC_FLOAT_2):i.has("OES_texture_half_float_linear")===!0?(r.rectAreaLTC1=Te.LTC_HALF_1,r.rectAreaLTC2=Te.LTC_HALF_2):console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.")),r.ambient[0]=h,r.ambient[1]=m,r.ambient[2]=x;const P=r.hash;(P.directionalLength!==v||P.pointLength!==d||P.spotLength!==p||P.rectAreaLength!==_||P.hemiLength!==g||P.numDirectionalShadows!==b||P.numPointShadows!==w||P.numSpotShadows!==S||P.numSpotMaps!==M||P.numLightProbes!==E)&&(r.directional.length=v,r.spot.length=p,r.rectArea.length=_,r.point.length=d,r.hemi.length=g,r.directionalShadow.length=b,r.directionalShadowMap.length=b,r.pointShadow.length=w,r.pointShadowMap.length=w,r.spotShadow.length=S,r.spotShadowMap.length=S,r.directionalShadowMatrix.length=b,r.pointShadowMatrix.length=w,r.spotLightMatrix.length=S+M-I,r.spotLightMap.length=M,r.numSpotLightShadowsWithMaps=I,r.numLightProbes=E,P.directionalLength=v,P.pointLength=d,P.spotLength=p,P.rectAreaLength=_,P.hemiLength=g,P.numDirectionalShadows=b,P.numPointShadows=w,P.numSpotShadows=S,P.numSpotMaps=M,P.numLightProbes=E,r.version=LM++)}function c(u,f){let h=0,m=0,x=0,v=0,d=0;const p=f.matrixWorldInverse;for(let _=0,g=u.length;_<g;_++){const b=u[_];if(b.isDirectionalLight){const w=r.directional[h];w.direction.setFromMatrixPosition(b.matrixWorld),s.setFromMatrixPosition(b.target.matrixWorld),w.direction.sub(s),w.direction.transformDirection(p),h++}else if(b.isSpotLight){const w=r.spot[x];w.position.setFromMatrixPosition(b.matrixWorld),w.position.applyMatrix4(p),w.direction.setFromMatrixPosition(b.matrixWorld),s.setFromMatrixPosition(b.target.matrixWorld),w.direction.sub(s),w.direction.transformDirection(p),x++}else if(b.isRectAreaLight){const w=r.rectArea[v];w.position.setFromMatrixPosition(b.matrixWorld),w.position.applyMatrix4(p),o.identity(),a.copy(b.matrixWorld),a.premultiply(p),o.extractRotation(a),w.halfWidth.set(b.width*.5,0,0),w.halfHeight.set(0,b.height*.5,0),w.halfWidth.applyMatrix4(o),w.halfHeight.applyMatrix4(o),v++}else if(b.isPointLight){const w=r.point[m];w.position.setFromMatrixPosition(b.matrixWorld),w.position.applyMatrix4(p),m++}else if(b.isHemisphereLight){const w=r.hemi[d];w.direction.setFromMatrixPosition(b.matrixWorld),w.direction.transformDirection(p),d++}}}return{setup:l,setupView:c,state:r}}function rd(i,e){const t=new BM(i,e),n=[],r=[];function s(){n.length=0,r.length=0}function a(f){n.push(f)}function o(f){r.push(f)}function l(f){t.setup(n,f)}function c(f){t.setupView(n,f)}return{init:s,state:{lightsArray:n,shadowsArray:r,lights:t},setupLights:l,setupLightsView:c,pushLight:a,pushShadow:o}}function IM(i,e){let t=new WeakMap;function n(s,a=0){const o=t.get(s);let l;return o===void 0?(l=new rd(i,e),t.set(s,[l])):a>=o.length?(l=new rd(i,e),o.push(l)):l=o[a],l}function r(){t=new WeakMap}return{get:n,dispose:r}}class kM extends ss{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=P1,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class UM extends ss{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const NM=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,OM=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function zM(i,e,t){let n=new xh;const r=new Ve,s=new Ve,a=new Jt,o=new kM({depthPacking:L1}),l=new UM,c={},u=t.maxTextureSize,f={[vr]:Mn,[Mn]:vr,[ki]:ki},h=new Qr({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Ve},radius:{value:4}},vertexShader:NM,fragmentShader:OM}),m=h.clone();m.defines.HORIZONTAL_PASS=1;const x=new pn;x.setAttribute("position",new Yn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const v=new zi(x,h),d=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Pp;let p=this.type;this.render=function(S,M,I){if(d.enabled===!1||d.autoUpdate===!1&&d.needsUpdate===!1||S.length===0)return;const E=i.getRenderTarget(),y=i.getActiveCubeFace(),P=i.getActiveMipmapLevel(),U=i.state;U.setBlending(dr),U.buffers.color.setClear(1,1,1,1),U.buffers.depth.setTest(!0),U.setScissorTest(!1);const G=p!==Fi&&this.type===Fi,F=p===Fi&&this.type!==Fi;for(let z=0,q=S.length;z<q;z++){const ee=S[z],Z=ee.shadow;if(Z===void 0){console.warn("THREE.WebGLShadowMap:",ee,"has no shadow.");continue}if(Z.autoUpdate===!1&&Z.needsUpdate===!1)continue;r.copy(Z.mapSize);const Q=Z.getFrameExtents();if(r.multiply(Q),s.copy(Z.mapSize),(r.x>u||r.y>u)&&(r.x>u&&(s.x=Math.floor(u/Q.x),r.x=s.x*Q.x,Z.mapSize.x=s.x),r.y>u&&(s.y=Math.floor(u/Q.y),r.y=s.y*Q.y,Z.mapSize.y=s.y)),Z.map===null||G===!0||F===!0){const W=this.type!==Fi?{minFilter:gn,magFilter:gn}:{};Z.map!==null&&Z.map.dispose(),Z.map=new Zr(r.x,r.y,W),Z.map.texture.name=ee.name+".shadowMap",Z.camera.updateProjectionMatrix()}i.setRenderTarget(Z.map),i.clear();const j=Z.getViewportCount();for(let W=0;W<j;W++){const C=Z.getViewport(W);a.set(s.x*C.x,s.y*C.y,s.x*C.z,s.y*C.w),U.viewport(a),Z.updateMatrices(ee,W),n=Z.getFrustum(),b(M,I,Z.camera,ee,this.type)}Z.isPointLightShadow!==!0&&this.type===Fi&&_(Z,I),Z.needsUpdate=!1}p=this.type,d.needsUpdate=!1,i.setRenderTarget(E,y,P)};function _(S,M){const I=e.update(v);h.defines.VSM_SAMPLES!==S.blurSamples&&(h.defines.VSM_SAMPLES=S.blurSamples,m.defines.VSM_SAMPLES=S.blurSamples,h.needsUpdate=!0,m.needsUpdate=!0),S.mapPass===null&&(S.mapPass=new Zr(r.x,r.y)),h.uniforms.shadow_pass.value=S.map.texture,h.uniforms.resolution.value=S.mapSize,h.uniforms.radius.value=S.radius,i.setRenderTarget(S.mapPass),i.clear(),i.renderBufferDirect(M,null,I,h,v,null),m.uniforms.shadow_pass.value=S.mapPass.texture,m.uniforms.resolution.value=S.mapSize,m.uniforms.radius.value=S.radius,i.setRenderTarget(S.map),i.clear(),i.renderBufferDirect(M,null,I,m,v,null)}function g(S,M,I,E){let y=null;const P=I.isPointLight===!0?S.customDistanceMaterial:S.customDepthMaterial;if(P!==void 0)y=P;else if(y=I.isPointLight===!0?l:o,i.localClippingEnabled&&M.clipShadows===!0&&Array.isArray(M.clippingPlanes)&&M.clippingPlanes.length!==0||M.displacementMap&&M.displacementScale!==0||M.alphaMap&&M.alphaTest>0||M.map&&M.alphaTest>0){const U=y.uuid,G=M.uuid;let F=c[U];F===void 0&&(F={},c[U]=F);let z=F[G];z===void 0&&(z=y.clone(),F[G]=z,M.addEventListener("dispose",w)),y=z}if(y.visible=M.visible,y.wireframe=M.wireframe,E===Fi?y.side=M.shadowSide!==null?M.shadowSide:M.side:y.side=M.shadowSide!==null?M.shadowSide:f[M.side],y.alphaMap=M.alphaMap,y.alphaTest=M.alphaTest,y.map=M.map,y.clipShadows=M.clipShadows,y.clippingPlanes=M.clippingPlanes,y.clipIntersection=M.clipIntersection,y.displacementMap=M.displacementMap,y.displacementScale=M.displacementScale,y.displacementBias=M.displacementBias,y.wireframeLinewidth=M.wireframeLinewidth,y.linewidth=M.linewidth,I.isPointLight===!0&&y.isMeshDistanceMaterial===!0){const U=i.properties.get(y);U.light=I}return y}function b(S,M,I,E,y){if(S.visible===!1)return;if(S.layers.test(M.layers)&&(S.isMesh||S.isLine||S.isPoints)&&(S.castShadow||S.receiveShadow&&y===Fi)&&(!S.frustumCulled||n.intersectsObject(S))){S.modelViewMatrix.multiplyMatrices(I.matrixWorldInverse,S.matrixWorld);const G=e.update(S),F=S.material;if(Array.isArray(F)){const z=G.groups;for(let q=0,ee=z.length;q<ee;q++){const Z=z[q],Q=F[Z.materialIndex];if(Q&&Q.visible){const j=g(S,Q,E,y);S.onBeforeShadow(i,S,M,I,G,j,Z),i.renderBufferDirect(I,null,G,j,S,Z),S.onAfterShadow(i,S,M,I,G,j,Z)}}}else if(F.visible){const z=g(S,F,E,y);S.onBeforeShadow(i,S,M,I,G,z,null),i.renderBufferDirect(I,null,G,z,S,null),S.onAfterShadow(i,S,M,I,G,z,null)}}const U=S.children;for(let G=0,F=U.length;G<F;G++)b(U[G],M,I,E,y)}function w(S){S.target.removeEventListener("dispose",w);for(const I in c){const E=c[I],y=S.target.uuid;y in E&&(E[y].dispose(),delete E[y])}}}function HM(i,e,t){const n=t.isWebGL2;function r(){let H=!1;const Ee=new Jt;let we=null;const Ue=new Jt(0,0,0,0);return{setMask:function(Ne){we!==Ne&&!H&&(i.colorMask(Ne,Ne,Ne,Ne),we=Ne)},setLocked:function(Ne){H=Ne},setClear:function(Ne,$e,Ye,mt,vt){vt===!0&&(Ne*=mt,$e*=mt,Ye*=mt),Ee.set(Ne,$e,Ye,mt),Ue.equals(Ee)===!1&&(i.clearColor(Ne,$e,Ye,mt),Ue.copy(Ee))},reset:function(){H=!1,we=null,Ue.set(-1,0,0,0)}}}function s(){let H=!1,Ee=null,we=null,Ue=null;return{setTest:function(Ne){Ne?se(i.DEPTH_TEST):V(i.DEPTH_TEST)},setMask:function(Ne){Ee!==Ne&&!H&&(i.depthMask(Ne),Ee=Ne)},setFunc:function(Ne){if(we!==Ne){switch(Ne){case o1:i.depthFunc(i.NEVER);break;case l1:i.depthFunc(i.ALWAYS);break;case c1:i.depthFunc(i.LESS);break;case Xl:i.depthFunc(i.LEQUAL);break;case u1:i.depthFunc(i.EQUAL);break;case h1:i.depthFunc(i.GEQUAL);break;case f1:i.depthFunc(i.GREATER);break;case d1:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}we=Ne}},setLocked:function(Ne){H=Ne},setClear:function(Ne){Ue!==Ne&&(i.clearDepth(Ne),Ue=Ne)},reset:function(){H=!1,Ee=null,we=null,Ue=null}}}function a(){let H=!1,Ee=null,we=null,Ue=null,Ne=null,$e=null,Ye=null,mt=null,vt=null;return{setTest:function(Qe){H||(Qe?se(i.STENCIL_TEST):V(i.STENCIL_TEST))},setMask:function(Qe){Ee!==Qe&&!H&&(i.stencilMask(Qe),Ee=Qe)},setFunc:function(Qe,yt,xt){(we!==Qe||Ue!==yt||Ne!==xt)&&(i.stencilFunc(Qe,yt,xt),we=Qe,Ue=yt,Ne=xt)},setOp:function(Qe,yt,xt){($e!==Qe||Ye!==yt||mt!==xt)&&(i.stencilOp(Qe,yt,xt),$e=Qe,Ye=yt,mt=xt)},setLocked:function(Qe){H=Qe},setClear:function(Qe){vt!==Qe&&(i.clearStencil(Qe),vt=Qe)},reset:function(){H=!1,Ee=null,we=null,Ue=null,Ne=null,$e=null,Ye=null,mt=null,vt=null}}}const o=new r,l=new s,c=new a,u=new WeakMap,f=new WeakMap;let h={},m={},x=new WeakMap,v=[],d=null,p=!1,_=null,g=null,b=null,w=null,S=null,M=null,I=null,E=new gt(0,0,0),y=0,P=!1,U=null,G=null,F=null,z=null,q=null;const ee=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let Z=!1,Q=0;const j=i.getParameter(i.VERSION);j.indexOf("WebGL")!==-1?(Q=parseFloat(/^WebGL (\d)/.exec(j)[1]),Z=Q>=1):j.indexOf("OpenGL ES")!==-1&&(Q=parseFloat(/^OpenGL ES (\d)/.exec(j)[1]),Z=Q>=2);let W=null,C={};const A=i.getParameter(i.SCISSOR_BOX),R=i.getParameter(i.VIEWPORT),N=new Jt().fromArray(A),$=new Jt().fromArray(R);function he(H,Ee,we,Ue){const Ne=new Uint8Array(4),$e=i.createTexture();i.bindTexture(H,$e),i.texParameteri(H,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(H,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Ye=0;Ye<we;Ye++)n&&(H===i.TEXTURE_3D||H===i.TEXTURE_2D_ARRAY)?i.texImage3D(Ee,0,i.RGBA,1,1,Ue,0,i.RGBA,i.UNSIGNED_BYTE,Ne):i.texImage2D(Ee+Ye,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,Ne);return $e}const J={};J[i.TEXTURE_2D]=he(i.TEXTURE_2D,i.TEXTURE_2D,1),J[i.TEXTURE_CUBE_MAP]=he(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),n&&(J[i.TEXTURE_2D_ARRAY]=he(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),J[i.TEXTURE_3D]=he(i.TEXTURE_3D,i.TEXTURE_3D,1,1)),o.setClear(0,0,0,1),l.setClear(1),c.setClear(0),se(i.DEPTH_TEST),l.setFunc(Xl),Ie(!1),B(z0),se(i.CULL_FACE),_e(dr);function se(H){h[H]!==!0&&(i.enable(H),h[H]=!0)}function V(H){h[H]!==!1&&(i.disable(H),h[H]=!1)}function ie(H,Ee){return m[H]!==Ee?(i.bindFramebuffer(H,Ee),m[H]=Ee,n&&(H===i.DRAW_FRAMEBUFFER&&(m[i.FRAMEBUFFER]=Ee),H===i.FRAMEBUFFER&&(m[i.DRAW_FRAMEBUFFER]=Ee)),!0):!1}function O(H,Ee){let we=v,Ue=!1;if(H)if(we=x.get(Ee),we===void 0&&(we=[],x.set(Ee,we)),H.isWebGLMultipleRenderTargets){const Ne=H.texture;if(we.length!==Ne.length||we[0]!==i.COLOR_ATTACHMENT0){for(let $e=0,Ye=Ne.length;$e<Ye;$e++)we[$e]=i.COLOR_ATTACHMENT0+$e;we.length=Ne.length,Ue=!0}}else we[0]!==i.COLOR_ATTACHMENT0&&(we[0]=i.COLOR_ATTACHMENT0,Ue=!0);else we[0]!==i.BACK&&(we[0]=i.BACK,Ue=!0);Ue&&(t.isWebGL2?i.drawBuffers(we):e.get("WEBGL_draw_buffers").drawBuffersWEBGL(we))}function le(H){return d!==H?(i.useProgram(H),d=H,!0):!1}const ce={[Pr]:i.FUNC_ADD,[q_]:i.FUNC_SUBTRACT,[$_]:i.FUNC_REVERSE_SUBTRACT};if(n)ce[V0]=i.MIN,ce[W0]=i.MAX;else{const H=e.get("EXT_blend_minmax");H!==null&&(ce[V0]=H.MIN_EXT,ce[W0]=H.MAX_EXT)}const ve={[Y_]:i.ZERO,[j_]:i.ONE,[K_]:i.SRC_COLOR,[Cu]:i.SRC_ALPHA,[n1]:i.SRC_ALPHA_SATURATE,[e1]:i.DST_COLOR,[Q_]:i.DST_ALPHA,[Z_]:i.ONE_MINUS_SRC_COLOR,[Ru]:i.ONE_MINUS_SRC_ALPHA,[t1]:i.ONE_MINUS_DST_COLOR,[J_]:i.ONE_MINUS_DST_ALPHA,[i1]:i.CONSTANT_COLOR,[r1]:i.ONE_MINUS_CONSTANT_COLOR,[s1]:i.CONSTANT_ALPHA,[a1]:i.ONE_MINUS_CONSTANT_ALPHA};function _e(H,Ee,we,Ue,Ne,$e,Ye,mt,vt,Qe){if(H===dr){p===!0&&(V(i.BLEND),p=!1);return}if(p===!1&&(se(i.BLEND),p=!0),H!==X_){if(H!==_||Qe!==P){if((g!==Pr||S!==Pr)&&(i.blendEquation(i.FUNC_ADD),g=Pr,S=Pr),Qe)switch(H){case ks:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case ri:i.blendFunc(i.ONE,i.ONE);break;case H0:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case G0:i.blendFuncSeparate(i.ZERO,i.SRC_COLOR,i.ZERO,i.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",H);break}else switch(H){case ks:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case ri:i.blendFunc(i.SRC_ALPHA,i.ONE);break;case H0:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case G0:i.blendFunc(i.ZERO,i.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",H);break}b=null,w=null,M=null,I=null,E.set(0,0,0),y=0,_=H,P=Qe}return}Ne=Ne||Ee,$e=$e||we,Ye=Ye||Ue,(Ee!==g||Ne!==S)&&(i.blendEquationSeparate(ce[Ee],ce[Ne]),g=Ee,S=Ne),(we!==b||Ue!==w||$e!==M||Ye!==I)&&(i.blendFuncSeparate(ve[we],ve[Ue],ve[$e],ve[Ye]),b=we,w=Ue,M=$e,I=Ye),(mt.equals(E)===!1||vt!==y)&&(i.blendColor(mt.r,mt.g,mt.b,vt),E.copy(mt),y=vt),_=H,P=!1}function He(H,Ee){H.side===ki?V(i.CULL_FACE):se(i.CULL_FACE);let we=H.side===Mn;Ee&&(we=!we),Ie(we),H.blending===ks&&H.transparent===!1?_e(dr):_e(H.blending,H.blendEquation,H.blendSrc,H.blendDst,H.blendEquationAlpha,H.blendSrcAlpha,H.blendDstAlpha,H.blendColor,H.blendAlpha,H.premultipliedAlpha),l.setFunc(H.depthFunc),l.setTest(H.depthTest),l.setMask(H.depthWrite),o.setMask(H.colorWrite);const Ue=H.stencilWrite;c.setTest(Ue),Ue&&(c.setMask(H.stencilWriteMask),c.setFunc(H.stencilFunc,H.stencilRef,H.stencilFuncMask),c.setOp(H.stencilFail,H.stencilZFail,H.stencilZPass)),K(H.polygonOffset,H.polygonOffsetFactor,H.polygonOffsetUnits),H.alphaToCoverage===!0?se(i.SAMPLE_ALPHA_TO_COVERAGE):V(i.SAMPLE_ALPHA_TO_COVERAGE)}function Ie(H){U!==H&&(H?i.frontFace(i.CW):i.frontFace(i.CCW),U=H)}function B(H){H!==G_?(se(i.CULL_FACE),H!==G&&(H===z0?i.cullFace(i.BACK):H===V_?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):V(i.CULL_FACE),G=H}function T(H){H!==F&&(Z&&i.lineWidth(H),F=H)}function K(H,Ee,we){H?(se(i.POLYGON_OFFSET_FILL),(z!==Ee||q!==we)&&(i.polygonOffset(Ee,we),z=Ee,q=we)):V(i.POLYGON_OFFSET_FILL)}function de(H){H?se(i.SCISSOR_TEST):V(i.SCISSOR_TEST)}function fe(H){H===void 0&&(H=i.TEXTURE0+ee-1),W!==H&&(i.activeTexture(H),W=H)}function pe(H,Ee,we){we===void 0&&(W===null?we=i.TEXTURE0+ee-1:we=W);let Ue=C[we];Ue===void 0&&(Ue={type:void 0,texture:void 0},C[we]=Ue),(Ue.type!==H||Ue.texture!==Ee)&&(W!==we&&(i.activeTexture(we),W=we),i.bindTexture(H,Ee||J[H]),Ue.type=H,Ue.texture=Ee)}function ke(){const H=C[W];H!==void 0&&H.type!==void 0&&(i.bindTexture(H.type,null),H.type=void 0,H.texture=void 0)}function Ae(){try{i.compressedTexImage2D.apply(i,arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function Fe(){try{i.compressedTexImage3D.apply(i,arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function Ge(){try{i.texSubImage2D.apply(i,arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function Xe(){try{i.texSubImage3D.apply(i,arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function be(){try{i.compressedTexSubImage2D.apply(i,arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function it(){try{i.compressedTexSubImage3D.apply(i,arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function qe(){try{i.texStorage2D.apply(i,arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function We(){try{i.texStorage3D.apply(i,arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function ze(){try{i.texImage2D.apply(i,arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function me(){try{i.texImage3D.apply(i,arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function k(H){N.equals(H)===!1&&(i.scissor(H.x,H.y,H.z,H.w),N.copy(H))}function ye(H){$.equals(H)===!1&&(i.viewport(H.x,H.y,H.z,H.w),$.copy(H))}function Be(H,Ee){let we=f.get(Ee);we===void 0&&(we=new WeakMap,f.set(Ee,we));let Ue=we.get(H);Ue===void 0&&(Ue=i.getUniformBlockIndex(Ee,H.name),we.set(H,Ue))}function Pe(H,Ee){const Ue=f.get(Ee).get(H);u.get(Ee)!==Ue&&(i.uniformBlockBinding(Ee,Ue,H.__bindingPointIndex),u.set(Ee,Ue))}function ge(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),n===!0&&(i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null)),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),h={},W=null,C={},m={},x=new WeakMap,v=[],d=null,p=!1,_=null,g=null,b=null,w=null,S=null,M=null,I=null,E=new gt(0,0,0),y=0,P=!1,U=null,G=null,F=null,z=null,q=null,N.set(0,0,i.canvas.width,i.canvas.height),$.set(0,0,i.canvas.width,i.canvas.height),o.reset(),l.reset(),c.reset()}return{buffers:{color:o,depth:l,stencil:c},enable:se,disable:V,bindFramebuffer:ie,drawBuffers:O,useProgram:le,setBlending:_e,setMaterial:He,setFlipSided:Ie,setCullFace:B,setLineWidth:T,setPolygonOffset:K,setScissorTest:de,activeTexture:fe,bindTexture:pe,unbindTexture:ke,compressedTexImage2D:Ae,compressedTexImage3D:Fe,texImage2D:ze,texImage3D:me,updateUBOMapping:Be,uniformBlockBinding:Pe,texStorage2D:qe,texStorage3D:We,texSubImage2D:Ge,texSubImage3D:Xe,compressedTexSubImage2D:be,compressedTexSubImage3D:it,scissor:k,viewport:ye,reset:ge}}function GM(i,e,t,n,r,s,a){const o=r.isWebGL2,l=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),u=new WeakMap;let f;const h=new WeakMap;let m=!1;try{m=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function x(B,T){return m?new OffscreenCanvas(B,T):Kl("canvas")}function v(B,T,K,de){let fe=1;if((B.width>de||B.height>de)&&(fe=de/Math.max(B.width,B.height)),fe<1||T===!0)if(typeof HTMLImageElement<"u"&&B instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&B instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&B instanceof ImageBitmap){const pe=T?Uu:Math.floor,ke=pe(fe*B.width),Ae=pe(fe*B.height);f===void 0&&(f=x(ke,Ae));const Fe=K?x(ke,Ae):f;return Fe.width=ke,Fe.height=Ae,Fe.getContext("2d").drawImage(B,0,0,ke,Ae),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+B.width+"x"+B.height+") to ("+ke+"x"+Ae+")."),Fe}else return"data"in B&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+B.width+"x"+B.height+")."),B;return B}function d(B){return bf(B.width)&&bf(B.height)}function p(B){return o?!1:B.wrapS!==si||B.wrapT!==si||B.minFilter!==gn&&B.minFilter!==Gn}function _(B,T){return B.generateMipmaps&&T&&B.minFilter!==gn&&B.minFilter!==Gn}function g(B){i.generateMipmap(B)}function b(B,T,K,de,fe=!1){if(o===!1)return T;if(B!==null){if(i[B]!==void 0)return i[B];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+B+"'")}let pe=T;if(T===i.RED&&(K===i.FLOAT&&(pe=i.R32F),K===i.HALF_FLOAT&&(pe=i.R16F),K===i.UNSIGNED_BYTE&&(pe=i.R8)),T===i.RED_INTEGER&&(K===i.UNSIGNED_BYTE&&(pe=i.R8UI),K===i.UNSIGNED_SHORT&&(pe=i.R16UI),K===i.UNSIGNED_INT&&(pe=i.R32UI),K===i.BYTE&&(pe=i.R8I),K===i.SHORT&&(pe=i.R16I),K===i.INT&&(pe=i.R32I)),T===i.RG&&(K===i.FLOAT&&(pe=i.RG32F),K===i.HALF_FLOAT&&(pe=i.RG16F),K===i.UNSIGNED_BYTE&&(pe=i.RG8)),T===i.RGBA){const ke=fe?ql:At.getTransfer(de);K===i.FLOAT&&(pe=i.RGBA32F),K===i.HALF_FLOAT&&(pe=i.RGBA16F),K===i.UNSIGNED_BYTE&&(pe=ke===Dt?i.SRGB8_ALPHA8:i.RGBA8),K===i.UNSIGNED_SHORT_4_4_4_4&&(pe=i.RGBA4),K===i.UNSIGNED_SHORT_5_5_5_1&&(pe=i.RGB5_A1)}return(pe===i.R16F||pe===i.R32F||pe===i.RG16F||pe===i.RG32F||pe===i.RGBA16F||pe===i.RGBA32F)&&e.get("EXT_color_buffer_float"),pe}function w(B,T,K){return _(B,K)===!0||B.isFramebufferTexture&&B.minFilter!==gn&&B.minFilter!==Gn?Math.log2(Math.max(T.width,T.height))+1:B.mipmaps!==void 0&&B.mipmaps.length>0?B.mipmaps.length:B.isCompressedTexture&&Array.isArray(B.image)?T.mipmaps.length:1}function S(B){return B===gn||B===X0||B===Mc?i.NEAREST:i.LINEAR}function M(B){const T=B.target;T.removeEventListener("dispose",M),E(T),T.isVideoTexture&&u.delete(T)}function I(B){const T=B.target;T.removeEventListener("dispose",I),P(T)}function E(B){const T=n.get(B);if(T.__webglInit===void 0)return;const K=B.source,de=h.get(K);if(de){const fe=de[T.__cacheKey];fe.usedTimes--,fe.usedTimes===0&&y(B),Object.keys(de).length===0&&h.delete(K)}n.remove(B)}function y(B){const T=n.get(B);i.deleteTexture(T.__webglTexture);const K=B.source,de=h.get(K);delete de[T.__cacheKey],a.memory.textures--}function P(B){const T=B.texture,K=n.get(B),de=n.get(T);if(de.__webglTexture!==void 0&&(i.deleteTexture(de.__webglTexture),a.memory.textures--),B.depthTexture&&B.depthTexture.dispose(),B.isWebGLCubeRenderTarget)for(let fe=0;fe<6;fe++){if(Array.isArray(K.__webglFramebuffer[fe]))for(let pe=0;pe<K.__webglFramebuffer[fe].length;pe++)i.deleteFramebuffer(K.__webglFramebuffer[fe][pe]);else i.deleteFramebuffer(K.__webglFramebuffer[fe]);K.__webglDepthbuffer&&i.deleteRenderbuffer(K.__webglDepthbuffer[fe])}else{if(Array.isArray(K.__webglFramebuffer))for(let fe=0;fe<K.__webglFramebuffer.length;fe++)i.deleteFramebuffer(K.__webglFramebuffer[fe]);else i.deleteFramebuffer(K.__webglFramebuffer);if(K.__webglDepthbuffer&&i.deleteRenderbuffer(K.__webglDepthbuffer),K.__webglMultisampledFramebuffer&&i.deleteFramebuffer(K.__webglMultisampledFramebuffer),K.__webglColorRenderbuffer)for(let fe=0;fe<K.__webglColorRenderbuffer.length;fe++)K.__webglColorRenderbuffer[fe]&&i.deleteRenderbuffer(K.__webglColorRenderbuffer[fe]);K.__webglDepthRenderbuffer&&i.deleteRenderbuffer(K.__webglDepthRenderbuffer)}if(B.isWebGLMultipleRenderTargets)for(let fe=0,pe=T.length;fe<pe;fe++){const ke=n.get(T[fe]);ke.__webglTexture&&(i.deleteTexture(ke.__webglTexture),a.memory.textures--),n.remove(T[fe])}n.remove(T),n.remove(B)}let U=0;function G(){U=0}function F(){const B=U;return B>=r.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+B+" texture units while this GPU supports only "+r.maxTextures),U+=1,B}function z(B){const T=[];return T.push(B.wrapS),T.push(B.wrapT),T.push(B.wrapR||0),T.push(B.magFilter),T.push(B.minFilter),T.push(B.anisotropy),T.push(B.internalFormat),T.push(B.format),T.push(B.type),T.push(B.generateMipmaps),T.push(B.premultiplyAlpha),T.push(B.flipY),T.push(B.unpackAlignment),T.push(B.colorSpace),T.join()}function q(B,T){const K=n.get(B);if(B.isVideoTexture&&He(B),B.isRenderTargetTexture===!1&&B.version>0&&K.__version!==B.version){const de=B.image;if(de===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(de.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{N(K,B,T);return}}t.bindTexture(i.TEXTURE_2D,K.__webglTexture,i.TEXTURE0+T)}function ee(B,T){const K=n.get(B);if(B.version>0&&K.__version!==B.version){N(K,B,T);return}t.bindTexture(i.TEXTURE_2D_ARRAY,K.__webglTexture,i.TEXTURE0+T)}function Z(B,T){const K=n.get(B);if(B.version>0&&K.__version!==B.version){N(K,B,T);return}t.bindTexture(i.TEXTURE_3D,K.__webglTexture,i.TEXTURE0+T)}function Q(B,T){const K=n.get(B);if(B.version>0&&K.__version!==B.version){$(K,B,T);return}t.bindTexture(i.TEXTURE_CUBE_MAP,K.__webglTexture,i.TEXTURE0+T)}const j={[Lu]:i.REPEAT,[si]:i.CLAMP_TO_EDGE,[Fu]:i.MIRRORED_REPEAT},W={[gn]:i.NEAREST,[X0]:i.NEAREST_MIPMAP_NEAREST,[Mc]:i.NEAREST_MIPMAP_LINEAR,[Gn]:i.LINEAR,[E1]:i.LINEAR_MIPMAP_NEAREST,[Wa]:i.LINEAR_MIPMAP_LINEAR},C={[I1]:i.NEVER,[H1]:i.ALWAYS,[k1]:i.LESS,[Gp]:i.LEQUAL,[U1]:i.EQUAL,[z1]:i.GEQUAL,[N1]:i.GREATER,[O1]:i.NOTEQUAL};function A(B,T,K){if(K?(i.texParameteri(B,i.TEXTURE_WRAP_S,j[T.wrapS]),i.texParameteri(B,i.TEXTURE_WRAP_T,j[T.wrapT]),(B===i.TEXTURE_3D||B===i.TEXTURE_2D_ARRAY)&&i.texParameteri(B,i.TEXTURE_WRAP_R,j[T.wrapR]),i.texParameteri(B,i.TEXTURE_MAG_FILTER,W[T.magFilter]),i.texParameteri(B,i.TEXTURE_MIN_FILTER,W[T.minFilter])):(i.texParameteri(B,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(B,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE),(B===i.TEXTURE_3D||B===i.TEXTURE_2D_ARRAY)&&i.texParameteri(B,i.TEXTURE_WRAP_R,i.CLAMP_TO_EDGE),(T.wrapS!==si||T.wrapT!==si)&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."),i.texParameteri(B,i.TEXTURE_MAG_FILTER,S(T.magFilter)),i.texParameteri(B,i.TEXTURE_MIN_FILTER,S(T.minFilter)),T.minFilter!==gn&&T.minFilter!==Gn&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")),T.compareFunction&&(i.texParameteri(B,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(B,i.TEXTURE_COMPARE_FUNC,C[T.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){const de=e.get("EXT_texture_filter_anisotropic");if(T.magFilter===gn||T.minFilter!==Mc&&T.minFilter!==Wa||T.type===or&&e.has("OES_texture_float_linear")===!1||o===!1&&T.type===Xa&&e.has("OES_texture_half_float_linear")===!1)return;(T.anisotropy>1||n.get(T).__currentAnisotropy)&&(i.texParameterf(B,de.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(T.anisotropy,r.getMaxAnisotropy())),n.get(T).__currentAnisotropy=T.anisotropy)}}function R(B,T){let K=!1;B.__webglInit===void 0&&(B.__webglInit=!0,T.addEventListener("dispose",M));const de=T.source;let fe=h.get(de);fe===void 0&&(fe={},h.set(de,fe));const pe=z(T);if(pe!==B.__cacheKey){fe[pe]===void 0&&(fe[pe]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,K=!0),fe[pe].usedTimes++;const ke=fe[B.__cacheKey];ke!==void 0&&(fe[B.__cacheKey].usedTimes--,ke.usedTimes===0&&y(T)),B.__cacheKey=pe,B.__webglTexture=fe[pe].texture}return K}function N(B,T,K){let de=i.TEXTURE_2D;(T.isDataArrayTexture||T.isCompressedArrayTexture)&&(de=i.TEXTURE_2D_ARRAY),T.isData3DTexture&&(de=i.TEXTURE_3D);const fe=R(B,T),pe=T.source;t.bindTexture(de,B.__webglTexture,i.TEXTURE0+K);const ke=n.get(pe);if(pe.version!==ke.__version||fe===!0){t.activeTexture(i.TEXTURE0+K);const Ae=At.getPrimaries(At.workingColorSpace),Fe=T.colorSpace===Xn?null:At.getPrimaries(T.colorSpace),Ge=T.colorSpace===Xn||Ae===Fe?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,T.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,T.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,T.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ge);const Xe=p(T)&&d(T.image)===!1;let be=v(T.image,Xe,!1,r.maxTextureSize);be=Ie(T,be);const it=d(be)||o,qe=s.convert(T.format,T.colorSpace);let We=s.convert(T.type),ze=b(T.internalFormat,qe,We,T.colorSpace,T.isVideoTexture);A(de,T,it);let me;const k=T.mipmaps,ye=o&&T.isVideoTexture!==!0&&ze!==zp,Be=ke.__version===void 0||fe===!0,Pe=w(T,be,it);if(T.isDepthTexture)ze=i.DEPTH_COMPONENT,o?T.type===or?ze=i.DEPTH_COMPONENT32F:T.type===ar?ze=i.DEPTH_COMPONENT24:T.type===Wr?ze=i.DEPTH24_STENCIL8:ze=i.DEPTH_COMPONENT16:T.type===or&&console.error("WebGLRenderer: Floating point depth texture requires WebGL2."),T.format===Xr&&ze===i.DEPTH_COMPONENT&&T.type!==fh&&T.type!==ar&&(console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."),T.type=ar,We=s.convert(T.type)),T.format===ia&&ze===i.DEPTH_COMPONENT&&(ze=i.DEPTH_STENCIL,T.type!==Wr&&(console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."),T.type=Wr,We=s.convert(T.type))),Be&&(ye?t.texStorage2D(i.TEXTURE_2D,1,ze,be.width,be.height):t.texImage2D(i.TEXTURE_2D,0,ze,be.width,be.height,0,qe,We,null));else if(T.isDataTexture)if(k.length>0&&it){ye&&Be&&t.texStorage2D(i.TEXTURE_2D,Pe,ze,k[0].width,k[0].height);for(let ge=0,H=k.length;ge<H;ge++)me=k[ge],ye?t.texSubImage2D(i.TEXTURE_2D,ge,0,0,me.width,me.height,qe,We,me.data):t.texImage2D(i.TEXTURE_2D,ge,ze,me.width,me.height,0,qe,We,me.data);T.generateMipmaps=!1}else ye?(Be&&t.texStorage2D(i.TEXTURE_2D,Pe,ze,be.width,be.height),t.texSubImage2D(i.TEXTURE_2D,0,0,0,be.width,be.height,qe,We,be.data)):t.texImage2D(i.TEXTURE_2D,0,ze,be.width,be.height,0,qe,We,be.data);else if(T.isCompressedTexture)if(T.isCompressedArrayTexture){ye&&Be&&t.texStorage3D(i.TEXTURE_2D_ARRAY,Pe,ze,k[0].width,k[0].height,be.depth);for(let ge=0,H=k.length;ge<H;ge++)me=k[ge],T.format!==ai?qe!==null?ye?t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,ge,0,0,0,me.width,me.height,be.depth,qe,me.data,0,0):t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,ge,ze,me.width,me.height,be.depth,0,me.data,0,0):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):ye?t.texSubImage3D(i.TEXTURE_2D_ARRAY,ge,0,0,0,me.width,me.height,be.depth,qe,We,me.data):t.texImage3D(i.TEXTURE_2D_ARRAY,ge,ze,me.width,me.height,be.depth,0,qe,We,me.data)}else{ye&&Be&&t.texStorage2D(i.TEXTURE_2D,Pe,ze,k[0].width,k[0].height);for(let ge=0,H=k.length;ge<H;ge++)me=k[ge],T.format!==ai?qe!==null?ye?t.compressedTexSubImage2D(i.TEXTURE_2D,ge,0,0,me.width,me.height,qe,me.data):t.compressedTexImage2D(i.TEXTURE_2D,ge,ze,me.width,me.height,0,me.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):ye?t.texSubImage2D(i.TEXTURE_2D,ge,0,0,me.width,me.height,qe,We,me.data):t.texImage2D(i.TEXTURE_2D,ge,ze,me.width,me.height,0,qe,We,me.data)}else if(T.isDataArrayTexture)ye?(Be&&t.texStorage3D(i.TEXTURE_2D_ARRAY,Pe,ze,be.width,be.height,be.depth),t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,be.width,be.height,be.depth,qe,We,be.data)):t.texImage3D(i.TEXTURE_2D_ARRAY,0,ze,be.width,be.height,be.depth,0,qe,We,be.data);else if(T.isData3DTexture)ye?(Be&&t.texStorage3D(i.TEXTURE_3D,Pe,ze,be.width,be.height,be.depth),t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,be.width,be.height,be.depth,qe,We,be.data)):t.texImage3D(i.TEXTURE_3D,0,ze,be.width,be.height,be.depth,0,qe,We,be.data);else if(T.isFramebufferTexture){if(Be)if(ye)t.texStorage2D(i.TEXTURE_2D,Pe,ze,be.width,be.height);else{let ge=be.width,H=be.height;for(let Ee=0;Ee<Pe;Ee++)t.texImage2D(i.TEXTURE_2D,Ee,ze,ge,H,0,qe,We,null),ge>>=1,H>>=1}}else if(k.length>0&&it){ye&&Be&&t.texStorage2D(i.TEXTURE_2D,Pe,ze,k[0].width,k[0].height);for(let ge=0,H=k.length;ge<H;ge++)me=k[ge],ye?t.texSubImage2D(i.TEXTURE_2D,ge,0,0,qe,We,me):t.texImage2D(i.TEXTURE_2D,ge,ze,qe,We,me);T.generateMipmaps=!1}else ye?(Be&&t.texStorage2D(i.TEXTURE_2D,Pe,ze,be.width,be.height),t.texSubImage2D(i.TEXTURE_2D,0,0,0,qe,We,be)):t.texImage2D(i.TEXTURE_2D,0,ze,qe,We,be);_(T,it)&&g(de),ke.__version=pe.version,T.onUpdate&&T.onUpdate(T)}B.__version=T.version}function $(B,T,K){if(T.image.length!==6)return;const de=R(B,T),fe=T.source;t.bindTexture(i.TEXTURE_CUBE_MAP,B.__webglTexture,i.TEXTURE0+K);const pe=n.get(fe);if(fe.version!==pe.__version||de===!0){t.activeTexture(i.TEXTURE0+K);const ke=At.getPrimaries(At.workingColorSpace),Ae=T.colorSpace===Xn?null:At.getPrimaries(T.colorSpace),Fe=T.colorSpace===Xn||ke===Ae?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,T.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,T.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,T.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Fe);const Ge=T.isCompressedTexture||T.image[0].isCompressedTexture,Xe=T.image[0]&&T.image[0].isDataTexture,be=[];for(let ge=0;ge<6;ge++)!Ge&&!Xe?be[ge]=v(T.image[ge],!1,!0,r.maxCubemapSize):be[ge]=Xe?T.image[ge].image:T.image[ge],be[ge]=Ie(T,be[ge]);const it=be[0],qe=d(it)||o,We=s.convert(T.format,T.colorSpace),ze=s.convert(T.type),me=b(T.internalFormat,We,ze,T.colorSpace),k=o&&T.isVideoTexture!==!0,ye=pe.__version===void 0||de===!0;let Be=w(T,it,qe);A(i.TEXTURE_CUBE_MAP,T,qe);let Pe;if(Ge){k&&ye&&t.texStorage2D(i.TEXTURE_CUBE_MAP,Be,me,it.width,it.height);for(let ge=0;ge<6;ge++){Pe=be[ge].mipmaps;for(let H=0;H<Pe.length;H++){const Ee=Pe[H];T.format!==ai?We!==null?k?t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ge,H,0,0,Ee.width,Ee.height,We,Ee.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ge,H,me,Ee.width,Ee.height,0,Ee.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):k?t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ge,H,0,0,Ee.width,Ee.height,We,ze,Ee.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ge,H,me,Ee.width,Ee.height,0,We,ze,Ee.data)}}}else{Pe=T.mipmaps,k&&ye&&(Pe.length>0&&Be++,t.texStorage2D(i.TEXTURE_CUBE_MAP,Be,me,be[0].width,be[0].height));for(let ge=0;ge<6;ge++)if(Xe){k?t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ge,0,0,0,be[ge].width,be[ge].height,We,ze,be[ge].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ge,0,me,be[ge].width,be[ge].height,0,We,ze,be[ge].data);for(let H=0;H<Pe.length;H++){const we=Pe[H].image[ge].image;k?t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ge,H+1,0,0,we.width,we.height,We,ze,we.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ge,H+1,me,we.width,we.height,0,We,ze,we.data)}}else{k?t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ge,0,0,0,We,ze,be[ge]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ge,0,me,We,ze,be[ge]);for(let H=0;H<Pe.length;H++){const Ee=Pe[H];k?t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ge,H+1,0,0,We,ze,Ee.image[ge]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ge,H+1,me,We,ze,Ee.image[ge])}}}_(T,qe)&&g(i.TEXTURE_CUBE_MAP),pe.__version=fe.version,T.onUpdate&&T.onUpdate(T)}B.__version=T.version}function he(B,T,K,de,fe,pe){const ke=s.convert(K.format,K.colorSpace),Ae=s.convert(K.type),Fe=b(K.internalFormat,ke,Ae,K.colorSpace);if(!n.get(T).__hasExternalTextures){const Xe=Math.max(1,T.width>>pe),be=Math.max(1,T.height>>pe);fe===i.TEXTURE_3D||fe===i.TEXTURE_2D_ARRAY?t.texImage3D(fe,pe,Fe,Xe,be,T.depth,0,ke,Ae,null):t.texImage2D(fe,pe,Fe,Xe,be,0,ke,Ae,null)}t.bindFramebuffer(i.FRAMEBUFFER,B),_e(T)?l.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,de,fe,n.get(K).__webglTexture,0,ve(T)):(fe===i.TEXTURE_2D||fe>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&fe<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,de,fe,n.get(K).__webglTexture,pe),t.bindFramebuffer(i.FRAMEBUFFER,null)}function J(B,T,K){if(i.bindRenderbuffer(i.RENDERBUFFER,B),T.depthBuffer&&!T.stencilBuffer){let de=o===!0?i.DEPTH_COMPONENT24:i.DEPTH_COMPONENT16;if(K||_e(T)){const fe=T.depthTexture;fe&&fe.isDepthTexture&&(fe.type===or?de=i.DEPTH_COMPONENT32F:fe.type===ar&&(de=i.DEPTH_COMPONENT24));const pe=ve(T);_e(T)?l.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,pe,de,T.width,T.height):i.renderbufferStorageMultisample(i.RENDERBUFFER,pe,de,T.width,T.height)}else i.renderbufferStorage(i.RENDERBUFFER,de,T.width,T.height);i.framebufferRenderbuffer(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.RENDERBUFFER,B)}else if(T.depthBuffer&&T.stencilBuffer){const de=ve(T);K&&_e(T)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,de,i.DEPTH24_STENCIL8,T.width,T.height):_e(T)?l.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,de,i.DEPTH24_STENCIL8,T.width,T.height):i.renderbufferStorage(i.RENDERBUFFER,i.DEPTH_STENCIL,T.width,T.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.RENDERBUFFER,B)}else{const de=T.isWebGLMultipleRenderTargets===!0?T.texture:[T.texture];for(let fe=0;fe<de.length;fe++){const pe=de[fe],ke=s.convert(pe.format,pe.colorSpace),Ae=s.convert(pe.type),Fe=b(pe.internalFormat,ke,Ae,pe.colorSpace),Ge=ve(T);K&&_e(T)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,Ge,Fe,T.width,T.height):_e(T)?l.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Ge,Fe,T.width,T.height):i.renderbufferStorage(i.RENDERBUFFER,Fe,T.width,T.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function se(B,T){if(T&&T.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(i.FRAMEBUFFER,B),!(T.depthTexture&&T.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!n.get(T.depthTexture).__webglTexture||T.depthTexture.image.width!==T.width||T.depthTexture.image.height!==T.height)&&(T.depthTexture.image.width=T.width,T.depthTexture.image.height=T.height,T.depthTexture.needsUpdate=!0),q(T.depthTexture,0);const de=n.get(T.depthTexture).__webglTexture,fe=ve(T);if(T.depthTexture.format===Xr)_e(T)?l.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,de,0,fe):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,de,0);else if(T.depthTexture.format===ia)_e(T)?l.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,de,0,fe):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,de,0);else throw new Error("Unknown depthTexture format")}function V(B){const T=n.get(B),K=B.isWebGLCubeRenderTarget===!0;if(B.depthTexture&&!T.__autoAllocateDepthBuffer){if(K)throw new Error("target.depthTexture not supported in Cube render targets");se(T.__webglFramebuffer,B)}else if(K){T.__webglDepthbuffer=[];for(let de=0;de<6;de++)t.bindFramebuffer(i.FRAMEBUFFER,T.__webglFramebuffer[de]),T.__webglDepthbuffer[de]=i.createRenderbuffer(),J(T.__webglDepthbuffer[de],B,!1)}else t.bindFramebuffer(i.FRAMEBUFFER,T.__webglFramebuffer),T.__webglDepthbuffer=i.createRenderbuffer(),J(T.__webglDepthbuffer,B,!1);t.bindFramebuffer(i.FRAMEBUFFER,null)}function ie(B,T,K){const de=n.get(B);T!==void 0&&he(de.__webglFramebuffer,B,B.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),K!==void 0&&V(B)}function O(B){const T=B.texture,K=n.get(B),de=n.get(T);B.addEventListener("dispose",I),B.isWebGLMultipleRenderTargets!==!0&&(de.__webglTexture===void 0&&(de.__webglTexture=i.createTexture()),de.__version=T.version,a.memory.textures++);const fe=B.isWebGLCubeRenderTarget===!0,pe=B.isWebGLMultipleRenderTargets===!0,ke=d(B)||o;if(fe){K.__webglFramebuffer=[];for(let Ae=0;Ae<6;Ae++)if(o&&T.mipmaps&&T.mipmaps.length>0){K.__webglFramebuffer[Ae]=[];for(let Fe=0;Fe<T.mipmaps.length;Fe++)K.__webglFramebuffer[Ae][Fe]=i.createFramebuffer()}else K.__webglFramebuffer[Ae]=i.createFramebuffer()}else{if(o&&T.mipmaps&&T.mipmaps.length>0){K.__webglFramebuffer=[];for(let Ae=0;Ae<T.mipmaps.length;Ae++)K.__webglFramebuffer[Ae]=i.createFramebuffer()}else K.__webglFramebuffer=i.createFramebuffer();if(pe)if(r.drawBuffers){const Ae=B.texture;for(let Fe=0,Ge=Ae.length;Fe<Ge;Fe++){const Xe=n.get(Ae[Fe]);Xe.__webglTexture===void 0&&(Xe.__webglTexture=i.createTexture(),a.memory.textures++)}}else console.warn("THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.");if(o&&B.samples>0&&_e(B)===!1){const Ae=pe?T:[T];K.__webglMultisampledFramebuffer=i.createFramebuffer(),K.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,K.__webglMultisampledFramebuffer);for(let Fe=0;Fe<Ae.length;Fe++){const Ge=Ae[Fe];K.__webglColorRenderbuffer[Fe]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,K.__webglColorRenderbuffer[Fe]);const Xe=s.convert(Ge.format,Ge.colorSpace),be=s.convert(Ge.type),it=b(Ge.internalFormat,Xe,be,Ge.colorSpace,B.isXRRenderTarget===!0),qe=ve(B);i.renderbufferStorageMultisample(i.RENDERBUFFER,qe,it,B.width,B.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Fe,i.RENDERBUFFER,K.__webglColorRenderbuffer[Fe])}i.bindRenderbuffer(i.RENDERBUFFER,null),B.depthBuffer&&(K.__webglDepthRenderbuffer=i.createRenderbuffer(),J(K.__webglDepthRenderbuffer,B,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(fe){t.bindTexture(i.TEXTURE_CUBE_MAP,de.__webglTexture),A(i.TEXTURE_CUBE_MAP,T,ke);for(let Ae=0;Ae<6;Ae++)if(o&&T.mipmaps&&T.mipmaps.length>0)for(let Fe=0;Fe<T.mipmaps.length;Fe++)he(K.__webglFramebuffer[Ae][Fe],B,T,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+Ae,Fe);else he(K.__webglFramebuffer[Ae],B,T,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+Ae,0);_(T,ke)&&g(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(pe){const Ae=B.texture;for(let Fe=0,Ge=Ae.length;Fe<Ge;Fe++){const Xe=Ae[Fe],be=n.get(Xe);t.bindTexture(i.TEXTURE_2D,be.__webglTexture),A(i.TEXTURE_2D,Xe,ke),he(K.__webglFramebuffer,B,Xe,i.COLOR_ATTACHMENT0+Fe,i.TEXTURE_2D,0),_(Xe,ke)&&g(i.TEXTURE_2D)}t.unbindTexture()}else{let Ae=i.TEXTURE_2D;if((B.isWebGL3DRenderTarget||B.isWebGLArrayRenderTarget)&&(o?Ae=B.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY:console.error("THREE.WebGLTextures: THREE.Data3DTexture and THREE.DataArrayTexture only supported with WebGL2.")),t.bindTexture(Ae,de.__webglTexture),A(Ae,T,ke),o&&T.mipmaps&&T.mipmaps.length>0)for(let Fe=0;Fe<T.mipmaps.length;Fe++)he(K.__webglFramebuffer[Fe],B,T,i.COLOR_ATTACHMENT0,Ae,Fe);else he(K.__webglFramebuffer,B,T,i.COLOR_ATTACHMENT0,Ae,0);_(T,ke)&&g(Ae),t.unbindTexture()}B.depthBuffer&&V(B)}function le(B){const T=d(B)||o,K=B.isWebGLMultipleRenderTargets===!0?B.texture:[B.texture];for(let de=0,fe=K.length;de<fe;de++){const pe=K[de];if(_(pe,T)){const ke=B.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:i.TEXTURE_2D,Ae=n.get(pe).__webglTexture;t.bindTexture(ke,Ae),g(ke),t.unbindTexture()}}}function ce(B){if(o&&B.samples>0&&_e(B)===!1){const T=B.isWebGLMultipleRenderTargets?B.texture:[B.texture],K=B.width,de=B.height;let fe=i.COLOR_BUFFER_BIT;const pe=[],ke=B.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Ae=n.get(B),Fe=B.isWebGLMultipleRenderTargets===!0;if(Fe)for(let Ge=0;Ge<T.length;Ge++)t.bindFramebuffer(i.FRAMEBUFFER,Ae.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Ge,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,Ae.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Ge,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,Ae.__webglMultisampledFramebuffer),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Ae.__webglFramebuffer);for(let Ge=0;Ge<T.length;Ge++){pe.push(i.COLOR_ATTACHMENT0+Ge),B.depthBuffer&&pe.push(ke);const Xe=Ae.__ignoreDepthValues!==void 0?Ae.__ignoreDepthValues:!1;if(Xe===!1&&(B.depthBuffer&&(fe|=i.DEPTH_BUFFER_BIT),B.stencilBuffer&&(fe|=i.STENCIL_BUFFER_BIT)),Fe&&i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,Ae.__webglColorRenderbuffer[Ge]),Xe===!0&&(i.invalidateFramebuffer(i.READ_FRAMEBUFFER,[ke]),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[ke])),Fe){const be=n.get(T[Ge]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,be,0)}i.blitFramebuffer(0,0,K,de,0,0,K,de,fe,i.NEAREST),c&&i.invalidateFramebuffer(i.READ_FRAMEBUFFER,pe)}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),Fe)for(let Ge=0;Ge<T.length;Ge++){t.bindFramebuffer(i.FRAMEBUFFER,Ae.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Ge,i.RENDERBUFFER,Ae.__webglColorRenderbuffer[Ge]);const Xe=n.get(T[Ge]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,Ae.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Ge,i.TEXTURE_2D,Xe,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Ae.__webglMultisampledFramebuffer)}}function ve(B){return Math.min(r.maxSamples,B.samples)}function _e(B){const T=n.get(B);return o&&B.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&T.__useRenderToTexture!==!1}function He(B){const T=a.render.frame;u.get(B)!==T&&(u.set(B,T),B.update())}function Ie(B,T){const K=B.colorSpace,de=B.format,fe=B.type;return B.isCompressedTexture===!0||B.isVideoTexture===!0||B.format===Iu||K!==Xi&&K!==Xn&&(At.getTransfer(K)===Dt?o===!1?e.has("EXT_sRGB")===!0&&de===ai?(B.format=Iu,B.minFilter=Gn,B.generateMipmaps=!1):T=Wp.sRGBToLinear(T):(de!==ai||fe!==mr)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",K)),T}this.allocateTextureUnit=F,this.resetTextureUnits=G,this.setTexture2D=q,this.setTexture2DArray=ee,this.setTexture3D=Z,this.setTextureCube=Q,this.rebindTextures=ie,this.setupRenderTarget=O,this.updateRenderTargetMipmap=le,this.updateMultisampleRenderTarget=ce,this.setupDepthRenderbuffer=V,this.setupFrameBufferTexture=he,this.useMultisampledRTT=_e}function VM(i,e,t){const n=t.isWebGL2;function r(s,a=Xn){let o;const l=At.getTransfer(a);if(s===mr)return i.UNSIGNED_BYTE;if(s===Ip)return i.UNSIGNED_SHORT_4_4_4_4;if(s===kp)return i.UNSIGNED_SHORT_5_5_5_1;if(s===S1)return i.BYTE;if(s===M1)return i.SHORT;if(s===fh)return i.UNSIGNED_SHORT;if(s===Bp)return i.INT;if(s===ar)return i.UNSIGNED_INT;if(s===or)return i.FLOAT;if(s===Xa)return n?i.HALF_FLOAT:(o=e.get("OES_texture_half_float"),o!==null?o.HALF_FLOAT_OES:null);if(s===w1)return i.ALPHA;if(s===ai)return i.RGBA;if(s===A1)return i.LUMINANCE;if(s===T1)return i.LUMINANCE_ALPHA;if(s===Xr)return i.DEPTH_COMPONENT;if(s===ia)return i.DEPTH_STENCIL;if(s===Iu)return o=e.get("EXT_sRGB"),o!==null?o.SRGB_ALPHA_EXT:null;if(s===C1)return i.RED;if(s===Up)return i.RED_INTEGER;if(s===R1)return i.RG;if(s===Np)return i.RG_INTEGER;if(s===Op)return i.RGBA_INTEGER;if(s===wc||s===Ac||s===Tc||s===Cc)if(l===Dt)if(o=e.get("WEBGL_compressed_texture_s3tc_srgb"),o!==null){if(s===wc)return o.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(s===Ac)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(s===Tc)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(s===Cc)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(o=e.get("WEBGL_compressed_texture_s3tc"),o!==null){if(s===wc)return o.COMPRESSED_RGB_S3TC_DXT1_EXT;if(s===Ac)return o.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(s===Tc)return o.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(s===Cc)return o.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(s===q0||s===$0||s===Y0||s===j0)if(o=e.get("WEBGL_compressed_texture_pvrtc"),o!==null){if(s===q0)return o.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(s===$0)return o.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(s===Y0)return o.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(s===j0)return o.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(s===zp)return o=e.get("WEBGL_compressed_texture_etc1"),o!==null?o.COMPRESSED_RGB_ETC1_WEBGL:null;if(s===K0||s===Z0)if(o=e.get("WEBGL_compressed_texture_etc"),o!==null){if(s===K0)return l===Dt?o.COMPRESSED_SRGB8_ETC2:o.COMPRESSED_RGB8_ETC2;if(s===Z0)return l===Dt?o.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:o.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(s===Q0||s===J0||s===ef||s===tf||s===nf||s===rf||s===sf||s===af||s===of||s===lf||s===cf||s===uf||s===hf||s===ff)if(o=e.get("WEBGL_compressed_texture_astc"),o!==null){if(s===Q0)return l===Dt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:o.COMPRESSED_RGBA_ASTC_4x4_KHR;if(s===J0)return l===Dt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:o.COMPRESSED_RGBA_ASTC_5x4_KHR;if(s===ef)return l===Dt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:o.COMPRESSED_RGBA_ASTC_5x5_KHR;if(s===tf)return l===Dt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:o.COMPRESSED_RGBA_ASTC_6x5_KHR;if(s===nf)return l===Dt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:o.COMPRESSED_RGBA_ASTC_6x6_KHR;if(s===rf)return l===Dt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:o.COMPRESSED_RGBA_ASTC_8x5_KHR;if(s===sf)return l===Dt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:o.COMPRESSED_RGBA_ASTC_8x6_KHR;if(s===af)return l===Dt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:o.COMPRESSED_RGBA_ASTC_8x8_KHR;if(s===of)return l===Dt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:o.COMPRESSED_RGBA_ASTC_10x5_KHR;if(s===lf)return l===Dt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:o.COMPRESSED_RGBA_ASTC_10x6_KHR;if(s===cf)return l===Dt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:o.COMPRESSED_RGBA_ASTC_10x8_KHR;if(s===uf)return l===Dt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:o.COMPRESSED_RGBA_ASTC_10x10_KHR;if(s===hf)return l===Dt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:o.COMPRESSED_RGBA_ASTC_12x10_KHR;if(s===ff)return l===Dt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:o.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(s===Rc||s===df||s===pf)if(o=e.get("EXT_texture_compression_bptc"),o!==null){if(s===Rc)return l===Dt?o.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:o.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(s===df)return o.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(s===pf)return o.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(s===D1||s===mf||s===xf||s===gf)if(o=e.get("EXT_texture_compression_rgtc"),o!==null){if(s===Rc)return o.COMPRESSED_RED_RGTC1_EXT;if(s===mf)return o.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(s===xf)return o.COMPRESSED_RED_GREEN_RGTC2_EXT;if(s===gf)return o.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return s===Wr?n?i.UNSIGNED_INT_24_8:(o=e.get("WEBGL_depth_texture"),o!==null?o.UNSIGNED_INT_24_8_WEBGL:null):i[s]!==void 0?i[s]:null}return{convert:r}}class WM extends Wn{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class Bs extends Xt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const XM={type:"move"};class Jc{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Bs,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Bs,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new X,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new X),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Bs,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new X,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new X),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let r=null,s=null,a=null;const o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){a=!0;for(const v of e.hand.values()){const d=t.getJointPose(v,n),p=this._getHandJoint(c,v);d!==null&&(p.matrix.fromArray(d.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=d.radius),p.visible=d!==null}const u=c.joints["index-finger-tip"],f=c.joints["thumb-tip"],h=u.position.distanceTo(f.position),m=.02,x=.005;c.inputState.pinching&&h>m+x?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&h<=m-x&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,n),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(r=t.getPose(e.targetRaySpace,n),r===null&&s!==null&&(r=s),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(XM)))}return o!==null&&(o.visible=r!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new Bs;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}class qM extends rs{constructor(e,t){super();const n=this;let r=null,s=1,a=null,o="local-floor",l=1,c=null,u=null,f=null,h=null,m=null,x=null;const v=t.getContextAttributes();let d=null,p=null;const _=[],g=[],b=new Ve;let w=null;const S=new Wn;S.layers.enable(1),S.viewport=new Jt;const M=new Wn;M.layers.enable(2),M.viewport=new Jt;const I=[S,M],E=new WM;E.layers.enable(1),E.layers.enable(2);let y=null,P=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(A){let R=_[A];return R===void 0&&(R=new Jc,_[A]=R),R.getTargetRaySpace()},this.getControllerGrip=function(A){let R=_[A];return R===void 0&&(R=new Jc,_[A]=R),R.getGripSpace()},this.getHand=function(A){let R=_[A];return R===void 0&&(R=new Jc,_[A]=R),R.getHandSpace()};function U(A){const R=g.indexOf(A.inputSource);if(R===-1)return;const N=_[R];N!==void 0&&(N.update(A.inputSource,A.frame,c||a),N.dispatchEvent({type:A.type,data:A.inputSource}))}function G(){r.removeEventListener("select",U),r.removeEventListener("selectstart",U),r.removeEventListener("selectend",U),r.removeEventListener("squeeze",U),r.removeEventListener("squeezestart",U),r.removeEventListener("squeezeend",U),r.removeEventListener("end",G),r.removeEventListener("inputsourceschange",F);for(let A=0;A<_.length;A++){const R=g[A];R!==null&&(g[A]=null,_[A].disconnect(R))}y=null,P=null,e.setRenderTarget(d),m=null,h=null,f=null,r=null,p=null,C.stop(),n.isPresenting=!1,e.setPixelRatio(w),e.setSize(b.width,b.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(A){s=A,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(A){o=A,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(A){c=A},this.getBaseLayer=function(){return h!==null?h:m},this.getBinding=function(){return f},this.getFrame=function(){return x},this.getSession=function(){return r},this.setSession=async function(A){if(r=A,r!==null){if(d=e.getRenderTarget(),r.addEventListener("select",U),r.addEventListener("selectstart",U),r.addEventListener("selectend",U),r.addEventListener("squeeze",U),r.addEventListener("squeezestart",U),r.addEventListener("squeezeend",U),r.addEventListener("end",G),r.addEventListener("inputsourceschange",F),v.xrCompatible!==!0&&await t.makeXRCompatible(),w=e.getPixelRatio(),e.getSize(b),r.renderState.layers===void 0||e.capabilities.isWebGL2===!1){const R={antialias:r.renderState.layers===void 0?v.antialias:!0,alpha:!0,depth:v.depth,stencil:v.stencil,framebufferScaleFactor:s};m=new XRWebGLLayer(r,t,R),r.updateRenderState({baseLayer:m}),e.setPixelRatio(1),e.setSize(m.framebufferWidth,m.framebufferHeight,!1),p=new Zr(m.framebufferWidth,m.framebufferHeight,{format:ai,type:mr,colorSpace:e.outputColorSpace,stencilBuffer:v.stencil})}else{let R=null,N=null,$=null;v.depth&&($=v.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,R=v.stencil?ia:Xr,N=v.stencil?Wr:ar);const he={colorFormat:t.RGBA8,depthFormat:$,scaleFactor:s};f=new XRWebGLBinding(r,t),h=f.createProjectionLayer(he),r.updateRenderState({layers:[h]}),e.setPixelRatio(1),e.setSize(h.textureWidth,h.textureHeight,!1),p=new Zr(h.textureWidth,h.textureHeight,{format:ai,type:mr,depthTexture:new tm(h.textureWidth,h.textureHeight,N,void 0,void 0,void 0,void 0,void 0,void 0,R),stencilBuffer:v.stencil,colorSpace:e.outputColorSpace,samples:v.antialias?4:0});const J=e.properties.get(p);J.__ignoreDepthValues=h.ignoreDepthValues}p.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await r.requestReferenceSpace(o),C.setContext(r),C.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode};function F(A){for(let R=0;R<A.removed.length;R++){const N=A.removed[R],$=g.indexOf(N);$>=0&&(g[$]=null,_[$].disconnect(N))}for(let R=0;R<A.added.length;R++){const N=A.added[R];let $=g.indexOf(N);if($===-1){for(let J=0;J<_.length;J++)if(J>=g.length){g.push(N),$=J;break}else if(g[J]===null){g[J]=N,$=J;break}if($===-1)break}const he=_[$];he&&he.connect(N)}}const z=new X,q=new X;function ee(A,R,N){z.setFromMatrixPosition(R.matrixWorld),q.setFromMatrixPosition(N.matrixWorld);const $=z.distanceTo(q),he=R.projectionMatrix.elements,J=N.projectionMatrix.elements,se=he[14]/(he[10]-1),V=he[14]/(he[10]+1),ie=(he[9]+1)/he[5],O=(he[9]-1)/he[5],le=(he[8]-1)/he[0],ce=(J[8]+1)/J[0],ve=se*le,_e=se*ce,He=$/(-le+ce),Ie=He*-le;R.matrixWorld.decompose(A.position,A.quaternion,A.scale),A.translateX(Ie),A.translateZ(He),A.matrixWorld.compose(A.position,A.quaternion,A.scale),A.matrixWorldInverse.copy(A.matrixWorld).invert();const B=se+He,T=V+He,K=ve-Ie,de=_e+($-Ie),fe=ie*V/T*B,pe=O*V/T*B;A.projectionMatrix.makePerspective(K,de,fe,pe,B,T),A.projectionMatrixInverse.copy(A.projectionMatrix).invert()}function Z(A,R){R===null?A.matrixWorld.copy(A.matrix):A.matrixWorld.multiplyMatrices(R.matrixWorld,A.matrix),A.matrixWorldInverse.copy(A.matrixWorld).invert()}this.updateCamera=function(A){if(r===null)return;E.near=M.near=S.near=A.near,E.far=M.far=S.far=A.far,(y!==E.near||P!==E.far)&&(r.updateRenderState({depthNear:E.near,depthFar:E.far}),y=E.near,P=E.far);const R=A.parent,N=E.cameras;Z(E,R);for(let $=0;$<N.length;$++)Z(N[$],R);N.length===2?ee(E,S,M):E.projectionMatrix.copy(S.projectionMatrix),Q(A,E,R)};function Q(A,R,N){N===null?A.matrix.copy(R.matrixWorld):(A.matrix.copy(N.matrixWorld),A.matrix.invert(),A.matrix.multiply(R.matrixWorld)),A.matrix.decompose(A.position,A.quaternion,A.scale),A.updateMatrixWorld(!0),A.projectionMatrix.copy(R.projectionMatrix),A.projectionMatrixInverse.copy(R.projectionMatrixInverse),A.isPerspectiveCamera&&(A.fov=ku*2*Math.atan(1/A.projectionMatrix.elements[5]),A.zoom=1)}this.getCamera=function(){return E},this.getFoveation=function(){if(!(h===null&&m===null))return l},this.setFoveation=function(A){l=A,h!==null&&(h.fixedFoveation=A),m!==null&&m.fixedFoveation!==void 0&&(m.fixedFoveation=A)};let j=null;function W(A,R){if(u=R.getViewerPose(c||a),x=R,u!==null){const N=u.views;m!==null&&(e.setRenderTargetFramebuffer(p,m.framebuffer),e.setRenderTarget(p));let $=!1;N.length!==E.cameras.length&&(E.cameras.length=0,$=!0);for(let he=0;he<N.length;he++){const J=N[he];let se=null;if(m!==null)se=m.getViewport(J);else{const ie=f.getViewSubImage(h,J);se=ie.viewport,he===0&&(e.setRenderTargetTextures(p,ie.colorTexture,h.ignoreDepthValues?void 0:ie.depthStencilTexture),e.setRenderTarget(p))}let V=I[he];V===void 0&&(V=new Wn,V.layers.enable(he),V.viewport=new Jt,I[he]=V),V.matrix.fromArray(J.transform.matrix),V.matrix.decompose(V.position,V.quaternion,V.scale),V.projectionMatrix.fromArray(J.projectionMatrix),V.projectionMatrixInverse.copy(V.projectionMatrix).invert(),V.viewport.set(se.x,se.y,se.width,se.height),he===0&&(E.matrix.copy(V.matrix),E.matrix.decompose(E.position,E.quaternion,E.scale)),$===!0&&E.cameras.push(V)}}for(let N=0;N<_.length;N++){const $=g[N],he=_[N];$!==null&&he!==void 0&&he.update($,R,c||a)}j&&j(A,R),R.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:R}),x=null}const C=new Jp;C.setAnimationLoop(W),this.setAnimationLoop=function(A){j=A},this.dispose=function(){}}}function $M(i,e){function t(d,p){d.matrixAutoUpdate===!0&&d.updateMatrix(),p.value.copy(d.matrix)}function n(d,p){p.color.getRGB(d.fogColor.value,Kp(i)),p.isFog?(d.fogNear.value=p.near,d.fogFar.value=p.far):p.isFogExp2&&(d.fogDensity.value=p.density)}function r(d,p,_,g,b){p.isMeshBasicMaterial||p.isMeshLambertMaterial?s(d,p):p.isMeshToonMaterial?(s(d,p),f(d,p)):p.isMeshPhongMaterial?(s(d,p),u(d,p)):p.isMeshStandardMaterial?(s(d,p),h(d,p),p.isMeshPhysicalMaterial&&m(d,p,b)):p.isMeshMatcapMaterial?(s(d,p),x(d,p)):p.isMeshDepthMaterial?s(d,p):p.isMeshDistanceMaterial?(s(d,p),v(d,p)):p.isMeshNormalMaterial?s(d,p):p.isLineBasicMaterial?(a(d,p),p.isLineDashedMaterial&&o(d,p)):p.isPointsMaterial?l(d,p,_,g):p.isSpriteMaterial?c(d,p):p.isShadowMaterial?(d.color.value.copy(p.color),d.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function s(d,p){d.opacity.value=p.opacity,p.color&&d.diffuse.value.copy(p.color),p.emissive&&d.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(d.map.value=p.map,t(p.map,d.mapTransform)),p.alphaMap&&(d.alphaMap.value=p.alphaMap,t(p.alphaMap,d.alphaMapTransform)),p.bumpMap&&(d.bumpMap.value=p.bumpMap,t(p.bumpMap,d.bumpMapTransform),d.bumpScale.value=p.bumpScale,p.side===Mn&&(d.bumpScale.value*=-1)),p.normalMap&&(d.normalMap.value=p.normalMap,t(p.normalMap,d.normalMapTransform),d.normalScale.value.copy(p.normalScale),p.side===Mn&&d.normalScale.value.negate()),p.displacementMap&&(d.displacementMap.value=p.displacementMap,t(p.displacementMap,d.displacementMapTransform),d.displacementScale.value=p.displacementScale,d.displacementBias.value=p.displacementBias),p.emissiveMap&&(d.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,d.emissiveMapTransform)),p.specularMap&&(d.specularMap.value=p.specularMap,t(p.specularMap,d.specularMapTransform)),p.alphaTest>0&&(d.alphaTest.value=p.alphaTest);const _=e.get(p).envMap;if(_&&(d.envMap.value=_,d.flipEnvMap.value=_.isCubeTexture&&_.isRenderTargetTexture===!1?-1:1,d.reflectivity.value=p.reflectivity,d.ior.value=p.ior,d.refractionRatio.value=p.refractionRatio),p.lightMap){d.lightMap.value=p.lightMap;const g=i._useLegacyLights===!0?Math.PI:1;d.lightMapIntensity.value=p.lightMapIntensity*g,t(p.lightMap,d.lightMapTransform)}p.aoMap&&(d.aoMap.value=p.aoMap,d.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,d.aoMapTransform))}function a(d,p){d.diffuse.value.copy(p.color),d.opacity.value=p.opacity,p.map&&(d.map.value=p.map,t(p.map,d.mapTransform))}function o(d,p){d.dashSize.value=p.dashSize,d.totalSize.value=p.dashSize+p.gapSize,d.scale.value=p.scale}function l(d,p,_,g){d.diffuse.value.copy(p.color),d.opacity.value=p.opacity,d.size.value=p.size*_,d.scale.value=g*.5,p.map&&(d.map.value=p.map,t(p.map,d.uvTransform)),p.alphaMap&&(d.alphaMap.value=p.alphaMap,t(p.alphaMap,d.alphaMapTransform)),p.alphaTest>0&&(d.alphaTest.value=p.alphaTest)}function c(d,p){d.diffuse.value.copy(p.color),d.opacity.value=p.opacity,d.rotation.value=p.rotation,p.map&&(d.map.value=p.map,t(p.map,d.mapTransform)),p.alphaMap&&(d.alphaMap.value=p.alphaMap,t(p.alphaMap,d.alphaMapTransform)),p.alphaTest>0&&(d.alphaTest.value=p.alphaTest)}function u(d,p){d.specular.value.copy(p.specular),d.shininess.value=Math.max(p.shininess,1e-4)}function f(d,p){p.gradientMap&&(d.gradientMap.value=p.gradientMap)}function h(d,p){d.metalness.value=p.metalness,p.metalnessMap&&(d.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,d.metalnessMapTransform)),d.roughness.value=p.roughness,p.roughnessMap&&(d.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,d.roughnessMapTransform)),e.get(p).envMap&&(d.envMapIntensity.value=p.envMapIntensity)}function m(d,p,_){d.ior.value=p.ior,p.sheen>0&&(d.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),d.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(d.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,d.sheenColorMapTransform)),p.sheenRoughnessMap&&(d.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,d.sheenRoughnessMapTransform))),p.clearcoat>0&&(d.clearcoat.value=p.clearcoat,d.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(d.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,d.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(d.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,d.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(d.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,d.clearcoatNormalMapTransform),d.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===Mn&&d.clearcoatNormalScale.value.negate())),p.iridescence>0&&(d.iridescence.value=p.iridescence,d.iridescenceIOR.value=p.iridescenceIOR,d.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],d.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(d.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,d.iridescenceMapTransform)),p.iridescenceThicknessMap&&(d.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,d.iridescenceThicknessMapTransform))),p.transmission>0&&(d.transmission.value=p.transmission,d.transmissionSamplerMap.value=_.texture,d.transmissionSamplerSize.value.set(_.width,_.height),p.transmissionMap&&(d.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,d.transmissionMapTransform)),d.thickness.value=p.thickness,p.thicknessMap&&(d.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,d.thicknessMapTransform)),d.attenuationDistance.value=p.attenuationDistance,d.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(d.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(d.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,d.anisotropyMapTransform))),d.specularIntensity.value=p.specularIntensity,d.specularColor.value.copy(p.specularColor),p.specularColorMap&&(d.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,d.specularColorMapTransform)),p.specularIntensityMap&&(d.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,d.specularIntensityMapTransform))}function x(d,p){p.matcap&&(d.matcap.value=p.matcap)}function v(d,p){const _=e.get(p).light;d.referencePosition.value.setFromMatrixPosition(_.matrixWorld),d.nearDistance.value=_.shadow.camera.near,d.farDistance.value=_.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:r}}function YM(i,e,t,n){let r={},s={},a=[];const o=t.isWebGL2?i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS):0;function l(_,g){const b=g.program;n.uniformBlockBinding(_,b)}function c(_,g){let b=r[_.id];b===void 0&&(x(_),b=u(_),r[_.id]=b,_.addEventListener("dispose",d));const w=g.program;n.updateUBOMapping(_,w);const S=e.render.frame;s[_.id]!==S&&(h(_),s[_.id]=S)}function u(_){const g=f();_.__bindingPointIndex=g;const b=i.createBuffer(),w=_.__size,S=_.usage;return i.bindBuffer(i.UNIFORM_BUFFER,b),i.bufferData(i.UNIFORM_BUFFER,w,S),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,g,b),b}function f(){for(let _=0;_<o;_++)if(a.indexOf(_)===-1)return a.push(_),_;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function h(_){const g=r[_.id],b=_.uniforms,w=_.__cache;i.bindBuffer(i.UNIFORM_BUFFER,g);for(let S=0,M=b.length;S<M;S++){const I=Array.isArray(b[S])?b[S]:[b[S]];for(let E=0,y=I.length;E<y;E++){const P=I[E];if(m(P,S,E,w)===!0){const U=P.__offset,G=Array.isArray(P.value)?P.value:[P.value];let F=0;for(let z=0;z<G.length;z++){const q=G[z],ee=v(q);typeof q=="number"||typeof q=="boolean"?(P.__data[0]=q,i.bufferSubData(i.UNIFORM_BUFFER,U+F,P.__data)):q.isMatrix3?(P.__data[0]=q.elements[0],P.__data[1]=q.elements[1],P.__data[2]=q.elements[2],P.__data[3]=0,P.__data[4]=q.elements[3],P.__data[5]=q.elements[4],P.__data[6]=q.elements[5],P.__data[7]=0,P.__data[8]=q.elements[6],P.__data[9]=q.elements[7],P.__data[10]=q.elements[8],P.__data[11]=0):(q.toArray(P.__data,F),F+=ee.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,U,P.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function m(_,g,b,w){const S=_.value,M=g+"_"+b;if(w[M]===void 0)return typeof S=="number"||typeof S=="boolean"?w[M]=S:w[M]=S.clone(),!0;{const I=w[M];if(typeof S=="number"||typeof S=="boolean"){if(I!==S)return w[M]=S,!0}else if(I.equals(S)===!1)return I.copy(S),!0}return!1}function x(_){const g=_.uniforms;let b=0;const w=16;for(let M=0,I=g.length;M<I;M++){const E=Array.isArray(g[M])?g[M]:[g[M]];for(let y=0,P=E.length;y<P;y++){const U=E[y],G=Array.isArray(U.value)?U.value:[U.value];for(let F=0,z=G.length;F<z;F++){const q=G[F],ee=v(q),Z=b%w;Z!==0&&w-Z<ee.boundary&&(b+=w-Z),U.__data=new Float32Array(ee.storage/Float32Array.BYTES_PER_ELEMENT),U.__offset=b,b+=ee.storage}}}const S=b%w;return S>0&&(b+=w-S),_.__size=b,_.__cache={},this}function v(_){const g={boundary:0,storage:0};return typeof _=="number"||typeof _=="boolean"?(g.boundary=4,g.storage=4):_.isVector2?(g.boundary=8,g.storage=8):_.isVector3||_.isColor?(g.boundary=16,g.storage=12):_.isVector4?(g.boundary=16,g.storage=16):_.isMatrix3?(g.boundary=48,g.storage=48):_.isMatrix4?(g.boundary=64,g.storage=64):_.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",_),g}function d(_){const g=_.target;g.removeEventListener("dispose",d);const b=a.indexOf(g.__bindingPointIndex);a.splice(b,1),i.deleteBuffer(r[g.id]),delete r[g.id],delete s[g.id]}function p(){for(const _ in r)i.deleteBuffer(r[_]);a=[],r={},s={}}return{bind:l,update:c,dispose:p}}class om{constructor(e={}){const{canvas:t=W1(),context:n=null,depth:r=!0,stencil:s=!0,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:f=!1}=e;this.isWebGLRenderer=!0;let h;n!==null?h=n.getContextAttributes().alpha:h=a;const m=new Uint32Array(4),x=new Int32Array(4);let v=null,d=null;const p=[],_=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=on,this._useLegacyLights=!1,this.toneMapping=pr,this.toneMappingExposure=1;const g=this;let b=!1,w=0,S=0,M=null,I=-1,E=null;const y=new Jt,P=new Jt;let U=null;const G=new gt(0);let F=0,z=t.width,q=t.height,ee=1,Z=null,Q=null;const j=new Jt(0,0,z,q),W=new Jt(0,0,z,q);let C=!1;const A=new xh;let R=!1,N=!1,$=null;const he=new Nt,J=new Ve,se=new X,V={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function ie(){return M===null?ee:1}let O=n;function le(D,Y){for(let re=0;re<D.length;re++){const te=D[re],ne=t.getContext(te,Y);if(ne!==null)return ne}return null}try{const D={alpha:!0,depth:r,stencil:s,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:f};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${hh}`),t.addEventListener("webglcontextlost",ge,!1),t.addEventListener("webglcontextrestored",H,!1),t.addEventListener("webglcontextcreationerror",Ee,!1),O===null){const Y=["webgl2","webgl","experimental-webgl"];if(g.isWebGL1Renderer===!0&&Y.shift(),O=le(Y,D),O===null)throw le(Y)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}typeof WebGLRenderingContext<"u"&&O instanceof WebGLRenderingContext&&console.warn("THREE.WebGLRenderer: WebGL 1 support was deprecated in r153 and will be removed in r163."),O.getShaderPrecisionFormat===void 0&&(O.getShaderPrecisionFormat=function(){return{rangeMin:1,rangeMax:1,precision:1}})}catch(D){throw console.error("THREE.WebGLRenderer: "+D.message),D}let ce,ve,_e,He,Ie,B,T,K,de,fe,pe,ke,Ae,Fe,Ge,Xe,be,it,qe,We,ze,me,k,ye;function Be(){ce=new rS(O),ve=new QE(O,ce,e),ce.init(ve),me=new VM(O,ce,ve),_e=new HM(O,ce,ve),He=new oS(O),Ie=new TM,B=new GM(O,ce,_e,Ie,ve,me,He),T=new eS(g),K=new iS(g),de=new mb(O,ve),k=new KE(O,ce,de,ve),fe=new sS(O,de,He,k),pe=new hS(O,fe,de,He),qe=new uS(O,ve,B),Xe=new JE(Ie),ke=new AM(g,T,K,ce,ve,k,Xe),Ae=new $M(g,Ie),Fe=new RM,Ge=new IM(ce,ve),it=new jE(g,T,K,_e,pe,h,l),be=new zM(g,pe,ve),ye=new YM(O,He,ve,_e),We=new ZE(O,ce,He,ve),ze=new aS(O,ce,He,ve),He.programs=ke.programs,g.capabilities=ve,g.extensions=ce,g.properties=Ie,g.renderLists=Fe,g.shadowMap=be,g.state=_e,g.info=He}Be();const Pe=new qM(g,O);this.xr=Pe,this.getContext=function(){return O},this.getContextAttributes=function(){return O.getContextAttributes()},this.forceContextLoss=function(){const D=ce.get("WEBGL_lose_context");D&&D.loseContext()},this.forceContextRestore=function(){const D=ce.get("WEBGL_lose_context");D&&D.restoreContext()},this.getPixelRatio=function(){return ee},this.setPixelRatio=function(D){D!==void 0&&(ee=D,this.setSize(z,q,!1))},this.getSize=function(D){return D.set(z,q)},this.setSize=function(D,Y,re=!0){if(Pe.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}z=D,q=Y,t.width=Math.floor(D*ee),t.height=Math.floor(Y*ee),re===!0&&(t.style.width=D+"px",t.style.height=Y+"px"),this.setViewport(0,0,D,Y)},this.getDrawingBufferSize=function(D){return D.set(z*ee,q*ee).floor()},this.setDrawingBufferSize=function(D,Y,re){z=D,q=Y,ee=re,t.width=Math.floor(D*re),t.height=Math.floor(Y*re),this.setViewport(0,0,D,Y)},this.getCurrentViewport=function(D){return D.copy(y)},this.getViewport=function(D){return D.copy(j)},this.setViewport=function(D,Y,re,te){D.isVector4?j.set(D.x,D.y,D.z,D.w):j.set(D,Y,re,te),_e.viewport(y.copy(j).multiplyScalar(ee).floor())},this.getScissor=function(D){return D.copy(W)},this.setScissor=function(D,Y,re,te){D.isVector4?W.set(D.x,D.y,D.z,D.w):W.set(D,Y,re,te),_e.scissor(P.copy(W).multiplyScalar(ee).floor())},this.getScissorTest=function(){return C},this.setScissorTest=function(D){_e.setScissorTest(C=D)},this.setOpaqueSort=function(D){Z=D},this.setTransparentSort=function(D){Q=D},this.getClearColor=function(D){return D.copy(it.getClearColor())},this.setClearColor=function(){it.setClearColor.apply(it,arguments)},this.getClearAlpha=function(){return it.getClearAlpha()},this.setClearAlpha=function(){it.setClearAlpha.apply(it,arguments)},this.clear=function(D=!0,Y=!0,re=!0){let te=0;if(D){let ne=!1;if(M!==null){const Ce=M.texture.format;ne=Ce===Op||Ce===Np||Ce===Up}if(ne){const Ce=M.texture.type,Me=Ce===mr||Ce===ar||Ce===fh||Ce===Wr||Ce===Ip||Ce===kp,Oe=it.getClearColor(),Ze=it.getClearAlpha(),at=Oe.r,nt=Oe.g,rt=Oe.b;Me?(m[0]=at,m[1]=nt,m[2]=rt,m[3]=Ze,O.clearBufferuiv(O.COLOR,0,m)):(x[0]=at,x[1]=nt,x[2]=rt,x[3]=Ze,O.clearBufferiv(O.COLOR,0,x))}else te|=O.COLOR_BUFFER_BIT}Y&&(te|=O.DEPTH_BUFFER_BIT),re&&(te|=O.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),O.clear(te)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",ge,!1),t.removeEventListener("webglcontextrestored",H,!1),t.removeEventListener("webglcontextcreationerror",Ee,!1),Fe.dispose(),Ge.dispose(),Ie.dispose(),T.dispose(),K.dispose(),pe.dispose(),k.dispose(),ye.dispose(),ke.dispose(),Pe.dispose(),Pe.removeEventListener("sessionstart",vt),Pe.removeEventListener("sessionend",Qe),$&&($.dispose(),$=null),yt.stop()};function ge(D){D.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),b=!0}function H(){console.log("THREE.WebGLRenderer: Context Restored."),b=!1;const D=He.autoReset,Y=be.enabled,re=be.autoUpdate,te=be.needsUpdate,ne=be.type;Be(),He.autoReset=D,be.enabled=Y,be.autoUpdate=re,be.needsUpdate=te,be.type=ne}function Ee(D){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",D.statusMessage)}function we(D){const Y=D.target;Y.removeEventListener("dispose",we),Ue(Y)}function Ue(D){Ne(D),Ie.remove(D)}function Ne(D){const Y=Ie.get(D).programs;Y!==void 0&&(Y.forEach(function(re){ke.releaseProgram(re)}),D.isShaderMaterial&&ke.releaseShaderCache(D))}this.renderBufferDirect=function(D,Y,re,te,ne,Ce){Y===null&&(Y=V);const Me=ne.isMesh&&ne.matrixWorld.determinant()<0,Oe=Re(D,Y,re,te,ne);_e.setMaterial(te,Me);let Ze=re.index,at=1;if(te.wireframe===!0){if(Ze=fe.getWireframeAttribute(re),Ze===void 0)return;at=2}const nt=re.drawRange,rt=re.attributes.position;let zt=nt.start*at,Cn=(nt.start+nt.count)*at;Ce!==null&&(zt=Math.max(zt,Ce.start*at),Cn=Math.min(Cn,(Ce.start+Ce.count)*at)),Ze!==null?(zt=Math.max(zt,0),Cn=Math.min(Cn,Ze.count)):rt!=null&&(zt=Math.max(zt,0),Cn=Math.min(Cn,rt.count));const Zt=Cn-zt;if(Zt<0||Zt===1/0)return;k.setup(ne,te,Oe,re,Ze);let Ai,Ft=We;if(Ze!==null&&(Ai=de.get(Ze),Ft=ze,Ft.setIndex(Ai)),ne.isMesh)te.wireframe===!0?(_e.setLineWidth(te.wireframeLinewidth*ie()),Ft.setMode(O.LINES)):Ft.setMode(O.TRIANGLES);else if(ne.isLine){let lt=te.linewidth;lt===void 0&&(lt=1),_e.setLineWidth(lt*ie()),ne.isLineSegments?Ft.setMode(O.LINES):ne.isLineLoop?Ft.setMode(O.LINE_LOOP):Ft.setMode(O.LINE_STRIP)}else ne.isPoints?Ft.setMode(O.POINTS):ne.isSprite&&Ft.setMode(O.TRIANGLES);if(ne.isBatchedMesh)Ft.renderMultiDraw(ne._multiDrawStarts,ne._multiDrawCounts,ne._multiDrawCount);else if(ne.isInstancedMesh)Ft.renderInstances(zt,Zt,ne.count);else if(re.isInstancedBufferGeometry){const lt=re._maxInstanceCount!==void 0?re._maxInstanceCount:1/0,pc=Math.min(re.instanceCount,lt);Ft.renderInstances(zt,Zt,pc)}else Ft.render(zt,Zt)};function $e(D,Y,re){D.transparent===!0&&D.side===ki&&D.forceSinglePass===!1?(D.side=Mn,D.needsUpdate=!0,Kn(D,Y,re),D.side=vr,D.needsUpdate=!0,Kn(D,Y,re),D.side=ki):Kn(D,Y,re)}this.compile=function(D,Y,re=null){re===null&&(re=D),d=Ge.get(re),d.init(),_.push(d),re.traverseVisible(function(ne){ne.isLight&&ne.layers.test(Y.layers)&&(d.pushLight(ne),ne.castShadow&&d.pushShadow(ne))}),D!==re&&D.traverseVisible(function(ne){ne.isLight&&ne.layers.test(Y.layers)&&(d.pushLight(ne),ne.castShadow&&d.pushShadow(ne))}),d.setupLights(g._useLegacyLights);const te=new Set;return D.traverse(function(ne){const Ce=ne.material;if(Ce)if(Array.isArray(Ce))for(let Me=0;Me<Ce.length;Me++){const Oe=Ce[Me];$e(Oe,re,ne),te.add(Oe)}else $e(Ce,re,ne),te.add(Ce)}),_.pop(),d=null,te},this.compileAsync=function(D,Y,re=null){const te=this.compile(D,Y,re);return new Promise(ne=>{function Ce(){if(te.forEach(function(Me){Ie.get(Me).currentProgram.isReady()&&te.delete(Me)}),te.size===0){ne(D);return}setTimeout(Ce,10)}ce.get("KHR_parallel_shader_compile")!==null?Ce():setTimeout(Ce,10)})};let Ye=null;function mt(D){Ye&&Ye(D)}function vt(){yt.stop()}function Qe(){yt.start()}const yt=new Jp;yt.setAnimationLoop(mt),typeof self<"u"&&yt.setContext(self),this.setAnimationLoop=function(D){Ye=D,Pe.setAnimationLoop(D),D===null?yt.stop():yt.start()},Pe.addEventListener("sessionstart",vt),Pe.addEventListener("sessionend",Qe),this.render=function(D,Y){if(Y!==void 0&&Y.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(b===!0)return;D.matrixWorldAutoUpdate===!0&&D.updateMatrixWorld(),Y.parent===null&&Y.matrixWorldAutoUpdate===!0&&Y.updateMatrixWorld(),Pe.enabled===!0&&Pe.isPresenting===!0&&(Pe.cameraAutoUpdate===!0&&Pe.updateCamera(Y),Y=Pe.getCamera()),D.isScene===!0&&D.onBeforeRender(g,D,Y,M),d=Ge.get(D,_.length),d.init(),_.push(d),he.multiplyMatrices(Y.projectionMatrix,Y.matrixWorldInverse),A.setFromProjectionMatrix(he),N=this.localClippingEnabled,R=Xe.init(this.clippingPlanes,N),v=Fe.get(D,p.length),v.init(),p.push(v),xt(D,Y,0,g.sortObjects),v.finish(),g.sortObjects===!0&&v.sort(Z,Q),this.info.render.frame++,R===!0&&Xe.beginShadows();const re=d.state.shadowsArray;if(be.render(re,D,Y),R===!0&&Xe.endShadows(),this.info.autoReset===!0&&this.info.reset(),it.render(v,D),d.setupLights(g._useLegacyLights),Y.isArrayCamera){const te=Y.cameras;for(let ne=0,Ce=te.length;ne<Ce;ne++){const Me=te[ne];Gt(v,D,Me,Me.viewport)}}else Gt(v,D,Y);M!==null&&(B.updateMultisampleRenderTarget(M),B.updateRenderTargetMipmap(M)),D.isScene===!0&&D.onAfterRender(g,D,Y),k.resetDefaultState(),I=-1,E=null,_.pop(),_.length>0?d=_[_.length-1]:d=null,p.pop(),p.length>0?v=p[p.length-1]:v=null};function xt(D,Y,re,te){if(D.visible===!1)return;if(D.layers.test(Y.layers)){if(D.isGroup)re=D.renderOrder;else if(D.isLOD)D.autoUpdate===!0&&D.update(Y);else if(D.isLight)d.pushLight(D),D.castShadow&&d.pushShadow(D);else if(D.isSprite){if(!D.frustumCulled||A.intersectsSprite(D)){te&&se.setFromMatrixPosition(D.matrixWorld).applyMatrix4(he);const Me=pe.update(D),Oe=D.material;Oe.visible&&v.push(D,Me,Oe,re,se.z,null)}}else if((D.isMesh||D.isLine||D.isPoints)&&(!D.frustumCulled||A.intersectsObject(D))){const Me=pe.update(D),Oe=D.material;if(te&&(D.boundingSphere!==void 0?(D.boundingSphere===null&&D.computeBoundingSphere(),se.copy(D.boundingSphere.center)):(Me.boundingSphere===null&&Me.computeBoundingSphere(),se.copy(Me.boundingSphere.center)),se.applyMatrix4(D.matrixWorld).applyMatrix4(he)),Array.isArray(Oe)){const Ze=Me.groups;for(let at=0,nt=Ze.length;at<nt;at++){const rt=Ze[at],zt=Oe[rt.materialIndex];zt&&zt.visible&&v.push(D,Me,zt,re,se.z,rt)}}else Oe.visible&&v.push(D,Me,Oe,re,se.z,null)}}const Ce=D.children;for(let Me=0,Oe=Ce.length;Me<Oe;Me++)xt(Ce[Me],Y,re,te)}function Gt(D,Y,re,te){const ne=D.opaque,Ce=D.transmissive,Me=D.transparent;d.setupLightsView(re),R===!0&&Xe.setGlobalState(g.clippingPlanes,re),Ce.length>0&&In(ne,Ce,Y,re),te&&_e.viewport(y.copy(te)),ne.length>0&&Tn(ne,Y,re),Ce.length>0&&Tn(Ce,Y,re),Me.length>0&&Tn(Me,Y,re),_e.buffers.depth.setTest(!0),_e.buffers.depth.setMask(!0),_e.buffers.color.setMask(!0),_e.setPolygonOffset(!1)}function In(D,Y,re,te){if((re.isScene===!0?re.overrideMaterial:null)!==null)return;const Ce=ve.isWebGL2;$===null&&($=new Zr(1,1,{generateMipmaps:!0,type:ce.has("EXT_color_buffer_half_float")?Xa:mr,minFilter:Wa,samples:Ce?4:0})),g.getDrawingBufferSize(J),Ce?$.setSize(J.x,J.y):$.setSize(Uu(J.x),Uu(J.y));const Me=g.getRenderTarget();g.setRenderTarget($),g.getClearColor(G),F=g.getClearAlpha(),F<1&&g.setClearColor(16777215,.5),g.clear();const Oe=g.toneMapping;g.toneMapping=pr,Tn(D,re,te),B.updateMultisampleRenderTarget($),B.updateRenderTargetMipmap($);let Ze=!1;for(let at=0,nt=Y.length;at<nt;at++){const rt=Y[at],zt=rt.object,Cn=rt.geometry,Zt=rt.material,Ai=rt.group;if(Zt.side===ki&&zt.layers.test(te.layers)){const Ft=Zt.side;Zt.side=Mn,Zt.needsUpdate=!0,wi(zt,re,te,Cn,Zt,Ai),Zt.side=Ft,Zt.needsUpdate=!0,Ze=!0}}Ze===!0&&(B.updateMultisampleRenderTarget($),B.updateRenderTargetMipmap($)),g.setRenderTarget(Me),g.setClearColor(G,F),g.toneMapping=Oe}function Tn(D,Y,re){const te=Y.isScene===!0?Y.overrideMaterial:null;for(let ne=0,Ce=D.length;ne<Ce;ne++){const Me=D[ne],Oe=Me.object,Ze=Me.geometry,at=te===null?Me.material:te,nt=Me.group;Oe.layers.test(re.layers)&&wi(Oe,Y,re,Ze,at,nt)}}function wi(D,Y,re,te,ne,Ce){D.onBeforeRender(g,Y,re,te,ne,Ce),D.modelViewMatrix.multiplyMatrices(re.matrixWorldInverse,D.matrixWorld),D.normalMatrix.getNormalMatrix(D.modelViewMatrix),ne.onBeforeRender(g,Y,re,te,D,Ce),ne.transparent===!0&&ne.side===ki&&ne.forceSinglePass===!1?(ne.side=Mn,ne.needsUpdate=!0,g.renderBufferDirect(re,Y,te,ne,D,Ce),ne.side=vr,ne.needsUpdate=!0,g.renderBufferDirect(re,Y,te,ne,D,Ce),ne.side=ki):g.renderBufferDirect(re,Y,te,ne,D,Ce),D.onAfterRender(g,Y,re,te,ne,Ce)}function Kn(D,Y,re){Y.isScene!==!0&&(Y=V);const te=Ie.get(D),ne=d.state.lights,Ce=d.state.shadowsArray,Me=ne.state.version,Oe=ke.getParameters(D,ne.state,Ce,Y,re),Ze=ke.getProgramCacheKey(Oe);let at=te.programs;te.environment=D.isMeshStandardMaterial?Y.environment:null,te.fog=Y.fog,te.envMap=(D.isMeshStandardMaterial?K:T).get(D.envMap||te.environment),at===void 0&&(D.addEventListener("dispose",we),at=new Map,te.programs=at);let nt=at.get(Ze);if(nt!==void 0){if(te.currentProgram===nt&&te.lightsStateVersion===Me)return _t(D,Oe),nt}else Oe.uniforms=ke.getUniforms(D),D.onBuild(re,Oe,g),D.onBeforeCompile(Oe,g),nt=ke.acquireProgram(Oe,Ze),at.set(Ze,nt),te.uniforms=Oe.uniforms;const rt=te.uniforms;return(!D.isShaderMaterial&&!D.isRawShaderMaterial||D.clipping===!0)&&(rt.clippingPlanes=Xe.uniform),_t(D,Oe),te.needsLights=Ot(D),te.lightsStateVersion=Me,te.needsLights&&(rt.ambientLightColor.value=ne.state.ambient,rt.lightProbe.value=ne.state.probe,rt.directionalLights.value=ne.state.directional,rt.directionalLightShadows.value=ne.state.directionalShadow,rt.spotLights.value=ne.state.spot,rt.spotLightShadows.value=ne.state.spotShadow,rt.rectAreaLights.value=ne.state.rectArea,rt.ltc_1.value=ne.state.rectAreaLTC1,rt.ltc_2.value=ne.state.rectAreaLTC2,rt.pointLights.value=ne.state.point,rt.pointLightShadows.value=ne.state.pointShadow,rt.hemisphereLights.value=ne.state.hemi,rt.directionalShadowMap.value=ne.state.directionalShadowMap,rt.directionalShadowMatrix.value=ne.state.directionalShadowMatrix,rt.spotShadowMap.value=ne.state.spotShadowMap,rt.spotLightMatrix.value=ne.state.spotLightMatrix,rt.spotLightMap.value=ne.state.spotLightMap,rt.pointShadowMap.value=ne.state.pointShadowMap,rt.pointShadowMatrix.value=ne.state.pointShadowMatrix),te.currentProgram=nt,te.uniformsList=null,nt}function tt(D){if(D.uniformsList===null){const Y=D.currentProgram.getUniforms();D.uniformsList=Ll.seqWithValue(Y.seq,D.uniforms)}return D.uniformsList}function _t(D,Y){const re=Ie.get(D);re.outputColorSpace=Y.outputColorSpace,re.batching=Y.batching,re.instancing=Y.instancing,re.instancingColor=Y.instancingColor,re.skinning=Y.skinning,re.morphTargets=Y.morphTargets,re.morphNormals=Y.morphNormals,re.morphColors=Y.morphColors,re.morphTargetsCount=Y.morphTargetsCount,re.numClippingPlanes=Y.numClippingPlanes,re.numIntersection=Y.numClipIntersection,re.vertexAlphas=Y.vertexAlphas,re.vertexTangents=Y.vertexTangents,re.toneMapping=Y.toneMapping}function Re(D,Y,re,te,ne){Y.isScene!==!0&&(Y=V),B.resetTextureUnits();const Ce=Y.fog,Me=te.isMeshStandardMaterial?Y.environment:null,Oe=M===null?g.outputColorSpace:M.isXRRenderTarget===!0?M.texture.colorSpace:Xi,Ze=(te.isMeshStandardMaterial?K:T).get(te.envMap||Me),at=te.vertexColors===!0&&!!re.attributes.color&&re.attributes.color.itemSize===4,nt=!!re.attributes.tangent&&(!!te.normalMap||te.anisotropy>0),rt=!!re.morphAttributes.position,zt=!!re.morphAttributes.normal,Cn=!!re.morphAttributes.color;let Zt=pr;te.toneMapped&&(M===null||M.isXRRenderTarget===!0)&&(Zt=g.toneMapping);const Ai=re.morphAttributes.position||re.morphAttributes.normal||re.morphAttributes.color,Ft=Ai!==void 0?Ai.length:0,lt=Ie.get(te),pc=d.state.lights;if(R===!0&&(N===!0||D!==E)){const kn=D===E&&te.id===I;Xe.setState(te,D,kn)}let It=!1;te.version===lt.__version?(lt.needsLights&&lt.lightsStateVersion!==pc.state.version||lt.outputColorSpace!==Oe||ne.isBatchedMesh&&lt.batching===!1||!ne.isBatchedMesh&&lt.batching===!0||ne.isInstancedMesh&&lt.instancing===!1||!ne.isInstancedMesh&&lt.instancing===!0||ne.isSkinnedMesh&&lt.skinning===!1||!ne.isSkinnedMesh&&lt.skinning===!0||ne.isInstancedMesh&&lt.instancingColor===!0&&ne.instanceColor===null||ne.isInstancedMesh&&lt.instancingColor===!1&&ne.instanceColor!==null||lt.envMap!==Ze||te.fog===!0&&lt.fog!==Ce||lt.numClippingPlanes!==void 0&&(lt.numClippingPlanes!==Xe.numPlanes||lt.numIntersection!==Xe.numIntersection)||lt.vertexAlphas!==at||lt.vertexTangents!==nt||lt.morphTargets!==rt||lt.morphNormals!==zt||lt.morphColors!==Cn||lt.toneMapping!==Zt||ve.isWebGL2===!0&&lt.morphTargetsCount!==Ft)&&(It=!0):(It=!0,lt.__version=te.version);let Er=lt.currentProgram;It===!0&&(Er=Kn(te,Y,ne));let Rh=!1,ua=!1,mc=!1;const hn=Er.getUniforms(),Sr=lt.uniforms;if(_e.useProgram(Er.program)&&(Rh=!0,ua=!0,mc=!0),te.id!==I&&(I=te.id,ua=!0),Rh||E!==D){hn.setValue(O,"projectionMatrix",D.projectionMatrix),hn.setValue(O,"viewMatrix",D.matrixWorldInverse);const kn=hn.map.cameraPosition;kn!==void 0&&kn.setValue(O,se.setFromMatrixPosition(D.matrixWorld)),ve.logarithmicDepthBuffer&&hn.setValue(O,"logDepthBufFC",2/(Math.log(D.far+1)/Math.LN2)),(te.isMeshPhongMaterial||te.isMeshToonMaterial||te.isMeshLambertMaterial||te.isMeshBasicMaterial||te.isMeshStandardMaterial||te.isShaderMaterial)&&hn.setValue(O,"isOrthographic",D.isOrthographicCamera===!0),E!==D&&(E=D,ua=!0,mc=!0)}if(ne.isSkinnedMesh){hn.setOptional(O,ne,"bindMatrix"),hn.setOptional(O,ne,"bindMatrixInverse");const kn=ne.skeleton;kn&&(ve.floatVertexTextures?(kn.boneTexture===null&&kn.computeBoneTexture(),hn.setValue(O,"boneTexture",kn.boneTexture,B)):console.warn("THREE.WebGLRenderer: SkinnedMesh can only be used with WebGL 2. With WebGL 1 OES_texture_float and vertex textures support is required."))}ne.isBatchedMesh&&(hn.setOptional(O,ne,"batchingTexture"),hn.setValue(O,"batchingTexture",ne._matricesTexture,B));const xc=re.morphAttributes;if((xc.position!==void 0||xc.normal!==void 0||xc.color!==void 0&&ve.isWebGL2===!0)&&qe.update(ne,re,Er),(ua||lt.receiveShadow!==ne.receiveShadow)&&(lt.receiveShadow=ne.receiveShadow,hn.setValue(O,"receiveShadow",ne.receiveShadow)),te.isMeshGouraudMaterial&&te.envMap!==null&&(Sr.envMap.value=Ze,Sr.flipEnvMap.value=Ze.isCubeTexture&&Ze.isRenderTargetTexture===!1?-1:1),ua&&(hn.setValue(O,"toneMappingExposure",g.toneMappingExposure),lt.needsLights&&Rt(Sr,mc),Ce&&te.fog===!0&&Ae.refreshFogUniforms(Sr,Ce),Ae.refreshMaterialUniforms(Sr,te,ee,q,$),Ll.upload(O,tt(lt),Sr,B)),te.isShaderMaterial&&te.uniformsNeedUpdate===!0&&(Ll.upload(O,tt(lt),Sr,B),te.uniformsNeedUpdate=!1),te.isSpriteMaterial&&hn.setValue(O,"center",ne.center),hn.setValue(O,"modelViewMatrix",ne.modelViewMatrix),hn.setValue(O,"normalMatrix",ne.normalMatrix),hn.setValue(O,"modelMatrix",ne.matrixWorld),te.isShaderMaterial||te.isRawShaderMaterial){const kn=te.uniformsGroups;for(let gc=0,Em=kn.length;gc<Em;gc++)if(ve.isWebGL2){const Dh=kn[gc];ye.update(Dh,Er),ye.bind(Dh,Er)}else console.warn("THREE.WebGLRenderer: Uniform Buffer Objects can only be used with WebGL 2.")}return Er}function Rt(D,Y){D.ambientLightColor.needsUpdate=Y,D.lightProbe.needsUpdate=Y,D.directionalLights.needsUpdate=Y,D.directionalLightShadows.needsUpdate=Y,D.pointLights.needsUpdate=Y,D.pointLightShadows.needsUpdate=Y,D.spotLights.needsUpdate=Y,D.spotLightShadows.needsUpdate=Y,D.rectAreaLights.needsUpdate=Y,D.hemisphereLights.needsUpdate=Y}function Ot(D){return D.isMeshLambertMaterial||D.isMeshToonMaterial||D.isMeshPhongMaterial||D.isMeshStandardMaterial||D.isShadowMaterial||D.isShaderMaterial&&D.lights===!0}this.getActiveCubeFace=function(){return w},this.getActiveMipmapLevel=function(){return S},this.getRenderTarget=function(){return M},this.setRenderTargetTextures=function(D,Y,re){Ie.get(D.texture).__webglTexture=Y,Ie.get(D.depthTexture).__webglTexture=re;const te=Ie.get(D);te.__hasExternalTextures=!0,te.__hasExternalTextures&&(te.__autoAllocateDepthBuffer=re===void 0,te.__autoAllocateDepthBuffer||ce.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),te.__useRenderToTexture=!1))},this.setRenderTargetFramebuffer=function(D,Y){const re=Ie.get(D);re.__webglFramebuffer=Y,re.__useDefaultFramebuffer=Y===void 0},this.setRenderTarget=function(D,Y=0,re=0){M=D,w=Y,S=re;let te=!0,ne=null,Ce=!1,Me=!1;if(D){const Ze=Ie.get(D);Ze.__useDefaultFramebuffer!==void 0?(_e.bindFramebuffer(O.FRAMEBUFFER,null),te=!1):Ze.__webglFramebuffer===void 0?B.setupRenderTarget(D):Ze.__hasExternalTextures&&B.rebindTextures(D,Ie.get(D.texture).__webglTexture,Ie.get(D.depthTexture).__webglTexture);const at=D.texture;(at.isData3DTexture||at.isDataArrayTexture||at.isCompressedArrayTexture)&&(Me=!0);const nt=Ie.get(D).__webglFramebuffer;D.isWebGLCubeRenderTarget?(Array.isArray(nt[Y])?ne=nt[Y][re]:ne=nt[Y],Ce=!0):ve.isWebGL2&&D.samples>0&&B.useMultisampledRTT(D)===!1?ne=Ie.get(D).__webglMultisampledFramebuffer:Array.isArray(nt)?ne=nt[re]:ne=nt,y.copy(D.viewport),P.copy(D.scissor),U=D.scissorTest}else y.copy(j).multiplyScalar(ee).floor(),P.copy(W).multiplyScalar(ee).floor(),U=C;if(_e.bindFramebuffer(O.FRAMEBUFFER,ne)&&ve.drawBuffers&&te&&_e.drawBuffers(D,ne),_e.viewport(y),_e.scissor(P),_e.setScissorTest(U),Ce){const Ze=Ie.get(D.texture);O.framebufferTexture2D(O.FRAMEBUFFER,O.COLOR_ATTACHMENT0,O.TEXTURE_CUBE_MAP_POSITIVE_X+Y,Ze.__webglTexture,re)}else if(Me){const Ze=Ie.get(D.texture),at=Y||0;O.framebufferTextureLayer(O.FRAMEBUFFER,O.COLOR_ATTACHMENT0,Ze.__webglTexture,re||0,at)}I=-1},this.readRenderTargetPixels=function(D,Y,re,te,ne,Ce,Me){if(!(D&&D.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Oe=Ie.get(D).__webglFramebuffer;if(D.isWebGLCubeRenderTarget&&Me!==void 0&&(Oe=Oe[Me]),Oe){_e.bindFramebuffer(O.FRAMEBUFFER,Oe);try{const Ze=D.texture,at=Ze.format,nt=Ze.type;if(at!==ai&&me.convert(at)!==O.getParameter(O.IMPLEMENTATION_COLOR_READ_FORMAT)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}const rt=nt===Xa&&(ce.has("EXT_color_buffer_half_float")||ve.isWebGL2&&ce.has("EXT_color_buffer_float"));if(nt!==mr&&me.convert(nt)!==O.getParameter(O.IMPLEMENTATION_COLOR_READ_TYPE)&&!(nt===or&&(ve.isWebGL2||ce.has("OES_texture_float")||ce.has("WEBGL_color_buffer_float")))&&!rt){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}Y>=0&&Y<=D.width-te&&re>=0&&re<=D.height-ne&&O.readPixels(Y,re,te,ne,me.convert(at),me.convert(nt),Ce)}finally{const Ze=M!==null?Ie.get(M).__webglFramebuffer:null;_e.bindFramebuffer(O.FRAMEBUFFER,Ze)}}},this.copyFramebufferToTexture=function(D,Y,re=0){const te=Math.pow(2,-re),ne=Math.floor(Y.image.width*te),Ce=Math.floor(Y.image.height*te);B.setTexture2D(Y,0),O.copyTexSubImage2D(O.TEXTURE_2D,re,0,0,D.x,D.y,ne,Ce),_e.unbindTexture()},this.copyTextureToTexture=function(D,Y,re,te=0){const ne=Y.image.width,Ce=Y.image.height,Me=me.convert(re.format),Oe=me.convert(re.type);B.setTexture2D(re,0),O.pixelStorei(O.UNPACK_FLIP_Y_WEBGL,re.flipY),O.pixelStorei(O.UNPACK_PREMULTIPLY_ALPHA_WEBGL,re.premultiplyAlpha),O.pixelStorei(O.UNPACK_ALIGNMENT,re.unpackAlignment),Y.isDataTexture?O.texSubImage2D(O.TEXTURE_2D,te,D.x,D.y,ne,Ce,Me,Oe,Y.image.data):Y.isCompressedTexture?O.compressedTexSubImage2D(O.TEXTURE_2D,te,D.x,D.y,Y.mipmaps[0].width,Y.mipmaps[0].height,Me,Y.mipmaps[0].data):O.texSubImage2D(O.TEXTURE_2D,te,D.x,D.y,Me,Oe,Y.image),te===0&&re.generateMipmaps&&O.generateMipmap(O.TEXTURE_2D),_e.unbindTexture()},this.copyTextureToTexture3D=function(D,Y,re,te,ne=0){if(g.isWebGL1Renderer){console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");return}const Ce=D.max.x-D.min.x+1,Me=D.max.y-D.min.y+1,Oe=D.max.z-D.min.z+1,Ze=me.convert(te.format),at=me.convert(te.type);let nt;if(te.isData3DTexture)B.setTexture3D(te,0),nt=O.TEXTURE_3D;else if(te.isDataArrayTexture||te.isCompressedArrayTexture)B.setTexture2DArray(te,0),nt=O.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}O.pixelStorei(O.UNPACK_FLIP_Y_WEBGL,te.flipY),O.pixelStorei(O.UNPACK_PREMULTIPLY_ALPHA_WEBGL,te.premultiplyAlpha),O.pixelStorei(O.UNPACK_ALIGNMENT,te.unpackAlignment);const rt=O.getParameter(O.UNPACK_ROW_LENGTH),zt=O.getParameter(O.UNPACK_IMAGE_HEIGHT),Cn=O.getParameter(O.UNPACK_SKIP_PIXELS),Zt=O.getParameter(O.UNPACK_SKIP_ROWS),Ai=O.getParameter(O.UNPACK_SKIP_IMAGES),Ft=re.isCompressedTexture?re.mipmaps[ne]:re.image;O.pixelStorei(O.UNPACK_ROW_LENGTH,Ft.width),O.pixelStorei(O.UNPACK_IMAGE_HEIGHT,Ft.height),O.pixelStorei(O.UNPACK_SKIP_PIXELS,D.min.x),O.pixelStorei(O.UNPACK_SKIP_ROWS,D.min.y),O.pixelStorei(O.UNPACK_SKIP_IMAGES,D.min.z),re.isDataTexture||re.isData3DTexture?O.texSubImage3D(nt,ne,Y.x,Y.y,Y.z,Ce,Me,Oe,Ze,at,Ft.data):re.isCompressedArrayTexture?(console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: untested support for compressed srcTexture."),O.compressedTexSubImage3D(nt,ne,Y.x,Y.y,Y.z,Ce,Me,Oe,Ze,Ft.data)):O.texSubImage3D(nt,ne,Y.x,Y.y,Y.z,Ce,Me,Oe,Ze,at,Ft),O.pixelStorei(O.UNPACK_ROW_LENGTH,rt),O.pixelStorei(O.UNPACK_IMAGE_HEIGHT,zt),O.pixelStorei(O.UNPACK_SKIP_PIXELS,Cn),O.pixelStorei(O.UNPACK_SKIP_ROWS,Zt),O.pixelStorei(O.UNPACK_SKIP_IMAGES,Ai),ne===0&&te.generateMipmaps&&O.generateMipmap(nt),_e.unbindTexture()},this.initTexture=function(D){D.isCubeTexture?B.setTextureCube(D,0):D.isData3DTexture?B.setTexture3D(D,0):D.isDataArrayTexture||D.isCompressedArrayTexture?B.setTexture2DArray(D,0):B.setTexture2D(D,0),_e.unbindTexture()},this.resetState=function(){w=0,S=0,M=null,_e.reset(),k.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Oi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=e===dh?"display-p3":"srgb",t.unpackColorSpace=At.workingColorSpace===uc?"display-p3":"srgb"}get outputEncoding(){return console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace===on?qr:Hp}set outputEncoding(e){console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace=e===qr?on:Xi}get useLegacyLights(){return console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights}set useLegacyLights(e){console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights=e}}class jM extends om{}jM.prototype.isWebGL1Renderer=!0;class KM extends Xt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t}}class ZM{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=Bu,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.version=0,this.uuid=xr()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return console.warn("THREE.InterleavedBuffer: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let r=0,s=this.stride;r<s;r++)this.array[e+r]=t.array[n+r];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=xr()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=xr()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const mn=new X;class Zl{constructor(e,t,n,r=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=r}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)mn.fromBufferAttribute(this,t),mn.applyMatrix4(e),this.setXYZ(t,mn.x,mn.y,mn.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)mn.fromBufferAttribute(this,t),mn.applyNormalMatrix(e),this.setXYZ(t,mn.x,mn.y,mn.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)mn.fromBufferAttribute(this,t),mn.transformDirection(e),this.setXYZ(t,mn.x,mn.y,mn.z);return this}setX(e,t){return this.normalized&&(t=Ct(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=Ct(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=Ct(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=Ct(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=Ui(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=Ui(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=Ui(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=Ui(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=Ct(t,this.array),n=Ct(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=Ct(t,this.array),n=Ct(n,this.array),r=Ct(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=r,this}setXYZW(e,t,n,r,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=Ct(t,this.array),n=Ct(n,this.array),r=Ct(r,this.array),s=Ct(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=r,this.data.array[e+3]=s,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const r=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[r+s])}return new Yn(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new Zl(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const r=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[r+s])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class Ql extends ss{constructor(e){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new gt(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}let As;const ga=new X,Ts=new X,Cs=new X,Rs=new Ve,va=new Ve,lm=new Nt,Io=new X,_a=new X,ko=new X,sd=new Ve,eu=new Ve,ad=new Ve;class Ou extends Xt{constructor(e=new Ql){if(super(),this.isSprite=!0,this.type="Sprite",As===void 0){As=new pn;const t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new ZM(t,5);As.setIndex([0,1,2,0,2,3]),As.setAttribute("position",new Zl(n,3,0,!1)),As.setAttribute("uv",new Zl(n,2,3,!1))}this.geometry=As,this.material=e,this.center=new Ve(.5,.5)}raycast(e,t){e.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),Ts.setFromMatrixScale(this.matrixWorld),lm.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),Cs.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&Ts.multiplyScalar(-Cs.z);const n=this.material.rotation;let r,s;n!==0&&(s=Math.cos(n),r=Math.sin(n));const a=this.center;Uo(Io.set(-.5,-.5,0),Cs,a,Ts,r,s),Uo(_a.set(.5,-.5,0),Cs,a,Ts,r,s),Uo(ko.set(.5,.5,0),Cs,a,Ts,r,s),sd.set(0,0),eu.set(1,0),ad.set(1,1);let o=e.ray.intersectTriangle(Io,_a,ko,!1,ga);if(o===null&&(Uo(_a.set(-.5,.5,0),Cs,a,Ts,r,s),eu.set(0,1),o=e.ray.intersectTriangle(Io,ko,_a,!1,ga),o===null))return;const l=e.ray.origin.distanceTo(ga);l<e.near||l>e.far||t.push({distance:l,point:ga.clone(),uv:Vn.getInterpolation(ga,Io,_a,ko,sd,eu,ad,new Ve),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}}function Uo(i,e,t,n,r,s){Rs.subVectors(i,t).addScalar(.5).multiply(n),r!==void 0?(va.x=s*Rs.x-r*Rs.y,va.y=r*Rs.x+s*Rs.y):va.copy(Rs),i.copy(e),i.x+=va.x,i.y+=va.y,i.applyMatrix4(lm)}class sa extends ss{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new gt(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const od=new X,ld=new X,cd=new Nt,tu=new no,No=new to;class qa extends Xt{constructor(e=new pn,t=new sa){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[0];for(let r=1,s=t.count;r<s;r++)od.fromBufferAttribute(t,r-1),ld.fromBufferAttribute(t,r),n[r]=n[r-1],n[r]+=od.distanceTo(ld);e.setAttribute("lineDistance",new bn(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const n=this.geometry,r=this.matrixWorld,s=e.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),No.copy(n.boundingSphere),No.applyMatrix4(r),No.radius+=s,e.ray.intersectsSphere(No)===!1)return;cd.copy(r).invert(),tu.copy(e.ray).applyMatrix4(cd);const o=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=new X,u=new X,f=new X,h=new X,m=this.isLineSegments?2:1,x=n.index,d=n.attributes.position;if(x!==null){const p=Math.max(0,a.start),_=Math.min(x.count,a.start+a.count);for(let g=p,b=_-1;g<b;g+=m){const w=x.getX(g),S=x.getX(g+1);if(c.fromBufferAttribute(d,w),u.fromBufferAttribute(d,S),tu.distanceSqToSegment(c,u,h,f)>l)continue;h.applyMatrix4(this.matrixWorld);const I=e.ray.origin.distanceTo(h);I<e.near||I>e.far||t.push({distance:I,point:f.clone().applyMatrix4(this.matrixWorld),index:g,face:null,faceIndex:null,object:this})}}else{const p=Math.max(0,a.start),_=Math.min(d.count,a.start+a.count);for(let g=p,b=_-1;g<b;g+=m){if(c.fromBufferAttribute(d,g),u.fromBufferAttribute(d,g+1),tu.distanceSqToSegment(c,u,h,f)>l)continue;h.applyMatrix4(this.matrixWorld);const S=e.ray.origin.distanceTo(h);S<e.near||S>e.far||t.push({distance:S,point:f.clone().applyMatrix4(this.matrixWorld),index:g,face:null,faceIndex:null,object:this})}}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const r=t[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}}class cm extends ss{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new gt(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const ud=new Nt,zu=new no,Oo=new to,zo=new X;class QM extends Xt{constructor(e=new pn,t=new cm){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const n=this.geometry,r=this.matrixWorld,s=e.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Oo.copy(n.boundingSphere),Oo.applyMatrix4(r),Oo.radius+=s,e.ray.intersectsSphere(Oo)===!1)return;ud.copy(r).invert(),zu.copy(e.ray).applyMatrix4(ud);const o=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=n.index,f=n.attributes.position;if(c!==null){const h=Math.max(0,a.start),m=Math.min(c.count,a.start+a.count);for(let x=h,v=m;x<v;x++){const d=c.getX(x);zo.fromBufferAttribute(f,d),hd(zo,d,l,r,e,t,this)}}else{const h=Math.max(0,a.start),m=Math.min(f.count,a.start+a.count);for(let x=h,v=m;x<v;x++)zo.fromBufferAttribute(f,x),hd(zo,x,l,r,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const r=t[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}}function hd(i,e,t,n,r,s,a){const o=zu.distanceSqToPoint(i);if(o<t){const l=new X;zu.closestPointToPoint(i,l),l.applyMatrix4(n);const c=r.ray.origin.distanceTo(l);if(c<r.near||c>r.far)return;s.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:e,face:null,object:a})}}class Hu extends wn{constructor(e,t,n,r,s,a,o,l,c){super(e,t,n,r,s,a,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class _h extends pn{constructor(e=[],t=[],n=1,r=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:n,detail:r};const s=[],a=[];o(r),c(n),u(),this.setAttribute("position",new bn(s,3)),this.setAttribute("normal",new bn(s.slice(),3)),this.setAttribute("uv",new bn(a,2)),r===0?this.computeVertexNormals():this.normalizeNormals();function o(_){const g=new X,b=new X,w=new X;for(let S=0;S<t.length;S+=3)m(t[S+0],g),m(t[S+1],b),m(t[S+2],w),l(g,b,w,_)}function l(_,g,b,w){const S=w+1,M=[];for(let I=0;I<=S;I++){M[I]=[];const E=_.clone().lerp(b,I/S),y=g.clone().lerp(b,I/S),P=S-I;for(let U=0;U<=P;U++)U===0&&I===S?M[I][U]=E:M[I][U]=E.clone().lerp(y,U/P)}for(let I=0;I<S;I++)for(let E=0;E<2*(S-I)-1;E++){const y=Math.floor(E/2);E%2===0?(h(M[I][y+1]),h(M[I+1][y]),h(M[I][y])):(h(M[I][y+1]),h(M[I+1][y+1]),h(M[I+1][y]))}}function c(_){const g=new X;for(let b=0;b<s.length;b+=3)g.x=s[b+0],g.y=s[b+1],g.z=s[b+2],g.normalize().multiplyScalar(_),s[b+0]=g.x,s[b+1]=g.y,s[b+2]=g.z}function u(){const _=new X;for(let g=0;g<s.length;g+=3){_.x=s[g+0],_.y=s[g+1],_.z=s[g+2];const b=d(_)/2/Math.PI+.5,w=p(_)/Math.PI+.5;a.push(b,1-w)}x(),f()}function f(){for(let _=0;_<a.length;_+=6){const g=a[_+0],b=a[_+2],w=a[_+4],S=Math.max(g,b,w),M=Math.min(g,b,w);S>.9&&M<.1&&(g<.2&&(a[_+0]+=1),b<.2&&(a[_+2]+=1),w<.2&&(a[_+4]+=1))}}function h(_){s.push(_.x,_.y,_.z)}function m(_,g){const b=_*3;g.x=e[b+0],g.y=e[b+1],g.z=e[b+2]}function x(){const _=new X,g=new X,b=new X,w=new X,S=new Ve,M=new Ve,I=new Ve;for(let E=0,y=0;E<s.length;E+=9,y+=6){_.set(s[E+0],s[E+1],s[E+2]),g.set(s[E+3],s[E+4],s[E+5]),b.set(s[E+6],s[E+7],s[E+8]),S.set(a[y+0],a[y+1]),M.set(a[y+2],a[y+3]),I.set(a[y+4],a[y+5]),w.copy(_).add(g).add(b).divideScalar(3);const P=d(w);v(S,y+0,_,P),v(M,y+2,g,P),v(I,y+4,b,P)}}function v(_,g,b,w){w<0&&_.x===1&&(a[g]=_.x-1),b.x===0&&b.z===0&&(a[g]=w/2/Math.PI+.5)}function d(_){return Math.atan2(_.z,-_.x)}function p(_){return Math.atan2(-_.y,Math.sqrt(_.x*_.x+_.z*_.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new _h(e.vertices,e.indices,e.radius,e.details)}}class bh extends _h{constructor(e=1,t=0){const n=(1+Math.sqrt(5))/2,r=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],s=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(r,s,e,t),this.type="IcosahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new bh(e.radius,e.detail)}}class um extends Xt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new gt(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),t}}const nu=new Nt,fd=new X,dd=new X;class JM{constructor(e){this.camera=e,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Ve(512,512),this.map=null,this.mapPass=null,this.matrix=new Nt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new xh,this._frameExtents=new Ve(1,1),this._viewportCount=1,this._viewports=[new Jt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,n=this.matrix;fd.setFromMatrixPosition(e.matrixWorld),t.position.copy(fd),dd.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(dd),t.updateMatrixWorld(),nu.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(nu),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(nu)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class e2 extends JM{constructor(){super(new em(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class t2 extends um{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Xt.DEFAULT_UP),this.updateMatrix(),this.target=new Xt,this.shadow=new e2}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class n2 extends um{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}class i2{constructor(e,t,n=0,r=1/0){this.ray=new no(e,t),this.near=n,this.far=r,this.camera=null,this.layers=new ph,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):console.error("THREE.Raycaster: Unsupported camera type: "+t.type)}intersectObject(e,t=!0,n=[]){return Gu(e,this,n,t),n.sort(pd),n}intersectObjects(e,t=!0,n=[]){for(let r=0,s=e.length;r<s;r++)Gu(e[r],this,n,t);return n.sort(pd),n}}function pd(i,e){return i.distance-e.distance}function Gu(i,e,t,n){if(i.layers.test(e.layers)&&i.raycast(e,t),n===!0){const r=i.children;for(let s=0,a=r.length;s<a;s++)Gu(r[s],e,t,!0)}}class md{constructor(e=1,t=0,n=0){return this.radius=e,this.phi=t,this.theta=n,this}set(e,t,n){return this.radius=e,this.phi=t,this.theta=n,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=Math.max(1e-6,Math.min(Math.PI-1e-6,this.phi)),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,n){return this.radius=Math.sqrt(e*e+t*t+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,n),this.phi=Math.acos(vn(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:hh}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=hh);const xd={type:"change"},iu={type:"start"},gd={type:"end"},Ho=new no,vd=new er,r2=Math.cos(70*V1.DEG2RAD);class s2 extends rs{constructor(e,t){super(),this.object=e,this.domElement=t,this.domElement.style.touchAction="none",this.enabled=!0,this.target=new X,this.cursor=new X,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:ls.ROTATE,MIDDLE:ls.DOLLY,RIGHT:ls.PAN},this.touches={ONE:cs.ROTATE,TWO:cs.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this.getPolarAngle=function(){return o.phi},this.getAzimuthalAngle=function(){return o.theta},this.getDistance=function(){return this.object.position.distanceTo(this.target)},this.listenToKeyEvents=function(k){k.addEventListener("keydown",Ge),this._domElementKeyEvents=k},this.stopListenToKeyEvents=function(){this._domElementKeyEvents.removeEventListener("keydown",Ge),this._domElementKeyEvents=null},this.saveState=function(){n.target0.copy(n.target),n.position0.copy(n.object.position),n.zoom0=n.object.zoom},this.reset=function(){n.target.copy(n.target0),n.object.position.copy(n.position0),n.object.zoom=n.zoom0,n.object.updateProjectionMatrix(),n.dispatchEvent(xd),n.update(),s=r.NONE},this.update=(function(){const k=new X,ye=new Ei().setFromUnitVectors(e.up,new X(0,1,0)),Be=ye.clone().invert(),Pe=new X,ge=new Ei,H=new X,Ee=2*Math.PI;return function(Ue=null){const Ne=n.object.position;k.copy(Ne).sub(n.target),k.applyQuaternion(ye),o.setFromVector3(k),n.autoRotate&&s===r.NONE&&U(y(Ue)),n.enableDamping?(o.theta+=l.theta*n.dampingFactor,o.phi+=l.phi*n.dampingFactor):(o.theta+=l.theta,o.phi+=l.phi);let $e=n.minAzimuthAngle,Ye=n.maxAzimuthAngle;isFinite($e)&&isFinite(Ye)&&($e<-Math.PI?$e+=Ee:$e>Math.PI&&($e-=Ee),Ye<-Math.PI?Ye+=Ee:Ye>Math.PI&&(Ye-=Ee),$e<=Ye?o.theta=Math.max($e,Math.min(Ye,o.theta)):o.theta=o.theta>($e+Ye)/2?Math.max($e,o.theta):Math.min(Ye,o.theta)),o.phi=Math.max(n.minPolarAngle,Math.min(n.maxPolarAngle,o.phi)),o.makeSafe(),n.enableDamping===!0?n.target.addScaledVector(u,n.dampingFactor):n.target.add(u),n.target.sub(n.cursor),n.target.clampLength(n.minTargetRadius,n.maxTargetRadius),n.target.add(n.cursor),n.zoomToCursor&&S||n.object.isOrthographicCamera?o.radius=j(o.radius):o.radius=j(o.radius*c),k.setFromSpherical(o),k.applyQuaternion(Be),Ne.copy(n.target).add(k),n.object.lookAt(n.target),n.enableDamping===!0?(l.theta*=1-n.dampingFactor,l.phi*=1-n.dampingFactor,u.multiplyScalar(1-n.dampingFactor)):(l.set(0,0,0),u.set(0,0,0));let mt=!1;if(n.zoomToCursor&&S){let vt=null;if(n.object.isPerspectiveCamera){const Qe=k.length();vt=j(Qe*c);const yt=Qe-vt;n.object.position.addScaledVector(b,yt),n.object.updateMatrixWorld()}else if(n.object.isOrthographicCamera){const Qe=new X(w.x,w.y,0);Qe.unproject(n.object),n.object.zoom=Math.max(n.minZoom,Math.min(n.maxZoom,n.object.zoom/c)),n.object.updateProjectionMatrix(),mt=!0;const yt=new X(w.x,w.y,0);yt.unproject(n.object),n.object.position.sub(yt).add(Qe),n.object.updateMatrixWorld(),vt=k.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),n.zoomToCursor=!1;vt!==null&&(this.screenSpacePanning?n.target.set(0,0,-1).transformDirection(n.object.matrix).multiplyScalar(vt).add(n.object.position):(Ho.origin.copy(n.object.position),Ho.direction.set(0,0,-1).transformDirection(n.object.matrix),Math.abs(n.object.up.dot(Ho.direction))<r2?e.lookAt(n.target):(vd.setFromNormalAndCoplanarPoint(n.object.up,n.target),Ho.intersectPlane(vd,n.target))))}else n.object.isOrthographicCamera&&(n.object.zoom=Math.max(n.minZoom,Math.min(n.maxZoom,n.object.zoom/c)),n.object.updateProjectionMatrix(),mt=!0);return c=1,S=!1,mt||Pe.distanceToSquared(n.object.position)>a||8*(1-ge.dot(n.object.quaternion))>a||H.distanceToSquared(n.target)>0?(n.dispatchEvent(xd),Pe.copy(n.object.position),ge.copy(n.object.quaternion),H.copy(n.target),!0):!1}})(),this.dispose=function(){n.domElement.removeEventListener("contextmenu",it),n.domElement.removeEventListener("pointerdown",B),n.domElement.removeEventListener("pointercancel",K),n.domElement.removeEventListener("wheel",pe),n.domElement.removeEventListener("pointermove",T),n.domElement.removeEventListener("pointerup",K),n._domElementKeyEvents!==null&&(n._domElementKeyEvents.removeEventListener("keydown",Ge),n._domElementKeyEvents=null)};const n=this,r={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6};let s=r.NONE;const a=1e-6,o=new md,l=new md;let c=1;const u=new X,f=new Ve,h=new Ve,m=new Ve,x=new Ve,v=new Ve,d=new Ve,p=new Ve,_=new Ve,g=new Ve,b=new X,w=new Ve;let S=!1;const M=[],I={};let E=!1;function y(k){return k!==null?2*Math.PI/60*n.autoRotateSpeed*k:2*Math.PI/60/60*n.autoRotateSpeed}function P(k){const ye=Math.abs(k*.01);return Math.pow(.95,n.zoomSpeed*ye)}function U(k){l.theta-=k}function G(k){l.phi-=k}const F=(function(){const k=new X;return function(Be,Pe){k.setFromMatrixColumn(Pe,0),k.multiplyScalar(-Be),u.add(k)}})(),z=(function(){const k=new X;return function(Be,Pe){n.screenSpacePanning===!0?k.setFromMatrixColumn(Pe,1):(k.setFromMatrixColumn(Pe,0),k.crossVectors(n.object.up,k)),k.multiplyScalar(Be),u.add(k)}})(),q=(function(){const k=new X;return function(Be,Pe){const ge=n.domElement;if(n.object.isPerspectiveCamera){const H=n.object.position;k.copy(H).sub(n.target);let Ee=k.length();Ee*=Math.tan(n.object.fov/2*Math.PI/180),F(2*Be*Ee/ge.clientHeight,n.object.matrix),z(2*Pe*Ee/ge.clientHeight,n.object.matrix)}else n.object.isOrthographicCamera?(F(Be*(n.object.right-n.object.left)/n.object.zoom/ge.clientWidth,n.object.matrix),z(Pe*(n.object.top-n.object.bottom)/n.object.zoom/ge.clientHeight,n.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),n.enablePan=!1)}})();function ee(k){n.object.isPerspectiveCamera||n.object.isOrthographicCamera?c/=k:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),n.enableZoom=!1)}function Z(k){n.object.isPerspectiveCamera||n.object.isOrthographicCamera?c*=k:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),n.enableZoom=!1)}function Q(k,ye){if(!n.zoomToCursor)return;S=!0;const Be=n.domElement.getBoundingClientRect(),Pe=k-Be.left,ge=ye-Be.top,H=Be.width,Ee=Be.height;w.x=Pe/H*2-1,w.y=-(ge/Ee)*2+1,b.set(w.x,w.y,1).unproject(n.object).sub(n.object.position).normalize()}function j(k){return Math.max(n.minDistance,Math.min(n.maxDistance,k))}function W(k){f.set(k.clientX,k.clientY)}function C(k){Q(k.clientX,k.clientX),p.set(k.clientX,k.clientY)}function A(k){x.set(k.clientX,k.clientY)}function R(k){h.set(k.clientX,k.clientY),m.subVectors(h,f).multiplyScalar(n.rotateSpeed);const ye=n.domElement;U(2*Math.PI*m.x/ye.clientHeight),G(2*Math.PI*m.y/ye.clientHeight),f.copy(h),n.update()}function N(k){_.set(k.clientX,k.clientY),g.subVectors(_,p),g.y>0?ee(P(g.y)):g.y<0&&Z(P(g.y)),p.copy(_),n.update()}function $(k){v.set(k.clientX,k.clientY),d.subVectors(v,x).multiplyScalar(n.panSpeed),q(d.x,d.y),x.copy(v),n.update()}function he(k){Q(k.clientX,k.clientY),k.deltaY<0?Z(P(k.deltaY)):k.deltaY>0&&ee(P(k.deltaY)),n.update()}function J(k){let ye=!1;switch(k.code){case n.keys.UP:k.ctrlKey||k.metaKey||k.shiftKey?G(2*Math.PI*n.rotateSpeed/n.domElement.clientHeight):q(0,n.keyPanSpeed),ye=!0;break;case n.keys.BOTTOM:k.ctrlKey||k.metaKey||k.shiftKey?G(-2*Math.PI*n.rotateSpeed/n.domElement.clientHeight):q(0,-n.keyPanSpeed),ye=!0;break;case n.keys.LEFT:k.ctrlKey||k.metaKey||k.shiftKey?U(2*Math.PI*n.rotateSpeed/n.domElement.clientHeight):q(n.keyPanSpeed,0),ye=!0;break;case n.keys.RIGHT:k.ctrlKey||k.metaKey||k.shiftKey?U(-2*Math.PI*n.rotateSpeed/n.domElement.clientHeight):q(-n.keyPanSpeed,0),ye=!0;break}ye&&(k.preventDefault(),n.update())}function se(k){if(M.length===1)f.set(k.pageX,k.pageY);else{const ye=me(k),Be=.5*(k.pageX+ye.x),Pe=.5*(k.pageY+ye.y);f.set(Be,Pe)}}function V(k){if(M.length===1)x.set(k.pageX,k.pageY);else{const ye=me(k),Be=.5*(k.pageX+ye.x),Pe=.5*(k.pageY+ye.y);x.set(Be,Pe)}}function ie(k){const ye=me(k),Be=k.pageX-ye.x,Pe=k.pageY-ye.y,ge=Math.sqrt(Be*Be+Pe*Pe);p.set(0,ge)}function O(k){n.enableZoom&&ie(k),n.enablePan&&V(k)}function le(k){n.enableZoom&&ie(k),n.enableRotate&&se(k)}function ce(k){if(M.length==1)h.set(k.pageX,k.pageY);else{const Be=me(k),Pe=.5*(k.pageX+Be.x),ge=.5*(k.pageY+Be.y);h.set(Pe,ge)}m.subVectors(h,f).multiplyScalar(n.rotateSpeed);const ye=n.domElement;U(2*Math.PI*m.x/ye.clientHeight),G(2*Math.PI*m.y/ye.clientHeight),f.copy(h)}function ve(k){if(M.length===1)v.set(k.pageX,k.pageY);else{const ye=me(k),Be=.5*(k.pageX+ye.x),Pe=.5*(k.pageY+ye.y);v.set(Be,Pe)}d.subVectors(v,x).multiplyScalar(n.panSpeed),q(d.x,d.y),x.copy(v)}function _e(k){const ye=me(k),Be=k.pageX-ye.x,Pe=k.pageY-ye.y,ge=Math.sqrt(Be*Be+Pe*Pe);_.set(0,ge),g.set(0,Math.pow(_.y/p.y,n.zoomSpeed)),ee(g.y),p.copy(_);const H=(k.pageX+ye.x)*.5,Ee=(k.pageY+ye.y)*.5;Q(H,Ee)}function He(k){n.enableZoom&&_e(k),n.enablePan&&ve(k)}function Ie(k){n.enableZoom&&_e(k),n.enableRotate&&ce(k)}function B(k){n.enabled!==!1&&(M.length===0&&(n.domElement.setPointerCapture(k.pointerId),n.domElement.addEventListener("pointermove",T),n.domElement.addEventListener("pointerup",K)),qe(k),k.pointerType==="touch"?Xe(k):de(k))}function T(k){n.enabled!==!1&&(k.pointerType==="touch"?be(k):fe(k))}function K(k){We(k),M.length===0&&(n.domElement.releasePointerCapture(k.pointerId),n.domElement.removeEventListener("pointermove",T),n.domElement.removeEventListener("pointerup",K)),n.dispatchEvent(gd),s=r.NONE}function de(k){let ye;switch(k.button){case 0:ye=n.mouseButtons.LEFT;break;case 1:ye=n.mouseButtons.MIDDLE;break;case 2:ye=n.mouseButtons.RIGHT;break;default:ye=-1}switch(ye){case ls.DOLLY:if(n.enableZoom===!1)return;C(k),s=r.DOLLY;break;case ls.ROTATE:if(k.ctrlKey||k.metaKey||k.shiftKey){if(n.enablePan===!1)return;A(k),s=r.PAN}else{if(n.enableRotate===!1)return;W(k),s=r.ROTATE}break;case ls.PAN:if(k.ctrlKey||k.metaKey||k.shiftKey){if(n.enableRotate===!1)return;W(k),s=r.ROTATE}else{if(n.enablePan===!1)return;A(k),s=r.PAN}break;default:s=r.NONE}s!==r.NONE&&n.dispatchEvent(iu)}function fe(k){switch(s){case r.ROTATE:if(n.enableRotate===!1)return;R(k);break;case r.DOLLY:if(n.enableZoom===!1)return;N(k);break;case r.PAN:if(n.enablePan===!1)return;$(k);break}}function pe(k){n.enabled===!1||n.enableZoom===!1||s!==r.NONE||(k.preventDefault(),n.dispatchEvent(iu),he(ke(k)),n.dispatchEvent(gd))}function ke(k){const ye=k.deltaMode,Be={clientX:k.clientX,clientY:k.clientY,deltaY:k.deltaY};switch(ye){case 1:Be.deltaY*=16;break;case 2:Be.deltaY*=100;break}return k.ctrlKey&&!E&&(Be.deltaY*=10),Be}function Ae(k){k.key==="Control"&&(E=!0,document.addEventListener("keyup",Fe,{passive:!0,capture:!0}))}function Fe(k){k.key==="Control"&&(E=!1,document.removeEventListener("keyup",Fe,{passive:!0,capture:!0}))}function Ge(k){n.enabled===!1||n.enablePan===!1||J(k)}function Xe(k){switch(ze(k),M.length){case 1:switch(n.touches.ONE){case cs.ROTATE:if(n.enableRotate===!1)return;se(k),s=r.TOUCH_ROTATE;break;case cs.PAN:if(n.enablePan===!1)return;V(k),s=r.TOUCH_PAN;break;default:s=r.NONE}break;case 2:switch(n.touches.TWO){case cs.DOLLY_PAN:if(n.enableZoom===!1&&n.enablePan===!1)return;O(k),s=r.TOUCH_DOLLY_PAN;break;case cs.DOLLY_ROTATE:if(n.enableZoom===!1&&n.enableRotate===!1)return;le(k),s=r.TOUCH_DOLLY_ROTATE;break;default:s=r.NONE}break;default:s=r.NONE}s!==r.NONE&&n.dispatchEvent(iu)}function be(k){switch(ze(k),s){case r.TOUCH_ROTATE:if(n.enableRotate===!1)return;ce(k),n.update();break;case r.TOUCH_PAN:if(n.enablePan===!1)return;ve(k),n.update();break;case r.TOUCH_DOLLY_PAN:if(n.enableZoom===!1&&n.enablePan===!1)return;He(k),n.update();break;case r.TOUCH_DOLLY_ROTATE:if(n.enableZoom===!1&&n.enableRotate===!1)return;Ie(k),n.update();break;default:s=r.NONE}}function it(k){n.enabled!==!1&&k.preventDefault()}function qe(k){M.push(k.pointerId)}function We(k){delete I[k.pointerId];for(let ye=0;ye<M.length;ye++)if(M[ye]==k.pointerId){M.splice(ye,1);return}}function ze(k){let ye=I[k.pointerId];ye===void 0&&(ye=new Ve,I[k.pointerId]=ye),ye.set(k.pageX,k.pageY)}function me(k){const ye=k.pointerId===M[0]?M[1]:M[0];return I[ye]}n.domElement.addEventListener("contextmenu",it),n.domElement.addEventListener("pointerdown",B),n.domElement.addEventListener("pointercancel",K),n.domElement.addEventListener("wheel",pe,{passive:!1}),document.addEventListener("keydown",Ae,{passive:!0,capture:!0}),this.update()}}function Cr(i){const e=i.trim();if(e.startsWith("#"))return parseInt(e.slice(1),16);const t=e.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);return t?parseInt(t[1])<<16|parseInt(t[2])<<8|parseInt(t[3]):54527}function a2(i){const e=[],t=Math.PI*(3-Math.sqrt(5));for(let n=0;n<i;n++){const r=1-n/(i-1)*2,s=Math.sqrt(1-r*r),a=t*n;e.push({x:Math.cos(a)*s,y:r,z:Math.sin(a)*s})}return e}function o2(i){const e=[...new Set(i.map(a=>a.cat))],t=e.length||1,n={};e.forEach((a,o)=>{const l=(o+.5)/t;n[a]={lat:Math.PI*l-Math.PI/2}});const r={};e.forEach(a=>{r[a]=[]}),i.forEach(a=>r[a.cat].push(a));const s={};return e.forEach(a=>{const o=r[a],l=n[a].lat,c=Math.PI/t*.8;o.forEach((u,f)=>{const m=((o.length>1?f/(o.length-1):.5)*2-1)*Math.PI*.9,x=l+(Math.random()-.5)*c*.6,v=Math.cos(x);s[u.id]={x:Math.cos(m)*v,y:Math.sin(x),z:Math.sin(m)*v}})}),s}function l2(i,e,t,n=20){const r=[],s=Math.sqrt(i.x**2+i.y**2+i.z**2)||1,a=Math.sqrt(e.x**2+e.y**2+e.z**2)||1,o={x:i.x/s,y:i.y/s,z:i.z/s},l={x:e.x/a,y:e.y/a,z:e.z/a},c=t*1.01;for(let u=0;u<=n;u++){const f=u/n,h=o.x+(l.x-o.x)*f,m=o.y+(l.y-o.y)*f,x=o.z+(l.z-o.z)*f,v=Math.sqrt(h*h+m*m+x*x)||1;r.push({x:h/v*c,y:m/v*c,z:x/v*c})}return r}class c2{constructor(e){xe(this,"scene");xe(this,"camera");xe(this,"renderer");xe(this,"controls");xe(this,"nodeMeshes",[]);xe(this,"linkLines",[]);xe(this,"dotParticles",null);xe(this,"wireframe",null);xe(this,"raycaster");xe(this,"mouse");xe(this,"hovered",null);xe(this,"lockedNode",null);xe(this,"animId",null);xe(this,"pulseTime",0);xe(this,"searchMatched",null);xe(this,"_flyAnimId",null);xe(this,"_heatmapRings",[]);xe(this,"_dotTexture",null);xe(this,"_glowTexture",null);xe(this,"onNodeHover",null);xe(this,"onNodeClick",null);xe(this,"onNodeUnlock",null);xe(this,"_labelContainer",null);xe(this,"_links",[]);xe(this,"_lastTime",0);xe(this,"_glowLevel",.35);const t=window.innerWidth,n=window.innerHeight;this.renderer=new om({canvas:e,antialias:!0,alpha:!0}),this.renderer.setSize(t,n),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,2)),this.renderer.setClearColor(0,0),this.scene=new KM,this.camera=new Wn(50,t/n,1,5e3),this.camera.position.set(0,0,Dr),this.controls=new s2(this.camera,e),this.controls.enableDamping=!0,this.controls.dampingFactor=.06,this.controls.autoRotate=!0,this.controls.autoRotateSpeed=.35,this.controls.minDistance=400,this.controls.maxDistance=1800,this.controls.zoomSpeed=.8,this.scene.add(new n2(16777215,.3));const r=new t2(54527,.6);r.position.set(1,2,3),this.scene.add(r),this._buildDotSphere(),this._buildWireframe(),this.raycaster=new i2,this.mouse=new Ve(-9999,-9999)}_buildDotSphere(){const e=[],t=[],n=Ji;a2(og).forEach(({x:o,y:l,z:c})=>{e.push(o*n,l*n,c*n);const u=(l+1)/2,f=Math.round(u*0+(1-u)*168)/255,h=Math.round(u*212+(1-u)*85)/255,m=Math.round(u*255+(1-u)*247)/255;t.push(f,h,m)});const s=new pn;s.setAttribute("position",new bn(e,3)),s.setAttribute("color",new bn(t,3));const a=new cm({size:1.8,vertexColors:!0,transparent:!0,opacity:.35,sizeAttenuation:!0,blending:ri,depthWrite:!1});this.dotParticles=new QM(s,a),this.scene.add(this.dotParticles)}_buildWireframe(){const e=new bh(Ji,3),t=new mh({color:54527,wireframe:!0,transparent:!0,opacity:.04,blending:ri,depthWrite:!1});this.wireframe=new zi(e,t),this.scene.add(this.wireframe)}_createDotTexture(e){const t=document.createElement("canvas");t.width=e,t.height=e;const n=t.getContext("2d"),r=e/2,s=n.createRadialGradient(r,r,0,r,r,r);s.addColorStop(0,"#ffffff"),s.addColorStop(.65,"#ffffff"),s.addColorStop(.78,"#ffffffcc"),s.addColorStop(.92,"#ffffff44"),s.addColorStop(1,"#ffffff00"),n.fillStyle=s,n.beginPath(),n.arc(r,r,r,0,Math.PI*2),n.fill();const a=new Hu(t);return a.needsUpdate=!0,a}_createGlowRingTexture(e){const t=document.createElement("canvas");t.width=e,t.height=e;const n=t.getContext("2d"),r=e/2,s=n.createRadialGradient(r,r,0,r,r,r);s.addColorStop(0,"#ffffff00"),s.addColorStop(.25,"#ffffff08"),s.addColorStop(.5,"#ffffff22"),s.addColorStop(.7,"#ffffff18"),s.addColorStop(1,"#ffffff00"),n.fillStyle=s,n.beginPath(),n.arc(r,r,r,0,Math.PI*2),n.fill();const a=new Hu(t);return a.needsUpdate=!0,a}updateNodes(e,t,n,r=.35){this._links=t,this._labelContainer=n,this._glowLevel=r,this.nodeMeshes.forEach(({mesh:l,labelEl:c})=>{this.scene.remove(l),l.material&&l.material.dispose(),c.parentNode&&c.parentNode.removeChild(c)}),this.nodeMeshes=[],this.linkLines.forEach(l=>{this.scene.remove(l),l.geometry.dispose(),l.material.dispose()}),this.linkLines=[],n.innerHTML="";const s=Ji,a=o2(e);e.forEach(l=>{const c=a[l.id]||{x:0,y:1,z:0};l._gx=c.x*s,l._gy=c.y*s,l._gz=c.z*s}),this._dotTexture||(this._dotTexture=this._createDotTexture(128)),this._glowTexture||(this._glowTexture=this._createGlowRingTexture(128)),e.forEach(l=>{const c=Bt[l.cat]||Bt.meta,u=Cr(c.color),f=Math.min(14,4+(l.refs||0)*1.5),h=new Ql({map:this._dotTexture,color:u,transparent:!0,opacity:.95,depthWrite:!1,sizeAttenuation:!0}),m=new Ou(h);m.position.set(l._gx,l._gy,l._gz),m.scale.setScalar(f*2),m.userData.nodeData=l,this.scene.add(m);const x=new Ql({map:this._glowTexture,color:u,transparent:!0,opacity:.06+.12*r,blending:ri,depthWrite:!1,sizeAttenuation:!0}),v=new Ou(x);v.scale.setScalar(f*(2.2+1*r)),m.add(v);const d=document.createElement("div");d.className="globe-label",d.textContent=l.label,d.style.color=c.color,d.style.opacity="0",n.appendChild(d),this.nodeMeshes.push({mesh:m,data:l,labelEl:d,glowMesh:v,glowMat:x,mat:h,baseRadius:f})});const o=new Map(e.map(l=>[l.id,l]));t.forEach(l=>{const c=typeof l.source=="string"?l.source:l.source.id,u=typeof l.target=="string"?l.target:l.target.id,f=o.get(c),h=o.get(u);if(!f||!h)return;const m=l2({x:f._gx,y:f._gy,z:f._gz},{x:h._gx,y:h._gy,z:h._gz},Ji,20),x=new pn().setFromPoints(m.map(_=>new X(_.x,_.y,_.z))),v=Bt[f.cat]||Bt.meta,d=new sa({color:Cr(v.color),transparent:!0,opacity:.07,blending:ri,depthWrite:!1}),p=new qa(x,d);p.userData.linkData=l,this.scene.add(p),this.linkLines.push(p)})}animate(e,t){this._lastTime||(this._lastTime=e);const n=Math.min((e-this._lastTime)/1e3,.1);if(this._lastTime=e,this._glowLevel=t.glowLevel,this.controls.update(),this.wireframe&&(this.wireframe.visible=t.showWireframe),this.dotParticles&&(this.dotParticles.visible=t.showDots),this.linkLines.forEach(a=>{a.visible=t.showLinks}),t.pulseEnabled&&!this.hovered){this.pulseTime+=n*t.pulseSpeed*Math.PI*2;const a=t.glowLevel,o=this.searchMatched!==null&&this.searchMatched.size>0;if(this.nodeMeshes.forEach(({mesh:l,mat:c,glowMat:u,glowMesh:f,data:h,baseRadius:m},x)=>{const v=o&&this.searchMatched.has(h.id),d=(m||6)*2;if(o&&!v)return;const p=this.pulseTime+x*.35,_=Math.sin(p);if(v){const g=this.pulseTime*1.8+x*.5,b=Math.sin(g);l.scale.setScalar(d*(1+b*.35)),c.opacity=.85+b*.15,u.opacity=.15+b*.15,f.scale.setScalar(1.3+b*.4)}else{l.scale.setScalar(d*(1+_*.06)),c.opacity=.9+_*.1*a;const g=.06+.12*a;u.opacity=g+_*.04*a}}),this.dotParticles&&t.showDots){const l=Math.sin(this.pulseTime*.7);this.dotParticles.material.opacity=.25+.25*t.glowLevel+l*.05;const c=1+l*.005;this.dotParticles.scale.setScalar(c)}if(this.wireframe&&t.showWireframe){const l=Math.sin(this.pulseTime*.5);this.wireframe.material.opacity=.02+.04*t.glowLevel+l*.008}}this.raycaster.setFromCamera(this.mouse,this.camera);const r=this.nodeMeshes.map(a=>a.mesh),s=this.raycaster.intersectObjects(r,!1);if(this.lockedNode)s.length>0?this.hovered=s[0].object.userData.nodeData:this.hovered=null;else if(s.length>0){const a=s[0].object.userData.nodeData;a&&a!==this.hovered&&(this._handleHoverEnd(),this.hovered=a,this._handleHoverStart(a))}else this.hovered&&this._handleHoverEnd();this._labelContainer&&this._updateLabels(this._labelContainer),this._heatmapRings.length>0&&this._animateHeatmapRings(this.pulseTime),this.renderer.render(this.scene,this.camera)}_handleHoverStart(e){var r;const t=Tu(e.id,this._links);this.nodeMeshes.forEach(({mesh:s,data:a,mat:o,glowMat:l,glowMesh:c,baseRadius:u})=>{const f=a.id===e.id,h=t.has(a.id),m=(u||6)*2;f?(o.opacity=1,s.scale.setScalar(m*1.3),l.opacity=.2,c.scale.setScalar(1.3)):h?(o.opacity=.9,s.scale.setScalar(m)):(o.opacity=.15,s.scale.setScalar(m*.8))}),this.linkLines.forEach(s=>{const a=s.userData.linkData;if(!a)return;const o=typeof a.source=="string"?a.source:a.source.id,l=typeof a.target=="string"?a.target:a.target.id;s.material.opacity=o===e.id||l===e.id?.6:.01});const n=this.nodeMeshes.find(s=>s.data.id===e.id);n!=null&&n.labelEl&&(n.labelEl.style.opacity="1"),(r=this.onNodeHover)==null||r.call(this,e)}_handleHoverEnd(){var t;if(!this.hovered||(this.hovered=null,this.lockedNode))return;const e=this._glowLevel;this.nodeMeshes.forEach(({mesh:n,mat:r,glowMat:s,glowMesh:a,baseRadius:o})=>{const l=(o||6)*2;r.opacity=.95,s.opacity=.06+.12*e,a.scale.setScalar(1),n.scale.setScalar(l)}),this.linkLines.forEach(n=>{n.material.opacity=.07}),this.nodeMeshes.forEach(({labelEl:n})=>{n&&(n.style.opacity="0")}),(t=this.onNodeHover)==null||t.call(this,null)}handleClick(){var e,t,n;if(this.hovered){this.lockedNode=this.hovered,this.controls.autoRotate=!1,this._handleHoverStart(this.hovered);const r=Tu(this.hovered.id,this._links);this.nodeMeshes.forEach(({data:a,labelEl:o})=>{o&&(a.id===this.lockedNode.id||r.has(a.id))&&(o.style.opacity="1")});const s=this.nodeMeshes.find(a=>a.data.id===this.lockedNode.id);if(s){const o=s.mesh.position.clone().normalize().multiplyScalar(bc);this.flyTo(o,bc)}(e=this.onNodeClick)==null||e.call(this,this.lockedNode)}else if(this.lockedNode){this.lockedNode=null;const r=this._glowLevel;this.nodeMeshes.forEach(({mesh:a,mat:o,glowMat:l,glowMesh:c,baseRadius:u,labelEl:f})=>{const h=(u||6)*2;o.opacity=.95,l.opacity=.06+.12*r,c.scale.setScalar(1),a.scale.setScalar(h),f&&(f.style.opacity="0")}),this.linkLines.forEach(a=>{a.material.opacity=.07}),this.flyTo(new X(0,0,Dr),Dr),this.searchMatched!==null&&this.searchMatched.size>0||(this.controls.autoRotate=!0),(t=this.onNodeUnlock)==null||t.call(this),(n=this.onNodeClick)==null||n.call(this,null)}}flyTo(e,t){const n=this.camera.position.clone(),r=1200,s=performance.now();this._flyAnimId!==null&&cancelAnimationFrame(this._flyAnimId);const a=o=>{const l=o-s;let c=Math.min(l/r,1);c=1-Math.pow(1-c,3);const u=new X().lerpVectors(n,e,c),f=n.length()+(t-n.length())*c;u.normalize().multiplyScalar(f),this.camera.position.copy(u),this.camera.lookAt(0,0,0),this.controls.target.set(0,0,0),this.controls.update(),c<1?this._flyAnimId=requestAnimationFrame(a):this._flyAnimId=null};this._flyAnimId=requestAnimationFrame(a)}resetPosition(){this.flyTo(new X(0,0,Dr),Dr)}search(e){if(!this.nodeMeshes.length)return;this.searchMatched=e.size>0?e:null,this.controls.autoRotate=!1;const t=3815994;this.nodeMeshes.forEach(({data:l,mat:c,glowMat:u,glowMesh:f,mesh:h,baseRadius:m,labelEl:x})=>{const v=e.has(l.id),d=(m||6)*2;if(v){const p=Bt[l.cat]||Bt.meta,_=Cr(p.color);c.color.setHex(_),c.opacity=1,u.color.setHex(_),u.opacity=.18,f.scale.setScalar(1.2),h.scale.setScalar(d*1.2)}else c.color.setHex(t),c.opacity=.2,u.color.setHex(t),u.opacity=.01,f.scale.setScalar(.3),h.scale.setScalar(d*.7);x&&(x.style.opacity=v?"1":"0")}),this.linkLines.forEach(l=>{const c=l.userData.linkData;if(!c)return;const u=typeof c.source=="string"?c.source:c.source.id,f=typeof c.target=="string"?c.target:c.target.id;l.material.opacity=e.has(u)&&e.has(f)?.4:.01});const n=this.nodeMeshes.filter(l=>e.has(l.data.id));if(n.length===0)return;const r=new X(0,0,0);n.forEach(({mesh:l})=>r.add(l.position)),r.divideScalar(n.length);const s=r.clone().normalize(),a=n.length===1?520:bc,o=s.clone().multiplyScalar(a);this.flyTo(o,a),this._removeHeatmapRings(),this._addHeatmapRings(n)}clearSearch(){this.searchMatched=null;const e=this._glowLevel;this.nodeMeshes.forEach(({data:t,mat:n,glowMat:r,glowMesh:s,mesh:a,baseRadius:o,labelEl:l})=>{const c=Bt[t.cat]||Bt.meta,u=Cr(c.color);n.color.setHex(u),n.opacity=.95,r.color.setHex(u),r.opacity=.06+.12*e,s.scale.setScalar(1);const f=(o||6)*2;a.scale.setScalar(f),l&&(l.style.opacity="0")}),this.linkLines.forEach(t=>{t.material.opacity=.07}),this._removeHeatmapRings(),this.controls.autoRotate=!0,this.resetPosition()}_addHeatmapRings(e){const t=[.08,.15,.24],n=[.35,.18,.08];e.forEach(({mesh:r,data:s})=>{const a=Bt[s.cat]||Bt.meta,o=Cr(a.color),l=r.position.clone().normalize(),c=Math.abs(l.y)<.99?new X(0,1,0):new X(1,0,0),u=new X().crossVectors(l,c).normalize(),f=new X().crossVectors(l,u).normalize();t.forEach((h,m)=>{const v=[];for(let g=0;g<=64;g++){const b=g/64*Math.PI*2,w=Math.cos(b),S=Math.sin(b),M=Math.cos(h),I=Math.sin(h),E=l.clone().multiplyScalar(M).add(u.clone().multiplyScalar(I*w)).add(f.clone().multiplyScalar(I*S));E.normalize().multiplyScalar(Ji*1.005),v.push(E)}const d=new pn().setFromPoints(v),p=new sa({color:o,transparent:!0,opacity:n[m],blending:ri,depthWrite:!1,linewidth:1}),_=new qa(d,p);_.userData._heatmap=!0,_.userData._baseOpacity=n[m],_.userData._ringIndex=m,this.scene.add(_),this._heatmapRings.push(_)})})}_removeHeatmapRings(){this._heatmapRings.forEach(e=>{this.scene.remove(e),e.geometry.dispose(),e.material.dispose()}),this._heatmapRings=[]}_animateHeatmapRings(e){this._heatmapRings.forEach(t=>{const n=t.userData._ringIndex||0,r=t.userData._baseOpacity||.2,s=e*1.5-n*1.2,a=Math.sin(s);t.material.opacity=r+a*r*.5;const o=1+a*.02;t.scale.setScalar(o)})}updateGlow(e){this._glowLevel=e,this.nodeMeshes.forEach(({mat:t,glowMat:n,glowMesh:r,baseRadius:s})=>{t.opacity=.9+.1*e,n.opacity=.06+.12*e,r.scale.setScalar(1+e*.2)}),this.dotParticles&&(this.dotParticles.material.opacity=.25+.25*e),this.wireframe&&(this.wireframe.material.opacity=.02+.04*e)}filterCategories(e){const n=this._glowLevel;this.nodeMeshes.forEach(({data:s,mat:a,glowMat:o,mesh:l,baseRadius:c})=>{const u=e.has(s.cat),f=(c||6)*2;if(u){const h=Bt[s.cat]||Bt.meta;a.color.setHex(Cr(h.color)),a.opacity=.95,o.color.setHex(Cr(h.color)),o.opacity=.06+.12*n,l.scale.setScalar(f)}else a.color.setHex(3815994),a.opacity=.1,o.color.setHex(3815994),o.opacity=.01,l.scale.setScalar(f*.6)});const r=new Map(this.nodeMeshes.map(s=>[s.data.id,s.data]));this.linkLines.forEach(s=>{const a=s.userData.linkData;if(!a)return;const o=typeof a.source=="string"?a.source:a.source.id,l=typeof a.target=="string"?a.target:a.target.id,c=r.get(o),u=r.get(l);s.material.opacity=c&&u&&e.has(c.cat)&&e.has(u.cat)?.07:.005})}updateTheme(e){let t;typeof e=="boolean"?t=e?"dark":"light":t=e;const n={dark:54527,light:1982639,fire:16738816,winter:8308991,galaxy:11823871,electric:3968255};if(this.wireframe&&this.wireframe.material.color.setHex(n[t]??54527),this.dotParticles){const r=this.dotParticles.geometry,s=r.getAttribute("position"),a=s.count,o=[],l=Ji;for(let c=0;c<a;c++){const f=(s.getY(c)/l+1)/2;t==="fire"?o.push(1,f*.85+(1-f)*.15,f*.1):t==="winter"?o.push(f*.9+(1-f)*.2,f*.95+(1-f)*.4,1):t==="galaxy"?o.push(f*.9+(1-f)*.5,f*.4+(1-f)*.15,f*1+(1-f)*.8):t==="electric"?o.push(f*.6+(1-f)*.1,f*.85+(1-f)*.3,f*1+(1-f)*.9):t==="light"?o.push(f*30/255,f*64/255,175/255):o.push(f*0+(1-f)*168/255,f*212/255+(1-f)*85/255,1)}r.setAttribute("color",new bn(o,3))}}_updateLabels(e){const t=window.innerWidth,n=window.innerHeight;this.nodeMeshes.forEach(({mesh:r,labelEl:s})=>{if(!s||(parseFloat(s.style.opacity)||0)<.05)return;const o=r.position.clone().project(this.camera),l=(o.x*.5+.5)*t,c=(o.y*-.5+.5)*n;if(o.z>1){s.style.opacity="0";return}s.style.left=l+"px",s.style.top=c-12+"px"})}handleMouseMove(e){const n=this.renderer.domElement.getBoundingClientRect();this.mouse.x=(e.clientX-n.left)/n.width*2-1,this.mouse.y=-((e.clientY-n.top)/n.height)*2+1}handleMouseLeave(){this.mouse.set(-9999,-9999),this._handleHoverEnd()}resize(){const e=window.innerWidth,t=window.innerHeight;this.camera.aspect=e/t,this.camera.updateProjectionMatrix(),this.renderer.setSize(e,t)}dispose(){var e,t;this.animId!==null&&cancelAnimationFrame(this.animId),this._flyAnimId!==null&&cancelAnimationFrame(this._flyAnimId),this.nodeMeshes.forEach(({mesh:n,mat:r,glowMat:s,labelEl:a})=>{this.scene.remove(n),r.dispose(),s.dispose(),a.parentNode&&a.parentNode.removeChild(a)}),this.linkLines.forEach(n=>{this.scene.remove(n),n.geometry.dispose(),n.material.dispose()}),this.dotParticles&&(this.scene.remove(this.dotParticles),this.dotParticles.geometry.dispose(),this.dotParticles.material.dispose()),this.wireframe&&(this.scene.remove(this.wireframe),this.wireframe.geometry.dispose(),this.wireframe.material.dispose()),this._removeHeatmapRings(),(e=this._dotTexture)==null||e.dispose(),(t=this._glowTexture)==null||t.dispose(),this.controls.dispose(),this.renderer.dispose()}}const Go={w:"w",a:"a",s:"s",d:"d",q:"q"};class u2{constructor(e,t){xe(this,"camera");xe(this,"controls");xe(this,"state");xe(this,"onFlyTo",null);xe(this,"isGlobeActive",()=>!0);xe(this,"isSearchActive",()=>!1);xe(this,"autoRotateSetting",!0);xe(this,"_boundKeyDown");xe(this,"_boundKeyUp");xe(this,"_boundBlur");this.camera=e,this.controls=t,this.state={keys:{w:!1,a:!1,s:!1,d:!1,q:!1,shift:!1},speed:0,maxSpeed:1,accelRate:.4,boostRate:1.2,brakeRate:1.5,friction:.3,rotX:0,rotY:0,active:!1,_wasMoving:!1},this._boundKeyDown=this.handleKeyDown.bind(this),this._boundKeyUp=this.handleKeyUp.bind(this),this._boundBlur=this.handleBlur.bind(this),window.addEventListener("keydown",this._boundKeyDown),window.addEventListener("keyup",this._boundKeyUp),window.addEventListener("blur",this._boundBlur)}handleKeyDown(e){const t=e.target;if(t.tagName==="INPUT"||t.tagName==="TEXTAREA"||!this.isGlobeActive()||this.isSearchActive())return;const n=e.key.toLowerCase();Go[n]!==void 0&&(this.state.keys[Go[n]]=!0,e.preventDefault()),(n==="shift"||e.shiftKey)&&(this.state.keys.shift=!0)}handleKeyUp(e){const t=e.key.toLowerCase();Go[t]!==void 0&&(this.state.keys[Go[t]]=!1),t==="shift"&&(this.state.keys.shift=!1)}handleBlur(){this.state.keys.w=!1,this.state.keys.a=!1,this.state.keys.s=!1,this.state.keys.d=!1,this.state.keys.q=!1,this.state.keys.shift=!1}update(e,t,n){if(this.autoRotateSetting=n,t){this.state.speed=0;return}const r=this.state;let s=0,a=0;r.keys.w&&!r.keys.s&&(s=-1),r.keys.s&&!r.keys.w&&(s=1),r.keys.a&&!r.keys.d&&(a=-1),r.keys.d&&!r.keys.a&&(a=1);const o=s!==0||a!==0;if(r.keys.q)this.state.speed=Math.max(0,this.state.speed-this.state.brakeRate*e);else if(o){const f=this.state.keys.shift?this.state.boostRate:this.state.accelRate;this.state.speed=Math.min(this.state.maxSpeed,this.state.speed+f*e)}else this.state.speed=Math.max(0,this.state.speed-this.state.friction*e);const l=5*e,c=o?s:0,u=o?a:this.state.speed>.01?this.state.rotY:0;if(this.state.rotX+=(c-this.state.rotX)*Math.min(1,l),this.state.rotY+=(u-this.state.rotY)*Math.min(1,l),this.state.speed>.001){this.controls.autoRotate=!1;const f=this.state.speed*this.state.speed*1.8*e,h=this.camera.position.clone(),m=h.clone().normalize(),x=new X(0,1,0),v=new X().crossVectors(x,m).normalize(),d=new X().crossVectors(m,v).normalize(),p=new Ei().setFromAxisAngle(v,this.state.rotX*f),_=new Ei().setFromAxisAngle(d,this.state.rotY*f),g=new Ei().multiplyQuaternions(_,p);h.applyQuaternion(g);const b=this.camera.position.length();h.normalize().multiplyScalar(b),this.camera.position.copy(h),this.camera.lookAt(0,0,0),this.controls.target.set(0,0,0),this.controls.update()}else if(this.state.speed<=.001&&!o&&!r.keys.q&&this.state._wasMoving){this.state._wasMoving=!1,this.state.speed=0;const f=new X(0,0,Dr);this.onFlyTo&&this.onFlyTo(f,Dr),n&&(this.controls.autoRotate=!0)}this.state.speed>.01&&(this.state._wasMoving=!0),this.state.active=o||this.state.speed>.01}get speedKmh(){return Math.round(this.state.speed*500)}get anyKeyDown(){const e=this.state.keys;return e.w||e.a||e.s||e.d||e.q}dispose(){window.removeEventListener("keydown",this._boundKeyDown),window.removeEventListener("keyup",this._boundKeyUp),window.removeEventListener("blur",this._boundBlur)}}class h2{constructor(e){xe(this,"group");xe(this,"trails",[]);xe(this,"enabled",!0);xe(this,"scene");this.scene=e,this.group=new Bs,e.add(this.group),this._buildTrails()}_buildTrails(){for(let e=0;e<$h;e++){const t=new Float32Array(Yh*3),n=new pn;n.setAttribute("position",new Yn(t,3));const r=new sa({color:lo[e%lo.length],transparent:!0,opacity:0,blending:ri,depthWrite:!1}),s=new qa(n,r);s.frustumCulled=!1,this.group.add(s);const a=e/$h*Math.PI*2,o=Math.acos(2*Math.random()-1);this.trails.push({line:s,geo:n,mat:r,theta:a,phi:o,points:Yh,trail:[]})}}update(e,t,n,r){if(!this.enabled){this.group.visible=!1;return}const s=Math.max(0,(t-.15)/.85),a=Ji*1.02;this.trails.forEach((o,l)=>{o.theta+=(r*2.5+.3)*e*(1+t*3),o.phi+=n*1.5*e*(1+t*2),o.phi=Math.max(.2,Math.min(Math.PI-.2,o.phi));const c=a*Math.sin(o.phi)*Math.cos(o.theta),u=a*Math.cos(o.phi),f=a*Math.sin(o.phi)*Math.sin(o.theta),h=new X(c,u,f);o.trail.unshift(h),o.trail.length>o.points&&o.trail.pop();const m=o.geo.getAttribute("position");for(let x=0;x<o.points;x++)if(x<o.trail.length)m.setXYZ(x,o.trail[x].x,o.trail[x].y,o.trail[x].z);else{const v=o.trail[o.trail.length-1]??h;m.setXYZ(x,v.x,v.y,v.z)}m.needsUpdate=!0,o.geo.setDrawRange(0,o.trail.length),o.mat.color.setHex(lo[l%lo.length]),o.mat.opacity=s*(.12+.18*t)}),this.group.visible=s>.01}setEnabled(e){this.enabled=e,e||(this.group.visible=!1)}clearTrails(){this.trails.forEach(e=>{e.trail=[]})}dispose(){this.trails.forEach(e=>{e.geo.dispose(),e.mat.dispose()}),this.trails=[],this.scene.remove(this.group)}}const f2=6,_d=20,d2=.3,ru=Ji,bd=15;class p2{constructor(e){xe(this,"group");xe(this,"scene");xe(this,"arcs",[]);xe(this,"spawnTimer",0);xe(this,"_enabled",!1);xe(this,"_showArcs",!0);xe(this,"_showAura",!0);xe(this,"auraSprite",null);xe(this,"auraMat",null);xe(this,"auraTexture",null);xe(this,"_time",0);this.scene=e,this.group=new Bs,e.add(this.group),this._buildAura()}_buildAura(){const t=document.createElement("canvas");t.width=512,t.height=512;const n=t.getContext("2d"),r=512/2,s=n.createRadialGradient(r,r,0,r,r,r);s.addColorStop(0,"rgba(60,140,255,0)"),s.addColorStop(.3,"rgba(60,140,255,0)"),s.addColorStop(.5,"rgba(60,140,255,0.08)"),s.addColorStop(.65,"rgba(100,180,255,0.15)"),s.addColorStop(.75,"rgba(140,200,255,0.1)"),s.addColorStop(.85,"rgba(80,160,255,0.04)"),s.addColorStop(1,"rgba(40,80,200,0)"),n.fillStyle=s,n.fillRect(0,0,512,512),this.auraTexture=new Hu(t),this.auraTexture.needsUpdate=!0,this.auraMat=new Ql({map:this.auraTexture,transparent:!0,opacity:.6,blending:ri,depthWrite:!1}),this.auraSprite=new Ou(this.auraMat);const a=ru*3.2;this.auraSprite.scale.set(a,a,1),this.group.add(this.auraSprite)}_spawnArc(){if(this.arcs.length>=f2)return;const e=Math.random()*Math.PI*2,t=Math.acos(2*Math.random()-1),n=e+(Math.random()-.5)*Math.PI*1.2,r=t+(Math.random()-.5)*Math.PI*.6,s=[];for(let h=0;h<=_d;h++){const m=h/_d,x=e+(n-e)*m,v=t+(r-t)*m,d=Math.sin(v)*Math.cos(x),p=Math.cos(v),_=Math.sin(v)*Math.sin(x),g=Math.sin(m*Math.PI)*bd,b=bd+(Math.random()-.3)*g,w=-Math.sin(x),S=Math.cos(x),M=(Math.random()-.5)*g*.6,I=ru+b;s.push(d*I+w*M,p*I,_*I+S*M)}const a=new pn;a.setAttribute("position",new bn(s,3));const o=new sa({color:14544639,transparent:!0,opacity:.9,blending:ri,depthWrite:!1,linewidth:1}),l=new qa(a,o);l.frustumCulled=!1,this.group.add(l);const c=new sa({color:4231423,transparent:!0,opacity:.35,blending:ri,depthWrite:!1,linewidth:1}),u=new qa(a.clone(),c);u.scale.setScalar(1.01),u.frustumCulled=!1,this.group.add(u);const f=.15+Math.random()*.3;this.arcs.push({line:l,glowLine:u,life:f,decay:1,maxLife:f})}update(e){if(!this._enabled){this.group.visible=!1;return}if(this.group.visible=!0,this._time+=e,this.auraMat&&this.auraSprite)if(this._showAura){this.auraSprite.visible=!0;const t=.4+.2*Math.sin(this._time*3)+.1*Math.sin(this._time*7.3);this.auraMat.opacity=t;const n=ru*3.2*(1+Math.sin(this._time*1.5)*.05);this.auraSprite.scale.set(n,n,1)}else this.auraSprite.visible=!1;this._showArcs&&(this.spawnTimer-=e,this.spawnTimer<=0&&(this._spawnArc(),this.spawnTimer=d2*(.5+Math.random())));for(let t=this.arcs.length-1;t>=0;t--){const n=this.arcs[t];if(n.life-=e,n.life<=0){this.group.remove(n.line),this.group.remove(n.glowLine),n.line.geometry.dispose(),n.line.material.dispose(),n.glowLine.geometry.dispose(),n.glowLine.material.dispose(),this.arcs.splice(t,1);continue}const s=n.life/n.maxLife*(.3+.7*Math.abs(Math.sin(this._time*25+t*7)));n.line.material.opacity=s,n.glowLine.material.opacity=s*.35}}setEnabled(e){if(this._enabled=e,!e){for(const t of this.arcs)this.group.remove(t.line),this.group.remove(t.glowLine),t.line.geometry.dispose(),t.line.material.dispose(),t.glowLine.geometry.dispose(),t.glowLine.material.dispose();this.arcs=[]}}setShowArcs(e){this._showArcs=e}setShowAura(e){this._showAura=e}dispose(){var e,t;this.setEnabled(!1),this.auraSprite&&(this.group.remove(this.auraSprite),(e=this.auraMat)==null||e.dispose(),(t=this.auraTexture)==null||t.dispose()),this.scene.remove(this.group)}}var m2=et('<canvas id="globe-canvas"></canvas> <div id="globe-label-container"></div>',1);function x2(i,e){jt(e,!0);let t,n,r=null,s=null,a=null,o=null,l=!0,c=null,u=null;Ja(()=>{r=new c2(t),s=new u2(r.camera,r.controls),a=new h2(r.scene),o=new p2(r.scene),r.onNodeClick=F=>{F?(Ni.set(F.id),co.set(F)):(Ni.set(null),co.set(null))},r.onNodeUnlock=()=>{Ni.set(null),co.set(null)},s.onFlyTo=(F,z)=>r==null?void 0:r.flyTo(F,z),s.isGlobeActive=()=>!0,s.isSearchActive=()=>{const F=Wt(Sc);return F!==null&&F.size>0};const p=ci.subscribe(F=>{if(!r||!F.length)return;const z=Wt(gr),q=Wt(kr);r.updateNodes(F,z,n,q)}),_=gr.subscribe(F=>{if(!r)return;const z=Wt(ci);if(!z.length)return;const q=Wt(kr);r.updateNodes(z,F,n,q)}),g=Sc.subscribe(F=>{r&&(F&&F.size>0?(r.search(F),s&&(s.isSearchActive=()=>!0)):(r.clearSearch(),s&&(s.isSearchActive=()=>!1)))}),b=kr.subscribe(F=>{r==null||r.updateGlow(F)}),w=Wi.subscribe(F=>{r==null||r.updateTheme(F),o==null||o.setEnabled(F==="electric")}),S=Da.subscribe(F=>{o==null||o.setShowArcs(F)}),M=Pa.subscribe(F=>{o==null||o.setShowAura(F)}),I=Ga.subscribe(F=>{r&&(r.controls.autoRotate=F),s&&(s.autoRotateSetting=F)}),E=Vl.subscribe(F=>{r&&(r.controls.autoRotateSpeed=F)}),y=ea.subscribe(F=>{a&&a.setEnabled(F)}),P=Su.subscribe(F=>{r==null||r.filterCategories(F)}),U=F=>{const z=F.detail;if(!r||!(z!=null&&z.nodeId))return;const q=z.nodeId,ee=r.nodeMeshes.find(j=>j.data.id===q);if(!ee)return;const Q=ee.mesh.position.clone().normalize().multiplyScalar(650);r.flyTo(Q,650),Ni.set(q),co.set(ee.data),r.lockedNode=ee.data,r.hovered=ee.data,r.controls.autoRotate=!1};document.addEventListener("kg:flyto",U),u=()=>r==null?void 0:r.resize(),window.addEventListener("resize",u);function G(F){if(c=requestAnimationFrame(G),!r)return;const z=Wt(Ga),q=(()=>{const ee=Wt(Sc);return ee!==null&&ee.size>0})();s&&(s.update(.016,q,z),e.onwasdupdate&&e.onwasdupdate({keys:{...s.state.keys},speed:s.state.speed})),o&&o.update(.016),a&&s&&a.update(.016,s.state.speed,s.state.rotX,s.state.rotY),r.animate(F,{pulseEnabled:Wt(Hl),pulseSpeed:Wt(Gl),glowLevel:Wt(kr),showWireframe:Wt(Nl),showDots:Wt(Ol),showLinks:Wt(zl)})}return c=requestAnimationFrame(G),()=>{p(),_(),g(),b(),w(),I(),E(),y(),P(),S(),M(),document.removeEventListener("kg:flyto",U)}}),ig(()=>{c!==null&&(cancelAnimationFrame(c),c=null),u&&window.removeEventListener("resize",u),r==null||r.dispose(),s==null||s.dispose(),a==null||a.dispose(),o==null||o.dispose()});function f(p){r==null||r.handleMouseMove(p)}function h(){r==null||r.handleClick()}function m(){r==null||r.handleMouseLeave()}var x=m2(),v=an(x);je(v,1,"svelte-1m8ll1v",null,{},{show:l}),Oa(v,p=>t=p,()=>t);var d=ae(v,2);je(d,1,"svelte-1m8ll1v",null,{},{show:l}),Oa(d,p=>n=p,()=>n),De("mousemove",v,f),De("click",v,h),xp("mouseleave",v,m),Ke(i,x),Kt()}hi(["mousemove","click"]);var g2=et('<div id="wasd-hud"><div class="key-indicators svelte-cwwp3e"><div>W</div> <div>A</div> <div>S</div> <div>D</div> <div>Q</div> <div>&#8679;</div></div> <div class="speed-bar svelte-cwwp3e"><div class="speed-fill svelte-cwwp3e"></div></div> <span class="speed-val svelte-cwwp3e"> </span></div>');function v2(i,e){jt(e,!0);let t=Je(()=>Math.round(e.speed*500)),n=Je(()=>e.speed*100),r=Je(()=>e.speed>.01||e.keys.w||e.keys.a||e.keys.s||e.keys.d||e.keys.q);var s=g2();let a;var o=ue(s),l=ue(o);let c;var u=ae(l,2);let f;var h=ae(u,2);let m;var x=ae(h,2);let v;var d=ae(x,2);let p;var _=ae(d,2);let g;var b=ae(o,2),w=ue(b),S=ae(b,2),M=ue(S);St(()=>{a=je(s,1,"svelte-cwwp3e",null,a,{show:L(r)}),c=je(l,1,"key-ind svelte-cwwp3e",null,c,{active:e.keys.w}),f=je(u,1,"key-ind svelte-cwwp3e",null,f,{active:e.keys.a}),m=je(h,1,"key-ind svelte-cwwp3e",null,m,{active:e.keys.s}),v=je(x,1,"key-ind svelte-cwwp3e",null,v,{active:e.keys.d}),p=je(d,1,"key-ind svelte-cwwp3e",null,p,{brake:e.keys.q,active:e.keys.q}),g=je(_,1,"key-ind svelte-cwwp3e",null,g,{boost:e.keys.shift,active:e.keys.shift}),yi(w,`width:${L(n)??""}%`),pt(M,`${L(t)??""} km/h`)}),Ke(i,s),Kt()}function yh(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}let as=yh();function hm(i){as=i}const fm=/[&<>"']/,_2=new RegExp(fm.source,"g"),dm=/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,b2=new RegExp(dm.source,"g"),y2={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},yd=i=>y2[i];function Bn(i,e){if(e){if(fm.test(i))return i.replace(_2,yd)}else if(dm.test(i))return i.replace(b2,yd);return i}const E2=/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig;function S2(i){return i.replace(E2,(e,t)=>(t=t.toLowerCase(),t==="colon"?":":t.charAt(0)==="#"?t.charAt(1)==="x"?String.fromCharCode(parseInt(t.substring(2),16)):String.fromCharCode(+t.substring(1)):""))}const M2=/(^|[^\[])\^/g;function Tt(i,e){let t=typeof i=="string"?i:i.source;e=e||"";const n={replace:(r,s)=>{let a=typeof s=="string"?s:s.source;return a=a.replace(M2,"$1"),t=t.replace(r,a),n},getRegex:()=>new RegExp(t,e)};return n}function Ed(i){try{i=encodeURI(i).replace(/%25/g,"%")}catch{return null}return i}const ka={exec:()=>null};function Sd(i,e){const t=i.replace(/\|/g,(s,a,o)=>{let l=!1,c=a;for(;--c>=0&&o[c]==="\\";)l=!l;return l?"|":" |"}),n=t.split(/ \|/);let r=0;if(n[0].trim()||n.shift(),n.length>0&&!n[n.length-1].trim()&&n.pop(),e)if(n.length>e)n.splice(e);else for(;n.length<e;)n.push("");for(;r<n.length;r++)n[r]=n[r].trim().replace(/\\\|/g,"|");return n}function Vo(i,e,t){const n=i.length;if(n===0)return"";let r=0;for(;r<n&&i.charAt(n-r-1)===e;)r++;return i.slice(0,n-r)}function w2(i,e){if(i.indexOf(e[1])===-1)return-1;let t=0;for(let n=0;n<i.length;n++)if(i[n]==="\\")n++;else if(i[n]===e[0])t++;else if(i[n]===e[1]&&(t--,t<0))return n;return-1}function Md(i,e,t,n){const r=e.href,s=e.title?Bn(e.title):null,a=i[1].replace(/\\([\[\]])/g,"$1");if(i[0].charAt(0)!=="!"){n.state.inLink=!0;const o={type:"link",raw:t,href:r,title:s,text:a,tokens:n.inlineTokens(a)};return n.state.inLink=!1,o}return{type:"image",raw:t,href:r,title:s,text:Bn(a)}}function A2(i,e){const t=i.match(/^(\s+)(?:```)/);if(t===null)return e;const n=t[1];return e.split(`
`).map(r=>{const s=r.match(/^\s+/);if(s===null)return r;const[a]=s;return a.length>=n.length?r.slice(n.length):r}).join(`
`)}class Jl{constructor(e){xe(this,"options");xe(this,"rules");xe(this,"lexer");this.options=e||as}space(e){const t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){const t=this.rules.block.code.exec(e);if(t){const n=t[0].replace(/^ {1,4}/gm,"");return{type:"code",raw:t[0],codeBlockStyle:"indented",text:this.options.pedantic?n:Vo(n,`
`)}}}fences(e){const t=this.rules.block.fences.exec(e);if(t){const n=t[0],r=A2(n,t[3]||"");return{type:"code",raw:n,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):t[2],text:r}}}heading(e){const t=this.rules.block.heading.exec(e);if(t){let n=t[2].trim();if(/#$/.test(n)){const r=Vo(n,"#");(this.options.pedantic||!r||/ $/.test(r))&&(n=r.trim())}return{type:"heading",raw:t[0],depth:t[1].length,text:n,tokens:this.lexer.inline(n)}}}hr(e){const t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:t[0]}}blockquote(e){const t=this.rules.block.blockquote.exec(e);if(t){let n=t[0].replace(/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,`
    $1`);n=Vo(n.replace(/^ *>[ \t]?/gm,""),`
`);const r=this.lexer.state.top;this.lexer.state.top=!0;const s=this.lexer.blockTokens(n);return this.lexer.state.top=r,{type:"blockquote",raw:t[0],tokens:s,text:n}}}list(e){let t=this.rules.block.list.exec(e);if(t){let n=t[1].trim();const r=n.length>1,s={type:"list",raw:"",ordered:r,start:r?+n.slice(0,-1):"",loose:!1,items:[]};n=r?`\\d{1,9}\\${n.slice(-1)}`:`\\${n}`,this.options.pedantic&&(n=r?n:"[*+-]");const a=new RegExp(`^( {0,3}${n})((?:[	 ][^\\n]*)?(?:\\n|$))`);let o="",l="",c=!1;for(;e;){let u=!1;if(!(t=a.exec(e))||this.rules.block.hr.test(e))break;o=t[0],e=e.substring(o.length);let f=t[2].split(`
`,1)[0].replace(/^\t+/,p=>" ".repeat(3*p.length)),h=e.split(`
`,1)[0],m=0;this.options.pedantic?(m=2,l=f.trimStart()):(m=t[2].search(/[^ ]/),m=m>4?1:m,l=f.slice(m),m+=t[1].length);let x=!1;if(!f&&/^ *$/.test(h)&&(o+=h+`
`,e=e.substring(h.length+1),u=!0),!u){const p=new RegExp(`^ {0,${Math.min(3,m-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),_=new RegExp(`^ {0,${Math.min(3,m-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),g=new RegExp(`^ {0,${Math.min(3,m-1)}}(?:\`\`\`|~~~)`),b=new RegExp(`^ {0,${Math.min(3,m-1)}}#`);for(;e;){const w=e.split(`
`,1)[0];if(h=w,this.options.pedantic&&(h=h.replace(/^ {1,4}(?=( {4})*[^ ])/g,"  ")),g.test(h)||b.test(h)||p.test(h)||_.test(e))break;if(h.search(/[^ ]/)>=m||!h.trim())l+=`
`+h.slice(m);else{if(x||f.search(/[^ ]/)>=4||g.test(f)||b.test(f)||_.test(f))break;l+=`
`+h}!x&&!h.trim()&&(x=!0),o+=w+`
`,e=e.substring(w.length+1),f=h.slice(m)}}s.loose||(c?s.loose=!0:/\n *\n *$/.test(o)&&(c=!0));let v=null,d;this.options.gfm&&(v=/^\[[ xX]\] /.exec(l),v&&(d=v[0]!=="[ ] ",l=l.replace(/^\[[ xX]\] +/,""))),s.items.push({type:"list_item",raw:o,task:!!v,checked:d,loose:!1,text:l,tokens:[]}),s.raw+=o}s.items[s.items.length-1].raw=o.trimEnd(),s.items[s.items.length-1].text=l.trimEnd(),s.raw=s.raw.trimEnd();for(let u=0;u<s.items.length;u++)if(this.lexer.state.top=!1,s.items[u].tokens=this.lexer.blockTokens(s.items[u].text,[]),!s.loose){const f=s.items[u].tokens.filter(m=>m.type==="space"),h=f.length>0&&f.some(m=>/\n.*\n/.test(m.raw));s.loose=h}if(s.loose)for(let u=0;u<s.items.length;u++)s.items[u].loose=!0;return s}}html(e){const t=this.rules.block.html.exec(e);if(t)return{type:"html",block:!0,raw:t[0],pre:t[1]==="pre"||t[1]==="script"||t[1]==="style",text:t[0]}}def(e){const t=this.rules.block.def.exec(e);if(t){const n=t[1].toLowerCase().replace(/\s+/g," "),r=t[2]?t[2].replace(/^<(.*)>$/,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",s=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):t[3];return{type:"def",tag:n,raw:t[0],href:r,title:s}}}table(e){const t=this.rules.block.table.exec(e);if(!t||!/[:|]/.test(t[2]))return;const n=Sd(t[1]),r=t[2].replace(/^\||\| *$/g,"").split("|"),s=t[3]&&t[3].trim()?t[3].replace(/\n[ \t]*$/,"").split(`
`):[],a={type:"table",raw:t[0],header:[],align:[],rows:[]};if(n.length===r.length){for(const o of r)/^ *-+: *$/.test(o)?a.align.push("right"):/^ *:-+: *$/.test(o)?a.align.push("center"):/^ *:-+ *$/.test(o)?a.align.push("left"):a.align.push(null);for(const o of n)a.header.push({text:o,tokens:this.lexer.inline(o)});for(const o of s)a.rows.push(Sd(o,a.header.length).map(l=>({text:l,tokens:this.lexer.inline(l)})));return a}}lheading(e){const t=this.rules.block.lheading.exec(e);if(t)return{type:"heading",raw:t[0],depth:t[2].charAt(0)==="="?1:2,text:t[1],tokens:this.lexer.inline(t[1])}}paragraph(e){const t=this.rules.block.paragraph.exec(e);if(t){const n=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:n,tokens:this.lexer.inline(n)}}}text(e){const t=this.rules.block.text.exec(e);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){const t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:Bn(t[1])}}tag(e){const t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&/^<a /i.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&/^<\/a>/i.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&/^<(pre|code|kbd|script)(\s|>)/i.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&/^<\/(pre|code|kbd|script)(\s|>)/i.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){const t=this.rules.inline.link.exec(e);if(t){const n=t[2].trim();if(!this.options.pedantic&&/^</.test(n)){if(!/>$/.test(n))return;const a=Vo(n.slice(0,-1),"\\");if((n.length-a.length)%2===0)return}else{const a=w2(t[2],"()");if(a>-1){const l=(t[0].indexOf("!")===0?5:4)+t[1].length+a;t[2]=t[2].substring(0,a),t[0]=t[0].substring(0,l).trim(),t[3]=""}}let r=t[2],s="";if(this.options.pedantic){const a=/^([^'"]*[^\s])\s+(['"])(.*)\2/.exec(r);a&&(r=a[1],s=a[3])}else s=t[3]?t[3].slice(1,-1):"";return r=r.trim(),/^</.test(r)&&(this.options.pedantic&&!/>$/.test(n)?r=r.slice(1):r=r.slice(1,-1)),Md(t,{href:r&&r.replace(this.rules.inline.anyPunctuation,"$1"),title:s&&s.replace(this.rules.inline.anyPunctuation,"$1")},t[0],this.lexer)}}reflink(e,t){let n;if((n=this.rules.inline.reflink.exec(e))||(n=this.rules.inline.nolink.exec(e))){const r=(n[2]||n[1]).replace(/\s+/g," "),s=t[r.toLowerCase()];if(!s){const a=n[0].charAt(0);return{type:"text",raw:a,text:a}}return Md(n,s,n[0],this.lexer)}}emStrong(e,t,n=""){let r=this.rules.inline.emStrongLDelim.exec(e);if(!r||r[3]&&n.match(/[\p{L}\p{N}]/u))return;if(!(r[1]||r[2]||"")||!n||this.rules.inline.punctuation.exec(n)){const a=[...r[0]].length-1;let o,l,c=a,u=0;const f=r[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(f.lastIndex=0,t=t.slice(-1*e.length+a);(r=f.exec(t))!=null;){if(o=r[1]||r[2]||r[3]||r[4]||r[5]||r[6],!o)continue;if(l=[...o].length,r[3]||r[4]){c+=l;continue}else if((r[5]||r[6])&&a%3&&!((a+l)%3)){u+=l;continue}if(c-=l,c>0)continue;l=Math.min(l,l+c+u);const h=[...r[0]][0].length,m=e.slice(0,a+r.index+h+l);if(Math.min(a,l)%2){const v=m.slice(1,-1);return{type:"em",raw:m,text:v,tokens:this.lexer.inlineTokens(v)}}const x=m.slice(2,-2);return{type:"strong",raw:m,text:x,tokens:this.lexer.inlineTokens(x)}}}}codespan(e){const t=this.rules.inline.code.exec(e);if(t){let n=t[2].replace(/\n/g," ");const r=/[^ ]/.test(n),s=/^ /.test(n)&&/ $/.test(n);return r&&s&&(n=n.substring(1,n.length-1)),n=Bn(n,!0),{type:"codespan",raw:t[0],text:n}}}br(e){const t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e){const t=this.rules.inline.del.exec(e);if(t)return{type:"del",raw:t[0],text:t[2],tokens:this.lexer.inlineTokens(t[2])}}autolink(e){const t=this.rules.inline.autolink.exec(e);if(t){let n,r;return t[2]==="@"?(n=Bn(t[1]),r="mailto:"+n):(n=Bn(t[1]),r=n),{type:"link",raw:t[0],text:n,href:r,tokens:[{type:"text",raw:n,text:n}]}}}url(e){var n;let t;if(t=this.rules.inline.url.exec(e)){let r,s;if(t[2]==="@")r=Bn(t[0]),s="mailto:"+r;else{let a;do a=t[0],t[0]=((n=this.rules.inline._backpedal.exec(t[0]))==null?void 0:n[0])??"";while(a!==t[0]);r=Bn(t[0]),t[1]==="www."?s="http://"+t[0]:s=t[0]}return{type:"link",raw:t[0],text:r,href:s,tokens:[{type:"text",raw:r,text:r}]}}}inlineText(e){const t=this.rules.inline.text.exec(e);if(t){let n;return this.lexer.state.inRawBlock?n=t[0]:n=Bn(t[0]),{type:"text",raw:t[0],text:n}}}}const T2=/^(?: *(?:\n|$))+/,C2=/^( {4}[^\n]+(?:\n(?: *(?:\n|$))*)?)+/,R2=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,ro=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,D2=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,pm=/(?:[*+-]|\d{1,9}[.)])/,mm=Tt(/^(?!bull |blockCode|fences|blockquote|heading|html)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html))+?)\n {0,3}(=+|-+) *(?:\n+|$)/).replace(/bull/g,pm).replace(/blockCode/g,/ {4}/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).getRegex(),Eh=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,P2=/^[^\n]+/,Sh=/(?!\s*\])(?:\\.|[^\[\]\\])+/,L2=Tt(/^ {0,3}\[(label)\]: *(?:\n *)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n *)?| *\n *)(title))? *(?:\n+|$)/).replace("label",Sh).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),F2=Tt(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,pm).getRegex(),dc="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",Mh=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,B2=Tt("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n *)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n *)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n *)+\\n|$))","i").replace("comment",Mh).replace("tag",dc).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),xm=Tt(Eh).replace("hr",ro).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",dc).getRegex(),I2=Tt(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",xm).getRegex(),wh={blockquote:I2,code:C2,def:L2,fences:R2,heading:D2,hr:ro,html:B2,lheading:mm,list:F2,newline:T2,paragraph:xm,table:ka,text:P2},wd=Tt("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",ro).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code"," {4}[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",dc).getRegex(),k2={...wh,table:wd,paragraph:Tt(Eh).replace("hr",ro).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",wd).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",dc).getRegex()},U2={...wh,html:Tt(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",Mh).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:ka,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:Tt(Eh).replace("hr",ro).replace("heading",` *#{1,6} *[^
]`).replace("lheading",mm).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},gm=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,N2=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,vm=/^( {2,}|\\)\n(?!\s*$)/,O2=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,so="\\p{P}\\p{S}",z2=Tt(/^((?![*_])[\spunctuation])/,"u").replace(/punctuation/g,so).getRegex(),H2=/\[[^[\]]*?\]\([^\(\)]*?\)|`[^`]*?`|<[^<>]*?>/g,G2=Tt(/^(?:\*+(?:((?!\*)[punct])|[^\s*]))|^_+(?:((?!_)[punct])|([^\s_]))/,"u").replace(/punct/g,so).getRegex(),V2=Tt("^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)[punct](\\*+)(?=[\\s]|$)|[^punct\\s](\\*+)(?!\\*)(?=[punct\\s]|$)|(?!\\*)[punct\\s](\\*+)(?=[^punct\\s])|[\\s](\\*+)(?!\\*)(?=[punct])|(?!\\*)[punct](\\*+)(?!\\*)(?=[punct])|[^punct\\s](\\*+)(?=[^punct\\s])","gu").replace(/punct/g,so).getRegex(),W2=Tt("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)[punct](_+)(?=[\\s]|$)|[^punct\\s](_+)(?!_)(?=[punct\\s]|$)|(?!_)[punct\\s](_+)(?=[^punct\\s])|[\\s](_+)(?!_)(?=[punct])|(?!_)[punct](_+)(?!_)(?=[punct])","gu").replace(/punct/g,so).getRegex(),X2=Tt(/\\([punct])/,"gu").replace(/punct/g,so).getRegex(),q2=Tt(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),$2=Tt(Mh).replace("(?:-->|$)","-->").getRegex(),Y2=Tt("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",$2).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),ec=/(?:\[(?:\\.|[^\[\]\\])*\]|\\.|`[^`]*`|[^\[\]\\`])*?/,j2=Tt(/^!?\[(label)\]\(\s*(href)(?:\s+(title))?\s*\)/).replace("label",ec).replace("href",/<(?:\\.|[^\n<>\\])+>|[^\s\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),_m=Tt(/^!?\[(label)\]\[(ref)\]/).replace("label",ec).replace("ref",Sh).getRegex(),bm=Tt(/^!?\[(ref)\](?:\[\])?/).replace("ref",Sh).getRegex(),K2=Tt("reflink|nolink(?!\\()","g").replace("reflink",_m).replace("nolink",bm).getRegex(),Ah={_backpedal:ka,anyPunctuation:X2,autolink:q2,blockSkip:H2,br:vm,code:N2,del:ka,emStrongLDelim:G2,emStrongRDelimAst:V2,emStrongRDelimUnd:W2,escape:gm,link:j2,nolink:bm,punctuation:z2,reflink:_m,reflinkSearch:K2,tag:Y2,text:O2,url:ka},Z2={...Ah,link:Tt(/^!?\[(label)\]\((.*?)\)/).replace("label",ec).getRegex(),reflink:Tt(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",ec).getRegex()},Vu={...Ah,escape:Tt(gm).replace("])","~|])").getRegex(),url:Tt(/^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/,"i").replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])([\s\S]*?[^\s~])\1(?=[^~]|$)/,text:/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/},Q2={...Vu,br:Tt(vm).replace("{2,}","*").getRegex(),text:Tt(Vu.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},Wo={normal:wh,gfm:k2,pedantic:U2},ba={normal:Ah,gfm:Vu,breaks:Q2,pedantic:Z2};class _i{constructor(e){xe(this,"tokens");xe(this,"options");xe(this,"state");xe(this,"tokenizer");xe(this,"inlineQueue");this.tokens=[],this.tokens.links=Object.create(null),this.options=e||as,this.options.tokenizer=this.options.tokenizer||new Jl,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};const t={block:Wo.normal,inline:ba.normal};this.options.pedantic?(t.block=Wo.pedantic,t.inline=ba.pedantic):this.options.gfm&&(t.block=Wo.gfm,this.options.breaks?t.inline=ba.breaks:t.inline=ba.gfm),this.tokenizer.rules=t}static get rules(){return{block:Wo,inline:ba}}static lex(e,t){return new _i(t).lex(e)}static lexInline(e,t){return new _i(t).inlineTokens(e)}lex(e){e=e.replace(/\r\n|\r/g,`
`),this.blockTokens(e,this.tokens);for(let t=0;t<this.inlineQueue.length;t++){const n=this.inlineQueue[t];this.inlineTokens(n.src,n.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(e,t=[]){this.options.pedantic?e=e.replace(/\t/g,"    ").replace(/^ +$/gm,""):e=e.replace(/^( *)(\t+)/gm,(o,l,c)=>l+"    ".repeat(c.length));let n,r,s,a;for(;e;)if(!(this.options.extensions&&this.options.extensions.block&&this.options.extensions.block.some(o=>(n=o.call({lexer:this},e,t))?(e=e.substring(n.raw.length),t.push(n),!0):!1))){if(n=this.tokenizer.space(e)){e=e.substring(n.raw.length),n.raw.length===1&&t.length>0?t[t.length-1].raw+=`
`:t.push(n);continue}if(n=this.tokenizer.code(e)){e=e.substring(n.raw.length),r=t[t.length-1],r&&(r.type==="paragraph"||r.type==="text")?(r.raw+=`
`+n.raw,r.text+=`
`+n.text,this.inlineQueue[this.inlineQueue.length-1].src=r.text):t.push(n);continue}if(n=this.tokenizer.fences(e)){e=e.substring(n.raw.length),t.push(n);continue}if(n=this.tokenizer.heading(e)){e=e.substring(n.raw.length),t.push(n);continue}if(n=this.tokenizer.hr(e)){e=e.substring(n.raw.length),t.push(n);continue}if(n=this.tokenizer.blockquote(e)){e=e.substring(n.raw.length),t.push(n);continue}if(n=this.tokenizer.list(e)){e=e.substring(n.raw.length),t.push(n);continue}if(n=this.tokenizer.html(e)){e=e.substring(n.raw.length),t.push(n);continue}if(n=this.tokenizer.def(e)){e=e.substring(n.raw.length),r=t[t.length-1],r&&(r.type==="paragraph"||r.type==="text")?(r.raw+=`
`+n.raw,r.text+=`
`+n.raw,this.inlineQueue[this.inlineQueue.length-1].src=r.text):this.tokens.links[n.tag]||(this.tokens.links[n.tag]={href:n.href,title:n.title});continue}if(n=this.tokenizer.table(e)){e=e.substring(n.raw.length),t.push(n);continue}if(n=this.tokenizer.lheading(e)){e=e.substring(n.raw.length),t.push(n);continue}if(s=e,this.options.extensions&&this.options.extensions.startBlock){let o=1/0;const l=e.slice(1);let c;this.options.extensions.startBlock.forEach(u=>{c=u.call({lexer:this},l),typeof c=="number"&&c>=0&&(o=Math.min(o,c))}),o<1/0&&o>=0&&(s=e.substring(0,o+1))}if(this.state.top&&(n=this.tokenizer.paragraph(s))){r=t[t.length-1],a&&r.type==="paragraph"?(r.raw+=`
`+n.raw,r.text+=`
`+n.text,this.inlineQueue.pop(),this.inlineQueue[this.inlineQueue.length-1].src=r.text):t.push(n),a=s.length!==e.length,e=e.substring(n.raw.length);continue}if(n=this.tokenizer.text(e)){e=e.substring(n.raw.length),r=t[t.length-1],r&&r.type==="text"?(r.raw+=`
`+n.raw,r.text+=`
`+n.text,this.inlineQueue.pop(),this.inlineQueue[this.inlineQueue.length-1].src=r.text):t.push(n);continue}if(e){const o="Infinite loop on byte: "+e.charCodeAt(0);if(this.options.silent){console.error(o);break}else throw new Error(o)}}return this.state.top=!0,t}inline(e,t=[]){return this.inlineQueue.push({src:e,tokens:t}),t}inlineTokens(e,t=[]){let n,r,s,a=e,o,l,c;if(this.tokens.links){const u=Object.keys(this.tokens.links);if(u.length>0)for(;(o=this.tokenizer.rules.inline.reflinkSearch.exec(a))!=null;)u.includes(o[0].slice(o[0].lastIndexOf("[")+1,-1))&&(a=a.slice(0,o.index)+"["+"a".repeat(o[0].length-2)+"]"+a.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(o=this.tokenizer.rules.inline.blockSkip.exec(a))!=null;)a=a.slice(0,o.index)+"["+"a".repeat(o[0].length-2)+"]"+a.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);for(;(o=this.tokenizer.rules.inline.anyPunctuation.exec(a))!=null;)a=a.slice(0,o.index)+"++"+a.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);for(;e;)if(l||(c=""),l=!1,!(this.options.extensions&&this.options.extensions.inline&&this.options.extensions.inline.some(u=>(n=u.call({lexer:this},e,t))?(e=e.substring(n.raw.length),t.push(n),!0):!1))){if(n=this.tokenizer.escape(e)){e=e.substring(n.raw.length),t.push(n);continue}if(n=this.tokenizer.tag(e)){e=e.substring(n.raw.length),r=t[t.length-1],r&&n.type==="text"&&r.type==="text"?(r.raw+=n.raw,r.text+=n.text):t.push(n);continue}if(n=this.tokenizer.link(e)){e=e.substring(n.raw.length),t.push(n);continue}if(n=this.tokenizer.reflink(e,this.tokens.links)){e=e.substring(n.raw.length),r=t[t.length-1],r&&n.type==="text"&&r.type==="text"?(r.raw+=n.raw,r.text+=n.text):t.push(n);continue}if(n=this.tokenizer.emStrong(e,a,c)){e=e.substring(n.raw.length),t.push(n);continue}if(n=this.tokenizer.codespan(e)){e=e.substring(n.raw.length),t.push(n);continue}if(n=this.tokenizer.br(e)){e=e.substring(n.raw.length),t.push(n);continue}if(n=this.tokenizer.del(e)){e=e.substring(n.raw.length),t.push(n);continue}if(n=this.tokenizer.autolink(e)){e=e.substring(n.raw.length),t.push(n);continue}if(!this.state.inLink&&(n=this.tokenizer.url(e))){e=e.substring(n.raw.length),t.push(n);continue}if(s=e,this.options.extensions&&this.options.extensions.startInline){let u=1/0;const f=e.slice(1);let h;this.options.extensions.startInline.forEach(m=>{h=m.call({lexer:this},f),typeof h=="number"&&h>=0&&(u=Math.min(u,h))}),u<1/0&&u>=0&&(s=e.substring(0,u+1))}if(n=this.tokenizer.inlineText(s)){e=e.substring(n.raw.length),n.raw.slice(-1)!=="_"&&(c=n.raw.slice(-1)),l=!0,r=t[t.length-1],r&&r.type==="text"?(r.raw+=n.raw,r.text+=n.text):t.push(n);continue}if(e){const u="Infinite loop on byte: "+e.charCodeAt(0);if(this.options.silent){console.error(u);break}else throw new Error(u)}}return t}}class tc{constructor(e){xe(this,"options");this.options=e||as}code(e,t,n){var s;const r=(s=(t||"").match(/^\S*/))==null?void 0:s[0];return e=e.replace(/\n$/,"")+`
`,r?'<pre><code class="language-'+Bn(r)+'">'+(n?e:Bn(e,!0))+`</code></pre>
`:"<pre><code>"+(n?e:Bn(e,!0))+`</code></pre>
`}blockquote(e){return`<blockquote>
${e}</blockquote>
`}html(e,t){return e}heading(e,t,n){return`<h${t}>${e}</h${t}>
`}hr(){return`<hr>
`}list(e,t,n){const r=t?"ol":"ul",s=t&&n!==1?' start="'+n+'"':"";return"<"+r+s+`>
`+e+"</"+r+`>
`}listitem(e,t,n){return`<li>${e}</li>
`}checkbox(e){return"<input "+(e?'checked="" ':"")+'disabled="" type="checkbox">'}paragraph(e){return`<p>${e}</p>
`}table(e,t){return t&&(t=`<tbody>${t}</tbody>`),`<table>
<thead>
`+e+`</thead>
`+t+`</table>
`}tablerow(e){return`<tr>
${e}</tr>
`}tablecell(e,t){const n=t.header?"th":"td";return(t.align?`<${n} align="${t.align}">`:`<${n}>`)+e+`</${n}>
`}strong(e){return`<strong>${e}</strong>`}em(e){return`<em>${e}</em>`}codespan(e){return`<code>${e}</code>`}br(){return"<br>"}del(e){return`<del>${e}</del>`}link(e,t,n){const r=Ed(e);if(r===null)return n;e=r;let s='<a href="'+e+'"';return t&&(s+=' title="'+t+'"'),s+=">"+n+"</a>",s}image(e,t,n){const r=Ed(e);if(r===null)return n;e=r;let s=`<img src="${e}" alt="${n}"`;return t&&(s+=` title="${t}"`),s+=">",s}text(e){return e}}class Th{strong(e){return e}em(e){return e}codespan(e){return e}del(e){return e}html(e){return e}text(e){return e}link(e,t,n){return""+n}image(e,t,n){return""+n}br(){return""}}class bi{constructor(e){xe(this,"options");xe(this,"renderer");xe(this,"textRenderer");this.options=e||as,this.options.renderer=this.options.renderer||new tc,this.renderer=this.options.renderer,this.renderer.options=this.options,this.textRenderer=new Th}static parse(e,t){return new bi(t).parse(e)}static parseInline(e,t){return new bi(t).parseInline(e)}parse(e,t=!0){let n="";for(let r=0;r<e.length;r++){const s=e[r];if(this.options.extensions&&this.options.extensions.renderers&&this.options.extensions.renderers[s.type]){const a=s,o=this.options.extensions.renderers[a.type].call({parser:this},a);if(o!==!1||!["space","hr","heading","code","table","blockquote","list","html","paragraph","text"].includes(a.type)){n+=o||"";continue}}switch(s.type){case"space":continue;case"hr":{n+=this.renderer.hr();continue}case"heading":{const a=s;n+=this.renderer.heading(this.parseInline(a.tokens),a.depth,S2(this.parseInline(a.tokens,this.textRenderer)));continue}case"code":{const a=s;n+=this.renderer.code(a.text,a.lang,!!a.escaped);continue}case"table":{const a=s;let o="",l="";for(let u=0;u<a.header.length;u++)l+=this.renderer.tablecell(this.parseInline(a.header[u].tokens),{header:!0,align:a.align[u]});o+=this.renderer.tablerow(l);let c="";for(let u=0;u<a.rows.length;u++){const f=a.rows[u];l="";for(let h=0;h<f.length;h++)l+=this.renderer.tablecell(this.parseInline(f[h].tokens),{header:!1,align:a.align[h]});c+=this.renderer.tablerow(l)}n+=this.renderer.table(o,c);continue}case"blockquote":{const a=s,o=this.parse(a.tokens);n+=this.renderer.blockquote(o);continue}case"list":{const a=s,o=a.ordered,l=a.start,c=a.loose;let u="";for(let f=0;f<a.items.length;f++){const h=a.items[f],m=h.checked,x=h.task;let v="";if(h.task){const d=this.renderer.checkbox(!!m);c?h.tokens.length>0&&h.tokens[0].type==="paragraph"?(h.tokens[0].text=d+" "+h.tokens[0].text,h.tokens[0].tokens&&h.tokens[0].tokens.length>0&&h.tokens[0].tokens[0].type==="text"&&(h.tokens[0].tokens[0].text=d+" "+h.tokens[0].tokens[0].text)):h.tokens.unshift({type:"text",text:d+" "}):v+=d+" "}v+=this.parse(h.tokens,c),u+=this.renderer.listitem(v,x,!!m)}n+=this.renderer.list(u,o,l);continue}case"html":{const a=s;n+=this.renderer.html(a.text,a.block);continue}case"paragraph":{const a=s;n+=this.renderer.paragraph(this.parseInline(a.tokens));continue}case"text":{let a=s,o=a.tokens?this.parseInline(a.tokens):a.text;for(;r+1<e.length&&e[r+1].type==="text";)a=e[++r],o+=`
`+(a.tokens?this.parseInline(a.tokens):a.text);n+=t?this.renderer.paragraph(o):o;continue}default:{const a='Token with "'+s.type+'" type was not found.';if(this.options.silent)return console.error(a),"";throw new Error(a)}}}return n}parseInline(e,t){t=t||this.renderer;let n="";for(let r=0;r<e.length;r++){const s=e[r];if(this.options.extensions&&this.options.extensions.renderers&&this.options.extensions.renderers[s.type]){const a=this.options.extensions.renderers[s.type].call({parser:this},s);if(a!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(s.type)){n+=a||"";continue}}switch(s.type){case"escape":{const a=s;n+=t.text(a.text);break}case"html":{const a=s;n+=t.html(a.text);break}case"link":{const a=s;n+=t.link(a.href,a.title,this.parseInline(a.tokens,t));break}case"image":{const a=s;n+=t.image(a.href,a.title,a.text);break}case"strong":{const a=s;n+=t.strong(this.parseInline(a.tokens,t));break}case"em":{const a=s;n+=t.em(this.parseInline(a.tokens,t));break}case"codespan":{const a=s;n+=t.codespan(a.text);break}case"br":{n+=t.br();break}case"del":{const a=s;n+=t.del(this.parseInline(a.tokens,t));break}case"text":{const a=s;n+=t.text(a.text);break}default:{const a='Token with "'+s.type+'" type was not found.';if(this.options.silent)return console.error(a),"";throw new Error(a)}}}return n}}class Ua{constructor(e){xe(this,"options");this.options=e||as}preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}}xe(Ua,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens"]));var es,Wu,ym;class J2{constructor(...e){ht(this,es);xe(this,"defaults",yh());xe(this,"options",this.setOptions);xe(this,"parse",kt(this,es,Wu).call(this,_i.lex,bi.parse));xe(this,"parseInline",kt(this,es,Wu).call(this,_i.lexInline,bi.parseInline));xe(this,"Parser",bi);xe(this,"Renderer",tc);xe(this,"TextRenderer",Th);xe(this,"Lexer",_i);xe(this,"Tokenizer",Jl);xe(this,"Hooks",Ua);this.use(...e)}walkTokens(e,t){var r,s;let n=[];for(const a of e)switch(n=n.concat(t.call(this,a)),a.type){case"table":{const o=a;for(const l of o.header)n=n.concat(this.walkTokens(l.tokens,t));for(const l of o.rows)for(const c of l)n=n.concat(this.walkTokens(c.tokens,t));break}case"list":{const o=a;n=n.concat(this.walkTokens(o.items,t));break}default:{const o=a;(s=(r=this.defaults.extensions)==null?void 0:r.childTokens)!=null&&s[o.type]?this.defaults.extensions.childTokens[o.type].forEach(l=>{const c=o[l].flat(1/0);n=n.concat(this.walkTokens(c,t))}):o.tokens&&(n=n.concat(this.walkTokens(o.tokens,t)))}}return n}use(...e){const t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(n=>{const r={...n};if(r.async=this.defaults.async||r.async||!1,n.extensions&&(n.extensions.forEach(s=>{if(!s.name)throw new Error("extension name required");if("renderer"in s){const a=t.renderers[s.name];a?t.renderers[s.name]=function(...o){let l=s.renderer.apply(this,o);return l===!1&&(l=a.apply(this,o)),l}:t.renderers[s.name]=s.renderer}if("tokenizer"in s){if(!s.level||s.level!=="block"&&s.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");const a=t[s.level];a?a.unshift(s.tokenizer):t[s.level]=[s.tokenizer],s.start&&(s.level==="block"?t.startBlock?t.startBlock.push(s.start):t.startBlock=[s.start]:s.level==="inline"&&(t.startInline?t.startInline.push(s.start):t.startInline=[s.start]))}"childTokens"in s&&s.childTokens&&(t.childTokens[s.name]=s.childTokens)}),r.extensions=t),n.renderer){const s=this.defaults.renderer||new tc(this.defaults);for(const a in n.renderer){if(!(a in s))throw new Error(`renderer '${a}' does not exist`);if(a==="options")continue;const o=a,l=n.renderer[o],c=s[o];s[o]=(...u)=>{let f=l.apply(s,u);return f===!1&&(f=c.apply(s,u)),f||""}}r.renderer=s}if(n.tokenizer){const s=this.defaults.tokenizer||new Jl(this.defaults);for(const a in n.tokenizer){if(!(a in s))throw new Error(`tokenizer '${a}' does not exist`);if(["options","rules","lexer"].includes(a))continue;const o=a,l=n.tokenizer[o],c=s[o];s[o]=(...u)=>{let f=l.apply(s,u);return f===!1&&(f=c.apply(s,u)),f}}r.tokenizer=s}if(n.hooks){const s=this.defaults.hooks||new Ua;for(const a in n.hooks){if(!(a in s))throw new Error(`hook '${a}' does not exist`);if(a==="options")continue;const o=a,l=n.hooks[o],c=s[o];Ua.passThroughHooks.has(a)?s[o]=u=>{if(this.defaults.async)return Promise.resolve(l.call(s,u)).then(h=>c.call(s,h));const f=l.call(s,u);return c.call(s,f)}:s[o]=(...u)=>{let f=l.apply(s,u);return f===!1&&(f=c.apply(s,u)),f}}r.hooks=s}if(n.walkTokens){const s=this.defaults.walkTokens,a=n.walkTokens;r.walkTokens=function(o){let l=[];return l.push(a.call(this,o)),s&&(l=l.concat(s.call(this,o))),l}}this.defaults={...this.defaults,...r}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return _i.lex(e,t??this.defaults)}parser(e,t){return bi.parse(e,t??this.defaults)}}es=new WeakSet,Wu=function(e,t){return(n,r)=>{const s={...r},a={...this.defaults,...s};this.defaults.async===!0&&s.async===!1&&(a.silent||console.warn("marked(): The async option was set to true by an extension. The async: false option sent to parse will be ignored."),a.async=!0);const o=kt(this,es,ym).call(this,!!a.silent,!!a.async);if(typeof n>"u"||n===null)return o(new Error("marked(): input parameter is undefined or null"));if(typeof n!="string")return o(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(n)+", string expected"));if(a.hooks&&(a.hooks.options=a),a.async)return Promise.resolve(a.hooks?a.hooks.preprocess(n):n).then(l=>e(l,a)).then(l=>a.hooks?a.hooks.processAllTokens(l):l).then(l=>a.walkTokens?Promise.all(this.walkTokens(l,a.walkTokens)).then(()=>l):l).then(l=>t(l,a)).then(l=>a.hooks?a.hooks.postprocess(l):l).catch(o);try{a.hooks&&(n=a.hooks.preprocess(n));let l=e(n,a);a.hooks&&(l=a.hooks.processAllTokens(l)),a.walkTokens&&this.walkTokens(l,a.walkTokens);let c=t(l,a);return a.hooks&&(c=a.hooks.postprocess(c)),c}catch(l){return o(l)}}},ym=function(e,t){return n=>{if(n.message+=`
Please report this to https://github.com/markedjs/marked.`,e){const r="<p>An error occurred:</p><pre>"+Bn(n.message+"",!0)+"</pre>";return t?Promise.resolve(r):r}if(t)return Promise.reject(n);throw n}};const Jr=new J2;function Mt(i,e){return Jr.parse(i,e)}Mt.options=Mt.setOptions=function(i){return Jr.setOptions(i),Mt.defaults=Jr.defaults,hm(Mt.defaults),Mt};Mt.getDefaults=yh;Mt.defaults=as;Mt.use=function(...i){return Jr.use(...i),Mt.defaults=Jr.defaults,hm(Mt.defaults),Mt};Mt.walkTokens=function(i,e){return Jr.walkTokens(i,e)};Mt.parseInline=Jr.parseInline;Mt.Parser=bi;Mt.parser=bi.parse;Mt.Renderer=tc;Mt.TextRenderer=Th;Mt.Lexer=_i;Mt.lexer=_i.lex;Mt.Tokenizer=Jl;Mt.Hooks=Ua;Mt.parse=Mt;Mt.options;Mt.setOptions;Mt.use;Mt.walkTokens;Mt.parseInline;bi.parse;_i.lex;var ew=et('<div id="preview-overlay"><div id="preview-box" class="svelte-vqphcb"><div id="preview-header" class="svelte-vqphcb"><div><span id="preview-title" class="svelte-vqphcb">PREVIEW</span> <span id="preview-file" class="svelte-vqphcb"> </span></div> <button id="preview-close" class="svelte-vqphcb">ESC Close</button></div> <div id="preview-toolbar" class="svelte-vqphcb"><div class="preview-tool-group svelte-vqphcb"><span class="preview-tool-label svelte-vqphcb">Width</span> <input type="range" id="preview-width-slider" min="50" max="100" step="5" title="Popup width ([ ] keys to step)" class="svelte-vqphcb"/> <span id="preview-width-val" class="svelte-vqphcb"> </span></div> <div id="preview-search-wrap" class="svelte-vqphcb"><input type="text" id="preview-search" placeholder="Search in document..." class="svelte-vqphcb"/> <button id="preview-search-clear">&times;</button></div> <span id="preview-search-count" class="svelte-vqphcb"> </span></div> <div id="preview-content" class="svelte-vqphcb"></div></div></div>');function tw(i,e){jt(e,!0);let t=Le(!1),n=Le(null),r=Le(80),s=Le("");wt(()=>{const R=ch.subscribe(J=>{Se(t,J,!0)}),N=uh.subscribe(J=>{Se(n,J,!0)}),$=Au.subscribe(J=>{Se(r,J,!0)}),he=Dl.subscribe(J=>{Se(s,J,!0)});return()=>{R(),N(),$(),he()}});let a=Le(""),o=Le(null);wt(()=>{if(!L(n)){Se(a,"");return}try{Se(a,Mt.parse(L(n).preview??"*No content available*"),!0)}catch{Se(a,"<pre>"+g(L(n).preview??"No content")+"</pre>")}}),wt(()=>{L(o)&&(L(o).innerHTML=L(a),L(o).scrollTop=0,v())}),wt(()=>{document.documentElement.style.setProperty("--preview-w",L(r)+"%")});let l=null,c=Le(-1),u=Le(""),f=Le("");function h(R){if(Se(f,R,!0),Dl.set(R),!L(o))return;if(L(o).innerHTML=L(a),l=null,Se(c,-1),!R){Se(u,"");return}const N=R.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),$=new RegExp(N,"gi"),he=document.createTreeWalker(L(o),NodeFilter.SHOW_TEXT,null),J=[];for(;he.nextNode();)J.push(he.currentNode);let se=0;J.forEach(V=>{const ie=V.nodeValue??"";if(!$.test(ie))return;$.lastIndex=0;const O=document.createDocumentFragment();let le=0,ce;for(;(ce=$.exec(ie))!==null;){ce.index>le&&O.appendChild(document.createTextNode(ie.slice(le,ce.index)));const ve=document.createElement("mark");ve.textContent=ce[0],ve.dataset.matchIdx=String(se++),O.appendChild(ve),le=$.lastIndex}le<ie.length&&O.appendChild(document.createTextNode(ie.slice(le))),V.parentNode.replaceChild(O,V)}),l=L(o).querySelectorAll("mark"),Se(u,se>0?`${se} found`:"No matches",!0),l.length>0&&(Se(c,0),m(0))}function m(R){if(!l||l.length===0)return;l.forEach($=>$.classList.remove("current"));const N=l[R];N&&(N.classList.add("current"),N.scrollIntoView({behavior:"smooth",block:"center"}))}function x(R){R.key==="Enter"&&(!l||l.length===0||(R.preventDefault(),Se(c,(L(c)+1)%l.length),m(L(c)),Se(u,`${L(c)+1} / ${l.length}`)))}function v(){Se(f,""),Se(u,""),l=null,Se(c,-1),Dl.set(""),L(o)&&(L(o).innerHTML=L(a))}function d(R){const N=Math.max(50,Math.min(100,R));Au.set(N)}function p(R){d(parseInt(R.target.value,10))}function _(R){if(!L(t))return;const N=R.target.tagName;N==="INPUT"||N==="TEXTAREA"||(R.key==="Escape"?(R.preventDefault(),ho()):R.key==="["?(R.preventDefault(),d(L(r)-5)):R.key==="]"&&(R.preventDefault(),d(L(r)+5)))}function g(R){return R.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}var b=ew();xp("keydown",Kd,_);let w;var S=ue(b),M=ue(S),I=ue(M),E=ae(ue(I),2),y=ue(E),P=ae(I,2),U=ae(M,2),G=ue(U),F=ae(ue(G),2),z=ae(F,2),q=ue(z),ee=ae(G,2),Z=ue(ee),Q=ae(Z,2);let j;var W=ae(ee,2),C=ue(W),A=ae(U,2);Oa(A,R=>Se(o,R),()=>L(o)),St(()=>{var R;w=je(b,1,"svelte-vqphcb",null,w,{show:L(t)}),yi(S,`width:${L(r)??""}%`),pt(y,((R=L(n))==null?void 0:R.file)??""),ii(F,L(r)),pt(q,`${L(r)??""}%`),ii(Z,L(f)),j=je(Q,1,"svelte-vqphcb",null,j,{show:L(f).length>0}),pt(C,L(u))}),De("click",P,function(...R){ho==null||ho.apply(this,R)}),De("input",F,p),De("input",Z,R=>h(R.target.value.trim())),De("keydown",Z,x),De("click",Q,()=>{var R;v(),(R=document.getElementById("preview-search"))==null||R.focus()}),Ke(i,b),Kt()}hi(["click","input","keydown"]);var nw=et("<!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!>",1),iw=et("<!> <!> <!> <!> <!>",1);function rw(i,e){jt(e,!0);let t=Le(!1),n=Le(!1),r=Le(Lt({w:!1,a:!1,s:!1,d:!1,q:!1,shift:!1})),s=Le(0);wt(()=>Wi.subscribe(p=>{document.documentElement.dataset.theme=p})),Ja(async()=>{await ag(),Se(t,!0)});function a(){Se(n,!0)}function o(){Se(n,!1)}function l(d){Se(r,d.keys,!0),Se(s,d.speed,!0)}var c=iw(),u=an(c);cg(u);var f=ae(u,2);gg(f,{});var h=ae(f,2);_g(h,{});var m=ae(h,2);hg(m);var x=ae(m,2);{var v=d=>{var p=nw(),_=an(p);x2(_,{onwasdupdate:l});var g=ae(_,2);yg(g,{});var b=ae(g,2);Sg(b,{});var w=ae(b,2);Ag(w,{});var S=ae(w,2);h_(S,{onwasdguide:a});var M=ae(S,2);Cg(M,{});var I=ae(M,2);p_(I,{});var E=ae(I,2);x_(E,{});var y=ae(E,2);T_(y,{});var P=ae(y,2);P_(P,{});var U=ae(P,2);H_(U,{});var G=ae(U,2);v2(G,{get keys(){return L(r)},get speed(){return L(s)}});var F=ae(G,2);yp(F,{get visible(){return L(n)},get keys(){return L(r)},onclose:o});var z=ae(F,2);tw(z,{}),Ke(d,p)};rn(x,d=>{L(t)&&d(v)})}Ke(i,c),Kt()}const sw=["dark","light","fire","winter","galaxy","electric"],su=new Map;function aw(i,e,t=80){const n=su.get(i);n&&clearTimeout(n),su.set(i,setTimeout(()=>{Wl(i,e),su.delete(i)},t))}function tn(i,e,t){return{store:i,key:e,load:()=>Va(e,t)}}function Qi(i,e,t,n,r){return{store:i,key:e,load:()=>t_(e,t,n,r),debounce:!0}}function ow(){return[{store:Wi,key:"app.theme",load:()=>e_("app.theme","dark",sw)},Qi(kr,"app.glow",.35,0,1),tn(Ga,"globe.autoRotate",!0),tn(Nl,"globe.wireframe",!0),tn(Ol,"globe.dots",!0),tn(zl,"globe.links",!0),tn(Hl,"globe.pulse",!0),tn(ea,"globe.comet",!0),Qi(Gl,"globe.pulseSpeed",.6,.1,2),Qi(Vl,"globe.rotateSpeed",.35,.05,2),Qi(Mu,"globe.zoom",55,10,100),Qi(kl,"fx.density",1,.1,2),Qi(Ul,"fx.speed",1,.25,3),tn(Ma,"fx.nebula",!0),tn(wa,"fx.glitter",!0),tn(Aa,"fx.shootStars",!0),tn(Ta,"fx.embers",!0),tn(Ca,"fx.snowflakes",!0),tn(Ra,"fx.lightning",!0),tn(Da,"fx.elecArcs",!0),tn(Pa,"fx.plasmaAura",!0),tn(La,"fx.bgStars",!0),tn(Fa,"fx.bgMesh",!0),tn(Is,"fx.border",!0),Qi(za,"fx.borderIntensity",1,.2,2),Qi(Ha,"fx.borderSpeed",1,.25,3)]}function lw(){const i=ow(),e=[];for(const t of i){const n=t.load();t.store.set(n);let r=!0;const s=t.store.subscribe(a=>{if(r){r=!1;return}t.debounce?aw(t.key,a):Wl(t.key,a)});e.push(s)}return()=>e.forEach(t=>t())}lw();document.documentElement.dataset.theme=Wt(Wi);Nx(rw,{target:document.getElementById("app")});

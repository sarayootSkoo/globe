var tp=Object.defineProperty;var iu=i=>{throw TypeError(i)};var np=(i,e,t)=>e in i?tp(i,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):i[e]=t;var he=(i,e,t)=>np(i,typeof e!="symbol"?e+"":e,t),Go=(i,e,t)=>e.has(i)||iu("Cannot "+t);var K=(i,e,t)=>(Go(i,e,"read from private field"),t?t.call(i):e.get(i)),et=(i,e,t)=>e.has(i)?iu("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(i):e.set(i,t),Ke=(i,e,t,n)=>(Go(i,e,"write to private field"),n?n.call(i,t):e.set(i,t),t),wt=(i,e,t)=>(Go(i,e,"access private method"),t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function t(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(s){if(s.ep)return;s.ep=!0;const r=t(s);fetch(s.href,r)}})();const Tl=!1;var uf=Array.isArray,ip=Array.prototype.indexOf,br=Array.prototype.includes,Po=Array.from,hf=Object.defineProperty,jr=Object.getOwnPropertyDescriptor,ff=Object.getOwnPropertyDescriptors,sp=Object.prototype,rp=Array.prototype,gc=Object.getPrototypeOf,su=Object.isExtensible;const wi=()=>{};function ap(i){return i()}function uo(i){for(var e=0;e<i.length;e++)i[e]()}function df(){var i,e,t=new Promise((n,s)=>{i=n,e=s});return{promise:t,resolve:i,reject:e}}function op(i,e){if(Array.isArray(i))return i;if(!(Symbol.iterator in i))return Array.from(i);const t=[];for(const n of i)if(t.push(n),t.length===e)break;return t}const jt=2,Ur=4,As=8,_c=1<<24,es=16,$n=32,Ns=64,Al=128,Dn=512,Yt=1024,$t=2048,qn=4096,sn=8192,Ti=16384,Ir=32768,Er=65536,ru=1<<17,lp=1<<18,Nr=1<<19,pf=1<<20,ni=1<<25,Rs=65536,Rl=1<<21,vc=1<<22,Wi=1<<23,fr=Symbol("$state"),cp=Symbol(""),ps=new class extends Error{constructor(){super(...arguments);he(this,"name","StaleReactionError");he(this,"message","The reaction that called `getAbortSignal()` was re-run or destroyed")}};var of;const up=!!((of=globalThis.document)!=null&&of.contentType)&&globalThis.document.contentType.includes("xml");function mf(i){throw new Error("https://svelte.dev/e/lifecycle_outside_component")}function hp(){throw new Error("https://svelte.dev/e/async_derived_orphan")}function fp(i,e,t){throw new Error("https://svelte.dev/e/each_key_duplicate")}function dp(i){throw new Error("https://svelte.dev/e/effect_in_teardown")}function pp(){throw new Error("https://svelte.dev/e/effect_in_unowned_derived")}function mp(i){throw new Error("https://svelte.dev/e/effect_orphan")}function gp(){throw new Error("https://svelte.dev/e/effect_update_depth_exceeded")}function _p(){throw new Error("https://svelte.dev/e/state_descriptors_fixed")}function vp(){throw new Error("https://svelte.dev/e/state_prototype_fixed")}function xp(){throw new Error("https://svelte.dev/e/state_unsafe_mutation")}function yp(){throw new Error("https://svelte.dev/e/svelte_boundary_reset_onerror")}const Mp=1,Sp=2,gf=4,bp=8,Ep=16,wp=1,Tp=2,Wt=Symbol(),_f="http://www.w3.org/1999/xhtml";function Ap(){console.warn("https://svelte.dev/e/svelte_boundary_reset_noop")}function vf(i){return i===this.v}function xf(i,e){return i!=i?e==e:i!==e||i!==null&&typeof i=="object"||typeof i=="function"}function yf(i){return!xf(i,this.v)}let ca=!1,Rp=!1;function Cp(){ca=!0}let At=null;function wr(i){At=i}function Gt(i,e=!1,t){At={p:At,i:!1,c:null,e:null,s:i,x:null,l:ca&&!e?{s:null,u:null,$:[]}:null}}function Vt(i){var e=At,t=e.e;if(t!==null){e.e=null;for(var n of t)kf(n)}return e.i=!0,At=e.p,{}}function ua(){return!ca||At!==null&&At.l===null}let lr=[];function Pp(){var i=lr;lr=[],uo(i)}function Ai(i){if(lr.length===0){var e=lr;queueMicrotask(()=>{e===lr&&Pp()})}lr.push(i)}function Mf(i){var e=ct;if(e===null)return tt.f|=Wi,i;if((e.f&Ir)===0&&(e.f&Ur)===0)throw i;Bi(i,e)}function Bi(i,e){for(;e!==null;){if((e.f&Al)!==0){if((e.f&Ir)===0)throw i;try{e.b.error(i);return}catch(t){i=t}}e=e.parent}throw i}const Lp=-7169;function Lt(i,e){i.f=i.f&Lp|e}function xc(i){(i.f&Dn)!==0||i.deps===null?Lt(i,Yt):Lt(i,qn)}function Sf(i){if(i!==null)for(const e of i)(e.f&jt)===0||(e.f&Rs)===0||(e.f^=Rs,Sf(e.deps))}function bf(i,e,t){(i.f&$t)!==0?e.add(i):(i.f&qn)!==0&&t.add(i),Sf(i.deps),Lt(i,Yt)}const Ma=new Set;let ht=null,Xt=null,Tn=[],yc=null,Tr=null,Dp=1;var Fi,mr,_s,gr,_r,vr,ki,Zn,xr,dn,Cl,Pl,Ll,Dl;const Kc=class Kc{constructor(){et(this,dn);he(this,"id",Dp++);he(this,"current",new Map);he(this,"previous",new Map);et(this,Fi,new Set);et(this,mr,new Set);et(this,_s,0);et(this,gr,0);et(this,_r,null);et(this,vr,new Set);et(this,ki,new Set);et(this,Zn,new Map);he(this,"is_fork",!1);et(this,xr,!1)}skip_effect(e){K(this,Zn).has(e)||K(this,Zn).set(e,{d:[],m:[]})}unskip_effect(e){var t=K(this,Zn).get(e);if(t){K(this,Zn).delete(e);for(var n of t.d)Lt(n,$t),ii(n);for(n of t.m)Lt(n,qn),ii(n)}}process(e){var s;Tn=[],this.apply();var t=Tr=[],n=[];for(const r of e)wt(this,dn,Pl).call(this,r,t,n);if(Tr=null,wt(this,dn,Cl).call(this)){wt(this,dn,Ll).call(this,n),wt(this,dn,Ll).call(this,t);for(const[r,a]of K(this,Zn))Tf(r,a)}else{ht=null;for(const r of K(this,Fi))r(this);K(this,Fi).clear(),K(this,_s)===0&&wt(this,dn,Dl).call(this),au(n),au(t),K(this,vr).clear(),K(this,ki).clear(),(s=K(this,_r))==null||s.resolve()}Xt=null}capture(e,t){t!==Wt&&!this.previous.has(e)&&this.previous.set(e,t),(e.f&Wi)===0&&(this.current.set(e,e.v),Xt==null||Xt.set(e,e.v))}activate(){ht=this,this.apply()}deactivate(){ht===this&&(ht=null,Xt=null)}flush(){var e;if(Tn.length>0)ht=this,Up();else if(K(this,_s)===0&&!this.is_fork){for(const t of K(this,Fi))t(this);K(this,Fi).clear(),wt(this,dn,Dl).call(this),(e=K(this,_r))==null||e.resolve()}this.deactivate()}discard(){for(const e of K(this,mr))e(this);K(this,mr).clear()}increment(e){Ke(this,_s,K(this,_s)+1),e&&Ke(this,gr,K(this,gr)+1)}decrement(e){Ke(this,_s,K(this,_s)-1),e&&Ke(this,gr,K(this,gr)-1),!K(this,xr)&&(Ke(this,xr,!0),Ai(()=>{Ke(this,xr,!1),wt(this,dn,Cl).call(this)?Tn.length>0&&this.flush():this.revive()}))}revive(){for(const e of K(this,vr))K(this,ki).delete(e),Lt(e,$t),ii(e);for(const e of K(this,ki))Lt(e,qn),ii(e);this.flush()}oncommit(e){K(this,Fi).add(e)}ondiscard(e){K(this,mr).add(e)}settled(){return(K(this,_r)??Ke(this,_r,df())).promise}static ensure(){if(ht===null){const e=ht=new Kc;Ma.add(ht),Ai(()=>{ht===e&&e.flush()})}return ht}apply(){}};Fi=new WeakMap,mr=new WeakMap,_s=new WeakMap,gr=new WeakMap,_r=new WeakMap,vr=new WeakMap,ki=new WeakMap,Zn=new WeakMap,xr=new WeakMap,dn=new WeakSet,Cl=function(){return this.is_fork||K(this,gr)>0},Pl=function(e,t,n){e.f^=Yt;for(var s=e.first;s!==null;){var r=s.f,a=(r&($n|Ns))!==0,o=a&&(r&Yt)!==0,l=(r&sn)!==0,c=o||K(this,Zn).has(s);if(!c&&s.fn!==null){a?l||(s.f^=Yt):(r&Ur)!==0?t.push(s):(r&(As|_c))!==0&&l?n.push(s):fa(s)&&(Rr(s),(r&es)!==0&&(K(this,ki).add(s),l&&Lt(s,$t)));var u=s.first;if(u!==null){s=u;continue}}for(;s!==null;){var h=s.next;if(h!==null){s=h;break}s=s.parent}}},Ll=function(e){for(var t=0;t<e.length;t+=1)bf(e[t],K(this,vr),K(this,ki))},Dl=function(){var r;if(Ma.size>1){this.previous.clear();var e=ht,t=Xt,n=!0;for(const a of Ma){if(a===this){n=!1;continue}const o=[];for(const[c,u]of this.current){if(a.current.has(c))if(n&&u!==a.current.get(c))a.current.set(c,u);else continue;o.push(c)}if(o.length===0)continue;const l=[...a.current.keys()].filter(c=>!this.current.has(c));if(l.length>0){var s=Tn;Tn=[];const c=new Set,u=new Map;for(const h of o)Ef(h,l,c,u);if(Tn.length>0){ht=a,a.apply();for(const h of Tn)wt(r=a,dn,Pl).call(r,h,[],[]);a.deactivate()}Tn=s}}ht=e,Xt=t}K(this,Zn).clear(),Ma.delete(this)};let Xi=Kc;function Up(){var i=null;try{for(var e=0;Tn.length>0;){var t=Xi.ensure();if(e++>1e3){var n,s;Ip()}t.process(Tn),qi.clear()}}finally{Tn=[],yc=null,Tr=null}}function Ip(){try{gp()}catch(i){Bi(i,yc)}}let zn=null;function au(i){var e=i.length;if(e!==0){for(var t=0;t<e;){var n=i[t++];if((n.f&(Ti|sn))===0&&fa(n)&&(zn=new Set,Rr(n),n.deps===null&&n.first===null&&n.nodes===null&&n.teardown===null&&n.ac===null&&Hf(n),(zn==null?void 0:zn.size)>0)){qi.clear();for(const s of zn){if((s.f&(Ti|sn))!==0)continue;const r=[s];let a=s.parent;for(;a!==null;)zn.has(a)&&(zn.delete(a),r.push(a)),a=a.parent;for(let o=r.length-1;o>=0;o--){const l=r[o];(l.f&(Ti|sn))===0&&Rr(l)}}zn.clear()}}zn=null}}function Ef(i,e,t,n){if(!t.has(i)&&(t.add(i),i.reactions!==null))for(const s of i.reactions){const r=s.f;(r&jt)!==0?Ef(s,e,t,n):(r&(vc|es))!==0&&(r&$t)===0&&wf(s,e,n)&&(Lt(s,$t),ii(s))}}function wf(i,e,t){const n=t.get(i);if(n!==void 0)return n;if(i.deps!==null)for(const s of i.deps){if(br.call(e,s))return!0;if((s.f&jt)!==0&&wf(s,e,t))return t.set(s,!0),!0}return t.set(i,!1),!1}function ii(i){var e=yc=i,t=e.b;if(t!=null&&t.is_pending&&(i.f&(Ur|As|_c))!==0&&(i.f&Ir)===0){t.defer_effect(i);return}for(;e.parent!==null;){e=e.parent;var n=e.f;if(Tr!==null&&e===ct&&(i.f&As)===0)return;if((n&(Ns|$n))!==0){if((n&Yt)===0)return;e.f^=Yt}}Tn.push(e)}function Tf(i,e){if(!((i.f&$n)!==0&&(i.f&Yt)!==0)){(i.f&$t)!==0?e.d.push(i):(i.f&qn)!==0&&e.m.push(i),Lt(i,Yt);for(var t=i.first;t!==null;)Tf(t,e),t=t.next}}function Np(i){let e=0,t=Cs(0),n;return()=>{Ec()&&(P(t),zf(()=>(e===0&&(n=ts(()=>i(()=>Kr(t)))),e+=1,()=>{Ai(()=>{e-=1,e===0&&(n==null||n(),n=void 0,Kr(t))})})))}}var Op=Er|Nr;function Fp(i,e,t,n){new kp(i,e,t,n)}var wn,mc,Jn,vs,on,Qn,vn,Bn,_i,xs,zi,yr,Mr,Sr,vi,Ro,Ot,zp,Bp,Hp,Ul,so,ro,Il;class kp{constructor(e,t,n,s){et(this,Ot);he(this,"parent");he(this,"is_pending",!1);he(this,"transform_error");et(this,wn);et(this,mc,null);et(this,Jn);et(this,vs);et(this,on);et(this,Qn,null);et(this,vn,null);et(this,Bn,null);et(this,_i,null);et(this,xs,0);et(this,zi,0);et(this,yr,!1);et(this,Mr,new Set);et(this,Sr,new Set);et(this,vi,null);et(this,Ro,Np(()=>(Ke(this,vi,Cs(K(this,xs))),()=>{Ke(this,vi,null)})));var r;Ke(this,wn,e),Ke(this,Jn,t),Ke(this,vs,a=>{var o=ct;o.b=this,o.f|=Al,n(a)}),this.parent=ct.b,this.transform_error=s??((r=this.parent)==null?void 0:r.transform_error)??(a=>a),Ke(this,on,Tc(()=>{wt(this,Ot,Ul).call(this)},Op))}defer_effect(e){bf(e,K(this,Mr),K(this,Sr))}is_rendered(){return!this.is_pending&&(!this.parent||this.parent.is_rendered())}has_pending_snippet(){return!!K(this,Jn).pending}update_pending_count(e){wt(this,Ot,Il).call(this,e),Ke(this,xs,K(this,xs)+e),!(!K(this,vi)||K(this,yr))&&(Ke(this,yr,!0),Ai(()=>{Ke(this,yr,!1),K(this,vi)&&Ar(K(this,vi),K(this,xs))}))}get_effect_pending(){return K(this,Ro).call(this),P(K(this,vi))}error(e){var t=K(this,Jn).onerror;let n=K(this,Jn).failed;if(!t&&!n)throw e;K(this,Qn)&&(cn(K(this,Qn)),Ke(this,Qn,null)),K(this,vn)&&(cn(K(this,vn)),Ke(this,vn,null)),K(this,Bn)&&(cn(K(this,Bn)),Ke(this,Bn,null));var s=!1,r=!1;const a=()=>{if(s){Ap();return}s=!0,r&&yp(),K(this,Bn)!==null&&Ms(K(this,Bn),()=>{Ke(this,Bn,null)}),wt(this,Ot,ro).call(this,()=>{Xi.ensure(),wt(this,Ot,Ul).call(this)})},o=l=>{try{r=!0,t==null||t(l,a),r=!1}catch(c){Bi(c,K(this,on)&&K(this,on).parent)}n&&Ke(this,Bn,wt(this,Ot,ro).call(this,()=>{Xi.ensure();try{return An(()=>{var c=ct;c.b=this,c.f|=Al,n(K(this,wn),()=>l,()=>a)})}catch(c){return Bi(c,K(this,on).parent),null}}))};Ai(()=>{var l;try{l=this.transform_error(e)}catch(c){Bi(c,K(this,on)&&K(this,on).parent);return}l!==null&&typeof l=="object"&&typeof l.then=="function"?l.then(o,c=>Bi(c,K(this,on)&&K(this,on).parent)):o(l)})}}wn=new WeakMap,mc=new WeakMap,Jn=new WeakMap,vs=new WeakMap,on=new WeakMap,Qn=new WeakMap,vn=new WeakMap,Bn=new WeakMap,_i=new WeakMap,xs=new WeakMap,zi=new WeakMap,yr=new WeakMap,Mr=new WeakMap,Sr=new WeakMap,vi=new WeakMap,Ro=new WeakMap,Ot=new WeakSet,zp=function(){try{Ke(this,Qn,An(()=>K(this,vs).call(this,K(this,wn))))}catch(e){this.error(e)}},Bp=function(e){const t=K(this,Jn).failed;t&&Ke(this,Bn,An(()=>{t(K(this,wn),()=>e,()=>()=>{})}))},Hp=function(){const e=K(this,Jn).pending;e&&(this.is_pending=!0,Ke(this,vn,An(()=>e(K(this,wn)))),Ai(()=>{var t=Ke(this,_i,document.createDocumentFragment()),n=Yi();t.append(n),Ke(this,Qn,wt(this,Ot,ro).call(this,()=>(Xi.ensure(),An(()=>K(this,vs).call(this,n))))),K(this,zi)===0&&(K(this,wn).before(t),Ke(this,_i,null),Ms(K(this,vn),()=>{Ke(this,vn,null)}),wt(this,Ot,so).call(this))}))},Ul=function(){try{if(this.is_pending=this.has_pending_snippet(),Ke(this,zi,0),Ke(this,xs,0),Ke(this,Qn,An(()=>{K(this,vs).call(this,K(this,wn))})),K(this,zi)>0){var e=Ke(this,_i,document.createDocumentFragment());Cc(K(this,Qn),e);const t=K(this,Jn).pending;Ke(this,vn,An(()=>t(K(this,wn))))}else wt(this,Ot,so).call(this)}catch(t){this.error(t)}},so=function(){this.is_pending=!1;for(const e of K(this,Mr))Lt(e,$t),ii(e);for(const e of K(this,Sr))Lt(e,qn),ii(e);K(this,Mr).clear(),K(this,Sr).clear()},ro=function(e){var t=ct,n=tt,s=At;li(K(this,on)),Nn(K(this,on)),wr(K(this,on).ctx);try{return e()}catch(r){return Mf(r),null}finally{li(t),Nn(n),wr(s)}},Il=function(e){var t;if(!this.has_pending_snippet()){this.parent&&wt(t=this.parent,Ot,Il).call(t,e);return}Ke(this,zi,K(this,zi)+e),K(this,zi)===0&&(wt(this,Ot,so).call(this),K(this,vn)&&Ms(K(this,vn),()=>{Ke(this,vn,null)}),K(this,_i)&&(K(this,wn).before(K(this,_i)),Ke(this,_i,null)))};function Gp(i,e,t,n){const s=ua()?Lo:Af;var r=i.filter(h=>!h.settled);if(t.length===0&&r.length===0){n(e.map(s));return}var a=ct,o=Vp(),l=r.length===1?r[0].promise:r.length>1?Promise.all(r.map(h=>h.promise)):null;function c(h){o();try{n(h)}catch(f){(a.f&Ti)===0&&Bi(f,a)}Nl()}if(t.length===0){l.then(()=>c(e.map(s)));return}function u(){o(),Promise.all(t.map(h=>Xp(h))).then(h=>c([...e.map(s),...h])).catch(h=>Bi(h,a))}l?l.then(u):u()}function Vp(){var i=ct,e=tt,t=At,n=ht;return function(r=!0){li(i),Nn(e),wr(t),r&&(n==null||n.activate())}}function Nl(i=!0){li(null),Nn(null),wr(null),i&&(ht==null||ht.deactivate())}function Wp(){var i=ct.b,e=ht,t=i.is_rendered();return i.update_pending_count(1),e.increment(t),()=>{i.update_pending_count(-1),e.decrement(t)}}function Lo(i){var e=jt|$t,t=tt!==null&&(tt.f&jt)!==0?tt:null;return ct!==null&&(ct.f|=Nr),{ctx:At,deps:null,effects:null,equals:vf,f:e,fn:i,reactions:null,rv:0,v:Wt,wv:0,parent:t??ct,ac:null}}function Xp(i,e,t){ct===null&&hp();var s=void 0,r=Cs(Wt),a=!tt,o=new Map;return im(()=>{var f;var l=df();s=l.promise;try{Promise.resolve(i()).then(l.resolve,l.reject).finally(Nl)}catch(m){l.reject(m),Nl()}var c=ht;if(a){var u=Wp();(f=o.get(c))==null||f.reject(ps),o.delete(c),o.set(c,l)}const h=(m,g=void 0)=>{if(c.activate(),g)g!==ps&&(r.f|=Wi,Ar(r,g));else{(r.f&Wi)!==0&&(r.f^=Wi),Ar(r,m);for(const[_,p]of o){if(o.delete(_),_===c)break;p.reject(ps)}}u&&u()};l.promise.then(h,m=>h(null,m||"unknown"))}),wc(()=>{for(const l of o.values())l.reject(ps)}),new Promise(l=>{function c(u){function h(){u===s?l(r):c(s)}u.then(h,h)}c(s)})}function it(i){const e=Lo(i);return Wf(e),e}function Af(i){const e=Lo(i);return e.equals=yf,e}function qp(i){var e=i.effects;if(e!==null){i.effects=null;for(var t=0;t<e.length;t+=1)cn(e[t])}}function Yp(i){for(var e=i.parent;e!==null;){if((e.f&jt)===0)return(e.f&Ti)===0?e:null;e=e.parent}return null}function Mc(i){var e,t=ct;li(Yp(i));try{i.f&=~Rs,qp(i),e=$f(i)}finally{li(t)}return e}function Rf(i){var e=Mc(i);if(!i.equals(e)&&(i.wv=qf(),(!(ht!=null&&ht.is_fork)||i.deps===null)&&(i.v=e,i.deps===null))){Lt(i,Yt);return}Ps||(Xt!==null?(Ec()||ht!=null&&ht.is_fork)&&Xt.set(i,e):xc(i))}function $p(i){var e,t;if(i.effects!==null)for(const n of i.effects)(n.teardown||n.ac)&&((e=n.teardown)==null||e.call(n),(t=n.ac)==null||t.abort(ps),n.teardown=wi,n.ac=null,ta(n,0),Ac(n))}function Cf(i){if(i.effects!==null)for(const e of i.effects)e.teardown&&Rr(e)}let Ol=new Set;const qi=new Map;let Pf=!1;function Cs(i,e){var t={f:0,v:i,reactions:null,equals:vf,rv:0,wv:0};return t}function Ce(i,e){const t=Cs(i);return Wf(t),t}function Sc(i,e=!1,t=!0){var s;const n=Cs(i);return e||(n.equals=yf),ca&&t&&At!==null&&At.l!==null&&((s=At.l).s??(s.s=[])).push(n),n}function ou(i,e){return pe(i,ts(()=>P(i))),e}function pe(i,e,t=!1){tt!==null&&(!Wn||(tt.f&ru)!==0)&&ua()&&(tt.f&(jt|es|vc|ru))!==0&&(Un===null||!br.call(Un,i))&&xp();let n=t?Tt(e):e;return Ar(i,n)}function Ar(i,e){if(!i.equals(e)){var t=i.v;Ps?qi.set(i,e):qi.set(i,t),i.v=e;var n=Xi.ensure();if(n.capture(i,t),(i.f&jt)!==0){const s=i;(i.f&$t)!==0&&Mc(s),xc(s)}i.wv=qf(),Lf(i,$t),ua()&&ct!==null&&(ct.f&Yt)!==0&&(ct.f&($n|Ns))===0&&(En===null?am([i]):En.push(i)),!n.is_fork&&Ol.size>0&&!Pf&&jp()}return e}function jp(){Pf=!1;for(const i of Ol)(i.f&Yt)!==0&&Lt(i,qn),fa(i)&&Rr(i);Ol.clear()}function Kr(i){pe(i,i.v+1)}function Lf(i,e){var t=i.reactions;if(t!==null)for(var n=ua(),s=t.length,r=0;r<s;r++){var a=t[r],o=a.f;if(!(!n&&a===ct)){var l=(o&$t)===0;if(l&&Lt(a,e),(o&jt)!==0){var c=a;Xt==null||Xt.delete(c),(o&Rs)===0&&(o&Dn&&(a.f|=Rs),Lf(c,qn))}else l&&((o&es)!==0&&zn!==null&&zn.add(a),ii(a))}}}function Tt(i){if(typeof i!="object"||i===null||fr in i)return i;const e=gc(i);if(e!==sp&&e!==rp)return i;var t=new Map,n=uf(i),s=Ce(0),r=Ss,a=o=>{if(Ss===r)return o();var l=tt,c=Ss;Nn(null),uu(r);var u=o();return Nn(l),uu(c),u};return n&&t.set("length",Ce(i.length)),new Proxy(i,{defineProperty(o,l,c){(!("value"in c)||c.configurable===!1||c.enumerable===!1||c.writable===!1)&&_p();var u=t.get(l);return u===void 0?a(()=>{var h=Ce(c.value);return t.set(l,h),h}):pe(u,c.value,!0),!0},deleteProperty(o,l){var c=t.get(l);if(c===void 0){if(l in o){const u=a(()=>Ce(Wt));t.set(l,u),Kr(s)}}else pe(c,Wt),Kr(s);return!0},get(o,l,c){var m;if(l===fr)return i;var u=t.get(l),h=l in o;if(u===void 0&&(!h||(m=jr(o,l))!=null&&m.writable)&&(u=a(()=>{var g=Tt(h?o[l]:Wt),_=Ce(g);return _}),t.set(l,u)),u!==void 0){var f=P(u);return f===Wt?void 0:f}return Reflect.get(o,l,c)},getOwnPropertyDescriptor(o,l){var c=Reflect.getOwnPropertyDescriptor(o,l);if(c&&"value"in c){var u=t.get(l);u&&(c.value=P(u))}else if(c===void 0){var h=t.get(l),f=h==null?void 0:h.v;if(h!==void 0&&f!==Wt)return{enumerable:!0,configurable:!0,value:f,writable:!0}}return c},has(o,l){var f;if(l===fr)return!0;var c=t.get(l),u=c!==void 0&&c.v!==Wt||Reflect.has(o,l);if(c!==void 0||ct!==null&&(!u||(f=jr(o,l))!=null&&f.writable)){c===void 0&&(c=a(()=>{var m=u?Tt(o[l]):Wt,g=Ce(m);return g}),t.set(l,c));var h=P(c);if(h===Wt)return!1}return u},set(o,l,c,u){var v;var h=t.get(l),f=l in o;if(n&&l==="length")for(var m=c;m<h.v;m+=1){var g=t.get(m+"");g!==void 0?pe(g,Wt):m in o&&(g=a(()=>Ce(Wt)),t.set(m+"",g))}if(h===void 0)(!f||(v=jr(o,l))!=null&&v.writable)&&(h=a(()=>Ce(void 0)),pe(h,Tt(c)),t.set(l,h));else{f=h.v!==Wt;var _=a(()=>Tt(c));pe(h,_)}var p=Reflect.getOwnPropertyDescriptor(o,l);if(p!=null&&p.set&&p.set.call(u,c),!f){if(n&&typeof l=="string"){var d=t.get("length"),x=Number(l);Number.isInteger(x)&&x>=d.v&&pe(d,x+1)}Kr(s)}return!0},ownKeys(o){P(s);var l=Reflect.ownKeys(o).filter(h=>{var f=t.get(h);return f===void 0||f.v!==Wt});for(var[c,u]of t)u.v!==Wt&&!(c in o)&&l.push(c);return l},setPrototypeOf(){vp()}})}var lu,Df,Uf,If,Nf;function Kp(){if(lu===void 0){lu=window,Df=document,Uf=/Firefox/.test(navigator.userAgent);var i=Element.prototype,e=Node.prototype,t=Text.prototype;If=jr(e,"firstChild").get,Nf=jr(e,"nextSibling").get,su(i)&&(i.__click=void 0,i.__className=void 0,i.__attributes=null,i.__style=void 0,i.__e=void 0),su(t)&&(t.__t=void 0)}}function Yi(i=""){return document.createTextNode(i)}function ho(i){return If.call(i)}function ha(i){return Nf.call(i)}function le(i,e){return ho(i)}function Xn(i,e=!1){{var t=ho(i);return t instanceof Comment&&t.data===""?ha(t):t}}function te(i,e=1,t=!1){let n=i;for(;e--;)n=ha(n);return n}function Zp(i){i.textContent=""}function Of(){return!1}function Jp(i,e,t){return document.createElementNS(_f,i,void 0)}function bc(i){var e=tt,t=ct;Nn(null),li(null);try{return i()}finally{Nn(e),li(t)}}function Ff(i){ct===null&&(tt===null&&mp(),pp()),Ps&&dp()}function Qp(i,e){var t=e.last;t===null?e.last=e.first=i:(t.next=i,i.prev=t,e.last=i)}function ci(i,e){var t=ct;t!==null&&(t.f&sn)!==0&&(i|=sn);var n={ctx:At,deps:null,nodes:null,f:i|$t|Dn,first:null,fn:e,last:null,next:null,parent:t,b:t&&t.b,prev:null,teardown:null,wv:0,ac:null},s=n;if((i&Ur)!==0)Tr!==null?Tr.push(n):ii(n);else if(e!==null){try{Rr(n)}catch(a){throw cn(n),a}s.deps===null&&s.teardown===null&&s.nodes===null&&s.first===s.last&&(s.f&Nr)===0&&(s=s.first,(i&es)!==0&&(i&Er)!==0&&s!==null&&(s.f|=Er))}if(s!==null&&(s.parent=t,t!==null&&Qp(s,t),tt!==null&&(tt.f&jt)!==0&&(i&Ns)===0)){var r=tt;(r.effects??(r.effects=[])).push(s)}return n}function Ec(){return tt!==null&&!Wn}function wc(i){const e=ci(As,null);return Lt(e,Yt),e.teardown=i,e}function pt(i){Ff();var e=ct.f,t=!tt&&(e&$n)!==0&&(e&Ir)===0;if(t){var n=At;(n.e??(n.e=[])).push(i)}else return kf(i)}function kf(i){return ci(Ur|pf,i)}function em(i){return Ff(),ci(As|pf,i)}function tm(i){Xi.ensure();const e=ci(Ns|Nr,i);return(t={})=>new Promise(n=>{t.outro?Ms(e,()=>{cn(e),n(void 0)}):(cn(e),n(void 0))})}function nm(i){return ci(Ur,i)}function im(i){return ci(vc|Nr,i)}function zf(i,e=0){return ci(As|e,i)}function Dt(i,e=[],t=[],n=[]){Gp(n,e,t,s=>{ci(As,()=>i(...s.map(P)))})}function Tc(i,e=0){var t=ci(es|e,i);return t}function An(i){return ci($n|Nr,i)}function Bf(i){var e=i.teardown;if(e!==null){const t=Ps,n=tt;cu(!0),Nn(null);try{e.call(null)}finally{cu(t),Nn(n)}}}function Ac(i,e=!1){var t=i.first;for(i.first=i.last=null;t!==null;){const s=t.ac;s!==null&&bc(()=>{s.abort(ps)});var n=t.next;(t.f&Ns)!==0?t.parent=null:cn(t,e),t=n}}function sm(i){for(var e=i.first;e!==null;){var t=e.next;(e.f&$n)===0&&cn(e),e=t}}function cn(i,e=!0){var t=!1;(e||(i.f&lp)!==0)&&i.nodes!==null&&i.nodes.end!==null&&(rm(i.nodes.start,i.nodes.end),t=!0),Ac(i,e&&!t),ta(i,0),Lt(i,Ti);var n=i.nodes&&i.nodes.t;if(n!==null)for(const r of n)r.stop();Bf(i);var s=i.parent;s!==null&&s.first!==null&&Hf(i),i.next=i.prev=i.teardown=i.ctx=i.deps=i.fn=i.nodes=i.ac=null}function rm(i,e){for(;i!==null;){var t=i===e?null:ha(i);i.remove(),i=t}}function Hf(i){var e=i.parent,t=i.prev,n=i.next;t!==null&&(t.next=n),n!==null&&(n.prev=t),e!==null&&(e.first===i&&(e.first=n),e.last===i&&(e.last=t))}function Ms(i,e,t=!0){var n=[];Gf(i,n,!0);var s=()=>{t&&cn(i),e&&e()},r=n.length;if(r>0){var a=()=>--r||s();for(var o of n)o.out(a)}else s()}function Gf(i,e,t){if((i.f&sn)===0){i.f^=sn;var n=i.nodes&&i.nodes.t;if(n!==null)for(const o of n)(o.is_global||t)&&e.push(o);for(var s=i.first;s!==null;){var r=s.next,a=(s.f&Er)!==0||(s.f&$n)!==0&&(i.f&es)!==0;Gf(s,e,a?t:!1),s=r}}}function Rc(i){Vf(i,!0)}function Vf(i,e){if((i.f&sn)!==0){i.f^=sn;for(var t=i.first;t!==null;){var n=t.next,s=(t.f&Er)!==0||(t.f&$n)!==0;Vf(t,s?e:!1),t=n}var r=i.nodes&&i.nodes.t;if(r!==null)for(const a of r)(a.is_global||e)&&a.in()}}function Cc(i,e){if(i.nodes)for(var t=i.nodes.start,n=i.nodes.end;t!==null;){var s=t===n?null:ha(t);e.append(t),t=s}}let ao=!1,Ps=!1;function cu(i){Ps=i}let tt=null,Wn=!1;function Nn(i){tt=i}let ct=null;function li(i){ct=i}let Un=null;function Wf(i){tt!==null&&(Un===null?Un=[i]:Un.push(i))}let ln=null,_n=0,En=null;function am(i){En=i}let Xf=1,ms=0,Ss=ms;function uu(i){Ss=i}function qf(){return++Xf}function fa(i){var e=i.f;if((e&$t)!==0)return!0;if(e&jt&&(i.f&=~Rs),(e&qn)!==0){for(var t=i.deps,n=t.length,s=0;s<n;s++){var r=t[s];if(fa(r)&&Rf(r),r.wv>i.wv)return!0}(e&Dn)!==0&&Xt===null&&Lt(i,Yt)}return!1}function Yf(i,e,t=!0){var n=i.reactions;if(n!==null&&!(Un!==null&&br.call(Un,i)))for(var s=0;s<n.length;s++){var r=n[s];(r.f&jt)!==0?Yf(r,e,!1):e===r&&(t?Lt(r,$t):(r.f&Yt)!==0&&Lt(r,qn),ii(r))}}function $f(i){var _;var e=ln,t=_n,n=En,s=tt,r=Un,a=At,o=Wn,l=Ss,c=i.f;ln=null,_n=0,En=null,tt=(c&($n|Ns))===0?i:null,Un=null,wr(i.ctx),Wn=!1,Ss=++ms,i.ac!==null&&(bc(()=>{i.ac.abort(ps)}),i.ac=null);try{i.f|=Rl;var u=i.fn,h=u();i.f|=Ir;var f=i.deps,m=ht==null?void 0:ht.is_fork;if(ln!==null){var g;if(m||ta(i,_n),f!==null&&_n>0)for(f.length=_n+ln.length,g=0;g<ln.length;g++)f[_n+g]=ln[g];else i.deps=f=ln;if(Ec()&&(i.f&Dn)!==0)for(g=_n;g<f.length;g++)((_=f[g]).reactions??(_.reactions=[])).push(i)}else!m&&f!==null&&_n<f.length&&(ta(i,_n),f.length=_n);if(ua()&&En!==null&&!Wn&&f!==null&&(i.f&(jt|qn|$t))===0)for(g=0;g<En.length;g++)Yf(En[g],i);if(s!==null&&s!==i){if(ms++,s.deps!==null)for(let p=0;p<t;p+=1)s.deps[p].rv=ms;if(e!==null)for(const p of e)p.rv=ms;En!==null&&(n===null?n=En:n.push(...En))}return(i.f&Wi)!==0&&(i.f^=Wi),h}catch(p){return Mf(p)}finally{i.f^=Rl,ln=e,_n=t,En=n,tt=s,Un=r,wr(a),Wn=o,Ss=l}}function om(i,e){let t=e.reactions;if(t!==null){var n=ip.call(t,i);if(n!==-1){var s=t.length-1;s===0?t=e.reactions=null:(t[n]=t[s],t.pop())}}if(t===null&&(e.f&jt)!==0&&(ln===null||!br.call(ln,e))){var r=e;(r.f&Dn)!==0&&(r.f^=Dn,r.f&=~Rs),xc(r),$p(r),ta(r,0)}}function ta(i,e){var t=i.deps;if(t!==null)for(var n=e;n<t.length;n++)om(i,t[n])}function Rr(i){var e=i.f;if((e&Ti)===0){Lt(i,Yt);var t=ct,n=ao;ct=i,ao=!0;try{(e&(es|_c))!==0?sm(i):Ac(i),Bf(i);var s=$f(i);i.teardown=typeof s=="function"?s:null,i.wv=Xf;var r;Tl&&Rp&&(i.f&$t)!==0&&i.deps}finally{ao=n,ct=t}}}function P(i){var e=i.f,t=(e&jt)!==0;if(tt!==null&&!Wn){var n=ct!==null&&(ct.f&Ti)!==0;if(!n&&(Un===null||!br.call(Un,i))){var s=tt.deps;if((tt.f&Rl)!==0)i.rv<ms&&(i.rv=ms,ln===null&&s!==null&&s[_n]===i?_n++:ln===null?ln=[i]:ln.push(i));else{(tt.deps??(tt.deps=[])).push(i);var r=i.reactions;r===null?i.reactions=[tt]:br.call(r,tt)||r.push(tt)}}}if(Ps&&qi.has(i))return qi.get(i);if(t){var a=i;if(Ps){var o=a.v;return((a.f&Yt)===0&&a.reactions!==null||Kf(a))&&(o=Mc(a)),qi.set(a,o),o}var l=(a.f&Dn)===0&&!Wn&&tt!==null&&(ao||(tt.f&Dn)!==0),c=(a.f&Ir)===0;fa(a)&&(l&&(a.f|=Dn),Rf(a)),l&&!c&&(Cf(a),jf(a))}if(Xt!=null&&Xt.has(i))return Xt.get(i);if((i.f&Wi)!==0)throw i.v;return i.v}function jf(i){if(i.f|=Dn,i.deps!==null)for(const e of i.deps)(e.reactions??(e.reactions=[])).push(i),(e.f&jt)!==0&&(e.f&Dn)===0&&(Cf(e),jf(e))}function Kf(i){if(i.v===Wt)return!0;if(i.deps===null)return!1;for(const e of i.deps)if(qi.has(e)||(e.f&jt)!==0&&Kf(e))return!0;return!1}function ts(i){var e=Wn;try{return Wn=!0,i()}finally{Wn=e}}function lm(i){if(!(typeof i!="object"||!i||i instanceof EventTarget)){if(fr in i)Fl(i);else if(!Array.isArray(i))for(let e in i){const t=i[e];typeof t=="object"&&t&&fr in t&&Fl(t)}}}function Fl(i,e=new Set){if(typeof i=="object"&&i!==null&&!(i instanceof EventTarget)&&!e.has(i)){e.add(i),i instanceof Date&&i.getTime();for(let n in i)try{Fl(i[n],e)}catch{}const t=gc(i);if(t!==Object.prototype&&t!==Array.prototype&&t!==Map.prototype&&t!==Set.prototype&&t!==Date.prototype){const n=ff(t);for(let s in n){const r=n[s].get;if(r)try{r.call(i)}catch{}}}}}const cm=["touchstart","touchmove"];function um(i){return cm.includes(i)}const gs=Symbol("events"),Zf=new Set,kl=new Set;function hm(i,e,t,n={}){function s(r){if(n.capture||zl.call(e,r),!r.cancelBubble)return bc(()=>t==null?void 0:t.call(this,r))}return i.startsWith("pointer")||i.startsWith("touch")||i==="wheel"?Ai(()=>{e.addEventListener(i,s,n)}):e.addEventListener(i,s,n),s}function Jf(i,e,t,n,s){var r={capture:n,passive:s},a=hm(i,e,t,r);(e===document.body||e===window||e===document||e instanceof HTMLMediaElement)&&wc(()=>{e.removeEventListener(i,a,r)})}function ze(i,e,t){(e[gs]??(e[gs]={}))[i]=t}function jn(i){for(var e=0;e<i.length;e++)Zf.add(i[e]);for(var t of kl)t(i)}let hu=null;function zl(i){var p,d;var e=this,t=e.ownerDocument,n=i.type,s=((p=i.composedPath)==null?void 0:p.call(i))||[],r=s[0]||i.target;hu=i;var a=0,o=hu===i&&i[gs];if(o){var l=s.indexOf(o);if(l!==-1&&(e===document||e===window)){i[gs]=e;return}var c=s.indexOf(e);if(c===-1)return;l<=c&&(a=l)}if(r=s[a]||i.target,r!==e){hf(i,"currentTarget",{configurable:!0,get(){return r||t}});var u=tt,h=ct;Nn(null),li(null);try{for(var f,m=[];r!==null;){var g=r.assignedSlot||r.parentNode||r.host||null;try{var _=(d=r[gs])==null?void 0:d[n];_!=null&&(!r.disabled||i.target===r)&&_.call(r,i)}catch(x){f?m.push(x):f=x}if(i.cancelBubble||g===e||g===null)break;r=g}if(f){for(let x of m)queueMicrotask(()=>{throw x});throw f}}finally{i[gs]=e,delete i.currentTarget,Nn(u),li(h)}}}var lf;const Vo=((lf=globalThis==null?void 0:globalThis.window)==null?void 0:lf.trustedTypes)&&globalThis.window.trustedTypes.createPolicy("svelte-trusted-html",{createHTML:i=>i});function fm(i){return(Vo==null?void 0:Vo.createHTML(i))??i}function dm(i){var e=Jp("template");return e.innerHTML=fm(i.replaceAll("<!>","<!---->")),e.content}function Bl(i,e){var t=ct;t.nodes===null&&(t.nodes={start:i,end:e,a:null,t:null})}function rt(i,e){var t=(e&wp)!==0,n=(e&Tp)!==0,s,r=!i.startsWith("<!>");return()=>{s===void 0&&(s=dm(r?i:"<!>"+i),t||(s=ho(s)));var a=n||Uf?document.importNode(s,!0):s.cloneNode(!0);if(t){var o=ho(a),l=a.lastChild;Bl(o,l)}else Bl(a,a);return a}}function fu(){var i=document.createDocumentFragment(),e=document.createComment(""),t=Yi();return i.append(e,t),Bl(e,t),i}function nt(i,e){i!==null&&i.before(e)}function ft(i,e){var t=e==null?"":typeof e=="object"?`${e}`:e;t!==(i.__t??(i.__t=i.nodeValue))&&(i.__t=t,i.nodeValue=`${t}`)}function pm(i,e){return mm(i,e)}const Sa=new Map;function mm(i,{target:e,anchor:t,props:n={},events:s,context:r,intro:a=!0,transformError:o}){Kp();var l=void 0,c=tm(()=>{var u=t??e.appendChild(Yi());Fp(u,{pending:()=>{}},m=>{Gt({});var g=At;r&&(g.c=r),s&&(n.$$events=s),l=i(m,n)||{},Vt()},o);var h=new Set,f=m=>{for(var g=0;g<m.length;g++){var _=m[g];if(!h.has(_)){h.add(_);var p=um(_);for(const v of[e,document]){var d=Sa.get(v);d===void 0&&(d=new Map,Sa.set(v,d));var x=d.get(_);x===void 0?(v.addEventListener(_,zl,{passive:p}),d.set(_,1)):d.set(_,x+1)}}}};return f(Po(Zf)),kl.add(f),()=>{var p;for(var m of h)for(const d of[e,document]){var g=Sa.get(d),_=g.get(m);--_==0?(d.removeEventListener(m,zl),g.delete(m),g.size===0&&Sa.delete(d)):g.set(m,_)}kl.delete(f),u!==t&&((p=u.parentNode)==null||p.removeChild(u))}});return gm.set(l,c),l}let gm=new WeakMap;var Hn,ei,xn,ys,oa,la,Co;class _m{constructor(e,t=!0){he(this,"anchor");et(this,Hn,new Map);et(this,ei,new Map);et(this,xn,new Map);et(this,ys,new Set);et(this,oa,!0);et(this,la,e=>{if(K(this,Hn).has(e)){var t=K(this,Hn).get(e),n=K(this,ei).get(t);if(n)Rc(n),K(this,ys).delete(t);else{var s=K(this,xn).get(t);s&&(s.effect.f&sn)===0&&(K(this,ei).set(t,s.effect),K(this,xn).delete(t),s.fragment.lastChild.remove(),this.anchor.before(s.fragment),n=s.effect)}for(const[r,a]of K(this,Hn)){if(K(this,Hn).delete(r),r===e)break;const o=K(this,xn).get(a);o&&(cn(o.effect),K(this,xn).delete(a))}for(const[r,a]of K(this,ei)){if(r===t||K(this,ys).has(r)||(a.f&sn)!==0)continue;const o=()=>{if(Array.from(K(this,Hn).values()).includes(r)){var c=document.createDocumentFragment();Cc(a,c),c.append(Yi()),K(this,xn).set(r,{effect:a,fragment:c})}else cn(a);K(this,ys).delete(r),K(this,ei).delete(r)};K(this,oa)||!n?(K(this,ys).add(r),Ms(a,o,!1)):o()}}});et(this,Co,e=>{K(this,Hn).delete(e);const t=Array.from(K(this,Hn).values());for(const[n,s]of K(this,xn))t.includes(n)||(cn(s.effect),K(this,xn).delete(n))});this.anchor=e,Ke(this,oa,t)}ensure(e,t){var n=ht,s=Of();if(t&&!K(this,ei).has(e)&&!K(this,xn).has(e))if(s){var r=document.createDocumentFragment(),a=Yi();r.append(a),K(this,xn).set(e,{effect:An(()=>t(a)),fragment:r})}else K(this,ei).set(e,An(()=>t(this.anchor)));if(K(this,Hn).set(n,e),s){for(const[o,l]of K(this,ei))o===e?n.unskip_effect(l):n.skip_effect(l);for(const[o,l]of K(this,xn))o===e?n.unskip_effect(l.effect):n.skip_effect(l.effect);n.oncommit(K(this,la)),n.ondiscard(K(this,Co))}else K(this,la).call(this,n)}}Hn=new WeakMap,ei=new WeakMap,xn=new WeakMap,ys=new WeakMap,oa=new WeakMap,la=new WeakMap,Co=new WeakMap;function Mi(i,e,t=!1){var n=new _m(i),s=t?Er:0;function r(a,o){n.ensure(a,o)}Tc(()=>{var a=!1;e((o,l=0)=>{a=!0,r(l,o)}),a||r(-1,null)},s)}function na(i,e){return e}function vm(i,e,t){for(var n=[],s=e.length,r,a=e.length,o=0;o<s;o++){let h=e[o];Ms(h,()=>{if(r){if(r.pending.delete(h),r.done.add(h),r.pending.size===0){var f=i.outrogroups;Hl(i,Po(r.done)),f.delete(r),f.size===0&&(i.outrogroups=null)}}else a-=1},!1)}if(a===0){var l=n.length===0&&t!==null;if(l){var c=t,u=c.parentNode;Zp(u),u.append(c),i.items.clear()}Hl(i,e,!l)}else r={pending:new Set(e),done:new Set},(i.outrogroups??(i.outrogroups=new Set)).add(r)}function Hl(i,e,t=!0){var n;if(i.pending.size>0){n=new Set;for(const a of i.pending.values())for(const o of a)n.add(i.items.get(o).e)}for(var s=0;s<e.length;s++){var r=e[s];if(n!=null&&n.has(r)){r.f|=ni;const a=document.createDocumentFragment();Cc(r,a)}else cn(e[s],t)}}var du;function ia(i,e,t,n,s,r=null){var a=i,o=new Map,l=(e&gf)!==0;if(l){var c=i;a=c.appendChild(Yi())}var u=null,h=Af(()=>{var v=t();return uf(v)?v:v==null?[]:Po(v)}),f,m=new Map,g=!0;function _(v){(x.effect.f&Ti)===0&&(x.pending.delete(v),x.fallback=u,xm(x,f,a,e,n),u!==null&&(f.length===0?(u.f&ni)===0?Rc(u):(u.f^=ni,Yr(u,null,a)):Ms(u,()=>{u=null})))}function p(v){x.pending.delete(v)}var d=Tc(()=>{f=P(h);for(var v=f.length,M=new Set,C=ht,A=Of(),T=0;T<v;T+=1){var z=f[T],y=n(z,T),b=g?null:o.get(y);b?(b.v&&Ar(b.v,z),b.i&&Ar(b.i,T),A&&C.unskip_effect(b.e)):(b=ym(o,g?a:du??(du=Yi()),z,y,T,s,e,t),g||(b.e.f|=ni),o.set(y,b)),M.add(y)}if(v===0&&r&&!u&&(g?u=An(()=>r(a)):(u=An(()=>r(du??(du=Yi()))),u.f|=ni)),v>M.size&&fp(),!g)if(m.set(C,M),A){for(const[U,k]of o)M.has(U)||C.skip_effect(k.e);C.oncommit(_),C.ondiscard(p)}else _(C);P(h)}),x={effect:d,items:o,pending:m,outrogroups:null,fallback:u};g=!1}function kr(i){for(;i!==null&&(i.f&$n)===0;)i=i.next;return i}function xm(i,e,t,n,s){var b,U,k,Q,D,O,W,Z,$;var r=(n&bp)!==0,a=e.length,o=i.items,l=kr(i.effect.first),c,u=null,h,f=[],m=[],g,_,p,d;if(r)for(d=0;d<a;d+=1)g=e[d],_=s(g,d),p=o.get(_).e,(p.f&ni)===0&&((U=(b=p.nodes)==null?void 0:b.a)==null||U.measure(),(h??(h=new Set)).add(p));for(d=0;d<a;d+=1){if(g=e[d],_=s(g,d),p=o.get(_).e,i.outrogroups!==null)for(const j of i.outrogroups)j.pending.delete(p),j.done.delete(p);if((p.f&ni)!==0)if(p.f^=ni,p===l)Yr(p,null,t);else{var x=u?u.next:l;p===i.effect.last&&(i.effect.last=p.prev),p.prev&&(p.prev.next=p.next),p.next&&(p.next.prev=p.prev),Ci(i,u,p),Ci(i,p,x),Yr(p,x,t),u=p,f=[],m=[],l=kr(u.next);continue}if((p.f&sn)!==0&&(Rc(p),r&&((Q=(k=p.nodes)==null?void 0:k.a)==null||Q.unfix(),(h??(h=new Set)).delete(p))),p!==l){if(c!==void 0&&c.has(p)){if(f.length<m.length){var v=m[0],M;u=v.prev;var C=f[0],A=f[f.length-1];for(M=0;M<f.length;M+=1)Yr(f[M],v,t);for(M=0;M<m.length;M+=1)c.delete(m[M]);Ci(i,C.prev,A.next),Ci(i,u,C),Ci(i,A,v),l=v,u=A,d-=1,f=[],m=[]}else c.delete(p),Yr(p,l,t),Ci(i,p.prev,p.next),Ci(i,p,u===null?i.effect.first:u.next),Ci(i,u,p),u=p;continue}for(f=[],m=[];l!==null&&l!==p;)(c??(c=new Set)).add(l),m.push(l),l=kr(l.next);if(l===null)continue}(p.f&ni)===0&&f.push(p),u=p,l=kr(p.next)}if(i.outrogroups!==null){for(const j of i.outrogroups)j.pending.size===0&&(Hl(i,Po(j.done)),(D=i.outrogroups)==null||D.delete(j));i.outrogroups.size===0&&(i.outrogroups=null)}if(l!==null||c!==void 0){var T=[];if(c!==void 0)for(p of c)(p.f&sn)===0&&T.push(p);for(;l!==null;)(l.f&sn)===0&&l!==i.fallback&&T.push(l),l=kr(l.next);var z=T.length;if(z>0){var y=(n&gf)!==0&&a===0?t:null;if(r){for(d=0;d<z;d+=1)(W=(O=T[d].nodes)==null?void 0:O.a)==null||W.measure();for(d=0;d<z;d+=1)($=(Z=T[d].nodes)==null?void 0:Z.a)==null||$.fix()}vm(i,T,y)}}r&&Ai(()=>{var j,Y;if(h!==void 0)for(p of h)(Y=(j=p.nodes)==null?void 0:j.a)==null||Y.apply()})}function ym(i,e,t,n,s,r,a,o){var l=(a&Mp)!==0?(a&Ep)===0?Sc(t,!1,!1):Cs(t):null,c=(a&Sp)!==0?Cs(s):null;return{v:l,i:c,e:An(()=>(r(e,l??t,c??s,o),()=>{i.delete(n)}))}}function Yr(i,e,t){if(i.nodes)for(var n=i.nodes.start,s=i.nodes.end,r=e&&(e.f&ni)===0?e.nodes.start:t;n!==null;){var a=ha(n);if(r.before(n),n===s)return;n=a}}function Ci(i,e,t){e===null?i.effect.first=t:e.next=t,t===null?i.effect.last=e:t.prev=e}const pu=[...` 	
\r\f \v\uFEFF`];function Mm(i,e,t){var n=i==null?"":""+i;if(t){for(var s of Object.keys(t))if(t[s])n=n?n+" "+s:s;else if(n.length)for(var r=s.length,a=0;(a=n.indexOf(s,a))>=0;){var o=a+r;(a===0||pu.includes(n[a-1]))&&(o===n.length||pu.includes(n[o]))?n=(a===0?"":n.substring(0,a))+n.substring(o+1):a=o}}return n===""?null:n}function Sm(i,e){return i==null?null:String(i)}function st(i,e,t,n,s,r){var a=i.__className;if(a!==t||a===void 0){var o=Mm(t,n,r);o==null?i.removeAttribute("class"):i.className=o,i.__className=t}else if(r&&s!==r)for(var l in r){var c=!!r[l];(s==null||c!==!!s[l])&&i.classList.toggle(l,c)}return r}function ai(i,e,t,n){var s=i.__style;if(s!==e){var r=Sm(e);r==null?i.removeAttribute("style"):i.style.cssText=r,i.__style=e}return n}const bm=Symbol("is custom element"),Em=Symbol("is html"),wm=up?"progress":"PROGRESS";function bs(i,e){var t=Qf(i);t.value===(t.value=e??void 0)||i.value===e&&(e!==0||i.nodeName!==wm)||(i.value=e??"")}function Mn(i,e,t,n){var s=Qf(i);s[e]!==(s[e]=t)&&(e==="loading"&&(i[cp]=t),t==null?i.removeAttribute(e):typeof t!="string"&&Tm(i).includes(e)?i[e]=t:i.setAttribute(e,t))}function Qf(i){return i.__attributes??(i.__attributes={[bm]:i.nodeName.includes("-"),[Em]:i.namespaceURI===_f})}var mu=new Map;function Tm(i){var e=i.getAttribute("is")||i.nodeName,t=mu.get(e);if(t)return t;mu.set(e,t=[]);for(var n,s=i,r=Element.prototype;r!==s;){n=ff(s);for(var a in n)n[a].set&&t.push(a);s=gc(s)}return t}function gu(i,e){return i===e||(i==null?void 0:i[fr])===e}function fo(i={},e,t,n){return nm(()=>{var s,r;return zf(()=>{s=r,r=[],ts(()=>{i!==t(...r)&&(e(i,...r),s&&gu(t(...s),i)&&e(null,...s))})}),()=>{Ai(()=>{r&&gu(t(...r),i)&&e(null,...r)})}}),i}function Am(i=!1){const e=At,t=e.l.u;if(!t)return;let n=()=>lm(e.s);if(i){let s=0,r={};const a=Lo(()=>{let o=!1;const l=e.s;for(const c in l)l[c]!==r[c]&&(r[c]=l[c],o=!0);return o&&s++,s});n=()=>P(a)}t.b.length&&em(()=>{_u(e,n),uo(t.b)}),pt(()=>{const s=ts(()=>t.m.map(ap));return()=>{for(const r of s)typeof r=="function"&&r()}}),t.a.length&&pt(()=>{_u(e,n),uo(t.a)})}function _u(i,e){if(i.l.s)for(const t of i.l.s)P(t);e()}function Pc(i,e,t){if(i==null)return e(void 0),t&&t(void 0),wi;const n=ts(()=>i.subscribe(e,t));return n.unsubscribe?()=>n.unsubscribe():n}const zs=[];function Rm(i,e){return{subscribe:yt(i,e).subscribe}}function yt(i,e=wi){let t=null;const n=new Set;function s(o){if(xf(i,o)&&(i=o,t)){const l=!zs.length;for(const c of n)c[1](),zs.push(c,i);if(l){for(let c=0;c<zs.length;c+=2)zs[c][0](zs[c+1]);zs.length=0}}}function r(o){s(o(i))}function a(o,l=wi){const c=[o,l];return n.add(c),n.size===1&&(t=e(s,r)||wi),o(i),()=>{n.delete(c),n.size===0&&t&&(t(),t=null)}}return{set:s,update:r,subscribe:a}}function ed(i,e,t){const n=!Array.isArray(i),s=n?[i]:i;if(!s.every(Boolean))throw new Error("derived() expects stores as input, got a falsy value");const r=e.length<2;return Rm(t,(a,o)=>{let l=!1;const c=[];let u=0,h=wi;const f=()=>{if(u)return;h();const g=e(n?c[0]:c,a,o);r?a(g):h=typeof g=="function"?g:wi},m=s.map((g,_)=>Pc(g,p=>{c[_]=p,u&=~(1<<_),l&&f()},()=>{u|=1<<_}));return l=!0,f(),function(){uo(m),h(),l=!1}})}function an(i){let e;return Pc(i,t=>e=t)(),e}let Gl=Symbol();function Cm(i,e,t){const n=t[e]??(t[e]={store:null,source:Sc(void 0),unsubscribe:wi});if(n.store!==i&&!(Gl in t))if(n.unsubscribe(),n.store=i??null,i==null)n.source.v=void 0,n.unsubscribe=wi;else{var s=!0;n.unsubscribe=Pc(i,r=>{s?n.source.v=r:pe(n.source,r)}),s=!1}return i&&Gl in t?an(i):P(n.source)}function Pm(){const i={};function e(){wc(()=>{for(var t in i)i[t].unsubscribe();hf(i,Gl,{enumerable:!1,value:!0})})}return[i,e]}function Lm(i,e,t,n){var s=n,r=!0,a=()=>(r&&(r=!1,s=ts(n)),s),o;o=i[e],o===void 0&&n!==void 0&&(o=a());var l;return l=()=>{var c=i[e];return c===void 0?a():(r=!0,c)},l}function Do(i){At===null&&mf(),ca&&At.l!==null?Um(At).m.push(i):pt(()=>{const e=ts(i);if(typeof e=="function")return e})}function Dm(i){At===null&&mf(),Do(()=>()=>ts(i))}function Um(i){var e=i.l;return e.u??(e.u={a:[],b:[],m:[]})}const Im="5";var cf;typeof window<"u"&&((cf=window.__svelte??(window.__svelte={})).v??(cf.v=new Set)).add(Im);const Yn=yt([]),Ji=yt([]);async function Nm(){try{const i=await fetch("./graph-data.json");if(i.ok){const e=await i.json();Yn.set(e.nodes.map(t=>({...t,label:t.label.length>28?t.label.substring(0,26)+"..":t.label}))),Ji.set(e.links.map(t=>({...t})))}}catch{console.warn("graph-data.json not found. Run: node scripts/build-graph-data.mjs")}}const St={core:{label:"Core Docs",color:"#00d4ff",glow:"rgba(0,212,255,0.5)"},decisions:{label:"ADR Decisions",color:"#a855f7",glow:"rgba(168,85,247,0.5)"},discussion:{label:"Discussions",color:"#f97316",glow:"rgba(249,115,22,0.5)"},"oms-order":{label:"OMS Order Docs",color:"#3b82f6",glow:"rgba(59,130,246,0.5)"},"oms-webapp":{label:"OMS Webapp",color:"#10b981",glow:"rgba(16,185,129,0.5)"},"oms-help":{label:"Webapp Help",color:"#f59e0b",glow:"rgba(245,158,11,0.5)"},meta:{label:"Meta / Config",color:"#6b7280",glow:"rgba(107,114,128,0.5)"}},ba=[54527,11032055,16347926,1096065,3900150,16096779,15680580,6514417],cs=300,Om=2400,vu=8,xu=40,hs=900,Wo=650,Hi=yt("explore"),Si=yt(null),po=yt("dark"),cr=yt(.35),Vl=yt(new Set(Object.keys(St))),mo=yt([]);Cp();var Fm=rt('<div id="scanline" class="svelte-1kaod2m"></div>');function km(i){var e=Fm();nt(i,e)}var zm=rt('<div class="corner corner-tl svelte-1enhsgr"></div> <div class="corner corner-tr svelte-1enhsgr"></div> <div class="corner corner-bl svelte-1enhsgr"></div> <div class="corner corner-br svelte-1enhsgr"></div>',1);function Bm(i){var e=zm();nt(i,e)}const Hm=180,Gm=12,Vm=.18;class Wm{constructor(e){he(this,"canvas");he(this,"ctx");he(this,"stars",[]);he(this,"meshPts",[]);he(this,"meshEdges",[]);he(this,"_r");he(this,"_g");he(this,"_b");he(this,"animId",null);this.canvas=e;const t=e.getContext("2d");if(!t)throw new Error("ParticleBackground: could not get 2D canvas context");this.ctx=t;const[n,s,r]=this._readCSSColor();this._r=n,this._g=s,this._b=r,this._buildParticles(e.width,e.height)}_buildParticles(e,t){this.stars=Array.from({length:Hm},(s,r)=>{const a=r<Gm;return{x:Math.random()*e,y:Math.random()*t,r:a?Math.random()*1.5+1:Math.random()*.8+.2,vx:(Math.random()-.5)*.06,vy:(Math.random()-.5)*.06,a:a?Math.random()*.4+.5:Math.random()*.25+.05,twinkle:Math.random()*Math.PI*2,twinkleSpeed:Math.random()*.02+.005,bright:a}}),this.meshPts=Array.from({length:60},()=>({x:Math.random()*e,y:Math.random()*t}));const n=Math.min(e,t)*Vm;this.meshEdges=[];for(let s=0;s<this.meshPts.length;s++)for(let r=s+1;r<this.meshPts.length;r++){const a=this.meshPts[s].x-this.meshPts[r].x,o=this.meshPts[s].y-this.meshPts[r].y;Math.sqrt(a*a+o*o)<n&&this.meshEdges.push([s,r])}}start(){if(this.animId!==null)return;const e=()=>{this._draw(),this.animId=requestAnimationFrame(e)};this.animId=requestAnimationFrame(e)}stop(){this.animId!==null&&(cancelAnimationFrame(this.animId),this.animId=null)}_draw(){const{ctx:e,canvas:t}=this,n=t.width,s=t.height,r=`${this._r},${this._g},${this._b}`;e.clearRect(0,0,n,s),e.strokeStyle=`rgba(${r},0.04)`,e.lineWidth=.5,this.meshEdges.forEach(([a,o])=>{e.beginPath(),e.moveTo(this.meshPts[a].x,this.meshPts[a].y),e.lineTo(this.meshPts[o].x,this.meshPts[o].y),e.stroke()}),this.stars.forEach(a=>{a.x+=a.vx,a.y+=a.vy,a.x<0&&(a.x=n),a.x>n&&(a.x=0),a.y<0&&(a.y=s),a.y>s&&(a.y=0),a.twinkle+=a.twinkleSpeed;const o=a.bright?.7+.3*Math.sin(a.twinkle):1,l=a.a*o;if(a.bright){const c=e.createRadialGradient(a.x,a.y,0,a.x,a.y,a.r*4);c.addColorStop(0,`rgba(${r},${l})`),c.addColorStop(.3,`rgba(${r},${l*.3})`),c.addColorStop(1,`rgba(${r},0)`),e.beginPath(),e.arc(a.x,a.y,a.r*4,0,Math.PI*2),e.fillStyle=c,e.fill()}e.beginPath(),e.arc(a.x,a.y,a.r,0,Math.PI*2),e.fillStyle=`rgba(${r},${l})`,e.fill()})}updateColor(e,t,n){if(e!==void 0&&t!==void 0&&n!==void 0)this._r=e,this._g=t,this._b=n;else{const[s,r,a]=this._readCSSColor();this._r=s,this._g=r,this._b=a}}resize(e,t){this.canvas.width=e,this.canvas.height=t,this._buildParticles(e,t)}_readCSSColor(){const t=(getComputedStyle(document.documentElement).getPropertyValue("--particle-color").trim()||"0,212,255").split(",").map(n=>parseInt(n.trim(),10));return[t[0]??0,t[1]??212,t[2]??255]}dispose(){this.stop(),this.stars=[],this.meshPts=[],this.meshEdges=[]}}var Xm=rt('<canvas id="particles" class="svelte-xse3o3"></canvas>');function qm(i,e){Gt(e,!1);let t=Sc(),n=null;Do(()=>{ou(t,P(t).width=window.innerWidth),ou(t,P(t).height=window.innerHeight),n=new Wm(P(t)),n.start();const r=()=>{n==null||n.resize(window.innerWidth,window.innerHeight)};window.addEventListener("resize",r);const a=new MutationObserver(()=>{n==null||n.updateColor()});return a.observe(document.documentElement,{attributes:!0,attributeFilter:["data-theme"]}),()=>{n==null||n.dispose(),window.removeEventListener("resize",r),a.disconnect()}}),Am();var s=Xm();fo(s,r=>pe(t,r),()=>P(t)),nt(i,s),Vt()}var Ym=rt('<div id="top-banner" class="svelte-1qy030s"><h1 class="svelte-1qy030s">KNOWLEDGE GRAPH — GIT-CENTRAL</h1> <div class="subtitle svelte-1qy030s"><span id="stats-inline"> </span></div></div>');function $m(i,e){Gt(e,!0);let t=Ce(Tt([])),n=Ce(Tt([]));pt(()=>{const c=Yn.subscribe(h=>{pe(t,h,!0)}),u=Ji.subscribe(h=>{pe(n,h,!0)});return()=>{c(),u()}});let s=it(()=>P(t).length>0?`${P(t).length} DOCUMENTS • ${P(n).length} CONNECTIONS • AUTO-GENERATED`:"");var r=Ym(),a=te(le(r),2),o=le(a),l=le(o);Dt(()=>ft(l,P(s))),nt(i,r),Vt()}var jm=rt('<div id="mode-bar"> </div>');function Km(i,e){Gt(e,!0);let t=Ce("explore"),n=Ce(Tt([]));pt(()=>Hi.subscribe(u=>{pe(t,u,!0)})),pt(()=>mo.subscribe(u=>{pe(n,u,!0)}));let s=it(()=>()=>P(t)==="path"?P(n).length===0?"PATH MODE — Click 2 nodes":P(n).length===1?"PATH MODE — Click END node":"PATH MODE — Click 2 nodes":P(t)==="impact"?"IMPACT MODE — Click a node":""),r=it(()=>P(s)()!=="");var a=jm();let o;var l=le(a);Dt(c=>{o=st(a,1,"svelte-snkwbv",null,o,{show:P(r)}),ft(l,c)},[()=>P(s)()]),nt(i,a),Vt()}var Zm=rt('<div id="top-controls" class="svelte-w14g3o"><select class="ctrl-select svelte-w14g3o" id="layout-select"><option selected="" class="svelte-w14g3o">Globe 3D</option></select> <div class="glow-ctrl svelte-w14g3o"><span class="glow-label svelte-w14g3o" id="glow-label"> </span> <input type="range" class="glow-slider svelte-w14g3o" id="glow-slider" min="0" max="100" title="0 = Flat, 100 = Full Bloom"/></div> <button class="theme-btn svelte-w14g3o" id="theme-toggle" title="Toggle dark/light"> </button></div>');function Jm(i,e){Gt(e,!0);let t=Ce("dark"),n=Ce(.35);pt(()=>po.subscribe(v=>{pe(t,v,!0)})),pt(()=>cr.subscribe(v=>{pe(n,v,!0)})),pt(()=>{document.documentElement.dataset.theme=P(t)});let s=it(()=>P(t)==="dark"?"☽":"☀"),r=it(()=>()=>P(n)===0?"FLAT":P(n)<.3?"LOW":P(n)<.7?"MID":"GLOW"),a=it(()=>Math.round(P(n)*100));function o(){const x=P(t)==="dark"?"light":"dark";po.set(x)}function l(x){const v=parseInt(x.target.value,10);cr.set(v/100)}var c=Zm(),u=le(c),h=le(u);h.value=h.__value="globe";var f=te(u,2),m=le(f),g=le(m),_=te(m,2),p=te(f,2),d=le(p);Dt(x=>{ft(g,x),bs(_,P(a)),ft(d,P(s))},[()=>P(r)()]),ze("input",_,l),ze("click",p,o),nt(i,c),Vt()}jn(["input","click"]);var Qm=rt('<div id="toolbar" class="svelte-6x4q6i"><button title="Find shortest path between 2 nodes">Path</button> <button title="Show impact of selected node">Impact</button> <button class="tool-btn svelte-6x4q6i" title="Export graph data as JSON">Export</button> <button class="tool-btn svelte-6x4q6i" title="Reset view">Reset</button></div>');function eg(i,e){Gt(e,!0);let t=Ce("explore"),n=Ce(Tt([])),s=Ce(Tt([]));pt(()=>Hi.subscribe(M=>{pe(t,M,!0)})),pt(()=>{const v=Yn.subscribe(C=>{pe(n,C,!0)}),M=Ji.subscribe(C=>{pe(s,C,!0)});return()=>{v(),M()}});let r=it(()=>P(t)==="path"),a=it(()=>P(t)==="impact");function o(){P(t)==="path"?h():(h(),Hi.set("path"),mo.set([]))}function l(){P(t)==="impact"?h():(h(),Hi.set("impact"))}function c(){const v={nodes:P(n).map(A=>({id:A.id,file:A.file,label:A.label,cat:A.cat,refs:A.refs})),links:P(s).map(A=>({source:typeof A.source=="string"?A.source:A.source.id,target:typeof A.target=="string"?A.target:A.target.id,label:A.label}))},M=new Blob([JSON.stringify(v,null,2)],{type:"application/json"}),C=document.createElement("a");C.href=URL.createObjectURL(M),C.download="knowledge-graph-export.json",C.click()}function u(){h()}function h(){Hi.set("explore"),mo.set([]),Si.set(null)}var f=Qm(),m=le(f);let g;var _=te(m,2);let p;var d=te(_,2),x=te(d,2);Dt(()=>{g=st(m,1,"tool-btn svelte-6x4q6i",null,g,{active:P(r)}),p=st(_,1,"tool-btn svelte-6x4q6i",null,p,{active:P(a)})}),ze("click",m,o),ze("click",_,l),ze("click",d,c),ze("click",x,u),nt(i,f),Vt()}jn(["click"]);const go=yt(!0),Wl=yt(!0),Xl=yt(!0),ql=yt(!0),Yl=yt(!0),sa=yt(!0),$l=yt(.6),jl=yt(.35),yu=yt(55),Ea=yt(null);var tg=rt(`<div id="wasd-popup-overlay" role="dialog" aria-modal="true" aria-label="WASD Rotation Controls" tabindex="-1"><div id="wasd-popup" class="svelte-1788mbx"><div id="wasd-popup-header" class="svelte-1788mbx"><span class="popup-title svelte-1788mbx">WASD Rotation Controls</span> <button id="wasd-popup-close" class="svelte-1788mbx">ESC Close</button></div> <div id="wasd-popup-body" class="svelte-1788mbx"><div class="wasd-visual svelte-1788mbx"><div><div class="key-row svelte-1788mbx" style="justify-content:center"><div id="vk-w">W</div></div> <div class="key-row svelte-1788mbx"><div id="vk-a">A</div> <div id="vk-s">S</div> <div id="vk-d">D</div></div></div> <div style="margin-left:16px"><div class="key-row svelte-1788mbx" style="margin-bottom:4px"><div id="vk-q">Q</div></div> <div class="key-row svelte-1788mbx"><div id="vk-shift">&#8679; Shift</div></div></div></div> <div class="wasd-section-title svelte-1788mbx">Movement Keys</div> <div class="wasd-key-row svelte-1788mbx"><span class="wasd-key-badge svelte-1788mbx">W</span> <span class="wasd-key-desc svelte-1788mbx">Roll Up — pitch camera upward around globe</span></div> <div class="wasd-key-row svelte-1788mbx"><span class="wasd-key-badge svelte-1788mbx">S</span> <span class="wasd-key-desc svelte-1788mbx">Roll Down — pitch camera downward</span></div> <div class="wasd-key-row svelte-1788mbx"><span class="wasd-key-badge svelte-1788mbx">A</span> <span class="wasd-key-desc svelte-1788mbx">Roll Left — yaw camera to the left</span></div> <div class="wasd-key-row svelte-1788mbx"><span class="wasd-key-badge svelte-1788mbx">D</span> <span class="wasd-key-desc svelte-1788mbx">Roll Right — yaw camera to the right</span></div> <div class="wasd-section-title svelte-1788mbx">Modifiers</div> <div class="wasd-key-row svelte-1788mbx"><span class="wasd-key-badge svelte-1788mbx">&#8679; Shift</span> <span class="wasd-key-desc svelte-1788mbx">Boost — hold longer to accelerate faster (3x rate)</span></div> <div class="wasd-key-row svelte-1788mbx"><span class="wasd-key-badge svelte-1788mbx">Q</span> <span class="wasd-key-desc svelte-1788mbx">Brake — smooth deceleration to stop</span></div> <div class="wasd-section-title svelte-1788mbx">Combos</div> <div class="wasd-key-row svelte-1788mbx"><span class="wasd-key-badge svelte-1788mbx">W+A</span> <span class="wasd-key-desc svelte-1788mbx">Diagonal — roll up-left simultaneously</span></div> <div class="wasd-key-row svelte-1788mbx"><span class="wasd-key-badge svelte-1788mbx">W+D</span> <span class="wasd-key-desc svelte-1788mbx">Diagonal — roll up-right simultaneously</span></div> <div class="wasd-key-row svelte-1788mbx"><span class="wasd-combo svelte-1788mbx">W+S or A+D cancel each other (opposite directions)</span></div> <div class="wasd-section-title svelte-1788mbx">Comet Trail</div> <div class="wasd-toggle-row svelte-1788mbx"><div><div class="wasd-toggle-label svelte-1788mbx">Comet Trail Effect</div> <div class="wasd-toggle-sub svelte-1788mbx">Light trails appear when rotating at speed &gt; 15%</div></div> <div id="popup-comet-toggle" title="Toggle comet trails" role="switch" tabindex="0"></div></div> <div class="tip-box svelte-1788mbx"><strong class="svelte-1788mbx">Tip:</strong> Speed builds like a car throttle — hold <strong class="tip-orange svelte-1788mbx">Shift</strong> longer for maximum speed (500 km/h).
        Comet trails glow brighter the faster you go. When speed reaches 0 km/h the
        globe resets to its default position. Disabled during search mode.</div></div></div></div>`);function td(i,e){Gt(e,!0);const t=()=>Cm(sa,"$cometEnabled",n),[n,s]=Pm();let r=Lm(e,"keys",19,()=>({w:!1,a:!1,s:!1,d:!1,q:!1,shift:!1}));pt(()=>{function Y(ie){ie.key==="Escape"&&e.visible&&(ie.stopPropagation(),e.onclose())}return window.addEventListener("keydown",Y),()=>window.removeEventListener("keydown",Y)});function a(Y){Y.target===Y.currentTarget&&e.onclose()}function o(){sa.update(Y=>!Y)}var l=tg();let c;var u=le(l),h=le(u),f=te(le(h),2),m=te(h,2),g=le(m),_=le(g),p=le(_),d=le(p);let x;var v=te(p,2),M=le(v);let C;var A=te(M,2);let T;var z=te(A,2);let y;var b=te(_,2),U=le(b),k=le(U);let Q;var D=te(U,2),O=le(D);let W;var Z=te(g,28),$=te(le(Z),2);let j;Dt(()=>{c=st(l,1,"svelte-1788mbx",null,c,{show:e.visible}),x=st(d,1,"key-block svelte-1788mbx",null,x,{lit:r().w}),C=st(M,1,"key-block svelte-1788mbx",null,C,{lit:r().a}),T=st(A,1,"key-block svelte-1788mbx",null,T,{lit:r().s}),y=st(z,1,"key-block svelte-1788mbx",null,y,{lit:r().d}),Q=st(k,1,"key-block wide svelte-1788mbx",null,Q,{lit:r().q}),W=st(O,1,"key-block wide small-text svelte-1788mbx",null,W,{lit:r().shift}),j=st($,1,"globe-toggle svelte-1788mbx",null,j,{on:t()}),Mn($,"aria-checked",t())}),ze("click",l,a),ze("keydown",l,Y=>Y.key==="Escape"&&e.onclose()),ze("click",f,function(...Y){var ie;(ie=e.onclose)==null||ie.apply(this,Y)}),ze("click",$,o),ze("keydown",$,Y=>Y.key==="Enter"&&o()),nt(i,l),Vt(),s()}jn(["click","keydown"]);var ng=rt('<div class="panel svelte-179rzd6" id="globe-controls"><div class="panel-title svelte-179rzd6">Globe Controls</div> <div class="globe-ctrl-row svelte-179rzd6"><span class="globe-ctrl-label svelte-179rzd6">Auto Rotate</span> <div title="Toggle auto-rotation" role="switch" tabindex="0"></div></div> <div class="globe-ctrl-row svelte-179rzd6"><span class="globe-ctrl-label svelte-179rzd6">Wireframe</span> <div title="Toggle wireframe sphere" role="switch" tabindex="0"></div></div> <div class="globe-ctrl-row svelte-179rzd6"><span class="globe-ctrl-label svelte-179rzd6">Dot Sphere</span> <div title="Toggle particle dots" role="switch" tabindex="0"></div></div> <div class="globe-ctrl-row svelte-179rzd6"><span class="globe-ctrl-label svelte-179rzd6">Connections</span> <div title="Toggle connection lines" role="switch" tabindex="0"></div></div> <div class="globe-ctrl-row svelte-179rzd6"><span class="globe-ctrl-label svelte-179rzd6">Pulse</span> <div title="Toggle breathing pulse animation" role="switch" tabindex="0"></div></div> <div class="globe-ctrl-row svelte-179rzd6"><span class="globe-ctrl-label svelte-179rzd6">Comet Trail</span> <div title="Toggle comet trail effect when rotating with WASD" role="switch" tabindex="0"></div></div> <div class="globe-ctrl-row svelte-179rzd6"><span class="globe-ctrl-label svelte-179rzd6">Pulse Speed</span> <input type="range" class="globe-pulse-slider svelte-179rzd6" id="gc-pulse-speed" min="10" max="200" title="Pulse animation speed"/></div> <div class="globe-ctrl-row svelte-179rzd6"><span class="globe-ctrl-label svelte-179rzd6">Rotate Speed</span> <input type="range" class="globe-speed-slider svelte-179rzd6" id="gc-rotate-speed" min="5" max="200" title="Auto-rotation speed"/></div> <div class="divider svelte-179rzd6"></div> <div class="globe-ctrl-row zoom-row svelte-179rzd6"><div class="zoom-header svelte-179rzd6"><span class="globe-ctrl-label svelte-179rzd6">Zoom</span> <span class="globe-ctrl-label zoom-val svelte-179rzd6"> </span></div> <input type="range" class="globe-zoom-slider svelte-179rzd6" id="gc-zoom" min="10" max="100" title="Camera distance (zoom)"/></div> <div class="divider svelte-179rzd6"></div> <div class="globe-ctrl-row svelte-179rzd6" style="justify-content:center"><button class="detail-btn wasd-btn svelte-179rzd6" id="gc-wasd-guide" title="WASD Rotation Controls Guide">&#9000; WASD Controls</button></div></div> <!>',1);function ig(i,e){Gt(e,!0);let t=Ce(!0),n=Ce(!0),s=Ce(!0),r=Ce(!0),a=Ce(!0),o=Ce(!0),l=Ce(60),c=Ce(35),u=Ce(55),h=Ce(!1);pt(()=>{const N=go.subscribe(J=>{pe(t,J,!0)}),ne=Wl.subscribe(J=>{pe(n,J,!0)}),se=Xl.subscribe(J=>{pe(s,J,!0)}),ae=ql.subscribe(J=>{pe(r,J,!0)}),Te=Yl.subscribe(J=>{pe(a,J,!0)}),me=sa.subscribe(J=>{pe(o,J,!0)}),Me=$l.subscribe(J=>{pe(l,Math.round(J*100),!0)}),De=jl.subscribe(J=>{pe(c,Math.round(J*100),!0)}),Ve=yu.subscribe(J=>{pe(u,J,!0)});return()=>{N(),ne(),se(),ae(),Te(),me(),Me(),De(),Ve()}});let f=it(()=>Math.round(P(u)*100/55)+"%");function m(){go.update(N=>!N)}function g(){Wl.update(N=>!N)}function _(){Xl.update(N=>!N)}function p(){ql.update(N=>!N)}function d(){Yl.update(N=>!N)}function x(){sa.update(N=>!N)}function v(N){const ne=parseInt(N.target.value,10);pe(l,ne,!0),$l.set(ne/100)}function M(N){const ne=parseInt(N.target.value,10);pe(c,ne,!0),jl.set(ne/100)}function C(N){const ne=parseInt(N.target.value,10);pe(u,ne,!0),yu.set(ne)}function A(){pe(h,!0)}function T(){pe(h,!1)}function z(){x()}var y=ng(),b=Xn(y),U=te(le(b),2),k=te(le(U),2);let Q;var D=te(U,2),O=te(le(D),2);let W;var Z=te(D,2),$=te(le(Z),2);let j;var Y=te(Z,2),ie=te(le(Y),2);let ee;var G=te(Y,2),H=te(le(G),2);let oe;var de=te(G,2),ge=te(le(de),2);let xe;var Ae=te(de,2),Ee=te(le(Ae),2),Ue=te(Ae,2),B=te(le(Ue),2),ut=te(Ue,4),we=le(ut),Oe=te(le(we),2),be=le(Oe),mt=te(we,2),Ge=te(ut,4),w=le(Ge),S=te(b,2);td(S,{get visible(){return P(h)},get cometEnabled(){return P(o)},onclose:T,oncometToggle:z}),Dt(()=>{Q=st(k,1,"globe-toggle svelte-179rzd6",null,Q,{on:P(t)}),Mn(k,"aria-checked",P(t)),W=st(O,1,"globe-toggle svelte-179rzd6",null,W,{on:P(n)}),Mn(O,"aria-checked",P(n)),j=st($,1,"globe-toggle svelte-179rzd6",null,j,{on:P(s)}),Mn($,"aria-checked",P(s)),ee=st(ie,1,"globe-toggle svelte-179rzd6",null,ee,{on:P(r)}),Mn(ie,"aria-checked",P(r)),oe=st(H,1,"globe-toggle svelte-179rzd6",null,oe,{on:P(a)}),Mn(H,"aria-checked",P(a)),xe=st(ge,1,"globe-toggle svelte-179rzd6",null,xe,{on:P(o)}),Mn(ge,"aria-checked",P(o)),bs(Ee,P(l)),bs(B,P(c)),ft(be,P(f)),bs(mt,P(u))}),ze("click",k,m),ze("keydown",k,N=>N.key==="Enter"&&m()),ze("click",O,g),ze("keydown",O,N=>N.key==="Enter"&&g()),ze("click",$,_),ze("keydown",$,N=>N.key==="Enter"&&_()),ze("click",ie,p),ze("keydown",ie,N=>N.key==="Enter"&&p()),ze("click",H,d),ze("keydown",H,N=>N.key==="Enter"&&d()),ze("click",ge,x),ze("keydown",ge,N=>N.key==="Enter"&&x()),ze("input",Ee,v),ze("input",B,M),ze("input",mt,C),ze("click",w,A),nt(i,y),Vt()}jn(["click","keydown","input"]);var sg=rt('<div role="button" tabindex="0"><div class="legend-dot svelte-cydj63"></div> <span> </span> <span class="legend-count svelte-cydj63"> </span></div>'),rg=rt('<div class="panel svelte-cydj63" id="legend"><div class="panel-title svelte-cydj63">Categories</div> <!></div>');function ag(i,e){Gt(e,!0);let t=Ce(Tt([])),n=Ce(Tt(new Set(Object.keys(St))));pt(()=>Yn.subscribe(c=>{pe(t,c,!0)})),pt(()=>Vl.subscribe(c=>{pe(n,c,!0)}));function s(l){return P(t).filter(c=>c.cat===l).length}function r(l){Vl.update(c=>{const u=new Set(c);return u.has(l)?u.delete(l):u.add(l),u})}var a=rg(),o=te(le(a),2);ia(o,17,()=>Object.entries(St),na,(l,c)=>{var u=it(()=>op(P(c),2));let h=()=>P(u)[0],f=()=>P(u)[1];var m=sg();let g;var _=le(m),p=te(_,2),d=le(p),x=te(p,2),v=le(x);Dt((M,C)=>{g=st(m,1,"legend-item svelte-cydj63",null,g,M),ai(_,`background:${f().color??""};box-shadow:0 0 5px ${f().color??""}`),ft(d,f().label),ft(v,C)},[()=>({dimmed:!P(n).has(h())}),()=>s(h())]),ze("click",m,()=>r(h())),ze("keydown",m,M=>M.key==="Enter"&&r(h())),nt(l,m)}),nt(i,a),Vt()}jn(["click","keydown"]);var og=rt('<div class="panel svelte-1tag4vz" id="stats"><div class="panel-title svelte-1tag4vz">Graph Stats</div> <div class="stat-row svelte-1tag4vz"><span class="stat-label svelte-1tag4vz">Documents</span> <span class="stat-value svelte-1tag4vz"> </span></div> <div class="stat-row svelte-1tag4vz"><span class="stat-label svelte-1tag4vz">Connections</span> <span class="stat-value svelte-1tag4vz"> </span></div> <div class="stat-row svelte-1tag4vz"><span class="stat-label svelte-1tag4vz">Hub Nodes (5+)</span> <span class="stat-value svelte-1tag4vz"> </span></div> <div class="stat-row svelte-1tag4vz"><span class="stat-label svelte-1tag4vz">Orphan Nodes</span> <span class="stat-value orphan svelte-1tag4vz"> </span></div> <div class="divider svelte-1tag4vz"></div> <div class="stat-row svelte-1tag4vz"><span class="stat-label svelte-1tag4vz">Most Connected</span> <span class="stat-value top svelte-1tag4vz"> </span></div></div>');function lg(i,e){Gt(e,!0);let t=Ce(Tt([])),n=Ce(Tt([]));pt(()=>{const y=Yn.subscribe(U=>{pe(t,U,!0)}),b=Ji.subscribe(U=>{pe(n,U,!0)});return()=>{y(),b()}});let s=it(()=>P(t).length),r=it(()=>P(n).length),a=it(()=>P(t).filter(y=>(y.refs??0)>=5).length),o=it(()=>P(t).filter(y=>(y.refs??0)===0).length),l=it(()=>P(t).length>0?P(t).reduce((y,b)=>(y.refs??0)>(b.refs??0)?y:b,P(t)[0]):null);var c=og(),u=te(le(c),2),h=te(le(u),2),f=le(h),m=te(u,2),g=te(le(m),2),_=le(g),p=te(m,2),d=te(le(p),2),x=le(d),v=te(p,2),M=te(le(v),2),C=le(M),A=te(v,4),T=te(le(A),2),z=le(T);Dt(()=>{ft(f,P(s)),ft(_,P(r)),ft(x,P(a)),ft(C,P(o)),ft(z,P(l)?P(l).label:"—")}),nt(i,c),Vt()}const nd="kg-preview-width",cg=80;function ug(){try{const i=localStorage.getItem(nd);if(i!==null){const e=parseInt(i,10);if(!isNaN(e))return e}}catch{}return cg}const Lc=yt(!1),Dc=yt(null),Kl=yt(ug()),oo=yt("");Kl.subscribe(i=>{try{localStorage.setItem(nd,String(i))}catch{}});function id(i){Dc.set(i),oo.set(""),Lc.set(!0)}function wa(){Lc.set(!1),Dc.set(null)}function Zl(i,e){const t=new Set;return e.forEach(n=>{const s=typeof n.source=="string"?n.source:n.source.id,r=typeof n.target=="string"?n.target:n.target.id;s===i&&t.add(r),r===i&&t.add(s)}),t}function hg(i,e,t,n){const s={};t.forEach(o=>{s[o.id]=[]}),n.forEach(o=>{const l=typeof o.source=="string"?o.source:o.source.id,c=typeof o.target=="string"?o.target:o.target.id;s[l].push(c),s[c].push(l)});const r=new Set([i]),a=[[i]];for(;a.length;){const o=a.shift(),l=o[o.length-1];if(l===e)return o;for(const c of s[l]||[])r.has(c)||(r.add(c),a.push([...o,c]))}return null}var fg=rt('<button class="detail-btn preview-btn svelte-2h78l7">Preview MD</button>'),dg=rt('<span class="detail-keyword svelte-2h78l7"> </span>'),pg=rt('<span class="none-label svelte-2h78l7">None</span>'),mg=rt('<span class="none-label svelte-2h78l7">Orphan node — no connections</span>'),gg=rt('<div class="detail-link-item svelte-2h78l7" role="button" tabindex="0"><div class="detail-link-dot svelte-2h78l7"></div> </div>'),_g=rt('<div class="detail-title svelte-2h78l7"> </div> <div class="detail-cat svelte-2h78l7"> </div> <div class="detail-desc svelte-2h78l7"> </div> <div id="d-actions"><button class="detail-btn svelte-2h78l7">Focus</button> <button class="detail-btn svelte-2h78l7">Impact Analysis</button> <button class="detail-btn svelte-2h78l7">Path From Here</button> <!></div> <div class="detail-section svelte-2h78l7">Keywords</div> <div id="d-keywords"><!></div> <div class="detail-section svelte-2h78l7">Connections</div> <div id="d-connections"><!></div>',1),vg=rt('<div id="detail"><div class="panel-title svelte-2h78l7">Document Detail</div> <!></div>');function xg(i,e){Gt(e,!0);let t=Ce(null),n=Ce(Tt([])),s=Ce(Tt([]));pt(()=>Si.subscribe(d=>{pe(t,d,!0)})),pt(()=>{const p=Yn.subscribe(x=>{pe(n,x,!0)}),d=Ji.subscribe(x=>{pe(s,x,!0)});return()=>{p(),d()}});let r=it(()=>P(t)?P(n).find(p=>p.id===P(t))??null:null),a=it(()=>P(r)!==null),o=it(()=>P(r)?St[P(r).cat]??St.meta:null),l=it(()=>P(r)?Array.from(Zl(P(r).id,P(s))).map(p=>P(n).find(d=>d.id===p)).filter(p=>!!p):[]);function c(p){Si.set(p.id)}function u(){P(r)&&Hi.set("impact")}function h(){P(r)&&Hi.set("path")}var f=vg();let m;var g=te(le(f),2);{var _=p=>{var d=_g(),x=Xn(d),v=le(x),M=te(x,2),C=le(M),A=te(M,2),T=le(A),z=te(A,2),y=le(z),b=te(y,2),U=te(b,2),k=te(U,2);{var Q=ee=>{var G=fg();ze("click",G,()=>id(P(r))),nt(ee,G)};Mi(k,ee=>{P(r).preview&&ee(Q)})}var D=te(z,4),O=le(D);{var W=ee=>{var G=fu(),H=Xn(G);ia(H,17,()=>P(r).keywords??[],na,(oe,de)=>{var ge=dg(),xe=le(ge);Dt(()=>ft(xe,P(de))),nt(oe,ge)}),nt(ee,G)},Z=ee=>{var G=pg();nt(ee,G)};Mi(O,ee=>{(P(r).keywords??[]).length>0?ee(W):ee(Z,-1)})}var $=te(D,4),j=le($);{var Y=ee=>{var G=mg();nt(ee,G)},ie=ee=>{var G=fu(),H=Xn(G);ia(H,17,()=>P(l),na,(oe,de)=>{const ge=it(()=>St[P(de).cat]??St.meta);var xe=gg(),Ae=le(xe),Ee=te(Ae);Dt(()=>{ai(Ae,`background:${P(ge).color??""};box-shadow:0 0 4px ${P(ge).color??""}`),ft(Ee,` ${P(de).label??""}`)}),ze("click",xe,()=>c(P(de))),ze("keydown",xe,Ue=>Ue.key==="Enter"&&c(P(de))),nt(oe,xe)}),nt(ee,G)};Mi(j,ee=>{P(l).length===0?ee(Y):ee(ie,-1)})}Dt(()=>{ft(v,P(r).label),ai(M,`color:${P(o).color??""}`),ft(C,`${P(o).label??""} — ${P(r).file??""??""}`),ft(T,P(r).desc??"No description")}),ze("click",y,()=>window.open(`vscode://file${P(r).file??""}`,"_self")),ze("click",b,u),ze("click",U,h),nt(p,d)};Mi(g,p=>{P(r)&&P(o)&&p(_)})}Dt(()=>m=st(f,1,"panel svelte-2h78l7",null,m,{show:P(a)})),nt(i,f),Vt()}jn(["click","keydown"]);var yg=rt('<span class="path-arrow svelte-1f9fclp">→</span>'),Mg=rt('<span class="path-node svelte-1f9fclp" role="button" tabindex="0"> </span> <!>',1),Sg=rt('<div id="path-panel"><div class="panel-title svelte-1f9fclp">Shortest Path</div> <div id="path-content"> </div> <div class="path-nodes svelte-1f9fclp" id="path-nodes"></div></div>');function bg(i,e){Gt(e,!0);let t=Ce("explore"),n=Ce(Tt([])),s=Ce(Tt([])),r=Ce(Tt([]));pt(()=>Hi.subscribe(x=>{pe(t,x,!0)})),pt(()=>mo.subscribe(x=>{pe(n,x,!0)})),pt(()=>{const d=Yn.subscribe(v=>{pe(s,v,!0)}),x=Ji.subscribe(v=>{pe(r,v,!0)});return()=>{d(),x()}});let a=it(()=>P(t)==="path"),o=it(()=>P(n).length===2?hg(P(n)[0],P(n)[1],P(s),P(r)):null),l=it(()=>()=>{if(P(n).length===0)return"Click START node";if(P(n).length===1){const d=P(s).find(x=>x.id===P(n)[0]);return`Start: ${d?d.label:P(n)[0]} → Click END node`}return P(o)===null?"No path found!":`${P(o).length} nodes, ${P(o).length-1} hops`}),c=it(()=>P(n).length===2&&P(o)===null),u=it(()=>()=>P(o)?P(o).map(d=>{const x=P(s).find(M=>M.id===d),v=St[(x==null?void 0:x.cat)??"meta"]??St.meta;return{node:x,color:v.color}}).filter(d=>d.node!=null):[]);function h(d){Si.set(d.id)}var f=Sg();let m;var g=te(le(f),2),_=le(g),p=te(g,2);ia(p,21,()=>P(u)(),na,(d,x,v)=>{var M=Mg(),C=Xn(M),A=le(C),T=te(C,2);{var z=b=>{var U=yg();nt(b,U)},y=it(()=>v<P(u)().length-1);Mi(T,b=>{P(y)&&b(z)})}Dt(()=>{ai(C,`background:${P(x).color??""}20;border:1px solid ${P(x).color??""};color:${P(x).color??""};cursor:pointer`),ft(A,P(x).node.label)}),ze("click",C,()=>h(P(x).node)),ze("keydown",C,b=>b.key==="Enter"&&h(P(x).node)),nt(d,M)}),Dt(d=>{m=st(f,1,"panel svelte-1f9fclp",null,m,{show:P(a)}),ai(g,`font-size:11px;color:${P(c)?"var(--red)":"var(--text-dim)"}`),ft(_,d)},[()=>P(l)()]),nt(i,f),Vt()}jn(["click","keydown"]);function Eg(i,e){const t=i.toLowerCase().trim();if(!t)return[];const n=[];return e.forEach(s=>{const r={label:(s.label||"").toLowerCase(),id:(s.id||"").toLowerCase(),desc:(s.desc||"").toLowerCase(),keywords:(s.keywords||[]).join(" ").toLowerCase(),file:(s.file||"").toLowerCase()};let a=0;r.label===t?a+=100:r.label.includes(t)&&(a+=60),r.id.includes(t)&&(a+=40),r.keywords.includes(t)&&(a+=30),r.file.includes(t)&&(a+=20),r.desc.includes(t)&&(a+=10),a>0&&n.push({node:s,score:a})}),n.sort((s,r)=>r.score-s.score),n}const Zr=yt(""),sd=ed([Zr,Yn],([i,e])=>Eg(i,e)),Xo=ed(sd,i=>i.length===0?null:new Set(i.map(e=>e.node.id)));var wg=rt('<span> </span> <span class="search-results-count svelte-4vxquv"> </span>',1),Tg=rt('<span>Results</span> <span class="search-results-count svelte-4vxquv"> </span>',1),Ag=rt('<tr class="svelte-4vxquv"><td class="sr-no svelte-4vxquv"></td><td class="sr-name svelte-4vxquv"> </td><td class="sr-path svelte-4vxquv"> </td><td class="sr-score svelte-4vxquv"> </td><td class="sr-bar svelte-4vxquv"><div class="sr-bar-fill"></div></td><td class="sr-view svelte-4vxquv"><button>&#9686;</button></td></tr>'),Rg=rt('<table class="svelte-4vxquv"><thead><tr class="svelte-4vxquv"><th class="sr-no svelte-4vxquv">#</th><th class="svelte-4vxquv">Name</th><th class="svelte-4vxquv">Path</th><th style="text-align:right" class="svelte-4vxquv">Match</th><th class="svelte-4vxquv"></th><th class="sr-view svelte-4vxquv"></th></tr></thead><tbody></tbody></table>'),Cg=rt('<div class="search-results-header svelte-4vxquv"><!></div> <!>',1),Pg=rt('<div id="search-results"><!></div>');function Lg(i,e){Gt(e,!0);let t=Ce(Tt([])),n=Ce(Tt([])),s=Ce("");pt(()=>{const d=sd.subscribe(M=>{pe(t,M,!0)}),x=Yn.subscribe(M=>{pe(n,M,!0)}),v=Zr.subscribe(M=>{pe(s,M,!0)});return()=>{d(),x(),v()}});let r=Ce(!1),a=null;pt(()=>{const d=P(s);if(P(t),a!==null&&(clearTimeout(a),a=null),!d.trim()){pe(r,!1);return}pe(r,!1),a=setTimeout(()=>{pe(r,!0),a=null,setTimeout(()=>{document.querySelectorAll(".sr-bar-fill[data-pct]").forEach(v=>{v.style.width=(v.dataset.pct??"0")+"%"})},50)},800)});let o=it(()=>P(t).length>0?P(t)[0].score:1);function l(d){return Math.round(d/P(o)*100)}function c(d){return d>=80?"var(--green)":d>=50?"var(--yellow)":d>=30?"var(--orange)":"var(--text-dim)"}function u(d,x){if(d.target.closest(".sr-view-btn"))return;const v=P(n).find(M=>M.id===x);v&&(Si.set(x),document.dispatchEvent(new CustomEvent("kg:flyto",{detail:{nodeId:x,node:v}})))}function h(d,x){d.stopPropagation();const v=P(n).find(M=>M.id===x);v!=null&&v.preview&&id(v)}var f=Pg();let m;var g=le(f);{var _=d=>{var x=Cg(),v=Xn(x),M=le(v);{var C=y=>{var b=wg(),U=Xn(b),k=le(U),Q=te(U,2),D=le(Q);Dt(()=>{ft(k,`No results for "${P(s)??""}"`),ft(D,`0 / ${P(n).length??""}`)}),nt(y,b)},A=y=>{var b=Tg(),U=te(Xn(b),2),k=le(U);Dt(()=>ft(k,`${P(t).length??""} / ${P(n).length??""} documents`)),nt(y,b)};Mi(M,y=>{P(t).length===0?y(C):y(A,-1)})}var T=te(v,2);{var z=y=>{var b=Rg(),U=te(le(b));ia(U,21,()=>P(t),na,(k,Q,D)=>{const O=it(()=>P(Q).node),W=it(()=>St[P(O).cat]??St.meta),Z=it(()=>l(P(Q).score)),$=it(()=>c(P(Z))),j=it(()=>!!P(O).preview);var Y=Ag(),ie=le(Y);ie.textContent=D+1;var ee=te(ie),G=le(ee),H=te(ee),oe=le(H),de=te(H),ge=le(de),xe=te(de),Ae=le(xe),Ee=te(xe),Ue=le(Ee);let B;Dt(()=>{Mn(Y,"data-node-id",P(O).id),ai(ee,`color:${P(W).color??""}`),Mn(ee,"title",P(O).label),ft(G,P(O).label),Mn(H,"title",P(O).file??""),ft(oe,P(O).file??""),ai(de,`color:${P($)??""}`),ft(ge,`${P(Z)??""}%`),ai(Ae,`width:0%;background:${P($)??""}`),Mn(Ae,"data-pct",P(Z)),B=st(Ue,1,"sr-view-btn svelte-4vxquv",null,B,{disabled:!P(j)}),Mn(Ue,"data-node-id",P(O).id),Mn(Ue,"title",P(j)?"View document":"No preview")}),ze("click",Y,ut=>u(ut,P(O).id)),ze("click",Ue,ut=>h(ut,P(O).id)),nt(k,Y)}),nt(y,b)};Mi(T,y=>{P(t).length>0&&y(z)})}nt(d,x)},p=it(()=>P(s).trim());Mi(g,d=>{P(p)&&d(_)})}Dt(()=>m=st(f,1,"search-results svelte-4vxquv",null,m,{show:P(r)})),nt(i,f),Vt()}jn(["click"]);var Dg=rt('<div id="search-box" class="svelte-7cby1y"><div id="search-wrap" class="svelte-7cby1y"><input type="text" id="search-input" placeholder="Search... (Kafka, SLA, order, pnpm)" class="svelte-7cby1y"/> <button id="search-clear" title="Clear search">&times;</button></div> <!></div>');function Ug(i,e){Gt(e,!0);let t=Ce("");pt(()=>Zr.subscribe(f=>{pe(t,f,!0)}));function n(h){const f=h.target.value;pe(t,f,!0),Zr.set(f)}function s(){pe(t,""),Zr.set("")}var r=Dg(),a=le(r),o=le(a),l=te(o,2);let c;var u=te(a,2);Lg(u,{}),Dt(()=>{bs(o,P(t)),c=st(l,1,"svelte-7cby1y",null,c,{show:P(t).length>0})}),ze("input",o,n),ze("click",l,s),nt(i,r),Vt()}jn(["input","click"]);/**
 * @license
 * Copyright 2010-2023 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Uc="160",Bs={ROTATE:0,DOLLY:1,PAN:2},Hs={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},Ig=0,Mu=1,Ng=2,rd=1,Og=2,gi=3,Qi=0,un=1,xi=2,$i=0,dr=1,Oi=2,Su=3,bu=4,Fg=5,fs=100,kg=101,zg=102,Eu=103,wu=104,Bg=200,Hg=201,Gg=202,Vg=203,Jl=204,Ql=205,Wg=206,Xg=207,qg=208,Yg=209,$g=210,jg=211,Kg=212,Zg=213,Jg=214,Qg=0,e_=1,t_=2,_o=3,n_=4,i_=5,s_=6,r_=7,ad=0,a_=1,o_=2,ji=0,l_=1,c_=2,u_=3,h_=4,f_=5,d_=6,od=300,Cr=301,Pr=302,ec=303,tc=304,Uo=306,nc=1e3,Gn=1001,ic=1002,tn=1003,Tu=1004,qo=1005,Rn=1006,p_=1007,ra=1008,Ki=1009,m_=1010,g_=1011,Ic=1012,ld=1013,Gi=1014,Vi=1015,aa=1016,cd=1017,ud=1018,Es=1020,__=1021,Vn=1023,v_=1024,x_=1025,ws=1026,Lr=1027,y_=1028,hd=1029,M_=1030,fd=1031,dd=1033,Yo=33776,$o=33777,jo=33778,Ko=33779,Au=35840,Ru=35841,Cu=35842,Pu=35843,pd=36196,Lu=37492,Du=37496,Uu=37808,Iu=37809,Nu=37810,Ou=37811,Fu=37812,ku=37813,zu=37814,Bu=37815,Hu=37816,Gu=37817,Vu=37818,Wu=37819,Xu=37820,qu=37821,Zo=36492,Yu=36494,$u=36495,S_=36283,ju=36284,Ku=36285,Zu=36286,md=3e3,Ts=3001,b_=3200,E_=3201,w_=0,T_=1,Ln="",qt="srgb",Ri="srgb-linear",Nc="display-p3",Io="display-p3-linear",vo="linear",xt="srgb",xo="rec709",yo="p3",Gs=7680,Ju=519,A_=512,R_=513,C_=514,gd=515,P_=516,L_=517,D_=518,U_=519,sc=35044,Qu="300 es",rc=1035,bi=2e3,Mo=2001;class Os{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const n=this._listeners;return n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const s=this._listeners[e];if(s!==void 0){const r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const n=this._listeners[e.type];if(n!==void 0){e.target=this;const s=n.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,e);e.target=null}}}const Zt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],lo=Math.PI/180,ac=180/Math.PI;function Zi(){const i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Zt[i&255]+Zt[i>>8&255]+Zt[i>>16&255]+Zt[i>>24&255]+"-"+Zt[e&255]+Zt[e>>8&255]+"-"+Zt[e>>16&15|64]+Zt[e>>24&255]+"-"+Zt[t&63|128]+Zt[t>>8&255]+"-"+Zt[t>>16&255]+Zt[t>>24&255]+Zt[n&255]+Zt[n>>8&255]+Zt[n>>16&255]+Zt[n>>24&255]).toLowerCase()}function nn(i,e,t){return Math.max(e,Math.min(t,i))}function I_(i,e){return(i%e+e)%e}function Jo(i,e,t){return(1-t)*i+t*e}function eh(i){return(i&i-1)===0&&i!==0}function oc(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function yi(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function vt(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}const N_={DEG2RAD:lo};class Ne{constructor(e=0,t=0){Ne.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6],this.y=s[1]*t+s[4]*n+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(nn(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),s=Math.sin(t),r=this.x-e.x,a=this.y-e.y;return this.x=r*n-a*s+e.x,this.y=r*s+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Ze{constructor(e,t,n,s,r,a,o,l,c){Ze.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,a,o,l,c)}set(e,t,n,s,r,a,o,l,c){const u=this.elements;return u[0]=e,u[1]=s,u[2]=o,u[3]=t,u[4]=r,u[5]=l,u[6]=n,u[7]=a,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,s=t.elements,r=this.elements,a=n[0],o=n[3],l=n[6],c=n[1],u=n[4],h=n[7],f=n[2],m=n[5],g=n[8],_=s[0],p=s[3],d=s[6],x=s[1],v=s[4],M=s[7],C=s[2],A=s[5],T=s[8];return r[0]=a*_+o*x+l*C,r[3]=a*p+o*v+l*A,r[6]=a*d+o*M+l*T,r[1]=c*_+u*x+h*C,r[4]=c*p+u*v+h*A,r[7]=c*d+u*M+h*T,r[2]=f*_+m*x+g*C,r[5]=f*p+m*v+g*A,r[8]=f*d+m*M+g*T,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8];return t*a*u-t*o*c-n*r*u+n*o*l+s*r*c-s*a*l}invert(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8],h=u*a-o*c,f=o*l-u*r,m=c*r-a*l,g=t*h+n*f+s*m;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/g;return e[0]=h*_,e[1]=(s*c-u*n)*_,e[2]=(o*n-s*a)*_,e[3]=f*_,e[4]=(u*t-s*l)*_,e[5]=(s*r-o*t)*_,e[6]=m*_,e[7]=(n*l-c*t)*_,e[8]=(a*t-n*r)*_,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,s,r,a,o){const l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*a+c*o)+a+e,-s*c,s*l,-s*(-c*a+l*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(Qo.makeScale(e,t)),this}rotate(e){return this.premultiply(Qo.makeRotation(-e)),this}translate(e,t){return this.premultiply(Qo.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let s=0;s<9;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const Qo=new Ze;function _d(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function So(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function O_(){const i=So("canvas");return i.style.display="block",i}const th={};function Jr(i){i in th||(th[i]=!0,console.warn(i))}const nh=new Ze().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),ih=new Ze().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),Ta={[Ri]:{transfer:vo,primaries:xo,toReference:i=>i,fromReference:i=>i},[qt]:{transfer:xt,primaries:xo,toReference:i=>i.convertSRGBToLinear(),fromReference:i=>i.convertLinearToSRGB()},[Io]:{transfer:vo,primaries:yo,toReference:i=>i.applyMatrix3(ih),fromReference:i=>i.applyMatrix3(nh)},[Nc]:{transfer:xt,primaries:yo,toReference:i=>i.convertSRGBToLinear().applyMatrix3(ih),fromReference:i=>i.applyMatrix3(nh).convertLinearToSRGB()}},F_=new Set([Ri,Io]),gt={enabled:!0,_workingColorSpace:Ri,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(i){if(!F_.has(i))throw new Error(`Unsupported working color space, "${i}".`);this._workingColorSpace=i},convert:function(i,e,t){if(this.enabled===!1||e===t||!e||!t)return i;const n=Ta[e].toReference,s=Ta[t].fromReference;return s(n(i))},fromWorkingColorSpace:function(i,e){return this.convert(i,this._workingColorSpace,e)},toWorkingColorSpace:function(i,e){return this.convert(i,e,this._workingColorSpace)},getPrimaries:function(i){return Ta[i].primaries},getTransfer:function(i){return i===Ln?vo:Ta[i].transfer}};function pr(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function el(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let Vs;class vd{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{Vs===void 0&&(Vs=So("canvas")),Vs.width=e.width,Vs.height=e.height;const n=Vs.getContext("2d");e instanceof ImageData?n.putImageData(e,0,0):n.drawImage(e,0,0,e.width,e.height),t=Vs}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=So("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const s=n.getImageData(0,0,e.width,e.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=pr(r[a]/255)*255;return n.putImageData(s,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(pr(t[n]/255)*255):t[n]=pr(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let k_=0;class xd{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:k_++}),this.uuid=Zi(),this.data=e,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(tl(s[a].image)):r.push(tl(s[a]))}else r=tl(s);n.url=r}return t||(e.images[this.uuid]=n),n}}function tl(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?vd.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let z_=0;class hn extends Os{constructor(e=hn.DEFAULT_IMAGE,t=hn.DEFAULT_MAPPING,n=Gn,s=Gn,r=Rn,a=ra,o=Vn,l=Ki,c=hn.DEFAULT_ANISOTROPY,u=Ln){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:z_++}),this.uuid=Zi(),this.name="",this.source=new xd(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new Ne(0,0),this.repeat=new Ne(1,1),this.center=new Ne(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ze,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,typeof u=="string"?this.colorSpace=u:(Jr("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=u===Ts?qt:Ln),this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.needsPMREMUpdate=!1}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==od)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case nc:e.x=e.x-Math.floor(e.x);break;case Gn:e.x=e.x<0?0:1;break;case ic:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case nc:e.y=e.y-Math.floor(e.y);break;case Gn:e.y=e.y<0?0:1;break;case ic:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}get encoding(){return Jr("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace===qt?Ts:md}set encoding(e){Jr("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=e===Ts?qt:Ln}}hn.DEFAULT_IMAGE=null;hn.DEFAULT_MAPPING=od;hn.DEFAULT_ANISOTROPY=1;class Ht{constructor(e=0,t=0,n=0,s=1){Ht.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,s){return this.x=e,this.y=t,this.z=n,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,s=this.z,r=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*s+a[12]*r,this.y=a[1]*t+a[5]*n+a[9]*s+a[13]*r,this.z=a[2]*t+a[6]*n+a[10]*s+a[14]*r,this.w=a[3]*t+a[7]*n+a[11]*s+a[15]*r,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,s,r;const l=e.elements,c=l[0],u=l[4],h=l[8],f=l[1],m=l[5],g=l[9],_=l[2],p=l[6],d=l[10];if(Math.abs(u-f)<.01&&Math.abs(h-_)<.01&&Math.abs(g-p)<.01){if(Math.abs(u+f)<.1&&Math.abs(h+_)<.1&&Math.abs(g+p)<.1&&Math.abs(c+m+d-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const v=(c+1)/2,M=(m+1)/2,C=(d+1)/2,A=(u+f)/4,T=(h+_)/4,z=(g+p)/4;return v>M&&v>C?v<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(v),s=A/n,r=T/n):M>C?M<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(M),n=A/s,r=z/s):C<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(C),n=T/r,s=z/r),this.set(n,s,r,t),this}let x=Math.sqrt((p-g)*(p-g)+(h-_)*(h-_)+(f-u)*(f-u));return Math.abs(x)<.001&&(x=1),this.x=(p-g)/x,this.y=(h-_)/x,this.z=(f-u)/x,this.w=Math.acos((c+m+d-1)/2),this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class B_ extends Os{constructor(e=1,t=1,n={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new Ht(0,0,e,t),this.scissorTest=!1,this.viewport=new Ht(0,0,e,t);const s={width:e,height:t,depth:1};n.encoding!==void 0&&(Jr("THREE.WebGLRenderTarget: option.encoding has been replaced by option.colorSpace."),n.colorSpace=n.encoding===Ts?qt:Ln),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Rn,depthBuffer:!0,stencilBuffer:!1,depthTexture:null,samples:0},n),this.texture=new hn(s,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.flipY=!1,this.texture.generateMipmaps=n.generateMipmaps,this.texture.internalFormat=n.internalFormat,this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}setSize(e,t,n=1){(this.width!==e||this.height!==t||this.depth!==n)&&(this.width=e,this.height=t,this.depth=n,this.texture.image.width=e,this.texture.image.height=t,this.texture.image.depth=n,this.dispose()),this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.texture=e.texture.clone(),this.texture.isRenderTargetTexture=!0;const t=Object.assign({},e.texture.image);return this.texture.source=new xd(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Ls extends B_{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class yd extends hn{constructor(e=null,t=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=tn,this.minFilter=tn,this.wrapR=Gn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class H_ extends hn{constructor(e=null,t=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=tn,this.minFilter=tn,this.wrapR=Gn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class oi{constructor(e=0,t=0,n=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=s}static slerpFlat(e,t,n,s,r,a,o){let l=n[s+0],c=n[s+1],u=n[s+2],h=n[s+3];const f=r[a+0],m=r[a+1],g=r[a+2],_=r[a+3];if(o===0){e[t+0]=l,e[t+1]=c,e[t+2]=u,e[t+3]=h;return}if(o===1){e[t+0]=f,e[t+1]=m,e[t+2]=g,e[t+3]=_;return}if(h!==_||l!==f||c!==m||u!==g){let p=1-o;const d=l*f+c*m+u*g+h*_,x=d>=0?1:-1,v=1-d*d;if(v>Number.EPSILON){const C=Math.sqrt(v),A=Math.atan2(C,d*x);p=Math.sin(p*A)/C,o=Math.sin(o*A)/C}const M=o*x;if(l=l*p+f*M,c=c*p+m*M,u=u*p+g*M,h=h*p+_*M,p===1-o){const C=1/Math.sqrt(l*l+c*c+u*u+h*h);l*=C,c*=C,u*=C,h*=C}}e[t]=l,e[t+1]=c,e[t+2]=u,e[t+3]=h}static multiplyQuaternionsFlat(e,t,n,s,r,a){const o=n[s],l=n[s+1],c=n[s+2],u=n[s+3],h=r[a],f=r[a+1],m=r[a+2],g=r[a+3];return e[t]=o*g+u*h+l*m-c*f,e[t+1]=l*g+u*f+c*h-o*m,e[t+2]=c*g+u*m+o*f-l*h,e[t+3]=u*g-o*h-l*f-c*m,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,s){return this._x=e,this._y=t,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,s=e._y,r=e._z,a=e._order,o=Math.cos,l=Math.sin,c=o(n/2),u=o(s/2),h=o(r/2),f=l(n/2),m=l(s/2),g=l(r/2);switch(a){case"XYZ":this._x=f*u*h+c*m*g,this._y=c*m*h-f*u*g,this._z=c*u*g+f*m*h,this._w=c*u*h-f*m*g;break;case"YXZ":this._x=f*u*h+c*m*g,this._y=c*m*h-f*u*g,this._z=c*u*g-f*m*h,this._w=c*u*h+f*m*g;break;case"ZXY":this._x=f*u*h-c*m*g,this._y=c*m*h+f*u*g,this._z=c*u*g+f*m*h,this._w=c*u*h-f*m*g;break;case"ZYX":this._x=f*u*h-c*m*g,this._y=c*m*h+f*u*g,this._z=c*u*g-f*m*h,this._w=c*u*h+f*m*g;break;case"YZX":this._x=f*u*h+c*m*g,this._y=c*m*h+f*u*g,this._z=c*u*g-f*m*h,this._w=c*u*h-f*m*g;break;case"XZY":this._x=f*u*h-c*m*g,this._y=c*m*h-f*u*g,this._z=c*u*g+f*m*h,this._w=c*u*h+f*m*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,s=Math.sin(n);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],s=t[4],r=t[8],a=t[1],o=t[5],l=t[9],c=t[2],u=t[6],h=t[10],f=n+o+h;if(f>0){const m=.5/Math.sqrt(f+1);this._w=.25/m,this._x=(u-l)*m,this._y=(r-c)*m,this._z=(a-s)*m}else if(n>o&&n>h){const m=2*Math.sqrt(1+n-o-h);this._w=(u-l)/m,this._x=.25*m,this._y=(s+a)/m,this._z=(r+c)/m}else if(o>h){const m=2*Math.sqrt(1+o-n-h);this._w=(r-c)/m,this._x=(s+a)/m,this._y=.25*m,this._z=(l+u)/m}else{const m=2*Math.sqrt(1+h-n-o);this._w=(a-s)/m,this._x=(r+c)/m,this._y=(l+u)/m,this._z=.25*m}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<Number.EPSILON?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(nn(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const s=Math.min(1,t/n);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,s=e._y,r=e._z,a=e._w,o=t._x,l=t._y,c=t._z,u=t._w;return this._x=n*u+a*o+s*c-r*l,this._y=s*u+a*l+r*o-n*c,this._z=r*u+a*c+n*l-s*o,this._w=a*u-n*o-s*l-r*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const n=this._x,s=this._y,r=this._z,a=this._w;let o=a*e._w+n*e._x+s*e._y+r*e._z;if(o<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,o=-o):this.copy(e),o>=1)return this._w=a,this._x=n,this._y=s,this._z=r,this;const l=1-o*o;if(l<=Number.EPSILON){const m=1-t;return this._w=m*a+t*this._w,this._x=m*n+t*this._x,this._y=m*s+t*this._y,this._z=m*r+t*this._z,this.normalize(),this}const c=Math.sqrt(l),u=Math.atan2(c,o),h=Math.sin((1-t)*u)/c,f=Math.sin(t*u)/c;return this._w=a*h+this._w*f,this._x=n*h+this._x*f,this._y=s*h+this._y*f,this._z=r*h+this._z*f,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=Math.random(),t=Math.sqrt(1-e),n=Math.sqrt(e),s=2*Math.PI*Math.random(),r=2*Math.PI*Math.random();return this.set(t*Math.cos(s),n*Math.sin(r),n*Math.cos(r),t*Math.sin(s))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class I{constructor(e=0,t=0,n=0){I.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(sh.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(sh.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*s,this.y=r[1]*t+r[4]*n+r[7]*s,this.z=r[2]*t+r[5]*n+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,s=this.z,r=e.elements,a=1/(r[3]*t+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*s+r[12])*a,this.y=(r[1]*t+r[5]*n+r[9]*s+r[13])*a,this.z=(r[2]*t+r[6]*n+r[10]*s+r[14])*a,this}applyQuaternion(e){const t=this.x,n=this.y,s=this.z,r=e.x,a=e.y,o=e.z,l=e.w,c=2*(a*s-o*n),u=2*(o*t-r*s),h=2*(r*n-a*t);return this.x=t+l*c+a*h-o*u,this.y=n+l*u+o*c-r*h,this.z=s+l*h+r*u-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*s,this.y=r[1]*t+r[5]*n+r[9]*s,this.z=r[2]*t+r[6]*n+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,s=e.y,r=e.z,a=t.x,o=t.y,l=t.z;return this.x=s*l-r*o,this.y=r*a-n*l,this.z=n*o-s*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return nl.copy(this).projectOnVector(e),this.sub(nl)}reflect(e){return this.sub(nl.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(nn(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,s=this.z-e.z;return t*t+n*n+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const s=Math.sin(t)*e;return this.x=s*Math.sin(n),this.y=Math.cos(t)*e,this.z=s*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=(Math.random()-.5)*2,t=Math.random()*Math.PI*2,n=Math.sqrt(1-e**2);return this.x=n*Math.cos(t),this.y=n*Math.sin(t),this.z=e,this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const nl=new I,sh=new oi;class da{constructor(e=new I(1/0,1/0,1/0),t=new I(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(On.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(On.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=On.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,On):On.fromBufferAttribute(r,a),On.applyMatrix4(e.matrixWorld),this.expandByPoint(On);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Aa.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Aa.copy(n.boundingBox)),Aa.applyMatrix4(e.matrixWorld),this.union(Aa)}const s=e.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return!(e.x<this.min.x||e.x>this.max.x||e.y<this.min.y||e.y>this.max.y||e.z<this.min.z||e.z>this.max.z)}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return!(e.max.x<this.min.x||e.min.x>this.max.x||e.max.y<this.min.y||e.min.y>this.max.y||e.max.z<this.min.z||e.min.z>this.max.z)}intersectsSphere(e){return this.clampPoint(e.center,On),On.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(zr),Ra.subVectors(this.max,zr),Ws.subVectors(e.a,zr),Xs.subVectors(e.b,zr),qs.subVectors(e.c,zr),Pi.subVectors(Xs,Ws),Li.subVectors(qs,Xs),ss.subVectors(Ws,qs);let t=[0,-Pi.z,Pi.y,0,-Li.z,Li.y,0,-ss.z,ss.y,Pi.z,0,-Pi.x,Li.z,0,-Li.x,ss.z,0,-ss.x,-Pi.y,Pi.x,0,-Li.y,Li.x,0,-ss.y,ss.x,0];return!il(t,Ws,Xs,qs,Ra)||(t=[1,0,0,0,1,0,0,0,1],!il(t,Ws,Xs,qs,Ra))?!1:(Ca.crossVectors(Pi,Li),t=[Ca.x,Ca.y,Ca.z],il(t,Ws,Xs,qs,Ra))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,On).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(On).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(hi[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),hi[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),hi[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),hi[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),hi[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),hi[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),hi[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),hi[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(hi),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const hi=[new I,new I,new I,new I,new I,new I,new I,new I],On=new I,Aa=new da,Ws=new I,Xs=new I,qs=new I,Pi=new I,Li=new I,ss=new I,zr=new I,Ra=new I,Ca=new I,rs=new I;function il(i,e,t,n,s){for(let r=0,a=i.length-3;r<=a;r+=3){rs.fromArray(i,r);const o=s.x*Math.abs(rs.x)+s.y*Math.abs(rs.y)+s.z*Math.abs(rs.z),l=e.dot(rs),c=t.dot(rs),u=n.dot(rs);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>o)return!1}return!0}const G_=new da,Br=new I,sl=new I;class pa{constructor(e=new I,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):G_.setFromPoints(e).getCenter(n);let s=0;for(let r=0,a=e.length;r<a;r++)s=Math.max(s,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Br.subVectors(e,this.center);const t=Br.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),s=(n-this.radius)*.5;this.center.addScaledVector(Br,s/n),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(sl.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Br.copy(e.center).add(sl)),this.expandByPoint(Br.copy(e.center).sub(sl))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const fi=new I,rl=new I,Pa=new I,Di=new I,al=new I,La=new I,ol=new I;class ma{constructor(e=new I,t=new I(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,fi)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=fi.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(fi.copy(this.origin).addScaledVector(this.direction,t),fi.distanceToSquared(e))}distanceSqToSegment(e,t,n,s){rl.copy(e).add(t).multiplyScalar(.5),Pa.copy(t).sub(e).normalize(),Di.copy(this.origin).sub(rl);const r=e.distanceTo(t)*.5,a=-this.direction.dot(Pa),o=Di.dot(this.direction),l=-Di.dot(Pa),c=Di.lengthSq(),u=Math.abs(1-a*a);let h,f,m,g;if(u>0)if(h=a*l-o,f=a*o-l,g=r*u,h>=0)if(f>=-g)if(f<=g){const _=1/u;h*=_,f*=_,m=h*(h+a*f+2*o)+f*(a*h+f+2*l)+c}else f=r,h=Math.max(0,-(a*f+o)),m=-h*h+f*(f+2*l)+c;else f=-r,h=Math.max(0,-(a*f+o)),m=-h*h+f*(f+2*l)+c;else f<=-g?(h=Math.max(0,-(-a*r+o)),f=h>0?-r:Math.min(Math.max(-r,-l),r),m=-h*h+f*(f+2*l)+c):f<=g?(h=0,f=Math.min(Math.max(-r,-l),r),m=f*(f+2*l)+c):(h=Math.max(0,-(a*r+o)),f=h>0?r:Math.min(Math.max(-r,-l),r),m=-h*h+f*(f+2*l)+c);else f=a>0?-r:r,h=Math.max(0,-(a*f+o)),m=-h*h+f*(f+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,h),s&&s.copy(rl).addScaledVector(Pa,f),m}intersectSphere(e,t){fi.subVectors(e.center,this.origin);const n=fi.dot(this.direction),s=fi.dot(fi)-n*n,r=e.radius*e.radius;if(s>r)return null;const a=Math.sqrt(r-s),o=n-a,l=n+a;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,s,r,a,o,l;const c=1/this.direction.x,u=1/this.direction.y,h=1/this.direction.z,f=this.origin;return c>=0?(n=(e.min.x-f.x)*c,s=(e.max.x-f.x)*c):(n=(e.max.x-f.x)*c,s=(e.min.x-f.x)*c),u>=0?(r=(e.min.y-f.y)*u,a=(e.max.y-f.y)*u):(r=(e.max.y-f.y)*u,a=(e.min.y-f.y)*u),n>a||r>s||((r>n||isNaN(n))&&(n=r),(a<s||isNaN(s))&&(s=a),h>=0?(o=(e.min.z-f.z)*h,l=(e.max.z-f.z)*h):(o=(e.max.z-f.z)*h,l=(e.min.z-f.z)*h),n>l||o>s)||((o>n||n!==n)&&(n=o),(l<s||s!==s)&&(s=l),s<0)?null:this.at(n>=0?n:s,t)}intersectsBox(e){return this.intersectBox(e,fi)!==null}intersectTriangle(e,t,n,s,r){al.subVectors(t,e),La.subVectors(n,e),ol.crossVectors(al,La);let a=this.direction.dot(ol),o;if(a>0){if(s)return null;o=1}else if(a<0)o=-1,a=-a;else return null;Di.subVectors(this.origin,e);const l=o*this.direction.dot(La.crossVectors(Di,La));if(l<0)return null;const c=o*this.direction.dot(al.cross(Di));if(c<0||l+c>a)return null;const u=-o*Di.dot(ol);return u<0?null:this.at(u/a,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Rt{constructor(e,t,n,s,r,a,o,l,c,u,h,f,m,g,_,p){Rt.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,a,o,l,c,u,h,f,m,g,_,p)}set(e,t,n,s,r,a,o,l,c,u,h,f,m,g,_,p){const d=this.elements;return d[0]=e,d[4]=t,d[8]=n,d[12]=s,d[1]=r,d[5]=a,d[9]=o,d[13]=l,d[2]=c,d[6]=u,d[10]=h,d[14]=f,d[3]=m,d[7]=g,d[11]=_,d[15]=p,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Rt().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,n=e.elements,s=1/Ys.setFromMatrixColumn(e,0).length(),r=1/Ys.setFromMatrixColumn(e,1).length(),a=1/Ys.setFromMatrixColumn(e,2).length();return t[0]=n[0]*s,t[1]=n[1]*s,t[2]=n[2]*s,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,s=e.y,r=e.z,a=Math.cos(n),o=Math.sin(n),l=Math.cos(s),c=Math.sin(s),u=Math.cos(r),h=Math.sin(r);if(e.order==="XYZ"){const f=a*u,m=a*h,g=o*u,_=o*h;t[0]=l*u,t[4]=-l*h,t[8]=c,t[1]=m+g*c,t[5]=f-_*c,t[9]=-o*l,t[2]=_-f*c,t[6]=g+m*c,t[10]=a*l}else if(e.order==="YXZ"){const f=l*u,m=l*h,g=c*u,_=c*h;t[0]=f+_*o,t[4]=g*o-m,t[8]=a*c,t[1]=a*h,t[5]=a*u,t[9]=-o,t[2]=m*o-g,t[6]=_+f*o,t[10]=a*l}else if(e.order==="ZXY"){const f=l*u,m=l*h,g=c*u,_=c*h;t[0]=f-_*o,t[4]=-a*h,t[8]=g+m*o,t[1]=m+g*o,t[5]=a*u,t[9]=_-f*o,t[2]=-a*c,t[6]=o,t[10]=a*l}else if(e.order==="ZYX"){const f=a*u,m=a*h,g=o*u,_=o*h;t[0]=l*u,t[4]=g*c-m,t[8]=f*c+_,t[1]=l*h,t[5]=_*c+f,t[9]=m*c-g,t[2]=-c,t[6]=o*l,t[10]=a*l}else if(e.order==="YZX"){const f=a*l,m=a*c,g=o*l,_=o*c;t[0]=l*u,t[4]=_-f*h,t[8]=g*h+m,t[1]=h,t[5]=a*u,t[9]=-o*u,t[2]=-c*u,t[6]=m*h+g,t[10]=f-_*h}else if(e.order==="XZY"){const f=a*l,m=a*c,g=o*l,_=o*c;t[0]=l*u,t[4]=-h,t[8]=c*u,t[1]=f*h+_,t[5]=a*u,t[9]=m*h-g,t[2]=g*h-m,t[6]=o*u,t[10]=_*h+f}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(V_,e,W_)}lookAt(e,t,n){const s=this.elements;return mn.subVectors(e,t),mn.lengthSq()===0&&(mn.z=1),mn.normalize(),Ui.crossVectors(n,mn),Ui.lengthSq()===0&&(Math.abs(n.z)===1?mn.x+=1e-4:mn.z+=1e-4,mn.normalize(),Ui.crossVectors(n,mn)),Ui.normalize(),Da.crossVectors(mn,Ui),s[0]=Ui.x,s[4]=Da.x,s[8]=mn.x,s[1]=Ui.y,s[5]=Da.y,s[9]=mn.y,s[2]=Ui.z,s[6]=Da.z,s[10]=mn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,s=t.elements,r=this.elements,a=n[0],o=n[4],l=n[8],c=n[12],u=n[1],h=n[5],f=n[9],m=n[13],g=n[2],_=n[6],p=n[10],d=n[14],x=n[3],v=n[7],M=n[11],C=n[15],A=s[0],T=s[4],z=s[8],y=s[12],b=s[1],U=s[5],k=s[9],Q=s[13],D=s[2],O=s[6],W=s[10],Z=s[14],$=s[3],j=s[7],Y=s[11],ie=s[15];return r[0]=a*A+o*b+l*D+c*$,r[4]=a*T+o*U+l*O+c*j,r[8]=a*z+o*k+l*W+c*Y,r[12]=a*y+o*Q+l*Z+c*ie,r[1]=u*A+h*b+f*D+m*$,r[5]=u*T+h*U+f*O+m*j,r[9]=u*z+h*k+f*W+m*Y,r[13]=u*y+h*Q+f*Z+m*ie,r[2]=g*A+_*b+p*D+d*$,r[6]=g*T+_*U+p*O+d*j,r[10]=g*z+_*k+p*W+d*Y,r[14]=g*y+_*Q+p*Z+d*ie,r[3]=x*A+v*b+M*D+C*$,r[7]=x*T+v*U+M*O+C*j,r[11]=x*z+v*k+M*W+C*Y,r[15]=x*y+v*Q+M*Z+C*ie,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],s=e[8],r=e[12],a=e[1],o=e[5],l=e[9],c=e[13],u=e[2],h=e[6],f=e[10],m=e[14],g=e[3],_=e[7],p=e[11],d=e[15];return g*(+r*l*h-s*c*h-r*o*f+n*c*f+s*o*m-n*l*m)+_*(+t*l*m-t*c*f+r*a*f-s*a*m+s*c*u-r*l*u)+p*(+t*c*h-t*o*m-r*a*h+n*a*m+r*o*u-n*c*u)+d*(-s*o*u-t*l*h+t*o*f+s*a*h-n*a*f+n*l*u)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8],h=e[9],f=e[10],m=e[11],g=e[12],_=e[13],p=e[14],d=e[15],x=h*p*c-_*f*c+_*l*m-o*p*m-h*l*d+o*f*d,v=g*f*c-u*p*c-g*l*m+a*p*m+u*l*d-a*f*d,M=u*_*c-g*h*c+g*o*m-a*_*m-u*o*d+a*h*d,C=g*h*l-u*_*l-g*o*f+a*_*f+u*o*p-a*h*p,A=t*x+n*v+s*M+r*C;if(A===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const T=1/A;return e[0]=x*T,e[1]=(_*f*r-h*p*r-_*s*m+n*p*m+h*s*d-n*f*d)*T,e[2]=(o*p*r-_*l*r+_*s*c-n*p*c-o*s*d+n*l*d)*T,e[3]=(h*l*r-o*f*r-h*s*c+n*f*c+o*s*m-n*l*m)*T,e[4]=v*T,e[5]=(u*p*r-g*f*r+g*s*m-t*p*m-u*s*d+t*f*d)*T,e[6]=(g*l*r-a*p*r-g*s*c+t*p*c+a*s*d-t*l*d)*T,e[7]=(a*f*r-u*l*r+u*s*c-t*f*c-a*s*m+t*l*m)*T,e[8]=M*T,e[9]=(g*h*r-u*_*r-g*n*m+t*_*m+u*n*d-t*h*d)*T,e[10]=(a*_*r-g*o*r+g*n*c-t*_*c-a*n*d+t*o*d)*T,e[11]=(u*o*r-a*h*r-u*n*c+t*h*c+a*n*m-t*o*m)*T,e[12]=C*T,e[13]=(u*_*s-g*h*s+g*n*f-t*_*f-u*n*p+t*h*p)*T,e[14]=(g*o*s-a*_*s-g*n*l+t*_*l+a*n*p-t*o*p)*T,e[15]=(a*h*s-u*o*s+u*n*l-t*h*l-a*n*f+t*o*f)*T,this}scale(e){const t=this.elements,n=e.x,s=e.y,r=e.z;return t[0]*=n,t[4]*=s,t[8]*=r,t[1]*=n,t[5]*=s,t[9]*=r,t[2]*=n,t[6]*=s,t[10]*=r,t[3]*=n,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,s))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),s=Math.sin(t),r=1-n,a=e.x,o=e.y,l=e.z,c=r*a,u=r*o;return this.set(c*a+n,c*o-s*l,c*l+s*o,0,c*o+s*l,u*o+n,u*l-s*a,0,c*l-s*o,u*l+s*a,r*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,s,r,a){return this.set(1,n,r,0,e,1,a,0,t,s,1,0,0,0,0,1),this}compose(e,t,n){const s=this.elements,r=t._x,a=t._y,o=t._z,l=t._w,c=r+r,u=a+a,h=o+o,f=r*c,m=r*u,g=r*h,_=a*u,p=a*h,d=o*h,x=l*c,v=l*u,M=l*h,C=n.x,A=n.y,T=n.z;return s[0]=(1-(_+d))*C,s[1]=(m+M)*C,s[2]=(g-v)*C,s[3]=0,s[4]=(m-M)*A,s[5]=(1-(f+d))*A,s[6]=(p+x)*A,s[7]=0,s[8]=(g+v)*T,s[9]=(p-x)*T,s[10]=(1-(f+_))*T,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,n){const s=this.elements;let r=Ys.set(s[0],s[1],s[2]).length();const a=Ys.set(s[4],s[5],s[6]).length(),o=Ys.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),e.x=s[12],e.y=s[13],e.z=s[14],Fn.copy(this);const c=1/r,u=1/a,h=1/o;return Fn.elements[0]*=c,Fn.elements[1]*=c,Fn.elements[2]*=c,Fn.elements[4]*=u,Fn.elements[5]*=u,Fn.elements[6]*=u,Fn.elements[8]*=h,Fn.elements[9]*=h,Fn.elements[10]*=h,t.setFromRotationMatrix(Fn),n.x=r,n.y=a,n.z=o,this}makePerspective(e,t,n,s,r,a,o=bi){const l=this.elements,c=2*r/(t-e),u=2*r/(n-s),h=(t+e)/(t-e),f=(n+s)/(n-s);let m,g;if(o===bi)m=-(a+r)/(a-r),g=-2*a*r/(a-r);else if(o===Mo)m=-a/(a-r),g=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=c,l[4]=0,l[8]=h,l[12]=0,l[1]=0,l[5]=u,l[9]=f,l[13]=0,l[2]=0,l[6]=0,l[10]=m,l[14]=g,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,n,s,r,a,o=bi){const l=this.elements,c=1/(t-e),u=1/(n-s),h=1/(a-r),f=(t+e)*c,m=(n+s)*u;let g,_;if(o===bi)g=(a+r)*h,_=-2*h;else if(o===Mo)g=r*h,_=-1*h;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-f,l[1]=0,l[5]=2*u,l[9]=0,l[13]=-m,l[2]=0,l[6]=0,l[10]=_,l[14]=-g,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let s=0;s<16;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const Ys=new I,Fn=new Rt,V_=new I(0,0,0),W_=new I(1,1,1),Ui=new I,Da=new I,mn=new I,rh=new Rt,ah=new oi;class No{constructor(e=0,t=0,n=0,s=No.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,s=this._order){return this._x=e,this._y=t,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const s=e.elements,r=s[0],a=s[4],o=s[8],l=s[1],c=s[5],u=s[9],h=s[2],f=s[6],m=s[10];switch(t){case"XYZ":this._y=Math.asin(nn(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-u,m),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(f,c),this._z=0);break;case"YXZ":this._x=Math.asin(-nn(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(o,m),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-h,r),this._z=0);break;case"ZXY":this._x=Math.asin(nn(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-h,m),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-nn(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(f,m),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(nn(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-h,r)):(this._x=0,this._y=Math.atan2(o,m));break;case"XZY":this._z=Math.asin(-nn(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(f,c),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-u,m),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return rh.makeRotationFromQuaternion(e),this.setFromRotationMatrix(rh,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return ah.setFromEuler(this),this.setFromQuaternion(ah,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}No.DEFAULT_ORDER="XYZ";class Oc{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let X_=0;const oh=new I,$s=new oi,di=new Rt,Ua=new I,Hr=new I,q_=new I,Y_=new oi,lh=new I(1,0,0),ch=new I(0,1,0),uh=new I(0,0,1),$_={type:"added"},j_={type:"removed"};class Nt extends Os{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:X_++}),this.uuid=Zi(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Nt.DEFAULT_UP.clone();const e=new I,t=new No,n=new oi,s=new I(1,1,1);function r(){n.setFromEuler(t,!1)}function a(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new Rt},normalMatrix:{value:new Ze}}),this.matrix=new Rt,this.matrixWorld=new Rt,this.matrixAutoUpdate=Nt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Nt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Oc,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return $s.setFromAxisAngle(e,t),this.quaternion.multiply($s),this}rotateOnWorldAxis(e,t){return $s.setFromAxisAngle(e,t),this.quaternion.premultiply($s),this}rotateX(e){return this.rotateOnAxis(lh,e)}rotateY(e){return this.rotateOnAxis(ch,e)}rotateZ(e){return this.rotateOnAxis(uh,e)}translateOnAxis(e,t){return oh.copy(e).applyQuaternion(this.quaternion),this.position.add(oh.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(lh,e)}translateY(e){return this.translateOnAxis(ch,e)}translateZ(e){return this.translateOnAxis(uh,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(di.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Ua.copy(e):Ua.set(e,t,n);const s=this.parent;this.updateWorldMatrix(!0,!1),Hr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?di.lookAt(Hr,Ua,this.up):di.lookAt(Ua,Hr,this.up),this.quaternion.setFromRotationMatrix(di),s&&(di.extractRotation(s.matrixWorld),$s.setFromRotationMatrix(di),this.quaternion.premultiply($s.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.parent!==null&&e.parent.remove(e),e.parent=this,this.children.push(e),e.dispatchEvent($_)):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(j_)),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),di.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),di.multiply(e.parent.matrixWorld)),e.applyMatrix4(di),this.add(e),e.updateWorldMatrix(!1,!0),this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,s=this.children.length;n<s;n++){const a=this.children[n].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Hr,e,q_),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Hr,Y_,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,s=t.length;n<s;n++){const r=t[n];(r.matrixWorldAutoUpdate===!0||e===!0)&&r.updateMatrixWorld(e)}}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.matrixWorldAutoUpdate===!0&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),t===!0){const s=this.children;for(let r=0,a=s.length;r<a;r++){const o=s[r];o.matrixWorldAutoUpdate===!0&&o.updateWorldMatrix(!1,!0)}}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(o=>({boxInitialized:o.boxInitialized,boxMin:o.box.min.toArray(),boxMax:o.box.max.toArray(),sphereInitialized:o.sphereInitialized,sphereRadius:o.sphere.radius,sphereCenter:o.sphere.center.toArray()})),s.maxGeometryCount=this._maxGeometryCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(e),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function r(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){const h=l[c];r(e.shapes,h)}else r(e.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(r(e.materials,this.material[l]));s.material=o}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];s.animations.push(r(e.animations,l))}}if(t){const o=a(e.geometries),l=a(e.materials),c=a(e.textures),u=a(e.images),h=a(e.shapes),f=a(e.skeletons),m=a(e.animations),g=a(e.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),u.length>0&&(n.images=u),h.length>0&&(n.shapes=h),f.length>0&&(n.skeletons=f),m.length>0&&(n.animations=m),g.length>0&&(n.nodes=g)}return n.object=s,n;function a(o){const l=[];for(const c in o){const u=o[c];delete u.metadata,l.push(u)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const s=e.children[n];this.add(s.clone())}return this}}Nt.DEFAULT_UP=new I(0,1,0);Nt.DEFAULT_MATRIX_AUTO_UPDATE=!0;Nt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const kn=new I,pi=new I,ll=new I,mi=new I,js=new I,Ks=new I,hh=new I,cl=new I,ul=new I,hl=new I;let Ia=!1;class Cn{constructor(e=new I,t=new I,n=new I){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,s){s.subVectors(n,t),kn.subVectors(e,t),s.cross(kn);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,n,s,r){kn.subVectors(s,t),pi.subVectors(n,t),ll.subVectors(e,t);const a=kn.dot(kn),o=kn.dot(pi),l=kn.dot(ll),c=pi.dot(pi),u=pi.dot(ll),h=a*c-o*o;if(h===0)return r.set(0,0,0),null;const f=1/h,m=(c*l-o*u)*f,g=(a*u-o*l)*f;return r.set(1-m-g,g,m)}static containsPoint(e,t,n,s){return this.getBarycoord(e,t,n,s,mi)===null?!1:mi.x>=0&&mi.y>=0&&mi.x+mi.y<=1}static getUV(e,t,n,s,r,a,o,l){return Ia===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),Ia=!0),this.getInterpolation(e,t,n,s,r,a,o,l)}static getInterpolation(e,t,n,s,r,a,o,l){return this.getBarycoord(e,t,n,s,mi)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,mi.x),l.addScaledVector(a,mi.y),l.addScaledVector(o,mi.z),l)}static isFrontFacing(e,t,n,s){return kn.subVectors(n,t),pi.subVectors(e,t),kn.cross(pi).dot(s)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,s){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,n,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return kn.subVectors(this.c,this.b),pi.subVectors(this.a,this.b),kn.cross(pi).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Cn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return Cn.getBarycoord(e,this.a,this.b,this.c,t)}getUV(e,t,n,s,r){return Ia===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),Ia=!0),Cn.getInterpolation(e,this.a,this.b,this.c,t,n,s,r)}getInterpolation(e,t,n,s,r){return Cn.getInterpolation(e,this.a,this.b,this.c,t,n,s,r)}containsPoint(e){return Cn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Cn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,s=this.b,r=this.c;let a,o;js.subVectors(s,n),Ks.subVectors(r,n),cl.subVectors(e,n);const l=js.dot(cl),c=Ks.dot(cl);if(l<=0&&c<=0)return t.copy(n);ul.subVectors(e,s);const u=js.dot(ul),h=Ks.dot(ul);if(u>=0&&h<=u)return t.copy(s);const f=l*h-u*c;if(f<=0&&l>=0&&u<=0)return a=l/(l-u),t.copy(n).addScaledVector(js,a);hl.subVectors(e,r);const m=js.dot(hl),g=Ks.dot(hl);if(g>=0&&m<=g)return t.copy(r);const _=m*c-l*g;if(_<=0&&c>=0&&g<=0)return o=c/(c-g),t.copy(n).addScaledVector(Ks,o);const p=u*g-m*h;if(p<=0&&h-u>=0&&m-g>=0)return hh.subVectors(r,s),o=(h-u)/(h-u+(m-g)),t.copy(s).addScaledVector(hh,o);const d=1/(p+_+f);return a=_*d,o=f*d,t.copy(n).addScaledVector(js,a).addScaledVector(Ks,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const Md={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Ii={h:0,s:0,l:0},Na={h:0,s:0,l:0};function fl(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}class ot{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=qt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,gt.toWorkingColorSpace(this,t),this}setRGB(e,t,n,s=gt.workingColorSpace){return this.r=e,this.g=t,this.b=n,gt.toWorkingColorSpace(this,s),this}setHSL(e,t,n,s=gt.workingColorSpace){if(e=I_(e,1),t=nn(t,0,1),n=nn(n,0,1),t===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+t):n+t-n*t,a=2*n-r;this.r=fl(a,r,e+1/3),this.g=fl(a,r,e),this.b=fl(a,r,e-1/3)}return gt.toWorkingColorSpace(this,s),this}setStyle(e,t=qt){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r;const a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){const r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(r,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=qt){const n=Md[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=pr(e.r),this.g=pr(e.g),this.b=pr(e.b),this}copyLinearToSRGB(e){return this.r=el(e.r),this.g=el(e.g),this.b=el(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=qt){return gt.fromWorkingColorSpace(Jt.copy(this),e),Math.round(nn(Jt.r*255,0,255))*65536+Math.round(nn(Jt.g*255,0,255))*256+Math.round(nn(Jt.b*255,0,255))}getHexString(e=qt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=gt.workingColorSpace){gt.fromWorkingColorSpace(Jt.copy(this),t);const n=Jt.r,s=Jt.g,r=Jt.b,a=Math.max(n,s,r),o=Math.min(n,s,r);let l,c;const u=(o+a)/2;if(o===a)l=0,c=0;else{const h=a-o;switch(c=u<=.5?h/(a+o):h/(2-a-o),a){case n:l=(s-r)/h+(s<r?6:0);break;case s:l=(r-n)/h+2;break;case r:l=(n-s)/h+4;break}l/=6}return e.h=l,e.s=c,e.l=u,e}getRGB(e,t=gt.workingColorSpace){return gt.fromWorkingColorSpace(Jt.copy(this),t),e.r=Jt.r,e.g=Jt.g,e.b=Jt.b,e}getStyle(e=qt){gt.fromWorkingColorSpace(Jt.copy(this),e);const t=Jt.r,n=Jt.g,s=Jt.b;return e!==qt?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(e,t,n){return this.getHSL(Ii),this.setHSL(Ii.h+e,Ii.s+t,Ii.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Ii),e.getHSL(Na);const n=Jo(Ii.h,Na.h,t),s=Jo(Ii.s,Na.s,t),r=Jo(Ii.l,Na.l,t);return this.setHSL(n,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*s,this.g=r[1]*t+r[4]*n+r[7]*s,this.b=r[2]*t+r[5]*n+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Jt=new ot;ot.NAMES=Md;let K_=0;class Fs extends Os{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:K_++}),this.uuid=Zi(),this.name="",this.type="Material",this.blending=dr,this.side=Qi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Jl,this.blendDst=Ql,this.blendEquation=fs,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new ot(0,0,0),this.blendAlpha=0,this.depthFunc=_o,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Ju,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Gs,this.stencilZFail=Gs,this.stencilZPass=Gs,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==dr&&(n.blending=this.blending),this.side!==Qi&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Jl&&(n.blendSrc=this.blendSrc),this.blendDst!==Ql&&(n.blendDst=this.blendDst),this.blendEquation!==fs&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==_o&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Ju&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Gs&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Gs&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Gs&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){const a=[];for(const o in r){const l=r[o];delete l.metadata,a.push(l)}return a}if(t){const r=s(e.textures),a=s(e.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const s=t.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class Fc extends Fs{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new ot(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=ad,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const It=new I,Oa=new Ne;class In{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=sc,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.gpuType=Vi,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return console.warn("THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[n+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Oa.fromBufferAttribute(this,t),Oa.applyMatrix3(e),this.setXY(t,Oa.x,Oa.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)It.fromBufferAttribute(this,t),It.applyMatrix3(e),this.setXYZ(t,It.x,It.y,It.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)It.fromBufferAttribute(this,t),It.applyMatrix4(e),this.setXYZ(t,It.x,It.y,It.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)It.fromBufferAttribute(this,t),It.applyNormalMatrix(e),this.setXYZ(t,It.x,It.y,It.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)It.fromBufferAttribute(this,t),It.transformDirection(e),this.setXYZ(t,It.x,It.y,It.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=yi(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=vt(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=yi(t,this.array)),t}setX(e,t){return this.normalized&&(t=vt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=yi(t,this.array)),t}setY(e,t){return this.normalized&&(t=vt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=yi(t,this.array)),t}setZ(e,t){return this.normalized&&(t=vt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=yi(t,this.array)),t}setW(e,t){return this.normalized&&(t=vt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=vt(t,this.array),n=vt(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,s){return e*=this.itemSize,this.normalized&&(t=vt(t,this.array),n=vt(n,this.array),s=vt(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e*=this.itemSize,this.normalized&&(t=vt(t,this.array),n=vt(n,this.array),s=vt(s,this.array),r=vt(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==sc&&(e.usage=this.usage),e}}class Sd extends In{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class bd extends In{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class fn extends In{constructor(e,t,n){super(new Float32Array(e),t,n)}}let Z_=0;const bn=new Rt,dl=new Nt,Zs=new I,gn=new da,Gr=new da,Bt=new I;class rn extends Os{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Z_++}),this.uuid=Zi(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(_d(e)?bd:Sd)(e,1):this.index=e,this}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new Ze().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return bn.makeRotationFromQuaternion(e),this.applyMatrix4(bn),this}rotateX(e){return bn.makeRotationX(e),this.applyMatrix4(bn),this}rotateY(e){return bn.makeRotationY(e),this.applyMatrix4(bn),this}rotateZ(e){return bn.makeRotationZ(e),this.applyMatrix4(bn),this}translate(e,t,n){return bn.makeTranslation(e,t,n),this.applyMatrix4(bn),this}scale(e,t,n){return bn.makeScale(e,t,n),this.applyMatrix4(bn),this}lookAt(e){return dl.lookAt(e),dl.updateMatrix(),this.applyMatrix4(dl.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Zs).negate(),this.translate(Zs.x,Zs.y,Zs.z),this}setFromPoints(e){const t=[];for(let n=0,s=e.length;n<s;n++){const r=e[n];t.push(r.x,r.y,r.z||0)}return this.setAttribute("position",new fn(t,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new da);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingBox.set(new I(-1/0,-1/0,-1/0),new I(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,s=t.length;n<s;n++){const r=t[n];gn.setFromBufferAttribute(r),this.morphTargetsRelative?(Bt.addVectors(this.boundingBox.min,gn.min),this.boundingBox.expandByPoint(Bt),Bt.addVectors(this.boundingBox.max,gn.max),this.boundingBox.expandByPoint(Bt)):(this.boundingBox.expandByPoint(gn.min),this.boundingBox.expandByPoint(gn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new pa);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingSphere.set(new I,1/0);return}if(e){const n=this.boundingSphere.center;if(gn.setFromBufferAttribute(e),t)for(let r=0,a=t.length;r<a;r++){const o=t[r];Gr.setFromBufferAttribute(o),this.morphTargetsRelative?(Bt.addVectors(gn.min,Gr.min),gn.expandByPoint(Bt),Bt.addVectors(gn.max,Gr.max),gn.expandByPoint(Bt)):(gn.expandByPoint(Gr.min),gn.expandByPoint(Gr.max))}gn.getCenter(n);let s=0;for(let r=0,a=e.count;r<a;r++)Bt.fromBufferAttribute(e,r),s=Math.max(s,n.distanceToSquared(Bt));if(t)for(let r=0,a=t.length;r<a;r++){const o=t[r],l=this.morphTargetsRelative;for(let c=0,u=o.count;c<u;c++)Bt.fromBufferAttribute(o,c),l&&(Zs.fromBufferAttribute(e,c),Bt.add(Zs)),s=Math.max(s,n.distanceToSquared(Bt))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.array,s=t.position.array,r=t.normal.array,a=t.uv.array,o=s.length/3;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new In(new Float32Array(4*o),4));const l=this.getAttribute("tangent").array,c=[],u=[];for(let b=0;b<o;b++)c[b]=new I,u[b]=new I;const h=new I,f=new I,m=new I,g=new Ne,_=new Ne,p=new Ne,d=new I,x=new I;function v(b,U,k){h.fromArray(s,b*3),f.fromArray(s,U*3),m.fromArray(s,k*3),g.fromArray(a,b*2),_.fromArray(a,U*2),p.fromArray(a,k*2),f.sub(h),m.sub(h),_.sub(g),p.sub(g);const Q=1/(_.x*p.y-p.x*_.y);isFinite(Q)&&(d.copy(f).multiplyScalar(p.y).addScaledVector(m,-_.y).multiplyScalar(Q),x.copy(m).multiplyScalar(_.x).addScaledVector(f,-p.x).multiplyScalar(Q),c[b].add(d),c[U].add(d),c[k].add(d),u[b].add(x),u[U].add(x),u[k].add(x))}let M=this.groups;M.length===0&&(M=[{start:0,count:n.length}]);for(let b=0,U=M.length;b<U;++b){const k=M[b],Q=k.start,D=k.count;for(let O=Q,W=Q+D;O<W;O+=3)v(n[O+0],n[O+1],n[O+2])}const C=new I,A=new I,T=new I,z=new I;function y(b){T.fromArray(r,b*3),z.copy(T);const U=c[b];C.copy(U),C.sub(T.multiplyScalar(T.dot(U))).normalize(),A.crossVectors(z,U);const Q=A.dot(u[b])<0?-1:1;l[b*4]=C.x,l[b*4+1]=C.y,l[b*4+2]=C.z,l[b*4+3]=Q}for(let b=0,U=M.length;b<U;++b){const k=M[b],Q=k.start,D=k.count;for(let O=Q,W=Q+D;O<W;O+=3)y(n[O+0]),y(n[O+1]),y(n[O+2])}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new In(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let f=0,m=n.count;f<m;f++)n.setXYZ(f,0,0,0);const s=new I,r=new I,a=new I,o=new I,l=new I,c=new I,u=new I,h=new I;if(e)for(let f=0,m=e.count;f<m;f+=3){const g=e.getX(f+0),_=e.getX(f+1),p=e.getX(f+2);s.fromBufferAttribute(t,g),r.fromBufferAttribute(t,_),a.fromBufferAttribute(t,p),u.subVectors(a,r),h.subVectors(s,r),u.cross(h),o.fromBufferAttribute(n,g),l.fromBufferAttribute(n,_),c.fromBufferAttribute(n,p),o.add(u),l.add(u),c.add(u),n.setXYZ(g,o.x,o.y,o.z),n.setXYZ(_,l.x,l.y,l.z),n.setXYZ(p,c.x,c.y,c.z)}else for(let f=0,m=t.count;f<m;f+=3)s.fromBufferAttribute(t,f+0),r.fromBufferAttribute(t,f+1),a.fromBufferAttribute(t,f+2),u.subVectors(a,r),h.subVectors(s,r),u.cross(h),n.setXYZ(f+0,u.x,u.y,u.z),n.setXYZ(f+1,u.x,u.y,u.z),n.setXYZ(f+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Bt.fromBufferAttribute(e,t),Bt.normalize(),e.setXYZ(t,Bt.x,Bt.y,Bt.z)}toNonIndexed(){function e(o,l){const c=o.array,u=o.itemSize,h=o.normalized,f=new c.constructor(l.length*u);let m=0,g=0;for(let _=0,p=l.length;_<p;_++){o.isInterleavedBufferAttribute?m=l[_]*o.data.stride+o.offset:m=l[_]*u;for(let d=0;d<u;d++)f[g++]=c[m++]}return new In(f,u,h)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new rn,n=this.index.array,s=this.attributes;for(const o in s){const l=s[o],c=e(l,n);t.setAttribute(o,c)}const r=this.morphAttributes;for(const o in r){const l=[],c=r[o];for(let u=0,h=c.length;u<h;u++){const f=c[u],m=e(f,n);l.push(m)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const c=a[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const l in n){const c=n[l];e.data.attributes[l]=c.toJSON(e.data)}const s={};let r=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],u=[];for(let h=0,f=c.length;h<f;h++){const m=c[h];u.push(m.toJSON(e.data))}u.length>0&&(s[l]=u,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone(t));const s=e.attributes;for(const c in s){const u=s[c];this.setAttribute(c,u.clone(t))}const r=e.morphAttributes;for(const c in r){const u=[],h=r[c];for(let f=0,m=h.length;f<m;f++)u.push(h[f].clone(t));this.morphAttributes[c]=u}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let c=0,u=a.length;c<u;c++){const h=a[c];this.addGroup(h.start,h.count,h.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const fh=new Rt,as=new ma,Fa=new pa,dh=new I,Js=new I,Qs=new I,er=new I,pl=new I,ka=new I,za=new Ne,Ba=new Ne,Ha=new Ne,ph=new I,mh=new I,gh=new I,Ga=new I,Va=new I;class Ei extends Nt{constructor(e=new rn,t=new Fc){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(e,t){const n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(s,e);const o=this.morphTargetInfluences;if(r&&o){ka.set(0,0,0);for(let l=0,c=r.length;l<c;l++){const u=o[l],h=r[l];u!==0&&(pl.fromBufferAttribute(h,e),a?ka.addScaledVector(pl,u):ka.addScaledVector(pl.sub(t),u))}t.add(ka)}return t}raycast(e,t){const n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Fa.copy(n.boundingSphere),Fa.applyMatrix4(r),as.copy(e.ray).recast(e.near),!(Fa.containsPoint(as.origin)===!1&&(as.intersectSphere(Fa,dh)===null||as.origin.distanceToSquared(dh)>(e.far-e.near)**2))&&(fh.copy(r).invert(),as.copy(e.ray).applyMatrix4(fh),!(n.boundingBox!==null&&as.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,as)))}_computeIntersections(e,t,n){let s;const r=this.geometry,a=this.material,o=r.index,l=r.attributes.position,c=r.attributes.uv,u=r.attributes.uv1,h=r.attributes.normal,f=r.groups,m=r.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,_=f.length;g<_;g++){const p=f[g],d=a[p.materialIndex],x=Math.max(p.start,m.start),v=Math.min(o.count,Math.min(p.start+p.count,m.start+m.count));for(let M=x,C=v;M<C;M+=3){const A=o.getX(M),T=o.getX(M+1),z=o.getX(M+2);s=Wa(this,d,e,n,c,u,h,A,T,z),s&&(s.faceIndex=Math.floor(M/3),s.face.materialIndex=p.materialIndex,t.push(s))}}else{const g=Math.max(0,m.start),_=Math.min(o.count,m.start+m.count);for(let p=g,d=_;p<d;p+=3){const x=o.getX(p),v=o.getX(p+1),M=o.getX(p+2);s=Wa(this,a,e,n,c,u,h,x,v,M),s&&(s.faceIndex=Math.floor(p/3),t.push(s))}}else if(l!==void 0)if(Array.isArray(a))for(let g=0,_=f.length;g<_;g++){const p=f[g],d=a[p.materialIndex],x=Math.max(p.start,m.start),v=Math.min(l.count,Math.min(p.start+p.count,m.start+m.count));for(let M=x,C=v;M<C;M+=3){const A=M,T=M+1,z=M+2;s=Wa(this,d,e,n,c,u,h,A,T,z),s&&(s.faceIndex=Math.floor(M/3),s.face.materialIndex=p.materialIndex,t.push(s))}}else{const g=Math.max(0,m.start),_=Math.min(l.count,m.start+m.count);for(let p=g,d=_;p<d;p+=3){const x=p,v=p+1,M=p+2;s=Wa(this,a,e,n,c,u,h,x,v,M),s&&(s.faceIndex=Math.floor(p/3),t.push(s))}}}}function J_(i,e,t,n,s,r,a,o){let l;if(e.side===un?l=n.intersectTriangle(a,r,s,!0,o):l=n.intersectTriangle(s,r,a,e.side===Qi,o),l===null)return null;Va.copy(o),Va.applyMatrix4(i.matrixWorld);const c=t.ray.origin.distanceTo(Va);return c<t.near||c>t.far?null:{distance:c,point:Va.clone(),object:i}}function Wa(i,e,t,n,s,r,a,o,l,c){i.getVertexPosition(o,Js),i.getVertexPosition(l,Qs),i.getVertexPosition(c,er);const u=J_(i,e,t,n,Js,Qs,er,Ga);if(u){s&&(za.fromBufferAttribute(s,o),Ba.fromBufferAttribute(s,l),Ha.fromBufferAttribute(s,c),u.uv=Cn.getInterpolation(Ga,Js,Qs,er,za,Ba,Ha,new Ne)),r&&(za.fromBufferAttribute(r,o),Ba.fromBufferAttribute(r,l),Ha.fromBufferAttribute(r,c),u.uv1=Cn.getInterpolation(Ga,Js,Qs,er,za,Ba,Ha,new Ne),u.uv2=u.uv1),a&&(ph.fromBufferAttribute(a,o),mh.fromBufferAttribute(a,l),gh.fromBufferAttribute(a,c),u.normal=Cn.getInterpolation(Ga,Js,Qs,er,ph,mh,gh,new I),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));const h={a:o,b:l,c,normal:new I,materialIndex:0};Cn.getNormal(Js,Qs,er,h.normal),u.face=h}return u}class ga extends rn{constructor(e=1,t=1,n=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:s,heightSegments:r,depthSegments:a};const o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);const l=[],c=[],u=[],h=[];let f=0,m=0;g("z","y","x",-1,-1,n,t,e,a,r,0),g("z","y","x",1,-1,n,t,-e,a,r,1),g("x","z","y",1,1,e,n,t,s,a,2),g("x","z","y",1,-1,e,n,-t,s,a,3),g("x","y","z",1,-1,e,t,n,s,r,4),g("x","y","z",-1,-1,e,t,-n,s,r,5),this.setIndex(l),this.setAttribute("position",new fn(c,3)),this.setAttribute("normal",new fn(u,3)),this.setAttribute("uv",new fn(h,2));function g(_,p,d,x,v,M,C,A,T,z,y){const b=M/T,U=C/z,k=M/2,Q=C/2,D=A/2,O=T+1,W=z+1;let Z=0,$=0;const j=new I;for(let Y=0;Y<W;Y++){const ie=Y*U-Q;for(let ee=0;ee<O;ee++){const G=ee*b-k;j[_]=G*x,j[p]=ie*v,j[d]=D,c.push(j.x,j.y,j.z),j[_]=0,j[p]=0,j[d]=A>0?1:-1,u.push(j.x,j.y,j.z),h.push(ee/T),h.push(1-Y/z),Z+=1}}for(let Y=0;Y<z;Y++)for(let ie=0;ie<T;ie++){const ee=f+ie+O*Y,G=f+ie+O*(Y+1),H=f+(ie+1)+O*(Y+1),oe=f+(ie+1)+O*Y;l.push(ee,G,oe),l.push(G,H,oe),$+=6}o.addGroup(m,$,y),m+=$,f+=Z}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ga(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function Dr(i){const e={};for(const t in i){e[t]={};for(const n in i[t]){const s=i[t][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=s.clone():Array.isArray(s)?e[t][n]=s.slice():e[t][n]=s}}return e}function en(i){const e={};for(let t=0;t<i.length;t++){const n=Dr(i[t]);for(const s in n)e[s]=n[s]}return e}function Q_(i){const e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function Ed(i){return i.getRenderTarget()===null?i.outputColorSpace:gt.workingColorSpace}const ev={clone:Dr,merge:en};var tv=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,nv=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Ds extends Fs{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=tv,this.fragmentShader=nv,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={derivatives:!1,fragDepth:!1,drawBuffers:!1,shaderTextureLOD:!1,clipCullDistance:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Dr(e.uniforms),this.uniformsGroups=Q_(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const s in this.uniforms){const a=this.uniforms[s].value;a&&a.isTexture?t.uniforms[s]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[s]={type:"m4",value:a.toArray()}:t.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class wd extends Nt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Rt,this.projectionMatrix=new Rt,this.projectionMatrixInverse=new Rt,this.coordinateSystem=bi}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}class Pn extends wd{constructor(e=50,t=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=ac*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(lo*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return ac*2*Math.atan(Math.tan(lo*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}setViewOffset(e,t,n,s,r,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(lo*.5*this.fov)/this.zoom,n=2*t,s=this.aspect*n,r=-.5*s;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,c=a.fullHeight;r+=a.offsetX*s/l,t-=a.offsetY*n/c,s*=a.width/l,n*=a.height/c}const o=this.filmOffset;o!==0&&(r+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-n,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const tr=-90,nr=1;class iv extends Nt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new Pn(tr,nr,e,t);s.layers=this.layers,this.add(s);const r=new Pn(tr,nr,e,t);r.layers=this.layers,this.add(r);const a=new Pn(tr,nr,e,t);a.layers=this.layers,this.add(a);const o=new Pn(tr,nr,e,t);o.layers=this.layers,this.add(o);const l=new Pn(tr,nr,e,t);l.layers=this.layers,this.add(l);const c=new Pn(tr,nr,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,s,r,a,o,l]=t;for(const c of t)this.remove(c);if(e===bi)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===Mo)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[r,a,o,l,c,u]=this.children,h=e.getRenderTarget(),f=e.getActiveCubeFace(),m=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,s),e.render(t,r),e.setRenderTarget(n,1,s),e.render(t,a),e.setRenderTarget(n,2,s),e.render(t,o),e.setRenderTarget(n,3,s),e.render(t,l),e.setRenderTarget(n,4,s),e.render(t,c),n.texture.generateMipmaps=_,e.setRenderTarget(n,5,s),e.render(t,u),e.setRenderTarget(h,f,m),e.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class Td extends hn{constructor(e,t,n,s,r,a,o,l,c,u){e=e!==void 0?e:[],t=t!==void 0?t:Cr,super(e,t,n,s,r,a,o,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class sv extends Ls{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},s=[n,n,n,n,n,n];t.encoding!==void 0&&(Jr("THREE.WebGLCubeRenderTarget: option.encoding has been replaced by option.colorSpace."),t.colorSpace=t.encoding===Ts?qt:Ln),this.texture=new Td(s,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:Rn}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new ga(5,5,5),r=new Ds({name:"CubemapFromEquirect",uniforms:Dr(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:un,blending:$i});r.uniforms.tEquirect.value=t;const a=new Ei(s,r),o=t.minFilter;return t.minFilter===ra&&(t.minFilter=Rn),new iv(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t,n,s){const r=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,s);e.setRenderTarget(r)}}const ml=new I,rv=new I,av=new Ze;class Ni{constructor(e=new I(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,s){return this.normal.set(e,t,n),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const s=ml.subVectors(n,t).cross(rv.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const n=e.delta(ml),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const r=-(e.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:t.copy(e.start).addScaledVector(n,r)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||av.getNormalMatrix(e),s=this.coplanarPoint(ml).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const os=new pa,Xa=new I;class kc{constructor(e=new Ni,t=new Ni,n=new Ni,s=new Ni,r=new Ni,a=new Ni){this.planes=[e,t,n,s,r,a]}set(e,t,n,s,r,a){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=bi){const n=this.planes,s=e.elements,r=s[0],a=s[1],o=s[2],l=s[3],c=s[4],u=s[5],h=s[6],f=s[7],m=s[8],g=s[9],_=s[10],p=s[11],d=s[12],x=s[13],v=s[14],M=s[15];if(n[0].setComponents(l-r,f-c,p-m,M-d).normalize(),n[1].setComponents(l+r,f+c,p+m,M+d).normalize(),n[2].setComponents(l+a,f+u,p+g,M+x).normalize(),n[3].setComponents(l-a,f-u,p-g,M-x).normalize(),n[4].setComponents(l-o,f-h,p-_,M-v).normalize(),t===bi)n[5].setComponents(l+o,f+h,p+_,M+v).normalize();else if(t===Mo)n[5].setComponents(o,h,_,v).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),os.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),os.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(os)}intersectsSprite(e){return os.center.set(0,0,0),os.radius=.7071067811865476,os.applyMatrix4(e.matrixWorld),this.intersectsSphere(os)}intersectsSphere(e){const t=this.planes,n=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const s=t[n];if(Xa.x=s.normal.x>0?e.max.x:e.min.x,Xa.y=s.normal.y>0?e.max.y:e.min.y,Xa.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(Xa)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function Ad(){let i=null,e=!1,t=null,n=null;function s(r,a){t(r,a),n=i.requestAnimationFrame(s)}return{start:function(){e!==!0&&t!==null&&(n=i.requestAnimationFrame(s),e=!0)},stop:function(){i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){i=r}}}function ov(i,e){const t=e.isWebGL2,n=new WeakMap;function s(c,u){const h=c.array,f=c.usage,m=h.byteLength,g=i.createBuffer();i.bindBuffer(u,g),i.bufferData(u,h,f),c.onUploadCallback();let _;if(h instanceof Float32Array)_=i.FLOAT;else if(h instanceof Uint16Array)if(c.isFloat16BufferAttribute)if(t)_=i.HALF_FLOAT;else throw new Error("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.");else _=i.UNSIGNED_SHORT;else if(h instanceof Int16Array)_=i.SHORT;else if(h instanceof Uint32Array)_=i.UNSIGNED_INT;else if(h instanceof Int32Array)_=i.INT;else if(h instanceof Int8Array)_=i.BYTE;else if(h instanceof Uint8Array)_=i.UNSIGNED_BYTE;else if(h instanceof Uint8ClampedArray)_=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+h);return{buffer:g,type:_,bytesPerElement:h.BYTES_PER_ELEMENT,version:c.version,size:m}}function r(c,u,h){const f=u.array,m=u._updateRange,g=u.updateRanges;if(i.bindBuffer(h,c),m.count===-1&&g.length===0&&i.bufferSubData(h,0,f),g.length!==0){for(let _=0,p=g.length;_<p;_++){const d=g[_];t?i.bufferSubData(h,d.start*f.BYTES_PER_ELEMENT,f,d.start,d.count):i.bufferSubData(h,d.start*f.BYTES_PER_ELEMENT,f.subarray(d.start,d.start+d.count))}u.clearUpdateRanges()}m.count!==-1&&(t?i.bufferSubData(h,m.offset*f.BYTES_PER_ELEMENT,f,m.offset,m.count):i.bufferSubData(h,m.offset*f.BYTES_PER_ELEMENT,f.subarray(m.offset,m.offset+m.count)),m.count=-1),u.onUploadCallback()}function a(c){return c.isInterleavedBufferAttribute&&(c=c.data),n.get(c)}function o(c){c.isInterleavedBufferAttribute&&(c=c.data);const u=n.get(c);u&&(i.deleteBuffer(u.buffer),n.delete(c))}function l(c,u){if(c.isGLBufferAttribute){const f=n.get(c);(!f||f.version<c.version)&&n.set(c,{buffer:c.buffer,type:c.type,bytesPerElement:c.elementSize,version:c.version});return}c.isInterleavedBufferAttribute&&(c=c.data);const h=n.get(c);if(h===void 0)n.set(c,s(c,u));else if(h.version<c.version){if(h.size!==c.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");r(h.buffer,c,u),h.version=c.version}}return{get:a,remove:o,update:l}}class zc extends rn{constructor(e=1,t=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:s};const r=e/2,a=t/2,o=Math.floor(n),l=Math.floor(s),c=o+1,u=l+1,h=e/o,f=t/l,m=[],g=[],_=[],p=[];for(let d=0;d<u;d++){const x=d*f-a;for(let v=0;v<c;v++){const M=v*h-r;g.push(M,-x,0),_.push(0,0,1),p.push(v/o),p.push(1-d/l)}}for(let d=0;d<l;d++)for(let x=0;x<o;x++){const v=x+c*d,M=x+c*(d+1),C=x+1+c*(d+1),A=x+1+c*d;m.push(v,M,A),m.push(M,C,A)}this.setIndex(m),this.setAttribute("position",new fn(g,3)),this.setAttribute("normal",new fn(_,3)),this.setAttribute("uv",new fn(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new zc(e.width,e.height,e.widthSegments,e.heightSegments)}}var lv=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,cv=`#ifdef USE_ALPHAHASH
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
#endif`,uv=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,hv=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,fv=`#ifdef USE_ALPHATEST
	if ( diffuseColor.a < alphaTest ) discard;
#endif`,dv=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,pv=`#ifdef USE_AOMAP
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
#endif`,mv=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,gv=`#ifdef USE_BATCHING
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
#endif`,_v=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( batchId );
#endif`,vv=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,xv=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,yv=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Mv=`#ifdef USE_IRIDESCENCE
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
#endif`,Sv=`#ifdef USE_BUMPMAP
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
#endif`,bv=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Ev=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,wv=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Tv=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Av=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Rv=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Cv=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,Pv=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,Lv=`#define PI 3.141592653589793
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
} // validated`,Dv=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,Uv=`vec3 transformedNormal = objectNormal;
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
#endif`,Iv=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Nv=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Ov=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Fv=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,kv="gl_FragColor = linearToOutputTexel( gl_FragColor );",zv=`
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
}`,Bv=`#ifdef USE_ENVMAP
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
#endif`,Hv=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Gv=`#ifdef USE_ENVMAP
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
#endif`,Vv=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Wv=`#ifdef USE_ENVMAP
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
#endif`,Xv=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,qv=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Yv=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,$v=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,jv=`#ifdef USE_GRADIENTMAP
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
}`,Kv=`#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`,Zv=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Jv=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Qv=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,e0=`uniform bool receiveShadow;
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
#endif`,t0=`#ifdef USE_ENVMAP
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
#endif`,n0=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,i0=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,s0=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,r0=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,a0=`PhysicalMaterial material;
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
#endif`,o0=`struct PhysicalMaterial {
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
}`,l0=`
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
#endif`,c0=`#if defined( RE_IndirectDiffuse )
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
#endif`,u0=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,h0=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	gl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,f0=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,d0=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		varying float vFragDepth;
		varying float vIsPerspective;
	#else
		uniform float logDepthBufFC;
	#endif
#endif`,p0=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		vFragDepth = 1.0 + gl_Position.w;
		vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
	#else
		if ( isPerspectiveMatrix( projectionMatrix ) ) {
			gl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;
			gl_Position.z *= gl_Position.w;
		}
	#endif
#endif`,m0=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,g0=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,_0=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,v0=`#if defined( USE_POINTS_UV )
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
#endif`,x0=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,y0=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,M0=`#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,S0=`#ifdef USE_MORPHNORMALS
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
#endif`,b0=`#ifdef USE_MORPHTARGETS
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
#endif`,E0=`#ifdef USE_MORPHTARGETS
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
#endif`,w0=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,T0=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,A0=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,R0=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,C0=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,P0=`#ifdef USE_NORMALMAP
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
#endif`,L0=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,D0=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,U0=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,I0=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,N0=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,O0=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,F0=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,k0=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,z0=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,B0=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,H0=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,G0=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,V0=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,W0=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,X0=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,q0=`float getShadowMask() {
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
}`,Y0=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,$0=`#ifdef USE_SKINNING
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
#endif`,j0=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,K0=`#ifdef USE_SKINNING
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
#endif`,Z0=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,J0=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Q0=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,ex=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,tx=`#ifdef USE_TRANSMISSION
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
#endif`,nx=`#ifdef USE_TRANSMISSION
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
#endif`,ix=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,sx=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,rx=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,ax=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const ox=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,lx=`uniform sampler2D t2D;
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
}`,cx=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,ux=`#ifdef ENVMAP_TYPE_CUBE
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
}`,hx=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,fx=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,dx=`#include <common>
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
}`,px=`#if DEPTH_PACKING == 3200
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
}`,mx=`#define DISTANCE
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
}`,gx=`#define DISTANCE
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
}`,_x=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,vx=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,xx=`uniform float scale;
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
}`,yx=`uniform vec3 diffuse;
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
}`,Mx=`#include <common>
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
}`,Sx=`uniform vec3 diffuse;
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
}`,bx=`#define LAMBERT
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
}`,Ex=`#define LAMBERT
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
}`,wx=`#define MATCAP
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
}`,Tx=`#define MATCAP
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
}`,Ax=`#define NORMAL
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
}`,Rx=`#define NORMAL
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
}`,Cx=`#define PHONG
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
}`,Px=`#define PHONG
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
}`,Lx=`#define STANDARD
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
}`,Dx=`#define STANDARD
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
}`,Ux=`#define TOON
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
}`,Ix=`#define TOON
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
}`,Nx=`uniform float size;
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
}`,Ox=`uniform vec3 diffuse;
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
}`,Fx=`#include <common>
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
}`,kx=`uniform vec3 color;
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
}`,zx=`uniform float rotation;
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
}`,Bx=`uniform vec3 diffuse;
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
}`,qe={alphahash_fragment:lv,alphahash_pars_fragment:cv,alphamap_fragment:uv,alphamap_pars_fragment:hv,alphatest_fragment:fv,alphatest_pars_fragment:dv,aomap_fragment:pv,aomap_pars_fragment:mv,batching_pars_vertex:gv,batching_vertex:_v,begin_vertex:vv,beginnormal_vertex:xv,bsdfs:yv,iridescence_fragment:Mv,bumpmap_pars_fragment:Sv,clipping_planes_fragment:bv,clipping_planes_pars_fragment:Ev,clipping_planes_pars_vertex:wv,clipping_planes_vertex:Tv,color_fragment:Av,color_pars_fragment:Rv,color_pars_vertex:Cv,color_vertex:Pv,common:Lv,cube_uv_reflection_fragment:Dv,defaultnormal_vertex:Uv,displacementmap_pars_vertex:Iv,displacementmap_vertex:Nv,emissivemap_fragment:Ov,emissivemap_pars_fragment:Fv,colorspace_fragment:kv,colorspace_pars_fragment:zv,envmap_fragment:Bv,envmap_common_pars_fragment:Hv,envmap_pars_fragment:Gv,envmap_pars_vertex:Vv,envmap_physical_pars_fragment:t0,envmap_vertex:Wv,fog_vertex:Xv,fog_pars_vertex:qv,fog_fragment:Yv,fog_pars_fragment:$v,gradientmap_pars_fragment:jv,lightmap_fragment:Kv,lightmap_pars_fragment:Zv,lights_lambert_fragment:Jv,lights_lambert_pars_fragment:Qv,lights_pars_begin:e0,lights_toon_fragment:n0,lights_toon_pars_fragment:i0,lights_phong_fragment:s0,lights_phong_pars_fragment:r0,lights_physical_fragment:a0,lights_physical_pars_fragment:o0,lights_fragment_begin:l0,lights_fragment_maps:c0,lights_fragment_end:u0,logdepthbuf_fragment:h0,logdepthbuf_pars_fragment:f0,logdepthbuf_pars_vertex:d0,logdepthbuf_vertex:p0,map_fragment:m0,map_pars_fragment:g0,map_particle_fragment:_0,map_particle_pars_fragment:v0,metalnessmap_fragment:x0,metalnessmap_pars_fragment:y0,morphcolor_vertex:M0,morphnormal_vertex:S0,morphtarget_pars_vertex:b0,morphtarget_vertex:E0,normal_fragment_begin:w0,normal_fragment_maps:T0,normal_pars_fragment:A0,normal_pars_vertex:R0,normal_vertex:C0,normalmap_pars_fragment:P0,clearcoat_normal_fragment_begin:L0,clearcoat_normal_fragment_maps:D0,clearcoat_pars_fragment:U0,iridescence_pars_fragment:I0,opaque_fragment:N0,packing:O0,premultiplied_alpha_fragment:F0,project_vertex:k0,dithering_fragment:z0,dithering_pars_fragment:B0,roughnessmap_fragment:H0,roughnessmap_pars_fragment:G0,shadowmap_pars_fragment:V0,shadowmap_pars_vertex:W0,shadowmap_vertex:X0,shadowmask_pars_fragment:q0,skinbase_vertex:Y0,skinning_pars_vertex:$0,skinning_vertex:j0,skinnormal_vertex:K0,specularmap_fragment:Z0,specularmap_pars_fragment:J0,tonemapping_fragment:Q0,tonemapping_pars_fragment:ex,transmission_fragment:tx,transmission_pars_fragment:nx,uv_pars_fragment:ix,uv_pars_vertex:sx,uv_vertex:rx,worldpos_vertex:ax,background_vert:ox,background_frag:lx,backgroundCube_vert:cx,backgroundCube_frag:ux,cube_vert:hx,cube_frag:fx,depth_vert:dx,depth_frag:px,distanceRGBA_vert:mx,distanceRGBA_frag:gx,equirect_vert:_x,equirect_frag:vx,linedashed_vert:xx,linedashed_frag:yx,meshbasic_vert:Mx,meshbasic_frag:Sx,meshlambert_vert:bx,meshlambert_frag:Ex,meshmatcap_vert:wx,meshmatcap_frag:Tx,meshnormal_vert:Ax,meshnormal_frag:Rx,meshphong_vert:Cx,meshphong_frag:Px,meshphysical_vert:Lx,meshphysical_frag:Dx,meshtoon_vert:Ux,meshtoon_frag:Ix,points_vert:Nx,points_frag:Ox,shadow_vert:Fx,shadow_frag:kx,sprite_vert:zx,sprite_frag:Bx},fe={common:{diffuse:{value:new ot(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ze},alphaMap:{value:null},alphaMapTransform:{value:new Ze},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ze}},envmap:{envMap:{value:null},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ze}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ze}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ze},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ze},normalScale:{value:new Ne(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ze},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ze}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ze}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ze}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new ot(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new ot(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ze},alphaTest:{value:0},uvTransform:{value:new Ze}},sprite:{diffuse:{value:new ot(16777215)},opacity:{value:1},center:{value:new Ne(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ze},alphaMap:{value:null},alphaMapTransform:{value:new Ze},alphaTest:{value:0}}},ti={basic:{uniforms:en([fe.common,fe.specularmap,fe.envmap,fe.aomap,fe.lightmap,fe.fog]),vertexShader:qe.meshbasic_vert,fragmentShader:qe.meshbasic_frag},lambert:{uniforms:en([fe.common,fe.specularmap,fe.envmap,fe.aomap,fe.lightmap,fe.emissivemap,fe.bumpmap,fe.normalmap,fe.displacementmap,fe.fog,fe.lights,{emissive:{value:new ot(0)}}]),vertexShader:qe.meshlambert_vert,fragmentShader:qe.meshlambert_frag},phong:{uniforms:en([fe.common,fe.specularmap,fe.envmap,fe.aomap,fe.lightmap,fe.emissivemap,fe.bumpmap,fe.normalmap,fe.displacementmap,fe.fog,fe.lights,{emissive:{value:new ot(0)},specular:{value:new ot(1118481)},shininess:{value:30}}]),vertexShader:qe.meshphong_vert,fragmentShader:qe.meshphong_frag},standard:{uniforms:en([fe.common,fe.envmap,fe.aomap,fe.lightmap,fe.emissivemap,fe.bumpmap,fe.normalmap,fe.displacementmap,fe.roughnessmap,fe.metalnessmap,fe.fog,fe.lights,{emissive:{value:new ot(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:qe.meshphysical_vert,fragmentShader:qe.meshphysical_frag},toon:{uniforms:en([fe.common,fe.aomap,fe.lightmap,fe.emissivemap,fe.bumpmap,fe.normalmap,fe.displacementmap,fe.gradientmap,fe.fog,fe.lights,{emissive:{value:new ot(0)}}]),vertexShader:qe.meshtoon_vert,fragmentShader:qe.meshtoon_frag},matcap:{uniforms:en([fe.common,fe.bumpmap,fe.normalmap,fe.displacementmap,fe.fog,{matcap:{value:null}}]),vertexShader:qe.meshmatcap_vert,fragmentShader:qe.meshmatcap_frag},points:{uniforms:en([fe.points,fe.fog]),vertexShader:qe.points_vert,fragmentShader:qe.points_frag},dashed:{uniforms:en([fe.common,fe.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:qe.linedashed_vert,fragmentShader:qe.linedashed_frag},depth:{uniforms:en([fe.common,fe.displacementmap]),vertexShader:qe.depth_vert,fragmentShader:qe.depth_frag},normal:{uniforms:en([fe.common,fe.bumpmap,fe.normalmap,fe.displacementmap,{opacity:{value:1}}]),vertexShader:qe.meshnormal_vert,fragmentShader:qe.meshnormal_frag},sprite:{uniforms:en([fe.sprite,fe.fog]),vertexShader:qe.sprite_vert,fragmentShader:qe.sprite_frag},background:{uniforms:{uvTransform:{value:new Ze},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:qe.background_vert,fragmentShader:qe.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1}},vertexShader:qe.backgroundCube_vert,fragmentShader:qe.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:qe.cube_vert,fragmentShader:qe.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:qe.equirect_vert,fragmentShader:qe.equirect_frag},distanceRGBA:{uniforms:en([fe.common,fe.displacementmap,{referencePosition:{value:new I},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:qe.distanceRGBA_vert,fragmentShader:qe.distanceRGBA_frag},shadow:{uniforms:en([fe.lights,fe.fog,{color:{value:new ot(0)},opacity:{value:1}}]),vertexShader:qe.shadow_vert,fragmentShader:qe.shadow_frag}};ti.physical={uniforms:en([ti.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ze},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ze},clearcoatNormalScale:{value:new Ne(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ze},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ze},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ze},sheen:{value:0},sheenColor:{value:new ot(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ze},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ze},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ze},transmissionSamplerSize:{value:new Ne},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ze},attenuationDistance:{value:0},attenuationColor:{value:new ot(0)},specularColor:{value:new ot(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ze},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ze},anisotropyVector:{value:new Ne},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ze}}]),vertexShader:qe.meshphysical_vert,fragmentShader:qe.meshphysical_frag};const qa={r:0,b:0,g:0};function Hx(i,e,t,n,s,r,a){const o=new ot(0);let l=r===!0?0:1,c,u,h=null,f=0,m=null;function g(p,d){let x=!1,v=d.isScene===!0?d.background:null;v&&v.isTexture&&(v=(d.backgroundBlurriness>0?t:e).get(v)),v===null?_(o,l):v&&v.isColor&&(_(v,1),x=!0);const M=i.xr.getEnvironmentBlendMode();M==="additive"?n.buffers.color.setClear(0,0,0,1,a):M==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,a),(i.autoClear||x)&&i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil),v&&(v.isCubeTexture||v.mapping===Uo)?(u===void 0&&(u=new Ei(new ga(1,1,1),new Ds({name:"BackgroundCubeMaterial",uniforms:Dr(ti.backgroundCube.uniforms),vertexShader:ti.backgroundCube.vertexShader,fragmentShader:ti.backgroundCube.fragmentShader,side:un,depthTest:!1,depthWrite:!1,fog:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(C,A,T){this.matrixWorld.copyPosition(T.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(u)),u.material.uniforms.envMap.value=v,u.material.uniforms.flipEnvMap.value=v.isCubeTexture&&v.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=d.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=d.backgroundIntensity,u.material.toneMapped=gt.getTransfer(v.colorSpace)!==xt,(h!==v||f!==v.version||m!==i.toneMapping)&&(u.material.needsUpdate=!0,h=v,f=v.version,m=i.toneMapping),u.layers.enableAll(),p.unshift(u,u.geometry,u.material,0,0,null)):v&&v.isTexture&&(c===void 0&&(c=new Ei(new zc(2,2),new Ds({name:"BackgroundMaterial",uniforms:Dr(ti.background.uniforms),vertexShader:ti.background.vertexShader,fragmentShader:ti.background.fragmentShader,side:Qi,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(c)),c.material.uniforms.t2D.value=v,c.material.uniforms.backgroundIntensity.value=d.backgroundIntensity,c.material.toneMapped=gt.getTransfer(v.colorSpace)!==xt,v.matrixAutoUpdate===!0&&v.updateMatrix(),c.material.uniforms.uvTransform.value.copy(v.matrix),(h!==v||f!==v.version||m!==i.toneMapping)&&(c.material.needsUpdate=!0,h=v,f=v.version,m=i.toneMapping),c.layers.enableAll(),p.unshift(c,c.geometry,c.material,0,0,null))}function _(p,d){p.getRGB(qa,Ed(i)),n.buffers.color.setClear(qa.r,qa.g,qa.b,d,a)}return{getClearColor:function(){return o},setClearColor:function(p,d=1){o.set(p),l=d,_(o,l)},getClearAlpha:function(){return l},setClearAlpha:function(p){l=p,_(o,l)},render:g}}function Gx(i,e,t,n){const s=i.getParameter(i.MAX_VERTEX_ATTRIBS),r=n.isWebGL2?null:e.get("OES_vertex_array_object"),a=n.isWebGL2||r!==null,o={},l=p(null);let c=l,u=!1;function h(D,O,W,Z,$){let j=!1;if(a){const Y=_(Z,W,O);c!==Y&&(c=Y,m(c.object)),j=d(D,Z,W,$),j&&x(D,Z,W,$)}else{const Y=O.wireframe===!0;(c.geometry!==Z.id||c.program!==W.id||c.wireframe!==Y)&&(c.geometry=Z.id,c.program=W.id,c.wireframe=Y,j=!0)}$!==null&&t.update($,i.ELEMENT_ARRAY_BUFFER),(j||u)&&(u=!1,z(D,O,W,Z),$!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get($).buffer))}function f(){return n.isWebGL2?i.createVertexArray():r.createVertexArrayOES()}function m(D){return n.isWebGL2?i.bindVertexArray(D):r.bindVertexArrayOES(D)}function g(D){return n.isWebGL2?i.deleteVertexArray(D):r.deleteVertexArrayOES(D)}function _(D,O,W){const Z=W.wireframe===!0;let $=o[D.id];$===void 0&&($={},o[D.id]=$);let j=$[O.id];j===void 0&&(j={},$[O.id]=j);let Y=j[Z];return Y===void 0&&(Y=p(f()),j[Z]=Y),Y}function p(D){const O=[],W=[],Z=[];for(let $=0;$<s;$++)O[$]=0,W[$]=0,Z[$]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:O,enabledAttributes:W,attributeDivisors:Z,object:D,attributes:{},index:null}}function d(D,O,W,Z){const $=c.attributes,j=O.attributes;let Y=0;const ie=W.getAttributes();for(const ee in ie)if(ie[ee].location>=0){const H=$[ee];let oe=j[ee];if(oe===void 0&&(ee==="instanceMatrix"&&D.instanceMatrix&&(oe=D.instanceMatrix),ee==="instanceColor"&&D.instanceColor&&(oe=D.instanceColor)),H===void 0||H.attribute!==oe||oe&&H.data!==oe.data)return!0;Y++}return c.attributesNum!==Y||c.index!==Z}function x(D,O,W,Z){const $={},j=O.attributes;let Y=0;const ie=W.getAttributes();for(const ee in ie)if(ie[ee].location>=0){let H=j[ee];H===void 0&&(ee==="instanceMatrix"&&D.instanceMatrix&&(H=D.instanceMatrix),ee==="instanceColor"&&D.instanceColor&&(H=D.instanceColor));const oe={};oe.attribute=H,H&&H.data&&(oe.data=H.data),$[ee]=oe,Y++}c.attributes=$,c.attributesNum=Y,c.index=Z}function v(){const D=c.newAttributes;for(let O=0,W=D.length;O<W;O++)D[O]=0}function M(D){C(D,0)}function C(D,O){const W=c.newAttributes,Z=c.enabledAttributes,$=c.attributeDivisors;W[D]=1,Z[D]===0&&(i.enableVertexAttribArray(D),Z[D]=1),$[D]!==O&&((n.isWebGL2?i:e.get("ANGLE_instanced_arrays"))[n.isWebGL2?"vertexAttribDivisor":"vertexAttribDivisorANGLE"](D,O),$[D]=O)}function A(){const D=c.newAttributes,O=c.enabledAttributes;for(let W=0,Z=O.length;W<Z;W++)O[W]!==D[W]&&(i.disableVertexAttribArray(W),O[W]=0)}function T(D,O,W,Z,$,j,Y){Y===!0?i.vertexAttribIPointer(D,O,W,$,j):i.vertexAttribPointer(D,O,W,Z,$,j)}function z(D,O,W,Z){if(n.isWebGL2===!1&&(D.isInstancedMesh||Z.isInstancedBufferGeometry)&&e.get("ANGLE_instanced_arrays")===null)return;v();const $=Z.attributes,j=W.getAttributes(),Y=O.defaultAttributeValues;for(const ie in j){const ee=j[ie];if(ee.location>=0){let G=$[ie];if(G===void 0&&(ie==="instanceMatrix"&&D.instanceMatrix&&(G=D.instanceMatrix),ie==="instanceColor"&&D.instanceColor&&(G=D.instanceColor)),G!==void 0){const H=G.normalized,oe=G.itemSize,de=t.get(G);if(de===void 0)continue;const ge=de.buffer,xe=de.type,Ae=de.bytesPerElement,Ee=n.isWebGL2===!0&&(xe===i.INT||xe===i.UNSIGNED_INT||G.gpuType===ld);if(G.isInterleavedBufferAttribute){const Ue=G.data,B=Ue.stride,ut=G.offset;if(Ue.isInstancedInterleavedBuffer){for(let we=0;we<ee.locationSize;we++)C(ee.location+we,Ue.meshPerAttribute);D.isInstancedMesh!==!0&&Z._maxInstanceCount===void 0&&(Z._maxInstanceCount=Ue.meshPerAttribute*Ue.count)}else for(let we=0;we<ee.locationSize;we++)M(ee.location+we);i.bindBuffer(i.ARRAY_BUFFER,ge);for(let we=0;we<ee.locationSize;we++)T(ee.location+we,oe/ee.locationSize,xe,H,B*Ae,(ut+oe/ee.locationSize*we)*Ae,Ee)}else{if(G.isInstancedBufferAttribute){for(let Ue=0;Ue<ee.locationSize;Ue++)C(ee.location+Ue,G.meshPerAttribute);D.isInstancedMesh!==!0&&Z._maxInstanceCount===void 0&&(Z._maxInstanceCount=G.meshPerAttribute*G.count)}else for(let Ue=0;Ue<ee.locationSize;Ue++)M(ee.location+Ue);i.bindBuffer(i.ARRAY_BUFFER,ge);for(let Ue=0;Ue<ee.locationSize;Ue++)T(ee.location+Ue,oe/ee.locationSize,xe,H,oe*Ae,oe/ee.locationSize*Ue*Ae,Ee)}}else if(Y!==void 0){const H=Y[ie];if(H!==void 0)switch(H.length){case 2:i.vertexAttrib2fv(ee.location,H);break;case 3:i.vertexAttrib3fv(ee.location,H);break;case 4:i.vertexAttrib4fv(ee.location,H);break;default:i.vertexAttrib1fv(ee.location,H)}}}}A()}function y(){k();for(const D in o){const O=o[D];for(const W in O){const Z=O[W];for(const $ in Z)g(Z[$].object),delete Z[$];delete O[W]}delete o[D]}}function b(D){if(o[D.id]===void 0)return;const O=o[D.id];for(const W in O){const Z=O[W];for(const $ in Z)g(Z[$].object),delete Z[$];delete O[W]}delete o[D.id]}function U(D){for(const O in o){const W=o[O];if(W[D.id]===void 0)continue;const Z=W[D.id];for(const $ in Z)g(Z[$].object),delete Z[$];delete W[D.id]}}function k(){Q(),u=!0,c!==l&&(c=l,m(c.object))}function Q(){l.geometry=null,l.program=null,l.wireframe=!1}return{setup:h,reset:k,resetDefaultState:Q,dispose:y,releaseStatesOfGeometry:b,releaseStatesOfProgram:U,initAttributes:v,enableAttribute:M,disableUnusedAttributes:A}}function Vx(i,e,t,n){const s=n.isWebGL2;let r;function a(u){r=u}function o(u,h){i.drawArrays(r,u,h),t.update(h,r,1)}function l(u,h,f){if(f===0)return;let m,g;if(s)m=i,g="drawArraysInstanced";else if(m=e.get("ANGLE_instanced_arrays"),g="drawArraysInstancedANGLE",m===null){console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}m[g](r,u,h,f),t.update(h,r,f)}function c(u,h,f){if(f===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let g=0;g<f;g++)this.render(u[g],h[g]);else{m.multiDrawArraysWEBGL(r,u,0,h,0,f);let g=0;for(let _=0;_<f;_++)g+=h[_];t.update(g,r,1)}}this.setMode=a,this.render=o,this.renderInstances=l,this.renderMultiDraw=c}function Wx(i,e,t){let n;function s(){if(n!==void 0)return n;if(e.has("EXT_texture_filter_anisotropic")===!0){const T=e.get("EXT_texture_filter_anisotropic");n=i.getParameter(T.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else n=0;return n}function r(T){if(T==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";T="mediump"}return T==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}const a=typeof WebGL2RenderingContext<"u"&&i.constructor.name==="WebGL2RenderingContext";let o=t.precision!==void 0?t.precision:"highp";const l=r(o);l!==o&&(console.warn("THREE.WebGLRenderer:",o,"not supported, using",l,"instead."),o=l);const c=a||e.has("WEBGL_draw_buffers"),u=t.logarithmicDepthBuffer===!0,h=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),f=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),m=i.getParameter(i.MAX_TEXTURE_SIZE),g=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),_=i.getParameter(i.MAX_VERTEX_ATTRIBS),p=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),d=i.getParameter(i.MAX_VARYING_VECTORS),x=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),v=f>0,M=a||e.has("OES_texture_float"),C=v&&M,A=a?i.getParameter(i.MAX_SAMPLES):0;return{isWebGL2:a,drawBuffers:c,getMaxAnisotropy:s,getMaxPrecision:r,precision:o,logarithmicDepthBuffer:u,maxTextures:h,maxVertexTextures:f,maxTextureSize:m,maxCubemapSize:g,maxAttributes:_,maxVertexUniforms:p,maxVaryings:d,maxFragmentUniforms:x,vertexTextures:v,floatFragmentTextures:M,floatVertexTextures:C,maxSamples:A}}function Xx(i){const e=this;let t=null,n=0,s=!1,r=!1;const a=new Ni,o=new Ze,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(h,f){const m=h.length!==0||f||n!==0||s;return s=f,n=h.length,m},this.beginShadows=function(){r=!0,u(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(h,f){t=u(h,f,0)},this.setState=function(h,f,m){const g=h.clippingPlanes,_=h.clipIntersection,p=h.clipShadows,d=i.get(h);if(!s||g===null||g.length===0||r&&!p)r?u(null):c();else{const x=r?0:n,v=x*4;let M=d.clippingState||null;l.value=M,M=u(g,f,v,m);for(let C=0;C!==v;++C)M[C]=t[C];d.clippingState=M,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=x}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function u(h,f,m,g){const _=h!==null?h.length:0;let p=null;if(_!==0){if(p=l.value,g!==!0||p===null){const d=m+_*4,x=f.matrixWorldInverse;o.getNormalMatrix(x),(p===null||p.length<d)&&(p=new Float32Array(d));for(let v=0,M=m;v!==_;++v,M+=4)a.copy(h[v]).applyMatrix4(x,o),a.normal.toArray(p,M),p[M+3]=a.constant}l.value=p,l.needsUpdate=!0}return e.numPlanes=_,e.numIntersection=0,p}}function qx(i){let e=new WeakMap;function t(a,o){return o===ec?a.mapping=Cr:o===tc&&(a.mapping=Pr),a}function n(a){if(a&&a.isTexture){const o=a.mapping;if(o===ec||o===tc)if(e.has(a)){const l=e.get(a).texture;return t(l,a.mapping)}else{const l=a.image;if(l&&l.height>0){const c=new sv(l.height/2);return c.fromEquirectangularTexture(i,a),e.set(a,c),a.addEventListener("dispose",s),t(c.texture,a.mapping)}else return null}}return a}function s(a){const o=a.target;o.removeEventListener("dispose",s);const l=e.get(o);l!==void 0&&(e.delete(o),l.dispose())}function r(){e=new WeakMap}return{get:n,dispose:r}}class Rd extends wd{constructor(e=-1,t=1,n=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=n-e,a=n+e,o=s+t,l=s-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,a=r+c*this.view.width,o-=u*this.view.offsetY,l=o-u*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}const ur=4,_h=[.125,.215,.35,.446,.526,.582],ds=20,gl=new Rd,vh=new ot;let _l=null,vl=0,xl=0;const us=(1+Math.sqrt(5))/2,ir=1/us,xh=[new I(1,1,1),new I(-1,1,1),new I(1,1,-1),new I(-1,1,-1),new I(0,us,ir),new I(0,us,-ir),new I(ir,0,us),new I(-ir,0,us),new I(us,ir,0),new I(-us,ir,0)];class yh{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,s=100){_l=this._renderer.getRenderTarget(),vl=this._renderer.getActiveCubeFace(),xl=this._renderer.getActiveMipmapLevel(),this._setSize(256);const r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(e,n,s,r),t>0&&this._blur(r,0,0,t),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=bh(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Sh(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(_l,vl,xl),e.scissorTest=!1,Ya(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Cr||e.mapping===Pr?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),_l=this._renderer.getRenderTarget(),vl=this._renderer.getActiveCubeFace(),xl=this._renderer.getActiveMipmapLevel();const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:Rn,minFilter:Rn,generateMipmaps:!1,type:aa,format:Vn,colorSpace:Ri,depthBuffer:!1},s=Mh(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Mh(e,t,n);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Yx(r)),this._blurMaterial=$x(r,e,t)}return s}_compileMaterial(e){const t=new Ei(this._lodPlanes[0],e);this._renderer.compile(t,gl)}_sceneToCubeUV(e,t,n,s){const o=new Pn(90,1,t,n),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],u=this._renderer,h=u.autoClear,f=u.toneMapping;u.getClearColor(vh),u.toneMapping=ji,u.autoClear=!1;const m=new Fc({name:"PMREM.Background",side:un,depthWrite:!1,depthTest:!1}),g=new Ei(new ga,m);let _=!1;const p=e.background;p?p.isColor&&(m.color.copy(p),e.background=null,_=!0):(m.color.copy(vh),_=!0);for(let d=0;d<6;d++){const x=d%3;x===0?(o.up.set(0,l[d],0),o.lookAt(c[d],0,0)):x===1?(o.up.set(0,0,l[d]),o.lookAt(0,c[d],0)):(o.up.set(0,l[d],0),o.lookAt(0,0,c[d]));const v=this._cubeSize;Ya(s,x*v,d>2?v:0,v,v),u.setRenderTarget(s),_&&u.render(g,o),u.render(e,o)}g.geometry.dispose(),g.material.dispose(),u.toneMapping=f,u.autoClear=h,e.background=p}_textureToCubeUV(e,t){const n=this._renderer,s=e.mapping===Cr||e.mapping===Pr;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=bh()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Sh());const r=s?this._cubemapMaterial:this._equirectMaterial,a=new Ei(this._lodPlanes[0],r),o=r.uniforms;o.envMap.value=e;const l=this._cubeSize;Ya(t,0,0,3*l,2*l),n.setRenderTarget(t),n.render(a,gl)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;for(let s=1;s<this._lodPlanes.length;s++){const r=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),a=xh[(s-1)%xh.length];this._blur(e,s-1,s,r,a)}t.autoClear=n}_blur(e,t,n,s,r){const a=this._pingPongRenderTarget;this._halfBlur(e,a,t,n,s,"latitudinal",r),this._halfBlur(a,e,n,n,s,"longitudinal",r)}_halfBlur(e,t,n,s,r,a,o){const l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const u=3,h=new Ei(this._lodPlanes[s],c),f=c.uniforms,m=this._sizeLods[n]-1,g=isFinite(r)?Math.PI/(2*m):2*Math.PI/(2*ds-1),_=r/g,p=isFinite(r)?1+Math.floor(u*_):ds;p>ds&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${p} samples when the maximum is set to ${ds}`);const d=[];let x=0;for(let T=0;T<ds;++T){const z=T/_,y=Math.exp(-z*z/2);d.push(y),T===0?x+=y:T<p&&(x+=2*y)}for(let T=0;T<d.length;T++)d[T]=d[T]/x;f.envMap.value=e.texture,f.samples.value=p,f.weights.value=d,f.latitudinal.value=a==="latitudinal",o&&(f.poleAxis.value=o);const{_lodMax:v}=this;f.dTheta.value=g,f.mipInt.value=v-n;const M=this._sizeLods[s],C=3*M*(s>v-ur?s-v+ur:0),A=4*(this._cubeSize-M);Ya(t,C,A,3*M,2*M),l.setRenderTarget(t),l.render(h,gl)}}function Yx(i){const e=[],t=[],n=[];let s=i;const r=i-ur+1+_h.length;for(let a=0;a<r;a++){const o=Math.pow(2,s);t.push(o);let l=1/o;a>i-ur?l=_h[a-i+ur-1]:a===0&&(l=0),n.push(l);const c=1/(o-2),u=-c,h=1+c,f=[u,u,h,u,h,h,u,u,h,h,u,h],m=6,g=6,_=3,p=2,d=1,x=new Float32Array(_*g*m),v=new Float32Array(p*g*m),M=new Float32Array(d*g*m);for(let A=0;A<m;A++){const T=A%3*2/3-1,z=A>2?0:-1,y=[T,z,0,T+2/3,z,0,T+2/3,z+1,0,T,z,0,T+2/3,z+1,0,T,z+1,0];x.set(y,_*g*A),v.set(f,p*g*A);const b=[A,A,A,A,A,A];M.set(b,d*g*A)}const C=new rn;C.setAttribute("position",new In(x,_)),C.setAttribute("uv",new In(v,p)),C.setAttribute("faceIndex",new In(M,d)),e.push(C),s>ur&&s--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function Mh(i,e,t){const n=new Ls(i,e,t);return n.texture.mapping=Uo,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Ya(i,e,t,n,s){i.viewport.set(e,t,n,s),i.scissor.set(e,t,n,s)}function $x(i,e,t){const n=new Float32Array(ds),s=new I(0,1,0);return new Ds({name:"SphericalGaussianBlur",defines:{n:ds,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:Bc(),fragmentShader:`

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
		`,blending:$i,depthTest:!1,depthWrite:!1})}function Sh(){return new Ds({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Bc(),fragmentShader:`

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
		`,blending:$i,depthTest:!1,depthWrite:!1})}function bh(){return new Ds({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Bc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:$i,depthTest:!1,depthWrite:!1})}function Bc(){return`

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
	`}function jx(i){let e=new WeakMap,t=null;function n(o){if(o&&o.isTexture){const l=o.mapping,c=l===ec||l===tc,u=l===Cr||l===Pr;if(c||u)if(o.isRenderTargetTexture&&o.needsPMREMUpdate===!0){o.needsPMREMUpdate=!1;let h=e.get(o);return t===null&&(t=new yh(i)),h=c?t.fromEquirectangular(o,h):t.fromCubemap(o,h),e.set(o,h),h.texture}else{if(e.has(o))return e.get(o).texture;{const h=o.image;if(c&&h&&h.height>0||u&&h&&s(h)){t===null&&(t=new yh(i));const f=c?t.fromEquirectangular(o):t.fromCubemap(o);return e.set(o,f),o.addEventListener("dispose",r),f.texture}else return null}}}return o}function s(o){let l=0;const c=6;for(let u=0;u<c;u++)o[u]!==void 0&&l++;return l===c}function r(o){const l=o.target;l.removeEventListener("dispose",r);const c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function a(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:a}}function Kx(i){const e={};function t(n){if(e[n]!==void 0)return e[n];let s;switch(n){case"WEBGL_depth_texture":s=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=i.getExtension(n)}return e[n]=s,s}return{has:function(n){return t(n)!==null},init:function(n){n.isWebGL2?(t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance")):(t("WEBGL_depth_texture"),t("OES_texture_float"),t("OES_texture_half_float"),t("OES_texture_half_float_linear"),t("OES_standard_derivatives"),t("OES_element_index_uint"),t("OES_vertex_array_object"),t("ANGLE_instanced_arrays")),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture")},get:function(n){const s=t(n);return s===null&&console.warn("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function Zx(i,e,t,n){const s={},r=new WeakMap;function a(h){const f=h.target;f.index!==null&&e.remove(f.index);for(const g in f.attributes)e.remove(f.attributes[g]);for(const g in f.morphAttributes){const _=f.morphAttributes[g];for(let p=0,d=_.length;p<d;p++)e.remove(_[p])}f.removeEventListener("dispose",a),delete s[f.id];const m=r.get(f);m&&(e.remove(m),r.delete(f)),n.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,t.memory.geometries--}function o(h,f){return s[f.id]===!0||(f.addEventListener("dispose",a),s[f.id]=!0,t.memory.geometries++),f}function l(h){const f=h.attributes;for(const g in f)e.update(f[g],i.ARRAY_BUFFER);const m=h.morphAttributes;for(const g in m){const _=m[g];for(let p=0,d=_.length;p<d;p++)e.update(_[p],i.ARRAY_BUFFER)}}function c(h){const f=[],m=h.index,g=h.attributes.position;let _=0;if(m!==null){const x=m.array;_=m.version;for(let v=0,M=x.length;v<M;v+=3){const C=x[v+0],A=x[v+1],T=x[v+2];f.push(C,A,A,T,T,C)}}else if(g!==void 0){const x=g.array;_=g.version;for(let v=0,M=x.length/3-1;v<M;v+=3){const C=v+0,A=v+1,T=v+2;f.push(C,A,A,T,T,C)}}else return;const p=new(_d(f)?bd:Sd)(f,1);p.version=_;const d=r.get(h);d&&e.remove(d),r.set(h,p)}function u(h){const f=r.get(h);if(f){const m=h.index;m!==null&&f.version<m.version&&c(h)}else c(h);return r.get(h)}return{get:o,update:l,getWireframeAttribute:u}}function Jx(i,e,t,n){const s=n.isWebGL2;let r;function a(m){r=m}let o,l;function c(m){o=m.type,l=m.bytesPerElement}function u(m,g){i.drawElements(r,g,o,m*l),t.update(g,r,1)}function h(m,g,_){if(_===0)return;let p,d;if(s)p=i,d="drawElementsInstanced";else if(p=e.get("ANGLE_instanced_arrays"),d="drawElementsInstancedANGLE",p===null){console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}p[d](r,g,o,m*l,_),t.update(g,r,_)}function f(m,g,_){if(_===0)return;const p=e.get("WEBGL_multi_draw");if(p===null)for(let d=0;d<_;d++)this.render(m[d]/l,g[d]);else{p.multiDrawElementsWEBGL(r,g,0,o,m,0,_);let d=0;for(let x=0;x<_;x++)d+=g[x];t.update(d,r,1)}}this.setMode=a,this.setIndex=c,this.render=u,this.renderInstances=h,this.renderMultiDraw=f}function Qx(i){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(t.calls++,a){case i.TRIANGLES:t.triangles+=o*(r/3);break;case i.LINES:t.lines+=o*(r/2);break;case i.LINE_STRIP:t.lines+=o*(r-1);break;case i.LINE_LOOP:t.lines+=o*r;break;case i.POINTS:t.points+=o*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:n}}function ey(i,e){return i[0]-e[0]}function ty(i,e){return Math.abs(e[1])-Math.abs(i[1])}function ny(i,e,t){const n={},s=new Float32Array(8),r=new WeakMap,a=new Ht,o=[];for(let c=0;c<8;c++)o[c]=[c,0];function l(c,u,h){const f=c.morphTargetInfluences;if(e.isWebGL2===!0){const g=u.morphAttributes.position||u.morphAttributes.normal||u.morphAttributes.color,_=g!==void 0?g.length:0;let p=r.get(u);if(p===void 0||p.count!==_){let O=function(){Q.dispose(),r.delete(u),u.removeEventListener("dispose",O)};var m=O;p!==void 0&&p.texture.dispose();const v=u.morphAttributes.position!==void 0,M=u.morphAttributes.normal!==void 0,C=u.morphAttributes.color!==void 0,A=u.morphAttributes.position||[],T=u.morphAttributes.normal||[],z=u.morphAttributes.color||[];let y=0;v===!0&&(y=1),M===!0&&(y=2),C===!0&&(y=3);let b=u.attributes.position.count*y,U=1;b>e.maxTextureSize&&(U=Math.ceil(b/e.maxTextureSize),b=e.maxTextureSize);const k=new Float32Array(b*U*4*_),Q=new yd(k,b,U,_);Q.type=Vi,Q.needsUpdate=!0;const D=y*4;for(let W=0;W<_;W++){const Z=A[W],$=T[W],j=z[W],Y=b*U*4*W;for(let ie=0;ie<Z.count;ie++){const ee=ie*D;v===!0&&(a.fromBufferAttribute(Z,ie),k[Y+ee+0]=a.x,k[Y+ee+1]=a.y,k[Y+ee+2]=a.z,k[Y+ee+3]=0),M===!0&&(a.fromBufferAttribute($,ie),k[Y+ee+4]=a.x,k[Y+ee+5]=a.y,k[Y+ee+6]=a.z,k[Y+ee+7]=0),C===!0&&(a.fromBufferAttribute(j,ie),k[Y+ee+8]=a.x,k[Y+ee+9]=a.y,k[Y+ee+10]=a.z,k[Y+ee+11]=j.itemSize===4?a.w:1)}}p={count:_,texture:Q,size:new Ne(b,U)},r.set(u,p),u.addEventListener("dispose",O)}let d=0;for(let v=0;v<f.length;v++)d+=f[v];const x=u.morphTargetsRelative?1:1-d;h.getUniforms().setValue(i,"morphTargetBaseInfluence",x),h.getUniforms().setValue(i,"morphTargetInfluences",f),h.getUniforms().setValue(i,"morphTargetsTexture",p.texture,t),h.getUniforms().setValue(i,"morphTargetsTextureSize",p.size)}else{const g=f===void 0?0:f.length;let _=n[u.id];if(_===void 0||_.length!==g){_=[];for(let M=0;M<g;M++)_[M]=[M,0];n[u.id]=_}for(let M=0;M<g;M++){const C=_[M];C[0]=M,C[1]=f[M]}_.sort(ty);for(let M=0;M<8;M++)M<g&&_[M][1]?(o[M][0]=_[M][0],o[M][1]=_[M][1]):(o[M][0]=Number.MAX_SAFE_INTEGER,o[M][1]=0);o.sort(ey);const p=u.morphAttributes.position,d=u.morphAttributes.normal;let x=0;for(let M=0;M<8;M++){const C=o[M],A=C[0],T=C[1];A!==Number.MAX_SAFE_INTEGER&&T?(p&&u.getAttribute("morphTarget"+M)!==p[A]&&u.setAttribute("morphTarget"+M,p[A]),d&&u.getAttribute("morphNormal"+M)!==d[A]&&u.setAttribute("morphNormal"+M,d[A]),s[M]=T,x+=T):(p&&u.hasAttribute("morphTarget"+M)===!0&&u.deleteAttribute("morphTarget"+M),d&&u.hasAttribute("morphNormal"+M)===!0&&u.deleteAttribute("morphNormal"+M),s[M]=0)}const v=u.morphTargetsRelative?1:1-x;h.getUniforms().setValue(i,"morphTargetBaseInfluence",v),h.getUniforms().setValue(i,"morphTargetInfluences",s)}}return{update:l}}function iy(i,e,t,n){let s=new WeakMap;function r(l){const c=n.render.frame,u=l.geometry,h=e.get(l,u);if(s.get(h)!==c&&(e.update(h),s.set(h,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",o)===!1&&l.addEventListener("dispose",o),s.get(l)!==c&&(t.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,i.ARRAY_BUFFER),s.set(l,c))),l.isSkinnedMesh){const f=l.skeleton;s.get(f)!==c&&(f.update(),s.set(f,c))}return h}function a(){s=new WeakMap}function o(l){const c=l.target;c.removeEventListener("dispose",o),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:r,dispose:a}}class Cd extends hn{constructor(e,t,n,s,r,a,o,l,c,u){if(u=u!==void 0?u:ws,u!==ws&&u!==Lr)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&u===ws&&(n=Gi),n===void 0&&u===Lr&&(n=Es),super(null,s,r,a,o,l,u,n,c),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=o!==void 0?o:tn,this.minFilter=l!==void 0?l:tn,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}const Pd=new hn,Ld=new Cd(1,1);Ld.compareFunction=gd;const Dd=new yd,Ud=new H_,Id=new Td,Eh=[],wh=[],Th=new Float32Array(16),Ah=new Float32Array(9),Rh=new Float32Array(4);function Or(i,e,t){const n=i[0];if(n<=0||n>0)return i;const s=e*t;let r=Eh[s];if(r===void 0&&(r=new Float32Array(s),Eh[s]=r),e!==0){n.toArray(r,0);for(let a=1,o=0;a!==e;++a)o+=t,i[a].toArray(r,o)}return r}function Ft(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function kt(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function Oo(i,e){let t=wh[e];t===void 0&&(t=new Int32Array(e),wh[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function sy(i,e){const t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function ry(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ft(t,e))return;i.uniform2fv(this.addr,e),kt(t,e)}}function ay(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Ft(t,e))return;i.uniform3fv(this.addr,e),kt(t,e)}}function oy(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ft(t,e))return;i.uniform4fv(this.addr,e),kt(t,e)}}function ly(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(Ft(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),kt(t,e)}else{if(Ft(t,n))return;Rh.set(n),i.uniformMatrix2fv(this.addr,!1,Rh),kt(t,n)}}function cy(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(Ft(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),kt(t,e)}else{if(Ft(t,n))return;Ah.set(n),i.uniformMatrix3fv(this.addr,!1,Ah),kt(t,n)}}function uy(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(Ft(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),kt(t,e)}else{if(Ft(t,n))return;Th.set(n),i.uniformMatrix4fv(this.addr,!1,Th),kt(t,n)}}function hy(i,e){const t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function fy(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ft(t,e))return;i.uniform2iv(this.addr,e),kt(t,e)}}function dy(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Ft(t,e))return;i.uniform3iv(this.addr,e),kt(t,e)}}function py(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ft(t,e))return;i.uniform4iv(this.addr,e),kt(t,e)}}function my(i,e){const t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function gy(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ft(t,e))return;i.uniform2uiv(this.addr,e),kt(t,e)}}function _y(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Ft(t,e))return;i.uniform3uiv(this.addr,e),kt(t,e)}}function vy(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ft(t,e))return;i.uniform4uiv(this.addr,e),kt(t,e)}}function xy(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);const r=this.type===i.SAMPLER_2D_SHADOW?Ld:Pd;t.setTexture2D(e||r,s)}function yy(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture3D(e||Ud,s)}function My(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTextureCube(e||Id,s)}function Sy(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture2DArray(e||Dd,s)}function by(i){switch(i){case 5126:return sy;case 35664:return ry;case 35665:return ay;case 35666:return oy;case 35674:return ly;case 35675:return cy;case 35676:return uy;case 5124:case 35670:return hy;case 35667:case 35671:return fy;case 35668:case 35672:return dy;case 35669:case 35673:return py;case 5125:return my;case 36294:return gy;case 36295:return _y;case 36296:return vy;case 35678:case 36198:case 36298:case 36306:case 35682:return xy;case 35679:case 36299:case 36307:return yy;case 35680:case 36300:case 36308:case 36293:return My;case 36289:case 36303:case 36311:case 36292:return Sy}}function Ey(i,e){i.uniform1fv(this.addr,e)}function wy(i,e){const t=Or(e,this.size,2);i.uniform2fv(this.addr,t)}function Ty(i,e){const t=Or(e,this.size,3);i.uniform3fv(this.addr,t)}function Ay(i,e){const t=Or(e,this.size,4);i.uniform4fv(this.addr,t)}function Ry(i,e){const t=Or(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function Cy(i,e){const t=Or(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function Py(i,e){const t=Or(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function Ly(i,e){i.uniform1iv(this.addr,e)}function Dy(i,e){i.uniform2iv(this.addr,e)}function Uy(i,e){i.uniform3iv(this.addr,e)}function Iy(i,e){i.uniform4iv(this.addr,e)}function Ny(i,e){i.uniform1uiv(this.addr,e)}function Oy(i,e){i.uniform2uiv(this.addr,e)}function Fy(i,e){i.uniform3uiv(this.addr,e)}function ky(i,e){i.uniform4uiv(this.addr,e)}function zy(i,e,t){const n=this.cache,s=e.length,r=Oo(t,s);Ft(n,r)||(i.uniform1iv(this.addr,r),kt(n,r));for(let a=0;a!==s;++a)t.setTexture2D(e[a]||Pd,r[a])}function By(i,e,t){const n=this.cache,s=e.length,r=Oo(t,s);Ft(n,r)||(i.uniform1iv(this.addr,r),kt(n,r));for(let a=0;a!==s;++a)t.setTexture3D(e[a]||Ud,r[a])}function Hy(i,e,t){const n=this.cache,s=e.length,r=Oo(t,s);Ft(n,r)||(i.uniform1iv(this.addr,r),kt(n,r));for(let a=0;a!==s;++a)t.setTextureCube(e[a]||Id,r[a])}function Gy(i,e,t){const n=this.cache,s=e.length,r=Oo(t,s);Ft(n,r)||(i.uniform1iv(this.addr,r),kt(n,r));for(let a=0;a!==s;++a)t.setTexture2DArray(e[a]||Dd,r[a])}function Vy(i){switch(i){case 5126:return Ey;case 35664:return wy;case 35665:return Ty;case 35666:return Ay;case 35674:return Ry;case 35675:return Cy;case 35676:return Py;case 5124:case 35670:return Ly;case 35667:case 35671:return Dy;case 35668:case 35672:return Uy;case 35669:case 35673:return Iy;case 5125:return Ny;case 36294:return Oy;case 36295:return Fy;case 36296:return ky;case 35678:case 36198:case 36298:case 36306:case 35682:return zy;case 35679:case 36299:case 36307:return By;case 35680:case 36300:case 36308:case 36293:return Hy;case 36289:case 36303:case 36311:case 36292:return Gy}}class Wy{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=by(t.type)}}class Xy{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Vy(t.type)}}class qy{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const s=this.seq;for(let r=0,a=s.length;r!==a;++r){const o=s[r];o.setValue(e,t[o.id],n)}}}const yl=/(\w+)(\])?(\[|\.)?/g;function Ch(i,e){i.seq.push(e),i.map[e.id]=e}function Yy(i,e,t){const n=i.name,s=n.length;for(yl.lastIndex=0;;){const r=yl.exec(n),a=yl.lastIndex;let o=r[1];const l=r[2]==="]",c=r[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===s){Ch(t,c===void 0?new Wy(o,i,e):new Xy(o,i,e));break}else{let h=t.map[o];h===void 0&&(h=new qy(o),Ch(t,h)),t=h}}}class co{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){const r=e.getActiveUniform(t,s),a=e.getUniformLocation(t,r.name);Yy(r,a,this)}}setValue(e,t,n,s){const r=this.map[t];r!==void 0&&r.setValue(e,n,s)}setOptional(e,t,n){const s=t[n];s!==void 0&&this.setValue(e,n,s)}static upload(e,t,n,s){for(let r=0,a=t.length;r!==a;++r){const o=t[r],l=n[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,s)}}static seqWithValue(e,t){const n=[];for(let s=0,r=e.length;s!==r;++s){const a=e[s];a.id in t&&n.push(a)}return n}}function Ph(i,e,t){const n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}const $y=37297;let jy=0;function Ky(i,e){const t=i.split(`
`),n=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let a=s;a<r;a++){const o=a+1;n.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return n.join(`
`)}function Zy(i){const e=gt.getPrimaries(gt.workingColorSpace),t=gt.getPrimaries(i);let n;switch(e===t?n="":e===yo&&t===xo?n="LinearDisplayP3ToLinearSRGB":e===xo&&t===yo&&(n="LinearSRGBToLinearDisplayP3"),i){case Ri:case Io:return[n,"LinearTransferOETF"];case qt:case Nc:return[n,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",i),[n,"LinearTransferOETF"]}}function Lh(i,e,t){const n=i.getShaderParameter(e,i.COMPILE_STATUS),s=i.getShaderInfoLog(e).trim();if(n&&s==="")return"";const r=/ERROR: 0:(\d+)/.exec(s);if(r){const a=parseInt(r[1]);return t.toUpperCase()+`

`+s+`

`+Ky(i.getShaderSource(e),a)}else return s}function Jy(i,e){const t=Zy(e);return`vec4 ${i}( vec4 value ) { return ${t[0]}( ${t[1]}( value ) ); }`}function Qy(i,e){let t;switch(e){case l_:t="Linear";break;case c_:t="Reinhard";break;case u_:t="OptimizedCineon";break;case h_:t="ACESFilmic";break;case d_:t="AgX";break;case f_:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}function eM(i){return[i.extensionDerivatives||i.envMapCubeUVHeight||i.bumpMap||i.normalMapTangentSpace||i.clearcoatNormalMap||i.flatShading||i.shaderID==="physical"?"#extension GL_OES_standard_derivatives : enable":"",(i.extensionFragDepth||i.logarithmicDepthBuffer)&&i.rendererExtensionFragDepth?"#extension GL_EXT_frag_depth : enable":"",i.extensionDrawBuffers&&i.rendererExtensionDrawBuffers?"#extension GL_EXT_draw_buffers : require":"",(i.extensionShaderTextureLOD||i.envMap||i.transmission)&&i.rendererExtensionShaderTextureLod?"#extension GL_EXT_shader_texture_lod : enable":""].filter(hr).join(`
`)}function tM(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":""].filter(hr).join(`
`)}function nM(i){const e=[];for(const t in i){const n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function iM(i,e){const t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){const r=i.getActiveAttrib(e,s),a=r.name;let o=1;r.type===i.FLOAT_MAT2&&(o=2),r.type===i.FLOAT_MAT3&&(o=3),r.type===i.FLOAT_MAT4&&(o=4),t[a]={type:r.type,location:i.getAttribLocation(e,a),locationSize:o}}return t}function hr(i){return i!==""}function Dh(i,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Uh(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const sM=/^[ \t]*#include +<([\w\d./]+)>/gm;function lc(i){return i.replace(sM,aM)}const rM=new Map([["encodings_fragment","colorspace_fragment"],["encodings_pars_fragment","colorspace_pars_fragment"],["output_fragment","opaque_fragment"]]);function aM(i,e){let t=qe[e];if(t===void 0){const n=rM.get(e);if(n!==void 0)t=qe[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return lc(t)}const oM=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Ih(i){return i.replace(oM,lM)}function lM(i,e,t,n){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Nh(i){let e="precision "+i.precision+` float;
precision `+i.precision+" int;";return i.precision==="highp"?e+=`
#define HIGH_PRECISION`:i.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function cM(i){let e="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===rd?e="SHADOWMAP_TYPE_PCF":i.shadowMapType===Og?e="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===gi&&(e="SHADOWMAP_TYPE_VSM"),e}function uM(i){let e="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case Cr:case Pr:e="ENVMAP_TYPE_CUBE";break;case Uo:e="ENVMAP_TYPE_CUBE_UV";break}return e}function hM(i){let e="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case Pr:e="ENVMAP_MODE_REFRACTION";break}return e}function fM(i){let e="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case ad:e="ENVMAP_BLENDING_MULTIPLY";break;case a_:e="ENVMAP_BLENDING_MIX";break;case o_:e="ENVMAP_BLENDING_ADD";break}return e}function dM(i){const e=i.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function pM(i,e,t,n){const s=i.getContext(),r=t.defines;let a=t.vertexShader,o=t.fragmentShader;const l=cM(t),c=uM(t),u=hM(t),h=fM(t),f=dM(t),m=t.isWebGL2?"":eM(t),g=tM(t),_=nM(r),p=s.createProgram();let d,x,v=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(d=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_].filter(hr).join(`
`),d.length>0&&(d+=`
`),x=[m,"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_].filter(hr).join(`
`),x.length>0&&(x+=`
`)):(d=[Nh(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors&&t.isWebGL2?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(hr).join(`
`),x=[m,Nh(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+u:"",t.envMap?"#define "+h:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==ji?"#define TONE_MAPPING":"",t.toneMapping!==ji?qe.tonemapping_pars_fragment:"",t.toneMapping!==ji?Qy("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",qe.colorspace_pars_fragment,Jy("linearToOutputTexel",t.outputColorSpace),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(hr).join(`
`)),a=lc(a),a=Dh(a,t),a=Uh(a,t),o=lc(o),o=Dh(o,t),o=Uh(o,t),a=Ih(a),o=Ih(o),t.isWebGL2&&t.isRawShaderMaterial!==!0&&(v=`#version 300 es
`,d=[g,"precision mediump sampler2DArray;","#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+d,x=["precision mediump sampler2DArray;","#define varying in",t.glslVersion===Qu?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Qu?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+x);const M=v+d+a,C=v+x+o,A=Ph(s,s.VERTEX_SHADER,M),T=Ph(s,s.FRAGMENT_SHADER,C);s.attachShader(p,A),s.attachShader(p,T),t.index0AttributeName!==void 0?s.bindAttribLocation(p,0,t.index0AttributeName):t.morphTargets===!0&&s.bindAttribLocation(p,0,"position"),s.linkProgram(p);function z(k){if(i.debug.checkShaderErrors){const Q=s.getProgramInfoLog(p).trim(),D=s.getShaderInfoLog(A).trim(),O=s.getShaderInfoLog(T).trim();let W=!0,Z=!0;if(s.getProgramParameter(p,s.LINK_STATUS)===!1)if(W=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,p,A,T);else{const $=Lh(s,A,"vertex"),j=Lh(s,T,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(p,s.VALIDATE_STATUS)+`

Program Info Log: `+Q+`
`+$+`
`+j)}else Q!==""?console.warn("THREE.WebGLProgram: Program Info Log:",Q):(D===""||O==="")&&(Z=!1);Z&&(k.diagnostics={runnable:W,programLog:Q,vertexShader:{log:D,prefix:d},fragmentShader:{log:O,prefix:x}})}s.deleteShader(A),s.deleteShader(T),y=new co(s,p),b=iM(s,p)}let y;this.getUniforms=function(){return y===void 0&&z(this),y};let b;this.getAttributes=function(){return b===void 0&&z(this),b};let U=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return U===!1&&(U=s.getProgramParameter(p,$y)),U},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(p),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=jy++,this.cacheKey=e,this.usedTimes=1,this.program=p,this.vertexShader=A,this.fragmentShader=T,this}let mM=0;class gM{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,s=this._getShaderStage(t),r=this._getShaderStage(n),a=this._getShaderCacheForMaterial(e);return a.has(s)===!1&&(a.add(s),s.usedTimes++),a.has(r)===!1&&(a.add(r),r.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new _M(e),t.set(e,n)),n}}class _M{constructor(e){this.id=mM++,this.code=e,this.usedTimes=0}}function vM(i,e,t,n,s,r,a){const o=new Oc,l=new gM,c=[],u=s.isWebGL2,h=s.logarithmicDepthBuffer,f=s.vertexTextures;let m=s.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(y){return y===0?"uv":`uv${y}`}function p(y,b,U,k,Q){const D=k.fog,O=Q.geometry,W=y.isMeshStandardMaterial?k.environment:null,Z=(y.isMeshStandardMaterial?t:e).get(y.envMap||W),$=Z&&Z.mapping===Uo?Z.image.height:null,j=g[y.type];y.precision!==null&&(m=s.getMaxPrecision(y.precision),m!==y.precision&&console.warn("THREE.WebGLProgram.getParameters:",y.precision,"not supported, using",m,"instead."));const Y=O.morphAttributes.position||O.morphAttributes.normal||O.morphAttributes.color,ie=Y!==void 0?Y.length:0;let ee=0;O.morphAttributes.position!==void 0&&(ee=1),O.morphAttributes.normal!==void 0&&(ee=2),O.morphAttributes.color!==void 0&&(ee=3);let G,H,oe,de;if(j){const Ct=ti[j];G=Ct.vertexShader,H=Ct.fragmentShader}else G=y.vertexShader,H=y.fragmentShader,l.update(y),oe=l.getVertexShaderID(y),de=l.getFragmentShaderID(y);const ge=i.getRenderTarget(),xe=Q.isInstancedMesh===!0,Ae=Q.isBatchedMesh===!0,Ee=!!y.map,Ue=!!y.matcap,B=!!Z,ut=!!y.aoMap,we=!!y.lightMap,Oe=!!y.bumpMap,be=!!y.normalMap,mt=!!y.displacementMap,Ge=!!y.emissiveMap,w=!!y.metalnessMap,S=!!y.roughnessMap,N=y.anisotropy>0,ne=y.clearcoat>0,se=y.iridescence>0,ae=y.sheen>0,Te=y.transmission>0,me=N&&!!y.anisotropyMap,Me=ne&&!!y.clearcoatMap,De=ne&&!!y.clearcoatNormalMap,Ve=ne&&!!y.clearcoatRoughnessMap,J=se&&!!y.iridescenceMap,lt=se&&!!y.iridescenceThicknessMap,Ye=ae&&!!y.sheenColorMap,Be=ae&&!!y.sheenRoughnessMap,Le=!!y.specularMap,ve=!!y.specularColorMap,R=!!y.specularIntensityMap,ce=Te&&!!y.transmissionMap,Re=Te&&!!y.thicknessMap,Se=!!y.gradientMap,re=!!y.alphaMap,L=y.alphaTest>0,ue=!!y.alphaHash,_e=!!y.extensions,Fe=!!O.attributes.uv1,Ie=!!O.attributes.uv2,Je=!!O.attributes.uv3;let Qe=ji;return y.toneMapped&&(ge===null||ge.isXRRenderTarget===!0)&&(Qe=i.toneMapping),{isWebGL2:u,shaderID:j,shaderType:y.type,shaderName:y.name,vertexShader:G,fragmentShader:H,defines:y.defines,customVertexShaderID:oe,customFragmentShaderID:de,isRawShaderMaterial:y.isRawShaderMaterial===!0,glslVersion:y.glslVersion,precision:m,batching:Ae,instancing:xe,instancingColor:xe&&Q.instanceColor!==null,supportsVertexTextures:f,outputColorSpace:ge===null?i.outputColorSpace:ge.isXRRenderTarget===!0?ge.texture.colorSpace:Ri,map:Ee,matcap:Ue,envMap:B,envMapMode:B&&Z.mapping,envMapCubeUVHeight:$,aoMap:ut,lightMap:we,bumpMap:Oe,normalMap:be,displacementMap:f&&mt,emissiveMap:Ge,normalMapObjectSpace:be&&y.normalMapType===T_,normalMapTangentSpace:be&&y.normalMapType===w_,metalnessMap:w,roughnessMap:S,anisotropy:N,anisotropyMap:me,clearcoat:ne,clearcoatMap:Me,clearcoatNormalMap:De,clearcoatRoughnessMap:Ve,iridescence:se,iridescenceMap:J,iridescenceThicknessMap:lt,sheen:ae,sheenColorMap:Ye,sheenRoughnessMap:Be,specularMap:Le,specularColorMap:ve,specularIntensityMap:R,transmission:Te,transmissionMap:ce,thicknessMap:Re,gradientMap:Se,opaque:y.transparent===!1&&y.blending===dr,alphaMap:re,alphaTest:L,alphaHash:ue,combine:y.combine,mapUv:Ee&&_(y.map.channel),aoMapUv:ut&&_(y.aoMap.channel),lightMapUv:we&&_(y.lightMap.channel),bumpMapUv:Oe&&_(y.bumpMap.channel),normalMapUv:be&&_(y.normalMap.channel),displacementMapUv:mt&&_(y.displacementMap.channel),emissiveMapUv:Ge&&_(y.emissiveMap.channel),metalnessMapUv:w&&_(y.metalnessMap.channel),roughnessMapUv:S&&_(y.roughnessMap.channel),anisotropyMapUv:me&&_(y.anisotropyMap.channel),clearcoatMapUv:Me&&_(y.clearcoatMap.channel),clearcoatNormalMapUv:De&&_(y.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Ve&&_(y.clearcoatRoughnessMap.channel),iridescenceMapUv:J&&_(y.iridescenceMap.channel),iridescenceThicknessMapUv:lt&&_(y.iridescenceThicknessMap.channel),sheenColorMapUv:Ye&&_(y.sheenColorMap.channel),sheenRoughnessMapUv:Be&&_(y.sheenRoughnessMap.channel),specularMapUv:Le&&_(y.specularMap.channel),specularColorMapUv:ve&&_(y.specularColorMap.channel),specularIntensityMapUv:R&&_(y.specularIntensityMap.channel),transmissionMapUv:ce&&_(y.transmissionMap.channel),thicknessMapUv:Re&&_(y.thicknessMap.channel),alphaMapUv:re&&_(y.alphaMap.channel),vertexTangents:!!O.attributes.tangent&&(be||N),vertexColors:y.vertexColors,vertexAlphas:y.vertexColors===!0&&!!O.attributes.color&&O.attributes.color.itemSize===4,vertexUv1s:Fe,vertexUv2s:Ie,vertexUv3s:Je,pointsUvs:Q.isPoints===!0&&!!O.attributes.uv&&(Ee||re),fog:!!D,useFog:y.fog===!0,fogExp2:D&&D.isFogExp2,flatShading:y.flatShading===!0,sizeAttenuation:y.sizeAttenuation===!0,logarithmicDepthBuffer:h,skinning:Q.isSkinnedMesh===!0,morphTargets:O.morphAttributes.position!==void 0,morphNormals:O.morphAttributes.normal!==void 0,morphColors:O.morphAttributes.color!==void 0,morphTargetsCount:ie,morphTextureStride:ee,numDirLights:b.directional.length,numPointLights:b.point.length,numSpotLights:b.spot.length,numSpotLightMaps:b.spotLightMap.length,numRectAreaLights:b.rectArea.length,numHemiLights:b.hemi.length,numDirLightShadows:b.directionalShadowMap.length,numPointLightShadows:b.pointShadowMap.length,numSpotLightShadows:b.spotShadowMap.length,numSpotLightShadowsWithMaps:b.numSpotLightShadowsWithMaps,numLightProbes:b.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:y.dithering,shadowMapEnabled:i.shadowMap.enabled&&U.length>0,shadowMapType:i.shadowMap.type,toneMapping:Qe,useLegacyLights:i._useLegacyLights,decodeVideoTexture:Ee&&y.map.isVideoTexture===!0&&gt.getTransfer(y.map.colorSpace)===xt,premultipliedAlpha:y.premultipliedAlpha,doubleSided:y.side===xi,flipSided:y.side===un,useDepthPacking:y.depthPacking>=0,depthPacking:y.depthPacking||0,index0AttributeName:y.index0AttributeName,extensionDerivatives:_e&&y.extensions.derivatives===!0,extensionFragDepth:_e&&y.extensions.fragDepth===!0,extensionDrawBuffers:_e&&y.extensions.drawBuffers===!0,extensionShaderTextureLOD:_e&&y.extensions.shaderTextureLOD===!0,extensionClipCullDistance:_e&&y.extensions.clipCullDistance&&n.has("WEBGL_clip_cull_distance"),rendererExtensionFragDepth:u||n.has("EXT_frag_depth"),rendererExtensionDrawBuffers:u||n.has("WEBGL_draw_buffers"),rendererExtensionShaderTextureLod:u||n.has("EXT_shader_texture_lod"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:y.customProgramCacheKey()}}function d(y){const b=[];if(y.shaderID?b.push(y.shaderID):(b.push(y.customVertexShaderID),b.push(y.customFragmentShaderID)),y.defines!==void 0)for(const U in y.defines)b.push(U),b.push(y.defines[U]);return y.isRawShaderMaterial===!1&&(x(b,y),v(b,y),b.push(i.outputColorSpace)),b.push(y.customProgramCacheKey),b.join()}function x(y,b){y.push(b.precision),y.push(b.outputColorSpace),y.push(b.envMapMode),y.push(b.envMapCubeUVHeight),y.push(b.mapUv),y.push(b.alphaMapUv),y.push(b.lightMapUv),y.push(b.aoMapUv),y.push(b.bumpMapUv),y.push(b.normalMapUv),y.push(b.displacementMapUv),y.push(b.emissiveMapUv),y.push(b.metalnessMapUv),y.push(b.roughnessMapUv),y.push(b.anisotropyMapUv),y.push(b.clearcoatMapUv),y.push(b.clearcoatNormalMapUv),y.push(b.clearcoatRoughnessMapUv),y.push(b.iridescenceMapUv),y.push(b.iridescenceThicknessMapUv),y.push(b.sheenColorMapUv),y.push(b.sheenRoughnessMapUv),y.push(b.specularMapUv),y.push(b.specularColorMapUv),y.push(b.specularIntensityMapUv),y.push(b.transmissionMapUv),y.push(b.thicknessMapUv),y.push(b.combine),y.push(b.fogExp2),y.push(b.sizeAttenuation),y.push(b.morphTargetsCount),y.push(b.morphAttributeCount),y.push(b.numDirLights),y.push(b.numPointLights),y.push(b.numSpotLights),y.push(b.numSpotLightMaps),y.push(b.numHemiLights),y.push(b.numRectAreaLights),y.push(b.numDirLightShadows),y.push(b.numPointLightShadows),y.push(b.numSpotLightShadows),y.push(b.numSpotLightShadowsWithMaps),y.push(b.numLightProbes),y.push(b.shadowMapType),y.push(b.toneMapping),y.push(b.numClippingPlanes),y.push(b.numClipIntersection),y.push(b.depthPacking)}function v(y,b){o.disableAll(),b.isWebGL2&&o.enable(0),b.supportsVertexTextures&&o.enable(1),b.instancing&&o.enable(2),b.instancingColor&&o.enable(3),b.matcap&&o.enable(4),b.envMap&&o.enable(5),b.normalMapObjectSpace&&o.enable(6),b.normalMapTangentSpace&&o.enable(7),b.clearcoat&&o.enable(8),b.iridescence&&o.enable(9),b.alphaTest&&o.enable(10),b.vertexColors&&o.enable(11),b.vertexAlphas&&o.enable(12),b.vertexUv1s&&o.enable(13),b.vertexUv2s&&o.enable(14),b.vertexUv3s&&o.enable(15),b.vertexTangents&&o.enable(16),b.anisotropy&&o.enable(17),b.alphaHash&&o.enable(18),b.batching&&o.enable(19),y.push(o.mask),o.disableAll(),b.fog&&o.enable(0),b.useFog&&o.enable(1),b.flatShading&&o.enable(2),b.logarithmicDepthBuffer&&o.enable(3),b.skinning&&o.enable(4),b.morphTargets&&o.enable(5),b.morphNormals&&o.enable(6),b.morphColors&&o.enable(7),b.premultipliedAlpha&&o.enable(8),b.shadowMapEnabled&&o.enable(9),b.useLegacyLights&&o.enable(10),b.doubleSided&&o.enable(11),b.flipSided&&o.enable(12),b.useDepthPacking&&o.enable(13),b.dithering&&o.enable(14),b.transmission&&o.enable(15),b.sheen&&o.enable(16),b.opaque&&o.enable(17),b.pointsUvs&&o.enable(18),b.decodeVideoTexture&&o.enable(19),y.push(o.mask)}function M(y){const b=g[y.type];let U;if(b){const k=ti[b];U=ev.clone(k.uniforms)}else U=y.uniforms;return U}function C(y,b){let U;for(let k=0,Q=c.length;k<Q;k++){const D=c[k];if(D.cacheKey===b){U=D,++U.usedTimes;break}}return U===void 0&&(U=new pM(i,b,y,r),c.push(U)),U}function A(y){if(--y.usedTimes===0){const b=c.indexOf(y);c[b]=c[c.length-1],c.pop(),y.destroy()}}function T(y){l.remove(y)}function z(){l.dispose()}return{getParameters:p,getProgramCacheKey:d,getUniforms:M,acquireProgram:C,releaseProgram:A,releaseShaderCache:T,programs:c,dispose:z}}function xM(){let i=new WeakMap;function e(r){let a=i.get(r);return a===void 0&&(a={},i.set(r,a)),a}function t(r){i.delete(r)}function n(r,a,o){i.get(r)[a]=o}function s(){i=new WeakMap}return{get:e,remove:t,update:n,dispose:s}}function yM(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.z!==e.z?i.z-e.z:i.id-e.id}function Oh(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function Fh(){const i=[];let e=0;const t=[],n=[],s=[];function r(){e=0,t.length=0,n.length=0,s.length=0}function a(h,f,m,g,_,p){let d=i[e];return d===void 0?(d={id:h.id,object:h,geometry:f,material:m,groupOrder:g,renderOrder:h.renderOrder,z:_,group:p},i[e]=d):(d.id=h.id,d.object=h,d.geometry=f,d.material=m,d.groupOrder=g,d.renderOrder=h.renderOrder,d.z=_,d.group=p),e++,d}function o(h,f,m,g,_,p){const d=a(h,f,m,g,_,p);m.transmission>0?n.push(d):m.transparent===!0?s.push(d):t.push(d)}function l(h,f,m,g,_,p){const d=a(h,f,m,g,_,p);m.transmission>0?n.unshift(d):m.transparent===!0?s.unshift(d):t.unshift(d)}function c(h,f){t.length>1&&t.sort(h||yM),n.length>1&&n.sort(f||Oh),s.length>1&&s.sort(f||Oh)}function u(){for(let h=e,f=i.length;h<f;h++){const m=i[h];if(m.id===null)break;m.id=null,m.object=null,m.geometry=null,m.material=null,m.group=null}}return{opaque:t,transmissive:n,transparent:s,init:r,push:o,unshift:l,finish:u,sort:c}}function MM(){let i=new WeakMap;function e(n,s){const r=i.get(n);let a;return r===void 0?(a=new Fh,i.set(n,[a])):s>=r.length?(a=new Fh,r.push(a)):a=r[s],a}function t(){i=new WeakMap}return{get:e,dispose:t}}function SM(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new I,color:new ot};break;case"SpotLight":t={position:new I,direction:new I,color:new ot,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new I,color:new ot,distance:0,decay:0};break;case"HemisphereLight":t={direction:new I,skyColor:new ot,groundColor:new ot};break;case"RectAreaLight":t={color:new ot,position:new I,halfWidth:new I,halfHeight:new I};break}return i[e.id]=t,t}}}function bM(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ne};break;case"SpotLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ne};break;case"PointLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ne,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}let EM=0;function wM(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function TM(i,e){const t=new SM,n=bM(),s={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let u=0;u<9;u++)s.probe.push(new I);const r=new I,a=new Rt,o=new Rt;function l(u,h){let f=0,m=0,g=0;for(let k=0;k<9;k++)s.probe[k].set(0,0,0);let _=0,p=0,d=0,x=0,v=0,M=0,C=0,A=0,T=0,z=0,y=0;u.sort(wM);const b=h===!0?Math.PI:1;for(let k=0,Q=u.length;k<Q;k++){const D=u[k],O=D.color,W=D.intensity,Z=D.distance,$=D.shadow&&D.shadow.map?D.shadow.map.texture:null;if(D.isAmbientLight)f+=O.r*W*b,m+=O.g*W*b,g+=O.b*W*b;else if(D.isLightProbe){for(let j=0;j<9;j++)s.probe[j].addScaledVector(D.sh.coefficients[j],W);y++}else if(D.isDirectionalLight){const j=t.get(D);if(j.color.copy(D.color).multiplyScalar(D.intensity*b),D.castShadow){const Y=D.shadow,ie=n.get(D);ie.shadowBias=Y.bias,ie.shadowNormalBias=Y.normalBias,ie.shadowRadius=Y.radius,ie.shadowMapSize=Y.mapSize,s.directionalShadow[_]=ie,s.directionalShadowMap[_]=$,s.directionalShadowMatrix[_]=D.shadow.matrix,M++}s.directional[_]=j,_++}else if(D.isSpotLight){const j=t.get(D);j.position.setFromMatrixPosition(D.matrixWorld),j.color.copy(O).multiplyScalar(W*b),j.distance=Z,j.coneCos=Math.cos(D.angle),j.penumbraCos=Math.cos(D.angle*(1-D.penumbra)),j.decay=D.decay,s.spot[d]=j;const Y=D.shadow;if(D.map&&(s.spotLightMap[T]=D.map,T++,Y.updateMatrices(D),D.castShadow&&z++),s.spotLightMatrix[d]=Y.matrix,D.castShadow){const ie=n.get(D);ie.shadowBias=Y.bias,ie.shadowNormalBias=Y.normalBias,ie.shadowRadius=Y.radius,ie.shadowMapSize=Y.mapSize,s.spotShadow[d]=ie,s.spotShadowMap[d]=$,A++}d++}else if(D.isRectAreaLight){const j=t.get(D);j.color.copy(O).multiplyScalar(W),j.halfWidth.set(D.width*.5,0,0),j.halfHeight.set(0,D.height*.5,0),s.rectArea[x]=j,x++}else if(D.isPointLight){const j=t.get(D);if(j.color.copy(D.color).multiplyScalar(D.intensity*b),j.distance=D.distance,j.decay=D.decay,D.castShadow){const Y=D.shadow,ie=n.get(D);ie.shadowBias=Y.bias,ie.shadowNormalBias=Y.normalBias,ie.shadowRadius=Y.radius,ie.shadowMapSize=Y.mapSize,ie.shadowCameraNear=Y.camera.near,ie.shadowCameraFar=Y.camera.far,s.pointShadow[p]=ie,s.pointShadowMap[p]=$,s.pointShadowMatrix[p]=D.shadow.matrix,C++}s.point[p]=j,p++}else if(D.isHemisphereLight){const j=t.get(D);j.skyColor.copy(D.color).multiplyScalar(W*b),j.groundColor.copy(D.groundColor).multiplyScalar(W*b),s.hemi[v]=j,v++}}x>0&&(e.isWebGL2?i.has("OES_texture_float_linear")===!0?(s.rectAreaLTC1=fe.LTC_FLOAT_1,s.rectAreaLTC2=fe.LTC_FLOAT_2):(s.rectAreaLTC1=fe.LTC_HALF_1,s.rectAreaLTC2=fe.LTC_HALF_2):i.has("OES_texture_float_linear")===!0?(s.rectAreaLTC1=fe.LTC_FLOAT_1,s.rectAreaLTC2=fe.LTC_FLOAT_2):i.has("OES_texture_half_float_linear")===!0?(s.rectAreaLTC1=fe.LTC_HALF_1,s.rectAreaLTC2=fe.LTC_HALF_2):console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.")),s.ambient[0]=f,s.ambient[1]=m,s.ambient[2]=g;const U=s.hash;(U.directionalLength!==_||U.pointLength!==p||U.spotLength!==d||U.rectAreaLength!==x||U.hemiLength!==v||U.numDirectionalShadows!==M||U.numPointShadows!==C||U.numSpotShadows!==A||U.numSpotMaps!==T||U.numLightProbes!==y)&&(s.directional.length=_,s.spot.length=d,s.rectArea.length=x,s.point.length=p,s.hemi.length=v,s.directionalShadow.length=M,s.directionalShadowMap.length=M,s.pointShadow.length=C,s.pointShadowMap.length=C,s.spotShadow.length=A,s.spotShadowMap.length=A,s.directionalShadowMatrix.length=M,s.pointShadowMatrix.length=C,s.spotLightMatrix.length=A+T-z,s.spotLightMap.length=T,s.numSpotLightShadowsWithMaps=z,s.numLightProbes=y,U.directionalLength=_,U.pointLength=p,U.spotLength=d,U.rectAreaLength=x,U.hemiLength=v,U.numDirectionalShadows=M,U.numPointShadows=C,U.numSpotShadows=A,U.numSpotMaps=T,U.numLightProbes=y,s.version=EM++)}function c(u,h){let f=0,m=0,g=0,_=0,p=0;const d=h.matrixWorldInverse;for(let x=0,v=u.length;x<v;x++){const M=u[x];if(M.isDirectionalLight){const C=s.directional[f];C.direction.setFromMatrixPosition(M.matrixWorld),r.setFromMatrixPosition(M.target.matrixWorld),C.direction.sub(r),C.direction.transformDirection(d),f++}else if(M.isSpotLight){const C=s.spot[g];C.position.setFromMatrixPosition(M.matrixWorld),C.position.applyMatrix4(d),C.direction.setFromMatrixPosition(M.matrixWorld),r.setFromMatrixPosition(M.target.matrixWorld),C.direction.sub(r),C.direction.transformDirection(d),g++}else if(M.isRectAreaLight){const C=s.rectArea[_];C.position.setFromMatrixPosition(M.matrixWorld),C.position.applyMatrix4(d),o.identity(),a.copy(M.matrixWorld),a.premultiply(d),o.extractRotation(a),C.halfWidth.set(M.width*.5,0,0),C.halfHeight.set(0,M.height*.5,0),C.halfWidth.applyMatrix4(o),C.halfHeight.applyMatrix4(o),_++}else if(M.isPointLight){const C=s.point[m];C.position.setFromMatrixPosition(M.matrixWorld),C.position.applyMatrix4(d),m++}else if(M.isHemisphereLight){const C=s.hemi[p];C.direction.setFromMatrixPosition(M.matrixWorld),C.direction.transformDirection(d),p++}}}return{setup:l,setupView:c,state:s}}function kh(i,e){const t=new TM(i,e),n=[],s=[];function r(){n.length=0,s.length=0}function a(h){n.push(h)}function o(h){s.push(h)}function l(h){t.setup(n,h)}function c(h){t.setupView(n,h)}return{init:r,state:{lightsArray:n,shadowsArray:s,lights:t},setupLights:l,setupLightsView:c,pushLight:a,pushShadow:o}}function AM(i,e){let t=new WeakMap;function n(r,a=0){const o=t.get(r);let l;return o===void 0?(l=new kh(i,e),t.set(r,[l])):a>=o.length?(l=new kh(i,e),o.push(l)):l=o[a],l}function s(){t=new WeakMap}return{get:n,dispose:s}}class RM extends Fs{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=b_,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class CM extends Fs{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const PM=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,LM=`uniform sampler2D shadow_pass;
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
}`;function DM(i,e,t){let n=new kc;const s=new Ne,r=new Ne,a=new Ht,o=new RM({depthPacking:E_}),l=new CM,c={},u=t.maxTextureSize,h={[Qi]:un,[un]:Qi,[xi]:xi},f=new Ds({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Ne},radius:{value:4}},vertexShader:PM,fragmentShader:LM}),m=f.clone();m.defines.HORIZONTAL_PASS=1;const g=new rn;g.setAttribute("position",new In(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new Ei(g,f),p=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=rd;let d=this.type;this.render=function(A,T,z){if(p.enabled===!1||p.autoUpdate===!1&&p.needsUpdate===!1||A.length===0)return;const y=i.getRenderTarget(),b=i.getActiveCubeFace(),U=i.getActiveMipmapLevel(),k=i.state;k.setBlending($i),k.buffers.color.setClear(1,1,1,1),k.buffers.depth.setTest(!0),k.setScissorTest(!1);const Q=d!==gi&&this.type===gi,D=d===gi&&this.type!==gi;for(let O=0,W=A.length;O<W;O++){const Z=A[O],$=Z.shadow;if($===void 0){console.warn("THREE.WebGLShadowMap:",Z,"has no shadow.");continue}if($.autoUpdate===!1&&$.needsUpdate===!1)continue;s.copy($.mapSize);const j=$.getFrameExtents();if(s.multiply(j),r.copy($.mapSize),(s.x>u||s.y>u)&&(s.x>u&&(r.x=Math.floor(u/j.x),s.x=r.x*j.x,$.mapSize.x=r.x),s.y>u&&(r.y=Math.floor(u/j.y),s.y=r.y*j.y,$.mapSize.y=r.y)),$.map===null||Q===!0||D===!0){const ie=this.type!==gi?{minFilter:tn,magFilter:tn}:{};$.map!==null&&$.map.dispose(),$.map=new Ls(s.x,s.y,ie),$.map.texture.name=Z.name+".shadowMap",$.camera.updateProjectionMatrix()}i.setRenderTarget($.map),i.clear();const Y=$.getViewportCount();for(let ie=0;ie<Y;ie++){const ee=$.getViewport(ie);a.set(r.x*ee.x,r.y*ee.y,r.x*ee.z,r.y*ee.w),k.viewport(a),$.updateMatrices(Z,ie),n=$.getFrustum(),M(T,z,$.camera,Z,this.type)}$.isPointLightShadow!==!0&&this.type===gi&&x($,z),$.needsUpdate=!1}d=this.type,p.needsUpdate=!1,i.setRenderTarget(y,b,U)};function x(A,T){const z=e.update(_);f.defines.VSM_SAMPLES!==A.blurSamples&&(f.defines.VSM_SAMPLES=A.blurSamples,m.defines.VSM_SAMPLES=A.blurSamples,f.needsUpdate=!0,m.needsUpdate=!0),A.mapPass===null&&(A.mapPass=new Ls(s.x,s.y)),f.uniforms.shadow_pass.value=A.map.texture,f.uniforms.resolution.value=A.mapSize,f.uniforms.radius.value=A.radius,i.setRenderTarget(A.mapPass),i.clear(),i.renderBufferDirect(T,null,z,f,_,null),m.uniforms.shadow_pass.value=A.mapPass.texture,m.uniforms.resolution.value=A.mapSize,m.uniforms.radius.value=A.radius,i.setRenderTarget(A.map),i.clear(),i.renderBufferDirect(T,null,z,m,_,null)}function v(A,T,z,y){let b=null;const U=z.isPointLight===!0?A.customDistanceMaterial:A.customDepthMaterial;if(U!==void 0)b=U;else if(b=z.isPointLight===!0?l:o,i.localClippingEnabled&&T.clipShadows===!0&&Array.isArray(T.clippingPlanes)&&T.clippingPlanes.length!==0||T.displacementMap&&T.displacementScale!==0||T.alphaMap&&T.alphaTest>0||T.map&&T.alphaTest>0){const k=b.uuid,Q=T.uuid;let D=c[k];D===void 0&&(D={},c[k]=D);let O=D[Q];O===void 0&&(O=b.clone(),D[Q]=O,T.addEventListener("dispose",C)),b=O}if(b.visible=T.visible,b.wireframe=T.wireframe,y===gi?b.side=T.shadowSide!==null?T.shadowSide:T.side:b.side=T.shadowSide!==null?T.shadowSide:h[T.side],b.alphaMap=T.alphaMap,b.alphaTest=T.alphaTest,b.map=T.map,b.clipShadows=T.clipShadows,b.clippingPlanes=T.clippingPlanes,b.clipIntersection=T.clipIntersection,b.displacementMap=T.displacementMap,b.displacementScale=T.displacementScale,b.displacementBias=T.displacementBias,b.wireframeLinewidth=T.wireframeLinewidth,b.linewidth=T.linewidth,z.isPointLight===!0&&b.isMeshDistanceMaterial===!0){const k=i.properties.get(b);k.light=z}return b}function M(A,T,z,y,b){if(A.visible===!1)return;if(A.layers.test(T.layers)&&(A.isMesh||A.isLine||A.isPoints)&&(A.castShadow||A.receiveShadow&&b===gi)&&(!A.frustumCulled||n.intersectsObject(A))){A.modelViewMatrix.multiplyMatrices(z.matrixWorldInverse,A.matrixWorld);const Q=e.update(A),D=A.material;if(Array.isArray(D)){const O=Q.groups;for(let W=0,Z=O.length;W<Z;W++){const $=O[W],j=D[$.materialIndex];if(j&&j.visible){const Y=v(A,j,y,b);A.onBeforeShadow(i,A,T,z,Q,Y,$),i.renderBufferDirect(z,null,Q,Y,A,$),A.onAfterShadow(i,A,T,z,Q,Y,$)}}}else if(D.visible){const O=v(A,D,y,b);A.onBeforeShadow(i,A,T,z,Q,O,null),i.renderBufferDirect(z,null,Q,O,A,null),A.onAfterShadow(i,A,T,z,Q,O,null)}}const k=A.children;for(let Q=0,D=k.length;Q<D;Q++)M(k[Q],T,z,y,b)}function C(A){A.target.removeEventListener("dispose",C);for(const z in c){const y=c[z],b=A.target.uuid;b in y&&(y[b].dispose(),delete y[b])}}}function UM(i,e,t){const n=t.isWebGL2;function s(){let L=!1;const ue=new Ht;let _e=null;const Fe=new Ht(0,0,0,0);return{setMask:function(Ie){_e!==Ie&&!L&&(i.colorMask(Ie,Ie,Ie,Ie),_e=Ie)},setLocked:function(Ie){L=Ie},setClear:function(Ie,Je,Qe,bt,Ct){Ct===!0&&(Ie*=bt,Je*=bt,Qe*=bt),ue.set(Ie,Je,Qe,bt),Fe.equals(ue)===!1&&(i.clearColor(Ie,Je,Qe,bt),Fe.copy(ue))},reset:function(){L=!1,_e=null,Fe.set(-1,0,0,0)}}}function r(){let L=!1,ue=null,_e=null,Fe=null;return{setTest:function(Ie){Ie?Ae(i.DEPTH_TEST):Ee(i.DEPTH_TEST)},setMask:function(Ie){ue!==Ie&&!L&&(i.depthMask(Ie),ue=Ie)},setFunc:function(Ie){if(_e!==Ie){switch(Ie){case Qg:i.depthFunc(i.NEVER);break;case e_:i.depthFunc(i.ALWAYS);break;case t_:i.depthFunc(i.LESS);break;case _o:i.depthFunc(i.LEQUAL);break;case n_:i.depthFunc(i.EQUAL);break;case i_:i.depthFunc(i.GEQUAL);break;case s_:i.depthFunc(i.GREATER);break;case r_:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}_e=Ie}},setLocked:function(Ie){L=Ie},setClear:function(Ie){Fe!==Ie&&(i.clearDepth(Ie),Fe=Ie)},reset:function(){L=!1,ue=null,_e=null,Fe=null}}}function a(){let L=!1,ue=null,_e=null,Fe=null,Ie=null,Je=null,Qe=null,bt=null,Ct=null;return{setTest:function(at){L||(at?Ae(i.STENCIL_TEST):Ee(i.STENCIL_TEST))},setMask:function(at){ue!==at&&!L&&(i.stencilMask(at),ue=at)},setFunc:function(at,Ut,Kn){(_e!==at||Fe!==Ut||Ie!==Kn)&&(i.stencilFunc(at,Ut,Kn),_e=at,Fe=Ut,Ie=Kn)},setOp:function(at,Ut,Kn){(Je!==at||Qe!==Ut||bt!==Kn)&&(i.stencilOp(at,Ut,Kn),Je=at,Qe=Ut,bt=Kn)},setLocked:function(at){L=at},setClear:function(at){Ct!==at&&(i.clearStencil(at),Ct=at)},reset:function(){L=!1,ue=null,_e=null,Fe=null,Ie=null,Je=null,Qe=null,bt=null,Ct=null}}}const o=new s,l=new r,c=new a,u=new WeakMap,h=new WeakMap;let f={},m={},g=new WeakMap,_=[],p=null,d=!1,x=null,v=null,M=null,C=null,A=null,T=null,z=null,y=new ot(0,0,0),b=0,U=!1,k=null,Q=null,D=null,O=null,W=null;const Z=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let $=!1,j=0;const Y=i.getParameter(i.VERSION);Y.indexOf("WebGL")!==-1?(j=parseFloat(/^WebGL (\d)/.exec(Y)[1]),$=j>=1):Y.indexOf("OpenGL ES")!==-1&&(j=parseFloat(/^OpenGL ES (\d)/.exec(Y)[1]),$=j>=2);let ie=null,ee={};const G=i.getParameter(i.SCISSOR_BOX),H=i.getParameter(i.VIEWPORT),oe=new Ht().fromArray(G),de=new Ht().fromArray(H);function ge(L,ue,_e,Fe){const Ie=new Uint8Array(4),Je=i.createTexture();i.bindTexture(L,Je),i.texParameteri(L,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(L,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Qe=0;Qe<_e;Qe++)n&&(L===i.TEXTURE_3D||L===i.TEXTURE_2D_ARRAY)?i.texImage3D(ue,0,i.RGBA,1,1,Fe,0,i.RGBA,i.UNSIGNED_BYTE,Ie):i.texImage2D(ue+Qe,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,Ie);return Je}const xe={};xe[i.TEXTURE_2D]=ge(i.TEXTURE_2D,i.TEXTURE_2D,1),xe[i.TEXTURE_CUBE_MAP]=ge(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),n&&(xe[i.TEXTURE_2D_ARRAY]=ge(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),xe[i.TEXTURE_3D]=ge(i.TEXTURE_3D,i.TEXTURE_3D,1,1)),o.setClear(0,0,0,1),l.setClear(1),c.setClear(0),Ae(i.DEPTH_TEST),l.setFunc(_o),Ge(!1),w(Mu),Ae(i.CULL_FACE),be($i);function Ae(L){f[L]!==!0&&(i.enable(L),f[L]=!0)}function Ee(L){f[L]!==!1&&(i.disable(L),f[L]=!1)}function Ue(L,ue){return m[L]!==ue?(i.bindFramebuffer(L,ue),m[L]=ue,n&&(L===i.DRAW_FRAMEBUFFER&&(m[i.FRAMEBUFFER]=ue),L===i.FRAMEBUFFER&&(m[i.DRAW_FRAMEBUFFER]=ue)),!0):!1}function B(L,ue){let _e=_,Fe=!1;if(L)if(_e=g.get(ue),_e===void 0&&(_e=[],g.set(ue,_e)),L.isWebGLMultipleRenderTargets){const Ie=L.texture;if(_e.length!==Ie.length||_e[0]!==i.COLOR_ATTACHMENT0){for(let Je=0,Qe=Ie.length;Je<Qe;Je++)_e[Je]=i.COLOR_ATTACHMENT0+Je;_e.length=Ie.length,Fe=!0}}else _e[0]!==i.COLOR_ATTACHMENT0&&(_e[0]=i.COLOR_ATTACHMENT0,Fe=!0);else _e[0]!==i.BACK&&(_e[0]=i.BACK,Fe=!0);Fe&&(t.isWebGL2?i.drawBuffers(_e):e.get("WEBGL_draw_buffers").drawBuffersWEBGL(_e))}function ut(L){return p!==L?(i.useProgram(L),p=L,!0):!1}const we={[fs]:i.FUNC_ADD,[kg]:i.FUNC_SUBTRACT,[zg]:i.FUNC_REVERSE_SUBTRACT};if(n)we[Eu]=i.MIN,we[wu]=i.MAX;else{const L=e.get("EXT_blend_minmax");L!==null&&(we[Eu]=L.MIN_EXT,we[wu]=L.MAX_EXT)}const Oe={[Bg]:i.ZERO,[Hg]:i.ONE,[Gg]:i.SRC_COLOR,[Jl]:i.SRC_ALPHA,[$g]:i.SRC_ALPHA_SATURATE,[qg]:i.DST_COLOR,[Wg]:i.DST_ALPHA,[Vg]:i.ONE_MINUS_SRC_COLOR,[Ql]:i.ONE_MINUS_SRC_ALPHA,[Yg]:i.ONE_MINUS_DST_COLOR,[Xg]:i.ONE_MINUS_DST_ALPHA,[jg]:i.CONSTANT_COLOR,[Kg]:i.ONE_MINUS_CONSTANT_COLOR,[Zg]:i.CONSTANT_ALPHA,[Jg]:i.ONE_MINUS_CONSTANT_ALPHA};function be(L,ue,_e,Fe,Ie,Je,Qe,bt,Ct,at){if(L===$i){d===!0&&(Ee(i.BLEND),d=!1);return}if(d===!1&&(Ae(i.BLEND),d=!0),L!==Fg){if(L!==x||at!==U){if((v!==fs||A!==fs)&&(i.blendEquation(i.FUNC_ADD),v=fs,A=fs),at)switch(L){case dr:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Oi:i.blendFunc(i.ONE,i.ONE);break;case Su:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case bu:i.blendFuncSeparate(i.ZERO,i.SRC_COLOR,i.ZERO,i.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",L);break}else switch(L){case dr:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Oi:i.blendFunc(i.SRC_ALPHA,i.ONE);break;case Su:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case bu:i.blendFunc(i.ZERO,i.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",L);break}M=null,C=null,T=null,z=null,y.set(0,0,0),b=0,x=L,U=at}return}Ie=Ie||ue,Je=Je||_e,Qe=Qe||Fe,(ue!==v||Ie!==A)&&(i.blendEquationSeparate(we[ue],we[Ie]),v=ue,A=Ie),(_e!==M||Fe!==C||Je!==T||Qe!==z)&&(i.blendFuncSeparate(Oe[_e],Oe[Fe],Oe[Je],Oe[Qe]),M=_e,C=Fe,T=Je,z=Qe),(bt.equals(y)===!1||Ct!==b)&&(i.blendColor(bt.r,bt.g,bt.b,Ct),y.copy(bt),b=Ct),x=L,U=!1}function mt(L,ue){L.side===xi?Ee(i.CULL_FACE):Ae(i.CULL_FACE);let _e=L.side===un;ue&&(_e=!_e),Ge(_e),L.blending===dr&&L.transparent===!1?be($i):be(L.blending,L.blendEquation,L.blendSrc,L.blendDst,L.blendEquationAlpha,L.blendSrcAlpha,L.blendDstAlpha,L.blendColor,L.blendAlpha,L.premultipliedAlpha),l.setFunc(L.depthFunc),l.setTest(L.depthTest),l.setMask(L.depthWrite),o.setMask(L.colorWrite);const Fe=L.stencilWrite;c.setTest(Fe),Fe&&(c.setMask(L.stencilWriteMask),c.setFunc(L.stencilFunc,L.stencilRef,L.stencilFuncMask),c.setOp(L.stencilFail,L.stencilZFail,L.stencilZPass)),N(L.polygonOffset,L.polygonOffsetFactor,L.polygonOffsetUnits),L.alphaToCoverage===!0?Ae(i.SAMPLE_ALPHA_TO_COVERAGE):Ee(i.SAMPLE_ALPHA_TO_COVERAGE)}function Ge(L){k!==L&&(L?i.frontFace(i.CW):i.frontFace(i.CCW),k=L)}function w(L){L!==Ig?(Ae(i.CULL_FACE),L!==Q&&(L===Mu?i.cullFace(i.BACK):L===Ng?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):Ee(i.CULL_FACE),Q=L}function S(L){L!==D&&($&&i.lineWidth(L),D=L)}function N(L,ue,_e){L?(Ae(i.POLYGON_OFFSET_FILL),(O!==ue||W!==_e)&&(i.polygonOffset(ue,_e),O=ue,W=_e)):Ee(i.POLYGON_OFFSET_FILL)}function ne(L){L?Ae(i.SCISSOR_TEST):Ee(i.SCISSOR_TEST)}function se(L){L===void 0&&(L=i.TEXTURE0+Z-1),ie!==L&&(i.activeTexture(L),ie=L)}function ae(L,ue,_e){_e===void 0&&(ie===null?_e=i.TEXTURE0+Z-1:_e=ie);let Fe=ee[_e];Fe===void 0&&(Fe={type:void 0,texture:void 0},ee[_e]=Fe),(Fe.type!==L||Fe.texture!==ue)&&(ie!==_e&&(i.activeTexture(_e),ie=_e),i.bindTexture(L,ue||xe[L]),Fe.type=L,Fe.texture=ue)}function Te(){const L=ee[ie];L!==void 0&&L.type!==void 0&&(i.bindTexture(L.type,null),L.type=void 0,L.texture=void 0)}function me(){try{i.compressedTexImage2D.apply(i,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Me(){try{i.compressedTexImage3D.apply(i,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function De(){try{i.texSubImage2D.apply(i,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Ve(){try{i.texSubImage3D.apply(i,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function J(){try{i.compressedTexSubImage2D.apply(i,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function lt(){try{i.compressedTexSubImage3D.apply(i,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Ye(){try{i.texStorage2D.apply(i,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Be(){try{i.texStorage3D.apply(i,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Le(){try{i.texImage2D.apply(i,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function ve(){try{i.texImage3D.apply(i,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function R(L){oe.equals(L)===!1&&(i.scissor(L.x,L.y,L.z,L.w),oe.copy(L))}function ce(L){de.equals(L)===!1&&(i.viewport(L.x,L.y,L.z,L.w),de.copy(L))}function Re(L,ue){let _e=h.get(ue);_e===void 0&&(_e=new WeakMap,h.set(ue,_e));let Fe=_e.get(L);Fe===void 0&&(Fe=i.getUniformBlockIndex(ue,L.name),_e.set(L,Fe))}function Se(L,ue){const Fe=h.get(ue).get(L);u.get(ue)!==Fe&&(i.uniformBlockBinding(ue,Fe,L.__bindingPointIndex),u.set(ue,Fe))}function re(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),n===!0&&(i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null)),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),f={},ie=null,ee={},m={},g=new WeakMap,_=[],p=null,d=!1,x=null,v=null,M=null,C=null,A=null,T=null,z=null,y=new ot(0,0,0),b=0,U=!1,k=null,Q=null,D=null,O=null,W=null,oe.set(0,0,i.canvas.width,i.canvas.height),de.set(0,0,i.canvas.width,i.canvas.height),o.reset(),l.reset(),c.reset()}return{buffers:{color:o,depth:l,stencil:c},enable:Ae,disable:Ee,bindFramebuffer:Ue,drawBuffers:B,useProgram:ut,setBlending:be,setMaterial:mt,setFlipSided:Ge,setCullFace:w,setLineWidth:S,setPolygonOffset:N,setScissorTest:ne,activeTexture:se,bindTexture:ae,unbindTexture:Te,compressedTexImage2D:me,compressedTexImage3D:Me,texImage2D:Le,texImage3D:ve,updateUBOMapping:Re,uniformBlockBinding:Se,texStorage2D:Ye,texStorage3D:Be,texSubImage2D:De,texSubImage3D:Ve,compressedTexSubImage2D:J,compressedTexSubImage3D:lt,scissor:R,viewport:ce,reset:re}}function IM(i,e,t,n,s,r,a){const o=s.isWebGL2,l=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),u=new WeakMap;let h;const f=new WeakMap;let m=!1;try{m=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(w,S){return m?new OffscreenCanvas(w,S):So("canvas")}function _(w,S,N,ne){let se=1;if((w.width>ne||w.height>ne)&&(se=ne/Math.max(w.width,w.height)),se<1||S===!0)if(typeof HTMLImageElement<"u"&&w instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&w instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&w instanceof ImageBitmap){const ae=S?oc:Math.floor,Te=ae(se*w.width),me=ae(se*w.height);h===void 0&&(h=g(Te,me));const Me=N?g(Te,me):h;return Me.width=Te,Me.height=me,Me.getContext("2d").drawImage(w,0,0,Te,me),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+w.width+"x"+w.height+") to ("+Te+"x"+me+")."),Me}else return"data"in w&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+w.width+"x"+w.height+")."),w;return w}function p(w){return eh(w.width)&&eh(w.height)}function d(w){return o?!1:w.wrapS!==Gn||w.wrapT!==Gn||w.minFilter!==tn&&w.minFilter!==Rn}function x(w,S){return w.generateMipmaps&&S&&w.minFilter!==tn&&w.minFilter!==Rn}function v(w){i.generateMipmap(w)}function M(w,S,N,ne,se=!1){if(o===!1)return S;if(w!==null){if(i[w]!==void 0)return i[w];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+w+"'")}let ae=S;if(S===i.RED&&(N===i.FLOAT&&(ae=i.R32F),N===i.HALF_FLOAT&&(ae=i.R16F),N===i.UNSIGNED_BYTE&&(ae=i.R8)),S===i.RED_INTEGER&&(N===i.UNSIGNED_BYTE&&(ae=i.R8UI),N===i.UNSIGNED_SHORT&&(ae=i.R16UI),N===i.UNSIGNED_INT&&(ae=i.R32UI),N===i.BYTE&&(ae=i.R8I),N===i.SHORT&&(ae=i.R16I),N===i.INT&&(ae=i.R32I)),S===i.RG&&(N===i.FLOAT&&(ae=i.RG32F),N===i.HALF_FLOAT&&(ae=i.RG16F),N===i.UNSIGNED_BYTE&&(ae=i.RG8)),S===i.RGBA){const Te=se?vo:gt.getTransfer(ne);N===i.FLOAT&&(ae=i.RGBA32F),N===i.HALF_FLOAT&&(ae=i.RGBA16F),N===i.UNSIGNED_BYTE&&(ae=Te===xt?i.SRGB8_ALPHA8:i.RGBA8),N===i.UNSIGNED_SHORT_4_4_4_4&&(ae=i.RGBA4),N===i.UNSIGNED_SHORT_5_5_5_1&&(ae=i.RGB5_A1)}return(ae===i.R16F||ae===i.R32F||ae===i.RG16F||ae===i.RG32F||ae===i.RGBA16F||ae===i.RGBA32F)&&e.get("EXT_color_buffer_float"),ae}function C(w,S,N){return x(w,N)===!0||w.isFramebufferTexture&&w.minFilter!==tn&&w.minFilter!==Rn?Math.log2(Math.max(S.width,S.height))+1:w.mipmaps!==void 0&&w.mipmaps.length>0?w.mipmaps.length:w.isCompressedTexture&&Array.isArray(w.image)?S.mipmaps.length:1}function A(w){return w===tn||w===Tu||w===qo?i.NEAREST:i.LINEAR}function T(w){const S=w.target;S.removeEventListener("dispose",T),y(S),S.isVideoTexture&&u.delete(S)}function z(w){const S=w.target;S.removeEventListener("dispose",z),U(S)}function y(w){const S=n.get(w);if(S.__webglInit===void 0)return;const N=w.source,ne=f.get(N);if(ne){const se=ne[S.__cacheKey];se.usedTimes--,se.usedTimes===0&&b(w),Object.keys(ne).length===0&&f.delete(N)}n.remove(w)}function b(w){const S=n.get(w);i.deleteTexture(S.__webglTexture);const N=w.source,ne=f.get(N);delete ne[S.__cacheKey],a.memory.textures--}function U(w){const S=w.texture,N=n.get(w),ne=n.get(S);if(ne.__webglTexture!==void 0&&(i.deleteTexture(ne.__webglTexture),a.memory.textures--),w.depthTexture&&w.depthTexture.dispose(),w.isWebGLCubeRenderTarget)for(let se=0;se<6;se++){if(Array.isArray(N.__webglFramebuffer[se]))for(let ae=0;ae<N.__webglFramebuffer[se].length;ae++)i.deleteFramebuffer(N.__webglFramebuffer[se][ae]);else i.deleteFramebuffer(N.__webglFramebuffer[se]);N.__webglDepthbuffer&&i.deleteRenderbuffer(N.__webglDepthbuffer[se])}else{if(Array.isArray(N.__webglFramebuffer))for(let se=0;se<N.__webglFramebuffer.length;se++)i.deleteFramebuffer(N.__webglFramebuffer[se]);else i.deleteFramebuffer(N.__webglFramebuffer);if(N.__webglDepthbuffer&&i.deleteRenderbuffer(N.__webglDepthbuffer),N.__webglMultisampledFramebuffer&&i.deleteFramebuffer(N.__webglMultisampledFramebuffer),N.__webglColorRenderbuffer)for(let se=0;se<N.__webglColorRenderbuffer.length;se++)N.__webglColorRenderbuffer[se]&&i.deleteRenderbuffer(N.__webglColorRenderbuffer[se]);N.__webglDepthRenderbuffer&&i.deleteRenderbuffer(N.__webglDepthRenderbuffer)}if(w.isWebGLMultipleRenderTargets)for(let se=0,ae=S.length;se<ae;se++){const Te=n.get(S[se]);Te.__webglTexture&&(i.deleteTexture(Te.__webglTexture),a.memory.textures--),n.remove(S[se])}n.remove(S),n.remove(w)}let k=0;function Q(){k=0}function D(){const w=k;return w>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+w+" texture units while this GPU supports only "+s.maxTextures),k+=1,w}function O(w){const S=[];return S.push(w.wrapS),S.push(w.wrapT),S.push(w.wrapR||0),S.push(w.magFilter),S.push(w.minFilter),S.push(w.anisotropy),S.push(w.internalFormat),S.push(w.format),S.push(w.type),S.push(w.generateMipmaps),S.push(w.premultiplyAlpha),S.push(w.flipY),S.push(w.unpackAlignment),S.push(w.colorSpace),S.join()}function W(w,S){const N=n.get(w);if(w.isVideoTexture&&mt(w),w.isRenderTargetTexture===!1&&w.version>0&&N.__version!==w.version){const ne=w.image;if(ne===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(ne.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{oe(N,w,S);return}}t.bindTexture(i.TEXTURE_2D,N.__webglTexture,i.TEXTURE0+S)}function Z(w,S){const N=n.get(w);if(w.version>0&&N.__version!==w.version){oe(N,w,S);return}t.bindTexture(i.TEXTURE_2D_ARRAY,N.__webglTexture,i.TEXTURE0+S)}function $(w,S){const N=n.get(w);if(w.version>0&&N.__version!==w.version){oe(N,w,S);return}t.bindTexture(i.TEXTURE_3D,N.__webglTexture,i.TEXTURE0+S)}function j(w,S){const N=n.get(w);if(w.version>0&&N.__version!==w.version){de(N,w,S);return}t.bindTexture(i.TEXTURE_CUBE_MAP,N.__webglTexture,i.TEXTURE0+S)}const Y={[nc]:i.REPEAT,[Gn]:i.CLAMP_TO_EDGE,[ic]:i.MIRRORED_REPEAT},ie={[tn]:i.NEAREST,[Tu]:i.NEAREST_MIPMAP_NEAREST,[qo]:i.NEAREST_MIPMAP_LINEAR,[Rn]:i.LINEAR,[p_]:i.LINEAR_MIPMAP_NEAREST,[ra]:i.LINEAR_MIPMAP_LINEAR},ee={[A_]:i.NEVER,[U_]:i.ALWAYS,[R_]:i.LESS,[gd]:i.LEQUAL,[C_]:i.EQUAL,[D_]:i.GEQUAL,[P_]:i.GREATER,[L_]:i.NOTEQUAL};function G(w,S,N){if(N?(i.texParameteri(w,i.TEXTURE_WRAP_S,Y[S.wrapS]),i.texParameteri(w,i.TEXTURE_WRAP_T,Y[S.wrapT]),(w===i.TEXTURE_3D||w===i.TEXTURE_2D_ARRAY)&&i.texParameteri(w,i.TEXTURE_WRAP_R,Y[S.wrapR]),i.texParameteri(w,i.TEXTURE_MAG_FILTER,ie[S.magFilter]),i.texParameteri(w,i.TEXTURE_MIN_FILTER,ie[S.minFilter])):(i.texParameteri(w,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(w,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE),(w===i.TEXTURE_3D||w===i.TEXTURE_2D_ARRAY)&&i.texParameteri(w,i.TEXTURE_WRAP_R,i.CLAMP_TO_EDGE),(S.wrapS!==Gn||S.wrapT!==Gn)&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."),i.texParameteri(w,i.TEXTURE_MAG_FILTER,A(S.magFilter)),i.texParameteri(w,i.TEXTURE_MIN_FILTER,A(S.minFilter)),S.minFilter!==tn&&S.minFilter!==Rn&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")),S.compareFunction&&(i.texParameteri(w,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(w,i.TEXTURE_COMPARE_FUNC,ee[S.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){const ne=e.get("EXT_texture_filter_anisotropic");if(S.magFilter===tn||S.minFilter!==qo&&S.minFilter!==ra||S.type===Vi&&e.has("OES_texture_float_linear")===!1||o===!1&&S.type===aa&&e.has("OES_texture_half_float_linear")===!1)return;(S.anisotropy>1||n.get(S).__currentAnisotropy)&&(i.texParameterf(w,ne.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(S.anisotropy,s.getMaxAnisotropy())),n.get(S).__currentAnisotropy=S.anisotropy)}}function H(w,S){let N=!1;w.__webglInit===void 0&&(w.__webglInit=!0,S.addEventListener("dispose",T));const ne=S.source;let se=f.get(ne);se===void 0&&(se={},f.set(ne,se));const ae=O(S);if(ae!==w.__cacheKey){se[ae]===void 0&&(se[ae]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,N=!0),se[ae].usedTimes++;const Te=se[w.__cacheKey];Te!==void 0&&(se[w.__cacheKey].usedTimes--,Te.usedTimes===0&&b(S)),w.__cacheKey=ae,w.__webglTexture=se[ae].texture}return N}function oe(w,S,N){let ne=i.TEXTURE_2D;(S.isDataArrayTexture||S.isCompressedArrayTexture)&&(ne=i.TEXTURE_2D_ARRAY),S.isData3DTexture&&(ne=i.TEXTURE_3D);const se=H(w,S),ae=S.source;t.bindTexture(ne,w.__webglTexture,i.TEXTURE0+N);const Te=n.get(ae);if(ae.version!==Te.__version||se===!0){t.activeTexture(i.TEXTURE0+N);const me=gt.getPrimaries(gt.workingColorSpace),Me=S.colorSpace===Ln?null:gt.getPrimaries(S.colorSpace),De=S.colorSpace===Ln||me===Me?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,S.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,S.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,De);const Ve=d(S)&&p(S.image)===!1;let J=_(S.image,Ve,!1,s.maxTextureSize);J=Ge(S,J);const lt=p(J)||o,Ye=r.convert(S.format,S.colorSpace);let Be=r.convert(S.type),Le=M(S.internalFormat,Ye,Be,S.colorSpace,S.isVideoTexture);G(ne,S,lt);let ve;const R=S.mipmaps,ce=o&&S.isVideoTexture!==!0&&Le!==pd,Re=Te.__version===void 0||se===!0,Se=C(S,J,lt);if(S.isDepthTexture)Le=i.DEPTH_COMPONENT,o?S.type===Vi?Le=i.DEPTH_COMPONENT32F:S.type===Gi?Le=i.DEPTH_COMPONENT24:S.type===Es?Le=i.DEPTH24_STENCIL8:Le=i.DEPTH_COMPONENT16:S.type===Vi&&console.error("WebGLRenderer: Floating point depth texture requires WebGL2."),S.format===ws&&Le===i.DEPTH_COMPONENT&&S.type!==Ic&&S.type!==Gi&&(console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."),S.type=Gi,Be=r.convert(S.type)),S.format===Lr&&Le===i.DEPTH_COMPONENT&&(Le=i.DEPTH_STENCIL,S.type!==Es&&(console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."),S.type=Es,Be=r.convert(S.type))),Re&&(ce?t.texStorage2D(i.TEXTURE_2D,1,Le,J.width,J.height):t.texImage2D(i.TEXTURE_2D,0,Le,J.width,J.height,0,Ye,Be,null));else if(S.isDataTexture)if(R.length>0&&lt){ce&&Re&&t.texStorage2D(i.TEXTURE_2D,Se,Le,R[0].width,R[0].height);for(let re=0,L=R.length;re<L;re++)ve=R[re],ce?t.texSubImage2D(i.TEXTURE_2D,re,0,0,ve.width,ve.height,Ye,Be,ve.data):t.texImage2D(i.TEXTURE_2D,re,Le,ve.width,ve.height,0,Ye,Be,ve.data);S.generateMipmaps=!1}else ce?(Re&&t.texStorage2D(i.TEXTURE_2D,Se,Le,J.width,J.height),t.texSubImage2D(i.TEXTURE_2D,0,0,0,J.width,J.height,Ye,Be,J.data)):t.texImage2D(i.TEXTURE_2D,0,Le,J.width,J.height,0,Ye,Be,J.data);else if(S.isCompressedTexture)if(S.isCompressedArrayTexture){ce&&Re&&t.texStorage3D(i.TEXTURE_2D_ARRAY,Se,Le,R[0].width,R[0].height,J.depth);for(let re=0,L=R.length;re<L;re++)ve=R[re],S.format!==Vn?Ye!==null?ce?t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,re,0,0,0,ve.width,ve.height,J.depth,Ye,ve.data,0,0):t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,re,Le,ve.width,ve.height,J.depth,0,ve.data,0,0):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):ce?t.texSubImage3D(i.TEXTURE_2D_ARRAY,re,0,0,0,ve.width,ve.height,J.depth,Ye,Be,ve.data):t.texImage3D(i.TEXTURE_2D_ARRAY,re,Le,ve.width,ve.height,J.depth,0,Ye,Be,ve.data)}else{ce&&Re&&t.texStorage2D(i.TEXTURE_2D,Se,Le,R[0].width,R[0].height);for(let re=0,L=R.length;re<L;re++)ve=R[re],S.format!==Vn?Ye!==null?ce?t.compressedTexSubImage2D(i.TEXTURE_2D,re,0,0,ve.width,ve.height,Ye,ve.data):t.compressedTexImage2D(i.TEXTURE_2D,re,Le,ve.width,ve.height,0,ve.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):ce?t.texSubImage2D(i.TEXTURE_2D,re,0,0,ve.width,ve.height,Ye,Be,ve.data):t.texImage2D(i.TEXTURE_2D,re,Le,ve.width,ve.height,0,Ye,Be,ve.data)}else if(S.isDataArrayTexture)ce?(Re&&t.texStorage3D(i.TEXTURE_2D_ARRAY,Se,Le,J.width,J.height,J.depth),t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,J.width,J.height,J.depth,Ye,Be,J.data)):t.texImage3D(i.TEXTURE_2D_ARRAY,0,Le,J.width,J.height,J.depth,0,Ye,Be,J.data);else if(S.isData3DTexture)ce?(Re&&t.texStorage3D(i.TEXTURE_3D,Se,Le,J.width,J.height,J.depth),t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,J.width,J.height,J.depth,Ye,Be,J.data)):t.texImage3D(i.TEXTURE_3D,0,Le,J.width,J.height,J.depth,0,Ye,Be,J.data);else if(S.isFramebufferTexture){if(Re)if(ce)t.texStorage2D(i.TEXTURE_2D,Se,Le,J.width,J.height);else{let re=J.width,L=J.height;for(let ue=0;ue<Se;ue++)t.texImage2D(i.TEXTURE_2D,ue,Le,re,L,0,Ye,Be,null),re>>=1,L>>=1}}else if(R.length>0&&lt){ce&&Re&&t.texStorage2D(i.TEXTURE_2D,Se,Le,R[0].width,R[0].height);for(let re=0,L=R.length;re<L;re++)ve=R[re],ce?t.texSubImage2D(i.TEXTURE_2D,re,0,0,Ye,Be,ve):t.texImage2D(i.TEXTURE_2D,re,Le,Ye,Be,ve);S.generateMipmaps=!1}else ce?(Re&&t.texStorage2D(i.TEXTURE_2D,Se,Le,J.width,J.height),t.texSubImage2D(i.TEXTURE_2D,0,0,0,Ye,Be,J)):t.texImage2D(i.TEXTURE_2D,0,Le,Ye,Be,J);x(S,lt)&&v(ne),Te.__version=ae.version,S.onUpdate&&S.onUpdate(S)}w.__version=S.version}function de(w,S,N){if(S.image.length!==6)return;const ne=H(w,S),se=S.source;t.bindTexture(i.TEXTURE_CUBE_MAP,w.__webglTexture,i.TEXTURE0+N);const ae=n.get(se);if(se.version!==ae.__version||ne===!0){t.activeTexture(i.TEXTURE0+N);const Te=gt.getPrimaries(gt.workingColorSpace),me=S.colorSpace===Ln?null:gt.getPrimaries(S.colorSpace),Me=S.colorSpace===Ln||Te===me?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,S.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,S.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Me);const De=S.isCompressedTexture||S.image[0].isCompressedTexture,Ve=S.image[0]&&S.image[0].isDataTexture,J=[];for(let re=0;re<6;re++)!De&&!Ve?J[re]=_(S.image[re],!1,!0,s.maxCubemapSize):J[re]=Ve?S.image[re].image:S.image[re],J[re]=Ge(S,J[re]);const lt=J[0],Ye=p(lt)||o,Be=r.convert(S.format,S.colorSpace),Le=r.convert(S.type),ve=M(S.internalFormat,Be,Le,S.colorSpace),R=o&&S.isVideoTexture!==!0,ce=ae.__version===void 0||ne===!0;let Re=C(S,lt,Ye);G(i.TEXTURE_CUBE_MAP,S,Ye);let Se;if(De){R&&ce&&t.texStorage2D(i.TEXTURE_CUBE_MAP,Re,ve,lt.width,lt.height);for(let re=0;re<6;re++){Se=J[re].mipmaps;for(let L=0;L<Se.length;L++){const ue=Se[L];S.format!==Vn?Be!==null?R?t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+re,L,0,0,ue.width,ue.height,Be,ue.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+re,L,ve,ue.width,ue.height,0,ue.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):R?t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+re,L,0,0,ue.width,ue.height,Be,Le,ue.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+re,L,ve,ue.width,ue.height,0,Be,Le,ue.data)}}}else{Se=S.mipmaps,R&&ce&&(Se.length>0&&Re++,t.texStorage2D(i.TEXTURE_CUBE_MAP,Re,ve,J[0].width,J[0].height));for(let re=0;re<6;re++)if(Ve){R?t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+re,0,0,0,J[re].width,J[re].height,Be,Le,J[re].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+re,0,ve,J[re].width,J[re].height,0,Be,Le,J[re].data);for(let L=0;L<Se.length;L++){const _e=Se[L].image[re].image;R?t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+re,L+1,0,0,_e.width,_e.height,Be,Le,_e.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+re,L+1,ve,_e.width,_e.height,0,Be,Le,_e.data)}}else{R?t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+re,0,0,0,Be,Le,J[re]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+re,0,ve,Be,Le,J[re]);for(let L=0;L<Se.length;L++){const ue=Se[L];R?t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+re,L+1,0,0,Be,Le,ue.image[re]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+re,L+1,ve,Be,Le,ue.image[re])}}}x(S,Ye)&&v(i.TEXTURE_CUBE_MAP),ae.__version=se.version,S.onUpdate&&S.onUpdate(S)}w.__version=S.version}function ge(w,S,N,ne,se,ae){const Te=r.convert(N.format,N.colorSpace),me=r.convert(N.type),Me=M(N.internalFormat,Te,me,N.colorSpace);if(!n.get(S).__hasExternalTextures){const Ve=Math.max(1,S.width>>ae),J=Math.max(1,S.height>>ae);se===i.TEXTURE_3D||se===i.TEXTURE_2D_ARRAY?t.texImage3D(se,ae,Me,Ve,J,S.depth,0,Te,me,null):t.texImage2D(se,ae,Me,Ve,J,0,Te,me,null)}t.bindFramebuffer(i.FRAMEBUFFER,w),be(S)?l.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,ne,se,n.get(N).__webglTexture,0,Oe(S)):(se===i.TEXTURE_2D||se>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&se<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,ne,se,n.get(N).__webglTexture,ae),t.bindFramebuffer(i.FRAMEBUFFER,null)}function xe(w,S,N){if(i.bindRenderbuffer(i.RENDERBUFFER,w),S.depthBuffer&&!S.stencilBuffer){let ne=o===!0?i.DEPTH_COMPONENT24:i.DEPTH_COMPONENT16;if(N||be(S)){const se=S.depthTexture;se&&se.isDepthTexture&&(se.type===Vi?ne=i.DEPTH_COMPONENT32F:se.type===Gi&&(ne=i.DEPTH_COMPONENT24));const ae=Oe(S);be(S)?l.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,ae,ne,S.width,S.height):i.renderbufferStorageMultisample(i.RENDERBUFFER,ae,ne,S.width,S.height)}else i.renderbufferStorage(i.RENDERBUFFER,ne,S.width,S.height);i.framebufferRenderbuffer(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.RENDERBUFFER,w)}else if(S.depthBuffer&&S.stencilBuffer){const ne=Oe(S);N&&be(S)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,ne,i.DEPTH24_STENCIL8,S.width,S.height):be(S)?l.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,ne,i.DEPTH24_STENCIL8,S.width,S.height):i.renderbufferStorage(i.RENDERBUFFER,i.DEPTH_STENCIL,S.width,S.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.RENDERBUFFER,w)}else{const ne=S.isWebGLMultipleRenderTargets===!0?S.texture:[S.texture];for(let se=0;se<ne.length;se++){const ae=ne[se],Te=r.convert(ae.format,ae.colorSpace),me=r.convert(ae.type),Me=M(ae.internalFormat,Te,me,ae.colorSpace),De=Oe(S);N&&be(S)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,De,Me,S.width,S.height):be(S)?l.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,De,Me,S.width,S.height):i.renderbufferStorage(i.RENDERBUFFER,Me,S.width,S.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function Ae(w,S){if(S&&S.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(i.FRAMEBUFFER,w),!(S.depthTexture&&S.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!n.get(S.depthTexture).__webglTexture||S.depthTexture.image.width!==S.width||S.depthTexture.image.height!==S.height)&&(S.depthTexture.image.width=S.width,S.depthTexture.image.height=S.height,S.depthTexture.needsUpdate=!0),W(S.depthTexture,0);const ne=n.get(S.depthTexture).__webglTexture,se=Oe(S);if(S.depthTexture.format===ws)be(S)?l.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,ne,0,se):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,ne,0);else if(S.depthTexture.format===Lr)be(S)?l.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,ne,0,se):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,ne,0);else throw new Error("Unknown depthTexture format")}function Ee(w){const S=n.get(w),N=w.isWebGLCubeRenderTarget===!0;if(w.depthTexture&&!S.__autoAllocateDepthBuffer){if(N)throw new Error("target.depthTexture not supported in Cube render targets");Ae(S.__webglFramebuffer,w)}else if(N){S.__webglDepthbuffer=[];for(let ne=0;ne<6;ne++)t.bindFramebuffer(i.FRAMEBUFFER,S.__webglFramebuffer[ne]),S.__webglDepthbuffer[ne]=i.createRenderbuffer(),xe(S.__webglDepthbuffer[ne],w,!1)}else t.bindFramebuffer(i.FRAMEBUFFER,S.__webglFramebuffer),S.__webglDepthbuffer=i.createRenderbuffer(),xe(S.__webglDepthbuffer,w,!1);t.bindFramebuffer(i.FRAMEBUFFER,null)}function Ue(w,S,N){const ne=n.get(w);S!==void 0&&ge(ne.__webglFramebuffer,w,w.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),N!==void 0&&Ee(w)}function B(w){const S=w.texture,N=n.get(w),ne=n.get(S);w.addEventListener("dispose",z),w.isWebGLMultipleRenderTargets!==!0&&(ne.__webglTexture===void 0&&(ne.__webglTexture=i.createTexture()),ne.__version=S.version,a.memory.textures++);const se=w.isWebGLCubeRenderTarget===!0,ae=w.isWebGLMultipleRenderTargets===!0,Te=p(w)||o;if(se){N.__webglFramebuffer=[];for(let me=0;me<6;me++)if(o&&S.mipmaps&&S.mipmaps.length>0){N.__webglFramebuffer[me]=[];for(let Me=0;Me<S.mipmaps.length;Me++)N.__webglFramebuffer[me][Me]=i.createFramebuffer()}else N.__webglFramebuffer[me]=i.createFramebuffer()}else{if(o&&S.mipmaps&&S.mipmaps.length>0){N.__webglFramebuffer=[];for(let me=0;me<S.mipmaps.length;me++)N.__webglFramebuffer[me]=i.createFramebuffer()}else N.__webglFramebuffer=i.createFramebuffer();if(ae)if(s.drawBuffers){const me=w.texture;for(let Me=0,De=me.length;Me<De;Me++){const Ve=n.get(me[Me]);Ve.__webglTexture===void 0&&(Ve.__webglTexture=i.createTexture(),a.memory.textures++)}}else console.warn("THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.");if(o&&w.samples>0&&be(w)===!1){const me=ae?S:[S];N.__webglMultisampledFramebuffer=i.createFramebuffer(),N.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,N.__webglMultisampledFramebuffer);for(let Me=0;Me<me.length;Me++){const De=me[Me];N.__webglColorRenderbuffer[Me]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,N.__webglColorRenderbuffer[Me]);const Ve=r.convert(De.format,De.colorSpace),J=r.convert(De.type),lt=M(De.internalFormat,Ve,J,De.colorSpace,w.isXRRenderTarget===!0),Ye=Oe(w);i.renderbufferStorageMultisample(i.RENDERBUFFER,Ye,lt,w.width,w.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Me,i.RENDERBUFFER,N.__webglColorRenderbuffer[Me])}i.bindRenderbuffer(i.RENDERBUFFER,null),w.depthBuffer&&(N.__webglDepthRenderbuffer=i.createRenderbuffer(),xe(N.__webglDepthRenderbuffer,w,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(se){t.bindTexture(i.TEXTURE_CUBE_MAP,ne.__webglTexture),G(i.TEXTURE_CUBE_MAP,S,Te);for(let me=0;me<6;me++)if(o&&S.mipmaps&&S.mipmaps.length>0)for(let Me=0;Me<S.mipmaps.length;Me++)ge(N.__webglFramebuffer[me][Me],w,S,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+me,Me);else ge(N.__webglFramebuffer[me],w,S,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+me,0);x(S,Te)&&v(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(ae){const me=w.texture;for(let Me=0,De=me.length;Me<De;Me++){const Ve=me[Me],J=n.get(Ve);t.bindTexture(i.TEXTURE_2D,J.__webglTexture),G(i.TEXTURE_2D,Ve,Te),ge(N.__webglFramebuffer,w,Ve,i.COLOR_ATTACHMENT0+Me,i.TEXTURE_2D,0),x(Ve,Te)&&v(i.TEXTURE_2D)}t.unbindTexture()}else{let me=i.TEXTURE_2D;if((w.isWebGL3DRenderTarget||w.isWebGLArrayRenderTarget)&&(o?me=w.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY:console.error("THREE.WebGLTextures: THREE.Data3DTexture and THREE.DataArrayTexture only supported with WebGL2.")),t.bindTexture(me,ne.__webglTexture),G(me,S,Te),o&&S.mipmaps&&S.mipmaps.length>0)for(let Me=0;Me<S.mipmaps.length;Me++)ge(N.__webglFramebuffer[Me],w,S,i.COLOR_ATTACHMENT0,me,Me);else ge(N.__webglFramebuffer,w,S,i.COLOR_ATTACHMENT0,me,0);x(S,Te)&&v(me),t.unbindTexture()}w.depthBuffer&&Ee(w)}function ut(w){const S=p(w)||o,N=w.isWebGLMultipleRenderTargets===!0?w.texture:[w.texture];for(let ne=0,se=N.length;ne<se;ne++){const ae=N[ne];if(x(ae,S)){const Te=w.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:i.TEXTURE_2D,me=n.get(ae).__webglTexture;t.bindTexture(Te,me),v(Te),t.unbindTexture()}}}function we(w){if(o&&w.samples>0&&be(w)===!1){const S=w.isWebGLMultipleRenderTargets?w.texture:[w.texture],N=w.width,ne=w.height;let se=i.COLOR_BUFFER_BIT;const ae=[],Te=w.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,me=n.get(w),Me=w.isWebGLMultipleRenderTargets===!0;if(Me)for(let De=0;De<S.length;De++)t.bindFramebuffer(i.FRAMEBUFFER,me.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+De,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,me.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+De,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,me.__webglMultisampledFramebuffer),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,me.__webglFramebuffer);for(let De=0;De<S.length;De++){ae.push(i.COLOR_ATTACHMENT0+De),w.depthBuffer&&ae.push(Te);const Ve=me.__ignoreDepthValues!==void 0?me.__ignoreDepthValues:!1;if(Ve===!1&&(w.depthBuffer&&(se|=i.DEPTH_BUFFER_BIT),w.stencilBuffer&&(se|=i.STENCIL_BUFFER_BIT)),Me&&i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,me.__webglColorRenderbuffer[De]),Ve===!0&&(i.invalidateFramebuffer(i.READ_FRAMEBUFFER,[Te]),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[Te])),Me){const J=n.get(S[De]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,J,0)}i.blitFramebuffer(0,0,N,ne,0,0,N,ne,se,i.NEAREST),c&&i.invalidateFramebuffer(i.READ_FRAMEBUFFER,ae)}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),Me)for(let De=0;De<S.length;De++){t.bindFramebuffer(i.FRAMEBUFFER,me.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+De,i.RENDERBUFFER,me.__webglColorRenderbuffer[De]);const Ve=n.get(S[De]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,me.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+De,i.TEXTURE_2D,Ve,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,me.__webglMultisampledFramebuffer)}}function Oe(w){return Math.min(s.maxSamples,w.samples)}function be(w){const S=n.get(w);return o&&w.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&S.__useRenderToTexture!==!1}function mt(w){const S=a.render.frame;u.get(w)!==S&&(u.set(w,S),w.update())}function Ge(w,S){const N=w.colorSpace,ne=w.format,se=w.type;return w.isCompressedTexture===!0||w.isVideoTexture===!0||w.format===rc||N!==Ri&&N!==Ln&&(gt.getTransfer(N)===xt?o===!1?e.has("EXT_sRGB")===!0&&ne===Vn?(w.format=rc,w.minFilter=Rn,w.generateMipmaps=!1):S=vd.sRGBToLinear(S):(ne!==Vn||se!==Ki)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",N)),S}this.allocateTextureUnit=D,this.resetTextureUnits=Q,this.setTexture2D=W,this.setTexture2DArray=Z,this.setTexture3D=$,this.setTextureCube=j,this.rebindTextures=Ue,this.setupRenderTarget=B,this.updateRenderTargetMipmap=ut,this.updateMultisampleRenderTarget=we,this.setupDepthRenderbuffer=Ee,this.setupFrameBufferTexture=ge,this.useMultisampledRTT=be}function NM(i,e,t){const n=t.isWebGL2;function s(r,a=Ln){let o;const l=gt.getTransfer(a);if(r===Ki)return i.UNSIGNED_BYTE;if(r===cd)return i.UNSIGNED_SHORT_4_4_4_4;if(r===ud)return i.UNSIGNED_SHORT_5_5_5_1;if(r===m_)return i.BYTE;if(r===g_)return i.SHORT;if(r===Ic)return i.UNSIGNED_SHORT;if(r===ld)return i.INT;if(r===Gi)return i.UNSIGNED_INT;if(r===Vi)return i.FLOAT;if(r===aa)return n?i.HALF_FLOAT:(o=e.get("OES_texture_half_float"),o!==null?o.HALF_FLOAT_OES:null);if(r===__)return i.ALPHA;if(r===Vn)return i.RGBA;if(r===v_)return i.LUMINANCE;if(r===x_)return i.LUMINANCE_ALPHA;if(r===ws)return i.DEPTH_COMPONENT;if(r===Lr)return i.DEPTH_STENCIL;if(r===rc)return o=e.get("EXT_sRGB"),o!==null?o.SRGB_ALPHA_EXT:null;if(r===y_)return i.RED;if(r===hd)return i.RED_INTEGER;if(r===M_)return i.RG;if(r===fd)return i.RG_INTEGER;if(r===dd)return i.RGBA_INTEGER;if(r===Yo||r===$o||r===jo||r===Ko)if(l===xt)if(o=e.get("WEBGL_compressed_texture_s3tc_srgb"),o!==null){if(r===Yo)return o.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(r===$o)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(r===jo)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(r===Ko)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(o=e.get("WEBGL_compressed_texture_s3tc"),o!==null){if(r===Yo)return o.COMPRESSED_RGB_S3TC_DXT1_EXT;if(r===$o)return o.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(r===jo)return o.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(r===Ko)return o.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(r===Au||r===Ru||r===Cu||r===Pu)if(o=e.get("WEBGL_compressed_texture_pvrtc"),o!==null){if(r===Au)return o.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(r===Ru)return o.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(r===Cu)return o.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(r===Pu)return o.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(r===pd)return o=e.get("WEBGL_compressed_texture_etc1"),o!==null?o.COMPRESSED_RGB_ETC1_WEBGL:null;if(r===Lu||r===Du)if(o=e.get("WEBGL_compressed_texture_etc"),o!==null){if(r===Lu)return l===xt?o.COMPRESSED_SRGB8_ETC2:o.COMPRESSED_RGB8_ETC2;if(r===Du)return l===xt?o.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:o.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(r===Uu||r===Iu||r===Nu||r===Ou||r===Fu||r===ku||r===zu||r===Bu||r===Hu||r===Gu||r===Vu||r===Wu||r===Xu||r===qu)if(o=e.get("WEBGL_compressed_texture_astc"),o!==null){if(r===Uu)return l===xt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:o.COMPRESSED_RGBA_ASTC_4x4_KHR;if(r===Iu)return l===xt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:o.COMPRESSED_RGBA_ASTC_5x4_KHR;if(r===Nu)return l===xt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:o.COMPRESSED_RGBA_ASTC_5x5_KHR;if(r===Ou)return l===xt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:o.COMPRESSED_RGBA_ASTC_6x5_KHR;if(r===Fu)return l===xt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:o.COMPRESSED_RGBA_ASTC_6x6_KHR;if(r===ku)return l===xt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:o.COMPRESSED_RGBA_ASTC_8x5_KHR;if(r===zu)return l===xt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:o.COMPRESSED_RGBA_ASTC_8x6_KHR;if(r===Bu)return l===xt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:o.COMPRESSED_RGBA_ASTC_8x8_KHR;if(r===Hu)return l===xt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:o.COMPRESSED_RGBA_ASTC_10x5_KHR;if(r===Gu)return l===xt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:o.COMPRESSED_RGBA_ASTC_10x6_KHR;if(r===Vu)return l===xt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:o.COMPRESSED_RGBA_ASTC_10x8_KHR;if(r===Wu)return l===xt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:o.COMPRESSED_RGBA_ASTC_10x10_KHR;if(r===Xu)return l===xt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:o.COMPRESSED_RGBA_ASTC_12x10_KHR;if(r===qu)return l===xt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:o.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(r===Zo||r===Yu||r===$u)if(o=e.get("EXT_texture_compression_bptc"),o!==null){if(r===Zo)return l===xt?o.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:o.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(r===Yu)return o.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(r===$u)return o.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(r===S_||r===ju||r===Ku||r===Zu)if(o=e.get("EXT_texture_compression_rgtc"),o!==null){if(r===Zo)return o.COMPRESSED_RED_RGTC1_EXT;if(r===ju)return o.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(r===Ku)return o.COMPRESSED_RED_GREEN_RGTC2_EXT;if(r===Zu)return o.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return r===Es?n?i.UNSIGNED_INT_24_8:(o=e.get("WEBGL_depth_texture"),o!==null?o.UNSIGNED_INT_24_8_WEBGL:null):i[r]!==void 0?i[r]:null}return{convert:s}}class OM extends Pn{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class $r extends Nt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const FM={type:"move"};class Ml{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new $r,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new $r,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new I,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new I),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new $r,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new I,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new I),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let s=null,r=null,a=null;const o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){a=!0;for(const _ of e.hand.values()){const p=t.getJointPose(_,n),d=this._getHandJoint(c,_);p!==null&&(d.matrix.fromArray(p.transform.matrix),d.matrix.decompose(d.position,d.rotation,d.scale),d.matrixWorldNeedsUpdate=!0,d.jointRadius=p.radius),d.visible=p!==null}const u=c.joints["index-finger-tip"],h=c.joints["thumb-tip"],f=u.position.distanceTo(h.position),m=.02,g=.005;c.inputState.pinching&&f>m+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&f<=m-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(s=t.getPose(e.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(FM)))}return o!==null&&(o.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new $r;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}class kM extends Os{constructor(e,t){super();const n=this;let s=null,r=1,a=null,o="local-floor",l=1,c=null,u=null,h=null,f=null,m=null,g=null;const _=t.getContextAttributes();let p=null,d=null;const x=[],v=[],M=new Ne;let C=null;const A=new Pn;A.layers.enable(1),A.viewport=new Ht;const T=new Pn;T.layers.enable(2),T.viewport=new Ht;const z=[A,T],y=new OM;y.layers.enable(1),y.layers.enable(2);let b=null,U=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(G){let H=x[G];return H===void 0&&(H=new Ml,x[G]=H),H.getTargetRaySpace()},this.getControllerGrip=function(G){let H=x[G];return H===void 0&&(H=new Ml,x[G]=H),H.getGripSpace()},this.getHand=function(G){let H=x[G];return H===void 0&&(H=new Ml,x[G]=H),H.getHandSpace()};function k(G){const H=v.indexOf(G.inputSource);if(H===-1)return;const oe=x[H];oe!==void 0&&(oe.update(G.inputSource,G.frame,c||a),oe.dispatchEvent({type:G.type,data:G.inputSource}))}function Q(){s.removeEventListener("select",k),s.removeEventListener("selectstart",k),s.removeEventListener("selectend",k),s.removeEventListener("squeeze",k),s.removeEventListener("squeezestart",k),s.removeEventListener("squeezeend",k),s.removeEventListener("end",Q),s.removeEventListener("inputsourceschange",D);for(let G=0;G<x.length;G++){const H=v[G];H!==null&&(v[G]=null,x[G].disconnect(H))}b=null,U=null,e.setRenderTarget(p),m=null,f=null,h=null,s=null,d=null,ee.stop(),n.isPresenting=!1,e.setPixelRatio(C),e.setSize(M.width,M.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(G){r=G,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(G){o=G,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(G){c=G},this.getBaseLayer=function(){return f!==null?f:m},this.getBinding=function(){return h},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(G){if(s=G,s!==null){if(p=e.getRenderTarget(),s.addEventListener("select",k),s.addEventListener("selectstart",k),s.addEventListener("selectend",k),s.addEventListener("squeeze",k),s.addEventListener("squeezestart",k),s.addEventListener("squeezeend",k),s.addEventListener("end",Q),s.addEventListener("inputsourceschange",D),_.xrCompatible!==!0&&await t.makeXRCompatible(),C=e.getPixelRatio(),e.getSize(M),s.renderState.layers===void 0||e.capabilities.isWebGL2===!1){const H={antialias:s.renderState.layers===void 0?_.antialias:!0,alpha:!0,depth:_.depth,stencil:_.stencil,framebufferScaleFactor:r};m=new XRWebGLLayer(s,t,H),s.updateRenderState({baseLayer:m}),e.setPixelRatio(1),e.setSize(m.framebufferWidth,m.framebufferHeight,!1),d=new Ls(m.framebufferWidth,m.framebufferHeight,{format:Vn,type:Ki,colorSpace:e.outputColorSpace,stencilBuffer:_.stencil})}else{let H=null,oe=null,de=null;_.depth&&(de=_.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,H=_.stencil?Lr:ws,oe=_.stencil?Es:Gi);const ge={colorFormat:t.RGBA8,depthFormat:de,scaleFactor:r};h=new XRWebGLBinding(s,t),f=h.createProjectionLayer(ge),s.updateRenderState({layers:[f]}),e.setPixelRatio(1),e.setSize(f.textureWidth,f.textureHeight,!1),d=new Ls(f.textureWidth,f.textureHeight,{format:Vn,type:Ki,depthTexture:new Cd(f.textureWidth,f.textureHeight,oe,void 0,void 0,void 0,void 0,void 0,void 0,H),stencilBuffer:_.stencil,colorSpace:e.outputColorSpace,samples:_.antialias?4:0});const xe=e.properties.get(d);xe.__ignoreDepthValues=f.ignoreDepthValues}d.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await s.requestReferenceSpace(o),ee.setContext(s),ee.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode};function D(G){for(let H=0;H<G.removed.length;H++){const oe=G.removed[H],de=v.indexOf(oe);de>=0&&(v[de]=null,x[de].disconnect(oe))}for(let H=0;H<G.added.length;H++){const oe=G.added[H];let de=v.indexOf(oe);if(de===-1){for(let xe=0;xe<x.length;xe++)if(xe>=v.length){v.push(oe),de=xe;break}else if(v[xe]===null){v[xe]=oe,de=xe;break}if(de===-1)break}const ge=x[de];ge&&ge.connect(oe)}}const O=new I,W=new I;function Z(G,H,oe){O.setFromMatrixPosition(H.matrixWorld),W.setFromMatrixPosition(oe.matrixWorld);const de=O.distanceTo(W),ge=H.projectionMatrix.elements,xe=oe.projectionMatrix.elements,Ae=ge[14]/(ge[10]-1),Ee=ge[14]/(ge[10]+1),Ue=(ge[9]+1)/ge[5],B=(ge[9]-1)/ge[5],ut=(ge[8]-1)/ge[0],we=(xe[8]+1)/xe[0],Oe=Ae*ut,be=Ae*we,mt=de/(-ut+we),Ge=mt*-ut;H.matrixWorld.decompose(G.position,G.quaternion,G.scale),G.translateX(Ge),G.translateZ(mt),G.matrixWorld.compose(G.position,G.quaternion,G.scale),G.matrixWorldInverse.copy(G.matrixWorld).invert();const w=Ae+mt,S=Ee+mt,N=Oe-Ge,ne=be+(de-Ge),se=Ue*Ee/S*w,ae=B*Ee/S*w;G.projectionMatrix.makePerspective(N,ne,se,ae,w,S),G.projectionMatrixInverse.copy(G.projectionMatrix).invert()}function $(G,H){H===null?G.matrixWorld.copy(G.matrix):G.matrixWorld.multiplyMatrices(H.matrixWorld,G.matrix),G.matrixWorldInverse.copy(G.matrixWorld).invert()}this.updateCamera=function(G){if(s===null)return;y.near=T.near=A.near=G.near,y.far=T.far=A.far=G.far,(b!==y.near||U!==y.far)&&(s.updateRenderState({depthNear:y.near,depthFar:y.far}),b=y.near,U=y.far);const H=G.parent,oe=y.cameras;$(y,H);for(let de=0;de<oe.length;de++)$(oe[de],H);oe.length===2?Z(y,A,T):y.projectionMatrix.copy(A.projectionMatrix),j(G,y,H)};function j(G,H,oe){oe===null?G.matrix.copy(H.matrixWorld):(G.matrix.copy(oe.matrixWorld),G.matrix.invert(),G.matrix.multiply(H.matrixWorld)),G.matrix.decompose(G.position,G.quaternion,G.scale),G.updateMatrixWorld(!0),G.projectionMatrix.copy(H.projectionMatrix),G.projectionMatrixInverse.copy(H.projectionMatrixInverse),G.isPerspectiveCamera&&(G.fov=ac*2*Math.atan(1/G.projectionMatrix.elements[5]),G.zoom=1)}this.getCamera=function(){return y},this.getFoveation=function(){if(!(f===null&&m===null))return l},this.setFoveation=function(G){l=G,f!==null&&(f.fixedFoveation=G),m!==null&&m.fixedFoveation!==void 0&&(m.fixedFoveation=G)};let Y=null;function ie(G,H){if(u=H.getViewerPose(c||a),g=H,u!==null){const oe=u.views;m!==null&&(e.setRenderTargetFramebuffer(d,m.framebuffer),e.setRenderTarget(d));let de=!1;oe.length!==y.cameras.length&&(y.cameras.length=0,de=!0);for(let ge=0;ge<oe.length;ge++){const xe=oe[ge];let Ae=null;if(m!==null)Ae=m.getViewport(xe);else{const Ue=h.getViewSubImage(f,xe);Ae=Ue.viewport,ge===0&&(e.setRenderTargetTextures(d,Ue.colorTexture,f.ignoreDepthValues?void 0:Ue.depthStencilTexture),e.setRenderTarget(d))}let Ee=z[ge];Ee===void 0&&(Ee=new Pn,Ee.layers.enable(ge),Ee.viewport=new Ht,z[ge]=Ee),Ee.matrix.fromArray(xe.transform.matrix),Ee.matrix.decompose(Ee.position,Ee.quaternion,Ee.scale),Ee.projectionMatrix.fromArray(xe.projectionMatrix),Ee.projectionMatrixInverse.copy(Ee.projectionMatrix).invert(),Ee.viewport.set(Ae.x,Ae.y,Ae.width,Ae.height),ge===0&&(y.matrix.copy(Ee.matrix),y.matrix.decompose(y.position,y.quaternion,y.scale)),de===!0&&y.cameras.push(Ee)}}for(let oe=0;oe<x.length;oe++){const de=v[oe],ge=x[oe];de!==null&&ge!==void 0&&ge.update(de,H,c||a)}Y&&Y(G,H),H.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:H}),g=null}const ee=new Ad;ee.setAnimationLoop(ie),this.setAnimationLoop=function(G){Y=G},this.dispose=function(){}}}function zM(i,e){function t(p,d){p.matrixAutoUpdate===!0&&p.updateMatrix(),d.value.copy(p.matrix)}function n(p,d){d.color.getRGB(p.fogColor.value,Ed(i)),d.isFog?(p.fogNear.value=d.near,p.fogFar.value=d.far):d.isFogExp2&&(p.fogDensity.value=d.density)}function s(p,d,x,v,M){d.isMeshBasicMaterial||d.isMeshLambertMaterial?r(p,d):d.isMeshToonMaterial?(r(p,d),h(p,d)):d.isMeshPhongMaterial?(r(p,d),u(p,d)):d.isMeshStandardMaterial?(r(p,d),f(p,d),d.isMeshPhysicalMaterial&&m(p,d,M)):d.isMeshMatcapMaterial?(r(p,d),g(p,d)):d.isMeshDepthMaterial?r(p,d):d.isMeshDistanceMaterial?(r(p,d),_(p,d)):d.isMeshNormalMaterial?r(p,d):d.isLineBasicMaterial?(a(p,d),d.isLineDashedMaterial&&o(p,d)):d.isPointsMaterial?l(p,d,x,v):d.isSpriteMaterial?c(p,d):d.isShadowMaterial?(p.color.value.copy(d.color),p.opacity.value=d.opacity):d.isShaderMaterial&&(d.uniformsNeedUpdate=!1)}function r(p,d){p.opacity.value=d.opacity,d.color&&p.diffuse.value.copy(d.color),d.emissive&&p.emissive.value.copy(d.emissive).multiplyScalar(d.emissiveIntensity),d.map&&(p.map.value=d.map,t(d.map,p.mapTransform)),d.alphaMap&&(p.alphaMap.value=d.alphaMap,t(d.alphaMap,p.alphaMapTransform)),d.bumpMap&&(p.bumpMap.value=d.bumpMap,t(d.bumpMap,p.bumpMapTransform),p.bumpScale.value=d.bumpScale,d.side===un&&(p.bumpScale.value*=-1)),d.normalMap&&(p.normalMap.value=d.normalMap,t(d.normalMap,p.normalMapTransform),p.normalScale.value.copy(d.normalScale),d.side===un&&p.normalScale.value.negate()),d.displacementMap&&(p.displacementMap.value=d.displacementMap,t(d.displacementMap,p.displacementMapTransform),p.displacementScale.value=d.displacementScale,p.displacementBias.value=d.displacementBias),d.emissiveMap&&(p.emissiveMap.value=d.emissiveMap,t(d.emissiveMap,p.emissiveMapTransform)),d.specularMap&&(p.specularMap.value=d.specularMap,t(d.specularMap,p.specularMapTransform)),d.alphaTest>0&&(p.alphaTest.value=d.alphaTest);const x=e.get(d).envMap;if(x&&(p.envMap.value=x,p.flipEnvMap.value=x.isCubeTexture&&x.isRenderTargetTexture===!1?-1:1,p.reflectivity.value=d.reflectivity,p.ior.value=d.ior,p.refractionRatio.value=d.refractionRatio),d.lightMap){p.lightMap.value=d.lightMap;const v=i._useLegacyLights===!0?Math.PI:1;p.lightMapIntensity.value=d.lightMapIntensity*v,t(d.lightMap,p.lightMapTransform)}d.aoMap&&(p.aoMap.value=d.aoMap,p.aoMapIntensity.value=d.aoMapIntensity,t(d.aoMap,p.aoMapTransform))}function a(p,d){p.diffuse.value.copy(d.color),p.opacity.value=d.opacity,d.map&&(p.map.value=d.map,t(d.map,p.mapTransform))}function o(p,d){p.dashSize.value=d.dashSize,p.totalSize.value=d.dashSize+d.gapSize,p.scale.value=d.scale}function l(p,d,x,v){p.diffuse.value.copy(d.color),p.opacity.value=d.opacity,p.size.value=d.size*x,p.scale.value=v*.5,d.map&&(p.map.value=d.map,t(d.map,p.uvTransform)),d.alphaMap&&(p.alphaMap.value=d.alphaMap,t(d.alphaMap,p.alphaMapTransform)),d.alphaTest>0&&(p.alphaTest.value=d.alphaTest)}function c(p,d){p.diffuse.value.copy(d.color),p.opacity.value=d.opacity,p.rotation.value=d.rotation,d.map&&(p.map.value=d.map,t(d.map,p.mapTransform)),d.alphaMap&&(p.alphaMap.value=d.alphaMap,t(d.alphaMap,p.alphaMapTransform)),d.alphaTest>0&&(p.alphaTest.value=d.alphaTest)}function u(p,d){p.specular.value.copy(d.specular),p.shininess.value=Math.max(d.shininess,1e-4)}function h(p,d){d.gradientMap&&(p.gradientMap.value=d.gradientMap)}function f(p,d){p.metalness.value=d.metalness,d.metalnessMap&&(p.metalnessMap.value=d.metalnessMap,t(d.metalnessMap,p.metalnessMapTransform)),p.roughness.value=d.roughness,d.roughnessMap&&(p.roughnessMap.value=d.roughnessMap,t(d.roughnessMap,p.roughnessMapTransform)),e.get(d).envMap&&(p.envMapIntensity.value=d.envMapIntensity)}function m(p,d,x){p.ior.value=d.ior,d.sheen>0&&(p.sheenColor.value.copy(d.sheenColor).multiplyScalar(d.sheen),p.sheenRoughness.value=d.sheenRoughness,d.sheenColorMap&&(p.sheenColorMap.value=d.sheenColorMap,t(d.sheenColorMap,p.sheenColorMapTransform)),d.sheenRoughnessMap&&(p.sheenRoughnessMap.value=d.sheenRoughnessMap,t(d.sheenRoughnessMap,p.sheenRoughnessMapTransform))),d.clearcoat>0&&(p.clearcoat.value=d.clearcoat,p.clearcoatRoughness.value=d.clearcoatRoughness,d.clearcoatMap&&(p.clearcoatMap.value=d.clearcoatMap,t(d.clearcoatMap,p.clearcoatMapTransform)),d.clearcoatRoughnessMap&&(p.clearcoatRoughnessMap.value=d.clearcoatRoughnessMap,t(d.clearcoatRoughnessMap,p.clearcoatRoughnessMapTransform)),d.clearcoatNormalMap&&(p.clearcoatNormalMap.value=d.clearcoatNormalMap,t(d.clearcoatNormalMap,p.clearcoatNormalMapTransform),p.clearcoatNormalScale.value.copy(d.clearcoatNormalScale),d.side===un&&p.clearcoatNormalScale.value.negate())),d.iridescence>0&&(p.iridescence.value=d.iridescence,p.iridescenceIOR.value=d.iridescenceIOR,p.iridescenceThicknessMinimum.value=d.iridescenceThicknessRange[0],p.iridescenceThicknessMaximum.value=d.iridescenceThicknessRange[1],d.iridescenceMap&&(p.iridescenceMap.value=d.iridescenceMap,t(d.iridescenceMap,p.iridescenceMapTransform)),d.iridescenceThicknessMap&&(p.iridescenceThicknessMap.value=d.iridescenceThicknessMap,t(d.iridescenceThicknessMap,p.iridescenceThicknessMapTransform))),d.transmission>0&&(p.transmission.value=d.transmission,p.transmissionSamplerMap.value=x.texture,p.transmissionSamplerSize.value.set(x.width,x.height),d.transmissionMap&&(p.transmissionMap.value=d.transmissionMap,t(d.transmissionMap,p.transmissionMapTransform)),p.thickness.value=d.thickness,d.thicknessMap&&(p.thicknessMap.value=d.thicknessMap,t(d.thicknessMap,p.thicknessMapTransform)),p.attenuationDistance.value=d.attenuationDistance,p.attenuationColor.value.copy(d.attenuationColor)),d.anisotropy>0&&(p.anisotropyVector.value.set(d.anisotropy*Math.cos(d.anisotropyRotation),d.anisotropy*Math.sin(d.anisotropyRotation)),d.anisotropyMap&&(p.anisotropyMap.value=d.anisotropyMap,t(d.anisotropyMap,p.anisotropyMapTransform))),p.specularIntensity.value=d.specularIntensity,p.specularColor.value.copy(d.specularColor),d.specularColorMap&&(p.specularColorMap.value=d.specularColorMap,t(d.specularColorMap,p.specularColorMapTransform)),d.specularIntensityMap&&(p.specularIntensityMap.value=d.specularIntensityMap,t(d.specularIntensityMap,p.specularIntensityMapTransform))}function g(p,d){d.matcap&&(p.matcap.value=d.matcap)}function _(p,d){const x=e.get(d).light;p.referencePosition.value.setFromMatrixPosition(x.matrixWorld),p.nearDistance.value=x.shadow.camera.near,p.farDistance.value=x.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function BM(i,e,t,n){let s={},r={},a=[];const o=t.isWebGL2?i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS):0;function l(x,v){const M=v.program;n.uniformBlockBinding(x,M)}function c(x,v){let M=s[x.id];M===void 0&&(g(x),M=u(x),s[x.id]=M,x.addEventListener("dispose",p));const C=v.program;n.updateUBOMapping(x,C);const A=e.render.frame;r[x.id]!==A&&(f(x),r[x.id]=A)}function u(x){const v=h();x.__bindingPointIndex=v;const M=i.createBuffer(),C=x.__size,A=x.usage;return i.bindBuffer(i.UNIFORM_BUFFER,M),i.bufferData(i.UNIFORM_BUFFER,C,A),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,v,M),M}function h(){for(let x=0;x<o;x++)if(a.indexOf(x)===-1)return a.push(x),x;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(x){const v=s[x.id],M=x.uniforms,C=x.__cache;i.bindBuffer(i.UNIFORM_BUFFER,v);for(let A=0,T=M.length;A<T;A++){const z=Array.isArray(M[A])?M[A]:[M[A]];for(let y=0,b=z.length;y<b;y++){const U=z[y];if(m(U,A,y,C)===!0){const k=U.__offset,Q=Array.isArray(U.value)?U.value:[U.value];let D=0;for(let O=0;O<Q.length;O++){const W=Q[O],Z=_(W);typeof W=="number"||typeof W=="boolean"?(U.__data[0]=W,i.bufferSubData(i.UNIFORM_BUFFER,k+D,U.__data)):W.isMatrix3?(U.__data[0]=W.elements[0],U.__data[1]=W.elements[1],U.__data[2]=W.elements[2],U.__data[3]=0,U.__data[4]=W.elements[3],U.__data[5]=W.elements[4],U.__data[6]=W.elements[5],U.__data[7]=0,U.__data[8]=W.elements[6],U.__data[9]=W.elements[7],U.__data[10]=W.elements[8],U.__data[11]=0):(W.toArray(U.__data,D),D+=Z.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,k,U.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function m(x,v,M,C){const A=x.value,T=v+"_"+M;if(C[T]===void 0)return typeof A=="number"||typeof A=="boolean"?C[T]=A:C[T]=A.clone(),!0;{const z=C[T];if(typeof A=="number"||typeof A=="boolean"){if(z!==A)return C[T]=A,!0}else if(z.equals(A)===!1)return z.copy(A),!0}return!1}function g(x){const v=x.uniforms;let M=0;const C=16;for(let T=0,z=v.length;T<z;T++){const y=Array.isArray(v[T])?v[T]:[v[T]];for(let b=0,U=y.length;b<U;b++){const k=y[b],Q=Array.isArray(k.value)?k.value:[k.value];for(let D=0,O=Q.length;D<O;D++){const W=Q[D],Z=_(W),$=M%C;$!==0&&C-$<Z.boundary&&(M+=C-$),k.__data=new Float32Array(Z.storage/Float32Array.BYTES_PER_ELEMENT),k.__offset=M,M+=Z.storage}}}const A=M%C;return A>0&&(M+=C-A),x.__size=M,x.__cache={},this}function _(x){const v={boundary:0,storage:0};return typeof x=="number"||typeof x=="boolean"?(v.boundary=4,v.storage=4):x.isVector2?(v.boundary=8,v.storage=8):x.isVector3||x.isColor?(v.boundary=16,v.storage=12):x.isVector4?(v.boundary=16,v.storage=16):x.isMatrix3?(v.boundary=48,v.storage=48):x.isMatrix4?(v.boundary=64,v.storage=64):x.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",x),v}function p(x){const v=x.target;v.removeEventListener("dispose",p);const M=a.indexOf(v.__bindingPointIndex);a.splice(M,1),i.deleteBuffer(s[v.id]),delete s[v.id],delete r[v.id]}function d(){for(const x in s)i.deleteBuffer(s[x]);a=[],s={},r={}}return{bind:l,update:c,dispose:d}}class Nd{constructor(e={}){const{canvas:t=O_(),context:n=null,depth:s=!0,stencil:r=!0,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:h=!1}=e;this.isWebGLRenderer=!0;let f;n!==null?f=n.getContextAttributes().alpha:f=a;const m=new Uint32Array(4),g=new Int32Array(4);let _=null,p=null;const d=[],x=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=qt,this._useLegacyLights=!1,this.toneMapping=ji,this.toneMappingExposure=1;const v=this;let M=!1,C=0,A=0,T=null,z=-1,y=null;const b=new Ht,U=new Ht;let k=null;const Q=new ot(0);let D=0,O=t.width,W=t.height,Z=1,$=null,j=null;const Y=new Ht(0,0,O,W),ie=new Ht(0,0,O,W);let ee=!1;const G=new kc;let H=!1,oe=!1,de=null;const ge=new Rt,xe=new Ne,Ae=new I,Ee={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function Ue(){return T===null?Z:1}let B=n;function ut(E,F){for(let X=0;X<E.length;X++){const q=E[X],V=t.getContext(q,F);if(V!==null)return V}return null}try{const E={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:h};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Uc}`),t.addEventListener("webglcontextlost",re,!1),t.addEventListener("webglcontextrestored",L,!1),t.addEventListener("webglcontextcreationerror",ue,!1),B===null){const F=["webgl2","webgl","experimental-webgl"];if(v.isWebGL1Renderer===!0&&F.shift(),B=ut(F,E),B===null)throw ut(F)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}typeof WebGLRenderingContext<"u"&&B instanceof WebGLRenderingContext&&console.warn("THREE.WebGLRenderer: WebGL 1 support was deprecated in r153 and will be removed in r163."),B.getShaderPrecisionFormat===void 0&&(B.getShaderPrecisionFormat=function(){return{rangeMin:1,rangeMax:1,precision:1}})}catch(E){throw console.error("THREE.WebGLRenderer: "+E.message),E}let we,Oe,be,mt,Ge,w,S,N,ne,se,ae,Te,me,Me,De,Ve,J,lt,Ye,Be,Le,ve,R,ce;function Re(){we=new Kx(B),Oe=new Wx(B,we,e),we.init(Oe),ve=new NM(B,we,Oe),be=new UM(B,we,Oe),mt=new Qx(B),Ge=new xM,w=new IM(B,we,be,Ge,Oe,ve,mt),S=new qx(v),N=new jx(v),ne=new ov(B,Oe),R=new Gx(B,we,ne,Oe),se=new Zx(B,ne,mt,R),ae=new iy(B,se,ne,mt),Ye=new ny(B,Oe,w),Ve=new Xx(Ge),Te=new vM(v,S,N,we,Oe,R,Ve),me=new zM(v,Ge),Me=new MM,De=new AM(we,Oe),lt=new Hx(v,S,N,be,ae,f,l),J=new DM(v,ae,Oe),ce=new BM(B,mt,Oe,be),Be=new Vx(B,we,mt,Oe),Le=new Jx(B,we,mt,Oe),mt.programs=Te.programs,v.capabilities=Oe,v.extensions=we,v.properties=Ge,v.renderLists=Me,v.shadowMap=J,v.state=be,v.info=mt}Re();const Se=new kM(v,B);this.xr=Se,this.getContext=function(){return B},this.getContextAttributes=function(){return B.getContextAttributes()},this.forceContextLoss=function(){const E=we.get("WEBGL_lose_context");E&&E.loseContext()},this.forceContextRestore=function(){const E=we.get("WEBGL_lose_context");E&&E.restoreContext()},this.getPixelRatio=function(){return Z},this.setPixelRatio=function(E){E!==void 0&&(Z=E,this.setSize(O,W,!1))},this.getSize=function(E){return E.set(O,W)},this.setSize=function(E,F,X=!0){if(Se.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}O=E,W=F,t.width=Math.floor(E*Z),t.height=Math.floor(F*Z),X===!0&&(t.style.width=E+"px",t.style.height=F+"px"),this.setViewport(0,0,E,F)},this.getDrawingBufferSize=function(E){return E.set(O*Z,W*Z).floor()},this.setDrawingBufferSize=function(E,F,X){O=E,W=F,Z=X,t.width=Math.floor(E*X),t.height=Math.floor(F*X),this.setViewport(0,0,E,F)},this.getCurrentViewport=function(E){return E.copy(b)},this.getViewport=function(E){return E.copy(Y)},this.setViewport=function(E,F,X,q){E.isVector4?Y.set(E.x,E.y,E.z,E.w):Y.set(E,F,X,q),be.viewport(b.copy(Y).multiplyScalar(Z).floor())},this.getScissor=function(E){return E.copy(ie)},this.setScissor=function(E,F,X,q){E.isVector4?ie.set(E.x,E.y,E.z,E.w):ie.set(E,F,X,q),be.scissor(U.copy(ie).multiplyScalar(Z).floor())},this.getScissorTest=function(){return ee},this.setScissorTest=function(E){be.setScissorTest(ee=E)},this.setOpaqueSort=function(E){$=E},this.setTransparentSort=function(E){j=E},this.getClearColor=function(E){return E.copy(lt.getClearColor())},this.setClearColor=function(){lt.setClearColor.apply(lt,arguments)},this.getClearAlpha=function(){return lt.getClearAlpha()},this.setClearAlpha=function(){lt.setClearAlpha.apply(lt,arguments)},this.clear=function(E=!0,F=!0,X=!0){let q=0;if(E){let V=!1;if(T!==null){const ye=T.texture.format;V=ye===dd||ye===fd||ye===hd}if(V){const ye=T.texture.type,Pe=ye===Ki||ye===Gi||ye===Ic||ye===Es||ye===cd||ye===ud,ke=lt.getClearColor(),He=lt.getClearAlpha(),$e=ke.r,We=ke.g,Xe=ke.b;Pe?(m[0]=$e,m[1]=We,m[2]=Xe,m[3]=He,B.clearBufferuiv(B.COLOR,0,m)):(g[0]=$e,g[1]=We,g[2]=Xe,g[3]=He,B.clearBufferiv(B.COLOR,0,g))}else q|=B.COLOR_BUFFER_BIT}F&&(q|=B.DEPTH_BUFFER_BIT),X&&(q|=B.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),B.clear(q)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",re,!1),t.removeEventListener("webglcontextrestored",L,!1),t.removeEventListener("webglcontextcreationerror",ue,!1),Me.dispose(),De.dispose(),Ge.dispose(),S.dispose(),N.dispose(),ae.dispose(),R.dispose(),ce.dispose(),Te.dispose(),Se.dispose(),Se.removeEventListener("sessionstart",Ct),Se.removeEventListener("sessionend",at),de&&(de.dispose(),de=null),Ut.stop()};function re(E){E.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),M=!0}function L(){console.log("THREE.WebGLRenderer: Context Restored."),M=!1;const E=mt.autoReset,F=J.enabled,X=J.autoUpdate,q=J.needsUpdate,V=J.type;Re(),mt.autoReset=E,J.enabled=F,J.autoUpdate=X,J.needsUpdate=q,J.type=V}function ue(E){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",E.statusMessage)}function _e(E){const F=E.target;F.removeEventListener("dispose",_e),Fe(F)}function Fe(E){Ie(E),Ge.remove(E)}function Ie(E){const F=Ge.get(E).programs;F!==void 0&&(F.forEach(function(X){Te.releaseProgram(X)}),E.isShaderMaterial&&Te.releaseShaderCache(E))}this.renderBufferDirect=function(E,F,X,q,V,ye){F===null&&(F=Ee);const Pe=V.isMesh&&V.matrixWorld.determinant()<0,ke=Zd(E,F,X,q,V);be.setMaterial(q,Pe);let He=X.index,$e=1;if(q.wireframe===!0){if(He=se.getWireframeAttribute(X),He===void 0)return;$e=2}const We=X.drawRange,Xe=X.attributes.position;let Pt=We.start*$e,pn=(We.start+We.count)*$e;ye!==null&&(Pt=Math.max(Pt,ye.start*$e),pn=Math.min(pn,(ye.start+ye.count)*$e)),He!==null?(Pt=Math.max(Pt,0),pn=Math.min(pn,He.count)):Xe!=null&&(Pt=Math.max(Pt,0),pn=Math.min(pn,Xe.count));const zt=pn-Pt;if(zt<0||zt===1/0)return;R.setup(V,q,ke,X,He);let ui,Mt=Be;if(He!==null&&(ui=ne.get(He),Mt=Le,Mt.setIndex(ui)),V.isMesh)q.wireframe===!0?(be.setLineWidth(q.wireframeLinewidth*Ue()),Mt.setMode(B.LINES)):Mt.setMode(B.TRIANGLES);else if(V.isLine){let je=q.linewidth;je===void 0&&(je=1),be.setLineWidth(je*Ue()),V.isLineSegments?Mt.setMode(B.LINES):V.isLineLoop?Mt.setMode(B.LINE_LOOP):Mt.setMode(B.LINE_STRIP)}else V.isPoints?Mt.setMode(B.POINTS):V.isSprite&&Mt.setMode(B.TRIANGLES);if(V.isBatchedMesh)Mt.renderMultiDraw(V._multiDrawStarts,V._multiDrawCounts,V._multiDrawCount);else if(V.isInstancedMesh)Mt.renderInstances(Pt,zt,V.count);else if(X.isInstancedBufferGeometry){const je=X._maxInstanceCount!==void 0?X._maxInstanceCount:1/0,ko=Math.min(X.instanceCount,je);Mt.renderInstances(Pt,zt,ko)}else Mt.render(Pt,zt)};function Je(E,F,X){E.transparent===!0&&E.side===xi&&E.forceSinglePass===!1?(E.side=un,E.needsUpdate=!0,ya(E,F,X),E.side=Qi,E.needsUpdate=!0,ya(E,F,X),E.side=xi):ya(E,F,X)}this.compile=function(E,F,X=null){X===null&&(X=E),p=De.get(X),p.init(),x.push(p),X.traverseVisible(function(V){V.isLight&&V.layers.test(F.layers)&&(p.pushLight(V),V.castShadow&&p.pushShadow(V))}),E!==X&&E.traverseVisible(function(V){V.isLight&&V.layers.test(F.layers)&&(p.pushLight(V),V.castShadow&&p.pushShadow(V))}),p.setupLights(v._useLegacyLights);const q=new Set;return E.traverse(function(V){const ye=V.material;if(ye)if(Array.isArray(ye))for(let Pe=0;Pe<ye.length;Pe++){const ke=ye[Pe];Je(ke,X,V),q.add(ke)}else Je(ye,X,V),q.add(ye)}),x.pop(),p=null,q},this.compileAsync=function(E,F,X=null){const q=this.compile(E,F,X);return new Promise(V=>{function ye(){if(q.forEach(function(Pe){Ge.get(Pe).currentProgram.isReady()&&q.delete(Pe)}),q.size===0){V(E);return}setTimeout(ye,10)}we.get("KHR_parallel_shader_compile")!==null?ye():setTimeout(ye,10)})};let Qe=null;function bt(E){Qe&&Qe(E)}function Ct(){Ut.stop()}function at(){Ut.start()}const Ut=new Ad;Ut.setAnimationLoop(bt),typeof self<"u"&&Ut.setContext(self),this.setAnimationLoop=function(E){Qe=E,Se.setAnimationLoop(E),E===null?Ut.stop():Ut.start()},Se.addEventListener("sessionstart",Ct),Se.addEventListener("sessionend",at),this.render=function(E,F){if(F!==void 0&&F.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(M===!0)return;E.matrixWorldAutoUpdate===!0&&E.updateMatrixWorld(),F.parent===null&&F.matrixWorldAutoUpdate===!0&&F.updateMatrixWorld(),Se.enabled===!0&&Se.isPresenting===!0&&(Se.cameraAutoUpdate===!0&&Se.updateCamera(F),F=Se.getCamera()),E.isScene===!0&&E.onBeforeRender(v,E,F,T),p=De.get(E,x.length),p.init(),x.push(p),ge.multiplyMatrices(F.projectionMatrix,F.matrixWorldInverse),G.setFromProjectionMatrix(ge),oe=this.localClippingEnabled,H=Ve.init(this.clippingPlanes,oe),_=Me.get(E,d.length),_.init(),d.push(_),Kn(E,F,0,v.sortObjects),_.finish(),v.sortObjects===!0&&_.sort($,j),this.info.render.frame++,H===!0&&Ve.beginShadows();const X=p.state.shadowsArray;if(J.render(X,E,F),H===!0&&Ve.endShadows(),this.info.autoReset===!0&&this.info.reset(),lt.render(_,E),p.setupLights(v._useLegacyLights),F.isArrayCamera){const q=F.cameras;for(let V=0,ye=q.length;V<ye;V++){const Pe=q[V];Zc(_,E,Pe,Pe.viewport)}}else Zc(_,E,F);T!==null&&(w.updateMultisampleRenderTarget(T),w.updateRenderTargetMipmap(T)),E.isScene===!0&&E.onAfterRender(v,E,F),R.resetDefaultState(),z=-1,y=null,x.pop(),x.length>0?p=x[x.length-1]:p=null,d.pop(),d.length>0?_=d[d.length-1]:_=null};function Kn(E,F,X,q){if(E.visible===!1)return;if(E.layers.test(F.layers)){if(E.isGroup)X=E.renderOrder;else if(E.isLOD)E.autoUpdate===!0&&E.update(F);else if(E.isLight)p.pushLight(E),E.castShadow&&p.pushShadow(E);else if(E.isSprite){if(!E.frustumCulled||G.intersectsSprite(E)){q&&Ae.setFromMatrixPosition(E.matrixWorld).applyMatrix4(ge);const Pe=ae.update(E),ke=E.material;ke.visible&&_.push(E,Pe,ke,X,Ae.z,null)}}else if((E.isMesh||E.isLine||E.isPoints)&&(!E.frustumCulled||G.intersectsObject(E))){const Pe=ae.update(E),ke=E.material;if(q&&(E.boundingSphere!==void 0?(E.boundingSphere===null&&E.computeBoundingSphere(),Ae.copy(E.boundingSphere.center)):(Pe.boundingSphere===null&&Pe.computeBoundingSphere(),Ae.copy(Pe.boundingSphere.center)),Ae.applyMatrix4(E.matrixWorld).applyMatrix4(ge)),Array.isArray(ke)){const He=Pe.groups;for(let $e=0,We=He.length;$e<We;$e++){const Xe=He[$e],Pt=ke[Xe.materialIndex];Pt&&Pt.visible&&_.push(E,Pe,Pt,X,Ae.z,Xe)}}else ke.visible&&_.push(E,Pe,ke,X,Ae.z,null)}}const ye=E.children;for(let Pe=0,ke=ye.length;Pe<ke;Pe++)Kn(ye[Pe],F,X,q)}function Zc(E,F,X,q){const V=E.opaque,ye=E.transmissive,Pe=E.transparent;p.setupLightsView(X),H===!0&&Ve.setGlobalState(v.clippingPlanes,X),ye.length>0&&Kd(V,ye,F,X),q&&be.viewport(b.copy(q)),V.length>0&&xa(V,F,X),ye.length>0&&xa(ye,F,X),Pe.length>0&&xa(Pe,F,X),be.buffers.depth.setTest(!0),be.buffers.depth.setMask(!0),be.buffers.color.setMask(!0),be.setPolygonOffset(!1)}function Kd(E,F,X,q){if((X.isScene===!0?X.overrideMaterial:null)!==null)return;const ye=Oe.isWebGL2;de===null&&(de=new Ls(1,1,{generateMipmaps:!0,type:we.has("EXT_color_buffer_half_float")?aa:Ki,minFilter:ra,samples:ye?4:0})),v.getDrawingBufferSize(xe),ye?de.setSize(xe.x,xe.y):de.setSize(oc(xe.x),oc(xe.y));const Pe=v.getRenderTarget();v.setRenderTarget(de),v.getClearColor(Q),D=v.getClearAlpha(),D<1&&v.setClearColor(16777215,.5),v.clear();const ke=v.toneMapping;v.toneMapping=ji,xa(E,X,q),w.updateMultisampleRenderTarget(de),w.updateRenderTargetMipmap(de);let He=!1;for(let $e=0,We=F.length;$e<We;$e++){const Xe=F[$e],Pt=Xe.object,pn=Xe.geometry,zt=Xe.material,ui=Xe.group;if(zt.side===xi&&Pt.layers.test(q.layers)){const Mt=zt.side;zt.side=un,zt.needsUpdate=!0,Jc(Pt,X,q,pn,zt,ui),zt.side=Mt,zt.needsUpdate=!0,He=!0}}He===!0&&(w.updateMultisampleRenderTarget(de),w.updateRenderTargetMipmap(de)),v.setRenderTarget(Pe),v.setClearColor(Q,D),v.toneMapping=ke}function xa(E,F,X){const q=F.isScene===!0?F.overrideMaterial:null;for(let V=0,ye=E.length;V<ye;V++){const Pe=E[V],ke=Pe.object,He=Pe.geometry,$e=q===null?Pe.material:q,We=Pe.group;ke.layers.test(X.layers)&&Jc(ke,F,X,He,$e,We)}}function Jc(E,F,X,q,V,ye){E.onBeforeRender(v,F,X,q,V,ye),E.modelViewMatrix.multiplyMatrices(X.matrixWorldInverse,E.matrixWorld),E.normalMatrix.getNormalMatrix(E.modelViewMatrix),V.onBeforeRender(v,F,X,q,E,ye),V.transparent===!0&&V.side===xi&&V.forceSinglePass===!1?(V.side=un,V.needsUpdate=!0,v.renderBufferDirect(X,F,q,V,E,ye),V.side=Qi,V.needsUpdate=!0,v.renderBufferDirect(X,F,q,V,E,ye),V.side=xi):v.renderBufferDirect(X,F,q,V,E,ye),E.onAfterRender(v,F,X,q,V,ye)}function ya(E,F,X){F.isScene!==!0&&(F=Ee);const q=Ge.get(E),V=p.state.lights,ye=p.state.shadowsArray,Pe=V.state.version,ke=Te.getParameters(E,V.state,ye,F,X),He=Te.getProgramCacheKey(ke);let $e=q.programs;q.environment=E.isMeshStandardMaterial?F.environment:null,q.fog=F.fog,q.envMap=(E.isMeshStandardMaterial?N:S).get(E.envMap||q.environment),$e===void 0&&(E.addEventListener("dispose",_e),$e=new Map,q.programs=$e);let We=$e.get(He);if(We!==void 0){if(q.currentProgram===We&&q.lightsStateVersion===Pe)return eu(E,ke),We}else ke.uniforms=Te.getUniforms(E),E.onBuild(X,ke,v),E.onBeforeCompile(ke,v),We=Te.acquireProgram(ke,He),$e.set(He,We),q.uniforms=ke.uniforms;const Xe=q.uniforms;return(!E.isShaderMaterial&&!E.isRawShaderMaterial||E.clipping===!0)&&(Xe.clippingPlanes=Ve.uniform),eu(E,ke),q.needsLights=Qd(E),q.lightsStateVersion=Pe,q.needsLights&&(Xe.ambientLightColor.value=V.state.ambient,Xe.lightProbe.value=V.state.probe,Xe.directionalLights.value=V.state.directional,Xe.directionalLightShadows.value=V.state.directionalShadow,Xe.spotLights.value=V.state.spot,Xe.spotLightShadows.value=V.state.spotShadow,Xe.rectAreaLights.value=V.state.rectArea,Xe.ltc_1.value=V.state.rectAreaLTC1,Xe.ltc_2.value=V.state.rectAreaLTC2,Xe.pointLights.value=V.state.point,Xe.pointLightShadows.value=V.state.pointShadow,Xe.hemisphereLights.value=V.state.hemi,Xe.directionalShadowMap.value=V.state.directionalShadowMap,Xe.directionalShadowMatrix.value=V.state.directionalShadowMatrix,Xe.spotShadowMap.value=V.state.spotShadowMap,Xe.spotLightMatrix.value=V.state.spotLightMatrix,Xe.spotLightMap.value=V.state.spotLightMap,Xe.pointShadowMap.value=V.state.pointShadowMap,Xe.pointShadowMatrix.value=V.state.pointShadowMatrix),q.currentProgram=We,q.uniformsList=null,We}function Qc(E){if(E.uniformsList===null){const F=E.currentProgram.getUniforms();E.uniformsList=co.seqWithValue(F.seq,E.uniforms)}return E.uniformsList}function eu(E,F){const X=Ge.get(E);X.outputColorSpace=F.outputColorSpace,X.batching=F.batching,X.instancing=F.instancing,X.instancingColor=F.instancingColor,X.skinning=F.skinning,X.morphTargets=F.morphTargets,X.morphNormals=F.morphNormals,X.morphColors=F.morphColors,X.morphTargetsCount=F.morphTargetsCount,X.numClippingPlanes=F.numClippingPlanes,X.numIntersection=F.numClipIntersection,X.vertexAlphas=F.vertexAlphas,X.vertexTangents=F.vertexTangents,X.toneMapping=F.toneMapping}function Zd(E,F,X,q,V){F.isScene!==!0&&(F=Ee),w.resetTextureUnits();const ye=F.fog,Pe=q.isMeshStandardMaterial?F.environment:null,ke=T===null?v.outputColorSpace:T.isXRRenderTarget===!0?T.texture.colorSpace:Ri,He=(q.isMeshStandardMaterial?N:S).get(q.envMap||Pe),$e=q.vertexColors===!0&&!!X.attributes.color&&X.attributes.color.itemSize===4,We=!!X.attributes.tangent&&(!!q.normalMap||q.anisotropy>0),Xe=!!X.morphAttributes.position,Pt=!!X.morphAttributes.normal,pn=!!X.morphAttributes.color;let zt=ji;q.toneMapped&&(T===null||T.isXRRenderTarget===!0)&&(zt=v.toneMapping);const ui=X.morphAttributes.position||X.morphAttributes.normal||X.morphAttributes.color,Mt=ui!==void 0?ui.length:0,je=Ge.get(q),ko=p.state.lights;if(H===!0&&(oe===!0||E!==y)){const Sn=E===y&&q.id===z;Ve.setState(q,E,Sn)}let Et=!1;q.version===je.__version?(je.needsLights&&je.lightsStateVersion!==ko.state.version||je.outputColorSpace!==ke||V.isBatchedMesh&&je.batching===!1||!V.isBatchedMesh&&je.batching===!0||V.isInstancedMesh&&je.instancing===!1||!V.isInstancedMesh&&je.instancing===!0||V.isSkinnedMesh&&je.skinning===!1||!V.isSkinnedMesh&&je.skinning===!0||V.isInstancedMesh&&je.instancingColor===!0&&V.instanceColor===null||V.isInstancedMesh&&je.instancingColor===!1&&V.instanceColor!==null||je.envMap!==He||q.fog===!0&&je.fog!==ye||je.numClippingPlanes!==void 0&&(je.numClippingPlanes!==Ve.numPlanes||je.numIntersection!==Ve.numIntersection)||je.vertexAlphas!==$e||je.vertexTangents!==We||je.morphTargets!==Xe||je.morphNormals!==Pt||je.morphColors!==pn||je.toneMapping!==zt||Oe.isWebGL2===!0&&je.morphTargetsCount!==Mt)&&(Et=!0):(Et=!0,je.__version=q.version);let ns=je.currentProgram;Et===!0&&(ns=ya(q,F,V));let tu=!1,Fr=!1,zo=!1;const Kt=ns.getUniforms(),is=je.uniforms;if(be.useProgram(ns.program)&&(tu=!0,Fr=!0,zo=!0),q.id!==z&&(z=q.id,Fr=!0),tu||y!==E){Kt.setValue(B,"projectionMatrix",E.projectionMatrix),Kt.setValue(B,"viewMatrix",E.matrixWorldInverse);const Sn=Kt.map.cameraPosition;Sn!==void 0&&Sn.setValue(B,Ae.setFromMatrixPosition(E.matrixWorld)),Oe.logarithmicDepthBuffer&&Kt.setValue(B,"logDepthBufFC",2/(Math.log(E.far+1)/Math.LN2)),(q.isMeshPhongMaterial||q.isMeshToonMaterial||q.isMeshLambertMaterial||q.isMeshBasicMaterial||q.isMeshStandardMaterial||q.isShaderMaterial)&&Kt.setValue(B,"isOrthographic",E.isOrthographicCamera===!0),y!==E&&(y=E,Fr=!0,zo=!0)}if(V.isSkinnedMesh){Kt.setOptional(B,V,"bindMatrix"),Kt.setOptional(B,V,"bindMatrixInverse");const Sn=V.skeleton;Sn&&(Oe.floatVertexTextures?(Sn.boneTexture===null&&Sn.computeBoneTexture(),Kt.setValue(B,"boneTexture",Sn.boneTexture,w)):console.warn("THREE.WebGLRenderer: SkinnedMesh can only be used with WebGL 2. With WebGL 1 OES_texture_float and vertex textures support is required."))}V.isBatchedMesh&&(Kt.setOptional(B,V,"batchingTexture"),Kt.setValue(B,"batchingTexture",V._matricesTexture,w));const Bo=X.morphAttributes;if((Bo.position!==void 0||Bo.normal!==void 0||Bo.color!==void 0&&Oe.isWebGL2===!0)&&Ye.update(V,X,ns),(Fr||je.receiveShadow!==V.receiveShadow)&&(je.receiveShadow=V.receiveShadow,Kt.setValue(B,"receiveShadow",V.receiveShadow)),q.isMeshGouraudMaterial&&q.envMap!==null&&(is.envMap.value=He,is.flipEnvMap.value=He.isCubeTexture&&He.isRenderTargetTexture===!1?-1:1),Fr&&(Kt.setValue(B,"toneMappingExposure",v.toneMappingExposure),je.needsLights&&Jd(is,zo),ye&&q.fog===!0&&me.refreshFogUniforms(is,ye),me.refreshMaterialUniforms(is,q,Z,W,de),co.upload(B,Qc(je),is,w)),q.isShaderMaterial&&q.uniformsNeedUpdate===!0&&(co.upload(B,Qc(je),is,w),q.uniformsNeedUpdate=!1),q.isSpriteMaterial&&Kt.setValue(B,"center",V.center),Kt.setValue(B,"modelViewMatrix",V.modelViewMatrix),Kt.setValue(B,"normalMatrix",V.normalMatrix),Kt.setValue(B,"modelMatrix",V.matrixWorld),q.isShaderMaterial||q.isRawShaderMaterial){const Sn=q.uniformsGroups;for(let Ho=0,ep=Sn.length;Ho<ep;Ho++)if(Oe.isWebGL2){const nu=Sn[Ho];ce.update(nu,ns),ce.bind(nu,ns)}else console.warn("THREE.WebGLRenderer: Uniform Buffer Objects can only be used with WebGL 2.")}return ns}function Jd(E,F){E.ambientLightColor.needsUpdate=F,E.lightProbe.needsUpdate=F,E.directionalLights.needsUpdate=F,E.directionalLightShadows.needsUpdate=F,E.pointLights.needsUpdate=F,E.pointLightShadows.needsUpdate=F,E.spotLights.needsUpdate=F,E.spotLightShadows.needsUpdate=F,E.rectAreaLights.needsUpdate=F,E.hemisphereLights.needsUpdate=F}function Qd(E){return E.isMeshLambertMaterial||E.isMeshToonMaterial||E.isMeshPhongMaterial||E.isMeshStandardMaterial||E.isShadowMaterial||E.isShaderMaterial&&E.lights===!0}this.getActiveCubeFace=function(){return C},this.getActiveMipmapLevel=function(){return A},this.getRenderTarget=function(){return T},this.setRenderTargetTextures=function(E,F,X){Ge.get(E.texture).__webglTexture=F,Ge.get(E.depthTexture).__webglTexture=X;const q=Ge.get(E);q.__hasExternalTextures=!0,q.__hasExternalTextures&&(q.__autoAllocateDepthBuffer=X===void 0,q.__autoAllocateDepthBuffer||we.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),q.__useRenderToTexture=!1))},this.setRenderTargetFramebuffer=function(E,F){const X=Ge.get(E);X.__webglFramebuffer=F,X.__useDefaultFramebuffer=F===void 0},this.setRenderTarget=function(E,F=0,X=0){T=E,C=F,A=X;let q=!0,V=null,ye=!1,Pe=!1;if(E){const He=Ge.get(E);He.__useDefaultFramebuffer!==void 0?(be.bindFramebuffer(B.FRAMEBUFFER,null),q=!1):He.__webglFramebuffer===void 0?w.setupRenderTarget(E):He.__hasExternalTextures&&w.rebindTextures(E,Ge.get(E.texture).__webglTexture,Ge.get(E.depthTexture).__webglTexture);const $e=E.texture;($e.isData3DTexture||$e.isDataArrayTexture||$e.isCompressedArrayTexture)&&(Pe=!0);const We=Ge.get(E).__webglFramebuffer;E.isWebGLCubeRenderTarget?(Array.isArray(We[F])?V=We[F][X]:V=We[F],ye=!0):Oe.isWebGL2&&E.samples>0&&w.useMultisampledRTT(E)===!1?V=Ge.get(E).__webglMultisampledFramebuffer:Array.isArray(We)?V=We[X]:V=We,b.copy(E.viewport),U.copy(E.scissor),k=E.scissorTest}else b.copy(Y).multiplyScalar(Z).floor(),U.copy(ie).multiplyScalar(Z).floor(),k=ee;if(be.bindFramebuffer(B.FRAMEBUFFER,V)&&Oe.drawBuffers&&q&&be.drawBuffers(E,V),be.viewport(b),be.scissor(U),be.setScissorTest(k),ye){const He=Ge.get(E.texture);B.framebufferTexture2D(B.FRAMEBUFFER,B.COLOR_ATTACHMENT0,B.TEXTURE_CUBE_MAP_POSITIVE_X+F,He.__webglTexture,X)}else if(Pe){const He=Ge.get(E.texture),$e=F||0;B.framebufferTextureLayer(B.FRAMEBUFFER,B.COLOR_ATTACHMENT0,He.__webglTexture,X||0,$e)}z=-1},this.readRenderTargetPixels=function(E,F,X,q,V,ye,Pe){if(!(E&&E.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let ke=Ge.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&Pe!==void 0&&(ke=ke[Pe]),ke){be.bindFramebuffer(B.FRAMEBUFFER,ke);try{const He=E.texture,$e=He.format,We=He.type;if($e!==Vn&&ve.convert($e)!==B.getParameter(B.IMPLEMENTATION_COLOR_READ_FORMAT)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}const Xe=We===aa&&(we.has("EXT_color_buffer_half_float")||Oe.isWebGL2&&we.has("EXT_color_buffer_float"));if(We!==Ki&&ve.convert(We)!==B.getParameter(B.IMPLEMENTATION_COLOR_READ_TYPE)&&!(We===Vi&&(Oe.isWebGL2||we.has("OES_texture_float")||we.has("WEBGL_color_buffer_float")))&&!Xe){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}F>=0&&F<=E.width-q&&X>=0&&X<=E.height-V&&B.readPixels(F,X,q,V,ve.convert($e),ve.convert(We),ye)}finally{const He=T!==null?Ge.get(T).__webglFramebuffer:null;be.bindFramebuffer(B.FRAMEBUFFER,He)}}},this.copyFramebufferToTexture=function(E,F,X=0){const q=Math.pow(2,-X),V=Math.floor(F.image.width*q),ye=Math.floor(F.image.height*q);w.setTexture2D(F,0),B.copyTexSubImage2D(B.TEXTURE_2D,X,0,0,E.x,E.y,V,ye),be.unbindTexture()},this.copyTextureToTexture=function(E,F,X,q=0){const V=F.image.width,ye=F.image.height,Pe=ve.convert(X.format),ke=ve.convert(X.type);w.setTexture2D(X,0),B.pixelStorei(B.UNPACK_FLIP_Y_WEBGL,X.flipY),B.pixelStorei(B.UNPACK_PREMULTIPLY_ALPHA_WEBGL,X.premultiplyAlpha),B.pixelStorei(B.UNPACK_ALIGNMENT,X.unpackAlignment),F.isDataTexture?B.texSubImage2D(B.TEXTURE_2D,q,E.x,E.y,V,ye,Pe,ke,F.image.data):F.isCompressedTexture?B.compressedTexSubImage2D(B.TEXTURE_2D,q,E.x,E.y,F.mipmaps[0].width,F.mipmaps[0].height,Pe,F.mipmaps[0].data):B.texSubImage2D(B.TEXTURE_2D,q,E.x,E.y,Pe,ke,F.image),q===0&&X.generateMipmaps&&B.generateMipmap(B.TEXTURE_2D),be.unbindTexture()},this.copyTextureToTexture3D=function(E,F,X,q,V=0){if(v.isWebGL1Renderer){console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");return}const ye=E.max.x-E.min.x+1,Pe=E.max.y-E.min.y+1,ke=E.max.z-E.min.z+1,He=ve.convert(q.format),$e=ve.convert(q.type);let We;if(q.isData3DTexture)w.setTexture3D(q,0),We=B.TEXTURE_3D;else if(q.isDataArrayTexture||q.isCompressedArrayTexture)w.setTexture2DArray(q,0),We=B.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}B.pixelStorei(B.UNPACK_FLIP_Y_WEBGL,q.flipY),B.pixelStorei(B.UNPACK_PREMULTIPLY_ALPHA_WEBGL,q.premultiplyAlpha),B.pixelStorei(B.UNPACK_ALIGNMENT,q.unpackAlignment);const Xe=B.getParameter(B.UNPACK_ROW_LENGTH),Pt=B.getParameter(B.UNPACK_IMAGE_HEIGHT),pn=B.getParameter(B.UNPACK_SKIP_PIXELS),zt=B.getParameter(B.UNPACK_SKIP_ROWS),ui=B.getParameter(B.UNPACK_SKIP_IMAGES),Mt=X.isCompressedTexture?X.mipmaps[V]:X.image;B.pixelStorei(B.UNPACK_ROW_LENGTH,Mt.width),B.pixelStorei(B.UNPACK_IMAGE_HEIGHT,Mt.height),B.pixelStorei(B.UNPACK_SKIP_PIXELS,E.min.x),B.pixelStorei(B.UNPACK_SKIP_ROWS,E.min.y),B.pixelStorei(B.UNPACK_SKIP_IMAGES,E.min.z),X.isDataTexture||X.isData3DTexture?B.texSubImage3D(We,V,F.x,F.y,F.z,ye,Pe,ke,He,$e,Mt.data):X.isCompressedArrayTexture?(console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: untested support for compressed srcTexture."),B.compressedTexSubImage3D(We,V,F.x,F.y,F.z,ye,Pe,ke,He,Mt.data)):B.texSubImage3D(We,V,F.x,F.y,F.z,ye,Pe,ke,He,$e,Mt),B.pixelStorei(B.UNPACK_ROW_LENGTH,Xe),B.pixelStorei(B.UNPACK_IMAGE_HEIGHT,Pt),B.pixelStorei(B.UNPACK_SKIP_PIXELS,pn),B.pixelStorei(B.UNPACK_SKIP_ROWS,zt),B.pixelStorei(B.UNPACK_SKIP_IMAGES,ui),V===0&&q.generateMipmaps&&B.generateMipmap(We),be.unbindTexture()},this.initTexture=function(E){E.isCubeTexture?w.setTextureCube(E,0):E.isData3DTexture?w.setTexture3D(E,0):E.isDataArrayTexture||E.isCompressedArrayTexture?w.setTexture2DArray(E,0):w.setTexture2D(E,0),be.unbindTexture()},this.resetState=function(){C=0,A=0,T=null,be.reset(),R.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return bi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=e===Nc?"display-p3":"srgb",t.unpackColorSpace=gt.workingColorSpace===Io?"display-p3":"srgb"}get outputEncoding(){return console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace===qt?Ts:md}set outputEncoding(e){console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace=e===Ts?qt:Ri}get useLegacyLights(){return console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights}set useLegacyLights(e){console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights=e}}class HM extends Nd{}HM.prototype.isWebGL1Renderer=!0;class GM extends Nt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t}}class VM{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=sc,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.version=0,this.uuid=Zi()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return console.warn("THREE.InterleavedBuffer: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let s=0,r=this.stride;s<r;s++)this.array[e+s]=t.array[n+s];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Zi()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Zi()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const Qt=new I;class bo{constructor(e,t,n,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)Qt.fromBufferAttribute(this,t),Qt.applyMatrix4(e),this.setXYZ(t,Qt.x,Qt.y,Qt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Qt.fromBufferAttribute(this,t),Qt.applyNormalMatrix(e),this.setXYZ(t,Qt.x,Qt.y,Qt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Qt.fromBufferAttribute(this,t),Qt.transformDirection(e),this.setXYZ(t,Qt.x,Qt.y,Qt.z);return this}setX(e,t){return this.normalized&&(t=vt(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=vt(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=vt(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=vt(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=yi(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=yi(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=yi(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=yi(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=vt(t,this.array),n=vt(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=vt(t,this.array),n=vt(n,this.array),s=vt(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=vt(t,this.array),n=vt(n,this.array),s=vt(s,this.array),r=vt(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this.data.array[e+3]=r,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return new In(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new bo(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class cc extends Fs{constructor(e){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new ot(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}let sr;const Vr=new I,rr=new I,ar=new I,or=new Ne,Wr=new Ne,Od=new Rt,$a=new I,Xr=new I,ja=new I,zh=new Ne,Sl=new Ne,Bh=new Ne;class Hh extends Nt{constructor(e=new cc){if(super(),this.isSprite=!0,this.type="Sprite",sr===void 0){sr=new rn;const t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new VM(t,5);sr.setIndex([0,1,2,0,2,3]),sr.setAttribute("position",new bo(n,3,0,!1)),sr.setAttribute("uv",new bo(n,2,3,!1))}this.geometry=sr,this.material=e,this.center=new Ne(.5,.5)}raycast(e,t){e.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),rr.setFromMatrixScale(this.matrixWorld),Od.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),ar.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&rr.multiplyScalar(-ar.z);const n=this.material.rotation;let s,r;n!==0&&(r=Math.cos(n),s=Math.sin(n));const a=this.center;Ka($a.set(-.5,-.5,0),ar,a,rr,s,r),Ka(Xr.set(.5,-.5,0),ar,a,rr,s,r),Ka(ja.set(.5,.5,0),ar,a,rr,s,r),zh.set(0,0),Sl.set(1,0),Bh.set(1,1);let o=e.ray.intersectTriangle($a,Xr,ja,!1,Vr);if(o===null&&(Ka(Xr.set(-.5,.5,0),ar,a,rr,s,r),Sl.set(0,1),o=e.ray.intersectTriangle($a,ja,Xr,!1,Vr),o===null))return;const l=e.ray.origin.distanceTo(Vr);l<e.near||l>e.far||t.push({distance:l,point:Vr.clone(),uv:Cn.getInterpolation(Vr,$a,Xr,ja,zh,Sl,Bh,new Ne),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}}function Ka(i,e,t,n,s,r){or.subVectors(i,t).addScalar(.5).multiply(n),s!==void 0?(Wr.x=r*or.x-s*or.y,Wr.y=s*or.x+r*or.y):Wr.copy(or),i.copy(e),i.x+=Wr.x,i.y+=Wr.y,i.applyMatrix4(Od)}class Eo extends Fs{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new ot(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const Gh=new I,Vh=new I,Wh=new Rt,bl=new ma,Za=new pa;class uc extends Nt{constructor(e=new rn,t=new Eo){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[0];for(let s=1,r=t.count;s<r;s++)Gh.fromBufferAttribute(t,s-1),Vh.fromBufferAttribute(t,s),n[s]=n[s-1],n[s]+=Gh.distanceTo(Vh);e.setAttribute("lineDistance",new fn(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const n=this.geometry,s=this.matrixWorld,r=e.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Za.copy(n.boundingSphere),Za.applyMatrix4(s),Za.radius+=r,e.ray.intersectsSphere(Za)===!1)return;Wh.copy(s).invert(),bl.copy(e.ray).applyMatrix4(Wh);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=new I,u=new I,h=new I,f=new I,m=this.isLineSegments?2:1,g=n.index,p=n.attributes.position;if(g!==null){const d=Math.max(0,a.start),x=Math.min(g.count,a.start+a.count);for(let v=d,M=x-1;v<M;v+=m){const C=g.getX(v),A=g.getX(v+1);if(c.fromBufferAttribute(p,C),u.fromBufferAttribute(p,A),bl.distanceSqToSegment(c,u,f,h)>l)continue;f.applyMatrix4(this.matrixWorld);const z=e.ray.origin.distanceTo(f);z<e.near||z>e.far||t.push({distance:z,point:h.clone().applyMatrix4(this.matrixWorld),index:v,face:null,faceIndex:null,object:this})}}else{const d=Math.max(0,a.start),x=Math.min(p.count,a.start+a.count);for(let v=d,M=x-1;v<M;v+=m){if(c.fromBufferAttribute(p,v),u.fromBufferAttribute(p,v+1),bl.distanceSqToSegment(c,u,f,h)>l)continue;f.applyMatrix4(this.matrixWorld);const A=e.ray.origin.distanceTo(f);A<e.near||A>e.far||t.push({distance:A,point:h.clone().applyMatrix4(this.matrixWorld),index:v,face:null,faceIndex:null,object:this})}}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}class Fd extends Fs{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new ot(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const Xh=new Rt,hc=new ma,Ja=new pa,Qa=new I;class WM extends Nt{constructor(e=new rn,t=new Fd){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const n=this.geometry,s=this.matrixWorld,r=e.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Ja.copy(n.boundingSphere),Ja.applyMatrix4(s),Ja.radius+=r,e.ray.intersectsSphere(Ja)===!1)return;Xh.copy(s).invert(),hc.copy(e.ray).applyMatrix4(Xh);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=n.index,h=n.attributes.position;if(c!==null){const f=Math.max(0,a.start),m=Math.min(c.count,a.start+a.count);for(let g=f,_=m;g<_;g++){const p=c.getX(g);Qa.fromBufferAttribute(h,p),qh(Qa,p,l,s,e,t,this)}}else{const f=Math.max(0,a.start),m=Math.min(h.count,a.start+a.count);for(let g=f,_=m;g<_;g++)Qa.fromBufferAttribute(h,g),qh(Qa,g,l,s,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function qh(i,e,t,n,s,r,a){const o=hc.distanceSqToPoint(i);if(o<t){const l=new I;hc.closestPointToPoint(i,l),l.applyMatrix4(n);const c=s.ray.origin.distanceTo(l);if(c<s.near||c>s.far)return;r.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:e,face:null,object:a})}}class Yh extends hn{constructor(e,t,n,s,r,a,o,l,c){super(e,t,n,s,r,a,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Hc extends rn{constructor(e=[],t=[],n=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:n,detail:s};const r=[],a=[];o(s),c(n),u(),this.setAttribute("position",new fn(r,3)),this.setAttribute("normal",new fn(r.slice(),3)),this.setAttribute("uv",new fn(a,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function o(x){const v=new I,M=new I,C=new I;for(let A=0;A<t.length;A+=3)m(t[A+0],v),m(t[A+1],M),m(t[A+2],C),l(v,M,C,x)}function l(x,v,M,C){const A=C+1,T=[];for(let z=0;z<=A;z++){T[z]=[];const y=x.clone().lerp(M,z/A),b=v.clone().lerp(M,z/A),U=A-z;for(let k=0;k<=U;k++)k===0&&z===A?T[z][k]=y:T[z][k]=y.clone().lerp(b,k/U)}for(let z=0;z<A;z++)for(let y=0;y<2*(A-z)-1;y++){const b=Math.floor(y/2);y%2===0?(f(T[z][b+1]),f(T[z+1][b]),f(T[z][b])):(f(T[z][b+1]),f(T[z+1][b+1]),f(T[z+1][b]))}}function c(x){const v=new I;for(let M=0;M<r.length;M+=3)v.x=r[M+0],v.y=r[M+1],v.z=r[M+2],v.normalize().multiplyScalar(x),r[M+0]=v.x,r[M+1]=v.y,r[M+2]=v.z}function u(){const x=new I;for(let v=0;v<r.length;v+=3){x.x=r[v+0],x.y=r[v+1],x.z=r[v+2];const M=p(x)/2/Math.PI+.5,C=d(x)/Math.PI+.5;a.push(M,1-C)}g(),h()}function h(){for(let x=0;x<a.length;x+=6){const v=a[x+0],M=a[x+2],C=a[x+4],A=Math.max(v,M,C),T=Math.min(v,M,C);A>.9&&T<.1&&(v<.2&&(a[x+0]+=1),M<.2&&(a[x+2]+=1),C<.2&&(a[x+4]+=1))}}function f(x){r.push(x.x,x.y,x.z)}function m(x,v){const M=x*3;v.x=e[M+0],v.y=e[M+1],v.z=e[M+2]}function g(){const x=new I,v=new I,M=new I,C=new I,A=new Ne,T=new Ne,z=new Ne;for(let y=0,b=0;y<r.length;y+=9,b+=6){x.set(r[y+0],r[y+1],r[y+2]),v.set(r[y+3],r[y+4],r[y+5]),M.set(r[y+6],r[y+7],r[y+8]),A.set(a[b+0],a[b+1]),T.set(a[b+2],a[b+3]),z.set(a[b+4],a[b+5]),C.copy(x).add(v).add(M).divideScalar(3);const U=p(C);_(A,b+0,x,U),_(T,b+2,v,U),_(z,b+4,M,U)}}function _(x,v,M,C){C<0&&x.x===1&&(a[v]=x.x-1),M.x===0&&M.z===0&&(a[v]=C/2/Math.PI+.5)}function p(x){return Math.atan2(x.z,-x.x)}function d(x){return Math.atan2(-x.y,Math.sqrt(x.x*x.x+x.z*x.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Hc(e.vertices,e.indices,e.radius,e.details)}}class Gc extends Hc{constructor(e=1,t=0){const n=(1+Math.sqrt(5))/2,s=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(s,r,e,t),this.type="IcosahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new Gc(e.radius,e.detail)}}class kd extends Nt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new ot(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),t}}const El=new Rt,$h=new I,jh=new I;class XM{constructor(e){this.camera=e,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Ne(512,512),this.map=null,this.mapPass=null,this.matrix=new Rt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new kc,this._frameExtents=new Ne(1,1),this._viewportCount=1,this._viewports=[new Ht(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,n=this.matrix;$h.setFromMatrixPosition(e.matrixWorld),t.position.copy($h),jh.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(jh),t.updateMatrixWorld(),El.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(El),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(El)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class qM extends XM{constructor(){super(new Rd(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class YM extends kd{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Nt.DEFAULT_UP),this.updateMatrix(),this.target=new Nt,this.shadow=new qM}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class $M extends kd{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}class jM{constructor(e,t,n=0,s=1/0){this.ray=new ma(e,t),this.near=n,this.far=s,this.camera=null,this.layers=new Oc,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):console.error("THREE.Raycaster: Unsupported camera type: "+t.type)}intersectObject(e,t=!0,n=[]){return fc(e,this,n,t),n.sort(Kh),n}intersectObjects(e,t=!0,n=[]){for(let s=0,r=e.length;s<r;s++)fc(e[s],this,n,t);return n.sort(Kh),n}}function Kh(i,e){return i.distance-e.distance}function fc(i,e,t,n){if(i.layers.test(e.layers)&&i.raycast(e,t),n===!0){const s=i.children;for(let r=0,a=s.length;r<a;r++)fc(s[r],e,t,!0)}}class Zh{constructor(e=1,t=0,n=0){return this.radius=e,this.phi=t,this.theta=n,this}set(e,t,n){return this.radius=e,this.phi=t,this.theta=n,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=Math.max(1e-6,Math.min(Math.PI-1e-6,this.phi)),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,n){return this.radius=Math.sqrt(e*e+t*t+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,n),this.phi=Math.acos(nn(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Uc}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Uc);const Jh={type:"change"},wl={type:"start"},Qh={type:"end"},eo=new ma,ef=new Ni,KM=Math.cos(70*N_.DEG2RAD);class ZM extends Os{constructor(e,t){super(),this.object=e,this.domElement=t,this.domElement.style.touchAction="none",this.enabled=!0,this.target=new I,this.cursor=new I,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Bs.ROTATE,MIDDLE:Bs.DOLLY,RIGHT:Bs.PAN},this.touches={ONE:Hs.ROTATE,TWO:Hs.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this.getPolarAngle=function(){return o.phi},this.getAzimuthalAngle=function(){return o.theta},this.getDistance=function(){return this.object.position.distanceTo(this.target)},this.listenToKeyEvents=function(R){R.addEventListener("keydown",De),this._domElementKeyEvents=R},this.stopListenToKeyEvents=function(){this._domElementKeyEvents.removeEventListener("keydown",De),this._domElementKeyEvents=null},this.saveState=function(){n.target0.copy(n.target),n.position0.copy(n.object.position),n.zoom0=n.object.zoom},this.reset=function(){n.target.copy(n.target0),n.object.position.copy(n.position0),n.object.zoom=n.zoom0,n.object.updateProjectionMatrix(),n.dispatchEvent(Jh),n.update(),r=s.NONE},this.update=(function(){const R=new I,ce=new oi().setFromUnitVectors(e.up,new I(0,1,0)),Re=ce.clone().invert(),Se=new I,re=new oi,L=new I,ue=2*Math.PI;return function(Fe=null){const Ie=n.object.position;R.copy(Ie).sub(n.target),R.applyQuaternion(ce),o.setFromVector3(R),n.autoRotate&&r===s.NONE&&k(b(Fe)),n.enableDamping?(o.theta+=l.theta*n.dampingFactor,o.phi+=l.phi*n.dampingFactor):(o.theta+=l.theta,o.phi+=l.phi);let Je=n.minAzimuthAngle,Qe=n.maxAzimuthAngle;isFinite(Je)&&isFinite(Qe)&&(Je<-Math.PI?Je+=ue:Je>Math.PI&&(Je-=ue),Qe<-Math.PI?Qe+=ue:Qe>Math.PI&&(Qe-=ue),Je<=Qe?o.theta=Math.max(Je,Math.min(Qe,o.theta)):o.theta=o.theta>(Je+Qe)/2?Math.max(Je,o.theta):Math.min(Qe,o.theta)),o.phi=Math.max(n.minPolarAngle,Math.min(n.maxPolarAngle,o.phi)),o.makeSafe(),n.enableDamping===!0?n.target.addScaledVector(u,n.dampingFactor):n.target.add(u),n.target.sub(n.cursor),n.target.clampLength(n.minTargetRadius,n.maxTargetRadius),n.target.add(n.cursor),n.zoomToCursor&&A||n.object.isOrthographicCamera?o.radius=Y(o.radius):o.radius=Y(o.radius*c),R.setFromSpherical(o),R.applyQuaternion(Re),Ie.copy(n.target).add(R),n.object.lookAt(n.target),n.enableDamping===!0?(l.theta*=1-n.dampingFactor,l.phi*=1-n.dampingFactor,u.multiplyScalar(1-n.dampingFactor)):(l.set(0,0,0),u.set(0,0,0));let bt=!1;if(n.zoomToCursor&&A){let Ct=null;if(n.object.isPerspectiveCamera){const at=R.length();Ct=Y(at*c);const Ut=at-Ct;n.object.position.addScaledVector(M,Ut),n.object.updateMatrixWorld()}else if(n.object.isOrthographicCamera){const at=new I(C.x,C.y,0);at.unproject(n.object),n.object.zoom=Math.max(n.minZoom,Math.min(n.maxZoom,n.object.zoom/c)),n.object.updateProjectionMatrix(),bt=!0;const Ut=new I(C.x,C.y,0);Ut.unproject(n.object),n.object.position.sub(Ut).add(at),n.object.updateMatrixWorld(),Ct=R.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),n.zoomToCursor=!1;Ct!==null&&(this.screenSpacePanning?n.target.set(0,0,-1).transformDirection(n.object.matrix).multiplyScalar(Ct).add(n.object.position):(eo.origin.copy(n.object.position),eo.direction.set(0,0,-1).transformDirection(n.object.matrix),Math.abs(n.object.up.dot(eo.direction))<KM?e.lookAt(n.target):(ef.setFromNormalAndCoplanarPoint(n.object.up,n.target),eo.intersectPlane(ef,n.target))))}else n.object.isOrthographicCamera&&(n.object.zoom=Math.max(n.minZoom,Math.min(n.maxZoom,n.object.zoom/c)),n.object.updateProjectionMatrix(),bt=!0);return c=1,A=!1,bt||Se.distanceToSquared(n.object.position)>a||8*(1-re.dot(n.object.quaternion))>a||L.distanceToSquared(n.target)>0?(n.dispatchEvent(Jh),Se.copy(n.object.position),re.copy(n.object.quaternion),L.copy(n.target),!0):!1}})(),this.dispose=function(){n.domElement.removeEventListener("contextmenu",lt),n.domElement.removeEventListener("pointerdown",w),n.domElement.removeEventListener("pointercancel",N),n.domElement.removeEventListener("wheel",ae),n.domElement.removeEventListener("pointermove",S),n.domElement.removeEventListener("pointerup",N),n._domElementKeyEvents!==null&&(n._domElementKeyEvents.removeEventListener("keydown",De),n._domElementKeyEvents=null)};const n=this,s={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6};let r=s.NONE;const a=1e-6,o=new Zh,l=new Zh;let c=1;const u=new I,h=new Ne,f=new Ne,m=new Ne,g=new Ne,_=new Ne,p=new Ne,d=new Ne,x=new Ne,v=new Ne,M=new I,C=new Ne;let A=!1;const T=[],z={};let y=!1;function b(R){return R!==null?2*Math.PI/60*n.autoRotateSpeed*R:2*Math.PI/60/60*n.autoRotateSpeed}function U(R){const ce=Math.abs(R*.01);return Math.pow(.95,n.zoomSpeed*ce)}function k(R){l.theta-=R}function Q(R){l.phi-=R}const D=(function(){const R=new I;return function(Re,Se){R.setFromMatrixColumn(Se,0),R.multiplyScalar(-Re),u.add(R)}})(),O=(function(){const R=new I;return function(Re,Se){n.screenSpacePanning===!0?R.setFromMatrixColumn(Se,1):(R.setFromMatrixColumn(Se,0),R.crossVectors(n.object.up,R)),R.multiplyScalar(Re),u.add(R)}})(),W=(function(){const R=new I;return function(Re,Se){const re=n.domElement;if(n.object.isPerspectiveCamera){const L=n.object.position;R.copy(L).sub(n.target);let ue=R.length();ue*=Math.tan(n.object.fov/2*Math.PI/180),D(2*Re*ue/re.clientHeight,n.object.matrix),O(2*Se*ue/re.clientHeight,n.object.matrix)}else n.object.isOrthographicCamera?(D(Re*(n.object.right-n.object.left)/n.object.zoom/re.clientWidth,n.object.matrix),O(Se*(n.object.top-n.object.bottom)/n.object.zoom/re.clientHeight,n.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),n.enablePan=!1)}})();function Z(R){n.object.isPerspectiveCamera||n.object.isOrthographicCamera?c/=R:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),n.enableZoom=!1)}function $(R){n.object.isPerspectiveCamera||n.object.isOrthographicCamera?c*=R:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),n.enableZoom=!1)}function j(R,ce){if(!n.zoomToCursor)return;A=!0;const Re=n.domElement.getBoundingClientRect(),Se=R-Re.left,re=ce-Re.top,L=Re.width,ue=Re.height;C.x=Se/L*2-1,C.y=-(re/ue)*2+1,M.set(C.x,C.y,1).unproject(n.object).sub(n.object.position).normalize()}function Y(R){return Math.max(n.minDistance,Math.min(n.maxDistance,R))}function ie(R){h.set(R.clientX,R.clientY)}function ee(R){j(R.clientX,R.clientX),d.set(R.clientX,R.clientY)}function G(R){g.set(R.clientX,R.clientY)}function H(R){f.set(R.clientX,R.clientY),m.subVectors(f,h).multiplyScalar(n.rotateSpeed);const ce=n.domElement;k(2*Math.PI*m.x/ce.clientHeight),Q(2*Math.PI*m.y/ce.clientHeight),h.copy(f),n.update()}function oe(R){x.set(R.clientX,R.clientY),v.subVectors(x,d),v.y>0?Z(U(v.y)):v.y<0&&$(U(v.y)),d.copy(x),n.update()}function de(R){_.set(R.clientX,R.clientY),p.subVectors(_,g).multiplyScalar(n.panSpeed),W(p.x,p.y),g.copy(_),n.update()}function ge(R){j(R.clientX,R.clientY),R.deltaY<0?$(U(R.deltaY)):R.deltaY>0&&Z(U(R.deltaY)),n.update()}function xe(R){let ce=!1;switch(R.code){case n.keys.UP:R.ctrlKey||R.metaKey||R.shiftKey?Q(2*Math.PI*n.rotateSpeed/n.domElement.clientHeight):W(0,n.keyPanSpeed),ce=!0;break;case n.keys.BOTTOM:R.ctrlKey||R.metaKey||R.shiftKey?Q(-2*Math.PI*n.rotateSpeed/n.domElement.clientHeight):W(0,-n.keyPanSpeed),ce=!0;break;case n.keys.LEFT:R.ctrlKey||R.metaKey||R.shiftKey?k(2*Math.PI*n.rotateSpeed/n.domElement.clientHeight):W(n.keyPanSpeed,0),ce=!0;break;case n.keys.RIGHT:R.ctrlKey||R.metaKey||R.shiftKey?k(-2*Math.PI*n.rotateSpeed/n.domElement.clientHeight):W(-n.keyPanSpeed,0),ce=!0;break}ce&&(R.preventDefault(),n.update())}function Ae(R){if(T.length===1)h.set(R.pageX,R.pageY);else{const ce=ve(R),Re=.5*(R.pageX+ce.x),Se=.5*(R.pageY+ce.y);h.set(Re,Se)}}function Ee(R){if(T.length===1)g.set(R.pageX,R.pageY);else{const ce=ve(R),Re=.5*(R.pageX+ce.x),Se=.5*(R.pageY+ce.y);g.set(Re,Se)}}function Ue(R){const ce=ve(R),Re=R.pageX-ce.x,Se=R.pageY-ce.y,re=Math.sqrt(Re*Re+Se*Se);d.set(0,re)}function B(R){n.enableZoom&&Ue(R),n.enablePan&&Ee(R)}function ut(R){n.enableZoom&&Ue(R),n.enableRotate&&Ae(R)}function we(R){if(T.length==1)f.set(R.pageX,R.pageY);else{const Re=ve(R),Se=.5*(R.pageX+Re.x),re=.5*(R.pageY+Re.y);f.set(Se,re)}m.subVectors(f,h).multiplyScalar(n.rotateSpeed);const ce=n.domElement;k(2*Math.PI*m.x/ce.clientHeight),Q(2*Math.PI*m.y/ce.clientHeight),h.copy(f)}function Oe(R){if(T.length===1)_.set(R.pageX,R.pageY);else{const ce=ve(R),Re=.5*(R.pageX+ce.x),Se=.5*(R.pageY+ce.y);_.set(Re,Se)}p.subVectors(_,g).multiplyScalar(n.panSpeed),W(p.x,p.y),g.copy(_)}function be(R){const ce=ve(R),Re=R.pageX-ce.x,Se=R.pageY-ce.y,re=Math.sqrt(Re*Re+Se*Se);x.set(0,re),v.set(0,Math.pow(x.y/d.y,n.zoomSpeed)),Z(v.y),d.copy(x);const L=(R.pageX+ce.x)*.5,ue=(R.pageY+ce.y)*.5;j(L,ue)}function mt(R){n.enableZoom&&be(R),n.enablePan&&Oe(R)}function Ge(R){n.enableZoom&&be(R),n.enableRotate&&we(R)}function w(R){n.enabled!==!1&&(T.length===0&&(n.domElement.setPointerCapture(R.pointerId),n.domElement.addEventListener("pointermove",S),n.domElement.addEventListener("pointerup",N)),Ye(R),R.pointerType==="touch"?Ve(R):ne(R))}function S(R){n.enabled!==!1&&(R.pointerType==="touch"?J(R):se(R))}function N(R){Be(R),T.length===0&&(n.domElement.releasePointerCapture(R.pointerId),n.domElement.removeEventListener("pointermove",S),n.domElement.removeEventListener("pointerup",N)),n.dispatchEvent(Qh),r=s.NONE}function ne(R){let ce;switch(R.button){case 0:ce=n.mouseButtons.LEFT;break;case 1:ce=n.mouseButtons.MIDDLE;break;case 2:ce=n.mouseButtons.RIGHT;break;default:ce=-1}switch(ce){case Bs.DOLLY:if(n.enableZoom===!1)return;ee(R),r=s.DOLLY;break;case Bs.ROTATE:if(R.ctrlKey||R.metaKey||R.shiftKey){if(n.enablePan===!1)return;G(R),r=s.PAN}else{if(n.enableRotate===!1)return;ie(R),r=s.ROTATE}break;case Bs.PAN:if(R.ctrlKey||R.metaKey||R.shiftKey){if(n.enableRotate===!1)return;ie(R),r=s.ROTATE}else{if(n.enablePan===!1)return;G(R),r=s.PAN}break;default:r=s.NONE}r!==s.NONE&&n.dispatchEvent(wl)}function se(R){switch(r){case s.ROTATE:if(n.enableRotate===!1)return;H(R);break;case s.DOLLY:if(n.enableZoom===!1)return;oe(R);break;case s.PAN:if(n.enablePan===!1)return;de(R);break}}function ae(R){n.enabled===!1||n.enableZoom===!1||r!==s.NONE||(R.preventDefault(),n.dispatchEvent(wl),ge(Te(R)),n.dispatchEvent(Qh))}function Te(R){const ce=R.deltaMode,Re={clientX:R.clientX,clientY:R.clientY,deltaY:R.deltaY};switch(ce){case 1:Re.deltaY*=16;break;case 2:Re.deltaY*=100;break}return R.ctrlKey&&!y&&(Re.deltaY*=10),Re}function me(R){R.key==="Control"&&(y=!0,document.addEventListener("keyup",Me,{passive:!0,capture:!0}))}function Me(R){R.key==="Control"&&(y=!1,document.removeEventListener("keyup",Me,{passive:!0,capture:!0}))}function De(R){n.enabled===!1||n.enablePan===!1||xe(R)}function Ve(R){switch(Le(R),T.length){case 1:switch(n.touches.ONE){case Hs.ROTATE:if(n.enableRotate===!1)return;Ae(R),r=s.TOUCH_ROTATE;break;case Hs.PAN:if(n.enablePan===!1)return;Ee(R),r=s.TOUCH_PAN;break;default:r=s.NONE}break;case 2:switch(n.touches.TWO){case Hs.DOLLY_PAN:if(n.enableZoom===!1&&n.enablePan===!1)return;B(R),r=s.TOUCH_DOLLY_PAN;break;case Hs.DOLLY_ROTATE:if(n.enableZoom===!1&&n.enableRotate===!1)return;ut(R),r=s.TOUCH_DOLLY_ROTATE;break;default:r=s.NONE}break;default:r=s.NONE}r!==s.NONE&&n.dispatchEvent(wl)}function J(R){switch(Le(R),r){case s.TOUCH_ROTATE:if(n.enableRotate===!1)return;we(R),n.update();break;case s.TOUCH_PAN:if(n.enablePan===!1)return;Oe(R),n.update();break;case s.TOUCH_DOLLY_PAN:if(n.enableZoom===!1&&n.enablePan===!1)return;mt(R),n.update();break;case s.TOUCH_DOLLY_ROTATE:if(n.enableZoom===!1&&n.enableRotate===!1)return;Ge(R),n.update();break;default:r=s.NONE}}function lt(R){n.enabled!==!1&&R.preventDefault()}function Ye(R){T.push(R.pointerId)}function Be(R){delete z[R.pointerId];for(let ce=0;ce<T.length;ce++)if(T[ce]==R.pointerId){T.splice(ce,1);return}}function Le(R){let ce=z[R.pointerId];ce===void 0&&(ce=new Ne,z[R.pointerId]=ce),ce.set(R.pageX,R.pageY)}function ve(R){const ce=R.pointerId===T[0]?T[1]:T[0];return z[ce]}n.domElement.addEventListener("contextmenu",lt),n.domElement.addEventListener("pointerdown",w),n.domElement.addEventListener("pointercancel",N),n.domElement.addEventListener("wheel",ae,{passive:!1}),document.addEventListener("keydown",me,{passive:!0,capture:!0}),this.update()}}function ls(i){const e=i.trim();if(e.startsWith("#"))return parseInt(e.slice(1),16);const t=e.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);return t?parseInt(t[1])<<16|parseInt(t[2])<<8|parseInt(t[3]):54527}function JM(i){const e=[],t=Math.PI*(3-Math.sqrt(5));for(let n=0;n<i;n++){const s=1-n/(i-1)*2,r=Math.sqrt(1-s*s),a=t*n;e.push({x:Math.cos(a)*r,y:s,z:Math.sin(a)*r})}return e}function QM(i){const e=[...new Set(i.map(a=>a.cat))],t=e.length||1,n={};e.forEach((a,o)=>{const l=(o+.5)/t;n[a]={lat:Math.PI*l-Math.PI/2}});const s={};e.forEach(a=>{s[a]=[]}),i.forEach(a=>s[a.cat].push(a));const r={};return e.forEach(a=>{const o=s[a],l=n[a].lat,c=Math.PI/t*.8;o.forEach((u,h)=>{const m=((o.length>1?h/(o.length-1):.5)*2-1)*Math.PI*.9,g=l+(Math.random()-.5)*c*.6,_=Math.cos(g);r[u.id]={x:Math.cos(m)*_,y:Math.sin(g),z:Math.sin(m)*_}})}),r}function eS(i,e,t,n=20){const s=[],r=Math.sqrt(i.x**2+i.y**2+i.z**2)||1,a=Math.sqrt(e.x**2+e.y**2+e.z**2)||1,o={x:i.x/r,y:i.y/r,z:i.z/r},l={x:e.x/a,y:e.y/a,z:e.z/a},c=t*1.01;for(let u=0;u<=n;u++){const h=u/n,f=o.x+(l.x-o.x)*h,m=o.y+(l.y-o.y)*h,g=o.z+(l.z-o.z)*h,_=Math.sqrt(f*f+m*m+g*g)||1;s.push({x:f/_*c,y:m/_*c,z:g/_*c})}return s}class tS{constructor(e){he(this,"scene");he(this,"camera");he(this,"renderer");he(this,"controls");he(this,"nodeMeshes",[]);he(this,"linkLines",[]);he(this,"dotParticles",null);he(this,"wireframe",null);he(this,"raycaster");he(this,"mouse");he(this,"hovered",null);he(this,"lockedNode",null);he(this,"animId",null);he(this,"pulseTime",0);he(this,"searchMatched",null);he(this,"_flyAnimId",null);he(this,"_heatmapRings",[]);he(this,"_dotTexture",null);he(this,"_glowTexture",null);he(this,"onNodeHover",null);he(this,"onNodeClick",null);he(this,"onNodeUnlock",null);he(this,"_labelContainer",null);he(this,"_links",[]);he(this,"_lastTime",0);he(this,"_glowLevel",.35);const t=window.innerWidth,n=window.innerHeight;this.renderer=new Nd({canvas:e,antialias:!0,alpha:!0}),this.renderer.setSize(t,n),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,2)),this.renderer.setClearColor(0,0),this.scene=new GM,this.camera=new Pn(50,t/n,1,5e3),this.camera.position.set(0,0,hs),this.controls=new ZM(this.camera,e),this.controls.enableDamping=!0,this.controls.dampingFactor=.06,this.controls.autoRotate=!0,this.controls.autoRotateSpeed=.35,this.controls.minDistance=400,this.controls.maxDistance=1800,this.controls.zoomSpeed=.8,this.scene.add(new $M(16777215,.3));const s=new YM(54527,.6);s.position.set(1,2,3),this.scene.add(s),this._buildDotSphere(),this._buildWireframe(),this.raycaster=new jM,this.mouse=new Ne(-9999,-9999)}_buildDotSphere(){const e=[],t=[],n=cs;JM(Om).forEach(({x:o,y:l,z:c})=>{e.push(o*n,l*n,c*n);const u=(l+1)/2,h=Math.round(u*0+(1-u)*168)/255,f=Math.round(u*212+(1-u)*85)/255,m=Math.round(u*255+(1-u)*247)/255;t.push(h,f,m)});const r=new rn;r.setAttribute("position",new fn(e,3)),r.setAttribute("color",new fn(t,3));const a=new Fd({size:1.8,vertexColors:!0,transparent:!0,opacity:.35,sizeAttenuation:!0,blending:Oi,depthWrite:!1});this.dotParticles=new WM(r,a),this.scene.add(this.dotParticles)}_buildWireframe(){const e=new Gc(cs,3),t=new Fc({color:54527,wireframe:!0,transparent:!0,opacity:.04,blending:Oi,depthWrite:!1});this.wireframe=new Ei(e,t),this.scene.add(this.wireframe)}_createDotTexture(e){const t=document.createElement("canvas");t.width=e,t.height=e;const n=t.getContext("2d"),s=e/2,r=n.createRadialGradient(s,s,0,s,s,s);r.addColorStop(0,"#ffffff"),r.addColorStop(.65,"#ffffff"),r.addColorStop(.78,"#ffffffcc"),r.addColorStop(.92,"#ffffff44"),r.addColorStop(1,"#ffffff00"),n.fillStyle=r,n.beginPath(),n.arc(s,s,s,0,Math.PI*2),n.fill();const a=new Yh(t);return a.needsUpdate=!0,a}_createGlowRingTexture(e){const t=document.createElement("canvas");t.width=e,t.height=e;const n=t.getContext("2d"),s=e/2,r=n.createRadialGradient(s,s,0,s,s,s);r.addColorStop(0,"#ffffff00"),r.addColorStop(.25,"#ffffff08"),r.addColorStop(.5,"#ffffff22"),r.addColorStop(.7,"#ffffff18"),r.addColorStop(1,"#ffffff00"),n.fillStyle=r,n.beginPath(),n.arc(s,s,s,0,Math.PI*2),n.fill();const a=new Yh(t);return a.needsUpdate=!0,a}updateNodes(e,t,n,s=.35){this._links=t,this._labelContainer=n,this._glowLevel=s,this.nodeMeshes.forEach(({mesh:l,labelEl:c})=>{this.scene.remove(l),l.material&&l.material.dispose(),c.parentNode&&c.parentNode.removeChild(c)}),this.nodeMeshes=[],this.linkLines.forEach(l=>{this.scene.remove(l),l.geometry.dispose(),l.material.dispose()}),this.linkLines=[],n.innerHTML="";const r=cs,a=QM(e);e.forEach(l=>{const c=a[l.id]||{x:0,y:1,z:0};l._gx=c.x*r,l._gy=c.y*r,l._gz=c.z*r}),this._dotTexture||(this._dotTexture=this._createDotTexture(128)),this._glowTexture||(this._glowTexture=this._createGlowRingTexture(128)),e.forEach(l=>{const c=St[l.cat]||St.meta,u=ls(c.color),h=Math.min(14,4+(l.refs||0)*1.5),f=new cc({map:this._dotTexture,color:u,transparent:!0,opacity:.95,depthWrite:!1,sizeAttenuation:!0}),m=new Hh(f);m.position.set(l._gx,l._gy,l._gz),m.scale.setScalar(h*2),m.userData.nodeData=l,this.scene.add(m);const g=new cc({map:this._glowTexture,color:u,transparent:!0,opacity:.06+.12*s,blending:Oi,depthWrite:!1,sizeAttenuation:!0}),_=new Hh(g);_.scale.setScalar(h*(2.2+1*s)),m.add(_);const p=document.createElement("div");p.className="globe-label",p.textContent=l.label,p.style.color=c.color,p.style.opacity="0",n.appendChild(p),this.nodeMeshes.push({mesh:m,data:l,labelEl:p,glowMesh:_,glowMat:g,mat:f,baseRadius:h})});const o=new Map(e.map(l=>[l.id,l]));t.forEach(l=>{const c=typeof l.source=="string"?l.source:l.source.id,u=typeof l.target=="string"?l.target:l.target.id,h=o.get(c),f=o.get(u);if(!h||!f)return;const m=eS({x:h._gx,y:h._gy,z:h._gz},{x:f._gx,y:f._gy,z:f._gz},cs,20),g=new rn().setFromPoints(m.map(x=>new I(x.x,x.y,x.z))),_=St[h.cat]||St.meta,p=new Eo({color:ls(_.color),transparent:!0,opacity:.07,blending:Oi,depthWrite:!1}),d=new uc(g,p);d.userData.linkData=l,this.scene.add(d),this.linkLines.push(d)})}animate(e,t){this._lastTime||(this._lastTime=e);const n=Math.min((e-this._lastTime)/1e3,.1);if(this._lastTime=e,this._glowLevel=t.glowLevel,this.controls.update(),this.wireframe&&(this.wireframe.visible=t.showWireframe),this.dotParticles&&(this.dotParticles.visible=t.showDots),this.linkLines.forEach(a=>{a.visible=t.showLinks}),t.pulseEnabled&&!this.hovered){this.pulseTime+=n*t.pulseSpeed*Math.PI*2;const a=t.glowLevel,o=this.searchMatched!==null&&this.searchMatched.size>0;if(this.nodeMeshes.forEach(({mesh:l,mat:c,glowMat:u,glowMesh:h,data:f,baseRadius:m},g)=>{const _=o&&this.searchMatched.has(f.id),p=(m||6)*2;if(o&&!_)return;const d=this.pulseTime+g*.35,x=Math.sin(d);if(_){const v=this.pulseTime*1.8+g*.5,M=Math.sin(v);l.scale.setScalar(p*(1+M*.35)),c.opacity=.85+M*.15,u.opacity=.15+M*.15,h.scale.setScalar(1.3+M*.4)}else{l.scale.setScalar(p*(1+x*.06)),c.opacity=.9+x*.1*a;const v=.06+.12*a;u.opacity=v+x*.04*a}}),this.dotParticles&&t.showDots){const l=Math.sin(this.pulseTime*.7);this.dotParticles.material.opacity=.25+.25*t.glowLevel+l*.05;const c=1+l*.005;this.dotParticles.scale.setScalar(c)}if(this.wireframe&&t.showWireframe){const l=Math.sin(this.pulseTime*.5);this.wireframe.material.opacity=.02+.04*t.glowLevel+l*.008}}this.raycaster.setFromCamera(this.mouse,this.camera);const s=this.nodeMeshes.map(a=>a.mesh),r=this.raycaster.intersectObjects(s,!1);if(this.lockedNode)r.length>0?this.hovered=r[0].object.userData.nodeData:this.hovered=null;else if(r.length>0){const a=r[0].object.userData.nodeData;a&&a!==this.hovered&&(this._handleHoverEnd(),this.hovered=a,this._handleHoverStart(a))}else this.hovered&&this._handleHoverEnd();this._labelContainer&&this._updateLabels(this._labelContainer),this._heatmapRings.length>0&&this._animateHeatmapRings(this.pulseTime),this.renderer.render(this.scene,this.camera)}_handleHoverStart(e){var s;const t=Zl(e.id,this._links);this.nodeMeshes.forEach(({mesh:r,data:a,mat:o,glowMat:l,glowMesh:c,baseRadius:u})=>{const h=a.id===e.id,f=t.has(a.id),m=(u||6)*2;h?(o.opacity=1,r.scale.setScalar(m*1.3),l.opacity=.2,c.scale.setScalar(1.3)):f?(o.opacity=.9,r.scale.setScalar(m)):(o.opacity=.15,r.scale.setScalar(m*.8))}),this.linkLines.forEach(r=>{const a=r.userData.linkData;if(!a)return;const o=typeof a.source=="string"?a.source:a.source.id,l=typeof a.target=="string"?a.target:a.target.id;r.material.opacity=o===e.id||l===e.id?.6:.01});const n=this.nodeMeshes.find(r=>r.data.id===e.id);n!=null&&n.labelEl&&(n.labelEl.style.opacity="1"),(s=this.onNodeHover)==null||s.call(this,e)}_handleHoverEnd(){var t;if(!this.hovered||(this.hovered=null,this.lockedNode))return;const e=this._glowLevel;this.nodeMeshes.forEach(({mesh:n,mat:s,glowMat:r,glowMesh:a,baseRadius:o})=>{const l=(o||6)*2;s.opacity=.95,r.opacity=.06+.12*e,a.scale.setScalar(1),n.scale.setScalar(l)}),this.linkLines.forEach(n=>{n.material.opacity=.07}),this.nodeMeshes.forEach(({labelEl:n})=>{n&&(n.style.opacity="0")}),(t=this.onNodeHover)==null||t.call(this,null)}handleClick(){var e,t,n;if(this.hovered){this.lockedNode=this.hovered,this.controls.autoRotate=!1,this._handleHoverStart(this.hovered);const s=Zl(this.hovered.id,this._links);this.nodeMeshes.forEach(({data:a,labelEl:o})=>{o&&(a.id===this.lockedNode.id||s.has(a.id))&&(o.style.opacity="1")});const r=this.nodeMeshes.find(a=>a.data.id===this.lockedNode.id);if(r){const o=r.mesh.position.clone().normalize().multiplyScalar(Wo);this.flyTo(o,Wo)}(e=this.onNodeClick)==null||e.call(this,this.lockedNode)}else if(this.lockedNode){this.lockedNode=null;const s=this._glowLevel;this.nodeMeshes.forEach(({mesh:a,mat:o,glowMat:l,glowMesh:c,baseRadius:u,labelEl:h})=>{const f=(u||6)*2;o.opacity=.95,l.opacity=.06+.12*s,c.scale.setScalar(1),a.scale.setScalar(f),h&&(h.style.opacity="0")}),this.linkLines.forEach(a=>{a.material.opacity=.07}),this.flyTo(new I(0,0,hs),hs),this.searchMatched!==null&&this.searchMatched.size>0||(this.controls.autoRotate=!0),(t=this.onNodeUnlock)==null||t.call(this),(n=this.onNodeClick)==null||n.call(this,null)}}flyTo(e,t){const n=this.camera.position.clone(),s=1200,r=performance.now();this._flyAnimId!==null&&cancelAnimationFrame(this._flyAnimId);const a=o=>{const l=o-r;let c=Math.min(l/s,1);c=1-Math.pow(1-c,3);const u=new I().lerpVectors(n,e,c),h=n.length()+(t-n.length())*c;u.normalize().multiplyScalar(h),this.camera.position.copy(u),this.camera.lookAt(0,0,0),this.controls.target.set(0,0,0),this.controls.update(),c<1?this._flyAnimId=requestAnimationFrame(a):this._flyAnimId=null};this._flyAnimId=requestAnimationFrame(a)}resetPosition(){this.flyTo(new I(0,0,hs),hs)}search(e){if(!this.nodeMeshes.length)return;this.searchMatched=e.size>0?e:null,this.controls.autoRotate=!1;const t=3815994;this.nodeMeshes.forEach(({data:l,mat:c,glowMat:u,glowMesh:h,mesh:f,baseRadius:m,labelEl:g})=>{const _=e.has(l.id),p=(m||6)*2;if(_){const d=St[l.cat]||St.meta,x=ls(d.color);c.color.setHex(x),c.opacity=1,u.color.setHex(x),u.opacity=.18,h.scale.setScalar(1.2),f.scale.setScalar(p*1.2)}else c.color.setHex(t),c.opacity=.2,u.color.setHex(t),u.opacity=.01,h.scale.setScalar(.3),f.scale.setScalar(p*.7);g&&(g.style.opacity=_?"1":"0")}),this.linkLines.forEach(l=>{const c=l.userData.linkData;if(!c)return;const u=typeof c.source=="string"?c.source:c.source.id,h=typeof c.target=="string"?c.target:c.target.id;l.material.opacity=e.has(u)&&e.has(h)?.4:.01});const n=this.nodeMeshes.filter(l=>e.has(l.data.id));if(n.length===0)return;const s=new I(0,0,0);n.forEach(({mesh:l})=>s.add(l.position)),s.divideScalar(n.length);const r=s.clone().normalize(),a=n.length===1?520:Wo,o=r.clone().multiplyScalar(a);this.flyTo(o,a),this._removeHeatmapRings(),this._addHeatmapRings(n)}clearSearch(){this.searchMatched=null;const e=this._glowLevel;this.nodeMeshes.forEach(({data:t,mat:n,glowMat:s,glowMesh:r,mesh:a,baseRadius:o,labelEl:l})=>{const c=St[t.cat]||St.meta,u=ls(c.color);n.color.setHex(u),n.opacity=.95,s.color.setHex(u),s.opacity=.06+.12*e,r.scale.setScalar(1);const h=(o||6)*2;a.scale.setScalar(h),l&&(l.style.opacity="0")}),this.linkLines.forEach(t=>{t.material.opacity=.07}),this._removeHeatmapRings(),this.controls.autoRotate=!0,this.resetPosition()}_addHeatmapRings(e){const t=[.08,.15,.24],n=[.35,.18,.08];e.forEach(({mesh:s,data:r})=>{const a=St[r.cat]||St.meta,o=ls(a.color),l=s.position.clone().normalize(),c=Math.abs(l.y)<.99?new I(0,1,0):new I(1,0,0),u=new I().crossVectors(l,c).normalize(),h=new I().crossVectors(l,u).normalize();t.forEach((f,m)=>{const _=[];for(let v=0;v<=64;v++){const M=v/64*Math.PI*2,C=Math.cos(M),A=Math.sin(M),T=Math.cos(f),z=Math.sin(f),y=l.clone().multiplyScalar(T).add(u.clone().multiplyScalar(z*C)).add(h.clone().multiplyScalar(z*A));y.normalize().multiplyScalar(cs*1.005),_.push(y)}const p=new rn().setFromPoints(_),d=new Eo({color:o,transparent:!0,opacity:n[m],blending:Oi,depthWrite:!1,linewidth:1}),x=new uc(p,d);x.userData._heatmap=!0,x.userData._baseOpacity=n[m],x.userData._ringIndex=m,this.scene.add(x),this._heatmapRings.push(x)})})}_removeHeatmapRings(){this._heatmapRings.forEach(e=>{this.scene.remove(e),e.geometry.dispose(),e.material.dispose()}),this._heatmapRings=[]}_animateHeatmapRings(e){this._heatmapRings.forEach(t=>{const n=t.userData._ringIndex||0,s=t.userData._baseOpacity||.2,r=e*1.5-n*1.2,a=Math.sin(r);t.material.opacity=s+a*s*.5;const o=1+a*.02;t.scale.setScalar(o)})}updateGlow(e){this._glowLevel=e,this.nodeMeshes.forEach(({mat:t,glowMat:n,glowMesh:s,baseRadius:r})=>{t.opacity=.9+.1*e,n.opacity=.06+.12*e,s.scale.setScalar(1+e*.2)}),this.dotParticles&&(this.dotParticles.material.opacity=.25+.25*e),this.wireframe&&(this.wireframe.material.opacity=.02+.04*e)}filterCategories(e){const n=this._glowLevel;this.nodeMeshes.forEach(({data:r,mat:a,glowMat:o,mesh:l,baseRadius:c})=>{const u=e.has(r.cat),h=(c||6)*2;if(u){const f=St[r.cat]||St.meta;a.color.setHex(ls(f.color)),a.opacity=.95,o.color.setHex(ls(f.color)),o.opacity=.06+.12*n,l.scale.setScalar(h)}else a.color.setHex(3815994),a.opacity=.1,o.color.setHex(3815994),o.opacity=.01,l.scale.setScalar(h*.6)});const s=new Map(this.nodeMeshes.map(r=>[r.data.id,r.data]));this.linkLines.forEach(r=>{const a=r.userData.linkData;if(!a)return;const o=typeof a.source=="string"?a.source:a.source.id,l=typeof a.target=="string"?a.target:a.target.id,c=s.get(o),u=s.get(l);r.material.opacity=c&&u&&e.has(c.cat)&&e.has(u.cat)?.07:.005})}updateTheme(e){if(this.wireframe&&this.wireframe.material.color.setHex(e?54527:1982639),this.dotParticles){const t=this.dotParticles.geometry,n=t.getAttribute("position"),s=n.count,r=[],a=cs;for(let o=0;o<s;o++){const c=(n.getY(o)/a+1)/2;e?r.push(c*0+(1-c)*168/255,c*212/255+(1-c)*85/255,1):r.push(c*30/255,c*64/255,175/255)}t.setAttribute("color",new fn(r,3))}}_updateLabels(e){const t=window.innerWidth,n=window.innerHeight;this.nodeMeshes.forEach(({mesh:s,labelEl:r})=>{if(!r||(parseFloat(r.style.opacity)||0)<.05)return;const o=s.position.clone().project(this.camera),l=(o.x*.5+.5)*t,c=(o.y*-.5+.5)*n;if(o.z>1){r.style.opacity="0";return}r.style.left=l+"px",r.style.top=c-12+"px"})}handleMouseMove(e){const n=this.renderer.domElement.getBoundingClientRect();this.mouse.x=(e.clientX-n.left)/n.width*2-1,this.mouse.y=-((e.clientY-n.top)/n.height)*2+1}handleMouseLeave(){this.mouse.set(-9999,-9999),this._handleHoverEnd()}resize(){const e=window.innerWidth,t=window.innerHeight;this.camera.aspect=e/t,this.camera.updateProjectionMatrix(),this.renderer.setSize(e,t)}dispose(){var e,t;this.animId!==null&&cancelAnimationFrame(this.animId),this._flyAnimId!==null&&cancelAnimationFrame(this._flyAnimId),this.nodeMeshes.forEach(({mesh:n,mat:s,glowMat:r,labelEl:a})=>{this.scene.remove(n),s.dispose(),r.dispose(),a.parentNode&&a.parentNode.removeChild(a)}),this.linkLines.forEach(n=>{this.scene.remove(n),n.geometry.dispose(),n.material.dispose()}),this.dotParticles&&(this.scene.remove(this.dotParticles),this.dotParticles.geometry.dispose(),this.dotParticles.material.dispose()),this.wireframe&&(this.scene.remove(this.wireframe),this.wireframe.geometry.dispose(),this.wireframe.material.dispose()),this._removeHeatmapRings(),(e=this._dotTexture)==null||e.dispose(),(t=this._glowTexture)==null||t.dispose(),this.controls.dispose(),this.renderer.dispose()}}const to={w:"w",a:"a",s:"s",d:"d",q:"q"};class nS{constructor(e,t){he(this,"camera");he(this,"controls");he(this,"state");he(this,"onFlyTo",null);he(this,"isGlobeActive",()=>!0);he(this,"isSearchActive",()=>!1);he(this,"autoRotateSetting",!0);he(this,"_boundKeyDown");he(this,"_boundKeyUp");he(this,"_boundBlur");this.camera=e,this.controls=t,this.state={keys:{w:!1,a:!1,s:!1,d:!1,q:!1,shift:!1},speed:0,maxSpeed:1,accelRate:.4,boostRate:1.2,brakeRate:1.5,friction:.3,rotX:0,rotY:0,active:!1,_wasMoving:!1},this._boundKeyDown=this.handleKeyDown.bind(this),this._boundKeyUp=this.handleKeyUp.bind(this),this._boundBlur=this.handleBlur.bind(this),window.addEventListener("keydown",this._boundKeyDown),window.addEventListener("keyup",this._boundKeyUp),window.addEventListener("blur",this._boundBlur)}handleKeyDown(e){const t=e.target;if(t.tagName==="INPUT"||t.tagName==="TEXTAREA"||!this.isGlobeActive()||this.isSearchActive())return;const n=e.key.toLowerCase();to[n]!==void 0&&(this.state.keys[to[n]]=!0,e.preventDefault()),(n==="shift"||e.shiftKey)&&(this.state.keys.shift=!0)}handleKeyUp(e){const t=e.key.toLowerCase();to[t]!==void 0&&(this.state.keys[to[t]]=!1),t==="shift"&&(this.state.keys.shift=!1)}handleBlur(){this.state.keys.w=!1,this.state.keys.a=!1,this.state.keys.s=!1,this.state.keys.d=!1,this.state.keys.q=!1,this.state.keys.shift=!1}update(e,t,n){if(this.autoRotateSetting=n,t){this.state.speed=0;return}const s=this.state;let r=0,a=0;s.keys.w&&!s.keys.s&&(r=-1),s.keys.s&&!s.keys.w&&(r=1),s.keys.a&&!s.keys.d&&(a=-1),s.keys.d&&!s.keys.a&&(a=1);const o=r!==0||a!==0;if(s.keys.q)this.state.speed=Math.max(0,this.state.speed-this.state.brakeRate*e);else if(o){const h=this.state.keys.shift?this.state.boostRate:this.state.accelRate;this.state.speed=Math.min(this.state.maxSpeed,this.state.speed+h*e)}else this.state.speed=Math.max(0,this.state.speed-this.state.friction*e);const l=5*e,c=o?r:0,u=o?a:this.state.speed>.01?this.state.rotY:0;if(this.state.rotX+=(c-this.state.rotX)*Math.min(1,l),this.state.rotY+=(u-this.state.rotY)*Math.min(1,l),this.state.speed>.001){this.controls.autoRotate=!1;const h=this.state.speed*this.state.speed*1.8*e,f=this.camera.position.clone(),m=f.clone().normalize(),g=new I(0,1,0),_=new I().crossVectors(g,m).normalize(),p=new I().crossVectors(m,_).normalize(),d=new oi().setFromAxisAngle(_,this.state.rotX*h),x=new oi().setFromAxisAngle(p,this.state.rotY*h),v=new oi().multiplyQuaternions(x,d);f.applyQuaternion(v);const M=this.camera.position.length();f.normalize().multiplyScalar(M),this.camera.position.copy(f),this.camera.lookAt(0,0,0),this.controls.target.set(0,0,0),this.controls.update()}else if(this.state.speed<=.001&&!o&&!s.keys.q&&this.state._wasMoving){this.state._wasMoving=!1,this.state.speed=0;const h=new I(0,0,hs);this.onFlyTo&&this.onFlyTo(h,hs),n&&(this.controls.autoRotate=!0)}this.state.speed>.01&&(this.state._wasMoving=!0),this.state.active=o||this.state.speed>.01}get speedKmh(){return Math.round(this.state.speed*500)}get anyKeyDown(){const e=this.state.keys;return e.w||e.a||e.s||e.d||e.q}dispose(){window.removeEventListener("keydown",this._boundKeyDown),window.removeEventListener("keyup",this._boundKeyUp),window.removeEventListener("blur",this._boundBlur)}}class iS{constructor(e){he(this,"group");he(this,"trails",[]);he(this,"enabled",!0);he(this,"scene");this.scene=e,this.group=new $r,e.add(this.group),this._buildTrails()}_buildTrails(){for(let e=0;e<vu;e++){const t=new Float32Array(xu*3),n=new rn;n.setAttribute("position",new In(t,3));const s=new Eo({color:ba[e%ba.length],transparent:!0,opacity:0,blending:Oi,depthWrite:!1}),r=new uc(n,s);r.frustumCulled=!1,this.group.add(r);const a=e/vu*Math.PI*2,o=Math.acos(2*Math.random()-1);this.trails.push({line:r,geo:n,mat:s,theta:a,phi:o,points:xu,trail:[]})}}update(e,t,n,s){if(!this.enabled){this.group.visible=!1;return}const r=Math.max(0,(t-.15)/.85),a=cs*1.02;this.trails.forEach((o,l)=>{o.theta+=(s*2.5+.3)*e*(1+t*3),o.phi+=n*1.5*e*(1+t*2),o.phi=Math.max(.2,Math.min(Math.PI-.2,o.phi));const c=a*Math.sin(o.phi)*Math.cos(o.theta),u=a*Math.cos(o.phi),h=a*Math.sin(o.phi)*Math.sin(o.theta),f=new I(c,u,h);o.trail.unshift(f),o.trail.length>o.points&&o.trail.pop();const m=o.geo.getAttribute("position");for(let g=0;g<o.points;g++)if(g<o.trail.length)m.setXYZ(g,o.trail[g].x,o.trail[g].y,o.trail[g].z);else{const _=o.trail[o.trail.length-1]??f;m.setXYZ(g,_.x,_.y,_.z)}m.needsUpdate=!0,o.geo.setDrawRange(0,o.trail.length),o.mat.color.setHex(ba[l%ba.length]),o.mat.opacity=r*(.12+.18*t)}),this.group.visible=r>.01}setEnabled(e){this.enabled=e,e||(this.group.visible=!1)}clearTrails(){this.trails.forEach(e=>{e.trail=[]})}dispose(){this.trails.forEach(e=>{e.geo.dispose(),e.mat.dispose()}),this.trails=[],this.scene.remove(this.group)}}var sS=rt('<canvas id="globe-canvas"></canvas> <div id="globe-label-container"></div>',1);function rS(i,e){Gt(e,!0);let t,n,s=null,r=null,a=null,o=!0,l=null,c=null;Do(()=>{s=new tS(t),r=new nS(s.camera,s.controls),a=new iS(s.scene),s.onNodeClick=U=>{U?(Si.set(U.id),Ea.set(U)):(Si.set(null),Ea.set(null))},s.onNodeUnlock=()=>{Si.set(null),Ea.set(null)},r.onFlyTo=(U,k)=>s==null?void 0:s.flyTo(U,k),r.isGlobeActive=()=>!0,r.isSearchActive=()=>{const U=an(Xo);return U!==null&&U.size>0};const p=Yn.subscribe(U=>{if(!s||!U.length)return;const k=an(Ji),Q=an(cr);s.updateNodes(U,k,n,Q)}),d=Ji.subscribe(U=>{if(!s)return;const k=an(Yn);if(!k.length)return;const Q=an(cr);s.updateNodes(k,U,n,Q)}),x=Xo.subscribe(U=>{s&&(U&&U.size>0?(s.search(U),r&&(r.isSearchActive=()=>!0)):(s.clearSearch(),r&&(r.isSearchActive=()=>!1)))}),v=cr.subscribe(U=>{s==null||s.updateGlow(U)}),M=po.subscribe(U=>{s==null||s.updateTheme(U==="dark")}),C=go.subscribe(U=>{s&&(s.controls.autoRotate=U),r&&(r.autoRotateSetting=U)}),A=jl.subscribe(U=>{s&&(s.controls.autoRotateSpeed=U)}),T=sa.subscribe(U=>{a&&a.setEnabled(U)}),z=Vl.subscribe(U=>{s==null||s.filterCategories(U)}),y=U=>{const k=U.detail;if(!s||!(k!=null&&k.nodeId))return;const Q=k.nodeId,D=s.nodeMeshes.find(Z=>Z.data.id===Q);if(!D)return;const W=D.mesh.position.clone().normalize().multiplyScalar(650);s.flyTo(W,650),Si.set(Q),Ea.set(D.data),s.lockedNode=D.data,s.hovered=D.data,s.controls.autoRotate=!1};document.addEventListener("kg:flyto",y),c=()=>s==null?void 0:s.resize(),window.addEventListener("resize",c);function b(U){if(l=requestAnimationFrame(b),!s)return;const k=an(go),Q=(()=>{const D=an(Xo);return D!==null&&D.size>0})();r&&(r.update(.016,Q,k),e.onwasdupdate&&e.onwasdupdate({keys:{...r.state.keys},speed:r.state.speed})),a&&r&&a.update(.016,r.state.speed,r.state.rotX,r.state.rotY),s.animate(U,{pulseEnabled:an(Yl),pulseSpeed:an($l),glowLevel:an(cr),showWireframe:an(Wl),showDots:an(Xl),showLinks:an(ql)})}return l=requestAnimationFrame(b),()=>{p(),d(),x(),v(),M(),C(),A(),T(),z(),document.removeEventListener("kg:flyto",y)}}),Dm(()=>{l!==null&&(cancelAnimationFrame(l),l=null),c&&window.removeEventListener("resize",c),s==null||s.dispose(),r==null||r.dispose(),a==null||a.dispose()});function u(p){s==null||s.handleMouseMove(p)}function h(){s==null||s.handleClick()}function f(){s==null||s.handleMouseLeave()}var m=sS(),g=Xn(m);st(g,1,"svelte-1m8ll1v",null,{},{show:o}),fo(g,p=>t=p,()=>t);var _=te(g,2);st(_,1,"svelte-1m8ll1v",null,{},{show:o}),fo(_,p=>n=p,()=>n),ze("mousemove",g,u),ze("click",g,h),Jf("mouseleave",g,f),nt(i,m),Vt()}jn(["mousemove","click"]);var aS=rt('<div id="wasd-hud"><div class="key-indicators svelte-cwwp3e"><div>W</div> <div>A</div> <div>S</div> <div>D</div> <div>Q</div> <div>&#8679;</div></div> <div class="speed-bar svelte-cwwp3e"><div class="speed-fill svelte-cwwp3e"></div></div> <span class="speed-val svelte-cwwp3e"> </span></div>');function oS(i,e){Gt(e,!0);let t=it(()=>Math.round(e.speed*500)),n=it(()=>e.speed*100),s=it(()=>e.speed>.01||e.keys.w||e.keys.a||e.keys.s||e.keys.d||e.keys.q);var r=aS();let a;var o=le(r),l=le(o);let c;var u=te(l,2);let h;var f=te(u,2);let m;var g=te(f,2);let _;var p=te(g,2);let d;var x=te(p,2);let v;var M=te(o,2),C=le(M),A=te(M,2),T=le(A);Dt(()=>{a=st(r,1,"svelte-cwwp3e",null,a,{show:P(s)}),c=st(l,1,"key-ind svelte-cwwp3e",null,c,{active:e.keys.w}),h=st(u,1,"key-ind svelte-cwwp3e",null,h,{active:e.keys.a}),m=st(f,1,"key-ind svelte-cwwp3e",null,m,{active:e.keys.s}),_=st(g,1,"key-ind svelte-cwwp3e",null,_,{active:e.keys.d}),d=st(p,1,"key-ind svelte-cwwp3e",null,d,{brake:e.keys.q,active:e.keys.q}),v=st(x,1,"key-ind svelte-cwwp3e",null,v,{boost:e.keys.shift,active:e.keys.shift}),ai(C,`width:${P(n)??""}%`),ft(T,`${P(t)??""} km/h`)}),nt(i,r),Vt()}function Vc(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}let ks=Vc();function zd(i){ks=i}const Bd=/[&<>"']/,lS=new RegExp(Bd.source,"g"),Hd=/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,cS=new RegExp(Hd.source,"g"),uS={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},tf=i=>uS[i];function yn(i,e){if(e){if(Bd.test(i))return i.replace(lS,tf)}else if(Hd.test(i))return i.replace(cS,tf);return i}const hS=/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig;function fS(i){return i.replace(hS,(e,t)=>(t=t.toLowerCase(),t==="colon"?":":t.charAt(0)==="#"?t.charAt(1)==="x"?String.fromCharCode(parseInt(t.substring(2),16)):String.fromCharCode(+t.substring(1)):""))}const dS=/(^|[^\[])\^/g;function _t(i,e){let t=typeof i=="string"?i:i.source;e=e||"";const n={replace:(s,r)=>{let a=typeof r=="string"?r:r.source;return a=a.replace(dS,"$1"),t=t.replace(s,a),n},getRegex:()=>new RegExp(t,e)};return n}function nf(i){try{i=encodeURI(i).replace(/%25/g,"%")}catch{return null}return i}const Qr={exec:()=>null};function sf(i,e){const t=i.replace(/\|/g,(r,a,o)=>{let l=!1,c=a;for(;--c>=0&&o[c]==="\\";)l=!l;return l?"|":" |"}),n=t.split(/ \|/);let s=0;if(n[0].trim()||n.shift(),n.length>0&&!n[n.length-1].trim()&&n.pop(),e)if(n.length>e)n.splice(e);else for(;n.length<e;)n.push("");for(;s<n.length;s++)n[s]=n[s].trim().replace(/\\\|/g,"|");return n}function no(i,e,t){const n=i.length;if(n===0)return"";let s=0;for(;s<n&&i.charAt(n-s-1)===e;)s++;return i.slice(0,n-s)}function pS(i,e){if(i.indexOf(e[1])===-1)return-1;let t=0;for(let n=0;n<i.length;n++)if(i[n]==="\\")n++;else if(i[n]===e[0])t++;else if(i[n]===e[1]&&(t--,t<0))return n;return-1}function rf(i,e,t,n){const s=e.href,r=e.title?yn(e.title):null,a=i[1].replace(/\\([\[\]])/g,"$1");if(i[0].charAt(0)!=="!"){n.state.inLink=!0;const o={type:"link",raw:t,href:s,title:r,text:a,tokens:n.inlineTokens(a)};return n.state.inLink=!1,o}return{type:"image",raw:t,href:s,title:r,text:yn(a)}}function mS(i,e){const t=i.match(/^(\s+)(?:```)/);if(t===null)return e;const n=t[1];return e.split(`
`).map(s=>{const r=s.match(/^\s+/);if(r===null)return s;const[a]=r;return a.length>=n.length?s.slice(n.length):s}).join(`
`)}class wo{constructor(e){he(this,"options");he(this,"rules");he(this,"lexer");this.options=e||ks}space(e){const t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){const t=this.rules.block.code.exec(e);if(t){const n=t[0].replace(/^ {1,4}/gm,"");return{type:"code",raw:t[0],codeBlockStyle:"indented",text:this.options.pedantic?n:no(n,`
`)}}}fences(e){const t=this.rules.block.fences.exec(e);if(t){const n=t[0],s=mS(n,t[3]||"");return{type:"code",raw:n,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):t[2],text:s}}}heading(e){const t=this.rules.block.heading.exec(e);if(t){let n=t[2].trim();if(/#$/.test(n)){const s=no(n,"#");(this.options.pedantic||!s||/ $/.test(s))&&(n=s.trim())}return{type:"heading",raw:t[0],depth:t[1].length,text:n,tokens:this.lexer.inline(n)}}}hr(e){const t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:t[0]}}blockquote(e){const t=this.rules.block.blockquote.exec(e);if(t){let n=t[0].replace(/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,`
    $1`);n=no(n.replace(/^ *>[ \t]?/gm,""),`
`);const s=this.lexer.state.top;this.lexer.state.top=!0;const r=this.lexer.blockTokens(n);return this.lexer.state.top=s,{type:"blockquote",raw:t[0],tokens:r,text:n}}}list(e){let t=this.rules.block.list.exec(e);if(t){let n=t[1].trim();const s=n.length>1,r={type:"list",raw:"",ordered:s,start:s?+n.slice(0,-1):"",loose:!1,items:[]};n=s?`\\d{1,9}\\${n.slice(-1)}`:`\\${n}`,this.options.pedantic&&(n=s?n:"[*+-]");const a=new RegExp(`^( {0,3}${n})((?:[	 ][^\\n]*)?(?:\\n|$))`);let o="",l="",c=!1;for(;e;){let u=!1;if(!(t=a.exec(e))||this.rules.block.hr.test(e))break;o=t[0],e=e.substring(o.length);let h=t[2].split(`
`,1)[0].replace(/^\t+/,d=>" ".repeat(3*d.length)),f=e.split(`
`,1)[0],m=0;this.options.pedantic?(m=2,l=h.trimStart()):(m=t[2].search(/[^ ]/),m=m>4?1:m,l=h.slice(m),m+=t[1].length);let g=!1;if(!h&&/^ *$/.test(f)&&(o+=f+`
`,e=e.substring(f.length+1),u=!0),!u){const d=new RegExp(`^ {0,${Math.min(3,m-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),x=new RegExp(`^ {0,${Math.min(3,m-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),v=new RegExp(`^ {0,${Math.min(3,m-1)}}(?:\`\`\`|~~~)`),M=new RegExp(`^ {0,${Math.min(3,m-1)}}#`);for(;e;){const C=e.split(`
`,1)[0];if(f=C,this.options.pedantic&&(f=f.replace(/^ {1,4}(?=( {4})*[^ ])/g,"  ")),v.test(f)||M.test(f)||d.test(f)||x.test(e))break;if(f.search(/[^ ]/)>=m||!f.trim())l+=`
`+f.slice(m);else{if(g||h.search(/[^ ]/)>=4||v.test(h)||M.test(h)||x.test(h))break;l+=`
`+f}!g&&!f.trim()&&(g=!0),o+=C+`
`,e=e.substring(C.length+1),h=f.slice(m)}}r.loose||(c?r.loose=!0:/\n *\n *$/.test(o)&&(c=!0));let _=null,p;this.options.gfm&&(_=/^\[[ xX]\] /.exec(l),_&&(p=_[0]!=="[ ] ",l=l.replace(/^\[[ xX]\] +/,""))),r.items.push({type:"list_item",raw:o,task:!!_,checked:p,loose:!1,text:l,tokens:[]}),r.raw+=o}r.items[r.items.length-1].raw=o.trimEnd(),r.items[r.items.length-1].text=l.trimEnd(),r.raw=r.raw.trimEnd();for(let u=0;u<r.items.length;u++)if(this.lexer.state.top=!1,r.items[u].tokens=this.lexer.blockTokens(r.items[u].text,[]),!r.loose){const h=r.items[u].tokens.filter(m=>m.type==="space"),f=h.length>0&&h.some(m=>/\n.*\n/.test(m.raw));r.loose=f}if(r.loose)for(let u=0;u<r.items.length;u++)r.items[u].loose=!0;return r}}html(e){const t=this.rules.block.html.exec(e);if(t)return{type:"html",block:!0,raw:t[0],pre:t[1]==="pre"||t[1]==="script"||t[1]==="style",text:t[0]}}def(e){const t=this.rules.block.def.exec(e);if(t){const n=t[1].toLowerCase().replace(/\s+/g," "),s=t[2]?t[2].replace(/^<(.*)>$/,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",r=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):t[3];return{type:"def",tag:n,raw:t[0],href:s,title:r}}}table(e){const t=this.rules.block.table.exec(e);if(!t||!/[:|]/.test(t[2]))return;const n=sf(t[1]),s=t[2].replace(/^\||\| *$/g,"").split("|"),r=t[3]&&t[3].trim()?t[3].replace(/\n[ \t]*$/,"").split(`
`):[],a={type:"table",raw:t[0],header:[],align:[],rows:[]};if(n.length===s.length){for(const o of s)/^ *-+: *$/.test(o)?a.align.push("right"):/^ *:-+: *$/.test(o)?a.align.push("center"):/^ *:-+ *$/.test(o)?a.align.push("left"):a.align.push(null);for(const o of n)a.header.push({text:o,tokens:this.lexer.inline(o)});for(const o of r)a.rows.push(sf(o,a.header.length).map(l=>({text:l,tokens:this.lexer.inline(l)})));return a}}lheading(e){const t=this.rules.block.lheading.exec(e);if(t)return{type:"heading",raw:t[0],depth:t[2].charAt(0)==="="?1:2,text:t[1],tokens:this.lexer.inline(t[1])}}paragraph(e){const t=this.rules.block.paragraph.exec(e);if(t){const n=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:n,tokens:this.lexer.inline(n)}}}text(e){const t=this.rules.block.text.exec(e);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){const t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:yn(t[1])}}tag(e){const t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&/^<a /i.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&/^<\/a>/i.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&/^<(pre|code|kbd|script)(\s|>)/i.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&/^<\/(pre|code|kbd|script)(\s|>)/i.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){const t=this.rules.inline.link.exec(e);if(t){const n=t[2].trim();if(!this.options.pedantic&&/^</.test(n)){if(!/>$/.test(n))return;const a=no(n.slice(0,-1),"\\");if((n.length-a.length)%2===0)return}else{const a=pS(t[2],"()");if(a>-1){const l=(t[0].indexOf("!")===0?5:4)+t[1].length+a;t[2]=t[2].substring(0,a),t[0]=t[0].substring(0,l).trim(),t[3]=""}}let s=t[2],r="";if(this.options.pedantic){const a=/^([^'"]*[^\s])\s+(['"])(.*)\2/.exec(s);a&&(s=a[1],r=a[3])}else r=t[3]?t[3].slice(1,-1):"";return s=s.trim(),/^</.test(s)&&(this.options.pedantic&&!/>$/.test(n)?s=s.slice(1):s=s.slice(1,-1)),rf(t,{href:s&&s.replace(this.rules.inline.anyPunctuation,"$1"),title:r&&r.replace(this.rules.inline.anyPunctuation,"$1")},t[0],this.lexer)}}reflink(e,t){let n;if((n=this.rules.inline.reflink.exec(e))||(n=this.rules.inline.nolink.exec(e))){const s=(n[2]||n[1]).replace(/\s+/g," "),r=t[s.toLowerCase()];if(!r){const a=n[0].charAt(0);return{type:"text",raw:a,text:a}}return rf(n,r,n[0],this.lexer)}}emStrong(e,t,n=""){let s=this.rules.inline.emStrongLDelim.exec(e);if(!s||s[3]&&n.match(/[\p{L}\p{N}]/u))return;if(!(s[1]||s[2]||"")||!n||this.rules.inline.punctuation.exec(n)){const a=[...s[0]].length-1;let o,l,c=a,u=0;const h=s[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(h.lastIndex=0,t=t.slice(-1*e.length+a);(s=h.exec(t))!=null;){if(o=s[1]||s[2]||s[3]||s[4]||s[5]||s[6],!o)continue;if(l=[...o].length,s[3]||s[4]){c+=l;continue}else if((s[5]||s[6])&&a%3&&!((a+l)%3)){u+=l;continue}if(c-=l,c>0)continue;l=Math.min(l,l+c+u);const f=[...s[0]][0].length,m=e.slice(0,a+s.index+f+l);if(Math.min(a,l)%2){const _=m.slice(1,-1);return{type:"em",raw:m,text:_,tokens:this.lexer.inlineTokens(_)}}const g=m.slice(2,-2);return{type:"strong",raw:m,text:g,tokens:this.lexer.inlineTokens(g)}}}}codespan(e){const t=this.rules.inline.code.exec(e);if(t){let n=t[2].replace(/\n/g," ");const s=/[^ ]/.test(n),r=/^ /.test(n)&&/ $/.test(n);return s&&r&&(n=n.substring(1,n.length-1)),n=yn(n,!0),{type:"codespan",raw:t[0],text:n}}}br(e){const t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e){const t=this.rules.inline.del.exec(e);if(t)return{type:"del",raw:t[0],text:t[2],tokens:this.lexer.inlineTokens(t[2])}}autolink(e){const t=this.rules.inline.autolink.exec(e);if(t){let n,s;return t[2]==="@"?(n=yn(t[1]),s="mailto:"+n):(n=yn(t[1]),s=n),{type:"link",raw:t[0],text:n,href:s,tokens:[{type:"text",raw:n,text:n}]}}}url(e){var n;let t;if(t=this.rules.inline.url.exec(e)){let s,r;if(t[2]==="@")s=yn(t[0]),r="mailto:"+s;else{let a;do a=t[0],t[0]=((n=this.rules.inline._backpedal.exec(t[0]))==null?void 0:n[0])??"";while(a!==t[0]);s=yn(t[0]),t[1]==="www."?r="http://"+t[0]:r=t[0]}return{type:"link",raw:t[0],text:s,href:r,tokens:[{type:"text",raw:s,text:s}]}}}inlineText(e){const t=this.rules.inline.text.exec(e);if(t){let n;return this.lexer.state.inRawBlock?n=t[0]:n=yn(t[0]),{type:"text",raw:t[0],text:n}}}}const gS=/^(?: *(?:\n|$))+/,_S=/^( {4}[^\n]+(?:\n(?: *(?:\n|$))*)?)+/,vS=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,_a=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,xS=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,Gd=/(?:[*+-]|\d{1,9}[.)])/,Vd=_t(/^(?!bull |blockCode|fences|blockquote|heading|html)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html))+?)\n {0,3}(=+|-+) *(?:\n+|$)/).replace(/bull/g,Gd).replace(/blockCode/g,/ {4}/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).getRegex(),Wc=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,yS=/^[^\n]+/,Xc=/(?!\s*\])(?:\\.|[^\[\]\\])+/,MS=_t(/^ {0,3}\[(label)\]: *(?:\n *)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n *)?| *\n *)(title))? *(?:\n+|$)/).replace("label",Xc).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),SS=_t(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,Gd).getRegex(),Fo="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",qc=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,bS=_t("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n *)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n *)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n *)+\\n|$))","i").replace("comment",qc).replace("tag",Fo).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),Wd=_t(Wc).replace("hr",_a).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Fo).getRegex(),ES=_t(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",Wd).getRegex(),Yc={blockquote:ES,code:_S,def:MS,fences:vS,heading:xS,hr:_a,html:bS,lheading:Vd,list:SS,newline:gS,paragraph:Wd,table:Qr,text:yS},af=_t("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",_a).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code"," {4}[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Fo).getRegex(),wS={...Yc,table:af,paragraph:_t(Wc).replace("hr",_a).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",af).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Fo).getRegex()},TS={...Yc,html:_t(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",qc).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:Qr,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:_t(Wc).replace("hr",_a).replace("heading",` *#{1,6} *[^
]`).replace("lheading",Vd).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},Xd=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,AS=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,qd=/^( {2,}|\\)\n(?!\s*$)/,RS=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,va="\\p{P}\\p{S}",CS=_t(/^((?![*_])[\spunctuation])/,"u").replace(/punctuation/g,va).getRegex(),PS=/\[[^[\]]*?\]\([^\(\)]*?\)|`[^`]*?`|<[^<>]*?>/g,LS=_t(/^(?:\*+(?:((?!\*)[punct])|[^\s*]))|^_+(?:((?!_)[punct])|([^\s_]))/,"u").replace(/punct/g,va).getRegex(),DS=_t("^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)[punct](\\*+)(?=[\\s]|$)|[^punct\\s](\\*+)(?!\\*)(?=[punct\\s]|$)|(?!\\*)[punct\\s](\\*+)(?=[^punct\\s])|[\\s](\\*+)(?!\\*)(?=[punct])|(?!\\*)[punct](\\*+)(?!\\*)(?=[punct])|[^punct\\s](\\*+)(?=[^punct\\s])","gu").replace(/punct/g,va).getRegex(),US=_t("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)[punct](_+)(?=[\\s]|$)|[^punct\\s](_+)(?!_)(?=[punct\\s]|$)|(?!_)[punct\\s](_+)(?=[^punct\\s])|[\\s](_+)(?!_)(?=[punct])|(?!_)[punct](_+)(?!_)(?=[punct])","gu").replace(/punct/g,va).getRegex(),IS=_t(/\\([punct])/,"gu").replace(/punct/g,va).getRegex(),NS=_t(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),OS=_t(qc).replace("(?:-->|$)","-->").getRegex(),FS=_t("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",OS).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),To=/(?:\[(?:\\.|[^\[\]\\])*\]|\\.|`[^`]*`|[^\[\]\\`])*?/,kS=_t(/^!?\[(label)\]\(\s*(href)(?:\s+(title))?\s*\)/).replace("label",To).replace("href",/<(?:\\.|[^\n<>\\])+>|[^\s\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),Yd=_t(/^!?\[(label)\]\[(ref)\]/).replace("label",To).replace("ref",Xc).getRegex(),$d=_t(/^!?\[(ref)\](?:\[\])?/).replace("ref",Xc).getRegex(),zS=_t("reflink|nolink(?!\\()","g").replace("reflink",Yd).replace("nolink",$d).getRegex(),$c={_backpedal:Qr,anyPunctuation:IS,autolink:NS,blockSkip:PS,br:qd,code:AS,del:Qr,emStrongLDelim:LS,emStrongRDelimAst:DS,emStrongRDelimUnd:US,escape:Xd,link:kS,nolink:$d,punctuation:CS,reflink:Yd,reflinkSearch:zS,tag:FS,text:RS,url:Qr},BS={...$c,link:_t(/^!?\[(label)\]\((.*?)\)/).replace("label",To).getRegex(),reflink:_t(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",To).getRegex()},dc={...$c,escape:_t(Xd).replace("])","~|])").getRegex(),url:_t(/^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/,"i").replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])([\s\S]*?[^\s~])\1(?=[^~]|$)/,text:/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/},HS={...dc,br:_t(qd).replace("{2,}","*").getRegex(),text:_t(dc.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},io={normal:Yc,gfm:wS,pedantic:TS},qr={normal:$c,gfm:dc,breaks:HS,pedantic:BS};class si{constructor(e){he(this,"tokens");he(this,"options");he(this,"state");he(this,"tokenizer");he(this,"inlineQueue");this.tokens=[],this.tokens.links=Object.create(null),this.options=e||ks,this.options.tokenizer=this.options.tokenizer||new wo,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};const t={block:io.normal,inline:qr.normal};this.options.pedantic?(t.block=io.pedantic,t.inline=qr.pedantic):this.options.gfm&&(t.block=io.gfm,this.options.breaks?t.inline=qr.breaks:t.inline=qr.gfm),this.tokenizer.rules=t}static get rules(){return{block:io,inline:qr}}static lex(e,t){return new si(t).lex(e)}static lexInline(e,t){return new si(t).inlineTokens(e)}lex(e){e=e.replace(/\r\n|\r/g,`
`),this.blockTokens(e,this.tokens);for(let t=0;t<this.inlineQueue.length;t++){const n=this.inlineQueue[t];this.inlineTokens(n.src,n.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(e,t=[]){this.options.pedantic?e=e.replace(/\t/g,"    ").replace(/^ +$/gm,""):e=e.replace(/^( *)(\t+)/gm,(o,l,c)=>l+"    ".repeat(c.length));let n,s,r,a;for(;e;)if(!(this.options.extensions&&this.options.extensions.block&&this.options.extensions.block.some(o=>(n=o.call({lexer:this},e,t))?(e=e.substring(n.raw.length),t.push(n),!0):!1))){if(n=this.tokenizer.space(e)){e=e.substring(n.raw.length),n.raw.length===1&&t.length>0?t[t.length-1].raw+=`
`:t.push(n);continue}if(n=this.tokenizer.code(e)){e=e.substring(n.raw.length),s=t[t.length-1],s&&(s.type==="paragraph"||s.type==="text")?(s.raw+=`
`+n.raw,s.text+=`
`+n.text,this.inlineQueue[this.inlineQueue.length-1].src=s.text):t.push(n);continue}if(n=this.tokenizer.fences(e)){e=e.substring(n.raw.length),t.push(n);continue}if(n=this.tokenizer.heading(e)){e=e.substring(n.raw.length),t.push(n);continue}if(n=this.tokenizer.hr(e)){e=e.substring(n.raw.length),t.push(n);continue}if(n=this.tokenizer.blockquote(e)){e=e.substring(n.raw.length),t.push(n);continue}if(n=this.tokenizer.list(e)){e=e.substring(n.raw.length),t.push(n);continue}if(n=this.tokenizer.html(e)){e=e.substring(n.raw.length),t.push(n);continue}if(n=this.tokenizer.def(e)){e=e.substring(n.raw.length),s=t[t.length-1],s&&(s.type==="paragraph"||s.type==="text")?(s.raw+=`
`+n.raw,s.text+=`
`+n.raw,this.inlineQueue[this.inlineQueue.length-1].src=s.text):this.tokens.links[n.tag]||(this.tokens.links[n.tag]={href:n.href,title:n.title});continue}if(n=this.tokenizer.table(e)){e=e.substring(n.raw.length),t.push(n);continue}if(n=this.tokenizer.lheading(e)){e=e.substring(n.raw.length),t.push(n);continue}if(r=e,this.options.extensions&&this.options.extensions.startBlock){let o=1/0;const l=e.slice(1);let c;this.options.extensions.startBlock.forEach(u=>{c=u.call({lexer:this},l),typeof c=="number"&&c>=0&&(o=Math.min(o,c))}),o<1/0&&o>=0&&(r=e.substring(0,o+1))}if(this.state.top&&(n=this.tokenizer.paragraph(r))){s=t[t.length-1],a&&s.type==="paragraph"?(s.raw+=`
`+n.raw,s.text+=`
`+n.text,this.inlineQueue.pop(),this.inlineQueue[this.inlineQueue.length-1].src=s.text):t.push(n),a=r.length!==e.length,e=e.substring(n.raw.length);continue}if(n=this.tokenizer.text(e)){e=e.substring(n.raw.length),s=t[t.length-1],s&&s.type==="text"?(s.raw+=`
`+n.raw,s.text+=`
`+n.text,this.inlineQueue.pop(),this.inlineQueue[this.inlineQueue.length-1].src=s.text):t.push(n);continue}if(e){const o="Infinite loop on byte: "+e.charCodeAt(0);if(this.options.silent){console.error(o);break}else throw new Error(o)}}return this.state.top=!0,t}inline(e,t=[]){return this.inlineQueue.push({src:e,tokens:t}),t}inlineTokens(e,t=[]){let n,s,r,a=e,o,l,c;if(this.tokens.links){const u=Object.keys(this.tokens.links);if(u.length>0)for(;(o=this.tokenizer.rules.inline.reflinkSearch.exec(a))!=null;)u.includes(o[0].slice(o[0].lastIndexOf("[")+1,-1))&&(a=a.slice(0,o.index)+"["+"a".repeat(o[0].length-2)+"]"+a.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(o=this.tokenizer.rules.inline.blockSkip.exec(a))!=null;)a=a.slice(0,o.index)+"["+"a".repeat(o[0].length-2)+"]"+a.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);for(;(o=this.tokenizer.rules.inline.anyPunctuation.exec(a))!=null;)a=a.slice(0,o.index)+"++"+a.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);for(;e;)if(l||(c=""),l=!1,!(this.options.extensions&&this.options.extensions.inline&&this.options.extensions.inline.some(u=>(n=u.call({lexer:this},e,t))?(e=e.substring(n.raw.length),t.push(n),!0):!1))){if(n=this.tokenizer.escape(e)){e=e.substring(n.raw.length),t.push(n);continue}if(n=this.tokenizer.tag(e)){e=e.substring(n.raw.length),s=t[t.length-1],s&&n.type==="text"&&s.type==="text"?(s.raw+=n.raw,s.text+=n.text):t.push(n);continue}if(n=this.tokenizer.link(e)){e=e.substring(n.raw.length),t.push(n);continue}if(n=this.tokenizer.reflink(e,this.tokens.links)){e=e.substring(n.raw.length),s=t[t.length-1],s&&n.type==="text"&&s.type==="text"?(s.raw+=n.raw,s.text+=n.text):t.push(n);continue}if(n=this.tokenizer.emStrong(e,a,c)){e=e.substring(n.raw.length),t.push(n);continue}if(n=this.tokenizer.codespan(e)){e=e.substring(n.raw.length),t.push(n);continue}if(n=this.tokenizer.br(e)){e=e.substring(n.raw.length),t.push(n);continue}if(n=this.tokenizer.del(e)){e=e.substring(n.raw.length),t.push(n);continue}if(n=this.tokenizer.autolink(e)){e=e.substring(n.raw.length),t.push(n);continue}if(!this.state.inLink&&(n=this.tokenizer.url(e))){e=e.substring(n.raw.length),t.push(n);continue}if(r=e,this.options.extensions&&this.options.extensions.startInline){let u=1/0;const h=e.slice(1);let f;this.options.extensions.startInline.forEach(m=>{f=m.call({lexer:this},h),typeof f=="number"&&f>=0&&(u=Math.min(u,f))}),u<1/0&&u>=0&&(r=e.substring(0,u+1))}if(n=this.tokenizer.inlineText(r)){e=e.substring(n.raw.length),n.raw.slice(-1)!=="_"&&(c=n.raw.slice(-1)),l=!0,s=t[t.length-1],s&&s.type==="text"?(s.raw+=n.raw,s.text+=n.text):t.push(n);continue}if(e){const u="Infinite loop on byte: "+e.charCodeAt(0);if(this.options.silent){console.error(u);break}else throw new Error(u)}}return t}}class Ao{constructor(e){he(this,"options");this.options=e||ks}code(e,t,n){var r;const s=(r=(t||"").match(/^\S*/))==null?void 0:r[0];return e=e.replace(/\n$/,"")+`
`,s?'<pre><code class="language-'+yn(s)+'">'+(n?e:yn(e,!0))+`</code></pre>
`:"<pre><code>"+(n?e:yn(e,!0))+`</code></pre>
`}blockquote(e){return`<blockquote>
${e}</blockquote>
`}html(e,t){return e}heading(e,t,n){return`<h${t}>${e}</h${t}>
`}hr(){return`<hr>
`}list(e,t,n){const s=t?"ol":"ul",r=t&&n!==1?' start="'+n+'"':"";return"<"+s+r+`>
`+e+"</"+s+`>
`}listitem(e,t,n){return`<li>${e}</li>
`}checkbox(e){return"<input "+(e?'checked="" ':"")+'disabled="" type="checkbox">'}paragraph(e){return`<p>${e}</p>
`}table(e,t){return t&&(t=`<tbody>${t}</tbody>`),`<table>
<thead>
`+e+`</thead>
`+t+`</table>
`}tablerow(e){return`<tr>
${e}</tr>
`}tablecell(e,t){const n=t.header?"th":"td";return(t.align?`<${n} align="${t.align}">`:`<${n}>`)+e+`</${n}>
`}strong(e){return`<strong>${e}</strong>`}em(e){return`<em>${e}</em>`}codespan(e){return`<code>${e}</code>`}br(){return"<br>"}del(e){return`<del>${e}</del>`}link(e,t,n){const s=nf(e);if(s===null)return n;e=s;let r='<a href="'+e+'"';return t&&(r+=' title="'+t+'"'),r+=">"+n+"</a>",r}image(e,t,n){const s=nf(e);if(s===null)return n;e=s;let r=`<img src="${e}" alt="${n}"`;return t&&(r+=` title="${t}"`),r+=">",r}text(e){return e}}class jc{strong(e){return e}em(e){return e}codespan(e){return e}del(e){return e}html(e){return e}text(e){return e}link(e,t,n){return""+n}image(e,t,n){return""+n}br(){return""}}class ri{constructor(e){he(this,"options");he(this,"renderer");he(this,"textRenderer");this.options=e||ks,this.options.renderer=this.options.renderer||new Ao,this.renderer=this.options.renderer,this.renderer.options=this.options,this.textRenderer=new jc}static parse(e,t){return new ri(t).parse(e)}static parseInline(e,t){return new ri(t).parseInline(e)}parse(e,t=!0){let n="";for(let s=0;s<e.length;s++){const r=e[s];if(this.options.extensions&&this.options.extensions.renderers&&this.options.extensions.renderers[r.type]){const a=r,o=this.options.extensions.renderers[a.type].call({parser:this},a);if(o!==!1||!["space","hr","heading","code","table","blockquote","list","html","paragraph","text"].includes(a.type)){n+=o||"";continue}}switch(r.type){case"space":continue;case"hr":{n+=this.renderer.hr();continue}case"heading":{const a=r;n+=this.renderer.heading(this.parseInline(a.tokens),a.depth,fS(this.parseInline(a.tokens,this.textRenderer)));continue}case"code":{const a=r;n+=this.renderer.code(a.text,a.lang,!!a.escaped);continue}case"table":{const a=r;let o="",l="";for(let u=0;u<a.header.length;u++)l+=this.renderer.tablecell(this.parseInline(a.header[u].tokens),{header:!0,align:a.align[u]});o+=this.renderer.tablerow(l);let c="";for(let u=0;u<a.rows.length;u++){const h=a.rows[u];l="";for(let f=0;f<h.length;f++)l+=this.renderer.tablecell(this.parseInline(h[f].tokens),{header:!1,align:a.align[f]});c+=this.renderer.tablerow(l)}n+=this.renderer.table(o,c);continue}case"blockquote":{const a=r,o=this.parse(a.tokens);n+=this.renderer.blockquote(o);continue}case"list":{const a=r,o=a.ordered,l=a.start,c=a.loose;let u="";for(let h=0;h<a.items.length;h++){const f=a.items[h],m=f.checked,g=f.task;let _="";if(f.task){const p=this.renderer.checkbox(!!m);c?f.tokens.length>0&&f.tokens[0].type==="paragraph"?(f.tokens[0].text=p+" "+f.tokens[0].text,f.tokens[0].tokens&&f.tokens[0].tokens.length>0&&f.tokens[0].tokens[0].type==="text"&&(f.tokens[0].tokens[0].text=p+" "+f.tokens[0].tokens[0].text)):f.tokens.unshift({type:"text",text:p+" "}):_+=p+" "}_+=this.parse(f.tokens,c),u+=this.renderer.listitem(_,g,!!m)}n+=this.renderer.list(u,o,l);continue}case"html":{const a=r;n+=this.renderer.html(a.text,a.block);continue}case"paragraph":{const a=r;n+=this.renderer.paragraph(this.parseInline(a.tokens));continue}case"text":{let a=r,o=a.tokens?this.parseInline(a.tokens):a.text;for(;s+1<e.length&&e[s+1].type==="text";)a=e[++s],o+=`
`+(a.tokens?this.parseInline(a.tokens):a.text);n+=t?this.renderer.paragraph(o):o;continue}default:{const a='Token with "'+r.type+'" type was not found.';if(this.options.silent)return console.error(a),"";throw new Error(a)}}}return n}parseInline(e,t){t=t||this.renderer;let n="";for(let s=0;s<e.length;s++){const r=e[s];if(this.options.extensions&&this.options.extensions.renderers&&this.options.extensions.renderers[r.type]){const a=this.options.extensions.renderers[r.type].call({parser:this},r);if(a!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(r.type)){n+=a||"";continue}}switch(r.type){case"escape":{const a=r;n+=t.text(a.text);break}case"html":{const a=r;n+=t.html(a.text);break}case"link":{const a=r;n+=t.link(a.href,a.title,this.parseInline(a.tokens,t));break}case"image":{const a=r;n+=t.image(a.href,a.title,a.text);break}case"strong":{const a=r;n+=t.strong(this.parseInline(a.tokens,t));break}case"em":{const a=r;n+=t.em(this.parseInline(a.tokens,t));break}case"codespan":{const a=r;n+=t.codespan(a.text);break}case"br":{n+=t.br();break}case"del":{const a=r;n+=t.del(this.parseInline(a.tokens,t));break}case"text":{const a=r;n+=t.text(a.text);break}default:{const a='Token with "'+r.type+'" type was not found.';if(this.options.silent)return console.error(a),"";throw new Error(a)}}}return n}}class ea{constructor(e){he(this,"options");this.options=e||ks}preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}}he(ea,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens"]));var Is,pc,jd;class GS{constructor(...e){et(this,Is);he(this,"defaults",Vc());he(this,"options",this.setOptions);he(this,"parse",wt(this,Is,pc).call(this,si.lex,ri.parse));he(this,"parseInline",wt(this,Is,pc).call(this,si.lexInline,ri.parseInline));he(this,"Parser",ri);he(this,"Renderer",Ao);he(this,"TextRenderer",jc);he(this,"Lexer",si);he(this,"Tokenizer",wo);he(this,"Hooks",ea);this.use(...e)}walkTokens(e,t){var s,r;let n=[];for(const a of e)switch(n=n.concat(t.call(this,a)),a.type){case"table":{const o=a;for(const l of o.header)n=n.concat(this.walkTokens(l.tokens,t));for(const l of o.rows)for(const c of l)n=n.concat(this.walkTokens(c.tokens,t));break}case"list":{const o=a;n=n.concat(this.walkTokens(o.items,t));break}default:{const o=a;(r=(s=this.defaults.extensions)==null?void 0:s.childTokens)!=null&&r[o.type]?this.defaults.extensions.childTokens[o.type].forEach(l=>{const c=o[l].flat(1/0);n=n.concat(this.walkTokens(c,t))}):o.tokens&&(n=n.concat(this.walkTokens(o.tokens,t)))}}return n}use(...e){const t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(n=>{const s={...n};if(s.async=this.defaults.async||s.async||!1,n.extensions&&(n.extensions.forEach(r=>{if(!r.name)throw new Error("extension name required");if("renderer"in r){const a=t.renderers[r.name];a?t.renderers[r.name]=function(...o){let l=r.renderer.apply(this,o);return l===!1&&(l=a.apply(this,o)),l}:t.renderers[r.name]=r.renderer}if("tokenizer"in r){if(!r.level||r.level!=="block"&&r.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");const a=t[r.level];a?a.unshift(r.tokenizer):t[r.level]=[r.tokenizer],r.start&&(r.level==="block"?t.startBlock?t.startBlock.push(r.start):t.startBlock=[r.start]:r.level==="inline"&&(t.startInline?t.startInline.push(r.start):t.startInline=[r.start]))}"childTokens"in r&&r.childTokens&&(t.childTokens[r.name]=r.childTokens)}),s.extensions=t),n.renderer){const r=this.defaults.renderer||new Ao(this.defaults);for(const a in n.renderer){if(!(a in r))throw new Error(`renderer '${a}' does not exist`);if(a==="options")continue;const o=a,l=n.renderer[o],c=r[o];r[o]=(...u)=>{let h=l.apply(r,u);return h===!1&&(h=c.apply(r,u)),h||""}}s.renderer=r}if(n.tokenizer){const r=this.defaults.tokenizer||new wo(this.defaults);for(const a in n.tokenizer){if(!(a in r))throw new Error(`tokenizer '${a}' does not exist`);if(["options","rules","lexer"].includes(a))continue;const o=a,l=n.tokenizer[o],c=r[o];r[o]=(...u)=>{let h=l.apply(r,u);return h===!1&&(h=c.apply(r,u)),h}}s.tokenizer=r}if(n.hooks){const r=this.defaults.hooks||new ea;for(const a in n.hooks){if(!(a in r))throw new Error(`hook '${a}' does not exist`);if(a==="options")continue;const o=a,l=n.hooks[o],c=r[o];ea.passThroughHooks.has(a)?r[o]=u=>{if(this.defaults.async)return Promise.resolve(l.call(r,u)).then(f=>c.call(r,f));const h=l.call(r,u);return c.call(r,h)}:r[o]=(...u)=>{let h=l.apply(r,u);return h===!1&&(h=c.apply(r,u)),h}}s.hooks=r}if(n.walkTokens){const r=this.defaults.walkTokens,a=n.walkTokens;s.walkTokens=function(o){let l=[];return l.push(a.call(this,o)),r&&(l=l.concat(r.call(this,o))),l}}this.defaults={...this.defaults,...s}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return si.lex(e,t??this.defaults)}parser(e,t){return ri.parse(e,t??this.defaults)}}Is=new WeakSet,pc=function(e,t){return(n,s)=>{const r={...s},a={...this.defaults,...r};this.defaults.async===!0&&r.async===!1&&(a.silent||console.warn("marked(): The async option was set to true by an extension. The async: false option sent to parse will be ignored."),a.async=!0);const o=wt(this,Is,jd).call(this,!!a.silent,!!a.async);if(typeof n>"u"||n===null)return o(new Error("marked(): input parameter is undefined or null"));if(typeof n!="string")return o(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(n)+", string expected"));if(a.hooks&&(a.hooks.options=a),a.async)return Promise.resolve(a.hooks?a.hooks.preprocess(n):n).then(l=>e(l,a)).then(l=>a.hooks?a.hooks.processAllTokens(l):l).then(l=>a.walkTokens?Promise.all(this.walkTokens(l,a.walkTokens)).then(()=>l):l).then(l=>t(l,a)).then(l=>a.hooks?a.hooks.postprocess(l):l).catch(o);try{a.hooks&&(n=a.hooks.preprocess(n));let l=e(n,a);a.hooks&&(l=a.hooks.processAllTokens(l)),a.walkTokens&&this.walkTokens(l,a.walkTokens);let c=t(l,a);return a.hooks&&(c=a.hooks.postprocess(c)),c}catch(l){return o(l)}}},jd=function(e,t){return n=>{if(n.message+=`
Please report this to https://github.com/markedjs/marked.`,e){const s="<p>An error occurred:</p><pre>"+yn(n.message+"",!0)+"</pre>";return t?Promise.resolve(s):s}if(t)return Promise.reject(n);throw n}};const Us=new GS;function dt(i,e){return Us.parse(i,e)}dt.options=dt.setOptions=function(i){return Us.setOptions(i),dt.defaults=Us.defaults,zd(dt.defaults),dt};dt.getDefaults=Vc;dt.defaults=ks;dt.use=function(...i){return Us.use(...i),dt.defaults=Us.defaults,zd(dt.defaults),dt};dt.walkTokens=function(i,e){return Us.walkTokens(i,e)};dt.parseInline=Us.parseInline;dt.Parser=ri;dt.parser=ri.parse;dt.Renderer=Ao;dt.TextRenderer=jc;dt.Lexer=si;dt.lexer=si.lex;dt.Tokenizer=wo;dt.Hooks=ea;dt.parse=dt;dt.options;dt.setOptions;dt.use;dt.walkTokens;dt.parseInline;ri.parse;si.lex;var VS=rt('<div id="preview-overlay"><div id="preview-box" class="svelte-vqphcb"><div id="preview-header" class="svelte-vqphcb"><div><span id="preview-title" class="svelte-vqphcb">PREVIEW</span> <span id="preview-file" class="svelte-vqphcb"> </span></div> <button id="preview-close" class="svelte-vqphcb">ESC Close</button></div> <div id="preview-toolbar" class="svelte-vqphcb"><div class="preview-tool-group svelte-vqphcb"><span class="preview-tool-label svelte-vqphcb">Width</span> <input type="range" id="preview-width-slider" min="50" max="100" step="5" title="Popup width ([ ] keys to step)" class="svelte-vqphcb"/> <span id="preview-width-val" class="svelte-vqphcb"> </span></div> <div id="preview-search-wrap" class="svelte-vqphcb"><input type="text" id="preview-search" placeholder="Search in document..." class="svelte-vqphcb"/> <button id="preview-search-clear">&times;</button></div> <span id="preview-search-count" class="svelte-vqphcb"> </span></div> <div id="preview-content" class="svelte-vqphcb"></div></div></div>');function WS(i,e){Gt(e,!0);let t=Ce(!1),n=Ce(null),s=Ce(80),r=Ce("");pt(()=>{const H=Lc.subscribe(xe=>{pe(t,xe,!0)}),oe=Dc.subscribe(xe=>{pe(n,xe,!0)}),de=Kl.subscribe(xe=>{pe(s,xe,!0)}),ge=oo.subscribe(xe=>{pe(r,xe,!0)});return()=>{H(),oe(),de(),ge()}});let a=Ce(""),o=Ce(null);pt(()=>{if(!P(n)){pe(a,"");return}try{pe(a,dt.parse(P(n).preview??"*No content available*"),!0)}catch{pe(a,"<pre>"+v(P(n).preview??"No content")+"</pre>")}}),pt(()=>{P(o)&&(P(o).innerHTML=P(a),P(o).scrollTop=0,_())}),pt(()=>{document.documentElement.style.setProperty("--preview-w",P(s)+"%")});let l=null,c=Ce(-1),u=Ce(""),h=Ce("");function f(H){if(pe(h,H,!0),oo.set(H),!P(o))return;if(P(o).innerHTML=P(a),l=null,pe(c,-1),!H){pe(u,"");return}const oe=H.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),de=new RegExp(oe,"gi"),ge=document.createTreeWalker(P(o),NodeFilter.SHOW_TEXT,null),xe=[];for(;ge.nextNode();)xe.push(ge.currentNode);let Ae=0;xe.forEach(Ee=>{const Ue=Ee.nodeValue??"";if(!de.test(Ue))return;de.lastIndex=0;const B=document.createDocumentFragment();let ut=0,we;for(;(we=de.exec(Ue))!==null;){we.index>ut&&B.appendChild(document.createTextNode(Ue.slice(ut,we.index)));const Oe=document.createElement("mark");Oe.textContent=we[0],Oe.dataset.matchIdx=String(Ae++),B.appendChild(Oe),ut=de.lastIndex}ut<Ue.length&&B.appendChild(document.createTextNode(Ue.slice(ut))),Ee.parentNode.replaceChild(B,Ee)}),l=P(o).querySelectorAll("mark"),pe(u,Ae>0?`${Ae} found`:"No matches",!0),l.length>0&&(pe(c,0),m(0))}function m(H){if(!l||l.length===0)return;l.forEach(de=>de.classList.remove("current"));const oe=l[H];oe&&(oe.classList.add("current"),oe.scrollIntoView({behavior:"smooth",block:"center"}))}function g(H){H.key==="Enter"&&(!l||l.length===0||(H.preventDefault(),pe(c,(P(c)+1)%l.length),m(P(c)),pe(u,`${P(c)+1} / ${l.length}`)))}function _(){pe(h,""),pe(u,""),l=null,pe(c,-1),oo.set(""),P(o)&&(P(o).innerHTML=P(a))}function p(H){const oe=Math.max(50,Math.min(100,H));Kl.set(oe)}function d(H){p(parseInt(H.target.value,10))}function x(H){if(!P(t))return;const oe=H.target.tagName;oe==="INPUT"||oe==="TEXTAREA"||(H.key==="Escape"?(H.preventDefault(),wa()):H.key==="["?(H.preventDefault(),p(P(s)-5)):H.key==="]"&&(H.preventDefault(),p(P(s)+5)))}function v(H){return H.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}var M=VS();Jf("keydown",Df,x);let C;var A=le(M),T=le(A),z=le(T),y=te(le(z),2),b=le(y),U=te(z,2),k=te(T,2),Q=le(k),D=te(le(Q),2),O=te(D,2),W=le(O),Z=te(Q,2),$=le(Z),j=te($,2);let Y;var ie=te(Z,2),ee=le(ie),G=te(k,2);fo(G,H=>pe(o,H),()=>P(o)),Dt(()=>{var H;C=st(M,1,"svelte-vqphcb",null,C,{show:P(t)}),ai(A,`width:${P(s)??""}%`),ft(b,((H=P(n))==null?void 0:H.file)??""),bs(D,P(s)),ft(W,`${P(s)??""}%`),bs($,P(h)),Y=st(j,1,"svelte-vqphcb",null,Y,{show:P(h).length>0}),ft(ee,P(u))}),ze("click",U,function(...H){wa==null||wa.apply(this,H)}),ze("input",D,d),ze("input",$,H=>f(H.target.value.trim())),ze("keydown",$,g),ze("click",j,()=>{var H;_(),(H=document.getElementById("preview-search"))==null||H.focus()}),nt(i,M),Vt()}jn(["click","input","keydown"]);var XS=rt("<!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!>",1),qS=rt("<!> <!> <!> <!>",1);function YS(i,e){Gt(e,!0);let t=Ce(!1),n=Ce(!1),s=Ce(Tt({w:!1,a:!1,s:!1,d:!1,q:!1,shift:!1})),r=Ce(0);pt(()=>po.subscribe(p=>{document.documentElement.dataset.theme=p})),Do(async()=>{await Nm(),pe(t,!0)});function a(){pe(n,!0)}function o(){pe(n,!1)}function l(_){pe(s,_.keys,!0),pe(r,_.speed,!0)}var c=qS(),u=Xn(c);km(u);var h=te(u,2);qm(h,{});var f=te(h,2);Bm(f);var m=te(f,2);{var g=_=>{var p=XS(),d=Xn(p);rS(d,{onwasdupdate:l});var x=te(d,2);$m(x,{});var v=te(x,2);Km(v,{});var M=te(v,2);Jm(M,{});var C=te(M,2);ig(C,{onwasdguide:a});var A=te(C,2);eg(A,{});var T=te(A,2);ag(T,{});var z=te(T,2);lg(z,{});var y=te(z,2);xg(y,{});var b=te(y,2);bg(b,{});var U=te(b,2);Ug(U,{});var k=te(U,2);oS(k,{get keys(){return P(s)},get speed(){return P(r)}});var Q=te(k,2);td(Q,{get visible(){return P(n)},get keys(){return P(s)},onclose:o});var D=te(Q,2);WS(D,{}),nt(_,p)};Mi(m,_=>{P(t)&&_(g)})}nt(i,c),Vt()}pm(YS,{target:document.getElementById("app")});

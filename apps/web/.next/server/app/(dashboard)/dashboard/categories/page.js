(()=>{var e={};e.id=5312,e.ids=[5312],e.modules={47849:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external")},72934:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external.js")},55403:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external")},54580:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external.js")},94749:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external")},45869:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},20399:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},86809:(e,t,a)=>{"use strict";a.r(t),a.d(t,{GlobalError:()=>i.a,__next_app__:()=>h,originalPathname:()=>p,pages:()=>c,routeModule:()=>x,tree:()=>n});var s=a(59441),r=a(1498),l=a(6580),i=a.n(l),o=a(15511),d={};for(let e in o)0>["default","tree","pages","GlobalError","originalPathname","__next_app__","routeModule"].indexOf(e)&&(d[e]=()=>o[e]);a.d(t,d);let n=["",{children:["(dashboard)",{children:["dashboard",{children:["categories",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(a.bind(a,78238)),"/Applications/XAMPP/xamppfiles/htdocs/bazar/apps/web/src/app/(dashboard)/dashboard/categories/page.tsx"]}]},{}]},{}]},{layout:[()=>Promise.resolve().then(a.bind(a,41097)),"/Applications/XAMPP/xamppfiles/htdocs/bazar/apps/web/src/app/(dashboard)/layout.tsx"],loading:[()=>Promise.resolve().then(a.bind(a,17112)),"/Applications/XAMPP/xamppfiles/htdocs/bazar/apps/web/src/app/(dashboard)/loading.tsx"]}]},{layout:[()=>Promise.resolve().then(a.bind(a,38205)),"/Applications/XAMPP/xamppfiles/htdocs/bazar/apps/web/src/app/layout.tsx"],error:[()=>Promise.resolve().then(a.bind(a,61530)),"/Applications/XAMPP/xamppfiles/htdocs/bazar/apps/web/src/app/error.tsx"],"not-found":[()=>Promise.resolve().then(a.bind(a,77123)),"/Applications/XAMPP/xamppfiles/htdocs/bazar/apps/web/src/app/not-found.tsx"]}],c=["/Applications/XAMPP/xamppfiles/htdocs/bazar/apps/web/src/app/(dashboard)/dashboard/categories/page.tsx"],p="/(dashboard)/dashboard/categories/page",h={require:a,loadChunk:()=>Promise.resolve()},x=new s.AppPageRouteModule({definition:{kind:r.x.APP_PAGE,page:"/(dashboard)/dashboard/categories/page",pathname:"/dashboard/categories",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:n}})},47821:(e,t,a)=>{Promise.resolve().then(a.bind(a,84377))},84377:(e,t,a)=>{"use strict";a.r(t),a.d(t,{default:()=>v});var s=a(27685),r=a(83810),l=a(39881),i=a(50436),o=a(10532),d=a(87850),n=a(60461),c=a(63197),p=a(54654),h=a(14150),x=a(35943),u=a(22295),y=a(34034),m=a(51620),f=a(13161),b=a(10828);let g={p:"#432E54",a:"#AE445A",border:"#E8BCB9",bg:"#F5F0FA",soft:"#FFF0EB"};function k(e){return e.trim().toLowerCase().replace(/\s+/g,"-").replace(/[^\w؀-ۿ-]/g,"")}function v(){let e=(0,y.t)(e=>e.user?.plan)??"FREE",t=(0,m.zZ)(e,"categories")??3,[a,v]=(0,r.useState)([]),[j,Z]=(0,r.useState)(!0),[w,M]=(0,r.useState)(""),[N,P]=(0,r.useState)(!1),A=(0,r.useRef)(null),[C,z]=(0,r.useState)(null),[S,E]=(0,r.useState)(""),[q,$]=(0,r.useState)(null),[_,L]=(0,r.useState)(null);(0,r.useEffect)(()=>{(0,b.K)("categories")},[]),(0,r.useEffect)(()=>{l.hi.get("/api/categories").then(e=>v(e.data??[])).catch(()=>i.toast.error("فشل تحميل التصنيفات")).finally(()=>Z(!1))},[]);let F=async()=>{let e=w.trim();if(e){if(a.length>=t){i.toast.error(`وصلت للحد الأقصى (${t} تصنيفات) في باقتك الحالية`);return}P(!0);try{let t=await l.hi.post("/api/categories",{name:e,slug:k(e)});v(e=>[...e,t.data].sort((e,t)=>e.name.localeCompare(t.name,"ar"))),M(""),A.current?.focus(),i.toast.success(`تم إضافة "${e}"`),(0,b.j)({event:"category_added"})}catch(e){i.toast.error(e instanceof Error?e.message:"فشل إضافة التصنيف")}finally{P(!1)}}},R=e=>{z(e.id),E(e.name)},X=()=>{z(null),E("")},V=async e=>{let t=S.trim();if(t){$(e);try{await l.hi.patch(`/api/categories/${e}`,{name:t}),v(a=>a.map(a=>a.id===e?{...a,name:t,slug:k(t)}:a).sort((e,t)=>e.name.localeCompare(t.name,"ar"))),z(null),i.toast.success("تم تحديث التصنيف")}catch(e){i.toast.error(e instanceof Error?e.message:"فشل التحديث")}finally{$(null)}}},B=async e=>{if(confirm(`حذف تصنيف "${e.name}"؟ ستُزال من جميع المنتجات المرتبطة به.`)){L(e.id);try{await l.hi.delete(`/api/categories/${e.id}`),v(t=>t.filter(t=>t.id!==e.id)),i.toast.success(`تم حذف "${e.name}"`)}catch{i.toast.error("فشل حذف التصنيف")}finally{L(null)}}};if(j)return s.jsx("div",{className:"p-8 space-y-4",children:[1,2,3].map(e=>s.jsx("div",{className:"h-14 rounded-2xl animate-pulse",style:{background:"#E8E0F0"}},e))});let H=a.length>=t;return(0,s.jsxs)("div",{className:"p-6 max-w-2xl mx-auto",dir:"rtl",children:[(0,s.jsxs)("div",{className:"flex items-center gap-3 mb-6",children:[s.jsx("div",{className:"w-10 h-10 rounded-2xl flex items-center justify-center",style:{background:`${g.a}15`},children:s.jsx(o.Z,{className:"h-5 w-5",style:{color:g.a}})}),(0,s.jsxs)("div",{children:[s.jsx("h1",{className:"text-xl font-bold",style:{color:g.p},children:"التصنيفات"}),s.jsx("p",{className:"text-sm text-gray-500",children:"تظهر في رأس متجرك وتُستخدم لتصنيف منتجاتك"})]}),(0,s.jsxs)("div",{className:"mr-auto flex items-center gap-2",children:[(0,s.jsxs)("span",{className:"text-sm font-semibold px-3 py-1 rounded-full",style:{background:g.bg,color:g.p},children:[a.length," / ",t]}),"FREE"===e&&s.jsx(f.default,{href:"/dashboard/upgrade",className:"text-xs font-bold px-3 py-1.5 rounded-xl text-white transition hover:opacity-90",style:{background:`linear-gradient(135deg, #7C3AED, ${g.a})`},children:"زيادة الحد"})]})]}),(0,s.jsxs)("div",{className:"rounded-2xl p-4 mb-6 text-sm leading-relaxed",style:{background:g.soft,border:`1px solid ${g.border}`},children:[s.jsx("p",{className:"font-semibold mb-1",style:{color:g.p},children:"كيف تعمل التصنيفات؟"}),(0,s.jsxs)("ul",{className:"space-y-1 text-gray-600 list-disc list-inside text-xs",children:[s.jsx("li",{children:"تظهر التصنيفات كأزرار فلترة تحت شريط التنقل في متجرك"}),s.jsx("li",{children:"عند إضافة منتج يمكنك اختيار تصنيف له — يظهر كـ tag عليه"}),s.jsx("li",{children:"يستطيع الزبون الضغط على التصنيف لعرض منتجاته فقط"})]})]}),(0,s.jsxs)("div",{className:"rounded-2xl p-5 mb-4",style:{background:"#fff",border:`1.5px solid ${g.border}`,boxShadow:"0 2px 12px rgba(67,46,84,.06)"},children:[s.jsx("p",{className:"text-sm font-bold mb-3",style:{color:g.p},children:"إضافة تصنيف جديد"}),(0,s.jsxs)("div",{className:"flex gap-2",children:[s.jsx("input",{ref:A,value:w,onChange:e=>M(e.target.value),onKeyDown:e=>"Enter"===e.key&&F(),placeholder:"مثال: فساتين سهرة، سكين كير، ألعاب PS5…",disabled:H||N,style:{flex:1,padding:"11px 14px",borderRadius:12,border:`1.5px solid ${g.border}`,fontSize:14,outline:"none",fontFamily:"inherit",background:H?"#fafafa":"#fff",color:"#1C0E2E",transition:"border-color .2s"},onFocus:e=>{e.target.style.borderColor=g.a},onBlur:e=>{e.target.style.borderColor=g.border}}),(0,s.jsxs)("button",{onClick:F,disabled:!w.trim()||H||N,style:{display:"flex",alignItems:"center",gap:6,padding:"11px 18px",borderRadius:12,border:"none",cursor:!w.trim()||H||N?"not-allowed":"pointer",background:!w.trim()||H||N?"#e5e7eb":`linear-gradient(135deg, ${g.p}, ${g.a})`,color:!w.trim()||H||N?"#9ca3af":"#fff",fontSize:14,fontWeight:700,fontFamily:"inherit",transition:"all .2s"},children:[N?s.jsx(d.Z,{className:"h-4 w-4 animate-spin"}):s.jsx(n.Z,{className:"h-4 w-4"}),"إضافة"]})]}),H&&(0,s.jsxs)("p",{className:"text-xs mt-2",style:{color:g.a},children:["وصلت للحد الأقصى (",t," تصنيفات) —"," ",s.jsx(f.default,{href:"/dashboard/upgrade",className:"font-bold underline",children:"ارفع باقتك"})," ","لإضافة المزيد"]})]}),0===a.length?(0,s.jsxs)("div",{className:"rounded-2xl p-10 text-center",style:{background:"#fff",border:`1.5px dashed ${g.border}`},children:[s.jsx(o.Z,{className:"h-10 w-10 mx-auto mb-3 opacity-30",style:{color:g.p}}),s.jsx("p",{className:"font-semibold text-gray-500",children:"لا توجد تصنيفات بعد"}),s.jsx("p",{className:"text-sm text-gray-400 mt-1",children:"أضف تصنيفاً من الحقل أعلاه"})]}):s.jsx("div",{className:"rounded-2xl overflow-hidden",style:{background:"#fff",border:`1.5px solid ${g.border}`,boxShadow:"0 2px 12px rgba(67,46,84,.06)"},children:a.map((e,t)=>(0,s.jsxs)("div",{className:"flex items-center gap-3 px-5 py-3.5 transition",style:{borderBottom:t<a.length-1?`1px solid ${g.border}`:"none",background:C===e.id?g.soft:"#fff"},children:[s.jsx("div",{className:"w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0",style:{background:g.bg},children:s.jsx(o.Z,{className:"h-3.5 w-3.5",style:{color:g.p}})}),C===e.id?(0,s.jsxs)("div",{className:"flex-1 flex items-center gap-2",children:[s.jsx("input",{autoFocus:!0,value:S,onChange:e=>E(e.target.value),onKeyDown:t=>{"Enter"===t.key&&V(e.id),"Escape"===t.key&&X()},style:{flex:1,padding:"7px 12px",borderRadius:10,border:`1.5px solid ${g.a}`,fontSize:14,outline:"none",fontFamily:"inherit",background:"#fff"}}),s.jsx("button",{onClick:()=>V(e.id),disabled:q===e.id,className:"w-8 h-8 rounded-xl flex items-center justify-center transition hover:opacity-80",style:{background:"#10b981",color:"#fff",border:"none",cursor:"pointer",flexShrink:0},children:q===e.id?s.jsx(d.Z,{className:"h-3.5 w-3.5 animate-spin"}):s.jsx(c.Z,{className:"h-3.5 w-3.5"})}),s.jsx("button",{onClick:X,className:"w-8 h-8 rounded-xl flex items-center justify-center transition hover:opacity-80",style:{background:"#e5e7eb",color:"#6b7280",border:"none",cursor:"pointer",flexShrink:0},children:s.jsx(p.Z,{className:"h-3.5 w-3.5"})})]}):(0,s.jsxs)(s.Fragment,{children:[(0,s.jsxs)("div",{className:"flex-1 min-w-0",children:[s.jsx("p",{className:"font-semibold text-sm truncate",style:{color:g.p},children:e.name}),(0,s.jsxs)("p",{className:"text-xs text-gray-400 truncate",children:["/",e.slug]})]}),(0,s.jsxs)("div",{className:"flex items-center gap-1",children:[s.jsx("button",{onClick:()=>R(e),className:"w-8 h-8 rounded-xl flex items-center justify-center transition hover:bg-purple-50",style:{border:`1px solid ${g.border}`,background:"transparent",cursor:"pointer",flexShrink:0},title:"تعديل الاسم",children:s.jsx(h.Z,{className:"h-3.5 w-3.5",style:{color:g.p}})}),s.jsx("button",{onClick:()=>B(e),disabled:_===e.id,className:"w-8 h-8 rounded-xl flex items-center justify-center transition hover:bg-red-50",style:{border:"1px solid #fca5a5",background:"transparent",cursor:_===e.id?"not-allowed":"pointer",flexShrink:0},title:"حذف",children:_===e.id?s.jsx(d.Z,{className:"h-3.5 w-3.5 animate-spin text-red-400"}):s.jsx(x.Z,{className:"h-3.5 w-3.5 text-red-400"})})]})]})]},e.id))}),a.length>0&&(0,s.jsxs)("div",{className:"mt-5 rounded-2xl p-4 flex items-center gap-3",style:{background:g.bg,border:`1px solid ${g.border}`},children:[s.jsx(u.Z,{className:"h-4 w-4 flex-shrink-0",style:{color:g.p}}),s.jsx("p",{className:"text-sm text-gray-600 flex-1",children:"يمكنك الآن تعيين هذه التصنيفات على منتجاتك"}),s.jsx(f.default,{href:"/dashboard/products",className:"text-xs font-bold px-3 py-1.5 rounded-xl text-white",style:{background:g.p},children:"إدارة المنتجات"})]})]})}},10828:(e,t,a)=>{"use strict";function s(e){try{return}catch{}}function r(e,t){s({event:"page_view",page:e,meta:t})}a.d(t,{K:()=>r,j:()=>s})},72742:(e,t,a)=>{"use strict";a.d(t,{Z:()=>s});/**
 * @license lucide-react v0.363.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let s=(0,a(71993).Z)("Bell",[["path",{d:"M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9",key:"1qo2s2"}],["path",{d:"M10.3 21a1.94 1.94 0 0 0 3.4 0",key:"qgo35s"}]])},10617:(e,t,a)=>{"use strict";a.d(t,{Z:()=>s});/**
 * @license lucide-react v0.363.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let s=(0,a(71993).Z)("CheckCheck",[["path",{d:"M18 6 7 17l-5-5",key:"116fxf"}],["path",{d:"m22 10-7.5 7.5L13 16",key:"ke71qq"}]])},63197:(e,t,a)=>{"use strict";a.d(t,{Z:()=>s});/**
 * @license lucide-react v0.363.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let s=(0,a(71993).Z)("Check",[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]])},59709:(e,t,a)=>{"use strict";a.d(t,{Z:()=>s});/**
 * @license lucide-react v0.363.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let s=(0,a(71993).Z)("Crown",[["path",{d:"M11.562 3.266a.5.5 0 0 1 .876 0L15.39 8.87a1 1 0 0 0 1.516.294L21.183 5.5a.5.5 0 0 1 .798.519l-2.834 10.246a1 1 0 0 1-.956.734H5.81a1 1 0 0 1-.957-.734L2.02 6.02a.5.5 0 0 1 .798-.519l4.276 3.664a1 1 0 0 0 1.516-.294z",key:"1vdc57"}],["path",{d:"M5 21h14",key:"11awu3"}]])},55165:(e,t,a)=>{"use strict";a.d(t,{Z:()=>s});/**
 * @license lucide-react v0.363.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let s=(0,a(71993).Z)("LayoutDashboard",[["rect",{width:"7",height:"9",x:"3",y:"3",rx:"1",key:"10lvy0"}],["rect",{width:"7",height:"5",x:"14",y:"3",rx:"1",key:"16une8"}],["rect",{width:"7",height:"9",x:"14",y:"12",rx:"1",key:"1hutg5"}],["rect",{width:"7",height:"5",x:"3",y:"16",rx:"1",key:"ldoo1y"}]])},87850:(e,t,a)=>{"use strict";a.d(t,{Z:()=>s});/**
 * @license lucide-react v0.363.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let s=(0,a(71993).Z)("LoaderCircle",[["path",{d:"M21 12a9 9 0 1 1-6.219-8.56",key:"13zald"}]])},96720:(e,t,a)=>{"use strict";a.d(t,{Z:()=>s});/**
 * @license lucide-react v0.363.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let s=(0,a(71993).Z)("Lock",[["rect",{width:"18",height:"11",x:"3",y:"11",rx:"2",ry:"2",key:"1w4ew1"}],["path",{d:"M7 11V7a5 5 0 0 1 10 0v4",key:"fwvmzm"}]])},22696:(e,t,a)=>{"use strict";a.d(t,{Z:()=>s});/**
 * @license lucide-react v0.363.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let s=(0,a(71993).Z)("LogOut",[["path",{d:"M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4",key:"1uf3rs"}],["polyline",{points:"16 17 21 12 16 7",key:"1gabdz"}],["line",{x1:"21",x2:"9",y1:"12",y2:"12",key:"1uyos4"}]])},26072:(e,t,a)=>{"use strict";a.d(t,{Z:()=>s});/**
 * @license lucide-react v0.363.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let s=(0,a(71993).Z)("Megaphone",[["path",{d:"m3 11 18-5v12L3 14v-3z",key:"n962bs"}],["path",{d:"M11.6 16.8a3 3 0 1 1-5.8-1.6",key:"1yl0tm"}]])},78610:(e,t,a)=>{"use strict";a.d(t,{Z:()=>s});/**
 * @license lucide-react v0.363.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let s=(0,a(71993).Z)("Menu",[["line",{x1:"4",x2:"20",y1:"12",y2:"12",key:"1e0a9i"}],["line",{x1:"4",x2:"20",y1:"6",y2:"6",key:"1owob3"}],["line",{x1:"4",x2:"20",y1:"18",y2:"18",key:"yk5zj1"}]])},52744:(e,t,a)=>{"use strict";a.d(t,{Z:()=>s});/**
 * @license lucide-react v0.363.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let s=(0,a(71993).Z)("MessageCircle",[["path",{d:"M7.9 20A9 9 0 1 0 4 16.1L2 22Z",key:"vv11sd"}]])},22295:(e,t,a)=>{"use strict";a.d(t,{Z:()=>s});/**
 * @license lucide-react v0.363.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let s=(0,a(71993).Z)("Package",[["path",{d:"m7.5 4.27 9 5.15",key:"1c824w"}],["path",{d:"M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z",key:"hh9hay"}],["path",{d:"m3.3 7 8.7 5 8.7-5",key:"g66t2b"}],["path",{d:"M12 22V12",key:"d0xqtd"}]])},15192:(e,t,a)=>{"use strict";a.d(t,{Z:()=>s});/**
 * @license lucide-react v0.363.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let s=(0,a(71993).Z)("Palette",[["circle",{cx:"13.5",cy:"6.5",r:".5",fill:"currentColor",key:"1okk4w"}],["circle",{cx:"17.5",cy:"10.5",r:".5",fill:"currentColor",key:"f64h9f"}],["circle",{cx:"8.5",cy:"7.5",r:".5",fill:"currentColor",key:"fotxhn"}],["circle",{cx:"6.5",cy:"12.5",r:".5",fill:"currentColor",key:"qy21gx"}],["path",{d:"M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z",key:"12rzf8"}]])},14150:(e,t,a)=>{"use strict";a.d(t,{Z:()=>s});/**
 * @license lucide-react v0.363.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let s=(0,a(71993).Z)("Pencil",[["path",{d:"M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z",key:"5qss01"}],["path",{d:"m15 5 4 4",key:"1mk7zo"}]])},60461:(e,t,a)=>{"use strict";a.d(t,{Z:()=>s});/**
 * @license lucide-react v0.363.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let s=(0,a(71993).Z)("Plus",[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"M12 5v14",key:"s699le"}]])},92015:(e,t,a)=>{"use strict";a.d(t,{Z:()=>s});/**
 * @license lucide-react v0.363.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let s=(0,a(71993).Z)("Settings",[["path",{d:"M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z",key:"1qme2f"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]])},61964:(e,t,a)=>{"use strict";a.d(t,{Z:()=>s});/**
 * @license lucide-react v0.363.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let s=(0,a(71993).Z)("Shield",[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",key:"oel41y"}]])},68387:(e,t,a)=>{"use strict";a.d(t,{Z:()=>s});/**
 * @license lucide-react v0.363.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let s=(0,a(71993).Z)("ShoppingCart",[["circle",{cx:"8",cy:"21",r:"1",key:"jimo8o"}],["circle",{cx:"19",cy:"21",r:"1",key:"13723u"}],["path",{d:"M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12",key:"9zh506"}]])},46183:(e,t,a)=>{"use strict";a.d(t,{Z:()=>s});/**
 * @license lucide-react v0.363.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let s=(0,a(71993).Z)("Sparkles",[["path",{d:"m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z",key:"17u4zn"}],["path",{d:"M5 3v4",key:"bklmnn"}],["path",{d:"M19 17v4",key:"iiml17"}],["path",{d:"M3 5h4",key:"nem4j1"}],["path",{d:"M17 19h4",key:"lbex7p"}]])},88883:(e,t,a)=>{"use strict";a.d(t,{Z:()=>s});/**
 * @license lucide-react v0.363.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let s=(0,a(71993).Z)("Store",[["path",{d:"m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7",key:"ztvudi"}],["path",{d:"M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8",key:"1b2hhj"}],["path",{d:"M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4",key:"2ebpfo"}],["path",{d:"M2 7h20",key:"1fcdvo"}],["path",{d:"M22 7v3a2 2 0 0 1-2 2v0a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 16 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 12 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 8 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 4 12v0a2 2 0 0 1-2-2V7",key:"jon5kx"}]])},10532:(e,t,a)=>{"use strict";a.d(t,{Z:()=>s});/**
 * @license lucide-react v0.363.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let s=(0,a(71993).Z)("Tag",[["path",{d:"M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z",key:"vktsd0"}],["circle",{cx:"7.5",cy:"7.5",r:".5",fill:"currentColor",key:"kqv944"}]])},35943:(e,t,a)=>{"use strict";a.d(t,{Z:()=>s});/**
 * @license lucide-react v0.363.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let s=(0,a(71993).Z)("Trash2",[["path",{d:"M3 6h18",key:"d0wm0j"}],["path",{d:"M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6",key:"4alrt4"}],["path",{d:"M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2",key:"v07s0e"}],["line",{x1:"10",x2:"10",y1:"11",y2:"17",key:"1uufr5"}],["line",{x1:"14",x2:"14",y1:"11",y2:"17",key:"xtxkd"}]])},54654:(e,t,a)=>{"use strict";a.d(t,{Z:()=>s});/**
 * @license lucide-react v0.363.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let s=(0,a(71993).Z)("X",[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]])},12940:(e,t,a)=>{"use strict";a.d(t,{Z:()=>s});/**
 * @license lucide-react v0.363.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let s=(0,a(71993).Z)("Zap",[["path",{d:"M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z",key:"1xq2db"}]])},35817:(e,t,a)=>{"use strict";var s=a(67435);a.o(s,"useParams")&&a.d(t,{useParams:function(){return s.useParams}}),a.o(s,"usePathname")&&a.d(t,{usePathname:function(){return s.usePathname}}),a.o(s,"useRouter")&&a.d(t,{useRouter:function(){return s.useRouter}}),a.o(s,"useSearchParams")&&a.d(t,{useSearchParams:function(){return s.useSearchParams}})},78238:(e,t,a)=>{"use strict";a.r(t),a.d(t,{$$typeof:()=>l,__esModule:()=>r,default:()=>i});let s=(0,a(30599).createProxy)(String.raw`/Applications/XAMPP/xamppfiles/htdocs/bazar/apps/web/src/app/(dashboard)/dashboard/categories/page.tsx`),{__esModule:r,$$typeof:l}=s,i=s.default}};var t=require("../../../../webpack-runtime.js");t.C(e);var a=e=>t(t.s=e),s=t.X(0,[3936,5352,5924,2631,7603],()=>a(86809));module.exports=s})();
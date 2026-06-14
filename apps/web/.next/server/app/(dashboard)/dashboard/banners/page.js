(()=>{var e={};e.id=9818,e.ids=[9818],e.modules={47849:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external")},72934:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external.js")},55403:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external")},54580:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external.js")},94749:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external")},45869:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},20399:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},89615:(e,t,s)=>{"use strict";s.r(t),s.d(t,{GlobalError:()=>i.a,__next_app__:()=>p,originalPathname:()=>x,pages:()=>d,routeModule:()=>h,tree:()=>c});var a=s(59441),r=s(1498),l=s(6580),i=s.n(l),o=s(15511),n={};for(let e in o)0>["default","tree","pages","GlobalError","originalPathname","__next_app__","routeModule"].indexOf(e)&&(n[e]=()=>o[e]);s.d(t,n);let c=["",{children:["(dashboard)",{children:["dashboard",{children:["banners",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(s.bind(s,34182)),"/Applications/XAMPP/xamppfiles/htdocs/bazar/apps/web/src/app/(dashboard)/dashboard/banners/page.tsx"]}]},{}]},{}]},{layout:[()=>Promise.resolve().then(s.bind(s,41097)),"/Applications/XAMPP/xamppfiles/htdocs/bazar/apps/web/src/app/(dashboard)/layout.tsx"],loading:[()=>Promise.resolve().then(s.bind(s,17112)),"/Applications/XAMPP/xamppfiles/htdocs/bazar/apps/web/src/app/(dashboard)/loading.tsx"]}]},{layout:[()=>Promise.resolve().then(s.bind(s,38205)),"/Applications/XAMPP/xamppfiles/htdocs/bazar/apps/web/src/app/layout.tsx"],error:[()=>Promise.resolve().then(s.bind(s,61530)),"/Applications/XAMPP/xamppfiles/htdocs/bazar/apps/web/src/app/error.tsx"],"not-found":[()=>Promise.resolve().then(s.bind(s,77123)),"/Applications/XAMPP/xamppfiles/htdocs/bazar/apps/web/src/app/not-found.tsx"]}],d=["/Applications/XAMPP/xamppfiles/htdocs/bazar/apps/web/src/app/(dashboard)/dashboard/banners/page.tsx"],x="/(dashboard)/dashboard/banners/page",p={require:s,loadChunk:()=>Promise.resolve()},h=new a.AppPageRouteModule({definition:{kind:r.x.APP_PAGE,page:"/(dashboard)/dashboard/banners/page",pathname:"/dashboard/banners",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:c}})},87800:(e,t,s)=>{Promise.resolve().then(s.bind(s,45490))},45490:(e,t,s)=>{"use strict";s.r(t),s.d(t,{default:()=>m});var a=s(27685),r=s(83810),l=s(60461),i=s(87850),o=s(26072),n=s(19989),c=s(47416),d=s(14150),x=s(35943),p=s(54654),h=s(50436),u=s(39881);let y={primary:"#432E54",accent:"#AE445A",border:"#E8BCB9",bg:"#F5F0FA"},b={title:"",subtitle:"",bgColor:"#432E54",textColor:"#FFFFFF",linkUrl:"",isActive:!0};function m(){let[e,t]=(0,r.useState)([]),[s,m]=(0,r.useState)(!0),[g,f]=(0,r.useState)(!1),[v,k]=(0,r.useState)(!1),[j,C]=(0,r.useState)(null),[N,w]=(0,r.useState)(b),Z=(0,r.useCallback)(async()=>{try{let e=await u.hi.get("/api/banners");t(e.data??[])}catch{h.toast.error("فشل تحميل البانرات")}finally{m(!1)}},[]);(0,r.useEffect)(()=>{Z()},[Z]);let A=()=>{C(null),w(b),k(!0)},M=e=>{C(e.id),w({title:e.title,subtitle:e.subtitle??"",bgColor:e.bgColor,textColor:e.textColor,linkUrl:e.linkUrl??"",isActive:e.isActive}),k(!0)},P=async e=>{e.preventDefault(),f(!0);let t={title:N.title.trim(),subtitle:N.subtitle.trim()||void 0,bgColor:N.bgColor,textColor:N.textColor,linkUrl:N.linkUrl.trim()||void 0,isActive:N.isActive};try{j?(await u.hi.patch(`/api/banners/${j}`,t),h.toast.success("تم تعديل البانر ✓")):(await u.hi.post("/api/banners",t),h.toast.success("تم إضافة البانر ✓")),k(!1),w(b),C(null),Z()}catch(e){h.toast.error(e instanceof Error?e.message:"فشل الحفظ")}finally{f(!1)}},z=async e=>{try{await u.hi.patch(`/api/banners/${e.id}`,{...e,isActive:!e.isActive}),Z(),h.toast.success(e.isActive?"تم إخفاء البانر":"تم تفعيل البانر")}catch{h.toast.error("فشل التحديث")}},q=async e=>{if(confirm("هل أنت متأكد من حذف هذا البانر؟"))try{await u.hi.delete(`/api/banners/${e}`),h.toast.success("تم الحذف"),Z()}catch{h.toast.error("فشل الحذف")}},_=e.filter(e=>e.isActive).length;return(0,a.jsxs)("div",{className:"p-6 max-w-5xl",dir:"rtl",children:[(0,a.jsxs)("div",{className:"flex items-center justify-between mb-6",children:[(0,a.jsxs)("div",{children:[a.jsx("h1",{className:"text-2xl font-bold",style:{color:y.primary},children:"البانرات الإعلانية"}),(0,a.jsxs)("p",{className:"text-sm text-gray-500 mt-0.5",children:[e.length," بانر • ",_," نشط"]})]}),(0,a.jsxs)("button",{onClick:A,className:"flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold text-white transition hover:opacity-90",style:{background:`linear-gradient(135deg, ${y.primary}, ${y.accent})`},children:[a.jsx(l.Z,{className:"h-4 w-4"})," إضافة بانر"]})]}),a.jsx("div",{className:"grid grid-cols-3 gap-4 mb-6",children:[{label:"إجمالي البانرات",value:e.length,color:y.primary},{label:"بانرات نشطة",value:_,color:"#10b981"},{label:"بانرات مخفية",value:e.length-_,color:"#9ca3af"}].map(e=>(0,a.jsxs)("div",{className:"bg-white rounded-2xl border p-4",style:{borderColor:y.border},children:[a.jsx("p",{className:"text-xs text-gray-500 mb-1",children:e.label}),a.jsx("p",{className:"text-2xl font-bold",style:{color:e.color},children:e.value})]},e.label))}),s?a.jsx("div",{className:"flex items-center justify-center h-40",children:a.jsx(i.Z,{className:"h-6 w-6 animate-spin",style:{color:y.accent}})}):0===e.length?(0,a.jsxs)("div",{className:"bg-white rounded-2xl border p-16 text-center",style:{borderColor:y.border},children:[a.jsx(o.Z,{className:"h-12 w-12 mx-auto mb-4 text-gray-200"}),a.jsx("p",{className:"font-medium text-gray-400 mb-1",children:"لا توجد بانرات بعد"}),a.jsx("p",{className:"text-sm text-gray-400 mb-6",children:"أضف بانراً إعلانياً لعرضه في متجرك"}),a.jsx("button",{onClick:A,className:"px-6 py-2.5 rounded-xl text-sm font-bold text-white",style:{background:`linear-gradient(135deg, ${y.primary}, ${y.accent})`},children:"إضافة أول بانر"})]}):a.jsx("div",{className:"space-y-3",children:e.map(e=>(0,a.jsxs)("div",{className:"bg-white rounded-2xl border overflow-hidden",style:{borderColor:y.border},children:[(0,a.jsxs)("div",{className:"px-5 py-4 flex items-center justify-between",style:{background:e.bgColor},children:[(0,a.jsxs)("div",{children:[a.jsx("p",{className:"font-bold text-base leading-tight",style:{color:e.textColor},children:e.title}),e.subtitle&&a.jsx("p",{className:"text-sm mt-0.5 opacity-80",style:{color:e.textColor},children:e.subtitle})]}),e.linkUrl&&a.jsx("span",{className:"text-xs font-semibold px-3 py-1 rounded-full border border-current opacity-70",style:{color:e.textColor},children:"عرض"})]}),(0,a.jsxs)("div",{className:"px-5 py-3 flex items-center justify-between",style:{background:y.bg},children:[(0,a.jsxs)("div",{className:"flex items-center gap-2",children:[a.jsx("span",{className:"inline-flex px-2.5 py-1 rounded-full text-xs font-medium",style:{background:e.isActive?"#d1fae5":"#F5F0FA",color:e.isActive?"#065f46":"#9ca3af"},children:e.isActive?"نشط":"مخفي"}),(0,a.jsxs)("div",{className:"flex items-center gap-1.5 text-xs text-gray-400",children:[a.jsx("span",{className:"inline-block h-3.5 w-3.5 rounded-sm border border-gray-200",style:{background:e.bgColor}}),e.bgColor]})]}),(0,a.jsxs)("div",{className:"flex items-center gap-1",children:[a.jsx("button",{onClick:()=>z(e),className:"p-2 rounded-lg hover:bg-white transition",title:e.isActive?"إخفاء البانر":"إظهار البانر",children:e.isActive?a.jsx(n.Z,{className:"h-4 w-4",style:{color:"#10b981"}}):a.jsx(c.Z,{className:"h-4 w-4 text-gray-400"})}),a.jsx("button",{onClick:()=>M(e),className:"p-2 rounded-lg hover:bg-white transition",title:"تعديل",children:a.jsx(d.Z,{className:"h-4 w-4",style:{color:y.primary}})}),a.jsx("button",{onClick:()=>q(e.id),className:"p-2 rounded-lg hover:bg-red-50 transition",title:"حذف",children:a.jsx(x.Z,{className:"h-4 w-4 text-red-400"})})]})]})]},e.id))}),v&&a.jsx("div",{className:"fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4",dir:"rtl",children:(0,a.jsxs)("div",{className:"bg-white rounded-2xl shadow-2xl w-full max-w-md",children:[(0,a.jsxs)("div",{className:"flex items-center justify-between px-6 py-4 border-b",style:{borderColor:y.border},children:[a.jsx("h2",{className:"text-lg font-bold",style:{color:y.primary},children:j?"تعديل البانر":"إضافة بانر جديد"}),a.jsx("button",{onClick:()=>k(!1),className:"p-1.5 rounded-lg hover:bg-gray-100 transition text-gray-400",children:a.jsx(p.Z,{className:"h-5 w-5"})})]}),(0,a.jsxs)("form",{onSubmit:P,className:"p-6 space-y-4",children:[(0,a.jsxs)("div",{children:[a.jsx("label",{className:"block text-xs font-semibold mb-1.5",style:{color:y.primary},children:"عنوان البانر *"}),a.jsx("input",{value:N.title,onChange:e=>w(t=>({...t,title:e.target.value})),required:!0,placeholder:"مثال: تخفيضات الصيف 50%",className:"w-full px-3 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 transition",style:{borderColor:y.border}})]}),(0,a.jsxs)("div",{children:[a.jsx("label",{className:"block text-xs font-semibold mb-1.5",style:{color:y.primary},children:"نص فرعي (اختياري)"}),a.jsx("input",{value:N.subtitle,onChange:e=>w(t=>({...t,subtitle:e.target.value})),placeholder:"مثال: على جميع المنتجات حتى نهاية الشهر",className:"w-full px-3 py-2.5 rounded-xl border text-sm focus:outline-none transition",style:{borderColor:y.border}})]}),(0,a.jsxs)("div",{className:"grid grid-cols-2 gap-3",children:[(0,a.jsxs)("div",{children:[a.jsx("label",{className:"block text-xs font-semibold mb-1.5",style:{color:y.primary},children:"لون الخلفية"}),(0,a.jsxs)("div",{className:"flex items-center gap-2",children:[a.jsx("input",{type:"color",value:N.bgColor,onChange:e=>w(t=>({...t,bgColor:e.target.value})),className:"h-9 w-12 rounded-lg border cursor-pointer p-0.5",style:{borderColor:y.border}}),a.jsx("input",{value:N.bgColor,onChange:e=>w(t=>({...t,bgColor:e.target.value})),className:"flex-1 px-3 py-2 rounded-xl border text-xs font-mono focus:outline-none transition",style:{borderColor:y.border}})]})]}),(0,a.jsxs)("div",{children:[a.jsx("label",{className:"block text-xs font-semibold mb-1.5",style:{color:y.primary},children:"لون النص"}),(0,a.jsxs)("div",{className:"flex items-center gap-2",children:[a.jsx("input",{type:"color",value:N.textColor,onChange:e=>w(t=>({...t,textColor:e.target.value})),className:"h-9 w-12 rounded-lg border cursor-pointer p-0.5",style:{borderColor:y.border}}),a.jsx("input",{value:N.textColor,onChange:e=>w(t=>({...t,textColor:e.target.value})),className:"flex-1 px-3 py-2 rounded-xl border text-xs font-mono focus:outline-none transition",style:{borderColor:y.border}})]})]})]}),(0,a.jsxs)("div",{children:[a.jsx("label",{className:"block text-xs font-semibold mb-1.5",style:{color:y.primary},children:"رابط البانر (اختياري)"}),a.jsx("input",{value:N.linkUrl,onChange:e=>w(t=>({...t,linkUrl:e.target.value})),placeholder:"https://...",type:"url",className:"w-full px-3 py-2.5 rounded-xl border text-sm focus:outline-none transition",style:{borderColor:y.border},dir:"ltr"})]}),(0,a.jsxs)("div",{className:"flex items-center justify-between py-1",children:[(0,a.jsxs)("div",{children:[a.jsx("p",{className:"text-sm font-semibold",style:{color:y.primary},children:"تفعيل البانر"}),a.jsx("p",{className:"text-xs text-gray-400",children:"سيظهر البانر في متجرك فور الحفظ"})]}),a.jsx("button",{type:"button",onClick:()=>w(e=>({...e,isActive:!e.isActive})),className:"relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200",style:{background:N.isActive?y.accent:"#d1d5db"},children:a.jsx("span",{className:"inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform duration-200",style:{transform:N.isActive?"translateX(-24px)":"translateX(-4px)"}})})]}),N.title&&(0,a.jsxs)("div",{children:[a.jsx("p",{className:"text-xs font-semibold mb-1.5 text-gray-400",children:"معاينة"}),(0,a.jsxs)("div",{className:"rounded-xl px-4 py-3",style:{background:N.bgColor},children:[a.jsx("p",{className:"font-bold text-sm",style:{color:N.textColor},children:N.title}),N.subtitle&&a.jsx("p",{className:"text-xs mt-0.5 opacity-80",style:{color:N.textColor},children:N.subtitle})]})]}),(0,a.jsxs)("div",{className:"flex gap-3 pt-2",children:[a.jsx("button",{type:"button",onClick:()=>k(!1),className:"flex-1 py-2.5 border rounded-xl text-sm font-medium hover:bg-gray-50 transition text-gray-600",style:{borderColor:y.border},children:"إلغاء"}),(0,a.jsxs)("button",{type:"submit",disabled:g,className:"flex-1 py-2.5 rounded-xl text-sm font-bold text-white transition disabled:opacity-60 flex items-center justify-center gap-2",style:{background:`linear-gradient(135deg, ${y.primary}, ${y.accent})`},children:[g&&a.jsx(i.Z,{className:"h-4 w-4 animate-spin"}),g?"جارٍ الحفظ…":j?"حفظ التعديلات":"إضافة البانر"]})]})]})]})})]})}},72742:(e,t,s)=>{"use strict";s.d(t,{Z:()=>a});/**
 * @license lucide-react v0.363.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let a=(0,s(71993).Z)("Bell",[["path",{d:"M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9",key:"1qo2s2"}],["path",{d:"M10.3 21a1.94 1.94 0 0 0 3.4 0",key:"qgo35s"}]])},10617:(e,t,s)=>{"use strict";s.d(t,{Z:()=>a});/**
 * @license lucide-react v0.363.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let a=(0,s(71993).Z)("CheckCheck",[["path",{d:"M18 6 7 17l-5-5",key:"116fxf"}],["path",{d:"m22 10-7.5 7.5L13 16",key:"ke71qq"}]])},63197:(e,t,s)=>{"use strict";s.d(t,{Z:()=>a});/**
 * @license lucide-react v0.363.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let a=(0,s(71993).Z)("Check",[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]])},59709:(e,t,s)=>{"use strict";s.d(t,{Z:()=>a});/**
 * @license lucide-react v0.363.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let a=(0,s(71993).Z)("Crown",[["path",{d:"M11.562 3.266a.5.5 0 0 1 .876 0L15.39 8.87a1 1 0 0 0 1.516.294L21.183 5.5a.5.5 0 0 1 .798.519l-2.834 10.246a1 1 0 0 1-.956.734H5.81a1 1 0 0 1-.957-.734L2.02 6.02a.5.5 0 0 1 .798-.519l4.276 3.664a1 1 0 0 0 1.516-.294z",key:"1vdc57"}],["path",{d:"M5 21h14",key:"11awu3"}]])},47416:(e,t,s)=>{"use strict";s.d(t,{Z:()=>a});/**
 * @license lucide-react v0.363.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let a=(0,s(71993).Z)("EyeOff",[["path",{d:"M9.88 9.88a3 3 0 1 0 4.24 4.24",key:"1jxqfv"}],["path",{d:"M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68",key:"9wicm4"}],["path",{d:"M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61",key:"1jreej"}],["line",{x1:"2",x2:"22",y1:"2",y2:"22",key:"a6p6uj"}]])},19989:(e,t,s)=>{"use strict";s.d(t,{Z:()=>a});/**
 * @license lucide-react v0.363.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let a=(0,s(71993).Z)("Eye",[["path",{d:"M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z",key:"rwhkz3"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]])},55165:(e,t,s)=>{"use strict";s.d(t,{Z:()=>a});/**
 * @license lucide-react v0.363.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let a=(0,s(71993).Z)("LayoutDashboard",[["rect",{width:"7",height:"9",x:"3",y:"3",rx:"1",key:"10lvy0"}],["rect",{width:"7",height:"5",x:"14",y:"3",rx:"1",key:"16une8"}],["rect",{width:"7",height:"9",x:"14",y:"12",rx:"1",key:"1hutg5"}],["rect",{width:"7",height:"5",x:"3",y:"16",rx:"1",key:"ldoo1y"}]])},87850:(e,t,s)=>{"use strict";s.d(t,{Z:()=>a});/**
 * @license lucide-react v0.363.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let a=(0,s(71993).Z)("LoaderCircle",[["path",{d:"M21 12a9 9 0 1 1-6.219-8.56",key:"13zald"}]])},96720:(e,t,s)=>{"use strict";s.d(t,{Z:()=>a});/**
 * @license lucide-react v0.363.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let a=(0,s(71993).Z)("Lock",[["rect",{width:"18",height:"11",x:"3",y:"11",rx:"2",ry:"2",key:"1w4ew1"}],["path",{d:"M7 11V7a5 5 0 0 1 10 0v4",key:"fwvmzm"}]])},22696:(e,t,s)=>{"use strict";s.d(t,{Z:()=>a});/**
 * @license lucide-react v0.363.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let a=(0,s(71993).Z)("LogOut",[["path",{d:"M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4",key:"1uf3rs"}],["polyline",{points:"16 17 21 12 16 7",key:"1gabdz"}],["line",{x1:"21",x2:"9",y1:"12",y2:"12",key:"1uyos4"}]])},26072:(e,t,s)=>{"use strict";s.d(t,{Z:()=>a});/**
 * @license lucide-react v0.363.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let a=(0,s(71993).Z)("Megaphone",[["path",{d:"m3 11 18-5v12L3 14v-3z",key:"n962bs"}],["path",{d:"M11.6 16.8a3 3 0 1 1-5.8-1.6",key:"1yl0tm"}]])},78610:(e,t,s)=>{"use strict";s.d(t,{Z:()=>a});/**
 * @license lucide-react v0.363.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let a=(0,s(71993).Z)("Menu",[["line",{x1:"4",x2:"20",y1:"12",y2:"12",key:"1e0a9i"}],["line",{x1:"4",x2:"20",y1:"6",y2:"6",key:"1owob3"}],["line",{x1:"4",x2:"20",y1:"18",y2:"18",key:"yk5zj1"}]])},52744:(e,t,s)=>{"use strict";s.d(t,{Z:()=>a});/**
 * @license lucide-react v0.363.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let a=(0,s(71993).Z)("MessageCircle",[["path",{d:"M7.9 20A9 9 0 1 0 4 16.1L2 22Z",key:"vv11sd"}]])},22295:(e,t,s)=>{"use strict";s.d(t,{Z:()=>a});/**
 * @license lucide-react v0.363.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let a=(0,s(71993).Z)("Package",[["path",{d:"m7.5 4.27 9 5.15",key:"1c824w"}],["path",{d:"M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z",key:"hh9hay"}],["path",{d:"m3.3 7 8.7 5 8.7-5",key:"g66t2b"}],["path",{d:"M12 22V12",key:"d0xqtd"}]])},15192:(e,t,s)=>{"use strict";s.d(t,{Z:()=>a});/**
 * @license lucide-react v0.363.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let a=(0,s(71993).Z)("Palette",[["circle",{cx:"13.5",cy:"6.5",r:".5",fill:"currentColor",key:"1okk4w"}],["circle",{cx:"17.5",cy:"10.5",r:".5",fill:"currentColor",key:"f64h9f"}],["circle",{cx:"8.5",cy:"7.5",r:".5",fill:"currentColor",key:"fotxhn"}],["circle",{cx:"6.5",cy:"12.5",r:".5",fill:"currentColor",key:"qy21gx"}],["path",{d:"M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z",key:"12rzf8"}]])},14150:(e,t,s)=>{"use strict";s.d(t,{Z:()=>a});/**
 * @license lucide-react v0.363.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let a=(0,s(71993).Z)("Pencil",[["path",{d:"M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z",key:"5qss01"}],["path",{d:"m15 5 4 4",key:"1mk7zo"}]])},60461:(e,t,s)=>{"use strict";s.d(t,{Z:()=>a});/**
 * @license lucide-react v0.363.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let a=(0,s(71993).Z)("Plus",[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"M12 5v14",key:"s699le"}]])},92015:(e,t,s)=>{"use strict";s.d(t,{Z:()=>a});/**
 * @license lucide-react v0.363.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let a=(0,s(71993).Z)("Settings",[["path",{d:"M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z",key:"1qme2f"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]])},61964:(e,t,s)=>{"use strict";s.d(t,{Z:()=>a});/**
 * @license lucide-react v0.363.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let a=(0,s(71993).Z)("Shield",[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",key:"oel41y"}]])},68387:(e,t,s)=>{"use strict";s.d(t,{Z:()=>a});/**
 * @license lucide-react v0.363.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let a=(0,s(71993).Z)("ShoppingCart",[["circle",{cx:"8",cy:"21",r:"1",key:"jimo8o"}],["circle",{cx:"19",cy:"21",r:"1",key:"13723u"}],["path",{d:"M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12",key:"9zh506"}]])},46183:(e,t,s)=>{"use strict";s.d(t,{Z:()=>a});/**
 * @license lucide-react v0.363.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let a=(0,s(71993).Z)("Sparkles",[["path",{d:"m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z",key:"17u4zn"}],["path",{d:"M5 3v4",key:"bklmnn"}],["path",{d:"M19 17v4",key:"iiml17"}],["path",{d:"M3 5h4",key:"nem4j1"}],["path",{d:"M17 19h4",key:"lbex7p"}]])},88883:(e,t,s)=>{"use strict";s.d(t,{Z:()=>a});/**
 * @license lucide-react v0.363.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let a=(0,s(71993).Z)("Store",[["path",{d:"m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7",key:"ztvudi"}],["path",{d:"M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8",key:"1b2hhj"}],["path",{d:"M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4",key:"2ebpfo"}],["path",{d:"M2 7h20",key:"1fcdvo"}],["path",{d:"M22 7v3a2 2 0 0 1-2 2v0a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 16 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 12 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 8 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 4 12v0a2 2 0 0 1-2-2V7",key:"jon5kx"}]])},10532:(e,t,s)=>{"use strict";s.d(t,{Z:()=>a});/**
 * @license lucide-react v0.363.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let a=(0,s(71993).Z)("Tag",[["path",{d:"M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z",key:"vktsd0"}],["circle",{cx:"7.5",cy:"7.5",r:".5",fill:"currentColor",key:"kqv944"}]])},35943:(e,t,s)=>{"use strict";s.d(t,{Z:()=>a});/**
 * @license lucide-react v0.363.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let a=(0,s(71993).Z)("Trash2",[["path",{d:"M3 6h18",key:"d0wm0j"}],["path",{d:"M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6",key:"4alrt4"}],["path",{d:"M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2",key:"v07s0e"}],["line",{x1:"10",x2:"10",y1:"11",y2:"17",key:"1uufr5"}],["line",{x1:"14",x2:"14",y1:"11",y2:"17",key:"xtxkd"}]])},54654:(e,t,s)=>{"use strict";s.d(t,{Z:()=>a});/**
 * @license lucide-react v0.363.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let a=(0,s(71993).Z)("X",[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]])},12940:(e,t,s)=>{"use strict";s.d(t,{Z:()=>a});/**
 * @license lucide-react v0.363.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let a=(0,s(71993).Z)("Zap",[["path",{d:"M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z",key:"1xq2db"}]])},35817:(e,t,s)=>{"use strict";var a=s(67435);s.o(a,"useParams")&&s.d(t,{useParams:function(){return a.useParams}}),s.o(a,"usePathname")&&s.d(t,{usePathname:function(){return a.usePathname}}),s.o(a,"useRouter")&&s.d(t,{useRouter:function(){return a.useRouter}}),s.o(a,"useSearchParams")&&s.d(t,{useSearchParams:function(){return a.useSearchParams}})},34182:(e,t,s)=>{"use strict";s.r(t),s.d(t,{$$typeof:()=>l,__esModule:()=>r,default:()=>i});let a=(0,s(30599).createProxy)(String.raw`/Applications/XAMPP/xamppfiles/htdocs/bazar/apps/web/src/app/(dashboard)/dashboard/banners/page.tsx`),{__esModule:r,$$typeof:l}=a,i=a.default}};var t=require("../../../../webpack-runtime.js");t.C(e);var s=e=>t(t.s=e),a=t.X(0,[3936,5352,5924,2631,7603],()=>s(89615));module.exports=a})();
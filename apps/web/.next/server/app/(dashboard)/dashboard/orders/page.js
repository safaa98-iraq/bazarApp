(()=>{var e={};e.id=5992,e.ids=[5992],e.modules={47849:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external")},72934:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external.js")},55403:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external")},54580:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external.js")},94749:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external")},45869:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},20399:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},5632:(e,t,s)=>{"use strict";s.r(t),s.d(t,{GlobalError:()=>i.a,__next_app__:()=>h,originalPathname:()=>p,pages:()=>o,routeModule:()=>x,tree:()=>n});var a=s(59441),r=s(1498),l=s(6580),i=s.n(l),d=s(15511),c={};for(let e in d)0>["default","tree","pages","GlobalError","originalPathname","__next_app__","routeModule"].indexOf(e)&&(c[e]=()=>d[e]);s.d(t,c);let n=["",{children:["(dashboard)",{children:["dashboard",{children:["orders",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(s.bind(s,13501)),"/Applications/XAMPP/xamppfiles/htdocs/bazar/apps/web/src/app/(dashboard)/dashboard/orders/page.tsx"]}]},{}]},{}]},{layout:[()=>Promise.resolve().then(s.bind(s,41097)),"/Applications/XAMPP/xamppfiles/htdocs/bazar/apps/web/src/app/(dashboard)/layout.tsx"],loading:[()=>Promise.resolve().then(s.bind(s,17112)),"/Applications/XAMPP/xamppfiles/htdocs/bazar/apps/web/src/app/(dashboard)/loading.tsx"]}]},{layout:[()=>Promise.resolve().then(s.bind(s,38205)),"/Applications/XAMPP/xamppfiles/htdocs/bazar/apps/web/src/app/layout.tsx"],error:[()=>Promise.resolve().then(s.bind(s,61530)),"/Applications/XAMPP/xamppfiles/htdocs/bazar/apps/web/src/app/error.tsx"],"not-found":[()=>Promise.resolve().then(s.bind(s,77123)),"/Applications/XAMPP/xamppfiles/htdocs/bazar/apps/web/src/app/not-found.tsx"]}],o=["/Applications/XAMPP/xamppfiles/htdocs/bazar/apps/web/src/app/(dashboard)/dashboard/orders/page.tsx"],p="/(dashboard)/dashboard/orders/page",h={require:s,loadChunk:()=>Promise.resolve()},x=new a.AppPageRouteModule({definition:{kind:r.x.APP_PAGE,page:"/(dashboard)/dashboard/orders/page",pathname:"/dashboard/orders",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:n}})},24966:(e,t,s)=>{Promise.resolve().then(s.bind(s,23062))},23062:(e,t,s)=>{"use strict";s.r(t),s.d(t,{default:()=>k});var a=s(27685),r=s(83810),l=s(50436),i=s(39881),d=s(4120),c=s(87850),n=s(22722),o=s(4610),p=s(22295);/**
 * @license lucide-react v0.363.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let h=(0,s(71993).Z)("MapPin",[["path",{d:"M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z",key:"2oe9fu"}],["circle",{cx:"12",cy:"10",r:"3",key:"ilqhr7"}]]);var x=s(75880),u=s(10828);let m={primary:"#432E54",secondary:"#4B4376",accent:"#AE445A"},y={PENDING:"معلّق",PAID:"مدفوع",SHIPPED:"شُحن",DELIVERED:"مُستلم",CANCELLED:"ملغي"},b={PENDING:{bg:"#FEF3C7",color:"#92400E"},PAID:{bg:"#D1FAE5",color:"#065F46"},SHIPPED:{bg:"#DBEAFE",color:"#1E40AF"},DELIVERED:{bg:"#D1FAE5",color:"#065F46"},CANCELLED:{bg:"#FEE2E2",color:"#991B1B"}},g={PENDING:["PAID","CANCELLED"],PAID:["SHIPPED","CANCELLED"],SHIPPED:["DELIVERED"],DELIVERED:[],CANCELLED:[]},f={PAID:"تم الدفع",SHIPPED:"تم الشحن",DELIVERED:"تم الاستلام",CANCELLED:"إلغاء"},v=[{value:"ALL",label:"الكل"},{value:"PENDING",label:"معلّق"},{value:"PAID",label:"مدفوع"},{value:"SHIPPED",label:"شُحن"},{value:"DELIVERED",label:"مُستلم"},{value:"CANCELLED",label:"ملغي"}];function k(){let[e,t]=(0,r.useState)([]),[s,k]=(0,r.useState)(0),[j,E]=(0,r.useState)(!0),[N,A]=(0,r.useState)("ALL"),[P,Z]=(0,r.useState)(null),[w,L]=(0,r.useState)(null),C=(0,r.useCallback)(async()=>{E(!0);try{let e="ALL"!==N?`?status=${N}`:"",s=await i.hi.get(`/api/orders${e}`);t(s.data??[]),k(s.pagination?.total??0)}catch{l.toast.error("فشل تحميل الطلبات")}finally{E(!1)}},[N]);(0,r.useEffect)(()=>{(0,u.K)("orders")},[]),(0,r.useEffect)(()=>{C()},[C]);let D=async(e,s)=>{L(e);try{let a=await i.hi.patch(`/api/orders/${e}/status`,{status:s});t(t=>t.map(t=>t.id===e?a.data:t)),l.toast.success(`تم تحديث حالة الطلب إلى: ${y[s]}`),(0,u.j)({event:"order_status_updated",meta:{status:s}})}catch(e){l.toast.error(e instanceof Error?e.message:"فشل التحديث")}finally{L(null)}},M=e.reduce((e,t)=>e+Number(t.total),0);return(0,a.jsxs)("div",{className:"p-6 max-w-5xl",dir:"rtl",children:[(0,a.jsxs)("div",{className:"flex items-center justify-between mb-6",children:[(0,a.jsxs)("div",{children:[a.jsx("h1",{className:"text-2xl font-bold",style:{color:m.primary},children:"الطلبات"}),(0,a.jsxs)("p",{className:"text-sm text-gray-500 mt-0.5",children:[s," طلب إجمالي"]})]}),(0,a.jsxs)("div",{className:"text-left",children:[a.jsx("p",{className:"text-xs text-gray-400",children:"إجمالي الإيرادات"}),a.jsx("p",{className:"text-xl font-bold",style:{color:m.accent},children:(0,d.xG)(M)})]})]}),a.jsx("div",{className:"flex gap-2 mb-6 flex-wrap",children:v.map(t=>(0,a.jsxs)("button",{onClick:()=>A(t.value),className:"px-4 py-1.5 rounded-full text-sm font-medium transition",style:{background:N===t.value?m.primary:"#F5F0FA",color:N===t.value?"white":"#6b7280"},children:[t.label,"ALL"!==t.value&&(0,a.jsxs)("span",{className:"mr-1.5 text-xs opacity-70",children:["(",e.filter(e=>"ALL"===t.value||e.status===t.value).length,")"]})]},t.value))}),j?a.jsx("div",{className:"flex items-center justify-center h-40",children:a.jsx(c.Z,{className:"h-6 w-6 animate-spin",style:{color:m.accent}})}):0===e.length?(0,a.jsxs)("div",{className:"bg-white rounded-2xl border p-16 text-center",style:{borderColor:"#E8E0F0"},children:[a.jsx(n.Z,{className:"h-12 w-12 mx-auto mb-4 text-gray-200"}),a.jsx("p",{className:"font-medium text-gray-400 mb-1",children:"لا توجد طلبات بعد"}),a.jsx("p",{className:"text-sm text-gray-400",children:"ستظهر هنا طلبات عملائك فور ورودها"})]}):a.jsx("div",{className:"space-y-3",children:e.map(e=>{let t=P===e.id,s=g[e.status]??[],r=b[e.status]??{bg:"#F5F0FA",color:"#6b7280"};return(0,a.jsxs)("div",{className:"bg-white rounded-2xl border overflow-hidden transition hover:shadow-sm",style:{borderColor:"#E8E0F0"},children:[(0,a.jsxs)("button",{className:"w-full px-5 py-4 flex items-center gap-4 text-right hover:bg-gray-50/50 transition",onClick:()=>Z(t?null:e.id),children:[a.jsx("div",{className:`transition-transform ${t?"rotate-0":"-rotate-90"}`,children:a.jsx(o.Z,{className:"h-4 w-4 text-gray-400"})}),(0,a.jsxs)("div",{className:"flex-1 min-w-0 text-right",children:[(0,a.jsxs)("div",{className:"flex items-center gap-2",children:[a.jsx("span",{className:"font-semibold text-gray-900",children:e.customerName}),a.jsx("span",{className:"text-xs text-gray-400 hidden sm:inline",children:e.customerEmail})]}),(0,a.jsxs)("p",{className:"text-xs text-gray-400 mt-0.5",children:["#",e.id.slice(-8).toUpperCase()," \xb7 ",(0,d.p6)(e.createdAt)]})]}),(0,a.jsxs)("div",{className:"hidden sm:flex items-center gap-1 text-xs text-gray-500",children:[a.jsx(p.Z,{className:"h-3.5 w-3.5"}),e.items?.length??0," منتج"]}),a.jsx("span",{className:"px-3 py-1 rounded-full text-xs font-semibold flex-shrink-0",style:{background:r.bg,color:r.color},children:y[e.status]??e.status}),a.jsx("span",{className:"font-bold flex-shrink-0",style:{color:m.primary},children:(0,d.xG)(e.total)})]}),t&&a.jsx("div",{className:"px-5 pb-5 border-t border-[#F5F0FA]",children:(0,a.jsxs)("div",{className:"grid sm:grid-cols-2 gap-6 mt-4",children:[(0,a.jsxs)("div",{children:[a.jsx("p",{className:"text-xs font-bold mb-3",style:{color:m.secondary},children:"المنتجات"}),(0,a.jsxs)("div",{className:"space-y-2",children:[e.items.map(e=>(0,a.jsxs)("div",{className:"flex items-center gap-3",children:[a.jsx("div",{className:"w-8 h-8 rounded-lg overflow-hidden flex-shrink-0",style:{background:"#F5F0FA"},children:e.product?.images?.[0]?a.jsx("img",{src:e.product.images[0],alt:"",className:"w-full h-full object-cover"}):a.jsx("div",{className:"w-full h-full flex items-center justify-center text-gray-300 text-xs",children:"\uD83D\uDCE6"})}),(0,a.jsxs)("div",{className:"flex-1 min-w-0",children:[a.jsx("p",{className:"text-sm text-gray-700 truncate",children:e.product?.name??e.productId}),(0,a.jsxs)("p",{className:"text-xs text-gray-400",children:["\xd7 ",e.quantity]})]}),a.jsx("span",{className:"text-sm font-medium",style:{color:m.primary},children:(0,d.xG)(e.price*e.quantity)})]},e.id)),(0,a.jsxs)("div",{className:"pt-2 border-t border-[#F5F0FA] flex justify-between font-bold text-sm",children:[a.jsx("span",{style:{color:m.primary},children:"الإجمالي"}),a.jsx("span",{style:{color:m.accent},children:(0,d.xG)(e.total)})]})]})]}),(0,a.jsxs)("div",{children:[a.jsx("p",{className:"text-xs font-bold mb-3",style:{color:m.secondary},children:"عنوان الشحن"}),(0,a.jsxs)("div",{className:"flex items-start gap-2 mb-5 p-3 rounded-xl",style:{background:"#F5F0FA"},children:[a.jsx(h,{className:"h-4 w-4 flex-shrink-0 mt-0.5",style:{color:m.accent}}),(0,a.jsxs)("p",{className:"text-sm text-gray-600 leading-relaxed",children:[e.shippingAddress.line1,e.shippingAddress.line2?`, ${e.shippingAddress.line2}`:"",a.jsx("br",{}),e.shippingAddress.city,"، ",e.shippingAddress.state," ",e.shippingAddress.postalCode,a.jsx("br",{}),e.shippingAddress.country]})]}),s.length>0&&(0,a.jsxs)("div",{children:[a.jsx("p",{className:"text-xs font-bold mb-2",style:{color:m.secondary},children:"تحديث الحالة"}),a.jsx("div",{className:"flex flex-wrap gap-2",children:s.map(t=>(0,a.jsxs)("button",{onClick:()=>D(e.id,t),disabled:w===e.id,className:"flex items-center gap-1.5 px-3 py-2 text-xs font-bold rounded-xl transition disabled:opacity-50 hover:opacity-90",style:{background:"CANCELLED"===t?"#FEE2E2":`linear-gradient(135deg, ${m.primary}, ${m.accent})`,color:"CANCELLED"===t?"#991B1B":"white"},children:[w===e.id?a.jsx(c.Z,{className:"h-3 w-3 animate-spin"}):null,f[t]??t]},t))})]}),"DELIVERED"===e.status&&(0,a.jsxs)("div",{className:"flex items-center gap-2 mt-3 px-3 py-2 rounded-xl",style:{background:"#D1FAE5"},children:[a.jsx(x.Z,{className:"h-4 w-4",style:{color:"#065F46"}}),a.jsx("span",{className:"text-xs font-medium",style:{color:"#065F46"},children:"تم تسليم هذا الطلب بنجاح"})]})]})]})})]},e.id)})})]})}},10828:(e,t,s)=>{"use strict";function a(e){try{return}catch{}}function r(e,t){a({event:"page_view",page:e,meta:t})}s.d(t,{K:()=>r,j:()=>a})},72742:(e,t,s)=>{"use strict";s.d(t,{Z:()=>a});/**
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
 */let a=(0,s(71993).Z)("Check",[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]])},4610:(e,t,s)=>{"use strict";s.d(t,{Z:()=>a});/**
 * @license lucide-react v0.363.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let a=(0,s(71993).Z)("ChevronDown",[["path",{d:"m6 9 6 6 6-6",key:"qrunsl"}]])},75880:(e,t,s)=>{"use strict";s.d(t,{Z:()=>a});/**
 * @license lucide-react v0.363.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let a=(0,s(71993).Z)("ChevronLeft",[["path",{d:"m15 18-6-6 6-6",key:"1wnfg3"}]])},59709:(e,t,s)=>{"use strict";s.d(t,{Z:()=>a});/**
 * @license lucide-react v0.363.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let a=(0,s(71993).Z)("Crown",[["path",{d:"M11.562 3.266a.5.5 0 0 1 .876 0L15.39 8.87a1 1 0 0 0 1.516.294L21.183 5.5a.5.5 0 0 1 .798.519l-2.834 10.246a1 1 0 0 1-.956.734H5.81a1 1 0 0 1-.957-.734L2.02 6.02a.5.5 0 0 1 .798-.519l4.276 3.664a1 1 0 0 0 1.516-.294z",key:"1vdc57"}],["path",{d:"M5 21h14",key:"11awu3"}]])},55165:(e,t,s)=>{"use strict";s.d(t,{Z:()=>a});/**
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
 */let a=(0,s(71993).Z)("Palette",[["circle",{cx:"13.5",cy:"6.5",r:".5",fill:"currentColor",key:"1okk4w"}],["circle",{cx:"17.5",cy:"10.5",r:".5",fill:"currentColor",key:"f64h9f"}],["circle",{cx:"8.5",cy:"7.5",r:".5",fill:"currentColor",key:"fotxhn"}],["circle",{cx:"6.5",cy:"12.5",r:".5",fill:"currentColor",key:"qy21gx"}],["path",{d:"M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z",key:"12rzf8"}]])},92015:(e,t,s)=>{"use strict";s.d(t,{Z:()=>a});/**
 * @license lucide-react v0.363.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let a=(0,s(71993).Z)("Settings",[["path",{d:"M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z",key:"1qme2f"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]])},61964:(e,t,s)=>{"use strict";s.d(t,{Z:()=>a});/**
 * @license lucide-react v0.363.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let a=(0,s(71993).Z)("Shield",[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",key:"oel41y"}]])},22722:(e,t,s)=>{"use strict";s.d(t,{Z:()=>a});/**
 * @license lucide-react v0.363.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let a=(0,s(71993).Z)("ShoppingBag",[["path",{d:"M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z",key:"hou9p0"}],["path",{d:"M3 6h18",key:"d0wm0j"}],["path",{d:"M16 10a4 4 0 0 1-8 0",key:"1ltviw"}]])},68387:(e,t,s)=>{"use strict";s.d(t,{Z:()=>a});/**
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
 */let a=(0,s(71993).Z)("Tag",[["path",{d:"M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z",key:"vktsd0"}],["circle",{cx:"7.5",cy:"7.5",r:".5",fill:"currentColor",key:"kqv944"}]])},54654:(e,t,s)=>{"use strict";s.d(t,{Z:()=>a});/**
 * @license lucide-react v0.363.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let a=(0,s(71993).Z)("X",[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]])},12940:(e,t,s)=>{"use strict";s.d(t,{Z:()=>a});/**
 * @license lucide-react v0.363.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let a=(0,s(71993).Z)("Zap",[["path",{d:"M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z",key:"1xq2db"}]])},35817:(e,t,s)=>{"use strict";var a=s(67435);s.o(a,"useParams")&&s.d(t,{useParams:function(){return a.useParams}}),s.o(a,"usePathname")&&s.d(t,{usePathname:function(){return a.usePathname}}),s.o(a,"useRouter")&&s.d(t,{useRouter:function(){return a.useRouter}}),s.o(a,"useSearchParams")&&s.d(t,{useSearchParams:function(){return a.useSearchParams}})},13501:(e,t,s)=>{"use strict";s.r(t),s.d(t,{$$typeof:()=>l,__esModule:()=>r,default:()=>i});let a=(0,s(30599).createProxy)(String.raw`/Applications/XAMPP/xamppfiles/htdocs/bazar/apps/web/src/app/(dashboard)/dashboard/orders/page.tsx`),{__esModule:r,$$typeof:l}=a,i=a.default}};var t=require("../../../../webpack-runtime.js");t.C(e);var s=e=>t(t.s=e),a=t.X(0,[3936,5352,5924,2631,7603],()=>s(5632));module.exports=a})();
(()=>{var e={};e.id=6320,e.ids=[6320],e.modules={47849:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external")},72934:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external.js")},55403:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external")},54580:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external.js")},94749:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external")},45869:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},20399:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},86534:(e,t,i)=>{"use strict";i.r(t),i.d(t,{GlobalError:()=>n.a,__next_app__:()=>h,originalPathname:()=>p,pages:()=>c,routeModule:()=>x,tree:()=>o});var s=i(59441),r=i(1498),a=i(6580),n=i.n(a),l=i(15511),d={};for(let e in l)0>["default","tree","pages","GlobalError","originalPathname","__next_app__","routeModule"].indexOf(e)&&(d[e]=()=>l[e]);i.d(t,d);let o=["",{children:["(admin)",{children:["admin",{children:["widget",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(i.bind(i,3316)),"/Applications/XAMPP/xamppfiles/htdocs/bazar/apps/web/src/app/(admin)/admin/widget/page.tsx"]}]},{}]},{}]},{layout:[()=>Promise.resolve().then(i.bind(i,48009)),"/Applications/XAMPP/xamppfiles/htdocs/bazar/apps/web/src/app/(admin)/layout.tsx"]}]},{layout:[()=>Promise.resolve().then(i.bind(i,38205)),"/Applications/XAMPP/xamppfiles/htdocs/bazar/apps/web/src/app/layout.tsx"],error:[()=>Promise.resolve().then(i.bind(i,61530)),"/Applications/XAMPP/xamppfiles/htdocs/bazar/apps/web/src/app/error.tsx"],"not-found":[()=>Promise.resolve().then(i.bind(i,77123)),"/Applications/XAMPP/xamppfiles/htdocs/bazar/apps/web/src/app/not-found.tsx"]}],c=["/Applications/XAMPP/xamppfiles/htdocs/bazar/apps/web/src/app/(admin)/admin/widget/page.tsx"],p="/(admin)/admin/widget/page",h={require:i,loadChunk:()=>Promise.resolve()},x=new s.AppPageRouteModule({definition:{kind:r.x.APP_PAGE,page:"/(admin)/admin/widget/page",pathname:"/admin/widget",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:o}})},38590:(e,t,i)=>{Promise.resolve().then(i.bind(i,63542))},78126:(e,t,i)=>{Promise.resolve().then(i.bind(i,43458))},63542:(e,t,i)=>{"use strict";i.r(t),i.d(t,{default:()=>g});var s=i(27685),r=i(83810),a=i(70390),n=i(19989);/**
 * @license lucide-react v0.363.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let l=(0,i(71993).Z)("MousePointerClick",[["path",{d:"m9 9 5 12 1.8-5.2L21 14Z",key:"1b76lo"}],["path",{d:"M7.2 2.2 8 5.1",key:"1cfko1"}],["path",{d:"m5.1 8-2.9-.8",key:"1go3kf"}],["path",{d:"M14 4.1 12 6",key:"ita8i4"}],["path",{d:"m6 12-1.9 2",key:"mnht97"}]]);var d=i(22722),o=i(87850),c=i(9406),p=i(1535),h=i(50436),x=i(39881);let y={p:"#432E54",s:"#4B4376",a:"#AE445A"};function g(){let[e,t]=(0,r.useState)([]),[i,g]=(0,r.useState)(!0),[u,m]=(0,r.useState)({}),f=async()=>{try{let e=await x.hi.get("/api/widget/admin/stats");t(e.data??[])}catch{h.toast.error("فشل تحميل إحصائيات الويدجت")}finally{g(!1)}};(0,r.useEffect)(()=>{f()},[]);let b=async(e,i)=>{m(t=>({...t,[e]:!0}));try{await x.hi.patch(`/api/widget/admin/stores/${e}`,{widgetEnabled:!i}),t(t=>t.map(t=>t.storeId===e?{...t,widgetEnabled:!i}:t)),h.toast.success(i?"تم إيقاف الويدجت":"تم تفعيل الويدجت")}catch{h.toast.error("فشل التحديث")}finally{m(t=>({...t,[e]:!1}))}},k=e.reduce((e,t)=>({impressions:e.impressions+t.impressions,clicks:e.clicks+t.clicks,conversions:e.conversions+t.conversions,enabled:e.enabled+(t.widgetEnabled?1:0)}),{impressions:0,clicks:0,conversions:0,enabled:0});return(0,s.jsxs)("div",{style:{padding:32,maxWidth:1100,margin:"0 auto"},children:[(0,s.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:12,marginBottom:24},children:[s.jsx("div",{style:{width:44,height:44,borderRadius:12,background:"#EDE8F5",display:"flex",alignItems:"center",justifyContent:"center"},children:s.jsx(a.Z,{size:22,color:y.s})}),(0,s.jsxs)("div",{children:[s.jsx("h1",{style:{fontSize:20,fontWeight:800,color:y.p,margin:0},children:"إعدادات الويدجت"}),s.jsx("p",{style:{fontSize:13,color:"#6B7280",margin:0},children:"إدارة ويدجتات التجارة المدمجة عبر جميع المتاجر"})]})]}),s.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:16,marginBottom:24},children:[{label:"ويدجتات نشطة",value:k.enabled,icon:s.jsx(a.Z,{size:20,color:y.s}),bg:"#EDE8F5"},{label:"المشاهدات",value:k.impressions.toLocaleString(),icon:s.jsx(n.Z,{size:20,color:"#2563EB"}),bg:"#DBEAFE"},{label:"النقرات",value:k.clicks.toLocaleString(),icon:s.jsx(l,{size:20,color:"#D97706"}),bg:"#FEF3C7"},{label:"التحويلات",value:k.conversions.toLocaleString(),icon:s.jsx(d.Z,{size:20,color:"#059669"}),bg:"#D1FAE5"}].map(({label:e,value:t,icon:i,bg:r})=>s.jsx("div",{style:{background:"#fff",borderRadius:14,border:"1px solid #E8E0F0",padding:"16px 20px"},children:(0,s.jsxs)("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between"},children:[(0,s.jsxs)("div",{children:[s.jsx("p",{style:{fontSize:12,color:"#6B7280",margin:0},children:e}),s.jsx("p",{style:{fontSize:20,fontWeight:800,color:y.p,margin:"4px 0 0"},children:String(t)})]}),s.jsx("div",{style:{padding:10,borderRadius:10,background:r},children:i})]})},e))}),k.clicks>0&&(0,s.jsxs)("div",{style:{marginBottom:24,background:"linear-gradient(90deg,#EDE8F5,#FCE7EC)",border:"1px solid #E8E0F0",borderRadius:14,padding:"16px 20px",display:"flex",alignItems:"center",gap:16},children:[(0,s.jsxs)("div",{style:{fontSize:30,fontWeight:800,color:y.a},children:[(k.conversions/k.clicks*100).toFixed(1),"%"]}),(0,s.jsxs)("div",{children:[s.jsx("p",{style:{fontWeight:700,color:y.p,margin:0},children:"متوسط معدل التحويل"}),(0,s.jsxs)("p",{style:{fontSize:13,color:"#6B7280",margin:0},children:[k.conversions," طلب من ",k.clicks," نقرة عبر جميع الويدجتات"]})]})]}),s.jsx("div",{style:{background:"#fff",borderRadius:16,border:"1px solid #E8E0F0",overflow:"hidden"},children:i?s.jsx("div",{style:{display:"flex",alignItems:"center",justifyContent:"center",height:160},children:s.jsx(o.Z,{size:24,color:y.s,style:{animation:"spin 1s linear infinite"}})}):(0,s.jsxs)("table",{style:{width:"100%",borderCollapse:"collapse",fontSize:13},children:[s.jsx("thead",{children:s.jsx("tr",{style:{background:"#F9F7FC",borderBottom:"1px solid #E8E0F0"},children:["المتجر","الرابط","المشاهدات","النقرات","التحويلات","معدل CVR","الويدجت"].map(e=>s.jsx("th",{style:{padding:"10px 16px",textAlign:"right",fontWeight:700,color:y.p,fontSize:12},children:e},e))})}),s.jsx("tbody",{children:0===e.length?s.jsx("tr",{children:s.jsx("td",{colSpan:7,style:{padding:"40px 16px",textAlign:"center",color:"#9CA3AF"},children:"لا يوجد متاجر"})}):e.map((e,t)=>{let i=e.clicks>0?(e.conversions/e.clicks*100).toFixed(1):"—";return(0,s.jsxs)("tr",{style:{borderTop:"1px solid #F3F0F8",background:t%2==0?"#fff":"#FDFCFE"},children:[s.jsx("td",{style:{padding:"12px 16px",fontWeight:600,color:y.p},children:e.storeName}),s.jsx("td",{style:{padding:"12px 16px",color:"#9CA3AF",fontFamily:"monospace",fontSize:11},children:e.slug}),s.jsx("td",{style:{padding:"12px 16px"},children:(0,s.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:6},children:[s.jsx(n.Z,{size:13,color:"#9CA3AF"}),s.jsx("span",{style:{color:"#6B7280"},children:e.impressions.toLocaleString()})]})}),s.jsx("td",{style:{padding:"12px 16px"},children:(0,s.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:6},children:[s.jsx(l,{size:13,color:"#D97706"}),s.jsx("span",{style:{color:"#6B7280"},children:e.clicks.toLocaleString()})]})}),s.jsx("td",{style:{padding:"12px 16px"},children:(0,s.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:6},children:[s.jsx(d.Z,{size:13,color:"#059669"}),s.jsx("span",{style:{color:"#6B7280"},children:e.conversions.toLocaleString()})]})}),s.jsx("td",{style:{padding:"12px 16px"},children:(0,s.jsxs)("span",{style:{fontWeight:600,color:"—"!==i&&parseFloat(i)>5?"#059669":"#6B7280"},children:[i,"—"!==i?"%":""]})}),s.jsx("td",{style:{padding:"12px 16px"},children:(0,s.jsxs)("button",{onClick:()=>b(e.storeId,e.widgetEnabled),disabled:u[e.storeId],style:{display:"inline-flex",alignItems:"center",gap:6,background:"transparent",border:"none",cursor:"pointer",fontFamily:"inherit"},children:[u[e.storeId]?s.jsx(o.Z,{size:20,color:"#9CA3AF",style:{animation:"spin 1s linear infinite"}}):e.widgetEnabled?s.jsx(c.Z,{size:24,color:y.a}):s.jsx(p.Z,{size:24,color:"#9CA3AF"}),s.jsx("span",{style:{fontSize:12,fontWeight:600,color:e.widgetEnabled?y.a:"#9CA3AF"},children:e.widgetEnabled?"مفعّل":"موقوف"})]})})]},e.storeId)})})]})}),(0,s.jsxs)("div",{style:{marginTop:24,background:y.p,borderRadius:14,padding:20,fontSize:13},children:[s.jsx("p",{style:{color:"rgba(255,255,255,.5)",fontFamily:"monospace",marginBottom:8},children:"<!-- مثال على كود التضمين -->"}),s.jsx("pre",{style:{color:"#86EFAC",fontFamily:"monospace",fontSize:12,lineHeight:1.6,overflowX:"auto",margin:0},children:`<div data-storebuilder data-store="your-slug" data-theme="light"></div>
<script src="http://localhost:3000/widget.js"></script>`}),s.jsx("p",{style:{color:"rgba(255,255,255,.4)",fontSize:12,marginTop:12,marginBottom:0},children:"يحصل التجار على كود التضمين الخاص بهم من لوحة التحكم → إعدادات الويدجت."})]})]})}},43458:(e,t,i)=>{"use strict";i.r(t),i.d(t,{default:()=>C});var s=i(27685),r=i(83810),a=i(35817),n=i(13161),l=i(55165),d=i(61099),o=i(88883),c=i(68387),p=i(25760),h=i(3045),x=i(92107),y=i(46183),g=i(70390),u=i(1943),m=i(8320),f=i(21171),b=i(1424),k=i(22696),j=i(34034),v=i(57126);let Z={p:"#432E54",a:"#AE445A"},w=[{href:"/admin",label:"لوحة التحكم",icon:l.Z,exact:!0},{href:"/admin/merchants",label:"التجار",icon:d.Z},{href:"/admin/stores",label:"المتاجر",icon:o.Z},{href:"/admin/orders",label:"الطلبات",icon:c.Z},{href:"/admin/analytics",label:"التحليلات",icon:p.Z},{href:"/admin/merchant-analytics",label:"تتبع التجار",icon:h.Z},{href:"/admin/logs",label:"سجل المراقبة",icon:x.Z},{href:"/admin/ai",label:"الذكاء الاصطناعي",icon:y.Z},{href:"/admin/widget",label:"إعدادات الويدجت",icon:g.Z},{href:"/admin/marketplace",label:"السوق",icon:u.Z},{href:"/admin/loyalty",label:"برنامج الولاء",icon:m.Z},{href:"/admin/payments",label:"طلبات الدفع",icon:f.Z},{href:"/admin/subscriptions",label:"الاشتراكات",icon:b.Z}];function M(){let e=(0,a.usePathname)(),t=(0,a.useRouter)(),{user:i,logout:r}=(0,j.t)();return(0,s.jsxs)("aside",{style:{width:240,minHeight:"100vh",background:Z.p,color:"#fff",display:"flex",flexDirection:"column"},children:[(0,s.jsxs)("div",{style:{padding:"20px 24px 16px",borderBottom:"1px solid rgba(255,255,255,.1)"},children:[(0,s.jsxs)("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between"},children:[(0,s.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:8},children:[s.jsx("div",{style:{width:32,height:32,background:Z.a,borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center",fontSize:16},children:"\uD83D\uDECD"}),s.jsx("span",{style:{fontSize:17,fontWeight:800,color:"#fff"},children:"StoreBuilder"})]}),s.jsx(v.L,{variant:"dark"})]}),s.jsx("p",{style:{fontSize:11,color:"rgba(255,255,255,.5)",marginTop:6},children:"لوحة الإدارة العليا"})]}),s.jsx("nav",{style:{flex:1,padding:"16px 12px",display:"flex",flexDirection:"column",gap:2},children:w.map(({href:t,label:i,icon:r,exact:a})=>{let l=a?e===t:e.startsWith(t);return(0,s.jsxs)(n.default,{href:t,style:{display:"flex",alignItems:"center",gap:10,padding:"9px 12px",borderRadius:10,fontSize:13,fontWeight:l?700:500,textDecoration:"none",transition:"all .15s",background:l?Z.a:"transparent",color:l?"#fff":"rgba(255,255,255,.65)"},children:[s.jsx(r,{size:16}),i]},t)})}),(0,s.jsxs)("div",{style:{padding:"12px",borderTop:"1px solid rgba(255,255,255,.1)"},children:[(0,s.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:10,padding:"8px 12px",marginBottom:4},children:[s.jsx("div",{style:{width:32,height:32,borderRadius:"50%",background:Z.a,display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,fontWeight:700},children:i?.name?.charAt(0)?.toUpperCase()??"A"}),(0,s.jsxs)("div",{style:{flex:1,minWidth:0},children:[s.jsx("p",{style:{fontSize:13,fontWeight:600,color:"#fff",margin:0,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},children:i?.name}),s.jsx("p",{style:{fontSize:11,color:"rgba(255,255,255,.5)",margin:0},children:"مشرف عام"})]})]}),(0,s.jsxs)("button",{onClick:()=>{r(),t.push("/login")},style:{width:"100%",display:"flex",alignItems:"center",gap:8,padding:"8px 12px",borderRadius:8,background:"transparent",border:"none",cursor:"pointer",color:"#F87171",fontSize:13,fontFamily:"inherit",transition:"background .15s"},onMouseEnter:e=>e.currentTarget.style.background="rgba(239,68,68,.15)",onMouseLeave:e=>e.currentTarget.style.background="transparent",children:[s.jsx(k.Z,{size:15}),"تسجيل الخروج"]})]})]})}var z=i(22842),A=i(73229),E=i(54654);function S(){let{isEditorMode:e,editingStore:t,exitEditorMode:i}=(0,z.E)();return e&&t?(0,s.jsxs)("div",{style:{width:"100%",background:"linear-gradient(90deg,#AE445A,#432E54)",color:"#fff",padding:"8px 20px",display:"flex",alignItems:"center",justifyContent:"space-between",fontSize:13,fontWeight:500,zIndex:50},children:[(0,s.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:8},children:[s.jsx(A.Z,{size:15}),(0,s.jsxs)("span",{children:["أنت تعدّل متجر ",s.jsx("strong",{children:t.name})," كمشرف — كل التغييرات مسجّلة"]})]}),(0,s.jsxs)("button",{onClick:i,style:{display:"flex",alignItems:"center",gap:4,padding:"3px 10px",background:"rgba(255,255,255,.2)",border:"none",borderRadius:6,cursor:"pointer",color:"#fff",fontSize:12,fontFamily:"inherit"},children:[s.jsx(E.Z,{size:13})," خروج"]})]}):null}function C({children:e}){let t=(0,a.useRouter)(),{user:i,token:n,_hasHydrated:l}=(0,j.t)();return((0,r.useEffect)(()=>{if(l){if(!n||!i){t.push("/login");return}"SUPER_ADMIN"!==i.role&&t.push("MERCHANT"===i.role?"/dashboard":"/")}},[n,i,t,l]),l)?i&&"SUPER_ADMIN"===i.role?(0,s.jsxs)("div",{className:"flex min-h-screen",style:{background:"#F5F0FA"},children:[s.jsx(M,{}),(0,s.jsxs)("div",{className:"flex-1 flex flex-col overflow-hidden",children:[s.jsx(S,{}),s.jsx("main",{className:"flex-1 overflow-auto",children:e})]})]}):null:(0,s.jsxs)("div",{style:{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",background:"#F5F0FA"},children:[s.jsx("div",{style:{width:36,height:36,borderRadius:"50%",border:"3px solid #E8BCB9",borderTopColor:"#432E54",animation:"spin 0.7s linear infinite"}}),s.jsx("style",{children:"@keyframes spin{to{transform:rotate(360deg)}}"})]})}},22842:(e,t,i)=>{"use strict";i.d(t,{E:()=>s});let s=(0,i(29866).Ue)(e=>({isEditorMode:!1,editingStore:null,enterEditorMode:t=>e({isEditorMode:!0,editingStore:t}),exitEditorMode:()=>e({isEditorMode:!1,editingStore:null})}))},3045:(e,t,i)=>{"use strict";i.d(t,{Z:()=>s});/**
 * @license lucide-react v0.363.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let s=(0,i(71993).Z)("Activity",[["path",{d:"M22 12h-4l-3 9L9 3l-3 9H2",key:"d5dnw9"}]])},25760:(e,t,i)=>{"use strict";i.d(t,{Z:()=>s});/**
 * @license lucide-react v0.363.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let s=(0,i(71993).Z)("BarChart2",[["line",{x1:"18",x2:"18",y1:"20",y2:"10",key:"1xfpm4"}],["line",{x1:"12",x2:"12",y1:"20",y2:"4",key:"be30l9"}],["line",{x1:"6",x2:"6",y1:"20",y2:"14",key:"1r4le6"}]])},72742:(e,t,i)=>{"use strict";i.d(t,{Z:()=>s});/**
 * @license lucide-react v0.363.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let s=(0,i(71993).Z)("Bell",[["path",{d:"M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9",key:"1qo2s2"}],["path",{d:"M10.3 21a1.94 1.94 0 0 0 3.4 0",key:"qgo35s"}]])},1424:(e,t,i)=>{"use strict";i.d(t,{Z:()=>s});/**
 * @license lucide-react v0.363.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let s=(0,i(71993).Z)("CalendarCheck",[["path",{d:"M8 2v4",key:"1cmpym"}],["path",{d:"M16 2v4",key:"4m81vk"}],["rect",{width:"18",height:"18",x:"3",y:"4",rx:"2",key:"1hopcy"}],["path",{d:"M3 10h18",key:"8toen8"}],["path",{d:"m9 16 2 2 4-4",key:"19s6y9"}]])},10617:(e,t,i)=>{"use strict";i.d(t,{Z:()=>s});/**
 * @license lucide-react v0.363.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let s=(0,i(71993).Z)("CheckCheck",[["path",{d:"M18 6 7 17l-5-5",key:"116fxf"}],["path",{d:"m22 10-7.5 7.5L13 16",key:"ke71qq"}]])},63197:(e,t,i)=>{"use strict";i.d(t,{Z:()=>s});/**
 * @license lucide-react v0.363.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let s=(0,i(71993).Z)("Check",[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]])},92107:(e,t,i)=>{"use strict";i.d(t,{Z:()=>s});/**
 * @license lucide-react v0.363.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let s=(0,i(71993).Z)("ClipboardList",[["rect",{width:"8",height:"4",x:"8",y:"2",rx:"1",ry:"1",key:"tgr4d6"}],["path",{d:"M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2",key:"116196"}],["path",{d:"M12 11h4",key:"1jrz19"}],["path",{d:"M12 16h4",key:"n85exb"}],["path",{d:"M8 11h.01",key:"1dfujw"}],["path",{d:"M8 16h.01",key:"18s6g9"}]])},70390:(e,t,i)=>{"use strict";i.d(t,{Z:()=>s});/**
 * @license lucide-react v0.363.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let s=(0,i(71993).Z)("CodeXml",[["path",{d:"m18 16 4-4-4-4",key:"1inbqp"}],["path",{d:"m6 8-4 4 4 4",key:"15zrgr"}],["path",{d:"m14.5 4-5 16",key:"e7oirm"}]])},21171:(e,t,i)=>{"use strict";i.d(t,{Z:()=>s});/**
 * @license lucide-react v0.363.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let s=(0,i(71993).Z)("CreditCard",[["rect",{width:"20",height:"14",x:"2",y:"5",rx:"2",key:"ynyp8z"}],["line",{x1:"2",x2:"22",y1:"10",y2:"10",key:"1b3vmo"}]])},59709:(e,t,i)=>{"use strict";i.d(t,{Z:()=>s});/**
 * @license lucide-react v0.363.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let s=(0,i(71993).Z)("Crown",[["path",{d:"M11.562 3.266a.5.5 0 0 1 .876 0L15.39 8.87a1 1 0 0 0 1.516.294L21.183 5.5a.5.5 0 0 1 .798.519l-2.834 10.246a1 1 0 0 1-.956.734H5.81a1 1 0 0 1-.957-.734L2.02 6.02a.5.5 0 0 1 .798-.519l4.276 3.664a1 1 0 0 0 1.516-.294z",key:"1vdc57"}],["path",{d:"M5 21h14",key:"11awu3"}]])},19989:(e,t,i)=>{"use strict";i.d(t,{Z:()=>s});/**
 * @license lucide-react v0.363.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let s=(0,i(71993).Z)("Eye",[["path",{d:"M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z",key:"rwhkz3"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]])},8320:(e,t,i)=>{"use strict";i.d(t,{Z:()=>s});/**
 * @license lucide-react v0.363.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let s=(0,i(71993).Z)("Gift",[["rect",{x:"3",y:"8",width:"18",height:"4",rx:"1",key:"bkv52"}],["path",{d:"M12 8v13",key:"1c76mn"}],["path",{d:"M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7",key:"6wjy6b"}],["path",{d:"M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5",key:"1ihvrl"}]])},1943:(e,t,i)=>{"use strict";i.d(t,{Z:()=>s});/**
 * @license lucide-react v0.363.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let s=(0,i(71993).Z)("Globe",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20",key:"13o1zl"}],["path",{d:"M2 12h20",key:"9i4pu4"}]])},55165:(e,t,i)=>{"use strict";i.d(t,{Z:()=>s});/**
 * @license lucide-react v0.363.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let s=(0,i(71993).Z)("LayoutDashboard",[["rect",{width:"7",height:"9",x:"3",y:"3",rx:"1",key:"10lvy0"}],["rect",{width:"7",height:"5",x:"14",y:"3",rx:"1",key:"16une8"}],["rect",{width:"7",height:"9",x:"14",y:"12",rx:"1",key:"1hutg5"}],["rect",{width:"7",height:"5",x:"3",y:"16",rx:"1",key:"ldoo1y"}]])},87850:(e,t,i)=>{"use strict";i.d(t,{Z:()=>s});/**
 * @license lucide-react v0.363.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let s=(0,i(71993).Z)("LoaderCircle",[["path",{d:"M21 12a9 9 0 1 1-6.219-8.56",key:"13zald"}]])},22696:(e,t,i)=>{"use strict";i.d(t,{Z:()=>s});/**
 * @license lucide-react v0.363.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let s=(0,i(71993).Z)("LogOut",[["path",{d:"M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4",key:"1uf3rs"}],["polyline",{points:"16 17 21 12 16 7",key:"1gabdz"}],["line",{x1:"21",x2:"9",y1:"12",y2:"12",key:"1uyos4"}]])},61964:(e,t,i)=>{"use strict";i.d(t,{Z:()=>s});/**
 * @license lucide-react v0.363.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let s=(0,i(71993).Z)("Shield",[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",key:"oel41y"}]])},22722:(e,t,i)=>{"use strict";i.d(t,{Z:()=>s});/**
 * @license lucide-react v0.363.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let s=(0,i(71993).Z)("ShoppingBag",[["path",{d:"M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z",key:"hou9p0"}],["path",{d:"M3 6h18",key:"d0wm0j"}],["path",{d:"M16 10a4 4 0 0 1-8 0",key:"1ltviw"}]])},68387:(e,t,i)=>{"use strict";i.d(t,{Z:()=>s});/**
 * @license lucide-react v0.363.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let s=(0,i(71993).Z)("ShoppingCart",[["circle",{cx:"8",cy:"21",r:"1",key:"jimo8o"}],["circle",{cx:"19",cy:"21",r:"1",key:"13723u"}],["path",{d:"M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12",key:"9zh506"}]])},46183:(e,t,i)=>{"use strict";i.d(t,{Z:()=>s});/**
 * @license lucide-react v0.363.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let s=(0,i(71993).Z)("Sparkles",[["path",{d:"m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z",key:"17u4zn"}],["path",{d:"M5 3v4",key:"bklmnn"}],["path",{d:"M19 17v4",key:"iiml17"}],["path",{d:"M3 5h4",key:"nem4j1"}],["path",{d:"M17 19h4",key:"lbex7p"}]])},73229:(e,t,i)=>{"use strict";i.d(t,{Z:()=>s});/**
 * @license lucide-react v0.363.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let s=(0,i(71993).Z)("SquarePen",[["path",{d:"M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7",key:"1m0v6g"}],["path",{d:"M18.375 2.625a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4Z",key:"1lpok0"}]])},88883:(e,t,i)=>{"use strict";i.d(t,{Z:()=>s});/**
 * @license lucide-react v0.363.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let s=(0,i(71993).Z)("Store",[["path",{d:"m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7",key:"ztvudi"}],["path",{d:"M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8",key:"1b2hhj"}],["path",{d:"M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4",key:"2ebpfo"}],["path",{d:"M2 7h20",key:"1fcdvo"}],["path",{d:"M22 7v3a2 2 0 0 1-2 2v0a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 16 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 12 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 8 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 4 12v0a2 2 0 0 1-2-2V7",key:"jon5kx"}]])},1535:(e,t,i)=>{"use strict";i.d(t,{Z:()=>s});/**
 * @license lucide-react v0.363.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let s=(0,i(71993).Z)("ToggleLeft",[["rect",{width:"20",height:"12",x:"2",y:"6",rx:"6",ry:"6",key:"f2vt7d"}],["circle",{cx:"8",cy:"12",r:"2",key:"1nvbw3"}]])},9406:(e,t,i)=>{"use strict";i.d(t,{Z:()=>s});/**
 * @license lucide-react v0.363.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let s=(0,i(71993).Z)("ToggleRight",[["rect",{width:"20",height:"12",x:"2",y:"6",rx:"6",ry:"6",key:"f2vt7d"}],["circle",{cx:"16",cy:"12",r:"2",key:"4ma0v8"}]])},61099:(e,t,i)=>{"use strict";i.d(t,{Z:()=>s});/**
 * @license lucide-react v0.363.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let s=(0,i(71993).Z)("Users",[["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",key:"1yyitq"}],["circle",{cx:"9",cy:"7",r:"4",key:"nufk8"}],["path",{d:"M22 21v-2a4 4 0 0 0-3-3.87",key:"kshegd"}],["path",{d:"M16 3.13a4 4 0 0 1 0 7.75",key:"1da9ce"}]])},54654:(e,t,i)=>{"use strict";i.d(t,{Z:()=>s});/**
 * @license lucide-react v0.363.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let s=(0,i(71993).Z)("X",[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]])},12940:(e,t,i)=>{"use strict";i.d(t,{Z:()=>s});/**
 * @license lucide-react v0.363.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let s=(0,i(71993).Z)("Zap",[["path",{d:"M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z",key:"1xq2db"}]])},35817:(e,t,i)=>{"use strict";var s=i(67435);i.o(s,"useParams")&&i.d(t,{useParams:function(){return s.useParams}}),i.o(s,"usePathname")&&i.d(t,{usePathname:function(){return s.usePathname}}),i.o(s,"useRouter")&&i.d(t,{useRouter:function(){return s.useRouter}}),i.o(s,"useSearchParams")&&i.d(t,{useSearchParams:function(){return s.useSearchParams}})},3316:(e,t,i)=>{"use strict";i.r(t),i.d(t,{$$typeof:()=>a,__esModule:()=>r,default:()=>n});let s=(0,i(30599).createProxy)(String.raw`/Applications/XAMPP/xamppfiles/htdocs/bazar/apps/web/src/app/(admin)/admin/widget/page.tsx`),{__esModule:r,$$typeof:a}=s,n=s.default},48009:(e,t,i)=>{"use strict";i.r(t),i.d(t,{$$typeof:()=>a,__esModule:()=>r,default:()=>n});let s=(0,i(30599).createProxy)(String.raw`/Applications/XAMPP/xamppfiles/htdocs/bazar/apps/web/src/app/(admin)/layout.tsx`),{__esModule:r,$$typeof:a}=s,n=s.default}};var t=require("../../../../webpack-runtime.js");t.C(e);var i=e=>t(t.s=e),s=t.X(0,[3936,5352,2631],()=>i(86534));module.exports=s})();
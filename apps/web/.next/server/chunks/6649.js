exports.id=6649,exports.ids=[6649],exports.modules={78126:(e,t,a)=>{Promise.resolve().then(a.bind(a,43458))},43458:(e,t,a)=>{"use strict";a.r(t),a.d(t,{default:()=>E});var i=a(27685),r=a(83810),d=a(35817),l=a(13161),s=a(55165),n=a(61099),o=a(88883),h=a(68387),c=a(25760),y=a(3045),p=a(92107),x=a(46183),f=a(70390),u=a(1943),k=a(8320),g=a(21171),m=a(1424),b=a(22696),Z=a(34034),v=a(57126);let M={p:"#432E54",a:"#AE445A"},j=[{href:"/admin",label:"لوحة التحكم",icon:s.Z,exact:!0},{href:"/admin/merchants",label:"التجار",icon:n.Z},{href:"/admin/stores",label:"المتاجر",icon:o.Z},{href:"/admin/orders",label:"الطلبات",icon:h.Z},{href:"/admin/analytics",label:"التحليلات",icon:c.Z},{href:"/admin/merchant-analytics",label:"تتبع التجار",icon:y.Z},{href:"/admin/logs",label:"سجل المراقبة",icon:p.Z},{href:"/admin/ai",label:"الذكاء الاصطناعي",icon:x.Z},{href:"/admin/widget",label:"إعدادات الويدجت",icon:f.Z},{href:"/admin/marketplace",label:"السوق",icon:u.Z},{href:"/admin/loyalty",label:"برنامج الولاء",icon:k.Z},{href:"/admin/payments",label:"طلبات الدفع",icon:g.Z},{href:"/admin/subscriptions",label:"الاشتراكات",icon:m.Z}];function w(){let e=(0,d.usePathname)(),t=(0,d.useRouter)(),{user:a,logout:r}=(0,Z.t)();return(0,i.jsxs)("aside",{style:{width:240,minHeight:"100vh",background:M.p,color:"#fff",display:"flex",flexDirection:"column"},children:[(0,i.jsxs)("div",{style:{padding:"20px 24px 16px",borderBottom:"1px solid rgba(255,255,255,.1)"},children:[(0,i.jsxs)("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between"},children:[(0,i.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:8},children:[i.jsx("div",{style:{width:32,height:32,background:M.a,borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center",fontSize:16},children:"\uD83D\uDECD"}),i.jsx("span",{style:{fontSize:17,fontWeight:800,color:"#fff"},children:"StoreBuilder"})]}),i.jsx(v.L,{variant:"dark"})]}),i.jsx("p",{style:{fontSize:11,color:"rgba(255,255,255,.5)",marginTop:6},children:"لوحة الإدارة العليا"})]}),i.jsx("nav",{style:{flex:1,padding:"16px 12px",display:"flex",flexDirection:"column",gap:2},children:j.map(({href:t,label:a,icon:r,exact:d})=>{let s=d?e===t:e.startsWith(t);return(0,i.jsxs)(l.default,{href:t,style:{display:"flex",alignItems:"center",gap:10,padding:"9px 12px",borderRadius:10,fontSize:13,fontWeight:s?700:500,textDecoration:"none",transition:"all .15s",background:s?M.a:"transparent",color:s?"#fff":"rgba(255,255,255,.65)"},children:[i.jsx(r,{size:16}),a]},t)})}),(0,i.jsxs)("div",{style:{padding:"12px",borderTop:"1px solid rgba(255,255,255,.1)"},children:[(0,i.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:10,padding:"8px 12px",marginBottom:4},children:[i.jsx("div",{style:{width:32,height:32,borderRadius:"50%",background:M.a,display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,fontWeight:700},children:a?.name?.charAt(0)?.toUpperCase()??"A"}),(0,i.jsxs)("div",{style:{flex:1,minWidth:0},children:[i.jsx("p",{style:{fontSize:13,fontWeight:600,color:"#fff",margin:0,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},children:a?.name}),i.jsx("p",{style:{fontSize:11,color:"rgba(255,255,255,.5)",margin:0},children:"مشرف عام"})]})]}),(0,i.jsxs)("button",{onClick:()=>{r(),t.push("/login")},style:{width:"100%",display:"flex",alignItems:"center",gap:8,padding:"8px 12px",borderRadius:8,background:"transparent",border:"none",cursor:"pointer",color:"#F87171",fontSize:13,fontFamily:"inherit",transition:"background .15s"},onMouseEnter:e=>e.currentTarget.style.background="rgba(239,68,68,.15)",onMouseLeave:e=>e.currentTarget.style.background="transparent",children:[i.jsx(b.Z,{size:15}),"تسجيل الخروج"]})]})]})}var z=a(22842),C=a(73229),S=a(54654);function A(){let{isEditorMode:e,editingStore:t,exitEditorMode:a}=(0,z.E)();return e&&t?(0,i.jsxs)("div",{style:{width:"100%",background:"linear-gradient(90deg,#AE445A,#432E54)",color:"#fff",padding:"8px 20px",display:"flex",alignItems:"center",justifyContent:"space-between",fontSize:13,fontWeight:500,zIndex:50},children:[(0,i.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:8},children:[i.jsx(C.Z,{size:15}),(0,i.jsxs)("span",{children:["أنت تعدّل متجر ",i.jsx("strong",{children:t.name})," كمشرف — كل التغييرات مسجّلة"]})]}),(0,i.jsxs)("button",{onClick:a,style:{display:"flex",alignItems:"center",gap:4,padding:"3px 10px",background:"rgba(255,255,255,.2)",border:"none",borderRadius:6,cursor:"pointer",color:"#fff",fontSize:12,fontFamily:"inherit"},children:[i.jsx(S.Z,{size:13})," خروج"]})]}):null}function E({children:e}){let t=(0,d.useRouter)(),{user:a,token:l,_hasHydrated:s}=(0,Z.t)();return((0,r.useEffect)(()=>{if(s){if(!l||!a){t.push("/login");return}"SUPER_ADMIN"!==a.role&&t.push("MERCHANT"===a.role?"/dashboard":"/")}},[l,a,t,s]),s)?a&&"SUPER_ADMIN"===a.role?(0,i.jsxs)("div",{className:"flex min-h-screen",style:{background:"#F5F0FA"},children:[i.jsx(w,{}),(0,i.jsxs)("div",{className:"flex-1 flex flex-col overflow-hidden",children:[i.jsx(A,{}),i.jsx("main",{className:"flex-1 overflow-auto",children:e})]})]}):null:(0,i.jsxs)("div",{style:{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",background:"#F5F0FA"},children:[i.jsx("div",{style:{width:36,height:36,borderRadius:"50%",border:"3px solid #E8BCB9",borderTopColor:"#432E54",animation:"spin 0.7s linear infinite"}}),i.jsx("style",{children:"@keyframes spin{to{transform:rotate(360deg)}}"})]})}},22842:(e,t,a)=>{"use strict";a.d(t,{E:()=>i});let i=(0,a(29866).Ue)(e=>({isEditorMode:!1,editingStore:null,enterEditorMode:t=>e({isEditorMode:!0,editingStore:t}),exitEditorMode:()=>e({isEditorMode:!1,editingStore:null})}))},3045:(e,t,a)=>{"use strict";a.d(t,{Z:()=>i});/**
 * @license lucide-react v0.363.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let i=(0,a(71993).Z)("Activity",[["path",{d:"M22 12h-4l-3 9L9 3l-3 9H2",key:"d5dnw9"}]])},25760:(e,t,a)=>{"use strict";a.d(t,{Z:()=>i});/**
 * @license lucide-react v0.363.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let i=(0,a(71993).Z)("BarChart2",[["line",{x1:"18",x2:"18",y1:"20",y2:"10",key:"1xfpm4"}],["line",{x1:"12",x2:"12",y1:"20",y2:"4",key:"be30l9"}],["line",{x1:"6",x2:"6",y1:"20",y2:"14",key:"1r4le6"}]])},72742:(e,t,a)=>{"use strict";a.d(t,{Z:()=>i});/**
 * @license lucide-react v0.363.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let i=(0,a(71993).Z)("Bell",[["path",{d:"M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9",key:"1qo2s2"}],["path",{d:"M10.3 21a1.94 1.94 0 0 0 3.4 0",key:"qgo35s"}]])},1424:(e,t,a)=>{"use strict";a.d(t,{Z:()=>i});/**
 * @license lucide-react v0.363.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let i=(0,a(71993).Z)("CalendarCheck",[["path",{d:"M8 2v4",key:"1cmpym"}],["path",{d:"M16 2v4",key:"4m81vk"}],["rect",{width:"18",height:"18",x:"3",y:"4",rx:"2",key:"1hopcy"}],["path",{d:"M3 10h18",key:"8toen8"}],["path",{d:"m9 16 2 2 4-4",key:"19s6y9"}]])},10617:(e,t,a)=>{"use strict";a.d(t,{Z:()=>i});/**
 * @license lucide-react v0.363.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let i=(0,a(71993).Z)("CheckCheck",[["path",{d:"M18 6 7 17l-5-5",key:"116fxf"}],["path",{d:"m22 10-7.5 7.5L13 16",key:"ke71qq"}]])},63197:(e,t,a)=>{"use strict";a.d(t,{Z:()=>i});/**
 * @license lucide-react v0.363.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let i=(0,a(71993).Z)("Check",[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]])},92107:(e,t,a)=>{"use strict";a.d(t,{Z:()=>i});/**
 * @license lucide-react v0.363.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let i=(0,a(71993).Z)("ClipboardList",[["rect",{width:"8",height:"4",x:"8",y:"2",rx:"1",ry:"1",key:"tgr4d6"}],["path",{d:"M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2",key:"116196"}],["path",{d:"M12 11h4",key:"1jrz19"}],["path",{d:"M12 16h4",key:"n85exb"}],["path",{d:"M8 11h.01",key:"1dfujw"}],["path",{d:"M8 16h.01",key:"18s6g9"}]])},70390:(e,t,a)=>{"use strict";a.d(t,{Z:()=>i});/**
 * @license lucide-react v0.363.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let i=(0,a(71993).Z)("CodeXml",[["path",{d:"m18 16 4-4-4-4",key:"1inbqp"}],["path",{d:"m6 8-4 4 4 4",key:"15zrgr"}],["path",{d:"m14.5 4-5 16",key:"e7oirm"}]])},21171:(e,t,a)=>{"use strict";a.d(t,{Z:()=>i});/**
 * @license lucide-react v0.363.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let i=(0,a(71993).Z)("CreditCard",[["rect",{width:"20",height:"14",x:"2",y:"5",rx:"2",key:"ynyp8z"}],["line",{x1:"2",x2:"22",y1:"10",y2:"10",key:"1b3vmo"}]])},59709:(e,t,a)=>{"use strict";a.d(t,{Z:()=>i});/**
 * @license lucide-react v0.363.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let i=(0,a(71993).Z)("Crown",[["path",{d:"M11.562 3.266a.5.5 0 0 1 .876 0L15.39 8.87a1 1 0 0 0 1.516.294L21.183 5.5a.5.5 0 0 1 .798.519l-2.834 10.246a1 1 0 0 1-.956.734H5.81a1 1 0 0 1-.957-.734L2.02 6.02a.5.5 0 0 1 .798-.519l4.276 3.664a1 1 0 0 0 1.516-.294z",key:"1vdc57"}],["path",{d:"M5 21h14",key:"11awu3"}]])},8320:(e,t,a)=>{"use strict";a.d(t,{Z:()=>i});/**
 * @license lucide-react v0.363.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let i=(0,a(71993).Z)("Gift",[["rect",{x:"3",y:"8",width:"18",height:"4",rx:"1",key:"bkv52"}],["path",{d:"M12 8v13",key:"1c76mn"}],["path",{d:"M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7",key:"6wjy6b"}],["path",{d:"M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5",key:"1ihvrl"}]])},1943:(e,t,a)=>{"use strict";a.d(t,{Z:()=>i});/**
 * @license lucide-react v0.363.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let i=(0,a(71993).Z)("Globe",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20",key:"13o1zl"}],["path",{d:"M2 12h20",key:"9i4pu4"}]])},55165:(e,t,a)=>{"use strict";a.d(t,{Z:()=>i});/**
 * @license lucide-react v0.363.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let i=(0,a(71993).Z)("LayoutDashboard",[["rect",{width:"7",height:"9",x:"3",y:"3",rx:"1",key:"10lvy0"}],["rect",{width:"7",height:"5",x:"14",y:"3",rx:"1",key:"16une8"}],["rect",{width:"7",height:"9",x:"14",y:"12",rx:"1",key:"1hutg5"}],["rect",{width:"7",height:"5",x:"3",y:"16",rx:"1",key:"ldoo1y"}]])},22696:(e,t,a)=>{"use strict";a.d(t,{Z:()=>i});/**
 * @license lucide-react v0.363.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let i=(0,a(71993).Z)("LogOut",[["path",{d:"M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4",key:"1uf3rs"}],["polyline",{points:"16 17 21 12 16 7",key:"1gabdz"}],["line",{x1:"21",x2:"9",y1:"12",y2:"12",key:"1uyos4"}]])},93145:(e,t,a)=>{"use strict";a.d(t,{Z:()=>i});/**
 * @license lucide-react v0.363.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let i=(0,a(71993).Z)("RefreshCw",[["path",{d:"M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8",key:"v9h5vc"}],["path",{d:"M21 3v5h-5",key:"1q7to0"}],["path",{d:"M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16",key:"3uifl3"}],["path",{d:"M8 16H3v5",key:"1cv678"}]])},61964:(e,t,a)=>{"use strict";a.d(t,{Z:()=>i});/**
 * @license lucide-react v0.363.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let i=(0,a(71993).Z)("Shield",[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",key:"oel41y"}]])},68387:(e,t,a)=>{"use strict";a.d(t,{Z:()=>i});/**
 * @license lucide-react v0.363.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let i=(0,a(71993).Z)("ShoppingCart",[["circle",{cx:"8",cy:"21",r:"1",key:"jimo8o"}],["circle",{cx:"19",cy:"21",r:"1",key:"13723u"}],["path",{d:"M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12",key:"9zh506"}]])},46183:(e,t,a)=>{"use strict";a.d(t,{Z:()=>i});/**
 * @license lucide-react v0.363.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let i=(0,a(71993).Z)("Sparkles",[["path",{d:"m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z",key:"17u4zn"}],["path",{d:"M5 3v4",key:"bklmnn"}],["path",{d:"M19 17v4",key:"iiml17"}],["path",{d:"M3 5h4",key:"nem4j1"}],["path",{d:"M17 19h4",key:"lbex7p"}]])},73229:(e,t,a)=>{"use strict";a.d(t,{Z:()=>i});/**
 * @license lucide-react v0.363.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let i=(0,a(71993).Z)("SquarePen",[["path",{d:"M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7",key:"1m0v6g"}],["path",{d:"M18.375 2.625a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4Z",key:"1lpok0"}]])},88883:(e,t,a)=>{"use strict";a.d(t,{Z:()=>i});/**
 * @license lucide-react v0.363.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let i=(0,a(71993).Z)("Store",[["path",{d:"m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7",key:"ztvudi"}],["path",{d:"M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8",key:"1b2hhj"}],["path",{d:"M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4",key:"2ebpfo"}],["path",{d:"M2 7h20",key:"1fcdvo"}],["path",{d:"M22 7v3a2 2 0 0 1-2 2v0a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 16 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 12 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 8 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 4 12v0a2 2 0 0 1-2-2V7",key:"jon5kx"}]])},61099:(e,t,a)=>{"use strict";a.d(t,{Z:()=>i});/**
 * @license lucide-react v0.363.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let i=(0,a(71993).Z)("Users",[["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",key:"1yyitq"}],["circle",{cx:"9",cy:"7",r:"4",key:"nufk8"}],["path",{d:"M22 21v-2a4 4 0 0 0-3-3.87",key:"kshegd"}],["path",{d:"M16 3.13a4 4 0 0 1 0 7.75",key:"1da9ce"}]])},54654:(e,t,a)=>{"use strict";a.d(t,{Z:()=>i});/**
 * @license lucide-react v0.363.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let i=(0,a(71993).Z)("X",[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]])},12940:(e,t,a)=>{"use strict";a.d(t,{Z:()=>i});/**
 * @license lucide-react v0.363.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let i=(0,a(71993).Z)("Zap",[["path",{d:"M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z",key:"1xq2db"}]])},48009:(e,t,a)=>{"use strict";a.r(t),a.d(t,{$$typeof:()=>d,__esModule:()=>r,default:()=>l});let i=(0,a(30599).createProxy)(String.raw`/Applications/XAMPP/xamppfiles/htdocs/bazar/apps/web/src/app/(admin)/layout.tsx`),{__esModule:r,$$typeof:d}=i,l=i.default}};
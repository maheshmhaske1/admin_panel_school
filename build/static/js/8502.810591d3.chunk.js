"use strict";(self.webpackChunk_coreui_coreui_free_react_admin_template=self.webpackChunk_coreui_coreui_free_react_admin_template||[]).push([[8502,5831],{16027:(e,a,t)=>{t.d(a,{Af:()=>f,C7:()=>G,CB:()=>k,Ec:()=>V,F3:()=>u,GV:()=>$,HD:()=>B,HJ:()=>p,I9:()=>A,JQ:()=>_,K$:()=>v,Kl:()=>Y,Kz:()=>I,LB:()=>S,Lx:()=>i,Nw:()=>C,P2:()=>D,QQ:()=>l,Rs:()=>y,Sv:()=>E,Um:()=>z,VR:()=>w,X9:()=>H,Y$:()=>R,Yv:()=>j,Yw:()=>g,_B:()=>K,ch:()=>J,fw:()=>O,gT:()=>W,h0:()=>Q,hg:()=>b,jS:()=>M,jw:()=>N,k6:()=>P,o_:()=>m,pb:()=>F,r$:()=>T,rp:()=>L,u9:()=>d,um:()=>q,v7:()=>h,w4:()=>U,wr:()=>x});var n=t(77154),c=t(1880);const r="http://66.179.250.128:5000",o=n.A.create({baseURL:r,headers:{"Content-Type":"application/json"}}),s=()=>{const e=c.A.get("accessToken");e&&(o.defaults.headers.common.Authorization="Bearer ".concat(e))};s(),o.interceptors.response.use((e=>e),(e=>(e.response&&401===e.response.status&&(window.location.href="/admin-login"),Promise.reject(e))));const i=async e=>{try{const a=await o.post("".concat(r,"/admin/login"),e);if(a.data.success){const e=a.data.data.token;c.A.set("accessToken",e,{secure:!0,sameSite:"strict"});const t=a.data.data.name;c.A.set("name",t,{secure:!0,sameSite:"strict"});const n=a.data.data.id;c.A.set("adminId",n,{secure:!0,sameSite:"strict"}),s()}return a.data}catch(a){throw console.log("error",a),a}},l=async()=>{try{return(await o.get("".concat(r,"/organization"))).data}catch(e){throw e}},d=async e=>{try{return(await o.get("".concat(r,"/organization/").concat(e))).data}catch(a){throw a}},u=async e=>{try{return(await o.post("".concat(r,"/organization"),e)).data}catch(a){throw a}},h=async e=>{try{return(await o.delete("".concat(r,"/organization/").concat(e))).data}catch(a){throw a}},m=async(e,a)=>{try{return(await o.patch("".concat(r,"/organization/").concat(e),a)).data}catch(t){throw t}},y=async()=>{try{return(await o.get("".concat(r,"/teacher"))).data}catch(e){throw e}},w=async e=>{try{return(await o.get("".concat(r,"/teacher/by-organization/").concat(e))).data}catch(a){throw a}},g=async e=>{try{return(await o.post("".concat(r,"/teacher"),e)).data}catch(a){throw a}},x=async e=>{try{return(await o.delete("".concat(r,"/teacher/").concat(e))).data}catch(a){throw a}},p=async(e,a)=>{try{return(await o.patch("".concat(r,"/teacher/").concat(e),a)).data}catch(t){throw t}},_=async()=>{try{return(await o.get("".concat(r,"/levels"))).data}catch(e){throw e}},v=async e=>{try{return(await o.post("".concat(r,"/levels"),e)).data}catch(a){throw a}},j=async e=>{try{return(await o.delete("".concat(r,"/levels/").concat(e))).data}catch(a){throw a}},b=async(e,a)=>{try{return(await o.patch("".concat(r,"/levels/").concat(e),a)).data}catch(t){throw t}},S=async e=>{try{return(await o.get("".concat(r,"/question/by_level/").concat(e))).data}catch(a){throw a}},f=async e=>{try{return(await o.post("".concat(r,"/question"),e)).data}catch(a){throw a}},z=async e=>{try{return(await o.delete("".concat(r,"/question/").concat(e))).data}catch(a){throw a}},C=async(e,a)=>{try{return(await o.patch("".concat(r,"/question/").concat(e),a)).data}catch(t){throw t}},A=async e=>{try{return(await o.get("".concat(r,"/student"))).data}catch(a){throw a}},P=async e=>{try{return(await o.get("".concat(r,"/student/organization/").concat(e))).data}catch(a){throw a}},N=async e=>{try{return(await o.post("".concat(r,"/student"),e)).data}catch(a){throw a}},T=async e=>{try{return(await o.delete("".concat(r,"/student/").concat(e))).data}catch(a){throw a}},R=async(e,a)=>{try{return(await o.patch("".concat(r,"/student/").concat(e),a)).data}catch(t){throw t}},k=async()=>{try{return(await o.get("".concat(r,"/exam"))).data}catch(e){throw e}},I=async e=>{try{return(await o.get("".concat(r,"/exam/").concat(e))).data}catch(a){throw a}},O=async e=>{try{return(await o.get("".concat(r,"/exam/get-exam-student-by-exam-id/").concat(e))).data}catch(a){throw a}},H=async e=>{try{return(await o.delete("".concat(r,"/exam/removed-student-from-exam/").concat(e))).data}catch(a){throw a}},q=async e=>{try{return(await o.delete("".concat(r,"/exam/removed-question-from-exam/").concat(e))).data}catch(a){throw a}},F=async e=>{try{return(await o.post("".concat(r,"/exam"),e)).data}catch(a){throw a}},B=async e=>{try{return(await o.delete("".concat(r,"/exam/").concat(e))).data}catch(a){throw a}},E=async(e,a)=>{try{return(await o.patch("".concat(r,"/exam/").concat(e),a)).data}catch(t){throw t}},G=async e=>{try{return(await o.get("".concat(r,"/exam/by-organization-id-for-admin/").concat(e))).data}catch(a){throw a}},U=async e=>{try{return(await o.get("".concat(r,"/exam/get-exam-qestion-by-exam-id/").concat(e))).data}catch(a){throw a}},Q=async e=>{try{return(await o.post("".concat(r,"/exam/add-exam-student"),e)).data}catch(a){throw a}},L=async e=>{try{return(await o.post("".concat(r,"/exam/organization-student-not-exit"),e)).data}catch(a){throw a}},Y=async e=>{try{return(await o.post("".concat(r,"/exam/question-not-exit"),e)).data}catch(a){throw a}},$=async e=>{try{return(await o.post("".concat(r,"/exam/add-exam-question"),e)).data}catch(a){throw a}},D=async e=>{try{return(await o.get("".concat(r,"/exam/schedule-exam/").concat(e))).data}catch(a){throw a}},M=async e=>{try{return(await o.get("".concat(r,"/exam-submission/by-examination-id/").concat(e))).data}catch(a){throw a}},V=async e=>{try{return(await o.post("".concat(r,"/exam/update-student-certificate"),e)).data}catch(a){throw a}},K=async e=>{try{return(await o.get("".concat(r,"/exam/update-student-certificate-generate/").concat(e))).data}catch(a){throw a}},W=async e=>{try{return(await o.get("".concat(r,"/exam/recent/dashboard"))).data}catch(a){throw a}},J=async e=>{try{return(await o.post("".concat(r,"/question/bulk"),e)).data}catch(a){throw a}}},84718:(e,a,t)=>{t.d(a,{A:()=>d});var n=t(65043),c=t(71094),r=t(61270),o=t(68155),s=t(64196),i=t(11238),l=t(70579);const d=e=>{let{columns:a,data:t,name:d}=e;const{getTableProps:u,getTableBodyProps:h,headerGroups:m,prepareRow:y,page:w,state:{pageIndex:g,pageSize:x,globalFilter:p},setGlobalFilter:_,gotoPage:v,nextPage:j,previousPage:b,canNextPage:S,canPreviousPage:f}=(0,c.useTable)({columns:a,data:t,initialState:{pageIndex:0,pageSize:10}},c.useGlobalFilter,c.useSortBy,c.usePagination);return(0,l.jsxs)("div",{className:"data-table-container",children:[(0,l.jsx)("h5",{children:d||""}),(0,l.jsxs)("div",{className:"data-table-header",children:[(0,l.jsxs)("div",{className:"search-box-container",children:[(0,l.jsx)(r.A,{type:"text",value:p||"",onChange:e=>_(e.target.value),placeholder:"Search..."}),(0,l.jsx)("span",{className:"search-icon",children:"\ud83d\udd0d"})]}),(0,l.jsx)(o.A,{onClick:()=>(()=>{const e=t.map((e=>a.reduce(((a,t)=>(a[t.Header]=e[t.accessor],a)),{}))),n=i.Wp.json_to_sheet(e),c=i.Wp.book_new();i.Wp.book_append_sheet(c,n,"Sheet 1"),i._h(c,"data.xlsx")})(),variant:"success",className:"download_excel",style:{color:"white"},children:"Download Excel"})]}),(0,l.jsx)("div",{className:"table-wrapper",children:(0,l.jsxs)(s.A,{...u(),bordered:!0,hover:!0,responsive:!0,children:[(0,l.jsx)("thead",{children:(0,l.jsxs)("tr",{children:[(0,l.jsx)("th",{children:"Sr. No."}),m.map((e=>(0,l.jsx)(n.Fragment,{children:e.headers.map((e=>(0,l.jsxs)("th",{...e.getHeaderProps(e.getSortByToggleProps()),children:[e.render("Header"),(0,l.jsx)("span",{children:e.isSorted?e.isSortedDesc?" \ud83d\udd3d":" \ud83d\udd3c":""})]},e._id)))},e._id)))]})}),(0,l.jsx)("tbody",{...h(),children:w.map(((e,a)=>(y(e),(0,l.jsxs)("tr",{...e.getRowProps(),children:[(0,l.jsx)("td",{children:g*x+a+1}),e.cells.map((e=>(0,l.jsx)("td",{...e.getCellProps(),children:e.render("Cell")},e.column._id)))]},e._id))))})]})}),(0,l.jsxs)("div",{className:"pagination-controls",children:[(0,l.jsx)("button",{onClick:()=>v(0),disabled:!f,children:"<<"}),(0,l.jsx)("button",{onClick:()=>b(),disabled:!f,children:"<"}),(0,l.jsx)("button",{onClick:()=>j(),disabled:!S,children:">"}),(0,l.jsx)("button",{onClick:()=>v(w.length-1),disabled:!S,children:">>"}),(0,l.jsxs)("span",{children:["\xa0Page ",(0,l.jsx)("strong",{children:g+1})," of ",Math.ceil(t.length/x)," pages | Showing ",t.length," Records"]})]})]})}},64237:(e,a,t)=>{t.d(a,{A:()=>r});t(65043);var n=t(93946),c=t(70579);const r=e=>{let{customStyles:a,title:t}=e;return(0,c.jsx)(n.sK,{children:(0,c.jsx)(n.UF,{xs:12,children:(0,c.jsxs)(n.E$,{className:"mb-4",children:[(0,c.jsx)(n.V0,{children:(0,c.jsx)("strong",{children:t})}),(0,c.jsx)(n.W6,{children:a?a():null})]})})})}},78502:(e,a,t)=>{t.r(a),t.d(a,{default:()=>w});var n=t(65043),c=t(85369),r=t(93946),o=t(84718),s=t(64237),i=t(16027),l=t(42145),d=(t(2574),t(30064)),u=t.n(d),h=t(8588),m=t(1880),y=t(70579);const w=function(e){const[a,t]=(0,n.useState)([]),[d,w]=(0,n.useState)(null),[g,x]=(0,n.useState)("Add Student"),[p,_]=(0,n.useState)(!1),[v,j]=(0,n.useState)(!1),[b,S]=(0,n.useState)(!1),[f,z]=(0,n.useState)([]),[C,A]=(0,n.useState)([]),P=m.A.get("adminId"),[N,T]=(0,n.useState)({name:"",mobile_number:"",email:"",roll_no:null,organization_value:null,organization_id:null,level_value:null,level_id:null,created_type:"Admin",created_id:P});(0,n.useEffect)((()=>{R(),k(),I()}),[]);const R=async()=>{if(e.id){const a=await(0,i.k6)(e.id);console.log(a),a.success&&t(a.data)}else{const e=await(0,i.I9)();console.log(e),e.success&&t(e.data)}},k=async()=>{const e=await(0,i.QQ)();console.log(e),e.success&&(e.data.map((e=>{e.label=e.name,e.value=e._id})),z(e.data))},I=async()=>{const e=await(0,i.JQ)();console.log(e),e.success&&(e.data.map((e=>{e.label=e.name,e.value=e._id})),A(e.data))},O=[{Header:"Student Name",accessor:"name"},{Header:"Mobile Number",accessor:"mobile_number"},{Header:"Email Address",accessor:"email"},{Header:"Role Number",accessor:"roll_no"},{Header:"Level Name",accessor:"level_id.name"},{Header:"Organization Name",accessor:"organization_id.name"},{Header:"Created Type",accessor:"created_type"},{Header:"Created By",Cell:e=>{var a,t;let{row:n}=e;return(0,y.jsx)(y.Fragment,{children:"Admin"==n.original.created_type?null===(a=n.original.admin_id)||void 0===a?void 0:a.admin_name:null===(t=n.original.teacher_id)||void 0===t?void 0:t.name})}},{Header:"Actions",accessor:"_id",Cell:e=>{let{row:t}=e;return(0,y.jsxs)(y.Fragment,{children:[(0,y.jsxs)(r.Q_,{color:"info",size:"sm",style:{color:"white"},onClick:()=>(e=>{x("Update Student");const t=a.find((a=>a._id===e));w(t._id),T({name:t.name,mobile_number:t.mobile_number,email:t.email,roll_no:t.roll_no,organization_value:{value:t.organization_id._id,label:t.organization_id.name},organization_id:t.organization_id._id,level_value:{value:t.level_id._id,label:t.level_id.name},level_id:t.level_id._id,created_type:"Admin",created_id:P})})(t.original._id),children:[(0,y.jsx)(c.uO9,{})," Edit"]})," ",(0,y.jsxs)(r.Q_,{color:"danger",size:"sm",style:{color:"white"},onClick:()=>(async e=>{if((await u().fire({title:"Are you sure?",text:"You will not be able to recover this student!",icon:"warning",showCancelButton:!0,confirmButtonColor:"#d33",cancelButtonColor:"#3085d6",confirmButtonText:"Yes, delete it!"})).isConfirmed)try{const a=await(0,i.r$)(e);a.success&&(l.oR.success(a.message,{position:l.oR.POSITION.TOP_RIGHT,autoClose:3e3}),R())}catch(a){l.oR.error(a.message,{position:l.oR.POSITION.TOP_RIGHT,autoClose:3e3})}})(t.original._id),children:[(0,y.jsx)(c.qbC,{})," Delete"]})]})}}];return(0,y.jsxs)(y.Fragment,{children:[(0,y.jsx)(s.A,{customStyles:()=>{const a=(0,n.useRef)(),t=e=>{const{name:a,value:t,files:n}=e.target;T((e=>({...e,[a]:"file"===a?n[0]:t})))};return(0,y.jsxs)(r.qI,{ref:a,className:"row g-3 needs-validation",noValidate:!0,onSubmit:async t=>{t.preventDefault(),t.stopPropagation();const n=a.current;if(!1===n.checkValidity())return n.classList.add("was-validated"),""==N.level_id||null==N.level_id?void S(!0):""==N.organization_id||null==N.organization_id?void j(!0):void 0;let c=null;N.roll_no=parseInt(N.roll_no),e.id&&(N.organization_id=e.id),console.log(N),d?c=await(0,i.Y$)(d,N):(c=await(0,i.jw)(N),w(null)),c.success?(l.oR.success(c.message,{position:l.oR.POSITION.TOP_RIGHT,autoClose:3e3}),R(),x("Add Student"),T({name:"",mobile_number:"",email:"",roll_no:"",organization_value:null,organization_id:null,level_value:null,level_id:null,created_type:"Admin",created_id:P}),n.classList.remove("was-validated")):l.oR.error(c.message,{position:l.oR.POSITION.TOP_RIGHT,autoClose:3e3})},children:[(0,y.jsxs)(r.UF,{md:4,children:[(0,y.jsx)(r.A6,{children:"Student Name"}),(0,y.jsx)(r.OG,{type:"text",placeholder:"Enter Student Name",name:"name",required:!0,value:N.name,onChange:t}),(0,y.jsx)(r.To,{invalid:!0,children:"Please enter studnet name"})]}),(0,y.jsxs)(r.UF,{md:4,children:[(0,y.jsx)(r.A6,{children:"Mobile Number"}),(0,y.jsx)(r.OG,{type:"number",name:"mobile_number",placeholder:"Enter Mobile Number",required:!0,value:N.mobile_number,onChange:t}),(0,y.jsx)(r.To,{invalid:!0,children:"Please enter mobile number"})]}),(0,y.jsxs)(r.UF,{md:4,children:[(0,y.jsx)(r.A6,{children:"Email"}),(0,y.jsx)(r.OG,{type:"email",name:"email",placeholder:"Enter Email Address",required:!0,value:N.email,onChange:t}),(0,y.jsx)(r.To,{invalid:!0,children:"Please enter email address"})]}),(0,y.jsxs)(r.UF,{md:4,children:[(0,y.jsx)(r.A6,{children:"Role Number"}),(0,y.jsx)(r.OG,{type:"number",name:"roll_no",placeholder:"Enter Roll Number",required:!0,value:N.roll_no,onChange:t}),(0,y.jsx)(r.To,{invalid:!0,children:"Please enter roll number"})]}),e.id?null:(0,y.jsxs)(r.UF,{md:4,children:[(0,y.jsx)(r.A6,{children:"Select Organization"}),(0,y.jsx)(h.Ay,{name:"is_type",value:N.organization_value,options:f,onChange:e=>{console.log(e),T((a=>({...a,organization_value:e,organization_id:e.value}))),j(!1)},placeholder:"Select Type",required:!0}),(0,y.jsxs)(r.To,{className:"text-danger",style:{fontSize:"14px"},children:[" ",v?"Please select organization":""]})]}),(0,y.jsxs)(r.UF,{md:4,children:[(0,y.jsx)(r.A6,{children:"Select Level"}),(0,y.jsx)(h.Ay,{name:"is_type",value:N.level_value,options:C,onChange:e=>{console.log(e),T((a=>({...a,level_value:e,level_id:e.value}))),S(!1)},placeholder:"Select Level",required:!0}),(0,y.jsxs)(r.To,{className:"text-danger",style:{fontSize:"14px"},children:[" ",b?"Please select level":""]})]}),(0,y.jsx)(r.UF,{xs:12,className:"d-flex justify-content-end",children:(0,y.jsx)(r.Q_,{color:"primary",type:"submit",children:g})})]})},title:"Student Master"}),(0,y.jsx)(o.A,{columns:O,data:a})]})}}}]);
//# sourceMappingURL=8502.810591d3.chunk.js.map
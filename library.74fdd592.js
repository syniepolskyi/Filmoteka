var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},n={},a=e.parcelRequire41ed;null==a&&((a=function(e){if(e in t)return t[e].exports;if(e in n){var a=n[e];delete n[e];var o={id:e,exports:{}};return t[e]=o,a.call(o.exports,o,o.exports),o.exports}var i=new Error("Cannot find module '"+e+"'");throw i.code="MODULE_NOT_FOUND",i}).register=function(e,t){n[e]=t},e.parcelRequire41ed=a);var o=a("8N7ah"),i=a("iaNpe"),l=a("bJAXj"),r=(o=a("8N7ah"),a("jqFpy")),c=a("gBq5n"),s=a("kApCy"),d=a("kLGAr"),u=a("eAZYX");const{headerWatchedBtn:f,headerQueueBtn:A,mainList:g,dataNotFoundEl:p,paginationBox:h}=o.refs,E=(N=document.body.clientWidth)>=1280?9:N<768?4:8;var N;let T=r.ANON_WATCHED;function L(e=1){let t=d.localStorageAPI.load(r.STORAGE);u.auth.currentUser&&d.localStorageAPI.load(r.DB_STORAGE)&&(t=d.localStorageAPI.load(r.DB_STORAGE)),t?async function(e){const t=await async function(e){const t=function(e){return(u.auth.currentUser&&d.localStorageAPI.load(r.DB_STORAGE)?d.localStorageAPI.load(r.DB_STORAGE)[T]:d.localStorageAPI.load(r.STORAGE)[T]).filter(((t,n)=>{if(n>=E*(e-1)&&n<E*e)return t}))}(e);if(0===t.length)return null;const n=t.map((e=>(0,i.getMoviesDetails)(e)));try{const e=await Promise.all(n);return(0,l.default)(e)}catch(e){console.log(e.message)}}(e);if(t){p.innerHTML="",g.innerHTML=t;const n=d.localStorageAPI.load(r.STORAGE)[T],a=Math.ceil(n.length/E);(0,c.createPagination)(e,a),document.querySelectorAll("[data-modal-open]").forEach((e=>e.addEventListener("click",s.onFilmCardClick)))}else O()}(e):O()}function O(){g.innerHTML="",h.innerHTML="",T!==r.ANON_WATCHED?T!==r.ANON_QUEUE||(p.innerHTML='<p class="not-film-card">Nothing in queue yet</p>'):p.innerHTML='<p class="not-film-card">Nothing watched yet</p>'}f.addEventListener("click",(function(){f.classList.contains("button--accent")||(f.classList.add("button--accent"),A.classList.remove("button--accent")),T=r.ANON_WATCHED,L(1)})),A.addEventListener("click",(function(){A.classList.contains("button--accent")||(A.classList.add("button--accent"),f.classList.remove("button--accent")),T=r.ANON_QUEUE,L(1)})),a("cpfO2"),a("hf9b6"),a("2xbsQ");var b=a("kQePK");u=a("eAZYX"),b=a("kQePK");a("5PNiN"),(0,u.authObserver)([b.showAuthorisedFields,L],[b.showUnauthorisedFields,L]),o.refs.paginationBox.addEventListener("click",(e=>{e.target.dataset.page&&(window.scrollTo({top:0,left:0}),L(+e.target.dataset.page))}));
//# sourceMappingURL=library.74fdd592.js.map

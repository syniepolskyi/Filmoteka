!function(){function e(e,t,n,r){Object.defineProperty(e,t,{get:n,set:r,enumerable:!0,configurable:!0})}var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},n={},r={},o=t.parcelRequire41ed;null==o&&((o=function(e){if(e in n)return n[e].exports;if(e in r){var t=r[e];delete r[e];var o={id:e,exports:{}};return n[e]=o,t.call(o.exports,o,o.exports),o.exports}var c=new Error("Cannot find module '"+e+"'");throw c.code="MODULE_NOT_FOUND",c}).register=function(e,t){r[e]=t},t.parcelRequire41ed=o),o.register("iE7OH",(function(t,n){var r,o;e(t.exports,"register",(function(){return r}),(function(e){return r=e})),e(t.exports,"resolve",(function(){return o}),(function(e){return o=e}));var c={};r=function(e){for(var t=Object.keys(e),n=0;n<t.length;n++)c[t[n]]=e[t[n]]},o=function(e){var t=c[e];if(null==t)throw new Error("Could not resolve bundle with id "+e);return t}})),o("iE7OH").register(JSON.parse('{"jNRdE":"library.712b32df.js","ee16w":"sprite.aa729b31.svg","cSIeN":"index.51c84f7b.js"}')),o("5DkEY");var c=o("9fz8o"),s=o("1ZLLT"),a=o("5DkEY");const i={queue:[],watched:[]},u="storage",l={save:function(e,t){try{const n=JSON.stringify(t);localStorage.setItem(e,n)}catch(e){console.error("Set state error: ",e.message)}},load:function(e){try{const t=localStorage.getItem(e);return null===t?void 0:JSON.parse(t)}catch(e){console.error("Get state error: ",e.message)}}};const{headerWatchedBtn:d,headerQueueBtn:f,mainList:g}=a.refs,b=document.body.clientWidth;let v=1;function h(){g.innerHTML="Nothing wathed yet"}i.watched=["154","584","1254","154","584","1254","154","584","1254","154","584","1254"],l.save(u,i),d.addEventListener("click",(function(){v=1,d.classList.contains("button--accent")||d.classList.add("button--accent");f.classList.contains("button--accent")&&f.classList.remove("button--accent");l.load(u)?async function(e){const t=await async function(e){const t=function(e){const t=function(e){if(e>=1280)return 9;if(e<768)return 4;return 8}(b);return l.load(u).watched.filter(((n,r)=>{if(r>=t*(e-1)&&r<t*e)return n}))}(e);if(0===t.length)return null;const n=t.map((e=>(0,c.getMoviesDetails)(e)));try{const e=await Promise.all(n);return(0,s.default)(e)}catch(e){console.log(e.message)}}(e);t?g.innerHTML=t:h()}(v):h()})),f.addEventListener("click",(function(){v=1,f.classList.contains("button--accent")||f.classList.add("button--accent");d.classList.contains("button--accent")&&d.classList.remove("button--accent")})),o("2Te6C"),o("1Z2CF"),o("45Ear")}();
//# sourceMappingURL=library.712b32df.js.map

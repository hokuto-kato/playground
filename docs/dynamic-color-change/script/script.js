(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const r of t.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&i(r)}).observe(document,{childList:!0,subtree:!0});function c(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function i(e){if(e.ep)return;e.ep=!0;const t=c(e);fetch(e.href,t)}})();const u=o=>{const n=document.createElement("canvas"),c=n.getContext("2d");if(!c)return"rgba(0, 0, 0, 0)";n.width=o.width,n.height=o.height,c.drawImage(o,0,0,o.width,o.height);const e=c.getImageData(0,0,o.width,o.height).data;let t=0,r=0,l=0;for(let s=0;s<e.length;s+=4)t+=e[s],r+=e[s+1],l+=e[s+2];return t=Math.floor(t/(e.length/4)),r=Math.floor(r/(e.length/4)),l=Math.floor(l/(e.length/4)),`rgb(${t}, ${r}, ${l})`},g=o=>window.getComputedStyle(o).backgroundColor,d=document.querySelector(".icon_home"),f=document.querySelectorAll(".box"),a=()=>{if(!d)return;const o=d.getBoundingClientRect();f.forEach(n=>{const c=n,i=c.getBoundingClientRect();if(o.top<i.bottom&&o.bottom>i.top&&o.left<i.right&&o.right>i.left){let e=g(c);const t=c.querySelector("img");t&&(e=u(t)),document.documentElement.style.setProperty("--bg-color",e);const r=document.querySelector(".caption");r.textContent=`background color is: ${e}`}})};document.addEventListener("DOMContentLoaded",()=>{window.addEventListener("scroll",a),a()});

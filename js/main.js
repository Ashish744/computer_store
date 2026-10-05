/* UI: navbar, active link, spotlight, flip, expandable cards, demo cart */
(()=>{const $=(s)=>document.querySelector(s),$$=(s)=>[...document.querySelectorAll(s)];
const nav=$('#nav'),menu=$('#menu'),bur=$('.burger');
if(nav){const f=()=>nav.classList.toggle('solid',scrollY>30);addEventListener('scroll',f,{passive:true});f()}
if(bur)bur.addEventListener('click',()=>{const o=menu.classList.toggle('open');bur.setAttribute('aria-expanded',o)});
const cur=location.pathname.split('/').pop()||'index.html';
$$('#menu a').forEach(a=>{if(a.getAttribute('href')===cur)a.classList.add('act')});
document.addEventListener('pointermove',e=>{const c=e.target.closest&&e.target.closest('.card');if(c){const r=c.getBoundingClientRect();c.style.setProperty('--x',e.clientX-r.left+'px');c.style.setProperty('--y',e.clientY-r.top+'px')}},{passive:true});
$$('.flip').forEach(f=>f.addEventListener('click',()=>f.classList.toggle('on')));
$$('.exp').forEach(c=>{const t=()=>c.setAttribute('aria-expanded',c.classList.toggle('open'));c.addEventListener('click',t);c.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();t()}})});
const cartTimers=new WeakMap();
$$('[data-cart]').forEach(b=>{const label=b.textContent;b.addEventListener('click',()=>{clearTimeout(cartTimers.get(b));b.textContent='Added ✓ (demo)';cartTimers.set(b,setTimeout(()=>{b.textContent=label;cartTimers.delete(b)},2000))})});
$$('img[data-fb]').forEach(i=>{if(i.complete&&!i.naturalWidth){i.dataset.done=1;i.src=i.dataset.fb}});
document.addEventListener('error',e=>{const t=e.target;if(t.tagName==='IMG'&&t.dataset.fb&&!t.dataset.done){t.dataset.done=1;t.src=t.dataset.fb}},true);
})();
/* Home hero: auto-changing background slides */
(()=>{const S=[...document.querySelectorAll('.hero-slide')];if(!S.length)return;
const D=[...document.querySelectorAll('.hero-dots button')],N=document.querySelector('.now'),T=N&&N.querySelector('b'),B=N&&N.querySelector('span');let k=0,tm;
const go=n=>{S[k].classList.remove('on');D[k].classList.remove('on');k=(n+S.length)%S.length;S[k].classList.add('on');D[k].classList.add('on');
if(N){T.textContent=S[k].dataset.t;B.textContent=S[k].dataset.s;N.classList.remove('sw');void N.offsetWidth;N.classList.add('sw')}};
const run=()=>{clearInterval(tm);tm=setInterval(()=>go(k+1),5500)};
D.forEach((d,i)=>d.addEventListener('click',()=>{go(i);run()}));
if(!matchMedia('(prefers-reduced-motion: reduce)').matches)run();
const v=document.querySelector('.hero-vid');v&&v.addEventListener('canplay',()=>v.classList.add('ok'));
})();

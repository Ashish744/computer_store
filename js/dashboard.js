/* Dashboard: hamburger (drawer on mobile, collapse on desktop), panel switching, profile menu */
(()=>{const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const side=$('#side'),dash=$('.dash'),bur=$('#dburger'),scrim=$('#scrim'),mq=matchMedia('(max-width:820px)');
const setOpen=o=>{side.classList.toggle('open',o);scrim.classList.toggle('on',o);document.body.style.overflow=o?'hidden':'';if(mq.matches)bur.setAttribute('aria-expanded',o)};
bur.setAttribute('aria-expanded',!mq.matches);
bur.addEventListener('click',()=>{if(mq.matches)setOpen(!side.classList.contains('open'));else{const c=dash.classList.toggle('collapsed');bur.setAttribute('aria-expanded',!c)}});
scrim.addEventListener('click',()=>setOpen(false));
$$('.sclose').forEach(b=>b.addEventListener('click',()=>setOpen(false)));
addEventListener('keydown',e=>{if(e.key==='Escape')setOpen(false)});
mq.addEventListener('change',()=>{setOpen(false);bur.setAttribute('aria-expanded',!mq.matches&&!dash.classList.contains('collapsed'))});
$$('#side button[data-p]').forEach(b=>b.addEventListener('click',()=>{$$('#side button[data-p],.panel').forEach(x=>x.classList.remove('on'));b.classList.add('on');document.getElementById('p-'+b.dataset.p).classList.add('on');setOpen(false);scrollTo({top:0})}));
const pb=$('#pb'),pm=$('.pm');pb.addEventListener('click',()=>{pm.hidden=!pm.hidden;pb.setAttribute('aria-expanded',!pm.hidden)});
})();

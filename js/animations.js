/* GSAP: loader, hero timeline, ScrollTrigger reveals, pin/horizontal scroll, sticky steps, parallax, counters, tilt, magnetic buttons */
(()=>{const $=(s)=>document.querySelector(s),$$=(s)=>[...document.querySelectorAll(s)];
const rm=matchMedia('(prefers-reduced-motion: reduce)').matches,L=$('#loader');
if(!window.gsap||!window.ScrollTrigger||rm){L&&L.remove();$$('[data-n]').forEach(e=>e.textContent=(+e.dataset.n).toLocaleString());return}
gsap.registerPlugin(ScrollTrigger);
$$('[data-split]').forEach(e=>{e.innerHTML=e.textContent.trim().split(' ').map(x=>'<span class="w"><span>'+x+'</span></span>').join(' ')});
addEventListener('scroll',()=>{const p=$('#prog');if(p)p.style.width=scrollY/(document.body.scrollHeight-innerHeight)*100+'%'},{passive:true});
function start(){
  if($('.hero-h')){gsap.timeline({defaults:{ease:'power4.out'}})
  .from('.tagline',{y:20,opacity:0,duration:.6})
  .from('.hero-h .ln>span',{yPercent:110,duration:1,stagger:.15},'-=.3')
  .from('.hero .lead',{y:30,opacity:0,duration:.8},'-=.5')
  .from('.hero .cta .btn',{y:30,opacity:0,scale:.9,stagger:.12,duration:.7},'-=.5')
  .from('.hero .stage .card,.now',{x:60,opacity:0,stagger:.12,duration:.8},'-=.8')
  .from('.hero-dots',{opacity:0,duration:.6},'-=.4');
 const rw=$('.rwrap');
 if(rw){const n=rw.children.length,t=gsap.timeline({repeat:-1,delay:2.4});for(let i=1;i<n;i++)t.to(rw,{yPercent:-100*i/n,duration:.8,ease:'power3.inOut'},'+=1.6');t.set(rw,{yPercent:0})}}
 
 gsap.to('.stage',{yPercent:-10,ease:'none',scrollTrigger:{trigger:'.hero',scrub:true,start:'top top',end:'bottom top'}});
 $$('.float').forEach((e,i)=>gsap.to(e,{y:'random(-14,14)',x:'random(-8,8)',duration:'random(2,3.5)',repeat:-1,yoyo:true,ease:'sine.inOut',delay:i*.25}));
 gsap.set('[data-r]',{opacity:0,y:40});
 ScrollTrigger.batch('[data-r]',{start:'top 92%',once:true,onEnter:b=>gsap.to(b,{opacity:1,y:0,stagger:.12,duration:.8,ease:'power2.out'})});
 $$('[data-n]').forEach(e=>ScrollTrigger.create({trigger:e,once:true,start:'top 95%',onEnter:()=>{const o={v:0};gsap.to(o,{v:+e.dataset.n,duration:1.5,ease:'power1.out',onUpdate:()=>{e.textContent=Math.round(o.v).toLocaleString()}})}}));
 $$('[data-split]').forEach(e=>gsap.from(e.querySelectorAll('.w>span'),{yPercent:110,stagger:.07,duration:.9,ease:'power3.out',scrollTrigger:{trigger:e,start:'top 92%'}}));
 $$('[data-clip]').forEach(e=>{gsap.fromTo(e,{clipPath:'inset(0 100% 0 0)'},{clipPath:'inset(0 0% 0 0)',duration:1.2,ease:'power3.inOut',scrollTrigger:{trigger:e,start:'top 85%'}});const m=e.querySelector('img');m&&gsap.from(m,{scale:1.25,duration:1.6,ease:'power2.out',scrollTrigger:{trigger:e,start:'top 85%'}})});
 $$('.bgs,.store,.authbg').forEach(e=>gsap.fromTo(e,{backgroundPositionY:'35%'},{backgroundPositionY:'65%',ease:'none',scrollTrigger:{trigger:e,scrub:true}}));
 $$('.proc,.jt').forEach(p=>gsap.fromTo(p,{'--ln':0},{'--ln':1,ease:'none',scrollTrigger:{trigger:p,start:'top 70%',end:'bottom 70%',scrub:true}}));
 const hs=$('.hs .in');
 if(hs)ScrollTrigger.matchMedia({'(min-width:821px)':()=>{gsap.to(hs,{x:()=>-(hs.scrollWidth-innerWidth),ease:'none',scrollTrigger:{trigger:'.hs',pin:true,scrub:1,end:()=>'+='+(hs.scrollWidth-innerWidth),invalidateOnRefresh:true}})}});
 const vis=$('.vis');
 $$('.step').forEach(s=>ScrollTrigger.create({trigger:s,start:'top 55%',end:'bottom 55%',onToggle:x=>{if(x.isActive&&vis){vis.style.setProperty('--h',s.dataset.h);vis.innerHTML='<img src="'+(s.dataset.img||'assets/images/'+s.dataset.i+'.svg')+'" data-fb="assets/images/'+s.dataset.i+'.svg" alt=""><small>'+s.dataset.s+'</small>';gsap.fromTo(vis,{scale:.95},{scale:1,duration:.6,ease:'back.out(2)'})}}}));
 $$('.tilt').forEach(c=>{c.addEventListener('pointermove',e=>{const r=c.getBoundingClientRect();gsap.to(c,{rotateY:((e.clientX-r.left)/r.width-.5)*8,rotateX:-((e.clientY-r.top)/r.height-.5)*8,transformPerspective:800,duration:.4})});c.addEventListener('pointerleave',()=>gsap.to(c,{rotateX:0,rotateY:0,duration:.6}))});
 $$('.mag').forEach(b=>{b.addEventListener('pointermove',e=>{const r=b.getBoundingClientRect();gsap.to(b,{x:(e.clientX-r.left-r.width/2)*.25,y:(e.clientY-r.top-r.height/2)*.25,duration:.3})});b.addEventListener('pointerleave',()=>gsap.to(b,{x:0,y:0,duration:.5,ease:'elastic.out(1,.5)'}))});
}
if(L){gsap.timeline({onComplete:()=>{L.remove();start()}})
 .from('#loader div',{scale:0,rotation:-12,opacity:0,stagger:.08,duration:.6,ease:'back.out(1.7)'})
 .to('#loader div',{y:-30,opacity:0,stagger:.05,duration:.5,delay:.4})}
else start();
})();

/* Form validation: <form data-validate>, inputs use data-v = name|email|pass|confirm|phone|text|check */
(()=>{const R={
 name:[v=>/^[A-Za-z]+([ -][A-Za-z]+)*$/.test(v),'Please enter letters only (no numbers or symbols).'],
 email:[v=>/^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$/.test(v),'Please enter a valid email address.'],
 pass:[v=>v.length>=8,'Password must contain at least 8 characters.'],
 phone:[v=>/^\+?[0-9 ()-]{7,15}$/.test(v),'Please enter a valid phone number.'],
 confirm:[v=>v!==''&&v===(document.querySelector('[data-v=pass]')||{}).value,'Passwords do not match.'],
 text:[v=>v.length>=5,'Please enter at least 5 characters.'],
 check:[()=>true,'Please accept the terms to continue.']};
const errorTimers=new WeakMap();
function check(i){const f=i.closest('.field'),r=R[i.dataset.v],v=i.type==='password'?i.value:i.value.trim();
 const ok=i.type==='checkbox'?i.checked:r[0](v),err=f.querySelector('.err');clearTimeout(errorTimers.get(i));f.classList.toggle('bad',!ok);err.textContent=ok?'':r[1];
 if(!ok)errorTimers.set(i,setTimeout(()=>{err.textContent='';errorTimers.delete(i)},2000));return ok}
document.querySelectorAll('form[data-validate]').forEach(fm=>{
 const ins=[...fm.querySelectorAll('[data-v]')];let messageTimer;
 fm.querySelectorAll('[data-role]').forEach(b=>b.addEventListener('click',()=>{
  fm.querySelectorAll('[data-role]').forEach(role=>role.setAttribute('aria-pressed',String(role===b)));
  clearTimeout(messageTimer);const m=fm.querySelector('.ok');if(m){m.textContent='';m.classList.remove('warning')}
 }));
 ins.forEach(i=>{i.addEventListener('blur',()=>check(i));i.addEventListener('input',()=>{if(i.closest('.field').classList.contains('bad'))check(i)})});
 fm.querySelectorAll('[data-eye]').forEach(b=>b.addEventListener('click',()=>{const p=b.previousElementSibling,s=p.type==='password';p.type=s?'text':'password';b.textContent=s?'🙈':'👁';b.setAttribute('aria-label',s?'Hide password':'Show password')}));
 fm.addEventListener('submit',e=>{e.preventDefault();clearTimeout(messageTimer);const valid=ins.map(check).every(Boolean),selectedRole=fm.querySelector('[data-role][aria-pressed="true"]'),roleRequired=fm.hasAttribute('data-role-login'),ok=valid&&(!roleRequired||selectedRole);let m=fm.querySelector('.ok');
  if(!m){m=document.createElement('p');m.className='ok';m.setAttribute('role','status');fm.appendChild(m)}
  m.classList.toggle('warning',!ok&&roleRequired&&valid);
  m.textContent=ok?(roleRequired?'Login successful (demo; credentials are not verified).':fm.dataset.ok||'Submitted successfully (demo — no backend).'):roleRequired&&valid?'Choose Admin or Public to continue.':'';
  if(m.textContent)messageTimer=setTimeout(()=>{m.textContent='';m.classList.remove('warning')},2000);
  if(ok){const destination=roleRequired?selectedRole.dataset.dashboard:fm.dataset.go;if(destination)setTimeout(()=>location.href=destination,2000);else fm.reset()}
  else if(!valid){const b=fm.querySelector('.bad input');b&&b.focus()}
  else if(roleRequired)fm.querySelector('[data-role]')?.focus()})});
document.querySelectorAll('[data-meter]').forEach(i=>{const f=i.closest('.field'),bar=f.querySelector('.meter i'),lb=f.querySelector('.lbl');i.addEventListener('input',()=>{const v=i.value;let s=0;if(v.length>=8)s++;if(/[A-Z]/.test(v)&&/[a-z]/.test(v))s++;if(/\d/.test(v))s++;if(/[^A-Za-z0-9]/.test(v))s++;const k=v?Math.max(s,1):0;bar.style.width=k*25+'%';bar.style.background=['','#e5484d','#f59e0b','#3fb8a0','#16a34a'][k];lb.textContent=v?['','Weak','Fair','Good','Strong'][k]:''})});
})();

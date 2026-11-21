const V='ektashif-v1',CORE=['./','index.html','manifest.webmanifest','icons/icon.svg','icons/icon-192.png','icons/icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(CORE)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET')return;const u=new URL(r.url);
 const fonts=u.hostname==='fonts.googleapis.com'||u.hostname==='fonts.gstatic.com';
 if(u.origin!==location.origin&&!fonts)return;
 e.respondWith(caches.match(r,{ignoreSearch:true}).then(hit=>{const net=fetch(r).then(res=>{if(res&&(res.ok||res.type==='opaque'))caches.open(V).then(c=>c.put(r,res.clone()));return res}).catch(()=>hit);return hit||net}))});

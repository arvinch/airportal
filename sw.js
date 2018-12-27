const currentCache="airportal-18w52b1-1",
airportal="/airportal/"
const airportalCSS=airportal+"styles/",
airportalImg="images/",
airportalJS=airportal+"js/"
self.addEventListener("install",e=>{
	if(location.hostname=="localhost"){
		self.skipWaiting()
	}
	e.waitUntil(caches.open(currentCache).then(cache=>{
		return cache.addAll([
			airportal,
			airportal+"manifest.json",
			airportalCSS+"airportal.css",
			airportalJS+"airportal.js",
			airportalJS+"md5.min.js",
			airportal+"favicon.ico",
			airportalImg+"loginLogo.png",
			airportalImg+"mainLogo.png",
			airportalImg+"PWA_Icon_192x.png",
			airportalImg+"PWA_Icon_512x.png"
		])
	}))
})
self.addEventListener("fetch",e=>{
	e.respondWith(caches.match(e.request).then(response=>{
		if(response){
			return response
		}else{
			return fetch(e.request).catch(()=>{})
		}
	}).then(data=>{
		if(data){
			return data
		}else{
			return new Response(null,{
				"status":502,
				"statusText":"Bad Gateway"
			})
		}
	}))
})
self.addEventListener("activate",e=>{
	e.waitUntil(caches.keys().then(cacheNames=>{
		return Promise.all(cacheNames.map(cacheName=>{
			if(cacheName.indexOf("airportal")!=-1&&cacheName!=currentCache){
				return caches.delete(cacheName)
			}
		}))
	}))
})
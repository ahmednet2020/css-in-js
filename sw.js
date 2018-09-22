'use strict';
const CACHE_NAME = 'v1.1.0';
const urlsToCache = [
  '/',
  './css/main.css',
  './js/main.js',
  './404.png'
];
self.addEventListener('install',(e) => {
  //console.log("service-workers install");
  // Perform install steps
  e.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        //console.log('Opened cache', cache);
        return cache.addAll(urlsToCache);
      })
      .then((cache) => {
          console.log('caches add');
          return self.skipWaiting();
        })
      .catch((err)=> {
       console.log(`open cashes erro: ${err}`)
      })
  );
});
// active event
self.addEventListener('activate', e => {
  // delete any old caches
  e.waitUntil(
    caches.keys().then(keys => Promise.all(
       keys.map( key => (key === CACHE_NAME ? key:caches.delete(key)) )
    ))
    .then(() => {
      console.log('remove the old cashe done');
    })
    .catch(() => {
      console.log('remove old caches faild');
    })
  );
});

// fetch event
self.addEventListener('fetch', e => {
  //console.log(caches);
  e.respondWith(
      caches.match(e.request)
      .then((res) => {
        if(res) return res;
          return fetch(e.request);
      })
      .catch((err) => {console.log('error in fetch ' + err)})
    )
});
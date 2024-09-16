'use strict';

// CODELAB: Update cache names any time any of the cached files change.
const CACHE_NAME = 'static-cache-v9';

// CODELAB: Add list of files to cache here.
const FILES_TO_CACHE = [
  '/offline.html',
  '/index.html',
  '/assets/fonts/Jersey_10/jersey-10-latin-400-normal.woff',
  '/assets/fonts/Jersey_10/jersey-10-latin-400-normal.woff2',
  '/assets/fonts/Jersey_10/Jersey10-Regular.ttf',
  '/assets/fonts/material-icons/materialdesignicons-webfont.eot',
  '/assets/fonts/material-icons/materialdesignicons-webfont.ttf',
  '/assets/fonts/material-icons/materialdesignicons-webfont.woff',
  '/assets/fonts/material-icons/materialdesignicons-webfont.woff2',
  '/assets/img/bueno_muerto.png',
  '/assets/img/bueno.png',
  '/assets/img/game_over.png',
  '/assets/img/jefe_muerto.png',
  '/assets/img/jefe.png',
  '/assets/img/malo_muerto.png',
  '/assets/img/malo.png',
  '/assets/img/shot1.png',
  '/assets/img/shot2.png',
  '/assets/img/you_win.png',
  'install.js'
];

self.addEventListener('install', (evt) => {
  console.log('[ServiceWorker] Install');
  // CODELAB: Precache static resources here.
  evt.waitUntil(
      caches.open(CACHE_NAME).then((cache) => {
        console.log('[ServiceWorker] Pre-caching offline page');
        return cache.addAll(FILES_TO_CACHE);
      })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (evt) => {
  console.log('[ServiceWorker] Activate');
  // CODELAB: Remove previous cached data from disk.
  evt.waitUntil(
      caches.keys().then((keyList) => {
        return Promise.all(keyList.map((key) => {
          if (key !== CACHE_NAME) {
            console.log('[ServiceWorker] Removing old cache', key);
            return caches.delete(key);
          }
        }));
      })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (evt) => {
  // CODELAB: Add fetch event handler here.
  // if (evt.request.mode !== 'navigate') {
  //   // Not a page navigation, bail.
  //   console.log("Fetch no navigate");
  //   return;
  // }
  console.log('[ServiceWorker] Fetch', evt.request.url);
  evt.respondWith(
      caches.open(CACHE_NAME).then((cache) => {
        return cache.match(evt.request)
            .then((response) => {
              console.log("RESP", response);
              return response || fetch(evt.request);
            });
      })
  );
});

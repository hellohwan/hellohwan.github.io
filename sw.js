const CACHE_NAME = 'hellohwan-cache-v6';
const urlsToCache = [
  '/',
  '/index.html',
  '/css/style.css',
  '/css/resume.css',
  '/js/main.js',
  '/js/components.js',
  '/js/translations.js',
  '/assets/nyancat.json'
];

self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  return self.clients.claim();
});

self.addEventListener('fetch', event => {
  // Hanya cache request GET
  if (event.request.method !== 'GET') return;
  // Jangan cache request ke API pihak ketiga seperti formsubmit
  if (event.request.url.includes('formsubmit.co')) return;

  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit - kembalikan response
        if (response) {
          return response;
        }

        return fetch(event.request).then(
          function(response) {
            // Cek apakah response valid
            if(!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // Clone response
            var responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then(function(cache) {
                cache.put(event.request, responseToCache);
              });

            return response;
          }
        );
      })
  );
});

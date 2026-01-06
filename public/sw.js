const CACHE_NAME = 'tri-training-v3';
const urlsToCache = [
  '/',
  '/index.html',
  '/tritraining.svg',
  '/manifest.json'
];

// Activar inmediatamente el nuevo service worker
self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});

// Estrategia: Network first, fallback to cache
self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Clonar la respuesta antes de guardarla
        const responseToCache = response.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseToCache);
        });
        return response;
      })
      .catch(() => {
        // Si falla la red, intentar con caché
        return caches.match(event.request);
      })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  // Tomar control inmediatamente
  return self.clients.claim();
});

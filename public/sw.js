const CACHE_NAME = 'oceanbite-cache-v1';
const ASSETS_TO_CACHE = [
  '/',
  '/mission',
  '/vision',
  '/success-stories',
  '/partner',
  '/contact',
  '/manifest.json',
  '/BCookies-192x192.png',
  '/BCookies-512x512.png',
];

// Install event: Pre-cache essential assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Opened cache and pre-caching assets');
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// Activate event: Clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  return self.clients.claim();
});

// Fetch event: Network-first strategy for navigation, Cache-first for others
self.addEventListener('fetch', (event) => {
  // We only handle GET requests
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);

  // For navigation requests (opening pages)
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          // Clone and update cache
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
          return response;
        })
        .catch(() => {
          // If network fails, try cache, or fallback to root /
          return caches.match(event.request).then((cachedResponse) => {
            return cachedResponse || caches.match('/');
          });
        })
    );
    return;
  }

  // For other requests (images, CSS, JS)
  event.respondWith(
    caches.match(event.request).then((response) => {
      return (
        response ||
        fetch(event.request).then((networkResponse) => {
          // Cache successful responses from our own origin or trusted CDNs
          if (
            networkResponse &&
            networkResponse.status === 200 &&
            (url.origin === self.location.origin || url.hostname.includes('unsplash.com') || url.hostname.includes('picsum.photos'))
          ) {
            const cacheCopy = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, cacheCopy));
          }
          return networkResponse;
        })
      );
    })
  );
});
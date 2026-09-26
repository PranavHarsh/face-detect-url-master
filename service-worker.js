// Minimal service worker that immediately unregisters itself and clears caches
'use strict';

self.addEventListener('install', (event) => {
  // Activate immediately
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    // Claim clients so the page is controlled immediately
    try {
      await self.clients.claim();
    } catch (e) {}

    // Clear all caches to avoid serving stale assets
    try {
      const keys = await caches.keys();
      await Promise.all(keys.map(k => caches.delete(k)));
    } catch (e) {}

    // Unregister this service worker so future loads are not controlled
    try {
      if (self.registration && self.registration.unregister) {
        await self.registration.unregister();
      }
    } catch (e) {}
  })());
});

// Fallback: just pass through requests to network (no caching)
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  // Let the browser handle fetches normally
});

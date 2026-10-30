// Replaces the generated offline service worker (see "postbuild" in package.json).
// Earlier builds of this app registered a caching service worker that kept
// showing visitors an old version after each deploy. When a browser that still
// has that worker checks for an update, it receives this file instead: it
// deletes the old caches, removes itself, and reloads the open pages so they
// fetch the current site.
self.addEventListener("install", () => self.skipWaiting());

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(keys.map((key) => caches.delete(key)));
      await self.registration.unregister();
      const windows = await self.clients.matchAll({ type: "window" });
      windows.forEach((client) => client.navigate(client.url));
    })(),
  );
});

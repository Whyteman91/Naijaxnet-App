const CACHE = 'naijaxnet-v3';
const BASE = 'https://whyteman91.github.io/Naijaxnet-App';
const ASSETS = [
  BASE + '/index.html',
  BASE + '/manifest.json',
  BASE + '/naijaxnet-install-banner.js'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(cached => {
      if (cached) return cached;
      return fetch(e.request).catch(() => caches.match(BASE + '/index.html'));
    })
  );
});

const CACHE_NAME = 'humble-trading-v1';
const ASSETS = [
  './hub.html',
  './index.html',
  './classifica-prop-firm-2026.html',
  './tasse-prop-firm-italia-partita-iva.html',
  './indicatore-tradingview-pinescript.html',
  './strategia-ict-liquidity-sweep-xauusd.html',
  './cheat-sheet-prop-firm.html'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});

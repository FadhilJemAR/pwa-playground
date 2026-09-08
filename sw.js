const CACHE_NAME = "pwa-lab-v89";
const ASSETS_PRECACHE = [
    "/",
    "/index.html",
    "/script.js"
    
];
const ASSETS_RUNTIMECACHE = [
    "/Gambar.jpg",
]

self.addEventListener("install", (event) => {
    self.skipWaiting();
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                return cache.addAll(ASSETS_PRECACHE);
            })
    );
});

self.addEventListener("activate", (event) => {
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
    event.waitUntil(self.clients.claim())
});

self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request).then(async (response) => {
            if (response) return response;
            const responsetry = await fetch(event.request);
            if (ASSETS_RUNTIMECACHE.includes(new URL(event.request.url).pathname)) {
                caches.open(CACHE_NAME)
                    .then((cache) => {
                        return cache.addAll(ASSETS_RUNTIMECACHE);
                    })
            }
            return responsetry;
        })
    );
});

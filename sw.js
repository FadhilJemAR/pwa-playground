const CACHE_NAME = "pwa-lab-v4";

const ASSETS = [
    "index.html",
    "script.js"
];

console.log("Service Worker: Didaftarkan");

self.addEventListener("install", (event) => {
    console.log("Service Worker Diinstall")
    self.skipWaiting();
    //Masukkan semua aset ke cache 
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log("Cache Baru dibuat: " + CACHE_NAME);
                return cache.addAll(ASSETS);
            })
    );
});

self.addEventListener("activate", (event) => {
    console.log("Mengaktifkan Service Worker Baru");
    //Bersihkan cache lama
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        console.log("Cache lama dihapus: " + cacheName);
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
            caches.match(event.request).then((response) => {
                return response || fetch(event.request);
            })
     );
    
});
self.addEventListener('install', function(event) {
    console.log('[Service Worker] Installing...');
    // Perform installation steps
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
        fetch(event.request).catch(function() {
            return caches.match(event.request);
        })
    );
});

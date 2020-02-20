const CACHE_NAME = "News-Reader-v3.7";
var urlsToCache = [
    "/",
    "/img/makanan-icon.png",
    "/img/makanan/soto-bogor.jpg",
    "/img/makanan/nasgor.jpg",
    "/img/makanan/perkedel.jpg",
    "/img/makanan/gulai-kambing.jpg",
    "/img/makanan/rendang.jpg",
    "/img/makanan/sup-ayam.jpg",
    "/img/minuman/es-kopyor-jelly.jpg",
    "/img/minuman/bir-pletok.jpg",
    "/nav.html",
    "/article.html",
    "/index.html",
    "/pages/home.html",
    "/pages/about.html",
    "/pages/makanan.html",
    "/pages/minuman.html",
    "/css/materialize.min.css",
    "/js/materialize.min.js",
    "/js/nav.js",
    "/js/api.js",
    "/js/db.js",
    "/js/idb.js",
    "/manifest.json"
];

self.addEventListener("install", function (event) {
    event.waitUntil(
        caches.open(CACHE_NAME).then(function (cache) {
            return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener("fetch", function (event) {
    var base_url = "https://readerapi.codepolitan.com/";

    if (event.request.url.indexOf(base_url) > -1) {
        event.respondWith(
            caches.open(CACHE_NAME).then(function (cache) {
                return fetch(event.request).then(function (response) {
                    cache.put(event.request.url, response.clone());
                    return response;
                })
            })
        );
    } else {
        event.respondWith(
            caches.match(event.request, {
                ignoreSearch: true
            }).then(function (response) {
                return response || fetch(event.request);
            })
        )
    }

    // event.respondWith(
    //     caches
    //     .match(event.request, {
    //         cacheName: CACHE_NAME
    //     })
    //     .then(function (response) {
    //         if (response) {
    //             console.log("ServiceWorker: Gunakan aset dari cache: ", response.url);
    //             return response;
    //         }

    //         var fetchRequest = event.request.clone();

    //         return fetch(fetchRequest).then(
    //             function (response) {
    //                 if (!response || response.status !== 200) {
    //                     return response;
    //                 }

    //                 var responseToChace = response.clone();
    //                 caches.open(CACHE_NAME)
    //                     .then(function (cache) {
    //                         cache.put(event.request, responseToChace);
    //                     });

    //                 return response;
    //             });

    //         console.log(
    //             "ServiceWorker: Memuat aset dari server: ",
    //             event.request.url
    //         );
    //         return fetch(event.request);
    //     })
    // );

});

self.addEventListener("activate", function (event) {
    event.waitUntil(
        caches.keys().then(function (cacheNames) {
            return Promise.all(
                cacheNames.map(function (cacheName) {
                    if (cacheName != CACHE_NAME) {
                        console.log("ServiceWorker: cache " + cacheName + " dihapus");
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
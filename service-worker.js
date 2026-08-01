/*
==========================================
 Borderland SSC Tracker Pro
 Service Worker
 Version 1.0
==========================================
*/

const CACHE_NAME = "ssc-tracker-v1";

const FILES_TO_CACHE = [

    "./",
    "./index.html",
    "./style.css",
    "./manifest.json",

    "./script.js",

    "./data/schedule.js",

    "./assets/icons/icon-192.png",
    "./assets/icons/icon-512.png"

];

/*
------------------------------------------
Install
------------------------------------------
*/

self.addEventListener("install", event => {

    event.waitUntil(

        caches.open(CACHE_NAME)

        .then(cache => {

            return cache.addAll(FILES_TO_CACHE);

        })

    );

    self.skipWaiting();

});

/*
------------------------------------------
Activate
------------------------------------------
*/

self.addEventListener("activate", event => {

    event.waitUntil(

        caches.keys()

        .then(keys => {

            return Promise.all(

                keys.map(key => {

                    if(key !== CACHE_NAME){

                        return caches.delete(key);

                    }

                })

            );

        })

    );

    self.clients.claim();

});

/*
------------------------------------------
Fetch
------------------------------------------
*/

self.addEventListener("fetch", event => {

    event.respondWith(

        caches.match(event.request)

        .then(response => {

            return response ||

            fetch(event.request)

            .then(networkResponse => {

                return caches.open(CACHE_NAME)

                .then(cache => {

                    cache.put(event.request, networkResponse.clone());

                    return networkResponse;

                });

            });

        })

    );

});

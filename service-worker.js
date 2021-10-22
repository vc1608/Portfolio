const cacheName = 'my-cache';

const filesToCache = [
  '/',
  '/about',
  '/index.html',
  '/about.html',
  '/assets/css/styles.css',
  '/assets/css/swiper-bundle.min.css',
  '/assets/pdf/Vishal_Chauhan(Resume).pdf',
  '/assets/js/main.js',
  '/assets/js/swiper-bundle.min',
  '/assets/Images/about_image.png',
  '/assets/Images/home_image.png',
  '/assets/Images/blob.html',
  '/assets/Images/VC_favicon.html',
  '/js/app.js',
  '/img/logo.png'
];

self.addEventListener('activate', e => self.clients.claim());

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(cacheName)
    .then(cache => cache.addAll(filesToCache))
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request)
    .then(response => response ? response : fetch(e.request))
  )
});

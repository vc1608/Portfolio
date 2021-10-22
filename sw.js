const cacheName = 'cache-v1';

const resourcesToPrecache = [
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


self.addEventListener('install', event => {
	console.log('Install event!');
});

self.addEventListener('activate', event => {
	console.log('Activate event!');
});

self.addEventListener('fetch', event => {
	console.log('Fetch Intercepted for:', event.request.url);
});
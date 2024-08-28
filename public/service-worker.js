// public/service-worker.js

self.addEventListener('push', function (event) {
  const data = event.data.json();
  const title = data.title || 'Default title';
  const options = {
    body: data.body || 'Default body',
    icon: data.icon || '/icon-192x192.png',
    badge: data.badge || '/badge-72x72.png',
  };

  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});

self.addEventListener('notificationclick', function (event) {
  event.notification.close();
  event.waitUntil(
    clients.openWindow('https://www.artbasel.com') // Replace with your app URL
  );
});

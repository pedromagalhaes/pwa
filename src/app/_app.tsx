// pages/_app.js

import { useEffect } from 'react';

import { ComponentType } from 'react';

function urlBase64ToUint8Array(base64String: string | any[]) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

function MyApp({ Component, pageProps }: { Component: ComponentType<any>, pageProps: any }) {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/service-worker.js').then(registration => {
        console.log('Service Worker registered with scope:', registration.scope);
      }).catch(error => {
        console.error('Service Worker registration failed:', error);
      });
    }
  }, []);

  useEffect(() => {
    if ('serviceWorker' in navigator && 'PushManager' in window) {
      navigator.serviceWorker.ready.then(registration => {
        return registration.pushManager.getSubscription()
          .then(async subscription => {
            if (subscription) {
              return subscription;
            }

            const response = await fetch('/vapidPublicKey');
            const vapidPublicKey = await response.text();
            const convertedVapidKey = urlBase64ToUint8Array(vapidPublicKey);

            return registration.pushManager.subscribe({
              userVisibleOnly: true,
              applicationServerKey: convertedVapidKey
            });
          });
      }).then(subscription => {
        console.log('User is subscribed:', subscription);
        // Send subscription to the server for saving
      }).catch(error => {
        console.error('Failed to subscribe the user: ', error);
      });
    }
  }, []);

  return <Component {...pageProps} />;
}

export default MyApp;

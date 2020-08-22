importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.4.1/workbox-sw.js');
//importing and checking for workbox
if (workbox) {
  console.log(`Yay! Workbox is loaded 🎉`);
} else {
  console.log(`Boo! Workbox didn't load 😬`);
}

//event listener for notification clicks
self.addEventListener('notificationclick', function(event) {
  const data = event.notification
  console.log('[Service Worker] Notification click Received.');

  if (event.action === 'close') {
    console.log("Closed")
    data.close();
  } else {
  data.close();
  if(data.title === "Survey Ready!"){
  event.waitUntil(
    clients.openWindow('https://ampdmath.com/survey?classID='+data.data.urlData)
  );
}
}
});

self.addEventListener('notificationclose', function(event){
  console.log('notification was dismissed.')
  const dismissedNotification = event.notification;
  dismissedNotification.close();
  const promiseChain = notificationCloseAnalytics();
  event.waitUntil(promiseChain);
})

//looks for a push event and then sets all the options for a notification
//then shows it.
self.addEventListener('push', (event) => {
  const data = event.data.json()
  const title = data.title
  
  const options = {
    body: data.body,
    icon: 'tmplogo.png',
    badge: 'tmplogo.png',
    data: data.data,
    actions:data.actions
  }
  event.waitUntil(self.registration.showNotification(title, options))
})

importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.4.1/workbox-sw.js');

if (workbox) {
  console.log(`Yay! Workbox is loaded 🎉`);
} else {
  console.log(`Boo! Workbox didn't load 😬`);
}

// const bgSyncPlugin = new workbox.backgroundSync.Plugin('todoQueue', {
//   maxRetentionTime: 24 * 60
// });

// workbox.routing.registerRoute(
//   /\.(?:js|css|html)$/,
//   workbox.strategies.networkFirst()
// )

// workbox.routing.registerRoute(
//   'http://localhost:3000',
//   workbox.strategies.networkFirst()
// )

// workbox.routing.registerRoute(
//   'http://localhost:5000/todos',
//   workbox.strategies.networkFirst(),
//   'GET'
// )

// workbox.routing.registerRoute(
//   'http://localhost:5000/todos',
//   workbox.strategies.networkFirst({
//     plugins: [bgSyncPlugin]
//   }),
//   'POST'
// )
function ignore(stuff) {
  ignored = setTimeout(function(){ console.log("Ignored"); validTime=0}, 3000);
  validTime = 1
  console.log(stuff)
}
// function notIgnored() {
//   clearTimeout(ignored);
// }
self.addEventListener('close', function(event) {
  const dismissedNotification = event.notification;
  // const promiseChain = notificationCloseAnalytics();
  // event.waitUntil(promiseChain);
});

self.addEventListener('notificationclick', function (event) {
  // notIgnored()
  const data = event.notification
  if (event.action === 'close') {
    console.log("Closed")
    data.close();
  } else {
    // clients.openWindow('localhost:3000/survey?classID='+data.data.classID+"obsID="+data.data.obsID)
    clients.openWindow('https://ampdmath.com/survey?classID='+data.data.classID+"?obsID="+data.data.obsID)
    console.log("Notification has expired")
    data.close();
  }
  //   console.log(event)
    // event.notification.close();

    // event.waitUntil(
    // );
  // }
});


self.addEventListener('notificationclose', event => {
  //change this so dismissed are handled differently.
  const notification = event.notification;
  const primaryKey = notification.data.primaryKey;

  console.log('Closed notification: ' + primaryKey);
});
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
  // ignore(options.data)
})
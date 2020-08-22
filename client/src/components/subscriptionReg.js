export default function unsubscribePush() {
  navigator.serviceWorker.ready.then(registration => {
    //Find the registered push subscription in the service worker
    registration.pushManager
      .getSubscription()
      .then(subscription => {
        if (!subscription) {
          return 
          //If there isn't a subscription, then there's nothing to do
        }
        
        subscription
          .unsubscribe()
          .then(() => axios.delete("push/unregister"))
          .catch(err => console.error(err))
      })
      .catch((err) => console.error(err))
  })
}
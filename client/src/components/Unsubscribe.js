import axios from "axios"

export default function unsubscribePush() {
  console.log("trying to unsubscribe")
  navigator.serviceWorker.ready.then(registration => {
    //Find the registered push subscription in the service worker
    registration.pushManager
      .getSubscription()
      .then(subscription => {
        if (!subscription) {
          document.getElementById("subscriptionStatusWarn").style.display = "none";
        document.getElementById("subscriptionStatusAlreadyUnSub").style.display = "block";
        document.getElementById("subscriptionStatusSub").style.display = "none";
        document.getElementById("subscriptionStatusAlreadySub").style.display = "none";
          return
          //If there isn't a subscription, then there's nothing to do
        }
        document.getElementById("subscriptionStatusWarn").style.display = "block";
        document.getElementById("subscriptionStatusAlreadyUnSub").style.display = "none";
        document.getElementById("subscriptionStatusSub").style.display = "none";
        document.getElementById("subscriptionStatusAlreadySub").style.display = "none";
        subscription
          .unsubscribe()
          .then(() => axios.delete("push/unregister"))
          .catch(err => console.error(err))
      })
      .catch((err) => console.error(err))
  })
}
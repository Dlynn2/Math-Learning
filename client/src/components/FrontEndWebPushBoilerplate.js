const vapidPublicKey =
  "BLo2AcZTKNOIcpOk02j-AKrxJXb_SozzSMfBfaq1grL5HFOlz8Tn4bDrbxXvqAQwC4YwsKBc4mCMUW6a_XRy64I"
const convertedVapidKey = urlBase64ToUint8Array(vapidPublicKey)

function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - base64String.length % 4) % 4)
  const base64 = (base64String + padding).replace(/\-/g, "+").replace(/_/g, "/")

  const rawData = window.atob(base64)
  const outputArray = new Uint8Array(rawData.length)

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i)
  }
  return outputArray
}
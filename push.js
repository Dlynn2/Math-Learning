const router = require("express").Router()
module.exports = router
const webpush = require("web-push")
const Account = require("./models/Account")
const secrets = require("./secrets.json")
webpush.setGCMAPIKey(secrets.dev.GCMAPIKey)
webpush.setVapidDetails(
  "mailto:your-email-address@example-domain.com",
  secrets.dev.PUBLIC_VAPID_KEY,
  secrets.dev.PRIVATE_VAPID_KEY
)

const attendanceContents = {
  title: "Attendence",
  body: "Thanks for attending class!",
  icon: "images/tmplogo.png",
  vibrate: [200, 100, 200],
  badge: 'images/tmplogo.png',
  actions: [
    { action: 'close', title: 'close this :(', icon: 'images/x-mark.jpg' }
  ]
}
const surveyNotification = {
  title: "Survey Ready!",
  body: "Click here to take a survey!",
  vibrate: [200, 100, 200],
  data: {
    classID: '',
    obsID:''
  },
  actions: [
    { action: 'close', title: 'close this :(', }
  ]
}
let subscription


router.post("/subscriptionReg", (req, res, next) => {
  subscription = req.body.subscription
  userID = req.body.userID
  console.log(subscription)
  Account.findOne({
    attributes: ['subscription'],
    where: { userid: userID }
  })
    .then(subscriptionCheck => {
      if (!subscriptionCheck.dataValues.subscription) {
        let subscriptionArr = []
        subscriptionArr.push(subscription)
        subscription = JSON.stringify(subscriptionArr)
        Account.update(
          { subscription: subscription },
          { where: { userid: userID } }
        )
      }
      else {
        let subscriptionArr = JSON.parse(subscriptionCheck.dataValues.subscription)
        subscriptionArr.push(subscription)
        subscription = JSON.stringify(subscriptionArr)
        Account.update(
          { subscription: subscription },
          { where: { userid: userID } }
        )
      }
    })
  res.sendStatus(201)

})



router.post("/test", (req, res) => {
  subscription = req.body.subscription
  userID = req.body.userID

  // res.sendStatus(201)
  Account.findOne({
    attributes: ['subscription'],
    where: { userid: userID }
  })
    .then()
  console.log('here')
  subscription = JSON.parse(subscription)
  testData.body = req.body.firstName + "Click here to take a survey!"
  webpush.sendNotification(subscription, JSON.stringify(testData))
    .catch(() => console.log("here it is"))
})


router.post("/attendance", (req, res) => {
  Account.findOne({
    attributes: ['subscription'],
    where: { userid: req.body.userid }
  })
    .then(subscription => {
      subscription = JSON.parse(subscription.dataValues.subscription)
      subscriptionToBE = subscription
      subscription.forEach(function (deviceSub, index, object) {
        webpush.sendNotification(deviceSub, JSON.stringify(attendanceContents))
          .catch(() => {
            console.log('still catching an error' + ' ' + JSON.stringify(index))
            subscriptionToBE = subscriptionToBE.filter(item => item !== object[index]);
            Account.update(
              { subscription: JSON.stringify(subscriptionToBE) },
              { where: { userid: req.body.userid } })
          })
      });
    })
  res.sendStatus(200)
})

router.post("/surveyNotification", (req, res) => {
  Account.findOne({
    attributes: ['subscription'],
    where: { userid: req.body.userid }
  })
    .then(subscription => {
      console.log(req.body)
      surveyNotification.data.classID = req.body.classID
      surveyNotification.data.obsID = req.body.sectionID
      subscription = JSON.parse(subscription.dataValues.subscription)
      subscriptionToBE = subscription
      subscription.forEach(function (deviceSub, index, object) {
        webpush.sendNotification(deviceSub, JSON.stringify(surveyNotification))
          .catch(() => {
            console.log('still catching an error' + ' ' + JSON.stringify(index))
            subscriptionToBE = subscriptionToBE.filter(item => item !== object[index]);
            Account.update(
              { subscription: JSON.stringify(subscriptionToBE) },
              { where: { userid: req.body.userid } })
          })
      });
    })
  res.sendStatus(200)
})

router.delete("/unregister", (req, res, next) => {
  subscription = null
  res.sendStatus(200)
  console.log("subscription cancelled")
})
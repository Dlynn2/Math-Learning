const router = require("express").Router()
module.exports = router
const webpush = require("web-push")
const Account = require("../models/Account")
const jwt_decode = require("jwt-decode");
const axios = require("axios");
const schedule = require('node-schedule');
const inClassNotificationSchedules = "./SchedulingFunctions";

//setting VAPID KEYS, Should not change. Connected to google API
webpush.setGCMAPIKey(process.env.GOOGLE_API_KEY || "AIzaSyBiAIkdYnjOURvt4nHGQVEOHXyZTopqnHU")
webpush.setVapidDetails(
  "mailto:your-email-address@example-domain.com",
  process.env.PUBLIC_VAPID_KEY || 'BLo2AcZTKNOIcpOk02j-AKrxJXb_SozzSMfBfaq1grL5HFOlz8Tn4bDrbxXvqAQwC4YwsKBc4mCMUW6a_XRy64I',
  process.env.PRIVATE_VAPID_KEY
|| '48KL5ZSzvaupzdPdwEMDXyRU_0IbGHyPriqjvp_ov9E'
)

//sets Notification options
const surveyNotification = {
  title: "Survey Ready!",
  body: "Click here to take a survey!",
  vibrate: [200, 100, 200],
  data: {
    classID: '',
    obsID:'',
    phonenumber:''
  },
  actions: [
    { action: 'close', title: 'close this :(', }
  ]
}

const attendanceNotification = {
  title: "Checked in!",
  body: "Thank you for attending class!",
  icon: "images/tmplogo.png",
  vibrate: [200, 100, 200],
  badge: 'images/tmplogo.png',
  actions: [
    { action: 'close', title: 'close this ', }
  ]
}


let subscription

//This is called when subscription button is clicked
router.post("/subscriptionReg", (req, res, next) => {
  subscription = req.body.subscription
  userID = req.body.userid
  console.log(subscription)
//looks for subscription in account if it finds one it adds the new one to an array else  just puts it in the database
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

//this is called when a notification is sent out
router.post("/surveyNotification", (req, res) => {
  Account.findOne({
    //attributes: ['phonenumber'],
    where: { userid: req.body.userid }
  })
    .then(subscription => {
      subscription = JSON.parse(subscription.dataValues.phonenumber)
  surveyNotification.data.classID = req.body.classID
  surveyNotification.data.obsID = req.body.sectionID
  surveyNotification.data.phonenumber = req.body.phonenumber

  var concatNum = ("+1" + req.body.phonenumber);
  var surveyLink = "https://ampdmath.com/survey";
//for each loop that loops through all subscriptions in account and if the subscription is invalid it is removed
      subscription.forEach(function (deviceSub, index, object) {
        webpush.sendNotification(deviceSub, JSON.stringify(surveyNotification))
          .catch(() => {
            console.log('still catching an error' + ' ' + JSON.stringify(index))
	    subscription = subscription.filter(item => item !== object[index])
              Account.update(
                { subscription: JSON.stringify(subscription) },
                { where: { userid: req.body.userid } }
              )
          })
      });
    })
  res.sendStatus(200)
})

router.post("/attendanceNotification", (req, res) => {
  Account.findOne({
    attributes: ['phonenumber'],
    where: { userid: req.body.userid }
  })
    .then(subscription => {
      /*subscription = JSON.parse(subscription.dataValues.phonenumber)
      console.log("Subscription = " + subscription);
      console.log("Subsription.dataValues.userid = " + subscription.dataValues.userid);
      surveyNotification.data.classID = req.body.classID
      surveyNotification.data.phonenumber = req.body.phonenumber
      var jwt_decode = require("jwt-decode");
      var axios = require("axios");
      var schedule = require('node-schedule');
      var inClassNotificationSchedules = "./SchedulingFunctions";
      var concatNum = ("+1" + subscription.dataValues.userid);
      var surveyLink = "https://ampdmath.com/survey";
      console.log("Sending a message to: " + concatNum);
//for each loop that loops through all subscriptions in account and if the subscription is invalid it is removed
      /*subscription.forEach(function (deviceSub, index, object) {
        webpush.sendNotification(deviceSub, JSON.stringify(attendanceNotification))
          .catch(() => {
            console.log('still catching an error' + ' ' + JSON.stringify(index))
            subscription = subscription.filter(item => item !== object[index])
              Account.update(
                { subscription: JSON.stringify(subscription) },
                { where: { userid: req.body.userid } }
              )
          })
      });*/
    })
  res.sendStatus(200)
})




//deletes the subscription from the service worker.
  router.delete("/unregister", (req, res, next) => {
    subscription = null
    res.sendStatus(200)
  })

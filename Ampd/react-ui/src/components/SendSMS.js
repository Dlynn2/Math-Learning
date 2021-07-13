exports.SendSMS = function (phonenumber) {
  var jwt_decode = require("jwt-decode");
  var axios = require("axios");
  var schedule = require('node-schedule');
  var inClassNotificationSchedules = "./SchedulingFunctions";
  var concatNum = ("+1" + phonenumber);
  var surveyLink = "https://ampdmath.com/survey";
  console.log("TEXT WILL BE SENT TO THE FOLLOWING NUMBER: " + concatNum);
  //Sends a text message via Twilio to the phonenumber passed in as a parameter
    fetch('/api/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({to: concatNum, body: "AMP'D Math learning: Take your survey here: " + surveyLink})
    });
}

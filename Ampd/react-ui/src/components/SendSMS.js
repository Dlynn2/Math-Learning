//import { inClassNotificationSchedules } from "./SchedulingFunctions"
exports.SendSMS = function () {
  var jwt_decode = require("jwt-decode");
  var axios = require("axios");
  var schedule = require('node-schedule');
  var inClassNotificationSchedules = "./SchedulingFunctions";
  var concatNum = ("+1" + jwt_decode(localStorage.usertoken).phonenumber);
  var surveyLink = "https://ampdmath.com/survey";
    fetch('/api/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      //body: JSON.stringify({to: '+14068502071', body: 'Test message from AMPD Math.'})
      body: JSON.stringify({to: concatNum, body: "AMP'D Math learning: Take your survey here: " + surveyLink})
    });

    //console.log("Message has been sent! To: " + concatNum);
    //console.log("It's time to take your AMP'D Survey! Please tap this link here: " + surveyLink)


    //creating variables to make times for when notifications are sent out
    /*var sectionID = 0;
    var firstSendMinute = 1;
    var secondSendMinute = 2;
    // these are details that will be bound to notifications
    var studentDetails = {
	      userid:this.userid,
	      classID:this.classCode,
        sectionID:sectionID
	  }
    //sends the attendance notification
    axios.post("push/attendanceNotification", {
        userid: studentDetails.userid
    })
    axios.post("push/surveyNotification", {
        userid: jwt_decode(localStorage.usertoken).userid,
        classID:this.classID,
        sectionID:this.sectionID
    })
    console.log("UserID: " + jwt_decode(localStorage.usertoken).userid);
    console.log("ClassID: " + jwt_decode(localStorage.usertoken).classID);
    console.log("Phone Number: " + jwt_decode(localStorage.usertoken).phonenumber);
    var test = schedule.scheduleJob(firstSendMinute.toString() + ' * * * *', function (student) {
        axios.post("push/surveyNotification", {
            userid: student.userid,
            classID:student.classID,
            sectionID:student.sectionID
        })
        var  studentDet = {
         userid:student.userid,
         classID:student.classID,
         sectionID:sectionID
        }
	      console.log(secondSendMinute)
        var test2 = schedule.scheduleJob(secondSendMinute.toString() + ' * * * *', function (studentidTwo) {
            axios.post("push/surveyNotification", {
            userid: studentidTwo.userid,
            classID:studentidTwo.classID,
            sectionID:studentidTwo.SectionID
        })
	      test2.cancel()
        }.bind(null, studentDet))
	//cancels the job so it once it sends once it ends.
      test.cancel()
      }.bind(null, studentDetails))
      console.log("Test: " + test);
      //console.log("Test2: " + test2);*/

}
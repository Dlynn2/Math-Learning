import axios from 'axios';

var schedule = require('node-schedule');
export const inClassNotificationSchedules = times => {
    //creating variables to make times for when notifications are sent out
    var startTime = times.startTime
    var endTime = times.endTime
    var startMins = parseInt(startTime[0]) * 60 + parseInt(startTime[1]) + 5
    var endMins = parseInt(endTime[0]) * 60 + parseInt(endTime[1])
    var midpoint = Math.floor((endMins - startMins) / 2)
    var testNumber = Math.floor(Math.random() * (midpoint));
    var firstSendMinute = Math.floor(parseInt(startTime[1]) + testNumber) + 5;
    var thirds = Math.floor(((endMins-5)-startMins)/3)
    var section = [parseInt(startTime[1])+ 5 +thirds,parseInt(startTime[1])+ 5 +thirds*2,parseInt(startTime[1])+ 5 +thirds*3]
    var sectionID = 0;
    //if it passes into the next hour just change it to the next hour
    if (firstSendMinute >= 60) {
        firstSendMinute = firstSendMinute - 60;
    }

    if(firstSendMinute <= section[0]){
     sectionID=1;
    }
    else{
    sectionID=2;
    }

    // these are details that will be bound to notifications
    var studentDetails = {
	userid:times.userid,
	classID:times.classCode,
        sectionID:sectionID
	}
    //sends the attendance notification
    axios.post("push/attendanceNotification", {
        userid: studentDetails.userid
    })
    console.log(firstSendMinute)
    //create a cron like job named test that will activate once the first send minute hits.with student details bound to it.
    var test = schedule.scheduleJob(firstSendMinute.toString() + ' * * * *', function (student) {
        axios.post("push/surveyNotification", {
            userid: student.userid,
            classID:student.classID,
            sectionID:student.sectionID
        })

        var secondSendMinute = parseInt(parseInt(startTime[1]) + midpoint + Math.random() * (midpoint));
        if(secondSendMinute >= section[0] && secondSendMinute <= section[1]){
         sectionID = 2;
        }
        else{
         sectionID = 3;
        }

        if (secondSendMinute >= 60) {
            secondSendMinute = secondSendMinute - 60;
        }
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
}

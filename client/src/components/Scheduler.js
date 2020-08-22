import React, { Component } from 'react'
import axios from 'axios';

const webpush = require("web-push")
var schedule = require('node-schedule');
var rule = new schedule.RecurrenceRule();

export const Scheduler = (props) => {
    const {
        startTime,
        days,
        startDate,
        endDate
    } = props;

    const attendenceData = {
        title: "Attendence",
        body: "Click here if you are in class!",
        icon: "images/tmplogo.png",
        vibrate: [200, 100, 200],
        badge: 'images/tmplogo.png',
        actions: [
            { action: 'close', title: 'close this :(', icon: 'images/x-mark.jpg' }
        ]
    }
    const surveyNotificationData = {
        title: "Survey",
        body: "Click here to take a survey!",
        icon: "images/tmplogo.png",
        vibrate: [200, 100, 200],
        badge: 'images/tmplogo.png',
        actions: [
            { action: 'close', title: 'close this :(', icon: 'images/x-mark.jpg' }
        ]
    }
    days = { days }
    days.forEach(day => {
        switch (day) {
            case "U":
                rule.dayOfWeek.push(0)
                break;
            case "M":
                rule.dayOfWeek.push(1)
                break;
            case "T":
                rule.dayOfWeek.push(2)
                break;
            case "W":
                rule.dayOfWeek.push(3)
                break;
            case "R":
                rule.dayOfWeek.push(4)
                break;
            case "F":
                rule.dayOfWeek.push(5)
                break;
            case "A":
                rule.dayOfWeek.push(6)
                break;
            default:
                return;
        }
    });
    startTime = startTime.toString()
    startTime = startTime.split(":")
    rule.dayOfWeek = []
    rule.hour = startTime[0];
    rule.minute = startTime[1];
    // return "rule.dayOfWeek"

//     schedule.scheduleJob({ start: startDate, end: endDate, rule: rule }, function () {
//         //Need a get for all students w/ consent bool in class's subscriptions 
//         //to send notification for attendence  &&  is still enrolled in this class

//         //Need a get for start times and endtime of classes 
//         //that start at the time this function runs


//         var endTime = endTime.toString()
//         var endTime = endTime.split(":")
//         var startTime = startTime.toString()
//         var startTime = startTime.split(":")

//         const students = true //change this to res.data
//         var startMins = parseInt(startTime[0]) * 60 + parseInt(startTime[1])
//         var endMins = parseInt(endTime[0]) * 60 +  parseInt(endTime[1])
//         var midpoint = Math.floor((endMins - startMins) / 2)


//         students.forEach(studentSubscription => {

//             webpush.sendNotification(JSON.parse(studentSubscription), JSON.stringify(attendenceData))
//             var firstSendMinute = parseInt((startTime[1]) + Math.random() * (midpoint - 5)) + 5;
//             if (firstSendMinute >= 60) {
//                 firstSendMinute = firstSendMinute - 60;
//             }


//             schedule.scheduleJob(firstSendMinute.toString() + ' * * * *', function (studentSubscription) {
//                 webpush.sendNotification(JSON.parse(studentSubscription), JSON.stringify(surveyNotificationData))
//                 var secondSendMinute = parseInt(midpoint + Math.random() * (midpoint)) - 5;
//                 if (secondSendMinute >= 60) {
//                     secondSendMinute = secondSendMinute - 60;
//                 }
//                 schedule.scheduleJob(secondSendMinute.toString() + ' * * * *', function () {
//                     webpush.sendNotification(JSON.parse(studentSubscription), JSON.stringify(surveyNotificationData))

//                 }).bind(null, studentSubscription)

//             }).bind(null, studentSubscription)

//         });

//     })
//     // testData.body = req.body.firstName + "Click here to take a survey!"
//     // webpush.sendNotification(JSON.parse(subscription), JSON.stringify(testData))
//     //     .catch(() => console.log("error"))
// }
}
export default Scheduler;
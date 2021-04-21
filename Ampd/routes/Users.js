const express = require("express")
const users = express.Router()
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const Account = require("../models/Account")
const Question = require("../models/SurveyQuestion")
const Survey = require("../models/SurveyResponse")
const Class = require("../models/Class")
const IsEnrolledIn = require("../models/IsEnrolledIn")
const IsAdministeredBy = require("../models/IsAdministeredBy")
const University = require("../models/University")
const sequelize = require("sequelize")
process.env.SECRET_KEY = 'secret'

// TODO: use npm scheduler to create a recurring event based on the start time of each class
//  the event will grab each user from all classes that have that start time.
//  for each loop across every user creating a one time event that  will push them to the survey
// page.
function doesUserExist(u) {
    foundUser = ""
    console.log(u)

    Account.findOne({
        where: {
            username: u
        }
    })
        .then(user => {
            foundUser = user
        })
        .catch(err => {
            console.log("doesUserExist ERR: " + err)
        })
    return foundUser
}

async function addAdmin(username, classcode){
	foundTeacher = ''
	await Account.findOne({
		where: {Username: username}
	})
	.then(found=>{
		console.log(found.dataValues)
		if(found.dataValues.accountType == '2' || found.dataValues.accountType == '3'){
			Class.findOne({
				where: {ClassCode: classcode}
			})
			.then(foundClass=>{
				console.log(foundClass.dataValues)
				IsAdministeredBy.create({
					classid: foundClass.dataValues.ClassID,
					adminid: found.dataValues.userid
				})
			})
			.catch(err=>{
				console.log("addAdmin ERR: "+err)
			})
		}
		else{
			console.log("Account found not high enough security")
		}
	})
	.catch(err=>{
		console.log("addAdmin ERR: "+err)
	})
	return foundTeacher
}

async function getSubscription(sid){
	foundSub = ""
	await Account.findOne({
		where: {
			UserID: sid
		}
	})
	.then(found => {
		foundSub = found
	})
	.catch(err => {
		console.log("getSubscription ERR: "+err)
	})
	return foundSub
}

async function setSubscription(sid, sub){
	await Account.update(
		{ subscription: sub },
		{ where: { UserID: sid } }
	)
	.then(result => {})
	.catch(err => {
		console.log("setSubscription ERR: "+err)
	})
}

async function getClassID(cc) {
	foundID = ""
	await Class.findOne({
		where: {
			ClassCode: cc
		}
	})
	.then(foundclass => {
		foundID = foundclass.ClassID
	})
	.catch(err => {
		console.log("getClassID ERR: " + err)
	})
	return foundID
}

async function getTimeZone(cid) {
	foundUniversity = ''
	foundTimeZone = 0
	await Class.findOne({
		where: {
			ClassID: cid
		}
	})
	.then(found=>{
		foundUniversity = found.UniversityID
	})
	.catch(err => {
		console.log("getTimeZone ERR: "+err)
	})
	await University.findOne({
		where: {
			UID: parseInt(foundUniversity)
		}
	})
	.then(found => {
		foundTimeZone = found.timezone
	})
	.catch(err => {
		console.log("getTimeZone ERR: "+err)
	})
	return foundTimeZone
}

async function getClassTime(cid){
	foundTime = ""
	await Class.findOne({
		where: {
			ClassID: cid
		}
	})
	.then(foundClass => {
		foundTime = {
			StartTime: foundClass.StartTime,
			EndTime: foundClass.EndTime,
			Days: foundClass.Days
		}
	})
	.catch(err => {
		console.log("getClassTime ERR: " + err)
	})
	return foundTime
}

async function isClassNow(cid, date, day) {
	var thisDate = date.substr(0,10)
	var thisTime = date.substr(11,8)
	console.log(thisDate+", "+thisTime)
	var foundClass = ""
	await Class.findOne({
		where: {ClassID: cid}
	})
	.then(found => {
		foundClass = found
	})
	.catch(err => {
		console.log("isClassNow: " + err)
	})
	var foundDate1 = foundClass.StartDate
	var foundDate2 = foundClass.EndDate
	var foundTime1 = foundClass.StartTime
	var foundTime2 = foundClass.EndTime
	var foundDays = foundClass.Days

	var currentDay = false
	switch(day){
		case 0: foundDays.search('U') > -1 ? currentDay = true : currentDay = false
			break
		case 1: foundDays.search('M') > -1 ? currentDay = true : currentDay = false
			break
		case 2: foundDays.search('T') > -1 ? currentDay = true : currentDay = false
			break
		case 3: foundDays.search('W') > -1 ? currentDay = true : currentDay = false
			break
		case 4: foundDays.search('R') > -1 ? currentDay = true : currentDay = false
			break
		case 5: foundDays.search('F') > -1 ? currentDay = true : currentDay = false
			break
		case 6: foundDays.search('A') > -1 ? currentDay = true : currentDay = false
			break
		default:
			currentDay = false
			break
	}

	//console.log(currentDay+", "+thisDate >= foundDate1+", "+thisDate<=foundDate2+", "+thisTime>=foundTime1+", "+thisTime<=foundTime2)

	return currentDay && thisDate >= foundDate1 && thisDate <= foundDate2 && thisTime >= foundTime1 && thisTime <= foundTime2
}

async function getCurrentClass(sid, date, day){
	console.log(sid+", "+date+", "+day)
	foundClasses = await getEnrolledIn(sid)
	currentClass = ""
	for (let i = 0; i < foundClasses.length; i++){
		var id = foundClasses[i].ClassID
		console.log("isNow("+id+", "+date+", "+day+")")
		var isNow = await isClassNow(id, date, day)
		//console.log(isNow)
		if (isNow){
			//console.log("FoundClass: "+foundClasses[i].ClassID)
			await Class.findOne({
				where: {ClassID: parseInt(foundClasses[i].ClassID)}
			})
			.then(found => {
				currentClass = found
			})
			.catch(err=>{
				console.log("getCurrentClass ERR: "+err)
			})
		}
	}
	return currentClass
}

async function getAllEnrolledTimes(sid) {
	times = []
	classes = await getEnrolledIn(sid)
	for(let i = 0; i < classes.length; i++){
		times.push(await getClassTime(classes[i].ClassID))
	}
	return times
}

async function getSubscriptionsFor(cid) {
	var foundStudents = ""
	var foundSubs = []
	await IsEnrolledIn.findAll({
		where: {ClassID: cid}
	})
	.then(found => {
		foundStudents = found
	})
	.catch(err => {
		console.log("getStudentsIn ERR: "+err)
	})
	for(var i = 0; i < foundStudents.length; i++) {
		var id = foundStudents[i].dataValues.StudentID
		var sub = await getSubscription(id)
		//console.log(sub.dataValues.subscription)
		foundSubs.push(sub.dataValues.subscription)
		//console.log(foundSubs)
	}
	return foundSubs
}

async function getEnrolledIn(sid) {
	var foundClasses = ""
	await IsEnrolledIn.findAll({
		//attributes: ['ClassID'],
		where: {StudentID: sid}
	})
	.then(found => {
		foundClasses = found
	})
	.catch(err => {
		console.log("getEnrolledIn ERR: " + err)
	})
	return foundClasses
}

async function getAdminedClasses(sid) {
	var foundClasses = ""
	await IsAdministeredBy.findAll({
		where: {AdminID: sid}
	})
	.then(found => {
		foundClasses = found
	})
	.catch(err => {
		console.log("getAdminedClasses ERR: " + err)
	})
	return foundClasses
}

async function getClassTimes(cid) {
	var foundTimes = ""
	await Class.findOne({
		attributes: ['ClassID', 'StartTime', 'EndTime'],
		where: {ClassID: cid}
	})
	.then(found => {
		foundTimes = found
	})
	.catch(err=>{
		console.log("getClassTimes ERR: " + err)
	})
	return foundTimes
}

async function getDatatable() {
	var foundData = ""
	await Survey.findAll({
		order: [['Timestamp', 'ASC']]
	})
	.then(data => {
		//console.log("Raw Datatable Data: "+data)
		foundData = data
	})
	.catch(err => {
		console.log("getDatatable ERR: " + err)
	})
	return foundData
}

users.post('/profile/addAdmin', async (req, res) => {
	res.json(await addAdmin(req.body.username, req.body.classcode))
})

users.post('/profile/getSubscriptionsFor', async (req, res) => {
	res.json(await getSubscriptionsFor(req.body.cid))
})

users.post('/profile/getSubscription', async (req, res) => {
	res.json(await getSubscription(req.body.sid))
})

users.post('/profile/setSubscription', async (req, res) => {
	res.json(await setSubscription(req.body.sid, req.body.sub))
})

users.post('/profile/getClassTimes', async (req, res) => {
	res.json(await getClassTimes(req.body.cid))
})

users.post('/profile/getCurrentClass', async (req, res) => {
	res.json(await getCurrentClass(req.body.sid, req.body.date, req.body.day))
})

users.post('/profile/isClassNow', async (req, res) => {
	res.json(await isClassNow(req.body.cid, req.body.date, req.body.day))
})

users.post('/profile/allEnrolledTimes', async (req, res) => {
	res.json(await getAllEnrolledTimes(req.body.sid))
})

users.post('/profile/datatable', async (req, res) => {
	res.json(await getDatatable())
})

users.post('/profile/classTime', async (req, res) => {
	res.json(await getClassTime(req.body.cid))
})

users.post('/profile/enrolledClasses', async (req, res) => {
	res.json(await getEnrolledIn(req.body.sid))
})

users.get('/profile/classQuestionCount', (req, res) => {
    Question.count({
	where: {ClassID: req.headers.classid},
	distinct: true,
	col: Question.SurveyQuestion
    })
    .then(count => {
	//console.log("Class Question Count: "+count)
	return count
    })
    .catch(err => {
	console.log("classQuestionCount ERR: "+err)
    })
})

users.get('/profile/classes', (req, res) => {
    Class.findAll({
        attributes: ['ClassName', 'StartTime', 'EndTime', 'Days','ClassCode'],
    })
        .then(stuff => {
            res.end(JSON.stringify(stuff))
        })
})
users.get('/dataTables', (req, res) => {
    Survey.findAll({
        attributes: ['UserID','Engagement', 'Interest', 'Enjoyment', 'Challenge', 'Skill']
    })
        .then(responses => {
            res.send(JSON.stringify(responses))
        })
})
users.post('/profile', async (req, res) => {
    const foundid = await getClassID(req.body.class_code)
    console.log("FoundID: "+foundid)
    const classJoined = {
        StudentID: req.body.userid,
        ClassID: foundid
    }
    if (foundid != "") {
    	IsEnrolledIn.create(classJoined)
         res.send("nice")
    }
    else{
    //	alert("Class not found!")
    }
})

users.post('/profile/enrolledIn', (req, res) => {
    const userid = {
        userid: req.body.userid
    }
console.log(userid)
    IsEnrolledIn.findAll({
        attributes: ['ClassID'],
        where: { StudentID: userid.userid }
    })
        .then(enrolledClasses => {
            classes = []
            enrolledClasses.forEach(eClass => {
                classes.push(eClass.ClassID)
            });
            Class.findAll({
                attributes: ['ClassName','ClassID', 'StartTime', 'EndTime', 'Days'],
                where: { ClassID: classes }
            })
                .then(times => {
                    res.send(JSON.stringify(times))
                })
        })
})

users.post('/profile/adminedClasses', (req, res) => {
	const userid = {
		userid: req.body.userid
	}
	IsAdministeredBy.findAll({
		attributes: ['ClassID'],
		where: { AdminID: userid.userid }
	})
	.then(adminedClasses => {
		classes = []
		adminedClasses.forEach(aClass => {
			classes.push(aClass.dataValues.ClassID)
		});
		Class.findAll({
			where: { ClassID: classes}
		})
		.then(times=>{
			res.send(JSON.stringify(times))
		})
	})
})

users.post('/profile/create_class', (req, res) => {
    console.log("Users.js: "+req.body.start_date)
    const classDetails = {
        ClassName: req.body.class_name,
        ClassCode: req.body.classcode,
	StartDate: req.body.start_date,
	EndDate: req.body.end_date,
        StartTime: req.body.start_time,
        EndTime: req.body.end_time,
        Days: req.body.days,
        UniversityID: 1
    }
    Class.findOne({
        where: {
            ClassCode: classDetails.ClassCode
        }
        })
        .then(foundClass => {
            if (foundClass) {
                res.send("class already exists")
            }
            else {
                Class.create(classDetails)
		setTimeout(req.body.username!=undefined?addAdmin(req.body.username, req.body.classcode):console.log("No admin given"), 500)
            }
        })
	.catch(err => {
		console.log("create_class ERR: "+err)
	})
})
users.post('/register', (req, res) => {
    const today = new Date()

    const userData = {
        fName: req.body.fName,
        lName: req.body.lName,
        email: req.body.email,
        phonenumber: req.body.phonenumber,
        username: req.body.username,
        passwordHash: req.body.passwordHash,
        accountType: req.body.accountType,
        consentBool: req.body.consentBool,
        createdTimestamp: req.body.createdTimestamp,
	uid: 1
    }

    userData.accountType = req.body.dev_pass

    userDup = 0, userPosted = false

    Account.findOne({
        where: {
            username: userData.username
        }
    })
        .then(user => {
            if (user == null) {
                bcrypt.hash(userData.passwordHash, 10, (err, hash) => {
                    userData.passwordHash = hash
                    Account.create(userData)
                        .then(user => {
                            console.log(user.username + ' created')
                        })
                        .catch(err => {
                            console.log('error: ' + err)
                        })
                })
                userPosted = true
                res.send("user " + userData.username + " created")
            } else {
                res.send("User " + userData.username + " already exists!")
            }
        })
        .catch(err => {
            res.send('error: ' + err)
        })
})

users.post('/login', (req, res) => {
    Account.findOne({
        where: {
            username: req.body.username
        }
    })
        .then(user => {
            if (user) {
                if (bcrypt.compareSync(req.body.passwordHash, user.passwordHash)) {
                    let token = jwt.sign(user.dataValues, process.env.SECRET_KEY, {
                        expiresIn: 1440
                    })
                    res.send(token)
                }
                else {
                    res.send("Bad password")
                }
            } else {
                res.send("Bad account")
            }
        })
        .catch(err => {
            res.status(400)
        })
})
//
users.post('/survey', (req, res) => {
  var obsIDRand = Math.random().toString(36).substring(2);
    const answers = {
        ResponseId: req.body.userid,
        RecipientLastName: req.body.RecipientLastName,
        RecipientFirstName: req.body.RecipientFirstName,
        RecipientEmail: req.body.RecipientEmail,
	ObsID: obsIDRand,
        ClassID: req.body.classid,
        StartTime: req.body.startTime,
        EndTime: req.body.endTime,
	Q1_1: req.body.concentration,
	Q1_2: req.body.enjoyment,
	Q1_3: req.body.interest,
	Q1_4: req.body.challenge,
	Q1_5: req.body.skill,

    }
    Survey.create(answers)
    res.send("here")
})
module.exports = users

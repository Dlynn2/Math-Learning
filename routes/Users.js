const express = require("express")
const users = express.Router()
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const Account = require("../models/Account")
const Survey = require("../models/Survey")
const Class = require("../models/Class")
const IsEnrolledIn = require("../models/IsEnrolledIn")
const sequelize = require("sequelize")
const IsAdministeredBy = require("../models/IsAdministeredBy")
process.env.SECRET_KEY = 'secret'

// TODO: use npm scheduler to create a recurring event based on the start time of each class
//  the event will grab each user from all classes that have that start time.
//  for each loop across every user creating a one time event that  will push them to the survey
// page.
function doesUserExist(u) {
    foundUser = "fuck"
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
            console.log("DAMMIT: " + err)
        })
    return foundUser
}
users.get('/profile/classes', (req, res) => {
    Class.findAll({
        attributes: ['ClassName', 'StartTime', 'EndTime', 'Days', 'ClassCode'],
    })
        .then(stuff => {
            res.end(JSON.stringify(stuff))
        })
})
users.get('/profile/enrolledIn', (req, res) => {
    const userid = {
        userid: req.headers.userid
    }
    IsEnrolledIn.findAll({
        attributes: ['classid'],
        where: { id: userid.userid }
    })
        .then(enrolledClasses => {
            classes = []
            enrolledClasses.forEach(eClass => {
                classes.push(eClass.classid)
            });
            Class.findAll({
                attributes: ['classCode', 'startTime', 'endTime', 'Days'],
                where: { classCode: classes }
            })
                .then(times => {
                    // times=times
                    // times.push(classes)
                    // console.log(times)
                    res.end(JSON.stringify(times))
                })
        })

})

//server
// users.get('/profile/enrolledIn', (req, res) => {
//     const userid = {
//         userid: req.headers.userid
//     }
//     IsEnrolledIn.findAll({
//         attributes: ['ClassID'],
//         where: { StudentID: userid.userid }
//     })
//         .then(enrolledClasses => {
//             classes = []
//             enrolledClasses.forEach(eClass => {
//                 classes.push(eClass.classid)
//             });
//             Class.findAll({
//                 attributes: ['ClassName', 'StartTime', 'EndTime', 'Days'],
//                 where: { ClassCode: classes }
//             })
//                 .then(times => {
//                     res.end(JSON.stringify(times))
//                 })
//         })
// })


users.post('/profile', (req, res) => {
    const classJoined = {
        id: req.body.userid,
        classid: req.body.class_code
    }
    // IsEnrolledIn.findOne({
    //     where:{
    //         id: classJoined.id,
    // classid: classJoined.classid
    //     }
    // });
    // enrolled = sequelize.query('SELECT "id","id" FROM class,isenrolledin" WHERE "class"."id" = (:id)', {
    //     replacements: { id: req.body.userid },
    //     type: sequelize.QueryTypes.SELECT
    // });
    // if (enrolled == null)
    //     console.log("false")
    // .then(student => {
    //     if (student == null) {
    IsEnrolledIn.create(classJoined)
    //         res.send("nice")
    //     }
    //     else {
    //         res.send("failed here")
    //     }
    // })

})

async function getAllClassTimes() {
    var classTimes = ''
    await Class.findAll({
        attributes: ['StartTime']
    })
        .then(startTimes => {
            classTimes = startTimes
        })
    return classTimes
}

users.post('/profile/getAllClassTimes', async (req, res) => {
    res.json(await getAllClassTimes())
})

users.get('/getSubscription', (req, res) => {
    const userid = {
        userid: req.headers.userid
    }
    console.log(req.headers.userid)
    Account.findOne({
        attributes: ['subscription'],
        where: { userid: req.headers.userid }
    })
        .then(subscription => {
            res.send(subscription)
        })
})


users.post('/profile/create_class', (req, res) => {
    const classDetails = {
        ClassName: req.body.class_name,
        ClassCode: req.body.section_number,
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
            }
        })
})

users.post('/profile/administered_by', (req, res) => {
    const teacherDetails = {
        id: req.body.class_id,
        adminid: req.body.teacher_id
    }
    IsAdministeredBy.findOne({
        where: {
            id: teacherDetails.id,
            adminid: teacherDetails.adminid
        }
            .then(alreadyexists => {
                if (alreadyexists) {
                    res.send("already been done")
                }
                else {
                    IsAdministeredBy.create(teacherDetails)
                }
            })
    })
})
users.post('/register', (req, res) => {
    const today = new Date()

    const userData = {
        fName: req.body.fName,
        lName: req.body.lName,
        username: req.body.username,
        passwordHash: req.body.passwordHash,
        accountType: req.body.accountType,
        consentBool: req.body.consentBool,
        createdTimestamp: req.body.createdTimestamp
    }
    if (req.body.dev_pass != '') {
        userData.accountType = 3
    }
    else {
        userData.accountType = 1
    }

    //userData.username = userData.fname + "." + userData.lName
    userDup = 0, userPosted = false

    //console.log(doesUserExist(userData.username))

    //while(!userPosted){
    //console.log(userData.username)
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

                //userDup++
                //userData.username = userData.fname + "." + userData.lName + userDup
            }
        })
        .catch(err => {
            res.send('error: ' + err)
        })
    //}
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

users.get('/dataTables', (req, res) => {
    SurveyResponse.findAll({
        attributes: ['UserID', 'Engagement', 'Interest', 'Enjoyment', 'Challenge', 'Skill']
    })
        .then(responses => {
            res.send(JSON.stringify(responses))
        })
})

users.post('/survey', (req, res) => {
    const answers = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        username: req.body.username,
        engagement: req.body.engagement,
        enjoyment: req.body.enjoyment,
        challenge: req.body.challenge,
        interest: req.body.interest,
        skill: req.body.skill,
        timestamp: req.body.timestamp
    }
    Survey.create(answers)
    res.send("here")
})
module.exports = users
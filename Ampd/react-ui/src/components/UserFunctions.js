import axios from 'axios'

export const register = newUser => {
    console.log(newUser)
    if(newUser.dev_pass != '2' && newUser.dev_pass != '3'){
	newUser.dev_pass = '1'
    }
    return axios
        .post('users/register', {
            fName: newUser.first_name,
            lName: newUser.last_name,
            email: newUser.email,
            phonenumber: newUser.phonenumber,
            username: newUser.username,
            passwordHash: newUser.password,
            dev_pass: newUser.dev_pass,
            consentBool: newUser.consentBool
        })
        .then(res => {
            return(res)
        })
        .catch(err => {
            console.log("Register ERR: "+err)
        })
}

export const login = user => {
    return axios
        .post('users/login', {
            username: user.username,
            passwordHash: user.passwordHash
        })
        .then(res => {
            if(res.data !="Bad account" && res.data!="Bad password"){
            localStorage.setItem("usertoken", res.data)
            }
            return res.data
        })
        .catch(err => {
            console.log("Login ERR: "+err)
        })
}

export const addAdmin = data => {
	return axios
		.post('users/profile/addAdmin', {
			username: data.username,
			classcode: data.classcode
		})
		.then(res => {
			return res.data
		})
		.catch(err =>{
			console.log('addAdmin ERR: '+err)
		})
}

export const getSubscriptionsFor = cid => {
	return axios
		.post('users/profile/getSubscriptionsFor', {
			cid: cid
		})
		.then(res => {
			return res.data
		})
		.catch(err =>{
			console.log('getSubscriptionsFor ERR: '+err)
		})
}

export const getNumberList = classCode => {
  return axios
    .post('users/profile/getNumberList', {
      cid: classCode
    })
    .then(res => {
      return res.data
    })
    .catch(err => {
      console.log('getNumberList ERR: ' + err)
    })
}

export const getCurrentClass = data => {
	return axios
		.post('users/profile/getCurrentClass', {
			sid: data.sid,
			date: data.date,
			day: data.day
		})
		.then(res =>{
			return res.data
		})
		.catch(err =>{
			console.log('getCurrentClass ERR: '+err)
		})
}

export const getSubscription = sid => {
	return axios
		.post('users/profile/getSubscription', {
			sid: sid
		})
		.then(res =>{
			return res.data.subscription
		})
		.catch(err => {
			console.log('getSubscription ERR: '+err)
		})
}

export const setSubscription = data => {
	return axios
		.post('users/profile/setSubscription', {
			sid: data.sid,
			sub: data. sub
		})
		.then(res =>{
			return true
		})
		.catch(err => {
			console.log('setSubscription ERR: '+err)
		})
}

export const isClassNow = data => {
	return axios
		.post('users/profile/isClassNow', {
			cid: data.cid,
			date: data.date,
			day: data.day
		})
		.catch(err=>{
			console.log("AXIOS isClassNow ERR: "+err)
		})
}

export const classList = cid => {
  return axios
  .post('users/profile/classList', {
    classID: cid
  })
  .then(res =>{
    return res.data
  })
  .catch(err=>{
    console.log("QuestionCount ERR: "+err)
  })
}

export const getQuestionCount = cid => {
    return axios
	.get('users/profile/classQuestionCount', {
	    classid: cid
	})
	.then(res =>{
	    //console.log("QuestionCount: "+res.data)
	    return res.data
	})
	.catch(err=>{
	    console.log("QuestionCount ERR: "+err)
	})
}

export const getClassTime = cid => {
	return axios
		.post('users/profile/classTime', {
			cid: cid
		})
		.then(res =>{
			return res
		},
		err=>{
			console.log("getClassTime ERR: "+err)
		})
}

export const getAllEnrolledTimes = sid => {
	return axios
		.post('users/profile/allEnrolledTimes', {
			sid: sid
		})
		.then(res =>{
			return res
		},
		err=>{
			console.log("getAllEnrolledTimes ERR: "+err)
		})
}

export const getEnrolledClasses = sid => {
	return axios
		.post('users/profile/enrolledClasses', {
			sid: sid
		})
		.then(res =>{
			return res
		},
		err=>{
			console.log("getEnrolledClasses ERR: "+err)
		})
}

export const getEnrolledIn = sid => {
	return axios
		.post('users/profile/enrolledClasses', {
			sid: sid
		})
		.then(res =>{
			return res
		},
		err=>{
			console.log("getEnrolledClasses ERR: "+err)
		})
}

export const getDataTable = unused => {
	return axios
		.post('users/profile/datatable', {})
		.then(res =>{
			return res
		},
		err=>{
			console.log("getDataTable ERR: "+err)
		})
}

export const join_class = classJoined => {
    return axios
        .post('users/profile', {
            userid: classJoined.userid,
            class_code:classJoined.class_code,
            phonenumber: classJoined.phonenumber
        })
        .then(res =>{
            return(res)
        })
        .catch(err=>{
            console.log("Join_Class ERR: "+err)
        })
}

export const create_class = classdetails =>{
    return axios
        .post('users/profile/create_class',{
            class_name: classdetails.class_name + " (" + classdetails.section_number + ")",
	    classcode: classdetails.classcode==undefined ? (Math.random() * 10000000).toFixed(0) : classdetails.classcode,
	    start_date: classdetails.start_date,
	    end_date: classdetails.end_date,
            start_time: classdetails.start_time,
            end_time: classdetails.end_time,
            days: classdetails.days.toString(),
	    username: classdetails.username
        })
        .then(res =>{
            console.log(res)
        })
}

export const survey = answers => {
  console.log(answers);
    return axios
        .post('users/survey', {
            userid: answers.userid,
            RecipientLastName: answers.RecipientLastName,
            RecipientFirstName: answers.RecipientFirstName,
            RecipientEmail: answers.RecipientEmail,
            classid: answers.classid,
	    obsid: answers.obsid,
            concentration: answers.concentration,
	    enjoyment: answers.enjoyment,
	    interest: answers.interest,
	    challenge: answers.challenge,
	    skill: answers.skill,
      	    startTime: answers.startTime,
      	    endTime: answers.endTime
        })
        .then(res => {
            console.log(res)
        })
}

import axios from 'axios'

export const register = newUser => {
    return axios
        .post('users/register', {
            fName: newUser.first_name,
            lName: newUser.last_name,
            username: newUser.username,
            passwordHash: newUser.password,
            dev_pass: newUser.dev_pass,
            consentBool: newUser.consentBool
        })
        .then(res => {
            return res
        })
        .catch(err => {
            console.log(err)
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
            console.log(err)
        })
}

export const join_class = classJoined => {
    return axios
        .post('users/profile', {
            userid: classJoined.userid,
            class_code: classJoined.class_code
        })
        .then(res => {
            alert('Joined class ' + res)
        })
        .catch(err => {
            console.log(err)
        })
}

export const create_class = classdetails => {
    return axios
        .post('users/profile/create_class', {
            class_name: classdetails.class_name,
            section_number: classdetails.section_number,
            start_time: classdetails.start_time,
            end_time: classdetails.end_time,
            days: classdetails.days
        })
        .then(res => {
            console.log(res)
        })
}

export const administered_by = teacherDetails => {
    return axios
        .post('users/profile/administered_by', {
            class_id: teacherDetails.class_id,
            teacher_id: teacherDetails.teacher_id
        })
        .then(res => {
            console.log(res)
        })
}

export const getAllClassTimes = unused => {
	return axios
		.post('users/profile/getAllClassTimes', {})
		.then(res =>{
			return res
		},
		err=>{
			console.log("class times ERR: "+err)
		})
}

export const survey = answers => {
    return axios
        .post('users/survey', {
            first_name: answers.first_name,
            last_name: answers.last_name,
            username: answers.username,
            engagement: answers.engagement,
            enjoyment: answers.enjoyment,
            challenge: answers.challenge,
            interest: answers.interest,
            skill: answers.skill
        })
        .then(res => {
            console.log(res)
        })
}
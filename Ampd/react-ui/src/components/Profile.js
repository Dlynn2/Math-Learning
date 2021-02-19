import React, { Component } from 'react'
import jwt_decode from 'jwt-decode'
import { join_class, create_class } from "./UserFunctions"
import { Button, Modal, ModalHeader, ModalBody, ModalFooter,Table,UncontrolledAlert } from 'reactstrap';
import axios from 'axios';
import subscribePush from "./Subscription"
import unsubscribePush from "./Unsubscribe"
import { inClassNotificationSchedules } from "./SchedulingFunctions"
import { DateTime } from "luxon"
import "./css/Profile.css"

// var schedule = require('node-schedule');
// var rule = new schedule.RecurrenceRule();
class Profile extends Component {
    constructor() {
        super()
        this.state = {
            first_name: '',
            last_name: '',
            student_id: '',
            class_code: '',
            userid: '',
            classes: [],
            class_name: '',
            section_number: '',
	    start_date: '',
	    end_date: '',
            start_time: '',
            end_time: '',
            days: ''
        }
        this.onChange = this.onChange.bind(this)
        this.joinClass = this.joinClass.bind(this)
        this.toggle = this.toggle.bind(this)
        this.submit = this.submit.bind(this)
    }
    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }
    toggle() {
        this.setState({
            modal: !this.state.modal
        })
    }
    joinClass() {
        const data = {
            userid: this.state.userid,
            class_code: this.state.class_code
        }
        join_class(data)
	this.getEnrolledClasses()
	setTimeout(()=>{window.location.reload()}, 500)
    }


    componentDidMount() {
        const token = localStorage.usertoken
        const decoded = jwt_decode(token)
        this.setState({
            userid: decoded.userid,
            first_name: decoded.fName,
            last_name: decoded.lName,
            username: decoded.username,
            admin_level: decoded.accountType
        })
	if(decoded.accountType === '1'){
        	axios.post('users/profile/enrolledIn',{
        	    userid:decoded.userid
        	})
        	.then(res =>{
        	    const tableData = res.data;
               		this.setState({ classes: tableData})
        	})
	}
	else{
		axios.post('users/profile/adminedClasses', {
			userid:decoded.userid
		})
		.then(res =>{
			const tableData = res.data;
				this.setState({ classes: tableData})
		})
	}
    }

	getEnrolledClasses(){
        axios.post('users/profile/enrolledIn', {
                userid: this.state.userid
        })
            .then(res => {
                const tableData = res.data;
                this.setState({ classes: tableData })
            });
	console.log("made it to the getEnrolledfunc")
        this.renderTableData()
    }

	getAdministeredClasses(){
        axios.post('users/profile/adminedClasses', {
                userid: this.state.userid
        })
            .then(res => {
                const tableData = res.data;
                this.setState({ classes: tableData })
            });
        this.renderTableData()
    }




    checkTime(classStartTime, classEndTime, daysHeld,classCode) {

        daysHeld = daysHeld.split('')
        let dayOfWeek = []
        daysHeld.forEach(day => {
            switch (day) {
                case "U":
                    dayOfWeek.push(0)
                    break;
                case "M":
                    dayOfWeek.push(1)
                    break;
                case "T":
                    dayOfWeek.push(2)
                    break;
                case "W":
                    dayOfWeek.push(3)
                    break;
                case "R":
                    dayOfWeek.push(4)
                    break;
                case "F":
                    dayOfWeek.push(5)
                    break;
                case "A":
                    dayOfWeek.push(6)
                    break;
                default:
                    return;
            }
        });
        if (dayOfWeek.includes(DateTime.fromObject({ zone: 'America/Denver' }).weekday)) {
            var h = DateTime.fromObject({ zone: 'America/Denver' }).hour
            var m = DateTime.fromObject({ zone: 'America/Denver' }).minute
            var startingClass = new Date();
            classStartTime = classStartTime.split(":")
            startingClass.setHours(classStartTime[0], classStartTime[1], 0);
            var endingClass = new Date();
            classEndTime = classEndTime.split(":")
            endingClass.setHours(classEndTime[0], classEndTime[1], 0);
            var currentTime = new Date();
            currentTime.setHours(h, m, 0);

            if (startingClass < currentTime && currentTime < endingClass) {
                const scheduleData = {
                    userid:this.state.userid,
                    startTime:classStartTime,
                    endTime:classEndTime,
		    classCode:classCode,
                }
                inClassNotificationSchedules(scheduleData)
            }
            else {
                console.log("ERR: This class is not in session right now")
            }

        }
        else {
            console.log(DateTime.fromObject({ zone: 'America/Denver' }).weekday)
            console.log("ERR: Day invalid")
            return
        }
    }


	renderTableData() {
        return this.state.classes.map((classes, index) => {
            const { ClassName, ClassCode,ClassID, StartTime, EndTime, Days } = classes //destructuring
	    if(this.state.admin_level === '1'){
            return (
                <tr key={ClassID}>
		    <td>{ClassName}</td>
                    <td>{StartTime}</td>
                    <td>{EndTime}</td>
                    <td>{Days}</td>
		    <td><Button onClick={() => this.checkTime(StartTime, EndTime, Days,ClassID)}>Attendance</Button></td>
                </tr>
            )
	    }
	    else{
	    return (
		<tr key={ClassName}>
		    <td>{ClassName}</td>
		    <td>{ClassCode}</td>
		    <td>{StartTime}</td>
		    <td>{EndTime}</td>
		    <td>{Days}</td>
		</tr>
	    )
            }
        })
    }

    submit() {
        const class_data = ({
            class_name: this.state.class_name,
            section_number: this.state.section_number,
	    start_date: this.state.start_date,
	    end_date: this.state.end_date,
            start_time: this.state.start_time,
            end_time: this.state.end_time,
            days: this.state.days
        })
        create_class(class_data)
        this.toggle()
        this.setState({
            class_name: '',
            section_number: '',
            start_time: '',
            end_time: '',
            days: ''
        })
	this.getAdministeredClasses()
    }
    render() {
        const create_class = (
            <Modal isOpen={this.state.modal} toggle={this.toggle}>
                <ModalHeader>
                    Create Class
                            </ModalHeader>
                <ModalBody>
                    <div>
                        <label>Class name</label>
                        <input type="text"
                            name="class_name"
                            placeholder="Class Name"
                            value={this.state.class_name}
                            onChange={this.onChange}
                        />
                    </div>
                    <div>
                        <label>Section number</label>
                        <input type="text"
                            name="section_number"
                            placeholder="Section number"
                            value={this.state.section_number}
                            onChange={this.onChange}
                        />
                    </div>
		    <div>
			<label>Start date</label>
			<input type="date"
			    name="start_date"
			    value={this.state.start_date}
			    onChange={this.onChange}
			/>
		    </div>
		    <div>
			<label>End date</label>
			<input type="date"
			    name="end_date"
			    value={this.state.end_date}
			    onChange={this.onChange}
			/>
		    </div>
                    <div>
                        <label>Start time</label>
                        <input type="time"
                            name="start_time"
                            placeholder="Enter Username"
                            value={this.state.start_time}
                            onChange={this.onChange}
                        />
                    </div>
                    <div>
                        <label>End time</label>
                        <input type="time"
                            name="end_time"
                            value={this.state.end_time}
                            onChange={this.onChange}
                        />
                    </div>
                    <div>
                        <label>Days class meets</label>
                        <input type="text"
                            name="days"
                            value={this.state.days}
                            onChange={this.onChange}
                        />
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={this.submit}>Create Class</Button>
                    <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>
        )

        const join_class = (
            <div>
                <tr>
                    <td><div>
                        <input type="text"
                            name="class_code"
                            placeholder="Class Code"
                            value={this.state.class_code}
                            onChange={this.onChange}
                        />
                    </div></td>

                    <td class="join-but">
			<button onClick={this.joinClass}>Join Class</button>
		    </td>
                </tr>
            </div>
        )
        return (
	  <div>
	      <div id="user-info">
                <h1>My Profile</h1>

                <br/>
		<table class = "user-info">
                    <tbody></tbody>
                    <tbody class = "user-info">
                        <tr>
                            <td class="label">First Name: </td>
                            <td class="field">{this.state.first_name}</td>
                        </tr>
                        <tr>

                            <td class="label">Last Name: </td>
                            <td class="field">{this.state.last_name}</td>
                        </tr>
                        <tr>

                            <td class="label">Username: </td>
                            <td class="field">{this.state.username}</td>
                        </tr>
                        <tr>

                            <td class="label">User ID: </td>
                            <td class="field">{this.state.userid}</td>
                        </tr>
			{/*Security info only shows for relevant users*/}
			{this.state.admin_level === '1' ? <tr/>:
                        <tr>

                            <td class="label">Security Clearance: </td>
                            <td class="label">Level {this.state.admin_level}</td>
                        </tr>
			}
			

                    </tbody>
                </table>
		</div>
		<br/>
		
		{/*buttons moved to put profile info first*/}

		{this.state.admin_level === '1' ?
		<div>
		<button onClick={() => subscribePush(this.state.userid)}> Subscribe </button>
                <button onClick={() => unsubscribePush()}> Unsubscribe </button>
		<div>
                    <div id="subscriptionStatusWarn" style={{ display:'none',width:'60%', margin:'auto' }}>
                        <UncontrolledAlert  color="warning">
                            You just unsubscribed this device.
                    </UncontrolledAlert >
                    </div>
                    <div id="subscriptionStatusSub" style={{ display:'none',width:'60%', margin:'auto' }}>
                        <UncontrolledAlert  color="primary">
                            Thank you for subscribing this device!
                        </UncontrolledAlert >
                    </div>
                    <div id="subscriptionStatusAlreadySub" style={{ display:'none',width:'60%', margin:'auto' }}>
                        <UncontrolledAlert  color="success">
                            You already have a subscription!
                        </UncontrolledAlert >
                    </div>
                    <div id="subscriptionStatusAlreadyUnSub" style={{ display:'none',width:'60%', margin:'auto' }}>
                        <UncontrolledAlert  color="danger">
                            You do not have a subscription!
                        </UncontrolledAlert >
                    </div>
                    <div id="subscriptionStatus"  style={{ width:'60%', margin:'auto'}} >
                        <UncontrolledAlert  color="info">
                            If you are unsure if you are subscribed, just click Subscribe!
                            If you aren't getting notifications and you think you should be,
                            unsubscribe, then subscribe again!
                        </UncontrolledAlert >
                    </div>
                </div>
		</div>
		: <p/>}
		<div id="codes">
		   <table>
		   <tbody>
                        {this.state.admin_level === '1' ? join_class :
                            <p/>/*<Button onClick={this.toggle}>Create Class</Button>*/}
                        {/*create_class*/}
		   </tbody>
		   </table>

		</div>
                <div>
                    {this.state.admin_level === '1' ? <h1 id='title'>Enrolled Classes</h1> :
			<h1 id='title'>Administrated Classes</h1>}
                    <Table striped hover id='students'>
                        <thead>
                            <tr>
                                {this.state.admin_level === '1' ?
					<React.Fragment>
					<th>Class Name</th>
					<th>Start Time</th>
					<th>End Time</th>
					<th>Class Days</th>
					<th>Attendance</th>
					</React.Fragment>
					:
					<React.Fragment>
					<th>Class Name</th>
					<th>Class Code</th>
					<th>Start Time</th>
					<th>End Time</th>
					<th>Class Days</th>
					</React.Fragment>
				}
			    </tr>
                        </thead>
                        <tbody>
                          {this.renderTableData()}
                        </tbody>
                    </Table>
		</div>
            </div>

        )
    }
}

export default Profile




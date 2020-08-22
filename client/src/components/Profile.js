import React, { Component } from 'react'
import jwt_decode from 'jwt-decode'
import { join_class, create_class, getAllClassTimes } from "./UserFunctions"
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Table, UncontrolledAlert  } from 'reactstrap';
import axios from 'axios';
import subscribePush from "./Subscription"
import unsubscribePush from './Unsubscribe';
import { inClassNotificationSchedules } from "./SchedulingFunctions"
import Scheduler from "./Scheduler"
import { DateTime } from "luxon"

var schedule = require('node-schedule');
var rule = new schedule.RecurrenceRule();
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
            start_time: '',
            end_time: '',
            days: '',
            headers: [],
            localDateTime: '',
            startTimeArray: [],
            endTimeArray: [],
            subscription: '',
        }
        this.onChange = this.onChange.bind(this)
        this.joinClass = this.joinClass.bind(this)
        this.toggle = this.toggle.bind(this)
        this.submit = this.submit.bind(this)
    }
    existingClassTimes = ''

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }
    toggle() {
        this.setState({
            modal: !this.state.modal
        })
        // console.log(this.state.consentBool)
    }
    joinClass() {
        const data = {
            userid: this.state.userid,
            class_code: this.state.class_code
        }
        // console.log(data)
        join_class(data)
        this.getEnrolledClasses()

    }





    async componentDidMount() {
        // await this.getAllClassTimes()

        const token = localStorage.usertoken
        const decoded = jwt_decode(token)
        this.setState({
            userid: decoded.userid,
            first_name: decoded.fName,
            last_name: decoded.lName,
            username: decoded.username,
            admin_level: decoded.accountType
        })
        axios.get('users/profile/enrolledIn', {
            headers: {
                userid: decoded.userid
            }
        })
            .then(res => {
                const tableData = res.data;
                this.setState({ classes: tableData })
                this.setState({ headers: Object.keys(this.state.classes[0]) })
            });
    }

    getEnrolledClasses() {
        axios.get('users/profile/enrolledIn', {
            headers: {
                userid: this.state.userid
            }
        })
            .then(res => {
                const tableData = res.data;
                this.setState({ classes: tableData })
                this.setState({ headers: Object.keys(this.state.classes[0]) })
            });
        this.renderTableData()
    }
    checkTime(classStartTime, classEndTime, daysHeld, classCode) {

        daysHeld = daysHeld.split('')
        let dayOfWeek = []
        daysHeld.forEach(day => {
            switch (day) {
                case "U":
                    console.log("test sunday")
                    dayOfWeek.push(7)
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
            const scheduleData = {
                userid: this.state.userid,
                startTime: classStartTime,
                endTime: classEndTime,
                classCode: classCode
            }
            console.log(startingClass + " " + endingClass + " " + currentTime)
            // inClassNotificationSchedules(scheduleData)
            if (startingClass < currentTime && currentTime < endingClass) {
                const scheduleData = {
                    userid: this.state.userid,
                    startTime: classStartTime,
                    endTime: classEndTime,
                    classCode: classCode
                }
                inClassNotificationSchedules(scheduleData)
            }
            else {
                console.log(startingClass + " " + endingClass + " " + currentTime)
            console.log(dayOfWeek)
            console.log(DateTime.fromObject({ zone: 'America/Denver' }).weekday)
            console.log(DateTime.fromObject({ zone: 'America/Denver' }).hour)
            console.log(startingClass + " " + endingClass + " " + currentTime)
                console.log("this class is not in session right")
            }

        }
        else {
            console.log(startingClass + " " + endingClass + " " + currentTime)
            console.log(dayOfWeek)
            console.log(DateTime.fromObject({ zone: 'America/Denver' }).weekday)
            console.log(DateTime.fromObject({ zone: 'America/Denver' }).hour)
            console.log("nah")
            return
        }
        console.log(DateTime.fromObject({ zone: 'America/Denver' }));

    }


    renderTableData() {
        return this.state.classes.map((classes, index) => {
            const { classCode, startTime, endTime, Days } = classes //destructuring
            return (
                <tr key={classCode}>
                    <td>{startTime}</td>
                    <td>{endTime}</td>
                    <td>{Days}</td>
                    <td>{classCode}</td>
                    <td><Button onClick={() => this.checkTime(startTime, endTime, Days, classCode)}>Attendence</Button></td>
                </tr>
            )
        })
    }
    checkForSW() {
        navigator.serviceWorker.ready.then(registration => {
            registration.pushManager.getSubscription().then(subscription => {
                if (subscription) {
                    return "true"
                }
                else {
                    return false
                }
            })
        })
    }
    //classes map and table

    //dropdown dynamic render
    // renderTableData() {
    //     return this.state.classes.map((classes, index, buttons) => {
    //         const { classCode, startTime, endTime, Days } = classes //destructuring
    //         // const{onClick=this.test(ClassName)} = buttons
    //         return (
    //             <div onClick={console.log("fire")}>
    //                 <DropdownItem key={classCode} data-item={classes} onClick={() => this.test(classCode)}>{classCode + ' ' + startTime + ' - ' + endTime + ' ' + Days}
    //                 </DropdownItem>
    //             </div>

    //         )
    //     })
    // }
    submit() {
        const class_data = ({
            class_name: this.state.class_name,
            section_number: this.state.section_number,
            start_time: this.state.start_time,
            end_time: this.state.end_time,
            days: this.state.days
        })
        const teacher_details = ({
            class_id: this.state.classCode,
            teacher_id: this.state.userid
        })
        // if(this.existingClassTimes.includes(String(class_data.start_time)+':00')){
        // create_class(class_data)
        // console.log(Scheduler(class_data.start_time,class_data.end_time,
        // class_data.days,class_data.startDate,class_data.endDate))
        // }
        // else
        // create_class(class_data)
        // admistered_by(teacher_details)
        this.toggle()
        this.setState({
            class_name: '',
            section_number: '',
            start_time: '',
            end_time: '',
            days: '',
        })

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
        // const test_drop = (
        //     <div>
        //         <UncontrolledButtonDropdown>
        //             <DropdownToggle caret>
        //                 Join class!
        //             </DropdownToggle>
        //             <DropdownMenu>
        //                 {this.renderTableData()}
        //             </DropdownMenu>
        //         </UncontrolledButtonDropdown>
        //     </div>
        // )

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
                </tr>
                <tr>
                    <td><button onClick={this.joinClass}>Join Class</button></td>
                </tr>
            </div>
        )
        return (
            <div>
                <button onClick={() => subscribePush(this.state.userid)}>test</button>
                <button onClick={() => unsubscribePush()}>untest</button>
                <button onClick={() => this.getEnrolledClasses()}>classes</button>
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
                            If you are unsure if you are subscribed just click subscribe!
                            If you aren't getting notifications and you think you should be
                            unsubscribe the subscribe again!
                        </UncontrolledAlert >
                    </div>
                </div>
                <h1>Profile</h1>
                <table>
                    <tbody>
                    </tbody>
                    <tbody>
                        <tr>
                            <td>First Name</td>
                            <td>{this.state.first_name}</td>
                        </tr>
                        <tr>
                            <td>Last Name</td>
                            <td>{this.state.last_name}</td>
                        </tr>
                        <tr>
                            <td>username</td>
                            <td>{this.state.username}</td>
                        </tr>
                        <tr>
                            <td>admin_level</td>
                            <td>{this.state.admin_level}</td>
                        </tr>
                        <tr>
                            <td>userID</td>
                            <td>{this.state.userid}</td>
                        </tr>
                        {this.state.admin_level === 1 ? join_class :
                            <Button onClick={this.toggle}>Create Class</Button>}
                        {create_class}
                    </tbody>
                </table>
                <div>
                    <h1 id='title'>Your Classes</h1>
                    <Table dark striped hover id='students'>
                        <thead>
                            <tr>
                                <th>Start Time</th>
                                <th>End Time</th>
                                <th>Class Days</th>
                                <th>Class Code</th>
                                <th>Attendance</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderTableData()}
                        </tbody>
                    </Table>
                </div>
                {/* {test_drop} */}
                <table>

                </table>
            </div>

        )
    }
}

export default Profile




import React, { Component } from 'react'
import axios from 'axios';
import {
    Input, FormGroup, Label, CustomInput, Modal, ModalHeader, ModalBody,
    ModalFooter, Button, Form
} from 'reactstrap';

const webpush = require("web-push")
var schedule = require('node-schedule');
var rule = new schedule.RecurrenceRule();

class CreateClass extends Component {
    constructor() {
        super()
        this.state = {
            modal: true,
            startTime: '',
            days: [],
            startDate: '',
            endDate: '',
            start_time: '11:00',
            end_time: '13:50',
            checkedItems: new Map(),
            checkboxes: [
                { type: "checkbox", id: "M", label: "Monday" },
                { type: "checkbox", id: "T", label: "Tuesday" },
                { type: "checkbox", id: "W", label: "Wednesday" },
                { type: "checkbox", id: "R", label: "Thursday" },
                { type: "checkbox", id: "F", label: "Friday" },
                { type: "checkbox", id: "A", label: "Saturday" },
                { type: "checkbox", id: "U", label: "Sunday" }
            ]

        }

        this.handleCheckboxChange = this.handleCheckboxChange.bind(this)
        this.onChange = this.onChange.bind(this)
        this.toggle = this.toggle.bind(this)
        this.submit = this.submit.bind(this)
    }
    existingClassTimes = ''

    handleCheckboxChange(e) {
        const item = e.target.id;
        const isChecked = e.target.checked;
        this.setState(prevState => ({ checkedItems: prevState.checkedItems.set(item, isChecked) }));
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    toggle() {
        this.setState({
            modal: !this.state.modal
        })
    }
    // async ComponentDidMount() {
    //     await this.getAllClassTimes()

    // }
    // async getAllClassTimes() {
    //     this.existingClassTimes = await getAllClassTimes()
    //     let result = this.existingClassTimes.data.map(a => a.StartTime)
    //     this.setState(this.existingClassTimes = result)
    // }
    renderCheckboxes() {
        return this.state.checkboxes.map((item, index) => {
            const { type, id, label } = item //destructuring
            return (
                <CustomInput key={label} type={type} id={id} label={label} checked={this.state.checkedItems.get(item.id)} onChange={this.handleCheckboxChange} inline />
            )
        })
    }
    findInMap = (map, val) => {
        for (let [k, v] of map) {
            if (v === val) {
                map.delete(k)
            }
        }
        return false;
    }
    submit(e) {
        e.preventDefault()
        this.findInMap(this.state.checkedItems, false)
        this.setState(this.state.days = Array.from(this.state.checkedItems.keys()))
        console.log(this.state.days)
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
        if (this.existingClassTimes.includes(String(class_data.start_time) + ':00')) {
            // create_class(class_data)
        }
        else
            // create_class(class_data)
            // admistered_by(teacher_details)
            // this.toggle()
            this.scheduleNotifications(class_data.start_time, class_data.days, class_data.class_name,
                this.state.startDate, this.state.endDate)
        this.setState({
            class_name: '',
            section_number: '',
            start_time: '',
            end_time: '',
            days: '',
        })
        // console.log(nameForSchedule.nextInvocation())
        // nameForSchedule.cancel()
        // this.props.history.push('/profile')

    }
    scheduleNotifications(startTime, days, className, startDate, endDate) {
        //for intialize function need a get that gets class start,end times and dates and the name and days
        // foreach class in the res data do all the below.
        startTime = startTime.toString()
        startTime = startTime.split(":")
        rule.dayOfWeek = []
        rule.hour = startTime[0];
        rule.minute = startTime[1];

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
        console.log(this.state.checkedItems)
        console.log(startDate)
        console.log(endDate)
        console.log(rule.dayOfWeek)
        console.log(rule.hour)
        console.log(rule.minute)
        var testing = test
        // console.log(className)
        

        
        var className = schedule.scheduleJob({ start: startDate, end: endDate, rule: rule }, function () {
            //Need a get for all students w/ consent bool in class's subscriptions 
            //to send notification for attendence  &&  is still enrolled in this class

            //Need a get for start times and endtime of classes 
            //that start at the time this function runs
            console.log(testing)
            console.log(rule.hour)
            // var endTime = endTime.toString()
            // var endTime = endTime.split(":")
            // var startTime = startTime.toString()
            // var startTime = startTime.split(":")

            // const students = true //change this to res.data
            // var startMins = parseInt(startTime[0]) * 60 + parseInt(startTime[1])
            // var endMins = parseInt(endTime[0]) * 60 +  parseInt(endTime[1])
            // var midpoint = Math.floor((endMins - startMins) / 2)


            // students.forEach(studentSubscription => {
            // axios.post("push/attendence",{
            //     subscription:studentSubscription
            // })
            // var firstSendMinute = parseInt((startTime[1]) + Math.random() * (midpoint - 5)) + 5;
            // if (firstSendMinute >= 60) {
            //     firstSendMinute = firstSendMinute - 60;
            // }


            // schedule.scheduleJob(firstSendMinute.toString() + ' * * * *', function (studentSub) {
            // axios.post("push/surveyNotification", {
            //     subscription: studentSub
            // })

            //     var secondSendMinute = parseInt(midpoint + Math.random() * (midpoint)) - 5;
            //     if (secondSendMinute >= 60) {
            //         secondSendMinute = secondSendMinute - 60;
            //     }
            //     var subscriptionVar = studentSub
            //     schedule.scheduleJob(secondSendMinute.toString() + ' * * * *', function (studentSubTwo) {
            // axios.post("push/surveyNotification", {
            //     subscription: studentSubTwo
            // })
            // }.bind(null, subscriptionVar))

        // }.bind(null, studentSubscription))

    });

    // })
    console.log(className.nextInvocation());
        //     // testData.body = req.body.firstName + "Click here to take a survey!"
        //     // webpush.sendNotification(JSON.parse(subscription), JSON.stringify(testData))
        //     //     .catch(() => console.log("error"))
        // }
    }
render() {
    const create_class = (

        <Modal isOpen={this.state.modal} toggle={this.toggle}>
            <ModalHeader>
                Create Class
                    </ModalHeader>
            <ModalBody>
                <Form onSubmit={this.submit}>

                    <FormGroup>
                        <Input type="text"
                            name="class_name"
                            placeholder="Class Name"
                            value={this.state.class_name}
                            onChange={this.onChange}
                            minLength='2'
                            required
                        />
                    </FormGroup>
                    <FormGroup>
                        <Input type="text"
                            name="section_number"
                            placeholder="Section number"
                            value={this.state.section_number}
                            onChange={this.onChange}
                            required
                            minLength='1'
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label>Start time</Label>
                        <Input type="time"
                            name="start_time"
                            value={this.state.start_time}
                            onChange={this.onChange}
                            required
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label>End time</Label>
                        <Input type="time"
                            name="end_time"
                            value={this.state.end_time}
                            onChange={this.onChange}
                            required
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="daysClassMeets">Days class meets</Label>
                        <div>
                            {this.renderCheckboxes()}
                        </div>
                    </FormGroup>
                    <FormGroup>
                        <Label>Starting day of class</Label>
                        <Input type="date"
                            name="startDate"
                            value={this.state.startDate}
                            onChange={this.onChange}
                            required
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label>Ending day of class</Label>
                        <Input type="date"
                            name="endDate"
                            value={this.state.endDate}
                            onChange={this.onChange}
                            required
                        />
                    </FormGroup>
                </Form>

            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={this.submit}>Create Class</Button>
                <Button color="secondary" onClick={this.toggle}>Cancel</Button>
            </ModalFooter>
        </Modal>
    )
    return (
        <div>
            {create_class}
        </div >
    )
}
}
export default CreateClass;
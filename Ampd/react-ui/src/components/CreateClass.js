import React, { Component } from 'react'
import jwt_decode from 'jwt-decode'
import axios from 'axios';
import {
    Input, FormGroup, Label, CustomInput, Modal, ModalHeader, ModalBody,
    ModalFooter, Button, Form
} from 'reactstrap';
import { create_class, addAdmin } from './UserFunctions'

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
    //handles text changes in the create class modal
    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }
    //toggle for the modal
    toggle() {
        this.setState({
            modal: !this.state.modal
        })
    }
    //this destructures the data from the checkboxes state and maps it so we can dynamically change them.
    renderCheckboxes() {
        return this.state.checkboxes.map((item, index) => {
            const { type, id, label } = item //destructuring
            return (
                <CustomInput key={label} type={type} id={id} label={label} checked={this.state.checkedItems.get(item.id)} onChange={this.handleCheckboxChange} inline />
            )
        })
    }
    //helper function to delete values if they are checked then unchecked.
    findInMap = (map, val) => {
        for (let [k, v] of map) {
            if (v === val) {
                map.delete(k)
            }
        }
        return false;
    }
    //submit that pushes all the class details and teacher details to the database.
    submit(e) {
        e.preventDefault()
        this.findInMap(this.state.checkedItems, false)
        this.setState(this.state.days = Array.from(this.state.checkedItems.keys()))
        console.log(this.state.days)
	const cc = (Math.random() * 10000000).toFixed(0)
        const class_data = ({
            class_name: this.state.class_name,
	    classcode: cc,
            section_number: this.state.section_number,
            start_time: this.state.start_time,
            end_time: this.state.end_time,
	    start_date: this.state.startDate,
	    end_date: this.state.endDate,
            days: this.state.days,
	    username: jwt_decode(localStorage.usertoken).username
        })
        const teacher_details = ({
            classcode: cc,
            username: jwt_decode(localStorage.usertoken).username
        })
	console.log("Class:")
	console.log(class_data)
	console.log("Me:")
	console.log(teacher_details)
        /*if (this.existingClassTimes.includes(String(class_data.start_time) + ':00')) {
            create_class(class_data)
        }
        else*/
            create_class(class_data)
            this.toggle()
            this.scheduleNotifications(class_data.start_time, class_data.days, class_data.class_name,
                this.state.startDate, this.state.endDate)
        this.setState({
            class_name: '',
            section_number: '',
            start_time: '',
            end_time: '',
            days: '',
        })
        setTimeout(()=>{this.props.history.push('/profile')},500)
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

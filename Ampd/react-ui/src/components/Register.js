import React, { Component } from 'react'
import { register } from './UserFunctions'
import password from "../config"
import {
    Button, Modal, ModalHeader, ModalBody, ModalFooter,
    Form, FormGroup, Input, FormFeedback, Col
} from 'reactstrap';
import "./css/index.css"


//Register page
class Register extends Component {

    constructor() {
        super()

        //Creates user object
        this.state = {
            first_name: '',
            last_name: '',
            email: '',
            phonenumber: '',
            username: '',
            password: '',
            password_c: '',
            checked: false,
            dev_pass: '',
            consentBool: false,
            agreed_opened: false,
            modal: false,
            usernameValid: ''
        }

        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.toggle = this.toggle.bind(this)
    }
    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }
    handleCheckboxChange = event => {
        this.setState({ checked: !this.state.checked })
	if (this.state.checked === false){
            this.setState({ dev_pass: '' })
	}
    }
    toggle() {
        this.setState({
            modal: !this.state.modal
        })
    }
    studentAgreement = event => {
        this.setState({
            consentBool: true,
            agreed_opened: true
        })
        this.toggle()
    }
    studentNoAgreement = event => {
        this.setState({
            consentBool: false,
            agreed_opened: true
        })
        this.toggle()
    }
    onSubmit(e) {
        e.preventDefault()

        if (this.state.checked) {
            const teacher = {
                first_name: this.state.first_name,
                last_name: this.state.last_name,
                email: this.state.email,
                phonenumber: this.state.phonenumber,
                username: this.state.username,
                password: this.state.password,
                dev_pass: this.state.dev_pass,
                consentBool: this.state.consentBool
            }
            alert(this.state.dev_pass)

            if (this.state.dev_pass === password.teacher_code) {
		console.log("Dev Pass 2")
		teacher.dev_pass = '2'
                register(teacher).then(res => {
                    // alert(teacher.first_name + " " + teacher.last_name + " Teacher!")
                    this.props.history.push('/login')
                })
            }
	    else if (this.state.dev_pass === password.dev_code) {
		console.log("Dev Pass 3")
		teacher.dev_pass = '3'
		register(teacher).then(res => {
		    this.props.history.push('/login')
		})
	    }
            // TODO: make a pop up for this.
            else {
		console.log("Incorrect Dev pass")
            }
        }
	else {
	    this.setState({ dev_pass: '1'})
	}
	console.log("Dev Pass Value: "+this.state.dev_pass)
        if (this.state.agreed_opened) {
            const user = {
                first_name: this.state.first_name,
                last_name: this.state.last_name,
                email: this.state.email,
                phonenumber: this.state.phonenumber,
                username: this.state.username,
                password: this.state.password,
                dev_pass: this.state.dev_pass,
                consentBool: this.state.consentBool
            }
            register(user).then(res => {
                console.log(res)
                console.log(res.data)
                if (res.data == "User " + user.username + " already exists!") {
                    this.setState({ usernameValid: 'invalid' })
                }
                else {
                    this.props.history.push('/login')
                }
            })
        }
    }

    render() {
        const teacher_code = (
            <FormGroup>
                <Col sm={4} className="mr-auto ml-auto">
                    <Input type="password"
                        name="dev_pass"
                        placeholder="Teacher Code"
                        value={this.state.dev_pass}
                        onChange={this.onChange}
                    />
                </Col>
            </FormGroup>
        )
        const user_agreement = (
            <Button onClick={this.toggle}>User agreement</Button>
        )
        const submit = (
            <Button color='success'>Register</Button>
        )
        return (
            <div>
                <Form onSubmit={this.onSubmit}>
                    <h1 class="header">Register</h1>
                    <FormGroup>
                        {/* <Label className="mr-sm-2">First name</Label> */}
                        <Col sm={4} className="mr-auto ml-auto">
                            <Input type="text"
                                name="first_name"
                                placeholder="First Name"
                                value={this.state.first_name}
                                onChange={this.onChange}
                                maxLength='15'
                                required
                            />
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        {/* <Label>Last name</Label> */}
                        <Col sm={4} className="mr-auto ml-auto">
                            <Input type="text"
                                name="last_name"
                                placeholder="Last Name"
                                value={this.state.last_name}
                                onChange={this.onChange}
                                maxLength='15'
                                required
                            />
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        {/* <Label>Phone Number</Label> */}
                        <Col sm={4} className="mr-auto ml-auto">
                            <Input type="text"
                                name="phonenumber"
                                placeholder="Phone Number (No dashes)"
                                value={this.state.phonenumber}
                                onChange={this.onChange}
                                pattern = "[0-9]{3}[0-9]{3}[0-9]{4}"
                                maxLength='10'
                                required
                            />
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        {/* <Label>Last name</Label> */}
                        <Col sm={4} className="mr-auto ml-auto">
                            <Input type="text"
                                name="email"
                                placeholder="Email"
                                value={this.state.email}
                                onChange={this.onChange}
                                maxLength='255'
                                required
                            />
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        {/* <Label>Username</Label> */}
                        <Col sm={4} className="mr-auto ml-auto">
                            <Input type="text"
                                name="username"
                                placeholder="Username"
                                value={this.state.username}
                                onChange={this.onChange}
                                maxLength='15'
                                minLength='5'
                                valid={this.state.usernameValid === 'valid'}
                                invalid={this.state.usernameValid === 'invalid'}
                                required
                            />
                            <FormFeedback valid>Sweet! that name is available</FormFeedback>
                            <FormFeedback invalid>That name is unavailable :(</FormFeedback>
                        </Col>
                    </FormGroup>
                    <FormGroup>

                        {/* <Label>Password</Label> */}
                        <Col sm={4} className="mr-auto ml-auto">
                            <Input type="password"
                                name="password"
                                placeholder="Password"
                                value={this.state.password}
                                onChange={this.onChange}
                                minLength='5'
                                maxLength='15'
                                required
                            />
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        {/* <Label>Confirm Password</Label> */}
                        <Col sm={4} className="mr-auto ml-auto">
                            <Input type="password"
                                name="password_c"
                                placeholder="Confirm Password"
                                value={this.state.password_c}
                                onChange={this.onChange}
                                maxLength='15'
                                required
                            />
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Input
                            type="checkbox"
                            name="teacherCheckbox"
                            defaultChecked={this.state.checked}
                            onChange={this.handleCheckboxChange} />Teacher?
                    </FormGroup>
                    {this.state.checked ? teacher_code : false}
                    {this.state.checked ? submit :
                        this.state.agreed_opened ? submit : user_agreement}
                    <div>
                        <Modal isOpen={this.state.modal} toggle={this.toggle}>
                            <ModalHeader>STUDENT CONSENT FORM FOR
                                PARTICIPATION IN HUMAN RESEARCH AT
                                MONTANA STATE UNIVERSITY
                            </ModalHeader>
                            <ModalBody>
                                You are being asked to participate in a research study about undergraduate students’ engagement while
    studying mathematics. This may help us to better understand student engagement during mathematics
    class. Participation in this research is voluntary and participation or non-participation will not affect
    your grades in any way. If you agree to participate in this study, you will be asked to create a free user
    account on a web-based application on your device(s) – phone, tablet, computer, etc. – which will allow
    us to issue you a questionnaire twice during each of your regular class meetings. Each class meeting will
    be videotaped. There are no foreseen risks to you as a participant; however, questionnaires may be
    inconvenient at first. To minimize this inconvenience, the questionnaire is short and you may elect to
    dismiss or ignore it any time it is sent. You may participate in the study as long as you are enrolled in the
    course. You may elect to stop participating at any time. Data collected from you and your classmates will
    be used to engineer more engaging mathematics lessons based on your experiences. Potential benefits
    to you include a more engaging learning environment, which may promote learning and understanding.
    The researchers will not identify you by name in any reports using information obtained from video data
    and questionnaires. Subsequent uses of records and data will be subject to standard data use policies
    which protect the anonymity of individuals and institutions. Should you have questions about the
    research you may contact Derek Williams, derek.williams2@montana.edu. If you have additional
    questions about the rights of human subjects you can contact the Chair of the Institutional Review
    Board, Mark Quinn, (406) 994-4707 [mquinn@montana.edu].
	<br/>
    <b><u>AUTHORIZATION:</u></b> I have read the above and understand the discomforts, inconvenience and risk of this
    study. I agree to participate in this
    research. I understand that I may later refuse to participate, and that I may withdraw from the study at
    any time. I have received a copy of this consent form for my own records.
    AUTHORIZATION FOR VIDEOTAPING:
    I agree to be videotaped during instructional sessions.
                            </ModalBody>
                            <ModalFooter>
                                <Button color="primary" onClick={this.studentAgreement}>I agree to participate in the study!</Button>
                                <Button color="secondary" onClick={this.studentNoAgreement}>No. I do not want to participate</Button>
                            </ModalFooter>
                        </Modal>
                    </div>
                </Form>
                <br></br>
                <p><a href="\login">Already have an account?</a></p>
            </div>

        )
    }
}

export default Register
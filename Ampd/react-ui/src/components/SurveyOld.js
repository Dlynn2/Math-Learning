import React, { Component } from 'react'
import {
    Button, Modal, ModalHeader, ModalBody,
    ModalFooter, ButtonGroup
} from 'reactstrap';
import { survey } from "./UserFunctions"
import jwt_decode from 'jwt-decode'
class Survey extends Component {
    constructor() {
        super()
        this.state = {
            modal: true,
            engagement: '',
            enjoyment: '',
            challenge: '',
            interest: '',
            skill: '',
            first_name: '',
            last_name: '',
            email: '',
            phonenumber: '',
            username: ''
        }

        this.toggle = this.toggle.bind(this)
        this.submit = this.submit.bind(this)
    }

    componentDidMount() {
        this.setState({
            first_name: jwt_decode(localStorage.usertoken).fName,
            last_name: jwt_decode(localStorage.usertoken).lName,
            email: jwt_decode(localStorage.usertoken).email,
            phonenumber: jwt_decode(localStorage.usertoken).phonenumber,
            username: jwt_decode(localStorage.usertoken).username
        })
    }

    toggle() {
        this.setState({
            modal: !this.state.modal
        })
    }
    setEngagement(number) {
        this.setState({
            engagement: number
        })
    }
    setEnjoyment(number) {
        this.setState({
            enjoyment: number
        })
    }
    setInterest(number) {
        this.setState({
            interest: number
        })
    }
    setSkill(number) {
        this.setState({
            skill: number
        })
    }
    setChallenge(number) {
        this.setState({
            challenge: number
        })
    }
    dismiss(e) {
        e.preventDefault()

    }
    submit(e) {
        e.preventDefault()
        console.log(this.state.engagement)
        const answers = {
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            email: this.state.email,
            phonenumber: this.state.phonenumber,
            username: this.state.username,
            engagement: this.state.engagement,
            enjoyment: this.state.enjoyment,
            challenge: this.state.challenge,
            interest: this.state.interest,
            skill: this.state.skill
        }
        survey(answers)
        this.toggle()
    }
    render() {
        return (
            <div>
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader>
                        How are you feeling in math right now?
                    </ModalHeader>
                    <ModalBody>
                        <div style={{ textAlign: "center" }}>
                            <h4>Concentration</h4>
                            <ButtonGroup>
                                <Button onClick={() => this.setEngagement(1)} active={this.state.engagement === 1}>1</Button>
                                <Button onClick={() => this.setEngagement(2)} active={this.state.engagement === 2}>2</Button>
                                <Button onClick={() => this.setEngagement(3)} active={this.state.engagement === 3}>3</Button>
                                <Button onClick={() => this.setEngagement(4)} active={this.state.engagement === 4}>4</Button>
                                <Button onClick={() => this.setEngagement(5)} active={this.state.engagement === 5}>5</Button>
                            </ButtonGroup>
                        </div>

                        <div style={{ textAlign: "center" }}>
                            <h4>Enjoyment</h4>
                            <ButtonGroup>
                                <Button onClick={() => this.setEnjoyment(1)} active={this.state.enjoyment === 1}>1</Button>
                                <Button onClick={() => this.setEnjoyment(2)} active={this.state.enjoyment === 2}>2</Button>
                                <Button onClick={() => this.setEnjoyment(3)} active={this.state.enjoyment === 3}>3</Button>
                                <Button onClick={() => this.setEnjoyment(4)} active={this.state.enjoyment === 4}>4</Button>
                                <Button onClick={() => this.setEnjoyment(5)} active={this.state.enjoyment === 5}>5</Button>
                            </ButtonGroup>
                        </div>
                        <div style={{ textAlign: "center" }}>
                            <h4>Interest</h4>

                            <ButtonGroup>
                                <Button onClick={() => this.setInterest(1)} active={this.state.interest === 1}>1</Button>
                                <Button onClick={() => this.setInterest(2)} active={this.state.interest === 2}>2</Button>
                                <Button onClick={() => this.setInterest(3)} active={this.state.interest === 3}>3</Button>
                                <Button onClick={() => this.setInterest(4)} active={this.state.interest === 4}>4</Button>
                                <Button onClick={() => this.setInterest(5)} active={this.state.interest === 5}>5</Button>
                            </ButtonGroup>
                        </div>
                        <div style={{ textAlign: "center" }}>
                            <h4>Challenge</h4>
                            <ButtonGroup>
                                <Button onClick={() => this.setChallenge(1)} active={this.state.challenge === 1}>1</Button>
                                <Button onClick={() => this.setChallenge(2)} active={this.state.challenge === 2}>2</Button>
                                <Button onClick={() => this.setChallenge(3)} active={this.state.challenge === 3}>3</Button>
                                <Button onClick={() => this.setChallenge(4)} active={this.state.challenge === 4}>4</Button>
                                <Button onClick={() => this.setChallenge(5)} active={this.state.challenge === 5}>5</Button>
                            </ButtonGroup>
                        </div>
                        <div style={{ textAlign: "center" }}>
                            <h4>Skill</h4>
                            <ButtonGroup>
                                <Button onClick={() => this.setSkill(1)} active={this.state.skill === 1}>1</Button>
                                <Button onClick={() => this.setSkill(2)} active={this.state.skill === 2}>2</Button>
                                <Button onClick={() => this.setSkill(3)} active={this.state.skill === 3}>3</Button>
                                <Button onClick={() => this.setSkill(4)} active={this.state.skill === 4}>4</Button>
                                <Button onClick={() => this.setSkill(5)} active={this.state.skill === 5}>5</Button>

                            </ButtonGroup>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.submit}>Submit survey! :)</Button>
                        <Button color="danger" onClick={this.toggle}>Click here or anywhere outside survey to dismiss :(</Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}

export default Survey
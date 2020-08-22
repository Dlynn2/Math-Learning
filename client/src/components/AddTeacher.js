import React, { Component } from 'react'
import {
    Button, Modal, ModalHeader, ModalBody,
    ModalFooter, ButtonGroup
} from 'reactstrap';
import jwt_decode from 'jwt-decode'
class AddTeacher extends Component {
    constructor() {
        super()
        this.state = {
            modal: true,
            first_name: '',
            last_name: '',
            username: '',
            userid:''
        }

        this.toggle = this.toggle.bind(this)
        this.submit = this.submit.bind(this)
    }

    componentDidMount() {
        this.setState({
            first_name: jwt_decode(localStorage.usertoken).fName,
            last_name: jwt_decode(localStorage.usertoken).lName,
            username: jwt_decode(localStorage.usertoken).username,
            userid: jwt_decode(localStorage.usertoken).userid
        })
    }

    toggle() {
        this.setState({
            modal: !this.state.modal
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
            username: this.state.username,
            userid: this.state.userid
        }

        this.toggle()
        
    }
    render() {
        return (
            <div>
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader>
                        Add a teacher to a class
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
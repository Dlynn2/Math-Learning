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
	    userid: '',
	    classid: '',
	    response: 'x,x,x,x,x,'
        }

        this.toggle = this.toggle.bind(this)
        this.submit = this.submit.bind(this)
    }

    componentDidMount() {
        this.setState({
            userid: jwt_decode(localStorage.usertoken).userid
        })
    }

    setIndexTo(str, index, replacement){
        if(index > str.length-1) return str;
	return str.substring(0, index) + replacement + str.substring(index+1);
    }

    toggle() {
        this.setState({
            modal: !this.state.modal
        })
    }
    setFirst(number) {
        this.setState({
            response: this.setIndexTo(this.state.response, 0, number)
        })
    }
    setSecond(number) {
        this.setState({
            response: this.setIndexTo(this.state.response, 2, number)
        })
    }
    setThird(number) {
        this.setState({
            response: this.setIndexTo(this.state.response, 4, number)
        })
    }
    setFourth(number) {
        this.setState({
            response: this.setIndexTo(this.state.response, 6, number)
        })
    }
    setFifth(number) {
        this.setState({
            response: this.setIndexTo(this.state.response, 8, number)
        })
    }
    dismiss(e) {
        e.preventDefault()

    }
    submit(e) {
        e.preventDefault()
        console.log(this.state.response)
        const answers = {
            userid: this.state.userid,
            classid: this.state.classid,
            response: this.state.response
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
                                <Button onClick={() => this.setFirst(1)} active={this.state.response.charAt(0) === '1'}>1</Button>
                                <Button onClick={() => this.setFirst(2)} active={this.state.response.charAt(0) === '2'}>2</Button>
                                <Button onClick={() => this.setFirst(3)} active={this.state.response.charAt(0) === '3'}>3</Button>
                                <Button onClick={() => this.setFirst(4)} active={this.state.response.charAt(0) === '4'}>4</Button>
                                <Button onClick={() => this.setFirst(5)} active={this.state.response.charAt(0) === '5'}>5</Button>
                            </ButtonGroup>
                        </div>

                        <div style={{ textAlign: "center" }}>
                            <h4>Enjoyment</h4>
                            <ButtonGroup>
                                <Button onClick={() => this.setSecond(1)} active={this.state.response.charAt(2) === '1'}>1</Button>
                                <Button onClick={() => this.setSecond(2)} active={this.state.response.charAt(2) === '2'}>2</Button>
                                <Button onClick={() => this.setSecond(3)} active={this.state.response.charAt(2) === '3'}>3</Button>
                                <Button onClick={() => this.setSecond(4)} active={this.state.response.charAt(2) === '4'}>4</Button>
                                <Button onClick={() => this.setSecond(5)} active={this.state.response.charAt(2) === '5'}>5</Button>
                            </ButtonGroup>
                        </div>
                        <div style={{ textAlign: "center" }}>
                            <h4>Interest</h4>

                            <ButtonGroup>
                                <Button onClick={() => this.setThird(1)} active={this.state.response.charAt(4) === '1'}>1</Button>
                                <Button onClick={() => this.setThird(2)} active={this.state.response.charAt(4) === '2'}>2</Button>
                                <Button onClick={() => this.setThird(3)} active={this.state.response.charAt(4) === '3'}>3</Button>
                                <Button onClick={() => this.setThird(4)} active={this.state.response.charAt(4) === '4'}>4</Button>
                                <Button onClick={() => this.setThird(5)} active={this.state.response.charAt(4) === '5'}>5</Button>
                            </ButtonGroup>
                        </div>
                        <div style={{ textAlign: "center" }}>
                            <h4>Challenge</h4>
                            <ButtonGroup>
                                <Button onClick={() => this.setFourth(1)} active={this.state.response.charAt(6) === '1'}>1</Button>
                                <Button onClick={() => this.setFourth(2)} active={this.state.response.charAt(6) === '2'}>2</Button>
                                <Button onClick={() => this.setFourth(3)} active={this.state.response.charAt(6) === '3'}>3</Button>
                                <Button onClick={() => this.setFourth(4)} active={this.state.response.charAt(6) === '4'}>4</Button>
                                <Button onClick={() => this.setFourth(5)} active={this.state.response.charAt(6) === '5'}>5</Button>
                            </ButtonGroup>
                        </div>
                        <div style={{ textAlign: "center" }}>
                            <h4>Skill</h4>
                            <ButtonGroup>
                                <Button onClick={() => this.setFifth(1)} active={this.state.response.charAt(8) === '1'}>1</Button>
                                <Button onClick={() => this.setFifth(2)} active={this.state.response.charAt(8) === '2'}>2</Button>
                                <Button onClick={() => this.setFifth(3)} active={this.state.response.charAt(8) === '3'}>3</Button>
                                <Button onClick={() => this.setFifth(4)} active={this.state.response.charAt(8) === '4'}>4</Button>
                                <Button onClick={() => this.setFifth(5)} active={this.state.response.charAt(8) === '5'}>5</Button>

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

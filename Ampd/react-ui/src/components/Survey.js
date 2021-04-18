import React, { Component } from 'react'
import {
    Button, Modal, ModalHeader, ModalBody,
    ModalFooter, ButtonGroup
} from 'reactstrap';
import { survey, getCurrentClass, getEnrolledClasses } from "./UserFunctions"
import jwt_decode from 'jwt-decode'
class Survey extends Component {
    constructor() {
        super()
        this.state = {
            modal: true,
            userid: '',
            RecipientLastName: '',
            obsid: -1,
            classid: '',
            concentration: '',
            enjoyment: '',
            interest: '',
            challenge: '',
            skill: ''
        }

        this.toggle = this.toggle.bind(this)
        this.submit = this.submit.bind(this)
    }

    getUrlVars() {
        var vars = {};

        window.location.href.replace(/((classID)=(.*)[?])/, function (m, key, other, value) {
            vars[other] = value;
        });
        window.location.href.replace(/((obsID)=(.*))/, function (m, key, other, value) {
            vars[other] = value;
        });
        return vars;
    }

    async componentDidMount() {
      console.log("Starting...");
        if ((localStorage.usertoken) != null){
          console.log("Mounting...");
          var foundUserid = jwt_decode(localStorage.usertoken).userid
          var urlID = this.getUrlVars()
          this.setState({
              userid: foundUserid,
              obsid: this.getUrlVars()["obsID"]
          })
        }
        else{
          alert("User not logged in. Please log in first, then try the survey link again...");
          console.log("Redirecting...");
          window.location.href = '\login';
          console.log("Redirected.");
        }
    }

    toggle() {
        this.setState({
            modal: !this.state.modal
        })
    }
    setConcentration(number) {
        this.setState({
            concentration: number
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
        var finalUserID = jwt_decode(localStorage.usertoken).userid;
        const promise1 = new Promise((resolve, reject) => {
          resolve(getEnrolledClasses(finalUserID)
            .then(result => result.data[0].ClassID)
            .then(res => {
              return res;
            }));
        });
        promise1.then((value) => {
          const token = localStorage.usertoken
          const decoded = jwt_decode(token)
          this.setState({
              classid: value,
          })
          const answers = {
              userid: this.state.userid,
              RecipientLastName: decoded.lName,
              RecipientFirstName: decoded.fName,
              RecipientEmail: decoded.email,
              classid: this.state.classid,
              obsid: this.state.obsid,
              concentration: this.state.concentration,
              enjoyment: this.state.enjoyment,
              interest: this.state.interest,
              challenge: this.state.challenge,
              skill: this.state.skill,
              RecipientLastName: decoded.lName
          }
          if (answers.classid < 1) {
              alert("You're not currently in a class!")
          }
          else {
              survey(answers)
          }
          this.toggle()
          this.props.history.push('/profile')
          // expected output: "Success!"
        });
        /*const answers = {
          userid: 80,
          classid: 49,
          obsid: 1,
          concentration: 1,
          enjoyment: 1,
          interest: 1,
          challenge: 1,
          skill: 1
        }*/
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
                                <Button onClick={() => this.setConcentration(1)} active={this.state.concentration === 1}>1</Button>
                                <Button onClick={() => this.setConcentration(2)} active={this.state.concentration === 2}>2</Button>
                                <Button onClick={() => this.setConcentration(3)} active={this.state.concentration === 3}>3</Button>
                                <Button onClick={() => this.setConcentration(4)} active={this.state.concentration === 4}>4</Button>
                                <Button onClick={() => this.setConcentration(5)} active={this.state.concentration === 5}>5</Button>
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

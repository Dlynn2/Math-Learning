import React, { Component } from 'react'
import { login } from './UserFunctions'
import {
    Button, Form, FormGroup, Input, FormFeedback,Col
} from 'reactstrap';
class Login extends Component {
    constructor() {
        super()
        this.state = {
            username: '',
            passwordHash: '',
            usernameValid:''
        }

        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }
    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    onSubmit(e) {
        e.preventDefault()

        const user = {
            username: this.state.username,
            passwordHash: this.state.passwordHash
        }
        
        login(user).then(res => {
            if (res  == "Bad account") {
                this.setState({ usernameValid: 'invalid' })
            }
            else if(res == "Bad password"){
                this.setState({usernameValid: 'valid'})
            }
            else{
                this.props.history.push('/profile')
            }
        })
    }

    render() {
        return (
            <div>
                <Form onSubmit={this.onSubmit}>
                    <h1>Sign in!</h1>
                    <FormGroup>
                        <Col sm={4} className="mr-auto ml-auto">
                            <Input type="text"
                                name="username"
                                placeholder="Username"
                                value={this.state.username}
                                onChange={this.onChange}
                                autoComplete="username"
                                valid={this.state.usernameValid === 'valid'}
                                invalid={this.state.usernameValid === 'invalid'}
                            />
                            <FormFeedback valid>We found your username!</FormFeedback>
                            <FormFeedback invalid>Sorry we can't find that username in our records</FormFeedback>
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Col sm={4} className="mr-auto ml-auto">
                            <Input type="password"
                                name="passwordHash"
                                placeholder="Enter Password"
                                value={this.state.passwordHash}
                                onChange={this.onChange}
                                autoComplete="current-password"
                                invalid={this.state.usernameValid === 'valid'}
                            />
                            <FormFeedback invalid>Sorry that password does not match that username :(</FormFeedback>
                        </Col>
                    </FormGroup>
                    <Button type="submit">Sign in</Button>
                </Form>
            </div>
        )
    }
}

export default Login
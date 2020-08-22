import React, {Component} from 'react'
// import {Nav, NavItem, NavLink} from 'reactstrap'
import logo from "./images/logo_update.png";

class Landing extends Component{
    render() {
        return (
            <div>
                <div>
                    <h1>Welcome!</h1>
                    <img src={logo} alt="AMP'd engagement"></img>

                    <p>This is the prototype for AMP'D engagement. Thank you for participating
                    in this study. </p>
                  <p>Please log in or register above.</p>

            </div>

          </div>
        )
    }
}

export default Landing

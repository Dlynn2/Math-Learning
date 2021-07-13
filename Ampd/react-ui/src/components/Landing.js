import React, {Component} from 'react'
import {Button, Nav, NavItem, NavLink} from 'reactstrap'
import logo from "./images/logo_update.png";
import logo_grey from "./images/logo_update_grey.png";
import styles from "./css/landing.css"

class Landing extends Component{
    render() {
        return (
            <div>
                <div class="content">
                    <p class="header">Welcome!</p>
                    <div class="body">
                    <p>This is the prototype for AMP'D Engagement, a tool designed for
                      students and teachers to share experiences in the classroom.
                    </p>

                    <p>Thank you for participating
                      in this study.
                    </p>
                  <Button className='button' color="primary" size="lg" href="\login">Sign In</Button>
                  <Button className="button" color="secondary" size="lg" href="\register">Register</Button>
                  <hr></hr>
		    <p> To learn more about the AMP'D Engagement project, read our <a href="\faq">F.A.Q.</a>
			</p>
                  </div>

            </div>
            <hl></hl>
            <footer class="site-footer">
              <div class="container">
                <div class="row">
                  <div>
                    <img src={logo_grey} alt="AMP'd Engagement"></img>
                  </div>
                  <div class="col-sm-12 col-md-6">
                  </div>
                  <div class="col-xs-6 col-md-3">
                  </div>
                </div>
              </div>
        </footer>
          </div>
        )
    }
}

export default Landing

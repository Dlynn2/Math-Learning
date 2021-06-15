import React, {Component, useState} from 'react'
import {Nav, NavItem, NavLink} from 'reactstrap'
import {TabContent, TabPane, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import logo_grey from "./images/logo_update_grey.png";
import classnames from 'classnames';
import "./css/faq.css"

class FAQ extends Component{
    constructor(){
      super();
      this.state = {
        activeTab: "1",
        setActiveTab:"1"
      };

    }

    toggle(tab) {
      if(this.state.activeTab !== tab) this.setActiveTab(tab);
    }
    render() {

      return (
        <div class="content">

              <h1 class="header">Frequently Asked Questions</h1>

              <br></br>
              <div class="body">
                <div class="text">
                <h2 class="q">What is AMP'D?</h2>
                    <p class ="ans">AMPD is an acronym for Accessing Mathematical Practices & Development through
                  Engagement. AMPD Engagement is an ongoing endeavor in educational research at Montana
                  State University focused on quantifying student engagement in the process of learning
                  mathematics. AMPD allows students to maintain authority over their experiences by providing long-term,
                  real-time feedback to instructors via unintrusive web tools.</p>
                <h2 class="q">Who is AMP'D?</h2>
                  <p class="ans">AMPD is a collaboration project coordinated by the <a href="https://www.bobcatsoftwarefactory.com/">
                  MSU Software Factory</a> AMPD was created and overseen by Dr. Derek Williams, an educational researcher
                  at MSU and mathematics instructor with over 12 years of experience in teaching. The design and implementation of the web
                  application was carried out by three MSU undergraduate students: Kyle Rathman (Backend Engineer), Kendall Black (Frontend
                  Engineer), and Dylan Lynn (Project Architect).</p>
                  <hr></hr>
                  <p class="ans">AMP'D was then continued as a project by <a target="_blank" href="https://www.linkedin.com/in/zacharyschallenberger/">Zachary Schallenberger</a> and Tristan Stevens. Together, they implemented a new way
                  of sending surveys to students through text messages. They also redesigned many of the components of the site and set up source
                  control and laid out the architecture for future projects for future students.</p>
                <h2 class="q">How can I sign up?</h2>
                  <p class="ans">If you are a student enrolled in a class using AMPD, click the menu bar in the upper right
                  then click "Register" and enter the class code provided by your instructor. If you are an educator that would
                  be interested in using AMPD in your classroom, please <a href="http://www.math.montana.edu/directory/faculty/2104036/derek-williams">contact Dr. Derek Williams</a> for more information.
                  </p>
                <h2 class="q">Which devices and browsers support AMPD?</h2>
                  <p class="ans">AMPD was built from the ground up to be accessible.
                    AMPD employs developing, cutting-edge technologies to notify
                    students of new surveys on mobile devices without needing to
                    install a full application. These services are able to run
                    in <b>Google Chrome, Mozilla Firefox, and Microsoft Edge </b>
                    on desktop and Android devices. At this time, notifications on iOS
                    devices are not supported but will be operational in the near future.</p>
              </div>
          </div>
          <footer class="site-footer">
            <div class="container">
              <div class="row">
                <div>
                  <img src={logo_grey} alt="AMP'd Engagement"></img>
                </div>
                <div class="col-sm-12 col-md-6">
                </div>
                <div class="col-xs-6 col-md-3">
                  <h6>Quick Links</h6>
                  <ul class="footer-links">
                    <li><a href="/profile">Home</a></li>
                    <li><a href="/faq">F.A.Q.</a></li>
                  </ul>
                </div>
              </div>
            </div>
      </footer>
        </div>
        )
    }
}

export default FAQ

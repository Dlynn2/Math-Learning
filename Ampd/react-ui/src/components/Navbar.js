import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import jwt_decode from 'jwt-decode'
import { Collapse, Navbar as Navbar1, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import logo from "./images/logo_update.png";
import menu from "./images/ham_menu.png";
import "./css/Navbar.css"

class Navbar extends Component {
    constructor() {
        super()
        this.state = {
            collapsed: true,
            setCollapsed: true,
        }
        this.toggleNavbar = this.toggleNavbar.bind(this)
    }
    //this toggles the collapsed state of navbar
    toggleNavbar() {
        this.setState({ collapsed: !this.state.collapsed })
    }
    //this removes the users data from the localStorage
    logOut(e) {
        e.preventDefault()
        localStorage.removeItem('usertoken')
        this.props.history.push('/')
    }

    render() {


        const loginRegLink = (
            <div>
                    <NavLink className="link" href="/login">
                        Sign In
                 </NavLink>
                    <NavLink className="link" href="/register">
                        Register
                 </NavLink>
		<NavLink className="link" href="/faq">
			F.A.Q.
		</NavLink>
            </div>
        )
	//this is the link for common users
        const userLink = (
            <div>
                    <NavLink className="link" href="/profile">
                        Home
                    </NavLink>
                {/* <NavItem>
                    <NavLink className="link" href="/survey">
                        Take Survey
                    </NavLink>
                </NavItem> */}
			<NavLink className="link" href="/faq">
				F.A.Q.
			</NavLink>
                    <NavLink className="link" href="/" onClick={this.logOut.bind(this)}>
                        Logout
                    </NavLink>
            </div>
        )
	//this is the link Developers and Admins will see
        const derekLink = (
            <div>
                    <NavLink className="link" href="/profile">
                        Home
                </NavLink>
                    <NavLink className="link" href="/dataTables">
                        Data Tables
                </NavLink>
                    <NavLink className="link" href="/createClass">
                        Add Class
                </NavLink>
		    <NavLink className="link" href="/shiny/sample-apps/mathLearningShiny/?">
			Statistics
		    </NavLink>
		<NavLink className="link" href="/faq">
			F.A.Q.
		</NavLink>
                    <NavLink className="link" href="/" onClick={this.logOut.bind(this)}>
                        Logout
                </NavLink>
            </div>
        )
	//this is the link that teachers will see
        const teacherLink = (
            <div>
                    <NavLink className="link" href="/profile">
                       My Profile
                </NavLink>
                    <NavLink className="link" href="/createClass">
                        Add Class
                </NavLink>
		<NavLink className="link" href="/shiny/sample-apps/mathLearningShiny/?">
                        Statistics
                </NavLink>
			<NavLink className="link" href="/faq">
				F.A.Q.
			</NavLink>
                    <NavLink className="link" href="/" onClick={this.logOut.bind(this)}>
                        Logout
                </NavLink>
            </div>
        )

        return (
          //Old test tab:
          //{localStorage.usertoken ? jwt_decode(localStorage.usertoken).accountType !== '1'? <NavLink className="link" href={"/shiny/sample-apps/mathLearningShiny/?teacherID="+jwt_decode(localStorage.usertoken).userid}>Test</NavLink> : <br style={{display:"none"}}></br>: <br style={{display:"none"}}></br>}
            <div main>
                <Navbar1 color="faded" light>
                    <NavbarBrand href="/" className="mr-auto"fixed="left"><img src={logo} alt="AMP'd Engagement"></img></NavbarBrand>
                    <Dropdown direction="left" size="sm" className="hamMenu" isOpen={this.state.btnDropleft} toggle={() => { this.setState({ btnDropleft: !this.state.btnDropleft }); }}>
                      <DropdownToggle color="white">
                        <img src={menu} alt="AMP'd Engagement"></img>
                      </DropdownToggle>
                      <DropdownMenu>
                        {localStorage.usertoken ? jwt_decode(localStorage.usertoken).accountType === '1' ? userLink : jwt_decode(localStorage.usertoken).accountType === '2' ? teacherLink : derekLink : loginRegLink}
                      </DropdownMenu>
                    </Dropdown>
                </Navbar1>
                <hr
                  style={{
                    color: "#313D4F",
                    backgroundColor: "#313D4F",
                    height: 5}}
                    />
            </div>
            // <nav>
            //     {/* below div is where collapse and such goes
            //  above is where the toggle, target and span go.
            //  */}
            //     <div id="navbar1">
            //         <ul>
            //             <li>
            //                 <Link to="/">
            //                     Home
            //          </Link>
            //             </li>
            //         </ul>
            //         {/* make a more elegant solution here? */}

            //     </div>
            // </nav>


        )
    }
}

export default withRouter(Navbar)

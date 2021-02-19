import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import jwt_decode from 'jwt-decode'
import { Collapse, Navbar as Navbar1, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import logo from "./images/logo_update.png";
import "./css/Navbar.css"

class Navbar extends Component {
    constructor() {
        super()
        this.state = {
            collapsed: true,
            setCollapsed: true
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
                <NavItem>
                    <NavLink activeClassName="active" href="/login">
                        Login
                 </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink activeClassName="active" href="/register">
                        Register
                 </NavLink>
                </NavItem>
		<NavItem>
		<NavLink activeClassName="active" href="/faq">
			F.A.Q.
		</NavLink>
		</NavItem>
            </div>
        )
	//this is the link for common users
        const userLink = (
            <div>
                <NavItem>
                    <NavLink activeClassName="active" href="/profile">
                        My Profile
                    </NavLink>
                </NavItem>
                {/* <NavItem>
                    <NavLink activeClassName="active" href="/survey">
                        Take Survey
                    </NavLink>
                </NavItem> */}
		<NavItem>
			<NavLink activeClassName="active" href="/faq">
				F.A.Q.
			</NavLink>
		</NavItem>
                <NavItem>
                    <NavLink activeClassName="active" href="/" onClick={this.logOut.bind(this)}>
                        Logout
                    </NavLink>
                </NavItem>
            </div>
        )
	//this is the link Developers and Admins will see
        const derekLink = (
            <div>
                <NavItem>
                    <NavLink activeClassName="active" href="/profile">
                        My Profile
                </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink activeClassName="active" href="/dataTables">
                        Data Tables
                </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink activeClassName="active" href="/createClass">
                        Add Class
                </NavLink>
                </NavItem>
		<NavItem>
		    <NavLink activeClassName="active" href="/shiny/sample-apps/mathLearningShiny/?">
			Statistics
		    </NavLink>
		</NavItem>
		<NavItem>
		<NavLink activeClassName="active" href="/faq">
			F.A.Q.
		</NavLink>
		</NavItem>
                <NavItem>
                    <NavLink activeClassName="active" href="/" onClick={this.logOut.bind(this)}>
                        Logout
                </NavLink>
                </NavItem>
            </div>
        )
	//this is the link that teachers will see
        const teacherLink = (
            <div>
                <NavItem>
                    <NavLink activeClassName="active" href="/profile">
                       My Profile 
                </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink activeClassName="active" href="/createClass">
                        Add Class
                </NavLink>
                </NavItem>
		<NavLink activeClassName="active" href="/shiny/sample-apps/mathLearningShiny/?">
                        Statistics
                </NavLink>
		<NavItem>
			<NavLink activeClassName="active" href="/faq">
				F.A.Q.
			</NavLink>
		</NavItem>
                <NavItem>
                    <NavLink activeClassName="active" href="/" onClick={this.logOut.bind(this)}>
                        Logout
                </NavLink>
                </NavItem>
            </div>
        )

        return (
            <div main>
                <Navbar1 color="faded" light>
                    <NavbarBrand href="/" className="mr-auto"fixed="left"><img src={logo} alt="AMP'd Engagement"></img></NavbarBrand>
                    <NavbarToggler onClick={this.toggleNavbar} navbar className="ml-auto" />
                    <Collapse isOpen={!this.state.collapsed} navbar className="ml-auto">
                        <Nav navbar className="mr-auto">
                          <ul>
                            <NavItem>
                                <NavLink activeClassName="active" href="/">Home</NavLink>
                            </NavItem>
				{localStorage.usertoken ?
                                jwt_decode(localStorage.usertoken).accountType !== '1'?
				<NavItem>
     	                           <NavLink activeClassName="active" href={"/shiny/sample-apps/mathLearningShiny/?teacherID="+jwt_decode(localStorage.usertoken).userid}>Test</NavLink>
                                </NavItem>: <br style={{display:"none"}}></br>: <br style={{display:"none"}}></br>}

                            {localStorage.usertoken ?
                                jwt_decode(localStorage.usertoken).accountType === '1' ? userLink :
                                    jwt_decode(localStorage.usertoken).accountType === '2' ? teacherLink :
                                        derekLink :
                                loginRegLink}
                            </ul>
                        </Nav>
                    </Collapse>
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

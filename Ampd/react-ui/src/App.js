import React from 'react';
// import logo from './logo.svg';
import './App.css';
import Login from "./components/Login"
import Navbar from './components/Navbar'
import Landing from './components/Landing'
import Register from './components/Register'
import Profile from './components/Profile'
import Survey from './components/Survey'
import DataTables from './components/DataTables'
import FAQ from './components/FAQ'
import CreateClass from './components/CreateClass'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.css';
function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Route exact path='/' component={Landing} />
        <div>
          <Route exact path='/login' component={Login} />
          <Route exact path='/register' component={Register} />
          <Route exact path='/profile' component={Profile} />
          <Route exact path='/survey' component={Survey} />
	  <Route exact path='/datatables' component={DataTables} />
	  <Route exact path='/FAQ' component={FAQ} />
	  <Route exact path='/createClass' component={CreateClass} />
        </div>
      </div>
    </Router>
  );
}

export default App;

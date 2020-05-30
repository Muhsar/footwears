import React, { Component } from 'react';
import Navbar from './components/navbar'
import Home from './components/home'
// import Slash from './components/slash'
import Login from './components/login'
import Register from './components/register'
import Profile from './components/profile'
import './App.css';
import { BrowserRouter as Router, Route} from "react-router-dom"
import './javascripts/script.js';

class App extends Component {
  state = {
   
  };

 
  render() {
    return (
      <React.Fragment>
      <Router>
      <Navbar />
      <Route path="/" exact component={Home} />
      <Route path="/login" exact component={Login} />
      <Route path="/register" exact component={Register} />
      <Route path="/profile" exact component={Profile} />
      
    </Router>
    </React.Fragment>
    );
  }
}
export default App;

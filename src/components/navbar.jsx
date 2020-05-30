import React, { Component } from "react";
import axios from 'axios'
import Form from './counter'
import Order from './order'
import {Link, withRouter} from 'react-router-dom'
import '../javascripts/sb-admin-2'
import '../css/grayscale.min.css'
axios.interceptors.request.use(function (config) {
  const token = localStorage.clienttoken;
  config.headers.Authorization =  token;

  return config;
});
axios.defaults.headers.common['Authorization'] = localStorage.clienttoken
class Navbar extends Component{
  constructor() {
    super();
    this.state = {orders: [],};
  
    
  }
logOut(e){
  e.preventDefault()
  localStorage.removeItem('clienttoken')
  this.props.history.push('/')
}
    componentDidMount() {
      axios.interceptors.request.use(function (config) {
        const token = localStorage.clienttoken;
        config.headers.Authorization =  token;
      
        return config;
      });
      axios.defaults.headers.common['Authorization'] = localStorage.clienttoken
      axios.get('http://localhost:4000/client/order')
        .then(response => {
          this.setState({ orders: response.data })
        })
        .catch((error) => {
          console.log(error);
        })
    }
  
  openNav() {
    var x = document.getElementById("navDemo");
    if (x.className.indexOf("w3-show") == -1) {
      x.className += " w3-show";
    } else { 
      x.className = x.className.replace(" w3-show", "");
    }
  }  
  openForm(){
   document.getElementById('form').style.display='block'
   
  }
  openOrder(){
   document.getElementById('order').style.display='block'
   
  }
  render(){
    const loginRegLink = (
 <React.Fragment></React.Fragment>
      
    )
    const clientLink =(
      <div className="w3-top">

 <div className="w3-bar bg-info text-white w3-left-align w3-large">

      <Link className="w3-bar-item w3-button w3-hide-medium w3-hide-large w3-right w3-padding-large w3-hover-white w3-large bg-info text-white" to="#" onClick={this.openNav}><i className="fa fa-bars"></i></Link>
      <Link to="/" className="w3-bar-item w3-button w3-padding-large bg-info text-white"><i className="fa fa-home w3-margin-right"></i>Max<sup>2</sup></Link>
      <button to="#" onClick={this.openForm} className="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white" title="Order"><i className="fa fa-shopping-cart"></i></button>
      <button to="#" onClick={this.openOrder} className="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white" title="My Order(s)">
      <i className="fa fa-list-alt"></i>
      <sup><span className="badge badge-danger badge-counter">
     {(this.state.orders).length}
      </span></sup>
      </button>
      <Link to="/profile" className="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white" title="My Profile"><i className="fa fa-user"></i></Link>
      
      <Link to="#" className="w3-bar-item w3-button w3-hide-small w3-right w3-padding-large w3-hover-white" title="My Account">
      <img src="social_files/avatar2.png" className="w3-circle" alt="Avatar"/>
      </Link>
      <a href="#" onClick={this.logOut.bind(this)} className="w3-bar-item w3-button w3-hide-small w3-right w3-padding-large w3-hover-white" title="My Account">
      <h6>Log Out</h6>
      </a>
      
          <Form/>
          <Order/>
 </div>
 </div>

    )
    return (
      <>
      <>
      
      {localStorage.clienttoken ? clientLink : loginRegLink}
      </>
 
<div id="navDemo"  className="w3-bar-block bg-info text-white w3-hide w3-hide-large w3-hide-medium w3-large">
<Link to="#" className="w3-bar-item w3-button w3-padding-large">Link 1</Link>
<button  onClick={this.openForm} className="w3-bar-item w3-button w3-padding-large"><i className="fa fa-shopping-cart"></i></button>
<button  onClick={this.openOrder} className="w3-bar-item w3-button w3-padding-large"><i className="fa fa-list-alt"></i></button>
<Link to="#" className="w3-bar-item w3-button w3-padding-large"><i className="fa fa-user"></i></Link>
</div>

</>
    )};}





export default withRouter(Navbar);

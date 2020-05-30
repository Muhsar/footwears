import React, { Component } from "react";
import axios from 'axios'
import { Link } from 'react-router-dom'
import '../javascripts/sb-admin-2'
import '../javascripts/script'
import '../css/w3.css'
// import * as actions from 'action'
// import logo from '../backend/public/uploads/'
const News = props => (
<div className="w3-container w3-card w3-white w3-round w3-margin">
<h4>{props.news.designer}</h4><br/>
<hr className="w3-clear"/>
  <img src={require('../uploads/'+props.news.photo)} alt="Avatar" className="fw w3-margin-bottom" />
    <h6>Brand: {props.news.brand}</h6>
    <h6>Type: {props.news.particular}</h6>
    <p>{props.news.description}</p>
            <button type="button" className="w3-button bg-info text-white w3-margin-bottom"><i className="fa fa-thumbs-up"></i> </button>
            <button type="button" className="w3-button bg-info text-white w3-margin-bottom"><i className="fa fa-comment"></i> </button> 
            </div>
            )
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {news: [],
    users:[],
  designer:''};
  }

  componentDidMount() {
    axios.interceptors.request.use(function (config) {
      const token = localStorage.clienttoken;
      config.headers.Authorization =  token;
    
      return config;
    });
    axios.defaults.headers.common['Authorization'] = localStorage.clienttoken
    axios.get('http://localhost:4000/client/news')
      .then(response => {
        this.setState({ news: response.data })
      console.log(response.data)
      })
      .catch((error) => {
        console.log(error);
      })
      axios.get('http://localhost:4000/client/user/')
    .then(response => {
      if (response.data.length > 0) {
        this.setState({
          users: response.data.map(user => user.name),
          designer: response.data[0].name
        })
      }
    })
    .catch((error) => {
      console.log(error);
    })

  }
  newsFeed() {
    return this.state.news.map(currentnews => {
      return <News news={currentnews} key={currentnews._id}/>;
    })
  }
  myFunction1() {
    var x = document.getElementById('Demo1');
    if (x.className.indexOf("w3-show") === -1) {
      x.className += " w3-show";
      x.previousElementSibling.className += " bg-info text-white";
    } else { 
      x.className = x.className.replace("w3-show", "");
      x.previousElementSibling.className = 
      x.previousElementSibling.className.replace(" bg-info text-white", "");
    }
  }
  myFunction2() {
    var x = document.getElementById('Demo2');
    if (x.className.indexOf("w3-show") === -1) {
      x.className += " w3-show";
      x.previousElementSibling.className += " bg-info text-white";
    } else { 
      x.className = x.className.replace("w3-show", "");
      x.previousElementSibling.className = 
      x.previousElementSibling.className.replace(" bg-info text-white", "");
    }
  }
  myFunction3() {
    var x = document.getElementById('Demo3');
    if (x.className.indexOf("w3-show") === -1) {
      x.className += " w3-show";
      x.previousElementSibling.className += " bg-info text-white";
    } else { 
      x.className = x.className.replace("w3-show", "");
      x.previousElementSibling.className = 
      x.previousElementSibling.className.replace(" bg-info text-white", "");
    }
  }
  style={
    marginTop:'80px'
  }
  logoStyle={
    width:'60px'
  }
  render(){
    const loginRegLink=(
      <div class="row mt-5">
  <div class="col-md-6 m-auto">
    <div class="card card-body text-center">
      <h1><i class="fa fa-home fa-3x"></i></h1>
      <h4>Welcome to Max<sup>2</sup></h4>
      <p>Create an account or login</p>
      <Link to="/register" class="btn btn-primary btn-block mb-2"
        >Register</Link>
      <Link to="/login" class="btn btn-secondary btn-block">Login</Link>
    </div>
  </div>
</div>

    )
    const clientLink=(
      <div className="w3-container w3-content m-top" style={this.style}>
      <div className="w3-row">
        <div className="w3-col m3">
          <div className="w3-card w3-round w3-white">
            <div className="w3-container">
             <h4 className="w3-center">My Profile</h4>
             <p className="w3-center"><img src="./logo.png" className="w3-circle" alt="Avatar"/></p>
             <hr/>
             <p><i className="fa fa-pencil fa-fw w3-margin-right text-info"></i> Designer, UI</p>
             <p><i className="fa fa-home fa-fw w3-margin-right text-info"></i> London, UK</p>
             <p><i className="fa fa-birthday-cake fa-fw w3-margin-right text-info"></i> April 1, 1988</p>
            </div>
          </div>
          <br/>
          
          
          
          <br/>
          
          
        
        </div>
        
        <div className="w3-col m7">
        
          <div className="w3-row-padding">
            <div className="w3-col m12">
              <div className="w3-card w3-round w3-white">
                <div className="w3-container w3-padding">
                  <h2 className="w3-opacity w3-center">Max<sup>2</sup></h2>
                </div>
              </div>
            </div>
          </div>
          
          <React.Fragment><br/>
          { this.newsFeed() } 
          </React.Fragment>
          <br/>
          
          
          </div>
          <div className="w3-col m2">
          <div className="w3-card w3-round w3-white w3-center">
            <div className="w3-container">
              <p>Designers list:</p>
              <ul>
              {
                this.state.users.map(function(user) {
                  return <li 
                    key={user}
                    value={user}>{user}
                    </li>;
                })
              }
              </ul>
                
            </div>
          </div>
          
        </div>
        
        
          
        
      </div>
      
    </div>
    )
    return (
       
      <>
      {localStorage.clienttoken ? clientLink : loginRegLink}
      </>
    );}}





export default Home;

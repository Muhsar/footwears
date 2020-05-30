import React,{Component} from 'react'
import {login} from './UserFunctions'
import {Link} from 'react-router-dom'

class Login extends Component{
  constructor(){
    super()
    this.state={
      email:'',
      password:'',
    }
    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }
  onChange(e){
    this.setState({[e.target.name]:e.target.value})
  }
  onSubmit(e){
    e.preventDefault()
    const client ={
      email: this.state.email,
      password:this.state.password
    }
    login(client).then(res=>{
      if(res){
        this.props.history.push('/')
      }
    })
  }
  render(){
    return(
      <div class="row mt-5">
<div class="col-md-6 m-auto">
  <div class="card card-body">
    <h1 class="text-center mb-3"><i class="fas fa-sign-in-alt"></i> Login</h1>
  </div>
  <form noValidate onSubmit={this.onSubmit}>
    <div class="form-group">
      <label for="email">Email</label>
      <input class="form-control"
       id="email"
        type="email"
         name="email"
          placeholder="Enter Email"
          value={this.state.email}
          onChange={this.onChange}/>
    </div>
    <div class="form-group">
      <label for="password">Password</label>
      <input class="form-control"
       id="password"
        type="password"
         name="password"
          placeholder="Create Password"
          value={this.state.password}
          onChange={this.onChange}/>
    </div>
    <button class="btn btn-primary btn-block" type="submit" value="Register">Login →</button>
  </form>
  <p class="lead mt-4">No Account? <Link to="/register">Register</Link></p>
</div>
</div>
    )
  }
}
export default Login
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import jwt_decode from 'jwt-decode'
axios.interceptors.request.use(function (config) {
  const token = localStorage.clienttoken;
  config.headers.Authorization =  token;

  return config;
});
axios.defaults.headers.common['Authorization'] = localStorage.clienttoken
const Order = props => (
  <tr >
  <td>
  {props.order.name}</td>
  <td>{props.order.email}</td>
  <td>{props.order.particular}</td>
  <td>{props.order.pairs}</td>
  <td>{props.order.sole} Size: {props.order.size}</td>
  <td className='bg-muted text-muted'>{props.order.status} {props.order.progress} complete 
  <span className="spinner-grow spinner-grow-sm text-muted"/>
  </td>
  </tr>

)

export default class OrderList extends Component {
  constructor() {
    super();
    this.state = {orders: [],
    name:[]};
  }

  componentDidMount() {
    axios.interceptors.request.use(function (config) {
  const token = localStorage.clienttoken;
  config.headers.Authorization =  token;

  return config;
});
axios.defaults.headers.common['Authorization'] = localStorage.clienttoken
    const token = localStorage.clienttoken
    const decode = jwt_decode(token)
    this.setState({
      // name: [decode.name],
      // email: decode.email,
      // id:decode._id,
      // token:token
  })
  console.log(localStorage.clienttoken)
    axios.get('http://localhost:4000/client/order?'+localStorage.clienttoken)
      .then(response => {
        this.setState({ orders: response.data,
        name:response.data.name })
        if (response.data.map(order=>order.email)==decode.email){
          
          console.log(response.data[0].email)
        }else{
          console.log(response.data[0].name)

        }
    })
      .catch((error) => {
        console.log(error);
      })
  }
  orderList() {
    return this.state.orders.map(currentorder => {
      return <Order order={currentorder} key={currentorder._id}/>;
    })
  }
  style={
    color:'black'
  }
  closeModal(){
    document.getElementById('order').style.display='none'
  }
  render() {
    return (
      <div className="w3-modal" id="order" style={this.style} >
      <div className='w3-modal-content w3-card-4 w3-animate-zoom'>
    <div className='container-fluid' id='myDiv'>
    <br/>
    <span onClick={this.closeModal} title='Close' className="w3-button w3-xlarge w3-transparent w3-display-topright">×</span>
        <h3>Orders</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Type</th>
              <th>Pairs</th>
              <th>Size</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            { this.orderList() }
            <tr><td>{this.state.name}</td></tr>
          </tbody>
          </table>
      </div>
      </div>
      </div>
    )
  }
  getClasses=()=>{
    let classes = 'table-'
    classes += this.state.progress === "100%" ? 'sucess' : ''||
    "80%" ? 'primary' : ''||
    "60%" ? 'info' : ''||
    "40%" ? 'warning' : ''||
    "20%" ? 'danger' : ''
    return classes
  }
}

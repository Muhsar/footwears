import React, { Component } from 'react';
import axios from 'axios';
import "react-datepicker/dist/react-datepicker.css";
import jwt_decode from 'jwt-decode'
axios.interceptors.request.use(function (config) {
  const token = localStorage.clienttoken;
  config.headers.Authorization =  token;

  return config;
});
axios.defaults.headers.common['Authorization'] = localStorage.clienttoken
export default class Form extends Component {
  constructor(props) {
    super(props);

    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangeParticular = this.onChangeParticular.bind(this);
    this.onChangePairs = this.onChangePairs.bind(this);
    this.onChangeSize = this.onChangeSize.bind(this);
    this.onChangeDesigner = this.onChangeDesigner.bind(this);
    this.onChangeBrand = this.onChangeBrand.bind(this);
    this.onChangeSole = this.onChangeSole.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      name: '',
      email: '',
      particular: '',
      pairs: 0,
      size: 0,
      designer: '',
      brand: '',
      sole: '',
      description: '',
      progress:'0%',
      status:'untouched',
      price:'',
      users:[]
    }
  }

  
  onChangeName(e) {
    this.setState({
      name: e.target.value
    })
  }
  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    })
  }
  onChangeParticular(e) {
    this.setState({
      particular: e.target.value
    })
  }
  onChangePairs(e) {
    this.setState({
      pairs: e.target.value
    })
  }
  onChangeSize(e) {
    this.setState({
      size: e.target.value
    })
  }
  onChangeDesigner(e) {
    this.setState({
      designer: e.target.value
    })
  }
  onChangeBrand(e) {
    this.setState({
      brand: e.target.value
    })
  }
  onChangeSole(e) {
    this.setState({
      sole: e.target.value
    })
  }
  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    })
  }


  onSubmit(e) {
    e.preventDefault();
    const token = localStorage.clienttoken
    const decode = jwt_decode(token)
    this.setState({
        name: decode.name,
        email: decode.email
    })
    // if(this.state.sole==='single'){
    //   this.setState({price:})
    // }
    const order = {
      name: decode.name,
      email: decode.email,
      particular: this.state.particular,
      pairs: this.state.pairs,
      size: this.state.size,
      designer: this.state.designer,
      brand: this.state.brand,
      sole: this.state.sole,
      description: this.state.description,
      progress:this.state.progress,
      status:this.state.status,
      
    }

// console.log(order)
    axios.post('http://localhost:4000/client/order', order)
      .then(res => console.log(res.data));

    window.location = '/'
  };
closeModal(){
  document.getElementById('form').style.display='none'
}
style={
  color:'black'
}
componentDidMount() {
  axios.interceptors.request.use(function (config) {
    const token = localStorage.clienttoken;
    config.headers.Authorization =  token;
  
    return config;
  });
  axios.defaults.headers.common['Authorization'] = localStorage.clienttoken
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
  render() {
    return (
      <div className="w3-modal" id="form" style={this.style} >
      <div className='w3-modal-content w3-card-4 w3-animate-zoom'>
    <div className='container-fluid' id='myDiv'>
    <br/>
    <span onClick={this.closeModal} title='Close' className="w3-button w3-xlarge w3-transparent w3-display-topright">×</span> 
    <form onSubmit={this.onSubmit}>
    <div className="w3-section">
    <h3>Order Your FootWear</h3>
          
          <label>Shoe Type: </label>
          <select
              required
              className="form-control"
              value={this.state.particular}
              onChange={this.onChangeParticular}>
              <option value=''></option>
              <option value='Cover'>Cover</option>
              <option value='Crossing'>Crossing</option>
              <option value='Sandals'>Sandals</option>
              <option value='Thong'>Thong</option>
              </select>
              <label>How many Pair(s) </label>
          <input type='number'
              required
              className="form-control"
              value={this.state.pairs}
              onChange={this.onChangePairs}/>
          <label>Shoe Size </label>
          <input type='number'
              required
              className="form-control"
              value={this.state.size}
              onChange={this.onChangeSize}/>
                <label>Designer: </label>
                <select ref="userInput"
              required
              className="form-control"
              value={this.state.designer}
              onChange={this.onChangeDesigner}>
              {
                this.state.users.map(function(user) {
                  return <option 
                    key={user}
                    value={user}>{user}
                    </option>;
                })
              }
              </select>
              <div className='alert alert-info'><strong>Note! </strong>
               the designer of your choice will be the one working on your footwear</div>
                <label>Brand: </label>
                <select
                    required
                    className="form-control"
                    value={this.state.brand}
                    onChange={this.onChangeBrand}>
                    <option value=''></option>
                    <option value='Burberry'>Burberry</option>
                    <option value='Louis Vuitton'>Louis Vuitton</option>
                    <option value='Fendi'>Fendi</option>
                    </select>
                <label>Sole Type: </label>
                <select
                    required
                    className="form-control"
                    value={this.state.sole}
                    onChange={this.onChangeSole}>
                    <option value=''></option>
                    <option value='Single'>Single</option>
                    <option value='Double'>Double</option>
                    </select>
          <label>Description: </label>
          <textarea
              className="form-control"
              value={this.state.description}
              onChange={this.onChangeDescription}
              />
              <br/>
          <input type="submit" value="Order" className="btn btn-info btn-block" />
          </div>
          </form>
    </div>
    </div>
    </div>
    )
  }
}
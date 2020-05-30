import React,{Component} from 'react'
import jwt_decode from 'jwt-decode'

class Profile extends Component {
    constructor(){
        super()
        this.state = {
            name:'',
            email:'',
            id:"",
            token:''
          }
    }
    componentDidMount(){
        const token = localStorage.clienttoken
        const decode = jwt_decode(token)
        this.setState({
            name: decode.name,
            email: decode.email,
            id:decode._id,
            token:token
        })
    }
    render() { 
        return (  
            <div className="container">
                <div className="jumbotron mt-5">
                    <div className="col-sm-8 mx-auto">
                        <h1 className="text-center">Profile</h1>
                    </div>
                    <table className="table table-borderless col-md-6 mx-auto">
                    <tbody>    
                    <tr>
                            <td>Name</td>
                            <td>{this.state.name}</td>
                        </tr>
                        <tr>
                            <td>Email</td>
                            <td>{this.state.email}</td>
                        </tr>
                        <tr>
                            <td>Id</td>
                            <td>{this.state.id}</td>
                        </tr>
                        <tr>
                            <td>Token</td>
                            <td>{this.state.token}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}
 
export default Profile;
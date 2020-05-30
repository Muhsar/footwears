import React,{Component} from 'react'
import '../css/grayscale.min.css'
import {Link} from 'react-router-dom'
class Slash extends Component {
    render() { 
        return (  
            <header className="masthead">
    <div className="container d-flex h-100 align-items-center">
      <div className="mx-auto text-center">
        <h1 className="mx-auto my-0 text-uppercase">Max<sup className='text-muted'>2</sup></h1>
        <Link to="/login" className="btn btn-primary js-scroll-trigger">Get Started</Link>
      </div>
    </div>
  </header>
        );
    }
}
 
export default Slash;
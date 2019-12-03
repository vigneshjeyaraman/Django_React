import React,{ Component } from 'react'
import { Zoom } from 'react-slideshow-image';
import Navbar from './Navbar'
import Mydashboard from './Mydashboard'

/*
Dashboard component is yet another important component here inside render we have seen
if localstorage has username key it means user is already logged into our app so redirect them to
Mydashboard else this will load a dashboard with a slider and footer showing basic form to submit query.
*/
const zoomOutProperties = {
    duration: 5000,
    transitionDuration: 500,
    infinite: true,
    indicators: true,
    scale: 0.4,
    arrows: true
  }
  const images = [
    './images/slider-1.png',
    './images/slider-2.png',
    './images/slider-3.png',
    './images/slider-4.png'
  ];


class Dashboard extends Component {
    handleClick = (e) =>{
        alert('Will get back to you soon')
    }
    render(){
        if(localStorage.getItem('username')){
            return(
                <div>
                    <Mydashboard />
                </div>
            )
        }else{
            return(
                <div className="container">
                    <Navbar />
                    <Zoom {...zoomOutProperties}>
                        {
                        images.map((each, index) => <img key={index} style={{width: "100%",height:"100%"}} src={each} alt='Slider'/>)
                        }
                    </Zoom>
                    <footer class="page-footer">
                        <div class="container">
                            <div class="row">
                                <div class="col l6 s12">
                                    <h5 class="white-text">Contact Us</h5>
                                    <p class="grey-text text-lighten-4">For any query kindly mail us on shiment@shiment.com</p>
                                </div>
                                <div class="col l4 offset-l2 s12">
                                    <h5 class="white-text">Links</h5>
                                    <form class="col s12" onSubmit = {this.handleClick}>
                                        <div class="row">
                                            <div class="input-field">
                                                <input placeholder="Email" id="email" type="email" class="validate" />
                                                <input placeholder="Your query" id="query" type="text" class="validate" />
                                                <button className='btn submit'>Submit</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div class="footer-copyright">
                            <div class="container">
                            © 2019 Copyright Text
                            </div>
                        </div>
                   </footer>
                </div>
            )
        }
        
    
}
}
export default Dashboard
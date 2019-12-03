import React from 'react'
import { NavLink } from 'react-router-dom'
/*
Navbar is the important component. It will link all the other component like home, about, login and
signup.
*/
const Navbar = () => {
    return (
        <nav>
                <div className="navbar-material">
                    <div className="nav-wrapper">
                        <a href="/" className="brand-logo"><img className="circle responsive-img" src={'./images/shipment.jpeg'} alt="LOGO"/></a>
                        <ul id="nav-mobile" className="right hide-on-med-and-down">
                            <li><NavLink to='/Home'>Home</NavLink></li>
                            <li><NavLink to="/About">Aboutus</NavLink></li>
                            <li><NavLink to="/Login">Login</NavLink></li>
                            <li><NavLink to="/Signup">Signup</NavLink></li>
                        </ul>
                    </div>
                </div>
            </nav>
    )
}

export default Navbar
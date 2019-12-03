import React from 'react'
import Navbar from './Navbar'
/*
About component will have plain text.
*/
const About = () => {
    return(
        <div className='container col s12 m2'>
            <Navbar />
            <p className="z-depth-3">Shipment is an American multinational technology company based in Seattle, Washington, that focuses on e-commerce, cloud computing, digital streaming, and artificial intelligence. It is considered one of the Big Four technology companies along with Google, Apple, and Facebook.</p>
        </div>
    )
}

export default About
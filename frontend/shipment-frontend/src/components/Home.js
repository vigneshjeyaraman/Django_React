import React from 'react'
import Navbar from './Navbar'
/*
Home component will just show the plain text.
*/
const Home = () => {
    return(
        <div className='container col s12 m2'>
            <Navbar />
            <p className="z-depth-3">Freight transport is the physical process of transporting commodities and merchandise goods and cargo. The term shipping originally referred to transport by sea but in American English, it has been extended to refer to transport by land or air as well.</p>
        </div>
    )
}

export default Home
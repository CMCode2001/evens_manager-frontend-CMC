import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PreEvens from '../components/PreEvens';

function Events(props) {
    return (
        <div>
            <Navbar /> 

            <PreEvens />
            <Footer />
        </div>
    );
}

export default Events;
import React from 'react';
import Navbar from '../components/Navbar';
import MyEvents from '../components/MyEvents';
import Footer from '../components/Footer';

const ListEvents = () => {
    return (
        <div>
            <Navbar />
            <MyEvents />
            <Footer />
        </div>
    );
};

export default ListEvents;
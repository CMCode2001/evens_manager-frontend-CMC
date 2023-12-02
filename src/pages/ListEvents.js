import React from 'react';
import Navbar from '../components/Navbar';
import MyEvents from '../components/MyEvents';
import Footer from '../components/Footer';

const ListEvents = () => {
    return (
        <div>
            <Navbar />
            <br/>
                <h1 id="special1"> Mes Evènements  </h1>
            <br/>

            <MyEvents />
            <Footer />
        </div>
    );
};

export default ListEvents;
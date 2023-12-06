import React from 'react';
import Navbar from '../components/Navbar';
import MyEvents from '../components/MyEvents';
import Footer from '../components/Footer';
import toDoList from "../assets/img/avatar/to-do-list.png"

const ListEvents = () => {
    return (
        <div>
            <Navbar />
            <br/>
                <h1 id="special1"> <img src={toDoList} width={40} height={40}/> Mes Evènements  </h1>
            <br/>

            <MyEvents />
            <Footer />
        </div>
    );
};

export default ListEvents;
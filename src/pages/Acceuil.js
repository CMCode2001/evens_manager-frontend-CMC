import React from 'react';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FirstSection from '../components/FirstSection';
import SecondeSection from '../components/SecondeSection';
import ThirdSection from '../components/ThirdSection';
import RecupereInfo from '../components/RecupereInfo';


const Acceuil = () => {
    return ( 
        <div>
            <Navbar />
            <FirstSection />  
            <RecupereInfo/>
            <ThirdSection />   
            <SecondeSection />    
            <Footer />
       
        </div>
    );
}
export default Acceuil;
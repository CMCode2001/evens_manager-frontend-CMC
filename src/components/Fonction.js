import React from 'react';
import { Link } from 'react-router-dom';

const Fonction = (props) => {
    return (
        <div className=" rounded service-item" >
        <div className="service-content">
            <Link to="/prestataires" className="service-content-icon">
            <h6 className="animation">{props.serviceName}</h6>
            </Link>
        </div>
        </div>  
    );
};

export default Fonction;
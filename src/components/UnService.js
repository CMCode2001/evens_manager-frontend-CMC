import React from 'react';
import { Link } from 'react-router-dom';
import '../css/style2.css';

const UnService = (props) => {
  return (
    <div className=" rounded service-item" >
      <div className="service-content">
        <Link to="/prestataires" className="service-content-icon">
          <img src={props.serviceImg} width="50" height="50" alt={props.serviceAlt} />
          <h6 className="animation">{props.serviceName}</h6>
        </Link>
      </div>
    </div>
  );
}

export default UnService;
import React from 'react';
import '../css/style2.css';
import { FaLocationDot } from "react-icons/fa6";
import { BsPersonWorkspace } from "react-icons/bs";
import AddPrestataire from './AddPrestataire';

const RowPrestataire = (props) => {
    return (
        <div>
            <div className="ligne">
                <img className="imagep" src={props.imagep} alt={props.altp} />
                <div className="dessus">
                    <h6><BsPersonWorkspace /> {props.fonction}</h6>
                    <h5>{props.nom}</h5>
                    <p>{props.desc}</p>
                </div>
                <div className="dessus" style={{marginTop:"30px"}}>
                    <h6>{props.call}</h6>
                    <h6>{props.mail}</h6>
                    <h6 style={{marginTop:"40px",color:"red"}}>{props.tarif}</h6>
                </div>
                <div>
                    <p><FaLocationDot />{props.adresse}</p>
                </div>
            </div>
        </div>
    );
};

export default RowPrestataire;
import { hover } from '@testing-library/user-event/dist/hover';
import React from 'react';
import { BsCalendar2Date } from "react-icons/bs";
import { FaSearch,FaRegCommentAlt } from "react-icons/fa";
import { LuPartyPopper } from "react-icons/lu";
import { Link }  from 'react-router-dom';

const ThirdSection = () => {
    return (
        <div className="displayB">
            <h1 className="texte-M">Que voulez vous faire ? </h1>
            <center>
                <div className="displayS" >
                    <div className="box">
                        <Link to="/prestataires" >
                            <BsCalendar2Date  style={{width:"2.5rem", height:"2.5rem", color: "#D4A762"}}/>
                        </Link>
                            <h6 >Plannifiez vos événements</h6>
                            <p>Créez des événements en quelques clics tout en choisissant les différents prestataires dont vous avez besoin:</p>
                    
                    </div>
                    <div className="box">
                        <Link to="/prestataires" >
                            <LuPartyPopper style={{width:"2.5rem", height:"2.5rem", color: "#D4A762"}}/>
                        </Link>
                            <h6 >Gérer vos événements</h6>
                            <p>Essayez de modifier chaque événement que vous avez créé si besoin. Comparez vos événements précédents:</p>
                    </div>
                </div>
                <div className="displayS" >
                    <div className="box">
                        <Link to="/prestataires" >
                            <FaSearch style={{width:"2.5rem", height:"2.5rem", color: "#D4A762"}}/>
                        </Link>
                            <h6 >Trouvez des prestataires</h6>
                            <p>Recherchez tous les prestataires en fonction de leurs tarifs, leurs notes mais aussi en fonctionde leurs disponibilités:</p>

                    </div>
                    <div className="box">
                        <Link to="/prestataires" >
                            <FaRegCommentAlt style={{width:"2.5rem", height:"2.5rem", color: "#D4A762"}}/>
                        </Link>
                            <h6 >Notez nos prestataires</h6>
                            <p>Donnez votre avis sur les prestations des prestataires que vous avez déjà engager dans une de vos événements:</p>
                    </div>
                </div>
                <div className="box">
                        <Link to="/prestataires" >
                            <BsCalendar2Date style={{width:"2.5rem", height:"2.5rem", color: "#D4A762"}}/>
                        </Link>
                            <h6 >Notez nos prestataires</h6>
                            <p>Donnez votre avis sur les prestations des prestataires que vous avez déjà engager dans une de vos événements:</p> 
                    </div>
            </center>
        </div>
    );
};

export default ThirdSection;
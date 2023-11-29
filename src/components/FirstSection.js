import React from 'react';
import hero from "../assets/img/hero.png";
import "../css/bootstrap.min.css";
import "../css/style.css";
import { Link } from 'react-router-dom';

const HeroSection = () => {
    return (
        <div className="container-fluid bg-light py-6 mt-0">
            <div className="container">
                <div className="row g-5 align-items-center">
                    <div className="col-lg-7 col-md-12">
                        <small className="d-inline-block fw-bold text-dark text-uppercase bg-light border border-primary rounded-pill px-4 py-1 mb-4 animated bounceInDown">Welcome to Sama Bëss 
                        </small>
                        <h1 className="display-1 mb-4 animated bounceInDown">
                           
                        Dälal ak Jàmm ći  
                        <text className="text-primary"> <br/>Sama </text> Bëss 
                        <p className='boul-lale'>
                            Vous avez un évènement à célébrer, vous voulez rendre agréable votre cérémonie. 
                            Donnez goût à votre cérémonie en bénéficiant des services de qualité, d'une équipe de professionnels. <br/>        
                            <i>
                            <b>Bienvenue dans Sama Bëss, l'appli qui rassemble ! </b>
                            </i>
                        </p>
                        </h1>                      
                          <Link to ="/login" className="btn btn-primary border-0 rounded-pill py-3 px-4 px-md-5 me-4 animated bounceInLeft">
                            Je suis Client !
                        </Link>
                        <Link  to ="/login" className="btn btn-primary border-0 rounded-pill py-3 px-4 px-md-5 animated bounceInLeft">Je suis Prestataire !</Link>
                    </div>
                    <div className="col-lg-5 col-md-12">
                        <img src={hero} className="img-fluid rounded animated zoomIn" alt="" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HeroSection;

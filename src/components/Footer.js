import React from 'react';
import "../css/bootstrap.min.css";
import "../css/style.css";
import menu1 from "../assets/img/menu1.jpg"
import menu2 from "../assets/img/menu2.jpg"
import menu3 from "../assets/img/menu3.jpg"
import menu4 from "../assets/img/menu4.jpg"
import menu5 from "../assets/img/menu5.jpg"
import menu6 from "../assets/img/menu6.jpg"
import { SiSpringboot, SiReact, SiGithub, SiMariadb } from "react-icons/si";

import { FaFacebookF,FaTwitter,FaInstagram,FaLinkedin, FaGithub, FaBootstrap } from "react-icons/fa6";
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <div className="footer-back">
            <div className="container-fluid footer py-6 my-6 mb-0 bg-light wow bounceInUp " data-wow-delay="0.1s">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3 col-md-6">
                            <div className="footer-item">
                                <h1 className="text-primary">Sama <text className="text-dark">Bëss</text></h1>
                                <p className="lh-lg mb-4"> <b>Sama Bëss</b> est la première plateforme de son genre dans l’événementiel qui a pour vocation de regrouper l’ensemble des types de prestation lié à l’organisation d’un événement au SÉNÉGAL …</p>
                                <div className="footer-icon d-flex">
                                    <Link to="#" className="btn btn-primary btn-sm-square me-2 rounded-circle" href="">
                                        <FaFacebookF />
                                    </Link>
                                    <Link className="btn btn-primary btn-sm-square me-2 rounded-circle" href="">
                                    <FaTwitter />
                                        </Link>
                                    <Link to="#" className="btn btn-primary btn-sm-square me-2 rounded-circle">
                                        <FaInstagram />
                                        </Link>
                                    <Link to="#" className="btn btn-primary btn-sm-square rounded-circle">
                                        <FaLinkedin />
                                    </Link> &nbsp;&nbsp;
                                    <Link to="#" className="btn btn-primary btn-sm-square rounded-circle">
                                        <FaGithub />
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <div className="footer-item">
                                <h4 className="mb-4">Nos références !</h4>
                                <div className="d-flex flex-column align-items-start">
                                    <Link to ="#" className="text-body mb-3"  ><i className="fa fa-check text-primary me-2"></i>ReactBootstrap <FaBootstrap/></Link> 
                                    <Link to ="#" className="text-body mb-3"  ><i className="fa fa-check text-primary me-2"></i>Spring initializer <SiSpringboot/> </Link>
                                    <Link to ="#" className="text-body mb-3"  ><i className="fa fa-check text-primary me-2"></i>ReactJs <SiReact/> </Link>
                                    <Link to ="#" className="text-body mb-3"  ><i className="fa fa-check text-primary me-2"></i> W3school </Link>
                                    <Link to ="#" className="text-body mb-3"  ><i className="fa fa-check text-primary me-2"></i>Github <SiGithub/> </Link>
                                    <Link to ="#" className="text-body mb-3"  ><i className="fa fa-check text-primary me-2"></i>MariaDB <SiMariadb/> </Link>


                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <div className="footer-item">
                                <h4 className="mb-4">Contacter-nous !</h4>
                                <div className="d-flex flex-column align-items-start">
                                    <p><i className="fa fa-map-marker-alt text-primary me-2"></i>  Dakar, Senegal</p>
                                    <p><i className="fa fa-phone-alt text-primary me-2"></i> +221 33 000 00 00</p>
                                    <p><i className="fas fa-envelope text-primary me-2"></i> smabess@gmail.com</p>
                                    <p><i className="fa fa-clock text-primary me-2"></i> 24/24 Hours Service</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <div className="footer-item">
                                <h4 className="mb-4">Social Gallery</h4>
                                <div className="row g-2">
                                    <div className="col-4">
                                        <img src={menu1} className="img-fluid rounded-circle border border-primary p-2" alt="" />
                                    </div>
                                    <div className="col-4">
                                        <img src={menu2} className="img-fluid rounded-circle border border-primary p-2" alt="" />
                                    </div>
                                    <div className="col-4">
                                        <img src={menu3} className="img-fluid rounded-circle border border-primary p-2" alt="" />
                                    </div>
                                    <div className="col-4">
                                        <img src={menu4} className="img-fluid rounded-circle border border-primary p-2" alt="" />
                                    </div>
                                    <div className="col-4">
                                        <img src={menu5} className="img-fluid rounded-circle border border-primary p-2" alt="" />
                                    </div>
                                    <div className="col-4">
                                        <img src={menu6} className="img-fluid rounded-circle border border-primary p-2" alt="" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container-fluid copyright bg-dark py-4">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
                            <span className="text-light">
                                <Link to="/" className="text-couleur">
                                    <i className="fas fa-copyright text-light me-2">
                                    </i>Sama Bëss
                                </Link>
                                , Tous droits réservés.
                            </span>
                        </div>
                        <div className="col-md-6 my-auto text-center text-md-end text-white">
                        <span className="text-couleur">
                            Design by &nbsp;&nbsp;&nbsp;&nbsp;
                        </span>
                             @author: CMC/BFDC/PapaFaly666/Pegasus77/NiakoDev
                        </div>
                    </div>
                </div>
            </div>

            <Link to="#" className="btn btn-md-square btn-primary rounded-circle back-to-top"><i className="fa fa-arrow-up"></i></Link>

        </div>
    );
}

export default Footer;

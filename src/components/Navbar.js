import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import "../css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.bundle';
import "../css/style.css";
import { FaUserCircle } from "react-icons/fa";
import { accountService } from '../_service/account.service';
import FadeMenu from './FadeMenu';



const Navbar = () => {
    

    

    // Utilisez useEffect pour mettre à jour le nom d'utilisateur au chargement du composant
    const token = accountService.getToken("jwt");
    // useEffect(() => {
    //     if (typeof token === 'string') {
    //         setClient(jwtDecode(token));
    //         console.log(client.sub)
    //     } else {
    //         console.error('Le token n\'est pas une chaîne valide.');
    //     }

    // }, []);
    return (
        <div className="container-fluid nav-bar" id='fixedNavbar'>
            <div className="container">
                <nav className="navbar navbar-light navbar-expand-lg py-4">
                    {(token!==null)?(
                        <>
                            <Link to="/" className="navbar-brand">
                                <h1 className="text-primary fw-bold mb-0">
                                    Sama <text className="text-dark">Bëss</text>
                                </h1>
                            </Link>
                            <button className="navbar-toggler py-2 px-3" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
                                <span className="fa fa-bars text-primary"></span>
                            </button>
                            <div className="collapse navbar-collapse" id="navbarCollapse">
                                <div className="navbar-nav mx-auto">
                                    <NavLink to="/" className="nav-item nav-link">Accueil</NavLink>
                                    <NavLink to="/events" className="nav-item nav-link">Events</NavLink>
                                    <NavLink to="/prestataires" className="nav-item nav-link">Prestataires</NavLink>
                                    <NavLink to="/about" className="nav-item nav-link">A propos</NavLink>
                                </div>
                            </div>
                            {/* //=============PRECUPERATION USERNAME USER======================// */}

                            <FadeMenu />

                            {/* <Link to="/login">
                                <button className="btn-search btn btn-primary btn-md-square me-4 rounded-circle d-lg-inline-flex">
                                    <FaUserCircle />
                                </button>
                            </Link> */}
                            
                        </>
                    ) : (
                        <>
                            
                            <Link to="/" className="navbar-brand">
                                <h1 className="text-primary fw-bold mb-0">
                                    Sama <text className="text-dark">Bëss</text>
                                </h1>
                            </Link>
                            <button className="navbar-toggler py-2 px-3" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
                                <span className="fa fa-bars text-primary"></span>
                            </button>
                            <div className="collapse navbar-collapse" id="navbarCollapse">
                                <div className="navbar-nav mx-auto">
                                    <NavLink to="/" className="nav-item nav-link">Accueil</NavLink>
                                    <NavLink to="/events" className="nav-item nav-link">Events</NavLink>
                                    <NavLink to="/prestataires" className="nav-item nav-link">Prestataires</NavLink>
                                    <NavLink to="/about" className="nav-item nav-link">A propos</NavLink>
                                </div>
                            </div>
                            <Link to="/login">
                                <button className="btn-search btn btn-primary btn-md-square me-4 rounded-circle d-lg-inline-flex">
                                    <FaUserCircle />
                                </button>
                            </Link>    
                            {console.log(token)}
                        </>
                    )}
                </nav>
            </div>
        </div>
    );
}

export default Navbar;
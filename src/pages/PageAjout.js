import React, { useState, useEffect } from 'react';
import { SERVER_URL } from '../constants';
import Fab from '@mui/material/Fab';
import NavigationIcon from '@mui/icons-material/Navigation';
import { Link } from 'react-router-dom';
import { accountService } from '../_service/account.service';
import { jwtDecode } from 'jwt-decode';
import sem from "../assets/img/seminaire.jpg";
import Search from '../components/Search';
import AddPrestataire from '../components/AddPrestataire';
import { FaLocationDot } from 'react-icons/fa6';
import { BsPersonWorkspace } from 'react-icons/bs';
import { Icon } from '@mui/material';

const PageAjout = (props) => {
    const [prestataires, setPrestataires] = useState([]);
    const [clientRole, setClientRole] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(accountService.isAuthenticated());
    const [data,setData] = useState([]);

    useEffect(() => {
        const isAuthenticated = accountService.isAuthenticated();
        setIsLoggedIn(isAuthenticated);
        if (isAuthenticated) {
            fetchPrestataires();
        }
    }, [isLoggedIn]);

    const isLogin = accountService.getToken("jwt");

    const fetchPrestataires = () => {
        const token = accountService.getToken("jwt");
        fetch(SERVER_URL + "event/prestataires", {
            headers: { Authorization: token },
        })
            .then(response => response.json())
            .then(data => setPrestataires(data._embedded.prestataires))
            .catch(err => console.error(err));
    };

    const donnes=(ide,idp) => {
        const d = {
            evenement:{id:ide},
            prestataire:{id:idp},
            valide:"en attente"
        }
        return d;
    };

    const ajoutPrestataire =(ide,idp)=>{
        const token = accountService.getToken("jwt");
        fetch(SERVER_URL+`event/prestations`,
        {   
            method: "POST",
            headers:{
                Authorization: token,
                'Content-Type': 'application/json;charset=UTF-8'
            },
            body: JSON.stringify(donnes(ide,idp))
        })
        .then(response=>{
            if (response.ok) {
                alert("Prestataire ajouté avec succcés!")  
            }else{
                alert("Un problème est survenu ! Veuillez reéssayer :(");
            }
        })
        .catch(err => console.error(err));
    }

    return (
        <div>
            <h1 style={{ margin: "5rem", textAlign: "center" }}>
                Nos Prestataires
                <div>
                    {!clientRole && (
                        <Link to='/dashbordprest'>
                            <Fab variant="extended" id='special-btn'>
                                <NavigationIcon sx={{ mr: 1 }} />
                                Mon tableau de bord administrateur
                            </Fab>
                        </Link>
                    )}
                </div>
                <Search />
            </h1>
            {prestataires.map(pres => {
                console.log(pres.image);
                return (
                    <div>
                    <div className="ligne">
                        <img className="imagep" src={sem} alt={pres.altp} />
                        <div className="dessus">
                            <h6><BsPersonWorkspace /> {pres.fonction}</h6>
                            <h5>{pres.nomEntreprise}</h5>
                            <p>{pres.desEntreprise}</p>
                        </div>
                        <div className="dessus" style={{marginTop:"30px"}}>
                            <h6>{pres.telephone}</h6>
                            <h6>{pres.email}</h6>
                            <h6 style={{marginTop:"40px",color:"red"}}>{pres.tarif}</h6>
                        </div>
                        <div>
                            <p><FaLocationDot />{pres.adresse}</p>
                            <button onClick={ajoutPrestataire(props.ide,pres.idp)}>
                                <Icon baseClassName="fas" className="fa-plus-circle" sx={{ fontSize: 30 }} />
                            </button>
                        </div>
                    </div>
                </div>
                );
            })}
        </div>
    );
};

export default PageAjout;
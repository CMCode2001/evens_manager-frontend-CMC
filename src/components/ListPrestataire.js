import React, { useState, useEffect } from 'react';
import RowPrestataire from './RowPrestataire';
import { SERVER_URL } from '../constants';
import Fab from '@mui/material/Fab';
import NavigationIcon from '@mui/icons-material/Navigation';
import { Link } from 'react-router-dom';
import { accountService } from '../_service/account.service';
import { jwtDecode } from 'jwt-decode';
import sem from "../assets/img/seminaire.jpg";
import Search from '../components/Search';

const ListPrestataire = (props) => {
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

    useEffect(() => {
        if (typeof isLogin === 'string') {
            const client = jwtDecode(isLogin);
            setClientRole(client.role === "CLIENT");
        } else {
            console.error('Le token n\'est pas une chaîne valide.');
        }
    }, [isLogin]);

    const fetchPrestataires = () => {
        const token = accountService.getToken("jwt");
        fetch(SERVER_URL + "event/prestataires", {
            headers: { Authorization: token },
        })
            .then(response => response.json())
            .then(data => setPrestataires(data._embedded.prestataires))
            .catch(err => console.error(err));
    };

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
                    <RowPrestataire
                        key={pres.id}
                        imagep={sem}
                        altp="pas d'image"
                        nom={pres.nomEntreprise}
                        fonction={pres.fonction}
                        call={pres.telephone}
                        mail={pres.email}
                        tarif={pres.tarif}
                        adresse={pres.adresse}
                        desc={pres.desEntreprise}
                    />
                );
            })}
        </div>
    );
};

export default ListPrestataire;

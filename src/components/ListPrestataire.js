import React, { useState, useEffect } from 'react';
import RowPrestataire from './RowPrestataire';
import { SERVER_URL } from '../constants';
import Fab from '@mui/material/Fab';
import NavigationIcon from '@mui/icons-material/Navigation';
import { Link } from 'react-router-dom';
import { accountService } from '../_service/account.service';
import { jwtDecode } from 'jwt-decode';
import sem from "../assets/img/seminaire.jpg";

import "../css/bootstrap.min.css";
import Form from 'react-bootstrap/Form';
import { FaSearch } from "react-icons/fa";
import '../css/style2.css';

// import Search from '../components/Search';


const ListPrestataire = (props) => {
    const [prestataires, setPrestataires] = useState([]);
    const [clientRole, setClientRole] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(accountService.isAuthenticated());

    const [query, setQuery] = useState('');
    const [searchTriggered, setSearchTriggered] = useState(false);

    const [data,setData] = useState([]);


    const handleChange = (event) => {
        event.preventDefault();
        setQuery(event.target.value);
    };

    const filterPrestataires = () => {
        return prestataires.filter(pres => pres.fonction.toLowerCase().includes(query.toLowerCase()));
    };

    const performSearch = () => {
        if (!query.trim()) {
            alert('Veuillez saisir quelque chose dans le champ de recherche.');
            return;
        }

        if (filterPrestataires().length === 0) {
            alert(`Aucun résultat trouvé pour la fonction : ${query}`);
        }

        setSearchTriggered(true); 
    };
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

    // const fetchPrestataires = () => {
    //     const token = accountService.getToken("jwt");
    //     fetch(SERVER_URL + "event/prestataires", {
    //         headers: { Authorization: token },
    //     })
    //         .then(response => response.json())
    //         .then(data => setPrestataires(data._embedded.prestataires))
    //         .catch(err => console.error(err));
    // };

    const fetchPrestataires = () => {
        const token = accountService.getToken("jwt");
        fetch(SERVER_URL+"event/prestataires", {
            headers: {Authorization: token},
        })
            .then(response => {
                if (response.status === 200) {
                    return response.json();    
                }
                return null;
            })
            .then(data => {
                setPrestataires(data._embedded.prestataires)
            })
            .catch(err => console.error(err));
            console.log(prestataires);
    };

    return (
        <div>
            <center>
                <div className="display">
                    <Form.Label className='search-label' htmlFor="inputPassword5">Recherche</Form.Label>
                    <Form.Control
                        type="text"
                        className='search'
                        placeholder="Recherche de prestataire"
                        value={query}
                        onChange={handleChange}
                    />
                    <button className="search-btn" onClick={performSearch}>
                        <FaSearch className='icon-search'/>
                    </button>
                </div>
            </center>
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

            </h1>
            {searchTriggered && filterPrestataires().map(pres => (
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
            ))}
        </div>
    );
};

export default ListPrestataire;

import React, { useState, useEffect } from 'react';
import { Autocomplete,InputAdornment,DialogContent,DialogActions,Dialog,TextField,Button } from '@mui/material';

import { FaPlus } from "react-icons/fa";
import { SERVER_URL } from '../constants';
import Fab from '@mui/material/Fab';
import NavigationIcon from '@mui/icons-material/Navigation';
import { Link } from 'react-router-dom';
import { accountService } from '../_service/account.service';
import { jwtDecode } from 'jwt-decode';
import sem from "../assets/img/seminaire.jpg";


import { FaLocationDot } from 'react-icons/fa6';
import { BsPersonWorkspace } from 'react-icons/bs';
import { Icon } from '@mui/material';
import '../css/style2.css';
// import animateur from '../assets/img/animateur.jpg';
// import securite from '../assets/img/securite.jpeg';
// import foto from '../assets/img/photographe2.jpg';
// import deco from '../assets/img/decorate.jpg';
// import art from '../assets/img/artiste.jpg';
// import traiteur from '../assets/img/traiteurAfricain.jpeg';
// import axios from 'axios';
import axios from 'axios';
import ListPrestataire from './ListPrestataire';
import { Clear } from '@mui/icons-material';
import PageAjout from '../pages/PageAjout';



const AddPrestataire = (props) => {

    const isLogin = accountService.getToken("jwt");
    const [prestataires, setPrestataires] = React.useState([]);
    const [open, setOpen] = React.useState(props.open);
    const [options, setOptions] = React.useState([
        {label:"", profile:"",name:""}
      ]);
    const [isLoggedIn, setIsLoggedIn] = useState(accountService.isAuthenticated());
    const [data,setData] = useState([]);
    const [clientRole, setClientRole] = useState(true)
    const [selectedPrestataire, setSelectedPrestataire] = useState(null);


    React.useEffect(()=>{
        fetchPrestataires();
    },[open]);

    const handleClose = () => {
      setOpen(false);
    };

    useEffect(() => {
        if (typeof isLogin === 'string') {
            const client = jwtDecode(isLogin);
            setClientRole(client.role === "CLIENT");
        } else {
            console.error('Le token n\'est pas une chaîne valide.');
        }
    }, [isLogin]);


    const handlePrestataireChange = (event, newValue) => {
        setSelectedPrestataire(newValue);
        console.log(selectedPrestataire);
    };

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
                display(data._embedded.prestataires)
            })
            .catch(err => console.error(err));
            console.log(prestataires);
    };

console.log(open);
    const donnes=(idp,ide) => {
        const d = {
            evenement:{id:ide},
            prestataire:{id:idp},
            valide:"en attente"
        }
        return d;
    };

    // const ajoutPrestataire =(ide,idp)=>{
    //     const token = accountService.getToken("jwt");
    //     fetch(SERVER_URL+`event/prestations`,
    //     {   
    //         method: "POST",
    //         headers:{
    //             Authorization: token,
    //             'Content-Type': 'application/json;charset=UTF-8'
    //         },
    //         body: JSON.stringify(donnes(idp,ide))
    //     })
    //     .then(response=>{
    //         if (response.ok) {
    //             alert("Prestataire ajouté avec succcés!")  
    //         }else{
    //             alert("Un problème est survenu ! Veuillez reéssayer :(");
    //         }
    //     })
    //     .catch(err => console.error(err));
    // };

    const getPrestataireIdFromUrl = (url) => {
        // Extraire l'ID du client à partir de l'URL
        const parts = url.split('/');
        return parts[parts.length - 1];
    };

    const ajoutPrestataire = (ide) => {
        // Assurez-vous qu'un prestataire est sélectionné
        if (!selectedPrestataire) {
          alert("Veuillez sélectionner un prestataire");
          return;
        }
        const selectedPrestataireId = selectedPrestataire.idp;
        const token = accountService.getToken("jwt");
        fetch(SERVER_URL+`event/prestations`,
        {   
            method: "POST",
            headers:{
                Authorization: token,
                'Content-Type': 'application/json;charset=UTF-8'
            },
            body: JSON.stringify(donnes(selectedPrestataireId,ide))
        })
        .then(response=>{
            if (response.ok) {
                alert("Prestataire ajouté avec succcés!")  
            }else{
                alert("Un problème est survenu ! Veuillez reéssayer :(");
            }
        })
        .catch(err => console.error(err));
        // Accédez à l'ID du prestataire sélectionné
    
        // Vous pouvez maintenant utiliser selectedPrestataireId selon vos besoins
        console.log("ID du prestataire sélectionné :", selectedPrestataireId);
    
        // Reste de votre code pour ajouter le prestataire...
      };

    const display = (datas) =>{
        const newOptions = datas.map(opt => {
            const id = getPrestataireIdFromUrl(opt._links.self.href);
            return{
                idp: id,
                profile: opt.image,
                name: opt.nomEntreprise,
                note: opt.starRating,
                address:opt.addresse,
                func:opt.fonction,
                tar:opt.tarif,
            }
        });
        setOptions(newOptions);
        console.log(options);
      }


    return (
        <>
        <Dialog id="all-form" maxWidth="lg" open={open} onClose={handleClose}>
        <div className ='kay-fi' ><h2>Ajouter des prestataires à votre evenement</h2></div>
          <DialogContent>
          <Autocomplete
            sx={{m:2, width:"750px"}}
            id="ajout-pretataires"
            options={options}
            getOptionSelected={(option, value) => option.name === value.name}
            getOptionLabel={(option) => option.name}
            renderOption={(props, option, { selected }) => (
                <li {...props}>
                    <div>
                            <b>{option.name}</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            {option.func}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            {option.address}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            {option.tar}frCFA&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            {option.note}
                    </div>
                </li>
            )}
            renderInput={(params) => (
                <TextField
                {...params}
                variant="outlined"
                label="Ajouter vos prestataires"
                />
            )}
            required
            onChange={handlePrestataireChange}
                        />
          </DialogContent>
          <DialogActions sx={{m:2}}>
              <button id="valider" onClick={()=>ajoutPrestataire(props.ide)} >Ajouter</button>
              <button id='annuler' onClick={handleClose}>Fermer</button>
          </DialogActions>
        </Dialog>
      </>
    );
};

export default AddPrestataire;
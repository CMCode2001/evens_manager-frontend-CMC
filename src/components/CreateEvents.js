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
import AddPrestataire from './AddPrestataire';



const CreateEvents = (props) => {
    const [open, setOpen] = React.useState(false);
    //const token = accountService.getToken("jwt");
    const [ajout, setAjout] = React.useState(false);
    const [clientRole, setClientRole] = useState(true)
    const [dataIn, setDataIn] = React.useState({
      nomEvenement: "",
      typeEvenement: "",
      duree: 0,
      lieu: "",
      dateEvenement: "",
      description: ""
    });
    const isLogin = accountService.getToken("jwt");

    useEffect(() => {
        if (typeof isLogin === 'string') {
            const client = jwtDecode(isLogin);
            setClientRole(client.role === "CLIENT");
        } else {
            console.error('Le token n\'est pas une chaîne valide.');
        }
    }, [isLogin]);

    const [isLoggedIn, setIsLoggedIn] = useState(accountService.isAuthenticated());
    const [data,setData] = useState([]);

    var [idEvent,setIdEvent] = useState(0);

  
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
    };

    const handleChange = evt => {
      const value = evt.target.value;
      setDataIn({
        ...dataIn,
        [evt.target.name]: value
      });
    };

    const handleTypeEvenementChange = (event, newValue) => {
      setDataIn({
        ...dataIn,
        typeEvenement: newValue,
      });
    };


    const postEvenement = () => {
      const token = accountService.getToken("jwt");
    
      fetch(SERVER_URL + "event/evenements/create", {
        method: "POST",
        headers: { Authorization: token, 'Content-Type': 'application/json;charset=UTF-8' },
        body: JSON.stringify(dataIn)
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Erreur de connexion au serveur');
      }
      if (response.status === 200) {
          alert("Votre évènement est créé avec succès ! ");
          return response.json();    
      }
      alert("Erreur de création");
      return null
      })
      .then(data => {
         if (data) {
          setIdEvent(data.id);
          handleClose();
          console.log(data.id);
          console.log(idEvent);
          setAjout(true);
          console.log(idEvent);
         }
      })
      .catch(error => {
        console.error("Une erreur s'est produite :", error);
      });
    };


    const list = ["Familliale","Religieuse","Seminaire", "Professionel","Autres...",];

  return (
    <React.Fragment >
      {(idEvent!=0) ? (
        <AddPrestataire open={true} ide={idEvent}/>
      ):(
        <>
            <Button id="new" onClick={handleClickOpen}>
              <FaPlus/>Create Event
            </Button>
        <Dialog id="all-form" maxWidth="lg" open={open} onClose={handleClose}>
        <div className ='kay-fi' ><h2>Créer votre évènement</h2></div>
          <DialogContent>
              
              <div >
                  <div className="first-line">
                      <TextField id="nomEvenement" sx={{m:2, width:"350px"}} 
                      label="Nom Evenement" variant="outlined" 
                      value={dataIn.nomEvenement}
                      name='nomEvenement'
                      onChange={handleChange} required />                
                      <Autocomplete
                              sx={{m:2, width:"350px"}}
                              id="typeEvenement"
                              options={list}
                              renderInput={(params) => (
                                  <TextField
                                  {...params}
                                  variant="outlined"
                                  label="Type d'Evenement"
                                  
                                  />
                              )}
                              // value={dataIn.typeEvenement}
                              onChange={handleTypeEvenementChange}      
                              required
                      />
                  </div>
                  <div className="second-line" >
                      <TextField type="Date" id="date-evenement"  sx={{ml:2,mr:1,mt:1,mb:1, width:"250px"}} 
                      variant="outlined" onChange={handleChange} value={dataIn.dateEvenement} name='dateEvenement' required />
                      <TextField type='number' id="duree" sx={{m:1, width:"180px"}} label="Duree" variant="outlined"  onChange={handleChange}
                      InputProps={{endAdornment: <InputAdornment position="end">jours</InputAdornment>,}}
                      value={dataIn.duree} name='duree' required />
                      <TextField id="lieu" sx={{m:1, width:"285px"}} label="Lieu" variant="outlined" onChange={handleChange} 
                      value={dataIn.lieu} name='lieu' required />
                  </div>
                  <TextField
                      id="outlined-multiline-static"
                      label="Description"
                      multiline
                      sx={{m:2, width:"750px"}}
                      rows={2}
                      variant="outlined"
                      onChange={handleChange}
                      value={dataIn.description}
                      name='description'
                      required
                  />
              </div>
          </DialogContent>
          <DialogActions sx={{m:2}}>
              <button id="valider" onClick={postEvenement}>Enregistrer</button>
              <button id='annuler' onClick={handleClose}>Annuler</button>
          </DialogActions>
        </Dialog>
      </>
      )
      }
    </React.Fragment>
  );
}

export default CreateEvents;
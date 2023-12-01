import React from 'react';
import { SERVER_URL } from '../constants';

import { Autocomplete,InputAdornment,DialogContent,DialogActions,Dialog,TextField,Button } from '@mui/material';

import { FaPlus } from "react-icons/fa";
import animateur from '../assets/img/animateur.jpg';
import securite from '../assets/img/securite.jpeg';
import foto from '../assets/img/photographe2.jpg';
import deco from '../assets/img/decorate.jpg';
import art from '../assets/img/artiste.jpg';
import traiteur from '../assets/img/traiteurAfricain.jpeg';
import { accountService } from '../_service/account.service';
import axios from 'axios';



const CreateEvents = (props) => {
    const [open, setOpen] = React.useState(false);
    const [prestataires, setPrestataires] = React.useState([]);
    const token = accountService.getToken("jwt");
    const [options, setOptions] = React.useState([
      {label:"", profile:"",name:""}
    ]);

    const [dataIn, setDataIn] = React.useState({
      nomEvenement: "",
      typeEvenement: "",
      duree: 0,
      lieu: "",
      dateEvenement: "",
      description: ""
    });

    React.useEffect(()=>{

    },[]);
  
    const handleClickOpen = () => {
        setOpen(true);
        display();
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
    const fetchPrestataires = () => {
          const token = accountService.getToken("jwt");
          fetch(SERVER_URL+"event/prestataires", {
              headers: {Authorization: token},
          })
              .then(response => response.json())
              .then(data => setPrestataires(data._embedded.prestataires))
              .catch(err => console.error(err));
              console.log(token);
    };

    const postEvenement = () => {
      const token = accountService.getToken("jwt");
          fetch(SERVER_URL+"event/evenements/create", {
            method:"POST",
            headers: {Authorization: token,'Content-Type': 'application/json;charset=UTF-8'},
            body: JSON.stringify(dataIn)
          })
          .then(response=>{
            if(response.ok){
              alert("evenement creer avec succes")
              handleClose();
            }else{
              alert("erreur de creation")
            }
          })
          console.log(token);
    }


    const list = ["Familliale","Religieuse","Seminaire"];
    const display = () =>{
      if(open===true){
        fetchPrestataires();
        const newOptions = prestataires.map(opt => ({
          profile: opt.image,
          name: opt.nomEntreprise
        }));
        setOptions(newOptions);
      }
    }

  return (
    <React.Fragment >
      <Button id="new" onClick={handleClickOpen}>
        <FaPlus/>Create Event
      </Button>
      <Dialog id="all-form" maxWidth="lg" open={open} onClose={handleClose}>
      <div className ='kay-fi' ><h2>Créer votre évènement</h2></div>
        <DialogContent>
            
            <div >
                <div className="first-line">
                    <TextField id="nomEvenement" sx={{m:2, width:"360px"}} 
                    label="Nom Evenement" variant="outlined" 
                    value={dataIn.nomEvenement}
                    name='nomEvenement'
                    onChange={handleChange} required />                
                    <Autocomplete
                            sx={{m:2, width:"355px"}}
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
                <Autocomplete
                            multiple
                            sx={{m:2, width:"750px"}}
                            id="ajout-pretataires"
                            options={options}
                            getOptionLabel={(option) => option.name}
                            renderOption={(props, option, { selected }) => (
                                <li {...props}>
                                    <div>
                                        <img src={option.profile} style={{ marginRight: '8px', width: '45px', height: '45px', borderRadius: '50%' }} />
                                        {option.name}
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
                        />
            </div>
        </DialogContent>
        <DialogActions sx={{m:2}}>
            <button id="valider" onClick={postEvenement}>Enregistrer</button>
            <button id='annuler' onClick={handleClose}>Annuler</button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

export default CreateEvents;
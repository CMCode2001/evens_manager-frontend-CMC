import React from 'react';
import { SERVER_URL } from '../constants';

import { Autocomplete,InputAdornment,DialogContent,DialogActions,Dialog,TextField,Button } from '@mui/material';

import { FaPlus } from "react-icons/fa";
// import animateur from '../assets/img/animateur.jpg';
// import securite from '../assets/img/securite.jpeg';
// import foto from '../assets/img/photographe2.jpg';
// import deco from '../assets/img/decorate.jpg';
// import art from '../assets/img/artiste.jpg';
// import traiteur from '../assets/img/traiteurAfricain.jpeg';



const CreateEvents = (props) => {
    const [open, setOpen] = React.useState(false);
    const [prestataires, setPrestataires] = React.useState([
      {label:"", profile:"",name:""}
    ]);
    const [options, setOptions] = React.useState([]);

    React.useEffect(()=>{
      fetchPrestataires();
      const newOptions = prestataires.map(opt => ({
        label: 'Option 1',
        profile: opt.image,
        name: opt.nomEntreprise,
      }));
      setOptions(newOptions);
    },[prestataires]);
  
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
    };

    const fetchPrestataires = () => {
          const token = sessionStorage.getItem("jwt");
          fetch(SERVER_URL+"event/prestataires", {
              headers: {Authorization: "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1c2VyIiwiZXhwIjoxNzAxMDMyNzA3fQ.otyDsTjvxJNwSmmtQuK8HkaGfuHNEU_hjGWONXjYQjs"},
          })
              .then(response => response.json())
              .then(data => setPrestataires(data._embedded.prestataires))
              .catch(err => console.error(err));
      };

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
                    <TextField  id="type-evenement" sx={{m:2,width:"355px"}}  label="Type d'Evenement" variant="outlined" required />
                    <TextField id="lieu" sx={{m:2, width:"360px"}} label="Lieu" variant="outlined" required />
                </div>
                <div className="second-line" >
                    <TextField type="Date" id="date-evenement"  sx={{m:2, width:"355px"}} variant="outlined" required />
                    <TextField id="duree" sx={{m:2, width:"360px"}} label="Duree" variant="outlined" 
                    InputProps={{endAdornment: <InputAdornment position="end">jours</InputAdornment>,}} required />
                </div>
                <TextField
                    id="outlined-multiline-static"
                    label="Description"
                    multiline
                    sx={{m:2, width:"750px"}}
                    rows={4}
                    variant="outlined"
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
            <button id="valider" onClick={handleClose}>Enregistrer</button>
            <button id='annuler' onClick={handleClose}>Annuler</button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

export default CreateEvents;
import React, { useState } from 'react';
import { prestataireService } from '../_service/prestataire.service';
import { Alert } from '@mui/material';
import { accountService } from "../_service/account.service";
//import { Link, Navigate  } from 'react-router-dom';
import axios from "axios";
import { Navigate } from 'react-router-dom';
import { FormControl, InputLabel,OutlinedInput, InputAdornment, IconButton, TextField } from "@mui/material";
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Visibility } from "@mui/icons-material";
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  width:'600px',};
const FormPrestataire = () => {
  const [statePrestataire, setStatePrestataire] = useState({
    username: '',
    email: '',
    password: '',
    password1: '',
    role:'prestataire',
    prenom: '',
    nom:'',
    nomEntreprise:'',
    desEntreprise:'',
    telephone:'',
    adresse:'',
    fonction:'',
    tarif:0
  });

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setIsModalOpen(false);   
  };
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [navigate, setNavigate] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const [tkn, setTkn] = useState(null);

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setStatePrestataire((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
   
  const handleOnSubmit = async (evt) => {
    evt.preventDefault();
    console.log("ok");

    if (
      statePrestataire.email === "" ||
      statePrestataire.username === "" ||
      statePrestataire.password === "" ||
      statePrestataire.password1 === "" ||
      statePrestataire.password !== statePrestataire.password1)
    {
      setSuccess('');
      setError('Veuillez saisir correctement les champs.');
      setStatePrestataire({
        username: '',
        email: '',
        password: '',
        password1: '',
        role : 'prestataire'
      });
    } else if (statePrestataire.password.length < 6) {
    setSuccess('');
    setError('6 caractere au moins pour le mot de passe.');
  }else if (!/\d{4,}/.test(statePrestataire.password)) {
    setSuccess('');
    setError('Le mot de passe doit contenir au moins 4 chiffres.');
  }
    else {
      try {
        await prestataireService.addUser(statePrestataire);
        axios.post("http://localhost:8080/login",statePrestataire)
        .then(response =>{setTkn(response.headers.authorization)
        accountService.saveToken(response.headers.authorization);
        if (tkn !==null){
          setIsAuth(true);
        }
    } 
    )
    .catch(error=>console.log(error))
        setSuccess('Utilisateur ajouté avec succès!');
        setStatePrestataire({
          username: '',
          email: '',
          password: '',
          password1: ''
        });
        setError('');
        setNavigate(true)
      } catch (error) {

        setError('Une erreur s\'est produite lors de l\'ajout de l\'utilisateur.');
        setSuccess('');
      }
    }
  };


  if (navigate){
    alert("Inscription reussi! Cliquez sur OK pour continuer")
    return <Navigate to={"/dashbordprest"}/>
  }

    return (
        <div className="pres-contain">
          <div>
            {error && (
              <Alert severity="error" className="alert">
                {error}
              </Alert>
            )}
          </div>
          <div className='success'>
            {success && (
              <Alert severity="success">{success}</Alert>
            )}
          </div>
            <form onSubmit={handleOnSubmit}>
                <h3>Crée ton compte Prestataire!</h3>
                <div className="social-contain">
                <a href="#" className="social">
                    <i className="fab fa-facebook-f" />
                </a>
                <a href="#" className="social">
                    <i className="fab fa-google-plus-g" />
                </a>
                <a href="#" className="social">
                    <i className="fab fa-linkedin-in" />
                </a>
                </div>
                <span>or use your email for registration</span>
                <TextField
                  label="UserName"
                  name="username" 
                  id="outlined-start-adornment"
                  sx={{ m: 1}} fullWidth
                  onChange={handleChange}
                  value={statePrestataire.username}
                />
                <TextField
                  label="Email"
                  type="email"
                  id="outlined-start-adornment"
                  sx={{ mb: 1}} fullWidth
                  name="email"
                  value={statePrestataire.email}
                  onChange={handleChange}
                />
                <FormControl sx={{ mb: 1}} fullWidth variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-password"
                    name="password"
                    value={statePrestataire.password}
                    onChange={handleChange}
                    type={showPassword ? 'text' : 'password'}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Password"
                  />
                </FormControl>
                <FormControl sx={{ mb: 1}} fullWidth variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-password"
                    name="password1"
                    value={statePrestataire.password1}
                    onChange={handleChange}
                    type={showPassword ? 'text' : 'password'}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Confirm Password"
                  />
                </FormControl>
                <button className="My-btn" onClick={() =>setIsModalOpen(true)} type='button'>Suivant</button>

                
                <Modal
      open={isModalOpen}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          <h3>Veuillez saisir les informations. </h3>
        </Typography>
        <form onSubmit={handleOnSubmit}>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
        
                    <div id='prenomNom'>
                      <TextField
                        label="Nom"
                        type="text"
                        id="outlined-start-adornment"
                        sx={{ mb: 1}} fullWidth
                        name="nom"
                        value={statePrestataire.nom}
                        onChange={handleChange}
                      />
                      <TextField
                        label="Prenom"
                        type="text"
                        id="outlined-start-adornment"
                        sx={{ mb: 1, marginLeft:1}} fullWidth
                        name="prenom"
                        value={statePrestataire.prenom}
                        onChange={handleChange}
                      />    
                    </div>
                    <div id='nomEntrepriseTelephone'>
                      <TextField
                        label="Nom entreprise"
                        type="text"
                        id="outlined-start-adornment"
                        sx={{ mb: 1}} fullWidth
                        name="nomEntreprise"
                        value={statePrestataire.nomEntreprise}
                        onChange={handleChange}
                      />
                      <TextField
                        label="Telephone"
                        type="number"
                        id="outlined-start-adornment"
                        sx={{ mb: 1,marginLeft:1}} fullWidth
                        name="telephone"
                        value={statePrestataire.telephone}
                        onChange={handleChange}
                      />
                    </div>
                    <div id='adresseFonction'>
                        <TextField
                          label="Adresse"
                          type="text"
                          id="outlined-start-adornment"
                          sx={{ mb: 1}} fullWidth
                          name="adresse"
                          value={statePrestataire.adresse}
                          onChange={handleChange}
                        />
                        <TextField
                          label="Fonction"
                          type="text"
                          id="outlined-start-adornment"
                          sx={{ mb: 1,marginLeft:1}} fullWidth
                          name="fonction"
                          value={statePrestataire.fonction}
                          onChange={handleChange}
                        />
                    </div>

                    <TextField
                      label="Tarif"
                      type="number"
                      id="outlined-start-adornment"
                      sx={{ mb: 1}} fullWidth
                      name="tarif"
                      value={statePrestataire.tarif}
                      onChange={handleChange}
                    />
                    <TextField
                      label="Description"
                      type="text"
                      id="outlined-start-adornment"
                      sx={{ mb: 1}} fullWidth
                      name="desEntreprise"
                      value={statePrestataire.desEntreprise}
                      onChange={handleChange}
                    />
                      <button className="My-btn" type='submit'>S'inscrire</button>
                      
        </Typography>
        </form>
      </Box>
</Modal>


            </form>
        </div>
    );
};

export default FormPrestataire;
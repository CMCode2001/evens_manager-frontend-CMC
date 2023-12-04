import React, { useState } from 'react';
import axios from 'axios';
import { userService } from '../_service/user.service';
import { accountService } from '../_service/account.service';
import { Alert } from '@mui/material';
import { Navigate } from 'react-router-dom';
import { FormControl, InputLabel,OutlinedInput, InputAdornment, IconButton, TextField } from "@mui/material";
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Visibility } from "@mui/icons-material";
import { jwtDecode } from 'jwt-decode';
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


const FormClient = () => {
  const [error, setError] = useState("");
  const [navigate, setNavigate] = useState(false);
  const [stateClient, setStateClient] = useState({
    username: "",
    mail: "",
    password: "",
    password1: "",
    role: "client",
    nom: '',
    prenom:'',
    age:0,
    sexe:'',
    telephone:0,
    adresse:''
  });

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setIsModalOpen(false);   
  };
  
  const [isModalOpen, setIsModalOpen] = useState(false); 

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };


  // 
  const roleToken = accountService.getToken("jwt");

  if (typeof roleToken === 'string') {

    const client = jwtDecode(roleToken);
    const clientRole = client.role;
    console.log(clientRole);
  } else {
    console.error('Le token n\'est pas une chaîne valide.');
  }

  // 
  
  
    const handleChange = evt => {
      const value = evt.target.value;
      setStateClient({
        ...stateClient,
        [evt.target.name]: value
      });
    };
  

  const handleOnSubmit = async (evt) => {
    evt.preventDefault();

    if (
      stateClient.mail === "" ||
      stateClient.username === "" ||
      stateClient.password === "" ||
      stateClient.password1 === "" ||
      stateClient.password !== stateClient.password1
    ) {
      setError('Oups! Veuillez saisir correctement les informations');
      setStateClient({
        username: '',
        mail: '',
        password: '',
        password1: ''
      });
    } else if (stateClient.password.length < 6) {
      setError('Le mot de passe doit contenir au moins 6 caractères.');
    }else if (!/\d{4,}/.test(stateClient.password)) {
      setError('Le mot de passe doit contenir au moins 4 chiffres.');}
    else {
      try {
        await userService.addUser(stateClient);

        const response = await axios.post("http://localhost:8080/login", stateClient);
        console.log(response);
        accountService.saveToken(response.headers.authorization);
        setNavigate(true);
      } catch (error) {
        setError('Une erreur s\'est produite lors de l\'ajout de l\'utilisateur.');
      }
    }
  };

  if (navigate) {
    alert("Inscription reussi! Cliquez sur OK pour vous connecter");
    return <Navigate to={"/events"} />;
  }
    return (
        <div className="client-contain">
          <div className='error'>
            {error && (
              <Alert severity="error" className="alert">
                {error}
              </Alert>
            )}
          </div>
            <form onSubmit={handleOnSubmit}>
                <h3>Crée ton compte Client !</h3>
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
                  value={stateClient.username}
                />
                <TextField
                  label="Email"
                  type="email"
                  id="outlined-start-adornment"
                  sx={{ mb: 1}} fullWidth
                  name="mail"
                  value={stateClient.mail}
                  onChange={handleChange}
                />
                <FormControl sx={{ mb: 1}} fullWidth variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-password"
                    name="password"
                    value={stateClient.password}
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
                    value={stateClient.password1}
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
                        value={stateClient.nom}
                        onChange={handleChange}
                        required
                      />
                      <TextField
                        label="Prenom"
                        type="text"
                        id="outlined-start-adornment"
                        sx={{ mb: 1, marginLeft:1}} fullWidth
                        name="prenom"
                        value={stateClient.prenom}
                        onChange={handleChange}
                        required
                      />    
                    </div>
                    <div id='nomEntrepriseTelephone'>
                      <TextField
                        label="Age"
                        type="number"
                        id="outlined-start-adornment"
                        sx={{ mb: 1}} fullWidth
                        name="age"
                        value={stateClient.age}
                        onChange={handleChange}
                        required
                      />
                      <TextField
                        label="Telephone"
                        type="number"
                        id="outlined-start-adornment"
                        sx={{ mb: 1,marginLeft:1}} fullWidth
                        name="telephone"
                        value={stateClient.telephone}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div id='adresseFonction'>
                        <TextField
                          label="Adresse"
                          type="text"
                          id="outlined-start-adornment"
                          sx={{ mb: 1}} fullWidth
                          name="adresse"
                          value={stateClient.adresse}
                          onChange={handleChange}
                          required
                        />
                        <TextField
                          label="Sexe"
                          type="text"
                          id="outlined-start-adornment"
                          sx={{ mb: 1,marginLeft:1}} fullWidth
                          name="sexe"
                          value={stateClient.sexe}
                          onChange={handleChange}
                          required
                        />
                    </div>
                      <button className="My-btn" type='submit'>S'inscrire</button>
                      
        </Typography>
        </form>
      </Box>
</Modal>

            </form>
        </div>
  );
};

export default FormClient;
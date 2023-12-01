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

const FormPrestataire = () => {
  const [statePrestataire, setStatePrestataire] = useState({
    username: '',
    email: '',
    password: '',
    password1: '',
    role:'prestataire'
  });

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
                <button className="My-btn">S'inscrire</button>
            </form>
        </div>
    );
};

export default FormPrestataire;
import axios from "axios";
import React, { useState } from "react";
import { accountService } from "../_service/account.service";
import { Navigate } from "react-router-dom";
import { Alert } from '@mui/material';

import { FormControl, InputLabel,OutlinedInput, InputAdornment, IconButton, TextField } from "@mui/material";
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Visibility } from "@mui/icons-material";
import { Link } from "react-router-dom";
import RecupereInfo from "./RecupereInfo";
import {jwtDecode} from "jwt-decode";


function SignInForm({username}) {
  const [showPassword, setShowPassword] = React.useState(false);
  const [error, setError] = useState("");

  const [isAuth, setIsAuth] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const [navigate, setNavigate] = useState(false);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  
  const [state, setState] = React.useState({
    username: "",
    password: ""
  });

  const handleChange = evt => {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value
    });
  };

  ///GESTION DE ROLE //
  const roleToken = accountService.getToken("jwt");

  if (typeof roleToken === 'string') {

    const client = jwtDecode(roleToken);
    const clientRole = client.role;
    console.log(clientRole);
  } else {
    console.error('Le token n\'est pas une chaîne valide.');
  }
  
  ///////////////////

  // GERONS LE MODEL OUVERTURE DE CONNEXION //
const [openModal, setOpenModal] = useState(false);  // Nouvel état pour gérer l'ouverture de la modal


const handleOnSubmit = evt => {
  evt.preventDefault();

  axios.post("http://localhost:8080/login", state)
      .then(response => {
          accountService.saveToken(response.headers.authorization);

          if (accountService.isLogged(response.headers.authorization)) {
              const username = state.username;
              accountService.getUsername(username);

              setIsAuth(true);
              sessionStorage.setItem("jwt", response.headers.authorization);
              setNavigate(true);
              setOpenModal(true);
          } else {
              setIsAuth(false);
          }
      })
      .catch(error => {
          console.log(error);
          setError("Username ou password incorrect");
      });
};



// ...

  //================================================//



  if (navigate){
    return <Navigate to={"/"} />
  }
  return (
    <div className="form-contain sign-in-contain">
      
      <div>
        {error && (
          <Alert severity="error" className="alert">
            {error}
          </Alert>
        )}
      </div>
      <form onSubmit={handleOnSubmit}>

        <h1>Connexion</h1>
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
        <span>or use your account</span>
        <TextField
          label="UserName"
          id="outlined-start-adornment"
          sx={{ m: 1}} fullWidth
          name="username"
          value={state.username}
          onChange={handleChange}
        />
        <FormControl sx={{ m: 1}} fullWidth variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            name="password"
            value={state.password}
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
        <Link to ="#">Mot de passe oublié ?</Link>
        <button className="My-btn">Se connecter</button>
      </form>
       {/* Modal d'informations utilisateur */}
       <RecupereInfo open={openModal} onClose={() => setOpenModal(false)} />
    </div>
  );
}

export default SignInForm;
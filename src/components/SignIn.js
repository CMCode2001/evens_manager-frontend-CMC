import axios from "axios";
import React, { useState } from "react";
import { accountService } from "../_service/account.service";
import { Link, Navigate } from "react-router-dom";
import { Alert } from '@mui/material';
import { FormControl, InputLabel,OutlinedInput, InputAdornment, IconButton, TextField } from "@mui/material";
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Visibility } from "@mui/icons-material";



function SignInForm() {
  const [showPassword, setShowPassword] = React.useState(false);
  const [error, setError] = useState("");

  // Utilisez hasLogged selon vos besoins, par exemple pour afficher un message une fois que la valeur a été loguée
 
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

  const handleOnSubmit = evt => {
    console.log(state)
    evt.preventDefault();

    axios.post("http://localhost:8080/login",state)
    .then(response =>{console.log(response)
    accountService.saveToken(response.headers.authorization);
      const token = response.headers.get("Authorisation");
    if (accountService.isLogged(response.headers.authorization)){
      setIsAuth(true);
      sessionStorage.setItem("jwt",token);
      //console.log(!isAuth)
      setNavigate(true);
    }})
    .catch(error=>console.log(error))
    setError("Username ou password incorrect");
  };

  const logout=()=>{
    sessionStorage.removeItem("jwt");
    setIsAuth(false);
  }
  //===CONNEXION COTE CLIENT   ==//
  //===REDIRECTION COTE CLIENT  VERS EVENTS ==//

  if (navigate){
    return <Navigate to={"/events"} />
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
          <Link to ='' className="social">
            <i className="fab fa-facebook-f" />
          </Link>
          <Link to ='' className="social">
            <i className="fab fa-google-plus-g" />
          </Link>
          <Link to =" " className="social">
            <i className="fab fa-linkedin-in" />
          </Link>
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
        <Link to="#">Mot de passe oublié ?</Link>
        <button className="My-btn">Se connecter</button>
      </form>
    </div>
  );
}

export default SignInForm;

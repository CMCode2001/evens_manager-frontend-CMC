import axios from "axios";
import React, { useState, useEffect } from "react";
import { accountService } from "../_service/account.service";
import { Navigate } from "react-router-dom";
import { Alert } from '@mui/material';

import {
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  TextField,
} from "@mui/material";
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Visibility from "@mui/icons-material/Visibility";
import { Link } from "react-router-dom";
import RecupereInfo from "./RecupereInfo";
import { jwtDecode } from "jwt-decode";

function SignInForm({ username }) {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isAuth, setIsAuth] = useState(false);
  const [navigate, setNavigate] = useState(false);

  const [state, setState] = useState({
    username: "",
    password: "",
  });

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  const roleToken = accountService.getToken("jwt");
  let clientRole = null;

  if (typeof roleToken === 'string') {
    const client = jwtDecode(roleToken);
    clientRole = client.role;
    console.log(clientRole);
  } else {
    console.error('Le token n\'est pas une chaîne valide.');
  }

  const [openModal, setOpenModal] = useState(false);

  const handleOnSubmit = (evt) => {
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
        } 
        else 
        {
          setIsAuth(false);
        }
      })
      .catch(error => {
        console.log(error);
        setError("Username ou password incorrect");
      });
  };

  if (navigate) {
    return <Navigate to={"/"} />;
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
            <Link to ="#" className="social">
              <i className="fab fa-facebook-f" />
            </Link>
            <Link to ="#" className="social">
              <i className="fab fa-google-plus-g" />
            </Link>
            <Link to ="#" className="social">
              <i className="fab fa-linkedin-in" />
            </Link>
          </div>
          <span>or use your account</span>
          <TextField
            label="UserName"
            id="outlined-start-adornment"
            sx={{ m: 1 }} fullWidth
            name="username"
            value={state.username}
            onChange={handleChange}
          />
          <FormControl sx={{ m: 1 }} fullWidth variant="outlined">
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
                    onClick={() => setShowPassword((show) => !show)}
                    onMouseDown={(event) => event.preventDefault()}
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
      {/* Modal d'informations utilisateur */}
      {isAuth && clientRole === 'CLIENT' && (
        <RecupereInfo open={openModal} onClose={() => setOpenModal(false)} />
      )}
    </div>
  );
}

export default SignInForm;

import axios from "axios";
import React, { useState, useEffect } from "react";
import { accountService } from "../_service/account.service";
import { Await, Navigate } from "react-router-dom";
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
import { useRef } from "react";
import { SERVER_URL } from "../constants";

const SignInForm = (username) => {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLogin, setIsLogin] = useState(false);
  const [openModal, setOpenModal] = useState(false);

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

  ///// RECUPERATION ID CLIENT CONNECTE

  const [cientId,setClientId]= useState(null);
///////////////////////////////////////
  if (typeof roleToken === 'string') {
    const client = jwtDecode(roleToken);
    clientRole = client.role;
    console.log(clientRole);
  } else {
    console.error('Le token n\'est pas une chaîne valide.');
  }

  
  ////////////// VERIFIONS/////////////////
  const isMounted = useRef(true);  
  // Référence pour suivre l'état de montage du composant

  ////////////////////////////////////////
  useEffect(() => {
    return () => {
      //isMounted.current = false;
      //console.log("Composant démonté");
      
    };
  }, [isLogin]);

  const handleOnSubmit = async (evt) => {
    try {
      evt.preventDefault();

      axios.post("http://localhost:8080/login", state)
        .then(response => {
          accountService.saveToken(response.headers.authorization);

          if (accountService.isLogged(response.headers.authorization)) {
            const username = state.username;
            accountService.getUsername(username);

            // Récupérer l'ID du client connecté
            const token = accountService.getToken();
            fetch(SERVER_URL + "", {
              headers: { Authorization: token },
            })
              .then(response => response.json())
              .then(data => {
                if (isMounted) {

                  handleUpdateUserInfo(data.id);
                  setClientId(data.id);
                  setIsLogin(true);
                  setOpenModal(true);
                }
              })
              .catch(err => console.error(err));

            sessionStorage.setItem("jwt", response.headers.authorization);
            setNavigate(true);
          } else {
            setIsLogin(false);
          }
        })
        .catch(error => {
          console.log(error);
          setError("Username ou password incorrect");
        });
    } catch (error) {
      console.error("ERREUR SOUMMISSION DU FORMS", error);
    }
  };
  const handleUpdateUserInfo = (clientId) => {
    // Faire la requête PUT pour mettre à jour les informations du client
    axios.put(`http://localhost:8080/event/clients/${clientId}`, clientId)
      // .then(response => {
      //   // Traiter la réponse si nécessaire
      // })
      .catch(error => {
        // Gérer les erreurs de la requête PUT
        console.error("Erreur lors de la mise à jour des informations du client", error);
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
          <button className="My-btn" open={openModal} onClose={() => setOpenModal(false)}>Se connecter</button>
      
      {/* Modal d'informations utilisateur */}
      {isLogin && (
        <RecupereInfo open={openModal} onClose={() => setOpenModal(false)}/>
      )}
      </form>
    </div>
  );
}

export default SignInForm;
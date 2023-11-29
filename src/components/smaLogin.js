import React, { useState } from "react";
import "../css/styleLogin.css";
import '../css/bootstrap.min.css';
import SignInForm from "./SignIn";
import SignUpForm from "./SignUp";

export default function App() {
  const [type, setType] = useState("signIn");
  const handleOnClick = text => {
    if (text !== type) {
      setType(text);
      return;
    }
  }; 
  const containClass =
    "contain " + (type === "signUp" ? "right-panel-active" : "");
  return (
    <div className="App-Login">
      <h2 className="texte-Form">Formulaire d'inscription</h2>
      <div className={containClass} id="contain">
        <SignUpForm />
        <SignInForm />
        <div className="overlay-contain">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1> Dälal ak Jàmm ći Sama Bess</h1>
              <p> Veuillez renseigner vos informations personnelles </p>
              <button
                
                className="ghost"
                id="signIn"
                onClick={()=>handleOnClick("signIn")}
              >
               Se Connecter
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1 id= "btn1">Bienvenue !</h1>
              <p> Veuillez renseigner vos informations personnelles </p>
              <button
                className="ghost "
                id="signUp"
                onClick={()=>handleOnClick("signUp")}
              >
               S'inscrire
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

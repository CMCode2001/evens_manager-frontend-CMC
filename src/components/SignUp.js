import { React, useState } from "react";
import FormClient from "./FormClient";
import FormPrestataire from "./FormPrestataire";
function SignUpForm(props) {
  const [choice, setChoice] = useState("");
  const handleChoix = () => {
    setChoice("client");
  };
  const handleChoix2 = () => {
    setChoice("prestataire");
  };
  return (
      <div className="form-contain sign-up-contain intermediaire" >
        <h1>S'inscrire en tant que </h1>
        <button onClick={handleChoix}>Client</button>
        ou
        <button onClick={handleChoix2}>Prestataire</button>
        {
                choice === "client" ? (
                  <FormClient />
                ) : choice === "prestataire" ? (
                  <FormPrestataire />
                ) : (
                  <h4></h4>
                )
        }
      </div>
  ); 
}

export default SignUpForm;

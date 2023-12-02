// ModalUserInfo.js

import React, { useState, useEffect } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { SERVER_URL } from '../constants';
import { accountService } from '../_service/account.service';

const RecupereInfo = ({ open, onClose }) => {
//   const [userData, setUserData] = useState(null);
//   const [clientId, setClientId]  =useState(null);


//   useEffect(() => {
//     // Récupérer les informations de l'utilisateur ici
//     const token = accountService.getToken();

//     fetch(SERVER_URL + `/event/client${clientId}`,clientId)(
//     {
//       method:"POST",
//       headers: {Authorization: token,'Content-Type': 'application/json;charset=UTF-8'},
//       body: JSON.stringify(userData)
//     })
    
//       .then(response => response.json())
//       .then(data => setUserData(data))
//       .catch(err => console.error(err));
//       setClientId(true);
//   }, []);

   return (
    <>
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={{ height: 60, width: '10%' }}>
        {/* Contenu de la modal avec les informations de l'utilisateur */}
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Informations de l'utilisateur
        </Typography>
        {/* {userData && ( */}
          <div>
            <p>Nom: {/* {userData.nom}*/} DIAGNE</p> 
            <p>Prenom: {/* {userData.prenom}*/} DIAGNE</p>
            <p>Telephone: {/* {userData.telephone}*/} DIAGNE</p>
            <p>Adresse: {/* {userData.adresse}*/} DIAGNE</p>
            {/* Ajoutez d'autres informations selon vos besoins */}
          </div>
        {/* )} */}
        <Button onClick={onClose}>Fermer</Button>
      </Box>
      
    </Modal>
    </> 
  );
};

export default RecupereInfo;

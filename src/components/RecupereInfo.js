// ModalUserInfo.js

import React, { useState, useEffect } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { SERVER_URL } from '../constants';
import { accountService } from '../_service/account.service';

const RecupereInfo = ({ open, onClose }) => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Récupérer les informations de l'utilisateur ici
    const token = accountService.getToken();
    fetch(SERVER_URL + 'user', {
      headers: { Authorization: token },
    })
      .then(response => response.json())
      .then(data => setUserData(data))
      .catch(err => console.error(err));
  }, []);

  return (
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
        {userData && (
          <div>
            <p>Nom: {userData.name}</p>
            <p>Email: {userData.email}</p>
            {/* Ajoutez d'autres informations selon vos besoins */}
          </div>
        )}
        <Button onClick={onClose}>Fermer</Button>
      </Box>
    </Modal>
  );
};

export default RecupereInfo;

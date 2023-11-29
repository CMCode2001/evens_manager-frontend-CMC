import * as React from 'react';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import NavigationIcon from '@mui/icons-material/Navigation';

import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

export default function FloatingActionButtons() {
  return (
    <Box sx={{ '& > :not(style)': { m: 1 } }}>
      <Fab color="primary" aria-label="add">
        <ExitToAppIcon />
      </Fab>
         Deconnexion
         &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <Fab color ="secondary" aria-label="edit">
            <AddIcon/>
        </Fab>
        Ajouter 
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <Fab color="secondary" aria-label="edit">
        <EditIcon />
      </Fab>
      Modifier 
      
      
     
     
    </Box>
  );
}
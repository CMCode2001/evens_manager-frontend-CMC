import * as React from 'react';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';

import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
// import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import FadeMenuPrest from './FadeMenuPrest';
import { accountService } from '../../_service/account.service';

export default function FloatingActionButtons() {
  const token = accountService.getToken("jwt");
    console.log(token);

  return (
      <>
        
        {token ? 
        (
                
            <Box sx={{ '& > :not(style)': { m: 1 } }}>
            <Fab color="primary" aria-label="logout">
              <FadeMenuPrest/>
            </Fab>
              Deconnexion
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <Fab color ="secondary" aria-label="add">
                  <AddIcon/>
              </Fab>
              Ajouter 
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Fab color="trial" aria-label="edit">
              <EditIcon />
            </Fab>
            Modifier    
          </Box>
          
        )
          : 
        (

          <Box sx={{ '& > :not(style)': { m: 1 } }}>
          <Fab color="primary" aria-label="logout">
            <FadeMenuPrest/>
            
              {/* <ExitToAppIcon /> */}

            {/* </FadeMenuPrest> */}
          </Fab>
            Deconnexion
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Fab color ="secondary" aria-label="add">
                <AddIcon/>
            </Fab>
            Ajouter 
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Fab color="secondary" aria-label="edit">
            <EditIcon />
          </Fab>
          Modifier    
        </Box>

        )}
      </>
  );
}
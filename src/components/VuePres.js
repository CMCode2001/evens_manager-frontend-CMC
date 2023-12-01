import React, { useEffect, useState } from 'react';
import { Avatar, Dialog } from '@mui/material';
import { DialogActions } from '@mui/material';
import { DialogContent } from '@mui/material';
import { DialogTitle } from '@mui/material';
import { Button } from '@mui/material';
import  Clear from '@mui/icons-material/Clear'
import Stack from '@mui/material/Stack';

function Owner(props) {
    return (
        <div>
            <Dialog open={props.open} onClose={props.handleClose}>
                <DialogTitle>Prestataires de votre evenement</DialogTitle>
                <DialogContent>
                    <Stack  mt={1} id="same-line">
                        <Stack ml={10} mb={1}>
                            <Avatar sx={{ width: 70, height: 70 }}/>
                        </Stack>
                        <h3 style={{marginBottom:"5px",color:"black"}}><span style={{fontWeight:"lighter"}}>Prenom:</span>&nbsp;&nbsp;&nbsp;{props.nomEntreprise}</h3> 
                        <h3 style={{marginBottom:"0px",color:"black"}}><span style={{fontWeight:"lighter"}}>Nom:</span>&nbsp;&nbsp;&nbsp;{props.fonction}</h3>    
                        <h3 style={{marginBottom:"5px",color:"black"}}><span style={{fontWeight:"lighter"}}>Prenom:</span>&nbsp;&nbsp;&nbsp;{props.telephone}</h3> 
                        <h3 style={{marginBottom:"0px",color:"black"}}><span style={{fontWeight:"lighter"}}>Nom:</span>&nbsp;&nbsp;&nbsp;{props.email}</h3>
                        <h3 style={{marginBottom:"5px",color:"black"}}><span style={{fontWeight:"lighter"}}>Prenom:</span>&nbsp;&nbsp;&nbsp;{props.tarif}</h3> 
                        <h3 style={{marginBottom:"0px",color:"black"}}><span style={{fontWeight:"lighter"}}>Nom:</span>&nbsp;&nbsp;&nbsp;{props.note}</h3> 
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button variant='outlined' color='error' onClick={props.handleClose}>
                        <Clear />Fermer
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default Owner;
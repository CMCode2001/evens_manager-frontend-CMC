import React, { useEffect, useState } from 'react';
import { Avatar, Box, Dialog } from '@mui/material';
import { DialogActions } from '@mui/material';
import { DialogContent } from '@mui/material';
import { DialogTitle } from '@mui/material';
import { Button } from '@mui/material';
import  Clear from '@mui/icons-material/Clear'
import Stack from '@mui/material/Stack';
import { DataGrid } from '@mui/x-data-grid';

function Owner(props) {

    const columns = [
        {
          field: 'nomEntreprise',
          headerName: 'Nom Entreprise',
          width: 150,
          editable: false,
        },
        {
          field: 'fonction',
          headerName: 'Service Offert',
          width: 150,
          editable: false,
        },
        {
          field: 'adresse',
          headerName: 'Adresse',
          width: 1500,
          editable: false,
        },
        {
          field: 'telephone',
          headerName: 'Telephone',
          width: 100,
          editable: false,
        },
        {
          field: 'email',
          headerName: 'Mail',
          width: 150,
          editable: false,
        },
        {
            field: 'tarif',
            headerName: "Tarif",
            width:100,
            filterable: false,
          },
        {
          field:'getStarRating',
          headerName: "Note",
          width:150,
          sortable:false,
          filterable: false,
        },
      {
        field: 'valide',
        headerName: "Etat",
        sortable:false,
        filterable: false,
      },
      ];
    
    return (
        <div>
            <Dialog open={props.open} onClose={props.handleClose}>
                <DialogTitle>Prestataires de votre evenement</DialogTitle>
                <DialogContent>
                <Box sx={{ height: 650, width: '100%' }}>
                    <DataGrid
                    rows={props.rows}
                    getRowId={row => row.id}
                    columns={columns}
                    initialState={{
                        pagination: {
                        paginationModel: {
                            pageSize: 15,
                        },
                        },
                    }}
                    pageSizeOptions={[15]}
                    disableRowSelectionOnClick
                />
                </Box>
                </DialogContent>
                <DialogActions>
                    <Button variant='outlined' color='error' onClick={props.handleClose}>
                        <Clear color="red" />Fermer
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default Owner;
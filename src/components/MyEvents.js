import React, { useState } from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { jwtDecode } from 'jwt-decode';
import { useEffect } from 'react';
import { accountService } from '../_service/account.service';
import { SERVER_URL } from '../constants';
import { Edit } from '@mui/icons-material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Avatar, Button } from '@mui/material';
import  VuePres  from './VuePres';


export default function DataGridDemo() {


  const columns = [
    {
      field: 'nomEvenement',
      headerName: 'Nom Evenement',
      width: 250,
      editable: false,
    },
    {
      field: 'typeEvenement',
      headerName: 'Type Evenement',
      width: 250,
      editable: false,
    },
    {
      field: 'dateEvenement',
      headerName: 'Date Evenement',
      width: 200,
      editable: false,
    },
    {
      field: 'duree',
      headerName: 'Duree en jours',
      width: 150,
      editable: false,
    },
    {
      field: 'lieu',
      headerName: 'Lieu',
      width: 200,
      editable: false,
    },
    {
      field:'btn1',
      headerName: "Prestataires",
      sortable:false,
      filterable: false,
      renderCell: row => (
          <Button  onClick={() => onePresClick(jwtDecode(accountService.getToken("jwt")).id)} >
              <Avatar />
          </Button>
      ),
    },
  {
    field: 'btn2',
    headerName: "",
    sortable: false,
    filterable: false,
    renderCell: row => <Edit variant="outlined" color='primary'/>
  },
  {
    field: 'btn3',
    headerName: "",
    sortable:false,
    filterable: false,
    renderCell: row => (
      <Button  color='error' onClick={() => oneDelEvent(row.id)} >
          <DeleteIcon color='error' variant="outlined"/>
      </Button>
    ),
  },
  ];

  const [rows,setRows]=useState([]);
  const [open,setOpen]=useState(false);
  const [openO,setOpenO]=useState(false);
  const [prestataires, setPrestataires] = useState([]);

  useEffect(()=>{
    const token = accountService.getToken("jwt");
    const client = jwtDecode(token);
    const clientId = client.id;
    console.log(client,clientId);
    fetchEvents(token,clientId);
    console.log(rows);
  },[]);


  const fetchEvents = (token,userId) => {
      fetch(SERVER_URL+`event/evenements/${userId}`, {
          headers: {Authorization: token},
      })
          .then(response => response.json())
          .then(data=> {setRows(data);console.log("data",data)})
          .catch(err => console.error(err));
  };

  const oneDelEvent = id => {
    if (window.confirm("Etes vous sur de vouloir supprimer la voiture? :(")) {
        const token = accountService.getToken("jwt");
        fetch(SERVER_URL+`/event/evenements/${id}`, { 
            method: "DELETE",
            headers: {Authorization: token}, 
        })
        .then(response => {
            if (response.ok){
              fetchEvents();
              setOpen(true);
            } else{
                alert("Un problème est survenu lors de la suppression! Reéssayer :(");
            }
        })
        .catch(err => console.error(err)); 
    }
  };

  const onePresClick = id => {
    const token = accountService.getToken("jwt");
    fetch(SERVER_URL+`event/evenemts/${id}/prestataires`, {
        headers: {Authorization: token},
    })
        .then(response => response.json())
        .then(ownerData => {
            console.log(ownerData);
            setPrestataires(ownerData);
            setOpenO(true);
        })
        .catch(err => console.error(err));
};

  return (
    <>
      <Box sx={{ height: 650, width: '100%' }}>
        <DataGrid
          rows={rows}
          getRowId={row => row.id}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </Box>
      <VuePres 
        nomEntreprise={prestataires.nomEntreprise}
        fonction={prestataires.fonction}
        email={prestataires.email}
        telephone={prestataires.telephone}
        tarif={prestataires.tarif}
        note={prestataires.note}
        open={openO} 
        handleClose={()=>{setOpenO(false)}}
       />
    </>
  );
}
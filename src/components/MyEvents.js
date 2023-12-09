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
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import  VuePres  from './VuePres';
import AddPrestataire from './AddPrestataire';


export default function DataGridDemo() {


  const columns = [
    {
      field: 'nomEvenement',
      headerName: 'Nom Evenement',
      width: 200,
      editable: false,
    },
    {
      field: 'typeEvenement',
      headerName: 'Type Evenement',
      width: 200,
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
      headerName: 'Duree ',
      width: 100,
      editable: false,
    },
    {
      field: 'lieu',
      headerName: 'Lieu',
      width: 150,
      editable: false,
    },
    {
      field: 'budget',
      headerName: 'Bilan Evenement',
      width: 150,
      editable: false,
    },
    {
      field:'btn1',
      headerName: "Prestataires",
      sortable:false,
      with:200,
      filterable: false,
      renderCell: row => (
          <Button  onClick={() => onePresClick(row.id)} >
              <Avatar />
          </Button>
      ),
    },
  {
    field: 'btn2',
    headerName: "",
    sortable: false,
    filterable: false,
    renderCell: row => (
      <Button size='5rem' onClick={()=>oneEditPrest(row.id)}>
        <AddOutlinedIcon color='primary' variant="outlined"/>
      </Button>
    )
  },
  {
    field: 'btn3',
    headerName: "",
    sortable:false,
    filterable: false,
    renderCell: row => (
      <Button  color='error' onClick={()=>{oneDelEvent(row.id)}} >
          <DeleteIcon color='error' variant="outlined"/>
      </Button>
    ),
  },
  ];

  const [rows,setRows]=useState([]);
  const [ide,setIde]=useState(0);
  const [openO,setOpenO]=useState(false);
  var open=false;
  const [prestataires, setPrestataires] = useState([]);

  useEffect(()=>{
    callFetchEvents();
    console.log(rows);
  },[]);

  const callFetchEvents=()=>{
    const token = accountService.getToken("jwt");
    const client = jwtDecode(token);
    const clientId = client.id;
    console.log(client,clientId);
    fetchEvents(token,clientId);
  }


  const fetchEvents = (token,userId) => {
      fetch(SERVER_URL+`event/evenements/${userId}/client`, {
          headers: {Authorization: token},
      })
          .then(response => response.json())
          .then(data=> {setRows(data);console.log("data",data)})
          .catch(err => console.error(err));
  };

  const oneDelEvent = id => {
    if (window.confirm("Etes vous sur de vouloir supprimer l'evenement ? :(")) {
        const token = accountService.getToken("jwt");
        fetch(SERVER_URL+`event/evenements/${id}`, { 
            method: "DELETE",
            headers: {Authorization: token}, 
        })
        .then(response => {
            if (response.ok){
              callFetchEvents();
            } else{
                alert("Un problème est survenu lors de la suppression! Reéssayer :(");
            }
        })
        .catch(err => console.error(err)); 
    }
  };

  const oneEditPrest = (id) =>{
    //window.location.reload();
    setIde(id);
    console.log(ide);
    open=true;
    console.log("open est egal à ",open)
  }

  const onePresClick = id => {
    const token = accountService.getToken("jwt");
    setIde(id);
    fetch(SERVER_URL + `event/evenements/${id}/prestations`, {
        headers: { Authorization: token },
    })
        .then(response => {
            if (response.status === 200) {
                return response.json();
            }
            return null;
        })
        .then(ownerData => {
            // Ajouter le champ "valide" à chaque objet prestataire
            const ownerDataWithValideField = ownerData.map(item => {
                return {
                    ...item,
                    prestataire: { ...item.prestataire, valide: item.valide }
                };
            });

            const prestataires = ownerDataWithValideField.map(item => item.prestataire);
            console.log(prestataires);
            setPrestataires(prestataires);
            console.log(prestataires);
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
                pageSize: 15,
              },
            },
          }}
          pageSizeOptions={[15]}
          disableRowSelectionOnClick
        />
      </Box>
      <VuePres 
        ide={ide}
        rows={prestataires}
        open={openO} 
        handleClose={()=>{setOpenO(false)}}
       />
       {/* {(open===true) ?  : ("")} */}
       <AddPrestataire open={open} ide={ide}/>
    </>
  );
}
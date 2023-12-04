import "../../css/styleDashbord.css"
import React ,{ useEffect, useState } from 'react';
import MyEvents from "../MyEvents";
import PrimarySearchAppBar from "./PrimarySearchAppBar";
import SidebarDashBord from "./SidebarDashbord";
import { Box, Button, IconButton } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { jwtDecode } from "jwt-decode";
import { accountService } from "../../_service/account.service";
import { SERVER_URL } from "../../constants";
import { Check, Clear } from "@mui/icons-material";

const ServicePrestation = () => {

useEffect(()=>{
    recupEvenements();
    console.log(recupId());
},[]);
const [rows,setRows]=useState([]);
const [valider,setValider]=useState();
const [hidec,setHidec]=useState("display");
const [hider,setHider]=useState("display");
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
        field: 'lieu',
        headerName: 'Lieu',
        width: 170,
        editable: false,
    },
    {
      field: 'duree',
      headerName: 'Duree',
      width: 150,
      editable: false,
    },
    {
        field: 'btn2',
        headerName: "",
        sortable: false,
        filterable: false,
        renderCell: row =>{
            if(hidec==="display"){
                return(
                <IconButton  id = 'btnAColorier' color="success" aria-label="Valider" onClick={()=>confirmation(row.id,"Confirmé")}>
                    <Check />
                </IconButton>
                )
            }else if(hidec==="displaytext") {
                setHider("hide");
                return(
                    <p style={{color:"green"}}>Confirmé</p>
                )
            }else{
                return null;
            }
        }
        },
    {
    field: 'btn',
    headerName: "",
    sortable: false,
    filterable: false,
    renderCell: row =>{
            if(hider==="display"){
                return(
                <IconButton id="danger" color="error" onClick={()=>confirmation(row.id,"Refusé")}>
                    <Clear color="error" />
                </IconButton>
                )
            }else if (hider==="displayrtext"){
                setHidec("hide")
                return(
                <p style={{color:"red"}}>Refusé</p>)
            }else{
                return null;
            }
        }
    },

  ];
    const recupId = () =>{
        const roleToken = accountService.getToken("jwt");
        const prestataire = jwtDecode(roleToken);
        return prestataire.id;
    }

    const recupEvenements = () =>{
        const token = accountService.getToken("jwt");
        const id = recupId();
        fetch(SERVER_URL+`event/prestataires/${id}/prestations`, {
            headers: {Authorization: token},
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                const evenements = data.map(item => item.evenement);

                setRows(evenements);
                console.log(rows);
                
                // setPrestataires(ownerData);
                // setOpenO(true);
            })
            .catch(err => console.error(err));
    }

    const donnes = (chaine) => {
        return {valide:chaine};
    }

    const confirmation = (index,chaine) =>{
        // if (window.confirm("Etes vous sur de votre choix ?")) {
            const token = accountService.getToken("jwt");
            const ide = index;
            console.log(ide);
            const idp = recupId();
            fetch(SERVER_URL+`event/prestations/${ide}/${idp}`,
            {   
                method: "PUT",
                headers:{
                    Authorization: token,
                    'Content-Type': 'application/json;charset=UTF-8'
                },
                body: JSON.stringify(donnes(chaine))
            })
            .then(response=>{
                if (response.ok) {
                    recupEvenements();
                    (chaine==="Confirmé") ? setHidec("displaytext") : setHider("displayrtext");   
                }else{
                    alert("Un problème est survenu ! Veuillez reéssayer :(");
                }
            })
            .catch(err => console.error(err));
        //}
    }

    return (
        <div>
            <PrimarySearchAppBar/>
                <div className="dashboard-container">
                    <SidebarDashBord />
                        <div className="content-container">
                            <br/>
                            <h1 id="special1"> Mes Prestations </h1>
                            <br/>
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
                                disableRowSelectionOnClick
                                />
                            </Box>
                    </div>
                </div>
           
        </div>
    );
}

export default ServicePrestation;

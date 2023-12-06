import React, { useEffect, useState } from "react";
import { Box, Dialog } from "@mui/material";
import { DialogActions } from "@mui/material";
import { DialogContent } from "@mui/material";
import { DialogTitle } from "@mui/material";
import { Button } from "@mui/material";
import Clear from "@mui/icons-material/Clear";
import Stack from "@mui/material/Stack";
import { DataGrid } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import { accountService } from "../_service/account.service";
import { SERVER_URL } from "../constants";
import tof from "../assets/img/avatar/customer-service.png"
function VuePres(props) {
  const columns = [
    {
      field: "nomEntreprise",
      headerName: "Nom Entreprise",
      width: 150,
      editable: false,
    },
    {
      field: "fonction",
      headerName: "Service Offert",
      width: 150,
      editable: false,
    },
    {
      field: "adresse",
      headerName: "Adresse",
      width: 110,
      editable: false,
    },
    {
      field: "telephone",
      headerName: "Telephone",
      width: 110,
      editable: false,
    },
    {
      field: "email",
      headerName: "Mail",
      width: 150,
      editable: false,
    },
    {
      field: "tarif",
      headerName: "Tarif",
      width: 100,
      filterable: false,
    },
    {
      field: "starRating",
      headerName: "Note",
      width: 100,
      sortable: false,
      filterable: false,
    },
    {
      field: "",
      headerName: "Etat",
      sortable: false,
      filterable: false,
      renderCell: (row) =>
        row.row.valide === "Confirmé" ? (
          <p style={{ color: "green" }}>Confirmé</p>
        ) : row.row.valide === "Refusé" ? (
          <p style={{ color: "red" }}>Refusé</p>
        ) : (
          <p>en attente</p>
        ),
    },
    {
      field: "other",
      headerName: "",
      sortable: false,
      filterable: false,
      renderCell: (row) => (
        <Button
          color="error"
          onClick={() => {
            oneDelPrest(row.id);
          }}
        >
          <DeleteIcon color="error" variant="outlined" />
        </Button>
      ),
    },
  ];

  const oneDelPrest = (idp) => {
    if (window.confirm("Etes vous sur de vouloir supprimer l'evenement ? :(")) {
      const token = accountService.getToken("jwt");
      fetch(SERVER_URL + `event/prestations/${props.ide}/${idp}`, {
        method: "DELETE",
        headers: { Authorization: token },
      })
        .then((response) => {
          if (response.ok) {
            alert("Suppression Resussi! :)");
            window.location.reload();
          } else {
            alert(
              "Un problème est survenu lors de la suppression! Reéssayer :("
            );
          }
        })
        .catch((err) => console.error(err));
    }
  };

  return (
    <div>
      <Dialog open={props.open} fullScreen onClose={props.handleClose}>
        <center>
          <br/>
          <text id="text-special1">
            <img src={tof} width={70} height={70}/> &nbsp; 
            Prestataires de votre évènement</text>
          <DialogContent>
            <Box sx={{height:650, width:"100%"}}>
              <DataGrid
                rows={props.rows}
                getRowId={(row) => row.id}
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
            <Button
              variant="outlined"
              color="error"
              onClick={props.handleClose}
            >
              <Clear color="red" />
              Fermer
            </Button>
          </DialogActions>
        </center>
      </Dialog>
    </div>
  );
}

export default VuePres;

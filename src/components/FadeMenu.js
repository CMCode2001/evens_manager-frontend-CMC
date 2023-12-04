import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import { FaUserCircle } from 'react-icons/fa';
import { accountService } from '../_service/account.service';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';


export default function FadeMenu(props) {
  const [navigate, setNavigate] = React.useState(false);
  const [username, setUsername] = useState("");
  const [token, setToken] = useState(accountService.getToken("jwt"));
  const handleLogout = () => {
    accountService.logout();
    setToken(null);
    setNavigate(true);
    setUsername("");
    console.log("clean");
}

  useEffect(() => {
      if (typeof token === 'string') {
          const client=jwtDecode(token);
          setUsername(client.sub)
          console.log(client.sub)
      } else {
          console.error('Le token n\'est pas une chaîne valide.');
      }

  }, []);
  
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  if (navigate){
    return <Navigate to={"/login"}/>
  }
  return (
    <div>
      <Button
        id="fade-button"
        aria-controls={open ? 'fade-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
      <button className="btn-search btn btn-primary btn-md-square me-4 rounded-circle d-lg-inline-flex">
        <FaUserCircle />
      </button>
      </Button>
        <text> <b>Hello</b>,&nbsp;
          <text id='text-special'> {username}</text>
        </text>
      <Menu
        id="fade-menu"
        MenuListProps={{
          'aria-labelledby': 'fade-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        {/* <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem> */}
        <MenuItem onClick={() => { handleClose(); handleLogout(); }}>Deconnexion</MenuItem>
      </Menu>
    </div>
  );
}
import axios from 'axios';
import React, { createContext, useContext, useState } from 'react';
import { accountService } from '../_service/account.service';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);


  const login = () => {
    axios.get("http://localhost:8080/login")
      .then(response => {
        accountService.saveToken(response.headers.authorization);
        if (accountService.isLogged(response.headers.authorization)) {
          setIsAuthenticated(true);
        }
      })
      .catch(error => {
        console.log(error);
      });
      if (isAuthenticated){
        return true;
      }
  };

  const logout = () => {
    // Logique de déconnexion ici si nécessaire
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

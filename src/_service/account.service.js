// accountService.js

let saveToken = (token) => {
    localStorage.setItem('token', token);
};

let logout = () => {
    localStorage.removeItem('token');
};

let isLogged = () => {
    let token = localStorage.getItem('token');
    return !!token;
};

let getToken = () => {
    return localStorage.getItem('token');
};

let getUsername = () => {
    return localStorage.getItem('username');
};
let isAuthenticated = () => {
    let token = localStorage.getItem('token');
    return !!token;
};

export const accountService = {
    saveToken,
    logout,
    isLogged,
    getToken,
    getUsername,
    isAuthenticated
};


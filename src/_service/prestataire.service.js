import axios from "axios"

let addUser = (statePrestataire) =>{
    return axios.post('http://localhost:8080/inscriptionPrestataire',statePrestataire)
}

export const prestataireService = {
    addUser
}
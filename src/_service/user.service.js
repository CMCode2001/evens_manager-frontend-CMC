import axios from "axios"

let addUser = (stateClient) =>{
    return axios.post('http://localhost:8080/inscriptionClient',stateClient)
}

export const userService = {
    addUser
} 
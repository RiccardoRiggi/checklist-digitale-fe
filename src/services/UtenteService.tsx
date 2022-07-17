import http from "../http-common";
import { LoginInterface } from "../interfaces/LoginInterface";

let root = "/utenti";



const eseguiAutenticazione = (utente: LoginInterface) => {
    return http.post(root + "/autenticazione", utente);
}

const isAutenticato = () => {
    return http.get(root + "/utenteCorrente");
}



const utenteService = {
    eseguiAutenticazione,
    isAutenticato

};
export default utenteService;
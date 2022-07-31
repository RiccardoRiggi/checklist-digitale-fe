import http, { getConfigHttpRequestForDelete } from "../http-common";
import { getConfigHttpRequest } from "../http-common";
import { LoginInterface } from "../interfaces/LoginInterface";
import { UtenteInterface } from "../interfaces/UtenteInterface";

let root = "/utenti";



const eseguiAutenticazione = (utente: LoginInterface) => {
    return http.post(root + "/autenticazione", utente);
}

const isAutenticato = (token: any) => {
    return http.get(root + "/utenteCorrente",getConfigHttpRequest(token));
}

const listaUtenti = (token: any) => {
    return http.get(root + "/",getConfigHttpRequest(token));
}

const getUtente = (token: any, identificativo: any) => {
    return http.get(root + "/"+identificativo,getConfigHttpRequest(token));
}

const inserisciUtente = (token: any, utente: any) => {
    return http.post(root + "/registra",utente,getConfigHttpRequest(token));
}

const modificaUtente = (token: any, utente: any, idUtente: any) => {
    return http.put(root + "/"+idUtente,utente,getConfigHttpRequest(token));
}

const eliminaUtente = (token: any, utente: any, idUtente: any) => {
    return http.delete(root + "/"+idUtente,getConfigHttpRequestForDelete(token,utente));
}


const utenteService = {
    eseguiAutenticazione,
    isAutenticato,
    listaUtenti,
    getUtente,
    inserisciUtente,
    modificaUtente,
    eliminaUtente

};
export default utenteService;
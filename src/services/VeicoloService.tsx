import http, { getConfigHttpRequestForDelete } from "../http-common";
import { getConfigHttpRequest } from "../http-common";

let root = "/veicoli";



const listaVeicoli = (token: any) => {
    return http.get(root + "/",getConfigHttpRequest(token));
}

const getVeicolo = (token: any, identificativo: any) => {
    return http.get(root + "/"+identificativo,getConfigHttpRequest(token));
}

const inserisciVeicolo = (token: any, utente: any) => {
    return http.post(root + "/inserisci",utente,getConfigHttpRequest(token));
}

const modificaVeicolo = (token: any, utente: any, idUtente: any) => {
    return http.put(root + "/"+idUtente,utente,getConfigHttpRequest(token));
}

const eliminaVeicolo = (token: any, utente: any, idUtente: any) => {
    return http.delete(root + "/"+idUtente,getConfigHttpRequestForDelete(token,utente));
}


const veicoloService = {
    listaVeicoli,
    getVeicolo,
    inserisciVeicolo,
    modificaVeicolo,
    eliminaVeicolo

};
export default veicoloService;
import http, { getConfigHttpRequestForDelete } from "../http-common";
import { getConfigHttpRequest } from "../http-common";

let root = "/checklistTemplate";

let rootRiga = "/rigaChecklistTemplate";



const listaTemplates = (token: any) => {
    return http.get(root + "/",getConfigHttpRequest(token));
}

const getTemplate = (token: any, identificativo: any) => {
    return http.get(root + "/"+identificativo,getConfigHttpRequest(token));
}

const inserisciTemplate = (token: any, utente: any) => {
    return http.post(root + "/inserisci",utente,getConfigHttpRequest(token));
}

const modificaTemplate = (token: any, utente: any, idUtente: any) => {
    return http.put(root + "/"+idUtente,utente,getConfigHttpRequest(token));
}

const eliminaTemplate = (token: any, utente: any, idUtente: any) => {
    return http.delete(root + "/"+idUtente,getConfigHttpRequestForDelete(token,utente));
}

const listaRigaTemplates = (token: any, id: any) => {
    return http.get(rootRiga + "/lista/"+id,getConfigHttpRequest(token));
}

const getRigaTemplate = (token: any, identificativo: any) => {
    return http.get(rootRiga + "/"+identificativo,getConfigHttpRequest(token));
}

const inserisciRigaTemplate = (token: any, utente: any) => {
    return http.post(rootRiga + "/inserisci",utente,getConfigHttpRequest(token));
}

const modificaRigaTemplate = (token: any, utente: any, idUtente: any) => {
    return http.put(rootRiga + "/"+idUtente,utente,getConfigHttpRequest(token));
}

const eliminaRigaTemplate = (token: any, utente: any, idUtente: any) => {
    return http.delete(rootRiga + "/"+idUtente,getConfigHttpRequestForDelete(token,utente));
}


const templateService = {
    listaTemplates,
    getTemplate,
    inserisciTemplate,
    modificaTemplate,
    eliminaTemplate,
    listaRigaTemplates,
    getRigaTemplate,
    inserisciRigaTemplate,
    modificaRigaTemplate,
    eliminaRigaTemplate,

};
export default templateService;
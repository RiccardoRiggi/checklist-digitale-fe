import http, { getConfigHttpRequestForDelete } from "../http-common";
import { getConfigHttpRequest } from "../http-common";

let root = "/checklist";

let rootRiga = "/rigaChecklist";

const listaChecklistCompletatePerVeicolo = (token: any, identificativo: any) => {
    return http.get(root + "/listaCompletatePerVeicolo/"+identificativo,getConfigHttpRequest(token));
}

const listaChecklistDaCompletarePerVeicolo = (token: any, identificativo: any) => {
    return http.get(root + "/listaDaCompletarePerVeicolo/"+identificativo,getConfigHttpRequest(token));
}

const listaChecklist = (token: any) => {
    return http.get(root + "/",getConfigHttpRequest(token));
}

const getChecklist = (token: any, identificativo: any) => {
    return http.get(root + "/"+identificativo,getConfigHttpRequest(token));
}

const inserisciChecklist = (token: any, utente: any) => {
    return http.post(root + "/inserisci",utente,getConfigHttpRequest(token));
}

const modificaChecklist = (token: any, utente: any, idUtente: any) => {
    return http.put(root + "/"+idUtente,utente,getConfigHttpRequest(token));
}

const confermaChecklist = (token: any, utente: any, idUtente: any) => {
    return http.put(root + "/conferma/"+idUtente,utente,getConfigHttpRequest(token));
}

const eliminaChecklist = (token: any, utente: any, idUtente: any) => {
    return http.delete(root + "/"+idUtente,getConfigHttpRequestForDelete(token,utente));
}

const listaRigheChecklist = (token: any, id: any) => {
    return http.get(rootRiga + "/lista/"+id,getConfigHttpRequest(token));
}

const aggiornaRigaChecklist = (token: any, utente: any, idUtente: any) => {
    return http.put(rootRiga + "/"+idUtente,utente,getConfigHttpRequest(token));
}

const checklistService = {
    listaChecklistCompletatePerVeicolo,
    listaChecklistDaCompletarePerVeicolo,
    listaChecklist,
    getChecklist,
    inserisciChecklist,
    modificaChecklist,
    confermaChecklist,
    eliminaChecklist,
    listaRigheChecklist,
    aggiornaRigaChecklist,

};
export default checklistService;
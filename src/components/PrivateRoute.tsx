import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { fetchMantieniMessaggiAction, fetchTestoDangerAction } from '../modules/feedback/actions';

export default function PrivateRoute({ children }: any) {
    const utenteLoggato = useSelector((state: any) => state.utenteLoggato.utente);
    const ruoloUtente = utenteLoggato.tRuoloCodice;
    const dispatch = useDispatch();
    let path = window.location.pathname;

    const isAutorizzato = (ruoloUtente: any, path: any) => {
        let autorizzato = false;
        
        if(path=="/"){
            autorizzato=true;
        }else if(ruoloUtente=="U" && !isPaginaAltiPrivilegi(path)){
            autorizzato=true;
        }else if(ruoloUtente=="A"){
            autorizzato=true;
        }
        return autorizzato;
    }

    if (!isLoggedIn(utenteLoggato)) {
        return <Navigate to="/login" replace />;
    } else {
        console.error(ruoloUtente);
        if (isAutorizzato(ruoloUtente, path)) {
            return children;
        } else {
            dispatch(fetchMantieniMessaggiAction(true));
            dispatch(fetchTestoDangerAction("L'utente non è autorizzato ad accedere alla pagina scelta"));
            window.location.href="/";
        }

    }
};

const paginePrivilegiElevati = [
    "utenti","scheda-utente","veicoli","scheda-veicolo","scheda-template","templates"
]

function isPaginaAltiPrivilegi(path: any){
    let esito = false;
    paginePrivilegiElevati.forEach(pagina => {
        if(path.includes(pagina)){
            esito = true;
        }
    });
    return esito;
}




const isLoggedIn = (token: any) => {

    return token != null;
}
import { UtenteInterface } from "../interfaces/UtenteInterface";

export default function SchedaUtenteValidator(utente: UtenteInterface, identificativo: any) {
    let errors: any = {};
    
    if (utente == undefined || utente.nome == undefined || utente.nome == "") {
        errors.nome = "Il nome è richiesto";
    }

    if (utente == undefined || utente.cognome == null || utente.cognome == "") {
        errors.cognome = "Il cognome è richiesto";
    }
    
    if (utente == undefined || utente.dataDiNascita == null) {
        errors.dataDiNascita = "La data di nascita è richiesta";
    } else if (utente.dataDiNascita > new Date()) {
        errors.dataDiNascita = "La data di nascita non può essere successiva alla data odierna";
    }

    if (utente == undefined || utente.email == null || utente.email == "") {
        errors.email = "L'email è richiesta";
    }

    if ((utente == undefined || utente.password == null || utente.password == "" ) && identificativo == null) {
        errors.password = "La password è richiesta";
    }else if(identificativo == null && utente.password.length<6 ){
        errors.password = "La password deve essere lunga almeno 6 caratteri";
    }

    if (utente == undefined || utente.tRuoloCodice == null || utente.tRuoloCodice == "") {
        errors.tRuoloCodice = "Il ruolo è richiesto";
    }

    return errors;
} 
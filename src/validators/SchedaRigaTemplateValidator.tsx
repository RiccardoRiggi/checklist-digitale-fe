import { RigaTemplateInterface } from "../interfaces/RigaTemplateInterface";

export default function SchedaRigaTemplateValidator(riga: RigaTemplateInterface) {
    let errors: any = {};
    
    if (riga == undefined || riga.nome == undefined || riga.nome == "") {
        errors.nome = "Il nome è richiesto";
    }

    if (riga == undefined || riga.descrizione == undefined || riga.descrizione == "") {
        errors.descrizione = "La descrizione è richiesta";
    }

    if (riga.quantita == undefined || riga.quantita == null) {
        errors.quantita = "La quantità è richiesta";
    }

    return errors;
} 
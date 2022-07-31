import { UtenteInterface } from "../interfaces/UtenteInterface";
import { VeicoloInterface } from "../interfaces/VeicoloInterface";

export default function SchedaVeicoloValidator(veicolo: VeicoloInterface, identificativo: any) {
    let errors: any = {};
    console.error(veicolo);
    
    if (veicolo == undefined || veicolo.nome == undefined || veicolo.nome == "") {
        errors.nome = "Il nome è richiesto";
    }

    if (veicolo == undefined || veicolo.selettiva == null || veicolo.selettiva == "") {
        errors.selettiva = "La selettiva è richiesta";
    }

    if (veicolo == undefined || veicolo.tVeicoloCodice == null || veicolo.tVeicoloCodice == "") {
        errors.tVeicoloCodice = "Il tipo veicolo è richiesto";
    }

    console.error(errors);

    return errors;
} 
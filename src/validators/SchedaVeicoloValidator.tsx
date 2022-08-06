import { VeicoloInterface } from "../interfaces/VeicoloInterface";

export default function SchedaVeicoloValidator(veicolo: VeicoloInterface, identificativo: any) {
    let errors: any = {};
    
    if (veicolo == undefined || veicolo.nome == undefined || veicolo.nome == "") {
        errors.nome = "Il nome è richiesto";
    }

    if (veicolo == undefined || veicolo.selettiva == null || veicolo.selettiva == "") {
        errors.selettiva = "La selettiva è richiesta";
    }

    if (veicolo == undefined || veicolo.tVeicoloCodice == null || veicolo.tVeicoloCodice == "") {
        errors.tVeicoloCodice = "Il tipo veicolo è richiesto";
    }

    return errors;
} 
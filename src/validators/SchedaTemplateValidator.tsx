import { TemplateInterface } from "../interfaces/TemplateInterface";

export default function SchedaTemplateValidator(template: TemplateInterface, identificativo: any) {
    let errors: any = {};
    
    if (template == undefined || template.nome == undefined || template.nome == "") {
        errors.nome = "Il nome è richiesto";
    }

    if (template.veicoloIdentificativo == undefined || template.veicoloIdentificativo == null) {
        errors.veicoloIdentificativo = "La selettiva è richiesta";
    }

    return errors;
} 
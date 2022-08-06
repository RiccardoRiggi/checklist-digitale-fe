import { ChecklistInterface } from "../interfaces/ChecklistInterface";
import { TemplateInterface } from "../interfaces/TemplateInterface";

export default function SchedaChecklistValidator(checklist: ChecklistInterface, identificativo: any) {
    let errors: any = {};
    console.error(checklist);
    
    if (checklist == undefined || checklist.nome == undefined || checklist.nome == "") {
        errors.nome = "Il nome è richiesto";
    }

    

    if (checklist.checklistTemplateIdentificativo == undefined || checklist.checklistTemplateIdentificativo == null) {
        errors.checklistTemplateIdentificativo = "Il template è richiesto";
    }

    console.error(errors);

    return errors;
} 
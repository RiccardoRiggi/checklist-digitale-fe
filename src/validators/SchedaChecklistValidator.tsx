import { ChecklistInterface } from "../interfaces/ChecklistInterface";

export default function SchedaChecklistValidator(checklist: ChecklistInterface, identificativo: any) {
    let errors: any = {};
    
    if (checklist == undefined || checklist.nome == undefined || checklist.nome == "") {
        errors.nome = "Il nome è richiesto";
    }

    

    if (checklist.checklistTemplateIdentificativo == undefined || checklist.checklistTemplateIdentificativo == null) {
        errors.checklistTemplateIdentificativo = "Il template è richiesto";
    }

    return errors;
} 
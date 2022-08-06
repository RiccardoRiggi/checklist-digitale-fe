
export interface ChecklistInterface {
    identificativo?: number,
	nome: string,
	note: string,
	isCompletato: boolean,
	userInsert: string,
	dateInsert: Date,
	userUpdate: string,
	dateUpdate: Date,
	userDelete: string,
	dateDelete: Date,
	veicoloIdentificativo: number,
	checklistTemplateIdentificativo: number
}
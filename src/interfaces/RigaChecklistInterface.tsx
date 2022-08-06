export interface RigaChecklistInterface {
    identificativo?: number,
	nome: string,
	descrizione: string,
	note: string,
	isConfermato: boolean,
	quantitaRiferimento: number,
	userInsert: string,
	dateInsert: Date,
	userUpdate: string,
	dateUpdate: Date,
	userDelete: string,
	dateDelete: Date,
	checklistIdentificativo: number
}
import { VeicoloInterface } from "./VeicoloInterface";

export interface TemplateInterface {
    identificativo?: number,
	nome: string,
	userInsert: string,
	dateInsert: Date,
	userUpdate: string,
	dateUpdate: Date,
	userDelete: string,
	dateDelete: Date,
	veicoloIdentificativo: number,
	veicolo: VeicoloInterface
}
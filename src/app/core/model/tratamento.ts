import { Time } from "@angular/common"
import { Agendamento } from "./agendamento"

export interface Tratamento {
    pacienteID: number,
	assinatura:Blob,
	formaPagamento:string,
	procedimentos:[Agendamento]
}
    
   
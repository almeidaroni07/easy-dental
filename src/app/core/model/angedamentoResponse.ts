import { AgendamentoCor } from "./agendamentoCor"

export interface AgendamentoResponse {
    tratamentoID:number,
    agendamentoID:number,
    pacienteID:number,
    procedimento:string,
    paciente:string,
    data: Date,
    inicio: string,
    fim: string,	
    dataHoraInicio: string,
	dataHoraFim: string	
    cor: AgendamentoCor;
}

export interface AgendamentoResponse {
    tratamentoID:number,
    agendamentoID:number,
    procedimento:number,
    paciente:string,
    data: Date,
    inicio: string,
    fim: string,	
    dataHoraInicio: string,
	dataHoraFim: string	
}
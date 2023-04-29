
import { AgendamentoCor } from "./agendamentoCor";
import { AgendamentoResponse } from "./angedamentoResponse";

export interface Agenda {
    agendamentos:[AgendamentoResponse],
    agendamentosHoje:[AgendamentoResponse],
    cores:[AgendamentoCor],		
}
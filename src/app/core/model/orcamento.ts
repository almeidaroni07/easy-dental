import { OrcamentoProcedimento } from "./orcamentoProcedimento";

export interface Orcamento {
    orcamentoID:number,
    pacienteID:number,
    pacienteNome:string;
    data: Date,
    dataFmt:string;
    valorTotal: number,
    procedimentos: [OrcamentoProcedimento]		

}
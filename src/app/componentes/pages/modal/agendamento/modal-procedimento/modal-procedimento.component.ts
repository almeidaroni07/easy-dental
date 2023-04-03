import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { OrcamentoProcedimento } from 'src/app/core/model/orcamentoProcedimento';
import { OrcamentoService } from 'src/app/core/orcamento/orcamento.service';

@Component({
  selector: 'app-modal-procedimento',
  templateUrl: './modal-procedimento.component.html',
  styleUrls: ['./modal-procedimento.component.css']
})
export class ModalProcedimentoComponent implements OnInit {

  @Output() passMessage: EventEmitter<any> = new EventEmitter();
  @Input() orcamentoID: number;
  @Input() valorTotal: number;
  procedimentos: any | OrcamentoProcedimento = [];

  constructor(public activeModal: NgbActiveModal,
              private service: OrcamentoService) { }

              
  ngOnInit(): void {
    try {
      this.procedimentos = [];
      this.service.getProcedimentosOrcamento(this.orcamentoID).subscribe(resp =>{
        let procedimentos: OrcamentoProcedimento | any = resp;
        console.log("JSON: ", JSON.stringify(procedimentos));
        for (var orcamento of procedimentos) {
          this.procedimentos.push(orcamento);
        }
      });
    } catch (error) {
      console.error(error);
    }
  }

  

}

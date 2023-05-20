import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AgendamentoService } from 'src/app/core/agendamento/agendamento.service';

@Component({
  selector: 'app-modal-cancelar-agendamento',
  templateUrl: './modal-cancelar-agendamento.component.html',
  styleUrls: ['./modal-cancelar-agendamento.component.css']
})
export class ModalCancelarAgendamentoComponent {

  constructor(public activeModal: NgbActiveModal,
              private service: AgendamentoService) { }
              

}

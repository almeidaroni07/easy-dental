import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ProcedimentoService } from 'src/app/core/procedimento/procedimento.service';

@Component({
  selector: 'app-modal-deletar-procedimento',
  templateUrl: './modal-deletar-procedimento.component.html',
  styleUrls: ['./modal-deletar-procedimento.component.css']
})
export class ModalDeletarProcedimentoComponent {
  
  @Output() passMessage: EventEmitter<any> = new EventEmitter();
  @Input() id: number;
  @Input() nome: string;
  
  constructor(public activeModal: NgbActiveModal, private service: ProcedimentoService) { }

  delete(){
    this.service.delete(this.id).subscribe(resp =>{
      this.passMessage.emit({error: false, message: 'Procedimento deletado com sucesso.'});
      this.activeModal.close();
    });
  }

}

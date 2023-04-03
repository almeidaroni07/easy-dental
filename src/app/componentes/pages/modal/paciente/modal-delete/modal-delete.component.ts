import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PacienteService } from 'src/app/core/paciente/paciente.service';

@Component({
  selector: 'app-modal-delete',
  templateUrl: './modal-delete.component.html',
  styleUrls: ['./modal-delete.component.css']
})
export class ModalDeleteComponent {

  @Output() passMessage: EventEmitter<any> = new EventEmitter();
  @Input() id: number;
  @Input() nome: string;
  
  constructor(public activeModal: NgbActiveModal, private service: PacienteService) { }

  delete(){
    this.service.delete(this.id).subscribe(resp =>{
      this.passMessage.emit({error: false, message: 'Paciente deletado com sucesso.'});
      this.activeModal.close();
    });
  }
}

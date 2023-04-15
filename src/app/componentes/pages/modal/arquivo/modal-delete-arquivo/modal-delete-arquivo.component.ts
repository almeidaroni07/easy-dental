import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ArquivoService } from 'src/app/core/arquivo/arquivo.service';

@Component({
  selector: 'app-modal-delete-arquivo',
  templateUrl: './modal-delete-arquivo.component.html',
  styleUrls: ['./modal-delete-arquivo.component.css']
})
export class ModalDeleteArquivoComponent {
  @Output() passMessage: EventEmitter<any> = new EventEmitter();
  @Input() id: number;
  @Input() nome: string;
  
  constructor(public activeModal: NgbActiveModal, private service: ArquivoService) { }

  delete(){
    this.service.delete(this.id).subscribe(resp =>{
      this.passMessage.emit({error: false, message: 'Arquivo deletado com sucesso.'});
      this.activeModal.close();
    });
  }
}

import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { OpenEventArgs } from '@syncfusion/ej2-angular-inputs';
import { ProcedimentoService } from 'src/app/core/procedimento/procedimento.service';

@Component({
  selector: 'app-modal-add-procedimento',
  templateUrl: './modal-add-procedimento.component.html',
  styleUrls: ['./modal-add-procedimento.component.css']
})
export class ModalAddProcedimentoComponent implements OnInit {
  
  @Output() passMessage: EventEmitter<any> = new EventEmitter();
  form !: FormGroup;

  constructor(public activeModal: NgbActiveModal,
              private formBuilder: FormBuilder,
              private service: ProcedimentoService) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nome:['', [Validators.required]],
      valor:['', [Validators.required]],
      cor:['', [Validators.required]]
    })
  }

  salvar(){
    this.service.salvar(this.form.value).subscribe(resp =>{
      this.passMessage.emit({error: false, message: 'Procedimento adicionado com sucesso.'});
      this.activeModal.close();
    });
  }

  botaoHabilitado(): string{
    if(this.form.valid){
      return 'btn-info';
    }
    return '';
  }

  onOpenColor(args: OpenEventArgs): void {
    args.element.querySelector('.e-handler')?.classList.add('e-icons');
}

}

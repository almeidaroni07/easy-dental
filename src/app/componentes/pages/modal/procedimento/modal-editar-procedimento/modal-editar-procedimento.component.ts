import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Procedimento } from 'src/app/core/model/procedimento';
import { ProcedimentoService } from 'src/app/core/procedimento/procedimento.service';


@Component({
  selector: 'app-modal-editar-procedimento',
  templateUrl: './modal-editar-procedimento.component.html',
  styleUrls: ['./modal-editar-procedimento.component.css']
})
export class ModalEditarProcedimentoComponent implements OnInit {

  @Output() passMessage: EventEmitter<any> = new EventEmitter();
  @Input() id: number;
  
  form !: FormGroup;
  nome: string;
  procedimento: Procedimento | any;

  constructor(public activeModal: NgbActiveModal,
              private formBuilder: FormBuilder,
              private service: ProcedimentoService) { }

  ngOnInit(): void {
    this.service.buscarPorID(this.id).subscribe(resp =>{
      this.procedimento = resp;
      this.nome = this.procedimento.nome;
      this.form = this.formBuilder.group({
        nome:[this.procedimento.nome, [Validators.required]],
        valor:[this.procedimento.valor, [Validators.required]],
        cor:[this.procedimento.cor, [Validators.required]]
      })
    })
  }

  salvar(){
    this.service.update(this.id, this.form.value).subscribe(resp =>{
      this.passMessage.emit({error: false, message: 'Procedimento Atualizado com sucesso.'});
      this.activeModal.close();
    });
  }

  botaoHabilitado(): string{
    if(this.form.valid){
      return 'btn-info';
    }
    return '';
  }

}

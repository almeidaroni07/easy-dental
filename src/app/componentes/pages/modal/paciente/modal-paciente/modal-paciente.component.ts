import { DatePipe } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PacienteService } from 'src/app/core/paciente/paciente.service';

@Component({
  selector: 'app-modal-paciente',
  templateUrl: './modal-paciente.component.html',
  styleUrls: ['./modal-paciente.component.css']
})
export class ModalPacienteComponent implements OnInit {

  form !: FormGroup;

  @Output() passMessage: EventEmitter<any> = new EventEmitter();

  constructor(public activeModal: NgbActiveModal,
              private formBuilder: FormBuilder,
              private service: PacienteService,
              private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nome:['', [Validators.required]],
      email:['', [Validators.required, Validators.email]],
      cpf:['', [Validators.required]],
      rg:['', [Validators.required]],
      rua:['', [Validators.required]],
      bairro:['', [Validators.required]],
      cidade:['', [Validators.required]],
      estado:['', [Validators.required]],
      dataNascimento:[this.datePipe.transform(new Date(),"yyyy-MM-dd"), [Validators.required]],
    })
  }

  salvar(){
    this.service.salvar(this.form.value).subscribe(resp =>{
      this.passMessage.emit({error: false, message: 'Paciente adicionado com sucesso.'});
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

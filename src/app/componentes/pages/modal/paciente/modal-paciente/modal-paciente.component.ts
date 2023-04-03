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
      nome:['Roni', [Validators.required]],
      email:['roni@gmail.com', [Validators.required, Validators.email]],
      cpf:['40936986867', [Validators.required]],
      rg:['370011387', [Validators.required]],
      rua:['Rua Luiz grassmann 103', [Validators.required]],
      bairro:['Jardim Mirante', [Validators.required]],
      cidade:['São Paulo', [Validators.required]],
      estado:['SP', [Validators.required]],
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

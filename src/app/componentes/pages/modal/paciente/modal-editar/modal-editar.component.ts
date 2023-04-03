import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Paciente } from 'src/app/core/paciente/paciente';
import { PacienteService } from 'src/app/core/paciente/paciente.service';

@Component({
  selector: 'app-modal-editar',
  templateUrl: './modal-editar.component.html',
  styleUrls: ['./modal-editar.component.css']
})
export class ModalEditarComponent implements OnInit  {

  form !: FormGroup;
  paciente: Paciente | any;
  nome: string;

  @Output() passMessage: EventEmitter<any> = new EventEmitter();
  @Input() id: number;

  constructor(public activeModal: NgbActiveModal,
              private formBuilder: FormBuilder,
              private service: PacienteService,
              private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.service.buscarPorID(this.id).subscribe(resp =>{
      this.paciente = resp;
      this.nome = this.paciente.nome;
      this.form = this.formBuilder.group({
                                          nome:[this.paciente.nome, [Validators.required]],
                                          email:[this.paciente.email, [Validators.required, Validators.email]],
                                          cpf:[this.paciente.cpf, [Validators.required]],
                                          rg:[this.paciente.rg, [Validators.required]],
                                          rua:[this.paciente.rua, [Validators.required]],
                                          bairro:[this.paciente.bairro, [Validators.required]],
                                          cidade:[this.paciente.cidade, [Validators.required]],
                                          estado:[this.paciente.estado, [Validators.required]],
                                          dataNascimento:[this.datePipe.transform(this.paciente.dataNascimento,"yyyy-MM-dd"), [Validators.required]],
                                        });
    });
  }

  update(){
    this.service.update(this.form.value, this.id).subscribe(resp =>{
      this.passMessage.emit({error: false, message: 'Paciente Atualizado com sucesso.'});
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

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AgendamentoService } from 'src/app/core/agendamento/agendamento.service';
import { StatusPaciente } from 'src/app/core/model/statusPaciente';

@Component({
  selector: 'app-modal-status-agendamento',
  templateUrl: './modal-status-agendamento.component.html',
  styleUrls: ['./modal-status-agendamento.component.css']
})
export class ModalStatusAgendamentoComponent implements OnInit {

  @Output() passMessage: EventEmitter<any> = new EventEmitter();
  @Input() id: number;
  form !: FormGroup;

  status: StatusPaciente [] | any  = [];

  constructor(public activeModal: NgbActiveModal,
              private service: AgendamentoService,
              private formBuilder: FormBuilder) { }


  ngOnInit(): void {
    this.form = this.formBuilder.group({
      status:['', [Validators.required]]
    })

    this.service.getListStatusAgendamento().subscribe(resp =>{
      this.status = resp;
    });
  }

  salvar(){
    this.service.updateStatusConsulta(this.id, this.form.get("status")?.value).subscribe(
        resp =>{
            if('OK' == resp){
              this.passMessage.emit({error: false, message: 'Status da consulta atualizado com sucesso.'});
            }else{
              this.passMessage.emit({error: true, message: resp});
            }
            this.activeModal.close();
       },
       error =>{
        this.passMessage.emit({error: true, message: "Error inesperado"});
        this.activeModal.close();
       }
    );
  }

}

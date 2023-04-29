import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalAgendamentoComponent } from '../modal/agendamento/modal-agendamento/modal-agendamento.component';
import { Response } from 'src/app/core/message/response';
import { AgendamentoResponse } from 'src/app/core/model/angedamentoResponse';
import { AgendamentoService } from 'src/app/core/agendamento/agendamento.service';
import { Agenda } from 'src/app/core/model/agenda';
import { ModalInfoPacienteComponent } from '../modal/agendamento/modal-info-paciente/modal-info-paciente.component';
import { CalendarioComponent } from '../templates/calendario/calendario.component';

@Component({
  selector: 'app-agendamento',
  templateUrl: './agendamento.component.html',
  styleUrls: ['./agendamento.component.css']
})
export class AgendamentoComponent implements OnInit, AfterViewInit {

  configModal = {
    backdrop: false,
    ignoreBackdropClick: false,
    size: 'xl',
    centered: true
  };

  configModalMenor = {
    backdrop: false,
    ignoreBackdropClick: false,
    size: 'lg',
    centered: true
  };

  @ViewChild(CalendarioComponent, {static:true}) componentCalendario: CalendarioComponent;
  responseMessage: Response = {error:false, message:''};
  agendamentos: any | AgendamentoResponse = [];

  constructor(private elementRef: ElementRef,
              private modalService: NgbModal,
              private service: AgendamentoService) { }

  ngAfterViewInit(): void {
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundImage = "url('')";
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = 'white';
  }

  ngOnInit(): void {
    this.updateAgendamentos();
  }

  openModalAddAgendamento(){
    try {
      const modalAdd = this.modalService.open(ModalAgendamentoComponent, this.configModal);
      modalAdd.componentInstance.passMessage.subscribe((response: Response) => {
        this.responseMessage = response;
        if(!this.responseMessage.error){
          this.updateAgendamentos();
          this.componentCalendario.updateAgendamentos();
        }
     })
    } catch (error) {
      
    }
  }


  openModalInfoPaciente(tratamentoID: number, pacienteID: number, nomePaciente: string){
    try {
      const modal = this.modalService.open(ModalInfoPacienteComponent, this.configModal);
      modal.componentInstance.tratamentoID = tratamentoID;
      modal.componentInstance.pacienteID = pacienteID;
      modal.componentInstance.nome = nomePaciente;
    } catch (error) {
      
    }
  }

  updateAgendamentos(){
    try {
      this.agendamentos = [];
      this.service.getListAgendamento().subscribe(response =>{
        let agenda: Agenda | any = response;
        console.log("agenda.agendamentosHoje: "+agenda.agendamentosDeHoje);
        if(undefined != agenda.agendamentosDeHoje && null != agenda.agendamentosDeHoje){
          for (let agendamento of agenda.agendamentosDeHoje) {
            this.agendamentos.push(agendamento);
          }
        }
      });
    } catch (error) {
      console.error(error);
    }
  }

  styleColor(color: string){
    return "background-color: "+color+";"
  }

}

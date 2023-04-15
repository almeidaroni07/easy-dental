import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalAgendamentoComponent } from '../modal/agendamento/modal-agendamento/modal-agendamento.component';
import { Response } from 'src/app/core/message/response';
import { AgendamentoResponse } from 'src/app/core/model/angedamentoResponse';
import { AgendamentoService } from 'src/app/core/agendamento/agendamento.service';
import { AssinaturaComponent } from '../modal/agendamento/assinatura/assinatura.component';

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
        }
     })
    } catch (error) {
      
    }
  }


  openModalAssinatura(tratamentoID: number){
    try {
      const modal = this.modalService.open(AssinaturaComponent, this.configModal);
      modal.componentInstance.tratamentoID = tratamentoID;
    } catch (error) {
      
    }
  }

  updateAgendamentos(){
    try {
      this.agendamentos = [];
      this.service.getListAgendamento().subscribe(response =>{
        let list: [AgendamentoResponse] | any = response;
        for (let agendamento of list) {
          this.agendamentos.push(agendamento);
        }
      });
    } catch (error) {
      console.error(error);
    }
  }

}

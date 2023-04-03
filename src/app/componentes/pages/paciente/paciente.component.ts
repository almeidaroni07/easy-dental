import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MdbTableDirective, MdbTablePaginationComponent } from 'ng-uikit-pro-standard';
import { Response } from 'src/app/core/message/response';
import { Paciente } from 'src/app/core/model/paciente';
import { PacienteService } from 'src/app/core/paciente/paciente.service';
import { ModalUpdateAnamneseComponent } from '../modal/paciente/modal-update-anamnese/modal-update-anamnese.component';
import { ModalDeleteComponent } from '../modal/paciente/modal-delete/modal-delete.component';
import { ModalEditarComponent } from '../modal/paciente/modal-editar/modal-editar.component';
import { ModalPacienteComponent } from '../modal/paciente/modal-paciente/modal-paciente.component';

@Component({
  selector: 'app-paciente',
  templateUrl: './paciente.component.html',
  styleUrls: ['./paciente.component.css']
})
export class PacienteComponent implements OnInit, AfterViewInit  {

  @ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination: MdbTablePaginationComponent;
  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective;
  elements: any | Paciente = [];
  previous: any = [];
  headElements = ['ID', 'Nome', 'Email', 'Status', 'Ultima Consulta', '', '', ''];

  responseMessage: Response = {error:false, message:''};

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


  constructor(private cdRef: ChangeDetectorRef,
              private modalService: NgbModal,
              private service: PacienteService){}


  ngAfterViewInit(): void {
    if(undefined != this.mdbTablePagination){
      this.mdbTablePagination.setMaxVisibleItemsNumberTo(5);
  
      this.mdbTablePagination.calculateFirstItemIndex();
      this.mdbTablePagination.calculateLastItemIndex();
    }
    this.cdRef.detectChanges();
  }
 

  ngOnInit(): void {
    this.updateTable();
  }


  openModalAddPaciente(){
    try {
       const modalAdd = this.modalService.open(ModalPacienteComponent, this.configModal);

       modalAdd.componentInstance.passMessage.subscribe((response: Response) => {
          this.responseMessage = response;
          if(false == this.responseMessage.error){
            this.updateTable();
          }
       })
       
    } catch (error) {
      console.error(error);
    }
  }


  openModalEditPaciente(id: number){
    try {
       const modalEdit =  this.modalService.open(ModalEditarComponent, this.configModal);
       
       modalEdit.componentInstance.id = id;

       modalEdit.componentInstance.passMessage.subscribe((response: Response) => {
          this.responseMessage = response;
          if(false == this.responseMessage.error){
            this.updateTable();
          }
       })
    } catch (error) {
      console.error(error);
    }
  }


  openModalDeletePaciente(id: number, nome: string){
    try {
       const modalDelete =  this.modalService.open(ModalDeleteComponent, this.configModalMenor);
       
       modalDelete.componentInstance.id = id;
       modalDelete.componentInstance.nome = nome;

       modalDelete.componentInstance.passMessage.subscribe((response: Response) => {
          this.responseMessage = response;
          if(false == this.responseMessage.error){
            this.updateTable();
          }
       })
    } catch (error) {
      console.error(error);
    }
  }


  openModalUpdateAnamnese(id: number, nome: string){
    try {
       const modal =  this.modalService.open(ModalUpdateAnamneseComponent, this.configModal);

       modal.componentInstance.id = id;
       modal.componentInstance.nome = nome;
       
    } catch (error) {
      console.error(error);
    }
  }


  updateTable(){
    try {
      this.elements = [];
      this.service.getListPacientes().subscribe(resp =>{
        let pacientes: Paciente | any = resp;
        for (var paci of pacientes) {
          this.elements.push(paci);
        }

        if(undefined != this.mdbTable){
          this.mdbTable.setDataSource(this.elements);
          this.elements = this.mdbTable.getDataSource();
          this.previous = this.mdbTable.getDataSource();
        }
      });
    } catch (error) {
      console.error(error);
    }
  }
  
}


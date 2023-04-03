import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MdbTableDirective, MdbTablePaginationComponent } from 'ng-uikit-pro-standard';
import { Response } from 'src/app/core/message/response';
import { Procedimento } from 'src/app/core/model/procedimento';
import { ProcedimentoService } from 'src/app/core/procedimento/procedimento.service';
import { ModalAddProcedimentoComponent } from '../modal/procedimento/modal-add-procedimento/modal-add-procedimento.component';
import { ModalDeletarProcedimentoComponent } from '../modal/procedimento/modal-deletar-procedimento/modal-deletar-procedimento.component';
import { ModalEditarProcedimentoComponent } from '../modal/procedimento/modal-editar-procedimento/modal-editar-procedimento.component';

@Component({
  selector: 'app-procedimento',
  templateUrl: './procedimento.component.html',
  styleUrls: ['./procedimento.component.css']
})
export class ProcedimentoComponent implements OnInit, AfterViewInit {

  @ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination: MdbTablePaginationComponent;
  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective;
  elements: any | Procedimento = [{id:1, nome:'faceta', preco:4000}];
  previous: any = [];
  headElements = ['ID', 'Nome', 'valor', 'Cor', '', ''];

  responseMessage: Response = {error:false, message:''};

  configModal = {
    backdrop: false,
    ignoreBackdropClick: false,
    size: 'lg',
    centered: true
  };


  constructor(private cdRef: ChangeDetectorRef,
              private modalService: NgbModal,
              private service:  ProcedimentoService){}


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

  openModalAdd(){
    try {
       const modalAdd =  this.modalService.open(ModalAddProcedimentoComponent, this.configModal);

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
       const modalEdit =  this.modalService.open(ModalEditarProcedimentoComponent, this.configModal);
       
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
       const modalDelete =  this.modalService.open(ModalDeletarProcedimentoComponent, this.configModal);
       
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


  updateTable(){
    try {
      this.elements = [];
      this.service.getProcedimentos().subscribe(resp =>{
        let procedimentos: Procedimento | any = resp;
        for (var paci of procedimentos) {
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

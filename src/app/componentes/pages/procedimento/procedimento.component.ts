import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MdbTableDirective, MdbTablePaginationComponent } from 'ng-uikit-pro-standard';
import { Response } from 'src/app/core/message/response';
import { Procedimento } from 'src/app/core/model/procedimento';
import { ProcedimentoService } from 'src/app/core/procedimento/procedimento.service';
import { ModalAddProcedimentoComponent } from '../modal/procedimento/modal-add-procedimento/modal-add-procedimento.component';
import { ModalDeletarProcedimentoComponent } from '../modal/procedimento/modal-deletar-procedimento/modal-deletar-procedimento.component';
import { ModalEditarProcedimentoComponent } from '../modal/procedimento/modal-editar-procedimento/modal-editar-procedimento.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-procedimento',
  templateUrl: './procedimento.component.html',
  styleUrls: ['./procedimento.component.css']
})
export class ProcedimentoComponent implements OnInit {

  responseMessage: Response = {error:false, message:''};

  configModal = {
    backdrop: false,
    ignoreBackdropClick: false,
    size: 'lg',
    centered: true
  };


  @ViewChild(MatPaginator) paginator: MatPaginator;

  tableArquivos: Procedimento [] = [];
  displayedColumns: string[] = ['id', 'nome', 'valor', 'cor', 'editar', 'deletar'];
  dataSource = new MatTableDataSource<Procedimento>(this.tableArquivos);

  constructor(private modalService: NgbModal,
              private service:  ProcedimentoService){}

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
      this.service.getProcedimentos().subscribe(resp =>{
        let procedimentos: Procedimento | any = resp;

        this.tableArquivos = procedimentos;
        this.dataSource = new MatTableDataSource<Procedimento>(this.tableArquivos);
        this.dataSource.paginator = this.paginator;
        console.log(JSON.stringify(procedimentos));

      });
    } catch (error) {
      console.error(error);
    }
  }

}

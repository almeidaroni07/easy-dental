import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MdbTableDirective, MdbTablePaginationComponent } from 'ng-uikit-pro-standard';
import { ArquivoService } from 'src/app/core/arquivo/arquivo.service';
import { Response } from 'src/app/core/message/response';
import { Arquivo } from 'src/app/core/model/arquivo';
import { AddArquivoComponent } from '../modal/arquivo/add-arquivo/add-arquivo.component';
import { OpenArquivoComponent } from '../modal/arquivo/open-arquivo/open-arquivo.component';
import { ModalEditarArquivoComponent } from '../modal/arquivo/modal-editar-arquivo/modal-editar-arquivo.component';
import { ModalDeleteArquivoComponent } from '../modal/arquivo/modal-delete-arquivo/modal-delete-arquivo.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-arquivos',
  templateUrl: './arquivos.component.html',
  styleUrls: ['./arquivos.component.css']
})
export class ArquivosComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;

  tableArquivos: Arquivo[] = [];
  dataSource = new MatTableDataSource<Arquivo>(this.tableArquivos);
  displayedColumns: string[] = ['id', 'nome', 'tipo', 'detalhe', 'editar', 'deletar'];

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
              private service: ArquivoService){}


  ngOnInit(): void {
    this.updateTable();
  }

  openModalAddArquivo(){
    try {
      const modalAdd = this.modalService.open(AddArquivoComponent, this.configModal);

      modalAdd.componentInstance.passMessage.subscribe((response: Response) => {
         this.responseMessage = response;
         if(false == this.responseMessage.error){
           this.updateTable();
         }
      })
    } catch (error) {
      
    }
  }

  openModalEditArquivo(id: number){
    try {
       const modalEdit =  this.modalService.open(ModalEditarArquivoComponent, this.configModal);
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

  openModalDeleteArquivo(id: number, nome: string){
    try {
      const modalDelete =  this.modalService.open(ModalDeleteArquivoComponent, this.configModalMenor);
      
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



  openModalViewArquivo(arquivoID: number, tipoArquivo: string){
    try {
      const modal = this.modalService.open(OpenArquivoComponent, this.configModal);
      modal.componentInstance.arquivoID = arquivoID;
      modal.componentInstance.tipoArquivo = tipoArquivo;
    } catch (error) {
      
    }
  }


  updateTable(){
    try {
      this.service.getArquivos().subscribe(resp =>{
        let arquivos: Arquivo | any = resp;
        
        this.tableArquivos = arquivos;
        this.dataSource = new MatTableDataSource<Arquivo>(this.tableArquivos);
        this.dataSource.paginator = this.paginator;
        console.log(JSON.stringify(arquivos));

      });
    } catch (error) {
      console.error(error);
    }
  }

}

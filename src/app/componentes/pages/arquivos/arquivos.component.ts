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

@Component({
  selector: 'app-arquivos',
  templateUrl: './arquivos.component.html',
  styleUrls: ['./arquivos.component.css']
})
export class ArquivosComponent implements OnInit {

  @ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination: MdbTablePaginationComponent;
  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective;
  elements: any | Arquivo = [];
  previous: any = [];
  headElements = ['ID', 'Nome', '', '', ''];

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
      this.elements = [];
      this.service.getArquivos().subscribe(resp =>{
        let arquivos: Arquivo | any = resp;
        for (var paci of arquivos) {
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

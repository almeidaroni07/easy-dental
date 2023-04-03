import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MdbTableDirective, MdbTablePaginationComponent } from 'ng-uikit-pro-standard';
import { Orcamento } from 'src/app/core/model/orcamento';
import { OrcamentoService } from 'src/app/core/orcamento/orcamento.service';
import { Response } from 'src/app/core/message/response';
import { ModalProcedimentoComponent } from '../modal/agendamento/modal-procedimento/modal-procedimento.component';

@Component({
  selector: 'app-orcamento',
  templateUrl: './orcamento.component.html',
  styleUrls: ['./orcamento.component.css']
})
export class OrcamentoComponent implements OnInit, AfterViewInit  {

  configModal = {
    backdrop: false,
    ignoreBackdropClick: false,
    size: 'lg',
    centered: true
  };

  @ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination: MdbTablePaginationComponent;
  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective;
  elements: any | Orcamento = [];
  previous: any = [];
  headElements = ['ID', 'Paciente', 'data', 'valor Total', '', '', ''];
  responseMessage: Response = {error:false, message:''};




  constructor(private cdRef: ChangeDetectorRef,
              private modalService: NgbModal,
              private service: OrcamentoService){}

  ngAfterViewInit(): void {
    if(undefined != this.mdbTablePagination){
      this.mdbTablePagination.setMaxVisibleItemsNumberTo(5);
  
      this.mdbTablePagination.calculateFirstItemIndex();
      this.mdbTablePagination.calculateLastItemIndex();
    }
    this.cdRef.detectChanges();
  }
  ngOnInit(): void {
    this.updateTable()
  }

  openModalAdd(){
   
  }


  openModalProcedimento(orcamentoID: number, valorTotal: number){
    try {
      const modalProcedimentos = this.modalService.open(ModalProcedimentoComponent, this.configModal);
      modalProcedimentos.componentInstance.orcamentoID = orcamentoID;
      modalProcedimentos.componentInstance.valorTotal = valorTotal;
            
   } catch (error) {
     console.error(error);
   }
  }

  updateTable(){
    try {
      this.elements = [];
      this.service.getOrcamentos().subscribe(resp =>{
        let orcamentos: Orcamento | any = resp;
        for (var orcamento of orcamentos) {
          this.elements.push(orcamento);
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

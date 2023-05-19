import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ArquivoService } from 'src/app/core/arquivo/arquivo.service';

@Component({
  selector: 'app-open-arquivo',
  templateUrl: './open-arquivo.component.html',
  styleUrls: ['./open-arquivo.component.css']
})
export class OpenArquivoComponent implements OnInit {
  

  @Input() arquivoID: number;
  @Input() tipoArquivo: string;
  url: string;
  viewPDF: boolean;

  constructor(public activeModal: NgbActiveModal,
              private service: ArquivoService) { }

  ngOnInit(): void {
    try {
      this.url = this.service.getURLArquivo(this.arquivoID);
    } catch (error) {
      
    }
  }

  printUrl(){
    try {
      console.log("TESTE: "+this.url);
      const w = window.open(this.url, '', 'width=1000,height=1000');
      w?.print();
    } catch (error) {
      
    }
  }

}

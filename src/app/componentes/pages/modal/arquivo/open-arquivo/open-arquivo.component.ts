import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ArquivoService } from 'src/app/core/arquivo/arquivo.service';

@Component({
  selector: 'app-open-arquivo',
  templateUrl: './open-arquivo.component.html',
  styleUrls: ['./open-arquivo.component.css']
})
export class OpenArquivoComponent implements OnInit {
  

  url: string;
  @Input() arquivoID: number;

  constructor(public activeModal: NgbActiveModal,
              private service: ArquivoService) { }

  ngOnInit(): void {
    try {
      this.url = this.service.getURLArquivo(this.arquivoID);
      console.log("url: "+this.url);
    } catch (error) {
      
    }
  }

}

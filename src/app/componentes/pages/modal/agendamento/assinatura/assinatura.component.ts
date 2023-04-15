import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AgendamentoService } from 'src/app/core/agendamento/agendamento.service';

@Component({
  selector: 'app-assinatura',
  templateUrl: './assinatura.component.html',
  styleUrls: ['./assinatura.component.css']
})
export class AssinaturaComponent implements OnInit {

  url: string;
  @Input() tratamentoID: number;

  constructor(public activeModal: NgbActiveModal,
              private service: AgendamentoService) { }


  ngOnInit(): void {
    try {
      this.url = this.service.buscarAssinatura(this.tratamentoID);
      console.log("url: "+this.url);
    } catch (error) {
      
    }
  }

}

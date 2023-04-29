import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CustomerService } from 'src/app/core/customer/customer.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  @Output() passMessage: EventEmitter<any> = new EventEmitter();
  file: File;
  urlLogo: string;

  constructor(public activeModal: NgbActiveModal,
              private service: CustomerService) { }

  ngOnInit(): void {
    this.urlLogo = this.service.getURLLogo();
  }

  onChangeFile(event: any){
    try {
      const files = <FileList> event.srcElement.files;
      this.file = files[0];
    } catch (error) {
      console.error(error);
    }
  } 
  
  update(){
    try {
      if(undefined != this.file && null != this.file){
        this.service.atualizarArquivo(this.file).subscribe(resp =>{
          this.passMessage.emit({error: false, message: 'Logo Atualizado com sucesso.'});
          this.activeModal.close();
        });
      }else{
        this.passMessage.emit({error: false, message: 'Logo Atualizado com sucesso.'});
        this.activeModal.close();
      }
    } catch (error) {
      console.error(error);
    }
  }
}

import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ArquivoService } from 'src/app/core/arquivo/arquivo.service';

@Component({
  selector: 'app-add-arquivo',
  templateUrl: './add-arquivo.component.html',
  styleUrls: ['./add-arquivo.component.css']
})
export class AddArquivoComponent implements OnInit {

  form !: FormGroup;
  file: File;

  @Output() passMessage: EventEmitter<any> = new EventEmitter();

  constructor(public activeModal: NgbActiveModal,
              private formBuilder: FormBuilder,
              private service: ArquivoService) { }


  ngOnInit(): void {
   this.form = this.formBuilder.group({
      nome:['', [Validators.required]],
    })
  }


  onChangeFile(event: any){
    try {
      const files = <FileList> event.srcElement.files;
      this.file = files[0];
    } catch (error) {
      console.error(error);
    }
  }
            

  salvar(){
    this.service.salvar(this.form.value).subscribe(resp =>{
      const arquivoID : number | any = resp;
      this.service.atualizarArquivo(arquivoID, this.file).subscribe(
        
        resp =>{
            if('OK' == resp){
              this.passMessage.emit({error: false, message: 'Arquivo adicionado com sucesso.'});
            }else{
              this.passMessage.emit({error: true, message: resp});
            }
            this.activeModal.close();
       },
       error =>{
        this.passMessage.emit({error: true, message: "Error inesperado"});
        this.activeModal.close();
       }
      );
    });
  }

  botaoHabilitado(): string{
    if(this.form.valid){
      return 'btn-info';
    }
    return '';
  }
}

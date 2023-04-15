import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ArquivoService } from 'src/app/core/arquivo/arquivo.service';
import { Arquivo } from 'src/app/core/model/arquivo';

@Component({
  selector: 'app-modal-editar-arquivo',
  templateUrl: './modal-editar-arquivo.component.html',
  styleUrls: ['./modal-editar-arquivo.component.css']
})
export class ModalEditarArquivoComponent implements OnInit {
  
  
  @Output() passMessage: EventEmitter<any> = new EventEmitter();
  @Input() id: number;
  form !: FormGroup;
  file: File;


  constructor(public activeModal: NgbActiveModal,
              private formBuilder: FormBuilder,
              private service: ArquivoService) { }


  ngOnInit(): void {
    this.service.buscarPorID(this.id).subscribe(resp =>{
      const arquivo : Arquivo | any = resp;
      this.form = this.formBuilder.group({ nome:[arquivo.nome, [Validators.required]] });
    });
  }


  update(){
    this.service.update(this.id, this.form.value).subscribe(resp =>{
      console.log("File: "+this.file);
      if(undefined != this.file && null != this.file){
        this.service.atualizarArquivo(this.id, this.file).subscribe(resp =>{
          this.passMessage.emit({error: false, message: 'Arquivo Atualizado com sucesso.'});
          this.activeModal.close();
        });
      }else{
        this.passMessage.emit({error: false, message: 'Arquivo Atualizado com sucesso.'});
        this.activeModal.close();
      }
    });
  }

  onChangeFile(event: any){
    try {
      const files = <FileList> event.srcElement.files;
      this.file = files[0];
    } catch (error) {
      console.error(error);
    }
  }

  botaoHabilitado(): string{
    if(this.form.valid){
      return 'btn-info';
    }
    return '';
  }

}

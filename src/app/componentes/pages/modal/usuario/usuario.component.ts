import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Usuario } from 'src/app/core/model/usuario';
import { UserService } from 'src/app/core/user/user.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  @Output() passMessage: EventEmitter<any> = new EventEmitter();
  @Input() id: number;

  form !: FormGroup;
  file: File;
  urlFoto:string;
  hide = true;
  
  constructor(public activeModal: NgbActiveModal,
              private formBuilder: FormBuilder,
              private service: UserService) { }


  ngOnInit(): void {
    try {
      
      this.service.buscarPorID(this.id).subscribe(resp =>{
        const usuario : Usuario | any = resp;
        this.urlFoto = this.service.getURLFoto(usuario.id);
        this.form = this.formBuilder.group({
                                            nome:[usuario.nome, [Validators.required]],
                                            username:[usuario.username, [Validators.required, Validators.email]],
                                            password:[usuario.password, [Validators.required]],
                                            atualizarFoto:[false, [Validators.required]],
                                            foto:[{ value: "", disabled: true }, [Validators.required]]
                                          });
      });
    } catch (error) {
      console.error(error);
    }
  }

  atualizarFoto(){
    try {
      const value : boolean | any = this.form.get('atualizarFoto')?.value;
      if(true == !value){
        this.form.get('foto')?.disable({ onlySelf: false });
      }else{
        this.form.get('foto')?.enable({onlySelf: true});
      }
    } catch (error) {
      console.error(error);
    }
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
      this.service.update(this.id, this.form.value).subscribe(resp =>{
        const atualizaFoto : boolean | any = this.form.get('atualizarFoto')?.value;
        if(true == atualizaFoto){
          if(undefined != this.file && null != this.file){
            this.service.atualizarFoto(this.id, this.file).subscribe(resp =>{
              this.passMessage.emit({error: false, message: 'Arquivo Atualizado com sucesso.'});
              this.activeModal.close();
            });
          }else{
            this.passMessage.emit({error: false, message: 'Usuario Atualizado com sucesso.'});
            this.activeModal.close();
          }
        }else{
          this.passMessage.emit({error: false, message: 'Usuario Atualizado com sucesso.'});
            this.activeModal.close();
        }
      });
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

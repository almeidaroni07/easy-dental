import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Anamnese } from 'src/app/core/model/anamnese';
import { PreAnamnese } from 'src/app/core/model/preAnamnese';
import { PreAvaliacao } from 'src/app/core/model/preAvaliacao';
import { PacienteService } from 'src/app/core/paciente/paciente.service';

@Component({
  selector: 'app-modal-update-anamnese',
  templateUrl: './modal-update-anamnese.component.html',
  styleUrls: ['./modal-update-anamnese.component.css']
})
export class ModalUpdateAnamneseComponent  implements OnInit {

  form !: FormGroup;
  anamnese : Anamnese;

  @Output() passMessage: EventEmitter<any> = new EventEmitter();
  @Input() id: number;
  @Input() nome: string;

  constructor(public activeModal: NgbActiveModal,
              private formBuilder: FormBuilder,
              private service: PacienteService) { }

  ngOnInit(): void {
    console.log('this.id: '+this.id)
    this.service.buscarPreAvaliacaoEAnamnesePorID(this.id).subscribe((resp: PreAnamnese | any)  =>{
      console.log(JSON.stringify(resp));
      this.anamnese = resp.anamnese;
      const pre: PreAvaliacao = resp.preAvaliacao;
      this.form = this.formBuilder.group({
                                          anamneseID:[this.anamnese.id],
                                          alergicoMedicamento:[this.anamnese.alergicoMedicamento, [Validators.required]],
                                          alergicoMedicamentoQual:[{ value: this.anamnese.alergicoMedicamentoQual, disabled: !this.anamnese.alergicoMedicamento }, [Validators.required, Validators.email]],
                                          usaMedicamento:[this.anamnese.usaMedicamento, [Validators.required]],
                                          usaMedicamentoQual:[{ value: this.anamnese.usaMedicamentoQual, disabled: !this.anamnese.usaMedicamento }, [Validators.required]],
                                          alergiaAnestesia:[this.anamnese.alergiaAnestesia, [Validators.required]],
                                          alergiaAnestesiaQual:[{ value: this.anamnese.alergiaAnestesiaQual, disabled: !this.anamnese.alergiaAnestesia }, [Validators.required]],
                                          gravidaOuAmamentando:[this.anamnese.gravidaOuAmamentando, [Validators.required]],
                                          doencaCardioRespiratoria:[this.anamnese.doencaCardioRespiratoria, [Validators.required]],
                                          doencaCardioRespiratoriaQual:[{ value: this.anamnese.doencaCardioRespiratoriaQual, disabled: !this.anamnese.doencaCardioRespiratoria }, [Validators.required]],
                                          doencaoTransmissivel:[this.anamnese.doencaoTransmissivel, [Validators.required]],
                                          doencaoTransmissivelQual:[{ value: this.anamnese.doencaoTransmissivelQual, disabled: !this.anamnese.doencaoTransmissivel }, [Validators.required]],
                                          diabetico:[this.anamnese.diabetico, [Validators.required]],
                                          hipertencaoArterial:[this.anamnese.hipertencaoArterial, [Validators.required]],
                                          hemorragico:[this.anamnese.hemorragico, [Validators.required]],
                                          cirurgia:[this.anamnese.cirurgia, [Validators.required]],
                                          cirurgiaQual:[{ value: this.anamnese.cirurgiaQual, disabled: !this.anamnese.cirurgia }, [Validators.required]],
                                          informacaoAdicional:[this.anamnese.informacaoAdicional, [Validators.required]],

                                          preAvaliacaoID:[pre.id, [Validators.required]],
                                          corDentesIncomoda:[pre.corDentesIncomoda, [Validators.required]],
                                          formatoDentesIncomoda:[pre.formatoDentesIncomoda, [Validators.required]],
                                          fumante:[pre.fumante, [Validators.required]],
                                          umAnoTratamento:[pre.umAnoTratamento, [Validators.required]],
                                          escovaDuasVezesDia:[pre.escovaDuasVezesDia, [Validators.required]],
                                          usaFioDental:[pre.usaFioDental, [Validators.required]],
                                          queixa:[pre.queixa, [Validators.required]],
                                          
                                        });
    });

  }


  update(){
    try {
      this.service.updatePreAnamnese(this.form.value, this.id).subscribe(resp =>{
        this.passMessage.emit({error: false, message: 'Pré Avaliação e Anamnese Atualizados com sucesso.'});
        this.activeModal.close();
      });
    } catch (error) {
      console.error(error);
    }
  }

  alergicoMedicamentoChange(){
    try {
      const value : boolean | any = this.form.get('alergicoMedicamento')?.value;
      if(true == !value){
        this.form.get('alergicoMedicamentoQual')?.disable({ onlySelf: false });
      }else{
        this.form.get('alergicoMedicamentoQual')?.enable({onlySelf: true});
      }
    } catch (error) {
      console.error(error);
    }
  }

  usaMedicamentoChange(){
    try {
      const value : boolean | any = this.form.get('usaMedicamento')?.value;
      if(true == !value){
        this.form.get('usaMedicamentoQual')?.disable({ onlySelf: false });
      }else{
        this.form.get('usaMedicamentoQual')?.enable({onlySelf: true});
      }
    } catch (error) {
      console.error(error);
    }
  }

  alergiaAnestesiaChange(){
    try {
      const value : boolean | any = this.form.get('alergiaAnestesia')?.value;
      if(true == !value){
        this.form.get('alergiaAnestesiaQual')?.disable({ onlySelf: false });
      }else{
        this.form.get('alergiaAnestesiaQual')?.enable({onlySelf: true});
      }
    } catch (error) {
      console.error(error);
    }
  }

  doencaCardioRespiratoriaChange(){
    try {
      const value : boolean | any = this.form.get('doencaCardioRespiratoria')?.value;
      if(true == !value){
        this.form.get('doencaCardioRespiratoriaQual')?.disable({ onlySelf: false });
      }else{
        this.form.get('doencaCardioRespiratoriaQual')?.enable({onlySelf: true});
      }
    } catch (error) {
      console.error(error);
    }
  }

  doencaoTransmissivelChange(){
    try {
      const value : boolean | any = this.form.get('doencaoTransmissivel')?.value;
      if(true == !value){
        this.form.get('doencaoTransmissivelQual')?.disable({ onlySelf: false });
      }else{
        this.form.get('doencaoTransmissivelQual')?.enable({onlySelf: true});
      }
    } catch (error) {
      console.error(error);
    }
  }

  cirurgiaChange(){
    try {
      const value : boolean | any = this.form.get('cirurgia')?.value;
      if(true == !value){
        this.form.get('cirurgiaQual')?.disable({ onlySelf: false });
      }else{
        this.form.get('cirurgiaQual')?.enable({onlySelf: true});
      }
    } catch (error) {
      console.error(error);
    }
  }

}

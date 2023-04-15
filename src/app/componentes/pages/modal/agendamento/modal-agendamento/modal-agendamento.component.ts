import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AgendamentoService } from 'src/app/core/agendamento/agendamento.service';
import { Agendamento } from 'src/app/core/model/agendamento';
import { Paciente } from 'src/app/core/model/paciente';
import { Procedimento } from 'src/app/core/model/procedimento';
import { PacienteService } from 'src/app/core/paciente/paciente.service';
import { ProcedimentoService } from 'src/app/core/procedimento/procedimento.service';

@Component({
  selector: 'app-modal-agendamento',
  templateUrl: './modal-agendamento.component.html',
  styleUrls: ['./modal-agendamento.component.css']
})
export class ModalAgendamentoComponent implements OnInit {

  elements: any | Agendamento = [];
  headElements = ['Nome', 'data', 'Inicio', 'Fim',  ''];

  selectPacientes: [Paciente] | any  = [];
  selectProcedimento: [Procedimento] | any  = [];

  @Output() passMessage: EventEmitter<any> = new EventEmitter();
  form !: FormGroup;
  file: File;
  
  constructor(public activeModal: NgbActiveModal,
              private formBuilder: FormBuilder,
              private service: AgendamentoService,
              private pacienteService: PacienteService,
              private procedimentoService: ProcedimentoService) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      pacienteID:['', [Validators.required]],
      formaPagamento:['', [Validators.required]],
      assinatura:['', [Validators.required]],
      procedimentoID:['', [Validators.required]],
      data:[new Date(), [Validators.required]],
      inicio:['', [Validators.required]],
      fim:['', [Validators.required]]
    })

    this.pacienteService.getListPacientes().subscribe(resp =>{
      this.selectPacientes = resp;
    });

    this.procedimentoService.getProcedimentos().subscribe(resp =>{
      this.selectProcedimento = resp;
    });

  }

  salvar(){
    this.service.salvar(this.form.value, this.elements).subscribe(resp =>{
      const tratamentoID : number | any = resp;
      console.log("file name: "+this.file.name);
      this.service.atualizarAssinatura(tratamentoID, this.file).subscribe(
        
        resp =>{
            if('OK' == resp){
              this.passMessage.emit({error: false, message: 'Tratamento adicionado com sucesso.'});
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


  salvarAgendamento(){
    try {
      const procedimentoID: number | any = this.form.get('procedimentoID')?.value;
     
      this.procedimentoService.buscarPorID(procedimentoID).subscribe(resp =>{
        const procedimento : Procedimento | any = resp;
        
        this.elements.push({
          procedimentoID: procedimento.id,
          procedimentoNome:procedimento.nome,
          data:this.form.get('data')?.value,
          inicio: this.form.get('inicio')?.value,
          fim: this.form.get('fim')?.value,
        })

        this.form.get('procedimentoID')?.setValue('');
        this.form.get('data')?.setValue(new Date())
        this.form.get('inicio')?.setValue('')
        this.form.get('fim')?.setValue('')

      });

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

  botaoHabilitado(): string{
    if(this.form.valid){
      return 'btn-info';
    }
    return '';
  }  
  
  


}
function messageResponse(value: string): void {
  throw new Error('Function not implemented.');
}


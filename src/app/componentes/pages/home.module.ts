import { CommonModule, DatePipe } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { MDBBootstrapModule } from "ng-uikit-pro-standard";
import { AgendamentoComponent } from "./agendamento/agendamento.component";
import { HomeRoutingModule } from "./home-routing.module";
import { HomeComponent } from "./home/home.component";
import { ModalAgendamentoComponent } from "./modal/agendamento/modal-agendamento/modal-agendamento.component";
import { ModalPacienteComponent } from "./modal/paciente/modal-paciente/modal-paciente.component";
import { PacienteComponent } from "./paciente/paciente.component";
import { HeaderComponent } from "./templates/header/header.component";
import { MenuPrincipalComponent } from "./templates/menu-principal/menu-principal.component";
import { ModalEditarComponent } from './modal/paciente/modal-editar/modal-editar.component';
import { ModalDeleteComponent } from './modal/paciente/modal-delete/modal-delete.component';
import { ModalUpdateAnamneseComponent } from './modal/paciente/modal-update-anamnese/modal-update-anamnese.component';
import { MatTabsModule } from '@angular/material/tabs';
import { CalendarModule, DateAdapter } from "angular-calendar";
import { CalendarioComponent } from "./templates/calendario/calendario.component";
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { FlatpickrModule } from 'angularx-flatpickr';
import { ProcedimentoComponent } from './procedimento/procedimento.component';
import { ModalAddProcedimentoComponent } from './modal/procedimento/modal-add-procedimento/modal-add-procedimento.component';
import { ModalEditarProcedimentoComponent } from './modal/procedimento/modal-editar-procedimento/modal-editar-procedimento.component';
import { ModalDeletarProcedimentoComponent } from './modal/procedimento/modal-deletar-procedimento/modal-deletar-procedimento.component';
import { ColorPickerComponent } from "@syncfusion/ej2-angular-inputs";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatNativeDateModule } from "@angular/material/core";
import { ValidatorsMessageComponent } from './templates/message/validators-message/validators-message.component';
import { MessageComponent } from './templates/message/message/message.component';
import { OrcamentoComponent } from './orcamento/orcamento.component';
import { ModalProcedimentoComponent } from './modal/agendamento/modal-procedimento/modal-procedimento.component';
import { AssinaturaComponent } from './modal/agendamento/assinatura/assinatura.component';
import { ArquivosComponent } from "./arquivos/arquivos.component";
import { AddArquivoComponent } from './modal/arquivo/add-arquivo/add-arquivo.component';
import { OpenArquivoComponent } from './modal/arquivo/open-arquivo/open-arquivo.component';
import { ModalEditarArquivoComponent } from './modal/arquivo/modal-editar-arquivo/modal-editar-arquivo.component';
import { ModalDeleteArquivoComponent } from './modal/arquivo/modal-delete-arquivo/modal-delete-arquivo.component';

@NgModule({
    declarations:[
        AgendamentoComponent,
        PacienteComponent,
        HomeComponent,
        HeaderComponent,
        MenuPrincipalComponent,
        ModalAgendamentoComponent,
        ModalPacienteComponent,
        HomeComponent,
        ModalEditarComponent,
        ModalDeleteComponent,
        ModalUpdateAnamneseComponent,
        CalendarioComponent,
        ProcedimentoComponent,
        ModalAddProcedimentoComponent,
        ModalEditarProcedimentoComponent,
        ModalDeletarProcedimentoComponent,
        ValidatorsMessageComponent,
        MessageComponent,
        OrcamentoComponent,
        ModalProcedimentoComponent,
        AssinaturaComponent,
        ArquivosComponent,
        AddArquivoComponent,
        OpenArquivoComponent,
        ModalEditarArquivoComponent,
        ModalDeleteArquivoComponent
    ],
    imports:[
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NgbModule,
        HttpClientModule,
        MDBBootstrapModule,
        MatTabsModule,
        MatFormFieldModule,
        MatDatepickerModule,
        MatInputModule,
        MatNativeDateModule,
        FlatpickrModule.forRoot(),
        CalendarModule.forRoot({
            provide: DateAdapter,
            useFactory: adapterFactory,
        }),
        HomeRoutingModule
        
    ],
    exports:[
        ValidatorsMessageComponent,
        MessageComponent
    ],
    providers:[
        DatePipe,
        MatDatepickerModule,
        ColorPickerComponent
    ]
})
export class HomeModule { }
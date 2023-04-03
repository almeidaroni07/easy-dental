import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "src/app/core/auth/auth.guard";
import { AgendamentoComponent } from "./agendamento/agendamento.component";
import { HomeComponent } from "./home/home.component";
import { PacienteComponent } from "./paciente/paciente.component";
import { ProcedimentoComponent } from "./procedimento/procedimento.component";
import { OrcamentoComponent } from "./orcamento/orcamento.component";


const routes: Routes = [
    { 
        path: '',
        component: HomeComponent,
        canActivate: [AuthGuard],
        children: [
            {
                path: '',
                component: AgendamentoComponent,
                canActivate:[AuthGuard]
            },
            {
                path: 'agendamento',
                component: AgendamentoComponent,
                canActivate:[AuthGuard]
            },
            {
                path: 'paciente',
                component: PacienteComponent,
                canActivate:[AuthGuard]
            },
            {
                path: 'procedimentos',
                component: ProcedimentoComponent,
                canActivate:[AuthGuard]
            },
            {
                path: 'orcamento',
                component: OrcamentoComponent,
                canActivate:[AuthGuard]
            }           
        ]
    },              
];

@NgModule({
    imports: [ 
        RouterModule.forChild(routes) 
    ],
    exports: [ RouterModule ]
})
export class HomeRoutingModule { }
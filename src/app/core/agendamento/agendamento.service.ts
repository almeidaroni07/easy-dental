import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Agendamento } from '../model/agendamento';
import { Tratamento } from '../model/tratamento';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AgendamentoService {
  
  constructor(private http:  HttpClient) { }

  getListAgendamento(){
    const reqHeader = new HttpHeaders({
      'Authorization': `Bearer ${window.localStorage.getItem('authToken')}`
    })

    return this.http.get(environment.apiURL + '/agenda/v1/'+window.localStorage.getItem('authCustomer'),{ headers: reqHeader});
  }

  salvar(tratamento : Tratamento, procedimentos:[Agendamento]){

    const reqHeaderPOSTOrPUT = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${window.localStorage.getItem('authToken')}`
    })

    const envio = {
      formaPagamento:tratamento.formaPagamento,
      pacienteID:tratamento.pacienteID,
      procedimentos:procedimentos
    }

    return this.http.post(environment.apiURL + '/tratamento/v1/'+window.localStorage.getItem('authCustomer')+'?pacienteId='+tratamento.pacienteID, envio, { headers: reqHeaderPOSTOrPUT, responseType: 'text'});
  }

  atualizarAssinatura(tratamentoID : Number, file: File){

    const reqHeader = new HttpHeaders({
      'Authorization': `Bearer ${window.localStorage.getItem('authToken')}`
    })

    const formFile = new FormData();
    formFile.append('assinatura', file);
    return this.http.post(environment.apiURL + '/tratamento/v1/assinatura/'+window.localStorage.getItem('authCustomer')+'?tratamentoID='+tratamentoID, formFile, { headers: reqHeader, responseType: 'text'});
  }

  buscarAssinatura(tratamentoID: Number){
    return environment.apiURL+'/tratamento/v1/assinatura/'+window.localStorage.getItem('authCustomer')+'?tratamentoID='+tratamentoID;
  }

}

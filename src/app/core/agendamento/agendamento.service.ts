import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Agendamento } from '../model/agendamento';
import { Tratamento } from '../model/tratamento';

const API_URL = 'http://localhost:8080';

@Injectable({
  providedIn: 'root'
})
export class AgendamentoService {
  
  reqHeader = new HttpHeaders({
    'Authorization': `Bearer ${window.localStorage.getItem('authToken')}`
  })
  
  reqHeaderPOSTOrPUT = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${window.localStorage.getItem('authToken')}`
  })

  constructor(private http:  HttpClient) { }

  getListAgendamento(){
    return this.http.get(API_URL + '/agenda/v1/'+window.localStorage.getItem('authCustomer'),{ headers: this.reqHeader});
  }

  salvar(tratamento : Tratamento, procedimentos:[Agendamento]){
    const envio = {
      formaPagamento:tratamento.formaPagamento,
      pacienteID:tratamento.pacienteID,
      procedimentos:procedimentos
    }

    return this.http.post(API_URL + '/tratamento/v1/'+window.localStorage.getItem('authCustomer')+'?pacienteId='+tratamento.pacienteID, envio, { headers: this.reqHeaderPOSTOrPUT, responseType: 'text'});
  }

  atualizarAssinatura(tratamentoID : Number, file: File){
    const formFile = new FormData();
    formFile.append('assinatura', file);
    return this.http.post(API_URL + '/tratamento/v1/assinatura/'+window.localStorage.getItem('authCustomer')+'?tratamentoID='+tratamentoID, formFile, { headers: this.reqHeader, responseType: 'text'});
  }

  buscarAssinatura(tratamentoID: Number){
    return 'http://localhost:8080/tratamento/v1/assinatura/'+window.localStorage.getItem('authCustomer')+'?tratamentoID='+tratamentoID;
  }

}

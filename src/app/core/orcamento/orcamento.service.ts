import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

const API_URL = 'http://localhost:8080';

@Injectable({
  providedIn: 'root'
})
export class OrcamentoService {
  
  reqHeader = new HttpHeaders({
    'Authorization': `Bearer ${window.localStorage.getItem('authToken')}`
  })
  
  constructor(private http:  HttpClient) { }

  getOrcamentos(){
    return this.http.get(API_URL + '/orcamento/v1/'+window.localStorage.getItem('authCustomer'),{ headers: this.reqHeader});
  }

  getProcedimentosOrcamento(orcamentoID: number){
    return this.http.get(API_URL + '/orcamento/v1/procedimento/'+window.localStorage.getItem('authCustomer')+'?orcamentoID='+orcamentoID,{ headers: this.reqHeader});
  }

}

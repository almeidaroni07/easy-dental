import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrcamentoService {
  
  constructor(private http:  HttpClient) { }

  getOrcamentos(){
    const reqHeader = new HttpHeaders({
      'Authorization': `Bearer ${window.localStorage.getItem('authToken')}`
    })
    return this.http.get(environment.apiURL + '/orcamento/v1/'+window.localStorage.getItem('authCustomer'),{ headers: reqHeader});
  }

  getProcedimentosOrcamento(orcamentoID: number){
    const reqHeader = new HttpHeaders({
      'Authorization': `Bearer ${window.localStorage.getItem('authToken')}`
    })
    return this.http.get(environment.apiURL + '/orcamento/v1/procedimento/'+window.localStorage.getItem('authCustomer')+'?orcamentoID='+orcamentoID,{ headers: reqHeader});
  }

}

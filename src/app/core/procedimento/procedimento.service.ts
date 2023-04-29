import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProcedimentoRequest } from '../model/procedimentoRequest';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProcedimentoService {

  constructor(private http:  HttpClient) { }

  getProcedimentos(){
    const reqHeader = new HttpHeaders({
      'Authorization': `Bearer ${window.localStorage.getItem('authToken')}`
    })
    return this.http.get(environment.apiURL + '/procedimento/v1/'+window.localStorage.getItem('authCustomer'),{ headers: reqHeader});
  }

  buscarPorID(procedimentoID: number){
    const reqHeader = new HttpHeaders({
      'Authorization': `Bearer ${window.localStorage.getItem('authToken')}`
    })
    return this.http.get(environment.apiURL + '/procedimento/v1/id/'+window.localStorage.getItem('authCustomer')+'?procedimentoID='+procedimentoID,{ headers: reqHeader});
  }

  salvar(procedimento : ProcedimentoRequest){
    const reqHeaderJson = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${window.localStorage.getItem('authToken')}`
    })
    return this.http.post(environment.apiURL + '/procedimento/v1/'+window.localStorage.getItem('authCustomer'), 
                          procedimento,
                          { headers: reqHeaderJson, responseType: 'text'});
  }

  update(procedimentoID: number, procedimento: ProcedimentoRequest){
    const reqHeaderJson = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${window.localStorage.getItem('authToken')}`
    })
    return this.http.put(environment.apiURL + '/procedimento/v1/'+window.localStorage.getItem('authCustomer')+'?procedimentoID='+procedimentoID, 
                          procedimento,
                          { headers: reqHeaderJson, responseType: 'text'});
  }

  delete(procedimentoID: number){
    const reqHeader = new HttpHeaders({
      'Authorization': `Bearer ${window.localStorage.getItem('authToken')}`
    })
    return this.http.delete(environment.apiURL + '/procedimento/v1/'+window.localStorage.getItem('authCustomer')+'?procedimentoID='+procedimentoID,{ headers: reqHeader, responseType: 'text'});
  }

}

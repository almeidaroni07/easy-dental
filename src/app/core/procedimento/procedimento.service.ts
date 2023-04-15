import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProcedimentoRequest } from '../model/procedimentoRequest';

const API_URL = 'http://localhost:8080';

const reqHeader = new HttpHeaders({
  'Authorization': `Bearer ${window.localStorage.getItem('authToken')}`
})

const reqHeaderJson = new HttpHeaders({
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${window.localStorage.getItem('authToken')}`
})

@Injectable({
  providedIn: 'root'
})
export class ProcedimentoService {

  constructor(private http:  HttpClient) { }

  getProcedimentos(){
    return this.http.get(API_URL + '/procedimento/v1/'+window.localStorage.getItem('authCustomer'),{ headers: reqHeader});
  }

  buscarPorID(procedimentoID: number){
    return this.http.get(API_URL + '/procedimento/v1/id/'+window.localStorage.getItem('authCustomer')+'?procedimentoID='+procedimentoID,{ headers: reqHeader});
  }

  salvar(procedimento : ProcedimentoRequest){
    return this.http.post(API_URL + '/procedimento/v1/'+window.localStorage.getItem('authCustomer'), 
                          procedimento,
                          { headers: reqHeaderJson, responseType: 'text'});
  }

  update(procedimentoID: number, procedimento: ProcedimentoRequest){

    return this.http.put(API_URL + '/procedimento/v1/'+window.localStorage.getItem('authCustomer')+'?procedimentoID='+procedimentoID, 
                          procedimento,
                          { headers: reqHeaderJson, responseType: 'text'});
  }

  delete(procedimentoID: number){
    return this.http.delete(API_URL + '/procedimento/v1/'+window.localStorage.getItem('authCustomer')+'?procedimentoID='+procedimentoID,{ headers: reqHeader, responseType: 'text'});
  }

}

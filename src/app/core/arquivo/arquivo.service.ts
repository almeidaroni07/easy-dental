import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Arquivo } from '../model/arquivo';

const API_URL = 'http://localhost:8080';

@Injectable({
  providedIn: 'root'
})
export class ArquivoService {
  
  reqHeader = new HttpHeaders({
    'Authorization': `Bearer ${window.localStorage.getItem('authToken')}`
  })
  
  reqHeaderPOSTOrPUT = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${window.localStorage.getItem('authToken')}`
  })


  constructor(private http:  HttpClient) { }

  getArquivos(){
    return this.http.get(API_URL + '/arquivo/v1/'+window.localStorage.getItem('authCustomer'),{ headers: this.reqHeader});
  }

  buscarPorID(id: number){
    return this.http.get(API_URL + '/arquivo/v1/id/'+window.localStorage.getItem('authCustomer')+'?arquivoID='+id,{ headers: this.reqHeader});
  }

  salvar(arquivo : Arquivo){
    return this.http.post(API_URL + '/arquivo/v1/'+window.localStorage.getItem('authCustomer'), {nome: arquivo.nome}, { headers: this.reqHeaderPOSTOrPUT, responseType: 'text'});
  }

  update(arquivoID: number, arquivo: Arquivo){
    return this.http.put(API_URL + '/arquivo/v1/'+window.localStorage.getItem('authCustomer')+'?arquivoID='+arquivoID, {nome: arquivo.nome},{ headers: this.reqHeaderPOSTOrPUT, responseType: 'text'});
  }

  delete(arquivoID: number){
    return this.http.delete(API_URL + '/arquivo/v1/'+window.localStorage.getItem('authCustomer')+'?arquivoID='+arquivoID,{ headers: this.reqHeader, responseType: 'text'});
  }

  atualizarArquivo(arquivoID : Number, file: File){
    const formFile = new FormData();
    formFile.append('arquivo', file);
    return this.http.post(API_URL + '/arquivo/v1/blob/'+window.localStorage.getItem('authCustomer')+'?arquivoID='+arquivoID, formFile, { headers: this.reqHeader, responseType: 'text'});
  }

  getURLArquivo(arquivoID: Number){
    return 'http://localhost:8080/arquivo/v1/blob/'+window.localStorage.getItem('authCustomer')+'?arquivoID='+arquivoID;
  }


}

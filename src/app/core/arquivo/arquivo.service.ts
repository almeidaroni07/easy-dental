import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Arquivo } from '../model/arquivo';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArquivoService {
  
  constructor(private http:  HttpClient) { }

  getArquivos(){
    const reqHeader = new HttpHeaders({
      'Authorization': `Bearer ${window.localStorage.getItem('authToken')}`
    })
    return this.http.get(environment.apiURL + '/arquivo/v1/'+window.localStorage.getItem('authCustomer'),{ headers: reqHeader});
  }

  buscarPorID(id: number){
    const reqHeader = new HttpHeaders({
      'Authorization': `Bearer ${window.localStorage.getItem('authToken')}`
    })
    return this.http.get(environment.apiURL + '/arquivo/v1/id/'+window.localStorage.getItem('authCustomer')+'?arquivoID='+id,{ headers: reqHeader});
  }

  salvar(arquivo : Arquivo){
    const reqHeaderPOSTOrPUT = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${window.localStorage.getItem('authToken')}`
    })
    return this.http.post(environment.apiURL + '/arquivo/v1/'+window.localStorage.getItem('authCustomer'), {nome: arquivo.nome}, { headers: reqHeaderPOSTOrPUT, responseType: 'text'});
  }

  update(arquivoID: number, arquivo: Arquivo){
    const reqHeaderPOSTOrPUT = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${window.localStorage.getItem('authToken')}`
    })
    return this.http.put(environment.apiURL + '/arquivo/v1/'+window.localStorage.getItem('authCustomer')+'?arquivoID='+arquivoID, {nome: arquivo.nome},{ headers: reqHeaderPOSTOrPUT, responseType: 'text'});
  }

  delete(arquivoID: number){
    const reqHeader = new HttpHeaders({
      'Authorization': `Bearer ${window.localStorage.getItem('authToken')}`
    })
    return this.http.delete(environment.apiURL + '/arquivo/v1/'+window.localStorage.getItem('authCustomer')+'?arquivoID='+arquivoID,{ headers: reqHeader, responseType: 'text'});
  }

  atualizarArquivo(arquivoID : Number, file: File){

    const reqHeader = new HttpHeaders({
      'Authorization': `Bearer ${window.localStorage.getItem('authToken')}`
    })

    const formFile = new FormData();
    formFile.append('arquivo', file);
    return this.http.post(environment.apiURL + '/arquivo/v1/blob/'+window.localStorage.getItem('authCustomer')+'?arquivoID='+arquivoID, formFile, { headers: reqHeader, responseType: 'text'});
  }

  getURLArquivo(arquivoID: Number){
    return environment.apiURL+'/arquivo/v1/blob/'+window.localStorage.getItem('authCustomer')+'?arquivoID='+arquivoID;
  }

  printArquivo(arquivoID: Number){
    fetch(environment.apiURL + '/arquivo/v1/blob/'+window.localStorage.getItem('authCustomer')+'?arquivoID='+arquivoID)
    .then(function(response) {
      return response.blob();
    })
    .then(function(myBlob) {
      const objectURL = URL.createObjectURL(myBlob);
      const w = window.open(objectURL, '', 'width=1000,height=1000');
      w?.print();
    });
  }


}

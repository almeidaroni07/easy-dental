import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http:  HttpClient) { }

  getURLLogo(){
    return environment.apiURL+'/customer/v1/logo/'+window.localStorage.getItem('authCustomer');
  }

  atualizarArquivo(file: File){

    const reqHeader = new HttpHeaders({
      'Authorization': `Bearer ${window.localStorage.getItem('authToken')}`
    })

    const formFile = new FormData();
    formFile.append('logo', file);
    return this.http.post(environment.apiURL + '/customer/v1/logo/'+window.localStorage.getItem('authCustomer'), formFile, { headers: reqHeader, responseType: 'text'});
  }
}

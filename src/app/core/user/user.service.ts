import { Injectable } from '@angular/core';
import { TokenService } from '../token/token.service';
import { BehaviorSubject } from 'rxjs';
import { User } from './user';
import jtw_decode from 'jwt-decode'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Usuario } from '../model/usuario';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userSubject = new BehaviorSubject<User | null>(null);
  private userName: string | undefined;

  constructor(private tokenService: TokenService, private http:  HttpClient) { 

      this.tokenService.hasToken() && 
          this.decodeAndNotify();
  }

  setTokenCustomer(token: string, customer : string) {
      this.tokenService.setTokenCustomer(token, customer);
      this.decodeAndNotify();
  }

  getUser() {
      return this.userSubject.asObservable();
  }


  private decodeAndNotify() {
      const token = this.tokenService.getToken();
      const user = jtw_decode(null == token ? '' : token) as User;
      this.userName = user.iss;
      console.log("JSON: ",JSON.stringify(user));
      this.userSubject.next(user);
  }

  logout() {
      this.tokenService.removeTokenCustomer();
      this.userSubject.next(null);
  }

  isLogged() {
      return this.tokenService.hasToken();
  }

  getUserName() {
      return this.userName;
  }

  buscarPorID(id: number) {
    const reqHeader = new HttpHeaders({
        'Authorization': `Bearer ${window.localStorage.getItem('authToken')}`
    })
    return this.http.get(environment.apiURL + '/usuario/v1/id/'+window.localStorage.getItem('authCustomer')+'?usuarioID='+id,{ headers: reqHeader});
  }

  getURLFoto(id: number | any){
    return environment.apiURL + '/usuario/v1/foto/'+window.localStorage.getItem('authCustomer')+'?usuarioID='+id;
  }

  update(arquivoID: number, usuario: Usuario){
    const reqHeaderPOSTOrPUT = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${window.localStorage.getItem('authToken')}`
    })
    return this.http.put(environment.apiURL + '/usuario/v1/'+window.localStorage.getItem('authCustomer')+'?usuarioID='+arquivoID, usuario,{ headers: reqHeaderPOSTOrPUT, responseType: 'text'});
  }

  atualizarFoto(usuarioID : Number, file: File){

    const reqHeader = new HttpHeaders({
      'Authorization': `Bearer ${window.localStorage.getItem('authToken')}`
    })

    const formFile = new FormData();
    formFile.append('arquivo', file);
    console.log("formFile: ",formFile);
    return this.http.post(environment.apiURL + '/usuario/v1/foto/'+window.localStorage.getItem('authCustomer')+'?usuarioID='+usuarioID, formFile, { headers: reqHeader, responseType: 'text'});
  }

}

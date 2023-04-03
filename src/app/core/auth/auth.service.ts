import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';
import { userAuth } from './userAuth';
import { UserService } from '../user/user.service';
import { Usuario } from './Usuario';

const API_URL = 'http://localhost:8080';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:  HttpClient, private userService: UserService) { }

  authenticate(usuario: Usuario) {
    console.log("usuario: "+usuario.username);
    return this.http.post(API_URL + '/auth/login',  usuario , {observe: 'body'})
          .pipe(
            tap((response: userAuth | any) =>{
              console.log("JSon: "+JSON.stringify(response));
              this.userService.setTokenCustomer(response.token, response.customerID);
            })
          );
  }

}

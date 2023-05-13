import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';
import { userAuth } from './userAuth';
import { UserService } from '../user/user.service';
import { Usuario } from './Usuario';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:  HttpClient, private userService: UserService) { }

  authenticate(usuario: Usuario) {
    return this.http.post(environment.apiURL + '/auth/login',  usuario , {observe: 'body'})
          .pipe(
            tap((response: userAuth | any) =>{
              console.log("JSon: "+JSON.stringify(response));
              this.userService.setTokenCustomer(response.token, response.customerID);
            })
          );
  }

}

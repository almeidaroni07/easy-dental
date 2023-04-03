import { Injectable } from '@angular/core';
import { TokenService } from '../token/token.service';
import { BehaviorSubject } from 'rxjs';
import { User } from './user';
import jtw_decode from 'jwt-decode'


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userSubject = new BehaviorSubject<User | null>(null);
  private userName: string | undefined;

  constructor(private tokenService: TokenService) { 

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
      this.userName = user.name;
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

}

import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'src/app/core/user/user';
import { UserService } from 'src/app/core/user/user.service';

@Component({
  selector: 'app-menu-principal',
  templateUrl: './menu-principal.component.html',
  styleUrls: ['./menu-principal.component.css']
})
export class MenuPrincipalComponent implements OnInit {

  user$: Observable<User | null>;
  user: User | null | undefined;
  nome: string;
  @Output() menuSelecionado: EventEmitter<string> = new EventEmitter();

  constructor(
    private userService: UserService, 
    private router:Router) {

    this.user$ = userService.getUser();
    this.user$.subscribe(user => this.user = user);

  }
  ngOnInit(): void {
  }

  selecionarMenu(menu: string){
    try {
      this.menuSelecionado.emit(menu);
    } catch (error) {
      console.error(error);
    }
  }

  logout() {
      this.userService.logout();
      this.router.navigate(['login']);
  }

}

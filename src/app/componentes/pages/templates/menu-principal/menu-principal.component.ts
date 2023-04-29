import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { User } from 'src/app/core/user/user';
import { UserService } from 'src/app/core/user/user.service';
import { UsuarioComponent } from '../../modal/usuario/usuario.component';
import { Response } from 'src/app/core/message/response';
import { CustomerComponent } from '../../modal/customer/customer.component';
import { CustomerService } from 'src/app/core/customer/customer.service';

@Component({
  selector: 'app-menu-principal',
  templateUrl: './menu-principal.component.html',
  styleUrls: ['./menu-principal.component.css']
})
export class MenuPrincipalComponent implements OnInit {

  @Output() menuSelecionado: EventEmitter<string> = new EventEmitter();
  responseMessage: Response = {error:false, message:''};
  user$: Observable<User | null>;
  user: User | null | undefined;
  nome: string;
  urlFoto:string;
  urlLogo:string;

  configModal = {
    backdrop: false,
    ignoreBackdropClick: false,
    size: 'xl',
    centered: true
  };

  configModalMenor = {
    backdrop: false,
    ignoreBackdropClick: false,
    size: 'lg',
    centered: true
  };

  constructor(private userService: UserService, 
              private router:Router,
              private modalService: NgbModal,
              private customerService: CustomerService) {
    
    try {
      
      this.user$ = userService.getUser();
      this.user$.subscribe(user => this.user = user);
  
    } catch (error) {
      console.error(error);
    }
  }
  ngOnInit(): void {
    this.urlFoto = this.userService.getURLFoto(this.user?.sub);
    this.urlLogo = this.customerService.getURLLogo();
    this.menuSelecionado.emit('Agendamentos');
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

  openModalInfoUsuario(){
    try {
      const modal =  this.modalService.open(UsuarioComponent, this.configModal);
       
      modal.componentInstance.id = this.user?.sub;
      modal.componentInstance.passMessage.subscribe((response: Response) => {
         this.responseMessage = response;
      })
    } catch (error) {
      console.error(error);
    }
  }

  openModalAtualizarLogo(){
    try {
      const modal =  this.modalService.open(CustomerComponent, this.configModalMenor);
      modal.componentInstance.passMessage.subscribe((response: Response) => {
         this.responseMessage = response;
      })
    } catch (error) {
      console.error(error);
    }
  }

}

import { AfterViewInit, Component, ElementRef, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {

  constructor(private elementRef: ElementRef) {}

  @Input() menuSelecionado: string = 'Agendamento';
  
  ngAfterViewInit(): void {
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundImage = "url('')";
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = 'white';
  }

  selecionarMenu(menu: string){
    try {
      this.menuSelecionado = menu;
    } catch (error) {
      console.error(error);
    }
  }

  ngOnInit(): void {
  }

}

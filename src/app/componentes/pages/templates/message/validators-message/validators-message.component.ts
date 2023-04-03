import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-validators-message',
  templateUrl: './validators-message.component.html',
  styleUrls: ['./validators-message.component.css']
})
export class ValidatorsMessageComponent {

  @Input() message: string = '';

}

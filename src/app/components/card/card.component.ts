import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Size} from '../../models/size';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {

  @Input() text: Size;
  @Input() size: Size;

  @Output() wasCardClicked = new EventEmitter<Size>();

  constructor() {
  }

  onCardClicked(): void {
    this.wasCardClicked.emit(this.text);
  }

}

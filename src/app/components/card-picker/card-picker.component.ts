import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Size} from '../../models/size';

@Component({
  selector: 'app-card-picker',
  templateUrl: './card-picker.component.html',
  styleUrls: ['./card-picker.component.scss']
})
export class CardPickerComponent {

  @Input() selectedSize: Size;
  @Output() wasCardClicked = new EventEmitter<Size>();

  cards: Size[] = [
    Size.XXS,
    Size.XS,
    Size.S,
    Size.M,
    Size.L,
    Size.XL,
    Size.XXL,
    Size.XXXL,
  ];

  constructor() {
  }

  pickCardSize(size: Size): void {
    this.wasCardClicked.emit(size);
    if (this.selectedSize === size) {
      this.selectedSize = null;
      return;
    }
    this.selectedSize = size;
  }

}

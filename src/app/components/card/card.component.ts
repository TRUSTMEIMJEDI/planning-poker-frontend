import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Size} from '../../models/size';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input() text: Size;
  @Input() size: Size;

  @Output() wasCardClicked = new EventEmitter<Size>();

  constructor() {
  }

  ngOnInit(): void {
  }

  onCardClicked(): void {
    this.wasCardClicked.emit(this.text);
  }

}

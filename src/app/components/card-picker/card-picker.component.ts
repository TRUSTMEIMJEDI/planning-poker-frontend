import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Size } from '../../models/size';
import { RoomType } from '../../models/room-type';

@Component({
  selector : 'app-card-picker',
  templateUrl : './card-picker.component.html',
  styleUrls : [ './card-picker.component.scss' ]
})
export class CardPickerComponent implements OnInit {

  @Input() roomType: string;
  @Input() selectedSize: Size;
  @Output() wasCardClicked = new EventEmitter<Size>();

  cards: Size[];

  constructor() {}

  ngOnInit(): void {
    this.initRoom();
  }

  pickCardSize(size: Size): void {
    this.wasCardClicked.emit(size);
    if (this.selectedSize === size) {
      this.selectedSize = null;
      return;
    }
    this.selectedSize = size;
  }

  private initRoom(): void {
    if (this.roomType === RoomType[ RoomType.T_SHIRTS ]) {
      this.cards = [
        Size.XXS,
        Size.XS,
        Size.S,
        Size.M,
        Size.L,
        Size.XL,
        Size.XXL,
        Size.XXXL,
        Size.QUESTION
      ];
    } else if (this.roomType === RoomType[ RoomType.FIBONACCI ]) {
      this.cards = [
        Size.FIB_1,
        Size.FIB_2,
        Size.FIB_3,
        Size.FIB_5,
        Size.FIB_8,
        Size.FIB_13,
        Size.FIB_21,
        Size.FIB_34,
        Size.FIB_55,
        Size.FIB_89,
        Size.QUESTION
      ];
    } else if (this.roomType === RoomType[ RoomType.MOSCOW ]) {
      this.cards = [
        Size.MOSCOW_M,
        Size.MOSCOW_S,
        Size.MOSCOW_C,
        Size.MOSCOW_W
      ];
    }
  }
}

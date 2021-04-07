import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Size } from '../../models/size';

@Component({
  selector : 'app-user-card',
  templateUrl : './user-card.component.html',
  styleUrls : [ './user-card.component.scss' ]
})
export class UserCardComponent {

  @Input() cardStyle: string;
  @Input() size: Size;
  @Input() userName: string;
  @Input() observer: boolean;
  @Input() allowDeleteUsers: boolean;

  @Output() deleteUserEvent = new EventEmitter<string>();

  constructor() {}

  getSizeText(size: string): string {
    if (size == null) {
      return '';
    }
    return Size[ size ];
  }

  deleteUserByName(): void {
    this.deleteUserEvent.emit(this.userName);
  }

}

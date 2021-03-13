import {Component, Input} from '@angular/core';
import {User} from '../../models/user';

@Component({
  selector: 'app-card-shower',
  templateUrl: './card-shower.component.html',
  styleUrls: ['./card-shower.component.scss']
})
export class CardShowerComponent {

  @Input() users: User[];
  @Input() activeUser: string;

  constructor() {
  }

  getCardStyle(user: User): string {
    if (user.answer && user.size) {
      if (user.name === this.activeUser) {
        return 'showed active';
      } else {
        return 'showed';
      }
    } else if (user.answer && !user.size) {
      if (user.name === this.activeUser) {
        return 'hidden active';
      } else {
        return 'hidden';
      }
    } else if (!user.answer) {
      if (user.name === this.activeUser) {
        return 'empty active';
      } else {
        return 'empty';
      }
    }
  }

}

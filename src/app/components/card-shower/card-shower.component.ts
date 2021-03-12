import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../models/user';
import {Size} from '../../models/size';

@Component({
  selector: 'app-card-shower',
  templateUrl: './card-shower.component.html',
  styleUrls: ['./card-shower.component.scss']
})
export class CardShowerComponent implements OnInit {

  @Input() users: User[];

  constructor() {
  }

  ngOnInit(): void {
  }

  getCardStyle(answer: boolean, size: Size): string {
    if (answer && size) {
      return 'showed';
    } else if (answer && !size) {
      return 'hidden';
    } else if (!answer) {
      return 'empty';
    }
  }

}

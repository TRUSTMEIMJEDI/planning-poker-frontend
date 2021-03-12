import {Component, Input, OnInit} from '@angular/core';
import {Size} from '../../models/size';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent implements OnInit {

  @Input() cardStyle: string;
  @Input() size: Size;
  @Input() userName: string;

  constructor() {
  }

  ngOnInit(): void {
  }

}

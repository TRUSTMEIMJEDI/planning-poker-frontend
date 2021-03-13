import {Component, Input, OnInit} from '@angular/core';
import {Size} from '../../models/size';

@Component({
  selector: 'app-vote-shower',
  templateUrl: './vote-shower.component.html',
  styleUrls: ['./vote-shower.component.scss']
})
export class VoteShowerComponent implements OnInit {

  @Input() sizes: Size[];

  uniqueSizes: Size[];

  constructor() {
  }

  ngOnInit(): void {
    this.uniqueSizes = [...new Set(this.sizes)];
  }

  countSize(size: Size): number {
    return this.sizes.filter(s => s === size).length;
  }

}

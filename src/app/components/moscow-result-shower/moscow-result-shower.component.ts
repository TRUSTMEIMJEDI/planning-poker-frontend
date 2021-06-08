import { Component, Input, OnInit } from '@angular/core';
import { Size } from '../../models/size';
import { MatTableDataSource } from '@angular/material/table';
import { MoscowResultElement } from '../../models/moscow-result-element';

@Component({
  selector : 'app-moscow-result-shower',
  templateUrl : './moscow-result-shower.component.html',
  styleUrls : [ './moscow-result-shower.component.scss' ]
})
export class MoscowResultShowerComponent implements OnInit {

  @Input() answers: Size[];

  displayedColumns: string[] = [ 'people', 'wont', 'could', 'should', 'must' ];
  dataSource;
  sumAnswerValue: number;

  ngOnInit(): void {
    this.initTableData();
    this.reduceAnswersSumValue();
  }

  isInRange(value: string): boolean {
    const strings = value.split('-');
    return Number(strings[ 0 ]?.trim()) <= this.sumAnswerValue && Number(strings[ 1 ]?.trim()) >= this.sumAnswerValue;
  }

  private initTableData(): void {
    const ELEMENT_DATA = [
      { people : 11, wont : '0 - 12', could : '13 - 25', should : '26 - 38', must : '39 - 55' },
      { people : 10, wont : '0 - 11', could : '12 - 23', should : '24 - 33', must : '34 - 50' },
      { people : 9, wont : '0 - 10', could : '11 - 21', should : '22 - 30', must : '31 - 45' },
      { people : 8, wont : '0 - 9', could : '10 - 19', should : '20 - 29', must : '30 - 40' },
      { people : 7, wont : '0 - 8', could : '9 - 17', should : '18 - 25', must : '26 - 35' },
      { people : 6, wont : '0 - 6', could : '7 - 14', should : '15 - 21', must : '22 - 30' },
      { people : 5, wont : '0 - 4', could : '5 - 12', should : '13 - 18', must : '19 - 25' },
      { people : 4, wont : '0 - 4', could : '5 - 10', should : '11 - 14', must : '15 - 20' },
      { people : 3, wont : '0 - 3', could : '4 - 6', should : '7 - 10', must : '11 - 15' },
      { people : 2, wont : '0 - 2', could : '3 - 4', should : '5 - 7', must : '8 - 10' },
      { people : 1, wont : '0-0', could : '2-2', should : '3-3', must : '5-5' }
    ];

    const length = this.answers.filter(el => el != null).length;
    const data = ELEMENT_DATA.filter(el => el.people === length);
    this.dataSource = new MatTableDataSource<MoscowResultElement>(data);
  }

  private reduceAnswersSumValue(): void {
    this.sumAnswerValue = this.answers
      .filter(el => el != null)
      .map(this.mapMoscowSizeValue())
      .reduce((x1: number, x2: number) => {
        return x1 + x2;
      });
  }

  private mapMoscowSizeValue(): (size: Size) => (number) {
    return size => {
      if (Size[ size ] === Size.MOSCOW_M) {
        return 5;
      } else if (Size[ size ] === Size.MOSCOW_S) {
        return 3;
      } else if (Size[ size ] === Size.MOSCOW_C) {
        return 2;
      } else if (Size[ size ] === Size.MOSCOW_W) {
        return 0;
      }
    };
  }

}

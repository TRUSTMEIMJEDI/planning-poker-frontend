import {Component, OnInit} from '@angular/core';
import {PokerService} from '../../services/poker.service';
import {Room} from '../../models/room';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss']
})
export class AdminPageComponent implements OnInit {

  password: string;
  allowed = false;
  rooms: Room[];

  constructor(private pokerService: PokerService) {
  }

  ngOnInit(): void {
  }

  login(): void {
    this.pokerService.loginAsAdmin(this.password).subscribe(res => {
      this.allowed = res;
      this.getRooms();
    });
  }

  getRooms(): void {
    this.pokerService.getRooms(this.password).subscribe(rooms => {
      this.rooms = rooms;
    });
  }

  deleteRoom(roomKey: string): void {
    this.pokerService.deleteRoom(this.password, roomKey).subscribe(rooms => {
      this.rooms = rooms;
    });
  }

}

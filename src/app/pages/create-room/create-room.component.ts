import { Component, OnInit } from '@angular/core';
import { PokerService } from '../../services/poker.service';
import { Router } from '@angular/router';
import { UserDataService } from '../../services/user-data.service';
import { RoomType } from '../../models/room-type';

@Component({
  selector : 'app-create-room',
  templateUrl : './create-room.component.html',
  styleUrls : [ './create-room.component.scss' ]
})
export class CreateRoomComponent implements OnInit {

  roomName: string;
  userName: string;
  roomType: string;
  roomTypes = [
    { roomType : RoomType.T_SHIRTS, desc : 'T-shirts (XXS, XS, S, M, L, XL, 2XL, 3XL, ?)' },
    { roomType : RoomType.FIBONACCI, desc : 'Fibonacci (0, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, ?)' },
    { roomType : RoomType.MOSCOW, desc : 'MOSCOW (W, C, S, M)' }
  ];

  constructor(private pokerService: PokerService,
              private router: Router,
              private userDataService: UserDataService) {
  }

  ngOnInit(): void {
    if (!!this.userDataService.currentUserValue?.roomKey) {
      this.router.navigate([ '/room' ]);
    }

    this.userName = this.userDataService.currentUserValue?.userName;
  }

  createRoom(): void {
    if (!this.roomName || !this.userName || !this.roomType) {
      return;
    }

    this.pokerService.createRoomWithOwner(this.roomName, this.userName, this.roomType).subscribe(() => {
      this.router.navigate([ '/room' ]);
    });
  }

  getRoomTypeString(roomType: RoomType): string {
    return RoomType[ roomType ];
  }

}

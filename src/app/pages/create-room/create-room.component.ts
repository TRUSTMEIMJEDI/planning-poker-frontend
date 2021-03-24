import { Component, OnInit } from '@angular/core';
import { PokerService } from '../../services/poker.service';
import { Router } from '@angular/router';
import { UserDataService } from '../../services/user-data.service';

@Component({
  selector : 'app-create-room',
  templateUrl : './create-room.component.html',
  styleUrls : [ './create-room.component.scss' ]
})
export class CreateRoomComponent implements OnInit {

  roomName: string;
  userName: string;

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
    if (!this.roomName || !this.userName) {
      return;
    }

    this.pokerService.createRoomWithOwner(this.roomName, this.userName).subscribe(() => {
      this.router.navigate([ '/room' ]);
    });
  }

}

import { Component } from '@angular/core';
import { PokerService } from '../../services/poker.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector : 'app-join-room',
  templateUrl : './join-room.component.html',
  styleUrls : [ './join-room.component.scss' ]
})
export class JoinRoomComponent {

  roomKey: string;
  userName: string;
  observer = false;

  constructor(private pokerService: PokerService,
              private router: Router,
              private snackBar: MatSnackBar) {
  }

  joinRoom(): void {
    if (!this.roomKey || !this.userName) {
      return;
    }

    this.pokerService.joinRoom(this.roomKey, this.userName, this.observer).subscribe(() => {
        this.router.navigate([ '/room' ]);
      },
      error => {
        console.log(error.error.message);
        this.snackBar.open(error.error.message, 'OK', {
          duration : 2000
        });
      });
  }

}

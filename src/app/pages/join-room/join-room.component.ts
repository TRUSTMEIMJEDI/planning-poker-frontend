import { Component, OnInit } from '@angular/core';
import { PokerService } from '../../services/poker.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserDataService } from '../../services/user-data.service';

@Component({
  selector : 'app-join-room',
  templateUrl : './join-room.component.html',
  styleUrls : [ './join-room.component.scss' ]
})
export class JoinRoomComponent implements OnInit {

  roomKey: string;
  userName: string;
  observer = false;

  constructor(private pokerService: PokerService,
              private router: Router,
              private snackBar: MatSnackBar,
              private activatedRoute: ActivatedRoute,
              private userDataService: UserDataService) {
  }

  ngOnInit(): void {
    if (!!this.userDataService.currentUserValue?.roomKey) {
      this.router.navigate([ '/room' ]);
    }

    this.activatedRoute.queryParams.subscribe(params => {
      if (params.u) {
        this.roomKey = atob(params.u);
      }
    });

    this.userName = this.userDataService.currentUserValue?.userName;

    if (this.userName && this.roomKey) {
      this.joinRoom();
    }
  }

  joinRoom(): void {
    if (!this.roomKey || !this.userName) {
      return;
    }

    this.pokerService.joinRoom(this.roomKey, this.userName, this.observer).subscribe(() => {
        this.router.navigate([ '/room' ]);
      },
      error => {
        this.snackBar.open(error.error.message, 'OK', {
          duration : 2000
        });
      });
  }

}

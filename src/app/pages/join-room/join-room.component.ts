import { Component, OnInit } from '@angular/core';
import { PokerService } from '../../services/poker.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

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
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.roomKey = atob(params.u);
    });
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

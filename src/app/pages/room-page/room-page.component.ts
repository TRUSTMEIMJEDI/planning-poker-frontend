import { Component, OnDestroy, OnInit } from '@angular/core';
import { PokerService } from '../../services/poker.service';
import { User } from '../../models/user';
import { Size } from '../../models/size';
import { RxStompService } from '@stomp/ng2-stompjs';
import { Message } from '@stomp/stompjs';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector : 'app-room-page',
  templateUrl : './room-page.component.html',
  styleUrls : [ './room-page.component.scss' ]
})
export class RoomPageComponent implements OnInit, OnDestroy {

  users1: User[];
  users2: User[];
  roomName: string;
  roomKey: string;
  userName: string;
  isRevealed = false;
  observer = false;
  selectedSize: Size;

  users: User[];
  answers: Size[];
  private roomSub$: Subscription;
  private revealSub$: Subscription;

  constructor(private pokerService: PokerService,
              private rxStompService: RxStompService,
              private router: Router,
              private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.initVariables();
    if (!this.pokerService.currentUserValue) {
      return;
    }
    this.loadUsers();
    this.initializeWebSocketConnection();
  }

  ngOnDestroy(): void {
    if (this.roomSub$) {
      this.roomSub$.unsubscribe();
    }
    if (this.revealSub$) {
      this.revealSub$.unsubscribe();
    }
  }

  getShareLink(): string {
    return `${ window.location.origin }/#/join-room?u=${ btoa(this.roomKey) }`;
  }

  snackBarOpen(): void {
    this.snackBar.open('Link z zaproszeniem skopiowany do schowka!', 'OK', {
      duration : 2000
    });
  }

  cleanAnswers(): void {
    this.pokerService.cleanAnswers();
  }

  showCards(): void {
    if (this.validateShowCards()) {
      return;
    }

    this.pokerService.showCards();
  }

  updateCard(size: Size): void {
    const user = this.users.find(u => u.name === this.userName);
    this.selectedSize = this.selectedSize === size ? null : size;
    user.answer = this.selectedSize != null;
    this.pokerService.sendAnswer(this.selectedSize);
  }

  leaveRoom(): void {
    this.pokerService.leaveRoom().subscribe((data) => {
        this.routeToHomeAndLogout();
      },
      () => {
        this.routeToHomeAndLogout();
      }
    );
  }

  private initVariables(): void {
    const auth = this.pokerService.currentUserValue;
    if (!auth) {
      this.routeToHomeAndLogout();
      return;
    }

    this.roomName = auth.roomName;
    this.userName = auth.userName;
    this.roomKey = auth.roomKey;
    this.observer = auth.observer;
  }

  private loadUsers(): void {
    this.pokerService.getAllUsersInRoom().then(data => {
      this.users = data;
      this.prepareUsersList();
    }, () => {
      this.routeToHomeAndLogout();
    });
  }

  private prepareUsersList(): void {
    const halfSize = this.users.length / 2;
    const size = this.users.length;
    this.users1 = this.users.slice(0, halfSize);
    this.users2 = this.users.slice(halfSize, size);
  }

  private initializeWebSocketConnection(): void {
    this.roomSub$ = this.rxStompService.watch('/room/' + this.roomKey).subscribe((message: Message) => {
      const users = JSON.parse(message.body);
      if (users.length > 0) {
        this.users = users;
        this.prepareUsersList();
      } else {
        this.routeToHomeAndLogout();
      }
    });
    this.revealSub$ = this.rxStompService.watch('/room/' + this.roomKey + '/reveal').subscribe((message: Message) => {
      if (message.body) {
        this.users = JSON.parse(message.body);
        this.answers = this.users.map(u => u.size);
        this.prepareUsersList();
        this.isRevealed = !this.isAnswered();
        if (!this.isRevealed) {
          this.selectedSize = null;
        }
      }
    });
  }

  private validateShowCards(): boolean {
    return this.users.every(u => u.answer === false);
  }

  private isAnswered(): boolean {
    return this.users.every(u => u.answer === false);
  }

  private routeToHomeAndLogout(): void {
    this.router.navigate([ '/home' ]).then(() => {
      this.pokerService.logout();
    });
  }

}

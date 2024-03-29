import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { PokerService } from '../../services/poker.service';
import { User } from '../../models/user';
import { Size } from '../../models/size';
import { RxStompService } from '@stomp/ng2-stompjs';
import { Message } from '@stomp/stompjs';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserDataService } from '../../services/user-data.service';
import { RoomType } from '../../models/room-type';

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
  roomType: string;
  isRevealed = false;
  loading = false;
  allowDeleteUsers = false;
  observer = false;
  selectedSize: Size;
  users: User[];
  answers: Size[];

  private roomSub$: Subscription;
  private revealSub$: Subscription;
  private changeRoomTypeSub$: Subscription;
  private roomKickSub$: Subscription;
  private authSub$: Subscription;

  constructor(public pokerService: PokerService,
              private userDataService: UserDataService,
              private rxStompService: RxStompService,
              private router: Router,
              private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.initVariables();
    if (!this.pokerService.currentUserValue?.userKey) {
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
    if (this.changeRoomTypeSub$) {
      this.changeRoomTypeSub$.unsubscribe();
    }
    if (this.authSub$) {
      this.authSub$.unsubscribe();
    }
    if (this.roomKickSub$) {
      this.roomKickSub$.unsubscribe();
    }
  }

  getShareLink(): string {
    return `${ window.location.origin }/#/join-room?u=${ btoa(this.roomKey) }`;
  }

  setAllowDeleteUsers(allowDeleteUsers: boolean): void {
    this.allowDeleteUsers = allowDeleteUsers;
  }

  deleteUser(user: User): void {
    this.pokerService.deleteUserFromRoom(user).subscribe(
      () => {},
      error => {
        this.snackBar.open(error.error.message, 'OK', {
          duration : 2000
        });
      });
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
    const user = this.users.find(u => u.name === this.pokerService.currentUserValue.userName);
    this.selectedSize = this.selectedSize === size ? null : size;
    user.answer = this.selectedSize != null;
    this.pokerService.sendAnswer(this.selectedSize);
  }

  @HostListener('window:beforeunload')
  leaveRoomOnCloseTab(): void {
    this.pokerService.leaveRoom().subscribe(() => {
        this.userDataService.leaveRoom();
      },
      () => {
        this.userDataService.leaveRoom();
      }
    );
  }

  private initVariables(): void {
    const auth = this.pokerService.currentUserValue;
    if (!auth?.userKey) {
      this.routeToHomeAndLogout();
      return;
    }

    this.roomName = auth.roomName;
    this.roomKey = auth.roomKey;
    this.observer = auth.observer;
    this.roomType = auth.roomType;

    this.authSub$ = this.userDataService.currentUser.subscribe(authData => {
      if (authData.observer !== this.observer) {
        this.observer = authData.observer;
        this.selectedSize = null;
        this.updateCard(null);
      }
    });
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
    this.subscribeRoom();
    this.subscribeRoomReveal();
    this.subscribeRoomKick();
    this.subscribeChangeRoomType();
  }

  private subscribeRoom(): void {
    this.roomSub$ = this.rxStompService.watch('/room/' + this.roomKey).subscribe((message: Message) => {
      const users = JSON.parse(message.body);
      if (users.length > 0) {
        this.mergeUsers(users);
        this.prepareUsersList();
      } else {
        this.routeToHomeAndLogout();
      }
    });
  }

  private subscribeRoomReveal(): void {
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

  private subscribeChangeRoomType(): void {
    this.changeRoomTypeSub$ = this.rxStompService.watch('/room/' + this.roomKey + '/changeType').subscribe((message: Message) => {
      if (message.body) {
        this.loading = true;
        this.roomType = message.body;
        this.selectedSize = null;
        this.updateCard(null);
        this.cleanAnswers();
        setTimeout(() => {
          this.loading = false;
        }, 50);
      }
    });
  }

  private subscribeRoomKick(): void {
    const userName = this.userDataService.currentUserValue.userName;
    this.roomKickSub$ = this.rxStompService.watch('/room/' + this.roomKey + '/' + userName).subscribe((message: Message) => {
      if (message.body) {
        if (message.body === userName) {
          this.routeToHomeAndLogout();
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
      this.userDataService.leaveRoom();
    });
  }

  private mergeUsers(users: User[]): void {
    this.users = users.map(itm => ({
      ...this.users.find((item) => (item.name === itm.name) && item),
      ...itm
    }));
  }

  isMoscow(): boolean {
    return this.roomType === RoomType[ RoomType.MOSCOW ];
  }

}

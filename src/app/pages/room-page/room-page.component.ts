import {Component, OnDestroy, OnInit} from '@angular/core';
import {PokerService} from '../../services/poker.service';
import {User} from '../../models/user';
import {Size} from '../../models/size';

declare var SockJS;
declare var Stomp;

@Component({
  selector: 'app-room-page',
  templateUrl: './room-page.component.html',
  styleUrls: ['./room-page.component.scss']
})
export class RoomPageComponent implements OnInit, OnDestroy {

  users1: User[];
  users2: User[];
  roomName: string;
  roomKey: string;
  userName: string;
  isRevealed = false;
  selectedSize: Size;

  private users: User[];
  private stompClient;

  constructor(private pokerService: PokerService) {
  }

  ngOnInit(): void {
    this.loadUsers();
    // this.initializeWebSocketConnection();
    this.roomName = this.pokerService.currentUserValue.roomName;
    this.userName = this.pokerService.currentUserValue.userName;
    this.roomKey = this.pokerService.currentUserValue.roomKey;
    // setInterval(() => this.loadUsers(), 1000);
  }

  ngOnDestroy(): void {
  }

  onClick(): void {
    if (this.isRevealed) {
      this.cleanAnswers();
      return;
    }

    this.showCards();
  }

  updateCard(size: Size): void {
    const user = this.users.find(u => u.name === this.userName);
    this.selectedSize = this.selectedSize === size ? null : size;
    user.answer = this.selectedSize != null;
    this.pokerService.sendAnswer(this.selectedSize).then(data => {
      console.log(data);
    });
    this.prepareUsersList();
  }

  private loadUsers(): void {
    this.pokerService.getAllUsersInRoom().then(data => {
      this.users = data;
      this.prepareUsersList();
    });
  }

  private prepareUsersList(): void {
    const halfSize = this.users.length / 2;
    const size = this.users.length;
    this.users1 = this.users.slice(0, halfSize);
    this.users2 = this.users.slice(halfSize, size);
  }

  private initializeWebSocketConnection(): void {
    // const serverUrl = 'http://192.168.0.30:8080/socket';
    const serverUrl = 'http://localhost:8080/socket';
    const ws = new SockJS(serverUrl);
    ws.withCredentials = false;
    this.stompClient = Stomp.over(ws);
    const that = this;
    // tslint:disable-next-line:only-arrow-functions typedef
    this.stompClient.connect({}, function(frame) {
      that.stompClient.subscribe('/answer', (answer) => {
        if (answer.body) {
          console.log(answer.body);
        }
      });
    });
  }

  // sendMessage(message): void {
  //   this.stompClient.send('/app/send/message' , {}, message);
  // }

  private cleanAnswers(): void {
    this.pokerService.cleanAnswers().then(data => {
      console.log(data);
      this.users.forEach(user => {
        user.answer = false;
        user.size = null;
      });
      this.isRevealed = false;
      this.selectedSize = null;
      this.prepareUsersList();
    });
  }

  private showCards(): void {
    this.pokerService.showCards().then(data => {
      this.users = data;
      this.isRevealed = true;
      this.prepareUsersList();
    });
  }

}

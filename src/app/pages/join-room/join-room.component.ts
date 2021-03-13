import {Component} from '@angular/core';
import {PokerService} from '../../services/poker.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-join-room',
  templateUrl: './join-room.component.html',
  styleUrls: ['./join-room.component.scss']
})
export class JoinRoomComponent {

  roomKey: string;
  userName: string;

  constructor(private pokerService: PokerService,
              private router: Router) {
  }

  joinRoom(): void {
    if (!this.roomKey || !this.userName) {
      return;
    }

    this.pokerService.joinRoom(this.roomKey, this.userName).subscribe(() => {
      this.router.navigate(['/room']);
    });
  }

}

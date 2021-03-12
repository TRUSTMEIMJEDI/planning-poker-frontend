import {Component, OnInit} from '@angular/core';
import {PokerService} from '../../services/poker.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-join-room',
  templateUrl: './join-room.component.html',
  styleUrls: ['./join-room.component.scss']
})
export class JoinRoomComponent implements OnInit {

  roomKey: string;
  userName: string;

  constructor(private pokerService: PokerService,
              private router: Router) {
  }

  ngOnInit(): void {
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

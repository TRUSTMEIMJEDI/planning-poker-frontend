import { Component, OnInit } from '@angular/core';
import { UserDataService } from '../../services/user-data.service';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector : 'app-user-settings',
  templateUrl : './user-settings.component.html',
  styleUrls : [ './user-settings.component.scss' ]
})
export class UserSettingsComponent implements OnInit {

  userName: string;
  observer: boolean;
  isInRoom: boolean;
  private userSub$: Subscription;

  constructor(private userDataService: UserDataService,
              private userService: UserService,
              private router: Router) { }

  ngOnInit(): void {
    this.userSub$ = this.userDataService.currentUser.subscribe(() => {
      this.init();
    });
  }

  changeUserType(): void {
    this.userService.changeUserType(!this.observer).subscribe(() => {
      this.observer = this.userDataService.currentUserValue.observer;
    });
  }

  logout(): void {
    const url = window.location.origin;
    if ('home'.match(url)) {
      this.userDataService.logout();
    } else {
      this.leaveRoomAndLogout();
    }
    this.init();
  }

  private leaveRoomAndLogout(): void {
    this.userService.leaveRoom().subscribe(() => {
        this.routeToHomeAndLogout();
      },
      () => {
        this.router.navigate([ '/home' ]).then(() => {
          this.routeToHomeAndLogout();
        });
      }
    );
  }

  private routeToHomeAndLogout(): void {
    this.router.navigate([ '/home' ]).then(() => {
      this.userDataService.logout();
    });
  }

  private init(): void {
    this.isInRoom = !!this.userDataService.currentUserValue?.roomKey;
    this.userName = this.userDataService.currentUserValue?.userName;
    this.observer = this.userDataService.currentUserValue?.observer;
  }

}

import { Component, OnInit } from '@angular/core';
import { UserDataService } from '../../services/user-data.service';
import { Router } from '@angular/router';

@Component({
  selector : 'app-home-page',
  templateUrl : './home-page.component.html',
  styleUrls : [ './home-page.component.scss' ]
})
export class HomePageComponent implements OnInit {

  constructor(private userDataService: UserDataService,
              private router: Router) {
  }

  ngOnInit(): void {
    if (!!this.userDataService.currentUserValue?.roomKey) {
      this.router.navigate([ '/room' ]);
    }
  }

  public changeLanguage(code: string): void {
    localStorage.setItem('locale', code);
    window.location.reload();
  }

}

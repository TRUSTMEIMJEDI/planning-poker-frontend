import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Auth } from '../models/auth';

@Injectable({
  providedIn : 'root'
})
export class UserDataService {

  public currentUser: Observable<Auth>;
  private currentUserSubject: BehaviorSubject<Auth>;

  constructor() {
    this.currentUserSubject = new BehaviorSubject<Auth>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  get currentUserValue(): Auth {
    return this.currentUserSubject.value;
  }

  setCurrentUserSubject(auth: Auth): void {
    this.currentUserSubject.next(auth);
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  leaveRoom(): void {
    const authData = this.getAuthWithOnlyUserName();
    localStorage.setItem('currentUser', JSON.stringify(authData));
    this.currentUserSubject.next(authData);
  }

  private getAuthWithOnlyUserName(): Auth {
    return {
      roomKey : null,
      roomName : null,
      userKey : null,
      userName : this.currentUserValue.userName,
      observer : null,
      roomType : null
    };
  }

}

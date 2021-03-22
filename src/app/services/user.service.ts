import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Auth } from '../models/auth';

@Injectable({
  providedIn : 'root'
})
export class UserService {

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

}

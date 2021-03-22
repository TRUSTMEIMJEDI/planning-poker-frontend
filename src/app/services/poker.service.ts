import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/user';
import { Observable } from 'rxjs';
import { Auth } from '../models/auth';
import { map } from 'rxjs/operators';
import { Size } from '../models/size';
import { Room } from '../models/room';
import { PokerUtils } from '../utils/poker-utils';
import { UserService } from './user.service';

const httpOptions = {
  headers : new HttpHeaders({ 'Content-Type' : 'application/json' })
};

const BASE_URL = PokerUtils.getUrl();

@Injectable({
  providedIn : 'root'
})
export class PokerService {

  constructor(private http: HttpClient, private userService: UserService) {}

  public get currentUserValue(): Auth {
    return this.userService.currentUserValue;
  }

  createRoomWithOwner(roomName: string, userName: string): Observable<Auth> {
    const body = {
      roomName,
      userName
    };

    return this.http.post<any>(BASE_URL + 'createRoomWithOwner', body, httpOptions)
      .pipe(map(responseData => {
        const userData = {
          roomKey : responseData.roomKey,
          roomName : responseData.roomName,
          userKey : responseData.userKey,
          userName : responseData.userName,
          observer : false
        };
        localStorage.setItem('currentUser', JSON.stringify(userData));
        this.userService.setCurrentUserSubject(userData);
        return userData;
      }));
  }

  getAllUsersInRoom(): Promise<User[]> {
    return this.http.get<User[]>(`${ BASE_URL }${ this.currentUserValue.roomKey }/users`, httpOptions).toPromise();
  }

  joinRoom(roomKey: string, userName: string, isObserver: boolean): Observable<Auth> {
    return this.http.post<any>(`${ BASE_URL }${ roomKey }/${ userName }/${ isObserver }`, httpOptions)
      .pipe(
        map(responseData => {
          const userData = {
            roomKey : responseData.roomKey,
            roomName : responseData.roomName,
            userKey : responseData.userKey,
            userName : responseData.userName,
            observer : responseData.observer
          };
          localStorage.setItem('currentUser', JSON.stringify(userData));
          this.userService.setCurrentUserSubject(userData);
          return userData;
        }));
  }

  cleanAnswers(): void {
    this.http.get<any>(`${ BASE_URL }${ this.currentUserValue.roomKey }/clean`, httpOptions).toPromise();
  }

  leaveRoom(): Observable<any> {
    const body = {
      roomKey : this.currentUserValue.roomKey,
      userKey : this.currentUserValue.userKey
    };

    return this.http.post<any>(`${ BASE_URL }leaveRoom`, body, httpOptions);
  }

  sendAnswer(size: Size): void {
    const body = {
      roomKey : this.currentUserValue.roomKey,
      userKey : this.currentUserValue.userKey,
      size : Object.keys(Size).filter(x => Size[ x ] === size)[ 0 ]
    };
    this.http.post<any>(`${ BASE_URL }answer`, body, httpOptions).toPromise();
  }

  showCards(): void {
    this.http.get<any>(`${ BASE_URL }${ this.currentUserValue.roomKey }/reveal`, httpOptions).toPromise();
  }

  loginAsAdmin(password: string): Observable<boolean> {
    return this.http.post<any>(`${ BASE_URL }login`, { password }, httpOptions);
  }

  getRooms(password: string): Observable<Room[]> {
    return this.http.post<Room[]>(`${ BASE_URL }rooms`, { password }, httpOptions);
  }

  deleteRoom(password: string, roomKey: string): Observable<Room[]> {
    return this.http.post<Room[]>(`${ BASE_URL }deleteRoom`, { password, roomKey }, httpOptions);
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.userService.setCurrentUserSubject(null);
  }

}

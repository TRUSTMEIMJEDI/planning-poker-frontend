import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/user';
import { Observable } from 'rxjs';
import { Auth } from '../models/auth';
import { map } from 'rxjs/operators';
import { Size } from '../models/size';
import { Room } from '../models/room';
import { PokerUtils } from '../utils/poker-utils';
import { UserDataService } from './user-data.service';

const httpOptions = {
  headers : new HttpHeaders({ 'Content-Type' : 'application/json' })
};

const BASE_URL = PokerUtils.getUrl();

@Injectable({
  providedIn : 'root'
})
export class PokerService {

  constructor(private http: HttpClient, private userDataService: UserDataService) {}

  public get currentUserValue(): Auth {
    return this.userDataService.currentUserValue;
  }

  createRoomWithOwner(roomName: string, userName: string, roomType: string): Observable<Auth> {
    const body = {
      roomName,
      userName,
      roomType
    };

    return this.http.post<any>(BASE_URL + 'createRoomWithOwner', body, httpOptions)
      .pipe(map(responseData => {
        const userData = {
          roomKey : responseData.roomKey,
          roomName : responseData.roomName,
          userKey : responseData.userKey,
          userName : responseData.userName,
          roomType,
          observer : false
        };
        localStorage.setItem('currentUser', JSON.stringify(userData));
        this.userDataService.setCurrentUserSubject(userData);
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
            observer : responseData.observer,
            roomType : responseData.roomType
          };
          localStorage.setItem('currentUser', JSON.stringify(userData));
          this.userDataService.setCurrentUserSubject(userData);
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

  deleteUserFromRoom(userToDelete: User): Observable<any> {
    const body = {
      roomKey : this.userDataService.currentUserValue.roomKey,
      userKey : this.userDataService.currentUserValue.userKey,
      userNameToDelete : userToDelete.name
    };

    return this.http.post<any>(`${ BASE_URL }deleteUserFromRoom`, body, httpOptions);
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

  changeRoomType(roomType: string, roomKey: string): Observable<any> {
    return this.http.post<any>(`${ BASE_URL }changeRoomType`, { roomType, roomKey }, httpOptions);
  }

}

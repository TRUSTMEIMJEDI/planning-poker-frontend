import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PokerUtils } from '../utils/poker-utils';
import { UserDataService } from './user-data.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Auth } from '../models/auth';

const httpOptions = {
  headers : new HttpHeaders({ 'Content-Type' : 'application/json' })
};

const BASE_URL = PokerUtils.getUrl();

@Injectable({
  providedIn : 'root'
})
export class UserService {

  constructor(private http: HttpClient, private userDataService: UserDataService) { }

  leaveRoom(): Observable<any> {
    const body = {
      roomKey : this.userDataService.currentUserValue.roomKey,
      userKey : this.userDataService.currentUserValue.userKey
    };

    return this.http.post<any>(`${ BASE_URL }leaveRoom`, body, httpOptions);
  }

  changeUserType(isObserver: boolean): Observable<Auth> {
    const roomKey = this.userDataService.currentUserValue.roomKey;
    const userKey = this.userDataService.currentUserValue.userKey;
    return this.http.put<Auth>(`${ BASE_URL }${ roomKey }/${ userKey }/${ isObserver }`, httpOptions).pipe(
      map(responseData => {
        const authData = {
          roomKey : responseData.roomKey,
          roomName : responseData.roomName,
          userKey : responseData.userKey,
          userName : responseData.userName,
          observer : responseData.observer
        };
        localStorage.setItem('currentUser', JSON.stringify(authData));
        this.userDataService.setCurrentUserSubject(authData);

        return authData;
      }));
  }

}

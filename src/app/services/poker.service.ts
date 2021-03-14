import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from '../models/user';
import {BehaviorSubject, Observable} from 'rxjs';
import {Auth} from '../models/auth';
import {map} from 'rxjs/operators';
import {Size} from '../models/size';
import {Room} from '../models/room';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

// const BASE_URL = 'http://192.168.0.30:8080/';
const BASE_URL = 'http://localhost:8080/';

@Injectable({
  providedIn: 'root'
})
export class PokerService {
  private currentUserSubject: BehaviorSubject<Auth>;
  public currentUser: Observable<Auth>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<Auth>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): Auth {
    return this.currentUserSubject.value;
  }

  createRoomWithOwner(roomName: string, userName: string): Observable<Auth> {
    const body = {
      roomName,
      userName
    };

    return this.http.post<any>(BASE_URL + 'createRoomWithOwner', body, httpOptions)
      .pipe(map(responseData => {
        const userData = {
          roomKey: responseData.roomKey,
          roomName: responseData.roomName,
          userKey: responseData.userKey,
          userName: responseData.userName
        };
        localStorage.setItem('currentUser', JSON.stringify(userData));
        this.currentUserSubject.next(userData);
        return userData;
      }));
  }

  async getAllUsersInRoom(): Promise<User[]> {
    return await this.http.get<User[]>(`${BASE_URL}${this.currentUserSubject.getValue().roomKey}/users`, httpOptions).toPromise();
  }

  joinRoom(roomKey: string, userName: string): Observable<Auth> {
    return this.http.post<any>(`${BASE_URL}${roomKey}/${userName}`, httpOptions)
      .pipe(map(responseData => {
        const userData = {
          roomKey: responseData.roomKey,
          roomName: responseData.roomName,
          userKey: responseData.userKey,
          userName: responseData.userName
        };
        localStorage.setItem('currentUser', JSON.stringify(userData));
        this.currentUserSubject.next(userData);
        return userData;
      }));
  }

  cleanAnswers(): void {
    this.http.get<any>(`${BASE_URL}${this.currentUserValue.roomKey}/clean`, httpOptions).toPromise();
  }

  leaveRoom(): Observable<any> {
    const body = {
      roomKey: this.currentUserValue.roomKey,
      userKey: this.currentUserValue.userKey
    };

    return this.http.post<any>(`${BASE_URL}leaveRoom`, body, httpOptions).pipe(map(res => {
      if (res.match('OK')) {
        this.logout();
        return true;
      }

      return false;
    }));
  }

  sendAnswer(size: Size): void {
    const body = {
      roomKey: this.currentUserValue.roomKey,
      userKey: this.currentUserValue.userKey,
      size
    };
    this.http.post<any>(`${BASE_URL}answer`, body, httpOptions).toPromise();
  }

  showCards(): void {
    this.http.get<any>(`${BASE_URL}${this.currentUserValue.roomKey}/reveal`, httpOptions).toPromise();
  }

  loginAsAdmin(password: string): Observable<boolean> {
    return this.http.post<any>(`${BASE_URL}login`, {password}, httpOptions);
  }

  getRooms(password: string): Observable<Room[]> {
    return this.http.post<Room[]>(`${BASE_URL}rooms`, {password}, httpOptions);
  }

  deleteRoom(password: string, roomKey: string): Observable<Room[]> {
    return this.http.post<Room[]>(`${BASE_URL}deleteRoom`, {password, roomKey}, httpOptions);
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

}

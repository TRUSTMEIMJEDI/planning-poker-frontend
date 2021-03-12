import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from '../models/user';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {Auth} from '../models/auth';
import {map} from 'rxjs/operators';
import {Size} from '../models/size';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

const BASE_URL = 'http://192.168.0.30:8080/';
// const BASE_URL = 'http://localhost:8080/';

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
    return this.http.post<any>( `${BASE_URL}${roomKey}/${userName}`, httpOptions)
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

  async cleanAnswers(): Promise<any> {
    return await this.http.get<any>(`${BASE_URL}${this.currentUserValue.roomKey}\\clean`, httpOptions).toPromise();
  }

  async sendAnswer(size: Size): Promise<any> {
    const body = {
      roomKey: this.currentUserValue.roomKey,
      userKey: this.currentUserValue.userKey,
      size
    };
    return await this.http.post<any>(`${BASE_URL}answer`, body, httpOptions).toPromise();
  }

  async showCards(): Promise<any> {
    return await this.http.get<any>(`${BASE_URL}${this.currentUserValue.roomKey}\\reveal`, httpOptions).toPromise();
  }

  // getMockData(mockData): Observable<any> {
  //   return of(mockData);
  // }
  //
  // mockCreateRoomWithOwner(roomName: string, userName: string): Observable<Auth> {
  //     return this.getMockData(createRoomWithOwner).pipe(map(responseData => {
  //       const userData = {
  //         roomKey: responseData.roomKey,
  //         roomName: responseData.roomName,
  //         userKey: responseData.userKey,
  //         userName: responseData.userName
  //       };
  //       localStorage.setItem('currentUser', JSON.stringify(userData));
  //       this.currentUserSubject.next(userData);
  //       return userData;
  //     }));
  // }
  //
  // async mockGetAllUsersInRoom(): Promise<User[]> {
  //   return await this.getMockData(getAllUsersInRoom).toPromise();
  // }

  // showCards(): Observable<User[]> {
  //   // return this.http.get<User[]>(`${BASE_URL}${this.currentUserSubject.getValue().roomKey}/users`, httpOptions);
  //   return this.getMockData(showCards);
  // }

  // cleanAnswers(): Observable<User[]> {
  //   // return this.http.get<User[]>(`${BASE_URL}${this.currentUserSubject.getValue().roomKey}/users`, httpOptions);
  //   return this.getMockData(cleanAnswers);
  // }

}

// const createRoomWithOwner = {
//   roomKey: 'BFD43',
//   roomName: 'REFINEMENTO',
//   userKey: 'das678dga8shd8a',
//   userName: 'MFR'
// };
//
// const getAllUsersInRoom =
//   [
//     {
//       name: 'MFR',
//       size: Size.L,
//       point: 0,
//       owner: true,
//       answer: true
//     },
//     {
//       name: 'MHA',
//       size: null,
//       point: 0,
//       owner: false,
//       answer: false
//     },
//     {
//       name: 'MKA',
//       size: null,
//       point: 0,
//       owner: false,
//       answer: false
//     },
//     {
//       name: 'TGA',
//       size: null,
//       point: 0,
//       owner: false,
//       answer: false
//     },
//     {
//       name: 'WST',
//       size: null,
//       point: 0,
//       owner: false,
//       answer: false
//     },
//     {
//       name: 'KCZ',
//       size: null,
//       point: 0,
//       owner: false,
//       answer: true
//     }
//   ];
//
//
// const showCards =
//   [
//     {
//       name: 'MFR',
//       size: Size.L,
//       point: 0,
//       owner: true,
//       answer: true
//     },
//     {
//       name: 'MHA',
//       size: Size.L,
//       point: 0,
//       owner: false,
//       answer: true
//     },
//     {
//       name: 'MKA',
//       size: Size.L,
//       point: 0,
//       owner: false,
//       answer: true
//     },
//     {
//       name: 'TGA',
//       size: Size.L,
//       point: 0,
//       owner: false,
//       answer: true
//     },
//     {
//       name: 'WST',
//       size: Size.L,
//       point: 0,
//       owner: false,
//       answer: true
//     },
//     {
//       name: 'KCZ',
//       size: Size.L,
//       point: 0,
//       owner: false,
//       answer: true
//     }
//   ];
//
// const cleanAnswers =
//   [
//     {
//       name: 'MFR',
//       size: null,
//       point: 0,
//       owner: true,
//       answer: false
//     },
//     {
//       name: 'MHA',
//       size: null,
//       point: 0,
//       owner: false,
//       answer: false
//     },
//     {
//       name: 'MKA',
//       size: null,
//       point: 0,
//       owner: false,
//       answer: false
//     },
//     {
//       name: 'TGA',
//       size: null,
//       point: 0,
//       owner: false,
//       answer: false
//     },
//     {
//       name: 'WST',
//       size: null,
//       point: 0,
//       owner: false,
//       answer: false
//     },
//     {
//       name: 'KCZ',
//       size: null,
//       point: 0,
//       owner: false,
//       answer: false
//     }
//   ];

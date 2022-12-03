import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, throwError, timeout } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  $isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  constructor(private _HttpClient: HttpClient) { 
    if (localStorage.getItem('token')) {
      this.$isLoggedIn.next(true);
    } else {
      this.$isLoggedIn.next(false);
    }
  }

  login(data: { email: string, password: string }) {
    return this._HttpClient.post('http://localhost:3000/login', data).pipe(
      catchError((err) => {
        return throwError(() => new Error(err));
      }),
      timeout(10000)
    );
  }
}

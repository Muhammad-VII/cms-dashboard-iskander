import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  throwError,
  timeout,
  Observable,
  from,
} from 'rxjs';
import jwtDecode from 'jwt-decode';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  $isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  profileInfo: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  get decodedToken(): any {
    if (localStorage.getItem('token')) {
      return jwtDecode(localStorage.getItem('token')!);
    } else {
      return null;
    }
  }

  constructor(private _HttpClient: HttpClient, private _Router: Router) {
    if (localStorage.getItem('token')) {
      this.$isLoggedIn.next(true);
      this._Router.navigate(['/dashboard']);
      this.profileInfo.next(this.decodedToken);
    } else {
      this.$isLoggedIn.next(false);
      this._Router.navigate(['/admin-login']);
      this.profileInfo.next(null);
    }
  }

  login(data: { email: string; password: string }) {
    return this._HttpClient.post('http://localhost:3000/login', data).pipe(
      catchError((err) => {
        return throwError(() => new Error(err));
      }),
      timeout(10000)
    );
  }

  logout() {
    localStorage.removeItem('token');
    this.$isLoggedIn.next(false);
    this._Router.navigate(['/admin-login']);
    this.profileInfo.next(null);
  }
}

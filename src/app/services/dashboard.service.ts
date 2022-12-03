import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private _HttpClient: HttpClient, private _AuthService: AuthService) { }

  getHomePage(): Observable<any> {
    return this._HttpClient.get(`http://localhost:3000/home/getAllSections?limit=10&skip=0`, {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem('token')!}`
      }
    })
  }
}

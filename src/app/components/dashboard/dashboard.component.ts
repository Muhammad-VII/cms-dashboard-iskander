import { AuthService } from './../../services/auth.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  constructor(public _AuthService: AuthService) {}
  lang: string = localStorage.getItem('lang')! ?? 'due';
  isCollapsed: boolean = true;

  changeLanguage(lang?: any): void {
    localStorage.setItem('lang', lang);
    window.location.reload();
  }

  logout(): void {
    this._AuthService.logout();
  }
}

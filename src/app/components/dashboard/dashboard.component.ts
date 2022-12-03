import { AuthService } from './../../services/auth.service';
import { Component } from '@angular/core';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  constructor(public _AuthService: AuthService, private _DashboardService: DashboardService) {}
  isCollapsed: boolean = true;

}

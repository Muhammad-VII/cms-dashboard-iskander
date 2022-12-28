import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { DashboardService } from 'src/app/services/dashboard.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent {
  langs: any;
  constructor(private _DashboardService:DashboardService, private _NgxSpinnerService: NgxSpinnerService, private _ToasterService: ToastrService) {
    this._DashboardService.getLangueges().subscribe((res) => {
      this.langs = res.data;
    })
  }

  publish(obj: any, publishState: boolean): void {
    this._NgxSpinnerService.show();
    this._DashboardService
      .updateLangueges(obj._id, {
        name: obj.name,
        code: obj.code,
        flag: obj.flag,
        hidden: publishState,
      })
      .subscribe({
        next: (res) => {
          this._NgxSpinnerService.hide();
          this.langs = res.data;
          this._ToasterService.success('The section has been updated');
        },
        error: (err) => {
          this._NgxSpinnerService.hide();
          this._ToasterService.error('An error has occured');
        },
      });
  }
}

import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DashboardService } from './../../../services/dashboard.service';
import { AuthService } from './../../../services/auth.service';
import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnDestroy {
  subscribtions: Subscription[] = [];
  switchValue = false;
  loading = false;
  pageData: any;
  editForm:FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required]),
    subTitle: new FormControl(''),
    extraTitle: new FormControl(''),
    description: new FormControl(''),
    image: new FormControl(''),
    media: new FormControl(''),
    hidden: new FormControl(''),
    dir: new FormControl(''),
  })
  constructor(
    private _AuthService: AuthService,
    private _DashboardService: DashboardService,
    private _NgxSpinnerService: NgxSpinnerService,
    private _ToastrService: ToastrService
  ) {
    this.editForm.valueChanges.subscribe(console.log)
    this._NgxSpinnerService.show();
    this.subscribtions.push(
      this._DashboardService.getHomePage().subscribe({
        next: (res) => {
          this._NgxSpinnerService.hide();
          this.pageData = res.data;
          console.log(res.data);
        },
        error: (err) => {
          this._NgxSpinnerService.hide();
          this._ToastrService.error(err.error.message);
        },
      })
    );
  }

  publish(obj: any, publishState: boolean): void {
    this._NgxSpinnerService.show();
    this._DashboardService
      .update(obj._id, {
        title: obj.title,
        subTitle: obj.subTitle,
        extraTitle: obj.extraTitle,
        description: obj.description,
        image: obj.image,
        media: obj.media,
        hidden: publishState,
        dir: obj.dir,
      })
      .subscribe({
        next: (res) => {
          this._NgxSpinnerService.hide();
          this.pageData = res.data;
          this._ToastrService.success('The section has been updated');
        },
        error: (err) => {
          this._NgxSpinnerService.hide();
          this._ToastrService.error('An error has occured');
        }
      });
  }

  patchValuesToEditForm(obj:any){
    this.editForm.patchValue({
      title: obj.title,
      subTitle: obj.subTitle,
      extraTitle: obj.extraTitle,
      description: obj.description,
      image: obj.image,
      media: obj.media,
      hidden: obj.hidden,
      dir: obj.dir,
    })
  }

  ngOnDestroy(): void {
    this.subscribtions.forEach((sub) => {
      sub.unsubscribe();
    });
  }
}

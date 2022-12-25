import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DashboardService } from './../../../services/dashboard.service';
import { AuthService } from './../../../services/auth.service';
import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
declare const $: any;
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
  lang: string = localStorage.getItem('lang')! ?? 'due';
  uploadLoading: boolean = true;
  editForm: FormGroup = new FormGroup({
    _id: new FormControl(''),
    title: new FormControl(''),
    subTitle: new FormControl(''),
    extraTitle: new FormControl(''),
    description: new FormControl(''),
    image: new FormControl(''),
    media: new FormControl(''),
    hidden: new FormControl(''),
    btnHidden: new FormControl(''),
  });

  editMediaForm: FormGroup = new FormGroup({
    title: new FormControl(''),
    subTitle: new FormControl(''),
    image: new FormControl(''),
    description: new FormControl(''),
  });

  constructor(
    private _AuthService: AuthService,
    private _DashboardService: DashboardService,
    private _NgxSpinnerService: NgxSpinnerService,
    private _ToastrService: ToastrService
  ) {
    this.editForm.valueChanges.subscribe(console.log);
    this.editMediaForm.valueChanges.subscribe(console.log);
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
        },
      });
  }

  patchValuesToEditForm(obj: any) {
    this.editForm.patchValue({
      _id: obj._id,
      title: obj.title,
      subTitle: obj.subTitle,
      extraTitle: obj.extraTitle,
      description: obj.description,
      image: obj.image,
      media: obj.media,
      hidden: obj.hidden,
      btnHidden: obj.btnHidden,
    });
  }

  uploadimage(event: any, type: string) {
    this.uploadLoading = false;
    this._DashboardService
      .uploadImage(
        event.target.files[0],
        `images/home/${event.target.files[0].name}`
      )
      .subscribe({
        next: (val) => {
          if (type === 'data') {
            this.editForm.patchValue({
              image: val,
            });
          } else if (type === 'media') {
            this.editMediaForm.patchValue({
              image: val,
            });
          }
          this.uploadLoading = true;
        },
        error: (err) => {
          this.uploadLoading = true;
          this._ToastrService.error(
            'An error has occured while uploading the image'
          );
          console.log(err);
        },
      });
  }

  submitEditForm() {
    this._NgxSpinnerService.show();
    this._DashboardService
      .update(this.editForm.value._id, {
        title: this.editForm.value.title,
        subTitle: this.editForm.value.subTitle,
        extraTitle: this.editForm.value.extraTitle,
        description: this.editForm.value.description,
        image: this.editForm.value.image,
        media: this.editForm.value.media,
        hidden: this.editForm.value.hidden,
        dir: this.editForm.value.dir,
      })
      .subscribe({
        next: (res) => {
          window.location.reload();
          this._NgxSpinnerService.hide();
          this._ToastrService.success('The section has been updated');
          $('#editModal').modal('hide');
        },
        error: (err) => {
          this._NgxSpinnerService.hide();
          this._ToastrService.error('An error has occured');
        },
      });
  }

  deleteImageFromMedia(index: number) {
    this._NgxSpinnerService.show();
    const mediaArray = this.editForm.value.media;
    mediaArray.splice(index, 1);
    this._DashboardService
      .update(this.editForm.value._id, {
        title: this.editForm.value.title,
        subTitle: this.editForm.value.subTitle,
        extraTitle: this.editForm.value.extraTitle,
        description: this.editForm.value.description,
        image: this.editForm.value.image,
        media: mediaArray,
        hidden: this.editForm.value.hidden,
        dir: this.editForm.value.dir,
      })
      .subscribe({
        next: (res) => {
          this._NgxSpinnerService.hide();
          this._ToastrService.success('The section has been updated');
          window.location.reload();
        },
      });
  }

  uploadMedia(event: any, index: number) {
    this._DashboardService
      .uploadImage(
        event.target.files[0],
        `images/home/${event.target.files[0].name}`
      )
      .subscribe({
        next: (val) => {
          this._NgxSpinnerService.show();
          const mediaArray: any[] = this.editForm.value.media;
          //TODO OPENS MODEL TO EDIT TEXT AS WELL AS IMAGE
          this._DashboardService
            .update(this.editForm.value._id, {
              title: this.editForm.value.title,
              subTitle: this.editForm.value.subTitle,
              extraTitle: this.editForm.value.extraTitle,
              description: this.editForm.value.description,
              image: this.editForm.value.image,
              media: mediaArray,
              hidden: this.editForm.value.hidden,
              dir: this.editForm.value.dir,
            })
            .subscribe({
              next: (res) => {
                this._NgxSpinnerService.hide();
                this._ToastrService.success('The section has been updated');
                window.location.reload();
              },
            });
        },
        error: (err) => {
          console.log(err);
        },
      });
  }
  mediaIndex: number = 0;
  editMedia(obj: any, index: number) {
    this.editMediaForm.patchValue({
      title: obj.title,
      subTitle: obj.subTitle,
      description: obj.description,
      image: obj.image,
    });
    this.mediaIndex = index;
  }

  submitEditMedia() {
    let mediaArray: any[] = this.editForm.value.media;
    mediaArray[this.mediaIndex] = this.editMediaForm.value;
    console.log(mediaArray);
    this._NgxSpinnerService.show();
    this._DashboardService
      .update(this.editForm.value._id, {
        title: this.editForm.value.title,
        subTitle: this.editForm.value.subTitle,
        extraTitle: this.editForm.value.extraTitle,
        description: this.editForm.value.description,
        image: this.editForm.value.image,
        media: mediaArray,
        hidden: this.editForm.value.hidden,
        btnHidden: this.editForm.value.dir,
      })
      .subscribe({
        next: (res) => {
          this._NgxSpinnerService.hide();
          this._ToastrService.success('The section has been updated');
          window.location.reload();
        },
        error: (err) => {
          this._NgxSpinnerService.hide();
          this._ToastrService.error('An error has occured');
        }
      });
  }

  ngOnDestroy(): void {
    this.subscribtions.forEach((sub) => {
      sub.unsubscribe();
    });
  }
}

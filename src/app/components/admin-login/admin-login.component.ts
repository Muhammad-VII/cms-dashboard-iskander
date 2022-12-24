import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss'],
})
export class AdminLoginComponent {
  constructor(
    private _AuthService: AuthService,
    private _NgxSpinnerService: NgxSpinnerService,
    private _ToastrService: ToastrService,
    private _Router: Router
  ) {}

  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [
      Validators.required,
      Validators.min(6),
      Validators.max(50),
    ]),
  });

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  getErrorMessage() {
    if (this.loginForm.controls['email'].hasError('required')) {
      return 'You must enter a value';
    }

    return this.loginForm.controls['email'].hasError('email')
      ? 'Not a valid email'
      : '';
  }

  getPassErrorMessage() {
    if (this.loginForm.controls['password'].hasError('required')) {
      return 'You must enter a value';
    }

    return this.loginForm.controls['password'].hasError('password')
      ? 'Not a valid password'
      : '';
  }

  submitLoginForm() {
    if (this.loginForm.valid) {
      this._NgxSpinnerService.show();
      this._AuthService.login(this.loginForm.value).subscribe({
        next: (res:any) => {
          this._NgxSpinnerService.hide();
          if (res.data.status === 401) {
            this._ToastrService.error(res.data.message, 'Error');
          } else {
            this._ToastrService.success(res.data.message, 'Success');
            localStorage.setItem('token', res.data.access_token);
            this._AuthService.$isLoggedIn.next(true);
            this._Router.navigate(['/dashboard']);
          }
        },
        error: (err) => {
          this._NgxSpinnerService.hide();
          this._ToastrService.error('Something went wrong', 'Error');
        },
      });
    } else {
      this._ToastrService.warning('Please enter the correct data', 'Error');
    }
  }
}

import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  ref,
  uploadBytes,
  getDownloadURL,
  Storage,
} from '@angular/fire/storage';
import { Observable, from, switchMap, catchError } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  lang: string = localStorage.getItem('lang')! ?? 'due';
  constructor(
    private _HttpClient: HttpClient,
    private _AuthService: AuthService,
    private storage: Storage
  ) {
    if (this.lang == 'ar') {
      document.dir = 'rtl';
    } else if (this.lang == 'en') {
      document.dir = 'ltr';
    } else {
      document.dir = 'ltr';
    }
  }

  getHomePage(): Observable<any> {
    return this._HttpClient
      .get(
        `https://ng-cms-dashboard.herokuapp.com/home/getAllSections-${this.lang}?limit=10&skip=0`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')!}`,
          },
        }
      )
      .pipe(
        catchError((results: any) => {
          if (results.error.statusCode == 401) {
            localStorage.removeItem('token');
            this._AuthService.$isLoggedIn.next(false);
            this._AuthService.profileInfo.next(null);
            window.location.reload();
          } else {
            return results;
          }
        })
      );
  }

  getWasWirSindPage(): Observable<any> {
    return this._HttpClient
      .get(
        `https://ng-cms-dashboard.herokuapp.com/war-wir-sind/getAllSections-${this.lang}?limit=10&skip=0`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')!}`,
          },
        }
      )
      .pipe(
        catchError((results: any) => {
          if (results.error.statusCode == 401) {
            localStorage.removeItem('token');
            this._AuthService.$isLoggedIn.next(false);
            this._AuthService.profileInfo.next(null);
            window.location.reload();
          } else {
            return results;
          }
        })
      );
  }

  getWasWirTunPage(): Observable<any> {
    return this._HttpClient
      .get(
        `https://ng-cms-dashboard.herokuapp.com/war-wir-tun/getAllSections-${this.lang}?limit=10&skip=0`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')!}`,
          },
        }
      )
      .pipe(
        catchError((results: any) => {
          if (results.error.statusCode == 401) {
            localStorage.removeItem('token');
            this._AuthService.$isLoggedIn.next(false);
            this._AuthService.profileInfo.next(null);
            window.location.reload();
          } else {
            return results;
          }
        })
      );
  }

  update(id: string, data: any): Observable<any> {
    return this._HttpClient.patch(
      `https://ng-cms-dashboard.herokuapp.com/home/updateSectionById-${this.lang}/${id}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')!}`,
        },
      }
    );
  }

  updateWasWirSind(id: string, data: any): Observable<any> {
    return this._HttpClient.patch(
      `https://ng-cms-dashboard.herokuapp.com/war-wir-sind/updateSectionById-${this.lang}/${id}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')!}`,
        },
      }
    );
  }

  updateWasWirTun(id: string, data: any): Observable<any> {
    return this._HttpClient.patch(
      `https://ng-cms-dashboard.herokuapp.com/war-wir-tun/updateSectionById-${this.lang}/${id}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')!}`,
        },
      }
    );
  }

  uploadImage(image: File, path: string): Observable<string> {
    const storageRef = ref(this.storage, path);
    const uploadTask = from(uploadBytes(storageRef, image));
    return uploadTask.pipe(switchMap((result) => getDownloadURL(result.ref)));
  }

  getContactMessages(): Observable<any> {
    return this._HttpClient.get(
      `https://ng-cms-dashboard.herokuapp.com/contact/getAllMessages`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')!}`,
        },
      }
    );
  }

  deleteAllMessages(): Observable<any> {
    return this._HttpClient.delete(
      `https://ng-cms-dashboard.herokuapp.com/contact/deleteAllMessages`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')!}`,
        },
      }
    );
  }

  deleteMessage(id: string): Observable<any> {
    return this._HttpClient.delete(
      `https://ng-cms-dashboard.herokuapp.com/contact/deleteMessage?id=${id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')!}`,
        },
      }
    );
  }

  getContactPage(): Observable<any> {
    return this._HttpClient.get(
      `https://ng-cms-dashboard.herokuapp.com/contact-page/getAllSections-${this.lang}?limit=10&skip=0`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')!}`,
        },
      }
    );
  }

  updateContactPage(id: string, data: any): Observable<any> {
    return this._HttpClient.patch(
      `https://ng-cms-dashboard.herokuapp.com/contact-page/updateSectionById-${this.lang}/${id}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')!}`,
        },
      }
    );
  }
}

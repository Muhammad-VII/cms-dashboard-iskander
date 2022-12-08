import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ref, uploadBytes, getDownloadURL, Storage } from '@angular/fire/storage';
import { Observable, from, switchMap } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  constructor(
    private _HttpClient: HttpClient,
    private _AuthService: AuthService,
    private storage: Storage
  ) {}

  getHomePage(): Observable<any> {
    return this._HttpClient.get(
      `http://localhost:3000/home/getAllSections?limit=10&skip=0`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')!}`,
        },
      }
    );
  }

  update(id: string, data: any): Observable<any> {
    return this._HttpClient.patch(
      `http://localhost:3000/home/updateSectionById/${id}`,
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
    
}

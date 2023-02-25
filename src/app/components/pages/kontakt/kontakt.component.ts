import { Subscription, Observable, map } from 'rxjs';
import { DashboardService } from 'src/app/services/dashboard.service';
import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-kontakt',
  templateUrl: './kontakt.component.html',
  styleUrls: ['./kontakt.component.scss'],
})
export class KontaktComponent implements OnDestroy {
  constructor(private _DashboardService: DashboardService) {
    
  }

  subscribtions: Subscription[] = [];
  // messages$: Observable<any> = this._DashboardService.getContactMessages().pipe(
  //   map((results: any) => {
  //     return results.data;
  //   })
  // );

  // deleteAllMessages(): void {
  //   this.subscribtions.push(
  //     this._DashboardService.deleteAllMessages().subscribe((results: any) => {
  //       if (results.message == 'All messages deleted successfully') {
  //         this.messages$ = this._DashboardService.getContactMessages().pipe(
  //           map((results: any) => {
  //             return results.data;
  //           })
  //         );
  //       }
  //     })
  //   );
  // }

  // deleteMessage(id: string): void {
  //   this.subscribtions.push(
  //     this._DashboardService.deleteMessage(id).subscribe((results: any) => {
  //       if (results.message == 'success') {
  //         this.messages$ = this._DashboardService.getContactMessages().pipe(
  //           map((results: any) => {
  //             return results.data;
  //           })
  //         );
  //       }
  //     })
  //   );
  // }

  ngOnDestroy(): void {
    this.subscribtions.forEach((sub) => sub.unsubscribe());
  }
}

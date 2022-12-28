import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ToastrModule } from 'ngx-toastr';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { HomeComponent } from './components/pages/home/home.component';
import { WasWirSindComponent } from './components/pages/was-wir-sind/was-wir-sind.component';
import { WasWirTunComponent } from './components/pages/was-wir-tun/was-wir-tun.component';
import { KontaktComponent } from './components/pages/kontakt/kontakt.component';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { IconsProviderModule } from './icons-provider.module';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideStorage, getStorage } from '@angular/fire/storage';
import { ContactPageComponent } from './components/pages/contact-page/contact-page.component';
import { WrapTextPipe } from './pipes/wrap-text.pipe';
import { SettingsComponent } from './components/pages/settings/settings.component';
@NgModule({
  declarations: [
    AppComponent,
    AdminLoginComponent,
    DashboardComponent,
    NotFoundComponent,
    HomeComponent,
    WasWirSindComponent,
    WasWirTunComponent,
    KontaktComponent,
    ContactPageComponent,
    WrapTextPipe,
    SettingsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    HttpClientModule,
    MatCheckboxModule,
    NgxSpinnerModule,
    ToastrModule.forRoot(),
    NzLayoutModule,
    NzMenuModule,
    NzSwitchModule,
    IconsProviderModule,
    provideFirebaseApp(() =>
      initializeApp({
        apiKey: "AIzaSyAGaI-Gp12knpehMQ2wGARTR2ILCOGYokw",
        authDomain: "cms-dashboard-34e75.firebaseapp.com",
        projectId: "cms-dashboard-34e75",
        storageBucket: "cms-dashboard-34e75.appspot.com",
        messagingSenderId: "343984265053",
        appId: "1:343984265053:web:f799aeae3181b189ab3ab4"
      })
    ),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

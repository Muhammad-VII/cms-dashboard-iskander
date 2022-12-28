import { SettingsComponent } from './components/pages/settings/settings.component';
import { ContactPageComponent } from './components/pages/contact-page/contact-page.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuard } from './guards/auth.guard';
import { HomeComponent } from './components/pages/home/home.component';
import { KontaktComponent } from './components/pages/kontakt/kontakt.component';
import { WasWirSindComponent } from './components/pages/was-wir-sind/was-wir-sind.component';
import { WasWirTunComponent } from './components/pages/was-wir-tun/was-wir-tun.component';

const routes: Routes = [
  { path: '', redirectTo: '/admin-login', pathMatch: 'full' },
  { path: 'admin-login', component: AdminLoginComponent },
  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    component: DashboardComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'was-wir-sind', component: WasWirSindComponent },
      { path: 'was-wir-tun', component: WasWirTunComponent },
      { path: 'kontakt', component: KontaktComponent },
      { path: 'contact-page', component: ContactPageComponent},
      { path: 'settings', component: SettingsComponent},
    ],
  },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    useHash: true,
  })],
  exports: [RouterModule],
})
export class AppRoutingModule {}

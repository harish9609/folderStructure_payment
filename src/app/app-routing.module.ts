
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './Layout/dashboard/dashboard.component';
import { LoginComponent } from './Layout/login/login.component';

import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { SettingComponent } from './setting/setting.component';
import { ProfileComponent } from './Layout/profile/profile.component';
import { GameComponent } from './Layout/game/game.component';
import { PaymentComponent } from './feature/Payments/payment/payment.component';

const routes: Routes = [
  {
    path: 'feature',
    loadChildren: () =>
      import('./feature/feature.module').then(m => m.FeatureModule)
  },
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      // You can replace this with ProfileComponent later
      { path: 'profile', component: ProfileComponent },
      { path: 'setting', component: SettingComponent },
      { path: 'game', component: GameComponent },
      { path: 'payment', component: PaymentComponent },
      { path: 'login', component: LoginComponent },
    ]
  },
  { path: 'feature', loadChildren: () => import('./feature/feature.module').then(m => m.FeatureModule) },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

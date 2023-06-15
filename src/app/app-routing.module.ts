import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: '404', component: NotFoundComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'dashboard',
    loadChildren: () => import("./dashboard/dashboard.module")
      .then(m => m.DashboardModule)
  },
  { path: '**', pathMatch: 'full', redirectTo: '/404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

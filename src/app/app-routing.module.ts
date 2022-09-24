import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './services/auth-guard.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'sign-up',
    pathMatch: 'full'
  }, {
    path: 'sign-up',
    loadChildren: () => import('./modules/sign-up/sign-up.module').then(m => m.SignUpModule),
  }, {
    path: 'login',
    loadChildren: () => import('./modules/login/login.module').then(m => m.LoginModule),
  }, {
    path: 'category',
    loadChildren: () => import('./modules/category/category.module').then(m => m.CategoryModule),
    canActivate: [AuthGuard]
  }, {
    path: 'content/:id',
    loadChildren: () => import('./modules/content/content.module').then(m => m.ContentModule),
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

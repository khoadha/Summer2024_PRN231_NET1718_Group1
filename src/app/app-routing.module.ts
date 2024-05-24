import { NgModule } from '@angular/core';
import {
  adminGuard,
  authGuard,
  signedInGuard,
} from './core/guards/auth.guard';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomePageComponent,
    title:
      'Hosteland System',
  },
  {
    path: 'sign-in',
    component: SignInComponent,
    title: 'Sign in',
    canActivate: [signedInGuard],
  },
  {
    path: 'sign-up',
    component: SignUpComponent,
    title: 'Sign up',
    canActivate: [signedInGuard],
  },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

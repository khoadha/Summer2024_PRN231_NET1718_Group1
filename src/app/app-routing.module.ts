import { ConfirmEmailSuccessComponent } from './pages/confirm-email-success/confirm-email-success.component';
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
import { CheckEmailComponent } from './pages/check-email/check-email.component';
import { ConfirmEmailComponent } from './pages/confirm-email/confirm-email.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { ResetPasswordSuccessComponent } from './pages/reset-password-success/reset-password-success.component';
import { TermOfUseComponent } from './pages/term-of-use/term-of-use.component';
import { BookRoomComponent } from './pages/book-room/book-room.component';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
import { AdminRoomCategoryComponent } from './pages/admin-dashboard/admin-room-category/admin-room-category.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { AdminFurnitureComponent } from './pages/admin-dashboard/admin-furniture/admin-furniture.component';
import { AdminServiceComponent } from './pages/admin-dashboard/admin-service/admin-service.component';
import { AdminRoomComponent } from './pages/admin-dashboard/admin-room/admin-room.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomePageComponent,
    title:
      'Hosteland',
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
  {
    path: 'check-email',
    component: CheckEmailComponent,
    title: 'Check Email',
    canActivate: [signedInGuard],
  },
  {
    path: 'confirm-email',
    component: ConfirmEmailComponent,
    title: 'Confirm Email',
    canActivate: [signedInGuard],
  },
  {
    path: 'confirm-email-success',
    component: ConfirmEmailSuccessComponent,
    title: 'Confirm Email Success',
    canActivate: [signedInGuard],
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent,
    title: 'Forgot Password',
    canActivate: [signedInGuard],
  },
  {
    path: 'reset-password-success',
    component: ResetPasswordSuccessComponent,
    title: 'Reset Password Success',
    canActivate: [signedInGuard],
  },
  {
    path: 'reset-password',
    component: ResetPasswordComponent,
    title: 'Reset Password',
    canActivate: [signedInGuard],
  },
  {
    path: 'term-of-use',
    component: TermOfUseComponent,
    title: 'Term of use',
    canActivate: [signedInGuard],
  },
  {
    path: 'page-not-found',
    component: PageNotFoundComponent,
    title: 'Page Not Found',
    canActivate: [signedInGuard],
  },
  {
    path: 'book-room/:id',
    component: BookRoomComponent,
    title: 'Book Room',
  },
  {
    path: 'manage-profile',
    component: ProfileComponent,
    title: 'Manage Profile',
  },
  //DEBUG
  {
    path: 'manage-category',
    component: AdminRoomCategoryComponent,
    title: 'Manage Category',
    //canActivate: [adminGuard],
  },
  {
    path: 'manage-furniture',
    component: AdminFurnitureComponent,
    title: 'Manage Furniture',
    //canActivate: [adminGuard],
  },
  {
    path: 'manage-service',
    component: AdminServiceComponent,
    title: 'Manage Service',
  },
  {
    path: 'manage-room',
    component: AdminRoomComponent,
    title: 'Manage Room',
  },
  {
    path: 'adashboard',
    component: AdminDashboardComponent,
    canActivate: [adminGuard],
    children: [
      { path: 'home', component: HomePageComponent, canActivate: [adminGuard] },
      {
        path: 'manage-category',
        component: AdminRoomCategoryComponent,
        title: 'Manage Category',
        canActivate: [adminGuard],
      },
      {
        path: 'manage-furniture',
        component: AdminFurnitureComponent,
        title: 'Manage Furniture',
        canActivate: [adminGuard],
      },
      {
        path: 'manage-service',
        component: AdminServiceComponent,
        title: 'Manage Service',
        canActivate: [adminGuard],
      },
      {
        path: 'manage-room',
        component: AdminRoomComponent,
        title: 'Manage Room',
        canActivate: [adminGuard],
      },
      // {
      //   path: 'manage-category',
      //   component: ManageCategoriesComponent,
      //   canActivate: [adminGuard],
      // },
    ],
  },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

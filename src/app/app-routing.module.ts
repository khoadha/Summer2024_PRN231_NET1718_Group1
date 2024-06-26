import { ConfirmEmailSuccessComponent } from './pages/confirm-email-success/confirm-email-success.component';
import { NgModule } from '@angular/core';
import {
  adminGuard,
  authGuard,
  signedInGuard,
  userGuard,
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
import { AdminHomeComponent } from './pages/admin-dashboard/admin-home/admin-home.component';
import { AdminOrderComponent } from './pages/admin-dashboard/admin-order/admin-order.component';

import { RoomPageComponent } from './pages/room-page/room-page.component';
import { RoomDetailComponent } from './pages/room-detail/room-detail.component';
import { ManageOrderComponent } from './pages/manage-order/manage-order.component';
import { OrderDetailComponent } from './pages/order-detail/order-detail.component';
import { AdminTransactionComponent } from './pages/admin-dashboard/admin-transaction/admin-transaction.component';
import { FeeDetailComponent } from './pages/fee-detail/fee-detail.component';
import { PaymentSuccessComponent } from './pages/payment-success/payment-success.component';
import { PaymentRedirectComponent } from './features/payment-redirect/payment-redirect.component';
import { BookRoomMonthlyComponent } from './pages/book-room-monthly/book-room-monthly.component';
const routes: Routes = [
  {
    path: 'home',
    component: HomePageComponent,
    title: 'Hosteland',
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
    path: 'room-detail/:id',
    component: RoomDetailComponent,
    title: 'Room Detail',
  },
  {
    path: 'order-detail/:id',
    component: OrderDetailComponent,
    title: 'Order Detail',
  },
  {
    path: 'fee-detail/:id',
    component: FeeDetailComponent,
    title: 'Fee Detail',
  },
  {
    path: 'book-room/:id',
    component: BookRoomComponent,
    title: 'Book Room',
    canActivate: [userGuard],
  },
  {
    path: 'book-room-monthly/:id',
    component: BookRoomMonthlyComponent,
    title: 'Book Room Monthly',
    canActivate: [userGuard],
  },
  {
    path: 'all-room',
    component: RoomPageComponent,
    title: 'All Rooms',
  },
  {
    path: 'manage-profile',
    component: ProfileComponent,
    title: 'Manage Profile',
    canActivate: [authGuard],
  },
  {
    path: 'manage-user-order',
    component: ManageOrderComponent,
    title: 'Manage Order',
    canActivate: [authGuard],
  },
  {
    path: 'payment-success',
    component: PaymentSuccessComponent,
    title: 'Payment Success',
    canActivate: [authGuard],
  },
  {
    path: 'pcb',
    component: PaymentRedirectComponent,
    canActivate: [authGuard],
  },
  {
    path: 'adashboard',
    component: AdminDashboardComponent,
    canActivate: [adminGuard],
    children: [
      { path: '', component: AdminHomeComponent, canActivate: [adminGuard] },
      {
        path: 'manage-room-category',
        component: AdminRoomCategoryComponent,
        title: 'Manage Category',
        canActivate: [adminGuard],
      },
      {
        path: 'manage-transaction',
        component: AdminTransactionComponent,
        title: 'Manage Transaction',
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
        path: 'manage-order',
        component: AdminOrderComponent,
        title: 'Manage Order',
        canActivate: [adminGuard],
      },
      {
        path: 'manage-room',
        component: AdminRoomComponent,
        title: 'Manage Room',
        canActivate: [adminGuard],
      },
    ],
  },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { ScrollTopModule } from 'primeng/scrolltop';
import { DialogModule } from 'primeng/dialog';
import { TokenInterceptor } from './core/interceptors/token.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VndCurrencyPipePipe } from './core/pipes/vnd-currency-pipe.pipe';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { HeaderComponent } from './features/header/header.component';
import { FooterComponent } from './features/footer/footer.component';
import { CheckboxModule } from 'primeng/checkbox';
import { LoaderComponent } from './shared/loader/loader.component';
import { ConfirmDialogComponent } from './shared/confirm-dialog/confirm-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DividerModule } from 'primeng/divider';
import { CarouselModule } from 'primeng/carousel';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { ResetPasswordSuccessComponent } from './pages/reset-password-success/reset-password-success.component';
import { CheckEmailComponent } from './pages/check-email/check-email.component';
import { ConfirmEmailComponent } from './pages/confirm-email/confirm-email.component';
import { ConfirmEmailSuccessComponent } from './pages/confirm-email-success/confirm-email-success.component';
import { BreadcrumbComponent } from './features/breadcrumb/breadcrumb.component';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { IntroCarouselComponent } from './features/intro-carousel/intro-carousel.component';
import { TermOfUseComponent } from './pages/term-of-use/term-of-use.component';
import { CardModule } from 'primeng/card';
import { FileUploadModule } from 'primeng/fileupload';
import { BadgeModule } from 'primeng/badge';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { PasswordModule } from 'primeng/password';
import { FormsModule } from '@angular/forms';
import { BookRoomComponent } from './pages/book-room/book-room.component';
import { ServiceSectionComponent } from './features/service-section/service-section.component';
import { ListRoomComponent } from './features/list-room/list-room.component';
import { TestimonialComponent } from './features/testimonial/testimonial.component';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
import { SidebarModule } from 'primeng/sidebar';
import { AvatarModule } from 'primeng/avatar';
import { StyleClassModule } from 'primeng/styleclass';
import { DropdownModule } from 'primeng/dropdown';
import { ProfileComponent } from './pages/profile/profile.component';
import { TabViewModule } from 'primeng/tabview';
import { DialogModule } from 'primeng/dialog';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ToastModule,
    ButtonModule,
    RippleModule,
    DialogModule,
    ScrollTopModule,
    CheckboxModule,
    ReactiveFormsModule,
    DividerModule,
    CarouselModule,
    BreadcrumbModule,
    CardModule,
    BadgeModule,
    FileUploadModule,
    InputGroupAddonModule,
    InputGroupModule,
    PasswordModule,
    FormsModule,
    StyleClassModule,
    AvatarModule,
    SidebarModule,
    DropdownModule,
    TabViewModule,
    DialogModule,
  ],
  declarations: [
    AppComponent,
    VndCurrencyPipePipe,
    SignInComponent,
    SignUpComponent,
    HomePageComponent,
    PageNotFoundComponent,
    HeaderComponent,
    FooterComponent,
    LoaderComponent,
    ConfirmDialogComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    ResetPasswordSuccessComponent,
    CheckEmailComponent,
    ConfirmEmailComponent,
    ConfirmEmailSuccessComponent,
    BreadcrumbComponent,
    IntroCarouselComponent,
    TermOfUseComponent,
    BookRoomComponent,
    ServiceSectionComponent,
    ListRoomComponent,
    TestimonialComponent,
    AdminDashboardComponent,
    ProfileComponent
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
    MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

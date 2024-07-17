import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenApiModel } from 'src/app/core/models/token-api.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { UserStoreService } from 'src/app/core/services/user-store.service';
import { CredentialResponse, PromptMomentNotification } from 'google-one-tap';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit{
  
  isLoading: boolean = false;
  signInForm!: FormGroup;
  redirectUrl!: string;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private userStore: UserStoreService,
    private messageService: MessageService) { }


  ngOnInit(): void {
    this.isLoading = true;
    this.route.queryParams.subscribe(params => {
      this.redirectUrl = params['redirectUrl'];
    })
    this.auth.getSecureClientId().subscribe(client_id => {
      // @ts-ignore
      google.accounts.id.initialize({
        client_id: atob(client_id),
        callback: this.handleCredentialResponse.bind(this),
        auto_select: false,
        cancel_on_tap_outside: true,
      });
      // @ts-ignore
      google.accounts.id.renderButton(
        // @ts-ignore
        document.getElementById("google-button"),
        { theme: "outline", size: "large" }
      );
      // @ts-ignore
      google.accounts.id.prompt((notification: PromptMomentNotification) => { });
    });

    this.signInForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
    this.isLoading =false;
  }

  isFieldInvalid(field: string): boolean | null {
    const control = this.signInForm.get(field);
    return control && control.invalid && (control.dirty || control.touched);
  }

  onSignIn() {
    if (this.signInForm.valid) {
      this.isLoading = true;
      this.auth.login(this.signInForm.value)
        .subscribe({
          next: (res) => {
            this.signInForm.reset();
            this.storeUserInformation(res);
            if (this.redirectUrl) {
              this.router.navigate([this.redirectUrl])
                .then(() => {
                  window.location.reload();
                });
            } else {
              this.router.navigate(['home']).then(() => {
                window.location.reload();
              });
            }
          },
          error: (err) => {
            this.isLoading = false;
            this.showErrorMessage(err);   
          }
        })
    } else {
      this.isLoading = false;
    }
  }

  showErrorMessage(err: any) {
    if (err && err.error && err.error.errors && err.error.errors.length > 0) {
      const errorMessage = err.error.errors.join(', ');
      this.messageService.add({ severity: 'error', summary: 'Login Error', detail: errorMessage });
    }
  }

  handleCredentialResponse(response: CredentialResponse) {
    this.isLoading = true;
    this.auth.loginWithGoogle(response.credential).subscribe({
      next: (res) => {
        this.storeUserInformation(res);
        if (this.redirectUrl) {
          this.router.navigate([this.redirectUrl])
            .then(() => {
              window.location.reload();
            });
        } else {
          this.router.navigate(['home'])
          .then(() => {
            window.location.reload();
          });
        }
      },
      error: (err) => {
        this.isLoading = false;
        this.messageService.add({ severity: 'error', summary: 'Error', detail: err?.error.message });     
      }
    })
  }

  storeUserInformation(res: TokenApiModel) {
    this.auth.storeToken(res.accessToken);
    this.auth.storeRefreshToken(res.refreshToken);
    let tokenPayload = this.auth.decodeToken();
    this.userStore.setUsernameForStore(tokenPayload.name);
    this.userStore.setUserIdForStore(tokenPayload.Id);
    this.userStore.setRoleForStore(tokenPayload.role);
    this.userStore.setEmailForStore(tokenPayload.email);
    this.userStore.setImgPathForStore(tokenPayload.ImgPath);
  }
}

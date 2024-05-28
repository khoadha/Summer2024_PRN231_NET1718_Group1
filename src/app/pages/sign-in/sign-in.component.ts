import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TokenApiModel } from 'src/app/core/models/token-api.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { UserStoreService } from 'src/app/core/services/user-store.service';
import { CredentialResponse, PromptMomentNotification } from 'google-one-tap';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit{
  
  isLoading: boolean = false;
  signInForm!: FormGroup;
  pwdHide = true;

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router, private userStore: UserStoreService) { }


  ngOnInit(): void {
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
  }

  onSignIn() {
    if (this.signInForm.valid) {
      this.isLoading = true;
      this.auth.login(this.signInForm.value)
        .subscribe({
          next: (res) => {
            this.signInForm.reset();
            this.storeUserInformation(res);
            this.router.navigate(['home'])
            window.location.reload();
          },
          error: (err) => {
            this.isLoading = false;
          }
        })
    } else {
      this.isLoading = false;
    }
  }

  handleCredentialResponse(response: CredentialResponse) {
    this.auth.loginWithGoogle(response.credential).subscribe({
      next: (res) => {
        this.storeUserInformation(res);
        window.location.reload();
      },
      error: (err) => {
        this.isLoading = false;
        alert(err?.error.message);
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
    this.userStore.setPhoneNumberForStore(tokenPayload.PhoneNumber);
    this.userStore.setImgPathForStore(tokenPayload.ImgPath);
  }
}

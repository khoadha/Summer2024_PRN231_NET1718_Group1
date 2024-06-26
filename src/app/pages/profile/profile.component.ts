import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';
import { Profile, UpdateUsernameDto, UpdatePasswordDto } from 'src/app/core/models/profile';
import { PaymentTransaction } from 'src/app/core/models/transaction';
import { AuthService } from 'src/app/core/services/auth.service';
import { PaymentService } from 'src/app/core/services/payment.service';
import { ProfileService } from 'src/app/core/services/profile.service';
import { UserStoreService } from 'src/app/core/services/user-store.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{
  // component
  profile!: Profile;
  loginMethod: string | null = null;
  breadcrumbItems: MenuItem[] | undefined;
  isLoading: boolean = false;
  transactions!: PaymentTransaction[];
  // form
  updatePasswordForm!: FormGroup; 

  // dialog visisbility
  updateUserNameVisible: boolean = false;
  updatePasswordVisible: boolean = false;
  updateAvatarVisible: boolean = false;

  // model
  newUsername: string ='';
  newPassword: string='';
  isImageSelected: boolean = false;
  selectedImageFile: File | null = null;
  imagePreviewUrl: string | ArrayBuffer | null = null;

  // validate model
  userNameError: boolean = false;
  phoneNumberError: boolean = false;
  passwordError: boolean = false;
  passwordCriteria = {
    lowercase: false,
    uppercase: false,
    number: false,
    specialChar: false,
    minLength: false
  };

  constructor(
    private authService: AuthService,
    private userService: ProfileService,
    private messageService: MessageService,
    private paymentService: PaymentService,
    private fb: FormBuilder,
    private userStore: UserStoreService) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.breadcrumbItems = [{ label: 'Profile' }];
    const role = this.authService.getRoleFromToken();
    const userId = this.authService.getUserIdFromToken();
    
    this.userService.getProfileByUserId(userId).subscribe(res => {
      this.profile = res;
    });
    this.paymentService.getTransactionByUserId(userId).subscribe(res => {
      this.transactions = res;
    })
    this.userService.checkLoginMethod(userId).subscribe(res => {
      this.loginMethod = res.loginMethod;
    }, error => {
      console.error('Error checking login method', error);
    });

    this.updatePasswordForm = this.fb.group({
      oldPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required, this.passwordValidator]],
      confirmedPassword: ['', Validators.required],
    }, { validator: this.passwordMatchValidator });   

    this.isLoading = false;

  }

  // dialog visibility
  openUserNameDialog() {
    this.updateUserNameVisible = true;
  }

  openPasswordDialog() {
    this.updatePasswordVisible = true;
  }

  openAvatarDialog() {
    this.updateAvatarVisible = true;
  }

  // Username update
  updateUsername() {
    const control = { value: this.newUsername } as AbstractControl;
    const validationErrors = this.userNameValidator(control);
    const usernameError = validationErrors ? validationErrors['invalidUserName'] : false;
  
    if (usernameError) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Invalid username' });
      return;
    }

    this.isLoading = true;  
    const model: UpdateUsernameDto = { username: this.newUsername };
    this.userService.updateUserName(this.profile.id, model).subscribe(
      response => {  
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Username updated Successfully' });
        this.updateUserNameVisible = false; 
        this.userService.getProfileByUserId(this.profile.id).subscribe(res => {
          this.profile = res;
          this.storeUserInformation(res);
        });
        this.newUsername='';
      },
      error => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Username update failed' });
      }
    );
    this.isLoading = false;  
  }

  userNameValidator(control: AbstractControl): ValidationErrors | null {
    const userName = control.value;

    if (!/^[a-z0-9]{8,14}$/.test(userName)) {
      return { invalidUserName: true };
    }

    return null;
  }

  validateUsername() {
    const control = { value: this.newUsername } as AbstractControl;
    const validationErrors = this.userNameValidator(control);
    this.userNameError = validationErrors ? validationErrors['invalidUserName'] : false;
  }

  // Password update
  updatePassword() {
    if(this.updatePasswordForm.invalid){
      return;
    }

    this.isLoading = true;  
    const oldPassword = this.updatePasswordForm.get('oldPassword')!.value;
    const newPassword = this.updatePasswordForm.get('newPassword')!.value;

    const model: UpdatePasswordDto = {
        newpassword: newPassword,
        currentpassword: oldPassword
    };
    this.userService.updatePassword(this.profile.id, model).subscribe(
      response => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Password updated Success' });
        this.updatePasswordVisible = false; 
        this.userService.getProfileByUserId(this.profile.id).subscribe(res => {
          this.profile = res;
        });
        this.updatePasswordForm.reset();
      },
      error => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Password update failed' });
      }
    );
    this.isLoading = false;  
  }

  passwordMatchValidator(control: AbstractControl) {
    const password = control.get('newPassword')!.value;
    const confirmedPassword = control.get('confirmedPassword')!.value;
    if (password !== confirmedPassword) {
      control.get('confirmedPassword')!.setErrors({ passwordMatch: true });
      return true;
    } else {
      return null;
    }
  }

  passwordValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.value;
    if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&*!])[A-Za-z\d@#$%^&*!]{8,}/.test(password)) {
      return { invalidPassword: true };
    }
    return null;
  }

  checkPasswordCriteria(password: string): void {
    this.passwordCriteria.lowercase = /[a-z]/.test(password);
    this.passwordCriteria.uppercase = /[A-Z]/.test(password);
    this.passwordCriteria.number = /\d/.test(password);
    this.passwordCriteria.specialChar = /[@#$%^&*!]/.test(password);
    this.passwordCriteria.minLength = password.length >= 8;
  }


  // Avatar update
  updateAvatar() {
    if (!this.isImageSelected || !this.selectedImageFile) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Image required!.' });
      return;
    }
    this.isLoading = true;  
    const formData = new FormData();
    formData.append('avatar', this.selectedImageFile);
  
    this.userService.updateAvatar(this.profile.id, formData).subscribe(
      response => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Avatar updated Success' });
        this.updateAvatarVisible = false; 
        this.userService.getProfileByUserId(this.profile.id).subscribe(res => {
          this.profile = res;
          this.storeUserInformation(res);
        });
        this.isImageSelected = false;
        this.selectedImageFile = null;
        this.imagePreviewUrl = null;
      },
      error => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Avatar update failed' });
      }
    );
    this.isLoading = false;  
  }
  
  onFileSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];
      if (file.type.includes('image')) {
        this.isImageSelected = true;
        this.selectedImageFile = file;
        const reader = new FileReader();
        reader.onload = (e) => {
          const target = e.target as FileReader;
          this.imagePreviewUrl = target.result;
        };
        reader.readAsDataURL(file);
      }
    }
  }
  
  getImagePreviewUrl(): string | ArrayBuffer | null {
    return this.imagePreviewUrl;
  }

  // store user session
  storeUserInformation(res: Profile) {
    this.userStore.setUsernameForStore(res.userName);
    this.userStore.setImgPathForStore(res.imgPath);
  }
}

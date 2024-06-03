import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit{
  isLoading: boolean = false;
  signUpForm!: FormGroup;
  passwordCriteria = {
    lowercase: false,
    uppercase: false,
    number: false,
    specialChar: false,
    minLength: false
  };

  selectedImageFile!: File;
  isImageSelected: boolean = false;

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router, private messageService: MessageService) { }

  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      userName: ['', [Validators.required, this.userNameValidator]],
      email: ['', [Validators.required, Validators.email]],
      image: ['https://images.squarespace-cdn.com/content/v1/6001a095571ff86fe2af7eb1/1610719425819-8P8G4PZ2CKSIVBQ5NBSR/chusa-c3.png', Validators.required],
      password: ['', [Validators.required, this.passwordValidator]],
      confirmedPassword: ['', Validators.required],
      agreeCheckBox: [false, Validators.requiredTrue],
    }, { validator: this.passwordMatchValidator });
  }

  isFieldInvalid(field: string): boolean | null {
    const control = this.signUpForm.get(field);
    return control && control.invalid && (control.dirty || control.touched);
  }

  onSignUp() {
    if (this.signUpForm.valid) {
      const formData = new FormData();
      formData.append('userName', this.signUpForm.get('userName')!.value);
      formData.append('email', this.signUpForm.get('email')!.value);
      formData.append('password', this.signUpForm.get('password')!.value);
      formData.append('image', this.signUpForm.get('image')!.value);
      this.isLoading = true;
      this.auth.register(formData)
        .subscribe({
          next: (res) => {
            this.signUpForm.reset();
            localStorage.setItem('tempmail', res.email)
            this.router.navigate(['check-email']);
          },
          error: (err) => {
            this.isLoading = false;
            this.showErrorMessage(err);
          }
        });
    } else {
      this.isLoading = false;
      console.error('Form validation error');
    }
  }

  showErrorMessage(err: any) {
    if (err && err.error && err.error.errors && err.error.errors.length > 0) {
      const errorMessage = err.error.errors.join(', ');
      this.messageService.add({ severity: 'error', summary: 'Login Error', detail: errorMessage });
    }
  }

  onFileSelected(event: Event, controlName: string) {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];
      if (file.type.includes('image')) {
        this.isImageSelected = true;
        this.selectedImageFile = file;
      }
      this.signUpForm.get(controlName)!.setValue(file);
    }
  }
  

  passwordMatchValidator(control: AbstractControl) {
    const password = control.get('password')!.value;
    const confirmedPassword = control.get('confirmedPassword')!.value;
    if (password !== confirmedPassword) {
      control.get('confirmedPassword')!.setErrors({ passwordMatch: true });
      return true;
    } else {
      return null;
    }
  }

  userNameValidator(control: AbstractControl): ValidationErrors | null {
    const userName = control.value;

    if (!/^[a-z0-9]{8,14}$/.test(userName)) {
      return { invalidUserName: true };
    }

    return null;
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

  getImagePreviewUrl(): string | null {
    return this.isImageSelected ? URL.createObjectURL(this.selectedImageFile) : null;
  }
}

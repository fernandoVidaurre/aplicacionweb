import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { SignupRequest } from '../../services/auth/authRequest';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  registerForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    username:['',Validators.required],
    first_name:['',Validators.required],
    last_name:['',Validators.required],
    password: ['', Validators.required],
    confirmPassword: ['', Validators.required],
    is_staff: ['false']
  });

  passwordFieldType: string = 'password';
  confirmPasswordFieldType: string = 'password';
  passwordVisible: boolean = false;
  confirmPasswordVisible: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private toastr: ToastrService
  ) {}

  get email() {
    return this.registerForm.controls.email;
  }
  get username() {
    return this.registerForm.controls.username;
  }
  get first_name() {
    return this.registerForm.controls.first_name;
  }
  get last_name() {
    return this.registerForm.controls.last_name;
  }
  get password() {
    return this.registerForm.controls.password;
  }
  get confirmPassword() {
    return this.registerForm.controls.confirmPassword;
  }
  get is_staff() {
    return this.registerForm.controls.is_staff;
  }

  showSuccess(message = "") {
    this.toastr.success(message, "",{
      progressBar: true,
      timeOut: 3000
    })
  }

  showError(message = "") {
    this.toastr.error(message, "",{
      progressBar: true,
      timeOut: 3000
    })
  }

  signup() {
    if (this.registerForm.valid) {

      if (this.password.value !== this.confirmPassword.value) {
        this.showError('Las contraseñas no coinciden');
        return;
      }
      this.authService.signup(this.registerForm.value as SignupRequest).subscribe({
        error: (errorData) => {
          this.showError('Email o Password erroneo.');
          console.error(errorData);
        },
        complete: () => {
          this.showSuccess('Registro exitoso.');
          this.router.navigateByUrl('/login');
        },
      });
      
    } else {
      this.registerForm.markAllAsTouched();
      this.showError('No se permiten campos vacios.');
    }
  }

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
    this.passwordFieldType = this.passwordVisible ? 'text' : 'password';
  }


  toggleConfirmPasswordVisibility() {
    this.confirmPasswordVisible = !this.confirmPasswordVisible;
    this.confirmPasswordFieldType = this.confirmPasswordVisible ? 'text' : 'password';
  }

}

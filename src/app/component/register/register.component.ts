import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RegisterService } from '../../services/register.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  imports: [
    ReactiveFormsModule,
    CommonModule
  ]
})
export class RegisterComponent {
  registerForm: FormGroup;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private registerService: RegisterService,
    private router: Router,
    private toastr: ToastrService,
  ) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, {
      validators: this.passwordMatchValidator
    });
  }

  passwordMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  onSubmit() {
    this.registerForm.markAllAsTouched();

    if (this.registerForm.invalid) {
      if (this.registerForm.errors?.['passwordMismatch']) {
        this.toastr.error('Mật khẩu không khớp', 'Lỗi');
      }
      return;
    }

    this.isLoading = true;
    const { email, password, confirmPassword } = this.registerForm.value;
    console.log('Dữ liệu gửi đi:', { email, password, confirmPassword: confirmPassword });

    this.registerService.registerUser(email, password, confirmPassword)
      .subscribe({
        next: (response) => {
          console.log(response);
          this.toastr.success('Đăng ký thành công', 'Thành công');
          this.router.navigate(['/login']);
        },
        error: (err) => {
          this.isLoading = false;
          const errorMessage = err.error?.message || 'Đăng ký thất bại. Vui lòng thử lại.';
          this.toastr.error(errorMessage, 'Lỗi');
          console.error('Registration error:', err);
        },
        complete: () => {
          this.isLoading = false;
        }
      });
  }
}

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {LoginService} from '../../services/login.service';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports:[ReactiveFormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers:[LoginService]
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private loginService: LoginService, private toastr: ToastrService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      remember: [false]
    });
  }

  onSubmit = () => {
    console.log(this.loginForm.value);
    let user = this.loginForm.value;
    this.loginService.Login(user.email, user.password).subscribe({
      next: (response) =>{
        if(response.status === 200){
          console.log(response);
          localStorage.setItem('token', response.body.token);
          this.toastr.success('Dang nhap thanh cong', 'Thanh cong', {timeOut: 2000});
          setTimeout(()=>{
            this.router.navigate(['/home']);
          }, 2000)
        }
      },
      error: (error) =>{
        this.toastr.error(error);
        this.toastr.error('Mật khâu hoặc tài khoản không đúng', 'thất bại', {timeOut: 2000});
      }
    })
  }
}

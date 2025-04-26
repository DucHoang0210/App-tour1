import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

interface RegisterRequest {
  email: string;
  password: string;
  confirmPassword: string;
}

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private readonly apiUrl = 'http://localhost:8080/api/auth/register';

  constructor(private http: HttpClient) { }

  registerUser(email: string, password: string, confirmPassword: string): Observable<any> {
    const registerData: RegisterRequest = {
      email: email,
      password: password,
      confirmPassword: confirmPassword  // Khớp với tên trường trong DTO Spring Boot
    };

    return this.http.post<RegisterRequest>(this.apiUrl, registerData, { observe: 'response' }).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    // let errorMessage = 'Đã xảy ra lỗi không xác định';
    //
    // if (error.status === 0) {
    //   // Lỗi kết nối
    //   errorMessage = 'Không thể kết nối đến máy chủ. Vui lòng kiểm tra kết nối mạng';
    // } else if (error.error instanceof ErrorEvent) {
    //   // Lỗi phía client
    //   errorMessage = `Lỗi: ${error.error.message}`;
    // } else {
    //   // Lỗi từ server
    //   errorMessage = error.error?.message || error.message;
    //
    //   // Xử lý các mã lỗi cụ thể
    //   if (error.status === 400) {
    //     errorMessage = error.error?.message || 'Dữ liệu không hợp lệ';
    //   } else if (error.status === 409) {
    //     errorMessage = error.error?.message || 'Email đã được đăng ký';
    //   }
    // }

    return throwError(() => new Error());
  }
}

import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DetailTourComponent } from './detail-tour/detail-tour.component';
import { MapComponent } from './map/map.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';

export const routes: Routes = [
  { path: '', component: HomeComponent }, // Trang chủ
  { path: 'detail-tour', component: DetailTourComponent }, // Chi tiết tour
  { path: 'map', component: MapComponent }, // Bản đồ
  { path: 'login', component: LoginComponent }, // Đăng nhập
  { path: 'register', component: RegisterComponent }, // Đăng ký
  { path: 'user-dashboard', component: UserDashboardComponent }, // Quản lý của người dùng
  { path: '**', redirectTo: '', pathMatch: 'full' } // Điều hướng 404 về trang chủ
];

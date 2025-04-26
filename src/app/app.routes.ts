import { Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { DetailTourComponent } from './component/detail-tour/detail-tour.component';
import { MapComponent } from './component/map/map.component';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { UserDashboardComponent } from './component/user-dashboard/user-dashboard.component';
import { ChangePasswordComponent } from './component/change-password/change-password.component';
import { ContactComponent } from './component/contact/contact.component';
import { IntroductionComponent } from './component/introduction/introduction.component';
import { TravelTipsComponent } from './component/travel-tips/travel-tips.component';
import { PaymentComponent } from './component/payment/payment.component';
import { VnpayReturnComponent } from './component/vnpay-return/vnpay-return.component';

export const routes: Routes = [
  { path: '', component: HomeComponent }, // Trang chủ
  { path: 'detail-tour', component: DetailTourComponent }, // Chi tiết tour
  { path: 'map', component: MapComponent }, // Bản đồ
  { path: 'login', component: LoginComponent }, // Đăng nhập
  { path: 'register', component: RegisterComponent }, // Đăng ký
  { path: 'user-dashboard', component: UserDashboardComponent }, // Quản lý của người dùng
  { path: 'change-password', component: ChangePasswordComponent},
  { path: 'contact', component: ContactComponent },
  { path: 'introduction', component: IntroductionComponent },
  { path: 'travel-tips', component: TravelTipsComponent},
  { path: 'payment', component: PaymentComponent},
  { path: 'vnpay-return', component: VnpayReturnComponent},
  { path: '**', redirectTo: '', pathMatch: 'full' }, // Điều hướng 404 về trang chủ

];

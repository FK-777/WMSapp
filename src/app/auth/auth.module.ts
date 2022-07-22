import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
//import { RegisterComponent } from './register/register.component';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
//import { ResetPasswordComponent } from './reset-password/reset-password.component';
//import { VerifyAccountComponent } from './verify-account/verify-account.component';
import { IndexPageComponent } from './index-page/index-page.component';
//import { FeahterIconModule } from '../../../core/feather-icon/feather-icon.module';
//import { SelectionPageComponent } from './selection-page/selection-page.component';
//import { ContactComponent } from './contact/contact.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
//import { LoginComponentRoutingModule } from '../login/login-routing.module';
import { VerifyAccountComponent } from './verify-account/verify-account.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { UpdatePasswordComponent } from './update-password/update-password.component';
//import { FeatherModule } from 'angular-feather';
//import { AlertTriangle, Check, Loader } from 'angular-feather/icons';

// Select some icons (use an object, not an array)
// const icons = {
//   AlertTriangle,
//   Check,
//   Loader,
// };


const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
      },
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'forgot-password',
        component: ForgotPasswordComponent
      },
      {
        path: 'reset-password/:email/:verification',
        component: ResetPasswordComponent
      },
      {
        path: 'verify-account/:verification',
        component: VerifyAccountComponent
      },
      {
        path: 'update-password',
        component: UpdatePasswordComponent
      } 
      
    ]
  },
]

@NgModule({
  declarations: [LoginComponent, AuthComponent,
    ForgotPasswordComponent, ResetPasswordComponent,
    IndexPageComponent, VerifyAccountComponent, UpdatePasswordComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule, ReactiveFormsModule,
    IonicModule,
    //LoginComponentRoutingModule,
    //FeatherModule.pick(icons),
    //FeahterIconModule,
    //FeatherModule
  ]
})
export class AuthModule { }

import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guard/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  { 
    path:'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) 
  },
  {
    canActivate: [AuthGuard],
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then( m => m.DashboardComponentModule)
  },
  {
    canActivate: [AuthGuard],
    path: 'attendancepin',
    loadChildren: () => import('./attendancepin/attendancepin.module').then( m => m.AttendancepinComponentModule)
  },
  {
    canActivate: [AuthGuard],
    path: 'attendancethumb',
    loadChildren: () => import('./attendancethumb/attendancethumb.module').then( m => m.AttendancethumbComponentModule)
  },
  {
    canActivate: [AuthGuard],
    path: 'apply-leave',
    loadChildren: () => import('./apply-leave/apply-leave.module').then( m => m.ApplyLeaveComponentModule)
  },
  {
    canActivate: [AuthGuard],
    path: 'settings',
    loadChildren: () => import('./settings/settings.module').then( m => m.SettingsComponentModule)
  },
  {
    canActivate: [AuthGuard],
    path: 'check-in',
    loadChildren: () => import('./check-in/check-in.module').then( m => m.CheckInComponentModule)
  },
  {
    canActivate: [AuthGuard],
    path: 'checkout',
    loadChildren: () => import('./checkout/checkout.module').then( m => m.CheckoutComponentModule)
  },
  {
    canActivate: [AuthGuard],
    path: 'leave-list',
    loadChildren: () => import('./leave-list/leave-list.module').then( m => m.LeaveListComponentModule)
  },
  {
    canActivate: [AuthGuard],
    path: 'leave-details',
    loadChildren: () => import('./leave-details/leave-details.module').then( m => m.LeaveDetailsComponentModule)
  },
  {
    canActivate: [AuthGuard],
    path: 'attendance-report',
    loadChildren: () => import('./attendance-report/attendance-report.module').then( m => m.AttendanceReportComponentModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

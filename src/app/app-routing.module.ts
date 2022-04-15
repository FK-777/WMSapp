import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginComponentModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then( m => m.DashboardComponentModule)
  },
  {
    path: 'attendancepin',
    loadChildren: () => import('./attendancepin/attendancepin.module').then( m => m.AttendancepinComponentModule)
  },
  {
    path: 'attendancethumb',
    loadChildren: () => import('./attendancethumb/attendancethumb.module').then( m => m.AttendancethumbComponentModule)
  },
  {
    path: 'apply-leave',
    loadChildren: () => import('./apply-leave/apply-leave.module').then( m => m.ApplyLeaveComponentModule)
  },
  {
    path: 'settings',
    loadChildren: () => import('./settings/settings.module').then( m => m.SettingsComponentModule)
  },
  {
    path: 'check-in',
    loadChildren: () => import('./check-in/check-in.module').then( m => m.CheckInComponentModule)
  },
  {
    path: 'leave-list',
    loadChildren: () => import('./leave-list/leave-list.module').then( m => m.LeaveListComponentModule)
  },
  {
    path: 'leave-details',
    loadChildren: () => import('./leave-details/leave-details.module').then( m => m.LeaveDetailsComponentModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

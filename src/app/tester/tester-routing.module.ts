import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TesterComponent } from './tester.component';

const routes: Routes = [
  {
    path: '',
    component: TesterComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TesterComponentRoutingModule {}

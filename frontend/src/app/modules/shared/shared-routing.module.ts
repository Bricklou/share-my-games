import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '@app/modules/shared/pages/login/login.component';
import { guestGuard } from './guards/guest.guard';

const routes: Routes = [
  {
    path: 'auth/login',
    canActivate: [guestGuard],
    component: LoginComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SharedRoutingModule {}

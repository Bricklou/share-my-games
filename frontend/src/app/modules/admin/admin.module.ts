import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { DrawerService } from './services/drawer.service';
import { SharedModule } from '../shared/shared.module';
import { AdminSidebarComponent } from './components/sidebar/sidebar.component';

@NgModule({
  declarations: [AdminComponent, AdminSidebarComponent],
  imports: [CommonModule, AdminRoutingModule, SharedModule],
  providers: [DrawerService],
})
export class AdminModule {}

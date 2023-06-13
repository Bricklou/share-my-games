import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { WebsiteRoutingModule } from './website-routing.module';
import { NavbarComponent } from './components/navbar/navbar.component';
import { WebsiteComponent } from './website.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [NotFoundComponent, NavbarComponent, WebsiteComponent],
  imports: [CommonModule, WebsiteRoutingModule, SharedModule.forRoot()],
})
export class WebsiteModule {}

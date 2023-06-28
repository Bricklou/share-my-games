import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { WebsiteRoutingModule } from './website-routing.module';
import { NavbarComponent } from './components/navbar/navbar.component';
import { WebsiteComponent } from './website.component';
import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './pages/home/home.component';
import { FooterComponent } from './components/footer/footer.component';
import { UserButtonComponent } from './components/navbar/nav-items/user-button/user-button.component';

@NgModule({
  declarations: [
    // Components
    WebsiteComponent,

    NotFoundComponent,
    NavbarComponent,
    HomeComponent,
    FooterComponent,
    UserButtonComponent,
  ],
  imports: [CommonModule, WebsiteRoutingModule, SharedModule],
})
export class WebsiteModule {}

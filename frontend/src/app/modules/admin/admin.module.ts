import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { DrawerService } from './services/drawer.service';
import { SharedModule } from '../shared/shared.module';
import { AdminSidebarComponent } from './components/sidebar/sidebar.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { UsersComponent } from './pages/system/users/users.component';
import { RolesComponent } from './pages/system/roles/roles.component';
import { GamesComponent } from './pages/content/games/games.component';
import { CreatorsComponent } from './pages/content/creators/creators.component';
import { TagsComponent } from './pages/content/tags/tags.component';
import { SocialNetworksComponent } from './pages/content/social-networks/social-networks.component';
import { GamePreviewsComponent } from './pages/content/game-previews/game-previews.component';
import { CountUpModule } from 'ngx-countup';
@NgModule({
  declarations: [
    AdminComponent,
    AdminSidebarComponent,
    DashboardComponent,
    UsersComponent,
    RolesComponent,
    GamesComponent,
    CreatorsComponent,
    TagsComponent,
    SocialNetworksComponent,
    GamePreviewsComponent,
  ],
  imports: [CommonModule, AdminRoutingModule, SharedModule, CountUpModule],
  providers: [DrawerService],
})
export class AdminModule {}

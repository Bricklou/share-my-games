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
import { PopupComponent } from './components/popup/popup.component';
import { DialogModule } from '@angular/cdk/dialog';
import { CdkMenuModule } from '@angular/cdk/menu';
import { CdkTableModule } from '@angular/cdk/table';
import { UserItemActionComponent } from './pages/system/users/user-item-action/user-item-action.component';

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
    PopupComponent,
    UserItemActionComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    CountUpModule,
    DialogModule,
    CdkMenuModule,
    CdkTableModule,
  ],
  providers: [DrawerService],
})
export class AdminModule {}

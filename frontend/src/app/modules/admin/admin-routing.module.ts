import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CreatorsComponent } from './pages/content/creators/creators.component';
import { GamePreviewsComponent } from './pages/content/game-previews/game-previews.component';
import { GamesComponent } from './pages/content/games/games.component';
import { SocialNetworksComponent } from './pages/content/social-networks/social-networks.component';
import { TagsComponent } from './pages/content/tags/tags.component';
import { UsersComponent } from './pages/system/users/users.component';
import { RolesComponent } from './pages/system/roles/roles.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'content',
        children: [
          {
            path: 'creators',
            component: CreatorsComponent,
          },
          {
            path: 'game-previews',
            component: GamePreviewsComponent,
          },
          {
            path: 'games',
            component: GamesComponent,
          },
          {
            path: 'social-networks',
            component: SocialNetworksComponent,
          },
          {
            path: 'tags',
            component: TagsComponent,
          },
        ],
      },
      {
        path: 'system',
        children: [
          {
            path: 'users',
            component: UsersComponent,
          },
          {
            path: 'roles',
            component: RolesComponent,
          },
        ],
      },
      {
        path: '',
        pathMatch: 'full',
        component: DashboardComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}

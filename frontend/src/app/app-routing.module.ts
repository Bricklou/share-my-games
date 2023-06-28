import { Injectable, NgModule } from '@angular/core';
import { Title } from '@angular/platform-browser';
import {
  RouterModule,
  RouterStateSnapshot,
  Routes,
  TitleStrategy,
} from '@angular/router';
import { APP_NAME } from './app.module';
import { authGuard } from './modules/shared/guards/auth.guard';

const routes: Routes = [
  {
    path: 'admin',
    loadChildren: () =>
      import('./modules/admin/admin.module').then((m) => m.AdminModule),
    canActivate: [authGuard],
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./modules/shared/shared.module').then((m) => m.SharedModule),
  },
  {
    path: '',
    loadChildren: () =>
      import('./modules/website/website.module').then((m) => m.WebsiteModule),
  },
];

@Injectable({
  providedIn: 'root',
})
export class TemplatePageTitleStrategy extends TitleStrategy {
  public constructor(private readonly title: Title) {
    super();
  }

  public override updateTitle(routerState: RouterStateSnapshot): void {
    const title = this.buildTitle(routerState);
    if (title != undefined) {
      this.title.setTitle(`${title} | ${APP_NAME}`);
    } else {
      this.title.setTitle(APP_NAME);
    }
  }
}

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      initialNavigation: 'enabledBlocking',
    }),
  ],
  exports: [RouterModule],
  providers: [{ provide: TitleStrategy, useClass: TemplatePageTitleStrategy }],
})
export class AppRoutingModule {}

import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { icons, LucideAngularModule } from 'lucide-angular';
import { ThemeService } from './services/theme.service';
import { LoggerService } from './services/logger.service';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SsrCookieService } from 'ngx-cookie-service-ssr';
import { SharedRoutingModule } from './shared-routing.module';
import { AuthService } from './services/auth/auth.service';
import { LoginComponent } from './pages/login/login.component';
import { GraphQLModule } from './graphql.module';
import { ThemeButtonComponent } from './components/theme-button/theme-button.component';

@NgModule({
  declarations: [LoginComponent, ThemeButtonComponent],
  imports: [
    CommonModule,
    LazyLoadImageModule,
    GraphQLModule,
    FormsModule,
    ReactiveFormsModule,

    SharedRoutingModule,

    LucideAngularModule.pick(icons),
  ],
  exports: [
    CommonModule,
    LazyLoadImageModule,
    FormsModule,
    ReactiveFormsModule,
    GraphQLModule,

    LucideAngularModule,

    ThemeButtonComponent,
  ],
})
export class SharedModule {
  public static forRoot(): ModuleWithProviders<SharedModule> {
    return {
      ngModule: SharedModule,
      providers: [SsrCookieService, ThemeService, LoggerService, AuthService],
    };
  }
}

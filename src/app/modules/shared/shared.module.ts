import { ModuleWithProviders, NgModule, Provider } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, icons } from 'lucide-angular';

const providers: Provider[] = [];

@NgModule({
  declarations: [],
  imports: [CommonModule, LucideAngularModule.pick(icons)],
  providers,
  exports: [LucideAngularModule],
})
export class SharedModule {
  public static forRoot(): ModuleWithProviders<SharedModule> {
    return {
      ngModule: SharedModule,
      providers,
    };
  }
}

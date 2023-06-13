import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { WebsiteComponent } from './website.component';

const routes: Routes = [
  {
    path: '',
    component: WebsiteComponent,
    children: [
      { path: '**', component: NotFoundComponent, title: 'Page non-trouvé' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WebsiteRoutingModule {}

import { Component, OnDestroy } from '@angular/core';
import { DrawerService } from './services/drawer.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnDestroy {
  protected isDrawerOpen = false;

  private drawerSub$: Subscription;

  public constructor(private drawerService: DrawerService) {
    this.drawerSub$ = this.drawerService.isOpen.subscribe((isOpen) => {
      this.isDrawerOpen = isOpen;
    });
  }

  public toggleDrawer(): void {
    this.drawerService.toggle();
  }

  public ngOnDestroy(): void {
    this.drawerSub$.unsubscribe();
  }
}

import { Injectable, OnDestroy } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DrawerService implements OnDestroy {
  private _isOpen: BehaviorSubject<boolean>;

  public readonly events: Observable<boolean>;

  private routerSub: Subscription;

  public constructor(private router: Router) {
    this._isOpen = new BehaviorSubject(false);
    this.events = this._isOpen.asObservable();

    this.routerSub = this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        this.close();
      }
    });
  }

  public ngOnDestroy(): void {
    this.routerSub.unsubscribe();
  }

  public get isOpen(): Observable<boolean> {
    return this._isOpen.asObservable();
  }

  public open(): void {
    this._isOpen.next(true);
  }

  public close(): void {
    this._isOpen.next(false);
  }

  public toggle(): void {
    this._isOpen.next(!this._isOpen.value);
  }
}

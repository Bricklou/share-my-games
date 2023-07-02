import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DrawerService {
  private _isOpen: BehaviorSubject<boolean>;

  public readonly events: Observable<boolean>;

  public constructor() {
    this._isOpen = new BehaviorSubject(false);
    this.events = this._isOpen.asObservable();
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

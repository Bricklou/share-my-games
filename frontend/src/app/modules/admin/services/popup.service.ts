import { Overlay } from '@angular/cdk/overlay';
import { Injectable, InjectionToken, Injector } from '@angular/core';
import { PopupComponent, PopupData } from '../components/popup/popup.component';
import { ComponentPortal } from '@angular/cdk/portal';
import { DialogRef } from './dialog-ref';

export const POPUP_DATA_TOKEN = new InjectionToken<PopupData>('popup-data');
export const POPUP_CONTAINER_TOKEN = new InjectionToken('popup-container');

@Injectable({
  providedIn: 'root',
})
export class PopupService {
  public constructor(private overlay: Overlay) {}

  public open<TResult>(data: PopupData<TResult>): DialogRef<TResult> {
    const overlayRef = this.overlay.create({
      hasBackdrop: false,
      disposeOnNavigation: true,
    });
    const dialogPortal = new ComponentPortal(
      PopupComponent<TResult>,
      null,
      Injector.create({
        providers: [
          {
            provide: POPUP_DATA_TOKEN,
            useValue: data,
          },
        ],
      }),
    );
    const componentRef = overlayRef.attach(dialogPortal);

    const dialogRef = new DialogRef<TResult>(overlayRef, {
      instance: componentRef.instance,
    });

    componentRef.instance.open();

    return dialogRef;
  }
}

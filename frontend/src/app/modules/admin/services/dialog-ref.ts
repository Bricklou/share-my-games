import { OverlayRef } from '@angular/cdk/overlay';
import { PopupComponent } from '../components/popup/popup.component';
import { Observable, Subject, Subscription } from 'rxjs';

interface DialogConfig<R> {
  instance: PopupComponent<R>;
}

export class DialogRef<R = unknown> {
  private readonly componentInstance: PopupComponent<R> | null;

  /** Emit event when dialog is closed */
  public readonly closed: Observable<R | undefined> = new Subject();

  private _detachSubscription: Subscription;

  private _closedSubscription: Subscription;

  public constructor(
    private readonly overlayRef: OverlayRef,
    config: DialogConfig<R>,
  ) {
    this.componentInstance = config.instance;

    this._closedSubscription = this.componentInstance.closed.subscribe(
      (result) => this.close(result),
    );

    this._detachSubscription = overlayRef
      .detachments()
      .subscribe(() => this.close());
  }

  public close(result?: R): void {
    if (this.componentInstance) {
      const closedSubject = this.closed as Subject<R | undefined>;

      this.componentInstance.close();
      this._detachSubscription.unsubscribe();
      this._closedSubscription.unsubscribe();
      this.overlayRef.dispose();

      closedSubject.next(result);
      closedSubject.complete();
    }
  }
}

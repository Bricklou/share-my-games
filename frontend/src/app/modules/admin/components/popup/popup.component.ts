import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { POPUP_DATA_TOKEN } from '../../services/popup.service';
import { Observable, Subject } from 'rxjs';

export interface PopupAction<TResult = string> {
  label: string;
  style?: string;
  icon?: string;
  resultID: TResult;
}

export interface PopupData<TResult = string> {
  title: string;
  message: string;
  actions: PopupAction<TResult>[];
}

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css'],
})
export class PopupComponent<TResult = string> {
  @ViewChild('popup', { read: ElementRef, static: true })
  protected dialog!: ElementRef<HTMLDialogElement>;

  public readonly closed: Observable<TResult | undefined> = new Subject();

  public constructor(
    @Inject(POPUP_DATA_TOKEN) protected data: PopupData<TResult>,
  ) {}

  public open(): void {
    this.dialog.nativeElement.showModal();
  }

  public close(): void {
    this.dialog.nativeElement.close();
  }

  protected onClose(event: Event): void {
    event.preventDefault();

    const closedSubject = this.closed as Subject<TResult | undefined>;
    closedSubject.next(undefined);
    closedSubject.complete();

    this.close();
  }

  protected onAction(event: Event, result?: TResult): void {
    event.preventDefault();

    const closedSubject = this.closed as Subject<TResult | undefined>;
    closedSubject.next(result);
    closedSubject.complete();
    this.close();
  }
}

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingBarIndicatorComponent } from './loading-bar-indicator.component';

describe('LoadingBarIndicatorComponent', () => {
  let component: LoadingBarIndicatorComponent;
  let fixture: ComponentFixture<LoadingBarIndicatorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoadingBarIndicatorComponent],
    });
    fixture = TestBed.createComponent(LoadingBarIndicatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

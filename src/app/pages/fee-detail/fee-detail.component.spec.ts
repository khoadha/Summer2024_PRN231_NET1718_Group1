import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeeDetailComponent } from './fee-detail.component';

describe('FeeDetailComponent', () => {
  let component: FeeDetailComponent;
  let fixture: ComponentFixture<FeeDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FeeDetailComponent]
    });
    fixture = TestBed.createComponent(FeeDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

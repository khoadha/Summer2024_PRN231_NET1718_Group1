import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookRoomMonthlyComponent } from './book-room-monthly.component';

describe('BookRoomMonthlyComponent', () => {
  let component: BookRoomMonthlyComponent;
  let fixture: ComponentFixture<BookRoomMonthlyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BookRoomMonthlyComponent]
    });
    fixture = TestBed.createComponent(BookRoomMonthlyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

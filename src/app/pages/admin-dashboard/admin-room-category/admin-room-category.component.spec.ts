import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRoomCategoryComponent } from './admin-room-category.component';

describe('AdminRoomCategoryComponent', () => {
  let component: AdminRoomCategoryComponent;
  let fixture: ComponentFixture<AdminRoomCategoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminRoomCategoryComponent]
    });
    fixture = TestBed.createComponent(AdminRoomCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

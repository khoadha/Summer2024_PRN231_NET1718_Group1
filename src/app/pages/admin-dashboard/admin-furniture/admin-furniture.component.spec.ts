import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminFurnitureComponent } from './admin-furniture.component';

describe('AdminFurnitureComponent', () => {
  let component: AdminFurnitureComponent;
  let fixture: ComponentFixture<AdminFurnitureComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminFurnitureComponent]
    });
    fixture = TestBed.createComponent(AdminFurnitureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

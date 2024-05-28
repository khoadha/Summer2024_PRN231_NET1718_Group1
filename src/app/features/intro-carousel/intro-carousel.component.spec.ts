import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntroCarouselComponent } from './intro-carousel.component';

describe('IntroCarouselComponent', () => {
  let component: IntroCarouselComponent;
  let fixture: ComponentFixture<IntroCarouselComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IntroCarouselComponent]
    });
    fixture = TestBed.createComponent(IntroCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

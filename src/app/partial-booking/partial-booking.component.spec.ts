import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartialBookingComponent } from './partial-booking.component';

describe('PartialBookingComponent', () => {
  let component: PartialBookingComponent;
  let fixture: ComponentFixture<PartialBookingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PartialBookingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PartialBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

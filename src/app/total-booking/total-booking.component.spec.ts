import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalBookingComponent } from './total-booking.component';

describe('TotalBookingComponent', () => {
  let component: TotalBookingComponent;
  let fixture: ComponentFixture<TotalBookingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TotalBookingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TotalBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

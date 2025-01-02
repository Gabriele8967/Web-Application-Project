import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateLostPasswordComponent } from './update-lost-password.component';

describe('UpdateLostPasswordComponent', () => {
  let component: UpdateLostPasswordComponent;
  let fixture: ComponentFixture<UpdateLostPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateLostPasswordComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateLostPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetImgProfileComponent } from './set-img-profile.component';

describe('SetImgProfileComponent', () => {
  let component: SetImgProfileComponent;
  let fixture: ComponentFixture<SetImgProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SetImgProfileComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SetImgProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

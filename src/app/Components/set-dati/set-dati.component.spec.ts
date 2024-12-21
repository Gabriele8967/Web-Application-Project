import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetDatiComponent } from './set-dati.component';

describe('SetDatiComponent', () => {
  let component: SetDatiComponent;
  let fixture: ComponentFixture<SetDatiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SetDatiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SetDatiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

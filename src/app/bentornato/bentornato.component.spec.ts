import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BentornatoComponent } from './bentornato.component';

describe('BentornatoComponent', () => {
  let component: BentornatoComponent;
  let fixture: ComponentFixture<BentornatoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BentornatoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BentornatoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

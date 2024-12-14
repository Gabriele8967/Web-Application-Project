import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindOpponentComponent } from './find-opponent.component';

describe('FindOpponentComponent', () => {
  let component: FindOpponentComponent;
  let fixture: ComponentFixture<FindOpponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FindOpponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FindOpponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

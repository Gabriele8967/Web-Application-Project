import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartialMatchmakingComponent } from './partial-matchmaking.component';

describe('PartialMatchmakingComponent', () => {
  let component: PartialMatchmakingComponent;
  let fixture: ComponentFixture<PartialMatchmakingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PartialMatchmakingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PartialMatchmakingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

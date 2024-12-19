import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldsComponent } from './fields.component';
import {FieldsService} from '../services/fields/fields.service';

describe('Fields', () => {
  let component: FieldsComponent;
  let fixture: ComponentFixture<FieldsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FieldsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FieldsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

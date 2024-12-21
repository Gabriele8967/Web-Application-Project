import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookFieldComponent } from './book-field.component';

describe('BookFieldComponent', () => {
  let component: BookFieldComponent;
  let fixture: ComponentFixture<BookFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookFieldComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

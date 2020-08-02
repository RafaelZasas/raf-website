import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentCardListComponent } from './student-card-list.component';

describe('StudentCardListComponent', () => {
  let component: StudentCardListComponent;
  let fixture: ComponentFixture<StudentCardListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentCardListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentCardListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

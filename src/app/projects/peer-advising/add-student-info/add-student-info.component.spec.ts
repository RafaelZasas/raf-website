import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddStudentInfoComponent } from './add-student-info.component';

describe('AddStudentInfoComponent', () => {
  let component: AddStudentInfoComponent;
  let fixture: ComponentFixture<AddStudentInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddStudentInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddStudentInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

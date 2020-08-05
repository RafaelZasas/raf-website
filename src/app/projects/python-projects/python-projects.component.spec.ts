import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PythonProjectsComponent } from './python-projects.component';

describe('PythonProjectsComponent', () => {
  let component: PythonProjectsComponent;
  let fixture: ComponentFixture<PythonProjectsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PythonProjectsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PythonProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

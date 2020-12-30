import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JSProjectsComponent } from './js-projects.component';

describe('JSProjectsComponent', () => {
  let component: JSProjectsComponent;
  let fixture: ComponentFixture<JSProjectsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JSProjectsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JSProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PeerAdvisingComponent } from './peer-advising.component';

describe('PeerAdvisingComponent', () => {
  let component: PeerAdvisingComponent;
  let fixture: ComponentFixture<PeerAdvisingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PeerAdvisingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PeerAdvisingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

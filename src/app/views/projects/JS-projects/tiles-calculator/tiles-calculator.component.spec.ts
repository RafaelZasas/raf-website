import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TilesCalculatorComponent } from './tiles-calculator.component';

describe('TilesCalculatorComponent', () => {
  let component: TilesCalculatorComponent;
  let fixture: ComponentFixture<TilesCalculatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TilesCalculatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TilesCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

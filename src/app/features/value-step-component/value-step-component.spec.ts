import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ValueStepComponent } from './value-step-component';

describe('ValueStepComponent', () => {
  let component: ValueStepComponent;
  let fixture: ComponentFixture<ValueStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ValueStepComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ValueStepComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommandTaxMenuComponent } from './command-tax-menu-component';

describe('CommandTaxMenuComponent', () => {
  let component: CommandTaxMenuComponent;
  let fixture: ComponentFixture<CommandTaxMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommandTaxMenuComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CommandTaxMenuComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

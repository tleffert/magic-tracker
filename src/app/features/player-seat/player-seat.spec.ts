import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlayerSeat } from './player-seat';

describe('PlayerSeat', () => {
  let component: PlayerSeat;
  let fixture: ComponentFixture<PlayerSeat>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlayerSeat],
    }).compileComponents();

    fixture = TestBed.createComponent(PlayerSeat);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

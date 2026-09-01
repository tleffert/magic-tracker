import { TestBed } from '@angular/core/testing';
import { PlayerHealthUpdaterService } from './player-health-updater.service';

describe('PlayerHealthUpdaterService', () => {
  let service: PlayerHealthUpdaterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlayerHealthUpdaterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

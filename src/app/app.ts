import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { PlayerSeatComponent } from './features/player-seat/player-seat.component';
import { PlayerStore } from './state/store/player.store';
import { GameSetupComponent } from './features/game-setup-component/game-setup-component';
import { GameConfig } from './state/models/game-config';

@Component({
  imports: [RouterOutlet, PlayerSeatComponent, GameSetupComponent],
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('magic-tracker');
}

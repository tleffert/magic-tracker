import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { PlayerSeatComponent } from './features/player-seat/player-seat.component';
import { PlayerStore } from './state/store/player.store';
import { patchState, signalStore } from '@ngrx/signals';
import { addEntity } from '@ngrx/signals/entities';
import { DEFAULT_PLAYER_STATE } from './state/models/player';

@Component({
  imports: [RouterOutlet, PlayerSeatComponent],
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
  // providers: [PlayerStore]
})
export class App implements OnInit{
  private readonly playerStore = inject(PlayerStore);
  protected readonly title = signal('magic-tracker');
  protected playerEntities = this.playerStore.entities;



  ngOnInit(): void {
    // Players will be decided on a prior game setup screen
   this.playerStore.addPlayer();
  }

  addPlayer() {
    this.playerStore.addPlayer();
  }
}

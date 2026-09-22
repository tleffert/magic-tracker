import { Component, effect, inject } from '@angular/core';
import { PlayerSeatComponent } from '../player-seat/player-seat.component';
import { PlayerStore } from '../../state/store/player.store';

@Component({
  imports: [PlayerSeatComponent],
  selector: 'game-container-component',
  styleUrl: './game-container-component.scss',
  templateUrl: './game-container-component.html',
})
export class GameContainerComponent {
  private store = inject(PlayerStore);

  playerEntities = this.store.playerEntities;

  constructor() {
    effect(() => {
      const thing = this.playerEntities();
      console.log("=== players", thing);
    })
  }
}

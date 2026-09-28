import { Component, effect, inject } from '@angular/core';
import { PlayerSeatComponent } from '../player-seat/player-seat.component';
import { PlayerStore } from '../../state/store/player.store';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { GameContainterService } from './game-container.service';

@Component({
  imports: [PlayerSeatComponent, MatIconModule, MatButtonModule],
  selector: 'game-container-component',
  styleUrl: './game-container-component.scss',
  templateUrl: './game-container-component.html',
})
export class GameContainerComponent {
  private gameContainerService = inject(GameContainterService);

  playerEntities = this.gameContainerService.playerEntities;

  reset(): void {
    this.gameContainerService.resetGame();
  }

}

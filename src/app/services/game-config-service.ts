import { inject, Service } from '@angular/core';
import { PlayerStore } from '../state/store/player.store';
import { GameConfig } from '../state/models/game-config';
import { Router } from '@angular/router';

@Service()
export class GameConfigService {

    private store = inject(PlayerStore);
    private router = inject(Router);

    setGameConfig(config: GameConfig): void {
        this.store.setGameConfig(config);
    }

    startGameWithConfig(config: GameConfig): void {
        this.store.startNewGame(config);
        this.router.navigate(['game']);
    }


}

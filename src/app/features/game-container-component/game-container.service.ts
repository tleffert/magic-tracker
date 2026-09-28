import { inject, Service } from "@angular/core";
import { PlayerStore } from "../../state/store/player.store";
import { Router } from "@angular/router";

@Service()
export class GameContainterService {
    private store = inject(PlayerStore);
    private router = inject(Router);

    playerEntities = this.store.playerEntities;


    resetGame(): void {
        this.store.resetGame();
        this.router.navigate(['']);
    }
}
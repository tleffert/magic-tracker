import { computed, inject, Service, signal } from '@angular/core';
import { PlayerStore } from '../state/store/player.store';
import { Commander } from '../state/models/commander';
import { Player } from '../state/models/player';

@Service()
export class CommanderDamageAssignmentService {
    store = inject(PlayerStore);

    assigningPlayerDamageSources = this.store.getCommanderDamageByAssigningPlayer;

    assignCommanderDamageToAssigningPlayer(commanderSource: Commander['id'], damageAmount: number): void {
        const target = this.store.assigningCommanderDamage();
        if (target) {
            this.store.addCommanderDamage(
                target, 
                commanderSource,
                damageAmount
            );
        }
        
    }


}

import { computed, inject, Service, signal} from '@angular/core';
import { Player } from '../../state/models/player';
import { PlayerStore } from '../../state/store/player.store';

@Service()
export class PlayerSeatService {
    private playerStore = inject(PlayerStore);
    private playerId!: Player['id'];

    currentHealth = signal(40); // Will be configured by the player
    commanderTax = signal(0);
    isCommanderDamAssigningAndCurrentUser = computed(() => {
      return this.playerStore.isAssigningCommanderDamage() && (this.playerStore.assigningCommanderDamage() === this.playerId)
    })

    setPlayerId(id: Player['id']): void {
      this.playerId = id;
    }

    updateHealth(amount: number): void {
      this.playerStore.incrementHealth(this.playerId, amount);
    }

    updateCommanderTax(taxAmount: number): void {
      const commander = this.playerStore.commandersByOwnerId()[this.playerId][0];
      this.playerStore.updateCommanderTax(commander.id, taxAmount)
    }

   increaseCommnaderTax() {
    this.commanderTax.update(tax => tax + 1);
   }

   decreaseCommaderTax() {
    this.commanderTax.update(tax => tax - 1);
   }

   openCommanderDamageAssignment(): void {
    this.playerStore.setAssigningCommanderDamage(this.playerId);
   }

   closeCommanderDamageAssignment(): void {
    this.playerStore.clearAssigningCommadanderDamage();
   }

    
}
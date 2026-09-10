import { computed, inject, Service, signal} from '@angular/core';
import { Player } from '../../state/models/player';
import { PlayerStore } from '../../state/store/player.store';

@Service()
export class PlayerSeatService {
    private playerStore = inject(PlayerStore);
    private playerId!: Player['id'];
    playerIdSignal = signal<Player['id']>('');

    currentHealth = signal(40); // Will be configured by the player
    
    commanderTax = signal(0);
    isAssigningCommanderDamage = this.playerStore.isAssigningCommanderDamage;

    playerCommaders = computed(() => {
      const playerId = this.playerIdSignal();
      return this.playerStore.commandersByOwnerId()[playerId] ?? []
    })

    isCommanderDamAssigningAndCurrentUser = computed(() => {
      return this.playerStore.isAssigningCommanderDamage() && (this.playerStore.assigningCommanderDamage() === this.playerId)
    })

    totalCommanderDamage = computed(() => {
      console.log("asdkjfkasdjfk", this.playerStore.totalCommanderDamageToPlayerById());
      return this.playerStore.totalCommanderDamageToPlayerById()[this.playerId] ?? 0;
    })

    currentHealthWithCommander = computed(() => {
      return this.currentHealth() - this.totalCommanderDamage();
    })


    setPlayerId(id: Player['id']): void {
      this.playerId = id;
      this.playerIdSignal.set(id);
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
    // toggle for now
    if (this.playerStore.isAssigningCommanderDamage()) {
      this.closeCommanderDamageAssignment();
    } else {
      this.playerStore.setAssigningCommanderDamage(this.playerId);
    }
   }

   closeCommanderDamageAssignment(): void {
    this.playerStore.clearAssigningCommadanderDamage();
   }

   togglePlayerPartnerCommander(): void {
    this.playerStore.togglePartner(this.playerId);
   }

    
}
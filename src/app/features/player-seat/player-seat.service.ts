import { computed, inject, Service, signal} from '@angular/core';
import { Player } from '../../state/models/player';
import { PlayerStore } from '../../state/store/player.store';
import { Commander } from '../../state/models/commander';

@Service()
export class PlayerSeatService {
    private playerStore = inject(PlayerStore);
    private playerId!: Player['id'];
    playerIdSignal = signal<Player['id']>('');

    player = computed(() => {
      const id = this.playerIdSignal();
      return this.playerStore.selectPlayerById(id);
    });

    currentHealth = computed(() => {
      const player = this.player();
      return player.health;
    })
    
    commanderTax = signal(0);
    isAssigningCommanderDamage = this.playerStore.isAssigningCommanderDamage;

    playerCommaders = computed(() => {
      const playerId = this.playerIdSignal();

      return this.playerStore.commandersByOwnerId()[playerId];
    })

    isCommanderDamAssigningAndCurrentUser = computed(() => {
      return this.playerStore.isAssigningCommanderDamage() && (this.playerStore.assigningCommanderDamage() === this.playerId)
    })

    totalCommanderDamage = computed(() => {
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

    updateCommanderTax(taxAmount: number,  commanderId: Commander['id']): void {
      this.playerStore.updateCommanderTax(commanderId, taxAmount)
    }

    togglePartnerCommander(): void {
      const id = this.playerIdSignal();
      this.playerStore.togglePartnerCommander(id);
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

    
}
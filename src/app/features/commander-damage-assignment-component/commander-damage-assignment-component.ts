import { Component, inject, input } from '@angular/core';
import { ValueStepComponent } from '../value-step-component/value-step-component';
import { CommanderDamageAssignmentService } from '../../services/commander-damage-assignment-service';
import { Commander } from '../../state/models/commander';
import { PlayerSeatService } from '../player-seat/player-seat.service';

@Component({
  imports: [ValueStepComponent],
  selector: 'commander-damage-assignment-component',
  styleUrl: './commander-damage-assignment-component.scss',
  templateUrl: './commander-damage-assignment-component.html',
})
export class CommanderDamageAssignmentComponent {
  private commanderDamageAssignementService = inject(CommanderDamageAssignmentService);
  private playerSeatService = inject(PlayerSeatService);

  playerCommanders = input.required<Commander[]>();

  targetPlayerDamageSources = this.commanderDamageAssignementService.assigningPlayerDamageSources()

  updateCommanderDamage(sourceCommadnerId: string, damageAmount: number): void {
    this.commanderDamageAssignementService.assignCommanderDamageToAssigningPlayer(
      sourceCommadnerId,
      damageAmount
    )
  }

  togglePartnerCommander(): void {
    this.playerSeatService.togglePlayerPartnerCommander()
  }
}

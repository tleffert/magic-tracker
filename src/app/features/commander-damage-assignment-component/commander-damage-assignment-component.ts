import { Component, inject, input } from '@angular/core';
import { ValueStepComponent } from '../value-step-component/value-step-component';
import { CommanderDamageAssignmentService } from '../../services/commander-damage-assignment-service';
import { Commander } from '../../state/models/commander';
import { PlayerSeatService } from '../player-seat/player-seat.service';
import { PartnerToggleComponent } from '../partner-toggle-component/partner-toggle-component';
import { Player } from '../../state/models/player';


@Component({
  imports: [ValueStepComponent, PartnerToggleComponent],
  selector: 'commander-damage-assignment-component',
  styleUrl: './commander-damage-assignment-component.scss',
  templateUrl: './commander-damage-assignment-component.html',
})
export class CommanderDamageAssignmentComponent {
  private commanderDamageAssignementService = inject(CommanderDamageAssignmentService);

  playerCommanders = input.required<Commander[]>();
  playerId = input.required<Player['id']>();

  targetPlayerDamageSources = this.commanderDamageAssignementService.assigningPlayerDamageSources();

  updateCommanderDamage(sourceCommadnerId: string, damageAmount: number): void {
    this.commanderDamageAssignementService.assignCommanderDamageToAssigningPlayer(
      sourceCommadnerId,
      damageAmount
    )
  }

}

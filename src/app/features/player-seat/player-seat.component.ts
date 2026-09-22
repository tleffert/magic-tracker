import { Component, computed, inject, input, OnInit, signal } from '@angular/core';
import { PlayerSeatService } from './player-seat.service';
import { CommandTaxMenuComponent } from '../command-tax-menu-component/command-tax-menu-component';
import { Player } from '../../state/models/player';
import { ValueStepComponent } from '../value-step-component/value-step-component';
import { CommanderDamageAssignmentComponent } from '../commander-damage-assignment-component/commander-damage-assignment-component';
import { Commander } from '../../state/models/commander';

@Component({
  imports: [CommandTaxMenuComponent, ValueStepComponent, CommanderDamageAssignmentComponent],
  selector: 'player-seat',
  styleUrl: './player-seat.scss',
  templateUrl: './player-seat.html',
  providers: [PlayerSeatService]
})
export class PlayerSeatComponent implements OnInit {
  playerSeatService = inject(PlayerSeatService);
  taxMenuActive: boolean = false;
  player = input.required<Player>();
  commanders = this.playerSeatService.playerCommaders;

  shouldShowCommanderDamageAssignment = computed(() => {
    const isCurrentPlayerAssigning = this.playerSeatService.isCommanderDamAssigningAndCurrentUser();
    const isCurrentlyAssigning = this.playerSeatService.isAssigningCommanderDamage();
    return !isCurrentPlayerAssigning && isCurrentlyAssigning;
  })

  ngOnInit(): void {
    this.playerSeatService.setPlayerId(this.player().id);
  }

  updateHealth(amount: number): void {
    this.playerSeatService.updateHealth(amount);
  }

  toggleTaxMenu(): void {
    this.taxMenuActive = !this.taxMenuActive;
  }

  updateTax(updateEvent: {tax: number, id: Commander['id']}): void {
    this.playerSeatService.updateCommanderTax(updateEvent.tax, updateEvent.id);
  }

  openAssigningCommanderDamage(): void {
    this.playerSeatService.openCommanderDamageAssignment();
  }
}

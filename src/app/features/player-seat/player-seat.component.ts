import { Component, computed, inject, input, OnInit, signal } from '@angular/core';
import { PlayerSeatService } from './player-seat.service';
import { CommandTaxMenuComponent } from '../command-tax-menu-component/command-tax-menu-component';
import { Player } from '../../state/models/player';
import { ValueStepComponent } from '../value-step-component/value-step-component';
import { CommanderDamageAssignmentComponent } from '../commander-damage-assignment-component/commander-damage-assignment-component';
import { PlayerStore } from '../../state/store/player.store';

@Component({
  imports: [CommandTaxMenuComponent, ValueStepComponent, CommanderDamageAssignmentComponent],
  selector: 'app-player-seat',
  styleUrl: './player-seat.scss',
  templateUrl: './player-seat.html',
  providers: [PlayerSeatService]
})
export class PlayerSeatComponent implements OnInit{
  // This will move
  private playerStore = inject(PlayerStore);
  playerSeatService = inject(PlayerSeatService);
  taxMenuActive: boolean = false;
  player = input.required<Player>();
  commanders = this.playerSeatService.playerCommaders;

  ngOnInit(): void {
    this.playerSeatService.setPlayerId(this.player().id);
  }

  updateHealth(amount: number): void {
    this.playerSeatService.updateHealth(amount);
  }

  toggleTaxMenu(): void {
    this.taxMenuActive = !this.taxMenuActive;
  }

  updateTax(tax: number): void {
    this.playerSeatService.updateCommanderTax(tax);
  }

  openAssigningCommanderDamage(): void {
    this.playerSeatService.openCommanderDamageAssignment();
  }
}

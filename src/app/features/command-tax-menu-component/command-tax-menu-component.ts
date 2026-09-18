import { Component, effect, inject, input, model, OnInit, output, signal } from '@angular/core';
import { ValueStepComponent } from '../value-step-component/value-step-component';
import { Player } from '../../state/models/player';
import { PlayerStore } from '../../state/store/player.store';
import { Commander } from '../../state/models/commander';
import { PartnerToggleComponent } from '../partner-toggle-component/partner-toggle-component';

@Component({
  imports: [ValueStepComponent, PartnerToggleComponent],
  selector: 'command-tax-menu-component',
  styleUrl: './command-tax-menu-component.scss',
  templateUrl: './command-tax-menu-component.html',
})
export class CommandTaxMenuComponent {

  playerCommanders = input.required<Commander[]>();
  playerId = input.required<Player['id']>();
  
  updatedTax = output<{id: Commander['id'], tax: number}>();
  close = output<void>();

  updateTax(amount: number, commander: Commander): void {
    this.updatedTax.emit({
      id: commander.id,
      tax: commander.tax + amount
    });
  }

  dismiss() {
    this.close.emit();
  }
}

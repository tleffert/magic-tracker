import { Component, effect, inject, input, model, OnInit, output, signal } from '@angular/core';
import { ValueStepComponent } from '../value-step-component/value-step-component';
import { Player } from '../../state/models/player';
import { PlayerStore } from '../../state/store/player.store';
import { Commander } from '../../state/models/commander';

@Component({
  imports: [ValueStepComponent],
  selector: 'command-tax-menu-component',
  styleUrl: './command-tax-menu-component.scss',
  templateUrl: './command-tax-menu-component.html',
})
export class CommandTaxMenuComponent {
  private playerStore = inject(PlayerStore);

  playerId = input.required<Player['id']>();
  tax = input<number>(0);
  updatedTax = signal<number>(0);
  close = output<number>();

  commanders !: Commander[];

  constructor() {
    effect(() => {
      this.updatedTax.set(this.tax());
      this.commanders = this.playerStore.commandersByOwnerId()[this.playerId()];
    })
  }

  updateTax(amount: number): void {
    this.updatedTax.set(this.updatedTax() + amount);
  }

  dismiss() {
    this.close.emit(this.updatedTax());
  }
}

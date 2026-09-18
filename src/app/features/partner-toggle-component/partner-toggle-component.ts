import { Component, inject, input } from '@angular/core';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { Player } from '../../state/models/player';
import { PlayerStore } from '../../state/store/player.store';

@Component({
  imports: [MatSlideToggleModule],
  selector: 'partner-toggle-component',
  styleUrl: './partner-toggle-component.scss',
  templateUrl: './partner-toggle-component.html',
})
export class PartnerToggleComponent {
  private store = inject(PlayerStore);

  playerId = input.required<Player['id']>();


  togglePartnerCommander(): void {
    this.store.togglePartnerCommander(this.playerId());
  }
}

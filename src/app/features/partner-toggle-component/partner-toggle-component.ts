import { Component, computed, inject, input } from '@angular/core';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { Player } from '../../state/models/player';
import { PlayerStore } from '../../state/store/player.store';
import { PlayerSeatService } from '../player-seat/player-seat.service';

@Component({
  imports: [MatSlideToggleModule],
  selector: 'partner-toggle-component',
  styleUrl: './partner-toggle-component.scss',
  templateUrl: './partner-toggle-component.html',
})
export class PartnerToggleComponent {
  private playerSeatService = inject(PlayerSeatService);

  parterEnabled = computed(() => {
    const player = this.playerSeatService.player();
    return player.partnerEnabled;
  })


  togglePartnerCommander(): void {
    this.playerSeatService.togglePartnerCommander()
  }
}

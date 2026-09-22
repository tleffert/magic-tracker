import { Component, inject, signal } from '@angular/core';
import { form, FormField, required } from '@angular/forms/signals';
import { GameConfig } from '../../state/models/game-config';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { DEFAULT_GAME_CONFIG } from '../../state/utils/default-game-setup';
import { GameConfigService } from '../../services/game-config-service';
import { MatButton, MatButtonModule } from '@angular/material/button';


@Component({
  imports: [FormField, MatButtonModule, MatButtonToggleModule],
  selector: 'game-setup-component',
  styleUrl: './game-setup-component.scss',
  templateUrl: './game-setup-component.html',
})
export class GameSetupComponent {

  private gameConfigService = inject(GameConfigService);

   gameConfigModel = signal<GameConfig>(DEFAULT_GAME_CONFIG)

  gameConfigForm = form(this.gameConfigModel, (schemaPath) => {
    required(schemaPath.startingLife)
  });

  startGame(): void {
    this.gameConfigService.startGameWithConfig(this.gameConfigModel());
  }

}

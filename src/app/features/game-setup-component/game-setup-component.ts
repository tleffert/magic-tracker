import { Component, signal } from '@angular/core';
import { form, FormField, required } from '@angular/forms/signals';
import { GameConfig } from '../../state/models/game-config';
import {MatFormFieldModule, MatLabel} from '@angular/material/form-field';
import {MatButtonToggleModule} from '@angular/material/button-toggle';


@Component({
  imports: [FormField, MatLabel, MatButtonToggleModule, MatFormFieldModule],
  selector: 'game-setup-component',
  styleUrl: './game-setup-component.scss',
  templateUrl: './game-setup-component.html',
})
export class GameSetupComponent {

   gameConfigModel = signal<GameConfig>({
    numberOfPlayers: 2,
    startingLife: 20,
    seatOrientation: ''
  })

  gameConfigForm = form(this.gameConfigModel, (schemaPath) => {
    required(schemaPath.startingLife)
  });

}

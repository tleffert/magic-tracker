import { Component, input, output } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';


@Component({
  imports: [MatIconModule, MatButtonModule],
  selector: 'value-step-component',
  styleUrl: './value-step-component.scss',
  templateUrl: './value-step-component.html',
})
export class ValueStepComponent {
  // TODO maybe use signal forms here?
  value = input.required<number>();
  stepSize = input<number>(1);
  change = output<number>();

  increment(): void {
    console.log("=== increment");
    this.change.emit(this.stepSize());
  }

  decrement(): void {
    console.log("=== decrement");
    this.change.emit((-(this.stepSize())));
  }

}

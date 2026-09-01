import { Component, input, output } from '@angular/core';

@Component({
  imports: [],
  selector: 'value-step-component',
  styleUrl: './value-step-component.scss',
  templateUrl: './value-step-component.html',
})
export class ValueStepComponent {

  value = input.required<number>();
  step = output<number>();


  increment(): void {
    this.step.emit(1);
  }

  decrement(): void {
    this.step.emit(-1);
  }

}

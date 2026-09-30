import { Component, computed, debounced, effect, input, output, signal } from '@angular/core';
import { ValueStepComponent } from '../value-step-component/value-step-component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  imports: [ValueStepComponent, MatIconModule, MatButtonModule],
  selector: 'player-health-component',
  styleUrl: './player-health-component.scss',
  templateUrl: './player-health-component.html',
})
export class PlayerHealthComponent {

  currentHealth = input.required<number>();

  healthChange = output<number>();

  healthValueTrigger = signal(0);

  debouncedUpdate = debounced(this.healthValueTrigger, 250);

  currentValueWithExpectedUpdate = computed(() => {
    return this.currentHealth() + this.healthValueTrigger();
  });

  constructor() {
    effect(() => {
      if (this.debouncedUpdate.status() === 'resolved' && this.healthValueTrigger()) {
        this.healthChange.emit(this.debouncedUpdate.value());
        this.healthValueTrigger.set(0);
      }
    })
  }

  updateHealthValue(change: number): void {
    this.healthValueTrigger.update(value => value + change);
  }
  

}

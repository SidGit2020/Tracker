import { Component, model } from '@angular/core';

@Component({
  selector: 'app-amount-input',
  imports: [],
  templateUrl: './amount-input.html',
  styleUrl: './amount-input.scss',
})
export class AmountInputComponent {
  readonly amount = model<number | null>(null);

  onInput(value: string): void {
    if (value === '') {
      this.amount.set(null);
      return;
    }
    const parsed = Number(value);
    this.amount.set(Number.isNaN(parsed) ? null : parsed);
  }
}

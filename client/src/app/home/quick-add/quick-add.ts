import { Component, computed, output, signal } from '@angular/core';
import { AmountInputComponent } from '../amount-input/amount-input';
import { CategorySelectorComponent } from '../category-selector/category-selector';

export interface QuickAddSubmission {
  amount: number;
  categoryName: string;
}

@Component({
  selector: 'app-quick-add',
  imports: [AmountInputComponent, CategorySelectorComponent],
  templateUrl: './quick-add.html',
  styleUrl: './quick-add.scss',
})
export class QuickAddComponent {
  readonly submitted = output<QuickAddSubmission>();

  protected readonly amount = signal<number | null>(null);
  protected readonly categoryName = signal('');

  protected readonly isValid = computed(() => {
    const amountValue = this.amount();
    return amountValue !== null && amountValue > 0 && this.categoryName().trim() !== '';
  });

  onSubmit(): void {
    if (!this.isValid()) {
      return;
    }
    this.submitted.emit({ amount: this.amount()!, categoryName: this.categoryName().trim() });
  }

  reset(): void {
    this.amount.set(null);
    this.categoryName.set('');
  }
}

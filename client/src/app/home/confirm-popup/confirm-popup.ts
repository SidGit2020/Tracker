import { Component, OnInit, inject, input, output, signal } from '@angular/core';
import { OverlayComponent } from '../../shared/components/overlay/overlay';
import { AmountInputComponent } from '../amount-input/amount-input';
import { CategorySelectorComponent } from '../category-selector/category-selector';
import { EntriesService } from '../../shared/api/entries.service';
import { Entry } from '../../shared/api/entry.model';

@Component({
  selector: 'app-confirm-popup',
  imports: [OverlayComponent, AmountInputComponent, CategorySelectorComponent],
  templateUrl: './confirm-popup.html',
  styleUrl: './confirm-popup.scss',
})
export class ConfirmPopupComponent implements OnInit {
  private readonly entriesService = inject(EntriesService);

  readonly initialAmount = input.required<number>();
  readonly initialCategoryName = input.required<string>();

  readonly cancelled = output<void>();
  readonly saved = output<Entry>();

  protected readonly amount = signal<number | null>(null);
  protected readonly categoryName = signal('');
  protected readonly editingAmount = signal(false);
  protected readonly editingCategory = signal(false);
  protected readonly saving = signal(false);
  protected readonly errorMessage = signal<string | null>(null);

  ngOnInit(): void {
    this.amount.set(this.initialAmount());
    this.categoryName.set(this.initialCategoryName());
  }

  onCancel(): void {
    this.cancelled.emit();
  }

  async onConfirm(): Promise<void> {
    this.saving.set(true);
    this.errorMessage.set(null);

    try {
      const entry = await this.entriesService.create({
        amount: this.amount()!,
        categoryName: this.categoryName().trim(),
      });
      this.saving.set(false);
      this.saved.emit(entry);
    } catch {
      this.saving.set(false);
      this.errorMessage.set('Could not save entry. Please try again.');
    }
  }
}

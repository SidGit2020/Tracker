import { Component, OnInit, inject, input, output, signal } from '@angular/core';
import { OverlayComponent } from '../../shared/components/overlay/overlay';
import { AmountInputComponent } from '../amount-input/amount-input';
import { CategorySelectorComponent } from '../category-selector/category-selector';
import { EntriesService } from '../../shared/api/entries.service';
import { Entry } from '../../shared/api/entry.model';

@Component({
  selector: 'app-edit-popup',
  imports: [OverlayComponent, AmountInputComponent, CategorySelectorComponent],
  templateUrl: './edit-popup.html',
  styleUrl: './edit-popup.scss',
})
export class EditPopupComponent implements OnInit {
  private readonly entriesService = inject(EntriesService);

  readonly entry = input.required<Entry>();

  readonly closed = output<void>();

  protected readonly amount = signal<number | null>(null);
  protected readonly categoryName = signal('');
  protected readonly editingAmount = signal(false);
  protected readonly editingCategory = signal(false);
  protected readonly saving = signal(false);
  protected readonly deleting = signal(false);
  protected readonly deleteArmed = signal(false);
  protected readonly errorMessage = signal<string | null>(null);

  ngOnInit(): void {
    this.amount.set(this.entry().amount);
    this.categoryName.set(this.entry().category.name);
  }

  onClose(): void {
    this.closed.emit();
  }

  async onSave(): Promise<void> {
    this.saving.set(true);
    this.errorMessage.set(null);

    try {
      await this.entriesService.update(this.entry().id, {
        amount: this.amount()!,
        categoryName: this.categoryName().trim(),
      });
      this.saving.set(false);
      this.closed.emit();
    } catch {
      this.saving.set(false);
      this.errorMessage.set('Could not save changes. Please try again.');
    }
  }

  async onDelete(): Promise<void> {
    if (!this.deleteArmed()) {
      this.deleteArmed.set(true);
      return;
    }

    this.deleting.set(true);
    this.errorMessage.set(null);

    try {
      await this.entriesService.remove(this.entry().id);
      this.deleting.set(false);
      this.closed.emit();
    } catch {
      this.deleting.set(false);
      this.deleteArmed.set(false);
      this.errorMessage.set('Could not delete entry. Please try again.');
    }
  }
}

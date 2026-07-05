import { Component, OnInit, ViewChild, inject, signal } from '@angular/core';
import { QuickAddComponent, QuickAddSubmission } from './quick-add/quick-add';
import { ConfirmPopupComponent } from './confirm-popup/confirm-popup';
import { EditPopupComponent } from './edit-popup/edit-popup';
import { RecentListComponent } from './recent-list/recent-list';
import { ToastContainerComponent } from '../shared/components/toast/toast-container';
import { ToastService } from '../shared/components/toast/toast.service';
import { Entry } from '../shared/api/entry.model';

@Component({
  selector: 'app-home',
  imports: [
    QuickAddComponent,
    ConfirmPopupComponent,
    EditPopupComponent,
    RecentListComponent,
    ToastContainerComponent,
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class HomeComponent {
  private readonly toastService = inject(ToastService);

  @ViewChild(QuickAddComponent) private quickAdd?: QuickAddComponent;

  protected readonly pendingEntry = signal<QuickAddSubmission | null>(null);
  protected readonly editingEntry = signal<Entry | null>(null);

  onQuickAddSubmitted(value: QuickAddSubmission): void {
    this.pendingEntry.set(value);
  }

  onConfirmCancelled(): void {
    this.pendingEntry.set(null);
  }

  onConfirmSaved(entry: Entry): void {
    this.pendingEntry.set(null);
    this.quickAdd?.reset();
    this.toastService.show(`₹${entry.amount} added to ${entry.category.name}`, entry.id);
  }

  onRowClicked(entry: Entry): void {
    this.editingEntry.set(entry);
  }

  onEditClosed(): void {
    this.editingEntry.set(null);
  }
}

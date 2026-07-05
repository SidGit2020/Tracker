import { Component, OnInit, computed, inject, output, signal } from '@angular/core';
import { EntriesService } from '../../shared/api/entries.service';
import { ToastService } from '../../shared/components/toast/toast.service';
import { Entry } from '../../shared/api/entry.model';

const COUNT_OPTIONS = [5, 10, 20] as const;

@Component({
  selector: 'app-recent-list',
  imports: [],
  templateUrl: './recent-list.html',
  styleUrl: './recent-list.scss',
})
export class RecentListComponent implements OnInit {
  private readonly entriesService = inject(EntriesService);
  protected readonly toastService = inject(ToastService);

  readonly rowClicked = output<Entry>();

  protected readonly countOptions = COUNT_OPTIONS;
  protected readonly count = signal<number>(10);
  protected readonly state = this.entriesService.entriesState;

  protected readonly visibleEntries = computed(() => {
    const current = this.state();
    if (current.status !== 'default') {
      return [];
    }
    return current.data.slice(0, this.count());
  });

  ngOnInit(): void {
    this.entriesService.load();
  }

  onCountChange(value: string): void {
    this.count.set(Number(value));
  }

  onRetry(): void {
    this.entriesService.load();
  }

  formatDate(createdAt: string): string {
    return new Date(createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
  }
}

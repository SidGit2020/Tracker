import { Component, OnInit, computed, effect, inject, signal } from '@angular/core';
import { MonthlySummaryService } from '../shared/api/monthly-summary.service';
import { BreakdownHeaderComponent } from './header/header';
import { TotalSummaryComponent } from './total-summary/total-summary';
import { BarChartComponent } from './bar-chart/bar-chart';

const MONTH_NAMES = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

@Component({
  selector: 'app-monthly-breakdown',
  imports: [BreakdownHeaderComponent, TotalSummaryComponent, BarChartComponent],
  templateUrl: './monthly-breakdown.html',
  styleUrl: './monthly-breakdown.scss',
})
export class MonthlyBreakdownComponent implements OnInit {
  private readonly summaryService = inject(MonthlySummaryService);

  protected readonly state = this.summaryService.summaryState;

  // Captured once, from the first (no-params) load's response — never computed
  // independently on the client. Used only to know when Next should disable.
  private hasCapturedCurrentMonth = false;
  protected readonly currentYear = signal<number | null>(null);
  protected readonly currentMonth = signal<number | null>(null);

  // Tracks the month currently on screen, driven entirely by what the server echoes back.
  protected readonly activeYear = signal<number | null>(null);
  protected readonly activeMonth = signal<number | null>(null);

  // Tracks the month of the most recently *requested* (not necessarily successful) load,
  // so Retry re-attempts the month that actually failed rather than the last successful one.
  private readonly pendingYear = signal<number | null>(null);
  private readonly pendingMonth = signal<number | null>(null);

  protected readonly earliestYear = signal<number | null>(null);
  protected readonly earliestMonth = signal<number | null>(null);

  protected readonly loading = computed(() => this.state().status === 'loading');

  protected readonly monthLabel = computed(() => {
    const month = this.activeMonth();
    const year = this.activeYear();
    if (month === null || year === null) {
      return '';
    }
    return `${MONTH_NAMES[month - 1]} ${year}`;
  });

  protected readonly summary = computed(() => {
    const current = this.state();
    return current.status === 'default' ? current.data : null;
  });

  protected readonly prevDisabled = computed(() => {
    const year = this.activeYear();
    const month = this.activeMonth();
    if (year === null || month === null || this.loading()) {
      return true;
    }
    return year === this.earliestYear() && month === this.earliestMonth();
  });

  protected readonly nextDisabled = computed(() => {
    const year = this.activeYear();
    const month = this.activeMonth();
    if (year === null || month === null || this.loading()) {
      return true;
    }
    return year === this.currentYear() && month === this.currentMonth();
  });

  constructor() {
    effect(() => {
      const current = this.state();
      if (current.status !== 'default') {
        return;
      }

      const { year, month, earliestYear, earliestMonth } = current.data;
      this.activeYear.set(year);
      this.activeMonth.set(month);
      this.earliestYear.set(earliestYear);
      this.earliestMonth.set(earliestMonth);

      if (!this.hasCapturedCurrentMonth) {
        this.currentYear.set(year);
        this.currentMonth.set(month);
        this.hasCapturedCurrentMonth = true;
      }
    });
  }

  ngOnInit(): void {
    this.pendingYear.set(null);
    this.pendingMonth.set(null);
    this.summaryService.load();
  }

  onPrev(): void {
    const year = this.activeYear();
    const month = this.activeMonth();
    if (year === null || month === null || this.prevDisabled()) {
      return;
    }
    const prevMonth = month === 1 ? 12 : month - 1;
    const prevYear = month === 1 ? year - 1 : year;
    this.pendingYear.set(prevYear);
    this.pendingMonth.set(prevMonth);
    this.summaryService.load(prevYear, prevMonth);
  }

  onNext(): void {
    const year = this.activeYear();
    const month = this.activeMonth();
    if (year === null || month === null || this.nextDisabled()) {
      return;
    }
    const nextMonth = month === 12 ? 1 : month + 1;
    const nextYear = month === 12 ? year + 1 : year;
    this.pendingYear.set(nextYear);
    this.pendingMonth.set(nextMonth);
    this.summaryService.load(nextYear, nextMonth);
  }

  onRetry(): void {
    const year = this.pendingYear();
    const month = this.pendingMonth();
    if (year === null || month === null) {
      this.summaryService.load();
      return;
    }
    this.summaryService.load(year, month);
  }
}

import { Component, computed, input } from '@angular/core';
import { CategoryTotal } from '../../shared/api/monthly-summary.model';

@Component({
  selector: 'app-bar-chart',
  imports: [],
  templateUrl: './bar-chart.html',
  styleUrl: './bar-chart.scss',
})
export class BarChartComponent {
  // Rendered in the exact order given — the server already sorts largest-to-smallest.
  // No client-side re-sort here.
  readonly categories = input.required<CategoryTotal[]>();

  // The largest category in the currently selected month — categories[0] because the
  // server-given order is already sorted descending by amount. Re-derives whenever
  // `categories` changes (i.e. on every month switch), so bar widths re-normalize per month.
  protected readonly maxAmount = computed(() => {
    const cats = this.categories();
    return cats.length > 0 ? cats[0].amount : 0;
  });

  widthPercent(amount: number): number {
    const max = this.maxAmount();
    if (max <= 0) {
      return 0;
    }
    return (amount / max) * 100;
  }
}

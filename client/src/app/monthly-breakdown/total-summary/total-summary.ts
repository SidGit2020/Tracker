import { Component, input } from '@angular/core';

@Component({
  selector: 'app-total-summary',
  imports: [],
  templateUrl: './total-summary.html',
  styleUrl: './total-summary.scss',
})
export class TotalSummaryComponent {
  readonly totalAmount = input.required<number>();
}

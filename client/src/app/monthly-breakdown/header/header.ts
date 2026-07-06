import { Component, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-breakdown-header',
  imports: [RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class BreakdownHeaderComponent {
  readonly monthLabel = input<string>('');
  readonly prevDisabled = input<boolean>(true);
  readonly nextDisabled = input<boolean>(true);

  readonly prevClicked = output<void>();
  readonly nextClicked = output<void>();

  onPrev(): void {
    this.prevClicked.emit();
  }

  onNext(): void {
    this.nextClicked.emit();
  }
}

import { Component, input, output } from '@angular/core';

export type OverlayVariant = 'centered-dialog';

@Component({
  selector: 'app-overlay',
  imports: [],
  templateUrl: './overlay.html',
  styleUrl: './overlay.scss',
})
export class OverlayComponent {
  readonly variant = input<OverlayVariant>('centered-dialog');
  readonly titleText = input<string>('');
  readonly dismissed = output<void>();

  onScrimClick(): void {
    this.dismissed.emit();
  }
}

import { Injectable, signal } from '@angular/core';

export interface ToastItem {
  id: number;
  message: string;
  entryId: number;
}

const TOAST_DURATION_MS = 2500;

@Injectable({ providedIn: 'root' })
export class ToastService {
  private nextId = 0;
  private readonly toastsState = signal<ToastItem[]>([]);
  readonly toasts = this.toastsState.asReadonly();

  show(message: string, entryId: number, durationMs = TOAST_DURATION_MS): void {
    const id = this.nextId++;
    this.toastsState.update((list) => [{ id, message, entryId }, ...list]);

    setTimeout(() => {
      this.toastsState.update((list) => list.filter((toast) => toast.id !== id));
    }, durationMs);
  }

  isEntryHighlighted(entryId: number): boolean {
    return this.toastsState().some((toast) => toast.entryId === entryId);
  }
}

import { TestBed } from '@angular/core/testing';
import { ToastService } from './toast.service';

describe('ToastService', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    TestBed.configureTestingModule({});
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('stacks concurrent toasts most-recent-first, each dismissing independently on its own ~2.5s timer', () => {
    const service = TestBed.inject(ToastService);

    service.show('First', 1);
    vi.advanceTimersByTime(1000);
    service.show('Second', 2);

    expect(service.toasts().map((toast) => toast.message)).toEqual(['Second', 'First']);
    expect(service.isEntryHighlighted(1)).toBe(true);
    expect(service.isEntryHighlighted(2)).toBe(true);

    vi.advanceTimersByTime(1500);
    expect(service.toasts().map((toast) => toast.message)).toEqual(['Second']);
    expect(service.isEntryHighlighted(1)).toBe(false);
    expect(service.isEntryHighlighted(2)).toBe(true);

    vi.advanceTimersByTime(1000);
    expect(service.toasts()).toEqual([]);
    expect(service.isEntryHighlighted(2)).toBe(false);
  });
});

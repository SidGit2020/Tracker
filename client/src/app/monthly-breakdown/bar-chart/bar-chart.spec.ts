import { TestBed } from '@angular/core/testing';
import { BarChartComponent } from './bar-chart';
import { CategoryTotal } from '../../shared/api/monthly-summary.model';

describe('BarChartComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BarChartComponent],
    }).compileComponents();
  });

  function createFixture(categories: CategoryTotal[]) {
    const fixture = TestBed.createComponent(BarChartComponent);
    fixture.componentRef.setInput('categories', categories);
    fixture.detectChanges();
    return fixture;
  }

  it('renders one <button> row per category, in the exact given order (no client re-sort)', () => {
    const categories: CategoryTotal[] = [
      { category: { id: 1, name: 'Food' }, amount: 100 },
      { category: { id: 2, name: 'Transport' }, amount: 40 },
      { category: { id: 3, name: 'Shopping' }, amount: 70 }, // deliberately not amount-sorted
    ];
    const fixture = createFixture(categories);

    const rows: HTMLElement[] = Array.from(
      fixture.nativeElement.querySelectorAll('[data-testid="breakdown-chart-row"]'),
    );
    expect(rows.length).toBe(3);
    rows.forEach((row) => expect(row.tagName).toBe('BUTTON'));

    const labels = rows.map(
      (row) => row.querySelector('[data-testid="breakdown-chart-row-label"]')!.textContent!.trim(),
    );
    expect(labels).toEqual(['Food', 'Transport', 'Shopping']);
  });

  it('scales each bar relative to the largest (first) category', () => {
    const fixture = createFixture([
      { category: { id: 1, name: 'Food' }, amount: 100 },
      { category: { id: 2, name: 'Transport' }, amount: 25 },
    ]);

    const bars: HTMLElement[] = Array.from(fixture.nativeElement.querySelectorAll('.chart-row-bar'));
    expect(bars[0].style.width).toBe('100%');
    expect(bars[1].style.width).toBe('25%');
  });

  it('re-normalizes bar widths when categories change (month switch), not reusing the old max', () => {
    const fixture = createFixture([
      { category: { id: 1, name: 'Food' }, amount: 100 },
      { category: { id: 2, name: 'Transport' }, amount: 50 },
    ]);

    fixture.componentRef.setInput('categories', [
      { category: { id: 3, name: 'Shopping' }, amount: 40 },
      { category: { id: 1, name: 'Food' }, amount: 10 },
    ]);
    fixture.detectChanges();

    const bars: HTMLElement[] = Array.from(fixture.nativeElement.querySelectorAll('.chart-row-bar'));
    expect(bars[0].style.width).toBe('100%');
    expect(bars[1].style.width).toBe('25%');
  });

  it('renders nothing when categories is empty', () => {
    const fixture = createFixture([]);
    const rows = fixture.nativeElement.querySelectorAll('[data-testid="breakdown-chart-row"]');
    expect(rows.length).toBe(0);
  });
});

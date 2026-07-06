import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { MonthlyBreakdownComponent } from './monthly-breakdown';

interface SummaryPayload {
  year: number;
  month: number;
  totalAmount: number;
  categories: { category: { id: number; name: string }; amount: number }[];
  earliestYear: number;
  earliestMonth: number;
}

describe('MonthlyBreakdownComponent', () => {
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MonthlyBreakdownComponent],
      providers: [provideHttpClient(), provideHttpClientTesting(), provideRouter([])],
    }).compileComponents();
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  function expectSummaryRequest() {
    return httpMock.expectOne((r) => r.url.startsWith('/api/entries/monthly-summary'));
  }

  function flush(payload: Partial<SummaryPayload> = {}) {
    expectSummaryRequest().flush({
      year: 2026,
      month: 7,
      totalAmount: 4200,
      categories: [{ category: { id: 1, name: 'Food' }, amount: 4200 }],
      earliestYear: 2026,
      earliestMonth: 5,
      ...payload,
    });
  }

  it('shows skeleton placeholders while loading', () => {
    const fixture = TestBed.createComponent(MonthlyBreakdownComponent);
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('[data-testid="breakdown-skeleton"]')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('[data-testid="breakdown-total"]')).toBeFalsy();

    flush();
  });

  it('shows the Default state with total and chart populated', async () => {
    const fixture = TestBed.createComponent(MonthlyBreakdownComponent);
    fixture.detectChanges();

    flush();
    await fixture.whenStable();
    fixture.detectChanges();

    expect(
      fixture.nativeElement.querySelector('[data-testid="breakdown-total-amount"]').textContent,
    ).toContain('4200');
    expect(fixture.nativeElement.querySelectorAll('[data-testid="breakdown-chart-row"]').length).toBe(1);
    expect(fixture.nativeElement.querySelector('[data-testid="breakdown-empty"]')).toBeFalsy();
  });

  it('shows the Empty state ("No entries for {month} {year}") when categories is empty', async () => {
    const fixture = TestBed.createComponent(MonthlyBreakdownComponent);
    fixture.detectChanges();

    flush({ month: 5, totalAmount: 0, categories: [] });
    await fixture.whenStable();
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('No entries for May 2026');
    expect(fixture.nativeElement.querySelector('[data-testid="breakdown-chart"]')).toBeFalsy();
  });

  it('shows the Error state with inline message + Retry, and Retry re-fetches', async () => {
    const fixture = TestBed.createComponent(MonthlyBreakdownComponent);
    fixture.detectChanges();

    expectSummaryRequest().flush('error', { status: 500, statusText: 'Server Error' });
    await fixture.whenStable();
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('Could not load monthly summary');

    // Month selector must remain usable in the Error state.
    const monthSelector = fixture.nativeElement.querySelector(
      '[data-testid="breakdown-header-month-selector"]',
    );
    expect(monthSelector).toBeTruthy();

    const retryButton = fixture.nativeElement.querySelector(
      '[data-testid="breakdown-error"] button',
    ) as HTMLButtonElement;
    retryButton.click();

    flush();
    await fixture.whenStable();
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('[data-testid="breakdown-error"]')).toBeFalsy();
  });

  it('disables Next at the current month and Prev at the earliest month, re-fetching the adjacent month on click', async () => {
    const fixture = TestBed.createComponent(MonthlyBreakdownComponent);
    fixture.detectChanges();

    // Initial (no-params) load echoes back July 2026 as "current"; earliest data is June 2026.
    flush({ year: 2026, month: 7, earliestYear: 2026, earliestMonth: 6 });
    await fixture.whenStable();
    fixture.detectChanges();

    let prevButton = fixture.nativeElement.querySelector(
      '[data-testid="breakdown-month-prev"]',
    ) as HTMLButtonElement;
    let nextButton = fixture.nativeElement.querySelector(
      '[data-testid="breakdown-month-next"]',
    ) as HTMLButtonElement;
    expect(prevButton.disabled).toBe(false);
    expect(nextButton.disabled).toBe(true);

    prevButton.click();
    const prevReq = expectSummaryRequest();
    expect(prevReq.request.url).toContain('year=2026');
    expect(prevReq.request.url).toContain('month=6');
    prevReq.flush({
      year: 2026,
      month: 6,
      totalAmount: 500,
      categories: [],
      earliestYear: 2026,
      earliestMonth: 6,
    });
    await fixture.whenStable();
    fixture.detectChanges();

    prevButton = fixture.nativeElement.querySelector(
      '[data-testid="breakdown-month-prev"]',
    ) as HTMLButtonElement;
    nextButton = fixture.nativeElement.querySelector(
      '[data-testid="breakdown-month-next"]',
    ) as HTMLButtonElement;
    expect(prevButton.disabled).toBe(true); // now at earliest month
    expect(nextButton.disabled).toBe(false); // no longer at "current"

    nextButton.click();
    const nextReq = expectSummaryRequest();
    expect(nextReq.request.url).toContain('year=2026');
    expect(nextReq.request.url).toContain('month=7');
    nextReq.flush({
      year: 2026,
      month: 7,
      totalAmount: 4200,
      categories: [],
      earliestYear: 2026,
      earliestMonth: 6,
    });
    await fixture.whenStable();
    fixture.detectChanges();

    nextButton = fixture.nativeElement.querySelector(
      '[data-testid="breakdown-month-next"]',
    ) as HTMLButtonElement;
    expect(nextButton.disabled).toBe(true); // back at "current"
  });

  it('Retry re-fetches the month that actually failed, not the last successfully-shown month', async () => {
    const fixture = TestBed.createComponent(MonthlyBreakdownComponent);
    fixture.detectChanges();

    // Initial load succeeds showing July 2026.
    flush({ year: 2026, month: 7, earliestYear: 2026, earliestMonth: 5 });
    await fixture.whenStable();
    fixture.detectChanges();

    // Prev is clicked (requesting June 2026), but that request fails.
    const prevButton = fixture.nativeElement.querySelector(
      '[data-testid="breakdown-month-prev"]',
    ) as HTMLButtonElement;
    prevButton.click();
    const failedReq = expectSummaryRequest();
    expect(failedReq.request.url).toContain('month=6');
    failedReq.flush('error', { status: 500, statusText: 'Server Error' });
    await fixture.whenStable();
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('[data-testid="breakdown-error"]')).toBeTruthy();

    // Retry must re-request June (the month that failed), not July (the last successful month).
    const retryButton = fixture.nativeElement.querySelector(
      '[data-testid="breakdown-error"] button',
    ) as HTMLButtonElement;
    retryButton.click();
    const retryReq = expectSummaryRequest();
    expect(retryReq.request.url).toContain('year=2026');
    expect(retryReq.request.url).toContain('month=6');
    retryReq.flush({ year: 2026, month: 6, totalAmount: 0, categories: [], earliestYear: 2026, earliestMonth: 5 });
    await fixture.whenStable();
    fixture.detectChanges();
  });

  it('disables Prev/Next while a request is in flight, closing the rapid-click race window', async () => {
    const fixture = TestBed.createComponent(MonthlyBreakdownComponent);
    fixture.detectChanges();

    flush({ year: 2026, month: 7, earliestYear: 2026, earliestMonth: 5 });
    await fixture.whenStable();
    fixture.detectChanges();

    const prevButton = fixture.nativeElement.querySelector(
      '[data-testid="breakdown-month-prev"]',
    ) as HTMLButtonElement;
    const nextButton = fixture.nativeElement.querySelector(
      '[data-testid="breakdown-month-next"]',
    ) as HTMLButtonElement;
    expect(prevButton.disabled).toBe(false);

    prevButton.click();
    fixture.detectChanges();

    // While the prev-month request is still in flight, both nav buttons must be disabled.
    expect(prevButton.disabled).toBe(true);
    expect(nextButton.disabled).toBe(true);

    expectSummaryRequest().flush({
      year: 2026,
      month: 6,
      totalAmount: 0,
      categories: [],
      earliestYear: 2026,
      earliestMonth: 5,
    });
    await fixture.whenStable();
    fixture.detectChanges();
  });
});

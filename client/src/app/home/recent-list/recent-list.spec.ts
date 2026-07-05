import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { RecentListComponent } from './recent-list';

describe('RecentListComponent', () => {
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecentListComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('shows skeleton rows while loading', () => {
    const fixture = TestBed.createComponent(RecentListComponent);
    fixture.detectChanges();

    const skeletons = fixture.nativeElement.querySelectorAll('.recent-skeleton-row');
    expect(skeletons.length).toBeGreaterThan(0);

    httpMock.expectOne('/api/entries').flush([]);
  });

  it('shows the empty state when there are no entries this month', async () => {
    const fixture = TestBed.createComponent(RecentListComponent);
    fixture.detectChanges();

    httpMock.expectOne('/api/entries').flush([]);
    await fixture.whenStable();
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('No entries yet this month');
  });

  it('renders entry rows, slices by the selected count, and emits rowClicked', async () => {
    const fixture = TestBed.createComponent(RecentListComponent);
    const rowClicked = vi.fn();
    fixture.componentInstance.rowClicked.subscribe(rowClicked);
    fixture.detectChanges();

    const entries = Array.from({ length: 12 }, (_, i) => ({
      id: i + 1,
      amount: 10 + i,
      category: { id: 1, name: 'Food' },
      createdAt: new Date().toISOString(),
    }));
    httpMock.expectOne('/api/entries').flush(entries);
    await fixture.whenStable();
    fixture.detectChanges();

    let rows = fixture.nativeElement.querySelectorAll('[data-testid="home-recent-entry-row"]');
    expect(rows.length).toBe(10);

    rows[0].click();
    expect(rowClicked).toHaveBeenCalledWith(expect.objectContaining({ id: entries[0].id }));

    const select = fixture.nativeElement.querySelector(
      '[data-testid="home-recent-count-selector"]',
    ) as HTMLSelectElement;
    expect(select.value).toBe('10');

    select.value = '5';
    select.dispatchEvent(new Event('change'));
    fixture.detectChanges();

    rows = fixture.nativeElement.querySelectorAll('[data-testid="home-recent-entry-row"]');
    expect(rows.length).toBe(5);
  });

  it('shows an inline error with Retry on load failure, and Retry reloads', async () => {
    const fixture = TestBed.createComponent(RecentListComponent);
    fixture.detectChanges();

    httpMock.expectOne('/api/entries').flush('error', { status: 500, statusText: 'Server Error' });
    await fixture.whenStable();
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('Could not load entries');

    const retryButton = fixture.nativeElement.querySelector('.recent-error button') as HTMLButtonElement;
    retryButton.click();

    httpMock.expectOne('/api/entries').flush([]);
  });
});

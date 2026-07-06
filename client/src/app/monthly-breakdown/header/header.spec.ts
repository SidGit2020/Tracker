import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { BreakdownHeaderComponent } from './header';

describe('BreakdownHeaderComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BreakdownHeaderComponent],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  function createFixture() {
    const fixture = TestBed.createComponent(BreakdownHeaderComponent);
    fixture.detectChanges();
    return fixture;
  }

  it('renders the title and the given month label', () => {
    const fixture = createFixture();
    fixture.componentRef.setInput('monthLabel', 'June 2026');
    fixture.detectChanges();

    expect(
      fixture.nativeElement.querySelector('[data-testid="breakdown-header-title"]').textContent,
    ).toContain('Monthly Category Breakdown');
    expect(
      fixture.nativeElement.querySelector('[data-testid="breakdown-month-label"]').textContent,
    ).toContain('June 2026');
  });

  it('the home link navigates to /', () => {
    const fixture = createFixture();
    const link = fixture.nativeElement.querySelector(
      '[data-testid="breakdown-header-home-link"]',
    ) as HTMLAnchorElement;

    expect(link.textContent).toContain('+ Log an expense');
    expect(link.getAttribute('href')).toBe('/');
  });

  it('disables prev/next per input, at both boundaries independently', () => {
    const fixture = createFixture();

    fixture.componentRef.setInput('prevDisabled', true);
    fixture.componentRef.setInput('nextDisabled', false);
    fixture.detectChanges();

    let prevButton = fixture.nativeElement.querySelector(
      '[data-testid="breakdown-month-prev"]',
    ) as HTMLButtonElement;
    let nextButton = fixture.nativeElement.querySelector(
      '[data-testid="breakdown-month-next"]',
    ) as HTMLButtonElement;
    expect(prevButton.disabled).toBe(true);
    expect(nextButton.disabled).toBe(false);

    fixture.componentRef.setInput('prevDisabled', false);
    fixture.componentRef.setInput('nextDisabled', true);
    fixture.detectChanges();

    prevButton = fixture.nativeElement.querySelector(
      '[data-testid="breakdown-month-prev"]',
    ) as HTMLButtonElement;
    nextButton = fixture.nativeElement.querySelector(
      '[data-testid="breakdown-month-next"]',
    ) as HTMLButtonElement;
    expect(prevButton.disabled).toBe(false);
    expect(nextButton.disabled).toBe(true);
  });

  it('emits prevClicked/nextClicked when the enabled buttons are clicked', () => {
    const fixture = createFixture();
    fixture.componentRef.setInput('prevDisabled', false);
    fixture.componentRef.setInput('nextDisabled', false);
    fixture.detectChanges();

    const prevClicked = vi.fn();
    const nextClicked = vi.fn();
    fixture.componentInstance.prevClicked.subscribe(prevClicked);
    fixture.componentInstance.nextClicked.subscribe(nextClicked);

    (fixture.nativeElement.querySelector('[data-testid="breakdown-month-prev"]') as HTMLButtonElement).click();
    (fixture.nativeElement.querySelector('[data-testid="breakdown-month-next"]') as HTMLButtonElement).click();

    expect(prevClicked).toHaveBeenCalledTimes(1);
    expect(nextClicked).toHaveBeenCalledTimes(1);
  });
});

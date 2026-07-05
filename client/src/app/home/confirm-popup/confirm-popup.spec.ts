import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ConfirmPopupComponent } from './confirm-popup';

describe('ConfirmPopupComponent', () => {
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmPopupComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  function createFixture() {
    const fixture = TestBed.createComponent(ConfirmPopupComponent);
    fixture.componentRef.setInput('initialAmount', 150);
    fixture.componentRef.setInput('initialCategoryName', 'Food');
    fixture.detectChanges();
    return fixture;
  }

  it('emits cancelled when Cancel is clicked, without saving', () => {
    const fixture = createFixture();
    const cancelled = vi.fn();
    fixture.componentInstance.cancelled.subscribe(cancelled);

    const cancelButton = fixture.nativeElement.querySelector(
      '[data-testid="home-confirm-cancel"]',
    ) as HTMLButtonElement;
    cancelButton.click();

    expect(cancelled).toHaveBeenCalled();
    httpMock.expectNone('/api/entries');
  });

  it('saves successfully and emits saved with the created entry', async () => {
    const fixture = createFixture();
    const saved = vi.fn();
    fixture.componentInstance.saved.subscribe(saved);

    const savePromise = (fixture.componentInstance as unknown as { onConfirm(): Promise<void> }).onConfirm();

    const req = httpMock.expectOne('/api/entries');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ amount: 150, categoryName: 'Food' });
    req.flush({ id: 1, amount: 150, category: { id: 1, name: 'Food' }, createdAt: '2026-07-05T00:00:00Z' });

    await savePromise;

    expect(saved).toHaveBeenCalledWith(expect.objectContaining({ id: 1 }));
  });

  it('shows an inline error and preserves entered data when save fails', async () => {
    const fixture = createFixture();

    const savePromise = (fixture.componentInstance as unknown as { onConfirm(): Promise<void> }).onConfirm();

    const req = httpMock.expectOne('/api/entries');
    req.flush({ title: 'error' }, { status: 500, statusText: 'Server Error' });

    await savePromise;
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('Could not save entry');
    expect(fixture.nativeElement.querySelector('[data-testid="home-confirm-amount"]').textContent).toContain('150');
  });
});

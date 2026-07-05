import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { EditPopupComponent } from './edit-popup';
import { Entry } from '../../shared/api/entry.model';

describe('EditPopupComponent', () => {
  let httpMock: HttpTestingController;

  const entry: Entry = {
    id: 5,
    amount: 100,
    category: { id: 1, name: 'Food' },
    createdAt: '2026-07-01T00:00:00Z',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditPopupComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  function createFixture() {
    const fixture = TestBed.createComponent(EditPopupComponent);
    fixture.componentRef.setInput('entry', entry);
    fixture.detectChanges();
    return fixture;
  }

  it('saves changes via PUT and closes on success', async () => {
    const fixture = createFixture();
    const closed = vi.fn();
    fixture.componentInstance.closed.subscribe(closed);

    const savePromise = (fixture.componentInstance as unknown as { onSave(): Promise<void> }).onSave();

    const req = httpMock.expectOne('/api/entries/5');
    expect(req.request.method).toBe('PUT');
    req.flush({ ...entry, amount: 250 });

    await savePromise;

    expect(closed).toHaveBeenCalled();
  });

  it('requires a second tap to confirm delete, then deletes and closes', async () => {
    const fixture = createFixture();
    const closed = vi.fn();
    fixture.componentInstance.closed.subscribe(closed);

    const deleteButton = fixture.nativeElement.querySelector(
      '[data-testid="home-edit-delete"]',
    ) as HTMLButtonElement;

    deleteButton.click();
    fixture.detectChanges();
    expect(deleteButton.textContent).toContain('Confirm Delete');
    httpMock.expectNone('/api/entries/5');

    const deletePromise = (fixture.componentInstance as unknown as { onDelete(): Promise<void> }).onDelete();

    const req = httpMock.expectOne('/api/entries/5');
    expect(req.request.method).toBe('DELETE');
    req.flush(null, { status: 204, statusText: 'No Content' });

    await deletePromise;

    expect(closed).toHaveBeenCalled();
  });
});

import { TestBed } from '@angular/core/testing';
import { QuickAddComponent } from './quick-add';

describe('QuickAddComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuickAddComponent],
    }).compileComponents();
  });

  function createFixture() {
    const fixture = TestBed.createComponent(QuickAddComponent);
    fixture.detectChanges();
    return fixture;
  }

  it('disables Add Expense until both amount and category are set', () => {
    const fixture = createFixture();
    const submitButton = fixture.nativeElement.querySelector(
      '[data-testid="home-quickadd-submit"]',
    ) as HTMLButtonElement;
    expect(submitButton.disabled).toBe(true);

    const amountInput = fixture.nativeElement.querySelector(
      '[data-testid="home-quickadd-amount-input"]',
    ) as HTMLInputElement;
    amountInput.value = '150';
    amountInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(submitButton.disabled).toBe(true);

    const foodButton = fixture.nativeElement.querySelector(
      '[data-testid="home-quickadd-category-food"]',
    ) as HTMLButtonElement;
    foodButton.click();
    fixture.detectChanges();
    expect(submitButton.disabled).toBe(false);
  });

  it('selecting a preset deselects the custom category field and vice versa', () => {
    const fixture = createFixture();

    const foodButton = fixture.nativeElement.querySelector(
      '[data-testid="home-quickadd-category-food"]',
    ) as HTMLButtonElement;
    foodButton.click();
    fixture.detectChanges();
    expect(foodButton.classList.contains('category-button--selected')).toBe(true);

    const customInput = fixture.nativeElement.querySelector(
      '[data-testid="home-quickadd-category-custom-input"]',
    ) as HTMLInputElement;
    customInput.value = 'Books';
    customInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(foodButton.classList.contains('category-button--selected')).toBe(false);
    expect(customInput.value).toBe('Books');
  });

  it('emits submitted with amount and categoryName, and reset() clears the fields', () => {
    const fixture = createFixture();
    const submitted = vi.fn();
    fixture.componentInstance.submitted.subscribe(submitted);

    const amountInput = fixture.nativeElement.querySelector(
      '[data-testid="home-quickadd-amount-input"]',
    ) as HTMLInputElement;
    amountInput.value = '150';
    amountInput.dispatchEvent(new Event('input'));

    const foodButton = fixture.nativeElement.querySelector(
      '[data-testid="home-quickadd-category-food"]',
    ) as HTMLButtonElement;
    foodButton.click();
    fixture.detectChanges();

    const submitButton = fixture.nativeElement.querySelector(
      '[data-testid="home-quickadd-submit"]',
    ) as HTMLButtonElement;
    submitButton.click();

    expect(submitted).toHaveBeenCalledWith({ amount: 150, categoryName: 'Food' });

    fixture.componentInstance.reset();
    fixture.detectChanges();

    expect(amountInput.value).toBe('');
    expect(submitButton.disabled).toBe(true);
  });
});

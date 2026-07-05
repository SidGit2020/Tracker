import { Component, computed, model } from '@angular/core';

const PRESET_CATEGORIES = ['Food', 'Transport', 'Shopping', 'Other'] as const;

@Component({
  selector: 'app-category-selector',
  imports: [],
  templateUrl: './category-selector.html',
  styleUrl: './category-selector.scss',
})
export class CategorySelectorComponent {
  protected readonly presets = PRESET_CATEGORIES;

  readonly selectedCategory = model<string>('');

  protected readonly isCustomActive = computed(() => {
    const value = this.selectedCategory();
    return value !== '' && !(PRESET_CATEGORIES as readonly string[]).includes(value);
  });

  selectPreset(name: string): void {
    this.selectedCategory.set(name);
  }

  onCustomInput(value: string): void {
    this.selectedCategory.set(value);
  }

  isPresetSelected(name: string): boolean {
    return !this.isCustomActive() && this.selectedCategory() === name;
  }
}

import { Category } from './entry.model';

export interface CategoryTotal {
  category: Category;
  amount: number;
}

export interface MonthlySummary {
  year: number;
  month: number;
  totalAmount: number;
  categories: CategoryTotal[];
  earliestYear: number;
  earliestMonth: number;
}

export interface Category {
  id: number;
  name: string;
}

export interface Entry {
  id: number;
  amount: number;
  category: Category;
  createdAt: string;
}

export interface EntryInput {
  amount: number;
  categoryName: string;
}

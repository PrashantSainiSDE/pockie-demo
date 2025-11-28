export interface Product {
  id: number;
  title: string;
  company?: string;
  categoryId: number;
  subcategoryId?: number;
  categoryName?: string;
  price: number;
  discount?: number;
  images?: string[];
  isNew?: boolean;
  isFavorite?: boolean;
  stock?: number;
}

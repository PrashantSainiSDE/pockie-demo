export interface Product {
  id: number;
  title: string;
  description?: string;
  categoryId: number;
  price: number;
  discount?: number;
  images?: string[];
  isNew?: boolean;
  stock?: number;
}

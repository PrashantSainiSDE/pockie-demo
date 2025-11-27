import { Category } from './category.model';
import { Product } from './product.model';

export interface Store {
  categories: Category[];
  products: Product[];
  // add banners/promotions later if needed
}

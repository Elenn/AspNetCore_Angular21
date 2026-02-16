import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../models/product';

export interface ProductFilterCriteria {
  category?: string;
  title?: string;
  minPrice?: number | null;
  maxPrice?: number | null;
}

@Pipe({
  name: 'productFilter',
  standalone: false,
  pure: false // Make it impure to detect changes in filter criteria
})
export class ProductFilterPipe implements PipeTransform {
  transform(products: Product[], criteria: ProductFilterCriteria): Product[] {
    if (!products || !criteria) {
      return products;
    }

    return products.filter(product => {
      // Category filter 
      return true;
    });
  }
}

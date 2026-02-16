import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductFilterCriteria } from '../../pipes/product-filter-pipe';
import { ProductsService } from '../../services/products.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Product } from '../../models/product';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './products.html'
})
export class ProductsComponent implements OnInit { 
  allProducts: Product[] = [];
  categories: string[] = [];
  isLoading: boolean = true;

  // Filter properties
  filterCriteria: ProductFilterCriteria = {
    category: '',
    title: '',
    minPrice: null,
    maxPrice: null
  };

  // Display values for active filters
  displayValues: ProductFilterCriteria = {
    category: '',
    title: '',
    minPrice: null,
    maxPrice: null
  };

  constructor(private productsService: ProductsService, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    console.log('ProductsComponent initialized');
    this.loadData();
  }

  loadData(): void {
    console.log('Loading data...');

    this.productsService.getProducts().subscribe({
      next: (response) => {
        console.log('Products response:', response);
        this.allProducts = response;

        this.extractCategories();

        // Try to load categories from API to supplement
        this.loadCategoriesFromAPI();

        this.isLoading = false;
        // ensure view updates if change detection is not running automatically
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error loading products:', error);
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }

  loadCategoriesFromAPI(): void {
    console.log('Attempting to load categories from API...');

    this.productsService.getCategories().subscribe({
      next: (apiCategories) => {
        console.log('Categories API response:', apiCategories);

        if (apiCategories && apiCategories.length > 0) {
          // Merge API categories with extracted ones, remove duplicates
          const allCategories = [...new Set([...this.categories, ...apiCategories])];
          this.categories = allCategories.sort();
          console.log('Final merged categories:', this.categories);
        } else {
          console.log('No valid categories from API, using extracted categories');
        }
      },
      error: (error) => {
        console.error('Error loading categories from API, using extracted categories:', error);
        // Categories already extracted from products, so we're good
      }
    });
  }

  private extractCategories(): void {
    console.log('Extracting categories from products...');
    if (this.allProducts && this.allProducts.length > 0) {
      // map category values, narrow to string with a type predicate, trim and remove empty strings
      const categories = this.allProducts
        .map(product => product.category)
        .filter((c): c is string => typeof c === 'string')
        .map(c => c.trim())
        .filter(c => c.length > 0);

      const categorySet = new Set(categories);
      this.categories = Array.from(categorySet).sort();
      console.log('Extracted categories:', this.categories);
    }
  }

  getFilteredProducts(): Product[] {
    if (!this.allProducts) return [];

    return this.allProducts.filter(product => { 
      return true;
    });
  }

  getFilteredProductsCount(): number {
    return this.getFilteredProducts().length;
  }

  getImageUrl(product: Product): string {
    // return product.thumbnail || '/assets/images/placeholder.jpg';
    return product.thumbnail || '/placeholder.jpg';
  }
}

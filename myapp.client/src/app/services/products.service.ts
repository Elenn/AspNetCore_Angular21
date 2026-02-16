import { HttpClient, HttpErrorResponse } from '@angular/common/http'; 
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private baseUrl = 'https://localhost:7026'; 

  constructor(private http: HttpClient) { }

  //getProducts(): Observable<Product[]> {
  //  return this.http.get<Product[]>(this.apiUrl);
  //}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}/api/products`)
      .pipe(
        catchError(this.handleError)
      );
  } 

  createProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(`${this.baseUrl}/api/products`, product);
  }

  getCategories(): Observable<string[]> {
    return this.http.get<any>(`${this.baseUrl}/api/categories`)
      .pipe(
        map(response => {
          console.log('Raw categories API response:', response);

          // Handle different response formats
          let categories: string[] = [];

          if (Array.isArray(response)) {
            categories = response;
          } else if (response && Array.isArray(response.categories)) {
            categories = response.categories;
          } else if (response && typeof response === 'object') {
            // Sometimes the API might return an object, extract values
            categories = Object.values(response).filter(val => typeof val === 'string') as string[];
          }

          // Clean and format categories
          const cleanCategories = categories
            .filter(cat => cat && typeof cat === 'string')
            .map(cat => cat.trim())
            .filter(cat => cat.length > 0);

          console.log('Processed categories:', cleanCategories);
          return cleanCategories;
        }),
        catchError((error) => {
          console.error('Categories API error:', error);
          return throwError(() => error);
        })
      );
  }

  private handleError(error: HttpErrorResponse) {
    console.error('API Error:', error);
    return throwError(() => error);
  }
}

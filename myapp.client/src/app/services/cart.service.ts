import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product, CartItem } from '../models/product';

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: CartItem[] = [];
  private cartSubject = new BehaviorSubject<CartItem[]>([]);
  public cart$ = this.cartSubject.asObservable();
  private baseUrl = 'https://localhost:7026';

  constructor(private http: HttpClient) {
    this.loadCartFromStorage();
  }

  addToCart(product: Product, quantity: number = 1): Observable<void> {
    const existingItem = this.cartItems.find(item => item.product.id === product.id);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      this.cartItems.push({ product, quantity });
    }

    this.updateCart();

    const payload = {
      id: product.id,
      title: product.title,
    };

    return this.http.post<void>(`${this.baseUrl}/api/Cart/add`, payload);
  }

  removeFromCart(productId: number): void {
    this.cartItems = this.cartItems.filter(item => item.product.id !== productId);
    this.updateCart();
  }

  updateQuantity(productId: number, quantity: number): void {
    const item = this.cartItems.find(item => item.product.id === productId);
    if (item) {
      item.quantity = quantity;
      if (item.quantity <= 0) {
        this.removeFromCart(productId);
      } else {
        this.updateCart();
      }
    }
  }

  clearCart(): void {
    this.cartItems = [];
    this.updateCart();
  }

  getCartItems(): CartItem[] {
    return [...this.cartItems];
  }

  getCartCount(): number {
    return this.cartItems.reduce((count, item) => count + item.quantity, 0);
  }

  getCartTotal(): number {
    return this.cartItems.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  }

  private updateCart(): void {
    this.cartSubject.next([...this.cartItems]);
    this.saveCartToStorage();
  }

  private saveCartToStorage(): void {
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
  }

  private loadCartFromStorage(): void {
    const saved = localStorage.getItem('cart');
    if (saved) {
      this.cartItems = JSON.parse(saved);
      this.cartSubject.next([...this.cartItems]);
    }
  }
}

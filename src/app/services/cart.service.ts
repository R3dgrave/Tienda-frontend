import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Product } from '../types/product';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  http = inject(HttpClient);
  items: { product: Product, quantity: number }[] = [];
  constructor() { }

  init() {
    this.getCartsItem().subscribe(result => {
      this.items = result.filter(item => item.product && item.product.images?.length);
    });
  }
  
  getCartsItem() {
    return this.http.get<{ product: Product, quantity: number }[]>
      (environment.apiUrl + "/customer/carts")
  };

  addToCart(productId: string, quantity: number) {
    return this.http.post(environment.apiUrl + "/customer/carts/" + productId, {
      quantity: quantity,
    })
  }

  removeFromcart(productId: string) {
    return this.http.delete(environment.apiUrl + "/customer/carts/" + productId);
  }
}


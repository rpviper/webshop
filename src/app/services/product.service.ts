import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  url = "https://rainowebshop-default-rtdb.europe-west1.firebasedatabase.app/products.json" 
  cartChanged = new BehaviorSubject(true);    // see on cart et oleks navbaris

  constructor(private http: HttpClient) { }

getProductsFromDb() {
  return this.http.get<Product[]>(this.url)
 }

 addProductToDb(newProduct: Product) {
  return this.http.post(this.url, newProduct);
}

updateProductsInDb(updatedProducts: Product[]) {
  return this.http.put(this.url, updatedProducts)
}

}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  url = "https://rainowebshop-default-rtdb.europe-west1.firebasedatabase.app/products.json" 

  constructor(private http: HttpClient) { }

getProductsFromDb() {
  return this.http.get<Product[]>(this.url)
}

}

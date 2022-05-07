import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css']
})
export class ViewProductComponent implements OnInit {

  descriptionWordCount = 3;
  products: Product[] = [];
  url = "https://rainowebshop-default-rtdb.europe-west1.firebasedatabase.app/products.json";  // this is going to be so you dont have to type it under

  constructor(private productService: ProductService,
    private http: HttpClient
    ) { }

 

  ngOnInit(): void {
    this.productService.getProductsFromDb().subscribe(response => { 
      for (const key in response) {
        this.products.push(response[key]);
      }
  }); 
}


deleteProduct(product: Product) {
  const queueNumber = this.products.indexOf(product);
  this.products.splice(queueNumber, 1);
  this.http.put(this.url, this.products).subscribe();

    }   
  }

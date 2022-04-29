import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css']
})
export class ViewProductComponent implements OnInit {

  descriptionWordCount = 3;
  products: Product[] = [];
  url = "https://rainowebshop-default-rtdb.europe-west1.firebasedatabase.app/products.json";  // this is going to be so you dont have to type it under

  constructor(private http: HttpClient) { }

 

  ngOnInit(): void {
    this.http.get<Product[]>(this.url).subscribe(response => {   // here it is url  // subscribe is making things later than codes that come below
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

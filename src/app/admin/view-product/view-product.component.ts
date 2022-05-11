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

  descriptionWordCount = 5;
  products: Product[] = [];
  originalProducts: Product[] = [];
  url = "https://rainowebshop-default-rtdb.europe-west1.firebasedatabase.app/products.json";  // this is going to be so you dont have to type it under
  searchedProduct: string = "";

  constructor(private productService: ProductService,
    private http: HttpClient
    ) { }

 

  ngOnInit(): void {
    this.productService.getProductsFromDb().subscribe(response => { 
      for (const key in response) {
        this.products.push(response[key]);
        this.originalProducts.push(response[key]);
      }
  }); 
}


deleteProduct(product: Product) {
  const queueNumber = this.products.indexOf(product);
  this.products.splice(queueNumber, 1);
  this.http.put(this.url, this.products).subscribe();
    }  

 onFilterProducts() { // toLowerCase siis ei hooli kas trükid suured v väikesed tähed
   this.products = this.originalProducts.filter(element => element.name.toLocaleLowerCase().indexOf(this.searchedProduct.toLocaleLowerCase()) >= 0 ||   // filtreerimise funktsioon
   element.description.toLocaleLowerCase().indexOf(this.searchedProduct.toLocaleLowerCase()) >= 0 ||    // || => on or funktsioon
   element.id.toString().indexOf(this.searchedProduct.toLocaleLowerCase()) >= 0 )   // kuna see on numbri otsing siis oeab olema toString
    }
    
  }


  // 76BA491C5118D4DD2F27AF8EB78F039BC243
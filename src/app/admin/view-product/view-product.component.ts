import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css']
})
export class ViewProductComponent implements OnInit {


  products: any[] = [];
  url = "https://rainowebshop-default-rtdb.europe-west1.firebasedatabase.app/products.json";  // this is going to be so you dont have to type it under

  constructor(private http: HttpClient) { }

 

  ngOnInit(): void {
    this.http.get<any>(this.url).subscribe(response => {   // here it is url  // subscribe is making things later than codes that come below
      
      for (const key in response) {
        this.products.push(response[key]);
      }
    });  
   }  
  }

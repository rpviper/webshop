import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  product: any;
  products: any[] = [];
  url = "https://rainowebshop-default-rtdb.europe-west1.firebasedatabase.app/products.json";

  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get("productId");
    console.log(productId);
    this.http.get<any>(this.url).subscribe(response => { 
      for (const key in response) {
        this.products.push(response[key]);
      }
      this.product = this.products.find(element => Number(element.id) === Number(productId));
    });  
   
   }
  }




// rida 18
// window.location.href.split("muuda/")[1]
   // Angulari moodulit URL parameetri kättesaamiseks
   // 1. pöördun route muutuja abil ActivatedRoute klassi sisse
   // 2. snapshot võtab seisundi tolle hetke URL-st
   // 3. paramMap võtab kõik võti-väärtus paarid URL-st (URLs kooloniga)
   // 4. get() võtab sulgude sees antud võtme väärtuse URL-st
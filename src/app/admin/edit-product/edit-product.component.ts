import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';


@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  product: any;
  private products: any[] = [];
  changingForm: any
  categories: {categoryName: string}[] = [];
  url = "https://rainowebshop-default-rtdb.europe-west1.firebasedatabase.app/products.json";
  

  constructor(private route: ActivatedRoute,    // võimaldab võtta URL-st parameetrid
     private http: HttpClient,                  // võimaldab API päringuid teha
      private router: Router,
      private productService: ProductService) { }               // võimaldab URL-l liikuda läbi .ts

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get("productId");
    
    this.http.get<any>(this.url).subscribe(response => { 
      for (const key in response) {
        this.products.push(response[key]);
      }
      this.product = this.products.find(element => Number(element.id) === Number(productId));
      this.changingForm = new FormGroup ({
        id: new FormControl(this.product.id),   // selle pidin panema et saaks pärast kah muuta toodet
        name: new FormControl(this.product.name),
        description: new FormControl(this.product.description),
        category: new FormControl(this.product.category),
        price: new FormControl(this.product.price),
        imgSrc: new FormControl(this.product.imgSrc),
        isActive: new FormControl(this.product.isActive)
      });
    });   
}

changeProduct() {
  const queueNumber = this.products.indexOf(this.product);
  this.products[queueNumber] = this.changingForm.value;
  this.http.put(this.url, this.products).subscribe(()=>this.router.navigateByUrl("/admin/view") );
     // see suunab tagasi lehele instead of form.reset
   }

  }




  // this.route.snapshot.paramMap.get
// window.location.href.split("muuda/")[1]
   // Angulari moodulit URL parameetri kättesaamiseks
   // 1. pöördun route muutuja abil ActivatedRoute klassi sisse
   // 2. snapshot võtab seisundi tolle hetke URL-st
   // 3. paramMap võtab kõik võti-väärtus paarid URL-st (URLs kooloniga)
   // 4. get() võtab sulgude sees antud võtme väärtuse URL-st
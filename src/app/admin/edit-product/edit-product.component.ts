import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';


@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  
  products: Product[] = [];
  changingForm!: FormGroup
  categories: {categoryName: string}[] = [];
  url = "https://rainowebshop-default-rtdb.europe-west1.firebasedatabase.app/products.json";
  categoriesUrl = "https://rainowebshop-default-rtdb.europe-west1.firebasedatabase.app/categories.json";
  product!: Product;
  

  constructor(private route: ActivatedRoute,    // võimaldab võtta URL-st parameetrid
     private http: HttpClient,                  // võimaldab API päringuid teha
      private router: Router,
      private productService: ProductService) { }               // võimaldab URL-l liikuda läbi .ts

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get("productId");
    if (productId) {
      this.getProductsFromDb(productId);
    }
    this.getCategoriesFromDb();
    }
    
    private getProductsFromDb(productId: string) {
      this.productService.getProductsFromDb().subscribe(response => { 
        for (const key in response) {
          this.products.push(response[key]);
        }
        const productFound = this.products.find(element => Number(element.id) === Number(productId));
        if (productFound) {
          this.product = productFound;
        }
        this.initEditForm();
      }); 
    }
  
    private initEditForm() {
      this.changingForm = new FormGroup({
        id: new FormControl(this.product.id),
        name: new FormControl(this.product.name),
        price: new FormControl(this.product.price),
        imgSrc: new FormControl(this.product.imgSrc),
        category: new FormControl(this.product.category),
        description: new FormControl(this.product.description),
        isActive: new FormControl(this.product.isActive),
      })
    } 
  
    private getCategoriesFromDb() {
      this.http.get<{categoryName: string}[]>(this.categoriesUrl).subscribe(categoriesFromDb => {
        const newArray = [];
        for (const key in categoriesFromDb) {
          newArray.push(categoriesFromDb[key]);
        }
        this.categories = newArray;
      });
    }
  

changeProduct() {
  const queueNumber = this.products.indexOf(this.product);
  this.products[queueNumber] = this.changingForm.value;
  this.productService.updateProductsInDb(this.products).subscribe(()=>this.router.navigateByUrl("/admin/view") );
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
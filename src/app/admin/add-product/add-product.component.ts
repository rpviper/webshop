import { HttpClient} from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Product } from 'src/app/models/product.model';
import { CategoryService } from 'src/app/services/category.service';
import { ImageUploadService } from 'src/app/services/image-upload.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  url = "https://rainowebshop-default-rtdb.europe-west1.firebasedatabase.app/products.json";
  categoriesUrl = "https://rainowebshop-default-rtdb.europe-west1.firebasedatabase.app/categories.json";
  productId!: number;
  categories: string[] = [];
  products: Product[] = [];
  idUnique = false;
  selectedFile!: File;

  constructor(private http: HttpClient,
    private productService: ProductService,
    private categoryService: CategoryService,
    private imageUploadService: ImageUploadService) { }

  ngOnInit(): void {  // kui lähen lehele pannakse see kõigepealt käima, et oleks juba kategooriad olemas
    this.categoryService.getCategoriesFromDb().subscribe(categoriesFromDb => {   // see nüüd läheb sinna lisa toode dropdown menüüsse
     this.categoryService.categories = [];
     for (const key in categoriesFromDb) {
       this.categories.push(categoriesFromDb[key].category);
     }
    });
    this.productService.getProductsFromDb().subscribe(response => { 
      for (const key in response) {
        this.products.push(response[key]);
        }
  }); 
  }

addProduct(addingForm: NgForm)  {
  // this.http.post(this.url, addingForm.value).subscribe();
  const url = this.imageUploadService.uploadedPictureUrl;
  const val = addingForm.value;
  const newProduct = new Product(val.id,val.name, url, val.price, val.category,
    val.description, val.active);
  this.productService.addProductToDb(newProduct).subscribe();
  addingForm.reset();
}

onCheckIdUniqueness() {
  const index = this.products.findIndex(element => element.id === this.productId);
  if (index >= 0) {   // tee ise et oleks 8 kohaline ID number
    this.idUnique = false;
    // console.log("Mitteunikaalne ID!");
    } else {
      this.idUnique = true;
      // console.log("Kellelgi teisel ei ole");
    }
}

handleFileInput(event: any) {
  this.selectedFile = <File>event.target.files[0];
}

sendPictureToDb() {
  this.imageUploadService.uploadPicture(this.selectedFile);
}

}

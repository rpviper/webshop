import { HttpClient} from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  url = "https://rainowebshop-default-rtdb.europe-west1.firebasedatabase.app/products.json";
  categoriesUrl = "https://rainowebshop-default-rtdb.europe-west1.firebasedatabase.app/categories.json";

  categories: {categoryName: string}[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {  // kui lähen lehele pannakse see kõigepealt käima, et oleks juba kategooriad olemas
    this.http.get<{categoryName: string}[]>(this.categoriesUrl).subscribe(categoriesFromDb => {   // see nüüd läheb sinna lisa toode dropdown menüüsse
      const newArray = [];
      for (const key in categoriesFromDb) {
        newArray.push(categoriesFromDb[key]);
      }
      this.categories = newArray;
    });
  }

addProduct(addingForm: NgForm) {
  if (addingForm.valid) {
    this.http.post(this.url, addingForm.value).subscribe();
    addingForm.reset();
  }
}

}

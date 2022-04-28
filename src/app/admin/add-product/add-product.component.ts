import { HttpClient} from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  url = "https://rainowebshop-default-rtdb.europe-west1.firebasedatabase.app/products.json";

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

addProduct(form: any) {
  if (form.valid) {
    this.http.post(this.url, form.value).subscribe();
  }
}

}

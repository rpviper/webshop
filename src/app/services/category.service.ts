import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  categoriesUrl = "https://rainowebshop-default-rtdb.europe-west1.firebasedatabase.app/categories.json";

  constructor(private http: HttpClient) { }

getCategoriesFromDb() {
  return this.http.get<{categoryName: string}[]>(this.categoriesUrl)
}

}

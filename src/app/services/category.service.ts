import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  categories: {id: string, category: string}[] = [];
  categoriesUrl = "https://rainowebshop-default-rtdb.europe-west1.firebasedatabase.app/categories.json";

  constructor(private http: HttpClient) { }

getCategoriesFromDb() {
  return this.http.get<{category: string}[]>(this.categoriesUrl)
}

saveCategories() {
  return this.http.put(this.categoriesUrl, this.categories);
}

addCategory(category: string) {
  return this.http.post(this.categoriesUrl, {"category": category});
}

}

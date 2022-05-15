
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  // url = "https://rainowebshop-default-rtdb.europe-west1.firebasedatabase.app/categories.json"   // siin muutsime ära category.json
  categories: string[] = []

  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.categoryService.getCategoriesFromDb().subscribe(categoriesFromDb => {
      this.categoryService.categories = [];
      for (const key in categoriesFromDb) {
        this.categories.push(categoriesFromDb[key].category);
        this.categoryService.categories.push({id: key, category: categoriesFromDb[key].category});
      }
    })
  }

  onSubmit(form: NgForm) {
    this.categories.push(form.value.category);
    this.categoryService.categories.push(form.value.category);
    this.categoryService.addCategory(form.value.category).subscribe();
    form.reset();
  }

  onDeleteCategory(i: number) {
    this.categoryService.categories.splice(i, 1);
    this.categories.splice(i, 1);
    this.categoryService.saveCategories().subscribe(() => alert("Kustutatud!"));
  }
}

 





// ngOnInit(): void {
//   this.http.get<{categoryName: string}[]>(this.url).subscribe(categoriesFromDb => {
//     const newArray = [];
//     for (const key in categoriesFromDb) {
//       newArray.push(categoriesFromDb[key]);
//     }
//     this.categories = newArray;
//   });
// }

// onDeleteCategory(category: {categoryName: string}) {
//   const index = this.categories.findIndex(element => element.categoryName === category.categoryName)
//   this.categories.splice(index, 1);
//   this.http.put(this.url, this.categories).subscribe();
// }

// onSubmit(addCategoryForm: NgForm) {
//   this.http.post(this.url,addCategoryForm.value).subscribe(() => {
//     this.categories.push(addCategoryForm.value);
//   });
// }


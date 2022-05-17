import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { CartProduct } from '../models/cart.product.model';
import { Product } from '../models/product.model';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/300`);
  // on sama nagu:
  // images = [
  //   "https://picsum.photos/id/944/900/300",
  //   "https://picsum.photos/id/1011/900/300",
  //   "https://picsum.photos/id/984/900/300"
  // ];
  products: Product[] = [];
  url = "https://rainowebshop-default-rtdb.europe-west1.firebasedatabase.app/products.json";  // this is going to be so you dont have to type it under
  kuup2ev = new Date();
  protsent = 0.5;
  rahayhik = 1000000;
  lause = "vitamin well without sugar";
  categories: string[] = [];
  selectedCategory = "";
  originalProducts: Product[] = [];
  loggedIn = false;

   // 1. *ngFor
  // 2. objektid {url: "https://", header: "", text: "", alt: ""}
  // 3. HTML-s src={{image.url}}

  constructor(private productService: ProductService,
    private authService: AuthService) { }

 

  ngOnInit(): void {
    this.productService.getProductsFromDb().subscribe(response => {   // here it is url  // subscribe is making things later than codes that come below
      
      for (const key in response) {
        this.products.push(response[key]);
        this.originalProducts.push(response[key]);
      }
      this.categories = this.products.map(element => element.category);   // map asendab
      this.categories = [...new Set(this.categories)];
    });  

    this.authService.loggedInChanged.subscribe(loggedInFromSubject => {
      this.loggedIn = loggedInFromSubject;
    })
   }

   onFilterByCategory(category: string) {
    this.selectedCategory = category;
    if (category === '') {
      this.products = this.originalProducts;
    } else {
      this.products = this.originalProducts.filter(element => element.category === category);
    }
  }


  addToCart(productClicked: Product) {
     const cartItemsSS = sessionStorage.getItem("cartItems");
     let cartItems: CartProduct[] = [];
     if (cartItemsSS) {
       cartItems = JSON.parse(cartItemsSS)
     }
     const index = cartItems.findIndex(element => element.product.id === productClicked.id);
     if (index >= 0) {
      cartItems[index].quantity++;    // ++ suurendab ühe võrra, += 3 suurendab 3 võrra alati näiteks
    } else {
      const parcelMachineIndex = cartItems.findIndex(element => element.product.id === 11110000) // see oli selle jaoks et parcel maksumus jääks alati lõppu
      if (parcelMachineIndex >= 0) {
        cartItems.splice(parcelMachineIndex, 0, {product: productClicked, quantity: 1});
    } else {
      cartItems.push({product: productClicked, quantity: 1});
     }
    }
 // enne kui pushin otsi üles kas sellist toodet juba on ostukorvi esemete hulgas
    // sulgude seest tuleva eseme ID ---> product.id
    // otsin kas seda on cartItems seas  ----> .findIndex(element => element.id === product.id)
    // kui ON, siis teen ühte loogikat
    // kui EI OLE, siis teen teist loogikat
    // if ()  index >= 0  ---> suurendan kogust
    // else  index === -1  --->   lisan ostukorvi  .push abil 

     sessionStorage.setItem("cartItems", JSON.stringify(cartItems));
     this.productService.cartChanged.next(true);   // next tähendab et toimus muutus ostukorvis
      }

      onSortAZ() {
        this.products.sort((a,b) => a.name.trim().localeCompare(b.name));  // .trim() on tühikute ära võtmiseks lause eest (ebays olid mõned ees niimoodi)
      }

      onSortZA() {
        this.products.sort((a,b) => b.name.trim().localeCompare(a.name));
      }
    
      onSortPriceAsc() {
        this.products.sort((a,b) => a.price - b.price);
      }
    
      onSortPriceDesc() {
        this.products.sort((a,b) => b.price - a.price);
        //  this.products.sort((a,b) => -1*(a.price-b.price)); on sama
      }
      
      

}





// {-asdasd: {1}, -aqeqe, {2}}      [{1},{2}]   ---> forin tsükkel   (teeb objekti sees tsükli)
// const toode = {nimi: "Coca cola", hind: 3, kategooria: "coca", aktiivne: true}
// const newArray = [];
// for (const key in toode)    1. nimi   2. hind    3. kategooria    4. aktiivne                    
// toode[key]    1. "Coca cola"   2. 3   3. "coca"   4. true
// forin sees:    newArray.push(toode[key])     ->    ["Coca cola", 3, "coca", true];


// enne kui pushin otsi üles kas sellist toodet juba on ostukorvi esemete hulgas
    // sulgude seest tuleva eseme ID ---> product.id
    // otsin kas seda on cartItems seas  ----> .findIndex(element => element.id === product.id)
    // kui ON, siis teen ühte loogikat
    // kui EI OLE, siis teen teist loogikat
    // if ()  index >= 0  ---> suurendan kogust
    // else  index === -1  --->   lisan ostukorvi  .push abil 
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ToastService } from 'angular-toastify';
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

  // images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/300`);
  // on sama nagu:
  // images = [
  //   "https://picsum.photos/id/944/900/300",
  //   "https://picsum.photos/id/1011/900/300",
  //   "https://picsum.photos/id/984/900/300"
  // ];
  images: any[] = [];
  products: Product[] = [];
  url = "https://rainowebshop-default-rtdb.europe-west1.firebasedatabase.app/pictures.json";  // this is going to be so you dont have to type it under
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
    private authService: AuthService,
    private _toastService: ToastService,
    private translateService: TranslateService,
    private http: HttpClient
    ) { }

 

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
    this.http.get<{imgName: string}[]>(this.url).subscribe(imagesFromDb => {
      const newArray = [];
      for (const key in imagesFromDb) {
        newArray.push(imagesFromDb[key]);
      }
      this.images = newArray;
      console.log(this.images);
    });
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
      cartItems[index].quantity++;    // ++ suurendab ??he v??rra, += 3 suurendab 3 v??rra alati n??iteks
    } else {
      const parcelMachineIndex = cartItems.findIndex(element => element.product.id === 11110000) // see oli selle jaoks et parcel maksumus j????ks alati l??ppu
      if (parcelMachineIndex >= 0) {
        cartItems.splice(parcelMachineIndex, 0, {product: productClicked, quantity: 1});
    } else {
      cartItems.push({product: productClicked, quantity: 1});
     }
    }
 // enne kui pushin otsi ??les kas sellist toodet juba on ostukorvi esemete hulgas
    // sulgude seest tuleva eseme ID ---> product.id
    // otsin kas seda on cartItems seas  ----> .findIndex(element => element.id === product.id)
    // kui ON, siis teen ??hte loogikat
    // kui EI OLE, siis teen teist loogikat
    // if ()  index >= 0  ---> suurendan kogust
    // else  index === -1  --->   lisan ostukorvi  .push abil 

     sessionStorage.setItem("cartItems", JSON.stringify(cartItems));
     this.productService.cartChanged.next(true);   // next t??hendab et toimus muutus ostukorvis
     this._toastService.success(this.translateService.instant('Edukalt ') + 
     productClicked.name + 
     this.translateService.instant(' ostukorvi lisatud'));
  }
// this._toastService.success('Edukalt ' + productClicked.name + ' ostukorvi lisatud');
// this._toastService.success(`Edukalt ${productClicked.name} ostukorvi lisatud`);

      onSortAZ() {
        this.products.sort((a,b) => a.name.trim().localeCompare(b.name));  // .trim() on t??hikute ??ra v??tmiseks lause eest (ebays olid m??ned ees niimoodi)
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





// {-asdasd: {1}, -aqeqe, {2}}      [{1},{2}]   ---> forin ts??kkel   (teeb objekti sees ts??kli)
// const toode = {nimi: "Coca cola", hind: 3, kategooria: "coca", aktiivne: true}
// const newArray = [];
// for (const key in toode)    1. nimi   2. hind    3. kategooria    4. aktiivne                    
// toode[key]    1. "Coca cola"   2. 3   3. "coca"   4. true
// forin sees:    newArray.push(toode[key])     ->    ["Coca cola", 3, "coca", true];


// enne kui pushin otsi ??les kas sellist toodet juba on ostukorvi esemete hulgas
    // sulgude seest tuleva eseme ID ---> product.id
    // otsin kas seda on cartItems seas  ----> .findIndex(element => element.id === product.id)
    // kui ON, siis teen ??hte loogikat
    // kui EI OLE, siis teen teist loogikat
    // if ()  index >= 0  ---> suurendan kogust
    // else  index === -1  --->   lisan ostukorvi  .push abil 
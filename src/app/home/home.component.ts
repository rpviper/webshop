import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  products: any[] = [];
  url = "https://rainowebshop-default-rtdb.europe-west1.firebasedatabase.app/products.json";  // this is going to be so you dont have to type it under

  constructor(private http: HttpClient) { }

 

  ngOnInit(): void {
    this.http.get<any>(this.url).subscribe(response => {   // here it is url  // subscribe is making things later than codes that come below
      
      for (const key in response) {
        this.products.push(response[key]);
      }
    });  
      
  }
  addToCart(productClicked: any) {
     const cartItemsSS = sessionStorage.getItem("cartItems");
     let cartItems: any[] = [];
     if (cartItemsSS) {
       cartItems = JSON.parse(cartItemsSS)
     }
     const index = cartItems.findIndex(element => element.product.id === productClicked.id);
     if (index >= 0) {
      cartItems[index].quantity++;    // ++ suurendab ühe võrra, += 3 suurendab 3 võrra alati näiteks
     } else {
      cartItems.push({product: productClicked, quantity: 1});
     }

     sessionStorage.setItem("cartItems", JSON.stringify(cartItems));
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
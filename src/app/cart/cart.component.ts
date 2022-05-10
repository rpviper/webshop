import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CartProduct } from '../models/cart.product.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartProducts: CartProduct[] = [];
  totalSum = 0;
  totalItems = 0;
  parcelMachines: any[] = [];   // muutuja, kuhu panen väärtused pärast API päringut ja kuvan html-s
  selectedParcelMachine: any;


  constructor(private http: HttpClient) { }   // API päringute tegemiseks

  ngOnInit(): void {
    const cartItemsSS = sessionStorage.getItem("cartItems");
    if (cartItemsSS) {
      this.cartProducts = JSON.parse(cartItemsSS);
      this.cartTotalSum();
    }
    this.http.get<any[]>("https://www.omniva.ee/locations.json").subscribe(res => this.parcelMachines = res);
    this.selectedParcelMachine = sessionStorage.getItem("parcelMachine");
  }
  // JSON.parse ei pea tegema, sest ta tuleb stringina ja ta peabki olema string
    //    if-i pole vaja, sest kui ta on tühjus, pannakse selectedParcelMachine sisse tühjus

   //  get === võtmise päring
    //  <any[]> --- tüüp mida päringu järgselt kätte saadakse    
    // res --- kuhu tuleb tagastus
    // res => .....  --- funktsioon mis käivitub koheselt kui res kätte saadakse       
    // .subscribe --- viib päringu läbi, teeb asünkroonkseks (lubab koodil edasi minna) 
     // parcelMachines: any[] = []; // muutuja, kuhu panen väärtused pärast API päringut ja mida
    // kuvan HTML-s

  decreaseQuantity(cartProduct: CartProduct) {
    cartProduct.quantity--;
    if (cartProduct.quantity <= 0) {    // see on selle jaoks et ei läheks miinusesse ostukorv
      this.removeProduct(cartProduct);
 }
    sessionStorage.setItem("cartItems", JSON.stringify(this.cartProducts));
    this.cartTotalSum();
  }
  
  increaseQuantity(cartProduct: CartProduct) {
    cartProduct.quantity++; 
    sessionStorage.setItem("cartItems", JSON.stringify(this.cartProducts));
    this.cartTotalSum();
  }
  
  removeProduct(cartProduct: CartProduct) {
    const index = this.cartProducts.findIndex(element => element.product.id === cartProduct.product.id);
    if (index >= 0) {
    this.cartProducts.splice(index, 1);
    sessionStorage.setItem("cartItems", JSON.stringify(this.cartProducts));
    this.cartTotalSum();
    }
  }

  private cartTotalSum() {
    this.totalSum = 0;
    this.cartProducts.forEach(element => this.totalSum = this.totalSum + element.product.price * element.quantity);
    this.totalSum = Math.round((this.totalSum + Number.EPSILON) * 100) / 100   // this will round off to 2 decimals
    }

  emptyCart() {
    this.cartProducts = [];
    sessionStorage.setItem("cartItems", JSON.stringify(this.cartProducts));
    this.cartTotalSum();
  }

  onParcelMachineSelected() {
    sessionStorage.setItem("parcelMachine", this.selectedParcelMachine);
    this.cartProducts.push({
      product: {id: 11110000,name:"Pakiautomaadi tasu",price:3.5, imgSrc: "assets/locker.png",category: "",description: "",isActive: true},
      quantity: 1
    });
    sessionStorage.setItem("cartItems", JSON.stringify(this.cartProducts));
    this.cartTotalSum();
}
  unselectParcelMachine() {
    this.selectedParcelMachine = "";
    sessionStorage.removeItem("parcelMachine");
    this.removeProduct ({
      product: {id: 11110000,name:"Pakiautomaadi tasu",price:3.5, imgSrc: "assets/locker.png",category: "",description: "",isActive: true},
      quantity: 1
    });
  }

  toPay() {
    
  }

  }





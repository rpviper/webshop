import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartProducts: any[] = [];
  totalSum = 0;
  totalItems = 0;

  constructor() { }

  ngOnInit(): void {
    const cartItemsSS = sessionStorage.getItem("cartItems");
    if (cartItemsSS) {
      this.cartProducts = JSON.parse(cartItemsSS);
      this.cartTotalSum();
    }

  }
  decreaseQuantity(cartProduct: any) {
    cartProduct.quantity--;
    if (cartProduct.quantity <= 0) {    // see on selle jaoks et ei läheks miinusesse ostukorv
      this.removeProduct(cartProduct);
 }
    sessionStorage.setItem("cartItems", JSON.stringify(this.cartProducts));
    this.cartTotalSum();
  }
  
  increaseQuantity(cartProduct: any) {
    cartProduct.quantity++; 
    sessionStorage.setItem("cartItems", JSON.stringify(this.cartProducts));
    this.cartTotalSum();
  }
  
  removeProduct(cartProduct: any) {
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

  toPay() {
    
  }

  }



// ISESEISVALT: ostukorvi kogusumma
  // kui võtate hinna, siis peab olema element.product.price
  // korrutada läbi ka kogusega

  // MAKSMINE

  // TÜHJENDA NUPP

  // *ngIf'ga ära kustutamine kui on 0 toodet 
  // MAKSMISE NUPP ja TÜHJENDA NUPP


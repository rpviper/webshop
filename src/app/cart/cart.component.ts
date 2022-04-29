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

  constructor() { }

  ngOnInit(): void {
    const cartItemsSS = sessionStorage.getItem("cartItems");
    if (cartItemsSS) {
      this.cartProducts = JSON.parse(cartItemsSS);
      this.cartTotalSum();
    }

  }
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

  toPay() {
    
  }

  }





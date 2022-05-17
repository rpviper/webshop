import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from '../auth/auth.service';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {    // this. tuleb nendest viiest asjast alati
  sumOfCart = 0;
  loggedIn = false;

  constructor(private translate: TranslateService,
    private productService: ProductService,
    private authService: AuthService) { }    // siia oli vaja et töötaks  // this. tuleb nendest viiest asjast alati

  ngOnInit(): void {
    this.productService.cartChanged.subscribe(() => {
      const cartItemsSS = sessionStorage.getItem("cartItems");
      let cartProducts = [];
      if (cartItemsSS) {
        cartProducts = JSON.parse(cartItemsSS);
      }
      this.sumOfCart = 0;   // et ei tekiks arvutus probleeme cart totali ja navbar totali vahel
      cartProducts.forEach((element: any) => {
        this.sumOfCart += element.product.price * element.quantity;
      })
    });

    this.authService.loggedInChanged.subscribe(loggedInFromSubject => {
      this.loggedIn = loggedInFromSubject;
    })
  }
  useLanguage(language: string): void {
    this.translate.use(language);
}

  onLogout() {
    this.authService.loggedInChanged.next(false);
    this.authService.logout();
  }

}

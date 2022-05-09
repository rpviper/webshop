import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-shops-settings',
  templateUrl: './shops-settings.component.html',
  styleUrls: ['./shops-settings.component.css']
})
export class ShopsSettingsComponent implements OnInit {
  url = "https://rainowebshop-default-rtdb.europe-west1.firebasedatabase.app/shops.json";
  shops: {shopName: string,
  latitude: number,
  longitude: number,
  openTimes: string}[] = [];



  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<{shopName: string,
    latitude: number,
    longitude: number, openTimes: string}[]>(this.url).subscribe(shopsFromDb => {
      const newArray = [];
      for (const key in shopsFromDb) {
        newArray.push(shopsFromDb[key]);
      }
      this.shops = newArray;
    } )
  }

  onSubmit(form: NgForm) {
    this.http.post(this.url, form.value).subscribe();
    this.shops.push(form.value);
  }

  deleteShop(shop:{shopName: string}) {  
    const index = this.shops.findIndex(element => element.shopName === shop.shopName)
    this.shops.splice(index, 1);
    this.http.put(this.url, this.shops).subscribe();    
 }
 
}
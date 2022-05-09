import { HttpClient } from '@angular/common/http';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';   // siit tuleb see L

const iconRetinaUrl = 'assets/marker-icon-2x.png';
const iconUrl = 'assets/marker-icon.png';
const shadowUrl = 'assets/marker-shadow.png';
const iconDefault = L.icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});
L.Marker.prototype.options.icon = iconDefault;

@Component({
  selector: 'app-map',
  templateUrl: './shops.component.html',
  styleUrls: ['./shops.component.css']
})
export class ShopsComponent implements OnInit, AfterViewInit {

  url = "https://rainowebshop-default-rtdb.europe-west1.firebasedatabase.app/shops.json";
  shops: {shopName : string,
  latitude : number,
  longitude : number, openTimes: string}[] = [];
  private map!: L.Map;
  private lng = 58.5953;
  private lat = 25.0136;
  private zoom = 7; 
  private marker!: L.Marker;    // need L tulevad ülevalt rida 2
  private marker2!: L.Marker;

  private initMap(): void {
    this.map = L.map('map', {
      center: [ this.lng, this.lat ],
      zoom: this.zoom
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);

    // this.marker = L.marker([59.4341, 24.7489]);
    // this.marker.addTo(this.map);
    // this.marker.bindPopup("<div>Kristiine keskus</div><br><div>Lahtioleku aeg: 9 - 19</div>");
   
    // this.marker2 = L.marker([58.3771, 26.7405]);
    // this.marker2.addTo(this.map);
    // this.marker2.bindPopup("<div>Ahhaa keskus</div><br><div>Lahtioleku aeg: 9 - 17</div>");

    this.shops.forEach(element => {
      this.marker = L.marker([element.latitude, element.longitude]);
      this.marker.addTo(this.map);
      this.marker.bindPopup("<div>"+element.shopName+
      "</div><br><div>Lahtioleku aeg: "+element.openTimes+"</div>");
    })
   
  }
  constructor(private http: HttpClient) { }

  ngOnInit(): void { }

  ngAfterViewInit(): void {
    this.http.get<{shopName: string,
      latitude: number,
      longitude: number, openTimes: string}[]>(this.url).subscribe(shopsFromDb => {
        const newArray = [];
        for (const key in shopsFromDb) {
          newArray.push(shopsFromDb[key]);
        }
        this.shops = newArray;
        this.initMap();
      } )
    }
  
  onZoomShop(shopName: string) {
    const shopFound = this.shops.find(element => element.shopName === shopName);
    if (shopFound) {
      this.map.setView(L.latLng([shopFound.latitude, shopFound.longitude]),15);
      } else {
        this.map.setView(L.latLng([58.5953, 25.0136]),7);
      }
   

 }
}


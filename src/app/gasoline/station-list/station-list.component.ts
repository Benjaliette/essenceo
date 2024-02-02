import { Component, OnInit } from '@angular/core';
import { SearchService } from '../search.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import * as Leaflet from 'leaflet';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';

@Component({
  selector: 'app-station-list',
  standalone: true,
  imports: [
    CommonModule,
    LeafletModule
  ],
  templateUrl: './station-list.component.html',
  styleUrl: './station-list.component.scss'
})
export class StationListComponent implements OnInit {
  public displayedData: any;
  city: string | null = "";
  gasolineType: string | null = "";
  // options: Leaflet.MapOptions = {
  //   layers: getLayers(),
  //   zoom: 12,
  //   center: new Leaflet.LatLng(43.530147, 16.488932)
  // };
  icon = {
    icon: Leaflet.icon({
      iconSize: [ 25, 41 ],
      iconAnchor: [ 13, 0 ],
      iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
      shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png'
   })
};

  constructor(private searchService: SearchService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      this.city = params.get("ville");
      this.gasolineType = params.get("carburant");
    });

    if (this.city != null && this.gasolineType != null) {
      this.searchService.search(this.city, this.gasolineType)
      .subscribe(data => {
        this.displayedData = data.results;
        data.results.forEach((element: any) => {
          const marker = Leaflet.marker([element.latitude / 100000, element.longitude  / 100000], this.icon).addTo(map);
          marker.bindPopup(element.adresse.toLowerCase());
        });
      });
    }

    const map = Leaflet.map('map').setView([44.86, -0.612], 12);

    Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

  }
}

// export const getLayers = (): Leaflet.Layer[] => {
//   return [
//     new Leaflet.TileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//       attribution: '&copy; OpenStreetMap contributors'
//     } as Leaflet.TileLayerOptions),
//   ] as Leaflet.Layer[];
// };

// export const getMarkers = (): Leaflet.Marker[] => {
//   return [
//     new Leaflet.Marker(new Leaflet.LatLng(43.5121264, 16.4700729), {
//       icon: new Leaflet.Icon({
//         iconSize: [28, 41],
//         iconAnchor: [13, 41],
//         iconUrl: 'assets/blue-marker.png',
//       }),
//       title: 'Workspace'
//     } as Leaflet.MarkerOptions),
//     new Leaflet.Marker(new Leaflet.LatLng(43.5074826, 16.4390046), {
//       icon: new Leaflet.Icon({
//         iconSize: [28, 41],
//         iconAnchor: [13, 41],
//         iconUrl: 'assets/blue-marker.png',
//       }),
//       title: 'Riva'
//     } as Leaflet.MarkerOptions),
//   ] as Leaflet.Marker[];
// }

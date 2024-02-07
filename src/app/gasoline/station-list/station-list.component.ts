import { Component, OnInit, ViewChild } from '@angular/core';
import { SearchService } from '../search.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { SearchTerm } from '../search-terms';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-station-list',
  standalone: true,
  imports: [CommonModule],
  providers: [],
  templateUrl: './station-list.component.html',
  styleUrl: './station-list.component.scss',
})
export class StationListComponent implements OnInit {
  public displayedData: any;
  query: SearchTerm = {
    carburant: '',
    lat: '',
    lon: '',
  };

  map: mapboxgl.Map | undefined;
  style = 'mapbox://styles/mapbox/streets-v12';

  constructor(
    private searchService: SearchService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      this.query = {
        carburant: params.get('carburant'),
        lat: params.get('lat'),
        lon: params.get('lon'),
      };
    });

    this.map = new mapboxgl.Map({
      accessToken: process.env["MAP_API_KEY"],
      container: 'map',
      style: this.style,
      zoom: 11,
      center: [Number(this.query.lon), Number(this.query.lat)],
    });

    this.map.addControl(new mapboxgl.NavigationControl());

    if (this.query.carburant != null) {
      this.searchService
        .search(Number(this.query.lon), Number(this.query.lat), this.query.carburant)
        .subscribe((data) => {
          this.displayedData = data.results;
          data.results.forEach((element: any) => {
            if (this.map) {
              const popup = new mapboxgl.Popup({ offset: 25 }).setText(
                element.adresse
              );

              new mapboxgl.Marker()
                .setLngLat([
                  element.longitude / 100000,
                  element.latitude / 100000,
                ])
                .setPopup(popup)
                .addTo(this.map);
            }
          });
        });
    }
  }
}

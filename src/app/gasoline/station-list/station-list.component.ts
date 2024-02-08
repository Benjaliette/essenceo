import { Component, OnInit, ViewChild } from '@angular/core';
import { SearchService } from '../search.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { SearchTerm } from '../search-terms';
import * as mapboxgl from 'mapbox-gl';
import { AddressFormatterPipe } from '../address-formatter.pipe';
import { GasolineFormatterPipe } from '../gasoline-formatter.pipe';
import { ScheduleFormatterPipe } from '../schedule-formatter.pipe';

@Component({
  selector: 'app-station-list',
  standalone: true,
  imports: [
    CommonModule,
    AddressFormatterPipe,
    GasolineFormatterPipe,
    ScheduleFormatterPipe,
  ],
  providers: [
    AddressFormatterPipe,
    GasolineFormatterPipe,
  ],
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
    private route: ActivatedRoute,
    private addressPipe: AddressFormatterPipe,
    private gasolinePipe: GasolineFormatterPipe
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
      accessToken: process.env['MAP_API_KEY'],
      container: 'map',
      style: this.style,
      zoom: 12,
      center: [Number(this.query.lon), Number(this.query.lat)],
    });

    this.map.addControl(new mapboxgl.NavigationControl());

    if (this.query.carburant != null) {
      this.searchService
        .search(
          Number(this.query.lon),
          Number(this.query.lat),
          this.query.carburant
        )
        .subscribe((data) => {
          this.displayedData = data.results;
          data.results.forEach((element: any) => {
            if (this.map) {
              const popup = new mapboxgl.Popup({
                offset: 25,
                className: 'map-popup',
                focusAfterOpen: true,
                closeButton: false,
              }).setHTML(
                `<h3>${this.addressPipe.transform(element)}</h3>
                <p>${this.gasolinePipe.transform(this.query.carburant)}</p>
                <strong>${element.e10_prix} €</strong>
                `
              );

              const marker = new mapboxgl.Marker()
                .setLngLat([
                  element.longitude / 100000,
                  element.latitude / 100000,
                ])
                .setPopup(popup)
                .addTo(this.map);

              marker.getElement().addEventListener('click', (e) => {
                this.map?.flyTo({
                  center: marker.getLngLat(),
                  zoom: 13,
                });
              });
            }
          });
        });
    }
  }

  parseJSON(jsonString: string) {
    return JSON.parse(jsonString);
  }

  goToLocation(data: any) {
    this.map?.flyTo({
      center: [data.longitude / 100000, data.latitude / 100000],
      zoom: 13,
    });

    window.scrollTo({top: 0, behavior: 'smooth'})
  }
}

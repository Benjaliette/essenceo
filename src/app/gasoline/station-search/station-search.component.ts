import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { SearchService, Feature } from '../search.service';
import { AutocompleteSearchComponent } from '../autocomplete-search/autocomplete-search.component';
import { CommonModule } from '@angular/common';
import { NgxGpAutocompleteDirective, NgxGpAutocompleteModule } from '@angular-magic/ngx-gp-autocomplete';
import { Loader } from '@googlemaps/js-api-loader';
import { SearchTerm } from '../search-terms';
import { GoogleMapsModule } from '@angular/google-maps';

@Component({
  selector: 'app-station-search',
  standalone: true,
  imports: [
    NgxGpAutocompleteModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    GoogleMapsModule,
    AutocompleteSearchComponent,
  ],
  providers: [],
  templateUrl: './station-search.component.html',
  styleUrl: './station-search.component.scss',
})
export class StationSearchComponent implements OnInit {
  @ViewChild('ngxPlaces') placesRef: NgxGpAutocompleteDirective | undefined;
  myForm!: FormGroup;
  query: SearchTerm = {
    carburant: "",
    lat: "",
    lon: ""
  }
  options = {};
  addresses: any;

  constructor(private router: Router, private searchService: SearchService) {}

  ngOnInit(): void {
    this.myForm = new FormGroup({
      city: new FormControl('', Validators.required),
      gasolineType: new FormControl('', Validators.required),
    });
  }

  search() {
    this.query.carburant = this.myForm.controls['gasolineType'].value;
    this.router.navigate(['resultat'], {
      queryParams: this.query,
    });
  }

  handleInput(event: Event) {
    const searchTerm = (event.target as HTMLInputElement).value.toLowerCase();

    if (searchTerm && searchTerm.length > 2) {
      this.searchService
        .searchWord(searchTerm)
        .subscribe((features: Feature[]) => {
          this.addresses = features.map(feat => {
            return {
              place_name: feat.place_name,
              coords: feat.center,
              city: feat.text_fr,
            }
          });
        });
    } else {
      this.addresses = [];
    }
  }

  public getAddress(payload: any) {
    this.addresses = [];
    this.myForm.controls['city'].setValue(payload.place_name);
    this.query.lon = payload.coords[0];
    this.query.lat = payload.coords[1];
  }
}

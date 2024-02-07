import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable, Subject, catchError, map, of, tap } from 'rxjs';

export interface MapBoxOutput {
  attribution: string;
  features: Feature[];
  query: [];
}

export interface Feature {
  place_name: string;
  center: Number[];
  text_fr: string;
}

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  constructor(private http: HttpClient) { }

  search(lon: Number, lat: Number, gasolineType: string): Observable<any> {
    const url =
      `https://data.economie.gouv.fr/api/explore/v2.1/catalog/datasets/prix-des-carburants-en-france-flux-instantane-v2/records?
        where=distance%28geom%2C%20geom%27POINT%28${lon}%20${lat}%29%27%2C%20${'10km'}%29&order_by=gazole_prix%20asc&limit=100&offset=0&timezone=UTC&include_links=false&include_app_metas=false`;

    return this.http.get(url).pipe(
      catchError((error) => this.handleError(error, []))
    )
  }

  searchWord(query: string) {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/';
    return this.http.get(url + query + '.json?language=fr&access_token=' + process.env["MAP_API_KEY"])
      .pipe(map((res: any) => {
        return res.features;
      }))
  }

  private handleError(error: Error, errorValue: any) {
    return of(errorValue);
  }
}

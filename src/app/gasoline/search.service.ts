import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable, Subject, catchError, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  constructor(private http: HttpClient) { }

  search(city: string, gasolineType: string): Observable<any> {
    const url =
      `https://data.economie.gouv.fr/api/explore/v2.1/catalog/datasets/prix-des-carburants-en-france-flux-instantane-v2/records?where=ville%20like%20%22${city.toLowerCase()}%22&limit=10&offset=0&timezone=UTC&include_links=false&include_app_metas=false`;

    return this.http.get(url).pipe(
      tap((response) => (console.log(response))),
      catchError((error) => this.handleError(error, []))
    )
  }

  private handleError(error: Error, errorValue: any) {
    console.error(error);
    return of(errorValue);
  }
}

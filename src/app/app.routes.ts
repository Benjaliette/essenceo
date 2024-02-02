import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { StationListComponent } from './gasoline/station-list/station-list.component';
import { StationSearchComponent } from './gasoline/station-search/station-search.component';

export const routes: Routes = [
  {
    path: '',
    component: StationSearchComponent,
  },
  {
    path: 'resultat',
    component: StationListComponent ,
  },
];

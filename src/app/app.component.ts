import { Component } from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { RouterModule, RouterOutlet } from '@angular/router';
import { GasolineModule } from './gasoline/gasoline.module';
import { StationSearchComponent } from './gasoline/station-search/station-search.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    GasolineModule,
    StationSearchComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
}

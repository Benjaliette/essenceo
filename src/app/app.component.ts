import { Component } from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { RouterModule, RouterOutlet } from '@angular/router';
import { GasolineModule } from './gasoline/gasoline.module';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    LeafletModule,
    GasolineModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
}

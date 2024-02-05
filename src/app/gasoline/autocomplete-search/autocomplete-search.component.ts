import { CommonModule } from '@angular/common';
import { Component, Input, EventEmitter, Output } from '@angular/core';
import { Feature } from '../search.service';

@Component({
  selector: 'autocomplete-search',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './autocomplete-search.component.html',
  styleUrl: './autocomplete-search.component.scss'
})
export class AutocompleteSearchComponent {
  @Input() addresses: any;
  @Output() onSelect = new EventEmitter();

  select(event: any): void {
    const selectedAddress = this.addresses.filter((address: Feature) => {
      return address.place_name == (event.target as HTMLInputElement).innerText;
    })

    this.onSelect.emit(selectedAddress[0]);
  }
}

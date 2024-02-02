import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SearchService } from '../search.service';

@Component({
  selector: 'app-station-search',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './station-search.component.html',
  styleUrl: './station-search.component.scss'
})
export class StationSearchComponent implements OnInit {
  myForm!: FormGroup;

  constructor(private router: Router, private searchService: SearchService) {}

  ngOnInit(): void {
    this.myForm = new FormGroup({
      city: new FormControl('', Validators.required),
      gasolineType: new FormControl('Super 95 (E10)', Validators.required),
    });
  }

  search() {
    this.router.navigate(["resultat"], {queryParams: {
      ville: this.myForm.controls['city'].value,
      carburant: this.myForm.controls['gasolineType'].value
    }});
  }
}

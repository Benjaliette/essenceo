import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  myForm!: FormGroup;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.myForm = new FormGroup({
      city: new FormControl('', Validators.required),
      gasolineType: new FormControl('Super 95 (E10)', Validators.required)
    })
  }

  search() {
    console.log('Your form data : ', this.myForm.value);
    // this.router.navigate(["/results"]);
  }
}

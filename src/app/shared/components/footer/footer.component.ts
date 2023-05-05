import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {


  subscriptionForm = new FormGroup({
    emailField: new FormControl({ value: '', disabled: false }, [Validators.maxLength(50), Validators.required , Validators.email]),
  });

  constructor() { }

  ngOnInit(): void {
  }
  submitHandler() {
    this.subscriptionForm.setErrors({ 'incorrect': true });
    console.log(this.subscriptionForm.controls, 'submitHandler');
  }
}

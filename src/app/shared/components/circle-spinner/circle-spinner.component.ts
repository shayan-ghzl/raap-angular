import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-circle-spinner',
  templateUrl: './circle-spinner.component.html',
  styleUrls: ['./circle-spinner.component.scss'],
  inputs: ['size']
})
export class CircleSpinnerComponent implements OnInit {

  size = 'small';

  constructor() { }

  ngOnInit(): void {
  }

}

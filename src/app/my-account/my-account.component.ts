import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.scss']
})
export class MyAccountComponent implements OnInit {

  imagePreview = 'assets/images/kala.jpg';



  myOrders = [
    {
      'due_date':'17/04/1399',
      'state':'در انتظار پرداخت',
      'total_price':'79650'
    },
    {
      'due_date':'17/04/1399',
      'state':'در انتظار پرداخت',
      'total_price':'79650'
    },
    {
      'due_date':'17/04/1399',
      'state':'در انتظار پرداخت',
      'total_price':'79650'
    },
    {
      'due_date':'17/04/1399',
      'state':'در انتظار پرداخت',
      'total_price':'79650'
    },
  ];



  constructor() { }

  ngOnInit(): void {
  }

}

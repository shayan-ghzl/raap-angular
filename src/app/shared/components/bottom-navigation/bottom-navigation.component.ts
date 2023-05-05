import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bottom-navigation',
  templateUrl: './bottom-navigation.component.html',
  styleUrls: ['./bottom-navigation.component.scss']
})
export class BottomNavigationComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  secondaryMenu = [
    {
      name: 'خانه',
      routerLink: '/home',
      icon: 'icon-bottom-nav-home',
    },
    {
      name: 'سفارشات',
      routerLink: '/home',
      icon: 'icon-bottom-nav-home',
    },
    {
      name: 'سبد خرید',
      routerLink: '/home',
      icon: 'icon-bottom-nav-orders',
    },
  ]
  
}

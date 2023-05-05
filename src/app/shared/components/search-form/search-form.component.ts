import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss']
})
export class SearchFormComponent implements OnInit {

  searchForm = new FormGroup({
    searchField: new FormControl({ value: '', disabled: false }, [Validators.required]),
    searchSelect: new FormControl({ value: '0', disabled: false }, [Validators.required]),
  });

  searchOption = [
    {
      name: 'همه موارد',
      value: '0',
    },
    {
      name: 'هواپیما',
      value: '1',
    },
    {
      name: 'کشتی',
      value: '2',
    },
    {
      name: 'تانک',
      value: '3',
    },
  ];
  searchResult: {
    name: string;
    routerLink: string;
    categories: string[];
  }[] = [
      // {
      //   name: 'مداد شمعی گل گلی',
      //   routerLink: '/home',
      //   categories: ['لوازم التحریر']
      // },
      // {
      //   name: 'مداد شمعی گل گلی',
      //   routerLink: '/home',
      //   categories: ['لوازم التحریر']
      // },
      // {
      //   name: 'مداد شمعی گل گلی',
      //   routerLink: '/home',
      //   categories: ['لوازم التحریر']
      // },
    ]
  recentSearches = [
    {
      name: 'مداد شمعی گل گلی',
      routerLink: '/home',
    },
    {
      name: 'مداد شمعی گل گلی',
      routerLink: '/home',
    },
    {
      name: 'مداد شمعی گل گلی',
      routerLink: '/home',
    },
  ];

  constructor() { }

  ngOnInit(): void {
  }

  submitHandler() {
    this.searchForm.setErrors({ 'incorrect': true });
    console.log(this.searchForm.controls, 'submitHandler');
  }

}

declare function require(path: string);
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Member } from 'shared/models/member/member';

@Component({
  selector: 'app-searchproduct',
  templateUrl: './searchproduct.component.html',
  styleUrls: ['./searchproduct.component.css']
})
export class SearchproductComponent implements OnInit {
  imgPath = require('src/assets/images/rice2.jpg');

  constructor() {}

  /*  datasource: Product[];
    cars: Product[];
    totalRecords: number;
    cols: any[];
    loading: boolean; */

  members: any[];

  ngOnInit() {
    this.members = [
      {
        firstName: 'นายทดสอบ',
        lastName: 'ระบบ',
        telephone: '02-xxx-xxxx',
        buyDate: '28/9/2561',
        qty: 100
      }
    ];
  }
}

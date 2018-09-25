import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-addrice',
  templateUrl: './addrice.component.html',
  styleUrls: ['./addrice.component.css']
})
export class AddriceComponent implements OnInit {
  imgPath = require('src/assets/images/rice.jpg');

  constructor() { }

  ngOnInit() {
  }

}

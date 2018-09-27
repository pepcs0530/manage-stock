import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cashier',
  templateUrl: './cashier.component.html',
  styleUrls: ['./cashier.component.css']
})
export class CashierComponent implements OnInit {

  saleDate : Date;
    filteredRiceList = [];
   riceList = [{id : "x0001",name : "ประทุม ๑" ,price : 100},{id : "x0002",name : "ประทุม ๒" ,price : 120}]
   riceResult
   
   filteredCustomerList =[];
   customerList = [{id:'C0001',name:'สมปอง',tel:'080000080',address:'234/5 bangkok'}];
   custResults

   productList = [{id : "x0001",name : "ประทุม ๑" ,price : 100,amoung:1}];
   newProduct = {id : "x0001",name : "ประทุม ๑" ,price : 100,amoung:1}
  constructor() { }
  ngOnInit() {
 
  }

  text: string;

  results: string[];

  searchCustomer(event) {
    this.filteredCustomerList = [];
    for(let i = 0; i < this.customerList.length; i++) {
        let cust = this.customerList[i];
        if(cust.name.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
            this.filteredCustomerList.push(cust.name);
        }
    }
    this.custResults = this.filteredCustomerList
  }



  searchRice(event) {
    for(let i = 0; i < this.riceList.length; i++) {
        let rice = this.riceList[i];
        if(rice.name.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
            this.filteredRiceList.push(rice.name);
        }
    }
    this.results = this.filteredRiceList
  }
}

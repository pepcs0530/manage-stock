import { Component, OnInit } from '@angular/core';
import { OrderItem } from '@shared/models/cashier/order-item';
import { Order } from '@shared/models/cashier/order';
import { Customer } from '@shared/models/cashier/customer';
import { CashierService } from './cashier.service'
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

   order:Order ;
   
  text: string;

  customerAutomcomplete = {
    keyword:'',
    results:[]
  }

  results: string[];
  constructor(private cashierService:CashierService) { }
  ngOnInit() {
    this.order = new Order();
    this.order.date = new Date();
    this.order.receiptNo = '';
    this,this.order.discount = 0;
    this.order.customer = new Customer()
    this.order.itemList = [];
    this.addNewRow();
  }
 

  addNewRow(){
    let item = new OrderItem();
    item.id = '0';
    item.price = 0;
    item.quantity = 0;

    this.order.itemList.push(item);
  }

  searchCustomer(event) {
    console.log(this.customerAutomcomplete.keyword);
    this.order.customer.customer_name = this.customerAutomcomplete.keyword;
    this.customerAutomcomplete.results = [];
    this.cashierService.getCustomersByKeyword(this.customerAutomcomplete.keyword).subscribe(results =>{
      this.customerAutomcomplete.results = results
       console.log(this.customerAutomcomplete.results);
    })
    //this.customerAutomcomplete.results = [{name:'tom'} ,{name:'kun'}]
  }

  selectCustomer(value){
    console.log('selectCustomer',value);
    this.order.customer = value;
  }

  unfocusSearchCustomer(){
    console.log(this.customerAutomcomplete.keyword)
    console.log(this.customerAutomcomplete.results[0].customer_name)
    if(this.results == undefined || this.customerAutomcomplete.keyword != this.customerAutomcomplete.results[0].customer_name){
      this.order.customer = new Customer();
    }
    
    if(this.customerAutomcomplete.keyword == this.customerAutomcomplete.results[0].customer_name){
      this.order.customer = this.customerAutomcomplete.results[0]
    }
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
  paymentProcess(){
    console.log(this.order.customer)
    this.cashierService.saveOrder(this.order)
    .subscribe(res => {
        console.log(res)
    });
  }
}

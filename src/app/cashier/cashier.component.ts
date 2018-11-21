import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead/typeahead-match.class';
import { OrderItem } from '@shared/models/cashier/order-item';
import { Order } from '@shared/models/cashier/order';
import { Customer } from '@shared/models/cashier/customer';
import { CashierService } from './cashier.service'
import { Member } from '@shared/models/member/member';
@Component({
  selector: 'app-cashier',
  templateUrl: './cashier.component.html',
  styleUrls: ['./cashier.component.css']
})
export class CashierComponent implements OnInit {

  order:Order ;
  customerAutomcomplete = {
    keyword:'',
    results:[]
  };
  productAutocomplete = {
    keyword:'',
    results:[]
  };

  results: string[];
  constructor(private cashierService:CashierService) {}
  ngOnInit() {
    this.order = new Order();
    this.order.date = new Date();
    this.order.receiptNo = '';
    this,this.order.discount = 0;
    this.order.customer = new Customer()
    this.order.itemList = [];
    this.addNewRow();

    
    this.order.member_seq = 1
  }
 

  addNewRow(){
    let item = new OrderItem();
    item.product_id = null;
    item.name = '';
    item.price = 0;
    item.quantity = 0;
    this.order.itemList.push(item);
  }

  searchCustomer() {
    this.customerAutomcomplete.results = [];
    return this.cashierService.searchCustomersByName(this.order.customer.customer_name)
  }
  selectCustomer(value:TypeaheadMatch){
    this.order.customer.customer_id = value.item.customer_id;
    this.order.customer.customer_name = value.item.customer_name;
    this.order.customer.customer_phone = value.item.customer_phone;
    this.order.customer.customer_address = value.item.customer_address;
  }

  

  searchProduct(item:OrderItem){
    this.productAutocomplete.results = [];
    return this.cashierService.searchProductByName(item.name);
  }
  selectSearchProduct(event,item:OrderItem){
    console.log('event',event.item)
    item.product_id= event.item.product_id;
    item.name = event.item.product_name;
    item.quantity = 1;
    item.price = event.item.price;
    console.log(' item.name ', item)
  }

  paymentProcess(){
    console.log(this.order.customer)
    this.cashierService.saveOrder(this.order)
    .subscribe(res => {
        this.order.receiptNo = res.receipt;
    });
  }
}

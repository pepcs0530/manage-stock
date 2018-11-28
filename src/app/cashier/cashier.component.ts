import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead/typeahead-match.class';
import { OrderItem } from '@shared/models/cashier/order-item';
import { Order } from '@shared/models/cashier/order';
import { Customer } from '@shared/models/cashier/customer';
import { CashierService } from './cashier.service'
import { Member } from '@shared/models/member/member';
import {saveAs as importedSaveAs} from "file-saver";
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
    item.product_seq = null;
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
    item.product_seq= event.item.product_seq;
    item.name = event.item.rice_var_name;
    item.quantity = 1;
    item.max_quantity= event.item.product_quantity;
    item.price = event.item.price;
    console.log(' item.name ', item)
  }
  removeItem(i){
    if(this.order.itemList.length >1){ 
      let itemList=[]
      this.order.itemList.forEach((element,index) => {
        if(index!==i){
          itemList.push(element);
        }
      });
      this.order.itemList = itemList;
    }
  }
  paymentProcess(){
    console.log(this.order.customer)
    this.cashierService.saveOrder(this.order)
    .subscribe(res => {
        this.order.receiptNo = res.receiptNo;
    });
  }
  exportReceipt(){
    this.cashierService.exportReceipt(this.order).subscribe(blob => {
      importedSaveAs(blob,this.order.receiptNo+'.pdf');
    })
  }

}

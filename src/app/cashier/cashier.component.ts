import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { Moment } from 'moment';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead/typeahead-match.class';
import { OrderItem } from '@shared/models/cashier/order-item';
import { Order } from '@shared/models/cashier/order';
import { Customer } from '@shared/models/cashier/customer';
import { CashierService } from './cashier.service';
import { Member } from '@shared/models/member/member';
import { Router } from '../../../node_modules/@angular/router';
import { LoginService } from '../login/services/login/login.service';
// import { saveAs as importedSaveAs } from 'file-saver';
@Component({
  selector: 'app-cashier',
  templateUrl: './cashier.component.html',
  styleUrls: ['./cashier.component.css']
})
export class CashierComponent implements OnInit {

  order: Order;
  isSave: boolean;
  customerAutomcomplete = {
    keyword: '',
    results: []
  };
  productAutocomplete = {
    keyword: '',
    results: []
  };

  results: string[];
  authenFlag: boolean;
  display: boolean;
  constructor(private cashierService: CashierService, private router: Router, private loginService: LoginService) {
    if (this.loginService.isHaveSession()) {
      this.authenFlag = true;
      this.router.navigate(['/cashier']);
    } else {
      this.authenFlag = false;
      this.router.navigate(['/']);
    }
  }
  ngOnInit() {
    this.display = true;
    this.isSave = false;

    this.order = new Order();
    this.order.date = new Date();
    this.order.discount = 0;
    this.order.customer = new Customer();
    this.order.itemList = [];
    this.cashierService.getReceiptNo().subscribe(res => {
      this.order.receiptNo = res.receiptNo;
    });
    this.addNewRow();


    this.order.member_seq = 1;
  }


  addNewRow() {
    const item = new OrderItem();
    item.product_seq = null;
    item.name = '';
    item.price = 0;
    item.quantity = 0;
    this.order.itemList.push(item);
  }

  searchCustomer() {
    this.customerAutomcomplete.results = [];
    return this.cashierService.searchCustomersByName(this.order.customer.customer_name);
  }
  selectCustomer(value: TypeaheadMatch) {
    this.order.customer.customer_id = value.item.customer_id;
    this.order.customer.customer_name = value.item.customer_name;
    this.order.customer.customer_phone = value.item.customer_phone;
    this.order.customer.customer_address = value.item.customer_address;
  }



  searchProduct(item: OrderItem) {
    this.productAutocomplete.results = [];
    return this.cashierService.searchProductByName(item.name);
  }
  selectSearchProduct(event, item: OrderItem) {
    console.log('event', event.item);
    item.product_seq = event.item.product_seq;
    item.name = event.item.rice_var_name;
    item.quantity = 1;
    item.max_quantity = event.item.product_quantity;
    item.price = event.item.price;
    console.log(' item.name ', item);
  }
  removeItem(i) {
    if (this.order.itemList.length > 1) {
      const itemList = [];
      this.order.itemList.forEach((element, index) => {
        if (index !== i) {
          itemList.push(element);
        }
      });
      this.order.itemList = itemList;
    }
  }

  validateQuantity(item: OrderItem, min: number, max: number) {
    if (item.quantity > max) {
      alert('จำนวนสิค้สมีไม่พอ จงเลือกสินค้าจากล็อตอื่นเพิ่ม');
      item.quantity = max;
    } else if (item.quantity < min) {
      alert('จำนวนสินค้าต้องมากกว่าหรือเท่ากับ ' + min);
      item.quantity = min;
    }
  }
  validateOrder(): string {
    if (!this.order.customer.customer_name) return 'โปรดระบุชื่อลูกค้า'
    if (!this.order.customer.customer_phone) return 'โปรดระบุเบอร์โทรศัพท์ลูกค้า'
    if (!this.order.customer.customer_address) return 'โปรดระบุที่อยู่ลูกค้า'
    if (!this.order.date) return 'โปรดระบุวันที่ขายสินค้า'

    let errMsg = null;
    this.order.itemList.forEach(element => {
      if (!element.product_seq) { errMsg = 'โปรดเลือกสินค้า'; return false; }

      if (!element.quantity) { errMsg = 'โปรดระบุจำนวนสินค้า'; return false; }
      if (element.quantity > element.max_quantity) { errMsg = 'สินค้าไม่พอแก้ไขจำนวน หรือเปลี่ยนล็อตสินค้า'; }
      if (!element.price) { errMsg = 'โปรดระบุราคาสินค้า'; return false; }
    });

    return errMsg;
  }
  paymentProcess() {
    const errMsg = this.validateOrder();
    if (errMsg == null) {
      console.log(this.order.customer);
      this.cashierService.saveOrder(this.order)
        .subscribe(res => {
          this.order.receiptNo = res.receiptNo;
          this.isSave = true;
          alert('บันทึกการขายเรียบร้อย');
        });
    } else {
      alert(errMsg);
    }
  }
  exportReceipt() {
    this.cashierService.exportReceipt(this.order).subscribe(blob => {

    });
  }

}

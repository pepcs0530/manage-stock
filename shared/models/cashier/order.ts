import { Customer } from "./customer";
import { OrderItem } from "./order-item";

export class Order{
    id:string;
    customer:Customer;
    date:Date;
    receiptNo:string;
    itemList:OrderItem[];
    discount:number;
    member_seq:number;
    get pricelist():number[]{
             return this.itemList.map(function (curr){
            return curr.price*curr.quantity
        } )  
    }
    get  totalPrice():number{
        return this.pricelist.reduce(function (prev,curr){
            return prev + curr;
        }) - this.discount;
    }
}
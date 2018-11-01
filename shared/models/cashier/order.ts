import { Customer } from "./customer";
import { OrderItem } from "./order-item";

export class Order{
    id:string;
    customer:Customer;
    date:Date;
    receiptNo:string;
    itemList:OrderItem[];
    discount:number;
    get  totalPrice():number{
        return this.itemList.map(function (curr){
            return curr.price
        } ).reduce(function (prev,curr){
            return prev + curr;
        }) - this.discount;
    }
}
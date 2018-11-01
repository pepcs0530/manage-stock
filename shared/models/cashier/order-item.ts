import { Product } from "../product/product";

export class OrderItem{
    id:string;
    item:Product;
    quantity:number;
    price:number;
}
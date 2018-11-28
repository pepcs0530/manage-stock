export class Customer {
    customer_id?: any = null;
    customer_name?: any = null;
    customer_phone?: any = null;
    customer_address?: any = null;

    // join order
    order_id?: any = null;
    receipt?: any = null;
    issuedate?: any = null;
    discount?: any = null;
    member_seq?: any = null;

    // join order_item
    item_seq?: any = null;
    product_id?: any = null;
    quantity?: any = null;
    price?: any = null;
    product_seq?: any = null;
}

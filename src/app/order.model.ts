export interface Order {
    orderNumber: number;
    customer: string;
    total: number;
    orderLines: OrderLine[];
  }
  
  export interface OrderLine {
    product: string;
    quantity: number;
    total: number;
  }
  
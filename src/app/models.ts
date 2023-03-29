export class Product {
  name: string | undefined;
  price: number | undefined;
}

export class Customer {
  name: string | undefined;
}

export class OrderLine {
  product?: Product | null;
  quantity: number | undefined;
  total: number | undefined;
}

export class Order {
  orderNumber: number | undefined;
  customer: Customer | undefined;
  orderLines: OrderLine[] = [];
  total: number | undefined;
}

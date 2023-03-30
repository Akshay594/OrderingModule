import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Customer, Order, OrderLine, Product } from './models';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private orders: Order[] = [
    {
      orderNumber: 1,
      customer: { name: 'John Doe' },
      orderLines: [
        { product: { name: 'Product 1', price: 10 }, quantity: 2, total: 20 },
        { product: { name: 'Product 2', price: 20 }, quantity: 1, total: 20 }
      ],
      total: 40
    },
    {
      orderNumber: 2,
      customer: { name: 'Jane Doe' },
      orderLines: [
        { product: { name: 'Product 3', price: 30 }, quantity: 2, total: 60 }
      ],
      total: 60
    }
  ];

  getOrders(): Observable<Order[]> {
    return of(this.orders);
  }


  getOrder(orderNumber: number): Observable<Order | null> {
    const order = this.orders.find(order => order.orderNumber === orderNumber);
    if (order) {
      return of(order);
    } else {
      return of(null);
    }
  }

  addOrder(order: Order): void {
    this.orders.push(order);
  }
  

  saveOrder(order: Order): Observable<boolean> {
    // code to save the order
    return of(true);
  }

  getProducts(): Observable<Product[]> {
    // code to fetch products from backend
    return of([      { name: 'Product 1', price: 10 },      { name: 'Product 2', price: 20 },      { name: 'Product 3', price: 30 }    ]);
  }

  getCustomers(): Observable<Customer[]> {
    // code to fetch customers from backend
    return of([      { name: 'John Doe' },      { name: 'Jane Doe' },      { name: 'Bob Smith' }    ]);
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Order, Product, Customer, OrderLine } from '../models';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {
  order$: Observable<Order | null> = of(null);
  products$: Observable<Product[]> = of([]);
  customers$: Observable<Customer[]> = of([]);

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      map(paramMap => paramMap.get('orderNumber')),
      switchMap(orderNumber => {
        if (orderNumber) {
          const orderId = +orderNumber;
          return this.orderService.getOrder(orderId);
        } else {
          return of(null);
        }
      })
    ).subscribe(order => {
      this.order$ = of(order);
    });

    this.products$ = this.orderService.getProducts();
    this.customers$ = this.orderService.getCustomers();
  }

  addOrderLine(): void {
    this.order$ = this.order$.pipe(
      map(order => {
        if (order) {
          const orderLine: OrderLine = { product: null, quantity: 0, total: 0 };
          order.orderLines.push(orderLine);
          return order;
        } else {
          return null;
        }
      })
    );
  }
  
  updateOrderLineTotal(orderLine: OrderLine): void {
    if (orderLine.product?.price && orderLine.quantity !== undefined) {
      orderLine.total = orderLine.quantity * orderLine.product.price;
    }
  }
  
  

  removeOrderLine(index: number): void {
    this.order$ = this.order$.pipe(
      map(order => {
        if (order) {
          order.orderLines.splice(index, 1);
          return order;
        } else {
          return null;
        }
      })
    );
  }

  saveOrder(order: Order): void {
    this.orderService.saveOrder(order).subscribe();
  }

  trackByFn(index: number, item: any): number {
    return index;
  }
}

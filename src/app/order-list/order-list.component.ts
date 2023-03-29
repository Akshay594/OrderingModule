import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Order } from '../models';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {
  orders$: Observable<Order[]> = this.orderService.getOrders();

  constructor(
    private orderService: OrderService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  viewOrder(orderNumber: number): void {
    this.router.navigate(['/orders', orderNumber]);
  }

  trackByFn(index: number, item: any): number {
    return item.orderNumber;
  }
}

import { Component } from '@angular/core';
import { OrderService } from '../order.service';
import { Order } from '../models';

@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.css']
})
export class AddOrderComponent {
  order: Order = new Order();

  constructor(private orderService: OrderService) { }

  addOrder(): void {
    this.orderService.addOrder(this.order);
    this.order = new Order();
  }
}

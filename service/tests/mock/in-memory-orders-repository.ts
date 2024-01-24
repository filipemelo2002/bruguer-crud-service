import { Order } from "@entities/order";
import { OrderRepository } from "@repositories/order-repository";

export class InMemoryOrdersRepository implements OrderRepository {
  public orders: Order[] = [];
  
  async create(order: Order): Promise<void> {
    this.orders.push(order);
  }

  async list(): Promise<Order[]> {
    return this.orders
  }
}
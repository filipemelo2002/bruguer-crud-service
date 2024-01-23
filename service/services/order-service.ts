import { Order } from "@entities/order";
import { OrderRepository } from "@repositories/order-repository";
import { inject, injectable } from "inversify";

@injectable()
export class OrderService {
  constructor(@inject(OrderRepository) private repository: OrderRepository) {
  }

  async create(order: Order) {
    await this.repository.create(order);
  }

}
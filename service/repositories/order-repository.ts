import { Order } from "@entities/order";

export abstract class OrderRepository {
  abstract create(order: Order): Promise<void>;
  abstract list(): Promise<Order[]>;
}
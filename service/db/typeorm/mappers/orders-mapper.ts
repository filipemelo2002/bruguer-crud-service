import { Order } from "@entities/order";
import { OrderModel } from "../models/order";
import { OrderItemsMapper } from "./order-items-mapper";

export class OrdersMapper {
  static toDomain(order: OrderModel) {
    return new Order({
      items: order.items.map(OrderItemsMapper.toDomain)
    }, order.id)
  }
}
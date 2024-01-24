import { OrderItem } from "@entities/order-item";
import { OrderItemModel } from "../models/order-item";
import { SnackMapper } from "./snack-mapper";

export class OrderItemsMapper {
  static toDomain(orderItem: OrderItemModel) {
    return new OrderItem({
      price: orderItem.price,
      quantity: orderItem.quantity,
      snackId: orderItem.snack.id,
      notes: orderItem.notes,
      snack: SnackMapper.toDomain(orderItem.snack)
    }, orderItem.id)
  }
}
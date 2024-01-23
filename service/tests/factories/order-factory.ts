import { Order } from "@entities/order";
import { makeOrderItem } from "./order-item-factory";

export function makeOrder({
  id = 'order-id-1',
  items = [makeOrderItem({})]
}) {
  return new Order({
    items
  }, id)
}
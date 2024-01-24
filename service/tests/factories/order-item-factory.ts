import { OrderItem } from "@entities/order-item";
import { makeSnack } from "./snack-factory";

export function makeOrderItem({
  id = 'order-item-1',
  price = 34.2,
  quantity = 1,
  snackId = 'snack-id-1',
  notes = 'some abritrary note here.',
  snack = makeSnack({id: 'snack-id-1'})
}) {
  return new OrderItem({
    price,
    quantity,
    snackId,
    notes,
    snack
  }, id)
}
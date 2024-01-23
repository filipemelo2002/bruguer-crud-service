import { OrderItem } from "@entities/order-item";

export function makeOrderItem({
  id = 'order-item-1',
  price = 34.2,
  quantity = 1,
  snackId = 'snack-id-1',
  notes = 'some abritrary note here.'
}) {
  return new OrderItem({
    price,
    quantity,
    snackId,
    notes
  }, id)
}
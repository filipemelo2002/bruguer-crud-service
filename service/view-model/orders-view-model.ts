import { Order } from "@entities/order";

export class OrdersViewModel {
  static toHTTP(order: Order) {
    return {
      id: order.id,
      items: order.items.map(item => ({
        id: item.id,
        notes: item.notes,
        price: Number(item.price),
        snackId: item.snackId,
        quantity: item.quantity,
        name: item.snack.name
      }))
    }
  }
}
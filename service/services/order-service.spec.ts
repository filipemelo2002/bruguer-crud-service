import { OrderService } from "./order-service";
import { InMemoryOrdersRepository } from "@tests/mock/in-memory-orders-repository";
import { makeOrder } from "@tests/factories/order-factory";

describe('Snack Service', () => {
  const repository = new InMemoryOrdersRepository();
  const service = new OrderService(repository);

  beforeEach(() => {
    repository.orders = []
  })

  it('should create an order', async () => {
    const order = makeOrder({});

    await service.create(order);

    expect(repository.orders).toContain(order);
  })
})

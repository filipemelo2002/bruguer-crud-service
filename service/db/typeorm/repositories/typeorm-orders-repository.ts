import { Order } from "@entities/order";
import { OrderRepository } from "@repositories/order-repository";
import { inject, injectable } from "inversify";
import { DataSource, Repository } from "typeorm";
import { OrderModel } from "../models/order";
import { OrderItemModel } from "../models/order-item";
import { SnackModel } from "../models/snack";
import { SnackNotFound } from "@errors/snack-not-found";
import { OrdersMapper } from "../mappers/orders-mapper";

@injectable()
export class TypeORMOrdersRepository implements OrderRepository {
  private repository: Repository<OrderModel>;
  private orderItemRepository: Repository<OrderItemModel>;
  private snackRepository: Repository<SnackModel>;

  constructor(
    @inject(DataSource) private service: DataSource
  ) {
    this.repository = this.service.getRepository<OrderModel>(OrderModel);
    this.orderItemRepository = this.service.getRepository<OrderItemModel>(OrderItemModel);
    this.snackRepository = this.service.getRepository<SnackModel>(SnackModel);
  }

  async create(order: Order): Promise<void> {
    const orderModel = await this.repository.save({
      id: order.id
    });

    const items = [];
    for await (const item of order.items) {
      const snack = await this.snackRepository.findOne({ where: { id: item.snackId } });
      
      if (!snack) {
        throw new SnackNotFound();
      }
      
      item.price = snack.price;
      const orderItemModel = new OrderItemModel();
      orderItemModel.id = item.id;
      orderItemModel.quantity = item.quantity;
      
      if (item.notes) {
        orderItemModel.notes = item.notes;
      }
      
      orderItemModel.snack = snack;
      orderItemModel.order = orderModel;
      orderItemModel.price = snack.price;

      items.push(orderItemModel);
    }

    await this.orderItemRepository.save(items);
  }

  async list(): Promise<Order[]> {
    const orderModels = await this.repository.createQueryBuilder("orders")
    .leftJoinAndSelect("orders.items", "orderItems")
    .leftJoinAndSelect("orderItems.snack", "snack")
    .getMany()

    return orderModels.map(OrdersMapper.toDomain)
  }
}
import { Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { OrderItemModel } from "./order-item";
import { OrderItem } from "@entities/order-item";

@Entity("orders")
export class OrderModel {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @OneToMany(() => OrderItemModel, (orderItem) => orderItem.order)
  items: OrderItem[];
}
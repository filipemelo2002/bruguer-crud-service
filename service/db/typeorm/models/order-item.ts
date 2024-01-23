import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { SnackModel } from "./snack";
import { OrderModel } from './order';

@Entity("orderitem")
export class OrderItemModel {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("int")
  quantity: number;

  @Column("decimal")
  price: number;

  @ManyToOne(() => SnackModel)
  snack: SnackModel;

  @Column({
    type: 'text',
    nullable: true
  })
  notes: string;

  @ManyToOne(() => OrderModel)
  order: OrderModel
}
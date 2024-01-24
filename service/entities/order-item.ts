import { randomUUID } from "crypto";
import { Snack } from "./snack";

export interface OrderItemProps {
  snackId: string;
  quantity: number;
  notes?: string;
  price: number;
  snack: Snack;
}
export class OrderItem {
  private _id: string;
  private props: OrderItemProps;


  constructor(props: OrderItemProps, _id?: string) {
    this._id = _id ?? randomUUID();
    this.props = props;
  }

  get quantity() {
    return this.props.quantity;
  }

  set quantity(quantity: number) {
    this.props.quantity = quantity;
  }

  get price() {
    return this.props.price;
  }

  set price(price: number) {
    this.props.price = price;
  }

  get snackId() {
    return this.props.snackId;
  }

  set snackId(snackId: string) {
    this.props.snackId = snackId;
  }

  get notes() {
    return this.props.notes;
  }

  set notes(notes: string | undefined) {
    this.props.notes = notes;
  }

  get id() {
    return this._id;
  }

  get snack() {
    return this.props.snack;
  }

  set snack(snack: Snack) {
    this.snack = snack;
  }
  
}
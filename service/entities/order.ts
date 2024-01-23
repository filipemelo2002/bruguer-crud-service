import { randomUUID } from "crypto";
import { OrderItem } from "./order-item";

export interface OrderProps {
  items: OrderItem[]
}

export class Order {
  private props: OrderProps;
  private _id: string;

  constructor(props: OrderProps, _id?: string) {
    this.props = props;
    this._id = _id ?? randomUUID();
  }

  get items () {
    return this.props.items
  }

  set items(items: OrderItem[]) {
    this.props.items = items;
  }

  get id() {
    return this._id;
  }
}
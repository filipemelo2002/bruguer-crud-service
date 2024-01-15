import { randomUUID } from "crypto";

export interface IngredientProps {
  name: string;
  quantity: number;
};

export class Ingredient {
  private _id: string;
  private props: IngredientProps;

  constructor(props: IngredientProps, _id?: string) {
    this.props = props;
    this._id = _id ?? randomUUID();
  }

  get quantity() {
    return this.props.quantity;
  }

  set quantity(quantity: number) {
    this.props.quantity = quantity;
  }

  get name() {
    return this.props.name;
  }

  set name(name: string) {
    this.props.name = name;
  }
  get id() {
    return this._id;
  }
}

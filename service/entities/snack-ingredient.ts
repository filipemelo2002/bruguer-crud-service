import { randomUUID } from "crypto";

export interface SnackIngredientProps {
  quantity: number;
  ingredientId: string;
  snackId?: string;
}

export class SnackIngredient {
  private _id: string;
  private props: SnackIngredientProps;

  constructor(props: SnackIngredientProps, _id?: string) {
    this.props = props;
    this._id = _id ?? randomUUID();
  }


  get quantity() {
    return this.props.quantity;
  }

  set quantity(quantity: number) {
    this.props.quantity = quantity;
  }

  get ingredientId() {
    return this.props.ingredientId;
  }


  set ingredientId(ingredientId: string) {
    this.props.ingredientId = ingredientId;
  }

  get snackId() {
    return this.props.snackId;
  }


  set snackId(snackId: string | undefined) {
    this.props.snackId = snackId;
  }

  get id() {
    return this._id;
  }

}

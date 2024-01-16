import { randomUUID } from "crypto";
import { Ingredient } from "./ingredient";

export interface SnackIngredientProps {
  quantity: number;
  ingredient: Ingredient;
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

  get ingredient() {
    return this.props.ingredient;
  }


  set ingredient(ingredient: Ingredient) {
    this.props.ingredient = ingredient;
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

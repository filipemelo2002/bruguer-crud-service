import { randomUUID } from "crypto";
import { SnackIngredient } from "./snack-ingredient";

export interface SnackProps {
  name: string;
  ingredients: SnackIngredient[];
}

export class Snack {
  private _id: string;
  private props: SnackProps;

  constructor(props: SnackProps, _id?: string) {
    this.props = props;
    this._id = _id ?? randomUUID();
  }


  get name() {
    return this.props.name;
  }

  set name(name: string) {
    this.props.name = name;
  }

  get ingredients() {
    return this.props.ingredients;
  }


  set ingredients(ingredients: SnackIngredient[]) {
    this.props.ingredients = ingredients;
  }

  get id() {
    return this._id;
  }

}

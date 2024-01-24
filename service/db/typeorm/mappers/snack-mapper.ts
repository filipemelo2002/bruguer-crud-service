import { Snack } from "@entities/snack";
import { SnackModel } from "../models/snack";
import { SnackIngredientsMapper } from "./snack-ingredients-mapper";

export class SnackMapper {
  static toDomain(snack: SnackModel) {
    const snackEntity = new Snack({
      ingredients: snack.ingredients?.map(SnackIngredientsMapper.toDomain),
      name: snack.name,
      price: Number(snack.price)
    }, snack.id)
    return snackEntity
  }
}
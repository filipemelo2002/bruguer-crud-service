import { IngredientModel } from "../models/ingredient";
import { SnackIngredientModel } from "../models/snack-ingredient";
import { SnackIngredient } from "@entities/snack-ingredient";
import { Ingredient } from "@entities/ingredient";

export class SnackIngredientsMapper {

  static toDomain(ingredient: SnackIngredientModel) {
    const snackIngredient = new SnackIngredient({
      ingredient: new Ingredient({
        name: ingredient.ingredient?.name,
        quantity: ingredient.ingredient?.quantity
      }, ingredient.ingredient.id),
      snackId: ingredient.snack.id,
      quantity: ingredient.quantity
    }, ingredient.id)
    return snackIngredient
  }
  static toTypeORM(ingredient: SnackIngredient) {
    const snackIngredient = new SnackIngredientModel();
    snackIngredient.id = ingredient.id;
    snackIngredient.quantity = ingredient.quantity;
    if (ingredient.ingredient) {
      const ingr = new IngredientModel();
      ingr.id = ingredient.ingredient.id;
      snackIngredient.ingredient = ingr;
    }
    return snackIngredient;
  }
}
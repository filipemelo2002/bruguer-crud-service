import { IngredientModel } from "../models/ingredient";
import { SnackIngredientModel } from "../models/snack-ingredient";
import { SnackIngredient } from "@entities/snack-ingredient";

export class SnackIngredientsMapper {
  static toTypeORM(ingredient: SnackIngredient) {
    const snackIngredient = new SnackIngredientModel();
    snackIngredient.id = ingredient.id;
    snackIngredient.quantity = ingredient.quantity;
    const ingr = new IngredientModel();
    ingr.id = ingredient.ingredientId;
    snackIngredient.ingredient = ingr;
    return snackIngredient;
  }
}
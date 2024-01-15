import { Ingredient } from "@entities/ingredient";
import { IngredientModel } from "../models/ingredient";

export class IngredientsMapper {
  static toDomain(ingredient: IngredientModel) {
    return new Ingredient({
      name: ingredient.name,
      quantity: ingredient.quantity
    }, ingredient.id);
  }
  static toTypeORM(value: Ingredient) {
    const ingredient = new IngredientModel();
    ingredient.id = value.id;
    ingredient.name = value.name;
    ingredient.quantity = value.quantity;
    return ingredient;
  }
}

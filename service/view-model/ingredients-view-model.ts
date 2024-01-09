import { Ingredient } from "@entities/ingredient";

export class IngredientsViewModel {
  static toHTTP(ingredient: Ingredient) {
    return {
      name: ingredient.name,
      quantity: ingredient.quantity,
      id: ingredient.id
    }
  }
}

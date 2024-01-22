import { Snack } from "@entities/snack";

export class SnacksViewModel {
  static toHTTP(snack: Snack) {
    return {
      id: snack.id,
      name: snack.name,
      ingredients: snack.ingredients.map(ingredient => ({
        id: ingredient.id,
        ingredientId: ingredient.ingredient.id,
        name: ingredient.ingredient.name,
        quantity: ingredient.quantity
      })),
      price: snack.price
    }
  }
}
import { Ingredient } from "@entities/ingredient";
import { Ingredient as RawIngredient } from "@prisma/client";

export class IngredientMapper {

  static toDomain(ingredient: RawIngredient) {
    return new Ingredient({
      name: ingredient.name,
      quantity: ingredient.quantity
    }, ingredient.id)
  }
} 

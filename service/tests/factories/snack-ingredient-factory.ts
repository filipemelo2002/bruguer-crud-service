import { Ingredient } from "@entities/ingredient"
import { SnackIngredient } from "@entities/snack-ingredient"

export function makeSnackIngredient({
  ingredient = new Ingredient({quantity: 50, name: 'lettuce'}),
  quantity = 2,
  id='1'
}) {
  return new SnackIngredient({
    ingredient,
    quantity,
  }, id)
}
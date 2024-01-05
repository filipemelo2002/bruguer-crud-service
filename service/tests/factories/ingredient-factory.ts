import { Ingredient } from "@entities/ingredient";

export function makeIngredient({
  name = 'Lettuce',
  quantity = 30,
  id = '1'
}) {
  return new Ingredient({
    name,
    quantity
  }, id);
}

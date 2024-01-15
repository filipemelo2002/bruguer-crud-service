import { Snack } from "@entities/snack";
import { makeIngredient } from "./ingredient-factory";

export function makeSnack({
  name = "Cheese Burguer",
  ingredients = [
    makeIngredient({ name: "cheese", quantity: 2 }),
    makeIngredient({ name: "hamburguer", quantity: 2 }),
    makeIngredient({ name: "bread", quantity: 2 }),
  ],
  id = "1",
}) {
  return new Snack(
    {
      name,
      ingredients,
    },
    id
  );
}

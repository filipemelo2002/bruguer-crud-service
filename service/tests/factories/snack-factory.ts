import { Snack } from "@entities/snack";
import { makeSnackIngredient } from "./snack-ingredient-factory";

export function makeSnack({
  name = "Cheese Burguer",
  ingredients = [
    makeSnackIngredient({ quantity: 2 }),
    makeSnackIngredient({ quantity: 2 }),
    makeSnackIngredient({ quantity: 2 }),
  ],
  price = 30,
  id = "1",
}) {
  return new Snack(
    {
      name,
      ingredients,
      price
    },
    id
  );
}

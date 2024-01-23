export class NotEnoughIngredients extends Error {
  constructor() {
    super("Not enough ingredients available.")
  }
}
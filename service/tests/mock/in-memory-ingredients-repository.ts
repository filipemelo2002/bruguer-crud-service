import { Ingredient } from "@entities/ingredient";
import { IngredientsRepository } from "@repositories/ingredients-repository";

export class InMemoryIngredientsRepository implements IngredientsRepository {
  public ingredients: Ingredient[] = [];

  public async list(): Promise<Ingredient[]> {
    return this.ingredients;
  }
}

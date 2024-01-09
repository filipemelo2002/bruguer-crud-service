import { Ingredient } from "@entities/ingredient";

export abstract class IngredientsRepository {
  abstract list(): Promise<Ingredient[]>;
  abstract create(ingredient: Ingredient): Promise<void>;
}

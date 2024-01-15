import { Ingredient } from "@entities/ingredient";


export abstract class IngredientsRepository {
  abstract list(): Promise<Ingredient[]>;
  abstract create(ingredient: Ingredient): Promise<void>;
  abstract findOne(id: string): Promise<Ingredient | null>;
  abstract update(ingredient: Ingredient): Promise<void>;
  abstract delete(id: string): Promise<void>;
}

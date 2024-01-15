import { Ingredient } from "@entities/ingredient";
import { IngredientsRepository } from "@repositories/ingredients-repository";

export class InMemoryIngredientsRepository implements IngredientsRepository {
  public ingredients: Ingredient[] = [];

  public async list(): Promise<Ingredient[]> {
    return this.ingredients;
  }

  public async create(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
  }

  public async findOne(id: string) {
    return this.ingredients.find(ingredient => ingredient.id === id) || null
  }

  public async update(request: Ingredient): Promise<void> {
    const ingredientIndex = this.ingredients.findIndex(ingredient => ingredient.id === request.id);
    this.ingredients[ingredientIndex] = request
  }
}


import { Ingredient } from "@entities/ingredient";
import { IngredientsRepository } from "@repositories/ingredients-repository";

interface IngredientServiceListResponse {
  ingredients: Ingredient[];
}
export class IngredientService {

  constructor(private service: IngredientsRepository) {

  }

  async list(): Promise<IngredientServiceListResponse> {

    const ingredients = await this.service.list();
    return {
      ingredients
    }
  }
}

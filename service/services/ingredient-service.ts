import { Ingredient } from "@entities/ingredient";
import { IngredientsRepository } from "@repositories/ingredients-repository";
import { inject, injectable } from "inversify";

interface IngredientServiceListResponse {
  ingredients: Ingredient[];
}
@injectable()
export class IngredientService {

  constructor(@inject(IngredientsRepository) private service: IngredientsRepository) {

  }

  async list(): Promise<IngredientServiceListResponse> {

    const ingredients = await this.service.list();
    return {
      ingredients
    }
  }
}
